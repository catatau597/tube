# PROGRESS_TS_PROXY_2026-03-03

## Registro da etapa

Esta entrada registra a fase de levantamento e desenho inicial da implantacao TS buffered.

## Referencias lidas

- `src/player/smart-player.ts`
- `src/player/stream-registry.ts`
- `src/player/ffmpeg-runner.ts`
- `src/player/streamlink-runner.ts`
- `src/player/ytdlp-runner.ts`
- `/tmp/Dispatcharr_ref/apps/proxy/ts_proxy/stream_buffer.py`
- `/tmp/Dispatcharr_ref/apps/proxy/ts_proxy/stream_generator.py`
- `/tmp/Dispatcharr_ref/apps/proxy/ts_proxy/stream_manager.py`
- `/tmp/Dispatcharr_ref/apps/proxy/ts_proxy/client_manager.py`
- `/tmp/Dispatcharr_ref/apps/proxy/ts_proxy/views.py`

## Conclusoes desta leitura

- O gargalo arquitetural atual esta no fan-out por `broadcast`.
- O ponto mais estavel ja existente no projeto e o pipeline `yt-dlp -> ffmpeg`.
- O placeholder de `upcoming` ja esta alinhado ao modelo de uma origem escrevendo para um consumidor.
- O maior risco tecnico da migracao esta em `live`, que precisa de normalizacao TS antes do buffer.
- O `Dispatcharr` e util como referencia de comportamento, especialmente para:
  - cursor por cliente
  - entrada protegida atras do head
  - salto para frente
  - tratamento individual de cliente lento

## Regras aceitas para a implantacao

- Nao usar HLS como entrega principal nesta branch.
- Nao introduzir Redis agora.
- Nao quebrar credenciais, cookies e perfis.
- Nao reverter mudancas do usuario fora do escopo.
- Sempre registrar decisoes e alteracoes em arquivos `PROGRESS_TS_PROXY*.md`.

## Resultado desta etapa

- Documento base de implantacao criado em `DOC/IMPLANTATION_TS_PROXY.md`.
- Documento consolidado de progresso criado em `DOC/PROGRESS_TS_PROXY.md`.
- Nenhuma alteracao ainda em codigo de runtime.

## Atualizacao posterior no mesmo dia

- Foram criados `src/player/ts-stream-buffer.ts` e `src/player/ts-session-registry.ts`.
- `ts-stream-buffer.ts` implementa:
  - ring buffer em RAM
  - indices monotonicos por chunk
  - `append`, `getCurrentIndex`, `readFrom`, `getInitialClientIndex`, `isTooFarBehind`, `skipAheadIndex`
  - espera assíncrona por novos chunks via `waitForIndex`
- `ts-session-registry.ts` implementa:
  - sessao por `key`
  - `kind`, `buffer`, `sourceProcess`, `createdAt`, `lastAccessAt`, `clientCount`, `state`
  - idle timeout por sessao
  - hooks de destroy e logs de lifecycle
- Os modulos foram adicionados sem trocar ainda o fluxo principal de `smart-player`, para manter a migracao em fases.

## Atualizacao adicional no mesmo dia

- Foi criado `src/player/ts-client-stream.ts`.
- O modulo foi desenhado para:
  - iniciar o cliente alguns chunks atras do head
  - ler do buffer com cursor proprio
  - aguardar novos chunks sem broadcast compartilhado
  - saltar para frente quando o cursor ficar atrasado
  - encerrar individualmente cliente ghost ou preso em `drain`
- Ainda nao houve o acoplamento com `smart-player`; esta etapa prepara a integracao da Fase 3.

## Atualizacao de integracao no mesmo dia

- Foi criado `src/player/ts-source-manager.ts`.
- `src/player/smart-player.ts` agora direciona `vod` e `upcoming` para o novo caminho bufferizado.
- O caminho bufferizado atual faz:
  - criacao ou reaproveitamento de sessao em `tsSessionRegistry`
  - subida da origem por `TsSourceManager`
  - conexao do cliente por `TsClientStream`
- O caminho legado ainda fica responsavel apenas por `live` genuinamente ao vivo e pelo fluxo antigo ainda nao migrado.

## Atualizacao de live no mesmo dia

- `src/player/streamlink-runner.ts` passou a expor `startStreamlinkProcess`, separado do consumo por callback.
- `src/player/ffmpeg-runner.ts` passou a expor `startFfmpegTsNormalizer` para normalizacao TS por `stdin/stdout`.
- `src/player/ts-source-manager.ts` ganhou o pipeline `live` com `streamlink -> ffmpeg normalizer -> buffer`.
- `src/player/smart-player.ts` passou a enviar `live` genuinamente ao vivo para a sessao bufferizada.

## Atualizacao de limpeza no mesmo dia

- O `smart-player` foi reescrito para operar apenas no caminho bufferizado.
- `src/player/stream-registry.ts` foi removido por nao ter mais referencias ativas.
- Comentarios do router e texto de UI foram ajustados para "proxy TS".
- A limpeza foi limitada ao escopo do player; playlists IPTV e referencias historicas em documentacao nao foram apagadas.

## Atualizacao de robustez no mesmo dia

- `src/player/smart-player.ts` passou a reagir tambem a:
  - `req.aborted`
  - `req.socket.close`
  - `res.socket.close`
  - `socket.error`
- `src/player/ts-client-stream.ts` ganhou watchdog por cliente no modelo novo.
- O watchdog corta conexoes fantasma quando o cliente fica em `writableNeedDrain` por tempo prolongado sem progresso de escrita.
- `src/player/ts-session-registry.ts` passou a rastrear clientes por `clientId`, com heartbeat e snapshot de socket/resposta.
- Foi adicionado watchdog por sessao para diagnostico periodico e remocao de cliente sem heartbeat ou ja marcado como terminal no heartbeat.
- `src/player/smart-player.ts` passou a logar `cleanup(reason)` com estado de `req`, `res` e `socket`, alem de registrar cada evento individual recebido.
- `src/player/ts-client-stream.ts` passou a considerar tambem `writableLength` e `socket.bufferSize` estagnados como sinal de cliente fantasma.
