import { getAllConfig } from './config-manager';
import { Stream } from './state-manager';

function parseMap(raw: string): Record<string, string> {
  const output: Record<string, string> = {};
  for (const item of raw.split(',')) {
    if (!item.includes('|')) continue;
    const [left, right] = item.split('|', 2);
    output[left.trim()] = right.trim();
  }
  return output;
}

const PLACEHOLDER_TITLES: Record<string, string> = {
  live: 'NO MOMENTO SEM TRANSMISSÃO AO VIVO',
  upcoming: 'SEM EVENTOS AGENDADOS',
  vod: 'SEM VÍDEOS GRAVADOS',
};

export class PlaylistGenerator {
  generateM3U(
    type: 'live' | 'upcoming' | 'vod',
    mode: 'direct' | 'proxy',
    streams: Stream[],
    baseUrl: string,
  ): string {
    const cfg = getAllConfig();
    const lines = ['#EXTM3U'];
    const filtered = this.filterByType(type, streams, cfg);
    const categoryMap = parseMap(cfg.CATEGORY_MAPPINGS || '');
    const useInvisible = cfg.USE_INVISIBLE_PLACEHOLDER === 'true';
    const placeholderImage = cfg.PLACEHOLDER_IMAGE_URL || '';

    if (filtered.length === 0) {
      // Playlist vazia — adicionar placeholder
      const placeholderTitle = PLACEHOLDER_TITLES[type] || 'SEM CONTEÚDO';
      const logo = placeholderImage;

      if (useInvisible && logo) {
        // Placeholder invisível: URL comentada para ser ignorada pelo player
        lines.push(`#EXTINF:-1 tvg-id="placeholder" tvg-name="${placeholderTitle}" tvg-logo="${logo}" group-title="Placeholder",${placeholderTitle}`);
        lines.push(`#${logo}`);
      } else if (logo) {
        lines.push(`#EXTINF:-1 tvg-id="placeholder" tvg-name="${placeholderTitle}" tvg-logo="${logo}" group-title="Placeholder",${placeholderTitle}`);
        lines.push(logo);
      }

      return lines.join('\n');
    }

    for (const stream of filtered) {
      const title = this.displayTitle(stream, cfg);
      const logo = stream.thumbnailUrl || placeholderImage;
      const groupTitle = this.resolveGroupTitle(stream.categoryId, categoryMap);
      // Corrige: upcoming nunca pode ter URL 'direct', só proxy
      const isUpcoming = stream.status === 'upcoming';
      const url = (mode === 'direct' && !isUpcoming)
        ? stream.watchUrl
        : `${baseUrl}/api/stream/${encodeURIComponent(stream.videoId)}`;

      lines.push(
        `#EXTINF:-1 tvg-id="${stream.videoId}" tvg-name="${title}" tvg-logo="${logo}" group-title="${groupTitle}",${title}`,
      );
      lines.push(url);
    }

    return lines.join('\n');
  }

  generateEPG(streams: Stream[]): string {
    const cfg = getAllConfig();
    const categoryMap = parseMap(cfg.CATEGORY_MAPPINGS || '');
    const lines: string[] = ['<?xml version="1.0" encoding="UTF-8"?>', '<tv>'];
    const sorted = [...streams].sort(
      (a, b) => (a.scheduledStart?.getTime() ?? a.fetchTime.getTime()) - (b.scheduledStart?.getTime() ?? b.fetchTime.getTime()),
    );

    const channels = new Set<string>();
    for (const stream of sorted) {
      if (channels.has(stream.channelId)) continue;
      channels.add(stream.channelId);
      lines.push(`  <channel id="${stream.channelId}">`);
      lines.push(`    <display-name>${this.xml(stream.channelName)}</display-name>`);
      lines.push('  </channel>');
    }

    for (const stream of sorted) {
      const start = stream.actualStart ?? stream.scheduledStart ?? stream.fetchTime;
      const stop = stream.actualEnd ?? new Date(start.getTime() + 2 * 3600_000);
      const category = this.resolveGroupTitle(stream.categoryId, categoryMap);
      lines.push(
        `  <programme channel="${stream.channelId}" start="${this.xmltvDate(start)}" stop="${this.xmltvDate(stop)}">`,
      );
      lines.push(`    <title>${this.xml(stream.titleOriginal)}</title>`);
      lines.push(`    <desc>${this.xml(stream.description || stream.titleOriginal)}</desc>`);
      lines.push(`    <category>${this.xml(category)}</category>`);
      lines.push('  </programme>');
    }

    lines.push('</tv>');
    return lines.join('\n');
  }

  private resolveGroupTitle(categoryId: string | null, categoryMap: Record<string, string>): string {
    if (!categoryId) return 'YouTube';
    // categoryMap pode ter mapeamentos por ID ("17" → "ESPORTES") ou por nome
    return categoryMap[categoryId] || 'YouTube';
  }

  private filterByType(type: 'live' | 'upcoming' | 'vod', streams: Stream[], cfg: Record<string, string>): Stream[] {
    const maxScheduleHours = Number(cfg.MAX_SCHEDULE_HOURS || '72');
    const maxUpcomingPerChannel = Number(cfg.MAX_UPCOMING_PER_CHANNEL || '6');
    const keepRecorded = cfg.KEEP_RECORDED_STREAMS === 'true';
    const now = new Date();

    if (type === 'live') {
      return streams.filter((stream) => stream.status === 'live' && stream.actualStart && !stream.actualEnd);
    }

    if (type === 'upcoming') {
      const byChannel: Record<string, number> = {};
      return streams
        .filter((stream) => {
          if (stream.status !== 'upcoming' || !stream.scheduledStart) return false;
          const diffHours = (stream.scheduledStart.getTime() - now.getTime()) / 3600_000;
          return diffHours >= 0 && diffHours <= maxScheduleHours;
        })
        .filter((stream) => {
          byChannel[stream.channelId] = (byChannel[stream.channelId] ?? 0) + 1;
          return byChannel[stream.channelId] <= maxUpcomingPerChannel;
        });
    }

    if (!keepRecorded) return [];
    return streams.filter((stream) => stream.status === 'none');
  }

  private displayTitle(stream: Stream, cfg: Record<string, string>): string {
    const titleFilters = (cfg.TITLE_FILTER_EXPRESSIONS || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    let title = stream.titleOriginal;
    for (const expression of titleFilters) {
      title = title.replace(new RegExp(expression, 'ig'), '');
    }
    title = title.replace(/\s+/g, ' ').trim();

    const channelMap = parseMap(cfg.CHANNEL_NAME_MAPPINGS || '');
    const channel = channelMap[stream.channelName] ?? stream.channelName;
    const useBrackets = cfg.TITLE_USE_BRACKETS === 'true';

    const statusMap: Record<Stream['status'], string> = {
      live: 'AO VIVO',
      upcoming: 'AGENDADO',
      none: 'GRAVADO',
    };

    const wrap = (value: string): string => (useBrackets ? `[${value}]` : value);

    const pieces: string[] = [];
    if (cfg.PREFIX_TITLE_WITH_STATUS === 'true') {
      pieces.push(wrap(statusMap[stream.status]));
    }
    if (cfg.PREFIX_TITLE_WITH_CHANNEL_NAME === 'true') {
      pieces.push(wrap(channel));
    }
    pieces.push(title);
    return pieces.join(' ').replace(/\s+/g, ' ').trim();
  }

  private xml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  private xmltvDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hour = String(date.getUTCHours()).padStart(2, '0');
    const minute = String(date.getUTCMinutes()).padStart(2, '0');
    const second = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hour}${minute}${second} +0000`;
  }
}
