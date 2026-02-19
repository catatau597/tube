function formatDate(iso) {
  if (!iso || iso === '1970-01-01T00:00:00.000Z') return 'Nunca';
  return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export async function renderDashboard(root, api) {
  const [schedulerRes, channelsRes, streamsRes, configRes] = await Promise.all([
    api('/api/scheduler/status'),
    api('/api/channels'),
    api('/api/streams'),
    api('/api/config'),
  ]);

  const scheduler = await schedulerRes.json();
  const channels = await channelsRes.json();
  const streams = await streamsRes.json();
  const config = await configRes.json();

  const live = streams.filter((s) => s.status === 'live').length;
  const upcoming = streams.filter((s) => s.status === 'upcoming').length;
  const vod = streams.filter((s) => s.status === 'none').length;

  const generateDirect = config.PLAYLIST_GENERATE_DIRECT === 'true';
  const generateProxy = config.PLAYLIST_GENERATE_PROXY === 'true';

  // Estimativa bruta de quota: ~100 unidades por canal (playlistItems) + 1 por vídeo verificado
  const numChannels = channels.length;
  const quotaPerSync = numChannels * 100 + Math.ceil(streams.length / 50);
  const syncsPerDay = Math.ceil(24 / Number(config.SCHEDULER_MAIN_INTERVAL_HOURS || 4));
  const estimatedDaily = quotaPerSync * syncsPerDay;

  root.innerHTML = `
    <div class="grid">
      <div class="card"><h3>🔴 Live</h3><p style="font-size:2rem;margin:0">${live}</p></div>
      <div class="card"><h3>🟡 Upcoming</h3><p style="font-size:2rem;margin:0">${upcoming}</p></div>
      <div class="card"><h3>⚪ VOD</h3><p style="font-size:2rem;margin:0">${vod}</p></div>
      <div class="card"><h3>📺 Canais</h3><p style="font-size:2rem;margin:0">${numChannels}</p></div>
    </div>
    <div class="card">
      <h3>Agendador</h3>
      <p>
        Estado: ${scheduler.running ? '✅ Executando' : '⏹ Parado'}
        ${scheduler.paused ? ' (⏸ Pausado)' : ''}
      </p>
      <p>Última sincronização: <strong>${formatDate(scheduler.lastMainRun)}</strong></p>
      <p>Próxima sincronização: <strong>${formatDate(scheduler.nextMainRun)}</strong></p>
      <p style="opacity:0.6;font-size:0.85rem">Quota estimada/dia: ~${estimatedDaily.toLocaleString()} unidades (${syncsPerDay} syncs × ${numChannels} canais)</p>
      <div class="toolbar">
        <button id="trigger-now" class="action-btn">▶ Busca Global Agora</button>
        <button id="pause-resume" class="action-btn">${scheduler.paused ? '▶ Retomar' : '⏸ Pausar'}</button>
      </div>
    </div>
    <div class="card">
      <h3>Playlists rápidas</h3>
      <div class="toolbar" style="flex-wrap:wrap">
        ${generateDirect ? `
          <button data-copy="${window.location.origin}/live.m3u" class="action-btn">📋 Live</button>
          <button data-copy="${window.location.origin}/upcoming.m3u" class="action-btn">📋 Upcoming</button>
          <button data-copy="${window.location.origin}/vod.m3u" class="action-btn">📋 VOD</button>
        ` : ''}
        ${generateProxy ? `
          <button data-copy="${window.location.origin}/live-proxy.m3u" class="action-btn">📋 Live Proxy</button>
          <button data-copy="${window.location.origin}/upcoming-proxy.m3u" class="action-btn">📋 Up Proxy</button>
          <button data-copy="${window.location.origin}/vod-proxy.m3u" class="action-btn">📋 VOD Proxy</button>
        ` : ''}
        <button data-copy="${window.location.origin}/epg.xml" class="action-btn">📋 EPG</button>
      </div>
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

  document.getElementById('trigger-now').addEventListener('click', async () => {
    await api('/api/scheduler/trigger', { method: 'POST' });
    window.dispatchEvent(new Event('hashchange'));
  });

  document.getElementById('pause-resume').addEventListener('click', async () => {
    await api(`/api/scheduler/${scheduler.paused ? 'resume' : 'pause'}`, { method: 'POST' });
    window.dispatchEvent(new Event('hashchange'));
  });
}
