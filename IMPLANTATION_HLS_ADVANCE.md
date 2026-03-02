# HLS Advanced Start Profiles

## Objetivo

Implementar uma camada de configuracao explicita para bootstrap/abertura das sessoes HLS, separada de flags brutas das ferramentas.

O foco desta implantacao foi:

1. manter a estabilidade atual da branch `hls`;
2. expor presets por comportamento de sessao, nao por ferramenta;
3. permitir override por playlist (`live`, `vod`, `upcoming`);
4. documentar valores reais usados pelo runtime.

## Decisao de arquitetura

Foi adotado o modelo abaixo:

1. `Preset Global`
2. `Override por playlist`
3. `Campos avancados por playlist`

Nao foi adotado preset principal por ferramenta (`ffmpeg`, `streamlink`, `yt-dlp`), porque o problema real de abertura esta na politica de bootstrap HLS e nao em uma ferramenta isolada.

## Local da UI

Nova secao em:

- `API & Credenciais`
- card `Perfis de Start`

## API adicionada

- `GET /api/config/hls-start-profiles/schema`

Retorna:

1. presets reais;
2. schema dos campos;
3. defaults flat persistidos em `settings`.

## Estrutura JSON conceitual

Esta e a estrutura conceitual do recurso. No banco ela continua persistida como chaves flat em `settings`.

```json
{
  "hlsStartProfiles": {
    "global": {
      "preset": "moderate"
    },
    "live": {
      "inheritGlobal": true,
      "preset": "moderate",
      "custom": {
        "segmentDurationSeconds": 2,
        "maxSegments": 15,
        "deleteThreshold": 15,
        "idleTimeoutSeconds": 45,
        "manifestTimeoutMs": 15000,
        "minReadySegments": 4,
        "startOffsetSeconds": -8,
        "liveSourcePriority": "streamlink-first",
        "vodResolveStrategy": "android-first",
        "vodPaceInput": true
      }
    },
    "vod": {
      "inheritGlobal": true,
      "preset": "moderate",
      "custom": {
        "segmentDurationSeconds": 2,
        "maxSegments": 24,
        "deleteThreshold": null,
        "idleTimeoutSeconds": 45,
        "manifestTimeoutMs": 15000,
        "minReadySegments": 3,
        "startOffsetSeconds": -6,
        "liveSourcePriority": "streamlink-first",
        "vodResolveStrategy": "android-first",
        "vodPaceInput": true
      }
    },
    "upcoming": {
      "inheritGlobal": true,
      "preset": "moderate",
      "custom": {
        "segmentDurationSeconds": 2,
        "maxSegments": 20,
        "deleteThreshold": null,
        "idleTimeoutSeconds": 45,
        "manifestTimeoutMs": 15000,
        "minReadySegments": 4,
        "startOffsetSeconds": -8,
        "liveSourcePriority": "streamlink-first",
        "vodResolveStrategy": "android-first",
        "vodPaceInput": true
      }
    }
  }
}
```

## Campos exatos persistidos

### Global

| Chave | Tipo | Default |
|---|---:|---:|
| `HLS_START_GLOBAL_PROFILE` | string | `moderate` |

Valores aceitos:

- `aggressive`
- `moderate`
- `conservative`

### Live

| Chave | Tipo | Default |
|---|---:|---:|
| `HLS_START_LIVE_INHERIT_GLOBAL` | bool string | `true` |
| `HLS_START_LIVE_PROFILE` | string | `moderate` |
| `HLS_START_LIVE_SEGMENT_DURATION` | number string | `2` |
| `HLS_START_LIVE_MAX_SEGMENTS` | number string | `15` |
| `HLS_START_LIVE_DELETE_THRESHOLD` | number string | `15` |
| `HLS_START_LIVE_IDLE_TIMEOUT_SECONDS` | number string | `45` |
| `HLS_START_LIVE_MANIFEST_TIMEOUT_MS` | number string | `15000` |
| `HLS_START_LIVE_MIN_READY_SEGMENTS` | number string | `4` |
| `HLS_START_LIVE_START_OFFSET_SECONDS` | number string | `-8` |
| `HLS_START_LIVE_LIVE_SOURCE_PRIORITY` | string | `streamlink-first` |
| `HLS_START_LIVE_VOD_RESOLVE_STRATEGY` | string | `android-first` |
| `HLS_START_LIVE_VOD_PACE_INPUT` | bool string | `true` |

### VOD

| Chave | Tipo | Default |
|---|---:|---:|
| `HLS_START_VOD_INHERIT_GLOBAL` | bool string | `true` |
| `HLS_START_VOD_PROFILE` | string | `moderate` |
| `HLS_START_VOD_SEGMENT_DURATION` | number string | `2` |
| `HLS_START_VOD_MAX_SEGMENTS` | number string | `24` |
| `HLS_START_VOD_DELETE_THRESHOLD` | string vazio ou numero | `` |
| `HLS_START_VOD_IDLE_TIMEOUT_SECONDS` | number string | `45` |
| `HLS_START_VOD_MANIFEST_TIMEOUT_MS` | number string | `15000` |
| `HLS_START_VOD_MIN_READY_SEGMENTS` | number string | `3` |
| `HLS_START_VOD_START_OFFSET_SECONDS` | number string | `-6` |
| `HLS_START_VOD_LIVE_SOURCE_PRIORITY` | string | `streamlink-first` |
| `HLS_START_VOD_VOD_RESOLVE_STRATEGY` | string | `android-first` |
| `HLS_START_VOD_VOD_PACE_INPUT` | bool string | `true` |

### Upcoming

| Chave | Tipo | Default |
|---|---:|---:|
| `HLS_START_UPCOMING_INHERIT_GLOBAL` | bool string | `true` |
| `HLS_START_UPCOMING_PROFILE` | string | `moderate` |
| `HLS_START_UPCOMING_SEGMENT_DURATION` | number string | `2` |
| `HLS_START_UPCOMING_MAX_SEGMENTS` | number string | `20` |
| `HLS_START_UPCOMING_DELETE_THRESHOLD` | string vazio ou numero | `` |
| `HLS_START_UPCOMING_IDLE_TIMEOUT_SECONDS` | number string | `45` |
| `HLS_START_UPCOMING_MANIFEST_TIMEOUT_MS` | number string | `15000` |
| `HLS_START_UPCOMING_MIN_READY_SEGMENTS` | number string | `4` |
| `HLS_START_UPCOMING_START_OFFSET_SECONDS` | number string | `-8` |
| `HLS_START_UPCOMING_LIVE_SOURCE_PRIORITY` | string | `streamlink-first` |
| `HLS_START_UPCOMING_VOD_RESOLVE_STRATEGY` | string | `android-first` |
| `HLS_START_UPCOMING_VOD_PACE_INPUT` | bool string | `true` |

## Tabela de presets

### Live

| Campo | Aggressive | Moderate | Conservative |
|---|---:|---:|---:|
| `segmentDurationSeconds` | `2` | `2` | `3` |
| `maxSegments` | `10` | `15` | `18` |
| `deleteThreshold` | `6` | `15` | `18` |
| `idleTimeoutSeconds` | `30` | `45` | `60` |
| `manifestTimeoutMs` | `9000` | `15000` | `22000` |
| `minReadySegments` | `2` | `4` | `5` |
| `startOffsetSeconds` | `-4` | `-8` | `-12` |
| `liveSourcePriority` | `streamlink-first` | `streamlink-first` | `streamlink-first` |

### VOD

| Campo | Aggressive | Moderate | Conservative |
|---|---:|---:|---:|
| `segmentDurationSeconds` | `2` | `2` | `3` |
| `maxSegments` | `16` | `24` | `28` |
| `deleteThreshold` | `null` | `null` | `null` |
| `idleTimeoutSeconds` | `45` | `45` | `60` |
| `manifestTimeoutMs` | `12000` | `15000` | `25000` |
| `minReadySegments` | `2` | `3` | `4` |
| `startOffsetSeconds` | `-3` | `-6` | `-8` |
| `vodResolveStrategy` | `android-first` | `android-first` | `auto` |
| `vodPaceInput` | `true` | `true` | `true` |

### Upcoming

| Campo | Aggressive | Moderate | Conservative |
|---|---:|---:|---:|
| `segmentDurationSeconds` | `1` | `2` | `2` |
| `maxSegments` | `8` | `20` | `24` |
| `deleteThreshold` | `null` | `null` | `null` |
| `idleTimeoutSeconds` | `20` | `45` | `60` |
| `manifestTimeoutMs` | `5000` | `15000` | `18000` |
| `minReadySegments` | `1` | `4` | `3` |
| `startOffsetSeconds` | `-2` | `-8` | `-6` |

## Campos aplicados no runtime

### Ja ativos

| Campo | Uso atual |
|---|---|
| `segmentDurationSeconds` | `ffmpeg -hls_time` |
| `maxSegments` | `ffmpeg -hls_list_size` |
| `deleteThreshold` | `ffmpeg -hls_delete_threshold` quando definido |
| `idleTimeoutSeconds` | sweep de sessao HLS |
| `manifestTimeoutMs` | timeout de bootstrap do manifesto |
| `minReadySegments` | gating do manifesto antes de responder `/api/stream/:videoId` |
| `startOffsetSeconds` | `#EXT-X-START` injetado no manifesto |
| `liveSourcePriority` | escolhe `streamlink-first` vs `yt-dlp-first` no start de live |
| `vodResolveStrategy` | ordenacao de tentativas do `yt-dlp` |
| `vodPaceInput` | liga/desliga `-re` no pipeline VOD |

### Ainda nao expandidos para estrategia mais ampla

Os grupos `Recovery` e `Source` foram mantidos pequenos nesta fase, para nao misturar tuning estrutural com comportamento ainda nao validado no runtime.

## Mapeamento de grupos na UI

### HLS

- `segmentDurationSeconds`
- `maxSegments`
- `deleteThreshold`

### Start

- `manifestTimeoutMs`
- `minReadySegments`
- `startOffsetSeconds`

### Recovery

- `idleTimeoutSeconds`

### Source

- `liveSourcePriority`
- `vodResolveStrategy`
- `vodPaceInput`

## Fluxo de resolucao do perfil efetivo

```text
tipo da playlist
  -> verifica HLS_START_<TYPE>_INHERIT_GLOBAL
    -> true: usa preset global para aquele tipo
    -> false:
         -> se HLS_START_<TYPE>_PROFILE = custom, usa campos custom
         -> senao usa preset escolhido para aquele tipo
```

## Arquivos implementados/alterados

- `src/core/hls-start-profile-schema.ts`
- `src/player/hls-advanced-config.ts`
- `src/core/db.ts`
- `src/api/routes/config.ts`
- `src/player/hls-session-registry.ts`
- `src/player/hls-runner.ts`
- `src/player/smart-player.ts`
- `src/player/ytdlp-runner.ts`
- `public/js/settings.js`

## Correcoes, erros e decisoes alem do planejado

### 1. Preset por ferramenta foi descartado

Decisao:

- nao usar `aggressive/moderate/conservative` como eixo principal de `ffmpeg`, `streamlink` e `yt-dlp`;
- usar por playlist/comportamento de sessao.

Motivo:

- o log mostrou que o gargalo real esta no bootstrap do HLS, nao numa ferramenta isolada.

### 2. `Global` ficou somente com preset, sem custom global

Decisao:

- `Global` define apenas o preset-base;
- `custom` existe apenas por playlist.

Motivo:

- um `custom global` unico deixaria live, vod e upcoming acoplados demais;
- o objetivo desta tela e justamente permitir diferenciar os tres tipos.

### 3. Defaults preservam a estabilidade atual

Decisao:

- `moderate` foi alinhado aos valores estaveis atuais da branch `hls`.

Motivo:

- evitar regressao imediata ao apenas habilitar a nova tela/configuracao.

### 4. `Recovery` entrou em escopo reduzido

Decisao:

- nesta fase, `Recovery` controla somente `idleTimeoutSeconds`.

Motivo:

- o restante de recovery ainda nao estava claramente estabilizado no runtime atual;
- expor knobs nao conectados seria enganoso.

### 5. `Source` entrou com o minimo necessario

Decisao:

- foram ligados apenas:
  - `liveSourcePriority`
  - `vodResolveStrategy`
  - `vodPaceInput`

Motivo:

- sao os parametros de fonte que ja impactam diretamente o comportamento de abertura sem reescrever todo o pipeline.

### 6. Timeout de init da sessao foi separado do timeout do manifesto

Correcao feita durante a implantacao:

- `waitForInit()` deixou de depender do timeout fixo antigo do manifesto e passou a usar um timeout mais conservador da criacao da sessao.

Motivo:

- bootstrap do manifesto agora e configuravel por playlist;
- a criacao da sessao precisa de um limite independente.

## Estado final desta implantacao

Implementado na branch `hls`:

1. schema central de presets/campos/defaults;
2. persistencia em `settings`;
3. card administrativo em `API & Credenciais`;
4. endpoint de schema para a UI;
5. consumo real dos valores de bootstrap/HLS no runtime;
6. documentacao desta implantacao.
