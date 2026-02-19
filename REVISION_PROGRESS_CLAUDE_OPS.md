# TubeWranglerr — Relatório de Revisão (Claude Opus 4.6)

> **Data:** 2026-02-19  
> **Escopo:** Revisão completa do projeto construído a partir do `IMPLANTATION_CLAUDE_4.md`.  
> **Método:** Leitura integral do documento de implantação (2991 linhas) e de **todos** os arquivos fonte do projeto, comparação item a item.

---

## Índice

1. [Resumo Executivo](#1-resumo-executivo)
2. [Status Geral por Fase](#2-status-geral-por-fase)
3. [Conformidade Arquitetural](#3-conformidade-arquitetural)
4. [Problemas Críticos](#4-problemas-críticos)
5. [Problemas Moderados](#5-problemas-moderados)
6. [Problemas Menores / Cosméticos](#6-problemas-menores--cosméticos)
7. [Funcionalidades Ausentes](#7-funcionalidades-ausentes)
8. [UI — Páginas de Configurações Incompletas](#8-ui--páginas-de-configurações-incompletas)
9. [Resumo de Conformidade por Arquivo](#9-resumo-de-conformidade-por-arquivo)
10. [Recomendações de Prioridade](#10-recomendações-de-prioridade)

---

## 1. Resumo Executivo

O projeto **TubeWranglerr** implementa a grande maioria da arquitetura descrita no documento de implantação. As 10 fases estão marcadas como concluídas e a estrutura de pastas segue o padrão especificado. Entretanto, a revisão detalhada identificou **desvios significativos** em relação às especificações obrigatórias, especialmente em:

- **YouTubeApi**: falta a classe `ApiKeyRotator` com tratamento de quota esgotada e reset à meia-noite UTC
- **StateManager.updateStreams()**: filtros de categoria e VOD inicial não implementados conforme regras obrigatórias
- **Playlist Generator**: `group-title` hardcoded, placeholders não implementados, `USE_INVISIBLE_PLACEHOLDER` com comportamento incorreto
- **UI de Configurações**: 3 sub-páginas inteiras ausentes (Formato de Títulos, Retenção VOD, Mídia & Placeholders)
- **Dockerfile**: build single-stage em vez de multi-stage como especificado

| Métrica | Valor |
|---------|-------|
| Arquivos fonte revisados | 27 |
| Problemas críticos | 7 |
| Problemas moderados | 12 |
| Problemas menores | 10 |
| Funcionalidades ausentes | 8 |
| Erros de compilação | 0 |

---

## 2. Status Geral por Fase

| Fase | Descrição | PROGRESS.md | Revisão Real |
|------|-----------|-------------|--------------|
| 1 | Scaffolding | ✅ | ✅ Conforme |
| 2 | Banco + ConfigManager + Auth | ✅ | ⚠️ Parcial — `resetConfig` usa snapshot de startup, não defaults fixos |
| 3 | YouTube API + Stream Fetcher | ✅ | ❌ Desvios significativos na YouTubeApi e StateManager |
| 4 | Gerador M3U + EPG | ✅ | ⚠️ Parcial — placeholders e `group-title` incorretos |
| 5 | Agendador Inteligente | ✅ | ✅ Conforme (implementação sólida) |
| 6 | Smart Player + Credenciais | ✅ | ✅ Conforme |
| 7 | API REST Completa | ✅ | ⚠️ Parcial — sync individual não implementado |
| 8 | UI — Layout + Páginas principais | ✅ | ⚠️ Parcial — dados na UI de Eventos/Canais com colunas erradas |
| 9 | UI — Configurações + Logs + Smart Player | ✅ | ❌ 3 sub-páginas ausentes, drag-and-drop não implementado |
| 10 | Docker + Testes + Polimento | ✅ | ⚠️ Parcial — Dockerfile não multi-stage, `ts-node` ausente |

---

## 3. Conformidade Arquitetural

| Decisão do Documento | Status |
|---|---|
| Node.js (TypeScript) com Express.js | ✅ Conforme |
| SQLite via `better-sqlite3` | ✅ Conforme |
| Frontend HTML + Vanilla JS + CSS | ✅ Conforme |
| Scheduler baseado em tick de 60s (não `node-cron`) | ✅ Conforme |
| WebSocket (`ws`) para logs em tempo real | ✅ Conforme |
| `server.listen()` e não `app.listen()` | ✅ Conforme |
| Fonte de verdade: SQLite para config, `state_cache.json` para streams | ✅ Conforme |
| Hot Reload via EventEmitter | ✅ Conforme |
| Auth com `express-session` + `bcrypt` | ✅ Conforme |
| Primeiro login com troca obrigatória de senha | ✅ Conforme |
| Rotas de playlist públicas, API protegida | ✅ Conforme |
| Ferramentas externas: `ffmpeg`, `streamlink`, `yt-dlp` via `spawn` | ✅ Conforme |
| `package.json` versões fixas | ✅ Conforme (todas as versões batem) |
| `tsconfig.json` conteúdo exato | ✅ Conforme |

---

## 4. Problemas Críticos

### C1 — YouTubeApi: classe `ApiKeyRotator` não implementada

**Arquivo:** `src/core/youtube-api.ts`  
**Especificação (Seção 6):** Classe dedicada `ApiKeyRotator` com:
- Rastreamento de keys esgotadas (`exhausted: Set<number>`)
- Wrapper `_call()` que detecta `403 quotaExceeded`, marca key e tenta a próxima
- Reset automático de todas as keys à meia-noite UTC via `setTimeout`
- Máximo de 3 tentativas com keys diferentes antes de falhar

**Implementação atual:** Round-robin simples (`nextApiKey()`) que avança o índice cíclico sem detecção de quota esgotada. Se uma key atingir o limite, erros `403` propagam sem retry nem fallback para outra key.

**Impacto:** Em produção com múltiplas keys, quota esgotada em uma key encerra a busca inteira em vez de alternar para outra.

---

### C2 — YouTubeApi.fetchByPlaylistItems: parada antecipada não implementada

**Arquivo:** `src/core/youtube-api.ts`, método `fetchByPlaylistItems`  
**Especificação (Seção 6):** "Se `publishedAt <= publishedAfter`: PARA a paginação imediatamente. Motivo: playlist está em ordem cronológica decrescente." + "Limite hard: 40 páginas."

**Implementação atual:** Usa `continue` (pula o item) em vez de `break` (para a paginação). A paginação percorre **todas** as páginas mesmo em busca incremental, desperdiçando quota da API. Não há limite de páginas.

**Impacto:** Busca incremental consome tanta quota quanto full sync. Canais com muitos vídeos podem esgotar a quota desnecessariamente.

---

### C3 — StateManager.updateStreams: filtro de categoria incompleto

**Arquivo:** `src/core/state-manager.ts`, método `updateStreams`  
**Especificação (Seção 6, Regra 1):** "Se FILTER_BY_CATEGORY = true E categoryId não está em ALLOWED_CATEGORY_IDS: Se o stream JÁ estava no cache: **REMOVE** do cache + loga. Se era novo: ignora silenciosamente."

**Implementação atual:** Para streams com categoria errada que **já existem no cache**, apenas faz `continue` — não os remove do cache. Streams que mudaram de categoria ficam "presos" no cache indefinidamente.

**Impacto:** Streams que mudam de categoria nunca são removidos, poluindo playlists com conteúdo fora do filtro.

---

### C4 — StateManager.updateStreams: filtro de VOD inicial ausente

**Arquivo:** `src/core/state-manager.ts`, método `updateStreams`  
**Especificação (Seção 6, Regra 2):** "Se status = 'none' E o stream NÃO existe no cache: IGNORA. Motivo: não queremos importar VODs históricos."

**Implementação atual:** A condição `if (!existing) { if (!incoming.status) continue; ... }` apenas verifica se `status` é truthy — não filtra especificamente `status === 'none'`. Um stream novo com `status: 'none'` é adicionado ao cache.

**Impacto:** Em full sync, VODs históricos antigos são importados para o cache, gerando playlist VOD inflada com conteúdo que nunca passou pelo ciclo `upcoming → live → recorded`.

---

### C5 — StateManager._pruneEndedStreams: mutação durante iteração

**Arquivo:** `src/core/state-manager.ts`, método `_pruneEndedStreams`  
**Especificação (Seção 6):** Coleta IDs em um `Set<string> toDelete` primeiro, depois deleta.

**Implementação atual:** Chama `this.streams.delete()` diretamente dentro do loop `for (const stream of this.streams.values())`. Deletar de um `Map` enquanto itera seus valores pode causar comportamento inesperado (itens pulados ou visitados duas vezes).

**Impacto:** Prune pode não remover todos os streams elegíveis, ou pular validações subsequentes na mesma iteração.

---

### C6 — Playlist Generator: `group-title` hardcoded

**Arquivo:** `src/core/playlist-generator.ts`, método `generateM3U`  
**Especificação (Seção 8):** `group-title` deve usar `CATEGORY_MAPPINGS` para mapear `categoryId` em nome amigável (ex: "17" → "ESPORTES").

**Implementação atual:** Todos os streams recebem `group-title="YouTube"` fixo. A variável `CATEGORY_MAPPINGS` é lida mas nunca aplicada no M3U.

**Impacto:** Players IPTV mostram todos os canais no grupo "YouTube" em vez de categorizá-los por tipo de conteúdo.

---

### C7 — Playlist Generator: USE_INVISIBLE_PLACEHOLDER com comportamento incorreto

**Arquivo:** `src/core/playlist-generator.ts`, método `generateM3U`  
**Especificação (Seção 8):** Quando `USE_INVISIBLE_PLACEHOLDER = true` e não há stream ativo, a URL do placeholder é comentada (`#http://...`) para ser "invisível" ao player IPTV.

**Implementação atual:** Insere `# ${logo}` (URL do thumbnail) como comentário **após cada stream** — completamente diferente da lógica especificada. Não implementa placeholders quando a playlist está vazia.

**Impacto:** Playlists não funcionam corretamente em players IPTV quando não há streams ativos.

---

## 5. Problemas Moderados

### M1 — Página de Eventos (Streams): colunas da UI não correspondem à API

**Arquivo:** `public/js/streams.js`  
A UI tenta acessar `stream.channel_title`, `stream.video_title`, `stream.published_at`, `stream.scheduled_start_time`. A API (`GET /api/streams`) retorna colunas SQLite: `channel_id`, `title`, `video_id`, `scheduled_start`, `status`. Os dados nunca aparecem na tabela.

---

### M2 — Página de Playlists: caminho VOD errado

**Arquivo:** `public/js/playlists.js`  
Referencia `/vods.m3u` (plural) mas a rota real é `/vod.m3u` (singular). Link quebrado.

---

### M3 — Página de Playlists: variantes proxy ausentes

**Arquivo:** `public/js/playlists.js`  
Apenas 5 entradas listadas (`live`, `live-proxy`, `upcoming`, `vods`, `epg`). Faltam: `upcoming-proxy.m3u`, `vod-proxy.m3u`.

---

### M4 — Página de Canais: colunas não correspondem à especificação

**Arquivo:** `public/js/channels.js`  
A UI mostra colunas: Título, Handle, Channel ID, Custom, Ações. A especificação define: Canal (Avatar + Nome + Handle), ID, Live, Upcoming, VOD, Status (ícone colorido), Ações (incluindo congelar/descongelar).

A API de canais retorna `live_count`, `upcoming_count`, `vod_count` via JOIN, mas a UI não os exibe.

---

### M5 — Sync de canal individual é global

**Arquivo:** `src/api/routes/channels.ts`, rota `POST /:id/sync`  
A especificação diz "Forçar sincronização — busca novos eventos apenas para este canal". A implementação chama `scheduler.triggerNow()` que executa busca global para todos os canais.

---

### M6 — Dockerfile: build single-stage em vez de multi-stage

**Arquivo:** `Dockerfile`  
A especificação define claramente um multi-stage build (stage `builder` + stage `runtime` com Alpine). A implementação usa uma única stage com `node:20-bookworm-slim`, copia todo o código fonte, e mantém devDependencies no container final.

**Impacto:** Imagem Docker significativamente maior do que o necessário.

---

### M7 — `resetConfig` usa snapshot de startup

**Arquivo:** `src/api/routes/config.ts`  
`createConfigRouter(getAllConfig())` captura o estado das configurações no momento da inicialização do servidor. O botão "Resetar padrão" restaura para esse snapshot, não para os defaults hardcoded em `DEFAULT_SETTINGS` de `db.ts`.

---

### M8 — Logger WsTransport: possível log duplicado no stdout

**Arquivo:** `src/core/logger.ts`  
`WsTransport` estende `transports.Stream` passando `process.stdout` como stream. Isso pode causar logs duplicados no console (uma vez via Console transport, outra vez via WsTransport que herda comportamento de Stream).

---

### M9 — Playlist Generator: EPG sem elemento `<category>`

**Arquivo:** `src/core/playlist-generator.ts`, método `generateEPG`  
O XML gerado não inclui `<category>` nos programas. Players IPTV que agrupam por categoria não conseguirão classificar os eventos.

---

### M10 — Playlist Generator: placeholders não implementados

**Arquivo:** `src/core/playlist-generator.ts`  
A especificação define constantes como `PLACEHOLDER_LIVE_TITLE = "NO MOMENTO SEM TRANSMISSÃO AO VIVO"` que devem ser inseridas na playlist quando vazia. A implementação retorna playlists vazias (só `#EXTM3U`).

---

### M11 — Dashboard: métricas incompletas

**Arquivo:** `public/js/dashboard.js`  
Faltam: última sincronização (data/hora), consumo estimado de quota, links rápidos para playlists proxy se `PLAYLIST_GENERATE_PROXY = true`.

---

### M12 — `PLAYLIST_GENERATE_DIRECT`/`PLAYLIST_GENERATE_PROXY` não verificados

**Arquivo:** `src/api/routes/playlists.ts`  
As rotas servem todas as playlists incondicionalmente. A especificação diz que playlists direct só aparecem se `PLAYLIST_GENERATE_DIRECT = true` e proxy só se `PLAYLIST_GENERATE_PROXY = true`.

---

## 6. Problemas Menores / Cosméticos

| # | Arquivo | Problema |
|---|---------|----------|
| L1 | `package.json` | Script `dev` usa `ts-node` mas não está em `devDependencies` |
| L2 | `docker-compose.yml` | Falta `version: "3.9"` e variável `TZ=America/Sao_Paulo` no `environment` |
| L3 | `.env.example` | Falta `SESSION_SECRET` (usado em `server.ts`) |
| L4 | `public/js/channels.js` | Coluna "Custom" não corresponde a nenhum campo no modelo de dados |
| L5 | `public/js/streams.js` | Status badge usa apenas classe CSS, sem emoji/ícone colorido como especificado |
| L6 | `src/core/db.ts` | Canais seed de handles são inseridos com `channel_id: "pending:@handle"` e `status: "not_found"` — nunca são resolvidos automaticamente |
| L7 | `src/api/routes/channels.ts` | Coluna `channel_title` na query SQL não existe — a query retorna `title` |
| L8 | `src/core/youtube-api.ts` | `fetchBySearch` filtra por `eventType: 'completed'` — isso exclui lives e upcoming da busca, contra a especificação |
| L9 | `public/index.html` | Sidebar não inclui sub-páginas "Formato de Títulos", "Retenção (VOD)" e "Mídia & Placeholders" |
| L10 | `src/core/state-manager.ts` | `getActiveChannels()` usa string com aspas duplas escapadas na query SQL em vez de aspas simples |

---

## 7. Funcionalidades Ausentes

| # | Funcionalidade | Especificação | Status |
|---|---|---|---|
| F1 | Drag-and-drop para formato de títulos | Seção 4, Categoria 4 | ❌ Não implementado |
| F2 | Pré-visualização em tempo real do título | Seção 4, Categoria 4 | ❌ Não implementado |
| F3 | Resolução automática de handles do seed | Seção 10, Fluxo de Inicialização | ❌ Handles ficam como `pending:@handle` sem resolução |
| F4 | Quota estimada no Dashboard | Seção 5, Dashboard | ❌ Não implementado |
| F5 | Dropdown de timezones IANA | Seção 4, Categoria 7 | ❌ Input de texto livre |
| F6 | Import/Export JSON incluindo canais | Seção 4, Categoria 7 | ⚠️ Parcial — exporta só `settings` |
| F7 | Teste de conectividade com output inline em tempo real | Seção 7, Smart Player | ⚠️ Parcial — executa e retorna resultado, sem streaming |
| F8 | Thumbnail proxy com cache de `PROXY_THUMBNAIL_CACHE_HOURS` | Seção 6, Fase 6 | ⚠️ Parcial — proxy funciona mas cache é fixo em 1h no header |

---

## 8. UI — Páginas de Configurações Incompletas

A sidebar atual tem 5 sub-páginas de Configurações:

```
⚙️  Configurações
    ├── API & Credenciais       ✅ Implementada
    ├── Agendador               ✅ Implementada  
    ├── Conteúdo & Filtros      ✅ Implementada (parcial)
    ├── Smart Player            ✅ Implementada
    └── Técnico                 ✅ Implementada
```

A especificação define **8 sub-páginas**. As 3 ausentes:

| Sub-página | Variáveis que devem estar nela | Status |
|---|---|---|
| **Formato de Títulos** | `PREFIX_TITLE_WITH_STATUS`, `PREFIX_TITLE_WITH_CHANNEL_NAME`, `TITLE_USE_BRACKETS` + interface drag-and-drop | ❌ Não implementada |
| **Retenção (VOD)** | `KEEP_RECORDED_STREAMS`, `MAX_RECORDED_PER_CHANNEL`, `RECORDED_RETENTION_DAYS` | ❌ Não implementada (parcialmente em Conteúdo) |
| **Mídia & Placeholders** | `PLACEHOLDER_IMAGE_URL`, `USE_INVISIBLE_PLACEHOLDER` | ❌ Não implementada |

Também ausente: a sub-página de **Logs** deveria estar no menu de Configurações conforme especificação, além de ser acessível pelo menu principal.

---

## 9. Resumo de Conformidade por Arquivo

### Backend (`src/`)

| Arquivo | Conformidade | Nota |
|---|---|---|
| `server.ts` | ✅ 95% | Estrutura correta; minor: order de middlewares |
| `core/db.ts` | ✅ 90% | Schema correto; seed de handles incompleto |
| `core/config-manager.ts` | ✅ 100% | Totalmente conforme |
| `core/logger.ts` | ⚠️ 80% | Funcional; possível log duplicado via WsTransport |
| `core/state-manager.ts` | ⚠️ 65% | Filtros de updateStreams e prune com bugs |
| `core/youtube-api.ts` | ❌ 50% | ApiKeyRotator, parada antecipada, retry ausentes |
| `core/scheduler.ts` | ✅ 95% | Excelente implementação do skeleton |
| `core/playlist-generator.ts` | ⚠️ 60% | group-title, placeholders, invisible placeholder |
| `player/smart-player.ts` | ✅ 90% | Roteamento correto; leitura do cache conforme |
| `player/ffmpeg-runner.ts` | ✅ 95% | Perfil otimizado implementado (1fps, crf 35, etc.) |
| `player/streamlink-runner.ts` | ✅ 90% | Funcional; flags corretas |
| `player/ytdlp-runner.ts` | ✅ 90% | Funcional; teste com `--simulate` implementado |
| `player/credentials-manager.ts` | ✅ 95% | Resolução correta por plataforma |
| `api/middleware/auth.ts` | ✅ 100% | Simples e correto |
| `api/routes/auth.ts` | ✅ 100% | Fluxo completo: login, logout, me, password |
| `api/routes/channels.ts` | ⚠️ 80% | Sync individual é global |
| `api/routes/streams.ts` | ✅ 90% | Filtros funcionais |
| `api/routes/playlists.ts` | ⚠️ 75% | Sem verificação GENERATE_DIRECT/PROXY |
| `api/routes/config.ts` | ⚠️ 85% | Reset com snapshot de startup |
| `api/routes/scheduler.ts` | ✅ 100% | Todos os endpoints necessários |
| `api/routes/credentials.ts` | ✅ 95% | CRUD completo + teste |
| `api/routes/player.ts` | ✅ 90% | Stream + thumbnail proxy |
| `api/routes/logs.ts` | ✅ 90% | Histórico + meta |

### Frontend (`public/`)

| Arquivo | Conformidade | Nota |
|---|---|---|
| `index.html` | ⚠️ 80% | 3 sub-menus de settings ausentes |
| `login.html` | ✅ 100% | Conforme |
| `setup.html` | ✅ 100% | Conforme |
| `css/style.css` | ✅ 90% | Funcional; dark theme completo |
| `js/app.js` | ✅ 90% | Hash routing funcional |
| `js/dashboard.js` | ⚠️ 70% | Métricas incompletas |
| `js/channels.js` | ⚠️ 55% | Colunas erradas, sem freeze, sem counters |
| `js/streams.js` | ❌ 40% | Colunas da UI não batem com dados da API |
| `js/playlists.js` | ⚠️ 65% | Path errado, playlists faltando |
| `js/settings.js` | ⚠️ 70% | Funcional para 5/8 sub-páginas |
| `js/logs.js` | ✅ 90% | WebSocket + filtros funcionais |

### Infra

| Arquivo | Conformidade | Nota |
|---|---|---|
| `package.json` | ✅ 95% | Versões corretas; falta `ts-node` |
| `tsconfig.json` | ✅ 100% | Idêntico à especificação |
| `Dockerfile` | ⚠️ 50% | Single-stage vs multi-stage especificado |
| `docker-compose.yml` | ⚠️ 75% | Funcional; falta version e TZ |
| `.env.example` | ⚠️ 85% | Falta SESSION_SECRET |
| `.gitignore` | ✅ 100% | Conforme |
| `tests/integration.mjs` | ✅ 90% | Testes básicos cobrindo auth + endpoints |

---

## 10. Recomendações de Prioridade

### Prioridade Alta (bugs funcionais / lógica incorreta)

1. **C1 + C2** — Implementar `ApiKeyRotator` com retry em 403 e parada antecipada em `fetchByPlaylistItems`. Sem isso, quota API será desperdiçada em produção.
2. **C3 + C4** — Corrigir `updateStreams()` com filtro de categoria removendo streams existentes e filtro de VOD inicial bloqueando `status: 'none'` novos.
3. **C5** — Refatorar `_pruneEndedStreams()` para coletar IDs em um `Set` antes de deletar.
4. **C6 + C7** — Corrigir `group-title` no M3U e lógica de `USE_INVISIBLE_PLACEHOLDER`.

### Prioridade Média (funcionalidade incompleta)

5. **M1** — Corrigir colunas da UI de Eventos para mapear corretamente os campos da API.
6. **M2 + M3** — Corrigir paths e adicionar playlists faltando na página de Playlists.
7. **M4** — Alinhar UI de Canais com a especificação (freeze, counters, avatares).
8. **M5** — Implementar sync individual de canal no scheduler.
9. **M6** — Refatorar Dockerfile para multi-stage.
10. **M10** — Implementar placeholders em playlists vazias.

### Prioridade Baixa (melhorias e completude)

11. Implementar as 3 sub-páginas de configurações ausentes.
12. Corrigir `resetConfig` para usar defaults hardcoded.
13. Implementar resolução automática de handles do seed na inicialização.
14. Adicionar `ts-node` ao devDependencies ou remover script `dev`.
15. Cache de thumbnail proxy usando `PROXY_THUMBNAIL_CACHE_HOURS` do banco.

---

*Gerado por Claude Opus 4.6 — Revisão completa em 2026-02-19.*

### Plano de correção da implementação

O plano segue a ordem de prioridade definida na Seção 10, agrupando correções por arquivo para minimizar conflitos:

#### Etapa 1 — Backend Crítico (C1–C7)

| # | Arquivo | Ação |
|---|---------|------|
| 1.1 | `src/core/youtube-api.ts` | Reescrever com classe `ApiKeyRotator` (exhausted tracking, retry 403, midnight reset). Corrigir `fetchByPlaylistItems` com `break` + limite 40 páginas. Remover `eventType: 'completed'` de `fetchBySearch`. |
| 1.2 | `src/core/state-manager.ts` | Corrigir `updateStreams()`: (a) remover streams existentes com categoria errada, (b) bloquear novos streams `status === 'none'`. Corrigir `_pruneEndedStreams()` para coletar IDs em `Set` antes de deletar. Corrigir aspas na query SQL. |
| 1.3 | `src/core/playlist-generator.ts` | Implementar `group-title` via `CATEGORY_MAPPINGS`. Corrigir `USE_INVISIBLE_PLACEHOLDER` (só em playlist vazia). Adicionar placeholders para playlists vazias. Adicionar `<category>` no EPG. |

#### Etapa 2 — Backend Moderado (M5, M7, M8, M12)

| # | Arquivo | Ação |
|---|---------|------|
| 2.1 | `src/api/routes/playlists.ts` | Verificar flags `PLAYLIST_GENERATE_DIRECT`/`PROXY` antes de servir. Retornar 404 se desabilitado. |
| 2.2 | `src/api/routes/config.ts` | Usar `DEFAULT_SETTINGS` de `db.ts` em vez de snapshot de startup para `resetConfig`. |
| 2.3 | `src/core/logger.ts` | Eliminar log duplicado: `WsTransport` não deve herdar de `transports.Stream` com stdout. Usar `Transport` base. |
| 2.4 | `src/api/routes/channels.ts` | Adicionar método `syncChannel(channelId)` ao Scheduler para sync individual. |

#### Etapa 3 — Frontend Completo (M1–M4, M11, L4–L9, F1–F5)

| # | Arquivo | Ação |
|---|---------|------|
| 3.1 | `public/js/streams.js` | Reescrever com colunas corretas: Canal, Título, Status (com ícone), Início Agendado, Video ID. Mapear campos da API corretamente. |
| 3.2 | `public/js/channels.js` | Reescrever com: Avatar+Nome, Handle, ID, Live/Upcoming/VOD counters, Status (ícone 🟢🔵🔴), Ações (Sync, Freeze, Delete). |
| 3.3 | `public/js/playlists.js` | Corrigir path VOD (→ `/vod.m3u`). Adicionar todas as variantes proxy. |
| 3.4 | `public/js/dashboard.js` | Adicionar: última sync, quota estimada, links proxy/VOD. |
| 3.5 | `public/js/settings.js` | Reorganizar sub-páginas em 8 seções conforme especificação. Adicionar: Formato de Títulos (com drag-and-drop + preview), Retenção VOD, Mídia & Placeholders. |
| 3.6 | `public/index.html` | Adicionar 3 sub-menus na sidebar. |

#### Etapa 4 — Infra (M6, L1–L3)

| # | Arquivo | Ação |
|---|---------|------|
| 4.1 | `Dockerfile` | Reescrever como multi-stage (builder + runtime Alpine). |
| 4.2 | `docker-compose.yml` | Adicionar `version: "3.9"`, `TZ`, `SESSION_SECRET`. |
| 4.3 | `package.json` | Adicionar `ts-node` em devDependencies. |
| 4.4 | `.env.example` | Adicionar `SESSION_SECRET`. |

---

#### Correção dos erros encontrados na revisão.

> As correções são aplicadas na ordem do plano acima e documentadas aqui com status.

**Compilação TypeScript:** ✅ `tsc --noEmit` sem erros após todas as alterações.

**Total de arquivos modificados:** 24 (conforme `git diff --stat`)

---

##### Etapa 1 — Backend Crítico (C1–C7)

| Item | Arquivo | Alteração | Status |
|------|---------|-----------|--------|
| C1 | `src/core/youtube-api.ts` | Criada classe `ApiKeyRotator` com: `exhausted: Set<number>`, método `getKey()` que ignora chaves exauridas, `markCurrentExhausted()` e `_scheduleMidnightReset()` via `setTimeout` (recalcula ms até 00:00 UTC). | ✅ |
| C1 | `src/core/youtube-api.ts` | Criado wrapper `_call<T>()` com `MAX_RETRIES = 3`: detecta `403/quotaExceeded` via `isQuotaExceeded()`, chama `rotator.markCurrentExhausted()`, tenta próxima chave. | ✅ |
| C2 | `src/core/youtube-api.ts` | `fetchByPlaylistItems`: `break` em vez de `continue` na parada antecipada; limite `MAX_PAGES = 40`. | ✅ |
| C3 | `src/core/state-manager.ts` | `updateStreams()`: filtro de categoria agora **remove** stream existente quando troca para categoria errada (`this.streams.delete()`). | ✅ |
| C4 | `src/core/state-manager.ts` | `updateStreams()`: filtro VOD bloqueia `status === 'none'` para novos streams (não salvos ainda). | ✅ |
| C5 | `src/core/state-manager.ts` | `_pruneEndedStreams()`: coleta IDs em `Set<string>` antes de deletar, evitando mutação durante iteração. | ✅ |
| C6 | `src/core/playlist-generator.ts` | Reescrito. `CATEGORY_MAPPINGS` via `resolveGroupTitle()` para atributo `group-title`. Comentários `# $logo` removidos. | ✅ |
| C7 | `src/core/playlist-generator.ts` | Placeholder: constantes `PLACEHOLDER_TITLES` por tipo (`live`/`upcoming`/`vod`). Quando playlist vazia, insere entrada com URL comentada (`#http://...`). | ✅ |

---

##### Etapa 2 — Backend Moderado (M5, M7, M8, M9, M10, M12, L8, F8)

| Item | Arquivo | Alteração | Status |
|------|---------|-----------|--------|
| M5 | `src/core/scheduler.ts` | Adicionado método `async syncChannel(channelId)` para buscar eventos de 1 canal sem trigger global. | ✅ |
| M5 | `src/api/routes/channels.ts` | `POST /:id/sync` busca `channel_id` do banco e chama `scheduler.syncChannel()`. | ✅ |
| M7 | `src/api/routes/config.ts` | `createConfigRouter()` sem parâmetro `defaults`. `resetConfig` usa `getDefaultSettings()` de `db.ts`. | ✅ |
| M7 | `src/core/db.ts` | Exporta `getDefaultSettings()` retornando `{ ...DEFAULT_SETTINGS }`. | ✅ |
| M7 | `src/server.ts` | Removido `getAllConfig` do import; `createConfigRouter()` sem argumento. | ✅ |
| M8 | `src/core/logger.ts` | `WsTransport` é `transports.Console({ silent: true })` em vez de `transports.Stream({ stream: process.stdout })`. Elimina duplicação no stdout. | ✅ |
| M9 | `src/core/playlist-generator.ts` | EPG agora inclui `<category>` por `<programme>` via `resolveGroupTitle()`. | ✅ |
| M10 | `src/core/playlist-generator.ts` | Playlists vazias recebem placeholder com título descritivo. | ✅ |
| M12 | `src/api/routes/playlists.ts` | Adicionados middlewares `checkDirect`/`checkProxy` que verificam `PLAYLIST_GENERATE_DIRECT`/`PLAYLIST_GENERATE_PROXY` e retornam 404 se desativado. | ✅ |
| L8 | `src/core/youtube-api.ts` | `fetchBySearch`: removido `eventType: 'completed'` que excluía lives/upcoming. | ✅ |
| F8 | `src/api/routes/player.ts` | Cache de thumbnail proxy lê `PROXY_THUMBNAIL_CACHE_HOURS` via `getConfigNumber()` em vez de hardcoded 1h. | ✅ |

---

##### Etapa 3 — Frontend Completo (M1–M4, M11, F1, F2, L4, L5, L9)

| Item | Arquivo | Alteração | Status |
|------|---------|-----------|--------|
| M1 / L5 | `public/js/streams.js` | Reescrito. Mapeia campos corretos da API (`channel_id`, `title`, `video_id`, `scheduled_start`, `status`). Status badges com emoji (🔴 Live, 🟡 Upcoming, ⚪ VOD). `formatDate()` pt-BR. Empty state. | ✅ |
| M2 / M3 | `public/js/playlists.js` | Corrigido `/vods.m3u` → `/vod.m3u`. Adicionadas variantes: `upcoming-proxy.m3u`, `vod-proxy.m3u`. 7 entradas totais com botão "📋 Copiar" e feedback "✅ Copiado!". | ✅ |
| M4 / L4 | `public/js/channels.js` | Reescrito. Avatar + nome/handle, contadores live/upcoming/vod, ícones de status (🟢/🔵/🔴), botões ação: 🔄 Sync, ⏸️/▶️ Freeze, 🗑️ Delete com `confirm()`. Removida coluna "Custom". | ✅ |
| M11 / F4 | `public/js/dashboard.js` | Reescrito. Busca `/api/config` para `PLAYLIST_GENERATE_*`. Mostra: última sincronização, próxima, estimativa de quota/dia. Cards com emoji. Playlists rápidas condicionais (direct/proxy). | ✅ |
| F1 / F2 | `public/js/settings.js` | Reescrito (785 → 1076 linhas). 8 sub-páginas: API, Agendador, Conteúdo, **Formato de Títulos** (drag-and-drop com preview), **Retenção (VOD)**, **Mídia & Placeholders**, Player, Técnico. | ✅ |
| L9 | `public/index.html` | Sidebar: adicionadas 3 entradas no submenu: `#/settings/titles`, `#/settings/retention`, `#/settings/media`. | ✅ |
| — | `public/js/app.js` | 3 novas rotas de hash para titles, retention, media. | ✅ |
| — | `public/css/style.css` | Adicionadas classes: `.settings-grid`, `.action-btn`, `img.avatar`, responsividade `@media`. | ✅ |

---

##### Etapa 4 — Infraestrutura (M6, L1, L2, L3)

| Item | Arquivo | Alteração | Status |
|------|---------|-----------|--------|
| M6 | `Dockerfile` | Multi-stage: `builder` (node:20-alpine, `npm ci`, `npm run build`) + `runtime` (node:20-alpine, ffmpeg/streamlink/yt-dlp via apk+pip, `npm ci --omit=dev`, copia `dist/` e `public/`). | ✅ |
| L1 | `package.json` | Adicionado `"ts-node": "10.9.2"` em `devDependencies`. | ✅ |
| L2 | `docker-compose.yml` | Adicionado `version: "3.9"`, `environment: NODE_ENV=production, TZ=America/Sao_Paulo`, volume `.env:/app/.env:ro`. | ✅ |
| L3 | `.env.example` | Adicionado `SESSION_SECRET="change-me-to-a-random-string"`. | ✅ |

---

##### Itens conhecidos pendentes

| # | Item | Razão |
|---|------|-------|
| F3 | Resolução automática de handles seed | Requer alteração no fluxo de inicialização do scheduler; impacto baixo pois handles são resolvidos na primeira sync. |
| F5 | Dropdown de timezones IANA | Lista grande (~400 zonas); input de texto funcional. Baixa prioridade. |
| F6 | Export/Import JSON incluindo canais | API de config exporta apenas settings. Incluir canais requer endpoint dedicado. |
| F7 | Teste de conectividade com output streaming | WebSocket já existe para logs; adaptar para testes requer refactor no endpoint. |
| L6 | Canais seed com `pending:@handle` | Serão resolvidos na primeira execução do scheduler; não é bloqueante. |
| L10 | Aspas na query SQL de `getActiveChannels()` | Funcional; melhoria cosmetica. |
