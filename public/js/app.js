import { renderDashboard } from './dashboard.js';
import { renderChannels } from './channels.js';
import { renderStreams } from './streams.js';
import { renderPlaylists } from './playlists.js';
import { renderSettings } from './settings.js';
import { renderLogs } from './logs.js';

const app = document.getElementById('app');
const sidebar = document.getElementById('sidebar');
const resizer = document.getElementById('sidebar-resizer');
const statusBadges = document.getElementById('status-badges');

const routes = {
	'/': renderDashboard,
	'/channels': renderChannels,
	'/streams': renderStreams,
	'/playlists': renderPlaylists,
	'/settings': renderSettings,
	'/logs': renderLogs,
};

async function api(path, options = {}) {
	const response = await fetch(path, { credentials: 'include', ...options });
	if (response.status === 401) {
		window.location.href = '/login';
		throw new Error('Unauthorized');
	}
	return response;
}

async function updateHeaderBadges() {
	try {
		const response = await api('/api/scheduler/status');
		const status = await response.json();
		statusBadges.innerHTML = [
			`<span class="badge">Scheduler: ${status.paused ? 'Pausado' : 'Ativo'}</span>`,
			`<span class="badge">Live: ${status.activeLives ?? 0}</span>`,
			`<span class="badge">Upcoming: ${status.activeUpcoming ?? 0}</span>`,
		].join('');
	} catch {
		statusBadges.innerHTML = '<span class="badge">Sem conexão</span>';
	}
}

async function renderRoute() {
	const hash = window.location.hash.replace('#', '') || '/';
	const routeFn = routes[hash] || routes['/'];
	document.querySelectorAll('[data-route]').forEach((a) => {
		if (a.getAttribute('href') === `#${hash}` || (hash === '/' && a.getAttribute('href') === '#/')) {
			a.classList.add('active');
		} else {
			a.classList.remove('active');
		}
	});
	await routeFn(app, api);
	await updateHeaderBadges();
}

function setupSidebarResize() {
	let dragging = false;
	resizer.addEventListener('mousedown', () => {
		dragging = true;
	});

	window.addEventListener('mousemove', (event) => {
		if (!dragging) return;
		const width = Math.max(200, Math.min(420, event.clientX));
		document.querySelector('.app-shell').style.gridTemplateColumns = `${width}px 6px 1fr`;
	});

	window.addEventListener('mouseup', () => {
		dragging = false;
	});
}

document.getElementById('sidebar-toggle').addEventListener('click', () => {
	const shell = document.querySelector('.app-shell');
	if (sidebar.classList.toggle('collapsed')) {
		shell.style.gridTemplateColumns = '56px 6px 1fr';
	} else {
		shell.style.gridTemplateColumns = '280px 6px 1fr';
	}
});

document.getElementById('logout-btn').addEventListener('click', async () => {
	await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
	window.location.href = '/login';
});

window.addEventListener('hashchange', renderRoute);
setupSidebarResize();
renderRoute();
