const PLAYLISTS = [
  { key: 'live', label: '🔴 Live (Direct)', path: '/live.m3u' },
  { key: 'liveProxy', label: '🔴 Live (Proxy)', path: '/live-proxy.m3u' },
  { key: 'upcoming', label: '🟡 Upcoming (Direct)', path: '/upcoming.m3u' },
  { key: 'upcomingProxy', label: '🟡 Upcoming (Proxy)', path: '/upcoming-proxy.m3u' },
  { key: 'vod', label: '⚪ VOD (Direct)', path: '/vod.m3u' },
  { key: 'vodProxy', label: '⚪ VOD (Proxy)', path: '/vod-proxy.m3u' },
  { key: 'epg', label: '📋 EPG XML', path: '/epg.xml' },
];

export async function renderPlaylists(root) {
  const base = window.location.origin;
  root.innerHTML = `
    <div class="card">
      <h3>Saídas públicas</h3>
      <p style="opacity:0.6;font-size:0.85rem">URLs acessíveis sem autenticação. Copie e cole no seu player IPTV.</p>
      <table>
        <thead>
          <tr><th>Nome</th><th>URL</th><th>Ações</th></tr>
        </thead>
        <tbody>
          ${PLAYLISTS.map(
            (item) => `
              <tr>
                <td>${item.label}</td>
                <td><a href="${item.path}" target="_blank" style="word-break:break-all">${base}${item.path}</a></td>
                <td><button data-copy="${base}${item.path}" class="action-btn" title="Copiar URL">📋 Copiar</button></td>
              </tr>
            `,
          ).join('')}
        </tbody>
      </table>
    </div>
  `;

  root.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(button.getAttribute('data-copy'));
      const original = button.textContent;
      button.textContent = '✅ Copiado!';
      setTimeout(() => { button.textContent = original; }, 1500);
    });
  });
}
