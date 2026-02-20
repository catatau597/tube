
import { spawn } from 'child_process';
import { Response } from 'express';
import { logger } from '../core/logger';

function buildArgs(url: string, userAgent: string, cookieFile: string | null, mode: 'stream' | 'url' | 'simulate'): string[] {
  const args = ['--http-header', `User-Agent=${userAgent}`, '--config', '/dev/null', '--no-plugin-sideloading'];
  if (cookieFile) args.push('--http-cookie-jar', cookieFile);
  if (mode === 'stream') {
    args.push('--stdout', url, 'best');
  } else if (mode === 'url') {
    args.push('--stream-url', url, 'best');
  } else {
    args.push('--stream-url', url, 'best');
  }
  return args;
}

export async function streamlinkHasPlayableStream(
  url: string,
  userAgent: string,
  cookieFile: string | null,
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    logger.info(`[streamlink-runner] Testando streamlinkHasPlayableStream: url=${url}`);
    const proc = spawn('streamlink', buildArgs(url, userAgent, cookieFile, 'simulate'));
    let stderr = '';
    proc.stderr.on('data', (chunk) => {
      stderr += String(chunk);
      logger.warn(`[streamlink-runner][stderr] ${String(chunk)}`);
    });
    proc.on('close', (code) => {
      logger.info(`[streamlink-runner] streamlinkHasPlayableStream finalizado code=${code}`);
      if (code === 0) {
        resolve(true);
        return;
      }
      resolve(!/No playable streams found/i.test(stderr));
    });
    proc.on('error', (err) => {
      logger.error(`[streamlink-runner] Erro ao iniciar streamlink: ${err}`);
      resolve(false);
    });
  });
}

export async function runStreamlink(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  response: Response,
): Promise<void> {
  logger.info(`[streamlink-runner] Iniciando streamlink: url=${url}`);
  response.setHeader('Content-Type', 'video/mp2t');
  const proc = spawn('streamlink', buildArgs(url, userAgent, cookieFile, 'stream'), {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  proc.stdout.pipe(response);
  proc.stderr.on('data', (data) => {
    logger.warn(`[streamlink-runner][stderr] ${String(data)}`);
  });
  response.on('close', () => {
    if (!proc.killed) proc.kill('SIGTERM');
    logger.info(`[streamlink-runner] Resposta fechada, processo streamlink encerrado.`);
  });

  await new Promise<void>((resolve) => {
    proc.on('close', (code) => {
      logger.info(`[streamlink-runner] streamlink finalizado com code=${code}`);
      resolve();
    });
    proc.on('error', (err) => {
      logger.error(`[streamlink-runner] Erro ao iniciar streamlink: ${err}`);
      resolve();
    });
  });
}
