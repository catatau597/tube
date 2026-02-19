import fs from "fs";
import path from "path";
import { Router } from "express";
import multer from "multer";
import { getDb } from "../../core/db";
import { logger } from "../../core/logger";
import {
  CredentialsManager,
  SupportedPlatform,
} from "../../player/credentials-manager";
import { streamlinkHasPlayableStream } from "../../player/streamlink-runner";
import { testYtDlp } from "../../player/ytdlp-runner";

const COOKIES_DIR = "/data/cookies";
fs.mkdirSync(COOKIES_DIR, { recursive: true });

const upload = multer({ dest: "/tmp" });
const allowedPlatforms: SupportedPlatform[] = [
  "youtube",
  "dailymotion",
  "soultv",
];

function validatePlatform(value: string): SupportedPlatform | null {
  if ((allowedPlatforms as string[]).includes(value))
    return value as SupportedPlatform;
  return null;
}

/**
 * Cria o roteador HTTP para gestão de cookies, user-agents e testes de credenciais.
 */
export function createCredentialsRouter(): Router {
  const router = Router();
  const manager = new CredentialsManager();

  router.get("/", (_request, response) => {
    const rows = getDb()
      .prepare(
        "SELECT id, platform, type, label, value, active, is_default, created_at FROM credentials ORDER BY type, platform, id",
      )
      .all();
    response.json(rows);
  });

  router.post(
    "/cookie/:platform",
    upload.single("file"),
    (request, response) => {
      const platform = validatePlatform(request.params.platform);
      if (!platform) {
        response.status(400).json({ error: "Plataforma inválida" });
        return;
      }
      if (!request.file) {
        response.status(400).json({ error: "Arquivo não enviado" });
        return;
      }

      const finalPath = path.join(COOKIES_DIR, `${platform}.txt`);
      fs.renameSync(request.file.path, finalPath);

      getDb()
        .prepare("DELETE FROM credentials WHERE platform = ? AND type = ?")
        .run(platform, "cookie");
      getDb()
        .prepare(
          "INSERT INTO credentials(platform, type, label, value, active, is_default) VALUES (?, ?, ?, ?, 1, 1)",
        )
        .run(platform, "cookie", `${platform}.txt`, finalPath);

      logger.info(
        `[API][credentials] Cookie atualizado para plataforma=${platform}`,
      );

      response.json({ ok: true, path: finalPath });
    },
  );

  router.delete("/cookie/:platform", (request, response) => {
    const platform = validatePlatform(request.params.platform);
    if (!platform) {
      response.status(400).json({ error: "Plataforma inválida" });
      return;
    }

    const row = getDb()
      .prepare(
        "SELECT value FROM credentials WHERE platform = ? AND type = ? LIMIT 1",
      )
      .get(platform, "cookie") as { value: string } | undefined;

    if (row?.value && fs.existsSync(row.value)) {
      fs.unlinkSync(row.value);
    }
    getDb()
      .prepare("DELETE FROM credentials WHERE platform = ? AND type = ?")
      .run(platform, "cookie");
    logger.info(
      `[API][credentials] Cookie removido para plataforma=${platform}`,
    );
    response.json({ ok: true });
  });

  router.patch("/cookie/:platform/toggle", (request, response) => {
    const platform = validatePlatform(request.params.platform);
    if (!platform) {
      response.status(400).json({ error: "Plataforma inválida" });
      return;
    }

    const current = getDb()
      .prepare(
        "SELECT active FROM credentials WHERE platform = ? AND type = ? LIMIT 1",
      )
      .get(platform, "cookie") as { active: number } | undefined;
    if (!current) {
      response.status(404).json({ error: "Cookie não encontrado" });
      return;
    }

    const next = current.active === 1 ? 0 : 1;
    getDb()
      .prepare(
        "UPDATE credentials SET active = ? WHERE platform = ? AND type = ?",
      )
      .run(next, platform, "cookie");
    logger.info(
      `[API][credentials] Cookie ${platform} alterado para active=${next === 1}`,
    );
    response.json({ ok: true, active: next === 1 });
  });

  router.post("/ua", (request, response) => {
    const { userAgent, platform, label } = request.body as {
      userAgent?: string;
      platform?: string;
      label?: string;
    };
    if (!userAgent?.trim()) {
      response.status(400).json({ error: "userAgent é obrigatório" });
      return;
    }
    const resolvedPlatform =
      platform && validatePlatform(platform) ? platform : "global";

    const info = getDb()
      .prepare(
        "INSERT INTO credentials(platform, type, label, value, active, is_default) VALUES (?, ?, ?, ?, 1, 0)",
      )
      .run(
        resolvedPlatform,
        "user-agent",
        label ?? userAgent.slice(0, 42),
        userAgent,
      );
    logger.info(
      `[API][credentials] User-Agent adicionado em plataforma=${resolvedPlatform}`,
    );
    response.json({ ok: true, id: info.lastInsertRowid });
  });

  router.delete("/ua/:id", (request, response) => {
    const id = Number(request.params.id);
    getDb()
      .prepare("DELETE FROM credentials WHERE id = ? AND type = ?")
      .run(id, "user-agent");
    logger.info(`[API][credentials] User-Agent removido id=${id}`);
    response.json({ ok: true });
  });

  router.patch("/ua/:id/default", (request, response) => {
    const id = Number(request.params.id);
    const current = getDb()
      .prepare(
        "SELECT id, platform, type FROM credentials WHERE id = ? AND type = ?",
      )
      .get(id, "user-agent") as
      | { id: number; platform: string; type: string }
      | undefined;

    if (!current) {
      response.status(404).json({ error: "User-Agent não encontrado" });
      return;
    }

    getDb()
      .prepare(
        "UPDATE credentials SET is_default = 0 WHERE type = ? AND platform = ?",
      )
      .run("user-agent", current.platform);
    getDb()
      .prepare("UPDATE credentials SET is_default = 1 WHERE id = ?")
      .run(id);
    logger.info(
      `[API][credentials] User-Agent padrão atualizado id=${id} plataforma=${current.platform}`,
    );
    response.json({ ok: true });
  });

  router.post("/test", async (request, response) => {
    const { url, tool, platform } = request.body as {
      url?: string;
      tool?: "streamlink" | "ytdlp";
      platform?: SupportedPlatform;
    };

    if (!url || !tool) {
      response.status(400).json({ error: "url e tool são obrigatórios" });
      return;
    }

    const p = platform && validatePlatform(platform) ? platform : "youtube";
    const creds = manager.resolveCredentials(p);
    logger.info(
      `[API][credentials] Teste de conectividade solicitado tool=${tool} platform=${p}`,
    );

    if (tool === "streamlink") {
      const ok = await streamlinkHasPlayableStream(
        url,
        creds.userAgent,
        creds.cookieFile,
      );
      logger.info(
        `[API][credentials] Resultado teste streamlink platform=${p} success=${ok}`,
      );
      response.json({
        success: ok,
        output: ok ? "stream resolvida" : "stream não resolvida",
      });
      return;
    }

    const result = await testYtDlp(url, creds.userAgent, creds.cookieFile);
    logger.info(
      `[API][credentials] Resultado teste ytdlp platform=${p} success=${result.ok}`,
    );
    response.json({ success: result.ok, output: result.output });
  });

  return router;
}
