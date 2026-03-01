import fs from 'fs';
import path from 'path';
import { logger } from './logger';

interface CacheEntry {
  filePath: string;
  contentType: string;
  expiresAt: number;
}

export class ThumbnailCache {
  private readonly cacheDir: string;
  private readonly metadataPath: string;
  private metadata: Map<string, CacheEntry> = new Map();

  constructor(cacheDir: string) {
    this.cacheDir = cacheDir;
    this.metadataPath = path.join(cacheDir, 'metadata.json');
    fs.mkdirSync(cacheDir, { recursive: true });
    this.loadMetadata();
  }

  /**
   * Busca thumbnail no cache. Retorna null se não existir ou expirou.
   */
  get(videoId: string): { filePath: string; contentType: string } | null {
    const entry = this.metadata.get(videoId);
    if (!entry) return null;

    const now = Date.now();
    if (now > entry.expiresAt) {
      // Expirou - remover do cache
      this.delete(videoId);
      return null;
    }

    // Verificar se arquivo ainda existe no disco
    if (!fs.existsSync(entry.filePath)) {
      this.metadata.delete(videoId);
      this.saveMetadata();
      return null;
    }

    return {
      filePath: entry.filePath,
      contentType: entry.contentType,
    };
  }

  /**
   * Salva thumbnail no cache.
   */
  async set(
    videoId: string,
    imageBuffer: Buffer,
    contentType: string,
    ttlHours: number,
  ): Promise<void> {
    const ext = this.getExtensionFromContentType(contentType);
    const fileName = `${videoId}${ext}`;
    const filePath = path.join(this.cacheDir, fileName);

    // Salvar arquivo
    await fs.promises.writeFile(filePath, imageBuffer);

    // Atualizar metadata
    const expiresAt = Date.now() + ttlHours * 3_600_000;
    this.metadata.set(videoId, { filePath, contentType, expiresAt });
    this.saveMetadata();

    logger.debug(`[ThumbnailCache] Cached ${videoId} (expires in ${ttlHours}h)`);
  }

  /**
   * Remove thumbnail do cache.
   */
  delete(videoId: string): void {
    const entry = this.metadata.get(videoId);
    if (!entry) return;

    if (fs.existsSync(entry.filePath)) {
      fs.unlinkSync(entry.filePath);
    }

    this.metadata.delete(videoId);
    this.saveMetadata();
  }

  /**
   * Remove todos os arquivos expirados do cache.
   */
  pruneExpired(): number {
    const now = Date.now();
    let count = 0;

    for (const [videoId, entry] of this.metadata.entries()) {
      if (now > entry.expiresAt) {
        this.delete(videoId);
        count++;
      }
    }

    if (count > 0) {
      logger.info(`[ThumbnailCache] Removidos ${count} thumbnail(s) expirado(s).`);
    }

    return count;
  }

  /**
   * Limpa TODO o cache (útil para debug/manutenção).
   */
  clear(): void {
    for (const videoId of this.metadata.keys()) {
      this.delete(videoId);
    }
    logger.info('[ThumbnailCache] Cache completamente limpo.');
  }

  /**
   * Retorna estatísticas do cache.
   */
  getStats(): { total: number; expired: number; sizeBytes: number } {
    const now = Date.now();
    let expired = 0;
    let sizeBytes = 0;

    for (const entry of this.metadata.values()) {
      if (now > entry.expiresAt) {
        expired++;
      }

      if (fs.existsSync(entry.filePath)) {
        const stats = fs.statSync(entry.filePath);
        sizeBytes += stats.size;
      }
    }

    return {
      total: this.metadata.size,
      expired,
      sizeBytes,
    };
  }

  private loadMetadata(): void {
    if (!fs.existsSync(this.metadataPath)) {
      this.metadata = new Map();
      return;
    }

    try {
      const raw = fs.readFileSync(this.metadataPath, 'utf-8');
      const parsed = JSON.parse(raw) as Record<string, CacheEntry>;
      this.metadata = new Map(Object.entries(parsed));
      logger.info(`[ThumbnailCache] Metadata carregado (${this.metadata.size} entradas).`);
    } catch (error) {
      logger.error(`[ThumbnailCache] Erro ao carregar metadata: ${String(error)}`);
      this.metadata = new Map();
    }
  }

  private saveMetadata(): void {
    const obj = Object.fromEntries(this.metadata.entries());
    fs.writeFileSync(this.metadataPath, JSON.stringify(obj, null, 2), 'utf-8');
  }

  private getExtensionFromContentType(contentType: string): string {
    if (contentType.includes('png')) return '.png';
    if (contentType.includes('webp')) return '.webp';
    if (contentType.includes('gif')) return '.gif';
    return '.jpg'; // default
  }
}
