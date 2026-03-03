# PROGRESS_TS_PROXY

## Status atual

- Data: 2026-03-03
- Fase: planejamento
- Estado: plano de implantacao criado, sem alteracao ainda no runtime TS

## Decisoes registradas

- O `Dispatcharr` sera usado como referencia de design, nao como codigo para portar.
- A entrega principal continuara em `video/mp2t`.
- O modelo atual de `stream-registry` com broadcast direto sera substituido por sessao + buffer + cursor por cliente.
- O primeiro ciclo nao usara Redis.
- `vod` e `upcoming` entram primeiro na nova arquitetura.
- `live` sera migrado depois para `streamlink -> ffmpeg -> buffer`.
- `live` nao pode mais sair cru de `streamlink.stdout` para o cliente.
- UA, cookies e perfis atuais precisam ser preservados.
- A limpeza de HLS sera feita com auditoria, sem confundir HLS experimental com playlists IPTV do produto.

## Leitura do estado atual

- `src/player/smart-player.ts` usa `streamRegistry` como ponto central do player.
- `src/player/stream-registry.ts` ainda faz fan-out do mesmo chunk para todos os clientes.
- `src/player/ytdlp-runner.ts` ja oferece um caminho bom para reaproveitar em `vod`.
- `src/player/ffmpeg-runner.ts` ja atende bem o placeholder de `upcoming`.
- `src/player/streamlink-runner.ts` ainda precisa entrar num pipeline com `ffmpeg` antes do buffer.

## Residuos HLS observados nesta etapa

- Nao foram encontrados arquivos ativos de runtime HLS em `src/player`.
- Foram encontrados residuos textuais/documentais ligados a HLS, incluindo referencia de UI a "proxy HLS".
- Playlists `.m3u` e `.m3u8` do produto nao entram na limpeza desta migracao, porque nao sao o caminho de entrega experimental do player.

## Cuidados de colaboracao

- O worktree ja possui mudancas do usuario fora deste escopo.
- Foram observadas remocoes em `DOC/RESUMO_PARA_GPT_CODEX_.md`, `IMPLANTATION_CLAUDE_4.md` e `package.json`.
- Essas mudancas nao foram revertidas nem alteradas.

## Proximos passos planejados

1. Criar `src/player/ts-stream-buffer.ts`.
2. Criar `src/player/ts-session-registry.ts`.
3. Criar `src/player/ts-client-stream.ts`.
4. Criar `src/player/ts-source-manager.ts`.
5. Adaptar `src/player/smart-player.ts` para usar o novo caminho.
6. Migrar `vod` e `upcoming`.
7. Migrar `live`.
8. Remover fan-out antigo e residuos HLS.
9. Validar 1 e N clientes.

## Historico

### 2026-03-03

- Planejamento inicial criado.
- Arquitetura alvo definida como sessao bufferizada com cursor por cliente.
- Limpeza de HLS marcada como etapa obrigatoria da migracao, mas ainda nao executada.
- Fase 1 iniciada com criacao de `src/player/ts-stream-buffer.ts` e `src/player/ts-session-registry.ts`.
- O buffer foi definido com indices monotonicos, janela fixa em RAM e espera assíncrona para novos chunks.
- O registry passou a controlar lifecycle de sessao, `clientCount`, `sourceProcess`, `state` e idle timeout.
- Chaves de configuracao adotadas nesta fase: `TS_PROXY_INITIAL_BEHIND_CHUNKS`, `TS_PROXY_MAX_CLIENT_LAG_CHUNKS`, `TS_PROXY_MAX_BUFFERED_CHUNKS`, `TS_PROXY_IDLE_TIMEOUT_MS`.
- Nesta etapa os novos modulos ainda nao substituem o caminho principal do `smart-player`.
- Fase 2 iniciada com criacao de `src/player/ts-client-stream.ts`.
- O cliente agora tem cursor proprio, lote de leitura, espera por novos chunks, salto para frente e encerramento individual por ghost/backpressure.
- Chaves de configuracao adotadas nesta etapa: `TS_PROXY_GHOST_CLIENT_THRESHOLD`, `TS_PROXY_READ_BATCH_CHUNKS`, `TS_PROXY_CLIENT_WAIT_TIMEOUT_MS`, `TS_PROXY_DRAIN_TIMEOUT_MS`.
- Fase 3 iniciada com criacao de `src/player/ts-source-manager.ts` e integracao parcial em `src/player/smart-player.ts`.
- `vod` e `upcoming` passaram a abrir sessao bufferizada via `tsSessionRegistry`, `TsSourceManager` e `TsClientStream`.
- `live` permanece temporariamente no caminho legado com `stream-registry`, aguardando a migracao para `streamlink -> ffmpeg -> buffer`.
- Fase 4 iniciada com pipeline `streamlink -> ffmpeg normalizer -> buffer`.
- `live` passou a apontar para o caminho bufferizado, usando `startStreamlinkProcess` e `startFfmpegTsNormalizer`.
- O `stream-registry` legado deixou de ser o caminho principal do `smart-player`; ele permanece apenas como fallback residual do fluxo antigo ainda presente no arquivo.
- Fase 5 iniciada com remocao do fluxo legado de `smart-player`.
- `src/player/stream-registry.ts` foi removido do projeto por ter ficado sem uso.
- O endpoint do player e os textos de UI ligados ao player foram atualizados de "proxy HLS" para "proxy TS" onde fazia sentido.
