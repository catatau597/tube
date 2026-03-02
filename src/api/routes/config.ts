import { Router } from "express";
import {
  getAllConfig,
  patchConfig,
  resetConfig,
} from "../../core/config-manager";
import { getDefaultSettings } from "../../core/db";
import { getHlsStartSchema } from "../../core/hls-start-profile-schema";
import { logger } from "../../core/logger";

/**
 * Cria o roteador HTTP para leitura e manutenção das configurações do sistema.
 */
export function createConfigRouter(): Router {
  const router = Router();

  router.get("/", (_request, response) => {
    response.json(getAllConfig());
  });

  router.get("/hls-start-profiles/schema", (_request, response) => {
    response.json(getHlsStartSchema());
  });

  router.patch("/", (request, response) => {
    const input = request.body as Record<string, unknown>;
    const updates: Record<string, string> = {};
    for (const [key, value] of Object.entries(input)) {
      updates[key] = String(value);
    }
    patchConfig(updates);
    logger.info(
      `[API][config] Atualização de configurações (${Object.keys(updates).length} chave(s)).`,
    );
    response.json({ ok: true });
  });

  router.post("/export", (_request, response) => {
    response.json({ settings: getAllConfig() });
  });

  router.post("/import", (request, response) => {
    const settings = (request.body as { settings?: Record<string, unknown> })
      .settings;
    if (!settings) {
      response.status(400).json({ error: "payload inválido" });
      return;
    }
    const updates: Record<string, string> = {};
    for (const [key, value] of Object.entries(settings)) {
      updates[key] = String(value);
    }
    patchConfig(updates);
    logger.info(
      `[API][config] Import de configurações (${Object.keys(updates).length} chave(s)).`,
    );
    response.json({ ok: true });
  });

  router.post("/reset", (_request, response) => {
    resetConfig(getDefaultSettings());
    logger.warn("[API][config] Reset de configurações para valores padrão.");
    response.json({ ok: true });
  });

  return router;
}
