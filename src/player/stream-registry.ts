import { Response } from 'express';
import { logger } from '../core/logger';

/**
 * How long a client may remain in a stuck/draining state without a successful
 * drain event before being forcibly removed.
 * Protects against VLC (and other players) that close the TCP connection
 * without sending FIN, leaving phantom connections that never trigger 'close'.
 */
const IDLE_CLIENT_TIMEOUT_MS = 30_000;

/**
 * How many consecutive backpressure events a client may trigger before being
 * dropped. A single false return from res.write() is normal at connection
 * start (TCP slow-start / player buffering). Only persistent inability to
 * drain indicates a truly slow or stuck client.
 */
const BACKPRESSURE_DROP_THRESHOLD = 3;

interface ClientState {
  res: Response;
  /** Consecutive write() calls that returned false without an intervening drain. */
  backpressureCount: number;
  /** True while waiting for the socket to drain after a false write(). */
  draining: boolean;
  /** Date.now() of the last successful drain event (or connection start). */
  lastDrainTimestamp: number;
  /** Set by the 'error' event handler — client will be removed on next broadcast. */
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
 * Responsibilities:
 *  - Fan-out (tee): multiple HTTP clients share one child process output.
 *  - Auto-kill: stream is torn down when all clients disconnect.
 *  - Idle watchdog: removes clients that have been stuck draining for
 *    IDLE_CLIENT_TIMEOUT_MS (covers VLC phantom connections without TCP FIN).
 *  - Backpressure: slow clients skip chunks and wait for drain; after
 *    BACKPRESSURE_DROP_THRESHOLD consecutive misses they are dropped.
 */
class StreamRegistry {
  private readonly sessions = new Map<string, StreamSession>();

  has(key: string): boolean { return this.sessions.has(key); }

  clientCount(key: string): number { return this.sessions.get(key)?.clients.size ?? 0; }

  /**
   * Register a new stream session.
   * Must be called before addClient() or broadcast().
   * killFn may be invoked synchronously (see SmartPlayer deferred-proc pattern).
   */
  create(key: string, killFn: () => Promise<void>): void {
    if (this.sessions.has(key)) return;
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
    // Socket-level error (EPIPE / ECONNRESET) marks the client for removal
    // so it is cleaned up on the next broadcast cycle.
    res.on('error', () => { state.markedForRemoval = true; });
    logger.info(`[stream-registry] +cliente key=${key} total=${s.clients.size}`);
    return true;
  }

  removeClient(key: string, res: Response): void {
    const s = this.sessions.get(key);
    if (!s) return;
    if (!s.clients.delete(res)) return;
    logger.info(`[stream-registry] -cliente key=${key} restantes=${s.clients.size}`);
    if (s.clients.size === 0) void this.kill(key);
  }

  broadcast(key: string, chunk: Buffer): void {
    const s = this.sessions.get(key);
    if (!s) return;

    const dead: Response[] = [];

    for (const [res, state] of s.clients) {
      if (state.markedForRemoval || res.writableEnded || res.destroyed) {
        dead.push(res);
        continue;
      }

      if (state.draining) continue;

      try {
        const ok = res.write(chunk);
        if (ok) {
          state.backpressureCount = 0;
        } else {
          state.backpressureCount++;
          if (state.backpressureCount >= BACKPRESSURE_DROP_THRESHOLD) {
            logger.warn(
              `[stream-registry] Backpressure threshold (${BACKPRESSURE_DROP_THRESHOLD}) atingido, encerrando cliente lento key=${key}`,
            );
            dead.push(res);
            try { res.end(); } catch { /* */ }
          } else {
            state.draining = true;
            res.once('drain', () => {
              state.draining = false;
              state.backpressureCount = 0;
              state.lastDrainTimestamp = Date.now();
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

  async kill(key: string): Promise<void> {
    const s = this.sessions.get(key);
    if (!s || s.killed) return;
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
   * Idle watchdog: every IDLE_CLIENT_TIMEOUT_MS, find clients that are stuck
   * in draining state (writableNeedDrain) without a recent drain event, and
   * forcibly remove them. If all clients are removed, the stream is killed.
   *
   * This is the safety net for VLC (and similar players) that abandon TCP
   * connections without sending FIN, leaving the server unaware of the disconnect.
   */
  private startIdleWatchdog(key: string): void {
    const s = this.sessions.get(key);
    if (!s) return;

    const check = () => {
      if (s.killed) return;

      const now = Date.now();
      const toRemove: Response[] = [];

      for (const [res, state] of s.clients) {
        const idleMs = now - state.lastDrainTimestamp;
        const isDraining = (res as unknown as { writableNeedDrain?: boolean }).writableNeedDrain ?? false;

        if (state.markedForRemoval || (isDraining && idleMs >= IDLE_CLIENT_TIMEOUT_MS)) {
          logger.warn(
            `[stream-registry] Cliente stuck (draining=${isDraining}, idleMs=${idleMs}), removendo: key=${key}`,
          );
          toRemove.push(res);
          try { res.end(); } catch { /* */ }
        }
      }

      for (const res of toRemove) s.clients.delete(res);

      if (s.clients.size === 0 && toRemove.length > 0) {
        logger.info(`[stream-registry] Todos os clientes removidos por idle, encerrando: key=${key}`);
        void this.kill(key);
      } else {
        s.idleWatchdogTimer = setTimeout(check, IDLE_CLIENT_TIMEOUT_MS);
      }
    };

    s.idleWatchdogTimer = setTimeout(check, IDLE_CLIENT_TIMEOUT_MS);
  }
}

export const streamRegistry = new StreamRegistry();
