import assert from 'node:assert/strict';

const baseUrl = process.env.APP_URL || 'http://localhost:8888';

function cookieHeaderFromSetCookie(setCookie) {
  if (!setCookie || setCookie.length === 0) return '';
  return setCookie.map((entry) => entry.split(';', 1)[0]).join('; ');
}

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const body = await response.text();
  return { response, body };
}

async function main() {
  const health = await request('/health');
  assert.equal(health.response.status, 200, 'health deve responder 200');
  const healthJson = JSON.parse(health.body);
  assert.equal(healthJson.status, 'ok', 'health status deve ser ok');

  const denied = await request('/api/channels');
  assert.equal(denied.response.status, 401, 'api protegida sem sessão deve retornar 401');

  const login = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'tubewranglerr' }),
  });
  assert.equal(login.response.status, 200, 'login padrão deve funcionar');

  const cookie = cookieHeaderFromSetCookie(login.response.headers.getSetCookie?.() || []);
  assert.ok(cookie.includes('connect.sid='), 'deve receber cookie de sessão no login');

  const me = await request('/api/auth/me', {
    headers: { Cookie: cookie },
  });
  assert.equal(me.response.status, 200, 'auth/me deve funcionar com sessão');
  const meJson = JSON.parse(me.body);
  assert.equal(meJson.username, 'admin', 'usuário autenticado deve ser admin');

  const channels = await request('/api/channels', {
    headers: { Cookie: cookie },
  });
  assert.equal(channels.response.status, 200, 'channels deve responder 200 autenticado');
  const channelsJson = JSON.parse(channels.body);
  assert.ok(Array.isArray(channelsJson), 'channels deve retornar array');

  const invalidId = await request('/api/channels/abc/freeze', {
    method: 'PATCH',
    headers: { Cookie: cookie },
  });
  assert.equal(invalidId.response.status, 400, 'id inválido em canais deve retornar 400');

  const logs = await request('/api/logs/meta', {
    headers: { Cookie: cookie },
  });
  assert.equal(logs.response.status, 200, 'logs/meta deve responder 200 autenticado');

  const playlist = await request('/live.m3u');
  assert.equal(playlist.response.status, 200, 'playlist pública live.m3u deve responder 200');
  assert.ok(playlist.body.startsWith('#EXTM3U'), 'playlist deve começar com #EXTM3U');

  console.log('Integration checks passed.');
}

main().catch((error) => {
  console.error('Integration checks failed:', error.message);
  process.exit(1);
});
