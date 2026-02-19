import { Router } from 'express';
import { PlaylistGenerator } from '../../core/playlist-generator';
import { StateManager } from '../../core/state-manager';
import { getConfig, getConfigBool } from '../../core/config-manager';

export function createPlaylistsRouter(state: StateManager): Router {
  const router = Router();
  const generator = new PlaylistGenerator();

  const baseUrl = (): string => getConfig('TUBEWRANGLERR_URL') || 'http://localhost:8888';

  const checkDirect = (_req: unknown, res: any, next: () => void) => {
    if (!getConfigBool('PLAYLIST_GENERATE_DIRECT')) {
      res.status(404).json({ error: 'Playlists diretas desabilitadas' });
      return;
    }
    next();
  };

  const checkProxy = (_req: unknown, res: any, next: () => void) => {
    if (!getConfigBool('PLAYLIST_GENERATE_PROXY')) {
      res.status(404).json({ error: 'Playlists proxy desabilitadas' });
      return;
    }
    next();
  };

  router.get('/live.m3u', checkDirect, (_request, response) => {
    response.type('application/x-mpegURL').send(generator.generateM3U('live', 'direct', state.getAllStreams(), baseUrl()));
  });

  router.get('/live-proxy.m3u', checkProxy, (_request, response) => {
    response.type('application/x-mpegURL').send(generator.generateM3U('live', 'proxy', state.getAllStreams(), baseUrl()));
  });

  router.get('/upcoming.m3u', checkDirect, (_request, response) => {
    response
      .type('application/x-mpegURL')
      .send(generator.generateM3U('upcoming', 'direct', state.getAllStreams(), baseUrl()));
  });

  router.get('/upcoming-proxy.m3u', checkProxy, (_request, response) => {
    response
      .type('application/x-mpegURL')
      .send(generator.generateM3U('upcoming', 'proxy', state.getAllStreams(), baseUrl()));
  });

  router.get('/vod.m3u', checkDirect, (_request, response) => {
    response.type('application/x-mpegURL').send(generator.generateM3U('vod', 'direct', state.getAllStreams(), baseUrl()));
  });

  router.get('/vod-proxy.m3u', checkProxy, (_request, response) => {
    response.type('application/x-mpegURL').send(generator.generateM3U('vod', 'proxy', state.getAllStreams(), baseUrl()));
  });

  router.get('/epg.xml', (_request, response) => {
    response.type('application/xml').send(generator.generateEPG(state.getAllStreams()));
  });

  return router;
}
