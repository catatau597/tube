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
