function channelRow(channel) {
  return `
    <tr>
      <td>${channel.channel_title || '-'}</td>
      <td>${channel.handle || '-'}</td>
      <td>${channel.channel_id}</td>
      <td>${channel.custom_name || '-'}</td>
      <td>
        <button data-action="refresh" data-id="${channel.id}">Atualizar</button>
        <button data-action="delete" data-id="${channel.id}">Remover</button>
      </td>
    </tr>
  `;
}

export async function renderChannels(root, api) {
  async function load() {
    const res = await api('/api/channels');
    const channels = await res.json();

    root.innerHTML = `
      <div class="card">
        <h3>Novo canal</h3>
        <form id="channel-form" class="toolbar">
          <input name="input" placeholder="@handle, UC..., ou URL" required />
          <input name="customName" placeholder="Nome personalizado (opcional)" />
          <button type="submit">Adicionar</button>
        </form>
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
            ${channels.map(channelRow).join('')}
          </tbody>
        </table>
      </div>
    `;

    const form = document.getElementById('channel-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      await api('/api/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: String(formData.get('input') || '').trim(),
          customName: String(formData.get('customName') || '').trim() || null,
        }),
      });
      await load();
    });

    root.querySelectorAll('button[data-action="refresh"]').forEach((button) => {
      button.addEventListener('click', async () => {
        await api(`/api/channels/${button.dataset.id}/sync`, { method: 'POST' });
        await load();
      });
    });

    root.querySelectorAll('button[data-action="delete"]').forEach((button) => {
      button.addEventListener('click', async () => {
        await api(`/api/channels/${button.dataset.id}`, { method: 'DELETE' });
        await load();
      });
    });
  }

  await load();
}
