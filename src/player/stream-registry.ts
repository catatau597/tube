import { Response } from 'express';
import { logger } from '../core/logger';

/** Kill the stream after this many ms without any data being broadcast to clients. */
const WATCHDOG_MS = 30_000;

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
}

interface StreamSession {
  clients: Map<Response, ClientState>;
  killFn: () => Promise<void>;
  watchdogTimer: ReturnType<typeof setTimeout> | null;
  killed: boolean;
}

/**
 * Global registry of active media streams.
 *
 * Features:
 *  - Fan-out / tee: multiple HTTP clients share a single child process.
 *  - Auto-kill: when the last client disconnects, the process is terminated.
 *  - Watchdog: if no data is broadcast for WATCHDOG_MS, the stream is killed
 *    (handles network-drop clients that never close the socket cleanly).
 *  - Backpressure: when res.write() returns false the chunk is skipped for
 *    that client and we wait for 'drain'. After BACKPRESSURE_DROP_THRESHOLD
 *    consecutive misses the client is dropped to protect memory.
 *    A single false return at connection start is normal and is NOT counted.
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
    this.sessions.set(key, { clients: new Map(), killFn, watchdogTimer: null, killed: false });
    this.resetWatchdog(key);
    logger.info(`[stream-registry] Sessão criada: key=${key}`);
  }

  addClient(key: string, res: Response): boolean {
    const s = this.sessions.get(key);
    if (!s || s.killed) return false;
    const state: ClientState = { res, backpressureCount: 0, draining: false };
    s.clients.set(res, state);
    this.resetWatchdog(key);
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
   * Dead/closed clients are removed automatically.
   */
  broadcast(key: string, chunk: Buffer): void {
    const s = this.sessions.get(key);
    if (!s) return;

    this.resetWatchdog(key);
    const dead: Response[] = [];

    for (const [res, state] of s.clients) {
      if (res.writableEnded || res.destroyed) { dead.push(res); continue; }

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
            });
          }
        }
      } catch {
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

    if (s.watchdogTimer) { clearTimeout(s.watchdogTimer); s.watchdogTimer = null; }

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

  private resetWatchdog(key: string): void {
    const s = this.sessions.get(key);
    if (!s) return;
    if (s.watchdogTimer) clearTimeout(s.watchdogTimer);
    s.watchdogTimer = setTimeout(() => {
      logger.warn(`[stream-registry] Watchdog timeout (${WATCHDOG_MS / 1000}s sem dados): key=${key}`);
      void this.kill(key);
    }, WATCHDOG_MS);
  }
}

export const streamRegistry = new StreamRegistry();
