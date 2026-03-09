import { Response } from 'express';
import { getConfigNumber } from '../core/config-manager';
import { logger } from '../core/logger';
import { TsSession, TsSessionClientSnapshot } from './ts-session-registry';

const DEFAULT_GHOST_CLIENT_THRESHOLD = 30;
const DEFAULT_READ_BATCH_CHUNKS = 6;
const DEFAULT_WAIT_TIMEOUT_MS = 250;
const DEFAULT_DRAIN_TIMEOUT_MS = 30_000;
const DEFAULT_CLIENT_IDLE_TIMEOUT_MS = 30_000;
const DEFAULT_CLIENT_WATCHDOG_INTERVAL_MS = 5_000;
const DEFAULT_FIRST_BYTE_TIMEOUT_MS = 25_000;

export interface TsClientStreamOptions {
  clientId: string;
  session: TsSession;
  localIndex?: number;
  ghostClientThreshold?: number;
  readBatchChunks?: number;
  waitTimeoutMs?: number;
  drainTimeoutMs?: number;
  clientIdleTimeoutMs?: number;
  clientWatchdogIntervalMs?: number;
  onStateChange?: (snapshot: TsSessionClientSnapshot, reason: string) => void;
}

export interface TsClientStreamResult {
  reason: string;
  clientId: string;
  localIndex: number;
  bytesSent: number;
  chunksSent: number;
  skippedAheadCount: number;
}

export class TsClientStream {
  private readonly ghostClientThreshold: number;
  private readonly readBatchChunks: number;
  private readonly waitTimeoutMs: number;
  private readonly drainTimeoutMs: number;
  private readonly clientIdleTimeoutMs: number;
  private readonly clientWatchdogIntervalMs: number;
  private readonly firstByteTimeoutMs: number;

  private localIndex: number;
  private consecutiveEmptyReads = 0;
  private bytesSent = 0;
  private chunksSent = 0;
  private skippedAheadCount = 0;
  private lastProgressAt = Date.now();
  private readonly startedAt = Date.now();
  private stopReason: string | null = null;
  private lastBufferedOutputAt = 0;
  private maxObservedBufferedOutput = 0;

  constructor(
    private readonly options: TsClientStreamOptions,
  ) {
    this.localIndex = options.localIndex ?? options.session.buffer.getInitialClientIndex();
    this.ghostClientThreshold = this.normalizePositiveInt(
      options.ghostClientThreshold ?? getConfigNumber('TS_PROXY_GHOST_CLIENT_THRESHOLD', DEFAULT_GHOST_CLIENT_THRESHOLD),
      DEFAULT_GHOST_CLIENT_THRESHOLD,
    );
    this.readBatchChunks = this.normalizePositiveInt(
      options.readBatchChunks ?? getConfigNumber('TS_PROXY_READ_BATCH_CHUNKS', DEFAULT_READ_BATCH_CHUNKS),
      DEFAULT_READ_BATCH_CHUNKS,
    );
    this.waitTimeoutMs = this.normalizePositiveInt(
      options.waitTimeoutMs ?? getConfigNumber('TS_PROXY_CLIENT_WAIT_TIMEOUT_MS', DEFAULT_WAIT_TIMEOUT_MS),
      DEFAULT_WAIT_TIMEOUT_MS,
    );
    this.drainTimeoutMs = this.normalizePositiveInt(
      options.drainTimeoutMs ?? getConfigNumber('TS_PROXY_DRAIN_TIMEOUT_MS', DEFAULT_DRAIN_TIMEOUT_MS),
      DEFAULT_DRAIN_TIMEOUT_MS,
    );
    this.clientIdleTimeoutMs = this.normalizePositiveInt(
      options.clientIdleTimeoutMs ?? getConfigNumber('TS_PROXY_CLIENT_IDLE_TIMEOUT_MS', DEFAULT_CLIENT_IDLE_TIMEOUT_MS),
      DEFAULT_CLIENT_IDLE_TIMEOUT_MS,
    );
    this.clientWatchdogIntervalMs = this.normalizePositiveInt(
      options.clientWatchdogIntervalMs ?? getConfigNumber('TS_PROXY_CLIENT_WATCHDOG_INTERVAL_MS', DEFAULT_CLIENT_WATCHDOG_INTERVAL_MS),
      DEFAULT_CLIENT_WATCHDOG_INTERVAL_MS,
    );
    this.firstByteTimeoutMs = this.normalizePositiveInt(
      getConfigNumber('TS_PROXY_FIRST_BYTE_TIMEOUT_MS', DEFAULT_FIRST_BYTE_TIMEOUT_MS),
      DEFAULT_FIRST_BYTE_TIMEOUT_MS,
    );
  }

  getClientId(): string {
    return this.options.clientId;
  }

  getLocalIndex(): number {
    return this.localIndex;
  }

  stop(reason: string): void {
    if (this.stopReason) return;
    this.stopReason = reason;
    this.emitState(reason);
  }

  async pipeToResponse(response: Response): Promise<TsClientStreamResult> {
    logger.info(
      `[ts-client-stream] Cliente iniciou: key=${this.options.session.key} client=${this.options.clientId} localIndex=${this.localIndex} headIndex=${this.options.session.buffer.getCurrentIndex()}`,
    );
    this.emitState('start');

    const watchdogTimer = this.startWatchdog(response);

    try {
      while (!response.writableEnded && !response.destroyed && !this.stopReason) {
        if (this.options.session.buffer.isTooFarBehind(this.localIndex)) {
          const previousIndex = this.localIndex;
          const nextIndex = this.options.session.buffer.skipAheadIndex();
          this.localIndex = nextIndex;
          this.skippedAheadCount += 1;
          this.consecutiveEmptyReads = 0;

          logger.warn(
            `[ts-client-stream] Cliente saltou para frente: key=${this.options.session.key} client=${this.options.clientId} from=${previousIndex} to=${nextIndex} headIndex=${this.options.session.buffer.getCurrentIndex()}`,
          );
          this.emitState('skip-ahead', response);
        }

        const readResult = this.options.session.buffer.readFrom(this.localIndex, this.readBatchChunks);
        if (readResult.chunks.length === 0) {
          const closed = await this.handleEmptyRead(response);
          if (closed) return this.buildResult(closed);
          continue;
        }

        this.consecutiveEmptyReads = 0;

        for (const chunk of readResult.chunks) {
          if (this.stopReason) return this.buildResult(this.stopReason);

          const written = await this.writeChunk(response, chunk);
          if (!written) {
            logger.warn(
              `[ts-client-stream] Cliente encerrado por atraso: key=${this.options.session.key} client=${this.options.clientId} localIndex=${this.localIndex} headIndex=${this.options.session.buffer.getCurrentIndex()}`,
            );
            this.safeEnd(response);
            this.emitState('drain-timeout', response);
            return this.buildResult('drain-timeout');
          }

          this.localIndex += 1;
          this.bytesSent += chunk.length;
          this.chunksSent += 1;
        }
      }

      if (this.stopReason) return this.buildResult(this.stopReason);
      return this.buildResult(response.writableEnded ? 'response-ended' : 'response-destroyed');
    } finally {
      clearInterval(watchdogTimer);
      this.emitState('finalize', response);
    }
  }

  private async handleEmptyRead(response: Response): Promise<string | null> {
    if (this.stopReason) return this.stopReason;

    const headIndex = this.options.session.buffer.getCurrentIndex();
    const waitingFirstByte = this.chunksSent === 0 && headIndex < 0;
    if (waitingFirstByte) {
      const elapsedMs = Date.now() - this.startedAt;
      if (elapsedMs >= this.firstByteTimeoutMs) {
        logger.warn(
          `[ts-client-stream] Cliente encerrado por timeout de first-byte: key=${this.options.session.key} client=${this.options.clientId} elapsedMs=${elapsedMs} firstByteTimeoutMs=${this.firstByteTimeoutMs}`,
        );
        this.safeEnd(response);
        this.emitState('first-byte-timeout', response);
        return 'first-byte-timeout';
      }
    }

    this.consecutiveEmptyReads += 1;

    if (this.isTerminalSessionState()) {
      return 'session-closed';
    }

    if (!waitingFirstByte && this.consecutiveEmptyReads >= this.ghostClientThreshold) {
      logger.warn(
        `[ts-client-stream] Cliente encerrado por ghost: key=${this.options.session.key} client=${this.options.clientId} localIndex=${this.localIndex} headIndex=${this.options.session.buffer.getCurrentIndex()} emptyReads=${this.consecutiveEmptyReads}`,
      );
      this.safeEnd(response);
      this.emitState('ghost-empty-read', response);
      return 'ghost-client';
    }

    const available = await this.options.session.buffer.waitForIndex(this.localIndex, this.waitTimeoutMs);
    if (this.stopReason) return this.stopReason;
    if (!available && this.isTerminalSessionState()) {
      return 'session-closed';
    }

    return null;
  }

  private async writeChunk(response: Response, chunk: Buffer): Promise<boolean> {
    try {
      const writeOk = response.write(chunk);
      if (writeOk) {
        this.markProgress();
        this.emitState('write-ok', response);
        return true;
      }
      this.emitState('write-backpressure', response);
      return this.waitForDrain(response);
    } catch (error) {
      logger.warn(
        `[ts-client-stream] Erro ao escrever chunk: key=${this.options.session.key} client=${this.options.clientId} err=${String(error)}`,
      );
      return false;
    }
  }

  private async waitForDrain(response: Response): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let settled = false;

      const finish = (value: boolean): void => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        response.off('drain', onDrain);
        response.off('close', onClose);
        response.off('error', onError);
        resolve(value);
      };

      const onDrain = (): void => {
        this.markProgress();
        this.emitState('drain', response);
        finish(true);
      };
      const onClose = (): void => {
        this.stop('response-close');
        this.emitState('response-close', response);
        finish(false);
      };
      const onError = (): void => {
        this.stop('response-error');
        this.emitState('response-error', response);
        finish(false);
      };
      const timer = setTimeout(() => finish(false), this.drainTimeoutMs);

      response.once('drain', onDrain);
      response.once('close', onClose);
      response.once('error', onError);
    });
  }

  private buildResult(reason: string): TsClientStreamResult {
    this.emitState(`result:${reason}`);
    logger.info(
      `[ts-client-stream] Cliente finalizado: key=${this.options.session.key} client=${this.options.clientId} reason=${reason} localIndex=${this.localIndex} chunksSent=${this.chunksSent} skippedAhead=${this.skippedAheadCount}`,
    );

    return {
      reason,
      clientId: this.options.clientId,
      localIndex: this.localIndex,
      bytesSent: this.bytesSent,
      chunksSent: this.chunksSent,
      skippedAheadCount: this.skippedAheadCount,
    };
  }

  private isTerminalSessionState(): boolean {
    return this.options.session.state === 'stopped'
      || this.options.session.state === 'stopping'
      || this.options.session.state === 'error';
  }

  private normalizePositiveInt(value: number, fallback: number): number {
    const normalized = Math.trunc(value);
    return Number.isFinite(normalized) && normalized > 0 ? normalized : fallback;
  }

  private startWatchdog(response: Response): ReturnType<typeof setInterval> {
    return setInterval(() => {
      if (this.stopReason || response.writableEnded || response.destroyed) return;

      const socket = response.socket;
      const idleMs = Date.now() - this.lastProgressAt;
      const writableNeedDrain = (response as unknown as { writableNeedDrain?: boolean }).writableNeedDrain ?? false;
      const writableLength = response.writableLength ?? 0;
      const socketBufferSize = socket?.bufferSize ?? 0;
      const bufferedOutput = writableLength + socketBufferSize;
      const socketDestroyed = socket?.destroyed ?? false;
      const socketWritable = socket?.writable ?? true;

      if (bufferedOutput > 0) {
        if (this.lastBufferedOutputAt === 0) this.lastBufferedOutputAt = Date.now();
        this.maxObservedBufferedOutput = Math.max(this.maxObservedBufferedOutput, bufferedOutput);
      } else {
        this.lastBufferedOutputAt = 0;
      }

      if (socketDestroyed || !socketWritable) {
        logger.warn(
          `[ts-client-stream] Cliente encerrado por socket: key=${this.options.session.key} client=${this.options.clientId} destroyed=${socketDestroyed} writable=${socketWritable}`,
        );
        this.stop('socket-closed');
        this.safeEnd(response);
        this.emitState('watchdog-socket', response);
        return;
      }

      if (writableNeedDrain && idleMs >= this.clientIdleTimeoutMs) {
        logger.warn(
          `[ts-client-stream] Cliente encerrado por ghost: key=${this.options.session.key} client=${this.options.clientId} localIndex=${this.localIndex} headIndex=${this.options.session.buffer.getCurrentIndex()} idleMs=${idleMs}`,
        );
        this.stop('ghost-client');
        this.safeEnd(response);
        this.emitState('watchdog-need-drain', response);
        return;
      }

      if (bufferedOutput > 0 && this.lastBufferedOutputAt > 0 && (Date.now() - this.lastBufferedOutputAt) >= this.clientIdleTimeoutMs) {
        logger.warn(
          `[ts-client-stream] Cliente encerrado por buffer parado: key=${this.options.session.key} client=${this.options.clientId} localIndex=${this.localIndex} headIndex=${this.options.session.buffer.getCurrentIndex()} idleMs=${idleMs} bufferedOutput=${bufferedOutput} maxBufferedOutput=${this.maxObservedBufferedOutput}`,
        );
        this.stop('ghost-buffered-output');
        this.safeEnd(response);
        this.emitState('watchdog-buffered-output', response);
        return;
      }

      this.emitState('watchdog', response);
    }, this.clientWatchdogIntervalMs);
  }

  private markProgress(): void {
    this.lastProgressAt = Date.now();
    this.lastBufferedOutputAt = 0;
    this.maxObservedBufferedOutput = 0;
  }

  private emitState(reason: string, response?: Response): void {
    if (!this.options.onStateChange) return;

    const socket = response?.socket;
    this.options.onStateChange(
      {
        clientId: this.options.clientId,
        localIndex: this.localIndex,
        headIndex: this.options.session.buffer.getCurrentIndex(),
        bytesSent: this.bytesSent,
        chunksSent: this.chunksSent,
        consecutiveEmptyReads: this.consecutiveEmptyReads,
        writableLength: response?.writableLength ?? 0,
        socketBufferSize: socket?.bufferSize ?? 0,
        writableNeedDrain: (response as unknown as { writableNeedDrain?: boolean } | undefined)?.writableNeedDrain ?? false,
        responseDestroyed: response?.destroyed ?? false,
        responseEnded: response?.writableEnded ?? false,
        socketDestroyed: socket?.destroyed ?? false,
        socketWritable: socket?.writable ?? true,
        stopReason: this.stopReason,
      },
      reason,
    );
  }

  private safeEnd(response: Response): void {
    try {
      if (!response.writableEnded) response.end();
    } catch {
      // noop
    }
  }
}
