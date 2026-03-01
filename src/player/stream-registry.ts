import { Response } from 'express';
import { logger } from '../core/logger';

/**
 * Kill idle clients (no successful drain) after this many ms.
 * This protects against VLC bug where it doesn't send TCP FIN when closing.
 */
const IDLE_CLIENT_TIMEOUT_MS = 30_000;

/**
 * How many consecutive backpressure events a client may trigger before being
 * dropped. A single false return from res.write() is normal at connection
 * start (TCP slow-start, VLC buffering). Only persistent inability to drain
 * indicates a truly slow/stuck client.
 */
const BACKPRESSURE_DROP_THRESHOLD = 3;

interface ClientState {
  res: Response;
  /** Consecutive chunks dropped due to backpressure (buffer full). */
  backpressureCount: number;
  /** True while waiting for the 'drain' event. */
  draining: boolean;
  /** Timestamp (Date.now()) of the last successful drain event (or connection start). */
  lastDrainTimestamp: number;
  /** True if this client should be removed (error detected or manual removal). */
  markedForRemoval: boolean;
}

interface StreamSession {
  clients: Map<Response, ClientState>;
  killFn: () => Promise<void>;
  idleWatchdogTimer: ReturnType<typeof setTimeout> | null;
  killed: boolean;
}

/**
 * Global registry of active media streams.
 *
 * Features:
 *  - Fan-out / tee: multiple HTTP clients share a single child process.
 *  - Auto-kill: when the last client disconnects, the process is terminated.
 *  - Idle watchdog: removes clients that haven't drained (res.writableNeedDrain === true)
 *    for IDLE_CLIENT_TIMEOUT_MS. Handles VLC's bug where it doesn't send TCP FIN.
 *  - Backpressure: when res.write() returns false the chunk is skipped for
 *    that client and we wait for 'drain'. After BACKPRESSURE_DROP_THRESHOLD
 *    consecutive misses the client is dropped to protect memory.
 */
class StreamRegistry {
  private readonly sessions = new Map<string, StreamSession>();

  has(key: string): boolean { return this.sessions.has(key); }

  clientCount(key: string): number { return this.sessions.get(key)?.clients.size ?? 0; }

  /**
   * Register a new stream session.
   * Must be called before addClient() or broadcast().
   *
   * IMPORTANT: killFn may be invoked as part of kill(), which can be
   * triggered immediately (for example when the last client is removed),
   * so callers must not rely on it being deferred to a later event loop tick.
   * See SmartPlayer spawn helpers for the safe deferred-proc pattern.
   *
   * @param killFn  Async callback that terminates the underlying process.
   */
  create(key: string, killFn: () => Promise<void>): void {
    if (this.sessions.has(key)) return; // guard against double-create
    this.sessions.set(key, { clients: new Map(), killFn, idleWatchdogTimer: null, killed: false });
    this.startIdleWatchdog(key);
    logger.info(`[stream-registry] Sessão criada: key=${key}`);
  }

  addClient(key: string, res: Response): boolean {
    const s = this.sessions.get(key);
    if (!s || s.killed) return false;
    const state: ClientState = {
      res,
      backpressureCount: 0,
      draining: false,
      lastDrainTimestamp: Date.now(),
      markedForRemoval: false,
    };
    s.clients.set(res, state);

    // Attach error handler to detect closed sockets that don't fire 'close'
    res.on('error', () => {
      state.markedForRemoval = true;
    });

    logger.info(`[stream-registry] +cliente key=${key} total=${s.clients.size}`);
    return true;
  }

  removeClient(key: string, res: Response): void {
    const s = this.sessions.get(key);
    if (!s) return;
    if (!s.clients.delete(res)) return; // wasn't in set
    logger.info(`[stream-registry] -cliente key=${key} restantes=${s.clients.size}`);
    if (s.clients.size === 0) void this.kill(key);
  }

  /**
   * Fan-out: write chunk to every live client.
   *
   * Backpressure strategy:
   *  - If res.write() returns false, the socket buffer is full. We skip this
   *    chunk for that client and wait for 'drain' before writing again.
   *  - After BACKPRESSURE_DROP_THRESHOLD consecutive skips the client is
   *    dropped — it is genuinely too slow to keep up.
   *  - Draining clients simply skip the chunk (no drop, no error).
   *
   * Dead/closed clients and clients marked for removal are removed automatically.
   */
  broadcast(key: string, chunk: Buffer): void {
    const s = this.sessions.get(key);
    if (!s) return;

    const dead: Response[] = [];

    for (const [res, state] of s.clients) {
      // Remove if marked, destroyed, or ended
      if (state.markedForRemoval || res.writableEnded || res.destroyed) {
        dead.push(res);
        continue;
      }

      // While draining, skip this chunk (do not count as backpressure hit)
      if (state.draining) continue;

      try {
        const ok = res.write(chunk);
        if (ok) {
          // Write succeeded — reset backpressure counter
          state.backpressureCount = 0;
        } else {
          // Buffer full — start draining
          state.backpressureCount++;
          if (state.backpressureCount >= BACKPRESSURE_DROP_THRESHOLD) {
            logger.warn(
              `[stream-registry] Backpressure threshold (${BACKPRESSURE_DROP_THRESHOLD}) atingido, encerrando cliente lento key=${key}`,
            );
            dead.push(res);
            try { res.end(); } catch { /* */ }
          } else {
            // Wait for drain before writing to this client again
            state.draining = true;
            res.once('drain', () => {
              state.draining = false;
              state.backpressureCount = 0;
              state.lastDrainTimestamp = Date.now();
            });
          }
        }
      } catch {
        // Write error — mark for removal
        dead.push(res);
      }
    }

    for (const res of dead) s.clients.delete(res);

    if (s.clients.size === 0) {
      logger.info(`[stream-registry] Zero clientes após broadcast, encerrando: key=${key}`);
      void this.kill(key);
    }
  }

  /** Tear down the session: cancel watchdog, end all clients, invoke killFn. */
  async kill(key: string): Promise<void> {
    const s = this.sessions.get(key);
    if (!s || s.killed) return; // idempotent
    s.killed = true;

    if (s.idleWatchdogTimer) { clearTimeout(s.idleWatchdogTimer); s.idleWatchdogTimer = null; }

    for (const res of s.clients.keys()) {
      try { if (!res.writableEnded) res.end(); } catch { /* */ }
    }
    s.clients.clear();

    this.sessions.delete(key);
    logger.info(`[stream-registry] Sessão destruída: key=${key}`);

    try { await s.killFn(); } catch (err) {
      logger.warn(`[stream-registry] Erro em killFn key=${key}: ${err}`);
    }
  }

  /**
   * Idle watchdog: checks every IDLE_CLIENT_TIMEOUT_MS for clients that
   * are draining (writableNeedDrain === true) without a recent drain event.
   * Those clients are forcibly removed (VLC phantom connections).
   *
   * If all clients are removed by this process, the stream is killed.
   */
  private startIdleWatchdog(key: string): void {
    const s = this.sessions.get(key);
    if (!s) return;

    const check = () => {
      if (s.killed) return;

      const now = Date.now();
      const toRemove: Response[] = [];

      logger.info(`[stream-registry][watchdog] Checando ${s.clients.size} clientes: key=${key}`);

      // Find clients that are stuck draining (haven't drained in IDLE_CLIENT_TIMEOUT_MS)
      for (const [res, state] of s.clients) {
        const idleMs = now - state.lastDrainTimestamp;
        const isDraining = res.writableNeedDrain ?? false;

        logger.info(
          `[stream-registry][watchdog] Cliente: draining=${isDraining} idleMs=${idleMs} markedForRemoval=${state.markedForRemoval} key=${key}`,
        );

        // Remove if: (1) marked for removal, (2) been draining for too long without drain event
        if (state.markedForRemoval || (isDraining && idleMs >= IDLE_CLIENT_TIMEOUT_MS)) {
          logger.warn(
            `[stream-registry] Cliente idle/stuck (draining=${isDraining}, idle=${idleMs}ms), removendo: key=${key}`,
          );
          toRemove.push(res);
          try { res.end(); } catch { /* */ }
        }
      }

      // Remove all stuck clients
      for (const res of toRemove) {
        s.clients.delete(res);
      }

      // If no clients remain, kill the stream
      if (s.clients.size === 0 && toRemove.length > 0) {
        logger.info(
          `[stream-registry] Todos os clientes removidos por idle, encerrando: key=${key}`,
        );
        void this.kill(key);
      } else {
        // Re-schedule check
        s.idleWatchdogTimer = setTimeout(check, IDLE_CLIENT_TIMEOUT_MS);
      }
    };

    s.idleWatchdogTimer = setTimeout(check, IDLE_CLIENT_TIMEOUT_MS);
  }
}

export const streamRegistry = new StreamRegistry();
