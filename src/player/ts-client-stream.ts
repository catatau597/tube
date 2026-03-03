import { Response } from 'express';
import { getConfigNumber } from '../core/config-manager';
import { logger } from '../core/logger';
import { TsSession } from './ts-session-registry';

const DEFAULT_GHOST_CLIENT_THRESHOLD = 30;
const DEFAULT_READ_BATCH_CHUNKS = 4;
const DEFAULT_WAIT_TIMEOUT_MS = 250;
const DEFAULT_DRAIN_TIMEOUT_MS = 15_000;

export interface TsClientStreamOptions {
  clientId: string;
  session: TsSession;
  localIndex?: number;
  ghostClientThreshold?: number;
  readBatchChunks?: number;
  waitTimeoutMs?: number;
  drainTimeoutMs?: number;
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

  private localIndex: number;
  private consecutiveEmptyReads = 0;
  private bytesSent = 0;
  private chunksSent = 0;
  private skippedAheadCount = 0;

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
  }

  getClientId(): string {
    return this.options.clientId;
  }

  getLocalIndex(): number {
    return this.localIndex;
  }

  async pipeToResponse(response: Response): Promise<TsClientStreamResult> {
    logger.info(
      `[ts-client-stream] Cliente iniciou: key=${this.options.session.key} client=${this.options.clientId} localIndex=${this.localIndex} headIndex=${this.options.session.buffer.getCurrentIndex()}`,
    );

    while (!response.writableEnded && !response.destroyed) {
      if (this.options.session.buffer.isTooFarBehind(this.localIndex)) {
        const previousIndex = this.localIndex;
        const nextIndex = this.options.session.buffer.skipAheadIndex();
        this.localIndex = nextIndex;
        this.skippedAheadCount += 1;
        this.consecutiveEmptyReads = 0;

        logger.warn(
          `[ts-client-stream] Cliente saltou para frente: key=${this.options.session.key} client=${this.options.clientId} from=${previousIndex} to=${nextIndex} headIndex=${this.options.session.buffer.getCurrentIndex()}`,
        );
      }

      const readResult = this.options.session.buffer.readFrom(this.localIndex, this.readBatchChunks);
      if (readResult.chunks.length === 0) {
        const closed = await this.handleEmptyRead(response);
        if (closed) return this.buildResult(closed);
        continue;
      }

      this.consecutiveEmptyReads = 0;

      for (const chunk of readResult.chunks) {
        const written = await this.writeChunk(response, chunk);
        if (!written) {
          logger.warn(
            `[ts-client-stream] Cliente encerrado por atraso: key=${this.options.session.key} client=${this.options.clientId} localIndex=${this.localIndex} headIndex=${this.options.session.buffer.getCurrentIndex()}`,
          );
          this.safeEnd(response);
          return this.buildResult('drain-timeout');
        }

        this.localIndex += 1;
        this.bytesSent += chunk.length;
        this.chunksSent += 1;
      }
    }

    return this.buildResult(response.writableEnded ? 'response-ended' : 'response-destroyed');
  }

  private async handleEmptyRead(response: Response): Promise<string | null> {
    this.consecutiveEmptyReads += 1;

    if (this.isTerminalSessionState()) {
      return 'session-closed';
    }

    if (this.consecutiveEmptyReads >= this.ghostClientThreshold) {
      logger.warn(
        `[ts-client-stream] Cliente encerrado por ghost: key=${this.options.session.key} client=${this.options.clientId} localIndex=${this.localIndex} headIndex=${this.options.session.buffer.getCurrentIndex()} emptyReads=${this.consecutiveEmptyReads}`,
      );
      this.safeEnd(response);
      return 'ghost-client';
    }

    const available = await this.options.session.buffer.waitForIndex(this.localIndex, this.waitTimeoutMs);
    if (!available && this.isTerminalSessionState()) {
      return 'session-closed';
    }

    return null;
  }

  private async writeChunk(response: Response, chunk: Buffer): Promise<boolean> {
    try {
      const writeOk = response.write(chunk);
      if (writeOk) return true;
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

      const onDrain = (): void => finish(true);
      const onClose = (): void => finish(false);
      const onError = (): void => finish(false);
      const timer = setTimeout(() => finish(false), this.drainTimeoutMs);

      response.once('drain', onDrain);
      response.once('close', onClose);
      response.once('error', onError);
    });
  }

  private buildResult(reason: string): TsClientStreamResult {
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

  private safeEnd(response: Response): void {
    try {
      if (!response.writableEnded) response.end();
    } catch {
      // noop
    }
  }
}
