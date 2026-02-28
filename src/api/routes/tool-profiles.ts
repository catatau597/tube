import { Router } from 'express';
import { getDb } from '../../core/db';
import { logger } from '../../core/logger';

const router = Router();

export const SUPPORTED_TOOLS = ['streamlink', 'yt-dlp', 'ffmpeg'] as const;
type SupportedTool = typeof SUPPORTED_TOOLS[number];

interface ToolProfileRow {
  id: number;
  name: string;
  tool: SupportedTool;
  flags: string;
  cookie_id: number | null;
  ua_id: number | null;
  is_active: number;
  created_at: string;
  updated_at: string;
  cookie_name: string | null;
  ua_label: string | null;
}

function defaultProfile(tool: SupportedTool) {
  return {
    id: 'default',
    name: 'Default (Sistema)',
    tool,
    flags: '',
    cookie_id: null,
    ua_id: null,
    is_active: 0,
    is_default: true,
    cookie_name: null,
    ua_label: null,
  };
}

/* GET /api/tool-profiles */
router.get('/', (_req, res) => {
  try {
    const db = getDb();
    const rows = db.prepare(`
      SELECT
        tp.*,
        c.name   AS cookie_name,
        cr.label AS ua_label
      FROM tool_profiles tp
      LEFT JOIN cookies     c  ON c.id  = tp.cookie_id
      LEFT JOIN credentials cr ON cr.id = tp.ua_id
      ORDER BY tp.tool, tp.name
    `).all() as ToolProfileRow[];

    // Sempre incluir perfis virtuais para cada ferramenta
    const result: unknown[] = [];
    for (const tool of SUPPORTED_TOOLS) {
      result.push(defaultProfile(tool));
      result.push(...rows.filter((r) => r.tool === tool));
    }

    res.json(result);
  } catch (err) {
    logger.error('[tool-profiles] Erro ao listar:', err);
    res.status(500).json({ error: 'Falha ao listar perfis.' });
  }
});

/* POST /api/tool-profiles */
router.post('/', (req, res) => {
  try {
    const { name, tool, flags, cookie_id, ua_id } = req.body as {
      name?: string; tool?: string; flags?: string;
      cookie_id?: number | null; ua_id?: number | null;
    };

    if (!name?.trim()) return res.status(400).json({ error: 'Nome é obrigatório.' });
    if (!tool || !(SUPPORTED_TOOLS as readonly string[]).includes(tool)) {
      return res.status(400).json({ error: `Ferramenta deve ser: ${SUPPORTED_TOOLS.join(', ')}.` });
    }

    const db = getDb();
    const result = db.prepare(`
      INSERT INTO tool_profiles (name, tool, flags, cookie_id, ua_id, is_active)
      VALUES (?, ?, ?, ?, ?, 0)
    `).run(name.trim(), tool, flags?.trim() || '', cookie_id ?? null, ua_id ?? null);

    logger.info(`[tool-profiles] Perfil criado: ${name} (${tool})`);
    res.json({ id: result.lastInsertRowid, message: 'Perfil criado com sucesso.' });
  } catch (err) {
    logger.error('[tool-profiles] Erro ao criar:', err);
    res.status(500).json({ error: 'Falha ao criar perfil.' });
  }
});

/* PUT /api/tool-profiles/:id */
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, flags, cookie_id, ua_id } = req.body as {
      name?: string; flags?: string;
      cookie_id?: number | null; ua_id?: number | null;
    };

    const db = getDb();
    if (!db.prepare('SELECT id FROM tool_profiles WHERE id = ?').get(id)) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    db.prepare(`
      UPDATE tool_profiles
      SET name      = COALESCE(?, name),
          flags     = COALESCE(?, flags),
          cookie_id = ?,
          ua_id     = ?,
          updated_at = datetime('now')
      WHERE id = ?
    `).run(name?.trim() ?? null, flags?.trim() ?? null, cookie_id ?? null, ua_id ?? null, id);

    logger.info(`[tool-profiles] Perfil atualizado: id=${id}`);
    res.json({ message: 'Perfil atualizado com sucesso.' });
  } catch (err) {
    logger.error('[tool-profiles] Erro ao atualizar:', err);
    res.status(500).json({ error: 'Falha ao atualizar perfil.' });
  }
});

/* PATCH /api/tool-profiles/:id/activate */
router.patch('/:id/activate', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const profile = db.prepare('SELECT tool, name FROM tool_profiles WHERE id = ?').get(id) as
      | { tool: string; name: string } | undefined;

    if (!profile) return res.status(404).json({ error: 'Perfil não encontrado.' });

    db.prepare('UPDATE tool_profiles SET is_active = 0 WHERE tool = ?').run(profile.tool);
    db.prepare("UPDATE tool_profiles SET is_active = 1, updated_at = datetime('now') WHERE id = ?").run(id);

    logger.info(`[tool-profiles] Perfil ativado: ${profile.name} (${profile.tool})`);
    res.json({ message: 'Perfil ativado com sucesso.' });
  } catch (err) {
    logger.error('[tool-profiles] Erro ao ativar:', err);
    res.status(500).json({ error: 'Falha ao ativar perfil.' });
  }
});

/* PATCH /api/tool-profiles/:id/deactivate */
router.patch('/:id/deactivate', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const profile = db.prepare('SELECT tool, name FROM tool_profiles WHERE id = ?').get(id) as
      | { tool: string; name: string } | undefined;

    if (!profile) return res.status(404).json({ error: 'Perfil não encontrado.' });

    db.prepare("UPDATE tool_profiles SET is_active = 0, updated_at = datetime('now') WHERE id = ?").run(id);
    logger.info(`[tool-profiles] Perfil desativado: ${profile.name} (${profile.tool})`);
    res.json({ message: 'Perfil desativado com sucesso.' });
  } catch (err) {
    logger.error('[tool-profiles] Erro ao desativar:', err);
    res.status(500).json({ error: 'Falha ao desativar perfil.' });
  }
});

/* DELETE /api/tool-profiles/:id */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const profile = db.prepare('SELECT name, tool FROM tool_profiles WHERE id = ?').get(id) as
      | { name: string; tool: string } | undefined;

    if (!profile) return res.status(404).json({ error: 'Perfil não encontrado.' });

    db.prepare('DELETE FROM tool_profiles WHERE id = ?').run(id);
    logger.info(`[tool-profiles] Perfil removido: ${profile.name} (${profile.tool})`);
    res.json({ message: 'Perfil removido com sucesso.' });
  } catch (err) {
    logger.error('[tool-profiles] Erro ao remover:', err);
    res.status(500).json({ error: 'Falha ao remover perfil.' });
  }
});

export default router;
