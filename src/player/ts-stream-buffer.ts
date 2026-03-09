import { getConfigNumber } from '../core/config-manager';
import { logger } from '../core/logger';

const DEFAULT_INITIAL_BEHIND_CHUNKS = 6;
const DEFAULT_MAX_CLIENT_LAG_CHUNKS = 180;
const DEFAULT_MAX_BUFFERED_CHUNKS = 720;
const TS_PACKET_SIZE = 188;
const TS_PACKETS_PER_CHUNK = 7;
const TS_CHUNK_SIZE = TS_PACKET_SIZE * TS_PACKETS_PER_CHUNK;

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
  private pendingBytes = Buffer.alloc(0);

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

    const merged = this.pendingBytes.length > 0
      ? Buffer.concat([this.pendingBytes, chunk])
      : chunk;
    const aligned = this.alignToPacketBoundary(merged);
    if (aligned.length < TS_CHUNK_SIZE) {
      this.pendingBytes = aligned;
      return;
    }

    const completeLen = aligned.length - (aligned.length % TS_CHUNK_SIZE);
    for (let offset = 0; offset < completeLen; offset += TS_CHUNK_SIZE) {
      const packetChunk = Buffer.from(aligned.subarray(offset, offset + TS_CHUNK_SIZE));
      this.pushChunk(packetChunk);
    }

    this.pendingBytes = Buffer.from(aligned.subarray(completeLen));
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

  skipAheadIndex(currentIndex?: number): number {
    if (this.chunks.length === 0) return this.nextIndex;

    // Evita salto agressivo para "quase ao vivo", que pode causar perdas grandes
    // e discontinuity no decoder. Reposiciona apenas o suficiente para voltar
    // para dentro da janela aceitavel de lag.
    const targetLagAfterSkip = Math.max(1, this.maxClientLagChunks - this.initialBehindChunks);
    const targetIndex = Math.max(this.startIndex, this.nextIndex - targetLagAfterSkip);
    if (typeof currentIndex === 'number') {
      return Math.max(targetIndex, Math.min(currentIndex, this.nextIndex));
    }
    return targetIndex;
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
    this.pendingBytes = Buffer.alloc(0);
  }

  private pushChunk(chunk: Buffer): void {
    if (this.chunks.length === this.maxBufferedChunks) {
      this.chunks.shift();
      this.startIndex += 1;
    }

    this.chunks.push(chunk);
    this.nextIndex += 1;
    this.releaseWaiters();
  }

  private alignToPacketBoundary(data: Buffer): Buffer {
    if (data.length < TS_PACKET_SIZE * 3) return data;
    if (this.isLikelyAligned(data, 0)) return data;

    const offset = this.findSyncOffset(data);
    if (offset >= 0) {
      if (offset > 0) {
        logger.warn(`[ts-stream-buffer] Realinhando stream TS: descartando ${offset} byte(s) fora de sync`);
      }
      return data.subarray(offset);
    }

    // Sem sync confiavel ainda; guarda apenas o tail necessario para
    // tentar recuperar alinhamento no proximo append.
    const keep = Math.min(data.length, TS_PACKET_SIZE * 2);
    return data.subarray(data.length - keep);
  }

  private isLikelyAligned(data: Buffer, offset: number): boolean {
    if (offset < 0 || offset >= data.length) return false;
    if (data[offset] !== 0x47) return false;

    const second = offset + TS_PACKET_SIZE;
    const third = second + TS_PACKET_SIZE;
    if (second >= data.length) return true;
    if (data[second] !== 0x47) return false;
    if (third >= data.length) return true;
    return data[third] === 0x47;
  }

  private findSyncOffset(data: Buffer): number {
    const maxOffset = Math.min(TS_PACKET_SIZE - 1, data.length - (TS_PACKET_SIZE * 3));
    for (let offset = 0; offset <= maxOffset; offset += 1) {
      if (this.isLikelyAligned(data, offset)) return offset;
    }
    return -1;
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
