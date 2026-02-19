function statusBadge(status) {
  const cls = status === 'live' ? 'badge live' : status === 'upcoming' ? 'badge upcoming' : 'badge';
  return `<span class="${cls}">${status}</span>`;
}

function streamRow(stream) {
  return `
    <tr>
      <td>${stream.channel_title || stream.channel_id}</td>
      <td>${stream.video_title || '-'}</td>
      <td>${statusBadge(stream.status)}</td>
      <td>${stream.published_at || '-'}</td>
      <td>${stream.scheduled_start_time || '-'}</td>
      <td>${stream.video_id || '-'}</td>
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
          <button id="refresh-streams">Atualizar agora</button>
          <select id="status-filter">
            <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>Todos</option>
            <option value="live" ${statusFilter === 'live' ? 'selected' : ''}>Live</option>
            <option value="upcoming" ${statusFilter === 'upcoming' ? 'selected' : ''}>Upcoming</option>
            <option value="none" ${statusFilter === 'none' ? 'selected' : ''}>VOD/none</option>
          </select>
        </div>
      </div>
      <div class="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Canal</th>
              <th>Título</th>
              <th>Status</th>
              <th>Publicado</th>
              <th>Início agendado</th>
              <th>Video ID</th>
            </tr>
          </thead>
          <tbody>
            ${streams.map(streamRow).join('')}
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
