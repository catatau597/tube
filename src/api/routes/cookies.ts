import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import multer from 'multer';
import { getDb } from '../../core/db';
import { logger } from '../../core/logger';

const COOKIES_DIR = '/data/cookies';
fs.mkdirSync(COOKIES_DIR, { recursive: true });

// Salva diretamente em /data/cookies evitando problema EXDEV entre filesystems
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, COOKIES_DIR),
  filename: (_req, file, cb) => cb(null, `${Date.now()}_${path.basename(file.originalname || 'cookies.txt')}`),
});
const upload = multer({ storage });

interface CookieRow {
  id: number;
  name: string;
  provider: string;
  file_path: string;
  active: number;
  created_at: string;
}

const router = Router();

/* GET /api/cookies — listar todos */
router.get('/', (_req, res) => {
  try {
    const rows = getDb().prepare('SELECT * FROM cookies ORDER BY provider, name').all() as CookieRow[];
    res.json(rows);
  } catch (err) {
    logger.error('[cookies] Erro ao listar:', err);
    res.status(500).json({ error: 'Falha ao listar cookies.' });
  }
});

/* POST /api/cookies — fazer upload de arquivo de cookies */
router.post('/', upload.single('file'), (req, res) => {
  try {
    const { name, provider } = req.body as { name?: string; provider?: string };

    if (!name?.trim()) {
      return res.status(400).json({ error: 'Nome é obrigatório.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não enviado.' });
    }

    const safeProvider = (provider?.trim() || 'youtube').toLowerCase();
    const finalPath = req.file.path; // multer já salvou em COOKIES_DIR

    const result = getDb()
      .prepare('INSERT INTO cookies (name, provider, file_path, active) VALUES (?, ?, ?, 1)')
      .run(name.trim(), safeProvider, finalPath);

    logger.info(`[cookies] Cookie adicionado: name=${name} provider=${safeProvider}`);
    res.json({ id: result.lastInsertRowid, message: 'Cookie adicionado com sucesso.' });
  } catch (err) {
    logger.error('[cookies] Erro ao adicionar:', err);
    res.status(500).json({ error: 'Falha ao adicionar cookie.' });
  }
});

/* PATCH /api/cookies/:id/toggle — ativar/desativar */
router.patch('/:id/toggle', (req, res) => {
  try {
    const { id } = req.params;
    const row = getDb().prepare('SELECT active FROM cookies WHERE id = ?').get(id) as { active: number } | undefined;

    if (!row) {
      return res.status(404).json({ error: 'Cookie não encontrado.' });
    }

    const next = row.active === 1 ? 0 : 1;
    getDb().prepare('UPDATE cookies SET active = ? WHERE id = ?').run(next, id);
    logger.info(`[cookies] Cookie id=${id} alterado para active=${next === 1}`);
    res.json({ ok: true, active: next === 1 });
  } catch (err) {
    logger.error('[cookies] Erro ao toggle:', err);
    res.status(500).json({ error: 'Falha ao atualizar cookie.' });
  }
});

/* DELETE /api/cookies/:id — remover */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const row = getDb().prepare('SELECT * FROM cookies WHERE id = ?').get(id) as CookieRow | undefined;

    if (!row) {
      return res.status(404).json({ error: 'Cookie não encontrado.' });
    }

    if (row.file_path && fs.existsSync(row.file_path)) {
      try { fs.unlinkSync(row.file_path); } catch { /* continua mesmo se falhar */ }
    }

    getDb().prepare('UPDATE tool_profiles SET cookie_id = NULL WHERE cookie_id = ?').run(id);
    getDb().prepare('DELETE FROM cookies WHERE id = ?').run(id);

    logger.info(`[cookies] Cookie removido: id=${id} name=${row.name}`);
    res.json({ ok: true });
  } catch (err) {
    logger.error('[cookies] Erro ao remover:', err);
    res.status(500).json({ error: 'Falha ao remover cookie.' });
  }
});

export default router;
