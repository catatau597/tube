import { Response } from 'express';
import { spawn, ChildProcess } from 'child_process';
import { logger } from '../core/logger';

function escapeFfmpegText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/:/g, '\\:')
    .replace(/%/g, '%%')
    .replace(/,/g, '\\,');
}

function killProcessGroup(proc: ChildProcess, signal: NodeJS.Signals = 'SIGTERM'): void {
  if (!proc.pid) return;
  try {
    process.kill(-proc.pid, signal);
  } catch {
    try { proc.kill(signal); } catch (killErr) {
      logger.warn(`[ffmpeg-runner] Erro ao matar processo PID=${proc.pid}: ${killErr}`);
    }
  }
}

function cleanupProcess(proc: ChildProcess, name: string): void {
  if (!proc || proc.killed) return;
  logger.info(`[ffmpeg-runner] Iniciando cleanup de ${name} (PID=${proc.pid})`);
  if (proc.stdout) { proc.stdout.unpipe(); proc.stdout.destroy(); }
  if (proc.stderr) { proc.stderr.destroy(); }
  killProcessGroup(proc, 'SIGTERM');
  setTimeout(() => {
    if (proc && !proc.killed && proc.pid) {
      logger.warn(`[ffmpeg-runner] ${name} (PID=${proc.pid}) não respondeu ao SIGTERM, usando SIGKILL`);
      killProcessGroup(proc, 'SIGKILL');
    }
  }, 3000);
}

export async function runFfmpegPlaceholder(params: {
  imageUrl: string;
  userAgent: string;
  response: Response;
  /** Flags extras do perfil ffmpeg (inseridas antes dos args fixos) */
  extraFlags?: string[];
  textLine1?: string;
  textLine2?: string;
}): Promise<void> {
  const { imageUrl, userAgent, response, extraFlags = [], textLine1, textLine2 } = params;

  const drawtextFilters: string[] = [];
  const fontPath = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';
  if (textLine1) {
    drawtextFilters.push(
      `drawtext=fontfile='${fontPath}':text='${escapeFfmpegText(textLine1)}':x=(w-text_w)/2:y=h-100:fontsize=48:fontcolor=white:borderw=2:bordercolor=black@0.8`
    );
  }
  if (textLine2) {
    drawtextFilters.push(
      `drawtext=fontfile='${fontPath}':text='${escapeFfmpegText(textLine2)}':x=(w-text_w)/2:y=h-50:fontsize=36:fontcolor=white:borderw=2:bordercolor=black@0.8`
    );
  }
  const filterComplex = `[0:v]scale=854:480,loop=-1:1:0${
    drawtextFilters.length > 0 ? ',' + drawtextFilters.join(',') : ''
  }[v]`;

  const args = [
    ...extraFlags,
    '-loglevel', 'error',
    '-user_agent', userAgent,
    '-i', imageUrl,
    '-f', 'lavfi',
    '-i', 'anullsrc=r=44100:cl=mono',
    '-filter_complex', filterComplex,
    '-map', '[v]',
    '-map', '1:a',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-crf', '45',
    '-b:v', '150k',
    '-r', '1',
    '-g', '120',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '24k',
    '-ac', '1',
    '-tune', 'stillimage',
    '-f', 'mpegts',
    'pipe:1',
  ];

  logger.info(`[ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=${imageUrl} extraFlags=[${extraFlags.join(' ')}]`);
  response.setHeader('Content-Type', 'video/mp2t');

  const proc = spawn('ffmpeg', args, {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
  });

  proc.stdout.pipe(response);
  proc.stderr.on('data', (data) => { logger.warn(`[ffmpeg-runner][stderr] ${String(data)}`); });

  let cleaned = false;
  const cleanup = (origin: string) => {
    if (cleaned) return;
    cleaned = true;
    logger.info(`[ffmpeg-runner] Iniciando limpeza (origem: ${origin})`);
    cleanupProcess(proc, 'ffmpeg');
  };

  response.on('close', () => cleanup('response-close'));
  response.on('error', (err) => { logger.warn(`[ffmpeg-runner] Socket error: ${err.message}`); cleanup('response-error'); });

  await new Promise<void>((resolve) => {
    proc.on('close', (code) => { logger.info(`[ffmpeg-runner] ffmpeg finalizado code=${code}`); cleanup('proc-close'); resolve(); });
    proc.on('error', (err) => { logger.error(`[ffmpeg-runner] Erro: ${err}`); cleanup('proc-error'); resolve(); });
  });
}
