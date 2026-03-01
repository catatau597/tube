import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { ToolProfileManager, ResolvedToolProfile } from './tool-profile-manager';
import { streamRegistry } from './stream-registry';
import { startFfmpegPlaceholder } from './ffmpeg-runner';
import { streamlinkHasPlayableStream, startStreamlink } from './streamlink-runner';
import { resolveYtDlpUrls, startYtDlpFfmpeg } from './ytdlp-runner';
import { ManagedProcess } from './process-manager';
import { getConfig } from '../core/config-manager';
import { logger } from '../core/logger';

interface CacheStream {
  videoId:     string;
  watchUrl:    string;
  thumbnailUrl: string;
  status:      'live' | 'upcoming' | 'none';
  actualStart: string | null;
  actualEnd:   string | null;
}

interface CacheFile {
  streams: Record<string, CacheStream>;
}

export class SmartPlayer {
  private readonly statePath = path.join('/data', 'state_cache.json');
  private readonly textsPath = path.join('/data', 'textos_epg.json');
  private readonly toolProfiles = new ToolProfileManager();

  /**
   * Guards against duplicate process spawns when two clients request the
   * same stream simultaneously during the initialization window.
   */
  private readonly pendingInits = new Map<string, Promise<void>>();

  async serveVideo(videoId: string, req: Request, res: Response): Promise<void> {
    const key = videoId;

    // ── Fast path: stream already running ────────────────────────────────────
    if (streamRegistry.has(key)) {
      logger.info(`[SmartPlayer] Stream ativo, subscrevendo cliente: key=${key}`);
      this.subscribeClient(key, req, res);
      return;
    }

    // ── Init in progress: wait then subscribe ────────────────────────────────
    if (this.pendingInits.has(key)) {
      logger.info(`[SmartPlayer] Init em andamento, aguardando: key=${key}`);
      await this.pendingInits.get(key);
      if (streamRegistry.has(key)) {
        this.subscribeClient(key, req, res);
      } else {
        if (!res.writableEnded) res.status(503).end();
      }
      return;
    }

    // ── Cold start ───────────────────────────────────────────────────────────
    const initPromise = this.initStream(key, videoId, req, res);
    this.pendingInits.set(key, initPromise.catch(() => { /* absorbed */ }));
    try {
      await initPromise;
    } finally {
      this.pendingInits.delete(key);
    }
  }

  getThumbnailUrl(videoId: string): string | null {
    const stream = this.readStateCache().streams[videoId];
    return stream?.thumbnailUrl || getConfig('PLACEHOLDER_IMAGE_URL') || null;
  }

  // ─── Private: orchestration ───────────────────────────────────────────────

  private async initStream(
    key: string,
    videoId: string,
    req: Request,
    firstClient: Response,
  ): Promise<void> {
    const slProfile = this.toolProfiles.resolveProfile('streamlink');
    const ytProfile = this.toolProfiles.resolveProfile('yt-dlp');
    const ffProfile = this.toolProfiles.resolveProfile('ffmpeg');

    const cache  = this.readStateCache();
    const stream = cache.streams[videoId];
    logger.info(`[SmartPlayer] Init: key=${key} status=${stream?.status ?? 'não encontrado'}`);

    if (!stream) {
      const placeholder = getConfig('PLACEHOLDER_IMAGE_URL');
      if (!placeholder) {
        firstClient.status(404).json({ error: 'Stream não encontrado e sem placeholder configurado' });
        return;
      }
      this.spawnPlaceholder(key, placeholder, ffProfile, undefined, undefined, req, firstClient);
      return;
    }

    if (stream.status === 'upcoming') {
      const texts = this.readTextsCache()[videoId] ?? { line1: '', line2: '' };
      const image = stream.thumbnailUrl || getConfig('PLACEHOLDER_IMAGE_URL');
      if (!image) {
        firstClient.status(404).json({ error: 'Sem thumbnail/placeholder para stream upcoming' });
        return;
      }
      this.spawnPlaceholder(key, image, ffProfile, texts.line1, texts.line2, req, firstClient);
      return;
    }

    if (stream.status === 'live' && this.isGenuinelyLive(stream)) {
      logger.info(`[SmartPlayer] Testando streamlink: key=${key}`);
      const playable = await streamlinkHasPlayableStream(
        stream.watchUrl, slProfile.userAgent, slProfile.cookieFile, slProfile.flags,
      );
      if (playable) {
        this.spawnStreamlink(key, stream.watchUrl, slProfile, req, firstClient);
        return;
      }
      logger.info(`[SmartPlayer] Streamlink indisponível, usando yt-dlp: key=${key}`);
    }

    await this.spawnYtDlp(key, stream.watchUrl, ytProfile, ffProfile, req, firstClient);
  }

  // ─── Private: spawn helpers ───────────────────────────────────────────────

  private spawnPlaceholder(
    key: string,
    imageUrl: string,
    ff: ResolvedToolProfile,
    textLine1: string | undefined,
    textLine2: string | undefined,
    req: Request,
    firstClient: Response,
  ): void {
    let resolveProc!: (p: ManagedProcess) => void;
    const procPromise = new Promise<ManagedProcess>(r => { resolveProc = r; });

    streamRegistry.create(key, async () => {
      const proc = await procPromise;
      await proc.kill();
    });

    if (!this.subscribeClient(key, req, firstClient)) return;

    const proc = startFfmpegPlaceholder({
      imageUrl,
      userAgent:  ff.userAgent,
      extraFlags: ff.flags,
      textLine1,
      textLine2,
      onData: (chunk) => streamRegistry.broadcast(key, chunk),
      onExit: ()      => void streamRegistry.kill(key),
    });
    resolveProc(proc);
    logger.info(`[SmartPlayer] Placeholder iniciado: key=${key} PID=${proc.pid}`);
  }

  private spawnStreamlink(
    key: string,
    url: string,
    sl: ResolvedToolProfile,
    req: Request,
    firstClient: Response,
  ): void {
    let resolveProc!: (p: ManagedProcess) => void;
    const procPromise = new Promise<ManagedProcess>(r => { resolveProc = r; });

    streamRegistry.create(key, async () => {
      const proc = await procPromise;
      await proc.kill();
    });

    if (!this.subscribeClient(key, req, firstClient)) return;

    const proc = startStreamlink({
      url,
      userAgent:  sl.userAgent,
      cookieFile: sl.cookieFile,
      extraFlags: sl.flags,
      onData: (chunk) => streamRegistry.broadcast(key, chunk),
      onExit: ()      => void streamRegistry.kill(key),
    });
    resolveProc(proc);
    logger.info(`[SmartPlayer] Streamlink iniciado: key=${key} PID=${proc.pid}`);
  }

  private async spawnYtDlp(
    key: string,
    url: string,
    yt: ResolvedToolProfile,
    ff: ResolvedToolProfile,
    req: Request,
    firstClient: Response,
  ): Promise<void> {
    let urls: string[];
    try {
      urls = await resolveYtDlpUrls(url, yt.userAgent, yt.cookieFile, yt.flags);
    } catch (err) {
      logger.error(`[SmartPlayer] Falha na resolução yt-dlp: ${err}`);
      if (!firstClient.writableEnded) {
        firstClient.status(502).json({ error: 'Falha ao resolver URL do stream' });
      }
      return;
    }

    let resolveProc!: (p: ManagedProcess) => void;
    const procPromise = new Promise<ManagedProcess>(r => { resolveProc = r; });

    streamRegistry.create(key, async () => {
      const proc = await procPromise;
      await proc.kill();
    });

    if (!this.subscribeClient(key, req, firstClient)) return;

    const proc = startYtDlpFfmpeg({
      urls,
      userAgent:        yt.userAgent,
      extraFfmpegFlags: ff.flags,
      onData: (chunk) => streamRegistry.broadcast(key, chunk),
      onExit: ()      => void streamRegistry.kill(key),
    });
    resolveProc(proc);
    logger.info(`[SmartPlayer] yt-dlp→ffmpeg iniciado: key=${key} PID=${proc.pid}`);
  }

  // ─── Private: subscribe helper ────────────────────────────────────────────

  /**
   * Wires all disconnect listeners and registers the client with the session.
   *
   * Three complementary signals — no single one fires reliably in all cases:
   *  1. res.on('close')  — Express finalizes the response
   *  2. res.on('error')  — EPIPE / ECONNRESET on write
   *  3. req.on('close')  — HTTP connection dropped (most reliable for VLC
   *                         which doesn’t send TCP FIN on stop)
   *
   * Returns false if the session no longer exists (killed between
   * create() and subscribeClient()), so callers can abort.
   */
  private subscribeClient(key: string, req: Request, res: Response): boolean {
    res.setHeader('Content-Type', 'video/mp2t');
    const added = streamRegistry.addClient(key, res);
    if (!added) {
      logger.warn(`[SmartPlayer] Sessão não encontrada ao subscrever cliente: key=${key}`);
      if (!res.writableEnded) res.status(503).end();
      return false;
    }
    const unsub = () => streamRegistry.removeClient(key, res);
    res.on('close', unsub);
    res.on('error', unsub);
    req.on('close', unsub);
    return true;
  }

  // ─── Private: cache readers ───────────────────────────────────────────────

  private isGenuinelyLive(stream: CacheStream): boolean {
    return stream.status === 'live' && !!stream.actualStart && !stream.actualEnd;
  }

  private readStateCache(): CacheFile {
    if (!fs.existsSync(this.statePath)) return { streams: {} };
    try {
      const parsed = JSON.parse(fs.readFileSync(this.statePath, 'utf-8')) as CacheFile;
      return parsed?.streams ? parsed : { streams: {} };
    } catch { return { streams: {} }; }
  }

  private readTextsCache(): Record<string, { line1: string; line2: string }> {
    if (!fs.existsSync(this.textsPath)) return {};
    try {
      return JSON.parse(fs.readFileSync(this.textsPath, 'utf-8')) as Record<string, { line1: string; line2: string }>;
    } catch { return {}; }
  }
}
