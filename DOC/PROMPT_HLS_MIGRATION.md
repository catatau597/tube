# Prompt HLS Migration

Objetivo: substituir a entrega proxy atual baseada em `mpegts` continuo + fan-out por sessoes HLS compartilhadas, mantendo as fontes atuais (`streamlink`, `yt-dlp`, `ffmpeg placeholder`) e preservando cookies, UA e perfis de origem.

Requisitos:
- `live`: `streamlink -> ffmpeg(HLS) -> sessao HLS -> clientes`
- `vod`: `yt-dlp(resolve) -> ffmpeg(HLS) -> sessao HLS -> clientes`
- `upcoming`: `ffmpeg placeholder -> HLS -> clientes`
- `proxy playlists` devem continuar apontando para `/api/stream/:videoId`
- `/api/stream/:videoId` deve servir manifesto HLS
- `/api/stream/:videoId/:segment` deve servir segmentos HLS
- fallback de `live` deve continuar: se `streamlink` falhar sem primeiro byte, trocar para `yt-dlp`
- entrega multi-cliente nao deve mais depender de `res.write(chunk)` em tempo real
- sessao deve ser encerrada por idle timeout
- logs devem mostrar criacao/destruicao de sessao HLS e fallbacks

Arquitetura desejada:
- `hls-session-registry`: estado por key, diretorio temporario, `manifestPath`, `lastAccessAt`, `killFn`
- `hls-runner`: wrappers de ffmpeg para gerar HLS de:
  - `pipe` (saida do streamlink)
  - `urls` resolvidas pelo `yt-dlp`
  - `placeholder`
- `smart-player`: orquestra fonte/sessao, sem `stream-registry.broadcast`
- `player route`: manifesto em `/api/stream/:videoId`, segmentos em `/api/stream/:videoId/:segment`

Criticos de estabilidade:
- nao reintroduzir bloqueio de cookies/UA/perfis
- nao usar `stream-registry` como mecanismo principal de entrega
- manifesto deve reescrever os nomes de segmentos para URLs absolutas do proprio proxy
- segmentos antigos podem expirar; o player deve se recuperar via HLS

Validacao minima:
- `docker compose build`
- `live`, `vod` e `upcoming` devem abrir via playlist proxy
- segundo cliente deve entrar pela mesma sessao HLS, sem fan-out bruto
