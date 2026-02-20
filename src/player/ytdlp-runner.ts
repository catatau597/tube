
import { spawn } from 'child_process';
import { Response } from 'express';
import { logger } from '../core/logger';

function buildArgs(url: string, userAgent: string, cookieFile: string | null, simulate: boolean): string[] {
  const args = ['-f', 'best', '--user-agent', userAgent];
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
  const proc = spawn('yt-dlp', buildArgs(url, userAgent, cookieFile, false), {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  proc.stdout.pipe(response);
  proc.stderr.on('data', (data) => {
    logger.warn(`[ytdlp-runner][stderr] ${String(data)}`);
  });
  response.on('close', () => {
    if (!proc.killed) proc.kill('SIGTERM');
    logger.info(`[ytdlp-runner] Resposta fechada, processo yt-dlp encerrado.`);
  });

  await new Promise<void>((resolve) => {
    proc.on('close', (code) => {
      logger.info(`[ytdlp-runner] yt-dlp finalizado com code=${code}`);
      resolve();
    });
    proc.on('error', (err) => {
      logger.error(`[ytdlp-runner] Erro ao iniciar yt-dlp: ${err}`);
      resolve();
    });
  });
}
