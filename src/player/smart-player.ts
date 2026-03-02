import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { ToolProfileManager, ResolvedToolProfile } from './tool-profile-manager';
import { streamRegistry } from './stream-registry';
import { startFfmpegPlaceholder } from './ffmpeg-runner';
import { startStreamlink } from './streamlink-runner';
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

/**
 * Tempo maximo (ms) para initStream() completar (subir processo + subscrever
 * primeiro cliente). Se exceder, retorna 503 ao cliente em vez de travar.
 */
const INIT_STREAM_TIMEOUT_MS = 15_000;

export class SmartPlayer {
  private readonly statePath = path.join('/data', 'state_cache.json');
  private readonly textsPath = path.join('/data', 'textos_epg.json');
  private readonly toolProfiles = new ToolProfileManager();

  private readonly pendingInits = new Map<string, Promise<void>>();

  async serveVideo(videoId: string, req: Request, res: Response): Promise<void> {
    const key = videoId;

    if (streamRegistry.has(key)) {
      logger.info(`[SmartPlayer] Stream ativo, subscrevendo cliente: key=${key}`);
      this.subscribeClient(key, req, res);
      return;
    }

    if (this.pendingInits.has(key)) {
      logger.info(`[SmartPlayer] Init em andamento, aguardando: key=${key}`);
      let timer1: ReturnType<typeof setTimeout> | null = null;
      let timedOut = false;
      try {
        await Promise.race([
          this.pendingInits.get(key)!,
          new Promise<never>((_, reject) => {
            timer1 = setTimeout(() => reject(new Error('Init timeout')), INIT_STREAM_TIMEOUT_MS);
          }),
        ]);
      } catch (err) {
        timedOut = true;
        logger.warn(`[SmartPlayer] Timeout aguardando init: key=${key} err=${err}`);
      } finally {
        if (timer1 !== null) clearTimeout(timer1);
      }

      if (streamRegistry.has(key)) {
        this.subscribeClient(key, req, res);
      } else if (timedOut && this.pendingInits.has(key)) {
        logger.warn(`[SmartPlayer] Init ainda em andamento apos timeout, aguardando janela de graca: key=${key}`);
        try {
          await Promise.race([
            this.pendingInits.get(key)!,
            new Promise<never>((_, reject) => {
              setTimeout(() => reject(new Error('Init grace timeout')), 5_000);
            }),
          ]);
        } catch (err) {
          logger.warn(`[SmartPlayer] Janela de graca expirada: key=${key} err=${err}`);
        }
        if (streamRegistry.has(key)) {
          this.subscribeClient(key, req, res);
        } else if (!res.writableEnded) {
          res.status(503).end();
        }
      } else {
        if (!res.writableEnded) res.status(503).end();
      }
      return;
    }

    const initPromise = this.initStream(key, videoId, req, res);
    this.pendingInits.set(key, initPromise.catch(() => { /* absorbed */ }));
    let timer2: ReturnType<typeof setTimeout> | null = null;
    try {
      await Promise.race([
        initPromise,
        new Promise<never>((_, reject) => {
          timer2 = setTimeout(() => reject(new Error('Init timeout')), INIT_STREAM_TIMEOUT_MS);
        }),
      ]);
    } catch (err) {
      logger.warn(`[SmartPlayer] Init timeout: key=${key} err=${err}`);
      if (!streamRegistry.has(key) && !res.writableEnded) res.status(503).end();
    } finally {
      if (timer2 !== null) clearTimeout(timer2);
      this.pendingInits.delete(key);
    }
  }

  getThumbnailUrl(videoId: string): string | null {
    const stream = this.readStateCache().streams[videoId];
    return stream?.thumbnailUrl || getConfig('PLACEHOLDER_IMAGE_URL') || null;
  }

  // --- Private: orchestration -----------------------------------------------

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
    logger.info(`[SmartPlayer] Init: key=${key} status=${stream?.status ?? 'nao encontrado'}`);

    if (!stream) {
      const placeholder = getConfig('PLACEHOLDER_IMAGE_URL');
      if (!placeholder) {
        firstClient.status(404).json({ error: 'Stream nao encontrado e sem placeholder configurado' });
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
      // Sem probe: a probe usa --stream-url que tem comportamento diferente do
      // --stdout real, gerando falsos positivos e negativos.
      logger.info(`[SmartPlayer] Iniciando streamlink diretamente: key=${key}`);
      this.spawnStreamlink(key, stream.watchUrl, slProfile, ytProfile, ffProfile, req, firstClient);
      return;
    }

    await this.spawnYtDlp(key, stream.watchUrl, ytProfile, ffProfile, req, firstClient);
  }

  // --- Private: spawn helpers -----------------------------------------------

  private spawnPlaceholder(
    key: string,
    imageUrl: string,
    ff: ResolvedToolProfile,
    textLine1: string | undefined,
    textLine2: string | undefined,
    req: Request,
    firstClient: Response,
  ): void {
    let procRef: ManagedProcess | null = null;

    streamRegistry.create(key, async () => {
      if (procRef) await procRef.kill(5000);
    });

    if (!this.subscribeClient(key, req, firstClient)) {
      void streamRegistry.kill(key);
      return;
    }

    const proc = startFfmpegPlaceholder({
      imageUrl,
      userAgent:  ff.userAgent,
      extraFlags: ff.flags,
      textLine1,
      textLine2,
      onData: (chunk) => streamRegistry.broadcast(key, chunk),
      onExit: ()      => void streamRegistry.kill(key),
    });
    procRef = proc;
    streamRegistry.setFlowControl(key, {
      pause: () => proc.pauseOutput(),
      resume: () => proc.resumeOutput(),
    });
    logger.info(`[SmartPlayer] Placeholder iniciado: key=${key} PID=${proc.pid}`);
  }

  /**
   * Inicia streamlink como fonte principal.
   *
   * Se streamlink falhar antes de entregar o primeiro byte util (ex: 400 Bad
   * Request do youtubei/v1/player), aciona fallback automatico para yt-dlp
   * sem derrubar a sessao nem os clientes ja conectados.
   */
  private spawnStreamlink(
    key: string,
    url: string,
    sl: ResolvedToolProfile,
    yt: ResolvedToolProfile,
    ff: ResolvedToolProfile,
    req: Request,
    firstClient: Response,
  ): void {
    const procHolder: { current: ManagedProcess | null } = { current: null };

    streamRegistry.create(key, async () => {
      if (procHolder.current) await procHolder.current.kill();
    });

    if (!this.subscribeClient(key, req, firstClient)) {
      void streamRegistry.kill(key);
      return;
    }

    const startTime = Date.now();
    let firstByteAt: number | null = null;
    const proc = startStreamlink({
      url,
      userAgent:  sl.userAgent,
      cookieFile: sl.cookieFile,
      extraFlags: sl.flags,
      onData: (chunk) => {
        if (firstByteAt === null) {
          firstByteAt = Date.now();
          logger.info(`[SmartPlayer] Streamlink primeiro byte: key=${key} t=${firstByteAt - startTime}ms`);
        }
        streamRegistry.broadcast(key, chunk);
      },
      onExit: (code) => {
        const elapsed = Date.now() - startTime;
        const hasStreamOutput = firstByteAt !== null;
        const shouldFallback = code !== 0 && !hasStreamOutput && streamRegistry.has(key);

        if (shouldFallback) {
          logger.warn(
            `[SmartPlayer] Streamlink falhou sem output (${elapsed}ms, code=${code}), iniciando fallback yt-dlp: key=${key}`,
          );
          procHolder.current = null;
          void this.switchToYtDlp(key, url, yt, ff, procHolder);
        } else {
          void streamRegistry.kill(key);
        }
      },
    });
    procHolder.current = proc;
    streamRegistry.setFlowControl(key, {
      pause: () => proc.pauseOutput(),
      resume: () => proc.resumeOutput(),
    });
    logger.info(`[SmartPlayer] Streamlink iniciado: key=${key} PID=${proc.pid}`);
  }

  /**
   * Fallback: substitui o streamlink por yt-dlp na sessao existente.
   * Clientes conectados continuam sem reconectar.
   */
  private async switchToYtDlp(
    key: string,
    url: string,
    yt: ResolvedToolProfile,
    ff: ResolvedToolProfile,
    procHolder: { current: ManagedProcess | null },
  ): Promise<void> {
    let urls: string[];
    try {
      urls = await resolveYtDlpUrls(url, yt.userAgent, yt.cookieFile, yt.flags);
    } catch (err) {
      logger.error(`[SmartPlayer] Fallback yt-dlp: falha na resolucao de URL: ${err}`);
      void streamRegistry.kill(key);
      return;
    }

    if (!streamRegistry.has(key)) {
      logger.info(`[SmartPlayer] Fallback yt-dlp abortado: sessao ja encerrada: key=${key}`);
      return;
    }

    const proc = startYtDlpFfmpeg({
      urls,
      userAgent:        yt.userAgent,
      extraFfmpegFlags: ff.flags,
      paceInput: false,
      onData: (chunk) => streamRegistry.broadcast(key, chunk),
      onExit: ()      => void streamRegistry.kill(key),
    });
    procHolder.current = proc;
    streamRegistry.setFlowControl(key, {
      pause: () => proc.pauseOutput(),
      resume: () => proc.resumeOutput(),
    });
    logger.info(`[SmartPlayer] Fallback yt-dlp->ffmpeg iniciado: key=${key} PID=${proc.pid}`);
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
      logger.error(`[SmartPlayer] Falha na resolucao yt-dlp: ${err}`);
      if (!firstClient.writableEnded) {
        firstClient.status(502).json({ error: 'Falha ao resolver URL do stream' });
      }
      return;
    }

    let procRef: ManagedProcess | null = null;

    streamRegistry.create(key, async () => {
      if (procRef) await procRef.kill(3000);
    });

    if (!this.subscribeClient(key, req, firstClient)) {
      void streamRegistry.kill(key);
      return;
    }

    const proc = startYtDlpFfmpeg({
      urls,
      userAgent:        yt.userAgent,
      extraFfmpegFlags: ff.flags,
      paceInput: true,
      onData: (chunk) => streamRegistry.broadcast(key, chunk),
      onExit: ()      => void streamRegistry.kill(key),
    });
    procRef = proc;
    streamRegistry.setFlowControl(key, {
      pause: () => proc.pauseOutput(),
      resume: () => proc.resumeOutput(),
    });
    logger.info(`[SmartPlayer] yt-dlp->ffmpeg iniciado: key=${key} PID=${proc.pid}`);
  }

  // --- Private: subscribe helper --------------------------------------------

  private subscribeClient(key: string, req: Request, res: Response): boolean {
    if (res.writableEnded || res.destroyed) return false;
    res.setHeader('Content-Type', 'video/mp2t');
    const added = streamRegistry.addClient(key, res);
    if (!added) {
      logger.warn(`[SmartPlayer] Sessao nao encontrada ao subscrever cliente: key=${key}`);
      if (!res.writableEnded) res.status(503).end();
      return false;
    }
    const unsub = () => streamRegistry.removeClient(key, res);
    res.on('close', unsub);
    res.on('error', unsub);
    req.on('close', unsub);
    return true;
  }

  // --- Private: cache readers -----------------------------------------------

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
