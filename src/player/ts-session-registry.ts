import { getConfigNumber } from '../core/config-manager';
import { logger } from '../core/logger';
import { ManagedProcess } from './process-manager';
import { TsStreamBuffer, TsStreamBufferOptions } from './ts-stream-buffer';

const DEFAULT_IDLE_TIMEOUT_MS = 45_000;
const DEFAULT_SESSION_WATCHDOG_INTERVAL_MS = 5_000;
const DEFAULT_STALE_CLIENT_TIMEOUT_MS = 30_000;

export type TsSessionKind = 'live' | 'vod' | 'upcoming';
export type TsSessionState = 'initializing' | 'active' | 'stopping' | 'stopped' | 'error';

export interface TsSessionClientSnapshot {
  clientId: string;
  localIndex: number;
  headIndex: number;
  bytesSent: number;
  chunksSent: number;
  consecutiveEmptyReads: number;
  writableLength: number;
  socketBufferSize: number;
  writableNeedDrain: boolean;
  responseDestroyed: boolean;
  responseEnded: boolean;
  socketDestroyed: boolean;
  socketWritable: boolean;
  stopReason: string | null;
}

export interface TsSession {
  key: string;
  kind: TsSessionKind;
  buffer: TsStreamBuffer;
  sourceProcess: ManagedProcess | null;
  createdAt: number;
  lastAccessAt: number;
  clientCount: number;
  state: TsSessionState;
}

export interface CreateTsSessionOptions extends TsStreamBufferOptions {
  key: string;
  kind: TsSessionKind;
  idleTimeoutMs?: number;
  onDestroy?: (session: TsSession, reason: string) => Promise<void> | void;
}

interface ManagedTsSession extends TsSession {
  idleTimeoutMs: number;
  idleTimer: ReturnType<typeof setTimeout> | null;
  watchdogTimer: ReturnType<typeof setInterval> | null;
  watchdogIntervalMs: number;
  staleClientTimeoutMs: number;
  destroyPromise: Promise<void> | null;
  onDestroy: ((session: TsSession, reason: string) => Promise<void> | void) | null;
  clients: Map<string, ManagedTsClient>;
  lastWatchdogLogAt: number;
}

interface ManagedTsClient {
  clientId: string;
  createdAt: number;
  lastHeartbeatAt: number;
  lastReason: string | null;
  snapshot: TsSessionClientSnapshot | null;
}

class TsSessionRegistry {
  private readonly sessions = new Map<string, ManagedTsSession>();

  has(key: string): boolean {
    return this.sessions.has(key);
  }

  size(): number {
    return this.sessions.size;
  }

  get(key: string): TsSession | null {
    const session = this.sessions.get(key);
    if (!session) return null;
    return session;
  }

  getOrCreate(options: CreateTsSessionOptions): TsSession {
    const existing = this.sessions.get(options.key);
    if (existing) {
      if (existing.kind !== options.kind) {
        logger.warn(
          `[ts-session-registry] Sessao existente com kind diferente: key=${existing.key} existing=${existing.kind} requested=${options.kind}`,
        );
      }
      this.touch(existing.key);
      return existing;
    }

    const now = Date.now();
    const idleTimeoutMs = this.normalizePositiveTimeout(
      options.idleTimeoutMs ?? getConfigNumber('TS_PROXY_IDLE_TIMEOUT_MS', DEFAULT_IDLE_TIMEOUT_MS),
      DEFAULT_IDLE_TIMEOUT_MS,
    );
    const watchdogIntervalMs = this.normalizePositiveTimeout(
      getConfigNumber('TS_PROXY_SESSION_WATCHDOG_INTERVAL_MS', DEFAULT_SESSION_WATCHDOG_INTERVAL_MS),
      DEFAULT_SESSION_WATCHDOG_INTERVAL_MS,
    );
    const staleClientTimeoutMs = this.normalizePositiveTimeout(
      getConfigNumber('TS_PROXY_STALE_CLIENT_TIMEOUT_MS', DEFAULT_STALE_CLIENT_TIMEOUT_MS),
      DEFAULT_STALE_CLIENT_TIMEOUT_MS,
    );

    const session: ManagedTsSession = {
      key: options.key,
      kind: options.kind,
      buffer: new TsStreamBuffer(options),
      sourceProcess: null,
      createdAt: now,
      lastAccessAt: now,
      clientCount: 0,
      state: 'initializing',
      idleTimeoutMs,
      idleTimer: null,
      watchdogTimer: null,
      watchdogIntervalMs,
      staleClientTimeoutMs,
      destroyPromise: null,
      onDestroy: options.onDestroy ?? null,
      clients: new Map(),
      lastWatchdogLogAt: 0,
    };

    this.sessions.set(session.key, session);
    this.scheduleIdleTimer(session);

    logger.info(
      `[ts-session-registry] Sessao criada: key=${session.key} kind=${session.kind} idleTimeoutMs=${session.idleTimeoutMs} watchdogIntervalMs=${session.watchdogIntervalMs} staleClientTimeoutMs=${session.staleClientTimeoutMs}`,
    );

    return session;
  }

  touch(key: string): boolean {
    const session = this.sessions.get(key);
    if (!session) return false;
    this.refreshActivity(session);
    return true;
  }

  setState(key: string, state: TsSessionState): boolean {
    const session = this.sessions.get(key);
    if (!session) return false;
    session.state = state;
    this.refreshActivity(session);
    logger.info(`[ts-session-registry] Sessao atualizada: key=${key} state=${state} clients=${session.clientCount}`);
    return true;
  }

  setSourceProcess(key: string, sourceProcess: ManagedProcess | null): boolean {
    const session = this.sessions.get(key);
    if (!session) return false;
    session.sourceProcess = sourceProcess;
    this.refreshActivity(session);
    logger.info(
      `[ts-session-registry] Origem associada: key=${key} pid=${sourceProcess?.pid ?? 'null'} state=${session.state}`,
    );
    return true;
  }

  setDestroyHandler(
    key: string,
    onDestroy: ((session: TsSession, reason: string) => Promise<void> | void) | null,
  ): boolean {
    const session = this.sessions.get(key);
    if (!session) return false;
    session.onDestroy = onDestroy;
    return true;
  }

  addClient(key: string, clientId: string): TsSession | null {
    const session = this.sessions.get(key);
    if (!session) return null;

    session.clients.set(clientId, {
      clientId,
      createdAt: Date.now(),
      lastHeartbeatAt: Date.now(),
      lastReason: 'connected',
      snapshot: null,
    });
    session.clientCount = session.clients.size;
    this.refreshActivity(session);
    this.ensureWatchdog(session);

    logger.info(
      `[ts-session-registry] Cliente entrou: key=${key} client=${clientId} clients=${session.clientCount} state=${session.state}`,
    );
    return session;
  }

  heartbeatClient(key: string, clientId: string, snapshot: TsSessionClientSnapshot, reason = 'heartbeat'): boolean {
    const session = this.sessions.get(key);
    if (!session) return false;
    const client = session.clients.get(clientId);
    if (!client) return false;

    client.lastHeartbeatAt = Date.now();
    client.lastReason = reason;
    client.snapshot = snapshot;
    return true;
  }

  removeClient(key: string, clientId: string, reason = 'disconnect'): TsSession | null {
    const session = this.sessions.get(key);
    if (!session) return null;

    const client = session.clients.get(clientId);
    if (!client) return session;

    session.clients.delete(clientId);
    session.clientCount = session.clients.size;
    this.refreshActivity(session);

    logger.info(
      `[ts-session-registry] Cliente saiu: key=${key} client=${clientId} reason=${reason} clients=${session.clientCount} state=${session.state}`,
    );

    return session;
  }

  async destroy(key: string, reason = 'manual'): Promise<void> {
    const session = this.sessions.get(key);
    if (!session) return;
    if (session.destroyPromise) return session.destroyPromise;

    session.destroyPromise = this.destroySession(session, reason);
    return session.destroyPromise;
  }

  private async destroySession(session: ManagedTsSession, reason: string): Promise<void> {
    this.clearIdleTimer(session);
    this.clearWatchdog(session);
    this.sessions.delete(session.key);
    session.state = session.state === 'error' ? 'error' : 'stopping';

    logger.info(
      `[ts-session-registry] Sessao destruindo: key=${session.key} kind=${session.kind} reason=${reason} clients=${session.clientCount}`,
    );

    session.buffer.close();

    const sourceProcess = session.sourceProcess;
    session.sourceProcess = null;

    try {
      if (sourceProcess) {
        await sourceProcess.kill(5_000);
      }
    } catch (error) {
      logger.warn(`[ts-session-registry] Falha ao encerrar origem: key=${session.key} err=${String(error)}`);
    }

    try {
      if (session.onDestroy) {
        await session.onDestroy(session, reason);
      }
    } catch (error) {
      logger.warn(`[ts-session-registry] Falha em onDestroy: key=${session.key} err=${String(error)}`);
    }

    session.state = 'stopped';

    logger.info(
      `[ts-session-registry] Sessao destruida: key=${session.key} kind=${session.kind} reason=${reason}`,
    );
  }

  private scheduleIdleTimer(session: ManagedTsSession): void {
    if (session.clientCount > 0 || session.destroyPromise) return;
    if (session.idleTimer) return;

    session.idleTimer = setTimeout(() => {
      session.idleTimer = null;
      const current = this.sessions.get(session.key);
      if (!current || current.clientCount > 0) return;
      void this.destroy(session.key, 'idle-timeout');
    }, session.idleTimeoutMs);

    logger.info(
      `[ts-session-registry] Idle timer armado: key=${session.key} idleTimeoutMs=${session.idleTimeoutMs}`,
    );
  }

  private clearIdleTimer(session: ManagedTsSession): void {
    if (!session.idleTimer) return;
    clearTimeout(session.idleTimer);
    session.idleTimer = null;
  }

  private ensureWatchdog(session: ManagedTsSession): void {
    if (session.watchdogTimer || session.destroyPromise || session.clientCount === 0) return;

    session.watchdogTimer = setInterval(() => {
      const current = this.sessions.get(session.key);
      if (!current || current.destroyPromise) return;
      if (current.clientCount === 0) {
        this.clearWatchdog(current);
        return;
      }
      this.runWatchdog(current);
    }, session.watchdogIntervalMs);
  }

  private clearWatchdog(session: ManagedTsSession): void {
    if (!session.watchdogTimer) return;
    clearInterval(session.watchdogTimer);
    session.watchdogTimer = null;
  }

  private refreshActivity(session: ManagedTsSession): void {
    session.lastAccessAt = Date.now();
    this.clearIdleTimer(session);
    if (session.clientCount === 0 && !session.destroyPromise) {
      this.scheduleIdleTimer(session);
      this.clearWatchdog(session);
    } else if (session.clientCount > 0) {
      this.ensureWatchdog(session);
    }
  }

  private runWatchdog(session: ManagedTsSession): void {
    const now = Date.now();
    const staleClients: Array<{ clientId: string; reason: string }> = [];

    for (const client of session.clients.values()) {
      const idleMs = now - client.lastHeartbeatAt;
      const snapshot = client.snapshot;

      if (snapshot?.stopReason || snapshot?.responseDestroyed || snapshot?.responseEnded || snapshot?.socketDestroyed || !snapshot?.socketWritable) {
        const reason = snapshot?.stopReason
          ?? (snapshot?.responseDestroyed ? 'response-destroyed' : null)
          ?? (snapshot?.responseEnded ? 'response-ended' : null)
          ?? (snapshot?.socketDestroyed ? 'socket-destroyed' : null)
          ?? 'socket-not-writable';
        staleClients.push({ clientId: client.clientId, reason: `watchdog-terminal:${reason}` });
        continue;
      }

      if (idleMs >= session.staleClientTimeoutMs) {
        logger.warn(
          `[ts-session-registry] Watchdog cliente sem heartbeat: key=${session.key} client=${client.clientId} idleMs=${idleMs} lastReason=${client.lastReason ?? 'none'}`,
        );
        staleClients.push({ clientId: client.clientId, reason: `watchdog-stale:${idleMs}ms` });
      }
    }

    for (const stale of staleClients) {
      this.removeClient(session.key, stale.clientId, stale.reason);
    }

    if (now - session.lastWatchdogLogAt >= session.watchdogIntervalMs * 3) {
      session.lastWatchdogLogAt = now;
      logger.info(
        `[ts-session-registry] Watchdog sessao: key=${session.key} kind=${session.kind} state=${session.state} clients=${session.clientCount} bufferHead=${session.buffer.getCurrentIndex()}`,
      );
      for (const client of session.clients.values()) {
        const snapshot = client.snapshot;
        logger.info(
          `[ts-session-registry] Watchdog cliente: key=${session.key} client=${client.clientId} idleMs=${now - client.lastHeartbeatAt} lastReason=${client.lastReason ?? 'none'} localIndex=${snapshot?.localIndex ?? -1} headIndex=${snapshot?.headIndex ?? session.buffer.getCurrentIndex()} writableLength=${snapshot?.writableLength ?? -1} socketBufferSize=${snapshot?.socketBufferSize ?? -1} needDrain=${snapshot?.writableNeedDrain ?? false} socketDestroyed=${snapshot?.socketDestroyed ?? false} socketWritable=${snapshot?.socketWritable ?? true} responseDestroyed=${snapshot?.responseDestroyed ?? false} responseEnded=${snapshot?.responseEnded ?? false} stopReason=${snapshot?.stopReason ?? 'null'}`,
        );
      }
    }
  }

  private normalizePositiveTimeout(value: number, fallback: number): number {
    const normalized = Math.trunc(value);
    return Number.isFinite(normalized) && normalized > 0 ? normalized : fallback;
  }
}

export const tsSessionRegistry = new TsSessionRegistry();
