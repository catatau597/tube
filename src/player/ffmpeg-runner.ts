import { Response } from 'express';
import { spawn } from 'child_process';

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

  const drawtext: string[] = [];
  if (textLine1) {
    drawtext.push(
      `drawtext=text='${escapeFfmpegText(textLine1)}':x=(w-text_w)/2:y=h-110:fontsize=48:fontcolor=white:borderw=2:bordercolor=black@0.8`,
    );
  }
  if (textLine2) {
    drawtext.push(
      `drawtext=text='${escapeFfmpegText(textLine2)}':x=(w-text_w)/2:y=h-60:fontsize=36:fontcolor=white:borderw=2:bordercolor=black@0.8`,
    );
  }

  const filter = drawtext.length > 0 ? `scale=1280:720,${drawtext.join(',')}` : 'scale=1280:720';

  const args = [
    '-loglevel',
    'error',
    '-re',
    '-user_agent',
    userAgent,
    '-loop',
    '1',
    '-i',
    imageUrl,
    '-f',
    'lavfi',
    '-i',
    'anullsrc=r=44100:cl=stereo',
    '-filter_complex',
    `[0:v]${filter}[v]`,
    '-map',
    '[v]',
    '-map',
    '1:a',
    '-c:v',
    'libx264',
    '-preset',
    'ultrafast',
    '-tune',
    'stillimage',
    '-r',
    '1',
    '-g',
    '2',
    '-crf',
    '35',
    '-pix_fmt',
    'yuv420p',
    '-c:a',
    'aac',
    '-b:a',
    '64k',
    '-f',
    'mpegts',
    'pipe:1',
  ];

  response.setHeader('Content-Type', 'video/mp2t');
  const proc = spawn('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] });

  proc.stdout.pipe(response);
  proc.stderr.on('data', () => undefined);
  response.on('close', () => {
    if (!proc.killed) proc.kill('SIGTERM');
  });

  await new Promise<void>((resolve) => {
    proc.on('close', () => resolve());
    proc.on('error', () => resolve());
  });
}
