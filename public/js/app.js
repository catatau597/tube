import { renderDashboard } from './dashboard.js';
import { renderChannels } from './channels.js';
import { renderStreams } from './streams.js';
import { renderPlaylists } from './playlists.js';
import { renderSettings } from './settings.js';
import { renderLogs } from './logs.js';
import { renderTitleFormat } from './title-format.js';

console.log('[app] Module loaded OK');

const app = document.getElementById('app');
const sidebar = document.getElementById('sidebar');
const resizer = document.getElementById('sidebar-resizer');
const statusBadges = document.getElementById('status-badges');

if (!app) console.error('[app] CRITICAL: #app element not found!');
if (!statusBadges) console.error('[app] CRITICAL: #status-badges element not found!');

const routes = {
	'/': renderDashboard,
	'/channels': renderChannels,
	'/streams': renderStreams,
	'/playlists': renderPlaylists,
	'/settings': renderSettings,
	'/settings/api': renderSettings,
	'/settings/scheduler': renderSettings,
	'/settings/content': renderSettings,
	'/settings/title-format': renderTitleFormat,
	'/settings/retention': renderSettings,
	'/settings/media': renderSettings,
	'/settings/cache': renderSettings,
	'/settings/tech': renderSettings,
	'/logs': renderLogs,
};

async function api(path, options = {}) {
	console.log('[api] Fetching:', path);
	let response;
	try {
		response = await fetch(path, { credentials: 'include', ...options });
	} catch (networkErr) {
		console.error('[api] Network error fetching', path, networkErr);
		throw new Error(`Erro de rede ao acessar ${path}: ${networkErr.message}`);
	}
	console.log('[api]', path, '→', response.status);
	if (response.status === 401) {
		window.location.href = '/login';
		throw new Error('Unauthorized');
	}
	if (response.status === 403) {
		const body = await response.json().catch(() => ({}));
		if (body.code === 'PASSWORD_CHANGE_REQUIRED') {
			window.location.href = '/setup';
			throw new Error('Password change required');
		}
	}
	if (!response.ok) {
		const text = await response.text().catch(() => '');
		console.warn('[api]', path, 'returned', response.status, text.slice(0, 200));
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
	} catch (err) {
		console.warn('[app] updateHeaderBadges error:', err);
		statusBadges.innerHTML = '<span class="badge">Sem conexão</span>';
	}
}

async function renderRoute() {
	const hash = window.location.hash.replace('#', '') || '/';
	console.log('[app] renderRoute →', hash);
	const routeKey = Object.keys(routes).find((key) => key === hash) || '/';
	const routeFn = routes[routeKey] || routes['/'];
	document.querySelectorAll('[data-route]').forEach((a) => {
		const href = a.getAttribute('href')?.replace('#', '');
		const isActive = href === hash || (href === '/settings' && hash.startsWith('/settings')) || (hash === '/' && href === '/');
		if (isActive) {
			a.classList.add('active');
		} else {
			a.classList.remove('active');
		}
	});
	if (app) app.innerHTML = '<div class="card"><p>⏳ Carregando...</p></div>';
	try {
		await routeFn(app, api, hash);
		console.log('[app] renderRoute complete for', hash);
	} catch (error) {
		console.error('[app] renderRoute error:', error);
		if (app) {
			app.innerHTML = `<div class="card"><h3>Erro ao carregar página</h3><p style="color:#fca5a5">${error.message || 'Erro desconhecido'}</p><pre style="color:#fca5a5;font-size:0.75rem;overflow:auto;max-height:200px">${error.stack || ''}</pre><button class="action-btn" onclick="window.dispatchEvent(new Event('hashchange'))">🔄 Tentar novamente</button></div>`;
		}
	}
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

/* Clipboard helper that works on HTTP (non-HTTPS) via fallback */
window.copyToClipboard = async function (text) {
	try {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text);
			return;
		}
	} catch { /* fallback below */ }
	const textarea = document.createElement('textarea');
	textarea.value = text;
	textarea.style.position = 'fixed';
	textarea.style.opacity = '0';
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
};
