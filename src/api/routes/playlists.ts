import { Router } from 'express';
import { PlaylistGenerator } from '../../core/playlist-generator';
import { StateManager } from '../../core/state-manager';
import { getConfig } from '../../core/config-manager';

export function createPlaylistsRouter(state: StateManager): Router {
  const router = Router();
  const generator = new PlaylistGenerator();

  const baseUrl = (): string => getConfig('TUBEWRANGLERR_URL') || 'http://localhost:8888';

  router.get('/live.m3u', (_request, response) => {
    response.type('application/x-mpegURL').send(generator.generateM3U('live', 'direct', state.getAllStreams(), baseUrl()));
  });

  router.get('/live-proxy.m3u', (_request, response) => {
    response.type('application/x-mpegURL').send(generator.generateM3U('live', 'proxy', state.getAllStreams(), baseUrl()));
  });

  router.get('/upcoming.m3u', (_request, response) => {
    response
      .type('application/x-mpegURL')
      .send(generator.generateM3U('upcoming', 'direct', state.getAllStreams(), baseUrl()));
  });

  router.get('/upcoming-proxy.m3u', (_request, response) => {
    response
      .type('application/x-mpegURL')
      .send(generator.generateM3U('upcoming', 'proxy', state.getAllStreams(), baseUrl()));
  });

  router.get('/vod.m3u', (_request, response) => {
    response.type('application/x-mpegURL').send(generator.generateM3U('vod', 'direct', state.getAllStreams(), baseUrl()));
  });

  router.get('/vod-proxy.m3u', (_request, response) => {
    response.type('application/x-mpegURL').send(generator.generateM3U('vod', 'proxy', state.getAllStreams(), baseUrl()));
  });

  router.get('/epg.xml', (_request, response) => {
    response.type('application/xml').send(generator.generateEPG(state.getAllStreams()));
  });

  return router;
}
