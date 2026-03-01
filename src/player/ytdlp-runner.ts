import { spawn } from 'child_process';
import { ManagedProcess } from './process-manager';
import { logger } from '../core/logger';

const URL_RESOLVE_TIMEOUT_MS = 30_000;

/**
 * Phase 1 — URL Resolution.
 *
 * Uses `yt-dlp --get-url` which prints the direct stream URL(s) and exits
 * immediately without downloading any media. This keeps yt-dlp as a
 * short-lived helper (~2s) rather than a long-running pipe consumer.
 *
 * Returns:
 *  - 1 URL  → HLS manifest or direct single-format stream
 *  - 2 URLs → separate video URL + audio URL (muxed later by ffmpeg)
 *
 * Caller should pass extra flags from the yt-dlp tool profile.
 * Note: cookie/UA flags from the profile are also forwarded here.
 */
export async function resolveYtDlpUrls(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  extraFlags: string[] = [],
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const args = [
      '-f', 'bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best',
      '--user-agent', userAgent,
      '--extractor-args', 'youtube:player_client=android',
      '--no-playlist',
      '--get-url',   // prints direct URL(s) then exits — no download, no pipe
      ...extraFlags,
    ];
    if (cookieFile) args.push('--cookies', cookieFile);
    args.push(url);

    logger.info(`[ytdlp-runner] Resolvendo URL: ${url}`);
    const proc = spawn('yt-dlp', args, { stdio: ['ignore', 'pipe', 'pipe'] });

    let stdout = '';
    let stderr = '';

    const timer = setTimeout(() => {
      logger.warn('[ytdlp-runner] Timeout na resolução de URL — matando yt-dlp');
      try { proc.kill('SIGKILL'); } catch { /* */ }
      reject(new Error('yt-dlp URL resolution timeout'));
    }, URL_RESOLVE_TIMEOUT_MS);

    proc.stdout?.on('data', (chunk: Buffer) => { stdout += chunk.toString(); });
    proc.stderr?.on('data', (chunk: Buffer) => {
      stderr += chunk.toString();
      logger.debug(`[ytdlp-runner][resolve] ${chunk.toString().trim()}`);
    });

    proc.on('close', (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        logger.warn(`[ytdlp-runner] Resolução falhou code=${code} stderr=${stderr.slice(0, 300)}`);
        reject(new Error(`yt-dlp exited ${code}`));
        return;
      }
      const urls = stdout.trim().split('\n').map(u => u.trim()).filter(Boolean);
      if (urls.length === 0) {
        reject(new Error('yt-dlp: nenhuma URL retornada'));
        return;
      }
      logger.info(`[ytdlp-runner] ${urls.length} URL(s) resolvida(s)`);
      resolve(urls);
    });

    proc.on('error', (err) => { clearTimeout(timer); reject(err); });
  });
}

export interface YtDlpFfmpegParams {
  /** 1 or 2 URLs from resolveYtDlpUrls */
  urls: string[];
  userAgent: string;
  /** Extra flags from the ffmpeg tool profile */
  extraFfmpegFlags: string[];
  /** Called for every chunk of mpegts output. */
  onData: (chunk: Buffer) => void;
  /** Called when ffmpeg exits. */
  onExit: (code: number | null) => void;
}

/**
 * Phase 2 — Streaming.
 *
 * Starts ffmpeg using the URL(s) resolved by resolveYtDlpUrls.
 * yt-dlp is already gone at this point — ffmpeg is the only long-lived process.
 *
 *  1 URL  → ffmpeg -i url           -c copy -f mpegts pipe:1
 *  2 URLs → ffmpeg -i vUrl -i aUrl  -c copy -f mpegts pipe:1  (mux)
 *
 * ffmpeg fetches the stream on-demand (range requests / HLS segments),
 * eliminating the full-download behavior of the old yt-dlp pipe approach.
 */
export function startYtDlpFfmpeg(params: YtDlpFfmpegParams): ManagedProcess {
  const { urls, userAgent, extraFfmpegFlags, onData, onExit } = params;

  const args: string[] = [
    ...extraFfmpegFlags,
    '-loglevel', 'error',
    '-user_agent', userAgent,
  ];

  if (urls.length >= 2) {
    args.push('-i', urls[0], '-i', urls[1]);
  } else {
    args.push('-i', urls[0]);
  }

  args.push('-c', 'copy', '-f', 'mpegts', 'pipe:1');

  logger.info(`[ytdlp-runner] Iniciando ffmpeg (${urls.length} URL${urls.length > 1 ? 's' : ''})`);

  const proc = new ManagedProcess('ytdlp-ffmpeg', 'ffmpeg', args, {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  proc.stdout?.on('data', (chunk: Buffer) => onData(chunk));
  proc.stderr?.on('data', (chunk: Buffer) =>
    logger.warn(`[ytdlp-runner][ffmpeg stderr] ${chunk.toString().trim()}`),
  );
  proc.onClose((code) => {
    logger.info(`[ytdlp-runner] ffmpeg finalizado code=${code}`);
    onExit(code);
  });
  proc.onError((err) => {
    logger.error(`[ytdlp-runner] Erro ffmpeg: ${err}`);
    onExit(null);
  });

  return proc;
}
