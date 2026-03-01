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
 *  - exitPromise is created in the constructor so it resolves even if the
 *    process exits before kill() is called (avoids hang on double-kill).
 */
export class ManagedProcess {
  private readonly proc: ChildProcess;

  /** Resolves as soon as the child emits 'close' or 'exit', for any reason. */
  private readonly exitPromise: Promise<void>;

  /** True once the child has already exited (exitCode or signalCode set). */
  private get alreadyExited(): boolean {
    return this.proc.exitCode !== null || this.proc.signalCode !== null;
  }

  constructor(
    private readonly tag: string,
    command: string,
    args: string[],
    options: SpawnOptions = {},
  ) {
    // Explicitly set detached:false (it is the default, but we make it explicit
    // to document the intent and guard against accidental inheritance).
    this.proc = spawn(command, args, { ...options, detached: false });

    // Build exitPromise eagerly so it resolves even if the process exits
    // before kill() is ever called.
    this.exitPromise = new Promise<void>(resolve => {
      this.proc.once('close', resolve);
      this.proc.once('exit',  resolve);
    });
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
   *
   * Safe to call multiple times (idempotent) and safe to call after the
   * process has already exited (exitPromise resolves immediately in that case).
   */
  async kill(timeoutMs = 3000): Promise<void> {
    // If already exited, exitPromise has already resolved — nothing to do.
    if (this.alreadyExited) {
      logger.info(`[${this.tag}] PID ${this.proc.pid} já encerrado, skip kill`);
      return;
    }

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

    logger.info(`[${this.tag}] SIGTERM → PID ${this.proc.pid}`);
    try { this.proc.kill('SIGTERM'); } catch { /* already dead */ }

    const died = await Promise.race([
      this.exitPromise.then(() => true  as const),
      new Promise<false>(r => setTimeout(() => r(false), timeoutMs)),
    ]);

    if (!died) {
      logger.warn(`[${this.tag}] SIGTERM timeout (${timeoutMs}ms) → SIGKILL PID ${this.proc.pid}`);
      try { this.proc.kill('SIGKILL'); } catch { /* */ }
      await this.exitPromise;
    }

    logger.info(`[${this.tag}] PID ${this.proc.pid} encerrado`);
  }
}
