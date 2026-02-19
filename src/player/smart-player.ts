import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { CredentialsManager } from './credentials-manager';
import { runFfmpegPlaceholder } from './ffmpeg-runner';
import { runStreamlink, streamlinkHasPlayableStream } from './streamlink-runner';
import { runYtDlp } from './ytdlp-runner';
import { getConfig } from '../core/config-manager';

interface CacheStream {
  videoId: string;
  watchUrl: string;
  thumbnailUrl: string;
  status: 'live' | 'upcoming' | 'none';
  actualStart: string | null;
  actualEnd: string | null;
}

interface CacheFile {
  streams: Record<string, CacheStream>;
}

export class SmartPlayer {
  private readonly statePath = path.join('/data', 'state_cache.json');
  private readonly textsPath = path.join('/data', 'textos_epg.json');
  private credentials = new CredentialsManager();

  async serveVideo(videoId: string, _request: Request, response: Response): Promise<void> {
    const platform = 'youtube';
    const creds = this.credentials.resolveCredentials(platform);
    const cache = this.readStateCache();
    const stream = cache.streams[videoId];

    if (!stream) {
      const placeholder = getConfig('PLACEHOLDER_IMAGE_URL');
      if (!placeholder) {
        response.status(404).json({ error: 'Stream não encontrado e sem placeholder configurado' });
        return;
      }
      await runFfmpegPlaceholder({ imageUrl: placeholder, userAgent: creds.userAgent, response });
      return;
    }

    if (stream.status === 'live' && this.isGenuinelyLive(stream)) {
      const playable = await streamlinkHasPlayableStream(stream.watchUrl, creds.userAgent, creds.cookieFile);
      if (playable) {
        await runStreamlink(stream.watchUrl, creds.userAgent, creds.cookieFile, response);
        return;
      }
      await runYtDlp(stream.watchUrl, creds.userAgent, creds.cookieFile, response);
      return;
    }

    if (stream.status === 'none' || stream.status === 'live') {
      await runYtDlp(stream.watchUrl, creds.userAgent, creds.cookieFile, response);
      return;
    }

    const texts = this.readTextsCache()[videoId] ?? { line1: '', line2: '' };
    const image = stream.thumbnailUrl || getConfig('PLACEHOLDER_IMAGE_URL');
    if (!image) {
      response.status(404).json({ error: 'Sem thumbnail/placeholder para stream upcoming' });
      return;
    }

    await runFfmpegPlaceholder({
      imageUrl: image,
      userAgent: creds.userAgent,
      response,
      textLine1: texts.line1,
      textLine2: texts.line2,
    });
  }

  getThumbnailUrl(videoId: string): string | null {
    const cache = this.readStateCache();
    const stream = cache.streams[videoId];
    if (stream?.thumbnailUrl) return stream.thumbnailUrl;
    return getConfig('PLACEHOLDER_IMAGE_URL') || null;
  }

  private isGenuinelyLive(stream: CacheStream): boolean {
    return stream.status === 'live' && !!stream.actualStart && !stream.actualEnd;
  }

  private readStateCache(): CacheFile {
    if (!fs.existsSync(this.statePath)) return { streams: {} };
    try {
      const parsed = JSON.parse(fs.readFileSync(this.statePath, 'utf-8')) as CacheFile;
      return parsed?.streams ? parsed : { streams: {} };
    } catch {
      return { streams: {} };
    }
  }

  private readTextsCache(): Record<string, { line1: string; line2: string }> {
    if (!fs.existsSync(this.textsPath)) return {};
    try {
      return JSON.parse(fs.readFileSync(this.textsPath, 'utf-8')) as Record<string, { line1: string; line2: string }>;
    } catch {
      return {};
    }
  }
}
