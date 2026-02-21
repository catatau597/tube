
import { spawn } from 'child_process';
import { Response } from 'express';
import { logger } from '../core/logger';

function buildArgs(url: string, userAgent: string, cookieFile: string | null, simulate: boolean): string[] {
  // Para streaming contínuo, use bestvideo+bestaudio e merge-output-format mpegts
  const args = ['-f', 'bestvideo+bestaudio', '--merge-output-format', 'mpegts', '--user-agent', userAgent];
  if (cookieFile) args.push('--cookies', cookieFile);
  if (simulate) {
    args.push('--simulate', '--print', 'title');
  } else {
    args.push('-o', '-', url);
  }
  if (simulate) args.push(url);
  return args;
}

export async function testYtDlp(url: string, userAgent: string, cookieFile: string | null): Promise<{ ok: boolean; output: string }> {
  return new Promise((resolve) => {
    logger.info(`[ytdlp-runner] Testando yt-dlp: url=${url}`);
    const proc = spawn('yt-dlp', buildArgs(url, userAgent, cookieFile, true));
    let out = '';
    let err = '';
    proc.stdout.on('data', (chunk) => {
      out += String(chunk);
    });
    proc.stderr.on('data', (chunk) => {
      err += String(chunk);
      logger.warn(`[ytdlp-runner][stderr] ${String(chunk)}`);
    });
    proc.on('close', (code) => {
      logger.info(`[ytdlp-runner] yt-dlp finalizado code=${code}`);
      resolve({ ok: code === 0, output: `${out}${err}`.trim() });
    });
    proc.on('error', (error) => {
      logger.error(`[ytdlp-runner] Erro ao iniciar yt-dlp: ${error}`);
      resolve({ ok: false, output: String(error) });
    });
  });
}

export async function runYtDlp(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  response: Response,
): Promise<void> {
  logger.info(`[ytdlp-runner] Iniciando yt-dlp: url=${url}`);
  response.setHeader('Content-Type', 'video/mp2t');
  // yt-dlp pipe para ffmpeg para garantir streaming MPEG-TS
  const ytDlpArgs = buildArgs(url, userAgent, cookieFile, false);
  const ffmpegArgs = ['-i', '-', '-c', 'copy', '-f', 'mpegts', 'pipe:1'];
  const ytDlpProc = spawn('yt-dlp', ytDlpArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
  const ffmpegProc = spawn('ffmpeg', ffmpegArgs, { stdio: ['pipe', 'pipe', 'pipe'] });

  ytDlpProc.stdout.pipe(ffmpegProc.stdin);
  ffmpegProc.stdout.pipe(response);

  ytDlpProc.stderr.on('data', (data) => {
    logger.warn(`[ytdlp-runner][yt-dlp stderr] ${String(data)}`);
  });
  ffmpegProc.stderr.on('data', (data) => {
    logger.warn(`[ytdlp-runner][ffmpeg stderr] ${String(data)}`);
  });

  response.on('close', () => {
    if (!ytDlpProc.killed) ytDlpProc.kill('SIGTERM');
    if (!ffmpegProc.killed) ffmpegProc.kill('SIGTERM');
    logger.info(`[ytdlp-runner] Resposta fechada, processos yt-dlp e ffmpeg encerrados.`);
  });

  await new Promise<void>((resolve) => {
    ffmpegProc.on('close', (code) => {
      logger.info(`[ytdlp-runner] ffmpeg finalizado com code=${code}`);
      resolve();
    });
    ffmpegProc.on('error', (err) => {
      logger.error(`[ytdlp-runner] Erro ao iniciar ffmpeg: ${err}`);
      resolve();
    });
  });
}
