import { getConfigNumber } from '../core/config-manager';

const DEFAULT_INITIAL_BEHIND_CHUNKS = 6;
const DEFAULT_MAX_CLIENT_LAG_CHUNKS = 180;
const DEFAULT_MAX_BUFFERED_CHUNKS = 720;

interface BufferWaiter {
  minIndex: number;
  resolve: (available: boolean) => void;
  timer: ReturnType<typeof setTimeout> | null;
}

export interface TsStreamBufferOptions {
  initialBehindChunks?: number;
  maxClientLagChunks?: number;
  maxBufferedChunks?: number;
}

export interface TsStreamReadResult {
  chunks: Buffer[];
  nextIndex: number;
}

/**
 * Ring buffer in memory for TS chunks.
 *
 * Index semantics:
 * - every appended chunk receives a monotonically increasing index
 * - a client cursor stores the next unread chunk index
 * - `readFrom(index)` reads chunks starting at that index
 */
export class TsStreamBuffer {
  private readonly initialBehindChunks: number;
  private readonly maxClientLagChunks: number;
  private readonly maxBufferedChunks: number;

  private readonly chunks: Buffer[] = [];
  private readonly waiters = new Set<BufferWaiter>();

  private startIndex = 0;
  private nextIndex = 0;
  private closed = false;

  constructor(options: TsStreamBufferOptions = {}) {
    this.initialBehindChunks = this.normalizePositiveInt(
      options.initialBehindChunks ?? getConfigNumber('TS_PROXY_INITIAL_BEHIND_CHUNKS', DEFAULT_INITIAL_BEHIND_CHUNKS),
      DEFAULT_INITIAL_BEHIND_CHUNKS,
    );
    this.maxClientLagChunks = this.normalizePositiveInt(
      options.maxClientLagChunks ?? getConfigNumber('TS_PROXY_MAX_CLIENT_LAG_CHUNKS', DEFAULT_MAX_CLIENT_LAG_CHUNKS),
      DEFAULT_MAX_CLIENT_LAG_CHUNKS,
    );
    this.maxBufferedChunks = this.normalizePositiveInt(
      options.maxBufferedChunks ?? getConfigNumber('TS_PROXY_MAX_BUFFERED_CHUNKS', DEFAULT_MAX_BUFFERED_CHUNKS),
      DEFAULT_MAX_BUFFERED_CHUNKS,
    );
  }

  append(chunk: Buffer): void {
    if (this.closed || chunk.length === 0) return;

    if (this.chunks.length === this.maxBufferedChunks) {
      this.chunks.shift();
      this.startIndex += 1;
    }

    this.chunks.push(chunk);
    this.nextIndex += 1;
    this.releaseWaiters();
  }

  getCurrentIndex(): number {
    return this.nextIndex - 1;
  }

  getStartIndex(): number {
    return this.startIndex;
  }

  getBufferedChunkCount(): number {
    return this.chunks.length;
  }

  getInitialClientIndex(): number {
    if (this.chunks.length === 0) return this.nextIndex;

    const rewindChunks = Math.max(1, this.initialBehindChunks);
    return Math.max(this.startIndex, this.nextIndex - rewindChunks);
  }

  readFrom(index: number, maxChunks: number): TsStreamReadResult {
    const normalizedIndex = Math.max(index, this.startIndex);
    const normalizedMaxChunks = Math.max(0, Math.trunc(maxChunks));

    if (normalizedMaxChunks === 0 || normalizedIndex >= this.nextIndex) {
      return { chunks: [], nextIndex: normalizedIndex };
    }

    const startOffset = normalizedIndex - this.startIndex;
    const endOffset = Math.min(startOffset + normalizedMaxChunks, this.chunks.length);
    const chunks = this.chunks.slice(startOffset, endOffset);

    return {
      chunks,
      nextIndex: normalizedIndex + chunks.length,
    };
  }

  isTooFarBehind(index: number): boolean {
    if (this.chunks.length === 0) return false;
    if (index < this.startIndex) return true;

    const lagChunks = this.nextIndex - index;
    return lagChunks > this.maxClientLagChunks;
  }

  skipAheadIndex(): number {
    if (this.chunks.length === 0) return this.nextIndex;

    const rewindChunks = Math.max(1, this.initialBehindChunks);
    return Math.max(this.startIndex, this.nextIndex - rewindChunks);
  }

  async waitForIndex(minIndex: number, timeoutMs: number): Promise<boolean> {
    if (this.closed) return false;
    if (this.nextIndex > minIndex) return true;

    const normalizedTimeoutMs = Math.max(0, Math.trunc(timeoutMs));

    return new Promise<boolean>((resolve) => {
      const waiter: BufferWaiter = {
        minIndex,
        resolve,
        timer: null,
      };

      if (normalizedTimeoutMs > 0) {
        waiter.timer = setTimeout(() => {
          this.waiters.delete(waiter);
          resolve(this.nextIndex > minIndex);
        }, normalizedTimeoutMs);
      }

      this.waiters.add(waiter);
    });
  }

  close(): void {
    if (this.closed) return;
    this.closed = true;

    for (const waiter of this.waiters) {
      if (waiter.timer) clearTimeout(waiter.timer);
      waiter.resolve(false);
    }

    this.waiters.clear();
  }

  private releaseWaiters(): void {
    if (this.waiters.size === 0) return;

    for (const waiter of Array.from(this.waiters)) {
      if (this.nextIndex <= waiter.minIndex) continue;
      if (waiter.timer) clearTimeout(waiter.timer);
      this.waiters.delete(waiter);
      waiter.resolve(true);
    }
  }

  private normalizePositiveInt(value: number, fallback: number): number {
    const normalized = Math.trunc(value);
    return Number.isFinite(normalized) && normalized > 0 ? normalized : fallback;
  }
}
