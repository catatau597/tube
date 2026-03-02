import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { ToolProfileManager, ResolvedToolProfile } from './tool-profile-manager';
import { hlsSessionRegistry, HlsSession } from './hls-session-registry';
import { startPlaceholderToHls, startPipeToHls, startUrlsToHls } from './hls-runner';
import { startStreamlink } from './streamlink-runner';
import { resolveYtDlpUrls } from './ytdlp-runner';
import { ManagedProcess } from './process-manager';
import { getConfig } from '../core/config-manager';
import { logger } from '../core/logger';

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
const MANIFEST_WAIT_POLL_MS = 250;
const MIN_READY_SEGMENTS: Record<HlsSession['kind'], number> = {
  live: 4,
  vod: 4,
  upcoming: 4,
};

export class SmartPlayer {
  private readonly statePath = path.join('/data', 'state_cache.json');
  private readonly textsPath = path.join('/data', 'textos_epg.json');
  private readonly toolProfiles = new ToolProfileManager();
  private readonly pendingInits = new Map<string, Promise<void>>();

  async serveVideo(videoId: string, _req: Request, res: Response): Promise<void> {
    const session = await this.ensureSession(videoId);
    const playlist = await this.readPlaylist(session, videoId);

    hlsSessionRegistry.touch(videoId);
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(playlist);
  }

  async serveSegment(videoId: string, segmentName: string, res: Response): Promise<void> {
    const session = hlsSessionRegistry.get(videoId);
    if (!session) {
      res.status(404).json({ error: 'Sessao HLS nao encontrada' });
      return;
    }

    const segmentPath = path.resolve(session.dir, segmentName);
    const sessionDir = path.resolve(session.dir) + path.sep;
    if (!segmentPath.startsWith(sessionDir) || !fs.existsSync(segmentPath) || !fs.statSync(segmentPath).isFile()) {
      res.status(404).json({ error: 'Segmento HLS nao encontrado' });
      return;
    }

    hlsSessionRegistry.touch(videoId);
    res.setHeader('Cache-Control', 'no-cache');
    if (segmentName.endsWith('.ts')) {
      res.type('video/mp2t');
    } else if (segmentName.endsWith('.m3u8')) {
      res.type('application/vnd.apple.mpegurl');
    }
    res.sendFile(segmentPath);
  }

  getThumbnailUrl(videoId: string): string | null {
    const stream = this.readStateCache().streams[videoId];
    return stream?.thumbnailUrl || getConfig('PLACEHOLDER_IMAGE_URL') || null;
  }

  private async ensureSession(videoId: string): Promise<HlsSession> {
    if (hlsSessionRegistry.has(videoId)) {
      hlsSessionRegistry.touch(videoId);
      return hlsSessionRegistry.get(videoId)!;
    }

    if (this.pendingInits.has(videoId)) {
      await this.waitForInit(videoId, this.pendingInits.get(videoId)!);
      const session = hlsSessionRegistry.get(videoId);
      if (!session) throw new Error(`Sessao HLS nao criada para key=${videoId}`);
      return session;
    }

    const initPromise = this.initSession(videoId);
    this.pendingInits.set(videoId, initPromise);
    try {
      await this.waitForInit(videoId, initPromise);
    } finally {
      this.pendingInits.delete(videoId);
    }

    const session = hlsSessionRegistry.get(videoId);
    if (!session) throw new Error(`Sessao HLS nao criada para key=${videoId}`);
    return session;
  }

  private async waitForInit(key: string, initPromise: Promise<void>): Promise<void> {
    await Promise.race([
      initPromise,
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(`Init timeout key=${key}`)), INIT_STREAM_TIMEOUT_MS);
      }),
    ]);
  }

  private async initSession(videoId: string): Promise<void> {
    const slProfile = this.toolProfiles.resolveProfile('streamlink');
    const ytProfile = this.toolProfiles.resolveProfile('yt-dlp');
    const ffProfile = this.toolProfiles.resolveProfile('ffmpeg');

    const cache = this.readStateCache();
    const stream = cache.streams[videoId];
    logger.info(`[SmartPlayer] Init HLS: key=${videoId} status=${stream?.status ?? 'nao encontrado'}`);

    let createdSession = false;
    try {
      if (!stream) {
        const placeholder = getConfig('PLACEHOLDER_IMAGE_URL');
        if (!placeholder) throw new Error('Stream nao encontrado e sem placeholder configurado');
        const session = hlsSessionRegistry.create(videoId, 'upcoming');
        createdSession = true;
        this.spawnPlaceholderSession(session, placeholder, ffProfile, undefined, undefined);
        return;
      }

      if (stream.status === 'upcoming') {
        const texts = this.readTextsCache()[videoId] ?? { line1: '', line2: '' };
        const image = stream.thumbnailUrl || getConfig('PLACEHOLDER_IMAGE_URL');
        if (!image) throw new Error('Sem thumbnail/placeholder para stream upcoming');
        const session = hlsSessionRegistry.create(videoId, 'upcoming');
        createdSession = true;
        this.spawnPlaceholderSession(session, image, ffProfile, texts.line1, texts.line2);
        return;
      }

      if (stream.status === 'live' && this.isGenuinelyLive(stream)) {
        const session = hlsSessionRegistry.create(videoId, 'live');
        createdSession = true;
        this.spawnLiveSession(session, stream.watchUrl, slProfile, ytProfile);
        return;
      }

      const session = hlsSessionRegistry.create(videoId, 'vod');
      createdSession = true;
      await this.spawnVodSession(session, stream.watchUrl, ytProfile);
    } catch (err) {
      if (createdSession && hlsSessionRegistry.has(videoId)) {
        await hlsSessionRegistry.destroy(videoId, 'init-error');
      }
      throw err;
    }
  }

  private spawnPlaceholderSession(
    session: HlsSession,
    imageUrl: string,
    ff: ResolvedToolProfile,
    textLine1: string | undefined,
    textLine2: string | undefined,
  ): void {
    let procRef: ManagedProcess | null = null;

    hlsSessionRegistry.setKillFn(session.key, async () => {
      if (procRef) await procRef.kill(5000);
    });

    procRef = startPlaceholderToHls({
      dir: session.dir,
      imageUrl,
      userAgent: ff.userAgent,
      textLine1,
      textLine2,
      onExit: () => {
        void hlsSessionRegistry.destroy(session.key, 'placeholder-exit');
      },
    });

    logger.info(`[SmartPlayer] Placeholder HLS iniciado: key=${session.key} PID=${procRef.pid}`);
  }

  private spawnLiveSession(
    session: HlsSession,
    url: string,
    sl: ResolvedToolProfile,
    yt: ResolvedToolProfile,
  ): void {
    const state: {
      replacing: boolean;
      source: ManagedProcess | null;
      writer: ManagedProcess | null;
      firstByteAt: number | null;
    } = {
      replacing: false,
      source: null,
      writer: null,
      firstByteAt: null,
    };

    const ensureWriter = (): ManagedProcess => {
      if (state.writer) return state.writer;
      state.writer = startPipeToHls({
        dir: session.dir,
        onExit: () => {
          if (!state.replacing) {
            void hlsSessionRegistry.destroy(session.key, 'live-writer-exit');
          }
        },
      });
      return state.writer;
    };

    hlsSessionRegistry.setKillFn(session.key, async () => {
      state.replacing = true;
      if (state.source) await state.source.kill();
      if (state.writer) await state.writer.kill(3000);
      state.replacing = false;
    });

    const startedAt = Date.now();
    state.source = startStreamlink({
      url,
      userAgent: sl.userAgent,
      cookieFile: sl.cookieFile,
      extraFlags: sl.flags,
      onData: (chunk) => {
        if (state.firstByteAt === null) {
          state.firstByteAt = Date.now();
          logger.info(`[SmartPlayer] Streamlink primeiro byte HLS: key=${session.key} t=${state.firstByteAt - startedAt}ms`);
        }

        const writer = ensureWriter();
        try {
          if (writer.stdin && !writer.stdin.destroyed && writer.stdin.writable) writer.stdin.write(chunk);
        } catch { /* noop */ }
      },
      onExit: (code) => {
        const hasOutput = state.firstByteAt !== null;
        if (code !== 0 && !hasOutput && hlsSessionRegistry.has(session.key)) {
          logger.warn(`[SmartPlayer] Streamlink falhou sem output HLS, fallback yt-dlp: key=${session.key} code=${code}`);
          void this.switchLiveSessionToYtDlp(session, url, yt, state);
          return;
        }

        if (state.writer?.stdin && !state.writer.stdin.destroyed) {
          try { state.writer.stdin.end(); } catch { /* noop */ }
        } else {
          void hlsSessionRegistry.destroy(session.key, 'live-source-exit');
        }
      },
    });

    logger.info(`[SmartPlayer] Streamlink HLS iniciado: key=${session.key} PID=${state.source.pid}`);
  }

  private async switchLiveSessionToYtDlp(
    session: HlsSession,
    url: string,
    yt: ResolvedToolProfile,
    state: {
      replacing: boolean;
      source: ManagedProcess | null;
      writer: ManagedProcess | null;
      firstByteAt: number | null;
    },
  ): Promise<void> {
    state.replacing = true;
    try {
      if (state.writer) {
        await state.writer.kill(3000);
        state.writer = null;
      }
      this.clearSessionDir(session.dir);

      const urls = await resolveYtDlpUrls(url, yt.userAgent, yt.cookieFile, yt.flags);
      if (!hlsSessionRegistry.has(session.key)) return;

      state.writer = startUrlsToHls({
        dir: session.dir,
        urls,
        userAgent: yt.userAgent,
        paceInput: false,
        onExit: () => {
          if (!state.replacing) {
            void hlsSessionRegistry.destroy(session.key, 'live-fallback-exit');
          }
        },
      });

      hlsSessionRegistry.setKillFn(session.key, async () => {
        state.replacing = true;
        if (state.source) await state.source.kill();
        if (state.writer) await state.writer.kill(3000);
        state.replacing = false;
      });

      logger.info(`[SmartPlayer] Live HLS fallback yt-dlp iniciado: key=${session.key} PID=${state.writer.pid}`);
    } catch (err) {
      logger.error(`[SmartPlayer] Falha no fallback live->yt-dlp HLS: key=${session.key} err=${err}`);
      await hlsSessionRegistry.destroy(session.key, 'live-fallback-error');
    } finally {
      state.replacing = false;
    }
  }

  private async spawnVodSession(
    session: HlsSession,
    url: string,
    yt: ResolvedToolProfile,
  ): Promise<void> {
    const urls = await resolveYtDlpUrls(url, yt.userAgent, yt.cookieFile, yt.flags);
    let procRef: ManagedProcess | null = null;

    hlsSessionRegistry.setKillFn(session.key, async () => {
      if (procRef) await procRef.kill(3000);
    });

    procRef = startUrlsToHls({
      dir: session.dir,
      urls,
      userAgent: yt.userAgent,
      paceInput: false,
      onExit: () => {
        void hlsSessionRegistry.destroy(session.key, 'vod-exit');
      },
    });

    logger.info(`[SmartPlayer] VOD HLS iniciado: key=${session.key} PID=${procRef.pid}`);
  }

  private async readPlaylist(session: HlsSession, videoId: string): Promise<string> {
    const startedAt = Date.now();
    const minSegments = MIN_READY_SEGMENTS[session.kind] ?? 3;
    while (Date.now() - startedAt < INIT_STREAM_TIMEOUT_MS) {
      if (fs.existsSync(session.manifestPath) && fs.statSync(session.manifestPath).size > 0) {
        const raw = fs.readFileSync(session.manifestPath, 'utf-8');
        const segmentLines = this.extractSegmentLines(raw);
        if (segmentLines.length >= minSegments) {
          return this.rewritePlaylist(raw, videoId, session.kind);
        }
      }
      await new Promise(resolve => setTimeout(resolve, MANIFEST_WAIT_POLL_MS));
    }

    throw new Error(`Manifesto HLS indisponivel para key=${videoId}`);
  }

  private rewritePlaylist(playlist: string, videoId: string, kind: HlsSession['kind']): string {
    const prefix = `/api/stream/${encodeURIComponent(videoId)}`;
    const rewritten = playlist
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return line;
        return `${prefix}/${trimmed}`;
      })
      .join('\n');

    if (kind === 'live' || kind === 'upcoming') {
      return this.injectStartOffset(rewritten, -8);
    }

    return rewritten;
  }

  private injectStartOffset(playlist: string, offsetSeconds: number): string {
    if (playlist.includes('#EXT-X-START:')) return playlist;
    const lines = playlist.split('\n');
    const insertAt = lines.findIndex((line) => line.startsWith('#EXT-X-TARGETDURATION'));
    if (insertAt === -1) return playlist;

    lines.splice(insertAt + 1, 0, `#EXT-X-START:TIME-OFFSET=${offsetSeconds.toFixed(1)},PRECISE=NO`);
    return lines.join('\n');
  }

  private extractSegmentLines(playlist: string): string[] {
    return playlist
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => !!line && !line.startsWith('#'));
  }

  private clearSessionDir(dir: string): void {
    try {
      for (const entry of fs.readdirSync(dir)) {
        fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
      }
    } catch { /* noop */ }
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
