import { Router } from 'express';
import { getDb } from '../../core/db';

export function createStreamsRouter(): Router {
  const router = Router();

  router.get('/', (request, response) => {
    const { channel_id, status, start, end } = request.query as Record<string, string | undefined>;

    const clauses: string[] = [];
    const args: Array<string> = [];

    if (channel_id) {
      clauses.push('channel_id = ?');
      args.push(channel_id);
    }
    if (status) {
      clauses.push('status = ?');
      args.push(status);
    }
    if (start) {
      clauses.push('(scheduled_start >= ? OR actual_start >= ?)');
      args.push(start, start);
    }
    if (end) {
      clauses.push('(scheduled_start <= ? OR actual_start <= ?)');
      args.push(end, end);
    }

    const where = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const rows = getDb()
      .prepare(`SELECT * FROM streams ${where} ORDER BY COALESCE(actual_start, scheduled_start, updated_at) DESC`)
      .all(...args);

    response.json(rows);
  });

  return router;
}
