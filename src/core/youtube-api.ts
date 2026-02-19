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

export class YouTubeApi {
  private apiKeys: string[] = [];
  private apiKeyIndex = 0;

  constructor() {
    this.reloadKeys();
    configEvents.on('configChanged', (key: string) => {
      if (key === 'YOUTUBE_API_KEY') {
        this.reloadKeys();
      }
    });
  }

  async fetchByPlaylistItems(playlistId: string, publishedAfter?: string): Promise<Stream[]> {
    if (!playlistId) return [];

    const videoIds = new Set<string>();
    let nextPageToken: string | undefined;

    do {
      const response = await this.youtube().playlistItems.list({
        part: ['contentDetails', 'snippet'],
        playlistId,
        maxResults: 50,
        pageToken: nextPageToken,
      });

      for (const item of response.data.items ?? []) {
        const publishedAt = item.snippet?.publishedAt;
        if (publishedAfter && publishedAt && new Date(publishedAt) < new Date(publishedAfter)) {
          continue;
        }
        const videoId = item.contentDetails?.videoId;
        if (videoId) videoIds.add(videoId);
      }

      nextPageToken = response.data.nextPageToken ?? undefined;
    } while (nextPageToken);

    return this.fetchStreamsByIds(Array.from(videoIds));
  }

  async fetchBySearch(channelId: string, publishedAfter?: string): Promise<Stream[]> {
    if (!channelId) return [];

    const ids = new Set<string>();
    let nextPageToken: string | undefined;
    do {
      const response = await this.youtube().search.list({
        part: ['snippet'],
        channelId,
        maxResults: 50,
        order: 'date',
        type: ['video'],
        eventType: 'completed',
        publishedAfter,
        pageToken: nextPageToken,
      });
      for (const item of response.data.items ?? []) {
        const id = item.id?.videoId;
        if (id) ids.add(id);
      }
      nextPageToken = response.data.nextPageToken ?? undefined;
    } while (nextPageToken);

    return this.fetchStreamsByIds(Array.from(ids));
  }

  async fetchStreamsByIds(videoIds: string[]): Promise<Stream[]> {
    if (videoIds.length === 0) return [];

    const output: Stream[] = [];
    for (const batch of chunkArray(videoIds, 50)) {
      const response = await this.youtube().videos.list({
        part: ['snippet', 'contentDetails', 'liveStreamingDetails'],
        id: batch,
      });
      for (const item of response.data.items ?? []) {
        const formatted = this.formatStreamData(item);
        if (formatted) output.push(formatted);
      }
    }

    return output;
  }

  async resolveChannelByInput(input: string): Promise<ResolvedChannel | null> {
    const trimmed = input.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('@')) {
      const response = await this.youtube().search.list({
        part: ['snippet'],
        q: trimmed,
        type: ['channel'],
        maxResults: 1,
      });
      const first = response.data.items?.[0];
      const channelId = first?.id?.channelId;
      if (!channelId) return null;
      return this.resolveChannelById(channelId, trimmed);
    }

    return this.resolveChannelById(trimmed, null);
  }

  private async resolveChannelById(channelId: string, handle: string | null): Promise<ResolvedChannel | null> {
    const response = await this.youtube().channels.list({
      part: ['snippet', 'contentDetails'],
      id: [channelId],
      maxResults: 1,
    });

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
    this.apiKeys = raw
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    this.apiKeyIndex = 0;
    logger.info(`[YouTubeApi] Lista de chaves atualizada (${this.apiKeys.length} chave(s)).`);
  }

  private nextApiKey(): string {
    if (this.apiKeys.length === 0) {
      throw new Error('YOUTUBE_API_KEY não configurada no banco.');
    }
    const key = this.apiKeys[this.apiKeyIndex % this.apiKeys.length];
    this.apiKeyIndex += 1;
    return key;
  }

  private youtube(): youtube_v3.Youtube {
    return google.youtube({ version: 'v3', auth: this.nextApiKey() });
  }
}
