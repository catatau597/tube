const STATUS_ICONS = { active: '🟢', frozen: '🔵', not_found: '🔴' };

function channelRow(channel) {
  const avatar = channel.thumbnail_url
    ? `<img src="${channel.thumbnail_url}" alt="" style="width:28px;height:28px;border-radius:50%;vertical-align:middle;margin-right:6px" />`
    : '';
  const statusIcon = STATUS_ICONS[channel.status] || '⚪';
  const isFrozen = channel.status === 'frozen';

  return `
    <tr>
      <td>${avatar}${channel.title || '-'} <small style="opacity:0.5">${channel.handle || ''}</small></td>
      <td title="${channel.channel_id}">${channel.channel_id.length > 18 ? channel.channel_id.slice(0, 18) + '…' : channel.channel_id}</td>
      <td style="text-align:center">${channel.live_count || 0}</td>
      <td style="text-align:center">${channel.upcoming_count || 0}</td>
      <td style="text-align:center">${channel.vod_count || 0}</td>
      <td style="text-align:center">${statusIcon} ${channel.status}</td>
      <td>
        <div class="toolbar" style="gap:4px;flex-wrap:nowrap">
          <button data-action="sync" data-id="${channel.id}" class="action-btn" title="Sincronizar">🔄</button>
          <button data-action="freeze" data-id="${channel.id}" class="action-btn" title="${isFrozen ? 'Descongelar' : 'Congelar'}">${isFrozen ? '▶️' : '⏸️'}</button>
          <button data-action="delete" data-id="${channel.id}" class="danger-btn" title="Remover">🗑️</button>
        </div>
      </td>
    </tr>
  `;
}

function formatApiError(payload, fallback) {
  if (payload && typeof payload === "object" && "error" in payload) {
    return String(payload.error || fallback);
  }
  return fallback;
}

/**
 * Renderiza a página de canais com CRUD, freeze/unfreeze e contadores.
 */
export async function renderChannels(root, api) {
  let message = { type: "", text: "" };

  function setMessage(type, text) {
    message = { type, text };
  }

  async function load() {
    const res = await api("/api/channels");
    const channels = await res.json();

    root.innerHTML = `
      <div class="card">
        <h3>Novo canal</h3>
        <form id="channel-form" class="toolbar">
          <input name="input" placeholder="@handle, UC..., ou URL" required style="flex:1;min-width:200px" />
          <button type="submit" class="action-btn">➕ Adicionar</button>
        </form>
        <p id="channel-message" class="form-msg ${message.type} ${message.text ? "show" : ""}">${message.text || ""}</p>
      </div>
      <div class="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Canal</th>
              <th>Channel ID</th>
              <th style="text-align:center">🔴 Live</th>
              <th style="text-align:center">🟡 Up</th>
              <th style="text-align:center">⚪ VOD</th>
              <th style="text-align:center">Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${channels.length > 0 ? channels.map(channelRow).join("") : '<tr><td colspan="7" style="text-align:center;opacity:0.5">Nenhum canal cadastrado</td></tr>'}
          </tbody>
        </table>
      </div>
    `;

    const form = document.getElementById("channel-form");
    const messageNode = document.getElementById("channel-message");

    function paintMessage() {
      messageNode.className = \`form-msg \${message.type} \${message.text ? "show" : ""}\`;
      messageNode.textContent = message.text;
    }

    paintMessage();

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const response = await api("/api/channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: String(formData.get("input") || "").trim(),
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setMessage("error", formatApiError(payload, "Falha ao adicionar canal."));
        paintMessage();
        return;
      }

      setMessage("success", "Canal adicionado com sucesso.");
      await load();
    });

    root.querySelectorAll('button[data-action="sync"]').forEach((button) => {
      button.addEventListener("click", async () => {
        const response = await api(\`/api/channels/\${button.dataset.id}/sync\`, { method: "POST" });
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          setMessage("error", formatApiError(payload, "Falha ao sincronizar canal."));
          paintMessage();
          return;
        }
        setMessage("success", "Sincronização solicitada.");
        await load();
      });
    });

    root.querySelectorAll('button[data-action="freeze"]').forEach((button) => {
      button.addEventListener("click", async () => {
        const response = await api(\`/api/channels/\${button.dataset.id}/freeze\`, { method: "PATCH" });
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          setMessage("error", formatApiError(payload, "Falha ao alterar status do canal."));
          paintMessage();
          return;
        }
        setMessage("success", "Status do canal atualizado.");
        await load();
      });
    });

    root.querySelectorAll('button[data-action="delete"]').forEach((button) => {
      button.addEventListener("click", async () => {
        if (!confirm("Remover este canal e todos os seus streams?")) return;
        const response = await api(\`/api/channels/\${button.dataset.id}\`, { method: "DELETE" });
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          setMessage("error", formatApiError(payload, "Falha ao remover canal."));
          paintMessage();
          return;
        }
        setMessage("success", "Canal removido.");
        await load();
      });
    });
  }

  await load();
}
