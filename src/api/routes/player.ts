import { Router } from 'express';
import { SmartPlayer } from '../../player/smart-player';
import { getConfigNumber } from '../../core/config-manager';
import { ThumbnailCache } from '../../core/thumbnail-cache';
import { logger } from '../../core/logger';
import fs from 'fs';

const thumbnailCache = new ThumbnailCache('/data/thumbnails');

// Prune expirado a cada 1 hora
setInterval(() => {
  thumbnailCache.pruneExpired();
}, 3_600_000);

export function createPlayerRouter(): Router {
  const router = Router();
  const player = new SmartPlayer();

  router.get('/stream/:videoId/index.m3u8', (request, response) => {
    void player
      .serveVideo(request.params.videoId, request, response)
      .catch((error) => {
        logger.error(
          `[PlayerRouter] Erro ao servir manifesto HLS ${request.params.videoId}/index.m3u8: ${String(error)}`
        );
        if (!response.writableEnded) {
          response.status(500).end();
        }
      });
  });

  router.get('/stream/:videoId/:segment', (request, response) => {
    void player
      .serveSegment(request.params.videoId, request.params.segment, response)
      .catch((error) => {
        logger.error(
          `[PlayerRouter] Erro ao servir segmento ${request.params.videoId}/${request.params.segment}: ${String(error)}`
        );
        if (!response.writableEnded) {
          response.status(500).end();
        }
      });
  });

  router.get('/stream/:videoId', (request, response) => {
    void player
      .serveVideo(request.params.videoId, request, response)
      .catch((error) => {
        logger.error(
          `[PlayerRouter] Erro ao servir manifesto HLS ${request.params.videoId}: ${String(error)}`
        );
        if (!response.writableEnded) {
          response.status(500).end();
        }
      });
  });

  router.get('/thumbnail/:videoId', async (request, response) => {
    const videoId = request.params.videoId;
    const cacheHours = getConfigNumber('PROXY_THUMBNAIL_CACHE_HOURS', 24);

    // Tentar servir do cache primeiro
    const cached = thumbnailCache.get(videoId);
    if (cached) {
      response.setHeader('Cache-Control', `public, max-age=${cacheHours * 3600}`);
      response.setHeader('Content-Type', cached.contentType);
      response.setHeader('X-Cache', 'HIT');
      
      const stream = fs.createReadStream(cached.filePath);
      stream.pipe(response);
      return;
    }

    // Nao esta em cache - fazer fetch
    const imageUrl = player.getThumbnailUrl(videoId);
    if (!imageUrl) {
      response.status(404).json({ error: 'Thumbnail nao encontrada' });
      return;
    }

    try {
      const upstream = await fetch(imageUrl);
      if (!upstream.ok || !upstream.body) {
        response.status(404).json({ error: 'Falha ao obter thumbnail' });
        return;
      }

      const contentType = upstream.headers.get('content-type') ?? 'image/jpeg';
      const imageBuffer = Buffer.from(await upstream.arrayBuffer());

      // Salvar no cache (sem bloquear response)
      void thumbnailCache.set(videoId, imageBuffer, contentType, cacheHours).catch((error) => {
        logger.error(`[PlayerRouter] Erro ao cachear thumbnail ${videoId}: ${String(error)}`);
      });

      // Servir resposta
      response.setHeader('Cache-Control', `public, max-age=${cacheHours * 3600}`);
      response.setHeader('Content-Type', contentType);
      response.setHeader('X-Cache', 'MISS');
      response.send(imageBuffer);
    } catch (error) {
      logger.error(`[PlayerRouter] Erro ao buscar thumbnail ${videoId}: ${String(error)}`);
      response.status(502).json({ error: 'Falha no proxy de thumbnail' });
    }
  });

  // Endpoint para estatisticas do cache
  router.get('/thumbnail-cache/stats', (_request, response) => {
    const stats = thumbnailCache.getStats();
    response.json({
      ...stats,
      sizeMB: (stats.sizeBytes / 1024 / 1024).toFixed(2),
    });
  });

  // Endpoint para limpar cache expirado manualmente
  router.post('/thumbnail-cache/prune', (_request, response) => {
    const count = thumbnailCache.pruneExpired();
    response.json({ removed: count });
  });

  // Endpoint para limpar TODO o cache (admin)
  router.post('/thumbnail-cache/clear', (_request, response) => {
    thumbnailCache.clear();
    response.json({ message: 'Cache limpo com sucesso' });
  });

  return router;
}
