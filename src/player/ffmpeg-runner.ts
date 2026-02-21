
import { Response } from 'express';
import { spawn } from 'child_process';
import { logger } from '../core/logger';

function escapeFfmpegText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/:/g, '\\:')
    .replace(/%/g, '%%')
    .replace(/,/g, '\\,');
}

export async function runFfmpegPlaceholder(params: {
  imageUrl: string;
  userAgent: string;
  response: Response;
  textLine1?: string;
  textLine2?: string;
}): Promise<void> {
  const { imageUrl, userAgent, response, textLine1, textLine2 } = params;

  // Monta filtros drawtext igual ao Python
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
  // Filtro otimizado: 1 fps, sem loop/fps extra
  const filterComplex = `[0:v]scale=1280:720${drawtextFilters.length > 0 ? ',' + drawtextFilters.join(',') : ''}[v]`;

  const args = [
    '-loglevel', 'error',
    '-user_agent', userAgent,
    '-i', imageUrl,
    '-f', 'lavfi',
    '-i', 'anullsrc=r=44100:cl=stereo',
    '-filter_complex', filterComplex,
    '-map', '[v]',
    '-map', '1:a',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-crf', '40',
    '-b:v', '300k',
    '-r', '1',
    '-g', '60',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '32k',
    '-tune', 'stillimage',
    '-f', 'mpegts',
    'pipe:1',
  ];

  // Log detalhado do comando ffmpeg e do user agent
  // eslint-disable-next-line no-console
  console.log('[ffmpeg-runner] Comando ffmpeg:', 'ffmpeg', args.map(a => `'${a}'`).join(' '));
  // eslint-disable-next-line no-console
  console.log('[ffmpeg-runner] User-Agent:', userAgent);

  logger.info(`[ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=${imageUrl}`);
  response.setHeader('Content-Type', 'video/mp2t');
  const proc = spawn('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] });

  proc.stdout.pipe(response);
  proc.stderr.on('data', (data) => {
    logger.warn(`[ffmpeg-runner][stderr] ${String(data)}`);
  });
  response.on('close', () => {
    if (!proc.killed) proc.kill('SIGTERM');
    logger.info(`[ffmpeg-runner] Resposta fechada, processo ffmpeg encerrado.`);
  });

  await new Promise<void>((resolve) => {
    proc.on('close', (code) => {
      logger.info(`[ffmpeg-runner] ffmpeg finalizado com code=${code}`);
      resolve();
    });
    proc.on('error', (err) => {
      logger.error(`[ffmpeg-runner] Erro ao iniciar ffmpeg: ${err}`);
      resolve();
    });
  });
}
