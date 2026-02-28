/* ======================================================================
 *  Settings — 7 sub-páginas reorganizadas
 * ====================================================================== */

const sectionMeta = {
  api: {
    title: 'API & Credenciais',
    hint: 'Gerencie API Keys, Cookies, User-Agents e Perfis de Ferramentas.',
  },
  scheduler: {
    title: 'Agendador',
    hint: 'Ajuste intervalos, janela ativa e sincronização global.',
  },
  content: {
    title: 'Conteúdo & Filtros',
    hint: 'Defina limites, filtros e modos de geração de playlist.',
  },
  retention: {
    title: 'Retenção (VOD)',
    hint: 'Controle a manutenção de eventos encerrados no cache e playlist VOD.',
  },
  media: {
    title: 'Mídia & Placeholders',
    hint: 'Imagem e comportamento de placeholder quando não há stream ativo.',
  },
  cache: {
    title: 'Cache',
    hint: 'Cache de thumbnails e configuração de TTL.',
  },
  tech: {
    title: 'Técnico',
    hint: 'Parâmetros técnicos do servidor e export/import de configurações.',
  },
};

/* ---------- helpers ---------- */

function textFromError(payload, fallback) {
  if (payload && typeof payload === 'object' && 'error' in payload) return String(payload.error || fallback);
  return fallback;
}

async function requestJson(api, path, options, fallbackError) {
  const response = await api(path, options);
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(textFromError(payload, fallbackError));
  return payload;
}

function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;');
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function toggleSwitch(name, checked) {
  return `
    <label class="toggle-switch">
      <input type="checkbox" name="${name}" ${checked ? 'checked' : ''}>
      <span class="slider"></span>
    </label>`;
}

const COMMON_TIMEZONES = [
  'America/Sao_Paulo','America/New_York','America/Chicago','America/Denver',
  'America/Los_Angeles','America/Manaus','America/Bahia','America/Fortaleza',
  'America/Argentina/Buenos_Aires','America/Santiago','America/Bogota',
  'America/Mexico_City','Europe/London','Europe/Paris','Europe/Berlin',
  'Europe/Lisbon','Europe/Madrid','Europe/Moscow','Asia/Tokyo','Asia/Shanghai',
  'Asia/Kolkata','Asia/Dubai','Australia/Sydney','Pacific/Auckland','UTC',
];

function timezoneSelect(current) {
  const cur = current || 'America/Sao_Paulo';
  const opts = COMMON_TIMEZONES.map(
    (tz) => `<option value="${tz}" ${tz === cur ? 'selected' : ''}>${tz}</option>`,
  ).join('');
  return `<select name="LOCAL_TIMEZONE">${opts}</select>`;
}

/* ---------- configFields por seção ---------- */

function configFields(section, config) {
  if (section === 'scheduler') {
    const activeHoursEnabled = String(config.ENABLE_SCHEDULER_ACTIVE_HOURS || 'false') === 'true';
    return `
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem">
        ${toggleSwitch('ENABLE_SCHEDULER_ACTIVE_HOURS', activeHoursEnabled)}
        <label style="margin:0">Ativar Janela de Horário</label>
      </div>
      ${activeHoursEnabled ? `
      <label>Hora Início
        <input name="SCHEDULER_ACTIVE_START_HOUR" type="number" min="0" max="23" value="${config.SCHEDULER_ACTIVE_START_HOUR || 7}" />
      </label>
      <label>Hora Fim
        <input name="SCHEDULER_ACTIVE_END_HOUR" type="number" min="0" max="23" value="${config.SCHEDULER_ACTIVE_END_HOUR || 22}" />
      </label>` : ''}
      <label>Intervalo Principal (h)
        <input name="SCHEDULER_MAIN_INTERVAL_HOURS" type="number" min="1" max="24" value="${config.SCHEDULER_MAIN_INTERVAL_HOURS || 4}" />
      </label>
      <label>Janela Pré-Evento (h)
        <input name="SCHEDULER_PRE_EVENT_WINDOW_HOURS" type="number" min="0" max="12" value="${config.SCHEDULER_PRE_EVENT_WINDOW_HOURS || 2}" />
      </label>
      <label>Intervalo Pré-Evento (min)
        <input name="SCHEDULER_PRE_EVENT_INTERVAL_MINUTES" type="number" min="1" max="60" value="${config.SCHEDULER_PRE_EVENT_INTERVAL_MINUTES || 5}" />
      </label>
      <label>Intervalo Pós-Evento (min)
        <input name="SCHEDULER_POST_EVENT_INTERVAL_MINUTES" type="number" min="1" max="60" value="${config.SCHEDULER_POST_EVENT_INTERVAL_MINUTES || 5}" />
      </label>
      <label>Full Sync (h)
        <input name="FULL_SYNC_INTERVAL_HOURS" type="number" min="12" max="168" value="${config.FULL_SYNC_INTERVAL_HOURS || 48}" />
      </label>
      <label>TTL Handles (h)
        <input name="RESOLVE_HANDLES_TTL_HOURS" type="number" min="1" max="168" value="${config.RESOLVE_HANDLES_TTL_HOURS || 24}" />
      </label>`;
  }

  if (section === 'content') {
    const generateDirect = String(config.PLAYLIST_GENERATE_DIRECT || 'true') === 'true';
    const generateProxy  = String(config.PLAYLIST_GENERATE_PROXY  || 'true') === 'true';
    const filterCategory = String(config.FILTER_BY_CATEGORY       || 'false') === 'true';
    const cleanupDesc    = String(config.EPG_DESCRIPTION_CLEANUP   || 'true') === 'true';
    return `
      <div style="display:flex;flex-direction:column;gap:0.8rem;margin-bottom:1rem">
        <div style="display:flex;align-items:center;gap:0.5rem">
          ${toggleSwitch('PLAYLIST_GENERATE_DIRECT', generateDirect)}
          <label style="margin:0">Gerar Playlist Direct</label>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem">
          ${toggleSwitch('PLAYLIST_GENERATE_PROXY', generateProxy)}
          <label style="margin:0">Gerar Playlist Proxy</label>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem">
          ${toggleSwitch('FILTER_BY_CATEGORY', filterCategory)}
          <label style="margin:0">Filtrar por Categoria</label>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem">
          ${toggleSwitch('EPG_DESCRIPTION_CLEANUP', cleanupDesc)}
          <label style="margin:0">Limpeza Descrição EPG</label>
        </div>
      </div>
      <label>Max Agendamento (h)
        <input name="MAX_SCHEDULE_HOURS" type="number" min="24" max="720" value="${config.MAX_SCHEDULE_HOURS || 72}" />
      </label>
      <label>Max Upcoming / Canal
        <input name="MAX_UPCOMING_PER_CHANNEL" type="number" min="1" max="20" value="${config.MAX_UPCOMING_PER_CHANNEL || 6}" />
      </label>
      ${filterCategory ? `
      <label>IDs de Categoria Permitidos
        <input name="ALLOWED_CATEGORY_IDS" value="${escapeAttr(config.ALLOWED_CATEGORY_IDS)}" placeholder="17,20,24" />
      </label>` : ''}
      <label>Expressões de Filtro de Título
        <input name="TITLE_FILTER_EXPRESSIONS" value="${escapeAttr(config.TITLE_FILTER_EXPRESSIONS)}" placeholder="shorts,#shorts" />
      </label>
      <label>Mapeamento de Categorias
        <textarea name="CATEGORY_MAPPINGS" rows="3" placeholder="17=ESPORTES,20=JOGOS">${escapeHtml(config.CATEGORY_MAPPINGS || '')}</textarea>
      </label>
      <label>Mapeamento de Nomes de Canal
        <textarea name="CHANNEL_NAME_MAPPINGS" rows="3">${escapeHtml(config.CHANNEL_NAME_MAPPINGS || '')}</textarea>
      </label>`;
  }

  if (section === 'retention') {
    const keepRecorded = String(config.KEEP_RECORDED_STREAMS || 'true') === 'true';
    return `
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem">
        ${toggleSwitch('KEEP_RECORDED_STREAMS', keepRecorded)}
        <label style="margin:0">Manter Streams Gravados</label>
      </div>
      <label>Retenção VOD (dias)
        <input name="RECORDED_RETENTION_DAYS" type="number" min="1" max="30" value="${config.RECORDED_RETENTION_DAYS || 2}" />
      </label>
      <label>Máx. VODs por Canal
        <input name="MAX_RECORDED_PER_CHANNEL" type="number" min="1" max="10" value="${config.MAX_RECORDED_PER_CHANNEL || 2}" />
      </label>
      <p style="opacity:0.6;font-size:0.85rem;margin-top:0.6rem;grid-column:1/-1">
        O sistema <strong>não</strong> busca VODs ativamente. Ciclo: Upcoming → Live → Recorded.
      </p>`;
  }

  if (section === 'media') {
    const useInvisible = String(config.USE_INVISIBLE_PLACEHOLDER || 'true') === 'true';
    const imgUrl = config.PLACEHOLDER_IMAGE_URL || '';
    return `
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem">
        ${toggleSwitch('USE_INVISIBLE_PLACEHOLDER', useInvisible)}
        <label style="margin:0">Placeholder Invisível (comentário no M3U)</label>
      </div>
      <label>URL da Imagem de Placeholder
        <input name="PLACEHOLDER_IMAGE_URL" value="${escapeAttr(imgUrl)}" placeholder="https://exemplo.com/imagem.png" />
      </label>
      ${imgUrl ? `<div style="margin:0.5rem 0;grid-column:1/-1"><img src="${escapeAttr(imgUrl)}" style="max-width:200px;max-height:120px;border-radius:0.4rem;border:1px solid #334155" alt="preview" /></div>` : ''}`;
  }

  if (section === 'tech') {
    const usePlaylistItems = String(config.USE_PLAYLIST_ITEMS       || 'true')  === 'true';
    const proxyAnalytics   = String(config.PROXY_ENABLE_ANALYTICS   || 'true')  === 'true';
    return `
      <div style="display:flex;flex-direction:column;gap:0.8rem;margin-bottom:1rem;grid-column:1/-1">
        <div style="display:flex;align-items:center;gap:0.5rem">
          ${toggleSwitch('USE_PLAYLIST_ITEMS', usePlaylistItems)}
          <label style="margin:0">Usar Playlist Items (API mais detalhada — consome mais quota)</label>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem">
          ${toggleSwitch('PROXY_ENABLE_ANALYTICS', proxyAnalytics)}
          <label style="margin:0">Proxy Analytics (logs de acesso)</label>
        </div>
      </div>
      <label>Porta HTTP
        <input name="HTTP_PORT" type="number" min="1" max="65535" value="${config.HTTP_PORT || 8888}" />
      </label>
      <label>Fuso Horário
        ${timezoneSelect(config.LOCAL_TIMEZONE)}
      </label>
      <label>Stale Hours
        <input name="STALE_HOURS" type="number" min="1" max="48" value="${config.STALE_HOURS || 6}" />
      </label>
      <label style="grid-column:1/-1">TubeWranglerr URL <small>(deixe vazio para usar o IP da requisição automaticamente)</small>
        <div style="display:flex;gap:0.4rem">
          <input id="tubewranglerr-url-input" name="TUBEWRANGLERR_URL" value="${escapeAttr(config.TUBEWRANGLERR_URL)}" placeholder="http://localhost:8888" style="flex:1" />
          <button type="button" id="detect-base-url" class="action-btn" title="Detectar URL automaticamente">🔍 Detectar</button>
        </div>
      </label>
      <label>Log Level
        <select name="LOG_LEVEL">
          <option value="DEBUG" ${String(config.LOG_LEVEL||'').toUpperCase()==='DEBUG'?'selected':''}>DEBUG</option>
          <option value="INFO"  ${String(config.LOG_LEVEL||'').toUpperCase()==='INFO' ?'selected':''}>INFO</option>
          <option value="WARN"  ${String(config.LOG_LEVEL||'').toUpperCase()==='WARN' ?'selected':''}>WARN</option>
          <option value="ERROR" ${String(config.LOG_LEVEL||'').toUpperCase()==='ERROR'?'selected':''}>ERROR</option>
        </select>
      </label>`;
  }

  /* section === 'api' */
  return `
    <label>API Key YouTube (separadas por vírgula)
      <input name="YOUTUBE_API_KEY" value="${escapeAttr(config.YOUTUBE_API_KEY)}" />
    </label>`;
}

/* ---------- payload de salvamento por seção ---------- */

function settingsPayloadBySection(section, formData) {
  /* FIX: checkbox desmarcado não aparece no FormData → tratar como 'false' */
  const bool = (key) => formData.get(key) === 'on' ? 'true' : 'false';
  const pick = (key, fallback = '') => String(formData.get(key) ?? fallback).trim();

  if (section === 'scheduler') {
    return {
      ENABLE_SCHEDULER_ACTIVE_HOURS:        bool('ENABLE_SCHEDULER_ACTIVE_HOURS'),
      SCHEDULER_ACTIVE_START_HOUR:          pick('SCHEDULER_ACTIVE_START_HOUR',   '7'),
      SCHEDULER_ACTIVE_END_HOUR:            pick('SCHEDULER_ACTIVE_END_HOUR',     '22'),
      SCHEDULER_MAIN_INTERVAL_HOURS:        pick('SCHEDULER_MAIN_INTERVAL_HOURS', '4'),
      SCHEDULER_PRE_EVENT_WINDOW_HOURS:     pick('SCHEDULER_PRE_EVENT_WINDOW_HOURS', '2'),
      SCHEDULER_PRE_EVENT_INTERVAL_MINUTES: pick('SCHEDULER_PRE_EVENT_INTERVAL_MINUTES', '5'),
      SCHEDULER_POST_EVENT_INTERVAL_MINUTES:pick('SCHEDULER_POST_EVENT_INTERVAL_MINUTES','5'),
      FULL_SYNC_INTERVAL_HOURS:             pick('FULL_SYNC_INTERVAL_HOURS',  '48'),
      RESOLVE_HANDLES_TTL_HOURS:            pick('RESOLVE_HANDLES_TTL_HOURS', '24'),
    };
  }
  if (section === 'content') {
    return {
      PLAYLIST_GENERATE_DIRECT:  bool('PLAYLIST_GENERATE_DIRECT'),
      PLAYLIST_GENERATE_PROXY:   bool('PLAYLIST_GENERATE_PROXY'),
      FILTER_BY_CATEGORY:        bool('FILTER_BY_CATEGORY'),
      EPG_DESCRIPTION_CLEANUP:   bool('EPG_DESCRIPTION_CLEANUP'),
      MAX_SCHEDULE_HOURS:        pick('MAX_SCHEDULE_HOURS',          '72'),
      MAX_UPCOMING_PER_CHANNEL:  pick('MAX_UPCOMING_PER_CHANNEL',   '6'),
      ALLOWED_CATEGORY_IDS:      pick('ALLOWED_CATEGORY_IDS',        ''),
      TITLE_FILTER_EXPRESSIONS:  pick('TITLE_FILTER_EXPRESSIONS',    ''),
      CATEGORY_MAPPINGS:         pick('CATEGORY_MAPPINGS',           ''),
      CHANNEL_NAME_MAPPINGS:     pick('CHANNEL_NAME_MAPPINGS',       ''),
    };
  }
  if (section === 'retention') {
    return {
      KEEP_RECORDED_STREAMS:      bool('KEEP_RECORDED_STREAMS'),
      RECORDED_RETENTION_DAYS:    pick('RECORDED_RETENTION_DAYS',    '2'),
      MAX_RECORDED_PER_CHANNEL:   pick('MAX_RECORDED_PER_CHANNEL',   '2'),
    };
  }
  if (section === 'media') {
    return {
      USE_INVISIBLE_PLACEHOLDER: bool('USE_INVISIBLE_PLACEHOLDER'),
      PLACEHOLDER_IMAGE_URL:     pick('PLACEHOLDER_IMAGE_URL', ''),
    };
  }
  if (section === 'tech') {
    return {
      USE_PLAYLIST_ITEMS:     bool('USE_PLAYLIST_ITEMS'),
      PROXY_ENABLE_ANALYTICS: bool('PROXY_ENABLE_ANALYTICS'),
      HTTP_PORT:              pick('HTTP_PORT',      '8888'),
      LOCAL_TIMEZONE:         pick('LOCAL_TIMEZONE', 'America/Sao_Paulo'),
      STALE_HOURS:            pick('STALE_HOURS',    '6'),
      TUBEWRANGLERR_URL:      pick('TUBEWRANGLERR_URL', ''),
      LOG_LEVEL:              pick('LOG_LEVEL',      'INFO'),
    };
  }
  if (section === 'cache') {
    return {
      PROXY_THUMBNAIL_CACHE_HOURS: pick('PROXY_THUMBNAIL_CACHE_HOURS', '24'),
    };
  }
  /* api */
  return { YOUTUBE_API_KEY: pick('YOUTUBE_API_KEY', '') };
}

/* ---------- API section cards (cookies, UAs, tool profiles) ---------- */

function apiCards(config, cookies, userAgents, toolProfiles) {
  const cookieOptions = cookies.map(
    (c) => `<option value="${c.id}">${escapeHtml(c.name)} (${escapeHtml(c.provider)})</option>`,
  ).join('');
  const uaOptions = userAgents.map(
    (ua) => `<option value="${ua.id}">${escapeHtml(ua.label || ua.value.slice(0, 40))}</option>`,
  ).join('');

  return `
    <!-- API Key inline -->
    <div class="card">
      <h3>API Key YouTube</h3>
      <div style="display:flex;gap:0.5rem">
        <input id="api-key-input" value="${escapeAttr(config.YOUTUBE_API_KEY)}" placeholder="Chave(s) separadas por vírgula" style="flex:1" />
        <button id="api-key-save" class="action-btn">💾 Salvar</button>
      </div>
    </div>

    <!-- Cookies -->
    <div class="card">
      <h3>🍪 Cookies</h3>
      <form id="cookie-upload-form" class="toolbar" style="flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem">
        <input name="name" placeholder="Nome (ex: YouTube Premium)" required />
        <input name="provider" placeholder="Provider (ex: youtube)" />
        <input type="file" name="file" accept=".txt" required />
        <button type="submit" class="action-btn">📤 Upload</button>
      </form>
      <table>
        <thead><tr><th>Nome</th><th>Provider</th><th>Arquivo</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>
          ${cookies.length === 0
            ? '<tr><td colspan="5" style="opacity:0.5;text-align:center">Nenhum cookie cadastrado</td></tr>'
            : cookies.map((c) => `
              <tr>
                <td>${escapeHtml(c.name)}</td>
                <td>${escapeHtml(c.provider)}</td>
                <td style="font-size:0.8rem;opacity:0.7">${escapeHtml(String(c.file_path).split('/').pop() || '-')}</td>
                <td>${c.active === 1 ? '🟢 ativo' : '🔴 inativo'}</td>
                <td>
                  <button data-cookie-toggle="${c.id}" class="action-btn">${c.active === 1 ? 'Inativar' : 'Ativar'}</button>
                  <button data-cookie-del="${c.id}" class="action-btn danger-btn">🗑️</button>
                </td>
              </tr>`).join('')
          }
        </tbody>
      </table>
    </div>

    <!-- User-Agents -->
    <div class="card">
      <h3>🌐 User-Agents</h3>
      <form id="ua-form" class="toolbar" style="flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem">
        <input name="label" placeholder="Nome (opcional)" />
        <input name="userAgent" placeholder="User-Agent string" required style="flex:1;min-width:200px" />
        <button type="submit" class="action-btn">Adicionar</button>
      </form>
      <table>
        <thead><tr><th>Nome</th><th>UA</th><th>Padrão</th><th>Ações</th></tr></thead>
        <tbody>
          ${userAgents.length === 0
            ? '<tr><td colspan="4" style="opacity:0.5;text-align:center">Nenhum UA cadastrado</td></tr>'
            : userAgents.map((ua) => `
              <tr>
                <td>${escapeHtml(ua.label || '-')}</td>
                <td style="word-break:break-all;max-width:260px;font-size:0.8rem">${escapeHtml(ua.value || '-')}</td>
                <td style="text-align:center">${ua.is_default === 1 ? '⭐' : '-'}</td>
                <td>
                  <button data-ua-default="${ua.id}" class="action-btn" ${ua.is_default===1?'disabled':''}>⭐</button>
                  <button data-ua-del="${ua.id}" class="action-btn danger-btn">🗑️</button>
                </td>
              </tr>`).join('')
          }
        </tbody>
      </table>
    </div>

    <!-- Perfis de Ferramenta -->
    <div class="card">
      <h3>⚙️ Perfis de Ferramenta</h3>
      <form id="tool-profile-form" class="toolbar" style="flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem">
        <input name="name" placeholder="Nome do perfil" required />
        <select name="tool" required>
          <option value="streamlink">streamlink</option>
          <option value="yt-dlp">yt-dlp</option>
          <option value="ffmpeg">ffmpeg</option>
        </select>
        <input name="flags" placeholder="Flags extras (ex: --retry-streams 5)" style="flex:1;min-width:180px" />
        <select name="cookie_id">
          <option value="">(sem cookie)</option>
          ${cookieOptions}
        </select>
        <select name="ua_id">
          <option value="">(sem UA)</option>
          ${uaOptions}
        </select>
        <button type="submit" class="action-btn">➕ Adicionar</button>
      </form>
      <table>
        <thead><tr><th>Nome</th><th>Ferramenta</th><th>Flags</th><th>Cookie</th><th>UA</th><th>Ativo</th><th>Ações</th></tr></thead>
        <tbody>
          ${toolProfiles.map((p) => {
            const isDefault = p.is_default === true;
            return `
              <tr ${isDefault ? 'style="opacity:0.65"' : ''}>
                <td>${escapeHtml(p.name)}</td>
                <td><code>${escapeHtml(p.tool)}</code></td>
                <td style="font-size:0.8rem;max-width:160px;word-break:break-all">${escapeHtml(p.flags || '-')}</td>
                <td style="font-size:0.8rem">${escapeHtml(p.cookie_name || '-')}</td>
                <td style="font-size:0.8rem">${escapeHtml(p.ua_label || '-')}</td>
                <td style="text-align:center">${p.is_active === 1 ? '✅' : '-'}</td>
                <td>
                  ${!isDefault && p.is_active !== 1
                    ? `<button data-tool-activate="${p.id}" class="action-btn">✅ Ativar</button>`
                    : ''}
                  ${!isDefault
                    ? `<button data-tool-del="${p.id}" class="action-btn danger-btn">🗑️</button>`
                    : '<span style="opacity:0.4;font-size:0.8rem">padrão</span>'}
                </td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
      <p style="font-size:0.8rem;opacity:0.55;margin-top:0.5rem">
        Perfis virtuais (padrão) são usados quando nenhum perfil real está cadastrado para a ferramenta.
        Eles não podem ser removidos e usam o UA padrão + cookie ativo.
      </p>
    </div>`;
}

/* ---------- Cache cards ---------- */

async function cacheCards(api, config) {
  let stats = { total: 0, expired: 0, sizeMB: '0.00' };
  try {
    stats = await requestJson(api, '/api/thumbnail-cache/stats', undefined, '');
  } catch { /* ignora */ }

  return `
    <div class="card">
      <h3>Configuração de TTL</h3>
      <form id="cache-config-form" class="settings-grid">
        <label>Cache Thumbnail Proxy (h)
          <input name="PROXY_THUMBNAIL_CACHE_HOURS" type="number" min="1" max="168"
            value="${config.PROXY_THUMBNAIL_CACHE_HOURS || 24}" />
        </label>
        <div style="display:flex;align-items:flex-end">
          <button type="submit" class="action-btn">💾 Salvar</button>
        </div>
      </form>
    </div>
    <div class="card">
      <h3>Estatísticas do Cache de Thumbnails</h3>
      <table>
        <tbody>
          <tr><th>Total de thumbnails</th><td id="cache-total">${stats.total}</td></tr>
          <tr><th>Expirados</th><td id="cache-expired">${stats.expired}</td></tr>
          <tr><th>Tamanho em disco</th><td id="cache-size">${stats.sizeMB} MB</td></tr>
        </tbody>
      </table>
      <div class="toolbar" style="margin-top:1rem">
        <button id="cache-refresh" class="action-btn">🔄 Atualizar</button>
        <button id="cache-prune"   class="action-btn">🧹 Limpar Expirados</button>
        <button id="cache-clear"   class="danger-btn">🗑️ Limpar Tudo</button>
      </div>
    </div>`;
}

/* ======================================================================
 *  Main render
 * ====================================================================== */

export async function renderSettings(root, api, hash = '/settings') {
  const rawSection = hash.split('/')[2] || 'api';
  const section = sectionMeta[rawSection] ? rawSection : 'api';
  let notice = { type: '', text: '' };

  async function load() {
    const isApi   = section === 'api';
    const isCache = section === 'cache';
    const hasForm = !isApi && !isCache;

    let config = {};
    let cookies = [];
    let userAgents = [];
    let toolProfiles = [];
    let cacheHTML = '';

    try {
      if (isApi) {
        [config, cookies, userAgents, toolProfiles] = await Promise.all([
          requestJson(api, '/api/config',        undefined, 'Falha ao carregar config.'),
          requestJson(api, '/api/cookies',        undefined, 'Falha ao carregar cookies.'),
          requestJson(api, '/api/credentials',    undefined, 'Falha ao carregar UAs.'),
          requestJson(api, '/api/tool-profiles',  undefined, 'Falha ao carregar perfis.'),
        ]);
      } else if (isCache) {
        config   = await requestJson(api, '/api/config', undefined, 'Falha ao carregar config.');
        cacheHTML = await cacheCards(api, config);
      } else {
        config = await requestJson(api, '/api/config', undefined, 'Falha ao carregar configurações.');
      }
    } catch (err) {
      root.innerHTML = `<div class="card"><p style="color:#fca5a5">${err instanceof Error ? err.message : 'Erro ao carregar.'}</p></div>`;
      return;
    }

    root.innerHTML = `
      <div class="card">
        <h3>${sectionMeta[section].title}</h3>
        <p style="opacity:0.6;font-size:0.85rem">${sectionMeta[section].hint}</p>
        <p id="settings-message" class="form-msg ${notice.type} ${notice.text ? 'show' : ''}">${notice.text || ''}</p>
        ${hasForm ? `
          <form id="settings-form" class="settings-grid">
            ${configFields(section, config)}
            <div style="grid-column:1/-1;margin-top:0.5rem">
              <button type="submit" class="action-btn">💾 Salvar</button>
            </div>
          </form>` : ''}
        ${isApi ? `<div class="settings-grid">${configFields(section, config)}</div>` : ''}
      </div>
      ${isApi   ? apiCards(config, cookies, userAgents, toolProfiles) : ''}
      ${isCache ? cacheHTML : ''}
      ${section === 'tech' ? `
        <div class="card">
          <h3>Ações de Configuração</h3>
          <div class="toolbar">
            <button id="export-config" type="button" class="action-btn">📥 Exportar JSON</button>
            <input  id="import-file" type="file" accept="application/json" />
            <button id="import-config" type="button" class="action-btn">📤 Importar JSON</button>
            <button id="reset-config"  type="button" class="danger-btn">🗑️ Resetar padrão</button>
          </div>
        </div>` : ''}`;

    const messageNode = document.getElementById('settings-message');
    const setNotice = (type, text) => {
      notice = { type, text };
      if (!messageNode) return;
      messageNode.className = `form-msg ${type} ${text ? 'show' : ''}`;
      messageNode.textContent = text;
    };

    /* ---- Generic form submit ---- */
    if (hasForm) {
      document.getElementById('settings-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
          await requestJson(api, '/api/config', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settingsPayloadBySection(section, formData)),
          }, 'Falha ao salvar configurações.');
          setNotice('success', 'Configurações salvas com sucesso.');
          await load();
        } catch (err) {
          setNotice('error', err instanceof Error ? err.message : 'Falha ao salvar.');
        }
      });
    }

    /* ---- Tech section ---- */
    if (section === 'tech') {
      /* Detectar URL */
      document.getElementById('detect-base-url')?.addEventListener('click', async () => {
        try {
          const result = await requestJson(api, '/api/base-url', undefined, 'Falha ao detectar URL.');
          const input = document.getElementById('tubewranglerr-url-input');
          if (input && result?.url) input.value = result.url;
          setNotice('success', `URL detectada: ${result?.url}`);
        } catch (err) {
          setNotice('error', err instanceof Error ? err.message : 'Falha ao detectar URL.');
        }
      });

      document.getElementById('export-config')?.addEventListener('click', async () => {
        try {
          const payload = await requestJson(api, '/api/config/export', { method: 'POST' }, 'Falha ao exportar.');
          const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
          const a = Object.assign(document.createElement('a'), {
            href: URL.createObjectURL(blob), download: 'tubewranglerr-config.json',
          });
          document.body.appendChild(a); a.click(); a.remove();
          URL.revokeObjectURL(a.href);
          setNotice('success', 'Configuração exportada.');
        } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha ao exportar.'); }
      });

      document.getElementById('import-config')?.addEventListener('click', async () => {
        const file = document.getElementById('import-file')?.files?.[0];
        if (!file) { setNotice('error', 'Selecione um arquivo JSON.'); return; }
        try {
          const parsed = JSON.parse(await file.text());
          await requestJson(api, '/api/config/import', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed),
          }, 'Falha ao importar.');
          setNotice('success', 'Configuração importada.'); await load();
        } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha ao importar.'); }
      });

      document.getElementById('reset-config')?.addEventListener('click', async () => {
        if (!confirm('Resetar todas as configurações para o padrão?')) return;
        try {
          await requestJson(api, '/api/config/reset', { method: 'POST' }, 'Falha ao resetar.');
          setNotice('success', 'Configuração resetada.'); await load();
        } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha ao resetar.'); }
      });
    }

    /* ---- Cache section ---- */
    if (isCache) {
      async function refreshCacheStats() {
        const stats = await requestJson(api, '/api/thumbnail-cache/stats', undefined, '').catch(() => null);
        if (!stats) return;
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = String(val); };
        set('cache-total',   stats.total);
        set('cache-expired', stats.expired);
        set('cache-size',   `${stats.sizeMB} MB`);
      }

      document.getElementById('cache-config-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
          await requestJson(api, '/api/config', {
            method: 'PATCH', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settingsPayloadBySection('cache', formData)),
          }, 'Falha ao salvar.');
          setNotice('success', 'TTL de cache salvo.'); await load();
        } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha ao salvar.'); }
      });

      document.getElementById('cache-refresh')?.addEventListener('click', async () => {
        await refreshCacheStats(); setNotice('success', 'Stats atualizadas.');
      });

      document.getElementById('cache-prune')?.addEventListener('click', async () => {
        try {
          const r = await requestJson(api, '/api/thumbnail-cache/prune', { method: 'POST' }, 'Falha.');
          setNotice('success', `${r.removed} item(s) expirado(s) removido(s).`);
          await refreshCacheStats();
        } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha.'); }
      });

      document.getElementById('cache-clear')?.addEventListener('click', async () => {
        if (!confirm('Limpar TODO o cache de thumbnails?')) return;
        try {
          await requestJson(api, '/api/thumbnail-cache/clear', { method: 'POST' }, 'Falha.');
          setNotice('success', 'Cache limpo.'); await refreshCacheStats();
        } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha.'); }
      });
    }

    /* ---- API section ---- */
    if (isApi) {
      /* API Key save */
      document.getElementById('api-key-save')?.addEventListener('click', async () => {
        const val = document.getElementById('api-key-input')?.value.trim() || '';
        try {
          await requestJson(api, '/api/config', {
            method: 'PATCH', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ YOUTUBE_API_KEY: val }),
          }, 'Falha ao salvar API Key.');
          setNotice('success', 'API Key salva.');
        } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha.'); }
      });

      /* Cookie upload */
      document.getElementById('cookie-upload-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const resp = await api('/api/cookies', { method: 'POST', body: fd });
        const body = await resp.json().catch(() => ({}));
        if (!resp.ok) { setNotice('error', textFromError(body, 'Falha no upload.')); return; }
        setNotice('success', 'Cookie adicionado.'); await load();
      });

      /* Cookie toggle */
      root.querySelectorAll('[data-cookie-toggle]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-cookie-toggle');
          try {
            await requestJson(api, `/api/cookies/${id}/toggle`, { method: 'PATCH' }, 'Falha ao alternar.');
            setNotice('success', 'Status do cookie alterado.'); await load();
          } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha.'); }
        });
      });

      /* Cookie delete */
      root.querySelectorAll('[data-cookie-del]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-cookie-del');
          if (!confirm('Remover este cookie?')) return;
          try {
            await requestJson(api, `/api/cookies/${id}`, { method: 'DELETE' }, 'Falha ao remover.');
            setNotice('success', 'Cookie removido.'); await load();
          } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha.'); }
        });
      });

      /* UA add */
      document.getElementById('ua-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        try {
          await requestJson(api, '/api/credentials/ua', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              label:     String(fd.get('label')     || '').trim(),
              userAgent: String(fd.get('userAgent') || '').trim(),
            }),
          }, 'Falha ao adicionar UA.');
          setNotice('success', 'User-Agent adicionado.'); await load();
        } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha.'); }
      });

      /* UA default */
      root.querySelectorAll('[data-ua-default]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-ua-default');
          try {
            await requestJson(api, `/api/credentials/ua/${id}/default`, { method: 'PATCH' }, 'Falha.');
            setNotice('success', 'UA padrão definido.'); await load();
          } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha.'); }
        });
      });

      /* UA delete */
      root.querySelectorAll('[data-ua-del]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-ua-del');
          try {
            await requestJson(api, `/api/credentials/ua/${id}`, { method: 'DELETE' }, 'Falha.');
            setNotice('success', 'UA removido.'); await load();
          } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha.'); }
        });
      });

      /* Tool profile add */
      document.getElementById('tool-profile-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        try {
          await requestJson(api, '/api/tool-profiles', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name:      String(fd.get('name')      || '').trim(),
              tool:      String(fd.get('tool')      || '').trim(),
              flags:     String(fd.get('flags')     || '').trim(),
              cookie_id: Number(fd.get('cookie_id')) || null,
              ua_id:     Number(fd.get('ua_id'))     || null,
            }),
          }, 'Falha ao adicionar perfil.');
          setNotice('success', 'Perfil adicionado.'); await load();
        } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha.'); }
      });

      /* Tool profile activate */
      root.querySelectorAll('[data-tool-activate]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-tool-activate');
          try {
            await requestJson(api, `/api/tool-profiles/${id}/activate`, { method: 'PATCH' }, 'Falha.');
            setNotice('success', 'Perfil ativado.'); await load();
          } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha.'); }
        });
      });

      /* Tool profile delete */
      root.querySelectorAll('[data-tool-del]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-tool-del');
          if (!confirm('Remover este perfil de ferramenta?')) return;
          try {
            await requestJson(api, `/api/tool-profiles/${id}`, { method: 'DELETE' }, 'Falha.');
            setNotice('success', 'Perfil removido.'); await load();
          } catch (err) { setNotice('error', err instanceof Error ? err.message : 'Falha.'); }
        });
      });
    }
  }

  await load();
}
