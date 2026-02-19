export async function renderSettings(root, api, hash = '/settings') {
  const section = hash.split('/')[2] || 'api';

  async function load() {
    const [configRes, credsRes] = await Promise.all([api('/api/config'), api('/api/credentials')]);
    const config = await configRes.json();
    const credentials = await credsRes.json();

    const sectionTitle =
      section === 'scheduler'
        ? 'Agendador'
        : section === 'content'
          ? 'Conteúdo & Filtros'
          : section === 'player'
            ? 'Smart Player'
            : section === 'tech'
              ? 'Técnico'
              : 'API & Credenciais';

    const sectionHint =
      section === 'scheduler'
        ? 'Ajuste intervalos e janela de execução do scheduler.'
        : section === 'content'
          ? 'Defina limites de upcoming/VOD e filtros de conteúdo.'
          : section === 'player'
            ? 'Gerencie user-agents e cookies usados pelo Smart Player.'
            : section === 'tech'
              ? 'Parâmetros técnicos de servidor e logs.'
              : 'Gerencie API Keys e credenciais.';

    root.innerHTML = `
      <div class="card">
        <h3>${sectionTitle}</h3>
        <p>${sectionHint}</p>
        <form id="settings-form" class="grid">
          <label>
            API Keys (separadas por vírgula)
            <input name="YOUTUBE_API_KEY" value="${config.YOUTUBE_API_KEY || ''}" />
          </label>
          <label>
            Main Interval (h)
            <input name="SCHEDULER_MAIN_INTERVAL_HOURS" type="number" value="${config.SCHEDULER_MAIN_INTERVAL_HOURS || 4}" />
          </label>
          <label>
            Pre Event Window (h)
            <input name="SCHEDULER_PRE_EVENT_WINDOW_HOURS" type="number" value="${config.SCHEDULER_PRE_EVENT_WINDOW_HOURS || 2}" />
          </label>
          <label>
            Max Schedule (h)
            <input name="MAX_SCHEDULE_HOURS" type="number" value="${config.MAX_SCHEDULE_HOURS || 72}" />
          </label>
          <label>
            Keep Recorded
            <select name="KEEP_RECORDED_STREAMS">
              <option value="true" ${String(config.KEEP_RECORDED_STREAMS) === 'true' ? 'selected' : ''}>true</option>
              <option value="false" ${String(config.KEEP_RECORDED_STREAMS) === 'false' ? 'selected' : ''}>false</option>
            </select>
          </label>
          <label>
            Log Level
            <select name="LOG_LEVEL">
              <option value="debug" ${String(config.LOG_LEVEL || '').toLowerCase() === 'debug' ? 'selected' : ''}>debug</option>
              <option value="info" ${String(config.LOG_LEVEL || '').toLowerCase() === 'info' ? 'selected' : ''}>info</option>
              <option value="warn" ${String(config.LOG_LEVEL || '').toLowerCase() === 'warn' ? 'selected' : ''}>warn</option>
              <option value="error" ${String(config.LOG_LEVEL || '').toLowerCase() === 'error' ? 'selected' : ''}>error</option>
            </select>
          </label>
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div class="card">
        <h3>YouTube API Keys</h3>
        <form id="cred-form" class="toolbar">
          <input name="name" placeholder="Nome da credencial" required />
          <input name="apiKey" placeholder="API key" required />
          <button type="submit">Adicionar</button>
        </form>
        <table>
          <thead><tr><th>Nome</th><th>Status</th><th>Ações</th></tr></thead>
          <tbody>
            ${credentials
              .map(
                (cred) => `
                  <tr>
                    <td>${cred.label || cred.platform || '-'}</td>
                    <td>${cred.active ? 'ativa' : 'inativa'}</td>
                    <td>
                      ${cred.type === 'user-agent' ? `<button data-del="${cred.id}">Remover</button>` : '-'}
                    </td>
                  </tr>
                `,
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('settings-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      await api('/api/config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          YOUTUBE_API_KEY: String(formData.get('YOUTUBE_API_KEY') || '').trim(),
          SCHEDULER_MAIN_INTERVAL_HOURS: String(formData.get('SCHEDULER_MAIN_INTERVAL_HOURS') || '4'),
          SCHEDULER_PRE_EVENT_WINDOW_HOURS: String(formData.get('SCHEDULER_PRE_EVENT_WINDOW_HOURS') || '2'),
          MAX_SCHEDULE_HOURS: String(formData.get('MAX_SCHEDULE_HOURS') || '72'),
          KEEP_RECORDED_STREAMS: String(formData.get('KEEP_RECORDED_STREAMS') || 'true'),
          LOG_LEVEL: String(formData.get('LOG_LEVEL') || 'info'),
        }),
      });
      await load();
    });

    document.getElementById('cred-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      await api('/api/credentials/ua', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: String(formData.get('name') || '').trim(),
          userAgent: String(formData.get('apiKey') || '').trim(),
          platform: 'global',
        }),
      });
      await load();
    });

    root.querySelectorAll('[data-del]').forEach((button) => {
      button.addEventListener('click', async () => {
        await api(`/api/credentials/ua/${button.getAttribute('data-del')}`, { method: 'DELETE' });
        await load();
      });
    });
  }

  await load();
}
