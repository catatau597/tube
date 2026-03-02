import fs from 'fs';
import path from 'path';
import { logger } from '../core/logger';

export type HlsSessionKind = 'live' | 'vod' | 'upcoming';

export interface HlsSession {
  key: string;
  kind: HlsSessionKind;
  dir: string;
  manifestPath: string;
  createdAt: number;
  lastAccessAt: number;
  killFn: (() => Promise<void>) | null;
  destroyed: boolean;
}

const HLS_ROOT_DIR = path.join('/tmp', 'tubewranglerr-hls');
const SESSION_IDLE_TIMEOUT_MS = 45_000;
const SESSION_SWEEP_INTERVAL_MS = 10_000;

function sanitizeKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9_-]/g, '_');
}

class HlsSessionRegistry {
  private readonly sessions = new Map<string, HlsSession>();
  private readonly sweepTimer: ReturnType<typeof setInterval>;

  constructor() {
    fs.mkdirSync(HLS_ROOT_DIR, { recursive: true });
    this.sweepTimer = setInterval(() => {
      void this.sweepIdleSessions();
    }, SESSION_SWEEP_INTERVAL_MS);
    this.sweepTimer.unref();
  }

  has(key: string): boolean {
    return this.sessions.has(key);
  }

  get(key: string): HlsSession | undefined {
    return this.sessions.get(key);
  }

  create(key: string, kind: HlsSessionKind): HlsSession {
    const existing = this.sessions.get(key);
    if (existing) return existing;

    const dir = path.join(HLS_ROOT_DIR, sanitizeKey(key));
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });

    const session: HlsSession = {
      key,
      kind,
      dir,
      manifestPath: path.join(dir, 'index.m3u8'),
      createdAt: Date.now(),
      lastAccessAt: Date.now(),
      killFn: null,
      destroyed: false,
    };

    this.sessions.set(key, session);
    logger.info(`[hls-session] Sessao criada: key=${key} kind=${kind} dir=${dir}`);
    return session;
  }

  setKillFn(key: string, killFn: () => Promise<void>): void {
    const session = this.sessions.get(key);
    if (!session || session.destroyed) return;
    session.killFn = killFn;
  }

  touch(key: string): void {
    const session = this.sessions.get(key);
    if (!session || session.destroyed) return;
    session.lastAccessAt = Date.now();
  }

  async destroy(key: string, reason = 'unknown'): Promise<void> {
    const session = this.sessions.get(key);
    if (!session || session.destroyed) return;
    session.destroyed = true;
    this.sessions.delete(key);

    logger.info(`[hls-session] Sessao destruida: key=${key} reason=${reason}`);

    if (session.killFn) {
      try {
        await session.killFn();
      } catch (err) {
        logger.warn(`[hls-session] Erro ao encerrar sessao key=${key}: ${err}`);
      }
    }

    try {
      fs.rmSync(session.dir, { recursive: true, force: true });
    } catch (err) {
      logger.warn(`[hls-session] Erro ao remover diretorio key=${key}: ${err}`);
    }
  }

  private async sweepIdleSessions(): Promise<void> {
    const now = Date.now();
    const idleKeys: string[] = [];

    for (const session of this.sessions.values()) {
      if (session.destroyed) continue;
      if (now - session.lastAccessAt >= SESSION_IDLE_TIMEOUT_MS) idleKeys.push(session.key);
    }

    for (const key of idleKeys) {
      await this.destroy(key, 'idle-timeout');
    }
  }
}

export const hlsSessionRegistry = new HlsSessionRegistry();
