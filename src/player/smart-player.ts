import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { ToolProfileManager, ResolvedToolProfile } from './tool-profile-manager';
import { hlsSessionRegistry, HlsSession } from './hls-session-registry';
import { resolveHlsProfile } from './hls-advanced-config';
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

const SESSION_INIT_TIMEOUT_MS = 45_000;
const MANIFEST_WAIT_POLL_MS = 250;
const LIVE_RESTART_BASE_MS = 1_000;
const LIVE_RESTART_MAX_MS = 20_000;
const LIVE_RESTART_JITTER_MS = 750;
const LIVE_STABLE_UPTIME_MS = 20_000;
const LIVE_UNAVAILABLE_COOLDOWN_MS = 5 * 60_000;
const PERMANENT_LIVE_SOURCE_ERROR_RE =
  /(this live event has ended|not made this video available in your country|video (is )?unavailable|private video|members[ -]?only|age[- ]restricted|sign in to confirm|no such video)/i;
const MANIFEST_PROGRESS_GRACE_MS: Record<HlsSession['kind'], number> = {
  live: 1_500,
  vod: 2_000,
  upcoming: 1_000,
};
const MANIFEST_PROGRESS_EXTENSION_MS: Record<HlsSession['kind'], number> = {
  live: 4_000,
  vod: 6_000,
  upcoming: 2_000,
};

interface ManifestPolicy {
  mode: 'fast-start' | 'warm-join';
  minSegments: number;
  startOffsetSeconds: number;
  timeoutMs: number;
  progressGraceMs: number;
  maxProgressExtensionMs: number;
}

export class SmartPlayer {
  private readonly statePath = path.join('/data', 'state_cache.json');
  private readonly textsPath = path.join('/data', 'textos_epg.json');
  private readonly toolProfiles = new ToolProfileManager();
  private readonly pendingInits = new Map<string, Promise<void>>();
  private readonly liveUnavailableUntil = new Map<string, { until: number; reason: string }>();

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

    const segmentPathRequested = path.resolve(session.dir, segmentName);
    const sessionDir = path.resolve(session.dir) + path.sep;
    if (!segmentPathRequested.startsWith(sessionDir)) {
      res.status(404).json({ error: 'Segmento HLS nao encontrado' });
      return;
    }

    let segmentPathToServe = segmentPathRequested;
    let segmentNameToServe = segmentName;
    if (!this.isExistingFile(segmentPathToServe)) {
      if (session.kind === 'live') {
        const fallback = this.resolveLiveSegmentFallback(session, segmentName);
        if (fallback) {
          segmentPathToServe = fallback.path;
          segmentNameToServe = fallback.segmentName;
          logger.warn(
            `[SmartPlayer] Segmento live ausente, aplicando fallback: key=${videoId} requested=${segmentName} requestedIndex=${fallback.requestedIndex ?? 'na'} served=${fallback.segmentName} servedIndex=${fallback.servedIndex} window=[${fallback.minIndex}..${fallback.maxIndex}] count=${fallback.count}`,
          );
        } else {
          logger.warn(`[SmartPlayer] Segmento live ausente sem fallback: key=${videoId} requested=${segmentName}`);
          res.status(404).json({ error: 'Segmento HLS nao encontrado' });
          return;
        }
      } else {
        res.status(404).json({ error: 'Segmento HLS nao encontrado' });
        return;
      }
    }

    hlsSessionRegistry.touch(videoId);
    if (session.firstSegmentServedAt === null) {
      session.firstSegmentServedAt = Date.now();
      logger.info(`[SmartPlayer] Primeiro segmento HLS servido: key=${videoId}`);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-HLS-Segment', segmentNameToServe);
    if (segmentNameToServe.endsWith('.ts')) {
      res.type('video/mp2t');
    } else if (segmentNameToServe.endsWith('.m3u8')) {
      res.type('application/vnd.apple.mpegurl');
    }
    res.sendFile(segmentPathToServe);
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
        setTimeout(() => reject(new Error(`Init timeout key=${key}`)), SESSION_INIT_TIMEOUT_MS);
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

    if (stream?.status === 'live') {
      const unavailableReason = this.getLiveUnavailableReason(videoId);
      if (unavailableReason) {
        throw new Error(`Live temporariamente indisponivel para key=${videoId}: ${unavailableReason}`);
      }
    } else {
      this.liveUnavailableUntil.delete(videoId);
    }

    let createdSession = false;
    try {
      if (!stream) {
        const placeholder = getConfig('PLACEHOLDER_IMAGE_URL');
        if (!placeholder) throw new Error('Stream nao encontrado e sem placeholder configurado');
        const session = hlsSessionRegistry.create(videoId, 'upcoming', resolveHlsProfile('upcoming'));
        createdSession = true;
        this.spawnPlaceholderSession(session, placeholder, ffProfile, undefined, undefined);
        return;
      }

      if (stream.status === 'upcoming') {
        const texts = this.readTextsCache()[videoId] ?? { line1: '', line2: '' };
        const image = stream.thumbnailUrl || getConfig('PLACEHOLDER_IMAGE_URL');
        if (!image) throw new Error('Sem thumbnail/placeholder para stream upcoming');
        const session = hlsSessionRegistry.create(videoId, 'upcoming', resolveHlsProfile('upcoming'));
        createdSession = true;
        this.spawnPlaceholderSession(session, image, ffProfile, texts.line1, texts.line2);
        return;
      }

      if (stream.status === 'live' && this.isGenuinelyLive(stream)) {
        const session = hlsSessionRegistry.create(videoId, 'live', resolveHlsProfile('live'));
        createdSession = true;
        this.spawnLiveSession(session, stream.watchUrl, slProfile, ytProfile);
        return;
      }

      const session = hlsSessionRegistry.create(videoId, 'vod', resolveHlsProfile('vod'));
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
      profile: session.profile,
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
      shuttingDown: boolean;
      source: ManagedProcess | null;
      writer: ManagedProcess | null;
      firstByteAt: number | null;
      restartAttempt: number;
      restartTimer: ReturnType<typeof setTimeout> | null;
      sourceKind: 'streamlink' | 'yt-dlp' | null;
      sourceStartedAt: number;
    } = {
      replacing: false,
      shuttingDown: false,
      source: null,
      writer: null,
      firstByteAt: null,
      restartAttempt: 0,
      restartTimer: null,
      sourceKind: null,
      sourceStartedAt: 0,
    };

    const clearRestartTimer = (): void => {
      if (!state.restartTimer) return;
      clearTimeout(state.restartTimer);
      state.restartTimer = null;
    };

    const maybeResetBackoffFromUptime = (): void => {
      if (!state.sourceStartedAt) return;
      if (Date.now() - state.sourceStartedAt >= LIVE_STABLE_UPTIME_MS) {
        state.restartAttempt = 0;
      }
    };

    const stopCurrentPipeline = async (): Promise<void> => {
      state.replacing = true;
      try {
        if (state.source) {
          await state.source.kill();
          state.source = null;
        }
        if (state.writer) {
          await state.writer.kill(3000);
          state.writer = null;
        }
        state.firstByteAt = null;
      } finally {
        state.replacing = false;
      }
    };

    const scheduleRestart = (reason: string): void => {
      if (state.shuttingDown || state.replacing || state.restartTimer) return;
      if (!hlsSessionRegistry.has(session.key)) return;

      state.restartAttempt += 1;
      const expBackoff = Math.min(
        LIVE_RESTART_MAX_MS,
        LIVE_RESTART_BASE_MS * 2 ** Math.min(state.restartAttempt - 1, 6),
      );
      const jitter = Math.floor(Math.random() * LIVE_RESTART_JITTER_MS);
      const delayMs = expBackoff + jitter;

      logger.warn(
        `[SmartPlayer] Live HLS agendando restart: key=${session.key} source=${state.sourceKind ?? 'unknown'} reason=${reason} attempt=${state.restartAttempt} delayMs=${delayMs}`,
      );
      state.restartTimer = setTimeout(() => {
        state.restartTimer = null;
        void restartCurrentSource(`timer:${reason}`);
      }, delayMs);
      state.restartTimer.unref();
    };

    const startYtDlpSource = async (trigger: string): Promise<void> => {
      clearRestartTimer();
      state.replacing = true;
      let shouldRetry = false;
      try {
        if (state.source) {
          await state.source.kill();
          state.source = null;
        }
        if (state.writer) {
          await state.writer.kill(3000);
          state.writer = null;
        }

        const urls = await resolveYtDlpUrls(url, yt.userAgent, yt.cookieFile, yt.flags, session.profile.vodResolveStrategy);
        if (!hlsSessionRegistry.has(session.key) || state.shuttingDown) return;

        state.sourceKind = 'yt-dlp';
        state.sourceStartedAt = Date.now();
        state.writer = startUrlsToHls({
          dir: session.dir,
          profile: session.profile,
          urls,
          userAgent: yt.userAgent,
          outputMode: 'live',
          paceInput: false,
          onExit: (code) => {
            if (state.replacing || state.shuttingDown) return;
            maybeResetBackoffFromUptime();
            scheduleRestart(`yt-dlp-exit-${code ?? 'null'}`);
          },
        });
        logger.info(
          `[SmartPlayer] Live HLS fonte yt-dlp iniciada: key=${session.key} trigger=${trigger} PID=${state.writer.pid}`,
        );
      } catch (err) {
        if (state.shuttingDown || !hlsSessionRegistry.has(session.key)) return;
        if (this.isPermanentLiveSourceError(err)) {
          const reason = this.normalizeLiveSourceError(err);
          this.markLiveUnavailable(session.key, reason);
          logger.error(
            `[SmartPlayer] Live indisponivel (erro permanente), encerrando sessao: key=${session.key} trigger=${trigger} err=${reason}`,
          );
          state.shuttingDown = true;
          clearRestartTimer();
          void hlsSessionRegistry.destroy(session.key, 'live-source-unavailable');
          return;
        }
        logger.error(`[SmartPlayer] Falha ao iniciar fonte yt-dlp live HLS: key=${session.key} trigger=${trigger} err=${err}`);
        shouldRetry = true;
      } finally {
        state.replacing = false;
      }
      if (shouldRetry) scheduleRestart('yt-dlp-start-error');
    };

    const startStreamlinkSource = async (trigger: string): Promise<void> => {
      clearRestartTimer();
      state.replacing = true;
      try {
        if (state.source) {
          await state.source.kill();
          state.source = null;
        }
        if (state.writer) {
          await state.writer.kill(3000);
          state.writer = null;
        }

        if (!hlsSessionRegistry.has(session.key) || state.shuttingDown) return;

        state.sourceKind = 'streamlink';
        state.sourceStartedAt = Date.now();
        state.firstByteAt = null;

        state.writer = startPipeToHls({
          dir: session.dir,
          profile: session.profile,
          onExit: (code) => {
            if (state.replacing || state.shuttingDown) return;
            maybeResetBackoffFromUptime();
            scheduleRestart(`streamlink-writer-exit-${code ?? 'null'}`);
          },
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
            try {
              if (state.writer?.stdin && !state.writer.stdin.destroyed && state.writer.stdin.writable) {
                state.writer.stdin.write(chunk);
              }
            } catch { /* noop */ }
          },
          onExit: (code) => {
            if (state.replacing || state.shuttingDown) return;
            const hasOutput = state.firstByteAt !== null;
            maybeResetBackoffFromUptime();

            if (code !== 0 && !hasOutput && hlsSessionRegistry.has(session.key)) {
              logger.warn(
                `[SmartPlayer] Streamlink falhou sem output HLS, fallback yt-dlp: key=${session.key} code=${code}`,
              );
              void startYtDlpSource('streamlink-no-output');
              return;
            }

            scheduleRestart(`streamlink-exit-${code ?? 'null'}`);
          },
        });

        logger.info(
          `[SmartPlayer] Live HLS fonte streamlink iniciada: key=${session.key} trigger=${trigger} streamlinkPid=${state.source.pid} writerPid=${state.writer.pid}`,
        );
      } finally {
        state.replacing = false;
      }
    };

    const restartCurrentSource = async (trigger: string): Promise<void> => {
      if (state.shuttingDown || !hlsSessionRegistry.has(session.key)) return;
      if (session.profile.liveSourcePriority === 'yt-dlp-first') {
        await startYtDlpSource(trigger);
        return;
      }
      if (state.sourceKind === 'yt-dlp') {
        await startYtDlpSource(trigger);
        return;
      }
      await startStreamlinkSource(trigger);
    };

    hlsSessionRegistry.setKillFn(session.key, async () => {
      state.shuttingDown = true;
      clearRestartTimer();
      await stopCurrentPipeline();
    });

    if (session.profile.liveSourcePriority === 'yt-dlp-first') {
      logger.info(`[SmartPlayer] Live HLS configurado para yt-dlp primeiro: key=${session.key}`);
      void startYtDlpSource('initial');
      return;
    }

    void startStreamlinkSource('initial');
  }

  private async spawnVodSession(
    session: HlsSession,
    url: string,
    yt: ResolvedToolProfile,
  ): Promise<void> {
    const urls = await resolveYtDlpUrls(url, yt.userAgent, yt.cookieFile, yt.flags, session.profile.vodResolveStrategy);
    let procRef: ManagedProcess | null = null;

    hlsSessionRegistry.setKillFn(session.key, async () => {
      if (procRef) await procRef.kill(3000);
    });

    procRef = startUrlsToHls({
      dir: session.dir,
      profile: session.profile,
      urls,
      userAgent: yt.userAgent,
      paceInput: session.profile.vodPaceInput,
      onExit: (code) => {
        if (code === 0) {
          this.finalizeVodManifest(session.manifestPath);
          logger.info(`[SmartPlayer] VOD HLS concluido: key=${session.key}`);
          return;
        }
        void hlsSessionRegistry.destroy(session.key, `vod-exit-${code ?? 'null'}`);
      },
    });

    logger.info(`[SmartPlayer] VOD HLS iniciado: key=${session.key} PID=${procRef.pid}`);
  }

  private async readPlaylist(session: HlsSession, videoId: string): Promise<string> {
    const startedAt = Date.now();
    const policy = this.resolveManifestPolicy(session);
    let bestSegments = session.lastKnownSegmentCount;
    let deadlineAt = startedAt + policy.timeoutMs;
    const maxDeadlineAt = deadlineAt + policy.maxProgressExtensionMs;

    while (Date.now() < deadlineAt) {
      if (fs.existsSync(session.manifestPath) && fs.statSync(session.manifestPath).size > 0) {
        const raw = fs.readFileSync(session.manifestPath, 'utf-8');
        const segmentLines = this.extractSegmentLines(raw);
        this.updateSessionWarmState(session, segmentLines.length);

        if (segmentLines.length > bestSegments) {
          bestSegments = segmentLines.length;
          deadlineAt = Math.min(maxDeadlineAt, Math.max(deadlineAt, Date.now() + policy.progressGraceMs));
        }

        if (segmentLines.length >= policy.minSegments) {
          const playlist = this.rewritePlaylist(raw, videoId, policy.startOffsetSeconds);
          this.markManifestServed(session, policy, segmentLines.length);
          return playlist;
        }
      }

      await new Promise(resolve => setTimeout(resolve, MANIFEST_WAIT_POLL_MS));
    }

    logger.warn(
      `[SmartPlayer] Manifesto indisponivel: key=${videoId} kind=${session.kind} mode=${policy.mode} bestSegments=${bestSegments} lastKnown=${session.lastKnownSegmentCount} waitedMs=${Date.now() - startedAt} timeoutMs=${policy.timeoutMs} extendedMaxMs=${policy.maxProgressExtensionMs}`,
    );
    throw new Error(`Manifesto HLS indisponivel para key=${videoId}`);
  }

  private resolveManifestPolicy(session: HlsSession): ManifestPolicy {
    if (session.firstManifestServedAt !== null && session.warmAt !== null) {
      return {
        mode: 'warm-join',
        minSegments: session.profile.minReadySegments,
        startOffsetSeconds: session.profile.startOffsetSeconds,
        timeoutMs: session.profile.manifestTimeoutMs,
        progressGraceMs: 0,
        maxProgressExtensionMs: 0,
      };
    }

    return {
      mode: 'fast-start',
      minSegments: this.resolveFastStartMinSegments(session),
      startOffsetSeconds: this.resolveFastStartOffsetSeconds(session),
      timeoutMs: session.profile.manifestTimeoutMs,
      progressGraceMs: MANIFEST_PROGRESS_GRACE_MS[session.kind] ?? 0,
      maxProgressExtensionMs: MANIFEST_PROGRESS_EXTENSION_MS[session.kind] ?? 0,
    };
  }

  private resolveFastStartMinSegments(session: HlsSession): number {
    if (session.kind === 'upcoming') return 1;
    if (session.kind === 'vod') return Math.max(1, session.profile.minReadySegments - 2);
    return Math.max(2, session.profile.minReadySegments - 2);
  }

  private resolveFastStartOffsetSeconds(session: HlsSession): number {
    if (session.kind === 'vod' || session.kind === 'upcoming') return 0;
    if (session.profile.startOffsetSeconds >= 0) return 0;
    return Math.min(-2, Math.ceil(session.profile.startOffsetSeconds / 2));
  }

  private resolveWarmThreshold(session: HlsSession): number {
    if (session.kind === 'upcoming') return 2;
    if (session.kind === 'vod') return Math.max(2, session.profile.minReadySegments);
    return Math.max(3, session.profile.minReadySegments);
  }

  private updateSessionWarmState(session: HlsSession, segmentCount: number): void {
    session.lastKnownSegmentCount = Math.max(session.lastKnownSegmentCount, segmentCount);
    if (session.warmAt !== null) return;
    if (segmentCount < this.resolveWarmThreshold(session)) return;

    session.warmAt = Date.now();
    logger.info(
      `[SmartPlayer] Sessao HLS aquecida: key=${session.key} kind=${session.kind} segments=${segmentCount}`,
    );
  }

  private markManifestServed(session: HlsSession, policy: ManifestPolicy, segmentCount: number): void {
    if (session.kind === 'live') this.liveUnavailableUntil.delete(session.key);
    session.manifestServeCount += 1;
    if (session.firstManifestServedAt !== null) return;

    session.firstManifestServedAt = Date.now();
    logger.info(
      `[SmartPlayer] Primeiro manifesto HLS servido: key=${session.key} mode=${policy.mode} segments=${segmentCount} timeoutMs=${policy.timeoutMs} startOffset=${policy.startOffsetSeconds}`,
    );
  }

  private rewritePlaylist(playlist: string, videoId: string, startOffsetSeconds: number): string {
    const prefix = `/api/stream/${encodeURIComponent(videoId)}`;
    const rewritten = playlist
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return line;
        return `${prefix}/${trimmed}`;
      })
      .join('\n');

    if (startOffsetSeconds < 0) {
      return this.injectStartOffset(rewritten, startOffsetSeconds);
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

  private finalizeVodManifest(manifestPath: string): void {
    try {
      if (!fs.existsSync(manifestPath)) return;
      const raw = fs.readFileSync(manifestPath, 'utf-8');
      if (raw.includes('#EXT-X-ENDLIST')) return;
      fs.writeFileSync(manifestPath, `${raw.trimEnd()}\n#EXT-X-ENDLIST\n`, 'utf-8');
    } catch (err) {
      logger.warn(`[SmartPlayer] Falha ao finalizar manifesto VOD: ${err}`);
    }
  }

  private isGenuinelyLive(stream: CacheStream): boolean {
    return stream.status === 'live' && !!stream.actualStart && !stream.actualEnd;
  }

  private isExistingFile(filePath: string): boolean {
    try {
      return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
    } catch {
      return false;
    }
  }

  private parseSegmentIndex(segmentName: string): number | null {
    const match = /^segment_(\d+)\.ts$/i.exec(segmentName);
    if (!match) return null;
    const parsed = Number(match[1]);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private resolveLiveSegmentFallback(
    session: HlsSession,
    requestedSegmentName: string,
  ): { path: string; segmentName: string; requestedIndex: number | null; servedIndex: number; minIndex: number; maxIndex: number; count: number } | null {
    if (!fs.existsSync(session.manifestPath)) return null;

    let raw = '';
    try {
      raw = fs.readFileSync(session.manifestPath, 'utf-8');
    } catch {
      return null;
    }
    if (!raw.trim()) return null;

    const requestedIndex = this.parseSegmentIndex(requestedSegmentName);
    const candidates = this.extractSegmentLines(raw)
      .map((segmentName) => ({ segmentName, index: this.parseSegmentIndex(segmentName) }))
      .filter((entry): entry is { segmentName: string; index: number } => entry.index !== null)
      .sort((a, b) => a.index - b.index);

    if (candidates.length === 0) return null;

    const minIndex = candidates[0].index;
    const maxIndex = candidates[candidates.length - 1].index;
    let chosen = candidates[0];
    if (requestedIndex !== null) {
      chosen = candidates.find((entry) => entry.index >= requestedIndex) ?? candidates[candidates.length - 1];
    }

    const fallbackPath = path.resolve(session.dir, chosen.segmentName);
    const sessionDir = path.resolve(session.dir) + path.sep;
    if (!fallbackPath.startsWith(sessionDir) || !this.isExistingFile(fallbackPath)) return null;

    return {
      path: fallbackPath,
      segmentName: chosen.segmentName,
      requestedIndex,
      servedIndex: chosen.index,
      minIndex,
      maxIndex,
      count: candidates.length,
    };
  }

  private normalizeLiveSourceError(err: unknown): string {
    if (err instanceof Error) return err.message || String(err);
    return String(err);
  }

  private isPermanentLiveSourceError(err: unknown): boolean {
    return PERMANENT_LIVE_SOURCE_ERROR_RE.test(this.normalizeLiveSourceError(err));
  }

  private getLiveUnavailableReason(videoId: string): string | null {
    const state = this.liveUnavailableUntil.get(videoId);
    if (!state) return null;
    if (Date.now() >= state.until) {
      this.liveUnavailableUntil.delete(videoId);
      return null;
    }
    return state.reason;
  }

  private markLiveUnavailable(videoId: string, reason: string): void {
    const normalizedReason = reason.replace(/\s+/g, ' ').trim().slice(0, 220) || 'source-unavailable';
    const until = Date.now() + LIVE_UNAVAILABLE_COOLDOWN_MS;
    this.liveUnavailableUntil.set(videoId, { until, reason: normalizedReason });
    logger.warn(
      `[SmartPlayer] Live marcado como indisponivel por ${Math.floor(LIVE_UNAVAILABLE_COOLDOWN_MS / 1000)}s: key=${videoId} reason=${normalizedReason}`,
    );
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
