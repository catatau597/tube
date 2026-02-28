import { Router, Request, Response } from 'express';
import multer from 'multer';
import { CookieManager } from '../../core/cookie-manager';
import { logger } from '../../core/logger';

const router = Router();
const cookieManager = new CookieManager();

// Configura multer para receber arquivo em memória
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 1024 * 1024 } }); // 1MB max

/**
 * GET /api/cookies
 * Lista todos os perfis de cookies
 */
router.get('/', (_req: Request, res: Response) => {
  try {
    const profiles = cookieManager.listAll();
    res.json(profiles);
  } catch (error) {
    logger.error(`[API] Erro ao listar perfis de cookies: ${error}`);
    res.status(500).json({ error: 'Erro ao listar perfis de cookies' });
  }
});

/**
 * GET /api/cookies/:id
 * Busca perfil por ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }
    const profile = cookieManager.getById(id);
    if (!profile) {
      res.status(404).json({ error: 'Perfil não encontrado' });
      return;
    }
    res.json(profile);
  } catch (error) {
    logger.error(`[API] Erro ao buscar perfil: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

/**
 * POST /api/cookies
 * Cria um novo perfil de cookie
 * Body multipart: { name, platform, cookieFile (arquivo), userAgent?, isDefault?, active? }
 */
router.post('/', upload.single('cookieFile'), (req: Request, res: Response) => {
  try {
    const { name, platform, userAgent, isDefault, active } = req.body;
    const file = req.file;

    if (!name || !platform || !file) {
      res.status(400).json({ error: 'Parâmetros obrigatórios: name, platform, cookieFile' });
      return;
    }

    const fileContent = file.buffer.toString('utf-8');

    const profile = cookieManager.create({
      name,
      platform,
      fileContent,
      userAgent: userAgent || undefined,
      isDefault: isDefault === 'true' || isDefault === true,
      active: active !== 'false' && active !== false,
    });

    res.status(201).json(profile);
  } catch (error) {
    logger.error(`[API] Erro ao criar perfil: ${error}`);
    res.status(500).json({ error: 'Erro ao criar perfil' });
  }
});

/**
 * PUT /api/cookies/:id
 * Atualiza um perfil existente
 * Body: { name?, userAgent?, isDefault?, active?, cookieFile? (arquivo opcional) }
 */
router.put('/:id', upload.single('cookieFile'), (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const { name, userAgent, isDefault, active } = req.body;
    const file = req.file;

    const profile = cookieManager.update(id, {
      name: name || undefined,
      userAgent: userAgent !== undefined ? userAgent : undefined,
      isDefault: isDefault !== undefined ? isDefault === 'true' || isDefault === true : undefined,
      active: active !== undefined ? active !== 'false' && active !== false : undefined,
      fileContent: file ? file.buffer.toString('utf-8') : undefined,
    });

    if (!profile) {
      res.status(404).json({ error: 'Perfil não encontrado' });
      return;
    }

    res.json(profile);
  } catch (error) {
    logger.error(`[API] Erro ao atualizar perfil: ${error}`);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

/**
 * DELETE /api/cookies/:id
 * Exclui um perfil
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const success = cookieManager.delete(id);
    if (!success) {
      res.status(404).json({ error: 'Perfil não encontrado' });
      return;
    }

    res.json({ message: 'Perfil excluído com sucesso' });
  } catch (error) {
    logger.error(`[API] Erro ao excluir perfil: ${error}`);
    res.status(500).json({ error: 'Erro ao excluir perfil' });
  }
});

/**
 * POST /api/cookies/:id/toggle-active
 * Toggle ativo/inativo
 */
router.post('/:id/toggle-active', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const success = cookieManager.toggleActive(id);
    if (!success) {
      res.status(404).json({ error: 'Perfil não encontrado' });
      return;
    }

    const profile = cookieManager.getById(id);
    res.json(profile);
  } catch (error) {
    logger.error(`[API] Erro ao alternar status: ${error}`);
    res.status(500).json({ error: 'Erro ao alternar status' });
  }
});

/**
 * POST /api/cookies/:id/set-default
 * Define perfil como padrão
 */
router.post('/:id/set-default', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const success = cookieManager.setDefault(id);
    if (!success) {
      res.status(404).json({ error: 'Perfil não encontrado' });
      return;
    }

    const profile = cookieManager.getById(id);
    res.json(profile);
  } catch (error) {
    logger.error(`[API] Erro ao definir padrão: ${error}`);
    res.status(500).json({ error: 'Erro ao definir padrão' });
  }
});

export default router;
