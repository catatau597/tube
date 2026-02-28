import { spawn, ChildProcess } from 'child_process';
import { Response } from 'express';
import { logger } from '../core/logger';

function buildArgs(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  extraFlags: string[],
  simulate: boolean
): string[] {
  const args = [
    ...extraFlags,
    '-f', 'bestvideo[ext=mp4][vcodec^=avc1]+bestaudio[ext=m4a]',
    '--user-agent', userAgent,
    '--no-part',
    '--no-continue',
    '--extractor-args', 'youtube:player_client=android',
  ];
  if (cookieFile) args.push('--cookies', cookieFile);
  if (simulate) {
    args.push('--simulate', '--print', 'title', url);
  } else {
    args.push('-o', '-', url);
  }
  return args;
}

export async function testYtDlp(
  url: string,
  userAgent: string,
  cookieFile: string | null
): Promise<{ ok: boolean; output: string }> {
  return new Promise((resolve) => {
    logger.info(`[ytdlp-runner] Testando yt-dlp: url=${url}`);
    const proc = spawn('yt-dlp', buildArgs(url, userAgent, cookieFile, [], true));
    let out = '';
    let err = '';
    proc.stdout.on('data', (chunk) => { out += String(chunk); });
    proc.stderr.on('data', (chunk) => { err += String(chunk); logger.warn(`[ytdlp-runner][stderr] ${String(chunk)}`); });
    proc.on('close', (code) => { logger.info(`[ytdlp-runner] yt-dlp finalizado code=${code}`); resolve({ ok: code === 0, output: `${out}${err}`.trim() }); });
    proc.on('error', (error) => { logger.error(`[ytdlp-runner] Erro: ${error}`); resolve({ ok: false, output: String(error) }); });
  });
}

function killProcessGroup(proc: ChildProcess, signal: NodeJS.Signals = 'SIGTERM'): void {
  if (!proc.pid) return;
  try {
    process.kill(-proc.pid, signal);
  } catch {
    try { proc.kill(signal); } catch (killErr) {
      logger.warn(`[ytdlp-runner] Erro ao matar processo PID=${proc.pid}: ${killErr}`);
    }
  }
}

function cleanupProcess(proc: ChildProcess, name: string): void {
  if (!proc || proc.killed) return;
  logger.info(`[ytdlp-runner] Iniciando cleanup de ${name} (PID=${proc.pid})`);
  if (proc.stdout) { proc.stdout.unpipe(); proc.stdout.destroy(); }
  if (proc.stderr) { proc.stderr.destroy(); }
  if (proc.stdin && !proc.stdin.destroyed) { proc.stdin.destroy(); }
  killProcessGroup(proc, 'SIGTERM');
  setTimeout(() => {
    if (proc && !proc.killed && proc.pid) {
      logger.warn(`[ytdlp-runner] ${name} (PID=${proc.pid}) não respondeu ao SIGTERM, usando SIGKILL`);
      killProcessGroup(proc, 'SIGKILL');
    }
  }, 3000);
}

export async function runYtDlp(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  extraFlags: string[],
  response: Response,
): Promise<void> {
  logger.info(`[ytdlp-runner] Iniciando yt-dlp: url=${url} extraFlags=[${extraFlags.join(' ')}]`);
  response.setHeader('Content-Type', 'video/mp2t');

  const ytDlpArgs = buildArgs(url, userAgent, cookieFile, extraFlags, false);
  const ffmpegArgs = ['-i', '-', '-c', 'copy', '-f', 'mpegts', 'pipe:1'];

  const ytDlpProc = spawn('yt-dlp', ytDlpArgs, { stdio: ['ignore', 'pipe', 'pipe'], detached: true });
  const ffmpegProc = spawn('ffmpeg', ffmpegArgs, { stdio: ['pipe', 'pipe', 'pipe'], detached: true });

  ytDlpProc.stdout.pipe(ffmpegProc.stdin);
  ffmpegProc.stdout.pipe(response);

  ytDlpProc.stderr.on('data', (data: Buffer) => { logger.warn(`[ytdlp-runner][yt-dlp stderr] ${String(data)}`); });
  ffmpegProc.stderr.on('data', (data: Buffer) => { logger.warn(`[ytdlp-runner][ffmpeg stderr] ${String(data)}`); });

  let cleaned = false;
  const cleanup = (origin: string) => {
    if (cleaned) return;
    cleaned = true;
    logger.info(`[ytdlp-runner] Iniciando limpeza (origem: ${origin})`);
    cleanupProcess(ytDlpProc, 'yt-dlp');
    cleanupProcess(ffmpegProc, 'ffmpeg');
  };

  response.on('close', () => cleanup('response-close'));
  response.on('error', (err) => { logger.warn(`[ytdlp-runner] Socket error: ${err.message}`); cleanup('response-error'); });

  await new Promise<void>((resolve) => {
    ffmpegProc.on('close', (code) => { logger.info(`[ytdlp-runner] ffmpeg finalizado code=${code}`); cleanup('ffmpeg-close'); resolve(); });
    ffmpegProc.on('error', (err) => { logger.error(`[ytdlp-runner] Erro ffmpeg: ${err}`); cleanup('ffmpeg-error'); resolve(); });
    ytDlpProc.on('error', (err) => { logger.error(`[ytdlp-runner] Erro yt-dlp: ${err}`); cleanup('ytdlp-error'); resolve(); });
  });
}
