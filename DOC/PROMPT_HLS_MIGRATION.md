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

## Ajuste Pos-Migracao: Bootstrap em Duas Fases sem Reencode

Objetivo: recuperar parte da abertura rapida observada no inicio da branch `hls`, sem abandonar a arquitetura HLS compartilhada e sem voltar ao fan-out fragil do `mpegts` continuo.

Problema observado:
- o estado atual ficou estavel com 1 ou varios clientes;
- a abertura piorou porque a sessao passou a usar o mesmo criterio para:
  - primeiro manifesto de uma sessao nova;
  - clientes posteriores em uma sessao ja aquecida.

Estrategia:
- manter o preset configurado como alvo de `steady-state`;
- derivar automaticamente um `cold-start` mais agressivo so para o primeiro manifesto servido da sessao;
- depois do primeiro manifesto, voltar imediatamente para a politica estavel do preset.

Regras de runtime:
- `live`
  - `cold-start`: `minReadySegments = max(2, steady - 2)`
  - `cold-start`: `startOffsetSeconds` mais proximo do topo ao vivo
  - `steady-state`: usa os valores do preset atual
- `vod`
  - `cold-start`: `minReadySegments = max(1, steady - 2)`
  - `cold-start`: sem `#EXT-X-START`, para abrir o primeiro cliente no inicio util do manifesto
  - `steady-state`: volta a usar `startOffsetSeconds` e `minReadySegments` do preset
- `upcoming`
  - `cold-start`: `minReadySegments = 1`
  - `cold-start`: sem offset inicial
  - `steady-state`: usa o preset atual

Regra de progresso:
- o timeout do manifesto continua vindo do preset;
- se a sessao estiver progredindo em numero de segmentos, o runtime pode conceder uma pequena extensao de graca por tipo (`live`, `vod`, `upcoming`) antes de declarar erro de manifesto indisponivel.

Impacto esperado:
- primeiro cliente abre mais cedo;
- clientes posteriores continuam entrando na sessao estabilizada;
- os presets continuam validos sem exigir novos campos na UI.

Impacto nos presets:
- nao cria novos presets nem novos campos obrigatorios;
- `minReadySegments` e `startOffsetSeconds` passam a representar o alvo estavel da sessao;
- o bootstrap inicial passa a ser derivado automaticamente desses valores.
