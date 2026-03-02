import { spawn } from 'child_process';
import { ManagedProcess } from './process-manager';
import { logger } from '../core/logger';

const URL_RESOLVE_TIMEOUT_MS = 30_000;
const STDERR_TAIL_MAX = 4_000;
const DEFAULT_FORMAT_SELECTOR = 'bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best';

function sanitizeYtDlpLog(text: string): string {
  return text
    .replace(/key=AIza[A-Za-z0-9_-]+/gi, 'key=***REDACTED***')
    .replace(/oauth_token=[^&\s]+/gi, 'oauth_token=***REDACTED***')
    .replace(/Authorization: Bearer [^\s]+/gi, 'Authorization: Bearer ***REDACTED***');
}

interface ResolveAttempt {
  label: string;
  extractorArgs?: string;
}

type ResolveFailureKind = 'exit' | 'no-url' | 'timeout';

class ResolveAttemptError extends Error {
  constructor(
    message: string,
    readonly kind: ResolveFailureKind,
    readonly code: number | null = null,
    readonly stderrSnippet: string = '',
    readonly expectedTransient: boolean = false,
  ) {
    super(message);
    this.name = 'ResolveAttemptError';
  }
}

function hasArg(flags: string[], shortName: string, longName: string): boolean {
  for (let i = 0; i < flags.length; i++) {
    const flag = flags[i];
    if (flag === shortName || flag === longName) return true;
    if (flag.startsWith(`${longName}=`)) return true;
  }
  return false;
}

function buildAttempts(cookieFile: string | null, extraFlags: string[]): ResolveAttempt[] {
  const hasExtractorArgs = hasArg(extraFlags, '', '--extractor-args');
  if (hasExtractorArgs) return [{ label: 'profile' }];

  if (!cookieFile) {
    // Sem cookie, android costuma evitar o bloqueio/challenge do player web.
    return [
      { label: 'android', extractorArgs: 'youtube:player_client=android' },
      { label: 'web', extractorArgs: 'youtube:player_client=web' },
      { label: 'default' },
    ];
  }

  return [
    { label: 'web', extractorArgs: 'youtube:player_client=web' },
    { label: 'default' },
    { label: 'android', extractorArgs: 'youtube:player_client=android' },
  ];
}

function isLikelyTransientFailure(stderrSnippet: string): boolean {
  return /Requested format is not available|Only images are available|challenge solver|Sign in to confirm/i
    .test(stderrSnippet);
}

function normalizeResolveError(err: unknown): Error {
  if (err instanceof Error) return err;
  return new Error(String(err));
}

export async function resolveYtDlpUrls(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  extraFlags: string[] = [],
): Promise<string[]> {
  const attempts = buildAttempts(cookieFile, extraFlags);
  const hasCustomFormat = hasArg(extraFlags, '-f', '--format');
  const hasCustomExtractorArgs = hasArg(extraFlags, '', '--extractor-args');

  let lastErr: Error | null = null;

  for (let i = 0; i < attempts.length; i++) {
    const attempt = attempts[i];
    const args = [
      '--user-agent', userAgent,
      '--no-playlist',
      '--print', '%(url)s',
    ];
    if (!hasCustomFormat) args.push('-f', DEFAULT_FORMAT_SELECTOR);
    if (attempt.extractorArgs && !hasCustomExtractorArgs) args.push('--extractor-args', attempt.extractorArgs);
    args.push(...extraFlags);
    if (cookieFile) args.push('--cookies', cookieFile);
    args.push(url);

    const sanitizedCmd = args
      .map((part) => sanitizeYtDlpLog(part))
      .join(' ')
      .slice(0, 500);
    logger.info(
      `[ytdlp-runner] Resolvendo URL (${attempt.label}) cookie=${cookieFile ? 'on' : 'off'}: ${url} args=${sanitizedCmd}`,
    );

    try {
      const urls = await runResolveAttempt(args);
      logger.info(`[ytdlp-runner] ${urls.length} URL(s) resolvida(s) via ${attempt.label}`);
      return urls;
    } catch (err) {
      lastErr = normalizeResolveError(err);
      const isLastAttempt = i === attempts.length - 1;
      const expectedTransient = lastErr instanceof ResolveAttemptError
        && (lastErr.expectedTransient || lastErr.kind === 'no-url');
      const prefix = `[ytdlp-runner] Tentativa ${attempt.label} falhou`;
      if (!isLastAttempt && expectedTransient) {
        logger.info(`${prefix} (transiente): ${lastErr.message}`);
      } else {
        logger.warn(`${prefix}: ${lastErr.message}`);
      }
    }
  }

  throw lastErr ?? new Error('yt-dlp: falha desconhecida na resolucao');
}

async function runResolveAttempt(args: string[]): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const proc = spawn('yt-dlp', args, { stdio: ['ignore', 'pipe', 'pipe'] });

    let settled = false;
    let stdout = '';
    let stderrTail = '';

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      fn();
    };

    const timer = setTimeout(() => {
      logger.warn('[ytdlp-runner] Timeout na resolução de URL — matando yt-dlp');
      try { proc.kill('SIGKILL'); } catch { /* */ }
      finish(() => reject(new ResolveAttemptError(
        'yt-dlp URL resolution timeout',
        'timeout',
        null,
        '',
        true,
      )));
    }, URL_RESOLVE_TIMEOUT_MS);

    proc.stdout?.on('data', (chunk: Buffer) => { stdout += chunk.toString(); });
    proc.stderr?.on('data', (chunk: Buffer) => {
      const line = sanitizeYtDlpLog(chunk.toString());
      stderrTail = (stderrTail + line).slice(-STDERR_TAIL_MAX);
      logger.debug(`[ytdlp-runner][resolve] ${line.trim()}`);
    });

    proc.on('close', (code) => {
      clearTimeout(timer);
      finish(() => {
        if (code !== 0) {
          const stderrSnippet = stderrTail.trim().slice(-400);
          reject(new ResolveAttemptError(
            `yt-dlp exited ${code} stderr=${stderrSnippet}`,
            'exit',
            code,
            stderrSnippet,
            isLikelyTransientFailure(stderrSnippet),
          ));
          return;
        }
        const urls = stdout
          .trim()
          .split('\n')
          .map(u => u.trim())
          .filter((u) => /^https?:\/\//i.test(u));
        if (urls.length === 0) {
          reject(new ResolveAttemptError('yt-dlp: nenhuma URL retornada', 'no-url', code, '', true));
          return;
        }
        resolve(urls);
      });
    });

    proc.on('error', (err) => {
      clearTimeout(timer);
      finish(() => reject(err));
    });
  });
}

export interface YtDlpFfmpegParams {
  urls: string[];
  userAgent: string;
  extraFfmpegFlags: string[];
  paceInput?: boolean;
  onData: (chunk: Buffer) => void;
  onExit: (code: number | null) => void;
}

export function startYtDlpFfmpeg(params: YtDlpFfmpegParams): ManagedProcess {
  const { urls, userAgent, extraFfmpegFlags, paceInput = true, onData, onExit } = params;

  // Flags aplicadas a cada input:
  // -reconnect 1              → reconecta se a conexão cair (HTTP)
  // -reconnect_streamed 1     → reconecta em streams já iniciados (live HLS/DASH)
  // -reconnect_delay_max 5    → espera máx 5s entre tentativas
  const inputPrefix = [
    ...(paceInput ? ['-re'] : []),
    '-user_agent', userAgent,
    '-reconnect', '1',
    '-reconnect_streamed', '1',
    '-reconnect_delay_max', '5',
  ];

  const args: string[] = [
    ...extraFfmpegFlags,
    '-loglevel', 'error',
  ];

  if (urls.length >= 2) {
    args.push(...inputPrefix, '-i', urls[0], ...inputPrefix, '-i', urls[1]);
  } else {
    args.push(...inputPrefix, '-i', urls[0]);
  }

  args.push('-c', 'copy', '-f', 'mpegts', 'pipe:1');

  logger.info(`[ytdlp-runner] Iniciando ffmpeg (${urls.length} URL${urls.length > 1 ? 's' : ''})`);

  const proc = new ManagedProcess('ytdlp-ffmpeg', 'ffmpeg', args, {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let finished = false;
  const finish = (code: number | null) => {
    if (finished) return;
    finished = true;
    onExit(code);
  };

  proc.stdout?.on('data', (chunk: Buffer) => onData(chunk));
  proc.stderr?.on('data', (chunk: Buffer) =>
    logger.warn(`[ytdlp-runner][ffmpeg stderr] ${chunk.toString().trim()}`),
  );
  proc.onClose((code) => {
    logger.info(`[ytdlp-runner] ffmpeg finalizado code=${code}`);
    finish(code);
  });
  proc.onError((err) => {
    logger.error(`[ytdlp-runner] Erro ffmpeg: ${err}`);
    finish(null);
  });

  return proc;
}
