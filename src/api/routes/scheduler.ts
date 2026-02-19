import { Router } from 'express';
import { Scheduler } from '../../core/scheduler';

export function createSchedulerRouter(scheduler: Scheduler): Router {
  const router = Router();

  router.get('/status', (_request, response) => {
    response.json(scheduler.getStatus());
  });

  router.post('/trigger', async (_request, response) => {
    await scheduler.triggerNow();
    response.json({ ok: true });
  });

  router.post('/pause', (_request, response) => {
    scheduler.pause();
    response.json({ ok: true });
  });

  router.post('/resume', (_request, response) => {
    scheduler.resume();
    response.json({ ok: true });
  });

  return router;
}
