import { Router } from 'express';
import { getDb } from '../../core/db';
import { logger } from '../../core/logger';

const router = Router();

interface ToolProfile {
  id: number;
  name: string;
  tool: 'streamlink' | 'yt-dlp';
  flags: string;
  cookie_platform: string | null;
  ua_id: number | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

/* GET /api/tool-profiles - listar todos os perfis */
router.get('/', (_req, res) => {
  try {
    const db = getDb();
    const profiles = db.prepare('SELECT * FROM tool_profiles ORDER BY tool, name').all() as ToolProfile[];
    res.json(profiles);
  } catch (error) {
    logger.error('[tool-profiles] Erro ao listar perfis:', error);
    res.status(500).json({ error: 'Falha ao listar perfis de ferramenta.' });
  }
});

/* POST /api/tool-profiles - criar novo perfil */
router.post('/', (req, res) => {
  try {
    const { name, tool, flags, cookie_platform, ua_id } = req.body;

    if (!name || !tool) {
      return res.status(400).json({ error: 'Nome e ferramenta são obrigatórios.' });
    }

    if (!['streamlink', 'yt-dlp'].includes(tool)) {
      return res.status(400).json({ error: 'Ferramenta deve ser "streamlink" ou "yt-dlp".' });
    }

    const db = getDb();
    const result = db.prepare(`
      INSERT INTO tool_profiles (name, tool, flags, cookie_platform, ua_id, is_active)
      VALUES (?, ?, ?, ?, ?, 0)
    `).run(name, tool, flags || '', cookie_platform || null, ua_id || null);

    logger.info(`[tool-profiles] Perfil criado: ${name} (${tool})`);
    res.json({ id: result.lastInsertRowid, message: 'Perfil criado com sucesso.' });
  } catch (error) {
    logger.error('[tool-profiles] Erro ao criar perfil:', error);
    res.status(500).json({ error: 'Falha ao criar perfil de ferramenta.' });
  }
});

/* PATCH /api/tool-profiles/:id/activate - ativar perfil (desativa outros da mesma ferramenta) */
router.patch('/:id/activate', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();

    const profile = db.prepare('SELECT * FROM tool_profiles WHERE id = ?').get(id) as ToolProfile | undefined;

    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    // Desativar todos os perfis da mesma ferramenta
    db.prepare('UPDATE tool_profiles SET is_active = 0 WHERE tool = ?').run(profile.tool);

    // Ativar o perfil selecionado
    db.prepare('UPDATE tool_profiles SET is_active = 1, updated_at = datetime("now") WHERE id = ?').run(id);

    logger.info(`[tool-profiles] Perfil ativado: ${profile.name} (${profile.tool})`);
    res.json({ message: 'Perfil ativado com sucesso.' });
  } catch (error) {
    logger.error('[tool-profiles] Erro ao ativar perfil:', error);
    res.status(500).json({ error: 'Falha ao ativar perfil.' });
  }
});

/* DELETE /api/tool-profiles/:id - remover perfil */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();

    const profile = db.prepare('SELECT * FROM tool_profiles WHERE id = ?').get(id) as ToolProfile | undefined;

    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    db.prepare('DELETE FROM tool_profiles WHERE id = ?').run(id);

    logger.info(`[tool-profiles] Perfil removido: ${profile.name} (${profile.tool})`);
    res.json({ message: 'Perfil removido com sucesso.' });
  } catch (error) {
    logger.error('[tool-profiles] Erro ao remover perfil:', error);
    res.status(500).json({ error: 'Falha ao remover perfil.' });
  }
});

export default router;
