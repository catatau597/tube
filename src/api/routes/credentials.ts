import { Router } from 'express';
import { getDb } from '../../core/db';
import { logger } from '../../core/logger';

/**
 * Rota exclusiva para gerenciamento de User-Agents.
 * Cookies foram migrados para /api/cookies (tabela independente).
 */
export function createCredentialsRouter(): Router {
  const router = Router();

  /* GET /api/credentials — listar todos os UAs */
  router.get('/', (_req, res) => {
    const rows = getDb()
      .prepare("SELECT id, label, value, is_default, active, created_at FROM credentials WHERE type = 'user-agent' ORDER BY is_default DESC, id DESC")
      .all();
    res.json(rows);
  });

  /* POST /api/credentials/ua — adicionar UA */
  router.post('/ua', (req, res) => {
    const { userAgent, label } = req.body as { userAgent?: string; label?: string };
    if (!userAgent?.trim()) {
      return res.status(400).json({ error: 'userAgent é obrigatório.' });
    }

    const info = getDb()
      .prepare("INSERT INTO credentials (platform, type, label, value, active, is_default) VALUES ('global','user-agent',?,?,1,0)")
      .run(label?.trim() || userAgent.slice(0, 50), userAgent.trim());

    logger.info(`[credentials] UA adicionado id=${info.lastInsertRowid}`);
    res.json({ ok: true, id: info.lastInsertRowid });
  });

  /* DELETE /api/credentials/ua/:id — remover UA */
  router.delete('/ua/:id', (req, res) => {
    const id = Number(req.params.id);
    /* Remove referências em perfis antes de deletar */
    getDb().prepare('UPDATE tool_profiles SET ua_id = NULL WHERE ua_id = ?').run(id);
    getDb().prepare("DELETE FROM credentials WHERE id = ? AND type = 'user-agent'").run(id);
    logger.info(`[credentials] UA removido id=${id}`);
    res.json({ ok: true });
  });

  /* PATCH /api/credentials/ua/:id/default — definir como padrão */
  router.patch('/ua/:id/default', (req, res) => {
    const id = Number(req.params.id);
    const row = getDb()
      .prepare("SELECT id FROM credentials WHERE id = ? AND type = 'user-agent'")
      .get(id);

    if (!row) return res.status(404).json({ error: 'User-Agent não encontrado.' });

    getDb().prepare("UPDATE credentials SET is_default = 0 WHERE type = 'user-agent'").run();
    getDb().prepare('UPDATE credentials SET is_default = 1 WHERE id = ?').run(id);
    logger.info(`[credentials] UA padrão definido id=${id}`);
    res.json({ ok: true });
  });

  /* PATCH /api/credentials/ua/:id/toggle — ativar/desativar UA */
  router.patch('/ua/:id/toggle', (req, res) => {
    const id = Number(req.params.id);
    const row = getDb()
      .prepare("SELECT active FROM credentials WHERE id = ? AND type = 'user-agent'")
      .get(id) as { active: number } | undefined;

    if (!row) return res.status(404).json({ error: 'User-Agent não encontrado.' });

    const next = row.active === 1 ? 0 : 1;
    getDb().prepare('UPDATE credentials SET active = ? WHERE id = ?').run(next, id);
    logger.info(`[credentials] UA id=${id} active=${next === 1}`);
    res.json({ ok: true, active: next === 1 });
  });

  return router;
}
