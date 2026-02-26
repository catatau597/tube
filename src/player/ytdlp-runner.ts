
import { spawn } from 'child_process';
import { Request, Response } from 'express';
import { logger } from '../core/logger';

function buildArgs(url: string, userAgent: string, cookieFile: string | null, simulate: boolean): string[] {
  // Para streaming MPEG-TS, force vídeo H.264 (avc1) e áudio AAC
  const args = ['-f', "bestvideo[ext=mp4][vcodec^=avc1]+bestaudio[ext=m4a]", '--user-agent', userAgent];
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
  request: Request,
): Promise<void> {
    response.on('error', (err) => {
      logger.warn(`[ytdlp-runner] Socket error: ${err.message}`);
    });
  logger.info(`[ytdlp-runner] Iniciando yt-dlp: url=${url}`);
  response.setHeader('Content-Type', 'video/mp2t');
  // yt-dlp pipe para ffmpeg para garantir streaming MPEG-TS
  const ytDlpArgs = buildArgs(url, userAgent, cookieFile, false);
  const ffmpegArgs = ['-i', '-', '-c', 'copy', '-f', 'mpegts', 'pipe:1'];
  const ytDlpProc = spawn('yt-dlp', ytDlpArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
  const ffmpegProc = spawn('ffmpeg', ffmpegArgs, { stdio: ['pipe', 'pipe', 'pipe'] });

  ytDlpProc.stdout.pipe(ffmpegProc.stdin);
  ffmpegProc.stdout.pipe(response);

  ytDlpProc.stderr.on('data', (data: Buffer) => {
    logger.warn(`[ytdlp-runner][yt-dlp stderr] ${String(data)}`);
  });
  ffmpegProc.stderr.on('data', (data: Buffer) => {
    logger.warn(`[ytdlp-runner][ffmpeg stderr] ${String(data)}`);
  });

  // Função de limpeza robusta e segura contra crashes
  const cleanup = (origin: string) => {
    logger.info(`[ytdlp-runner] Iniciando limpeza (origem: ${origin})...`);
    
    // 1. Desconectar pipes para evitar EPIPE no processo pai
    try {
        ytDlpProc.stdout.unpipe(ffmpegProc.stdin);
        ffmpegProc.stdout.unpipe(response);
    } catch (e) { /* ignore */ }

    // 2. Destruir streams
    try {
        if (!ytDlpProc.stdout.destroyed) ytDlpProc.stdout.destroy();
        if (!ffmpegProc.stdin.destroyed) ffmpegProc.stdin.destroy();
        if (!ffmpegProc.stdout.destroyed) ffmpegProc.stdout.destroy();
    } catch (e) { /* ignore */ }

    // 3. Matar processos
    if (!ytDlpProc.killed) ytDlpProc.kill('SIGTERM');
    if (!ffmpegProc.killed) ffmpegProc.kill('SIGTERM');

    // 4. Garantia final (watchdog de limpeza)
    setTimeout(() => {
        if (!ytDlpProc.killed) {
            logger.warn('[ytdlp-runner] Forçando SIGKILL em yt-dlp');
            try { ytDlpProc.kill('SIGKILL'); } catch(e) {}
        }
        if (!ffmpegProc.killed) {
             try { ffmpegProc.kill('SIGKILL'); } catch(e) {}
        }
    }, 2000);
  };
  
  response.on('close', () => cleanup('response-close'));
  request.on('close', () => cleanup('request-close'));
  
  // Tratar erros de pipe silenciosamente para evitar crash
  const noop = () => {};
  response.on('error', noop);
  ytDlpProc.stdout.on('error', noop);
  ffmpegProc.stdin.on('error', noop);
  ffmpegProc.stdout.on('error', noop);

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
