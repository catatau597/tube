
import { spawn } from 'child_process';
import { Response } from 'express';
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
    response.on('error', (err) => {
      logger.warn(`[ytdlp-runner] Socket error: ${err.code} (${err.message})`);
    });
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

  ytDlpProc.stderr.on('data', (data: Buffer) => {
    logger.warn(`[ytdlp-runner][yt-dlp stderr] ${String(data)}`);
  });
  ffmpegProc.stderr.on('data', (data: Buffer) => {
    logger.warn(`[ytdlp-runner][ffmpeg stderr] ${String(data)}`);
  });

  response.on('close', () => {
    if (!ytDlpProc.killed) ytDlpProc.kill('SIGTERM');
    if (!ffmpegProc.killed) ffmpegProc.kill('SIGTERM');
    logger.info(`[ytdlp-runner] Resposta fechada, processos yt-dlp e ffmpeg encerrados.`);
    // Fechar explicitamente todos os streams
    ytDlpProc.stdout && ytDlpProc.stdout.end && ytDlpProc.stdout.end();
    ytDlpProc.stderr && ytDlpProc.stderr.end && ytDlpProc.stderr.end();
    ytDlpProc.stdin && ytDlpProc.stdin.end && ytDlpProc.stdin.end();
    ffmpegProc.stdout && ffmpegProc.stdout.end && ffmpegProc.stdout.end();
    ffmpegProc.stderr && ffmpegProc.stderr.end && ffmpegProc.stderr.end();
    ffmpegProc.stdin && ffmpegProc.stdin.end && ffmpegProc.stdin.end();
    // Kill agressivo após timeout se ainda estiverem vivos
    setTimeout(() => {
      if (!ytDlpProc.killed) ytDlpProc.kill('SIGKILL');
      if (!ffmpegProc.killed) ffmpegProc.kill('SIGKILL');
      ytDlpProc.stdout && ytDlpProc.stdout.destroy && ytDlpProc.stdout.destroy();
      ytDlpProc.stderr && ytDlpProc.stderr.destroy && ytDlpProc.stderr.destroy();
      ytDlpProc.stdin && ytDlpProc.stdin.destroy && ytDlpProc.stdin.destroy();
      ffmpegProc.stdout && ffmpegProc.stdout.destroy && ffmpegProc.stdout.destroy();
      ffmpegProc.stderr && ffmpegProc.stderr.destroy && ffmpegProc.stderr.destroy();
      ffmpegProc.stdin && ffmpegProc.stdin.destroy && ffmpegProc.stdin.destroy();
    }, 1000);
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
