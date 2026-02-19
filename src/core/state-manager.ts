import fs from 'fs';
import path from 'path';
import { getConfig, getConfigBool, getConfigNumber } from './config-manager';
import { getDb } from './db';
import { logger } from './logger';

export interface Stream {
  videoId: string;
  channelId: string;
  channelName: string;
  titleOriginal: string;
  description: string;
  categoryId: string | null;
  watchUrl: string;
  thumbnailUrl: string;
  status: 'live' | 'upcoming' | 'none';
  scheduledStart: Date | null;
  actualStart: Date | null;
  actualEnd: Date | null;
  fetchTime: Date;
  lastSeen: Date;
}

export interface Channel {
  channelId: string;
  handle: string | null;
  title: string;
  thumbnailUrl: string;
  uploadsPlaylistId: string;
  status: 'active' | 'frozen' | 'not_found';
}

interface CacheFile {
  streams: Record<string, Omit<Stream, 'fetchTime' | 'lastSeen' | 'scheduledStart' | 'actualStart' | 'actualEnd'> & {
    fetchTime: string;
    lastSeen: string;
    scheduledStart: string | null;
    actualStart: string | null;
    actualEnd: string | null;
  }>;
  meta: { lastMainRun?: string; lastFullSync?: string };
}

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export class StateManager {
  private streams: Map<string, Stream> = new Map();
  private meta: Map<string, Date> = new Map();
  private readonly cacheFilePath: string;
  private readonly epgTextsFilePath: string;

  constructor(dataDir: string) {
    this.cacheFilePath = path.join(dataDir, 'state_cache.json');
    this.epgTextsFilePath = path.join(dataDir, 'textos_epg.json');
  }

  getAllStreams(): Stream[] {
    return Array.from(this.streams.values());
  }

  getStream(videoId: string): Stream | undefined {
    return this.streams.get(videoId);
  }

  getActiveChannels(): Channel[] {
    const rows = getDb()
      .prepare(
        'SELECT channel_id, handle, title, COALESCE(thumbnail_url,\'\') as thumbnail_url, COALESCE(uploads_playlist_id,\'\') as uploads_playlist_id, status FROM channels WHERE status = \"active\"',
      )
      .all() as Array<Record<string, unknown>>;

    return rows.map((row) => ({
        channelId: String(row.channel_id),
        handle: row.handle ? String(row.handle) : null,
        title: String(row.title),
        thumbnailUrl: String(row.thumbnail_url),
        uploadsPlaylistId: String(row.uploads_playlist_id),
        status: 'active',
      }));
  }

  countByStatus(status: Stream['status']): number {
    return Array.from(this.streams.values()).filter((stream) => stream.status === status).length;
  }

  getMeta(key: 'lastMainRun' | 'lastFullSync'): Date | undefined {
    return this.meta.get(key);
  }

  setMeta(key: 'lastMainRun' | 'lastFullSync', value: Date): void {
    this.meta.set(key, value);
  }

  markAsEnded(videoIds: string[]): void {
    const now = new Date();
    for (const id of videoIds) {
      const existing = this.streams.get(id);
      if (!existing) continue;
      existing.status = 'none';
      existing.actualEnd = existing.actualEnd ?? now;
      existing.lastSeen = now;
    }
    this._pruneEndedStreams();
  }

  updateStreams(streams: Partial<Stream>[]): void {
    const now = new Date();
    const filterByCategory = getConfigBool('FILTER_BY_CATEGORY');
    const allowedCategoryIds = new Set(
      getConfig('ALLOWED_CATEGORY_IDS')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
    );

    for (const incoming of streams) {
      if (!incoming.videoId || !incoming.channelId) continue;

      if (filterByCategory && incoming.categoryId && !allowedCategoryIds.has(incoming.categoryId)) {
        continue;
      }

      const existing = this.streams.get(incoming.videoId);
      if (!existing) {
        if (!incoming.status) continue;
        this.streams.set(incoming.videoId, {
          videoId: incoming.videoId,
          channelId: incoming.channelId,
          channelName: incoming.channelName ?? 'Desconhecido',
          titleOriginal: incoming.titleOriginal ?? '',
          description: incoming.description ?? '',
          categoryId: incoming.categoryId ?? null,
          watchUrl: incoming.watchUrl ?? `https://www.youtube.com/watch?v=${incoming.videoId}`,
          thumbnailUrl: incoming.thumbnailUrl ?? '',
          status: incoming.status,
          scheduledStart: incoming.scheduledStart ?? null,
          actualStart: incoming.actualStart ?? null,
          actualEnd: incoming.actualEnd ?? null,
          fetchTime: incoming.fetchTime ?? now,
          lastSeen: incoming.lastSeen ?? now,
        });
        continue;
      }

      const merged: Stream = {
        ...existing,
        ...incoming,
        fetchTime: now,
        lastSeen: now,
        scheduledStart: incoming.scheduledStart ?? existing.scheduledStart,
        actualStart: incoming.actualStart ?? existing.actualStart,
        actualEnd: incoming.actualEnd ?? existing.actualEnd,
      };

      if (merged.status === 'live' && merged.actualEnd instanceof Date) {
        merged.status = 'none';
      }

      this.streams.set(merged.videoId, merged);
    }

    this._pruneEndedStreams();
  }

  loadFromDisk(): boolean {
    if (!fs.existsSync(this.cacheFilePath)) {
      return false;
    }

    try {
      const content = fs.readFileSync(this.cacheFilePath, 'utf-8');
      const parsed = JSON.parse(content) as CacheFile;
      const streams = parsed.streams ?? {};

      for (const [id, value] of Object.entries(streams)) {
        this.streams.set(id, {
          ...value,
          scheduledStart: value.scheduledStart ? new Date(value.scheduledStart) : null,
          actualStart: value.actualStart ? new Date(value.actualStart) : null,
          actualEnd: value.actualEnd ? new Date(value.actualEnd) : null,
          fetchTime: new Date(value.fetchTime),
          lastSeen: new Date(value.lastSeen),
        });
      }

      if (parsed.meta.lastMainRun) this.meta.set('lastMainRun', new Date(parsed.meta.lastMainRun));
      if (parsed.meta.lastFullSync) this.meta.set('lastFullSync', new Date(parsed.meta.lastFullSync));

      logger.info(`[StateManager] Cache carregado com ${this.streams.size} streams.`);
      return true;
    } catch (error) {
      logger.error(`[StateManager] Erro ao carregar cache: ${String(error)}`);
      return false;
    }
  }

  saveToDisk(): void {
    const serializable: CacheFile = {
      streams: {},
      meta: {
        lastMainRun: this.meta.get('lastMainRun')?.toISOString(),
        lastFullSync: this.meta.get('lastFullSync')?.toISOString(),
      },
    };

    for (const stream of this.streams.values()) {
      serializable.streams[stream.videoId] = {
        ...stream,
        scheduledStart: stream.scheduledStart?.toISOString() ?? null,
        actualStart: stream.actualStart?.toISOString() ?? null,
        actualEnd: stream.actualEnd?.toISOString() ?? null,
        fetchTime: stream.fetchTime.toISOString(),
        lastSeen: stream.lastSeen.toISOString(),
      };
    }

    fs.writeFileSync(this.cacheFilePath, JSON.stringify(serializable, null, 2), 'utf-8');
  }

  saveEpgTexts(localTimezone: string): void {
    const result: Record<string, { line1: string; line2: string }> = {};

    for (const stream of this.streams.values()) {
      if (stream.status !== 'upcoming') continue;
      const start = stream.scheduledStart ?? stream.actualStart;
      if (!start) continue;
      result[stream.videoId] = this.generateEpgTexts(start, localTimezone);
    }

    fs.writeFileSync(this.epgTextsFilePath, JSON.stringify(result, null, 2), 'utf-8');
  }

  mirrorStreamsToDb(): void {
    const db = getDb();
    const upsert = db.prepare(`
      INSERT INTO streams (video_id, channel_id, title, status, scheduled_start, actual_start, actual_end, thumbnail_url, category_id, updated_at)
      VALUES (@video_id, @channel_id, @title, @status, @scheduled_start, @actual_start, @actual_end, @thumbnail_url, @category_id, datetime('now'))
      ON CONFLICT(video_id) DO UPDATE SET
        channel_id = excluded.channel_id,
        title = excluded.title,
        status = excluded.status,
        scheduled_start = excluded.scheduled_start,
        actual_start = excluded.actual_start,
        actual_end = excluded.actual_end,
        thumbnail_url = excluded.thumbnail_url,
        category_id = excluded.category_id,
        updated_at = datetime('now')
    `);

    const tx = db.transaction((payload: Stream[]) => {
      for (const stream of payload) {
        upsert.run({
          video_id: stream.videoId,
          channel_id: stream.channelId,
          title: stream.titleOriginal,
          status: stream.status,
          scheduled_start: stream.scheduledStart?.toISOString() ?? null,
          actual_start: stream.actualStart?.toISOString() ?? null,
          actual_end: stream.actualEnd?.toISOString() ?? null,
          thumbnail_url: stream.thumbnailUrl,
          category_id: stream.categoryId,
        });
      }
    });

    tx(this.getAllStreams());
  }

  private _pruneEndedStreams(): void {
    const keepRecorded = getConfigBool('KEEP_RECORDED_STREAMS');
    const maxRecordedPerChannel = getConfigNumber('MAX_RECORDED_PER_CHANNEL', 2);
    const recordedRetentionDays = getConfigNumber('RECORDED_RETENTION_DAYS', 2);
    const staleHours = getConfigNumber('STALE_HOURS', 6);
    const mainHours = getConfigNumber('SCHEDULER_MAIN_INTERVAL_HOURS', 4);

    const now = new Date();
    const staleCutoff = new Date(now.getTime() - Math.max(staleHours * 2, mainHours * 2) * 3600_000);
    const recordedCutoff = new Date(now.getTime() - recordedRetentionDays * 24 * 3600_000);

    const byChannel: Record<string, Stream[]> = {};
    for (const stream of this.streams.values()) {
      if (stream.status === 'none') {
        if (!byChannel[stream.channelId]) byChannel[stream.channelId] = [];
        byChannel[stream.channelId].push(stream);
      }
    }

    for (const stream of this.streams.values()) {
      if ((stream.status === 'live' || stream.status === 'upcoming') && stream.fetchTime < staleCutoff) {
        this.streams.delete(stream.videoId);
      }
      if (!keepRecorded && stream.status === 'none') {
        this.streams.delete(stream.videoId);
      }
    }

    if (keepRecorded) {
      for (const entries of Object.values(byChannel)) {
        entries.sort((a, b) => (b.actualEnd?.getTime() ?? 0) - (a.actualEnd?.getTime() ?? 0));
        const overLimit = entries.slice(maxRecordedPerChannel);
        for (const stream of overLimit) this.streams.delete(stream.videoId);
        for (const stream of entries) {
          const pivot = stream.actualEnd ?? stream.lastSeen;
          if (pivot < recordedCutoff) this.streams.delete(stream.videoId);
        }
      }
    }
  }

  private generateEpgTexts(scheduledStartUtc: Date, localTimezone: string): {
    line1: string;
    line2: string;
  } {
    const nowUtc = new Date();
    const deltaMs = scheduledStartUtc.getTime() - nowUtc.getTime();
    const totalSeconds = Math.floor(deltaMs / 1000);
    let line1 = '';

    if (totalSeconds > 0) {
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      if (days > 1) line1 = `Ao vivo em ${days}d ${hours}h`;
      else if (days === 1) line1 = `Ao vivo em 1d ${hours}h`;
      else if (hours > 0) line1 = `Ao vivo em ${hours}h ${minutes}m`;
      else if (minutes > 0) line1 = `Ao vivo em ${minutes}m`;
      else line1 = 'Ao vivo em instantes';
    } else {
      line1 = 'Ao vivo em instantes';
    }

    const localDate = new Date(scheduledStartUtc.toLocaleString('en-US', { timeZone: localTimezone }));
    const day = localDate.getDate();
    const month = MESES[localDate.getMonth()];
    const hhmm = scheduledStartUtc.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: localTimezone,
    });
    const line2 = `${day} ${month} às ${hhmm}`;

    return { line1, line2 };
  }
}
