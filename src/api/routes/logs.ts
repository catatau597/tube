import { Router } from 'express';
import fs from 'fs';
import path from 'path';

export function createLogsRouter(): Router {
  const router = Router();

  router.get('/', (request, response) => {
    const limitRaw = Number(request.query.limit ?? 200);
    const limit = Number.isFinite(limitRaw) ? Math.max(1, Math.min(1000, limitRaw)) : 200;
    const logPath = path.join('/data', 'tubewranglerr.log');

    if (!fs.existsSync(logPath)) {
      response.json([]);
      return;
    }

    const lines = fs.readFileSync(logPath, 'utf-8').split('\n').filter(Boolean);
    const tail = lines.slice(-limit).map((line) => ({
      level: inferLevel(line),
      message: line,
      timestamp: new Date().toISOString(),
    }));
    response.json(tail);
  });

  router.get('/meta', (_request, response) => {
    response.json({
      wsPath: '/ws/logs',
      levels: ['debug', 'info', 'warn', 'error'],
      modules: ['core', 'scheduler', 'youtube-api', 'smart-player'],
    });
  });

  return router;
}

function inferLevel(line: string): 'debug' | 'info' | 'warn' | 'error' {
  const text = line.toLowerCase();
  if (text.includes('error')) return 'error';
  if (text.includes('warn')) return 'warn';
  if (text.includes('debug')) return 'debug';
  return 'info';
}
