import { spawn, ChildProcess } from 'child_process';
import { Response } from 'express';
import { logger } from '../core/logger';

function buildArgs(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  extraFlags: string[],
  mode: 'stream' | 'url' | 'simulate'
): string[] {
  const args = [
    ...extraFlags,
    '--http-header', `User-Agent=${userAgent}`,
    '--config', '/dev/null',
    '--no-plugin-sideloading',
  ];
  if (cookieFile) args.push('--http-cookie-jar', cookieFile);
  if (mode === 'stream') {
    args.push('--stdout', url, 'best');
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
    const proc = spawn('streamlink', buildArgs(url, userAgent, cookieFile, [], 'simulate'));
    let stderr = '';
    proc.stderr.on('data', (chunk) => {
      stderr += String(chunk);
      logger.warn(`[streamlink-runner][stderr] ${String(chunk)}`);
    });
    proc.on('close', (code) => {
      logger.info(`[streamlink-runner] streamlinkHasPlayableStream finalizado code=${code}`);
      if (code === 0) { resolve(true); return; }
      resolve(!/No playable streams found/i.test(stderr));
    });
    proc.on('error', (err) => {
      logger.error(`[streamlink-runner] Erro ao iniciar streamlink: ${err}`);
      resolve(false);
    });
  });
}

function killProcessGroup(proc: ChildProcess, signal: NodeJS.Signals = 'SIGTERM'): void {
  if (!proc.pid) return;
  try {
    process.kill(-proc.pid, signal);
  } catch {
    try { proc.kill(signal); } catch (killErr) {
      logger.warn(`[streamlink-runner] Erro ao matar processo PID=${proc.pid}: ${killErr}`);
    }
  }
}

function cleanupProcess(proc: ChildProcess, name: string): void {
  if (!proc || proc.killed) return;
  logger.info(`[streamlink-runner] Iniciando cleanup de ${name} (PID=${proc.pid})`);
  if (proc.stdout) { proc.stdout.unpipe(); proc.stdout.destroy(); }
  if (proc.stderr) { proc.stderr.destroy(); }
  killProcessGroup(proc, 'SIGTERM');
  setTimeout(() => {
    if (proc && !proc.killed && proc.pid) {
      logger.warn(`[streamlink-runner] ${name} (PID=${proc.pid}) não respondeu ao SIGTERM, usando SIGKILL`);
      killProcessGroup(proc, 'SIGKILL');
    }
  }, 3000);
}

export async function runStreamlink(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  extraFlags: string[],
  response: Response,
): Promise<void> {
  logger.info(`[streamlink-runner] Iniciando streamlink: url=${url} extraFlags=[${extraFlags.join(' ')}]`);
  response.setHeader('Content-Type', 'video/mp2t');

  const proc = spawn('streamlink', buildArgs(url, userAgent, cookieFile, extraFlags, 'stream'), {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
  });

  proc.stdout.pipe(response);
  proc.stderr.on('data', (data) => {
    logger.warn(`[streamlink-runner][stderr] ${String(data)}`);
  });

  let cleaned = false;
  const cleanup = (origin: string) => {
    if (cleaned) return;
    cleaned = true;
    logger.info(`[streamlink-runner] Iniciando limpeza (origem: ${origin})`);
    cleanupProcess(proc, 'streamlink');
  };

  response.on('close', () => cleanup('response-close'));
  response.on('error', (err) => { logger.warn(`[streamlink-runner] Socket error: ${err.message}`); cleanup('response-error'); });

  await new Promise<void>((resolve) => {
    proc.on('close', (code) => { logger.info(`[streamlink-runner] finalizado code=${code}`); cleanup('proc-close'); resolve(); });
    proc.on('error', (err) => { logger.error(`[streamlink-runner] Erro: ${err}`); cleanup('proc-error'); resolve(); });
  });
}
