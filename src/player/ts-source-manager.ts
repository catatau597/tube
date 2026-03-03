import { logger } from '../core/logger';
import { startFfmpegPlaceholder, startFfmpegTsNormalizer } from './ffmpeg-runner';
import { ManagedProcess } from './process-manager';
import { TsSession, TsSessionKind, tsSessionRegistry } from './ts-session-registry';
import { startStreamlinkProcess } from './streamlink-runner';
import { ToolProfileManager } from './tool-profile-manager';
import { resolveYtDlpUrls, startYtDlpFfmpeg } from './ytdlp-runner';

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

    const normalizer = startFfmpegTsNormalizer({
      extraFlags: ffProfile.flags,
      onData: (chunk) => options.session.buffer.append(chunk),
      onExit: () => {
        logger.info(`[ts-source-manager] Origem finalizada: key=${options.session.key} kind=live stage=ffmpeg`);
        void tsSessionRegistry.destroy(options.session.key, 'source-exit');
      },
    });

    const streamlink = startStreamlinkProcess({
      url: options.watchUrl,
      userAgent: streamlinkProfile.userAgent,
      cookieFile: streamlinkProfile.cookieFile,
      extraFlags: streamlinkProfile.flags,
      onExit: () => {
        logger.info(`[ts-source-manager] Origem finalizada: key=${options.session.key} kind=live stage=streamlink`);
        void tsSessionRegistry.destroy(options.session.key, 'streamlink-exit');
      },
    });

    if (!streamlink.stdout || !normalizer.stdin) {
      void normalizer.kill(5_000);
      void streamlink.kill(5_000);
      throw new Error(`Pipeline live incompleto para key=${options.session.key}`);
    }

    streamlink.stdout.pipe(normalizer.stdin);

    streamlink.stdout.on('error', (error) => {
      logger.warn(`[ts-source-manager] Erro no stdout do streamlink: key=${options.session.key} err=${String(error)}`);
      void tsSessionRegistry.destroy(options.session.key, 'streamlink-stdout-error');
    });

    normalizer.stdin.on('error', (error) => {
      logger.warn(`[ts-source-manager] Erro no stdin do ffmpeg: key=${options.session.key} err=${String(error)}`);
      void tsSessionRegistry.destroy(options.session.key, 'ffmpeg-stdin-error');
    });

    tsSessionRegistry.setDestroyHandler(options.session.key, async () => {
      try {
        streamlink.stdout?.unpipe(normalizer.stdin!);
      } catch {
        // noop
      }
      try {
        if (normalizer.stdin && !normalizer.stdin.destroyed) normalizer.stdin.end();
      } catch {
        // noop
      }
      await streamlink.kill(5_000);
    });

    this.activateSessionSource(options.session, normalizer, 'live');
    logger.info(
      `[ts-source-manager] Pipeline live iniciado: key=${options.session.key} streamlinkPid=${streamlink.pid ?? 'null'} ffmpegPid=${normalizer.pid ?? 'null'}`,
    );
  }

  private activateSessionSource(session: TsSession, proc: ManagedProcess, kind: TsSessionKind): void {
    tsSessionRegistry.setSourceProcess(session.key, proc);
    tsSessionRegistry.setState(session.key, 'active');
    logger.info(`[ts-source-manager] Origem iniciada: key=${session.key} kind=${kind} pid=${proc.pid ?? 'null'}`);
  }
}
