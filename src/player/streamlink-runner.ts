import { spawn } from 'child_process';
import { ManagedProcess } from './process-manager';
import { logger } from '../core/logger';

function buildArgs(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  extraFlags: string[],
  mode: 'stream' | 'simulate',
): string[] {
  const args = [
    ...extraFlags,
    '--http-header', `User-Agent=${userAgent}`,
    '--config', '/dev/null',
    '--no-plugin-sideloading',
  ];
  if (cookieFile) args.push('--http-cookie-jar', cookieFile);
  args.push(mode === 'stream' ? '--stdout' : '--stream-url', url, 'best');
  return args;
}

/** Quick probe: does streamlink find a playable stream at this URL? */
export async function streamlinkHasPlayableStream(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  extraFlags: string[] = [],
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    logger.info(`[streamlink-runner] Testando stream: url=${url}`);
    // Use plain spawn (short-lived, no need for ManagedProcess)
    const proc = spawn(
      'streamlink',
      buildArgs(url, userAgent, cookieFile, extraFlags, 'simulate'),
      { stdio: ['ignore', 'pipe', 'pipe'] },
    );
    let stderr = '';
    proc.stderr?.on('data', (chunk: Buffer) => {
      stderr += chunk.toString();
      logger.debug(`[streamlink-runner][probe] ${chunk.toString().trim()}`);
    });
    proc.on('close', (code) => {
      logger.info(`[streamlink-runner] Probe finalizado code=${code}`);
      if (code === 0) { resolve(true); return; }
      resolve(!/No playable streams found/i.test(stderr));
    });
    proc.on('error', (err) => {
      logger.error(`[streamlink-runner] Erro no probe: ${err}`);
      resolve(false);
    });
  });
}

export interface StreamlinkParams {
  url:        string;
  userAgent:  string;
  cookieFile: string | null;
  extraFlags: string[];
  /** Called for every chunk of mpegts output. */
  onData: (chunk: Buffer) => void;
  /** Called when streamlink exits. */
  onExit: (code: number | null) => void;
}

/**
 * Start a streamlink process piping its stdout to onData callbacks.
 * Returns a ManagedProcess — the caller is responsible for killing it.
 */
export function startStreamlink(params: StreamlinkParams): ManagedProcess {
  const { url, userAgent, cookieFile, extraFlags, onData, onExit } = params;
  logger.info(`[streamlink-runner] Iniciando stream: url=${url}`);

  const proc = new ManagedProcess(
    'streamlink',
    'streamlink',
    buildArgs(url, userAgent, cookieFile, extraFlags, 'stream'),
    { stdio: ['ignore', 'pipe', 'pipe'] },
  );

  proc.stdout?.on('data', (chunk: Buffer) => onData(chunk));
  proc.stderr?.on('data', (chunk: Buffer) =>
    logger.warn(`[streamlink-runner][stderr] ${chunk.toString().trim()}`),
  );
  proc.onClose((code) => {
    logger.info(`[streamlink-runner] Processo finalizado code=${code}`);
    onExit(code);
  });
  proc.onError((err) => {
    logger.error(`[streamlink-runner] Erro: ${err}`);
    onExit(null);
  });

  return proc;
}
