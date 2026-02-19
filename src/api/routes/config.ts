import { Router } from 'express';
import { getAllConfig, patchConfig, resetConfig } from '../../core/config-manager';

export function createConfigRouter(defaults: Record<string, string>): Router {
  const router = Router();

  router.get('/', (_request, response) => {
    response.json(getAllConfig());
  });

  router.patch('/', (request, response) => {
    const input = request.body as Record<string, unknown>;
    const updates: Record<string, string> = {};
    for (const [key, value] of Object.entries(input)) {
      updates[key] = String(value);
    }
    patchConfig(updates);
    response.json({ ok: true });
  });

  router.post('/export', (_request, response) => {
    response.json({ settings: getAllConfig() });
  });

  router.post('/import', (request, response) => {
    const settings = (request.body as { settings?: Record<string, unknown> }).settings;
    if (!settings) {
      response.status(400).json({ error: 'payload inválido' });
      return;
    }
    const updates: Record<string, string> = {};
    for (const [key, value] of Object.entries(settings)) {
      updates[key] = String(value);
    }
    patchConfig(updates);
    response.json({ ok: true });
  });

  router.post('/reset', (_request, response) => {
    resetConfig(defaults);
    response.json({ ok: true });
  });

  return router;
}
