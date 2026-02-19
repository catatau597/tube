const PLAYLISTS = [
  { key: 'live', label: 'Live M3U', path: '/live.m3u' },
  { key: 'liveProxy', label: 'Live Proxy M3U', path: '/live-proxy.m3u' },
  { key: 'upcoming', label: 'Upcoming M3U', path: '/upcoming.m3u' },
  { key: 'vods', label: 'VOD M3U', path: '/vods.m3u' },
  { key: 'epg', label: 'EPG XML', path: '/epg.xml' },
];

export async function renderPlaylists(root) {
  const base = window.location.origin;
  root.innerHTML = `
    <div class="card">
      <h3>Saídas públicas</h3>
      <table>
        <thead>
          <tr><th>Nome</th><th>URL</th><th>Ações</th></tr>
        </thead>
        <tbody>
          ${PLAYLISTS.map(
            (item) => `
              <tr>
                <td>${item.label}</td>
                <td><a href="${item.path}" target="_blank">${base}${item.path}</a></td>
                <td><button data-copy="${base}${item.path}">Copiar</button></td>
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
    });
  });
}
