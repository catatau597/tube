import { Router } from 'express';
import { SmartPlayer } from '../../player/smart-player';
import { getConfigNumber } from '../../core/config-manager';

export function createPlayerRouter(): Router {
  const router = Router();
  const player = new SmartPlayer();

  router.get('/stream/:videoId', async (request, response) => {
    await player.serveVideo(request.params.videoId, request, response);
  });

  router.get('/thumbnail/:videoId', async (request, response) => {
    const imageUrl = player.getThumbnailUrl(request.params.videoId);
    if (!imageUrl) {
      response.status(404).json({ error: 'Thumbnail não encontrada' });
      return;
    }

    try {
      const upstream = await fetch(imageUrl);
      if (!upstream.ok || !upstream.body) {
        response.status(404).json({ error: 'Falha ao obter thumbnail' });
        return;
      }

      const cacheHours = getConfigNumber('PROXY_THUMBNAIL_CACHE_HOURS', 24);
      response.setHeader('Cache-Control', `public, max-age=${cacheHours * 3600}`);
      response.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'image/jpeg');
      const stream = upstream.body as unknown as NodeJS.ReadableStream;
      stream.pipe(response);
    } catch {
      response.status(502).json({ error: 'Falha no proxy de thumbnail' });
    }
  });

  return router;
}
