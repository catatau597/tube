const sectionMeta = {
  api: {
    title: "API & Credenciais",
    hint: "Gerencie as chaves da YouTube API.",
  },
  scheduler: {
    title: "Agendador",
    hint: "Ajuste intervalos, janela ativa e sincronização global.",
  },
  content: {
    title: "Conteúdo & Filtros",
    hint: "Defina limites, filtros e modos de geração de playlist.",
  },
  player: {
    title: "Smart Player",
    hint: "Gerencie cookies, user-agents e testes de conectividade.",
  },
  tech: {
    title: "Técnico",
    hint: "Parâmetros técnicos do servidor e export/import de configurações.",
  },
};

function boolOption(value, current) {
  return String(current).toLowerCase() === value ? "selected" : "";
}

function textFromError(payload, fallback) {
  if (payload && typeof payload === "object" && "error" in payload) {
    return String(payload.error || fallback);
  }
  return fallback;
}

async function requestJson(api, path, options, fallbackError) {
  const response = await api(path, options);
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(textFromError(payload, fallbackError));
  }
  return payload;
}

function configFields(section, config) {
  if (section === "scheduler") {
    const activeHoursEnabled =
      String(config.ENABLE_SCHEDULER_ACTIVE_HOURS || "false") === "true";
    return `
      <label>
        Main Interval (h)
        <input name="SCHEDULER_MAIN_INTERVAL_HOURS" type="number" min="1" max="24" value="${config.SCHEDULER_MAIN_INTERVAL_HOURS || 4}" />
      </label>
      <label>
        Enable Active Hours
        <select name="ENABLE_SCHEDULER_ACTIVE_HOURS">
          <option value="true" ${boolOption("true", config.ENABLE_SCHEDULER_ACTIVE_HOURS)}>true</option>
          <option value="false" ${boolOption("false", config.ENABLE_SCHEDULER_ACTIVE_HOURS)}>false</option>
        </select>
      </label>
      ${
        activeHoursEnabled
          ? `
      <label>
        Active Start Hour
        <input name="SCHEDULER_ACTIVE_START_HOUR" type="number" min="0" max="23" value="${config.SCHEDULER_ACTIVE_START_HOUR || 7}" />
      </label>
      <label>
        Active End Hour
        <input name="SCHEDULER_ACTIVE_END_HOUR" type="number" min="0" max="23" value="${config.SCHEDULER_ACTIVE_END_HOUR || 22}" />
      </label>
      `
          : ""
      }
      <label>
        Pre Event Window (h)
        <input name="SCHEDULER_PRE_EVENT_WINDOW_HOURS" type="number" min="0" max="12" value="${config.SCHEDULER_PRE_EVENT_WINDOW_HOURS || 2}" />
      </label>
      <label>
        Pre Event Interval (min)
        <input name="SCHEDULER_PRE_EVENT_INTERVAL_MINUTES" type="number" min="1" max="60" value="${config.SCHEDULER_PRE_EVENT_INTERVAL_MINUTES || 5}" />
      </label>
      <label>
        Post Event Interval (min)
        <input name="SCHEDULER_POST_EVENT_INTERVAL_MINUTES" type="number" min="1" max="60" value="${config.SCHEDULER_POST_EVENT_INTERVAL_MINUTES || 5}" />
      </label>
      <label>
        Full Sync Interval (h)
        <input name="FULL_SYNC_INTERVAL_HOURS" type="number" min="12" max="168" value="${config.FULL_SYNC_INTERVAL_HOURS || 48}" />
      </label>
      <label>
        Resolve Handles TTL (h)
        <input name="RESOLVE_HANDLES_TTL_HOURS" type="number" min="1" max="168" value="${config.RESOLVE_HANDLES_TTL_HOURS || 24}" />
      </label>
      <label>
        Initial Sync Days
        <input name="INITIAL_SYNC_DAYS" type="number" min="0" max="30" value="${config.INITIAL_SYNC_DAYS || 2}" />
      </label>
    `;
  }

  if (section === "content") {
    const categoryEnabled =
      String(config.FILTER_BY_CATEGORY || "false") === "true";
    return `
      <label>
        Max Schedule (h)
        <input name="MAX_SCHEDULE_HOURS" type="number" min="24" max="720" value="${config.MAX_SCHEDULE_HOURS || 72}" />
      </label>
      <label>
        Max Upcoming / Canal
        <input name="MAX_UPCOMING_PER_CHANNEL" type="number" min="1" max="20" value="${config.MAX_UPCOMING_PER_CHANNEL || 6}" />
      </label>
      <label>
        Keep Recorded Streams
        <select name="KEEP_RECORDED_STREAMS">
          <option value="true" ${boolOption("true", config.KEEP_RECORDED_STREAMS)}>true</option>
          <option value="false" ${boolOption("false", config.KEEP_RECORDED_STREAMS)}>false</option>
        </select>
      </label>
      <label>
        Playlist Generate Direct
        <select name="PLAYLIST_GENERATE_DIRECT">
          <option value="true" ${boolOption("true", config.PLAYLIST_GENERATE_DIRECT)}>true</option>
          <option value="false" ${boolOption("false", config.PLAYLIST_GENERATE_DIRECT)}>false</option>
        </select>
      </label>
      <label>
        Playlist Generate Proxy
        <select name="PLAYLIST_GENERATE_PROXY">
          <option value="true" ${boolOption("true", config.PLAYLIST_GENERATE_PROXY)}>true</option>
          <option value="false" ${boolOption("false", config.PLAYLIST_GENERATE_PROXY)}>false</option>
        </select>
      </label>
      <label>
        Filter by Category
        <select name="FILTER_BY_CATEGORY">
          <option value="true" ${boolOption("true", config.FILTER_BY_CATEGORY)}>true</option>
          <option value="false" ${boolOption("false", config.FILTER_BY_CATEGORY)}>false</option>
        </select>
      </label>
      ${
        categoryEnabled
          ? `
      <label>
        Allowed Category IDs
        <input name="ALLOWED_CATEGORY_IDS" value="${config.ALLOWED_CATEGORY_IDS || ""}" />
      </label>
      `
          : ""
      }
      <label>
        Title Filter Expressions
        <input name="TITLE_FILTER_EXPRESSIONS" value="${config.TITLE_FILTER_EXPRESSIONS || ""}" />
      </label>
      <label>
        Category Mappings
        <textarea name="CATEGORY_MAPPINGS" rows="3">${config.CATEGORY_MAPPINGS || ""}</textarea>
      </label>
      <label>
        Channel Name Mappings
        <textarea name="CHANNEL_NAME_MAPPINGS" rows="3">${config.CHANNEL_NAME_MAPPINGS || ""}</textarea>
      </label>
      <label>
        EPG Description Cleanup
        <select name="EPG_DESCRIPTION_CLEANUP">
          <option value="true" ${boolOption("true", config.EPG_DESCRIPTION_CLEANUP)}>true</option>
          <option value="false" ${boolOption("false", config.EPG_DESCRIPTION_CLEANUP)}>false</option>
        </select>
      </label>
    `;
  }

  if (section === "tech") {
    return `
      <label>
        HTTP Port
        <input name="HTTP_PORT" type="number" min="1" max="65535" value="${config.HTTP_PORT || 8888}" />
      </label>
      <label>
        Local Timezone
        <input name="LOCAL_TIMEZONE" value="${config.LOCAL_TIMEZONE || "America/Sao_Paulo"}" />
      </label>
      <label>
        Stale Hours
        <input name="STALE_HOURS" type="number" min="1" max="48" value="${config.STALE_HOURS || 6}" />
      </label>
      <label>
        Use Playlist Items
        <select name="USE_PLAYLIST_ITEMS">
          <option value="true" ${boolOption("true", config.USE_PLAYLIST_ITEMS)}>true</option>
          <option value="false" ${boolOption("false", config.USE_PLAYLIST_ITEMS)}>false</option>
        </select>
      </label>
      <label>
        Proxy Enable Analytics
        <select name="PROXY_ENABLE_ANALYTICS">
          <option value="true" ${boolOption("true", config.PROXY_ENABLE_ANALYTICS)}>true</option>
          <option value="false" ${boolOption("false", config.PROXY_ENABLE_ANALYTICS)}>false</option>
        </select>
      </label>
      <label>
        TubeWranglerr URL
        <input name="TUBEWRANGLERR_URL" value="${config.TUBEWRANGLERR_URL || ""}" />
      </label>
      <label>
        Proxy Thumbnail Cache (h)
        <input name="PROXY_THUMBNAIL_CACHE_HOURS" type="number" min="1" max="168" value="${config.PROXY_THUMBNAIL_CACHE_HOURS || 24}" />
      </label>
      <label>
        Log Level
        <select name="LOG_LEVEL">
          <option value="DEBUG" ${String(config.LOG_LEVEL || "").toUpperCase() === "DEBUG" ? "selected" : ""}>DEBUG</option>
          <option value="INFO" ${String(config.LOG_LEVEL || "").toUpperCase() === "INFO" ? "selected" : ""}>INFO</option>
          <option value="WARN" ${String(config.LOG_LEVEL || "").toUpperCase() === "WARN" ? "selected" : ""}>WARN</option>
          <option value="ERROR" ${String(config.LOG_LEVEL || "").toUpperCase() === "ERROR" ? "selected" : ""}>ERROR</option>
        </select>
      </label>
    `;
  }

  return `
    <label>
      API Keys (separadas por vírgula)
      <input name="YOUTUBE_API_KEY" value="${config.YOUTUBE_API_KEY || ""}" />
    </label>
  `;
}

function settingsPayloadBySection(section, formData) {
  const pick = (key, fallback = "") =>
    String(formData.get(key) || fallback).trim();

  if (section === "scheduler") {
    return {
      SCHEDULER_MAIN_INTERVAL_HOURS: pick("SCHEDULER_MAIN_INTERVAL_HOURS", "4"),
      ENABLE_SCHEDULER_ACTIVE_HOURS: pick(
        "ENABLE_SCHEDULER_ACTIVE_HOURS",
        "false",
      ),
      SCHEDULER_ACTIVE_START_HOUR: pick("SCHEDULER_ACTIVE_START_HOUR", "7"),
      SCHEDULER_ACTIVE_END_HOUR: pick("SCHEDULER_ACTIVE_END_HOUR", "22"),
      SCHEDULER_PRE_EVENT_WINDOW_HOURS: pick(
        "SCHEDULER_PRE_EVENT_WINDOW_HOURS",
        "2",
      ),
      SCHEDULER_PRE_EVENT_INTERVAL_MINUTES: pick(
        "SCHEDULER_PRE_EVENT_INTERVAL_MINUTES",
        "5",
      ),
      SCHEDULER_POST_EVENT_INTERVAL_MINUTES: pick(
        "SCHEDULER_POST_EVENT_INTERVAL_MINUTES",
        "5",
      ),
      FULL_SYNC_INTERVAL_HOURS: pick("FULL_SYNC_INTERVAL_HOURS", "48"),
      RESOLVE_HANDLES_TTL_HOURS: pick("RESOLVE_HANDLES_TTL_HOURS", "24"),
      INITIAL_SYNC_DAYS: pick("INITIAL_SYNC_DAYS", "2"),
    };
  }

  if (section === "content") {
    return {
      MAX_SCHEDULE_HOURS: pick("MAX_SCHEDULE_HOURS", "72"),
      MAX_UPCOMING_PER_CHANNEL: pick("MAX_UPCOMING_PER_CHANNEL", "6"),
      KEEP_RECORDED_STREAMS: pick("KEEP_RECORDED_STREAMS", "true"),
      PLAYLIST_GENERATE_DIRECT: pick("PLAYLIST_GENERATE_DIRECT", "true"),
      PLAYLIST_GENERATE_PROXY: pick("PLAYLIST_GENERATE_PROXY", "true"),
      FILTER_BY_CATEGORY: pick("FILTER_BY_CATEGORY", "false"),
      ALLOWED_CATEGORY_IDS: pick("ALLOWED_CATEGORY_IDS", ""),
      TITLE_FILTER_EXPRESSIONS: pick("TITLE_FILTER_EXPRESSIONS", ""),
      CATEGORY_MAPPINGS: pick("CATEGORY_MAPPINGS", ""),
      CHANNEL_NAME_MAPPINGS: pick("CHANNEL_NAME_MAPPINGS", ""),
      EPG_DESCRIPTION_CLEANUP: pick("EPG_DESCRIPTION_CLEANUP", "true"),
    };
  }

  if (section === "tech") {
    return {
      HTTP_PORT: pick("HTTP_PORT", "8888"),
      LOCAL_TIMEZONE: pick("LOCAL_TIMEZONE", "America/Sao_Paulo"),
      STALE_HOURS: pick("STALE_HOURS", "6"),
      USE_PLAYLIST_ITEMS: pick("USE_PLAYLIST_ITEMS", "true"),
      PROXY_ENABLE_ANALYTICS: pick("PROXY_ENABLE_ANALYTICS", "true"),
      TUBEWRANGLERR_URL: pick("TUBEWRANGLERR_URL", "http://localhost:8888"),
      PROXY_THUMBNAIL_CACHE_HOURS: pick("PROXY_THUMBNAIL_CACHE_HOURS", "24"),
      LOG_LEVEL: pick("LOG_LEVEL", "INFO"),
    };
  }

  return {
    YOUTUBE_API_KEY: pick("YOUTUBE_API_KEY", ""),
  };
}

function playerCards(credentials) {
  const platforms = ["youtube", "dailymotion", "soultv"];
  const cookiesByPlatform = new Map(
    credentials
      .filter((item) => item.type === "cookie")
      .map((item) => [String(item.platform).toLowerCase(), item]),
  );
  const userAgents = credentials.filter((item) => item.type === "user-agent");

  return `
    <div class="card">
      <h3>Cookies por Plataforma</h3>
      <table>
        <thead><tr><th>Plataforma</th><th>Arquivo</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>
          ${platforms
            .map((platform) => {
              const row = cookiesByPlatform.get(platform);
              const fileLabel =
                row?.label ||
                (row?.value
                  ? String(row.value).split("/").pop()
                  : "(não configurado)");
              const active = row?.active === 1 ? "ativo" : "inativo";
              return `
                <tr>
                  <td>${platform}</td>
                  <td>${fileLabel || "(não configurado)"}</td>
                  <td>${active}</td>
                  <td>
                    <form class="inline" data-cookie-upload="${platform}">
                      <input type="file" name="file" accept=".txt" required />
                      <button type="submit">Upload</button>
                    </form>
                    <button data-cookie-toggle="${platform}" ${row ? "" : "disabled"}>Ativar/Inativar</button>
                    <button data-cookie-del="${platform}" ${row ? "" : "disabled"}>Excluir</button>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h3>User-Agents</h3>
      <form id="ua-form" class="toolbar">
        <input name="label" placeholder="Nome (opcional)" />
        <input name="userAgent" placeholder="User-Agent" required />
        <button type="submit">Adicionar</button>
      </form>
      <table>
        <thead><tr><th>Nome</th><th>UA</th><th>Padrão</th><th>Ações</th></tr></thead>
        <tbody>
          ${userAgents
            .map(
              (cred) => `
                <tr>
                  <td>${cred.label || "-"}</td>
                  <td>${cred.value || "-"}</td>
                  <td>${cred.is_default === 1 ? "★" : "-"}</td>
                  <td>
                    <button data-ua-default="${cred.id}">Padrão</button>
                    <button data-ua-del="${cred.id}">Remover</button>
                  </td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h3>Teste de Conectividade</h3>
      <form id="player-test-form" class="toolbar">
        <input name="url" placeholder="URL do vídeo YouTube" required />
        <select name="tool">
          <option value="streamlink">streamlink</option>
          <option value="ytdlp">yt-dlp</option>
        </select>
        <select name="platform">
          <option value="youtube">youtube</option>
          <option value="dailymotion">dailymotion</option>
          <option value="soultv">soultv</option>
        </select>
        <button type="submit">Testar</button>
      </form>
      <pre id="player-test-output" class="log-box"></pre>
    </div>
  `;
}

/**
 * Renderiza a seção de configurações correspondente ao hash selecionado.
 * @param {HTMLElement} root
 * @param {(path: string, options?: RequestInit) => Promise<Response>} api
 * @param {string} hash
 */
export async function renderSettings(root, api, hash = "/settings") {
  const rawSection = hash.split("/")[2] || "api";
  const section = sectionMeta[rawSection] ? rawSection : "api";
  let notice = { type: "", text: "" };

  async function load() {
    const [config, credentials] = await Promise.all([
      requestJson(
        api,
        "/api/config",
        undefined,
        "Falha ao carregar configurações.",
      ),
      requestJson(
        api,
        "/api/credentials",
        undefined,
        "Falha ao carregar credenciais.",
      ),
    ]);

    root.innerHTML = `
      <div class="card">
        <h3>${sectionMeta[section].title}</h3>
        <p>${sectionMeta[section].hint}</p>
        <p id="settings-message" class="form-msg ${notice.type} ${notice.text ? "show" : ""}">${notice.text || ""}</p>
        ${
          section !== "player"
            ? `
        <form id="settings-form" class="grid">
          ${configFields(section, config)}
          <button type="submit">Salvar</button>
        </form>
        `
            : ""
        }
      </div>
      ${section === "player" ? playerCards(credentials) : ""}
      ${
        section === "tech"
          ? `
      <div class="card">
        <h3>Ações de Configuração</h3>
        <div class="toolbar">
          <button id="export-config" type="button">Exportar JSON</button>
          <input id="import-file" type="file" accept="application/json" />
          <button id="import-config" type="button">Importar JSON</button>
          <button id="reset-config" type="button" class="danger-btn">Resetar padrão</button>
        </div>
      </div>
      `
          : ""
      }
    `;

    const messageNode = document.getElementById("settings-message");
    const setNotice = (type, text) => {
      notice = { type, text };
      messageNode.className = `form-msg ${type} ${text ? "show" : ""}`;
      messageNode.textContent = text;
    };

    if (section !== "player") {
      document
        .getElementById("settings-form")
        .addEventListener("submit", async (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          try {
            await requestJson(
              api,
              "/api/config",
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                  settingsPayloadBySection(section, formData),
                ),
              },
              "Falha ao salvar configurações.",
            );
            setNotice("success", "Configurações salvas com sucesso.");
            // Recarrega a seção para refletir campos condicionais (ex.: Active Hours e Category IDs).
            await load();
          } catch (error) {
            setNotice(
              "error",
              error instanceof Error
                ? error.message
                : "Falha ao salvar configurações.",
            );
          }
        });
    }

    if (section === "player") {
      root.querySelectorAll("[data-cookie-upload]").forEach((form) => {
        form.addEventListener("submit", async (event) => {
          event.preventDefault();
          const platform = form.getAttribute("data-cookie-upload");
          const payload = new FormData(form);
          const response = await api(`/api/credentials/cookie/${platform}`, {
            method: "POST",
            body: payload,
          });
          if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            setNotice(
              "error",
              textFromError(body, "Falha no upload de cookie."),
            );
            return;
          }
          setNotice("success", `Cookie atualizado para ${platform}.`);
          await load();
        });
      });

      root.querySelectorAll("[data-cookie-toggle]").forEach((button) => {
        button.addEventListener("click", async () => {
          const platform = button.getAttribute("data-cookie-toggle");
          try {
            await requestJson(
              api,
              `/api/credentials/cookie/${platform}/toggle`,
              { method: "PATCH" },
              "Falha ao alterar status do cookie.",
            );
            setNotice("success", `Status de cookie alterado para ${platform}.`);
            await load();
          } catch (error) {
            setNotice(
              "error",
              error instanceof Error
                ? error.message
                : "Falha ao alterar status do cookie.",
            );
          }
        });
      });

      root.querySelectorAll("[data-cookie-del]").forEach((button) => {
        button.addEventListener("click", async () => {
          const platform = button.getAttribute("data-cookie-del");
          try {
            await requestJson(
              api,
              `/api/credentials/cookie/${platform}`,
              { method: "DELETE" },
              "Falha ao remover cookie.",
            );
            setNotice("success", `Cookie removido para ${platform}.`);
            await load();
          } catch (error) {
            setNotice(
              "error",
              error instanceof Error
                ? error.message
                : "Falha ao remover cookie.",
            );
          }
        });
      });

      document
        .getElementById("ua-form")
        .addEventListener("submit", async (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          try {
            await requestJson(
              api,
              "/api/credentials/ua",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  label: String(formData.get("label") || "").trim(),
                  userAgent: String(formData.get("userAgent") || "").trim(),
                  platform: "youtube",
                }),
              },
              "Falha ao adicionar user-agent.",
            );
            setNotice("success", "User-Agent adicionado.");
            await load();
          } catch (error) {
            setNotice(
              "error",
              error instanceof Error
                ? error.message
                : "Falha ao adicionar user-agent.",
            );
          }
        });

      root.querySelectorAll("[data-ua-del]").forEach((button) => {
        button.addEventListener("click", async () => {
          const id = button.getAttribute("data-ua-del");
          try {
            await requestJson(
              api,
              `/api/credentials/ua/${id}`,
              { method: "DELETE" },
              "Falha ao remover user-agent.",
            );
            setNotice("success", "User-Agent removido.");
            await load();
          } catch (error) {
            setNotice(
              "error",
              error instanceof Error
                ? error.message
                : "Falha ao remover user-agent.",
            );
          }
        });
      });

      root.querySelectorAll("[data-ua-default]").forEach((button) => {
        button.addEventListener("click", async () => {
          const id = button.getAttribute("data-ua-default");
          try {
            await requestJson(
              api,
              `/api/credentials/ua/${id}/default`,
              { method: "PATCH" },
              "Falha ao definir user-agent padrão.",
            );
            setNotice("success", "User-Agent padrão atualizado.");
            await load();
          } catch (error) {
            setNotice(
              "error",
              error instanceof Error
                ? error.message
                : "Falha ao definir user-agent padrão.",
            );
          }
        });
      });

      document
        .getElementById("player-test-form")
        .addEventListener("submit", async (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const output = document.getElementById("player-test-output");
          output.textContent = "Executando teste...";
          try {
            const result = await requestJson(
              api,
              "/api/credentials/test",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  url: String(formData.get("url") || "").trim(),
                  tool: String(formData.get("tool") || "").trim(),
                  platform: String(formData.get("platform") || "").trim(),
                }),
              },
              "Falha no teste de conectividade.",
            );
            output.textContent = `${result.success ? "Sucesso" : "Falha"}\n\n${result.output || ""}`;
          } catch (error) {
            output.textContent =
              error instanceof Error
                ? error.message
                : "Falha no teste de conectividade.";
          }
        });
    }

    if (section === "tech") {
      document
        .getElementById("export-config")
        .addEventListener("click", async () => {
          try {
            const payload = await requestJson(
              api,
              "/api/config/export",
              { method: "POST" },
              "Falha ao exportar configuração.",
            );
            const blob = new Blob([JSON.stringify(payload, null, 2)], {
              type: "application/json",
            });
            const href = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = href;
            anchor.download = "tubewranglerr-config.json";
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(href);
            setNotice("success", "Configuração exportada.");
          } catch (error) {
            setNotice(
              "error",
              error instanceof Error
                ? error.message
                : "Falha ao exportar configuração.",
            );
          }
        });

      document
        .getElementById("import-config")
        .addEventListener("click", async () => {
          const fileInput = document.getElementById("import-file");
          const file = fileInput.files?.[0];
          if (!file) {
            setNotice("error", "Selecione um arquivo JSON para importar.");
            return;
          }

          try {
            const text = await file.text();
            const parsed = JSON.parse(text);
            await requestJson(
              api,
              "/api/config/import",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed),
              },
              "Falha ao importar configuração.",
            );
            setNotice("success", "Configuração importada.");
            await load();
          } catch (error) {
            setNotice(
              "error",
              error instanceof Error
                ? error.message
                : "Falha ao importar configuração.",
            );
          }
        });

      document
        .getElementById("reset-config")
        .addEventListener("click", async () => {
          if (
            !window.confirm(
              "Resetar todas as configurações para os valores padrão?",
            )
          ) {
            return;
          }
          try {
            await requestJson(
              api,
              "/api/config/reset",
              { method: "POST" },
              "Falha ao resetar configuração.",
            );
            setNotice("success", "Configuração resetada para o padrão.");
            await load();
          } catch (error) {
            setNotice(
              "error",
              error instanceof Error
                ? error.message
                : "Falha ao resetar configuração.",
            );
          }
        });
    }
  }

  await load();
}
