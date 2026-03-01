import { ManagedProcess } from './process-manager';
import { logger } from '../core/logger';

function escapeFfmpegText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/:/g, '\\:')
    .replace(/%/g, '%%')
    .replace(/,/g, '\\,');
}

export interface FfmpegPlaceholderParams {
  imageUrl:   string;
  userAgent:  string;
  extraFlags?: string[];
  textLine1?: string;
  textLine2?: string;
  /** Called for every chunk of mpegts output. */
  onData: (chunk: Buffer) => void;
  /** Called when ffmpeg exits (code=null on signal/error). */
  onExit: (code: number | null) => void;
}

/**
 * Starts a looping ffmpeg placeholder stream (still image + silent audio).
 * Returns a ManagedProcess — the caller is responsible for killing it.
 *
 * Data is delivered via onData callbacks so the caller can fan-out to
 * multiple HTTP clients without this function knowing about them.
 */
export function startFfmpegPlaceholder(params: FfmpegPlaceholderParams): ManagedProcess {
  const { imageUrl, userAgent, extraFlags = [], textLine1, textLine2, onData, onExit } = params;

  const fontPath = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';
  const drawtext: string[] = [];

  if (textLine1) {
    drawtext.push(
      `drawtext=fontfile='${fontPath}':text='${escapeFfmpegText(textLine1)}':x=(w-text_w)/2:y=h-100:fontsize=48:fontcolor=white:borderw=2:bordercolor=black@0.8`,
    );
  }
  if (textLine2) {
    drawtext.push(
      `drawtext=fontfile='${fontPath}':text='${escapeFfmpegText(textLine2)}':x=(w-text_w)/2:y=h-50:fontsize=36:fontcolor=white:borderw=2:bordercolor=black@0.8`,
    );
  }

  const filterComplex =
    `[0:v]scale=854:480,loop=-1:1:0${drawtext.length ? ',' + drawtext.join(',') : ''}[v]`;

  const args: string[] = [
    ...extraFlags,
    '-loglevel', 'error',
    '-user_agent', userAgent,
    '-i', imageUrl,
    '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono',
    '-filter_complex', filterComplex,
    '-map', '[v]', '-map', '1:a',
    '-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '45',
    '-b:v', '150k', '-r', '1', '-g', '120', '-pix_fmt', 'yuv420p',
    '-tune', 'stillimage',
    '-c:a', 'aac', '-b:a', '24k', '-ac', '1',
    '-f', 'mpegts', 'pipe:1',
  ];

  logger.info(`[ffmpeg-runner] Iniciando placeholder: imageUrl=${imageUrl}`);

  const proc = new ManagedProcess('ffmpeg-placeholder', 'ffmpeg', args, {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  proc.stdout?.on('data', (chunk: Buffer) => onData(chunk));
  proc.stderr?.on('data', (chunk: Buffer) =>
    logger.warn(`[ffmpeg-runner][stderr] ${chunk.toString().trim()}`),
  );
  proc.onClose((code) => {
    logger.info(`[ffmpeg-runner] Placeholder finalizado code=${code}`);
    onExit(code);
  });
  proc.onError((err) => {
    logger.error(`[ffmpeg-runner] Erro: ${err}`);
    onExit(null);
  });

  return proc;
}
