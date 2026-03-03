# TubeWranglerr — Progress Tracker

> Atualizado pelo Agente ao concluir cada fase.
> NÃO editar manualmente.

## Status das Fases

| Fase | Descrição                                | Status       | Concluída em |
| ---- | ---------------------------------------- | ------------ | ------------ |
| 1    | Scaffolding                              | ✅ Concluída | 2026-02-19   |
| 2    | Banco + ConfigManager + Auth             | ✅ Concluída | 2026-02-19   |
| 3    | YouTube API + Stream Fetcher             | ✅ Concluída | 2026-02-19   |
| 4    | Gerador M3U + EPG                        | ✅ Concluída | 2026-02-19   |
| 5    | Agendador Inteligente                    | ✅ Concluída | 2026-02-19   |
| 6    | Smart Player + Credenciais               | ✅ Concluída | 2026-02-19   |
| 7    | API REST Completa                        | ✅ Concluída | 2026-02-19   |
| 8    | UI — Layout + Páginas principais         | ✅ Concluída | 2026-02-19   |
| 9    | UI — Configurações + Logs + Smart Player | ✅ Concluída | 2026-02-19   |
| 10   | Docker + Testes + Polimento              | ✅ Concluída | 2026-02-19   |

## Decisões tomadas durante implementação

- Nesta execução foi implementado o caminho completo até a base operacional das fases 1-5 no mesmo ciclo para acelerar validação local.
- A validação foi feita via Docker (Node 20), pois o ambiente local do Codespace estava em Node 24 e não compila `better-sqlite3@9.4.3`.
- A SPA foi finalizada com módulos separados por página (`dashboard`, `channels`, `streams`, `playlists`, `settings`, `logs`) e roteamento hash em `public/js/app.js`.
- A rota de logs foi expandida com `GET /api/logs` para histórico inicial, mantendo `GET /api/logs/meta` para metadados e `/ws/logs` para tempo real.
- O fluxo de canais foi alinhado entre UI e API usando `POST /api/channels/:id/sync`.
- Foi adicionada suíte de integração executável por `npm run test:integration` (health, auth, endpoints protegidos, playlist pública e validação de input inválido).
- `README.md` foi atualizado com quickstart, endpoints atuais e instruções de teste.

## Problemas encontrados e soluções

<!-- O Agente registra aqui erros relevantes e como foram resolvidos -->

- Inconsistência de rota entre UI e API (`/refresh` vs `/sync`) corrigida em `public/js/channels.js`.
- Em validação automatizada, login paralelo ao `docker compose up` falhou por race de inicialização; revalidação sequencial confirmou funcionamento (`health/login/me/js/channels/logs` todos 200 com sessão).
- Em execução imediatamente após restart do container, o teste de integração retornou `fetch failed` por startup race; rerun com serviço estável passou integralmente.

## erros pós implementação

- ✅ Erro: `Cannot GET /login` e tela de login sem CSS (layout "feio"/descentralizado).
  - Causa: assets estáticos (`/css`, `/js`) estavam sendo bloqueados por middleware de auth antes do `express.static`.
  - Solução: liberação explícita de paths estáticos no middleware + rota `/login` servindo `login.html`; login e setup usando o mesmo layout centralizado (`auth-page` + `auth-card`).

- ✅ Erro: troca obrigatória de senha no primeiro login incompleta.
  - Causa: `mustChangePassword` era retornado pela API, mas fluxo UI/roteamento não bloqueava a navegação completa.
  - Solução: redirecionamento para `/setup`, bloqueio de APIs protegidas com `403 PASSWORD_CHANGE_REQUIRED` até `PATCH /api/auth/password`, e formulário funcional de troca na tela de setup.

- ✅ Erro: ao adicionar `@cazetv` sem `YOUTUBE_API_KEY`, ocorria erro e aparente "deslogar".
  - Causa: exceção assíncrona sem tratamento no `POST /api/channels` (falha de API key) podia quebrar fluxo do cliente.
  - Solução: `try/catch` no endpoint, retorno controlado `400` com mensagem clara, sem invalidar sessão do usuário.

- ✅ Erro: página de logs sem nenhuma entrada inicial.
  - Causa: leitura inicial podia vir vazia quando arquivo ainda sem linhas/buffer vazio.
  - Solução: fallback com mensagem inicial de stream de logs (`Log stream inicializado...`) e suporte a buffer em memória + arquivo.

- ✅ Erro: submenus de configurações não implementados/expandidos.
  - Causa: navegação tinha apenas item único `#/settings`.
  - Solução: inclusão de submenus na sidebar (`api`, `scheduler`, `content`, `player`, `tech`) e roteamento hash correspondente em `app.js` com renderização por seção em `settings.js`.

- ✅ Erro anterior: inconsistência de rota entre UI e API (`/refresh` vs `/sync`).
  - Solução: UI de canais alinhada para `POST /api/channels/:id/sync`.

- ✅ Erro anterior: falhas intermitentes em validação logo após restart do container.
  - Causa: startup race.
  - Solução: revalidações sequenciais após estabilidade do serviço, registradas no fluxo de testes.

- ✅ Erro: ao adicionar canal por `@handle` (ex.: `@cazetv`), a UI ficava sem feedback aparente.
  - Causa: o frontend de `channels` não tratava respostas HTTP não-2xx; a falha `400` voltava da API, mas não era exibida na tela.
  - Solução: tratamento explícito de `response.ok` com mensagem visual de erro/sucesso no formulário de canais.

- ✅ Erro: tela de Logs mostrava só a linha inicial e não refletia ações administrativas.
  - Causa: faltavam eventos de log nas rotas de configuração/canais/credenciais usadas no fluxo de operação da UI.
  - Solução: inclusão de logs estruturados nas rotas de ação (`channels`, `config`, `credentials`), garantindo entradas novas no stream `/api/logs` e no WebSocket.

- ✅ Erro: submenus de Configurações apareciam, mas carregavam conteúdo genérico (páginas não correspondentes).
  - Causa: `settings.js` reutilizava o mesmo formulário para todas as subrotas, mudando apenas título/subtítulo.
  - Solução: renderização por seção com formulários e ações específicas para `api`, `scheduler`, `content`, `player` e `tech`, alinhadas ao documento de implantação.




## Revisão Cloude 4.6

- ✅ Estabilização de proxy/stream (`src/player`) em `2026-03-02`:
  - `stream-registry`: ajuste de tolerância para clientes lentos (`draining` de 3s → 25s), aumento de threshold de backpressure, e logs de remoção com `client id` + motivo.
  - `smart-player`: timeout de init ampliado (5s → 15s), janela de graça para clientes concorrentes durante init e fallback de live baseado em "falhou sem primeiro byte" (mais confiável para erro `youtubei 400`).
  - `streamlink-runner`: ordem de argumentos corrigida (cookies/headers/opções antes de URL), retries base para live e log sanitizado do comando.
  - `ytdlp-runner`: resolução de URL mantida no modelo curto (`yt-dlp` resolve e sai), troca para `--print "%(url)s"`, parser de saída mais rígido, timeout/erro idempotentes e logs sanitizados.
  - `process-manager` + runners: `onExit` e `kill()` idempotentes para evitar limpeza duplicada/race.
  - Perfis/flags: parser de flags com suporte a aspas em `tool-profile-manager` e templates padrão do frontend revisados para defaults mais conservadores.
- ⚠️ Validação:
  - Build no host indisponível (`npm` ausente).
  - Build via Docker executado com sucesso no estágio de imagem (incluindo `RUN npm run build` no stage builder).
  - Execução de `npm run build` dentro do container runtime falha por ausência esperada de `tsc` (imagem de produção usa `npm ci --omit=dev`).

- ✅ Ajuste focado em estabilidade com 1 cliente (`2026-03-02`):
  - `stream-registry`: adicionado controle de fluxo por sessão (`pause/resume` da origem) quando há `draining` com cliente único, para reduzir perda de chunks por backpressure contínuo.
  - `smart-player`: sessão passa a registrar `flowControl` de cada processo (`streamlink`, `yt-dlp->ffmpeg`, `placeholder`) no registry.
  - `ytdlp-runner`: `ffmpeg` para VOD em modo pacing (`-re`) para evitar burst acima da taxa de reprodução.
  - `process-manager`: expostos `pauseOutput()`/`resumeOutput()` para backpressure cooperativo.
  - Build validado via `docker compose build` (stage builder com `tsc` concluído).

- ✅ Ajuste de robustez na resolução VOD (`2026-03-02`):
  - `ytdlp-runner`: ordem de tentativas de cliente alterada para `web -> default -> android` na resolução de URL.
  - Objetivo: reduzir bloqueios anti-bot em vídeos que abrem no navegador anônimo mas falham no cliente Android.
  - Logs agora indicam tentativa e estado de cookie (`cookie=on/off`) para diagnóstico mais rápido.

- ✅ Ajuste de ruído/latência no controle de backpressure (`2026-03-02`):
  - `stream-registry`: adicionado cooldown (`FLOW_RESUME_COOLDOWN_MS`) para evitar oscilação rápida de `pause/resume` em cliente único.
  - `stream-registry`: logs de `pause/resume` movidos para `debug` (deixam de poluir com centenas de `WARN` em condição normal de adaptação).
  - `smart-player`: timeout de encerramento de `ffmpeg-placeholder` ampliado para 5s antes de SIGKILL, reduzindo warnings de teardown.

- ✅ Ajuste de pacing/qualidade para live/upcoming (`2026-03-02`):
  - `ffmpeg-runner`: placeholder voltou a usar leitura em tempo real (`-re`) para evitar flood de `mpegts` e disparos de backpressure/watchdog em streams upcoming.
  - `streamlink-runner`: qualidade default voltou para `best`; o limitador temporário para `720p,480p,best` foi descartado porque o gargalo persistiu e não era a causa raiz.
  - `streamlink-runner`: encerramento normal por `SIGTERM` (`code=130`) passou a ser logado como `info`, reduzindo falso positivo de warning no teardown.

- ✅ Migração estrutural para HLS na branch `hls` (`2026-03-02`):
  - `smart-player`: deixou de entregar `mpegts` continuo por `stream-registry` e passou a orquestrar sessoes HLS compartilhadas por `videoId`.
  - `src/player/hls-session-registry.ts`: novo registry de sessao HLS com diretorio temporario, `manifestPath`, `killFn`, `touch()` e cleanup por idle timeout.
  - `src/player/hls-runner.ts`: novos runners ffmpeg para gerar HLS a partir de `pipe` (streamlink), `urls` resolvidas (yt-dlp) e `placeholder`.
  - `api/routes/player`: `/api/stream/:videoId` agora serve manifesto HLS; `/api/stream/:videoId/:segment` serve segmentos HLS; alias `/api/stream/:videoId/index.m3u8` adicionado.
  - `live`: `streamlink -> ffmpeg(HLS)` com fallback para `yt-dlp -> ffmpeg(HLS)` quando streamlink falha sem primeiro byte.
  - `vod`: `yt-dlp(resolve) -> ffmpeg(HLS)` com pacing para manter comportamento compartilhado de sessao.
  - `upcoming`: placeholder passou a ser entregue em HLS.
  - `DOC/PROMPT_HLS_MIGRATION.md`: prompt/desenho da arquitetura implementada para referencia da branch.
  - Validação: `docker compose build` concluido com sucesso apos a migração.

- ✅ Ajuste de bootstrap e janela HLS na branch `hls` (`2026-03-02`):
  - `smart-player`: manifesto HLS agora so e liberado apos buffer minimo de 4 segmentos, reduzindo inicio prematuro na borda do live/VOD/upcoming.
  - `smart-player`: playlists `live` e `upcoming` passam a anunciar `#EXT-X-START` com deslocamento negativo para incentivar o player a entrar alguns segundos atras do topo ao vivo.
  - `hls-runner`: `live` recebeu janela maior (`hls_list_size=15`) e `hls_delete_threshold=15`, preservando mais historico para clientes em momentos diferentes.
  - `hls-runner`: `vod` deixou de usar pacing de entrada (`-re`) e passou a manter janela maior sem `delete_segments`, reduzindo demora de abertura e microtravadas do cliente inicial.
  - `hls-runner`: `upcoming` trocou o placeholder baseado em `loop` de filtro por entrada de imagem em loop real (`-loop 1 -framerate 1 -re`), evitando que os numeros de segmentos disparem e causem `404`/pulo de canal.
  - Validação: `docker compose build` concluido com sucesso apos os ajustes.

- ✅ Correção do congelamento de VOD na branch `hls` (`2026-03-02`):
  - Causa identificada em log: `ffmpeg` do VOD encerrava com `code=0` e a sessao HLS era destruida imediatamente, congelando todos os clientes apesar do termino normal do gerador.
  - `hls-runner`: VOD passou a usar playlist HLS do tipo `event` e `hls_list_size=0`, abandonando o modelo de janela deslizante para comportamento de VOD estatico.
  - `smart-player`: saida normal (`code=0`) do pipeline VOD agora preserva a sessao/segmentos; destruicao automatica ficou restrita a saida anormal.
  - Validação: `docker compose build` concluido com sucesso apos a correção.

- ✅ Correção da abertura VOD apos ajuste HLS (`2026-03-02`):
  - Causa identificada em log: `-hls_playlist_type` foi inserido na posicao errada da linha de comando do `ffmpeg`, sendo interpretado como template de segmento (`Invalid segment filename template '-hls_playlist_type'`).
  - `hls-runner`: montagem de argumentos HLS refeita para anexar flags opcionais antes de `-hls_segment_filename` e do arquivo `index.m3u8`.
  - Validação: `docker compose build` concluido com sucesso apos o ajuste.

- ✅ Correção da regressao de VOD "reiniciando do zero" na branch `hls` (`2026-03-02`):
  - Causa identificada em log: clientes extras nao criavam nova sessao/novo `yt-dlp`; eles recebiam o mesmo manifesto VOD completo desde `segment_00000`, efeito direto do modo HLS estatico adotado no ajuste anterior.
  - `hls-runner`: VOD voltou para janela deslizante (`hls_list_size=24`, sem `playlist_type=event`), preservando a ideia de fluxo compartilhado em vez de arquivo completo desde o inicio.
  - `smart-player`: VOD voltou a usar pacing em tempo real (`-re`) e passou a publicar `#EXT-X-START` negativo para que clientes novos entrem perto do ponto atual da sessao.
  - `smart-player`: manifest bootstrap de VOD ficou em 3 segmentos para reduzir a demora inicial sem soltar manifesto cedo demais.
  - Validação: `docker compose build` concluido com sucesso apos a correção.

- ✅ Perfis avancados de bootstrap HLS na branch `hls` (`2026-03-02`):
  - `src/core/hls-start-profile-schema.ts`: novo schema central com nomes exatos dos campos, presets `aggressive/moderate/conservative`, defaults flat persistidos e metadata para UI.
  - `src/player/hls-advanced-config.ts`: novo resolvedor do perfil efetivo por playlist (`live`, `vod`, `upcoming`) com heranca do preset global e modo `custom`.
  - `src/core/db.ts`: defaults de `settings` expandidos com `HLS_START_*`.
  - `src/api/routes/config.ts`: novo endpoint `GET /api/config/hls-start-profiles/schema` para alimentar a UI administrativa.
  - `src/player/hls-session-registry.ts`: sessao HLS passa a carregar snapshot do perfil e usar `idleTimeoutSeconds` por playlist no sweep.
  - `src/player/hls-runner.ts`: flags HLS do ffmpeg passaram a usar `segmentDurationSeconds`, `maxSegments` e `deleteThreshold` do perfil.
  - `src/player/smart-player.ts`: bootstrap do manifesto, `#EXT-X-START`, ordem de fonte live, estrategia de resolve VOD e pacing VOD passaram a consumir o perfil efetivo da sessao.
  - `src/player/ytdlp-runner.ts`: suporte a estrategia configuravel de resolve (`auto`, `android-first`, `web-first`, `default-first`).
  - `public/js/settings.js`: novo card `Perfis de Start` em `API & Credenciais`, com preset global, override por playlist e campos avancados agrupados em `HLS`, `Start`, `Recovery` e `Source`.
  - `IMPLANTATION_HLS_ADVANCE.md`: especificacao objetiva da implantacao, incluindo estrutura JSON conceitual, chaves flat persistidas, tabelas de presets e decisoes/correcoes alem do plano.
  - Validação: `docker compose build` concluido com sucesso apos a implantacao.

- ✅ Ajuste de bootstrap HLS em duas fases na branch `hls` (`2026-03-03`):
  - `DOC/PROMPT_HLS_MIGRATION.md`: documentada a estrategia de `cold-start` vs `steady-state` para recuperar abertura rapida sem reencode.
  - `src/player/hls-session-registry.ts`: sessao HLS passou a guardar `firstManifestServedAt` e `manifestServeCount`.
  - `src/player/smart-player.ts`: leitura do manifesto agora usa politica derivada por fase:
    - primeiro manifesto usa gate mais agressivo por tipo (`live`, `vod`, `upcoming`);
    - manifestos seguintes voltam automaticamente ao preset estavel da sessao;
    - timeout de manifesto ganhou pequena extensao baseada em progresso de segmentos para reduzir `500` tardio em sessao que esta aquecendo.
  - `IMPLANTATION_HLS_ADVANCE.md`: documentada a decisao de manter presets/campos e mudar apenas a semantica de runtime para bootstrap inicial.
