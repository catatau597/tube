/* ======================================================================
 *  Settings — 9 sub-páginas conforme especificação
 * ====================================================================== */

const sectionMeta = {
  api: {
    title: 'API & Credenciais',
    hint: 'Gerencie as chaves da YouTube API.',
  },
  scheduler: {
    title: 'Agendador',
    hint: 'Ajuste intervalos, janela ativa e sincronização global.',
  },
  content: {
    title: 'Conteúdo & Filtros',
    hint: 'Defina limites, filtros e modos de geração de playlist.',
  },
  titles: {
    title: 'Formato de Títulos',
    hint: 'Monte o título dos eventos nas playlists. Arraste para reordenar.',
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
    hint: 'Gerenciamento de cache de thumbnails e outros recursos.',
  },
  player: {
    title: 'Smart Player',
    hint: 'Gerencie cookies, user-agents e testes de conectividade.',
  },
  tech: {
    title: 'Técnico',
    hint: 'Parâmetros técnicos do servidor e export/import de configurações.',
  },
};

/* ---------- helpers ---------- */

function boolOption(value, current) {
  return String(current).toLowerCase() === value ? 'selected' : '';
}

function textFromError(payload, fallback) {
  if (payload && typeof payload === 'object' && 'error' in payload) {
    return String(payload.error || fallback);
  }
  return fallback;
}

async function requestJson(api, path, options, fallbackError) {
  const response = await api(path, options);
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(textFromError(payload, fallbackError));
  }
  return payload;
}

function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;');
}

/* ---------- IANA timezone dropdown ---------- */

const COMMON_TIMEZONES = [
  'America/Sao_Paulo', 'America/New_York', 'America/Chicago', 'America/Denver',
  'America/Los_Angeles', 'America/Manaus', 'America/Bahia', 'America/Fortaleza',
  'America/Argentina/Buenos_Aires', 'America/Santiago', 'America/Bogota',
  'America/Mexico_City', 'Europe/London', 'Europe/Paris', 'Europe/Berlin',
  'Europe/Lisbon', 'Europe/Madrid', 'Europe/Moscow', 'Asia/Tokyo', 'Asia/Shanghai',
  'Asia/Kolkata', 'Asia/Dubai', 'Australia/Sydney', 'Pacific/Auckland', 'UTC',
];

function timezoneSelect(current) {
  const cur = current || 'America/Sao_Paulo';
  const opts = COMMON_TIMEZONES.map(
    (tz) => `<option value="${tz}" ${tz === cur ? 'selected' : ''}>${tz}</option>`,
  ).join('');
  return `<select name="LOCAL_TIMEZONE">${opts}</select>`;
}

/* ---------- Title format components (drag-and-drop) ---------- */

const TITLE_COMPONENTS = [
  { id: 'STATUS', label: '[STATUS]', example: '[AO VIVO]' },
  { id: 'CANAL', label: '[CANAL]', example: '[CAZÉ TV]' },
  { id: 'EVENTO', label: '[EVENTO]', example: 'Jogo do Brasil' },
  { id: 'DATA_HORA', label: '[DATA/HORA]', example: '[15 Mar às 20:00]' },
];

function buildTitlePreview(order, config) {
  const useStatus = String(config.PREFIX_TITLE_WITH_STATUS || 'true') === 'true';
  const useChannel = String(config.PREFIX_TITLE_WITH_CHANNEL_NAME || 'true') === 'true';
  const useBrackets = String(config.TITLE_USE_BRACKETS || 'true') === 'true';
  const wrap = (txt) => (useBrackets ? `[${txt}]` : txt);

  return order
    .map((id) => {
      const comp = TITLE_COMPONENTS.find((c) => c.id === id);
      if (!comp) return '';
      if (id === 'STATUS' && !useStatus) return '';
      if (id === 'CANAL' && !useChannel) return '';
      if (id === 'EVENTO') return 'Jogo do Brasil';
      if (id === 'DATA_HORA') return wrap('15 Mar às 20:00');
      if (id === 'STATUS') return wrap('AO VIVO');
      if (id === 'CANAL') return wrap('CAZÉ TV');
      return '';
    })
    .filter(Boolean)
    .join(' ');
}

/* ---------- configFields por seção ---------- */

function configFields(section, config) {
  if (section === 'scheduler') {
    const activeHoursEnabled = String(config.ENABLE_SCHEDULER_ACTIVE_HOURS || 'false') === 'true';
    return `
      <label>Intervalo Principal (h)
        <input name="SCHEDULER_MAIN_INTERVAL_HOURS" type="number" min="1" max="24" value="${config.SCHEDULER_MAIN_INTERVAL_HOURS || 4}" />
      </label>
      <label>Ativar Janela de Horário
        <select name="ENABLE_SCHEDULER_ACTIVE_HOURS">
          <option value="true" ${boolOption('true', config.ENABLE_SCHEDULER_ACTIVE_HOURS)}>Sim</option>
          <option value="false" ${boolOption('false', config.ENABLE_SCHEDULER_ACTIVE_HOURS)}>Não</option>
        </select>
      </label>
      ${activeHoursEnabled ? `
      <label>Hora Início
        <input name="SCHEDULER_ACTIVE_START_HOUR" type="number" min="0" max="23" value="${config.SCHEDULER_ACTIVE_START_HOUR || 7}" />
      </label>
      <label>Hora Fim
        <input name="SCHEDULER_ACTIVE_END_HOUR" type="number" min="0" max="23" value="${config.SCHEDULER_ACTIVE_END_HOUR || 22}" />
      </label>` : ''}
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
      </label>
    `;
  }

  if (section === 'content') {
    const categoryEnabled = String(config.FILTER_BY_CATEGORY || 'false') === 'true';
    return `
      <label>Max Agendamento (h)
        <input name="MAX_SCHEDULE_HOURS" type="number" min="24" max="720" value="${config.MAX_SCHEDULE_HOURS || 72}" />
      </label>
      <label>Max Upcoming / Canal
        <input name="MAX_UPCOMING_PER_CHANNEL" type="number" min="1" max="20" value="${config.MAX_UPCOMING_PER_CHANNEL || 6}" />
      </label>
      <label>Gerar Playlist Direct
        <select name="PLAYLIST_GENERATE_DIRECT">
          <option value="true" ${boolOption('true', config.PLAYLIST_GENERATE_DIRECT)}>Sim</option>
          <option value="false" ${boolOption('false', config.PLAYLIST_GENERATE_DIRECT)}>Não</option>
        </select>
      </label>
      <label>Gerar Playlist Proxy
        <select name="PLAYLIST_GENERATE_PROXY">
          <option value="true" ${boolOption('true', config.PLAYLIST_GENERATE_PROXY)}>Sim</option>
          <option value="false" ${boolOption('false', config.PLAYLIST_GENERATE_PROXY)}>Não</option>
        </select>
      </label>
      <label>Filtrar por Categoria
        <select name="FILTER_BY_CATEGORY">
          <option value="true" ${boolOption('true', config.FILTER_BY_CATEGORY)}>Sim</option>
          <option value="false" ${boolOption('false', config.FILTER_BY_CATEGORY)}>Não</option>
        </select>
      </label>
      ${categoryEnabled ? `
      <label>IDs de Categoria Permitidos
        <input name="ALLOWED_CATEGORY_IDS" value="${escapeAttr(config.ALLOWED_CATEGORY_IDS)}" placeholder="17,20,24" />
      </label>` : ''}
      <label>Expressões de Filtro de Título
        <input name="TITLE_FILTER_EXPRESSIONS" value="${escapeAttr(config.TITLE_FILTER_EXPRESSIONS)}" placeholder="shorts,#shorts" />
      </label>
      <label>Mapeamento de Categorias
        <textarea name="CATEGORY_MAPPINGS" rows="3" placeholder="17=ESPORTES,20=JOGOS">${config.CATEGORY_MAPPINGS || ''}</textarea>
      </label>
      <label>Mapeamento de Nomes de Canal
        <textarea name="CHANNEL_NAME_MAPPINGS" rows="3">${config.CHANNEL_NAME_MAPPINGS || ''}</textarea>
      </label>
      <label>Limpeza Descrição EPG
        <select name="EPG_DESCRIPTION_CLEANUP">
          <option value="true" ${boolOption('true', config.EPG_DESCRIPTION_CLEANUP)}>Sim</option>
          <option value="false" ${boolOption('false', config.EPG_DESCRIPTION_CLEANUP)}>Não</option>
        </select>
      </label>
    `;
  }

  if (section === 'titles') {
    const savedOrder = (config.TITLE_COMPONENT_ORDER || 'STATUS,CANAL,EVENTO,DATA_HORA').split(',');
    const preview = buildTitlePreview(savedOrder, config);
    return `
      <label>Prefixo de Status
        <select name="PREFIX_TITLE_WITH_STATUS">
          <option value="true" ${boolOption('true', config.PREFIX_TITLE_WITH_STATUS)}>Sim</option>
          <option value="false" ${boolOption('false', config.PREFIX_TITLE_WITH_STATUS)}>Não</option>
        </select>
      </label>
      <label>Prefixo de Canal
        <select name="PREFIX_TITLE_WITH_CHANNEL_NAME">
          <option value="true" ${boolOption('true', config.PREFIX_TITLE_WITH_CHANNEL_NAME)}>Sim</option>
          <option value="false" ${boolOption('false', config.PREFIX_TITLE_WITH_CHANNEL_NAME)}>Não</option>
        </select>
      </label>
      <label>Usar Colchetes
        <select name="TITLE_USE_BRACKETS">
          <option value="true" ${boolOption('true', config.TITLE_USE_BRACKETS)}>Sim</option>
          <option value="false" ${boolOption('false', config.TITLE_USE_BRACKETS)}>Não</option>
        </select>
      </label>
      <input type="hidden" name="TITLE_COMPONENT_ORDER" id="title-order-input" value="${escapeAttr(savedOrder.join(','))}" />
      <div style="margin:0.8rem 0">
        <strong>Ordem dos componentes</strong> <small>(arraste para reordenar)</small>
        <ul id="title-sortable" class="sortable">
          ${savedOrder.map((id) => {
            const comp = TITLE_COMPONENTS.find((c) => c.id === id);
            return comp ? `<li draggable="true" data-id="${id}">${comp.label}</li>` : '';
          }).join('')}
        </ul>
      </div>
      <div class="card" style="background:#0b1220;margin-top:0.4rem;padding:0.7rem 1rem">
        <strong>Pré-visualização:</strong>
        <p id="title-preview" style="margin:0.3rem 0 0;font-size:1.05rem">${preview}</p>
      </div>
    `;
  }

  if (section === 'retention') {
    return `
      <label>Manter Streams Gravados
        <select name="KEEP_RECORDED_STREAMS">
          <option value="true" ${boolOption('true', config.KEEP_RECORDED_STREAMS)}>Sim</option>
          <option value="false" ${boolOption('false', config.KEEP_RECORDED_STREAMS)}>Não</option>
        </select>
      </label>
      <label>Máx. VODs por Canal
        <input name="MAX_RECORDED_PER_CHANNEL" type="range" min="1" max="10" value="${config.MAX_RECORDED_PER_CHANNEL || 2}" oninput="this.nextElementSibling.textContent=this.value" />
        <span>${config.MAX_RECORDED_PER_CHANNEL || 2}</span>
      </label>
      <label>Retenção VOD (dias)
        <input name="RECORDED_RETENTION_DAYS" type="range" min="1" max="30" value="${config.RECORDED_RETENTION_DAYS || 2}" oninput="this.nextElementSibling.textContent=this.value" />
        <span>${config.RECORDED_RETENTION_DAYS || 2}</span>
      </label>
      <p style="opacity:0.6;font-size:0.85rem;margin-top:0.6rem">
        O sistema <strong>não</strong> busca VODs ativamente. O ciclo é: Upcoming → Live → Recorded.
        Estes controles definem por quanto tempo eventos encerrados são mantidos no cache.
      </p>
    `;
  }

  if (section === 'media') {
    const imgUrl = config.PLACEHOLDER_IMAGE_URL || '';
    return `
      <label>URL da Imagem de Placeholder
        <input name="PLACEHOLDER_IMAGE_URL" value="${escapeAttr(imgUrl)}" placeholder="https://exemplo.com/imagem.png" />
      </label>
      ${imgUrl ? `<div style="margin:0.5rem 0"><img src="${escapeAttr(imgUrl)}" style="max-width:200px;max-height:120px;border-radius:0.4rem;border:1px solid #334155" alt="preview" /></div>` : ''}
      <label>Placeholder Invisível (comentário no M3U)
        <select name="USE_INVISIBLE_PLACEHOLDER">
          <option value="true" ${boolOption('true', config.USE_INVISIBLE_PLACEHOLDER)}>Sim</option>
          <option value="false" ${boolOption('false', config.USE_INVISIBLE_PLACEHOLDER)}>Não</option>
        </select>
      </label>
      <p style="opacity:0.6;font-size:0.85rem;margin-top:0.6rem">
        Quando ativado, a URL do placeholder é inserida como comentário (<code>#http://...</code>),
        ficando invisível para o player IPTV.
      </p>
    `;
  }

  if (section === 'tech') {
    return `
      <label>Porta HTTP
        <input name="HTTP_PORT" type="number" min="1" max="65535" value="${config.HTTP_PORT || 8888}" />
      </label>
      <label>Fuso Horário
        ${timezoneSelect(config.LOCAL_TIMEZONE)}
      </label>
      <label>Stale Hours
        <input name="STALE_HOURS" type="number" min="1" max="48" value="${config.STALE_HOURS || 6}" />
      </label>
      <label>Usar Playlist Items
        <select name="USE_PLAYLIST_ITEMS">
          <option value="true" ${boolOption('true', config.USE_PLAYLIST_ITEMS)}>Sim</option>
          <option value="false" ${boolOption('false', config.USE_PLAYLIST_ITEMS)}>Não</option>
        </select>
      </label>
      <label>Proxy Analytics
        <select name="PROXY_ENABLE_ANALYTICS">
          <option value="true" ${boolOption('true', config.PROXY_ENABLE_ANALYTICS)}>Sim</option>
          <option value="false" ${boolOption('false', config.PROXY_ENABLE_ANALYTICS)}>Não</option>
        </select>
      </label>
      <label>TubeWranglerr URL
        <input name="TUBEWRANGLERR_URL" value="${escapeAttr(config.TUBEWRANGLERR_URL)}" />
      </label>
      <label>Cache Thumbnail Proxy (h)
        <input name="PROXY_THUMBNAIL_CACHE_HOURS" type="number" min="1" max="168" value="${config.PROXY_THUMBNAIL_CACHE_HOURS || 24}" />
      </label>
      <label>Log Level
        <select name="LOG_LEVEL">
          <option value="DEBUG" ${String(config.LOG_LEVEL || '').toUpperCase() === 'DEBUG' ? 'selected' : ''}>DEBUG</option>
          <option value="INFO" ${String(config.LOG_LEVEL || '').toUpperCase() === 'INFO' ? 'selected' : ''}>INFO</option>
          <option value="WARN" ${String(config.LOG_LEVEL || '').toUpperCase() === 'WARN' ? 'selected' : ''}>WARN</option>
          <option value="ERROR" ${String(config.LOG_LEVEL || '').toUpperCase() === 'ERROR' ? 'selected' : ''}>ERROR</option>
        </select>
      </label>
    `;
  }

  /* section === 'api' (default) */
  return `
    <label>API Keys (separadas por vírgula)
      <input name="YOUTUBE_API_KEY" value="${escapeAttr(config.YOUTUBE_API_KEY)}" />
    </label>
  `;
}

/* ---------- payload de salvamento por seção ---------- */

function settingsPayloadBySection(section, formData) {
  const pick = (key, fallback = '') => String(formData.get(key) || fallback).trim();

  if (section === 'scheduler') {
    return {
      SCHEDULER_MAIN_INTERVAL_HOURS: pick('SCHEDULER_MAIN_INTERVAL_HOURS', '4'),
      ENABLE_SCHEDULER_ACTIVE_HOURS: pick('ENABLE_SCHEDULER_ACTIVE_HOURS', 'false'),
      SCHEDULER_ACTIVE_START_HOUR: pick('SCHEDULER_ACTIVE_START_HOUR', '7'),
      SCHEDULER_ACTIVE_END_HOUR: pick('SCHEDULER_ACTIVE_END_HOUR', '22'),
      SCHEDULER_PRE_EVENT_WINDOW_HOURS: pick('SCHEDULER_PRE_EVENT_WINDOW_HOURS', '2'),
      SCHEDULER_PRE_EVENT_INTERVAL_MINUTES: pick('SCHEDULER_PRE_EVENT_INTERVAL_MINUTES', '5'),
      SCHEDULER_POST_EVENT_INTERVAL_MINUTES: pick('SCHEDULER_POST_EVENT_INTERVAL_MINUTES', '5'),
      FULL_SYNC_INTERVAL_HOURS: pick('FULL_SYNC_INTERVAL_HOURS', '48'),
      RESOLVE_HANDLES_TTL_HOURS: pick('RESOLVE_HANDLES_TTL_HOURS', '24'),
    };
  }

  if (section === 'content') {
    return {
      MAX_SCHEDULE_HOURS: pick('MAX_SCHEDULE_HOURS', '72'),
      MAX_UPCOMING_PER_CHANNEL: pick('MAX_UPCOMING_PER_CHANNEL', '6'),
      PLAYLIST_GENERATE_DIRECT: pick('PLAYLIST_GENERATE_DIRECT', 'true'),
      PLAYLIST_GENERATE_PROXY: pick('PLAYLIST_GENERATE_PROXY', 'true'),
      FILTER_BY_CATEGORY: pick('FILTER_BY_CATEGORY', 'false'),
      ALLOWED_CATEGORY_IDS: pick('ALLOWED_CATEGORY_IDS', ''),
      TITLE_FILTER_EXPRESSIONS: pick('TITLE_FILTER_EXPRESSIONS', ''),
      CATEGORY_MAPPINGS: pick('CATEGORY_MAPPINGS', ''),
      CHANNEL_NAME_MAPPINGS: pick('CHANNEL_NAME_MAPPINGS', ''),
      EPG_DESCRIPTION_CLEANUP: pick('EPG_DESCRIPTION_CLEANUP', 'true'),
    };
  }

  if (section === 'titles') {
    return {
      PREFIX_TITLE_WITH_STATUS: pick('PREFIX_TITLE_WITH_STATUS', 'true'),
      PREFIX_TITLE_WITH_CHANNEL_NAME: pick('PREFIX_TITLE_WITH_CHANNEL_NAME', 'true'),
      TITLE_USE_BRACKETS: pick('TITLE_USE_BRACKETS', 'true'),
      TITLE_COMPONENT_ORDER: pick('TITLE_COMPONENT_ORDER', 'STATUS,CANAL,EVENTO,DATA_HORA'),
    };
  }

  if (section === 'retention') {
    return {
      KEEP_RECORDED_STREAMS: pick('KEEP_RECORDED_STREAMS', 'true'),
      MAX_RECORDED_PER_CHANNEL: pick('MAX_RECORDED_PER_CHANNEL', '2'),
      RECORDED_RETENTION_DAYS: pick('RECORDED_RETENTION_DAYS', '2'),
    };
  }

  if (section === 'media') {
    return {
      PLACEHOLDER_IMAGE_URL: pick('PLACEHOLDER_IMAGE_URL', ''),
      USE_INVISIBLE_PLACEHOLDER: pick('USE_INVISIBLE_PLACEHOLDER', 'true'),
    };
  }

  if (section === 'tech') {
    return {
      HTTP_PORT: pick('HTTP_PORT', '8888'),
      LOCAL_TIMEZONE: pick('LOCAL_TIMEZONE', 'America/Sao_Paulo'),
      STALE_HOURS: pick('STALE_HOURS', '6'),
      USE_PLAYLIST_ITEMS: pick('USE_PLAYLIST_ITEMS', 'true'),
      PROXY_ENABLE_ANALYTICS: pick('PROXY_ENABLE_ANALYTICS', 'true'),
      TUBEWRANGLERR_URL: pick('TUBEWRANGLERR_URL', 'http://localhost:8888'),
      PROXY_THUMBNAIL_CACHE_HOURS: pick('PROXY_THUMBNAIL_CACHE_HOURS', '24'),
      LOG_LEVEL: pick('LOG_LEVEL', 'INFO'),
    };
  }

  /* api */
  return { YOUTUBE_API_KEY: pick('YOUTUBE_API_KEY', '') };
}

/* ---------- Smart Player cards ---------- */

function playerCards(credentials) {
  const platforms = ['youtube', 'dailymotion', 'soultv'];
  const cookiesByPlatform = new Map(
    credentials
      .filter((item) => item.type === 'cookie')
      .map((item) => [String(item.platform).toLowerCase(), item]),
  );
  const userAgents = credentials.filter((item) => item.type === 'user-agent');

  return `
    <div class="card">
      <h3>Cookies por Plataforma</h3>
      <table>
        <thead><tr><th>Plataforma</th><th>Arquivo</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>
          ${platforms.map((platform) => {
            const row = cookiesByPlatform.get(platform);
            const fileLabel = row?.label || (row?.value ? String(row.value).split('/').pop() : '(não configurado)');
            const active = row?.active === 1 ? '🟢 ativo' : '🔴 inativo';
            return `
              <tr>
                <td>${platform}</td>
                <td>${fileLabel || '(não configurado)'}</td>
                <td>${active}</td>
                <td>
                  <form class="inline" data-cookie-upload="${platform}">
                    <input type="file" name="file" accept=".txt" required style="max-width:160px" />
                    <button type="submit" class="action-btn">Upload</button>
                  </form>
                  <button data-cookie-toggle="${platform}" class="action-btn" ${row ? '' : 'disabled'}>Ativar/Inativar</button>
                  <button data-cookie-del="${platform}" class="action-btn danger-btn" ${row ? '' : 'disabled'}>Excluir</button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h3>User-Agents</h3>
      <form id="ua-form" class="toolbar">
        <input name="label" placeholder="Nome (opcional)" />
        <input name="userAgent" placeholder="User-Agent" required style="flex:1;min-width:200px" />
        <button type="submit" class="action-btn">Adicionar</button>
      </form>
      <table>
        <thead><tr><th>Nome</th><th>UA</th><th>Padrão</th><th>Ações</th></tr></thead>
        <tbody>
          ${userAgents.map((cred) => `
            <tr>
              <td>${cred.label || '-'}</td>
              <td style="word-break:break-all;max-width:260px">${cred.value || '-'}</td>
              <td>${cred.is_default === 1 ? '⭐' : '-'}</td>
              <td>
                <button data-ua-default="${cred.id}" class="action-btn">⭐ Padrão</button>
                <button data-ua-del="${cred.id}" class="action-btn danger-btn">🗑️ Remover</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h3>Teste de Conectividade</h3>
      <form id="player-test-form" class="toolbar">
        <input name="url" placeholder="URL do vídeo YouTube" required style="flex:1;min-width:200px" />
        <select name="tool">
          <option value="streamlink">streamlink</option>
          <option value="ytdlp">yt-dlp</option>
        </select>
        <select name="platform">
          <option value="youtube">youtube</option>
          <option value="dailymotion">dailymotion</option>
          <option value="soultv">soultv</option>
        </select>
        <button type="submit" class="action-btn">Testar</button>
      </form>
      <pre id="player-test-output" class="log-box" style="height:200px"></pre>
    </div>
  `;
}

/* ---------- Cache cards ---------- */

async function cacheCards(api) {
  let stats = { total: 0, expired: 0, sizeMB: '0.00' };
  try {
    stats = await requestJson(api, '/api/thumbnail-cache/stats', undefined, 'Falha ao carregar stats.');
  } catch {
    /* Ignora erro (cache pode não estar disponível) */
  }

  return `
    <div class="card">
      <h3>Estatísticas do Cache de Thumbnails</h3>
      <table>
        <tbody>
          <tr><th>Total de thumbnails</th><td id="cache-total">${stats.total}</td></tr>
          <tr><th>Thumbnails expirados</th><td id="cache-expired">${stats.expired}</td></tr>
          <tr><th>Tamanho em disco</th><td id="cache-size">${stats.sizeMB} MB</td></tr>
        </tbody>
      </table>
      <div class="toolbar" style="margin-top:1rem">
        <button id="cache-refresh" class="action-btn">🔄 Atualizar</button>
        <button id="cache-prune" class="action-btn">🧹 Limpar Expirados</button>
        <button id="cache-clear" class="danger-btn">🗑️ Limpar Tudo</button>
      </div>
    </div>
  `;
}

/* ---------- Drag-and-drop para componentes de título ---------- */

function setupTitleDragDrop(config, setNotice) {
  const list = document.getElementById('title-sortable');
  const input = document.getElementById('title-order-input');
  const preview = document.getElementById('title-preview');
  if (!list || !input || !preview) return;

  let dragItem = null;

  list.querySelectorAll('li').forEach((li) => {
    li.addEventListener('dragstart', () => { dragItem = li; li.style.opacity = '0.4'; });
    li.addEventListener('dragend', () => { dragItem = null; li.style.opacity = '1'; });
    li.addEventListener('dragover', (e) => { e.preventDefault(); });
    li.addEventListener('drop', (e) => {
      e.preventDefault();
      if (dragItem && dragItem !== li) {
        const items = [...list.querySelectorAll('li')];
        const from = items.indexOf(dragItem);
        const to = items.indexOf(li);
        if (from < to) { li.after(dragItem); } else { li.before(dragItem); }
      }
      updateOrder();
    });
  });

  function updateOrder() {
    const order = [...list.querySelectorAll('li')].map((li) => li.dataset.id);
    input.value = order.join(',');
    preview.textContent = buildTitlePreview(order, config);
  }

  /* Re-preview quando toggles mudam */
  const form = document.getElementById('settings-form');
  if (form) {
    form.querySelectorAll('select').forEach((sel) => {
      sel.addEventListener('change', () => {
        config[sel.name] = sel.value;
        updateOrder();
      });
    });
  }
}

/* ======================================================================
 *  Main render
 * ====================================================================== */

export async function renderSettings(root, api, hash = '/settings') {
  const rawSection = hash.split('/')[2] || 'api';
  const section = sectionMeta[rawSection] ? rawSection : 'api';
  let notice = { type: '', text: '' };

  async function load() {
    const hasPlayerSection = section === 'player';
    const hasCacheSection = section === 'cache';
    const hasForm = !hasPlayerSection && !hasCacheSection;

    let config = {};
    let credentials = [];
    let cacheHTML = '';

    if (hasPlayerSection) {
      [config, credentials] = await Promise.all([
        requestJson(api, '/api/config', undefined, 'Falha ao carregar configurações.'),
        requestJson(api, '/api/credentials', undefined, 'Falha ao carregar credenciais.'),
      ]);
    } else if (hasCacheSection) {
      cacheHTML = await cacheCards(api);
    } else {
      config = await requestJson(api, '/api/config', undefined, 'Falha ao carregar configurações.');
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
            <button type="submit" class="action-btn" style="min-width:140px">💾 Salvar</button>
          </div>
        </form>` : ''}
      </div>
      ${section === 'player' ? playerCards(credentials) : ''}
      ${section === 'cache' ? cacheHTML : ''}
      ${section === 'tech' ? `
      <div class="card">
        <h3>Ações de Configuração</h3>
        <div class="toolbar">
          <button id="export-config" type="button" class="action-btn">📥 Exportar JSON</button>
          <input id="import-file" type="file" accept="application/json" />
          <button id="import-config" type="button" class="action-btn">📤 Importar JSON</button>
          <button id="reset-config" type="button" class="danger-btn">🗑️ Resetar padrão</button>
        </div>
      </div>` : ''}
    `;

    const messageNode = document.getElementById('settings-message');
    const setNotice = (type, text) => {
      notice = { type, text };
      messageNode.className = `form-msg ${type} ${text ? 'show' : ''}`;
      messageNode.textContent = text;
    };

    /* Form submit genérico */
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
        } catch (error) {
          setNotice('error', error instanceof Error ? error.message : 'Falha ao salvar configurações.');
        }
      });
    }

    /* Drag-and-drop para títulos */
    if (section === 'titles') {
      setupTitleDragDrop(config, setNotice);
    }

    /* Cache: refresh, prune, clear */
    if (section === 'cache') {
      async function refreshCacheStats() {
        try {
          const stats = await requestJson(api, '/api/thumbnail-cache/stats', undefined, 'Falha ao carregar stats.');
          document.getElementById('cache-total').textContent = String(stats.total);
          document.getElementById('cache-expired').textContent = String(stats.expired);
          document.getElementById('cache-size').textContent = `${stats.sizeMB} MB`;
        } catch (error) {
          setNotice('error', error instanceof Error ? error.message : 'Falha ao carregar stats.');
        }
      }

      document.getElementById('cache-refresh').addEventListener('click', async () => {
        await refreshCacheStats();
        setNotice('success', 'Stats atualizadas.');
      });

      document.getElementById('cache-prune').addEventListener('click', async () => {
        try {
          const result = await requestJson(api, '/api/thumbnail-cache/prune', { method: 'POST' }, 'Falha ao limpar expirados.');
          setNotice('success', `${result.removed} thumbnail(s) expirado(s) removido(s).`);
          await refreshCacheStats();
        } catch (error) {
          setNotice('error', error instanceof Error ? error.message : 'Falha ao limpar expirados.');
        }
      });

      document.getElementById('cache-clear').addEventListener('click', async () => {
        if (!confirm('Limpar TODO o cache de thumbnails?')) return;
        try {
          await requestJson(api, '/api/thumbnail-cache/clear', { method: 'POST' }, 'Falha ao limpar cache.');
          setNotice('success', 'Cache limpo com sucesso.');
          await refreshCacheStats();
        } catch (error) {
          setNotice('error', error instanceof Error ? error.message : 'Falha ao limpar cache.');
        }
      });
    }

    /* Player: cookies, UAs, teste */
    if (section === 'player') {
      root.querySelectorAll('[data-cookie-upload]').forEach((form) => {
        form.addEventListener('submit', async (event) => {
          event.preventDefault();
          const platform = form.getAttribute('data-cookie-upload');
          const payload = new FormData(form);
          const response = await api(`/api/credentials/cookie/${platform}`, { method: 'POST', body: payload });
          if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            setNotice('error', textFromError(body, 'Falha no upload de cookie.'));
            return;
          }
          setNotice('success', `Cookie atualizado para ${platform}.`);
          await load();
        });
      });

      root.querySelectorAll('[data-cookie-toggle]').forEach((button) => {
        button.addEventListener('click', async () => {
          const platform = button.getAttribute('data-cookie-toggle');
          try {
            await requestJson(api, `/api/credentials/cookie/${platform}/toggle`, { method: 'PATCH' }, 'Falha ao alterar status do cookie.');
            setNotice('success', `Status de cookie alterado para ${platform}.`);
            await load();
          } catch (error) {
            setNotice('error', error instanceof Error ? error.message : 'Falha ao alterar status do cookie.');
          }
        });
      });

      root.querySelectorAll('[data-cookie-del]').forEach((button) => {
        button.addEventListener('click', async () => {
          const platform = button.getAttribute('data-cookie-del');
          if (!confirm(`Remover cookie de ${platform}?`)) return;
          try {
            await requestJson(api, `/api/credentials/cookie/${platform}`, { method: 'DELETE' }, 'Falha ao remover cookie.');
            setNotice('success', `Cookie removido para ${platform}.`);
            await load();
          } catch (error) {
            setNotice('error', error instanceof Error ? error.message : 'Falha ao remover cookie.');
          }
        });
      });

      document.getElementById('ua-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
          await requestJson(api, '/api/credentials/ua', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              label: String(formData.get('label') || '').trim(),
              userAgent: String(formData.get('userAgent') || '').trim(),
              platform: 'youtube',
            }),
          }, 'Falha ao adicionar user-agent.');
          setNotice('success', 'User-Agent adicionado.');
          await load();
        } catch (error) {
          setNotice('error', error instanceof Error ? error.message : 'Falha ao adicionar user-agent.');
        }
      });

      root.querySelectorAll('[data-ua-del]').forEach((button) => {
        button.addEventListener('click', async () => {
          const id = button.getAttribute('data-ua-del');
          try {
            await requestJson(api, `/api/credentials/ua/${id}`, { method: 'DELETE' }, 'Falha ao remover user-agent.');
            setNotice('success', 'User-Agent removido.');
            await load();
          } catch (error) {
            setNotice('error', error instanceof Error ? error.message : 'Falha ao remover user-agent.');
          }
        });
      });

      root.querySelectorAll('[data-ua-default]').forEach((button) => {
        button.addEventListener('click', async () => {
          const id = button.getAttribute('data-ua-default');
          try {
            await requestJson(api, `/api/credentials/ua/${id}/default`, { method: 'PATCH' }, 'Falha ao definir user-agent padrão.');
            setNotice('success', 'User-Agent padrão atualizado.');
            await load();
          } catch (error) {
            setNotice('error', error instanceof Error ? error.message : 'Falha ao definir user-agent padrão.');
          }
        });
      });

      document.getElementById('player-test-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const output = document.getElementById('player-test-output');
        output.textContent = 'Executando teste...';
        try {
          const result = await requestJson(api, '/api/credentials/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url: String(formData.get('url') || '').trim(),
              tool: String(formData.get('tool') || '').trim(),
              platform: String(formData.get('platform') || '').trim(),
            }),
          }, 'Falha no teste de conectividade.');
          output.textContent = `${result.success ? '✅ Sucesso' : '❌ Falha'}\n\n${result.output || ''}`;
        } catch (error) {
          output.textContent = error instanceof Error ? error.message : 'Falha no teste de conectividade.';
        }
      });
    }

    /* Técnico: export / import / reset */
    if (section === 'tech') {
      document.getElementById('export-config').addEventListener('click', async () => {
        try {
          const payload = await requestJson(api, '/api/config/export', { method: 'POST' }, 'Falha ao exportar configuração.');
          const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
          const href = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = href;
          anchor.download = 'tubewranglerr-config.json';
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          URL.revokeObjectURL(href);
          setNotice('success', 'Configuração exportada.');
        } catch (error) {
          setNotice('error', error instanceof Error ? error.message : 'Falha ao exportar configuração.');
        }
      });

      document.getElementById('import-config').addEventListener('click', async () => {
        const fileInput = document.getElementById('import-file');
        const file = fileInput.files?.[0];
        if (!file) { setNotice('error', 'Selecione um arquivo JSON para importar.'); return; }
        try {
          const text = await file.text();
          const parsed = JSON.parse(text);
          await requestJson(api, '/api/config/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsed),
          }, 'Falha ao importar configuração.');
          setNotice('success', 'Configuração importada.');
          await load();
        } catch (error) {
          setNotice('error', error instanceof Error ? error.message : 'Falha ao importar configuração.');
        }
      });

      document.getElementById('reset-config').addEventListener('click', async () => {
        if (!confirm('Resetar todas as configurações para os valores padrão?')) return;
        try {
          await requestJson(api, '/api/config/reset', { method: 'POST' }, 'Falha ao resetar configuração.');
          setNotice('success', 'Configuração resetada para o padrão.');
          await load();
        } catch (error) {
          setNotice('error', error instanceof Error ? error.message : 'Falha ao resetar configuração.');
        }
      });
    }
  }

  await load();
}
