export async function renderDashboard(root, api) {
  const [schedulerRes, channelsRes, streamsRes] = await Promise.all([
    api('/api/scheduler/status'),
    api('/api/channels'),
    api('/api/streams'),
  ]);

  const scheduler = await schedulerRes.json();
  const channels = await channelsRes.json();
  const streams = await streamsRes.json();

  const live = streams.filter((s) => s.status === 'live').length;
  const upcoming = streams.filter((s) => s.status === 'upcoming').length;
  const vod = streams.filter((s) => s.status === 'none').length;

  root.innerHTML = `
    <div class="grid">
      <div class="card"><h3>Live</h3><p>${live}</p></div>
      <div class="card"><h3>Upcoming</h3><p>${upcoming}</p></div>
      <div class="card"><h3>VOD</h3><p>${vod}</p></div>
      <div class="card"><h3>Canais</h3><p>${channels.length}</p></div>
    </div>
    <div class="card">
      <h3>Agendador</h3>
      <p>Executando: ${scheduler.running ? 'sim' : 'não'} | Pausado: ${scheduler.paused ? 'sim' : 'não'}</p>
      <div class="toolbar">
        <button id="trigger-now">▶ Iniciar Busca Global</button>
        <button id="pause-resume">${scheduler.paused ? '▶ Retomar' : '⏸ Pausar Agendador'}</button>
      </div>
    </div>
    <div class="card">
      <h3>Playlists rápidas</h3>
      <div class="toolbar">
        <button data-copy="${window.location.origin}/live.m3u">Copiar Live</button>
        <button data-copy="${window.location.origin}/live-proxy.m3u">Copiar Live Proxy</button>
        <button data-copy="${window.location.origin}/epg.xml">Copiar EPG</button>
      </div>
    </div>
  `;

  root.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(button.getAttribute('data-copy'));
    });
  });

  document.getElementById('trigger-now').addEventListener('click', async () => {
    await api('/api/scheduler/trigger', { method: 'POST' });
  });

  document.getElementById('pause-resume').addEventListener('click', async () => {
    await api(`/api/scheduler/${scheduler.paused ? 'resume' : 'pause'}`, { method: 'POST' });
    window.dispatchEvent(new Event('hashchange'));
  });
}
