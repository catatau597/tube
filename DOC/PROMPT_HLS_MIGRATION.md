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

## Plano Tecnico: Fast-Start para o Primeiro Cliente e Warm-Join para os Demais

Objetivo: recuperar a abertura rapida observada no inicio da branch `hls`, sem abandonar a arquitetura HLS compartilhada e sem voltar ao fan-out fragil do `mpegts` continuo.

Problema observado:
- o estado atual ficou estavel com 1 ou varios clientes;
- a abertura piorou porque a sessao passou a usar a mesma politica para:
  - o primeiro cliente de uma sessao nova;
  - clientes adicionais entrando numa sessao ja aquecida.

Decisao:
- o primeiro cliente usa `fast-start`;
- clientes seguintes usam `warm-join`;
- os presets continuam definindo o alvo estavel da sessao;
- o bootstrap inicial continua derivado automaticamente no runtime.

Estado de sessao necessario:
- `firstManifestServedAt`
- `firstSegmentServedAt`
- `warmAt`
- `lastKnownSegmentCount`
- `manifestServeCount`

Estados logicos:
- `fast-start`
  - usado enquanto a sessao ainda nao aqueceu;
  - serve o primeiro cliente com gate mais agressivo.
- `warm-join`
  - usado depois que a sessao acumulou segmentos reais suficientes;
  - protege a entrada dos clientes seguintes.

Regras de runtime:
- `live`
  - `fast-start`: `minReadySegments = max(2, steady - 2)`
  - `fast-start`: `startOffsetSeconds` mais proximo do topo ao vivo
  - `warm-join`: usa exatamente o preset atual
  - aquecimento: `segments >= max(3, steady)`
- `vod`
  - `fast-start`: `minReadySegments = max(1, steady - 2)`
  - `fast-start`: sem `#EXT-X-START`
  - `warm-join`: usa exatamente o preset atual
  - aquecimento: `segments >= max(2, steady)`
- `upcoming`
  - `fast-start`: `minReadySegments = 1`
  - `fast-start`: sem offset inicial
  - `warm-join`: usa exatamente o preset atual
  - aquecimento: `segments >= 2`

Regra de progresso:
- o timeout do manifesto continua vindo do preset;
- se a sessao estiver progredindo em numero de segmentos, o runtime pode conceder uma pequena extensao de graca por tipo (`live`, `vod`, `upcoming`) antes de declarar erro de manifesto indisponivel.

Impacto esperado:
- primeiro cliente abre com politica agressiva;
- clientes adicionais so entram com a sessao aquecida;
- evita repetir o erro da fase inicial da branch, onde clientes extras entravam cedo demais e travavam.

Impacto nos presets:
- nao cria novos presets nem novos campos obrigatorios;
- `minReadySegments` e `startOffsetSeconds` passam a representar o alvo de `warm-join`;
- `fast-start` e calculado automaticamente a partir do preset efetivo da playlist.
