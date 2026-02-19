import { spawn } from 'child_process';
import { Response } from 'express';

function buildArgs(url: string, userAgent: string, cookieFile: string | null, simulate: boolean): string[] {
  const args = ['-f', 'best', '--user-agent', userAgent];
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
    const proc = spawn('yt-dlp', buildArgs(url, userAgent, cookieFile, true));
    let out = '';
    let err = '';
    proc.stdout.on('data', (chunk) => {
      out += String(chunk);
    });
    proc.stderr.on('data', (chunk) => {
      err += String(chunk);
    });
    proc.on('close', (code) => resolve({ ok: code === 0, output: `${out}${err}`.trim() }));
    proc.on('error', (error) => resolve({ ok: false, output: String(error) }));
  });
}

export async function runYtDlp(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  response: Response,
): Promise<void> {
  response.setHeader('Content-Type', 'video/mp2t');
  const proc = spawn('yt-dlp', buildArgs(url, userAgent, cookieFile, false), {
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
