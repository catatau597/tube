import { Router, Request, Response } from 'express';
import multer from 'multer';
import { CookieManager } from '../../core/cookie-manager';
import { logger } from '../../core/logger';

const router = Router();
const cookieManager = new CookieManager();

// Configura multer para upload em memória (arquivo pequeno)
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 1024 * 1024 } }); // 1MB max

/**
 * GET /api/cookies
 * Lista todos os perfis de cookie
 */
router.get('/', (_req: Request, res: Response) => {
  try {
    const profiles = cookieManager.listProfiles();
    res.json({ profiles });
  } catch (error) {
    logger.error(`[API /cookies] Erro ao listar perfis: ${error}`);
    res.status(500).json({ error: 'Erro ao listar perfis' });
  }
});

/**
 * GET /api/cookies/:id
 * Busca perfil por ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }
    const profile = cookieManager.getProfile(id);
    if (!profile) {
      res.status(404).json({ error: 'Perfil não encontrado' });
      return;
    }
    res.json({ profile });
  } catch (error) {
    logger.error(`[API /cookies/:id] Erro ao buscar perfil: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

/**
 * POST /api/cookies
 * Cria novo perfil de cookie com upload de arquivo
 * Body (multipart/form-data):
 *   - name: string (required)
 *   - platform: string (required)
 *   - cookieFile: file (required, Netscape format)
 *   - userAgent: string (optional)
 *   - setAsDefault: boolean (optional)
 */
router.post('/', upload.single('cookieFile'), (req: Request, res: Response) => {
  try {
    const { name, platform, userAgent, setAsDefault } = req.body;
    const file = req.file;

    if (!name || !platform || !file) {
      res.status(400).json({ error: 'Campos obrigatórios: name, platform, cookieFile' });
      return;
    }

    const cookieContent = file.buffer.toString('utf-8');
    const profile = cookieManager.createProfile({
      name,
      platform,
      cookieContent,
      userAgent: userAgent || undefined,
      setAsDefault: setAsDefault === 'true' || setAsDefault === '1',
    });

    res.status(201).json({ profile });
  } catch (error) {
    logger.error(`[API /cookies POST] Erro ao criar perfil: ${error}`);
    res.status(500).json({ error: 'Erro ao criar perfil' });
  }
});

/**
 * PATCH /api/cookies/:id
 * Atualiza perfil existente
 * Body (JSON):
 *   - name: string (optional)
 *   - userAgent: string (optional)
 *   - active: boolean (optional)
 *   - setAsDefault: boolean (optional)
 */
router.patch('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const { name, userAgent, active, setAsDefault } = req.body;
    const profile = cookieManager.updateProfile(id, {
      name,
      userAgent,
      active: active !== undefined ? Boolean(active) : undefined,
      setAsDefault: setAsDefault !== undefined ? Boolean(setAsDefault) : undefined,
    });

    if (!profile) {
      res.status(404).json({ error: 'Perfil não encontrado' });
      return;
    }

    res.json({ profile });
  } catch (error) {
    logger.error(`[API /cookies PATCH] Erro ao atualizar perfil: ${error}`);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

/**
 * DELETE /api/cookies/:id
 * Exclui perfil e remove arquivo cookie
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const success = cookieManager.deleteProfile(id);
    if (!success) {
      res.status(404).json({ error: 'Perfil não encontrado' });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    logger.error(`[API /cookies DELETE] Erro ao excluir perfil: ${error}`);
    res.status(500).json({ error: 'Erro ao excluir perfil' });
  }
});

export default router;
