import { Router } from "express";
import { getDb } from "../../core/db";
import { YouTubeApi } from "../../core/youtube-api";
import { Scheduler } from "../../core/scheduler";
import { logger } from "../../core/logger";

/**
 * Cria o roteador HTTP para gerenciamento de canais monitorados.
 */
export function createChannelsRouter(
  api: YouTubeApi,
  scheduler: Scheduler,
): Router {
  const router = Router();

  router.get("/", (_request, response) => {
    const rows = getDb()
      .prepare(
        `
        SELECT
          c.id,
          c.channel_id,
          c.handle,
          c.title,
          c.thumbnail_url,
          c.uploads_playlist_id,
          c.status,
          COALESCE(SUM(CASE WHEN s.status = 'live' THEN 1 ELSE 0 END), 0) as live_count,
          COALESCE(SUM(CASE WHEN s.status = 'upcoming' THEN 1 ELSE 0 END), 0) as upcoming_count,
          COALESCE(SUM(CASE WHEN s.status = 'none' THEN 1 ELSE 0 END), 0) as vod_count
        FROM channels c
        LEFT JOIN streams s ON s.channel_id = c.channel_id
        GROUP BY c.id
        ORDER BY c.title ASC
        `,
      )
      .all();
    response.json(rows);
  });

  router.post("/", async (request, response) => {
    const { input, handle, channelId } = request.body as {
      input?: string;
      handle?: string;
      channelId?: string;
    };
    const normalizedInput = input ?? handle ?? channelId;
    if (!normalizedInput) {
      response
        .status(400)
        .json({ error: "input é obrigatório (@handle ou channel id)" });
      return;
    }

    logger.info(
      `[API][channels] Solicitação para adicionar canal: ${normalizedInput}`,
    );

    try {
      const resolved = await api.resolveChannelByInput(normalizedInput);
      if (!resolved) {
        logger.warn(
          `[API][channels] Canal inválido ou não encontrado: ${normalizedInput}`,
        );
        response
          .status(400)
          .json({ error: "Canal não pôde ser validado na API do YouTube" });
        return;
      }

      getDb()
        .prepare(
          "INSERT OR REPLACE INTO channels (channel_id, handle, title, thumbnail_url, uploads_playlist_id, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))",
        )
        .run(
          resolved.channelId,
          resolved.handle,
          resolved.title,
          resolved.thumbnailUrl,
          resolved.uploadsPlaylistId,
          "active",
        );

      await scheduler.triggerNow();
      logger.info(
        `[API][channels] Canal adicionado: ${resolved.channelId} (${resolved.title})`,
      );
      response.json({ ok: true, channel: resolved });
    } catch (error) {
      const message = String(error);
      if (message.includes("YOUTUBE_API_KEY")) {
        logger.warn(
          "[API][channels] Tentativa de adicionar canal sem YOUTUBE_API_KEY configurada.",
        );
        response
          .status(400)
          .json({
            error: "YOUTUBE_API_KEY não configurada. Defina em Configurações.",
          });
        return;
      }
      logger.error(`[API][channels] Erro ao adicionar canal: ${message}`);
      response
        .status(500)
        .json({ error: "Erro ao adicionar canal", details: message });
    }
  });

  router.delete("/:id", (request, response) => {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      response.status(400).json({ error: "id inválido" });
      return;
    }

    const row = getDb()
      .prepare("SELECT channel_id FROM channels WHERE id = ?")
      .get(id) as { channel_id: string } | undefined;

    if (!row) {
      response.status(404).json({ error: "Canal não encontrado" });
      return;
    }

    getDb()
      .prepare("DELETE FROM streams WHERE channel_id = ?")
      .run(row.channel_id);
    getDb().prepare("DELETE FROM channels WHERE id = ?").run(id);
    logger.info(
      `[API][channels] Canal removido id=${id} channel_id=${row.channel_id}`,
    );

    response.json({ ok: true });
  });

  router.patch("/:id/freeze", (request, response) => {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      response.status(400).json({ error: "id inválido" });
      return;
    }

    const current = getDb()
      .prepare("SELECT status FROM channels WHERE id = ?")
      .get(id) as { status: string } | undefined;

    if (!current) {
      response.status(404).json({ error: "Canal não encontrado" });
      return;
    }

    const status = current.status === "frozen" ? "active" : "frozen";
    getDb()
      .prepare(
        "UPDATE channels SET status = ?, updated_at = datetime('now') WHERE id = ?",
      )
      .run(status, id);
    logger.info(`[API][channels] Canal ${id} alterado para status=${status}`);
    response.json({ ok: true, status });
  });

  router.post("/:id/sync", async (request, response) => {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      response.status(400).json({ error: "id inválido" });
      return;
    }

    const exists = getDb()
      .prepare("SELECT id FROM channels WHERE id = ?")
      .get(id) as { id: number } | undefined;
    if (!exists) {
      response.status(404).json({ error: "Canal não encontrado" });
      return;
    }

    await scheduler.triggerNow();
    logger.info(
      `[API][channels] Sincronização manual solicitada para canal id=${id}`,
    );
    response.json({ ok: true });
  });

  return router;
}
