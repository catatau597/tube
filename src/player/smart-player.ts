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
   * same stream simultaneously during the initialization window
   * (e.g. the ~2s yt-dlp URL resolution phase).
   */
  private readonly pendingInits = new Map<string, Promise<void>>();

  async serveVideo(videoId: string, _req: Request, res: Response): Promise<void> {
    const key = videoId;

    // ── Fast path: stream already running ────────────────────────────────────
    if (streamRegistry.has(key)) {
      logger.info(`[SmartPlayer] Stream ativo, subscrevendo cliente: key=${key}`);
      this.subscribeClient(key, res);
      return;
    }

    // ── Init in progress: wait then subscribe ────────────────────────────────
    if (this.pendingInits.has(key)) {
      logger.info(`[SmartPlayer] Init em andamento, aguardando: key=${key}`);
      await this.pendingInits.get(key);
      if (streamRegistry.has(key)) {
        this.subscribeClient(key, res);
      } else {
        if (!res.writableEnded) res.status(503).end();
      }
      return;
    }

    // ── Cold start ───────────────────────────────────────────────────────────
    const initPromise = this.initStream(key, videoId, res);
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

  private async initStream(key: string, videoId: string, firstClient: Response): Promise<void> {
    const slProfile = this.toolProfiles.resolveProfile('streamlink');
    const ytProfile = this.toolProfiles.resolveProfile('yt-dlp');
    const ffProfile = this.toolProfiles.resolveProfile('ffmpeg');

    const cache  = this.readStateCache();
    const stream = cache.streams[videoId];
    logger.info(`[SmartPlayer] Init: key=${key} status=${stream?.status ?? 'não encontrado'}`);

    // ── No stream found → generic placeholder ────────────────────────────────
    if (!stream) {
      const placeholder = getConfig('PLACEHOLDER_IMAGE_URL');
      if (!placeholder) {
        firstClient.status(404).json({ error: 'Stream não encontrado e sem placeholder configurado' });
        return;
      }
      this.spawnPlaceholder(key, placeholder, ffProfile, undefined, undefined, firstClient);
      return;
    }

    // ── Upcoming → placeholder with schedule text ────────────────────────────
    if (stream.status === 'upcoming') {
      const texts = this.readTextsCache()[videoId] ?? { line1: '', line2: '' };
      const image = stream.thumbnailUrl || getConfig('PLACEHOLDER_IMAGE_URL');
      if (!image) {
        firstClient.status(404).json({ error: 'Sem thumbnail/placeholder para stream upcoming' });
        return;
      }
      this.spawnPlaceholder(key, image, ffProfile, texts.line1, texts.line2, firstClient);
      return;
    }

    // ── Live → try streamlink first, fallback to yt-dlp ─────────────────────
    if (stream.status === 'live' && this.isGenuinelyLive(stream)) {
      logger.info(`[SmartPlayer] Testando streamlink: key=${key}`);
      const playable = await streamlinkHasPlayableStream(
        stream.watchUrl, slProfile.userAgent, slProfile.cookieFile, slProfile.flags,
      );
      if (playable) {
        this.spawnStreamlink(key, stream.watchUrl, slProfile, firstClient);
        return;
      }
      logger.info(`[SmartPlayer] Streamlink indisponível, usando yt-dlp: key=${key}`);
    }

    // ── status=none or live without genuine stream → yt-dlp ──────────────────
    await this.spawnYtDlp(key, stream.watchUrl, ytProfile, ffProfile, firstClient);
  }

  // ─── Private: spawn helpers ───────────────────────────────────────────────

  /**
   * Registers the session and first client.
   *
   * Pattern used by all spawn helpers:
   *   1. streamRegistry.create(key, killFn)   — killFn is a closure over `proc`
   *   2. subscribeClient(key, firstClient)    — adds client to session
   *   3. spawn the process                    — assigns `proc` in the closure
   *
   * The closure captures `proc` by reference. Because killFn is only ever
   * called asynchronously (on client disconnect or watchdog), `proc` is
   * guaranteed to be assigned before killFn executes.
   */
  private spawnPlaceholder(
    key: string,
    imageUrl: string,
    ff: ResolvedToolProfile,
    textLine1: string | undefined,
    textLine2: string | undefined,
    firstClient: Response,
  ): void {
    let proc: ManagedProcess;
    streamRegistry.create(key, async () => { if (proc) await proc.kill(); });
    this.subscribeClient(key, firstClient);

    proc = startFfmpegPlaceholder({
      imageUrl,
      userAgent:  ff.userAgent,
      extraFlags: ff.flags,
      textLine1,
      textLine2,
      onData: (chunk) => streamRegistry.broadcast(key, chunk),
      onExit: ()      => void streamRegistry.kill(key),
    });
    logger.info(`[SmartPlayer] Placeholder iniciado: key=${key} PID=${proc.pid}`);
  }

  private spawnStreamlink(
    key: string,
    url: string,
    sl: ResolvedToolProfile,
    firstClient: Response,
  ): void {
    let proc: ManagedProcess;
    streamRegistry.create(key, async () => { if (proc) await proc.kill(); });
    this.subscribeClient(key, firstClient);

    proc = startStreamlink({
      url,
      userAgent:  sl.userAgent,
      cookieFile: sl.cookieFile,
      extraFlags: sl.flags,
      onData: (chunk) => streamRegistry.broadcast(key, chunk),
      onExit: ()      => void streamRegistry.kill(key),
    });
    logger.info(`[SmartPlayer] Streamlink iniciado: key=${key} PID=${proc.pid}`);
  }

  private async spawnYtDlp(
    key: string,
    url: string,
    yt: ResolvedToolProfile,
    ff: ResolvedToolProfile,
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

    let proc: ManagedProcess;
    streamRegistry.create(key, async () => { if (proc) await proc.kill(); });
    this.subscribeClient(key, firstClient);

    proc = startYtDlpFfmpeg({
      urls,
      userAgent:       yt.userAgent,
      extraFfmpegFlags: ff.flags,
      onData: (chunk) => streamRegistry.broadcast(key, chunk),
      onExit: ()      => void streamRegistry.kill(key),
    });
    logger.info(`[SmartPlayer] yt-dlp→ffmpeg iniciado: key=${key} PID=${proc.pid}`);
  }

  // ─── Private: subscribe helper ────────────────────────────────────────────

  private subscribeClient(key: string, res: Response): void {
    res.setHeader('Content-Type', 'video/mp2t');
    streamRegistry.addClient(key, res);
    const unsub = () => streamRegistry.removeClient(key, res);
    res.on('close', unsub);
    res.on('error', unsub);
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
