import { Response } from 'express';
import { logger } from '../core/logger';

/** Kill the stream after this many ms without any data being broadcast to clients. */
const WATCHDOG_MS = 30_000;

interface StreamSession {
  clients: Set<Response>;
  killFn: () => Promise<void>;
  watchdogTimer: ReturnType<typeof setTimeout> | null;
}

/**
 * Global registry of active media streams.
 *
 * Features:
 *  - Fan-out / tee: multiple HTTP clients share a single child process.
 *  - Auto-kill: when the last client disconnects, the process is terminated.
 *  - Watchdog: if no data is broadcast for WATCHDOG_MS, the stream is killed
 *    (handles network-drop clients that never close the socket cleanly).
 */
class StreamRegistry {
  private readonly sessions = new Map<string, StreamSession>();

  has(key: string): boolean { return this.sessions.has(key); }

  clientCount(key: string): number { return this.sessions.get(key)?.clients.size ?? 0; }

  /**
   * Register a new stream session.
   * Must be called before addClient() or broadcast().
   *
   * @param killFn  Async callback that terminates the underlying process.
   *                May reference a variable assigned after create() via closure —
   *                this is safe because killFn is always called asynchronously.
   */
  create(key: string, killFn: () => Promise<void>): void {
    if (this.sessions.has(key)) return; // guard against double-create
    this.sessions.set(key, { clients: new Set(), killFn, watchdogTimer: null });
    this.resetWatchdog(key);
    logger.info(`[stream-registry] Sessão criada: key=${key}`);
  }

  addClient(key: string, res: Response): boolean {
    const s = this.sessions.get(key);
    if (!s) return false;
    s.clients.add(res);
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
   * Dead/closed clients are removed automatically.
   */
  broadcast(key: string, chunk: Buffer): void {
    const s = this.sessions.get(key);
    if (!s) return;

    this.resetWatchdog(key);
    const dead: Response[] = [];

    for (const res of s.clients) {
      if (res.writableEnded || res.destroyed) { dead.push(res); continue; }
      try { res.write(chunk); } catch { dead.push(res); }
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
    if (!s) return;

    if (s.watchdogTimer) { clearTimeout(s.watchdogTimer); s.watchdogTimer = null; }

    for (const res of s.clients) {
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
