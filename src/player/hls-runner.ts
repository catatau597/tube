import { ManagedProcess } from './process-manager';
import { logger } from '../core/logger';
import { HlsStartProfileValues } from '../core/hls-start-profile-schema';

interface HlsOutputOptions {
  segmentDuration: string;
  listSize: string;
  flags: string;
  deleteThreshold?: string;
}

function commonHlsOutputArgs(options: HlsOutputOptions): string[] {
  const args = [
    '-f', 'hls',
    '-hls_time', options.segmentDuration,
    '-hls_list_size', options.listSize,
    '-hls_flags', options.flags,
    '-hls_allow_cache', '0',
    '-hls_segment_type', 'mpegts',
    '-start_number', '0',
  ];

  if (options.deleteThreshold) {
    args.push('-hls_delete_threshold', options.deleteThreshold);
  }

  args.push(
    '-hls_segment_filename', 'segment_%05d.ts',
    'index.m3u8',
  );

  return args;
}

function liveOptions(profile: HlsStartProfileValues): HlsOutputOptions {
  return {
    segmentDuration: String(profile.segmentDurationSeconds),
    listSize: String(profile.maxSegments),
    flags: 'delete_segments+append_list+omit_endlist+independent_segments+program_date_time+temp_file',
    deleteThreshold: profile.deleteThreshold == null ? undefined : String(profile.deleteThreshold),
  };
}

function vodOptions(profile: HlsStartProfileValues): HlsOutputOptions {
  return {
    segmentDuration: String(profile.segmentDurationSeconds),
    listSize: String(profile.maxSegments),
    flags: 'append_list+omit_endlist+independent_segments+temp_file',
    deleteThreshold: profile.deleteThreshold == null ? undefined : String(profile.deleteThreshold),
  };
}

function upcomingOptions(profile: HlsStartProfileValues): HlsOutputOptions {
  return {
    segmentDuration: String(profile.segmentDurationSeconds),
    listSize: String(profile.maxSegments),
    flags: 'append_list+omit_endlist+independent_segments+program_date_time+temp_file',
    deleteThreshold: profile.deleteThreshold == null ? undefined : String(profile.deleteThreshold),
  };
}

function attachFfmpegLogging(tag: string, proc: ManagedProcess, onExit: (code: number | null) => void): ManagedProcess {
  let finished = false;
  const finish = (code: number | null) => {
    if (finished) return;
    finished = true;
    onExit(code);
  };

  proc.stderr?.on('data', (chunk: Buffer) => {
    const line = chunk.toString().trim();
    if (!line) return;
    logger.warn(`[${tag}][stderr] ${line}`);
  });
  proc.onClose((code) => {
    logger.info(`[${tag}] finalizado code=${code}`);
    finish(code);
  });
  proc.onError((err) => {
    logger.error(`[${tag}] erro=${err}`);
    finish(null);
  });

  return proc;
}

export interface PipeHlsParams {
  dir: string;
  profile: HlsStartProfileValues;
  extraFfmpegFlags?: string[];
  onExit: (code: number | null) => void;
}

export function startPipeToHls(params: PipeHlsParams): ManagedProcess {
  const { dir, profile, extraFfmpegFlags = [], onExit } = params;
  const args = [
    ...extraFfmpegFlags,
    '-loglevel', 'error',
    '-fflags', '+genpts',
    '-i', 'pipe:0',
    '-map', '0:v:0?',
    '-map', '0:a:0?',
    '-c', 'copy',
    ...commonHlsOutputArgs(liveOptions(profile)),
  ];

  logger.info(`[hls-runner] Iniciando ffmpeg HLS via pipe dir=${dir}`);
  const proc = new ManagedProcess('ffmpeg-hls-pipe', 'ffmpeg', args, {
    cwd: dir,
    stdio: ['pipe', 'ignore', 'pipe'],
  });
  return attachFfmpegLogging('hls-runner', proc, onExit);
}

export interface UrlHlsParams {
  dir: string;
  profile: HlsStartProfileValues;
  urls: string[];
  userAgent: string;
  extraFfmpegFlags?: string[];
  paceInput?: boolean;
  onExit: (code: number | null) => void;
}

export function startUrlsToHls(params: UrlHlsParams): ManagedProcess {
  const { dir, profile, urls, userAgent, extraFfmpegFlags = [], paceInput = false, onExit } = params;
  const inputPrefix = [
    ...(paceInput ? ['-re'] : []),
    '-user_agent', userAgent,
    '-reconnect', '1',
    '-reconnect_streamed', '1',
    '-reconnect_delay_max', '5',
  ];

  const args: string[] = [
    ...extraFfmpegFlags,
    '-loglevel', 'error',
  ];

  if (urls.length >= 2) {
    args.push(
      ...inputPrefix, '-i', urls[0],
      ...inputPrefix, '-i', urls[1],
      '-map', '0:v:0',
      '-map', '1:a:0',
    );
  } else {
    args.push(...inputPrefix, '-i', urls[0], '-map', '0:v:0?', '-map', '0:a:0?');
  }

  args.push('-c', 'copy', ...commonHlsOutputArgs(vodOptions(profile)));

  logger.info(`[hls-runner] Iniciando ffmpeg HLS (${urls.length} URL${urls.length > 1 ? 's' : ''}) dir=${dir}`);
  const proc = new ManagedProcess('ffmpeg-hls-urls', 'ffmpeg', args, {
    cwd: dir,
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  return attachFfmpegLogging('hls-runner', proc, onExit);
}

export interface PlaceholderHlsParams {
  dir: string;
  profile: HlsStartProfileValues;
  imageUrl: string;
  userAgent: string;
  extraFlags?: string[];
  textLine1?: string;
  textLine2?: string;
  onExit: (code: number | null) => void;
}

function escapeFfmpegText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/:/g, '\\:')
    .replace(/%/g, '%%')
    .replace(/,/g, '\\,');
}

export function startPlaceholderToHls(params: PlaceholderHlsParams): ManagedProcess {
  const { dir, profile, imageUrl, userAgent, extraFlags = [], textLine1, textLine2, onExit } = params;
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
    `[0:v]scale=854:480${drawtext.length ? ',' + drawtext.join(',') : ''}[v]`;

  const args = [
    ...extraFlags,
    '-loglevel', 'error',
    '-fflags', '+genpts',
    '-loop', '1',
    '-framerate', '1',
    '-re',
    '-user_agent', userAgent,
    '-i', imageUrl,
    '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono',
    '-filter_complex', filterComplex,
    '-map', '[v]', '-map', '1:a',
    '-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '45',
    '-b:v', '150k',
    '-r', '1',
    '-g', '2',
    '-pix_fmt', 'yuv420p',
    '-tune', 'stillimage',
    '-c:a', 'aac', '-b:a', '24k', '-ac', '1',
    ...commonHlsOutputArgs(upcomingOptions(profile)),
  ];

  logger.info(`[hls-runner] Iniciando placeholder HLS dir=${dir} imageUrl=${imageUrl}`);
  const proc = new ManagedProcess('ffmpeg-hls-placeholder', 'ffmpeg', args, {
    cwd: dir,
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  return attachFfmpegLogging('hls-placeholder', proc, onExit);
}
