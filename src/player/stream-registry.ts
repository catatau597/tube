import { Response } from 'express';
import { logger } from '../core/logger';

/**
 * Tempo máximo (ms) que um cliente pode ficar em estado stuck/draining sem
 * receber um evento drain antes de ser removido forçadamente.
 *
 * Cobre conexões TCP abandonadas sem FIN (VLC, Kodi, etc.) que não consomem
 * dados nem fecham a conexão, gerando backpressure permanente.
 */
const IDLE_CLIENT_TIMEOUT_MS = 30_000;

/**
 * Tempo máximo (ms) que um cliente pode ficar em estado draining=true
 * (aguardando drain do socket) antes de ser removido.
 *
 * Menor que IDLE_CLIENT_TIMEOUT_MS porque clientes com backpressure
 * persistente nunca vão drenar — precisam ser reconectados rápido.
 */
const DRAINING_DROP_TIMEOUT_MS = 8_000;

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
  /** Date.now() quando draining=true foi definido, null se não está drenando. */
  drainingAt: number | null;
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
 *  - Draining watchdog: removes clients stuck in backpressure after
 *    DRAINING_DROP_TIMEOUT_MS (8s), allowing them to reconnect cleanly.
 *  - Backpressure: slow clients skip chunks and wait for drain; after
 *    BACKPRESSURE_DROP_THRESHOLD consecutive misses they are dropped.
 */
class StreamRegistry {
  private readonly sessions = new Map<string, StreamSession>();

  has(key: string): boolean { return this.sessions.has(key); }

  clientCount(key: string): number { return this.sessions.get(key)?.clients.size ?? 0; }

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
      drainingAt: null,
      lastDrainTimestamp: Date.now(),
      markedForRemoval: false,
    };
    s.clients.set(res, state);
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
            state.drainingAt = Date.now();
            res.once('drain', () => {
              state.draining = false;
              state.drainingAt = null;
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
   * Idle watchdog: roda a cada IDLE_CLIENT_TIMEOUT_MS e verifica dois casos:
   *
   * 1. Clientes phantom (VLC sem FIN): writableNeedDrain=true + idleMs >= 30s
   * 2. Clientes stuck em backpressure: draining=true + drainingAt há >= 8s
   *
   * Ambos os casos removem o cliente para liberar o processo filho.
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

        const phantomConnection = isDraining && idleMs >= IDLE_CLIENT_TIMEOUT_MS;
        const stuckDraining = state.draining &&
          state.drainingAt !== null &&
          (now - state.drainingAt) >= DRAINING_DROP_TIMEOUT_MS;

        if (state.markedForRemoval || phantomConnection || stuckDraining) {
          const reason = state.markedForRemoval ? 'markedForRemoval'
            : stuckDraining ? `draining stuck ${now - (state.drainingAt ?? now)}ms`
            : `phantom idleMs=${idleMs}`;
          logger.warn(
            `[stream-registry] Cliente removido (${reason}): key=${key}`,
          );
          toRemove.push(res);
          try { res.end(); } catch { /* */ }
        }
      }

      for (const res of toRemove) s.clients.delete(res);

      if (s.clients.size === 0 && toRemove.length > 0) {
        logger.info(`[stream-registry] Todos os clientes removidos pelo watchdog, encerrando: key=${key}`);
        void this.kill(key);
      } else {
        s.idleWatchdogTimer = setTimeout(check, IDLE_CLIENT_TIMEOUT_MS);
      }
    };

    s.idleWatchdogTimer = setTimeout(check, IDLE_CLIENT_TIMEOUT_MS);
  }
}

export const streamRegistry = new StreamRegistry();
