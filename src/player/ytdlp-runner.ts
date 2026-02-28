import { spawn, ChildProcess } from 'child_process';
import { Response } from 'express';
import { logger } from '../core/logger';

function buildArgs(url: string, userAgent: string, cookieFile: string | null, simulate: boolean): string[] {
  // Para streaming MPEG-TS, force vídeo H.264 (avc1) e áudio AAC
  const args = [
    '-f', "bestvideo[ext=mp4][vcodec^=avc1]+bestaudio[ext=m4a]",
    '--user-agent', userAgent,
    '--no-part',           // Evita download local/buffering completo
    '--no-continue',       // Não tenta continuar downloads parciais
    '--extractor-args', 'youtube:player_client=android', // Cliente Android evita alguns bloqueios
  ];
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

function killProcessGroup(proc: ChildProcess, signal: NodeJS.Signals = 'SIGTERM'): void {
  if (!proc.pid) return;
  try {
    // Mata o grupo de processos inteiro (inclui filhos)
    process.kill(-proc.pid, signal);
  } catch (err) {
    // Fallback: mata só o processo principal se group kill falhar
    try {
      proc.kill(signal);
    } catch (killErr) {
      logger.warn(`[ytdlp-runner] Erro ao matar processo PID=${proc.pid}: ${killErr}`);
    }
  }
}

function cleanupProcess(proc: ChildProcess, name: string): void {
  if (!proc || proc.killed) return;
  
  logger.info(`[ytdlp-runner] Iniciando cleanup de ${name} (PID=${proc.pid})`);
  
  // 1. Unpipe e destroy streams ANTES de matar (força EPIPE imediato)
  if (proc.stdout) {
    proc.stdout.unpipe();
    proc.stdout.destroy();
  }
  if (proc.stderr) {
    proc.stderr.destroy();
  }
  if (proc.stdin && !proc.stdin.destroyed) {
    proc.stdin.destroy();
  }
  
  // 2. SIGTERM gentil
  killProcessGroup(proc, 'SIGTERM');
  
  // 3. SIGKILL após 3s se ainda vivo
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
  response: Response,
): Promise<void> {
  logger.info(`[ytdlp-runner] Iniciando yt-dlp: url=${url}`);
  response.setHeader('Content-Type', 'video/mp2t');
  
  // yt-dlp pipe para ffmpeg para garantir streaming MPEG-TS
  const ytDlpArgs = buildArgs(url, userAgent, cookieFile, false);
  const ffmpegArgs = ['-i', '-', '-c', 'copy', '-f', 'mpegts', 'pipe:1'];
  
  // Spawna com detached: true para criar process group
  const ytDlpProc = spawn('yt-dlp', ytDlpArgs, { 
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true 
  });
  const ffmpegProc = spawn('ffmpeg', ffmpegArgs, { 
    stdio: ['pipe', 'pipe', 'pipe'],
    detached: true 
  });

  ytDlpProc.stdout.pipe(ffmpegProc.stdin);
  ffmpegProc.stdout.pipe(response);

  ytDlpProc.stderr.on('data', (data: Buffer) => {
    logger.warn(`[ytdlp-runner][yt-dlp stderr] ${String(data)}`);
  });
  ffmpegProc.stderr.on('data', (data: Buffer) => {
    logger.warn(`[ytdlp-runner][ffmpeg stderr] ${String(data)}`);
  });

  // Flag de cleanup idempotente
  let cleaned = false;
  const cleanup = (origin: string) => {
    if (cleaned) return;
    cleaned = true;
    logger.info(`[ytdlp-runner] Iniciando limpeza (origem: ${origin})`);
    cleanupProcess(ytDlpProc, 'yt-dlp');
    cleanupProcess(ffmpegProc, 'ffmpeg');
  };

  // Escuta tanto request quanto response close
  response.on('close', () => cleanup('response-close'));
  response.on('error', (err) => {
    logger.warn(`[ytdlp-runner] Socket error: ${err.message}`);
    cleanup('response-error');
  });

  await new Promise<void>((resolve) => {
    ffmpegProc.on('close', (code) => {
      logger.info(`[ytdlp-runner] ffmpeg finalizado com code=${code}`);
      cleanup('ffmpeg-close');
      resolve();
    });
    ffmpegProc.on('error', (err) => {
      logger.error(`[ytdlp-runner] Erro ao iniciar ffmpeg: ${err}`);
      cleanup('ffmpeg-error');
      resolve();
    });
    ytDlpProc.on('error', (err) => {
      logger.error(`[ytdlp-runner] Erro ao iniciar yt-dlp: ${err}`);
      cleanup('ytdlp-error');
      resolve();
    });
  });
}
