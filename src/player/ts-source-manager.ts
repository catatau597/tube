import { logger } from '../core/logger';
import { startFfmpegPlaceholder, startFfmpegTsNormalizer } from './ffmpeg-runner';
import { ManagedProcess } from './process-manager';
import { TsSession, TsSessionKind, tsSessionRegistry } from './ts-session-registry';
import { startStreamlinkProcess } from './streamlink-runner';
import { ToolProfileManager } from './tool-profile-manager';
import { resolveYtDlpUrls, startYtDlpFfmpeg } from './ytdlp-runner';

const LIVE_STREAMLINK_NO_FIRST_BYTE_TIMEOUT_MS = 5_000;
const LIVE_FALLBACK_RESTART_DELAY_MS = 1_000;
const LIVE_FALLBACK_MAX_RESTARTS = 5;
const LIVE_FALLBACK_RESTART_WINDOW_MS = 60_000;

export interface StartTsSourceOptions {
  session: TsSession;
  kind: TsSessionKind;
  watchUrl?: string;
  imageUrl?: string;
  textLine1?: string;
  textLine2?: string;
}

export class TsSourceManager {
  private readonly toolProfiles = new ToolProfileManager();

  async startSource(options: StartTsSourceOptions): Promise<void> {
    if (options.session.sourceProcess) {
      logger.info(
        `[ts-source-manager] Origem reutilizada: key=${options.session.key} kind=${options.session.kind} pid=${options.session.sourceProcess.pid ?? 'null'}`,
      );
      return;
    }

    switch (options.kind) {
      case 'vod':
        await this.startVodSource(options);
        return;
      case 'upcoming':
        this.startUpcomingSource(options);
        return;
      case 'live':
        this.startLiveSource(options);
        return;
      default: {
        const exhaustiveCheck: never = options.kind;
        throw new Error(`Kind de sessao nao suportado: ${String(exhaustiveCheck)}`);
      }
    }
  }

  private startUpcomingSource(options: StartTsSourceOptions): void {
    if (!options.imageUrl) {
      throw new Error(`Placeholder sem imageUrl para key=${options.session.key}`);
    }

    const ffProfile = this.toolProfiles.resolveProfile('ffmpeg');
    const proc = startFfmpegPlaceholder({
      imageUrl: options.imageUrl,
      userAgent: ffProfile.userAgent,
      extraFlags: ffProfile.flags,
      textLine1: options.textLine1,
      textLine2: options.textLine2,
      onData: (chunk) => options.session.buffer.append(chunk),
      onExit: () => {
        logger.info(`[ts-source-manager] Origem finalizada: key=${options.session.key} kind=upcoming`);
        void tsSessionRegistry.destroy(options.session.key, 'source-exit');
      },
    });

    this.activateSessionSource(options.session, proc, 'upcoming');
  }

  private async startVodSource(options: StartTsSourceOptions): Promise<void> {
    if (!options.watchUrl) {
      throw new Error(`VOD sem watchUrl para key=${options.session.key}`);
    }

    const ytProfile = this.toolProfiles.resolveProfile('yt-dlp');
    const ffProfile = this.toolProfiles.resolveProfile('ffmpeg');

    const urls = await resolveYtDlpUrls(
      options.watchUrl,
      ytProfile.userAgent,
      ytProfile.cookieFile,
      ytProfile.flags,
    );

    const proc = startYtDlpFfmpeg({
      urls,
      userAgent: ytProfile.userAgent,
      extraFfmpegFlags: ffProfile.flags,
      paceInput: true,
      onData: (chunk) => options.session.buffer.append(chunk),
      onExit: () => {
        logger.info(`[ts-source-manager] Origem finalizada: key=${options.session.key} kind=vod`);
        void tsSessionRegistry.destroy(options.session.key, 'source-exit');
      },
    });

    this.activateSessionSource(options.session, proc, 'vod');
  }

  private startLiveSource(options: StartTsSourceOptions): void {
    if (!options.watchUrl) {
      throw new Error(`Live sem watchUrl para key=${options.session.key}`);
    }

    const streamlinkProfile = this.toolProfiles.resolveProfile('streamlink');
    const ffProfile = this.toolProfiles.resolveProfile('ffmpeg');
    let streamlinkBytes = 0;
    let fallbackInProgress = false;
    let fallbackActivated = false;
    let finalized = false;
    let noFirstByteTimer: ReturnType<typeof setTimeout> | null = null;
    let streamlink: ManagedProcess;
    let fallbackRestartWindowStartedAt = 0;
    let fallbackRestartCountInWindow = 0;

    const finalizeSession = (reason: string): void => {
      if (finalized) return;
      finalized = true;
      if (noFirstByteTimer) {
        clearTimeout(noFirstByteTimer);
        noFirstByteTimer = null;
      }
      void tsSessionRegistry.destroy(options.session.key, reason);
    };

    const normalizer = startFfmpegTsNormalizer({
      extraFlags: ffProfile.flags,
      onData: (chunk) => options.session.buffer.append(chunk),
      onExit: (code) => {
        logger.info(
          `[ts-source-manager] Origem finalizada: key=${options.session.key} kind=live stage=ffmpeg code=${code}`,
        );
        if (fallbackInProgress || fallbackActivated) return;
        finalizeSession('source-exit');
      },
    });

    const activateFallback = (trigger: string): void => {
      if (fallbackActivated || fallbackInProgress || finalized) return;
      fallbackInProgress = true;
      if (noFirstByteTimer) {
        clearTimeout(noFirstByteTimer);
        noFirstByteTimer = null;
      }

      logger.warn(
        `[ts-source-manager] Ativando fallback yt-dlp: key=${options.session.key} trigger=${trigger}`,
      );

      void this.activateLiveYtDlpFallback(
        options,
        streamlink,
        normalizer,
        (code) => {
          if (finalized) return;
          fallbackActivated = false;

          if (!tsSessionRegistry.has(options.session.key)) return;
          if (options.session.clientCount <= 0) {
            finalizeSession('ytdlp-fallback-exit-no-clients');
            return;
          }

          const now = Date.now();
          if (fallbackRestartWindowStartedAt === 0 || (now - fallbackRestartWindowStartedAt) > LIVE_FALLBACK_RESTART_WINDOW_MS) {
            fallbackRestartWindowStartedAt = now;
            fallbackRestartCountInWindow = 0;
          }
          fallbackRestartCountInWindow += 1;

          if (fallbackRestartCountInWindow > LIVE_FALLBACK_MAX_RESTARTS) {
            logger.error(
              `[ts-source-manager] Fallback live excedeu reinicios: key=${options.session.key} code=${code} restarts=${fallbackRestartCountInWindow} windowMs=${LIVE_FALLBACK_RESTART_WINDOW_MS}`,
            );
            finalizeSession('ytdlp-fallback-too-many-restarts');
            return;
          }

          logger.warn(
            `[ts-source-manager] Fallback live encerrado, reanexando origem: key=${options.session.key} code=${code} restart=${fallbackRestartCountInWindow}/${LIVE_FALLBACK_MAX_RESTARTS}`,
          );
          setTimeout(() => {
            if (finalized || !tsSessionRegistry.has(options.session.key) || options.session.clientCount <= 0) return;
            activateFallback(`ytdlp-fallback-exit code=${code}`);
          }, LIVE_FALLBACK_RESTART_DELAY_MS);
        },
      )
        .then(async (fallbackProc) => {
          fallbackInProgress = false;
          fallbackActivated = true;

          if (!tsSessionRegistry.has(options.session.key)) {
            await fallbackProc.kill(5_000);
            return;
          }

          tsSessionRegistry.setDestroyHandler(options.session.key, null);
          this.activateSessionSource(options.session, fallbackProc, 'live');
          logger.warn(
            `[ts-source-manager] Fallback live ativo via yt-dlp: key=${options.session.key} pid=${fallbackProc.pid ?? 'null'}`,
          );
        })
        .catch((error) => {
          fallbackInProgress = false;
          logger.error(
            `[ts-source-manager] Falha no fallback yt-dlp: key=${options.session.key} err=${String(error)}`,
          );
          finalizeSession('live-fallback-failed');
        });
    };

    streamlink = startStreamlinkProcess({
      url: options.watchUrl,
      userAgent: streamlinkProfile.userAgent,
      cookieFile: streamlinkProfile.cookieFile,
      extraFlags: streamlinkProfile.flags,
      onExit: (code) => {
        logger.info(
          `[ts-source-manager] Origem finalizada: key=${options.session.key} kind=live stage=streamlink code=${code} bytes=${streamlinkBytes}`,
        );
        if (fallbackActivated || fallbackInProgress || finalized) return;

        if (options.session.clientCount === 0) {
          logger.info(
            `[ts-source-manager] Streamlink finalizado sem clientes ativos, encerrando sessao: key=${options.session.key} code=${code}`,
          );
          finalizeSession('streamlink-exit-no-clients');
          return;
        }

        if (code !== 0 && streamlinkBytes === 0) {
          activateFallback(`streamlink-exit-no-first-byte code=${code}`);
          return;
        }

        finalizeSession('streamlink-exit');
      },
    });

    if (!streamlink.stdout || !normalizer.stdin) {
      void normalizer.kill(5_000);
      void streamlink.kill(5_000);
      throw new Error(`Pipeline live incompleto para key=${options.session.key}`);
    }

    streamlink.stdout.on('data', (chunk: Buffer) => {
      if (streamlinkBytes === 0 && chunk.length > 0 && noFirstByteTimer) {
        clearTimeout(noFirstByteTimer);
        noFirstByteTimer = null;
      }
      streamlinkBytes += chunk.length;
    });
    streamlink.stdout.pipe(normalizer.stdin);

    streamlink.stdout.on('error', (error) => {
      logger.warn(`[ts-source-manager] Erro no stdout do streamlink: key=${options.session.key} err=${String(error)}`);
      if (fallbackActivated || fallbackInProgress) return;
      finalizeSession('streamlink-stdout-error');
    });

    normalizer.stdin.on('error', (error) => {
      logger.warn(`[ts-source-manager] Erro no stdin do ffmpeg: key=${options.session.key} err=${String(error)}`);
      if (fallbackActivated || fallbackInProgress) return;
      finalizeSession('ffmpeg-stdin-error');
    });

    noFirstByteTimer = setTimeout(() => {
      if (fallbackActivated || fallbackInProgress || finalized) return;
      if (!tsSessionRegistry.has(options.session.key)) return;
      if (streamlinkBytes > 0) return;
      if (options.session.clientCount === 0) return;

      activateFallback(`streamlink-no-first-byte-timeout ${LIVE_STREAMLINK_NO_FIRST_BYTE_TIMEOUT_MS}ms`);
    }, LIVE_STREAMLINK_NO_FIRST_BYTE_TIMEOUT_MS);

    tsSessionRegistry.setDestroyHandler(options.session.key, async () => {
      if (noFirstByteTimer) {
        clearTimeout(noFirstByteTimer);
        noFirstByteTimer = null;
      }
      await this.stopLivePipeline(streamlink, normalizer);
    });

    this.activateSessionSource(options.session, normalizer, 'live');
    logger.info(
      `[ts-source-manager] Pipeline live iniciado: key=${options.session.key} streamlinkPid=${streamlink.pid ?? 'null'} ffmpegPid=${normalizer.pid ?? 'null'}`,
    );
  }

  private async activateLiveYtDlpFallback(
    options: StartTsSourceOptions,
    streamlink: ManagedProcess,
    normalizer: ManagedProcess,
    onFallbackExit: (code: number | null) => void,
  ): Promise<ManagedProcess> {
    if (!options.watchUrl) {
      throw new Error(`Fallback live sem watchUrl para key=${options.session.key}`);
    }

    await this.stopLivePipeline(streamlink, normalizer);

    const ytProfile = this.toolProfiles.resolveProfile('yt-dlp');
    const ffProfile = this.toolProfiles.resolveProfile('ffmpeg');
    const urls = await resolveYtDlpUrls(
      options.watchUrl,
      ytProfile.userAgent,
      ytProfile.cookieFile,
      ytProfile.flags,
    );

    return startYtDlpFfmpeg({
      urls,
      userAgent: ytProfile.userAgent,
      extraFfmpegFlags: ffProfile.flags,
      paceInput: true,
      onData: (chunk) => options.session.buffer.append(chunk),
      onExit: (code) => {
        logger.info(
          `[ts-source-manager] Origem finalizada: key=${options.session.key} kind=live stage=ytdlp-fallback code=${code}`,
        );
        onFallbackExit(code);
      },
    });
  }

  private async stopLivePipeline(streamlink: ManagedProcess, normalizer: ManagedProcess): Promise<void> {
    try {
      if (streamlink.stdout && normalizer.stdin) {
        streamlink.stdout.unpipe(normalizer.stdin);
      }
    } catch {
      // noop
    }

    try {
      if (normalizer.stdin && !normalizer.stdin.destroyed) normalizer.stdin.end();
    } catch {
      // noop
    }

    await Promise.allSettled([
      streamlink.kill(5_000),
      normalizer.kill(5_000),
    ]);
  }

  private activateSessionSource(session: TsSession, proc: ManagedProcess, kind: TsSessionKind): void {
    tsSessionRegistry.setSourceProcess(session.key, proc);
    tsSessionRegistry.setState(session.key, 'active');
    logger.info(`[ts-source-manager] Origem iniciada: key=${session.key} kind=${kind} pid=${proc.pid ?? 'null'}`);
  }
}
