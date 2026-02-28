# TubeWranglerr

Agregador de streams do YouTube com backend Node.js + TypeScript, geração de playlists IPTV (M3U), EPG XMLTV, Smart Player (proxy live/VOD/placeholder) e painel web.

## Recursos

- SQLite como fonte de verdade para `settings`, `channels`, `credentials` e `auth_users`
- Estado operacional em `data/state_cache.json` e `data/textos_epg.json`
- Auth por sessão com `express-session` + `bcrypt`
- Scheduler com hot reload de configuração via EventEmitter
- Geração de playlists `direct` e `proxy`
- **Formato de Título Customizável** com drag & drop e preview em tempo real
- Cache de thumbnails em disco
- Logs em tempo real via WebSocket em `/ws/logs`

## Quickstart (Docker)

```bash
cp .env.example .env
docker compose up --build -d
```

Validação inicial:

```bash
curl http://localhost:8888/health
# esperado: {"status":"ok","version":"1.0.0"}
```

## Login padrão (primeira execução)

- Usuário: `admin`
- Senha: `tubewranglerr`

Após o primeiro login, altere via `PATCH /api/auth/password`.

## Formato de Título

Configure como os títulos das playlists são montados:

- **Componentes disponíveis**: Status, Nome do Canal, Nome do Evento, Data/Hora
- **Reordenação**: Arraste componentes para mudar a ordem
- **Toggle**: Ative/desative componentes individualmente
- **Marcadores**: Opcional usar colchetes `[ ]`
- **Preview**: Visualize em tempo real como ficará o título

Exemplo de título gerado:
```
[AO VIVO] [CazéTV] [Final da Copa] [15/02 21:00]
```

Acesse em: **Configurações → Formato de Título**

## Endpoints

### Públicos

- `GET /health`
- `GET /live.m3u`
- `GET /live-proxy.m3u`
- `GET /upcoming.m3u`
- `GET /upcoming-proxy.m3u`
- `GET /vod.m3u`
- `GET /vod-proxy.m3u`
- `GET /epg.xml`

### Autenticados (`/api/*`)

- Auth
	- `POST /api/auth/login`
	- `POST /api/auth/logout`
	- `GET /api/auth/me`
	- `PATCH /api/auth/password`
- Canais
	- `GET /api/channels`
	- `POST /api/channels`
	- `DELETE /api/channels/:id`
	- `PATCH /api/channels/:id/freeze`
	- `POST /api/channels/:id/sync`
- Streams
	- `GET /api/streams`
- Config
	- `GET /api/config`
	- `PATCH /api/config`
	- `POST /api/config/export`
	- `POST /api/config/import`
	- `POST /api/config/reset`
- **Formato de Título**
	- `GET /api/title-format` - Obtém configuração atual
	- `POST /api/title-format` - Salva nova configuração
- Scheduler
	- `GET /api/scheduler/status`
	- `POST /api/scheduler/trigger`
	- `POST /api/scheduler/pause`
	- `POST /api/scheduler/resume`
- Smart Player/Credenciais
	- `GET /api/stream/:videoId`
	- `GET /api/thumbnail/:videoId`
	- `GET /api/credentials`
	- `POST /api/credentials/cookie/:platform`
	- `DELETE /api/credentials/cookie/:platform`
	- `PATCH /api/credentials/cookie/:platform/toggle`
	- `POST /api/credentials/ua`
	- `DELETE /api/credentials/ua/:id`
	- `PATCH /api/credentials/ua/:id/default`
	- `POST /api/credentials/test`
- Logs
	- `GET /api/logs`
	- `GET /api/logs/meta`
	- WebSocket `GET /ws/logs`

## Testes de integração

Com o serviço já em execução:

```bash
npm run test:integration
```

Ou apontando para outra URL:

```bash
APP_URL=http://localhost:8888 npm run test:integration
```

## Estrutura de dados persistidos

- Banco: `data/tubewranglerr.db`
- Cache de streams: `data/state_cache.json`
- Textos de countdown: `data/textos_epg.json`
- Cookies: `data/cookies/*.txt`
- **Thumbnails em cache**: `data/thumbnails/*.jpg`

