# TubeWranglerr — Documento de Implantação

> **Audiência:** Este documento é escrito para um **Agente de IA** (GitHub Copilot no modo autônomo) executar, validar e avançar cada fase automaticamente, sem intervenção humana entre etapas.  
> **Repositório:** Privado durante desenvolvimento → Público após estabilização.  
> **Workspace:** GitHub Codespaces (container Ubuntu).

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Decisões Arquiteturais](#2-decisões-arquiteturais)
   - [Decisões Técnicas Obrigatórias](#decisões-técnicas-obrigatórias) ← auth, hot reload, state sync, WebSocket
3. [Estrutura de Pastas](#3-estrutura-de-pastas)
4. [Variáveis de Configuração](#4-variáveis-de-configuração)
5. [Mapa da Interface Web (UI Map)](#5-mapa-da-interface-web-ui-map)
6. [Lógica de Negócio](#6-lógica-de-negócio)
7. [Smart Player — Roteamento Inteligente](#7-smart-player--roteamento-inteligente)
8. [Formato de Saída — M3U e EPG](#8-formato-de-saída--m3u-e-epg)
9. [Containerização](#9-containerização)
10. [Fluxo de Funcionamento Completo](#10-fluxo-de-funcionamento-completo)
11. [Plano de Implantação por Fases](#11-plano-de-implantação-por-fases)
12. [Padrões de Qualidade](#12-padrões-de-qualidade)

---

## 1. Visão Geral

### Objetivo

**TubeWranglerr** é um agregador de streams do YouTube que monitora canais, captura transmissões ao vivo e programações agendadas, e gera playlists M3U + guias de programação EPG (XMLTV) prontos para uso em players IPTV como Kodi, VLC e Jellyfin.

### Entradas

- Lista de canais do YouTube por `@handle` ou `Channel ID`

### Saídas

- `Playlists M3U` — nos modos **direct** (URL YouTube) e/ou **proxy** (via Smart Player)
- `EPG XML` — guia de programação no formato XMLTV
- `API REST` — endpoints para integração e gerenciamento
- `Interface Web` — gerenciamento completo via browser
- `Smart Player` — proxy inteligente que roteia live/VOD/placeholder automaticamente

### Scripts de Referência (Legado Python)

Os dois scripts abaixo residem em `DOC/` no workspace e servem como **referência de lógica** para portagem em Node.js. Não serão usados diretamente em produção.

| Arquivo | Papel |
|---|---|
| `DOC/get_streams.py` | Orquestrador: busca YouTube API, agenda, gera M3U/EPG, serve HTTP |
| `DOC/smart_player.py` | Roteador: detecta status do stream e despacha para ffmpeg/streamlink/yt-dlp |
| `DOC/.env` | Seed de configuração inicial |

---

## 2. Decisões Arquiteturais

> ⚠️ **Estas decisões são fixas e não devem ser questionadas pelo Agente durante a implementação.**

| Decisão | Escolha | Justificativa |
|---|---|---|
| **Linguagem do backend** | Node.js (TypeScript) | Integração nativa com WebSocket, node-cron, npm; ecosistema natural para API + UI |
| **Framework API** | Express.js | Maduro, simples, amplamente suportado pelo Copilot |
| **Banco de dados** | SQLite (via `better-sqlite3`) | Zero configuração, portável, ideal para container single-node |
| **Frontend** | HTML + Vanilla JS + CSS | Sem build step; carregado diretamente pelo Express como arquivos estáticos |
| **Scheduler** | `node-cron` | Substitui o loop `asyncio` do Python |
| **Logs em tempo real** | WebSocket (`ws`) | Substitui tail de arquivo; stream direto para UI |
| **Fonte de verdade** | Banco de dados SQLite | O `.env` é lido **apenas uma vez** na primeira inicialização (seed). Após isso, todas as configurações vivem no banco. |
| **Repositório** | Privado → Público | Branch `main` = estável; Branch `dev` = desenvolvimento ativo |

### Ferramentas Externas (chamadas via `child_process.spawn`)

Estas ferramentas devem estar disponíveis no container e **não são reimplementadas** em Node.js:

- `ffmpeg` — geração de placeholder MPEG-TS e overlay de texto
- `streamlink` — captura de streams ao vivo
- `yt-dlp` — download de VODs e fallback de lives

---

### Decisões Técnicas Obrigatórias

> ⚠️ **O Agente não deve inventar soluções para os tópicos abaixo. As decisões já estão tomadas aqui.**

---

#### Autenticação da UI

**Decisão:** Usuário e senha configurados via UI, protegidos por sessão HTTP.

**Implementação:**

- Dependência adicional: `express-session` (versão `1.18.0`) + `bcrypt` (versão `5.1.1`) + `@types/bcrypt` (versão `5.0.2`) — adicionar ao `package.json` na Fase 2
- Tabela `auth_users` no banco (ver schema na Fase 2)
- Na primeira inicialização com banco vazio: criar usuário padrão `admin` com senha `tubewranglerr` e forçar troca de senha no primeiro login
- Todas as rotas da API (`/api/*`) e páginas da UI retornam `401` se não autenticado, exceto `POST /api/auth/login` e `GET /health`
- As rotas de playlist (`/live.m3u`, `/epg.xml`, etc.) são **públicas** — players IPTV não suportam autenticação

**Fluxo de sessão:**

```
POST /api/auth/login   { username, password } → Set-Cookie: session
POST /api/auth/logout                         → destroi sessão
GET  /api/auth/me                             → retorna usuário logado
PATCH /api/auth/password { current, new }     → altera senha
```

**Página de login (`/login`):**
- Formulário simples: campo usuário + campo senha + botão Entrar
- Se banco vazio (primeiro acesso): redireciona para `/setup` onde o usuário define as credenciais iniciais
- Após login: redireciona para `/` (dashboard)
- Sessão expira em 24h de inatividade

---

#### Mecanismo de Hot Reload de Configurações

**Decisão:** Event Emitter centralizado. Sem polling. Sem restart.

**Implementação:**

```
ConfigManager (salva no banco)
    │
    └─ emite evento: configChanged(key, newValue)
         │
         ├─ Scheduler ouve → reconfigura intervalos do node-cron em tempo real
         ├─ Logger ouve → ajusta nível de log (winston.level = newValue)
         ├─ YouTubeApi ouve → atualiza lista de API keys e ponteiro Round-Robin
         └─ SmartPlayer ouve → atualiza UA padrão e caminho de cookie ativo
```

**Código de referência para o EventEmitter:**

```typescript
// src/core/config-manager.ts
import { EventEmitter } from 'events';
export const configEvents = new EventEmitter();

export function setConfig(key: string, value: string): void {
  db.prepare('UPDATE settings SET value = ?, updated_at = datetime("now") WHERE key = ?')
    .run(value, key);
  configEvents.emit('configChanged', key, value);
}
```

**Cada módulo que consome configurações** deve registrar um listener no próprio arquivo, por exemplo:

```typescript
// src/core/scheduler.ts
import { configEvents } from './config-manager';
configEvents.on('configChanged', (key, value) => {
  if (key === 'SCHEDULER_MAIN_INTERVAL_HOURS') restartMainJob(Number(value));
});
```

---

#### Sincronização entre SQLite e `state_cache.json`

**Decisão:** SQLite é a fonte de verdade para canais e configurações. `state_cache.json` é a fonte de verdade para o estado dos streams (status live/upcoming/vod, timestamps). Os dois nunca se contradizem porque têm domínios diferentes.

**Regra clara de responsabilidade:**

| Dado | Fonte de verdade | Armazenado em |
|---|---|---|
| Lista de canais | SQLite — tabela `channels` | banco |
| Configurações | SQLite — tabela `settings` | banco |
| Credenciais | SQLite — tabela `credentials` | banco |
| Usuários | SQLite — tabela `auth_users` | banco |
| Status dos streams | `state_cache.json` em memória | arquivo JSON + memória |
| Textos de countdown | `textos_epg.json` | arquivo JSON |

**Fluxo de sincronização:**

```
StateManager (em memória)
    │
    ├─ Na inicialização: lê state_cache.json → popula memória
    ├─ A cada ciclo do Scheduler: atualiza memória → persiste em state_cache.json
    └─ O Smart Player lê state_cache.json diretamente do disco
         (não passa pelo StateManager em memória para evitar acoplamento)
```

**A tabela `streams` no SQLite** é um espelho de leitura atualizado pelo Scheduler após cada ciclo — usada apenas pela API REST para listagem/filtros na UI. O Smart Player **nunca** consulta o SQLite; sempre lê o `state_cache.json`.

---

#### Integração WebSocket com Express

**Decisão:** Um único servidor HTTP compartilhado entre Express e `ws`. Sem porta adicional.

**Implementação obrigatória em `src/server.ts`:**

```typescript
import http from 'http';
import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();
const server = http.createServer(app);          // servidor HTTP nativo
const wss = new WebSocketServer({ server });    // ws compartilha o mesmo servidor

// Rota WebSocket: /ws/logs
wss.on('connection', (socket, request) => {
  if (request.url === '/ws/logs') {
    loggerTransport.addClient(socket);          // registra cliente para broadcast
    socket.on('close', () => loggerTransport.removeClient(socket));
  } else {
    socket.close(1008, 'Unknown path');
  }
});

server.listen(HTTP_PORT);                       // iniciar server, NÃO app.listen()
```

> ⚠️ Usar `server.listen()` e não `app.listen()`. Se usar `app.listen()`, o WebSocket não consegue fazer o upgrade da conexão e a página de Logs nunca receberá dados.

---

## 3. Estrutura de Pastas

```
tubewranglerr/
├── src/
│   ├── api/
│   │   └── routes/
│   │       ├── channels.ts       # CRUD de canais
│   │       ├── streams.ts        # Listagem/filtro de streams
│   │       ├── playlists.ts      # Endpoints M3U e EPG
│   │       ├── config.ts         # Leitura/escrita de configurações
│   │       ├── scheduler.ts      # Trigger manual, pause/resume
│   │       ├── credentials.ts    # Cookies, user-agents, teste de conectividade
│   │       └── logs.ts           # WebSocket de logs
│   ├── core/
│   │   ├── db.ts                 # Inicialização SQLite, migrations
│   │   ├── config-manager.ts     # Leitura/escrita configs no banco
│   │   ├── state-manager.ts      # Estado dos streams/canais em memória
│   │   ├── youtube-api.ts        # Wrapper YouTube Data API v3 + ApiKeyRotator
│   │   ├── playlist-generator.ts # Geração M3U + EPG
│   │   ├── scheduler.ts          # Agendador inteligente (node-cron)
│   │   └── logger.ts             # Logger unificado (winston) + WS broadcast
│   ├── player/
│   │   ├── smart-player.ts       # Roteador principal
│   │   ├── credentials-manager.ts# Resolve cookie file e UA por plataforma
│   │   ├── ffmpeg-runner.ts      # Placeholder e overlay FFmpeg (baixo CPU)
│   │   ├── streamlink-runner.ts  # Captura de lives (com cookies + UA)
│   │   └── ytdlp-runner.ts       # Download de VODs (com cookies + UA)
│   └── server.ts                 # Ponto de entrada Express
├── public/
│   ├── index.html                # SPA principal (layout + navegação)
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js                # Roteamento SPA client-side
│       ├── dashboard.js
│       ├── channels.js
│       ├── streams.js
│       ├── playlists.js
│       └── settings.js
├── data/                         # Persistência (montado como volume Docker)
│   ├── tubewranglerr.db          # SQLite — fonte de verdade
│   ├── cookies/                  # Arquivos de cookie por plataforma
│   │   ├── youtube.txt           # Cookie Netscape do YouTube (se configurado)
│   │   ├── dailymotion.txt       # Cookie Netscape do Dailymotion (se configurado)
│   │   └── soultv.txt            # Cookie Netscape do SoulTV (se configurado)
│   ├── state_cache.json          # Cache de estado dos streams (gerado em runtime)
│   └── textos_epg.json           # Textos de countdown para placeholders
├── DOC/                          # Scripts legado (referência, não executados)
│   ├── get_streams.py
│   ├── smart_player.py
│   └── .env
├── Dockerfile
├── docker-compose.yml
├── .env.example                  # Template de variáveis (sem valores reais)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Regras de Organização (mandatórias para o Agente)

- **Código limpo:** remover imports, funções e arquivos não utilizados a cada fase concluída.
- **Formatado:** usar Prettier com configuração padrão (`prettier --write .`) antes de cada commit.
- **Comentado:** funções públicas devem ter JSDoc; lógica não-óbvia deve ter comentário inline.
- **Um arquivo, uma responsabilidade:** não criar "god files" com múltiplas classes não relacionadas.

---

## 4. Variáveis de Configuração

### Comportamento Global

- O arquivo `.env` é lido **apenas na primeira inicialização** para popular o banco (`settings` table). Se o banco já existir com dados, o `.env` é ignorado.
- Toda alteração via UI é salva no banco imediatamente (auto-save ou após pressionar Enter).
- Mudanças de configuração são aplicadas em **hot reload** — sem reiniciar o container.
- As variáveis `TARGET_CHANNEL_HANDLES` e `TARGET_CHANNEL_IDS` do `.env` servem como seed de canais iniciais e **não aparecem** na página de Configurações (canais são gerenciados pela página `/channels`).
- **Log unificado:** as variáveis `SMART_PLAYER_LOG_LEVEL` e `SMART_PLAYER_LOG_TO_FILE` são **eliminadas**. Existe apenas `LOG_LEVEL`, que controla todo o sistema.

> ⚠️ **Todas as variáveis listadas nas Categorias 1–8 têm papel ativo na lógica da aplicação.** Nenhuma é decorativa ou apenas herdada do `.env` por compatibilidade. O Agente deve implementar o comportamento descrito para cada uma delas — não apenas armazená-las no banco.

---

### Categoria 1 — API & Credenciais

*UI: Configurações → API & Credenciais*

| Variável | Tipo | Padrão | O que faz | Componente UI |
|---|---|---|---|---|
| `YOUTUBE_API_KEY` | String (lista) | *(obrigatório)* | Chave(s) YouTube Data API v3. Aceita múltiplas (Round-Robin automático) | Tag Input + botão "Testar" por chave + botão excluir |

> **Nota Round-Robin:** Se múltiplas chaves forem fornecidas, o sistema distribui as chamadas API entre elas em rodízio para otimizar a quota diária.

**Também nesta página — Cookies & User-Agent:**

**Arquivos de Cookies** — necessários para acessar streams com restrições de login/região:

| Ação | Comportamento |
|---|---|
| **Upload** | Seleciona arquivo `.txt` (formato Netscape) e associa a uma plataforma |
| **Excluir** | Remove o arquivo do volume `/data/cookies/` e desvíncula da plataforma |
| **Ativo / Inativo** | Toggle por plataforma — desativa o uso do cookie sem excluir o arquivo |

Plataformas suportadas: `YouTube`, `Dailymotion`, `SoulTV` (lista extensível).  
Armazenamento: `/data/cookies/<plataforma>.txt` (volume persistente do Docker).

**User-Agent Strings** — lista editável (Tag Input) com os UAs disponíveis para rotação:

| Ação | Comportamento |
|---|---|
| **Adicionar** | Digita a string + Enter — aparece como tag destacada |
| **Excluir** | Clica no `×` da tag para remover da lista |
| **Ativo** | O UA marcado como padrão é usado nas chamadas; os demais ficam disponíveis para rotação manual |

> Os UAs configurados aqui são repassados como `--http-header "User-Agent=..."` para o Streamlink e `--user-agent "..."` para o yt-dlp. Ver Seção 7 (Smart Player) para detalhes de como cookies e UAs são injetados nos runners.

---

### Categoria 2 — Agendador Inteligente

*UI: Configurações → Agendador*

| Variável | Tipo | Padrão | O que faz | Componente UI |
|---|---|---|---|---|
| `SCHEDULER_MAIN_INTERVAL_HOURS` | Int | 4 | Busca completa a cada N horas | Slider 1–24h |
| `ENABLE_SCHEDULER_ACTIVE_HOURS` | Bool | false | Restringe busca a um horário específico | Toggle on/off |
| `SCHEDULER_ACTIVE_START_HOUR` | Int | 7 | Hora início período ativo (formato 24h) | Time picker *(visível só se toggle acima = true)* |
| `SCHEDULER_ACTIVE_END_HOUR` | Int | 22 | Hora fim período ativo (formato 24h) | Time picker *(visível só se toggle acima = true)* |
| `SCHEDULER_PRE_EVENT_WINDOW_HOURS` | Int | 2 | Horas antes do evento para verificação intensiva | Slider 0–12h |
| `SCHEDULER_PRE_EVENT_INTERVAL_MINUTES` | Int | 5 | Intervalo de verificação no período pré-evento | Slider 1–60min |
| `SCHEDULER_POST_EVENT_INTERVAL_MINUTES` | Int | 5 | Intervalo de verificação durante live ativa | Slider 1–60min |
| `FULL_SYNC_INTERVAL_HOURS` | Int | 48 | Ciclo de sincronização completa periódica | Slider 12–168h |
| `RESOLVE_HANDLES_TTL_HOURS` | Int | 24 | TTL do cache de resolução de @handles | Slider 1–168h |
| `INITIAL_SYNC_DAYS` | Int | 2 | Dias retroativos na primeira busca (0 = tudo) | Slider 0–30 dias |

**Edição condicional (UI dinâmica):**

```
IF ENABLE_SCHEDULER_ACTIVE_HOURS === true THEN
  ├─ Mostrar: SCHEDULER_ACTIVE_START_HOUR (Time picker)
  └─ Mostrar: SCHEDULER_ACTIVE_END_HOUR   (Time picker)
```

---

### Categoria 3 — Conteúdo & Filtros

*UI: Configurações → Conteúdo & Filtros*

| Variável | Tipo | Padrão | O que faz | Componente UI |
|---|---|---|---|---|
| `MAX_SCHEDULE_HOURS` | Int | 72 | Limite máximo de horas no futuro para exibir agendamentos | Slider 24–720h |
| `MAX_UPCOMING_PER_CHANNEL` | Int | 6 | Máximo de streams "upcoming" por canal | Slider 1–20 |
| `TITLE_FILTER_EXPRESSIONS` | List | *"ao vivo,..."* | Palavras/expressões removidas dos títulos | Tag Input (add/remove) |
| `FILTER_BY_CATEGORY` | Bool | false | Filtrar streams por categoria YouTube | Toggle on/off |
| `ALLOWED_CATEGORY_IDS` | List | "17" | IDs de categorias permitidas (17=Esportes, 25=Notícias) | Multi-select *(visível só se toggle acima = true)* |
| `CATEGORY_MAPPINGS` | Dict | *"Sports\|ESPORTES,..."* | Mapeia ID de categoria → nome amigável | Tabela editável (chave/valor) |
| `CHANNEL_NAME_MAPPINGS` | Dict | *"Canal GOAT\|GOAT,..."* | Mapeia nome da API → nome curto de exibição | Tabela editável (chave/valor) |
| `EPG_DESCRIPTION_CLEANUP` | Bool | false | Mantém apenas o 1º parágrafo da descrição EPG | Toggle on/off |
| `PLAYLIST_GENERATE_DIRECT` | Bool | true | Habilita geração de playlist com URLs diretas do YouTube | Toggle on/off |
| `PLAYLIST_GENERATE_PROXY` | Bool | true | Habilita geração de playlist roteada via Smart Player | Toggle on/off |

**Edição condicional:**

```
IF FILTER_BY_CATEGORY === true THEN
  └─ Mostrar: ALLOWED_CATEGORY_IDS (Multi-select)
```

---

### Categoria 4 — Formato de Títulos

*UI: Configurações → Formato de Títulos*

Esta página é uma **interface drag-and-drop** para montar o título dos eventos nas playlists.

| Variável | Tipo | Padrão | O que faz | Componente UI |
|---|---|---|---|---|
| `PREFIX_TITLE_WITH_STATUS` | Bool | true | Adiciona prefixo de status `[Ao Vivo]`, `[Agendado]`, `[Gravado]` | Toggle on/off |
| `PREFIX_TITLE_WITH_CHANNEL_NAME` | Bool | true | Adiciona nome do canal no título | Toggle on/off |
| `TITLE_USE_BRACKETS` | Bool | true | Envolve prefixos em colchetes `[ ]` | Toggle on/off |

**Componentes arrastáveis do título (ordem configurável via drag-and-drop):**

1. `[STATUS]` — ex: `[AO VIVO]`
2. `[CANAL]` — ex: `[CAZÉ TV]`
3. `[EVENTO]` — nome do stream
4. `[DATA/HORA]` — ex: `[15 Mar às 20:00]`
5. `[PLAYLIST YT]` *(Implementação pendente — verificar disponibilidade na API)*

**Pré-visualização em tempo real:** exibe exemplo do título final conforme os componentes são ativados/reordenados.

---

### Categoria 5 — Retenção de VOD

*UI: Configurações → Retenção (VOD)*

> **Regra de negócio:** o sistema **não busca VODs ativamente**. O ciclo de vida de um evento é `Upcoming → Live → Recorded`. A variável `KEEP_RECORDED_STREAMS` controla apenas se eventos já encerrados são mantidos no cache e incluídos na playlist VOD.

| Variável | Tipo | Padrão | O que faz | Componente UI |
|---|---|---|---|---|
| `KEEP_RECORDED_STREAMS` | Bool | true | Mantém eventos encerrados na playlist VOD | Toggle on/off |
| `MAX_RECORDED_PER_CHANNEL` | Int | 2 | Máximo de VODs retidos por canal | Slider 1–10 |
| `RECORDED_RETENTION_DAYS` | Int | 2 | Dias para manter um VOD no cache | Slider 1–30 |

---

### Categoria 6 — Mídia & Placeholders

*UI: Configurações → Mídia & Placeholders*

| Variável | Tipo | Padrão | O que faz | Componente UI |
|---|---|---|---|---|
| `PLACEHOLDER_IMAGE_URL` | URL | *(vazio)* | URL da imagem exibida quando não há stream ativo | Input com preview de imagem |
| `USE_INVISIBLE_PLACEHOLDER` | Bool | true | Insere URL do placeholder como comentário no M3U (invisível para o player IPTV) | Toggle on/off |

---

### Categoria 7 — Técnico & Servidor

*UI: Configurações → Técnico*

| Variável | Tipo | Padrão | O que faz | Componente UI |
|---|---|---|---|---|
| `HTTP_PORT` | Int | 8888 | Porta do servidor Express | Input numérico |
| `LOCAL_TIMEZONE` | String | "America/Sao_Paulo" | Fuso horário local para exibição de datas | Dropdown com lista IANA |
| `STALE_HOURS` | Int | 6 | TTL para considerar dados do cache como desatualizados | Slider 1–48h |
| `USE_PLAYLIST_ITEMS` | Bool | true | Usa `playlistItems` API (barato) em vez de `search` (caro em quota) | Toggle on/off |
| `PROXY_ENABLE_ANALYTICS` | Bool | true | Registra acessos ao proxy para estatísticas | Toggle on/off |
| `TUBEWRANGLERR_URL` | URL | "http://localhost:8888" | URL base do servidor (usada nos links da playlist proxy) | Input |
| `PROXY_THUMBNAIL_CACHE_HOURS` | Int | 24 | Tempo de cache de thumbnails em horas | Slider 1–168h |

**Ações disponíveis nesta página:**

- **Import JSON/DB** — restaura configurações de um arquivo JSON exportado
- **Export JSON/DB** — exporta todas as configurações para arquivo JSON
- **Reset DB ao padrão** — apaga configurações e restaura os valores padrão (requer confirmação)

---

### Categoria 8 — Logs

*UI: Configurações → Logs / também acessível via menu principal*

| Variável | Tipo | Padrão | O que faz | Componente UI |
|---|---|---|---|---|
| `LOG_LEVEL` | String | "INFO" | Nível de log unificado (DEBUG, INFO, WARNING, ERROR) | Dropdown |

> **Nota:** `LOG_TO_FILE`, `SMART_PLAYER_LOG_LEVEL` e `SMART_PLAYER_LOG_TO_FILE` foram **eliminados**. O novo sistema possui um único logger (winston) que transmite via WebSocket para a UI e opcionalmente escreve em arquivo rotativo.

---

## 5. Mapa da Interface Web (UI Map)

### Layout Geral

```
┌─────────────────────────────────────────────────────────────┐
│  [≡] TubeWranglerr              [●Live: 3] [●Upcom: 8]  [⚙] │  ← Header
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│  MENU        │         CONTEÚDO PRINCIPAL                   │
│  LATERAL     │                                              │
│  (ajustável  │                                              │
│   via drag   │                                              │
│   ou botão   │                                              │
│   recolher)  │                                              │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

### Menu Lateral

```
📊 Dashboard
📺 Canais
📡 Eventos
🎵 Playlists
⚙️  Configurações
    ├── API & Credenciais
    ├── Agendador
    ├── Conteúdo & Filtros
    ├── Formato de Títulos
    ├── Retenção (VOD)
    ├── Mídia & Placeholders
    ├── Técnico
    └── Logs
```

> A barra lateral é **redimensionável via drag** (mouse) e possui botão para recolher/expandir completamente.

---

### Página: Dashboard (`/`)

Painel de status geral do sistema.

**Métricas exibidas:**
- Streams ativos: `Live` | `Upcoming` | `VOD`
- Total de canais monitorados
- Status do agendador (ativo / pausado / próxima execução em X)
- Última sincronização (data/hora)
- Consumo estimado de quota YouTube API (se múltiplas chaves, por chave)
- Links rápidos para as playlists (copiar URL com 1 clique)

**Controles globais:**
- **▶ Iniciar Busca Global** — força execução imediata do agendador para todos os canais ativos
- **⏸ Pausar Agendador** — interrompe/retoma todas as buscas agendadas (toggle)

---

### Página: Canais (`/channels`)

Gerenciamento dos canais-fonte do YouTube.

**Adicionar canal:**
- Campo de texto que aceita `@handle` ou `Channel ID` diretamente
- Ao confirmar, o sistema **valida o canal via YouTube API** antes de salvar
- Se inválido: exibe erro inline com o motivo

**Tabela de canais:**

| Coluna | Descrição |
|---|---|
| Canal | Avatar + Nome completo + Handle |
| ID | Channel ID (exibido de forma discreta abaixo do handle) |
| Live | Contador de streams live ativos |
| Upcoming | Contador de streams agendados |
| VOD | Contador de gravações retidas |
| Status | Ícone colorido (ver abaixo) |
| Ações | Ícones de ação (ver abaixo) |

**Status (ícone colorido):**
- 🟢 **Ativo** — canal validado e monitorado
- 🔵 **Congelado** — monitoramento pausado pelo usuário
- 🔴 **Não encontrado** — canal não pôde ser resolvido pela API

**Ações por linha (ícones):**
- 🔄 **Forçar sincronização** — busca novos eventos apenas para este canal
- ❄️ **Congelar / Descongelar** — pausa/retoma monitoramento individual
- 🗑️ **Excluir** — remove canal e todos os seus streams (requer confirmação)

---

### Página: Eventos (`/streams`)

Lista de todos os streams individuais capturados.

**Filtros:**
- Por canal (dropdown)
- Por status: `Live` | `Upcoming` | `VOD`
- Por período (data início/fim)

**Tabela de eventos:**

| Coluna | Descrição |
|---|---|
| Canal | Nome do canal de origem |
| Evento | Título do stream |
| Status | Badge colorido (Live / Upcoming / VOD) |
| Início | Data/hora de início (fuso local) |
| Link | Ícone para copiar URL do YouTube |

---

### Página: Playlists (`/playlists`)

Links de saída prontos para uso em players IPTV.

**Tabela de playlists:**

| Coluna | Descrição |
|---|---|
| Nome | Identificador da playlist (ex: YouTube Live) |
| Tipo | Live / Upcoming / VOD |
| Modo | Direct (URL YouTube) / Proxy (Smart Player) |
| Link M3U | Clique para copiar URL |
| EPG | Clique para copiar URL do guia XML |

> Playlists no modo **Proxy** só aparecem se `PLAYLIST_GENERATE_PROXY = true`.  
> Playlists no modo **Direct** só aparecem se `PLAYLIST_GENERATE_DIRECT = true`.  
> Se `KEEP_RECORDED_STREAMS = false`, a linha de VOD exibe aviso "Retenção de VOD desativada" em vez do link.

---

### Página: Logs (`/logs`)

Visualização de logs em tempo real via WebSocket.

- **Stream ao vivo** de todos os logs do sistema (tail via WebSocket)
- **Filtro por nível:** DEBUG | INFO | WARNING | ERROR (aplicado client-side)
- **Filtro por módulo:** scheduler, youtube-api, smart-player, etc.
- **Scroll automático** (toggle para pausar)
- **Copiar / Limpar** buffer de logs exibido

---

## 6. Lógica de Negócio

### Ciclo de Vida de um Stream

```
Upcoming (agendado)
    │
    ▼ (quando hora de início chega)
Live (ao vivo)
    │
    ▼ (quando transmissão encerra)
Recorded / VOD (gravado)
    │
    ▼ (se KEEP_RECORDED_STREAMS = false, ou após RECORDED_RETENTION_DAYS)
[Removido do cache]
```

### Lógica do Agendador Inteligente

#### Respostas às Perguntas Fundamentais

> ⚠️ O Agente **deve** implementar o orquestrador de acordo com as respostas abaixo. São decisões de design, não sugestões.

| Pergunta | Resposta |
|---|---|
| **Loop infinito ou finito?** | **Infinito.** O scheduler roda para sempre até `stop()` ser chamado. Nunca termina sozinho. |
| **Concorrência ou serial?** | **Serial dentro de cada tick.** Os três jobs são avaliados em sequência no mesmo tick de 60s. A busca por canais na busca principal processa canal por canal. Não há `Promise.all()` paralelo — isso protege a quota da API. |
| **Uma stream ou múltiplas por vez?** | **Múltiplas, em batch.** Pre-event + post-event + stale são agrupados em um único `Set<videoId>` e verificados em um só batch call à API (até 50 IDs por chamada). Um ID nunca é buscado duas vezes no mesmo tick, mesmo que se qualifique para múltiplos critérios. |
| **Prioridade muda dinamicamente?** | **Sim, implicitamente por timestamps.** Não existe uma fila de prioridade explícita. O mecanismo é: cada job tem seu próprio `lastRun` timestamp e intervalo. A cada tick de 60s, o scheduler verifica quais jobs têm `now - lastRun >= interval`. Quando há lives ativas, o post-event job dispara a cada 5min — efetivamente dando prioridade máxima a eventos ativos. |

---

#### Esqueleto Obrigatório — `src/core/scheduler.ts`

> Este esqueleto define a estrutura, os contratos e o fluxo de decisão. O Agente deve **implementar os corpos dos métodos** mantendo rigorosamente os nomes, assinaturas e a ordem de execução dentro do `_tick()`.

```typescript
// src/core/scheduler.ts
import { configEvents } from './config-manager';
import { StateManager, Stream } from './state-manager';
import { YouTubeApi } from './youtube-api';
import { logger } from './logger';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface SchedulerConfig {
  mainIntervalHours: number;
  preEventWindowHours: number;
  preEventIntervalMinutes: number;
  postEventIntervalMinutes: number;
  fullSyncIntervalHours: number;
  staleHours: number;
  enableActiveHours: boolean;
  activeStartHour: number;
  activeEndHour: number;
  usePlaylistItems: boolean;
  localTimezone: string;
}

// ─── Scheduler ────────────────────────────────────────────────────────────────

export class Scheduler {
  private config: SchedulerConfig;
  private state: StateManager;
  private api: YouTubeApi;

  // Timestamps de controle — persistidos no state_cache.json via StateManager
  private lastMainRun: Date;
  private lastFullSync: Date;
  private lastPreEventRun: Date;
  private lastPostEventRun: Date;

  // Controle de execução
  private isPaused: boolean = false;
  private isRunning: boolean = false;       // mutex: impede sobreposição de ticks
  private tickInterval: NodeJS.Timeout | null = null;
  private readonly TICK_MS = 60_000;        // avalia jobs a cada 60 segundos (fixo, não configurável)

  constructor(state: StateManager, api: YouTubeApi, config: SchedulerConfig) {
    this.state = state;
    this.api = api;
    this.config = config;

    // Restaura timestamps do cache (garante continuidade após restart do container)
    const epoch = new Date(0);
    this.lastMainRun    = state.getMeta('lastMainRun')    ?? epoch;
    this.lastFullSync   = state.getMeta('lastFullSync')   ?? epoch;
    this.lastPreEventRun  = epoch;  // não persiste — recalculado na inicialização
    this.lastPostEventRun = epoch;  // não persiste — recalculado na inicialização

    // Hot reload: reconfigura intervalos quando settings mudam via UI
    configEvents.on('configChanged', (key: string, value: string) => {
      this._onConfigChanged(key, value);
    });
  }

  // ─── Controle Público ──────────────────────────────────────────────────────

  /** Inicia o loop infinito de ticks. Chamado uma vez na inicialização do servidor. */
  start(applyInitialDelay: boolean = false): void {
    if (this.tickInterval) return; // já iniciado

    if (applyInitialDelay) {
      // Cache já existia: respeita o último intervalo, não executa imediatamente
      logger.info('[Scheduler] Iniciado com delay inicial (cache existente detectado).');
      this.lastMainRun = new Date(); // efetivamente adia a próxima busca principal
    }

    logger.info('[Scheduler] Loop iniciado. Tick a cada 60s.');
    this.tickInterval = setInterval(() => this._safeTick(), this.TICK_MS);

    // Executa o primeiro tick imediatamente (sem esperar 60s)
    this._safeTick();
  }

  /** Para o loop. Aguarda o tick atual terminar se estiver em execução. */
  stop(): void {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
      logger.info('[Scheduler] Loop parado.');
    }
  }

  /** Pausa a execução de jobs (ticks continuam, mas jobs são pulados). */
  pause(): void {
    this.isPaused = true;
    logger.info('[Scheduler] Pausado. Ticks continuam mas jobs não serão executados.');
  }

  /** Retoma após pausa. */
  resume(): void {
    this.isPaused = false;
    logger.info('[Scheduler] Retomado.');
  }

  /**
   * Força execução imediata da busca principal (botão "Iniciar Busca Global" na UI).
   * Ignora isPaused — é uma ação explícita do usuário.
   */
  async triggerNow(): Promise<void> {
    logger.info('[Scheduler] Trigger manual recebido. Executando busca principal imediata...');
    this.lastMainRun = new Date(0); // zera timestamp para forçar execução no próximo tick
    await this._safeTick();
  }

  /** Retorna estado atual para o endpoint GET /api/scheduler/status */
  getStatus(): object {
    const now = new Date();
    return {
      running:   !!this.tickInterval,
      paused:    this.isPaused,
      busy:      this.isRunning,
      lastMainRun:    this.lastMainRun.toISOString(),
      lastFullSync:   this.lastFullSync.toISOString(),
      nextMainRun:    new Date(this.lastMainRun.getTime()
                        + this.config.mainIntervalHours * 3_600_000).toISOString(),
      activeLives:    this.state.countByStatus('live'),
      activeUpcoming: this.state.countByStatus('upcoming'),
    };
  }

  // ─── Loop Principal ────────────────────────────────────────────────────────

  /**
   * Wrapper seguro em torno de _tick().
   * Garante que dois ticks nunca rodem ao mesmo tempo (mutex via isRunning).
   */
  private async _safeTick(): Promise<void> {
    if (this.isRunning) {
      logger.debug('[Scheduler] Tick pulado: tick anterior ainda em execução.');
      return;
    }
    this.isRunning = true;
    try {
      await this._tick();
    } catch (err) {
      logger.error('[Scheduler] Erro não tratado no tick:', err);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Coração do agendador. Executado a cada 60 segundos.
   *
   * ORDEM DE EXECUÇÃO (serial, obrigatória):
   *   1. Verificar se pausado → sair
   *   2. Avaliar e executar Busca Principal (se intervalo expirou + horário ativo)
   *   3. Coletar IDs para verificação de alta frequência:
   *      a. Pré-evento (upcoming dentro da janela)
   *      b. Pós-evento (lives ativas)
   *      c. Stale (live/upcoming com fetch_time antigo)
   *   4. Se há IDs coletados → executar batch check
   *   5. Atualizar textos EPG e persistir cache
   */
  private async _tick(): Promise<void> {
    // ── Guarda de pausa ─────────────────────────────────────────────────────
    if (this.isPaused) {
      logger.debug('[Scheduler] Tick: pausado, pulando.');
      return;
    }

    const now = new Date();

    // ── Job 1: Busca Principal ───────────────────────────────────────────────
    const mainIntervalMs = this.config.mainIntervalHours * 3_600_000;
    const timeForMainRun = (now.getTime() - this.lastMainRun.getTime()) >= mainIntervalMs;

    if (timeForMainRun) {
      if (this._isActiveHour(now)) {
        await this._runMainFetch(now);
      } else {
        logger.info(
          `[Scheduler] Busca principal pulada: fora do horário ativo ` +
          `(${this.config.activeStartHour}h–${this.config.activeEndHour}h).`
        );
        // NÃO atualiza lastMainRun: vai tentar novamente no próximo tick,
        // quando o horário ativo pode ter começado.
      }
    }

    // ── Jobs 2 e 3: Alta Frequência (pré + pós + stale) ─────────────────────
    // Todos os IDs são coletados primeiro e verificados em um único batch call.
    // Isso reduz chamadas à API e evita buscar o mesmo ID duas vezes.
    const idsToCheck = new Set<string>();

    // 2a. Pré-evento: upcoming dentro da janela de tempo
    const preIntervalMs = this.config.preEventIntervalMinutes * 60_000;
    if ((now.getTime() - this.lastPreEventRun.getTime()) >= preIntervalMs) {
      const preEventIds = this._getPreEventIds(now);
      preEventIds.forEach(id => idsToCheck.add(id));
      if (preEventIds.size > 0) {
        logger.info(`[Scheduler] ${preEventIds.size} stream(s) na janela pré-evento.`);
      }
      this.lastPreEventRun = now;
    }

    // 2b. Pós-evento: lives genuinamente ativas
    const postIntervalMs = this.config.postEventIntervalMinutes * 60_000;
    if ((now.getTime() - this.lastPostEventRun.getTime()) >= postIntervalMs) {
      const postEventIds = this._getPostEventIds();
      postEventIds.forEach(id => idsToCheck.add(id));
      if (postEventIds.size > 0) {
        logger.info(`[Scheduler] ${postEventIds.size} stream(s) live em monitoramento.`);
      }
      this.lastPostEventRun = now;
    }

    // 2c. Stale: live/upcoming com dados desatualizados
    const staleIds = this._getStaleIds(now);
    staleIds.forEach(id => idsToCheck.add(id));
    if (staleIds.size > 0) {
      logger.debug(`[Scheduler] ${staleIds.size} stream(s) stale adicionados ao batch.`);
    }

    // ── Executa batch check (um único call à API para todos os IDs) ──────────
    if (idsToCheck.size > 0) {
      await this._runHighFrequencyCheck(idsToCheck, now);
    }

    // ── Persiste estado e atualiza textos EPG ────────────────────────────────
    // Só persiste se houve alguma ação neste tick
    if (timeForMainRun || idsToCheck.size > 0) {
      this.state.saveEpgTexts(this.config.localTimezone);
      this.state.saveToDisk();
      this._logCurrentState();
    }
  }

  // ─── Jobs ──────────────────────────────────────────────────────────────────

  /**
   * Busca principal: varre todos os canais ativos buscando novos streams.
   * Decide entre busca incremental (publishedAfter = lastMainRun) e full sync.
   * Canais são processados SERIALMENTE para respeitar quota da API.
   */
  private async _runMainFetch(now: Date): Promise<void> {
    const fullSyncIntervalMs = this.config.fullSyncIntervalHours * 3_600_000;
    const timeForFullSync = (now.getTime() - this.lastFullSync.getTime()) >= fullSyncIntervalMs;
    const epoch = new Date(0);
    const isFirstRun = this.lastMainRun.getTime() === epoch.getTime();

    // Busca incremental (barata) ou full sync (completa)?
    const publishedAfter = (!timeForFullSync && !isFirstRun)
      ? this.lastMainRun.toISOString()
      : undefined; // undefined = sem filtro de data = full sync

    logger.info(
      `[Scheduler] Iniciando busca principal. ` +
      `Tipo: ${publishedAfter ? 'incremental' : 'full sync'}. ` +
      `publishedAfter: ${publishedAfter ?? 'nenhum'}`
    );

    const channels = this.state.getActiveChannels(); // status = 'active' (não frozen)
    if (channels.length === 0) {
      logger.warn('[Scheduler] Nenhum canal ativo. Busca pulada.');
      this.lastMainRun = now;
      return;
    }

    // Processamento SERIAL de canais (não usar Promise.all aqui)
    const allFetchedStreams = [];
    for (const channel of channels) {
      try {
        const streams = this.config.usePlaylistItems
          ? await this.api.fetchByPlaylistItems(channel.uploadsPlaylistId, publishedAfter)
          : await this.api.fetchBySearch(channel.channelId, publishedAfter);
        allFetchedStreams.push(...streams);
      } catch (err) {
        logger.error(`[Scheduler] Erro ao buscar canal ${channel.channelId}:`, err);
        // Continua para o próximo canal — não aborta a busca inteira
      }
    }

    this.state.updateStreams(allFetchedStreams);
    this.lastMainRun = now;
    this.state.setMeta('lastMainRun', now);

    if (publishedAfter === undefined) {
      this.lastFullSync = now;
      this.state.setMeta('lastFullSync', now);
    }
  }

  /**
   * Verificação de alta frequência: busca detalhes atualizados de streams específicos.
   * Todos os IDs são verificados em um único batch call (máx. 50 por chamada à API).
   * Se a API não retornar um ID que estava 'live' ou 'upcoming', marca como 'none'.
   */
  private async _runHighFrequencyCheck(ids: Set<string>, now: Date): Promise<void> {
    logger.info(`[Scheduler] Verificação alta frequência: ${ids.size} stream(s).`);

    try {
      const idList = Array.from(ids);
      // fetch em batches de 50 (limite da YouTube API para videos.list)
      const updatedStreams = await this.api.fetchStreamsByIds(idList);
      this.state.updateStreams(updatedStreams);

      // IDs que foram pedidos mas não vieram na resposta da API
      const returnedIds = new Set(updatedStreams.map(s => s.videoId));
      const missingIds = idList.filter(id => !returnedIds.has(id));

      // Se um stream estava 'live'/'upcoming' e sumiu da API → marcar como 'none' (encerrado)
      const toMarkAsEnded = missingIds.filter(id => {
        const s = this.state.getStream(id);
        return s && (s.status === 'live' || s.status === 'upcoming');
      });

      if (toMarkAsEnded.length > 0) {
        logger.warn(
          `[Scheduler] ${toMarkAsEnded.length} stream(s) não retornados pela API. ` +
          `Marcando como encerrados: ${toMarkAsEnded.join(', ')}`
        );
        this.state.markAsEnded(toMarkAsEnded);
      }
    } catch (err) {
      logger.error('[Scheduler] Erro na verificação de alta frequência:', err);
    }
  }

  // ─── Seletores de IDs ──────────────────────────────────────────────────────

  /** Retorna IDs de streams 'upcoming' dentro da janela pré-evento. */
  private _getPreEventIds(now: Date): Set<string> {
    const windowCutoff = new Date(now.getTime() + this.config.preEventWindowHours * 3_600_000);
    return new Set(
      this.state.getAllStreams()
        .filter(s =>
          s.status === 'upcoming' &&
          s.scheduledStart instanceof Date &&
          s.scheduledStart > now &&           // ainda não começou
          s.scheduledStart < windowCutoff     // começa dentro da janela
        )
        .map(s => s.videoId)
    );
  }

  /** Retorna IDs de streams genuinamente ao vivo. */
  private _getPostEventIds(): Set<string> {
    return new Set(
      this.state.getAllStreams()
        .filter(s =>
          s.status === 'live' &&
          s.actualStart instanceof Date &&    // já começou
          !s.actualEnd                        // ainda não terminou
        )
        .map(s => s.videoId)
    );
  }

  /** Retorna IDs de streams 'live' ou 'upcoming' com dados desatualizados. */
  private _getStaleIds(now: Date): Set<string> {
    const staleCutoff = new Date(now.getTime() - this.config.staleHours * 3_600_000);
    return new Set(
      this.state.getAllStreams()
        .filter(s =>
          (s.status === 'live' || s.status === 'upcoming') &&
          s.fetchTime instanceof Date &&
          s.fetchTime < staleCutoff
        )
        .map(s => s.videoId)
    );
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  /** Verifica se a hora atual está dentro do horário ativo configurado. */
  private _isActiveHour(now: Date): boolean {
    if (!this.config.enableActiveHours) return true; // sem restrição = sempre ativo
    const localHour = new Date(
      now.toLocaleString('en-US', { timeZone: this.config.localTimezone })
    ).getHours();
    return localHour >= this.config.activeStartHour && localHour < this.config.activeEndHour;
  }

  /** Log de estado atual após cada job significativo. */
  private _logCurrentState(): void {
    const live     = this.state.countByStatus('live');
    const upcoming = this.state.countByStatus('upcoming');
    const vod      = this.state.countByStatus('none');
    logger.info(
      `[Scheduler] Estado: ${live} live | ${upcoming} upcoming | ${vod} vod. ` +
      `Próxima busca principal: ${new Date(
        this.lastMainRun.getTime() + this.config.mainIntervalHours * 3_600_000
      ).toLocaleTimeString('pt-BR', { timeZone: this.config.localTimezone })}`
    );
  }

  /** Responde a mudanças de configuração em tempo real. */
  private _onConfigChanged(key: string, value: string): void {
    switch (key) {
      case 'SCHEDULER_MAIN_INTERVAL_HOURS':
        this.config.mainIntervalHours = Number(value);
        logger.info(`[Scheduler] mainIntervalHours atualizado para ${value}h.`);
        break;
      case 'SCHEDULER_PRE_EVENT_WINDOW_HOURS':
        this.config.preEventWindowHours = Number(value);
        break;
      case 'SCHEDULER_PRE_EVENT_INTERVAL_MINUTES':
        this.config.preEventIntervalMinutes = Number(value);
        break;
      case 'SCHEDULER_POST_EVENT_INTERVAL_MINUTES':
        this.config.postEventIntervalMinutes = Number(value);
        break;
      case 'ENABLE_SCHEDULER_ACTIVE_HOURS':
        this.config.enableActiveHours = value === 'true';
        break;
      case 'SCHEDULER_ACTIVE_START_HOUR':
        this.config.activeStartHour = Number(value);
        break;
      case 'SCHEDULER_ACTIVE_END_HOUR':
        this.config.activeEndHour = Number(value);
        break;
      case 'USE_PLAYLIST_ITEMS':
        this.config.usePlaylistItems = value === 'true';
        break;
    }
  }
}
```

---

#### Contratos que o Agente DEVE respeitar ao implementar corpos de método

**`StateManager` deve expor:**

```typescript
getAllStreams(): Stream[]
getStream(videoId: string): Stream | undefined
getActiveChannels(): Channel[]          // status = 'active' (não frozen)
countByStatus(status: string): number
updateStreams(streams: Partial<Stream>[]): void
markAsEnded(videoIds: string[]): void   // seta status='none' para cada id
getMeta(key: string): Date | undefined
setMeta(key: string, value: Date): void
saveEpgTexts(timezone: string): void    // gera textos_epg.json (ver algoritmo na Fase 3)
saveToDisk(): void                      // persiste state_cache.json
```

**`YouTubeApi` deve expor:**

```typescript
fetchByPlaylistItems(playlistId: string, publishedAfter?: string): Promise<Stream[]>
fetchBySearch(channelId: string, publishedAfter?: string): Promise<Stream[]>
fetchStreamsByIds(videoIds: string[]): Promise<Stream[]>  // batches de 50 automaticamente
```

---

#### Diagrama do Fluxo de Decisão por Tick

```
TICK (a cada 60s)
    │
    ├─ isPaused? → sair
    │
    ├─ [Job 1] now - lastMainRun >= mainIntervalHours?
    │       │
    │       ├─ SIM + isActiveHour?
    │       │     ├─ timeForFullSync? → publishedAfter = undefined (full sync)
    │       │     └─ NÃO?            → publishedAfter = lastMainRun (incremental)
    │       │     → processa canais SERIAL um a um
    │       │     → lastMainRun = now
    │       │
    │       └─ SIM + fora do horário? → loga, NÃO atualiza lastMainRun
    │
    ├─ [Job 2] Coleta IDs para batch check:
    │       │
    │       ├─ now - lastPreEventRun >= preEventInterval?
    │       │     → filtra upcoming com scheduledStart dentro da janela → ids ⊕
    │       │     → lastPreEventRun = now
    │       │
    │       ├─ now - lastPostEventRun >= postEventInterval?
    │       │     → filtra live com actualStart e sem actualEnd → ids ⊕
    │       │     → lastPostEventRun = now
    │       │
    │       └─ sempre: filtra live/upcoming com fetchTime antigo → ids ⊕
    │
    ├─ ids.size > 0?
    │       → api.fetchStreamsByIds(ids) [batch de até 50 por call]
    │       → IDs pedidos mas não retornados → markAsEnded()
    │
    └─ houve ação? → saveEpgTexts() → saveToDisk()
```

---

### Esqueleto Obrigatório — `src/core/state-manager.ts`

> O Agente deve **implementar os corpos dos métodos** mantendo rigorosamente os nomes, as regras de filtragem e a lógica de prune. Desviar dessas regras causa bugs silenciosos que só aparecem em produção.

```typescript
// src/core/state-manager.ts
import fs from 'fs';
import path from 'path';
import { getConfig } from './config-manager';
import { logger } from './logger';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface Stream {
  videoId:        string;
  channelId:      string;
  channelName:    string;
  titleOriginal:  string;
  description:    string;
  categoryId:     string | null;    // ex: "17" (Esportes)
  watchUrl:       string;
  thumbnailUrl:   string;

  // status vem da YouTube API como liveBroadcastContent
  status:         'live' | 'upcoming' | 'none';

  scheduledStart: Date | null;      // liveStreamingDetails.scheduledStartTime
  actualStart:    Date | null;      // liveStreamingDetails.actualStartTime
  actualEnd:      Date | null;      // liveStreamingDetails.actualEndTime

  fetchTime:      Date;             // quando foi buscado pela última vez
  lastSeen:       Date;             // idem — usado para detectar streams desaparecidos
}

export interface Channel {
  channelId:          string;
  handle:             string | null;
  title:              string;
  thumbnailUrl:       string;
  uploadsPlaylistId:  string;
  status:             'active' | 'frozen' | 'not_found';
}

interface CacheFile {
  streams:  Record<string, unknown>;
  meta:     { lastMainRun?: string; lastFullSync?: string };
}

// ─── StateManager ─────────────────────────────────────────────────────────────

export class StateManager {
  // Mapa em memória: videoId → Stream (fonte de verdade para o Smart Player)
  private streams: Map<string, Stream> = new Map();

  // Meta persistida: lastMainRun, lastFullSync
  private meta: Map<string, Date> = new Map();

  private readonly cacheFilePath: string;
  private readonly epgTextsFilePath: string;

  constructor(dataDir: string) {
    this.cacheFilePath    = path.join(dataDir, 'state_cache.json');
    this.epgTextsFilePath = path.join(dataDir, 'textos_epg.json');
  }

  // ─── API pública (contratos usados pelo Scheduler) ───────────────────────

  getAllStreams(): Stream[] {
    return Array.from(this.streams.values());
  }

  getStream(videoId: string): Stream | undefined {
    return this.streams.get(videoId);
  }

  /** Retorna canais com status 'active' lidos do banco SQLite. */
  getActiveChannels(): Channel[] {
    // Ler da tabela `channels` do banco onde status = 'active'
    // Implementar acesso ao db aqui
    throw new Error('Não implementado — deve ler da tabela channels do SQLite');
  }

  countByStatus(status: Stream['status']): number {
    return Array.from(this.streams.values()).filter(s => s.status === status).length;
  }

  getMeta(key: 'lastMainRun' | 'lastFullSync'): Date | undefined {
    return this.meta.get(key);
  }

  setMeta(key: 'lastMainRun' | 'lastFullSync', value: Date): void {
    this.meta.set(key, value);
  }

  /** Marca streams como encerrados ('none'). Chamado quando a API não os retorna mais. */
  markAsEnded(videoIds: string[]): void {
    const now = new Date();
    for (const id of videoIds) {
      const existing = this.streams.get(id);
      if (existing) {
        existing.status    = 'none';
        existing.actualEnd = existing.actualEnd ?? now; // preserva se já havia
        existing.lastSeen  = now;
        logger.debug(`[StateManager] Stream ${id} marcado como encerrado.`);
      }
    }
    // Prune imediato após marcar — pode limpar excedentes de VOD
    this._pruneEndedStreams();
  }

  // ─── updateStreams ────────────────────────────────────────────────────────

  /**
   * Incorpora dados recebidos da API ao estado em memória.
   *
   * REGRAS DE FILTRAGEM (ordem obrigatória):
   *
   * 1. FILTRO DE CATEGORIA — executado ANTES de qualquer outra decisão:
   *    - Se FILTER_BY_CATEGORY = true E categoryId não está em ALLOWED_CATEGORY_IDS:
   *      → Se o stream JÁ estava no cache: REMOVE do cache + loga
   *      → Se era novo: ignora silenciosamente
   *    - Isso evita que um stream mude de categoria e fique "preso" no cache.
   *
   * 2. FILTRO DE VOD INICIAL — só para streams NOVOS (não estão no cache):
   *    - Se status = 'none' E o stream NÃO existe no cache: IGNORA.
   *    - Motivo: não queremos importar VODs históricos que nunca passaram pelo sistema.
   *    - Streams que chegam como 'none' mas JÁ estavam no cache (ex-lives) são aceitos normalmente.
   *
   * 3. MERGE — para streams que passam pelos filtros:
   *    - Copia o objeto existente (se houver) ANTES de aplicar os novos dados.
   *    - Sobrescreve com os campos vindos da API.
   *    - Isso preserva campos que a API às vezes omite (ex: actualStart em lives longas).
   *    - Atualiza fetchTime e lastSeen para agora.
   *
   * 4. PRUNE — chamado ao final de todo updateStreams().
   */
  updateStreams(incoming: Partial<Stream>[]): void {
    const now = new Date();
    const cfg = {
      filterByCategory:    getConfig('FILTER_BY_CATEGORY') === 'true',
      allowedCategoryIds:  new Set(
        getConfig('ALLOWED_CATEGORY_IDS').split(',').map(s => s.trim()).filter(Boolean)
      ),
    };

    let added = 0, updated = 0, ignoredVod = 0, ignoredCategory = 0;

    for (const raw of incoming) {
      const videoId = raw.videoId;
      if (!videoId) continue;

      const existing = this.streams.get(videoId);

      // ── Regra 1: Filtro de categoria ──────────────────────────────────────
      if (cfg.filterByCategory) {
        const catId = raw.categoryId ?? null;
        if (!catId || !cfg.allowedCategoryIds.has(catId)) {
          if (existing) {
            this.streams.delete(videoId);
            logger.debug(`[StateManager] Removido ${videoId}: categoria "${catId}" não permitida.`);
          }
          ignoredCategory++;
          continue;
        }
      }

      // ── Regra 2: Filtro de VOD inicial ────────────────────────────────────
      // Nunca adicionar ao cache um stream que chega com status='none' pela primeira vez.
      if (!existing && raw.status === 'none') {
        ignoredVod++;
        logger.debug(`[StateManager] Ignorado VOD inicial (nunca visto): ${videoId}`);
        continue;
      }

      // ── Regra 3: Merge ────────────────────────────────────────────────────
      // existing.copy() + merge(incoming) — preserva campos que a API pode omitir
      const merged: Stream = {
        ...(existing ?? {}),   // base: campos existentes (preserva o que a API não retornou)
        ...raw,                // sobrescreve com dados frescos da API
        fetchTime: now,        // sempre atualiza timestamps
        lastSeen:  now,
      } as Stream;

      this.streams.set(videoId, merged);
      existing ? updated++ : added++;
    }

    if (added || updated || ignoredVod || ignoredCategory) {
      logger.info(
        `[StateManager] updateStreams: +${added} novos, ~${updated} atualizados, ` +
        `${ignoredVod} VODs iniciais ignorados, ${ignoredCategory} por categoria.`
      );
    }

    // ── Regra 4: Prune ────────────────────────────────────────────────────
    this._pruneEndedStreams();
  }

  // ─── _pruneEndedStreams ───────────────────────────────────────────────────

  /**
   * Remove streams do cache conforme regras de retenção.
   *
   * CRITÉRIOS DE REMOÇÃO (avaliados nesta ordem por stream):
   *
   * A) actualEnd existe E actualEnd < recordedCutoff
   *    → Remove sempre, independente de KEEP_RECORDED_STREAMS.
   *    → Evento encerrado há mais de RECORDED_RETENTION_DAYS dias.
   *
   * B) status = 'none' (VOD/encerrado):
   *    → Se !KEEP_RECORDED_STREAMS: remove imediatamente.
   *    → Se KEEP_RECORDED_STREAMS:
   *         sortTime = actualEnd ?? lastSeen   ← usa actualEnd se disponível
   *         Se sortTime < recordedCutoff: remove.
   *         Senão: agrupa por channelId para controle de MAX_RECORDED_PER_CHANNEL.
   *
   * C) status = 'live' ou 'upcoming' E lastSeen < staleCutoff:
   *    → Stream desapareceu da API sem encerramento formal. Remove.
   *    → staleCutoff = now - max(STALE_HOURS * 2, SCHEDULER_MAIN_INTERVAL_HOURS * 2)
   *    ⚠️ O multiplicador *2 é intencional — dá margem para o scheduler ter buscado
   *       pelo menos uma vez sem retornar o stream antes de removê-lo.
   *
   * D) KEEP_RECORDED_STREAMS: após remover por retenção de tempo, limita por quantidade:
   *    → Ordena VODs de cada canal por sortTime DECRESCENTE (mais recente primeiro).
   *    → Mantém apenas os primeiros MAX_RECORDED_PER_CHANNEL.
   *    → Remove o excedente.
   */
  private _pruneEndedStreams(): void {
    const now = new Date();
    const cfg = {
      keepRecorded:         getConfig('KEEP_RECORDED_STREAMS') === 'true',
      retentionDays:        Number(getConfig('RECORDED_RETENTION_DAYS')) || 2,
      maxRecordedPerChannel: Number(getConfig('MAX_RECORDED_PER_CHANNEL')) || 2,
      staleHours:           Number(getConfig('STALE_HOURS')) || 6,
      mainIntervalHours:    Number(getConfig('SCHEDULER_MAIN_INTERVAL_HOURS')) || 4,
    };

    const recordedCutoffMs = cfg.retentionDays * 86_400_000;
    const recordedCutoff   = new Date(now.getTime() - recordedCutoffMs);

    // staleCutoff usa max(STALE_HOURS, MAIN_INTERVAL) * 2 — intencional, não simplificar
    const staleMs     = Math.max(cfg.staleHours, cfg.mainIntervalHours) * 2 * 3_600_000;
    const staleCutoff = new Date(now.getTime() - staleMs);

    const toDelete = new Set<string>();

    // Agrupa VODs por canal para controle de quantidade (só se KEEP_RECORDED)
    const recordedByChannel = new Map<string, Array<{ videoId: string; sortTime: Date }>>();

    for (const [videoId, stream] of this.streams) {
      const lastSeen = stream.lastSeen instanceof Date ? stream.lastSeen : now;
      const actualEnd = stream.actualEnd instanceof Date ? stream.actualEnd : null;

      // ── Critério A: actualEnd muito antigo ───────────────────────────────
      if (actualEnd && actualEnd < recordedCutoff) {
        toDelete.add(videoId);
        continue;
      }

      // ── Critério B: VOD/encerrado ─────────────────────────────────────────
      if (stream.status === 'none') {
        if (!cfg.keepRecorded) {
          toDelete.add(videoId);
          continue;
        }
        // sortTime: prefere actualEnd (data real de encerramento); fallback: lastSeen
        const sortTime = actualEnd ?? lastSeen;
        if (sortTime < recordedCutoff) {
          toDelete.add(videoId);
          continue;
        }
        // Candidato a ser mantido — agrupa para controle de quantidade
        const group = recordedByChannel.get(stream.channelId) ?? [];
        group.push({ videoId, sortTime });
        recordedByChannel.set(stream.channelId, group);
        continue;
      }

      // ── Critério C: live/upcoming stale ──────────────────────────────────
      if (lastSeen < staleCutoff) {
        toDelete.add(videoId);
      }
    }

    // ── Critério D: limita quantidade de VODs por canal ───────────────────
    if (cfg.keepRecorded) {
      for (const [, items] of recordedByChannel) {
        if (items.length > cfg.maxRecordedPerChannel) {
          // Ordena DECRESCENTE por sortTime (mais recente primeiro)
          items.sort((a, b) => b.sortTime.getTime() - a.sortTime.getTime());
          // Remove os excedentes (além do limite)
          for (const item of items.slice(cfg.maxRecordedPerChannel)) {
            toDelete.add(item.videoId);
          }
        }
      }
    }

    if (toDelete.size > 0) {
      logger.info(`[StateManager] Removendo ${toDelete.size} stream(s) do cache (prune).`);
      for (const id of toDelete) this.streams.delete(id);
    }
  }

  // ─── Persistência ─────────────────────────────────────────────────────────

  /**
   * Persiste estado em state_cache.json.
   * Dates são serializadas como ISO 8601 strings.
   */
  saveToDisk(): void {
    try {
      const data: CacheFile = {
        streams: Object.fromEntries(
          Array.from(this.streams.entries()).map(([id, s]) => [
            id,
            {
              ...s,
              scheduledStart: s.scheduledStart?.toISOString() ?? null,
              actualStart:    s.actualStart?.toISOString()    ?? null,
              actualEnd:      s.actualEnd?.toISOString()      ?? null,
              fetchTime:      s.fetchTime.toISOString(),
              lastSeen:       s.lastSeen.toISOString(),
            },
          ])
        ),
        meta: {
          lastMainRun:  this.meta.get('lastMainRun')?.toISOString(),
          lastFullSync: this.meta.get('lastFullSync')?.toISOString(),
        },
      };
      fs.writeFileSync(this.cacheFilePath, JSON.stringify(data, null, 2), 'utf-8');
      logger.info(`[StateManager] Cache salvo em ${this.cacheFilePath}.`);
    } catch (err) {
      logger.error('[StateManager] Erro ao salvar cache:', err);
    }
  }

  /**
   * Carrega state_cache.json na inicialização.
   * Reconverte ISO strings para objetos Date.
   * Retorna true se cache existia e foi carregado com sucesso.
   *
   * CAMPOS QUE PRECISAM DE CONVERSÃO Date (obrigatório):
   *   scheduledStart, actualStart, actualEnd, fetchTime, lastSeen
   */
  loadFromDisk(): boolean {
    if (!fs.existsSync(this.cacheFilePath)) return false;
    try {
      const raw = JSON.parse(fs.readFileSync(this.cacheFilePath, 'utf-8')) as CacheFile;

      for (const [id, s] of Object.entries(raw.streams)) {
        const stream = s as Record<string, unknown>;
        const parseDate = (v: unknown): Date | null => {
          if (typeof v === 'string') {
            const d = new Date(v);
            return isNaN(d.getTime()) ? null : d;
          }
          return null;
        };
        this.streams.set(id, {
          ...stream,
          scheduledStart: parseDate(stream['scheduledStart']),
          actualStart:    parseDate(stream['actualStart']),
          actualEnd:      parseDate(stream['actualEnd']),
          fetchTime:      parseDate(stream['fetchTime']) ?? new Date(),
          lastSeen:       parseDate(stream['lastSeen'])  ?? new Date(),
        } as Stream);
      }

      const lmr = raw.meta?.lastMainRun;
      const lfs = raw.meta?.lastFullSync;
      if (lmr) this.meta.set('lastMainRun',  new Date(lmr));
      if (lfs) this.meta.set('lastFullSync', new Date(lfs));

      logger.info(`[StateManager] Cache carregado: ${this.streams.size} streams.`);
      return true;
    } catch (err) {
      logger.error('[StateManager] Erro ao carregar cache:', err);
      return false;
    }
  }

  /**
   * Gera textos_epg.json para todos os streams 'upcoming'.
   * Chamado pelo Scheduler após cada ciclo. Ver algoritmo completo na Seção 11 — Fase 3.
   */
  saveEpgTexts(timezone: string): void {
    // Implementação completa está na Seção 11 — Fase 3 (função generateEpgTexts)
    // Iterar sobre getAllStreams(), filtrar status='upcoming', gerar line1+line2, salvar JSON.
    throw new Error('Implementar usando o algoritmo da Seção 11 — Fase 3');
  }

  /**
   * Espelha streams no banco SQLite (tabela `streams`).
   * Chamado pelo Scheduler após cada ciclo — permite que a API REST liste streams sem
   * acessar state_cache.json diretamente.
   * O Smart Player NUNCA chama este método — ele lê state_cache.json do disco.
   */
  syncToDatabase(): void {
    // Fazer upsert de cada stream em this.streams para a tabela `streams` do SQLite.
    // Usar INSERT OR REPLACE ou UPDATE ON CONFLICT.
    throw new Error('Implementar: upsert de streams no SQLite');
  }
}
```

---

### Esqueleto Obrigatório — `src/core/youtube-api.ts`

> Implementar os corpos dos métodos. A ordem e os detalhes de cada método são críticos para quota e corretude.

```typescript
// src/core/youtube-api.ts
import { google, youtube_v3 } from 'googleapis';
import { getConfig } from './config-manager';
import { configEvents } from './config-manager';
import { logger } from './logger';
import { Stream } from './state-manager';

// ─── Round-Robin de API Keys ──────────────────────────────────────────────────

/**
 * Gerencia múltiplas API keys em rodízio.
 *
 * COMPORTAMENTO:
 * - Mantém um índice rotativo entre as keys disponíveis.
 * - Se uma key retornar 403 quotaExceeded: marca como esgotada + avança para a próxima.
 * - Keys esgotadas são restauradas automaticamente à meia-noite UTC (reset de quota do YouTube).
 * - Se TODAS as keys estiverem esgotadas: lança erro com mensagem clara.
 */
class ApiKeyRotator {
  private keys:      string[]  = [];
  private exhausted: Set<number> = new Set();  // índices de keys esgotadas
  private current:   number    = 0;

  constructor() {
    this._loadKeys();
    // Hot reload: atualiza lista de keys quando configuração muda
    configEvents.on('configChanged', (key: string, value: string) => {
      if (key === 'YOUTUBE_API_KEY') this._loadKeys();
    });
    // Restaura keys esgotadas à meia-noite UTC
    this._scheduleMidnightReset();
  }

  /** Retorna a próxima key disponível. Lança se todas esgotadas. */
  next(): string {
    if (this.exhausted.size >= this.keys.length) {
      throw new Error('[YouTubeApi] Todas as API keys estão com quota esgotada. Aguardar reset à meia-noite UTC.');
    }
    // Avança até encontrar uma key não esgotada
    let attempts = 0;
    while (this.exhausted.has(this.current)) {
      this.current = (this.current + 1) % this.keys.length;
      if (++attempts > this.keys.length) break;
    }
    const key = this.keys[this.current];
    this.current = (this.current + 1) % this.keys.length;
    return key;
  }

  /** Marca a key de índice anterior como esgotada. */
  markCurrentExhausted(): void {
    const exhaustedIdx = (this.current - 1 + this.keys.length) % this.keys.length;
    this.exhausted.add(exhaustedIdx);
    logger.warn(`[YouTubeApi] API key índice ${exhaustedIdx} marcada como esgotada. ` +
                `${this.keys.length - this.exhausted.size} key(s) restantes.`);
  }

  private _loadKeys(): void {
    const raw = getConfig('YOUTUBE_API_KEY') ?? '';
    // Aceita múltiplas keys separadas por vírgula (Tag Input na UI)
    this.keys = raw.split(',').map(k => k.trim()).filter(Boolean);
    this.exhausted.clear();
    this.current = 0;
    logger.info(`[YouTubeApi] ${this.keys.length} API key(s) carregada(s).`);
  }

  private _scheduleMidnightReset(): void {
    const now = new Date();
    const nextMidnightUtc = new Date(Date.UTC(
      now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1
    ));
    const msUntilMidnight = nextMidnightUtc.getTime() - now.getTime();
    setTimeout(() => {
      this.exhausted.clear();
      logger.info('[YouTubeApi] Reset de quota à meia-noite UTC. Todas as keys restauradas.');
      this._scheduleMidnightReset(); // reagenda para o próximo dia
    }, msUntilMidnight);
  }
}

// ─── YouTubeApi ───────────────────────────────────────────────────────────────

export class YouTubeApi {
  private rotator = new ApiKeyRotator();

  // Cache em memória: channelId → uploadsPlaylistId
  // Evita chamar channels.list repetidamente para obter o mesmo playlistId
  private uploadsCache = new Map<string, string>();

  // ─── Método auxiliar: cria cliente YouTube com a próxima key ─────────────

  private _client(): youtube_v3.Youtube {
    return google.youtube({ version: 'v3', auth: this.rotator.next() });
  }

  /**
   * Wrapper para chamadas à API com tratamento de quotaExceeded.
   * Se a chamada falhar com 403: marca key como esgotada e tenta novamente com a próxima.
   * Outras falhas são relançadas imediatamente.
   */
  private async _call<T>(fn: (yt: youtube_v3.Youtube) => Promise<T>): Promise<T> {
    const maxAttempts = 3; // tenta no máximo 3 keys antes de desistir
    for (let i = 0; i < maxAttempts; i++) {
      try {
        return await fn(this._client());
      } catch (err: unknown) {
        const status = (err as { code?: number })?.code;
        if (status === 403) {
          logger.warn(`[YouTubeApi] quotaExceeded na tentativa ${i + 1}. Trocando key...`);
          this.rotator.markCurrentExhausted();
          continue; // tenta próxima key
        }
        throw err; // outro erro: propaga imediatamente
      }
    }
    throw new Error('[YouTubeApi] Falhou após múltiplas tentativas com keys diferentes.');
  }

  // ─── Resolução de @handles ────────────────────────────────────────────────

  /**
   * Resolve @handle → channelId usando search.list.
   * Resultado deve ser cacheado no banco (campo `resolved_handles` do meta) com TTL de
   * RESOLVE_HANDLES_TTL_HOURS horas para não desperdiçar quota.
   */
  async resolveHandle(handle: string): Promise<{ channelId: string; title: string } | null> {
    try {
      const res = await this._call(yt =>
        yt.search.list({ part: ['id', 'snippet'], q: handle, type: ['channel'], maxResults: 1 })
      );
      const item = res.data.items?.[0];
      if (!item) return null;
      const channelId = item.id?.channelId;
      const title     = item.snippet?.channelTitle;
      if (!channelId || !title) return null;
      return { channelId, title };
    } catch (err) {
      logger.error(`[YouTubeApi] Erro ao resolver handle "${handle}":`, err);
      return null;
    }
  }

  /**
   * Obtém uploadsPlaylistId de um canal.
   * Resultado é cacheado em memória (uploadsCache) durante a vida do processo.
   */
  async getUploadsPlaylistId(channelId: string): Promise<string | null> {
    if (this.uploadsCache.has(channelId)) return this.uploadsCache.get(channelId)!;
    try {
      const res = await this._call(yt =>
        yt.channels.list({ part: ['contentDetails'], id: [channelId], maxResults: 1 })
      );
      const playlistId = res.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
      if (playlistId) {
        this.uploadsCache.set(channelId, playlistId);
        return playlistId;
      }
      return null;
    } catch (err) {
      logger.error(`[YouTubeApi] Erro ao obter uploadsPlaylistId para ${channelId}:`, err);
      return null;
    }
  }

  // ─── fetchByPlaylistItems ─────────────────────────────────────────────────

  /**
   * Busca vídeos do canal via playlistItems (BARATO em quota — recomendado).
   *
   * PAGINAÇÃO COM PARADA ANTECIPADA (crítico para busca incremental):
   * - Itera páginas de 50 itens até não haver nextPageToken.
   * - Para cada item: compara publishedAt com publishedAfter.
   * - Se publishedAt <= publishedAfter: PARA a paginação imediatamente.
   *   Motivo: playlist está em ordem cronológica decrescente. Ao encontrar
   *   um vídeo mais antigo que o corte, todos os seguintes também serão.
   * - Limite hard: 40 páginas (2000 vídeos) para evitar loop infinito.
   *
   * Ao final: coleta todos os videoIds encontrados e chama fetchStreamsByIds().
   */
  async fetchByPlaylistItems(channelId: string, publishedAfter?: string): Promise<Stream[]> {
    const playlistId = await this.getUploadsPlaylistId(channelId);
    if (!playlistId) {
      logger.warn(`[YouTubeApi] Canal ${channelId} sem uploadsPlaylistId. Pulando.`);
      return [];
    }

    const publishedAfterDate = publishedAfter ? new Date(publishedAfter) : null;
    const videoIds = new Set<string>();
    let pageToken: string | undefined;
    let pageCount = 0;
    let stoppedEarly = false;
    const MAX_PAGES = 40;

    while (true) {
      pageCount++;
      try {
        const res = await this._call(yt =>
          yt.playlistItems.list({
            part: ['snippet'],
            playlistId,
            maxResults: 50,
            ...(pageToken ? { pageToken } : {}),
          })
        );

        const items = res.data.items ?? [];
        let stopPagination = false;

        for (const item of items) {
          const vid         = item.snippet?.resourceId?.videoId;
          const publishedAt = item.snippet?.publishedAt;

          // Parada antecipada: item mais antigo que o corte
          if (publishedAfterDate && publishedAt) {
            const itemDate = new Date(publishedAt);
            if (itemDate <= publishedAfterDate) {
              stopPagination = true;
              stoppedEarly   = true;
              logger.debug(`[YouTubeApi] Paginação interrompida em ${vid} (${publishedAt} <= publishedAfter)`);
              break; // para de processar itens desta página
            }
          }

          if (vid) videoIds.add(vid);
        }

        if (stopPagination) break;

        pageToken = res.data.nextPageToken ?? undefined;
        if (!pageToken) break;
        if (pageCount >= MAX_PAGES) {
          logger.warn(`[YouTubeApi] Limite de ${MAX_PAGES} páginas atingido para playlist ${playlistId}.`);
          break;
        }
      } catch (err) {
        logger.error(`[YouTubeApi] Erro em playlistItems pág ${pageCount} (${playlistId}):`, err);
        break; // erro numa página: encerra paginação deste canal, continua o próximo
      }
    }

    logger.debug(
      `[YouTubeApi] playlistItems ${playlistId}: ${videoIds.size} IDs coletados ` +
      `em ${pageCount} pág (${stoppedEarly ? 'parada antecipada' : 'completo'}).`
    );

    return this.fetchStreamsByIds(Array.from(videoIds));
  }

  // ─── fetchBySearch ────────────────────────────────────────────────────────

  /**
   * Busca vídeos do canal via search.list (CARO em quota — usar só se USE_PLAYLIST_ITEMS=false).
   *
   * DIFERENÇA da paginação vs. playlistItems:
   * - search.list NÃO retorna publishedAt por item na resposta de ID.
   * - A parada antecipada não é possível — sempre percorre todas as páginas.
   * - Limite hard: 20 páginas (1000 vídeos).
   */
  async fetchBySearch(channelId: string, publishedAfter?: string): Promise<Stream[]> {
    const videoIds = new Set<string>();
    let pageToken: string | undefined;
    let pageCount = 0;
    const MAX_PAGES = 20;

    while (true) {
      pageCount++;
      try {
        const res = await this._call(yt =>
          yt.search.list({
            part: ['id'],
            channelId,
            type:       ['video'],
            maxResults: 50,
            ...(publishedAfter ? { publishedAfter } : {}),
            ...(pageToken      ? { pageToken }      : {}),
          })
        );

        for (const item of res.data.items ?? []) {
          const vid = item.id?.videoId;
          if (vid) videoIds.add(vid);
        }

        pageToken = res.data.nextPageToken ?? undefined;
        if (!pageToken) break;
        if (pageCount >= MAX_PAGES) {
          logger.warn(`[YouTubeApi] Limite de ${MAX_PAGES} páginas atingido para search canal ${channelId}.`);
          break;
        }
      } catch (err) {
        logger.error(`[YouTubeApi] Erro em search.list pág ${pageCount} (canal ${channelId}):`, err);
        break;
      }
    }

    return this.fetchStreamsByIds(Array.from(videoIds));
  }

  // ─── fetchStreamsByIds ────────────────────────────────────────────────────

  /**
   * Busca detalhes completos de até N videoIds em batches de 50.
   *
   * COMPORTAMENTO DE FALHA POR BATCH:
   * - Se um batch falhar: loga o erro e CONTINUA com o próximo batch.
   * - Nunca aborta todos os batches por falha em um.
   * - Retorna todos os streams coletados até o ponto de falha.
   *
   * PARTES NECESSÁRIAS: snippet + liveStreamingDetails + contentDetails
   */
  async fetchStreamsByIds(videoIds: string[]): Promise<Stream[]> {
    if (videoIds.length === 0) return [];

    const results: Stream[] = [];
    logger.info(`[YouTubeApi] Buscando detalhes de ${videoIds.length} stream(s) em batches de 50.`);

    for (let i = 0; i < videoIds.length; i += 50) {
      const batch = videoIds.slice(i, i + 50);
      try {
        const res = await this._call(yt =>
          yt.videos.list({
            part: ['snippet', 'liveStreamingDetails', 'contentDetails'],
            id:   batch,
          })
        );
        for (const item of res.data.items ?? []) {
          const stream = this._formatStreamData(item);
          if (stream) results.push(stream);
        }
      } catch (err) {
        logger.error(`[YouTubeApi] Erro no batch ${Math.floor(i / 50) + 1}. Continuando...`, err);
        // NÃO relança — continua com o próximo batch
      }
    }

    logger.info(`[YouTubeApi] ${results.length} stream(s) retornados.`);
    return results;
  }

  // ─── _formatStreamData ────────────────────────────────────────────────────

  /**
   * Converte um item da YouTube API para o tipo Stream interno.
   *
   * REGRAS DE PARSING (não alterar sem testar):
   *
   * videoId:
   *   - item.id pode ser string (videos.list) ou objeto { videoId } (search.list).
   *   - Tratar ambos os casos.
   *
   * status:
   *   - Vem de snippet.liveBroadcastContent.
   *   - Valores possíveis: 'live' | 'upcoming' | 'none'.
   *   - Nunca deixar undefined — usar 'none' como fallback.
   *
   * thumbnailUrl (hierarquia de fallback — nesta ordem):
   *   maxres → standard → high → medium → default → ''
   *   Usar sempre a maior resolução disponível.
   *
   * Timestamps (todos via liveStreamingDetails):
   *   - scheduledStart: scheduledStartTime
   *   - actualStart:    actualStartTime
   *   - actualEnd:      actualEndTime
   *   - Parsear com new Date(str). Se inválido ou ausente: null.
   *
   * categoryId:
   *   - snippet.categoryId — string numérica, ex: "17".
   *   - Pode ser ausente: null.
   */
  private _formatStreamData(item: youtube_v3.Schema$Video): Stream | null {
    const snippet = item.snippet ?? {};
    const live    = item.liveStreamingDetails ?? {};

    // videoId: pode vir como string ou objeto dependendo do endpoint
    let videoId = item.id as string | undefined;
    if (typeof videoId === 'object' && videoId !== null) {
      videoId = (videoId as { videoId?: string }).videoId;
    }
    if (!videoId) {
      logger.warn('[YouTubeApi] Item sem videoId ignorado.');
      return null;
    }

    // Thumbnail: hierarquia maxres → standard → high → medium → default
    const thumbs = snippet.thumbnails ?? {};
    const thumbnailUrl =
      thumbs.maxres?.url   ??
      thumbs.standard?.url ??
      thumbs.high?.url     ??
      thumbs.medium?.url   ??
      thumbs.default?.url  ??
      '';

    // Parser de data ISO 8601
    const parseDate = (str: string | null | undefined): Date | null => {
      if (!str) return null;
      const d = new Date(str);
      return isNaN(d.getTime()) ? null : d;
    };

    return {
      videoId,
      channelId:     snippet.channelId     ?? '',
      channelName:   snippet.channelTitle  ?? '',
      titleOriginal: snippet.title         ?? '',
      description:   snippet.description  ?? '',
      categoryId:    snippet.categoryId   ?? null,
      watchUrl:      `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl,

      // liveBroadcastContent: 'live' | 'upcoming' | 'none' (nunca undefined)
      status: (snippet.liveBroadcastContent as Stream['status']) ?? 'none',

      scheduledStart: parseDate(live.scheduledStartTime),
      actualStart:    parseDate(live.actualStartTime),
      actualEnd:      parseDate(live.actualEndTime),

      fetchTime: new Date(),
      lastSeen:  new Date(),
    };
  }
}
```

---

### Validação de Canal

Ao adicionar um canal via UI, o sistema:
1. Detecta se o input é `@handle` ou `Channel ID`
2. Chama `YouTubeApi.resolveHandle()` para validar e obter channelId + title
3. Chama `YouTubeApi.getUploadsPlaylistId()` para obter o uploadsPlaylistId
4. Salva no banco somente após ambas as chamadas retornarem com sucesso
5. Exibe erro inline se o canal não for encontrado

### Round-Robin de API Keys

Gerenciado pela classe `ApiKeyRotator` dentro de `youtube-api.ts` (skeleton acima):
- Múltiplas keys configuradas como lista separada por vírgula no banco (Tag Input na UI)
- Rodízio automático a cada chamada via `rotator.next()`
- Key com `403 quotaExceeded` marcada como esgotada via `rotator.markCurrentExhausted()`
- Reset automático de todas as keys à meia-noite UTC (horário de reset da quota do YouTube)

---

## 7. Smart Player — Roteamento Inteligente

O Smart Player é um servidor de proxy HTTP que recebe uma URL e decide automaticamente como servi-la ao player IPTV.

### Endpoint

```
GET /api/stream/:videoId
```

### Fluxo de Roteamento

```
Recebe requisição → consulta state_cache.json → decide ação:

  status = 'live' AND actual_start_time_utc existe AND actual_end_time_utc NÃO existe
      │
      └─▶ STREAMLINK (melhor qualidade → pipe MPEG-TS)
              │
              └─ Se falhar → fallback para YT-DLP

  status = 'none' OR (status = 'live' AND não é genuinamente live)
      │
      └─▶ YT-DLP (VOD → pipe MPEG-TS)

  status = 'upcoming'
      │
      └─▶ FFMPEG PLACEHOLDER
              │
              ├─ Carrega thumbnail do canal/vídeo
              ├─ Overlay linha 1: "Ao vivo em Xh Ym" (de textos_epg.json)
              └─ Overlay linha 2: "15 Mar às 20:00"

  status desconhecido / não encontrado no cache
      └─▶ FFMPEG PLACEHOLDER (imagem genérica PLACEHOLDER_IMAGE_URL)
```

### Módulos do Smart Player

| Módulo | Arquivo | Responsabilidade |
|---|---|---|
| Router | `smart-player.ts` | Lê cache, decide qual runner chamar |
| FFmpeg Runner | `ffmpeg-runner.ts` | Gera stream MPEG-TS a partir de imagem + overlay de texto |
| Streamlink Runner | `streamlink-runner.ts` | Captura live do YouTube com cookies + UA |
| yt-dlp Runner | `ytdlp-runner.ts` | Download/stream de VOD com cookies + UA; fallback do streamlink |
| Credentials Manager | `credentials-manager.ts` | Resolve qual cookie file e UA usar por plataforma/canal |

### Cookies e User-Agent nos Runners

O YouTube frequentemente requer autenticação para acessar streams com restrições. Os runners recebem as credenciais corretas via `CredentialsManager` antes de despachar o processo.

**Streamlink — flags de autenticação:**

```bash
streamlink \
  --stdout \
  --http-header    "User-Agent=<UA_SELECIONADO>" \
  --http-cookie-jar "/data/cookies/youtube.txt" \   # se cookie ativo para YouTube
  --config /dev/null \
  --no-plugin-sideloading \
  <URL> best
```

**yt-dlp — flags de autenticação:**

```bash
yt-dlp \
  -f best \
  -o - \
  --user-agent    "<UA_SELECIONADO>" \
  --cookies       "/data/cookies/youtube.txt" \      # se cookie ativo para YouTube
  <URL>
```

**Lógica de resolução de credenciais (`credentials-manager.ts`):**

```
resolveCredentials(platform: 'youtube' | 'dailymotion' | 'soultv')
  │
  ├─ Lê tabela `credentials` do banco
  ├─ Filtra por plataforma + tipo 'cookie' + status 'ativo'
  │    └─ Retorna caminho do arquivo (ex: /data/cookies/youtube.txt)
  │         ou null se não configurado / inativo
  │
  └─ Filtra por tipo 'user-agent' + status 'ativo'
       └─ Retorna string do UA selecionado como padrão
            ou fallback para "Mozilla/5.0" se não configurado
```

**Schema da tabela `credentials`:**

```sql
CREATE TABLE credentials (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  platform    TEXT NOT NULL,          -- 'youtube', 'dailymotion', 'soultv'
  type        TEXT NOT NULL,          -- 'cookie', 'user-agent'
  label       TEXT,                   -- nome amigável (ex: "Chrome 145 Win10")
  value       TEXT,                   -- UA string ou caminho do arquivo
  active      INTEGER DEFAULT 1,      -- 0 = inativo, 1 = ativo
  is_default  INTEGER DEFAULT 0,      -- 1 = usado por padrão (apenas 1 por tipo/platform)
  created_at  TEXT DEFAULT (datetime('now'))
);
```

### Página Dedicada: Smart Player (`/settings/player`)

Uma sub-página de Configurações exclusiva para gerenciar e monitorar o Smart Player.

**Sub-menu de Configurações atualizado:**

```
⚙️  Configurações
    ├── API & Credenciais
    ├── Agendador
    ├── Conteúdo & Filtros
    ├── Formato de Títulos
    ├── Retenção (VOD)
    ├── Mídia & Placeholders
    ├── Smart Player          ← NOVA
    ├── Técnico
    └── Logs
```

**Conteúdo da página `/settings/player`:**

**Seção: Cookies por Plataforma**

Tabela com uma linha por plataforma suportada:

| Plataforma | Arquivo | Status | Ações |
|---|---|---|---|
| YouTube | `youtube.txt` (450 KB) | 🟢 Ativo | Upload / Excluir / Toggle |
| Dailymotion | *(não configurado)* | ⚪ Inativo | Upload |
| SoulTV | *(não configurado)* | ⚪ Inativo | Upload |

- **Upload:** input `type="file"` → arquivo salvo em `/data/cookies/<plataforma>.txt`
- **Excluir:** remove o arquivo físico + limpa o registro no banco (com confirmação)
- **Toggle:** marca como ativo/inativo sem excluir o arquivo

**Seção: User-Agents**

Lista editável (Tag Input) com os UAs disponíveis:

- Cada UA é uma tag com botão `×` para excluir
- Um UA pode ser marcado como **padrão** (estrela ★) — é o usado por padrão nos runners
- Os demais ficam disponíveis para uso manual futuro (rotação planejada)
- Campo de texto para adicionar novo UA + botão Adicionar

**Seção: Teste de Conectividade**

Painel para testar se as credenciais configuradas funcionam antes de usar em produção:

- Input: URL de um vídeo YouTube
- Botão: **Testar com Streamlink** → exibe o comando montado e o resultado (sucesso/erro)
- Botão: **Testar com yt-dlp** → idem
- Output: log inline do teste em tempo real (sem iniciar stream completo, apenas `--simulate`)

```bash
# Exemplo de teste não-destrutivo com yt-dlp:
yt-dlp --simulate --user-agent "<UA>" --cookies "/data/cookies/youtube.txt" <URL>
# Retorna: título do vídeo, formato selecionado, URL resolvida — sem baixar nada

# Exemplo de teste com streamlink:
streamlink --http-header "User-Agent=<UA>" --http-cookie-jar "/data/cookies/youtube.txt" \
  --config /dev/null --no-plugin-sideloading <URL> best --url
# Retorna: URL do stream resolvida — sem abrir pipe
```

### Parâmetros do FFmpeg Placeholder

Perfil otimizado para **baixo consumo de CPU** — adequado para imagem estática em loop:

```
ffmpeg
  -loglevel error
  -re
  -user_agent <UA>
  -loop 1 -i <imageUrl>              # loop nativo (-loop 1 substitui loop=-1:1:0 no filter)
  -f lavfi -i anullsrc=r=44100:cl=stereo
  -filter_complex "[0:v]scale=1280:720,<drawtext>[v]"
  -map [v] -map 1:a
  -c:v libx264
    -preset ultrafast                # encoder mais rápido disponível no libx264
    -tune stillimage                 # otimiza para quadros estáticos (reduz motion estimation)
    -r 1                             # 1 fps — suficiente para imagem parada; reduz carga ~25x vs 25fps
    -g 2                             # GOP curto (2 frames) para seek rápido no player
    -crf 35                          # qualidade mais baixa aceitável (padrão=23); menos bits = menos CPU
    -pix_fmt yuv420p
  -c:a aac -b:a 64k                  # 64k é suficiente para áudio silencioso (anullsrc)
  -f mpegts pipe:1
```

**Resumo das otimizações vs. perfil original:**

| Parâmetro | Original | Otimizado | Impacto |
|---|---|---|---|
| `-r` (framerate) | 25 fps | 1 fps | ~96% menos frames para encodar |
| `-crf` | padrão (23) | 35 | Menor bitrate → menos CPU de saída |
| `-b:a` (áudio) | 128k | 64k | Metade do bitrate para silêncio |
| `-loop` | via filter_complex | `-loop 1` input flag | Mais eficiente (sem redecodificação) |
| `-shortest` | presente | removido | Desnecessário com `-loop 1` explícito |

> O player IPTV (Kodi/VLC) interpreta normalmente um stream a 1 fps como imagem parada. A economia de CPU é significativa em servidores com múltiplos canais simultâneos em "upcoming".

### Escape de Caracteres para FFmpeg drawtext

Os seguintes caracteres devem ser escapados antes de inserir texto no filtro `drawtext`:

| Caractere | Escape |
|---|---|
| `\` | `\\` |
| `'` | `\'` |
| `:` | `\:` |
| `%` | `%%` |
| `,` | `\,` |

### Health Monitor

O Smart Player implementa auto-restart de processos filhos:
- Se `streamlink` falhar (código de saída ≠ 0), tenta `yt-dlp` automaticamente
- Se `ffmpeg` falhar, loga o erro e encerra a requisição com status 502

---

## 8. Formato de Saída — M3U e EPG

### Playlist Direta (modo `direct`)

```m3u
#EXTM3U
#EXTINF:-1 tvg-id="UCxxxxxx" tvg-name="[AO VIVO] CAZÉ TV - Título do Evento" tvg-logo="https://yt3.ggpht.com/thumb" group-title="ESPORTES",[AO VIVO] CAZÉ TV - Título do Evento
https://www.youtube.com/watch?v=VIDEO_ID
```

### Playlist Proxy (modo `proxy`)

```m3u
#EXTM3U
#EXTINF:-1 tvg-id="UCxxxxxx" tvg-name="[AO VIVO] CAZÉ TV - Título do Evento" tvg-logo="http://localhost:8888/api/thumbnail/VIDEO_ID" group-title="ESPORTES",[AO VIVO] CAZÉ TV - Título do Evento
http://localhost:8888/api/stream/VIDEO_ID
```

### Placeholder Invisível

Quando `USE_INVISIBLE_PLACEHOLDER = true` e não há stream ativo, a URL do placeholder é inserida como comentário para torná-la invisível ao player IPTV:

```m3u
#EXTINF:-1 ...,Canal Sem Transmissão
#http://localhost:8888/api/stream/VIDEO_ID
```

### Endpoints de Playlist

```
GET /live.m3u           → playlist ao vivo (direct)
GET /live-proxy.m3u     → playlist ao vivo (proxy)
GET /upcoming.m3u       → playlist agendados (direct)
GET /upcoming-proxy.m3u → playlist agendados (proxy)
GET /vod.m3u            → playlist gravados (direct)
GET /vod-proxy.m3u      → playlist gravados (proxy)
GET /epg.xml            → guia de programação XMLTV
```

---

## 9. Containerização

### Dockerfile (Multi-stage)

```dockerfile
# ── Stage 1: Build TypeScript ────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src/ ./src/
RUN npm run build

# ── Stage 2: Runtime ─────────────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app

# Ferramentas externas
RUN apk add --no-cache ffmpeg python3 py3-pip curl && \
    pip3 install --break-system-packages streamlink yt-dlp

# Dependências de produção
COPY package*.json ./
RUN npm ci --omit=dev

# Aplicação compilada
COPY --from=builder /app/dist ./dist
COPY public/ ./public/

# Volume para dados persistentes
VOLUME ["/data"]
ENV NODE_ENV=production
EXPOSE 8888

CMD ["node", "dist/server.js"]
```

### docker-compose.yml

```yaml
version: "3.9"

services:
  tubewranglerr:
    build: .
    container_name: tubewranglerr
    restart: unless-stopped
    ports:
      - "8888:8888"
    volumes:
      - ./data:/data          # Persistência: banco SQLite, caches
      - ./.env:/app/.env:ro   # Seed de configuração (somente leitura)
    environment:
      - NODE_ENV=production
      - TZ=America/Sao_Paulo
```

---

## 10. Fluxo de Funcionamento Completo

```
INICIALIZAÇÃO DO CONTAINER
        │
        ▼
Lê .env → popula banco se vazio (seed)
        │
        ▼
Resolve @handles dos canais → obtém Channel IDs + títulos
        │
        ▼
Carrega state_cache.json (se existir)
        │
        ├─ Cache vazio? → Executa busca inicial síncrona (INITIAL_SYNC_DAYS)
        └─ Cache existente? → Usa dados carregados, aguarda próximo ciclo
        │
        ▼
Inicia servidor Express (porta 8888)
Inicia WebSocket de logs
Inicia Agendador (node-cron)
        │
        │    ┌──────────────────────────────────────┐
        └───►│         LOOP DO AGENDADOR             │
             │                                      │
             │ A cada SCHEDULER_MAIN_INTERVAL_HOURS  │
             │   → Busca novos streams por canal     │
             │   → Atualiza state_cache.json         │
             │   → Regenera M3U + EPG                │
             │   → Gera textos_epg.json              │
             │                                      │
             │ Para cada evento upcoming na janela:  │
             │   → Verifica a cada PRE_EVENT_INTERVAL│
             │                                      │
             │ Para cada stream live:                │
             │   → Verifica a cada POST_EVENT_INTERVAL│
             └──────────────────────────────────────┘

USUÁRIO (Kodi / VLC / Jellyfin)
        │
        ├─ Importa /live.m3u (direct)
        │    └─ Player abre URL YouTube diretamente
        │
        └─ Importa /live-proxy.m3u (proxy)
             └─ Player abre /api/stream/VIDEO_ID
                  └─ Smart Player decide:
                       ├─ Live?     → streamlink → MPEG-TS
                       ├─ VOD?      → yt-dlp → MPEG-TS
                       └─ Upcoming? → ffmpeg placeholder → MPEG-TS em loop
```

---

## 11. Plano de Implantação por Fases

> **Instruções para o Agente:**
> - Verificar `PROGRESS.md` antes de começar — identificar a última fase concluída e continuar a partir dela.
> - Cada fase deve ser implementada em um PR separado no branch `dev`.
> - Só avançar para a próxima fase após **todos** os comandos do Ponto de Verificação retornarem os resultados esperados.
> - Ao concluir cada fase: atualizar `PROGRESS.md` marcando o status como ✅ com a data atual.
> - Se uma decisão de implementação não estiver coberta por este documento, registrá-la na seção "Decisões tomadas" do `PROGRESS.md` antes de prosseguir.

---

### Fase 1 — Scaffolding

**Objetivo:** Projeto funcional vazio. Container sobe e porta responde.

**Tarefas:**
1. Criar `package.json` com o conteúdo **exato** abaixo — não alterar versões
2. Instalar dependências: `npm ci`
3. Criar `tsconfig.json` com o conteúdo exato abaixo
4. Criar `src/server.ts` com Express mínimo (rota `GET /health`)
5. Criar `Dockerfile` e `docker-compose.yml` (ver Seção 9)
6. Criar `.env.example` com todas as variáveis documentadas (sem valores reais)
7. Criar `.gitignore` (excluir: `node_modules/`, `dist/`, `data/`, `.env`)
8. Criar `PROGRESS.md` (ver template no final desta fase)
9. Copiar scripts legado para `DOC/`

**`package.json` — versões fixas obrigatórias:**

```json
{
  "name": "tubewranglerr",
  "version": "1.0.0",
  "description": "YouTube stream aggregator with M3U/EPG output",
  "main": "dist/server.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "ts-node src/server.ts",
    "format": "prettier --write ."
  },
  "dependencies": {
    "better-sqlite3": "9.4.3",
    "dotenv": "16.4.5",
    "express": "4.18.3",
    "googleapis": "140.0.1",
    "multer": "1.4.5-lts.1",
    "node-cron": "3.0.3",
    "winston": "3.13.0",
    "ws": "8.17.0"
  },
  "devDependencies": {
    "@types/better-sqlite3": "7.6.9",
    "@types/express": "4.17.21",
    "@types/multer": "1.4.11",
    "@types/node": "20.12.7",
    "@types/node-cron": "3.0.11",
    "@types/ws": "8.5.10",
    "prettier": "3.2.5",
    "supertest": "7.0.0",
    "@types/supertest": "6.0.2",
    "typescript": "5.4.5"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

> ⚠️ **O Agente não deve adicionar, remover ou alterar versões de dependências sem instrução explícita.** Versões sem `^` ou `~` são intencionais para garantir builds reproduzíveis.

**`tsconfig.json` obrigatório:**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**`PROGRESS.md` — template inicial:**

```markdown
# TubeWranglerr — Progress Tracker

> Atualizado pelo Agente ao concluir cada fase.
> NÃO editar manualmente.

## Status das Fases

| Fase | Descrição | Status | Concluída em |
|------|-----------|--------|--------------|
| 1 | Scaffolding | ✅ Concluída | YYYY-MM-DD |
| 2 | Banco + ConfigManager + Auth | ⏳ Pendente | — |
| 3 | YouTube API + Stream Fetcher | ⏳ Pendente | — |
| 4 | Gerador M3U + EPG | ⏳ Pendente | — |
| 5 | Agendador Inteligente | ⏳ Pendente | — |
| 6 | Smart Player + Credenciais | ⏳ Pendente | — |
| 7 | API REST Completa | ⏳ Pendente | — |
| 8 | UI — Layout + Páginas principais | ⏳ Pendente | — |
| 9 | UI — Configurações + Logs + Smart Player | ⏳ Pendente | — |
| 10 | Docker + Testes + Polimento | ⏳ Pendente | — |

## Decisões tomadas durante implementação

<!-- O Agente registra aqui qualquer decisão de implementação não coberta pelo documento -->

## Problemas encontrados e soluções

<!-- O Agente registra aqui erros relevantes e como foram resolvidos -->
```

> **Instrução para o Agente:** Ao iniciar cada fase, verificar `PROGRESS.md` para saber o estado atual. Ao concluir uma fase, atualizar o status para ✅ com a data. Se retomar após interrupção, continuar a partir da última fase ⏳.

**Ponto de verificação:**
```bash
docker compose up --build
curl http://localhost:8888/health
# Resposta esperada: {"status":"ok","version":"1.0.0"}
# PROGRESS.md deve existir com Fase 1 marcada como ✅
```

---

### Fase 2 — Banco de Dados, ConfigManager e Auth

**Objetivo:** Banco SQLite inicializado com seed do `.env`. ConfigManager com hot reload. Sistema de autenticação funcional.

**Tarefas:**
1. Adicionar ao `package.json`: `express-session: 1.18.0`, `bcrypt: 5.1.1`, `@types/bcrypt: 5.0.2`, `@types/express-session: 1.18.0`
2. Criar `src/core/db.ts` — inicialização SQLite + migrations automáticas com o schema completo abaixo
3. Criar `src/core/config-manager.ts` — get/set/reset com EventEmitter para hot reload (ver Seção 2 — Decisões Técnicas)
4. Criar `src/api/routes/auth.ts` — login, logout, me, troca de senha
5. Criar middleware `src/api/middleware/auth.ts` — protege rotas `/api/*` exceto login e health
6. Lógica de seed: lê `.env` → insere em `settings` se tabela vazia
7. Lógica de primeiro acesso: se `auth_users` vazia → criar admin padrão + flag `must_change_password = 1`
8. Popular `channels` com `TARGET_CHANNEL_HANDLES` e `TARGET_CHANNEL_IDS` do seed (somente se tabela vazia)

**Schema SQL completo — `src/core/db.ts`:**

```sql
-- Configurações do sistema (fonte de verdade para todas as variáveis)
CREATE TABLE IF NOT EXISTS settings (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  updated_at  TEXT DEFAULT (datetime('now'))
);

-- Canais do YouTube monitorados
CREATE TABLE IF NOT EXISTS channels (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  channel_id          TEXT NOT NULL UNIQUE,
  handle              TEXT,
  title               TEXT NOT NULL,
  thumbnail_url       TEXT,
  uploads_playlist_id TEXT,
  status              TEXT NOT NULL DEFAULT 'active', -- 'active' | 'frozen' | 'not_found'
  created_at          TEXT DEFAULT (datetime('now')),
  updated_at          TEXT DEFAULT (datetime('now'))
);

-- Espelho de leitura dos streams (atualizado pelo Scheduler; SmartPlayer usa state_cache.json)
CREATE TABLE IF NOT EXISTS streams (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  video_id        TEXT NOT NULL UNIQUE,
  channel_id      TEXT NOT NULL REFERENCES channels(channel_id),
  title           TEXT NOT NULL,
  status          TEXT NOT NULL,   -- 'live' | 'upcoming' | 'none' (recorded)
  scheduled_start TEXT,            -- ISO 8601 UTC
  actual_start    TEXT,            -- ISO 8601 UTC
  actual_end      TEXT,            -- ISO 8601 UTC
  thumbnail_url   TEXT,
  category_id     TEXT,
  created_at      TEXT DEFAULT (datetime('now')),
  updated_at      TEXT DEFAULT (datetime('now'))
);

-- Credenciais: cookies e user-agents por plataforma
CREATE TABLE IF NOT EXISTS credentials (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  platform    TEXT NOT NULL,           -- 'youtube' | 'dailymotion' | 'soultv'
  type        TEXT NOT NULL,           -- 'cookie' | 'user-agent'
  label       TEXT,                    -- nome amigável (ex: "Chrome 145 Win10")
  value       TEXT NOT NULL,           -- UA string ou caminho do arquivo cookie
  active      INTEGER NOT NULL DEFAULT 1,    -- 0 = inativo, 1 = ativo
  is_default  INTEGER NOT NULL DEFAULT 0,    -- 1 = padrão (único por tipo+platform)
  created_at  TEXT DEFAULT (datetime('now'))
);

-- Usuários da interface web
CREATE TABLE IF NOT EXISTS auth_users (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  username             TEXT NOT NULL UNIQUE,
  password_hash        TEXT NOT NULL,         -- bcrypt hash
  must_change_password INTEGER NOT NULL DEFAULT 0,  -- 1 = forçar troca no próximo login
  created_at           TEXT DEFAULT (datetime('now')),
  updated_at           TEXT DEFAULT (datetime('now'))
);
```

**Ponto de verificação:**
```bash
docker compose up --build

# Banco criado com todas as tabelas:
docker exec tubewranglerr sqlite3 /data/tubewranglerr.db ".tables"
# Esperado: auth_users  channels  credentials  settings  streams

# Usuário admin criado:
docker exec tubewranglerr sqlite3 /data/tubewranglerr.db \
  "SELECT username, must_change_password FROM auth_users;"
# Esperado: admin|1

# Login funciona:
curl -c cookies.txt -X POST http://localhost:8888/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"tubewranglerr"}'
# Esperado: {"ok":true,"mustChangePassword":true}

# Rota protegida sem sessão retorna 401:
curl http://localhost:8888/api/channels
# Esperado: 401 Unauthorized

# PROGRESS.md atualizado com Fase 2 = ✅
```

---

### Fase 3 — YouTube API e Stream Fetcher

**Objetivo:** O sistema busca streams reais do YouTube e os salva no estado em memória.

> **Instrução ao Agente:** Os skeletons completos de `StateManager` e `YouTubeApi` estão na **Seção 6 — Lógica de Negócio**. Implementar os corpos dos métodos seguindo rigorosamente as regras documentadas — especialmente `updateStreams()`, `_pruneEndedStreams()`, `fetchByPlaylistItems()` e `_formatStreamData()`. Não existe `stream-fetcher.ts` separado — a orquestração é feita diretamente pelo `Scheduler` chamando `YouTubeApi`.

**Tarefas:**
1. Criar `src/core/youtube-api.ts` — implementar skeleton completo da Seção 6
2. Criar `src/core/state-manager.ts` — implementar skeleton completo da Seção 6
3. Implementar `saveEpgTexts()` usando o algoritmo abaixo
4. Na inicialização em `server.ts`: chamar `state.loadFromDisk()` e capturar o boolean retornado para passar `applyInitialDelay` ao Scheduler na Fase 5

**Algoritmo de geração do `textos_epg.json`:**

Este arquivo é lido pelo Smart Player para exibir o countdown em streams "upcoming". O algoritmo deve ser portado **fielmente** do `DOC/get_streams.py`.

```typescript
// src/core/state-manager.ts — função generateEpgTexts()

interface EpgTexts {
  line1: string; // ex: "Ao vivo em 2h 15m"
  line2: string; // ex: "15 Mar às 20:00"
}

const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

function generateEpgTexts(
  scheduledStartUtc: Date,  // data de início do evento (UTC)
  localTimezone: string     // ex: "America/Sao_Paulo"
): EpgTexts {
  const nowUtc = new Date();
  const deltaMs = scheduledStartUtc.getTime() - nowUtc.getTime();
  const totalSeconds = Math.floor(deltaMs / 1000);

  let line1 = '';

  if (totalSeconds > 0) {
    const days    = Math.floor(totalSeconds / 86400);
    const hours   = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (days > 1)       line1 = `Ao vivo em ${days}d ${hours}h`;
    else if (days === 1) line1 = `Ao vivo em 1d ${hours}h`;
    else if (hours > 0) line1 = `Ao vivo em ${hours}h ${minutes}m`;
    else if (minutes > 0) line1 = `Ao vivo em ${minutes}m`;
    else                 line1 = 'Ao vivo em instantes';
  } else {
    line1 = 'Ao vivo em instantes'; // evento passou mas ainda não mudou para 'live'
  }

  // Formatar data local usando Intl.DateTimeFormat (sem dependência externa)
  const localDate = new Date(
    scheduledStartUtc.toLocaleString('en-US', { timeZone: localTimezone })
  );
  const day   = localDate.getDate();
  const month = MESES[localDate.getMonth()];
  const hhmm  = localDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit', hour12: false,
    timeZone: localTimezone
  });
  const line2 = `${day} ${month} às ${hhmm}`;

  return { line1, line2 };
}

// Gerar e salvar textos_epg.json para todos os streams 'upcoming':
function saveEpgTexts(streams: Stream[], localTimezone: string): void {
  const result: Record<string, EpgTexts> = {};
  for (const stream of streams) {
    if (stream.status !== 'upcoming') continue;
    const start = stream.scheduledStart ?? stream.actualStart;
    if (!start) continue;
    result[stream.videoId] = generateEpgTexts(new Date(start), localTimezone);
  }
  fs.writeFileSync(
    path.join(DATA_DIR, 'textos_epg.json'),
    JSON.stringify(result, null, 2),
    'utf-8'
  );
}
```

> `saveEpgTexts()` deve ser chamada pelo Scheduler **após cada ciclo de busca** e também **logo após a inicialização**. O Smart Player lê este arquivo do disco sem passar pelo StateManager.

**Ponto de verificação:**
```bash
docker compose up --build
# Após inicialização, data/state_cache.json deve conter streams
# Streams também presentes na tabela 'streams' do banco
# Log deve mostrar: "X streams encontrados para Y canais"
```

---

### Fase 4 — Gerador de Playlist (M3U + EPG)

**Objetivo:** Arquivos M3U e EPG gerados corretamente a partir dos dados do banco.

**Tarefas:**
1. Criar `src/core/playlist-generator.ts`:
   - `generateM3U(type: 'live'|'upcoming'|'vod', mode: 'direct'|'proxy')` → string M3U
   - `generateEPG()` → string XML
   - Aplicar `TITLE_FILTER_EXPRESSIONS`, `PREFIX_TITLE_WITH_STATUS`, `PREFIX_TITLE_WITH_CHANNEL_NAME`, `CHANNEL_NAME_MAPPINGS`
   - Suporte a `USE_INVISIBLE_PLACEHOLDER`
2. Criar endpoints de playlist em `src/api/routes/playlists.ts`:
   - `GET /live.m3u`, `GET /live-proxy.m3u`
   - `GET /upcoming.m3u`, `GET /upcoming-proxy.m3u`
   - `GET /vod.m3u`, `GET /vod-proxy.m3u`
   - `GET /epg.xml`

**Ponto de verificação:**
```bash
curl http://localhost:8888/live.m3u
# Resposta: arquivo M3U válido com #EXTM3U na primeira linha
curl http://localhost:8888/epg.xml
# Resposta: XML válido com tag <tv> raiz
vlc http://localhost:8888/live.m3u  # Deve carregar playlist
```

---

### Fase 5 — Agendador Inteligente

**Objetivo:** Orquestrador funcional implementado a partir do esqueleto da Seção 6, com todos os jobs operacionais.

> **Instrução ao Agente:** O esqueleto completo do `Scheduler` está na **Seção 6 — Lógica do Agendador Inteligente**. Implementar os corpos dos métodos seguindo rigorosamente os contratos e a ordem de execução definidos lá. Não inventar estrutura alternativa.

**Tarefas:**
1. Criar `src/core/scheduler.ts` — implementar corpos dos métodos do esqueleto (Seção 6)
2. Garantir que `StateManager` expõe todos os métodos listados nos contratos (Seção 6)
3. Garantir que `YouTubeApi` expõe todos os métodos listados nos contratos (Seção 6), incluindo batching automático de 50 IDs
4. Inicializar o `Scheduler` em `src/server.ts` após banco pronto, passando `applyInitialDelay = cacheExistiaAntes`
5. Criar `src/api/routes/scheduler.ts`:
   - `GET  /api/scheduler/status` — retorna `getStatus()`
   - `POST /api/scheduler/trigger` — chama `triggerNow()`
   - `POST /api/scheduler/pause` — chama `pause()`
   - `POST /api/scheduler/resume` — chama `resume()`

**Ponto de verificação:**
```bash
# Scheduler iniciou:
docker compose logs -f | grep "\[Scheduler\]"
# Esperado: "Loop iniciado. Tick a cada 60s" + "Iniciando busca principal"

# Status correto:
curl -b cookies.txt http://localhost:8888/api/scheduler/status
# Esperado: {"running":true,"paused":false,"activeLives":N,"activeUpcoming":N,...}

# Trigger manual executa busca:
curl -b cookies.txt -X POST http://localhost:8888/api/scheduler/trigger
docker compose logs --tail=20 | grep "\[Scheduler\]"
# Esperado: "Trigger manual recebido" + "Iniciando busca principal"

# Pausa respeita isPaused:
curl -b cookies.txt -X POST http://localhost:8888/api/scheduler/pause
# Aguardar 65s e verificar logs: NÃO deve aparecer "busca principal" ou "alta frequência"
curl -b cookies.txt -X POST http://localhost:8888/api/scheduler/resume

# state_cache.json atualizado após busca:
cat data/state_cache.json | python3 -m json.tool | grep '"status"' | sort | uniq -c
# Esperado: contagem de streams por status

# Mutex funciona (dois ticks não se sobrepõem):
# Verificar nos logs que nunca aparece "Tick pulado: tick anterior ainda em execução"
# mais de uma vez consecutiva sem resolução
```

---

### Fase 6 — Smart Player

**Objetivo:** Proxy de streaming funcional (live, VOD e placeholder) com suporte a cookies e user-agent.

**Tarefas:**
1. Criar `src/player/credentials-manager.ts` — resolve cookie file e UA por plataforma a partir do banco
2. Criar `src/player/ffmpeg-runner.ts` — gera MPEG-TS a partir de imagem + overlay (perfil baixo consumo de CPU)
3. Criar `src/player/streamlink-runner.ts` — captura live → pipe; recebe cookie file + UA do CredentialsManager
4. Criar `src/player/ytdlp-runner.ts` — VOD → pipe; recebe cookie file + UA; atua como fallback do streamlink
5. Criar `src/player/smart-player.ts` — router principal (lê `state_cache.json`, decide runner)
6. Implementar lógica `isGenuinelyLive()` (status = 'live' + actual_start existe + actual_end não existe)
7. Criar `data/cookies/` no volume — diretório para armazenar arquivos de cookie por plataforma
8. Criar tabela `credentials` no banco (schema definido na Seção 7)
9. Criar `src/api/routes/credentials.ts`:
   - `GET /api/credentials` — lista cookies e UAs por plataforma
   - `POST /api/credentials/cookie/:platform` — upload de cookie file (multipart)
   - `DELETE /api/credentials/cookie/:platform` — exclui cookie file + registro
   - `PATCH /api/credentials/cookie/:platform/toggle` — ativa/desativa sem excluir
   - `POST /api/credentials/ua` — adiciona novo User-Agent
   - `DELETE /api/credentials/ua/:id` — remove UA
   - `PATCH /api/credentials/ua/:id/default` — define UA como padrão
   - `POST /api/credentials/test` — testa credenciais com `--simulate` (não inicia stream)
10. Endpoint: `GET /api/stream/:videoId` → pipe MPEG-TS
11. Endpoint: `GET /api/thumbnail/:videoId` → proxy de thumbnail (com cache)

**Ponto de verificação:**
```bash
# Testar placeholder (vídeo upcoming):
curl -v http://localhost:8888/api/stream/VIDEO_ID_UPCOMING
# Esperado: Content-Type: video/mp2t, stream MPEG-TS com imagem + texto de countdown

# Testar VOD:
curl -v http://localhost:8888/api/stream/VIDEO_ID_VOD
# Esperado: Content-Type: video/mp2t, stream de vídeo

# Testar live:
curl -v http://localhost:8888/api/stream/VIDEO_ID_LIVE
# Esperado: Content-Type: video/mp2t, stream ao vivo via streamlink

# Testar credenciais com simulate (não inicia stream):
curl -X POST http://localhost:8888/api/credentials/test \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.youtube.com/watch?v=VIDEO_ID","tool":"ytdlp"}'
# Esperado: {"success":true,"format":"...","title":"..."}

# No VLC com proxy:
vlc http://localhost:8888/live-proxy.m3u
```

---

### Fase 7 — API REST Completa

**Objetivo:** Todos os endpoints necessários para a UI implementados e testados.

**Tarefas:**

`src/api/routes/channels.ts`:
- `GET /api/channels` — lista canais com contadores de streams
- `POST /api/channels` — adiciona canal (com validação YouTube API)
- `DELETE /api/channels/:id` — remove canal e seus streams
- `PATCH /api/channels/:id/freeze` — toggle congelar/descongelar
- `POST /api/channels/:id/sync` — forçar sincronização individual

`src/api/routes/streams.ts`:
- `GET /api/streams` — lista streams (filtros: channel_id, status, data)

`src/api/routes/config.ts`:
- `GET /api/config` — todas as configurações
- `PATCH /api/config` — atualiza configurações (hot reload automático)
- `POST /api/config/export` — exporta JSON
- `POST /api/config/import` — importa JSON
- `POST /api/config/reset` — restaura padrões

**Ponto de verificação:**
```bash
# Testar todos os endpoints com curl ou REST client
curl http://localhost:8888/api/channels
curl -X POST http://localhost:8888/api/channels -H "Content-Type: application/json" -d '{"handle":"@cazetv"}'
curl http://localhost:8888/api/streams?status=live
```

---

### Fase 8 — UI: Layout + Dashboard + Canais + Eventos + Playlists

**Objetivo:** Interface web navegável com as páginas principais.

**Tarefas:**
1. Criar `public/index.html` — SPA com layout (header + sidebar ajustável + conteúdo)
2. Sidebar redimensionável via mouse drag + botão recolher/expandir
3. Roteamento client-side em `public/js/app.js` (sem framework, hash routing)
4. Implementar página **Dashboard** — métricas em tempo real (polling a cada 30s)
5. Implementar página **Canais** — tabela + adicionar + ações por linha
6. Implementar página **Eventos** — tabela com filtros
7. Implementar página **Playlists** — tabela com links de cópia

**Ponto de verificação:**
- Abrir `http://localhost:8888` no browser
- Navegar por todas as páginas sem erros no console
- Adicionar e remover um canal via UI
- Links das playlists copiando corretamente

---

### Fase 9 — UI: Configurações + Logs em Tempo Real

**Objetivo:** Todas as páginas de configuração e visualização de logs funcionais.

**Tarefas:**
1. Implementar todas as sub-páginas de Configurações (ver Seção 4)
2. Implementar página **Smart Player** (`/settings/player`):
   - Tabela de cookies por plataforma (upload, excluir com confirmação, toggle ativo/inativo)
   - Lista de User-Agents com Tag Input (adicionar, excluir, marcar como padrão)
   - Painel de teste de conectividade (`--simulate`) com output inline em tempo real
3. Componente **Tag Input** para listas editáveis (`TITLE_FILTER_EXPRESSIONS`, API keys, User Agents)
4. Interface **drag-and-drop** para Formato de Títulos (pré-visualização em tempo real)
5. Campos condicionais (mostrar/ocultar baseado em toggle)
6. Implementar logger WebSocket em `src/core/logger.ts`:
   - Broadcast de todos os logs (winston transport customizado)
7. Criar `src/api/routes/logs.ts` — endpoint WebSocket `/ws/logs`
8. Implementar página **Logs** — stream em tempo real + filtros + scroll automático
9. Validação de inputs (Int: min/max, URL: formato, etc.)

**Ponto de verificação:**
- Alterar `LOG_LEVEL` via UI → aplicado imediatamente sem restart
- Página de Logs exibindo entradas em tempo real
- Drag-and-drop de componentes de título funcionando
- Pré-visualização do título atualizando em tempo real
- Export/Import de configurações funcionando

---

### Fase 10 — Docker, Testes e Polimento

**Objetivo:** Sistema estável, testado, documentado e pronto para tornar público.

**Tarefas:**
1. Testes de integração para os endpoints críticos (usando `supertest` ou similar)
2. Verificar comportamento do Round-Robin de API keys (simular quota esgotada)
3. Verificar fallback `streamlink → yt-dlp` no Smart Player
4. Otimizar `Dockerfile` (reduzir tamanho da imagem final)
5. Completar `README.md`:
   - Visão geral do projeto
   - Quickstart (docker compose up em 5 minutos)
   - Descrição de todos os endpoints
   - Exemplo de `.env`
6. Revisar e remover TODO código morto, comentários desnecessários, arquivos não usados
7. Passar Prettier em todo o projeto
8. Tornar repositório **público**

**Ponto de verificação final:**
```bash
# Clone limpo → deve funcionar sem intervenção manual
git clone <repo>
cd tubewranglerr
cp .env.example .env
# Editar apenas YOUTUBE_API_KEY no .env
docker compose up --build
# Em 2 minutos: http://localhost:8888 deve estar operacional
```

---

## 12. Padrões de Qualidade

> O Agente deve seguir estes padrões em **todas** as fases, sem exceção.

### Código

- **TypeScript estrito** — `strict: true` no `tsconfig.json`; sem uso de `any` sem justificativa
- **Sem código morto** — imports não usados, funções não chamadas e arquivos obsoletos são removidos antes de cada commit
- **Formatação** — `prettier --write .` antes de cada commit
- **Logs claros** — toda ação relevante do sistema deve gerar um log com nível adequado

### Git

- **Commits atômicos** — um commit por funcionalidade coerente, mensagem em português no imperativo
  - ✅ `Adiciona validação de canal via YouTube API`
  - ❌ `fix stuff`
- **Branch `dev`** para desenvolvimento; `main` recebe apenas merges de fases completas e testadas
- **PR por fase** — descrever o que foi implementado e os resultados dos testes

### Segurança

- **`.env` nunca commitado** — garantido pelo `.gitignore`
- **API keys nunca expostas** em logs (mascarar como `sk-...xxxx`)
- **Validação de inputs** em todos os endpoints da API

### Dependências

- Adicionar somente o necessário. Evitar dependências de terceiros para funcionalidades simples que Node.js resolve nativamente.
- Versões fixadas no `package.json` (sem `^` ou `~`) para builds reproduzíveis.
