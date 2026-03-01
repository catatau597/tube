import { spawn, ChildProcess, SpawnOptions } from 'child_process';
import { logger } from '../core/logger';

/**
 * Thin wrapper around ChildProcess with reliable kill semantics.
 *
 * Key design decisions:
 *  - Never uses detached:true — process.kill(-pid) breaks inside Docker containers
 *    because the Node process may not be the session leader of the child's group.
 *    proc.kill('SIGTERM') is always reliable when detached:false.
 *  - SIGTERM → wait → SIGKILL pattern with a real Promise.race timeout.
 *  - Destroys all pipes before signalling to prevent SIGPIPE stalls and
 *    backpressure blocking the process from exiting.
 */
export class ManagedProcess {
  private readonly proc: ChildProcess;
  private _done = false;

  constructor(
    private readonly tag: string,
    command: string,
    args: string[],
    options: SpawnOptions = {},
  ) {
    // Explicitly set detached:false (it is the default, but we make it explicit
    // to document the intent and guard against accidental inheritance).
    this.proc = spawn(command, args, { ...options, detached: false });
  }

  get pid(): number | undefined { return this.proc.pid; }
  get stdout() { return this.proc.stdout; }
  get stderr() { return this.proc.stderr; }
  get stdin()  { return this.proc.stdin;  }

  onClose(handler: (code: number | null, signal: string | null) => void): this {
    this.proc.on('close', handler);
    return this;
  }

  onError(handler: (err: Error) => void): this {
    this.proc.on('error', handler);
    return this;
  }

  /**
   * Graceful shutdown:
   *  1. Destroy all pipes (unblocks pending reads/writes, prevents SIGPIPE stalls)
   *  2. SIGTERM — wait up to timeoutMs
   *  3. SIGKILL if still alive
   */
  async kill(timeoutMs = 3000): Promise<void> {
    if (this._done) return;
    this._done = true;

    // Destroy pipes first so the child process isn't blocked waiting for I/O
    try {
      if (this.proc.stdin && !this.proc.stdin.destroyed) this.proc.stdin.destroy();
    } catch { /* */ }
    try {
      if (this.proc.stdout && !this.proc.stdout.destroyed) {
        this.proc.stdout.unpipe();
        this.proc.stdout.destroy();
      }
    } catch { /* */ }
    try {
      if (this.proc.stderr && !this.proc.stderr.destroyed) this.proc.stderr.destroy();
    } catch { /* */ }

    const exited = new Promise<void>(resolve => {
      this.proc.once('close', resolve);
      this.proc.once('exit',  resolve);
    });

    logger.info(`[${this.tag}] SIGTERM → PID ${this.proc.pid}`);
    try { this.proc.kill('SIGTERM'); } catch { /* already dead */ }

    const died = await Promise.race([
      exited.then(() => true  as const),
      new Promise<false>(r => setTimeout(() => r(false), timeoutMs)),
    ]);

    if (!died) {
      logger.warn(`[${this.tag}] SIGTERM timeout (${timeoutMs}ms) → SIGKILL PID ${this.proc.pid}`);
      try { this.proc.kill('SIGKILL'); } catch { /* */ }
      await exited;
    }

    logger.info(`[${this.tag}] PID ${this.proc.pid} encerrado`);
  }
}
