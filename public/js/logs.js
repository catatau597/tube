function line(log) {
  const time = new Date(log.timestamp || Date.now()).toLocaleTimeString();
  const level = String(log.level || 'info').toUpperCase();
  return `<div class="log-line" data-level="${log.level || 'info'}">[${time}] [${level}] ${log.message || ''}</div>`;
}

export async function renderLogs(root, api) {
  const initialRes = await api('/api/logs?limit=200');
  const initial = await initialRes.json();

  root.innerHTML = `
    <div class="card">
      <div class="toolbar">
        <label>Nível:
          <select id="log-level">
            <option value="all">Todos</option>
            <option value="error">Error</option>
            <option value="warn">Warn</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </label>
        <button id="clear-log-view">Limpar</button>
      </div>
      <div id="log-box" class="log-box">${initial.map(line).join('')}</div>
    </div>
  `;

  const logBox = document.getElementById('log-box');
  const levelSelect = document.getElementById('log-level');

  const applyFilter = () => {
    const selected = levelSelect.value;
    logBox.querySelectorAll('.log-line').forEach((el) => {
      const visible = selected === 'all' || el.getAttribute('data-level') === selected;
      el.style.display = visible ? '' : 'none';
    });
  };

  levelSelect.addEventListener('change', applyFilter);
  document.getElementById('clear-log-view').addEventListener('click', () => {
    logBox.innerHTML = '';
  });

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const socket = new WebSocket(`${protocol}//${window.location.host}/ws/logs`);

  socket.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      const wrapper = document.createElement('div');
      wrapper.innerHTML = line(payload);
      const node = wrapper.firstElementChild;
      logBox.appendChild(node);
      while (logBox.children.length > 500) {
        logBox.removeChild(logBox.firstElementChild);
      }
      applyFilter();
      logBox.scrollTop = logBox.scrollHeight;
    } catch {
      // ignore malformed messages
    }
  };

  window.addEventListener('hashchange', () => {
    socket.close();
  }, { once: true });
}
