import { Router } from 'express';
import { getDb } from '../../core/db';
import { logger } from '../../core/logger';

const VALID_TOOLS = ['streamlink', 'yt-dlp', 'ffmpeg'] as const;
type ToolType = typeof VALID_TOOLS[number];

interface ToolProfile {
  id: number;
  name: string;
  tool: ToolType;
  flags: string;
  cookie_id: number | null;
  ua_id: number | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

const router = Router();

/* GET /api/tool-profiles
 * Retorna todos os perfis agrupados por ferramenta.
 * Inclui linhas virtuais "padrão" para cada ferramenta (sem id).
 */
router.get('/', (_req, res) => {
  try {
    const profiles = getDb()
      .prepare('SELECT * FROM tool_profiles ORDER BY tool, name')
      .all() as ToolProfile[];
    res.json(profiles);
  } catch (err) {
    logger.error('[tool-profiles] Erro ao listar:', err);
    res.status(500).json({ error: 'Falha ao listar perfis.' });
  }
});

/* POST /api/tool-profiles */
router.post('/', (req, res) => {
  try {
    const { name, tool, flags, cookie_id, ua_id } = req.body as {
      name?: string;
      tool?: string;
      flags?: string;
      cookie_id?: number | null;
      ua_id?: number | null;
    };

    if (!name?.trim()) {
      return res.status(400).json({ error: 'Nome é obrigatório.' });
    }
    if (!tool || !VALID_TOOLS.includes(tool as ToolType)) {
      return res.status(400).json({ error: `Ferramenta deve ser: ${VALID_TOOLS.join(', ')}.` });
    }

    const result = getDb()
      .prepare(
        'INSERT INTO tool_profiles (name, tool, flags, cookie_id, ua_id, is_active) VALUES (?, ?, ?, ?, ?, 0)'
      )
      .run(name.trim(), tool, flags?.trim() || '', cookie_id ?? null, ua_id ?? null);

    logger.info(`[tool-profiles] Perfil criado: ${name} (${tool})`);
    res.json({ id: result.lastInsertRowid, message: 'Perfil criado com sucesso.' });
  } catch (err) {
    logger.error('[tool-profiles] Erro ao criar:', err);
    res.status(500).json({ error: 'Falha ao criar perfil.' });
  }
});

/* PATCH /api/tool-profiles/:id/activate
 * Ativa o perfil e desativa todos os outros da mesma ferramenta.
 */
router.patch('/:id/activate', (req, res) => {
  try {
    const { id } = req.params;
    const profile = getDb()
      .prepare('SELECT * FROM tool_profiles WHERE id = ?')
      .get(id) as ToolProfile | undefined;

    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    getDb().prepare('UPDATE tool_profiles SET is_active = 0 WHERE tool = ?').run(profile.tool);
    getDb().prepare('UPDATE tool_profiles SET is_active = 1, updated_at = datetime("now") WHERE id = ?').run(id);

    logger.info(`[tool-profiles] Perfil ativado: ${profile.name} (${profile.tool})`);
    res.json({ message: 'Perfil ativado com sucesso.' });
  } catch (err) {
    logger.error('[tool-profiles] Erro ao ativar:', err);
    res.status(500).json({ error: 'Falha ao ativar perfil.' });
  }
});

/* PATCH /api/tool-profiles/:id/deactivate
 * Desativa o perfil (volta ao comportamento padrão para a ferramenta).
 */
router.patch('/:id/deactivate', (req, res) => {
  try {
    const { id } = req.params;
    const profile = getDb()
      .prepare('SELECT * FROM tool_profiles WHERE id = ?')
      .get(id) as ToolProfile | undefined;

    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    getDb().prepare('UPDATE tool_profiles SET is_active = 0, updated_at = datetime("now") WHERE id = ?').run(id);

    logger.info(`[tool-profiles] Perfil desativado: ${profile.name} (${profile.tool})`);
    res.json({ message: 'Perfil desativado.' });
  } catch (err) {
    logger.error('[tool-profiles] Erro ao desativar:', err);
    res.status(500).json({ error: 'Falha ao desativar perfil.' });
  }
});

/* DELETE /api/tool-profiles/:id */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const profile = getDb()
      .prepare('SELECT * FROM tool_profiles WHERE id = ?')
      .get(id) as ToolProfile | undefined;

    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    getDb().prepare('DELETE FROM tool_profiles WHERE id = ?').run(id);
    logger.info(`[tool-profiles] Perfil removido: ${profile.name} (${profile.tool})`);
    res.json({ message: 'Perfil removido.' });
  } catch (err) {
    logger.error('[tool-profiles] Erro ao remover:', err);
    res.status(500).json({ error: 'Falha ao remover perfil.' });
  }
});

export default router;
