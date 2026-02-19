function channelRow(channel) {
  return `
    <tr>
      <td>${channel.channel_title || "-"}</td>
      <td>${channel.handle || "-"}</td>
      <td>${channel.channel_id}</td>
      <td>${channel.custom_name || "-"}</td>
      <td>
        <button data-action="refresh" data-id="${channel.id}">Atualizar</button>
        <button data-action="delete" data-id="${channel.id}">Remover</button>
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
 * Renderiza a página de canais e controla CRUD com feedback visual de erro/sucesso.
 * @param {HTMLElement} root
 * @param {(path: string, options?: RequestInit) => Promise<Response>} api
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
          <input name="input" placeholder="@handle, UC..., ou URL" required />
          <input name="customName" placeholder="Nome personalizado (opcional)" />
          <button type="submit">Adicionar</button>
        </form>
        <p id="channel-message" class="form-msg ${message.type} ${message.text ? "show" : ""}">${message.text || ""}</p>
      </div>
      <div class="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Handle</th>
              <th>Channel ID</th>
              <th>Custom</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${channels.map(channelRow).join("")}
          </tbody>
        </table>
      </div>
    `;

    const form = document.getElementById("channel-form");
    const messageNode = document.getElementById("channel-message");

    function paintMessage() {
      messageNode.className = `form-msg ${message.type} ${message.text ? "show" : ""}`;
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
          customName: String(formData.get("customName") || "").trim() || null,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setMessage(
          "error",
          formatApiError(payload, "Falha ao adicionar canal."),
        );
        paintMessage();
        return;
      }

      setMessage("success", "Canal adicionado com sucesso.");
      await load();
    });

    root.querySelectorAll('button[data-action="refresh"]').forEach((button) => {
      button.addEventListener("click", async () => {
        const response = await api(`/api/channels/${button.dataset.id}/sync`, {
          method: "POST",
        });
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          setMessage(
            "error",
            formatApiError(payload, "Falha ao sincronizar canal."),
          );
          paintMessage();
          return;
        }
        setMessage("success", "Sincronização solicitada.");
        await load();
      });
    });

    root.querySelectorAll('button[data-action="delete"]').forEach((button) => {
      button.addEventListener("click", async () => {
        const response = await api(`/api/channels/${button.dataset.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          setMessage(
            "error",
            formatApiError(payload, "Falha ao remover canal."),
          );
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
