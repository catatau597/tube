export async function renderSettings(root, api) {
  async function load() {
    const [configRes, credsRes] = await Promise.all([api('/api/config'), api('/api/credentials')]);
    const config = await configRes.json();
    const credentials = await credsRes.json();

    root.innerHTML = `
      <div class="card">
        <h3>Configuração</h3>
        <form id="settings-form" class="grid">
          <label>
            Region Code
            <input name="regionCode" value="${config.regionCode || 'BR'}" />
          </label>
          <label>
            Max Results
            <input name="maxResults" type="number" value="${config.maxResults || 20}" />
          </label>
          <label>
            Scan Interval (s)
            <input name="scanIntervalSec" type="number" value="${config.scanIntervalSec || 120}" />
          </label>
          <label>
            Upcoming Window (h)
            <input name="upcomingWindowHours" type="number" value="${config.upcomingWindowHours || 24}" />
          </label>
          <label>
            Prefix Live
            <input name="epgPrefixLive" value="${config.epgPrefixLive || '🔴 AO VIVO'}" />
          </label>
          <label>
            Prefix Upcoming
            <input name="epgPrefixUpcoming" value="${config.epgPrefixUpcoming || '🟡 AGENDADO'}" />
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
                    <td>${cred.name}</td>
                    <td>${cred.is_active ? 'ativa' : 'inativa'}</td>
                    <td>
                      <button data-del="${cred.id}">Remover</button>
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
          regionCode: String(formData.get('regionCode') || 'BR').toUpperCase(),
          maxResults: Number(formData.get('maxResults') || 20),
          scanIntervalSec: Number(formData.get('scanIntervalSec') || 120),
          upcomingWindowHours: Number(formData.get('upcomingWindowHours') || 24),
          epgPrefixLive: String(formData.get('epgPrefixLive') || '🔴 AO VIVO'),
          epgPrefixUpcoming: String(formData.get('epgPrefixUpcoming') || '🟡 AGENDADO'),
        }),
      });
      await load();
    });

    document.getElementById('cred-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      await api('/api/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(formData.get('name') || '').trim(),
          apiKey: String(formData.get('apiKey') || '').trim(),
        }),
      });
      await load();
    });

    root.querySelectorAll('[data-del]').forEach((button) => {
      button.addEventListener('click', async () => {
        await api(`/api/credentials/${button.getAttribute('data-del')}`, { method: 'DELETE' });
        await load();
      });
    });
  }

  await load();
}
