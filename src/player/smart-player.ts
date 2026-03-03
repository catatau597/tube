import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { getConfig } from '../core/config-manager';
import { logger } from '../core/logger';
import { TsClientStream } from './ts-client-stream';
import { TsSessionClientSnapshot, TsSessionKind, tsSessionRegistry } from './ts-session-registry';
import { TsSourceManager } from './ts-source-manager';

interface CacheStream {
  videoId: string;
  watchUrl: string;
  thumbnailUrl: string;
  status: 'live' | 'upcoming' | 'none';
  actualStart: string | null;
  actualEnd: string | null;
}

interface CacheFile {
  streams: Record<string, CacheStream>;
}

const INIT_STREAM_TIMEOUT_MS = 15_000;

export class SmartPlayer {
  private readonly statePath = path.join('/data', 'state_cache.json');
  private readonly textsPath = path.join('/data', 'textos_epg.json');
  private readonly tsSourceManager = new TsSourceManager();

  private readonly pendingTsInits = new Map<string, Promise<void>>();

  async serveVideo(videoId: string, req: Request, res: Response): Promise<void> {
    const key = videoId;
    const stream = this.readStateCache().streams[videoId];

    if (!stream) {
      logger.warn(`[SmartPlayer] Stream nao encontrado: key=${key}`);
      if (!res.writableEnded) {
        res.status(404).json({ error: 'Stream nao encontrado' });
      }
      return;
    }

    const kind = this.resolveKind(stream);
    await this.serveBufferedVideo(key, videoId, kind, stream, req, res);
  }

  getThumbnailUrl(videoId: string): string | null {
    const stream = this.readStateCache().streams[videoId];
    return stream?.thumbnailUrl || getConfig('PLACEHOLDER_IMAGE_URL') || null;
  }

  private async serveBufferedVideo(
    key: string,
    videoId: string,
    kind: TsSessionKind,
    stream: CacheStream,
    req: Request,
    res: Response,
  ): Promise<void> {
    if (tsSessionRegistry.has(key)) {
      logger.info(`[SmartPlayer] Sessao TS ativa, conectando cliente: key=${key} kind=${kind}`);
      await this.subscribeBufferedClient(key, req, res);
      return;
    }

    if (this.pendingTsInits.has(key)) {
      logger.info(`[SmartPlayer] Init TS em andamento, aguardando: key=${key}`);
      const ready = await this.waitForPendingInit(key);
      if (!ready) {
        if (!res.writableEnded) res.status(503).end();
        return;
      }
      await this.subscribeBufferedClient(key, req, res);
      return;
    }

    const initPromise = this.initBufferedSession(key, videoId, kind, stream);
    this.pendingTsInits.set(key, initPromise.catch(() => { /* absorbed */ }));

    let timer: ReturnType<typeof setTimeout> | null = null;
    try {
      await Promise.race([
        initPromise,
        new Promise<never>((_, reject) => {
          timer = setTimeout(() => reject(new Error('TS init timeout')), INIT_STREAM_TIMEOUT_MS);
        }),
      ]);
    } catch (error) {
      logger.warn(`[SmartPlayer] Init TS timeout/failure: key=${key} err=${String(error)}`);
      if (!tsSessionRegistry.has(key) && !res.writableEnded) {
        res.status(503).end();
      }
      return;
    } finally {
      if (timer) clearTimeout(timer);
      this.pendingTsInits.delete(key);
    }

    if (!tsSessionRegistry.has(key)) {
      if (!res.writableEnded) res.status(503).end();
      return;
    }

    await this.subscribeBufferedClient(key, req, res);
  }

  private async waitForPendingInit(key: string): Promise<boolean> {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let timedOut = false;

    try {
      await Promise.race([
        this.pendingTsInits.get(key)!,
        new Promise<never>((_, reject) => {
          timer = setTimeout(() => reject(new Error('TS init timeout')), INIT_STREAM_TIMEOUT_MS);
        }),
      ]);
    } catch (error) {
      timedOut = true;
      logger.warn(`[SmartPlayer] Timeout aguardando init TS: key=${key} err=${String(error)}`);
    } finally {
      if (timer) clearTimeout(timer);
    }

    if (tsSessionRegistry.has(key)) return true;

    if (timedOut && this.pendingTsInits.has(key)) {
      logger.warn(`[SmartPlayer] Init TS ainda em andamento apos timeout, aguardando janela de graca: key=${key}`);
      try {
        await Promise.race([
          this.pendingTsInits.get(key)!,
          new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('TS init grace timeout')), 5_000);
          }),
        ]);
      } catch (error) {
        logger.warn(`[SmartPlayer] Janela de graca TS expirada: key=${key} err=${String(error)}`);
      }
    }

    return tsSessionRegistry.has(key);
  }

  private async initBufferedSession(
    key: string,
    videoId: string,
    kind: TsSessionKind,
    stream: CacheStream,
  ): Promise<void> {
    const session = tsSessionRegistry.getOrCreate({ key, kind });

    try {
      if (kind === 'upcoming') {
        const texts = this.readTextsCache()[videoId] ?? { line1: '', line2: '' };
        const imageUrl = stream.thumbnailUrl || getConfig('PLACEHOLDER_IMAGE_URL');
        if (!imageUrl) {
          throw new Error(`Sem thumbnail/placeholder para stream upcoming key=${key}`);
        }

        await this.tsSourceManager.startSource({
          session,
          kind,
          imageUrl,
          textLine1: texts.line1,
          textLine2: texts.line2,
        });
        return;
      }

      await this.tsSourceManager.startSource({
        session,
        kind,
        watchUrl: stream.watchUrl,
      });
    } catch (error) {
      logger.error(`[SmartPlayer] Falha ao iniciar sessao TS: key=${key} kind=${kind} err=${String(error)}`);
      tsSessionRegistry.setState(key, 'error');
      await tsSessionRegistry.destroy(key, 'init-error');
      throw error;
    }
  }

  private async subscribeBufferedClient(key: string, req: Request, res: Response): Promise<void> {
    if (res.writableEnded || res.destroyed) return;

    res.setHeader('Content-Type', 'video/mp2t');

    const clientId = this.createClientId();
    const session = tsSessionRegistry.addClient(key, clientId);
    if (!session) {
      logger.warn(`[SmartPlayer] Sessao TS nao encontrada ao conectar cliente: key=${key}`);
      if (!res.writableEnded) res.status(503).end();
      return;
    }

    let lastSnapshot: TsSessionClientSnapshot | null = null;
    const client = new TsClientStream({
      clientId,
      session,
      onStateChange: (snapshot, reason) => {
        lastSnapshot = snapshot;
        tsSessionRegistry.heartbeatClient(key, clientId, snapshot, reason);
      },
    });

    let cleaned = false;
    const cleanup = (reason: string): void => {
      if (cleaned) return;
      cleaned = true;
      logger.info(
        `[SmartPlayer] Cleanup cliente TS: key=${key} client=${clientId} reason=${reason} resEnded=${res.writableEnded} resDestroyed=${res.destroyed} writableLength=${res.writableLength ?? 0} reqAborted=${req.aborted ?? false} socketDestroyed=${req.socket?.destroyed ?? false} socketWritable=${req.socket?.writable ?? true} lastStopReason=${lastSnapshot?.stopReason ?? 'null'} lastLocalIndex=${lastSnapshot?.localIndex ?? -1} lastHeadIndex=${lastSnapshot?.headIndex ?? -1}`,
      );
      client.stop(reason);
      tsSessionRegistry.removeClient(key, clientId, reason);
    };

    const sockets = new Set<NodeJS.EventEmitter>();
    const registerSocket = (socket: NodeJS.EventEmitter | null | undefined, prefix: string): void => {
      if (!socket || sockets.has(socket)) return;
      sockets.add(socket);
      socket.once('close', () => {
        logger.info(`[SmartPlayer] Evento cliente TS: key=${key} client=${clientId} event=${prefix}-close`);
        cleanup(`${prefix}-close`);
      });
      socket.once('error', () => {
        logger.warn(`[SmartPlayer] Evento cliente TS: key=${key} client=${clientId} event=${prefix}-error`);
        cleanup(`${prefix}-error`);
      });
    };

    res.once('close', () => {
      logger.info(`[SmartPlayer] Evento cliente TS: key=${key} client=${clientId} event=res-close`);
      cleanup('res-close');
    });
    res.once('finish', () => {
      logger.info(`[SmartPlayer] Evento cliente TS: key=${key} client=${clientId} event=res-finish`);
      cleanup('res-finish');
    });
    res.once('error', () => {
      logger.warn(`[SmartPlayer] Evento cliente TS: key=${key} client=${clientId} event=res-error`);
      cleanup('res-error');
    });
    req.once('close', () => {
      logger.info(`[SmartPlayer] Evento cliente TS: key=${key} client=${clientId} event=req-close`);
      cleanup('req-close');
    });
    req.once('aborted', () => {
      logger.warn(`[SmartPlayer] Evento cliente TS: key=${key} client=${clientId} event=req-aborted`);
      cleanup('req-aborted');
    });

    registerSocket(req.socket, 'req-socket');
    registerSocket(res.socket, 'res-socket');

    try {
      await client.pipeToResponse(res);
    } finally {
      cleanup('stream-finally');
    }
  }

  private resolveKind(stream: CacheStream): TsSessionKind {
    if (stream.status === 'upcoming') return 'upcoming';
    if (stream.status === 'live' && this.isGenuinelyLive(stream)) return 'live';
    return 'vod';
  }

  private createClientId(): string {
    return `tsc_${Date.now()}_${Math.floor(Math.random() * 10_000)}`;
  }

  private isGenuinelyLive(stream: CacheStream): boolean {
    return stream.status === 'live' && !!stream.actualStart && !stream.actualEnd;
  }

  private readStateCache(): CacheFile {
    if (!fs.existsSync(this.statePath)) return { streams: {} };
    try {
      const parsed = JSON.parse(fs.readFileSync(this.statePath, 'utf-8')) as CacheFile;
      return parsed?.streams ? parsed : { streams: {} };
    } catch {
      return { streams: {} };
    }
  }

  private readTextsCache(): Record<string, { line1: string; line2: string }> {
    if (!fs.existsSync(this.textsPath)) return {};
    try {
      return JSON.parse(fs.readFileSync(this.textsPath, 'utf-8')) as Record<string, { line1: string; line2: string }>;
    } catch {
      return {};
    }
  }
}
