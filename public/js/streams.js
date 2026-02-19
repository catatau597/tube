function statusBadge(status) {
  const icons = { live: '🔴', upcoming: '🟡', none: '⚪' };
  const labels = { live: 'Live', upcoming: 'Upcoming', none: 'VOD' };
  const icon = icons[status] || '⚪';
  const label = labels[status] || status;
  return `<span class="badge ${status || ''}">${icon} ${label}</span>`;
}

function formatDate(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function streamRow(stream) {
  // API retorna colunas SQLite: channel_id, title, video_id, status, scheduled_start, actual_start, thumbnail_url
  const channelId = stream.channel_id || '-';
  const title = stream.title || '-';
  const videoId = stream.video_id || '-';
  const status = stream.status || 'none';
  const scheduledStart = formatDate(stream.scheduled_start || stream.actual_start);

  return `
    <tr>
      <td title="${channelId}">${channelId.length > 16 ? channelId.slice(0, 16) + '…' : channelId}</td>
      <td title="${title}">${title}</td>
      <td>${statusBadge(status)}</td>
      <td>${scheduledStart}</td>
      <td><a href="https://youtube.com/watch?v=${videoId}" target="_blank" title="${videoId}">${videoId.slice(0, 11)}</a></td>
    </tr>
  `;
}

export async function renderStreams(root, api) {
  let statusFilter = 'all';

  async function load() {
    const response = await api('/api/streams');
    let streams = await response.json();
    if (statusFilter !== 'all') {
      streams = streams.filter((stream) => stream.status === statusFilter);
    }

    root.innerHTML = `
      <div class="card">
        <div class="toolbar">
          <button id="refresh-streams" class="action-btn">🔄 Atualizar agora</button>
          <select id="status-filter">
            <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>Todos</option>
            <option value="live" ${statusFilter === 'live' ? 'selected' : ''}>🔴 Live</option>
            <option value="upcoming" ${statusFilter === 'upcoming' ? 'selected' : ''}>🟡 Upcoming</option>
            <option value="none" ${statusFilter === 'none' ? 'selected' : ''}>⚪ VOD</option>
          </select>
          <span class="badge">${streams.length} evento(s)</span>
        </div>
      </div>
      <div class="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Canal</th>
              <th>Título</th>
              <th>Status</th>
              <th>Início</th>
              <th>Video ID</th>
            </tr>
          </thead>
          <tbody>
            ${streams.length > 0 ? streams.map(streamRow).join('') : '<tr><td colspan="5" style="text-align:center;opacity:0.5">Nenhum evento encontrado</td></tr>'}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('status-filter').addEventListener('change', async (event) => {
      statusFilter = event.target.value;
      await load();
    });

    document.getElementById('refresh-streams').addEventListener('click', async () => {
      await api('/api/scheduler/trigger', { method: 'POST' });
      await load();
    });
  }

  await load();
}
