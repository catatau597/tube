import { spawn } from 'child_process';
import { Response } from 'express';

function buildArgs(url: string, userAgent: string, cookieFile: string | null, mode: 'stream' | 'url' | 'simulate'): string[] {
  const args = ['--http-header', `User-Agent=${userAgent}`, '--config', '/dev/null', '--no-plugin-sideloading'];
  if (cookieFile) args.push('--http-cookie-jar', cookieFile);
  if (mode === 'stream') {
    args.push('--stdout', url, 'best');
  } else if (mode === 'url') {
    args.push('--stream-url', url, 'best');
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
    const proc = spawn('streamlink', buildArgs(url, userAgent, cookieFile, 'simulate'));
    let stderr = '';
    proc.stderr.on('data', (chunk) => {
      stderr += String(chunk);
    });
    proc.on('close', (code) => {
      if (code === 0) {
        resolve(true);
        return;
      }
      resolve(!/No playable streams found/i.test(stderr));
    });
    proc.on('error', () => resolve(false));
  });
}

export async function runStreamlink(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  response: Response,
): Promise<void> {
  response.setHeader('Content-Type', 'video/mp2t');
  const proc = spawn('streamlink', buildArgs(url, userAgent, cookieFile, 'stream'), {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  proc.stdout.pipe(response);
  response.on('close', () => {
    if (!proc.killed) proc.kill('SIGTERM');
  });

  await new Promise<void>((resolve) => {
    proc.on('close', () => resolve());
    proc.on('error', () => resolve());
  });
}
