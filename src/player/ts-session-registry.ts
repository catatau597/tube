import { getConfigNumber } from '../core/config-manager';
import { logger } from '../core/logger';
import { ManagedProcess } from './process-manager';
import { TsStreamBuffer, TsStreamBufferOptions } from './ts-stream-buffer';

const DEFAULT_IDLE_TIMEOUT_MS = 45_000;

export type TsSessionKind = 'live' | 'vod' | 'upcoming';
export type TsSessionState = 'initializing' | 'active' | 'stopping' | 'stopped' | 'error';

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
  destroyPromise: Promise<void> | null;
  onDestroy: ((session: TsSession, reason: string) => Promise<void> | void) | null;
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
    const idleTimeoutMs = this.normalizeTimeout(
      options.idleTimeoutMs ?? getConfigNumber('TS_PROXY_IDLE_TIMEOUT_MS', DEFAULT_IDLE_TIMEOUT_MS),
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
      destroyPromise: null,
      onDestroy: options.onDestroy ?? null,
    };

    this.sessions.set(session.key, session);
    this.scheduleIdleTimer(session);

    logger.info(
      `[ts-session-registry] Sessao criada: key=${session.key} kind=${session.kind} idleTimeoutMs=${session.idleTimeoutMs}`,
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

  addClient(key: string): TsSession | null {
    const session = this.sessions.get(key);
    if (!session) return null;

    session.clientCount += 1;
    this.refreshActivity(session);

    logger.info(`[ts-session-registry] Cliente entrou: key=${key} clients=${session.clientCount} state=${session.state}`);
    return session;
  }

  removeClient(key: string): TsSession | null {
    const session = this.sessions.get(key);
    if (!session) return null;

    session.clientCount = Math.max(0, session.clientCount - 1);
    this.refreshActivity(session);

    logger.info(`[ts-session-registry] Cliente saiu: key=${key} clients=${session.clientCount} state=${session.state}`);

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

  private refreshActivity(session: ManagedTsSession): void {
    session.lastAccessAt = Date.now();
    this.clearIdleTimer(session);
    if (session.clientCount === 0 && !session.destroyPromise) {
      this.scheduleIdleTimer(session);
    }
  }

  private normalizeTimeout(value: number): number {
    const normalized = Math.trunc(value);
    return Number.isFinite(normalized) && normalized > 0 ? normalized : DEFAULT_IDLE_TIMEOUT_MS;
  }
}

export const tsSessionRegistry = new TsSessionRegistry();
