import { google, youtube_v3 } from 'googleapis';
import { configEvents, getConfig } from './config-manager';
import { logger } from './logger';
import { Stream } from './state-manager';

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

export interface ResolvedChannel {
  channelId: string;
  handle: string | null;
  title: string;
  thumbnailUrl: string;
  uploadsPlaylistId: string;
}

export interface FetchOptions {
  /** Hora máxima no futuro para upcoming (em horas). Se undefined, não filtra. */
  maxScheduleHours?: number;
}

/**
 * Gerencia rotação de API keys com rastreamento de quota esgotada
 * e reset automático à meia-noite UTC.
 */
class ApiKeyRotator {
  private keys: string[] = [];
  private currentIndex = 0;
  private exhausted: Set<number> = new Set();
  private midnightTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this._scheduleMidnightReset();
  }

  setKeys(keys: string[]): void {
    this.keys = keys;
    this.currentIndex = 0;
    this.exhausted.clear();
  }

  getKey(): string {
    if (this.keys.length === 0) {
      throw new Error('YOUTUBE_API_KEY não configurada no banco.');
    }

    // Tenta encontrar uma key não esgotada
    for (let i = 0; i < this.keys.length; i++) {
      const idx = (this.currentIndex + i) % this.keys.length;
      if (!this.exhausted.has(idx)) {
        this.currentIndex = (idx + 1) % this.keys.length;
        return this.keys[idx];
      }
    }

    throw new Error('Todas as API keys estão esgotadas. Reset à meia-noite UTC.');
  }

  markCurrentExhausted(): void {
    const idx = (this.currentIndex - 1 + this.keys.length) % this.keys.length;
    this.exhausted.add(idx);
    logger.warn(`[ApiKeyRotator] Key #${idx} marcada como esgotada (${this.exhausted.size}/${this.keys.length}).`);
  }

  get allExhausted(): boolean {
    return this.keys.length > 0 && this.exhausted.size >= this.keys.length;
  }

  private _scheduleMidnightReset(): void {
    if (this.midnightTimer) clearTimeout(this.midnightTimer);

    const now = new Date();
    const midnight = new Date(Date.UTC(
      now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0
    ));
    const msUntilMidnight = midnight.getTime() - now.getTime();

    this.midnightTimer = setTimeout(() => {
      this.exhausted.clear();
      logger.info('[ApiKeyRotator] Reset de keys à meia-noite UTC.');
      this._scheduleMidnightReset();
    }, msUntilMidnight);

    // Não impedir o processo de fechar por causa do timer
    if (this.midnightTimer.unref) this.midnightTimer.unref();
  }
}

export class YouTubeApi {
  private rotator = new ApiKeyRotator();
  private static readonly MAX_RETRIES = 3;
  private static readonly MAX_PAGES = 40;

  constructor() {
    this.reloadKeys();
    configEvents.on('configChanged', (key: string) => {
      if (key === 'YOUTUBE_API_KEY') {
        this.reloadKeys();
      }
    });
  }

  /**
   * Wrapper que detecta 403 quotaExceeded e faz retry com outra key.
   */
  private async _call<T>(fn: (yt: youtube_v3.Youtube) => Promise<T>): Promise<T> {
    let lastError: unknown;

    for (let attempt = 0; attempt < YouTubeApi.MAX_RETRIES; attempt++) {
      try {
        const key = this.rotator.getKey();
        const yt = google.youtube({ version: 'v3', auth: key });
        return await fn(yt);
      } catch (error: unknown) {
        lastError = error;
        const isQuotaError = this.isQuotaExceeded(error);
        if (isQuotaError) {
          this.rotator.markCurrentExhausted();
          if (this.rotator.allExhausted) {
            throw new Error('Todas as API keys estão com quota esgotada.');
          }
          logger.warn(`[YouTubeApi] Quota esgotada, tentando próxima key (tentativa ${attempt + 1}/${YouTubeApi.MAX_RETRIES}).`);
          continue;
        }
        throw error;
      }
    }

    throw lastError;
  }

  private isQuotaExceeded(error: unknown): boolean {
    if (error && typeof error === 'object') {
      const err = error as Record<string, unknown>;
      if (err.code === 403 || err.status === 403) return true;
      const message = String(err.message ?? '');
      if (message.includes('quotaExceeded') || message.includes('dailyLimitExceeded')) return true;
      // googleapis wraps errors
      const response = err.response as Record<string, unknown> | undefined;
      if (response?.status === 403) return true;
    }
    return false;
  }

  async fetchByPlaylistItems(playlistId: string, options: FetchOptions = {}): Promise<Stream[]> {
    if (!playlistId) return [];

    const now = new Date();
    const maxFuture = options.maxScheduleHours ? new Date(now.getTime() + options.maxScheduleHours * 3_600_000) : null;

    const videoIds = new Set<string>();
    let nextPageToken: string | undefined;
    let pageCount = 0;
    let consecutiveOutOfWindow = 0;

    do {
      const response = await this._call((yt) =>
        yt.playlistItems.list({
          part: ['contentDetails', 'snippet'],
          playlistId,
          maxResults: 50,
          pageToken: nextPageToken,
        })
      );

      let foundAnyValidInPage = false;

      for (const item of response.data.items ?? []) {
        const publishedAt = item.snippet?.publishedAt;
        
        // Parada antecipada: playlist em ordem decrescente, se publishedAt for muito antigo, para
        if (publishedAt) {
          const publishedDate = new Date(publishedAt);
          // Se publicado mais de 30 dias atrás, provavelmente são vídeos antigos demais
          const oldThreshold = new Date(now.getTime() - 30 * 24 * 3_600_000);
          if (publishedDate < oldThreshold) {
            consecutiveOutOfWindow++;
            if (consecutiveOutOfWindow >= 50) {
              logger.info('[YouTubeApi] fetchByPlaylistItems: 50 vídeos consecutivos antigos demais, parando busca.');
              nextPageToken = undefined;
              break;
            }
            continue;
          }
        }

        const videoId = item.contentDetails?.videoId;
        if (videoId) {
          videoIds.add(videoId);
          foundAnyValidInPage = true;
          consecutiveOutOfWindow = 0;
        }
      }

      if (!foundAnyValidInPage && pageCount > 0) {
        logger.info('[YouTubeApi] fetchByPlaylistItems: nenhum vídeo válido na página, parando busca.');
        break;
      }

      nextPageToken = response.data.nextPageToken ?? undefined;
      pageCount++;
    } while (nextPageToken && pageCount < YouTubeApi.MAX_PAGES);

    if (pageCount >= YouTubeApi.MAX_PAGES) {
      logger.warn(`[YouTubeApi] fetchByPlaylistItems atingiu limite de ${YouTubeApi.MAX_PAGES} páginas.`);
    }

    const streams = await this.fetchStreamsByIds(Array.from(videoIds));
    return this.filterByTimeWindow(streams, now, maxFuture);
  }

  async fetchBySearch(channelId: string, options: FetchOptions = {}): Promise<Stream[]> {
    if (!channelId) return [];

    const now = new Date();
    const maxFuture = options.maxScheduleHours ? new Date(now.getTime() + options.maxScheduleHours * 3_600_000) : null;

    // publishedAfter: usar AGORA para evitar buscar vídeos que já passaram
    // Subtraindo 1 hora como margem de segurança (caso o relógio do servidor esteja ligeiramente adiantado)
    const publishedAfter = new Date(now.getTime() - 3_600_000).toISOString();

    const ids = new Set<string>();
    let nextPageToken: string | undefined;
    let pageCount = 0;

    do {
      const response = await this._call((yt) =>
        yt.search.list({
          part: ['snippet'],
          channelId,
          maxResults: 50,
          order: 'date',
          type: ['video'],
          publishedAfter,
          pageToken: nextPageToken,
        })
      );

      for (const item of response.data.items ?? []) {
        const id = item.id?.videoId;
        if (id) ids.add(id);
      }

      nextPageToken = response.data.nextPageToken ?? undefined;
      pageCount++;

      // Limite de páginas para evitar busca infinita
      if (pageCount >= 5) {
        logger.info('[YouTubeApi] fetchBySearch: limite de 5 páginas atingido.');
        break;
      }
    } while (nextPageToken);

    const streams = await this.fetchStreamsByIds(Array.from(ids));
    return this.filterByTimeWindow(streams, now, maxFuture);
  }

  async fetchStreamsByIds(videoIds: string[]): Promise<Stream[]> {
    if (videoIds.length === 0) return [];

    const output: Stream[] = [];
    for (const batch of chunkArray(videoIds, 50)) {
      const response = await this._call((yt) =>
        yt.videos.list({
          part: ['snippet', 'contentDetails', 'liveStreamingDetails'],
          id: batch,
        })
      );
      for (const item of response.data.items ?? []) {
        const formatted = this.formatStreamData(item);
        if (formatted) output.push(formatted);
      }
    }

    return output;
  }

  /**
   * Filtra streams pela janela de tempo válida:
   * - Lives ativas: SEMPRE incluir
   * - Upcoming: apenas se scheduledStart estiver entre now e maxFuture
   * - VOD (status=none ou actualEnd existe): NUNCA incluir
   */
  private filterByTimeWindow(streams: Stream[], now: Date, maxFuture: Date | null): Stream[] {
    const filtered: Stream[] = [];
    let countLive = 0;
    let countUpcoming = 0;
    let countRejectedVod = 0;
    let countRejectedFuture = 0;
    let countRejectedPast = 0;

    for (const stream of streams) {
      // Regra 1: VOD (tem actualEnd ou status=none) → NUNCA incluir
      if (stream.actualEnd || stream.status === 'none') {
        countRejectedVod++;
        continue;
      }

      // Regra 2: Live ativa (status=live + actualStart existe + sem actualEnd) → SEMPRE incluir
      if (stream.status === 'live' && stream.actualStart && !stream.actualEnd) {
        filtered.push(stream);
        countLive++;
        continue;
      }

      // Regra 3: Upcoming → validar scheduledStart
      if (stream.status === 'upcoming') {
        const scheduledStart = stream.scheduledStart;
        
        if (!scheduledStart) {
          // Upcoming sem scheduledStart é inválido, ignorar
          countRejectedPast++;
          continue;
        }

        // Se scheduledStart for no passado (mais de 1h atrás), provavelmente é uma live que já começou
        // mas a API ainda não atualizou o status. Vamos incluir mesmo assim para o scheduler atualizar depois.
        const oneHourAgo = new Date(now.getTime() - 3_600_000);
        if (scheduledStart < oneHourAgo) {
          countRejectedPast++;
          continue;
        }

        // Se maxFuture estiver definido, validar limite superior
        if (maxFuture && scheduledStart > maxFuture) {
          countRejectedFuture++;
          continue;
        }

        filtered.push(stream);
        countUpcoming++;
        continue;
      }

      // Qualquer outro status é rejeitado
      countRejectedVod++;
    }

    if (countRejectedVod > 0 || countRejectedFuture > 0 || countRejectedPast > 0) {
      logger.info(
        `[YouTubeApi] Filtro de janela: ${filtered.length} válidos (${countLive} live, ${countUpcoming} upcoming) | ` +
        `Rejeitados: ${countRejectedVod} VOD, ${countRejectedFuture} futuro demais, ${countRejectedPast} passado`,
      );
    }

    return filtered;
  }

  async resolveChannelByInput(input: string): Promise<ResolvedChannel | null> {
    const trimmed = input.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('@')) {
      const response = await this._call((yt) =>
        yt.search.list({
          part: ['snippet'],
          q: trimmed,
          type: ['channel'],
          maxResults: 1,
        })
      );
      const first = response.data.items?.[0];
      const channelId = first?.id?.channelId;
      if (!channelId) return null;
      return this.resolveChannelById(channelId, trimmed);
    }

    return this.resolveChannelById(trimmed, null);
  }

  private async resolveChannelById(channelId: string, handle: string | null): Promise<ResolvedChannel | null> {
    const response = await this._call((yt) =>
      yt.channels.list({
        part: ['snippet', 'contentDetails'],
        id: [channelId],
        maxResults: 1,
      })
    );

    const item = response.data.items?.[0];
    if (!item) return null;

    return {
      channelId: item.id ?? channelId,
      handle,
      title: item.snippet?.title ?? channelId,
      thumbnailUrl: item.snippet?.thumbnails?.default?.url ?? '',
      uploadsPlaylistId: item.contentDetails?.relatedPlaylists?.uploads ?? '',
    };
  }

  private formatStreamData(item: youtube_v3.Schema$Video): Stream | null {
    const videoId = item.id;
    const snippet = item.snippet;
    if (!videoId || !snippet?.channelId) return null;

    const parseDate = (value?: string | null): Date | null => (value ? new Date(value) : null);
    const now = new Date();

    const live = item.liveStreamingDetails;
    return {
      videoId,
      channelId: snippet.channelId,
      channelName: snippet.channelTitle ?? 'Desconhecido',
      titleOriginal: snippet.title ?? '',
      description: snippet.description ?? '',
      categoryId: snippet.categoryId ?? null,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl:
        snippet.thumbnails?.maxres?.url ||
        snippet.thumbnails?.standard?.url ||
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.default?.url ||
        '',
      status: (snippet.liveBroadcastContent as 'live' | 'upcoming' | 'none') ?? 'none',
      scheduledStart: parseDate(live?.scheduledStartTime),
      actualStart: parseDate(live?.actualStartTime),
      actualEnd: parseDate(live?.actualEndTime),
      fetchTime: now,
      lastSeen: now,
    };
  }

  private reloadKeys(): void {
    const raw = getConfig('YOUTUBE_API_KEY');
    const keys = raw
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    this.rotator.setKeys(keys);
    logger.info(`[YouTubeApi] Lista de chaves atualizada (${keys.length} chave(s)).`);
  }
}
