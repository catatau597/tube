# IMPLANTATION_TS_PROXY

## Objetivo

Abandonar a entrega HLS experimental como caminho principal e reconstruir a entrega `.ts` em `video/mp2t` com estabilidade para 1 ou N clientes, usando como referencia conceitual o `Dispatcharr` em `/tmp/Dispatcharr_ref/apps/proxy/ts_proxy`, mas implementando a solucao em Node/TypeScript dentro deste projeto.

## Escopo desta implantacao

- Substituir o modelo atual de fan-out direto em `src/player/stream-registry.ts`.
- Manter a entrega final em `video/mp2t`.
- Usar buffer de sessao em RAM, sem Redis no primeiro passo.
- Preservar UA, cookies, perfis e fluxo atual de resolucao/fonte.
- Migrar `vod` e `upcoming` primeiro.
- Migrar `live` depois para `streamlink -> ffmpeg -> buffer`.
- Remover HLS como caminho principal nesta branch.

## Diagnostico do estado atual

### Estado atual do projeto

- `src/player/smart-player.ts` cria ou reaproveita uma sessao e conecta cada cliente direto ao `streamRegistry`.
- `src/player/stream-registry.ts` faz fan-out por `res.write(chunk)` do mesmo chunk para todos os clientes.
- `src/player/ytdlp-runner.ts` ja possui caminho relativamente estavel `yt-dlp -> ffmpeg -> pipe:1`.
- `src/player/ffmpeg-runner.ts` ja possui placeholder funcional para `upcoming`.
- `src/player/streamlink-runner.ts` ainda entrega `stdout` bruto de `streamlink`, sem normalizacao obrigatoria por `ffmpeg`.

### Limites do modelo atual

- Cliente novo entra no meio do fluxo sem join protegido.
- Cliente lento interfere no comportamento global da sessao.
- Slow client e ghost client sao tratados em volta do broadcast, nao no nivel do cursor individual.
- `live` cru de `streamlink` continua suscetivel a artefatos, tela verde e travamentos.
- O produtor conhece implicitamente o ritmo dos clientes, o que nao escala bem para multi-cliente.

## Principios de arquitetura

- Uma sessao por `key`.
- Uma origem por sessao.
- Um buffer central por sessao.
- Um cursor por cliente.
- Cliente novo entra alguns chunks atras do head.
- Cliente atrasado demais salta para frente ou e encerrado sem afetar os demais.
- A origem so escreve no buffer e nao conhece clientes diretamente.
- Logs devem refletir lifecycle de sessao, cliente e origem.

## Mapeamento de referencia

### Dispatcharr como referencia de design

- `stream_buffer.py`: buffer indexado com leitura por indice.
- `stream_generator.py`: cursor por cliente, join atras do head, salto para frente.
- `stream_manager.py`: origem isolada dos clientes.
- `client_manager.py`: lifecycle individual do cliente.
- `views.py`: entrada HTTP desacoplada da origem.

### Adaptacao para este projeto

- Nao portar codigo literalmente.
- Reproduzir a ideia central em TypeScript.
- Nao introduzir Redis neste primeiro ciclo.
- Aproveitar o pipeline ja validado de `yt-dlp` e `ffmpeg`.

## Desenho alvo por arquivo

### `src/player/ts-session-registry.ts`

Responsabilidades:

- Manter sessoes por `key`.
- Criar sessao sob demanda.
- Controlar `createdAt`, `lastAccessAt`, `clientCount`, `state`.
- Encerrar sessao por idle timeout.
- Expor operacoes de aquisicao, release e cleanup.

Estrutura base da sessao:

```ts
type TsSessionKind = 'live' | 'vod' | 'upcoming';
type TsSessionState = 'initializing' | 'active' | 'stopping' | 'stopped' | 'error';

interface TsSession {
  key: string;
  kind: TsSessionKind;
  buffer: TsStreamBuffer;
  sourceProcess: ManagedProcess | null;
  createdAt: number;
  lastAccessAt: number;
  clientCount: number;
  state: TsSessionState;
}
```

### `src/player/ts-stream-buffer.ts`

Responsabilidades:

- Implementar ring buffer em memoria.
- Indexar chunks de forma monotona.
- Fornecer leitura por cursor.
- Calcular indice inicial de um novo cliente.
- Detectar cliente atrasado demais.
- Calcular salto para frente.

API alvo:

```ts
append(chunk: Buffer): void
getCurrentIndex(): number
readFrom(index: number, maxChunks: number): { chunks: Buffer[]; nextIndex: number }
getInitialClientIndex(): number
isTooFarBehind(index: number): boolean
skipAheadIndex(): number
```

Decisoes de implementacao:

- Buffer em RAM com array circular ou deque indexado.
- Armazenar `startIndex`, `endIndex` e lista de chunks.
- Nao usar `res.write()` dentro do buffer.
- Nao pausar a origem por cliente lento no modo multi-cliente.

### `src/player/ts-client-stream.ts`

Responsabilidades:

- Representar um cliente conectado a uma sessao.
- Manter `clientId`, `localIndex`, metricas e estado.
- Ler do buffer no proprio ritmo.
- Esperar pouco quando estiver no head.
- Saltar para frente quando muito atrasado.
- Encerrar ghost client sem afetar a sessao.

Comportamento alvo:

- Cliente novo entra em `buffer.getInitialClientIndex()`.
- Em cada iteracao, le `N` chunks do proprio cursor.
- Se nao houver chunk e a origem ainda estiver viva, espera curto com contador de vazios.
- Se `isTooFarBehind(localIndex)`, move para `skipAheadIndex()`.
- Se exceder `ghostClientThreshold`, encerra.

### `src/player/ts-source-manager.ts`

Responsabilidades:

- Criar a origem correta por `kind`.
- Conectar `stdout` da origem ao `buffer.append()`.
- Encerrar sessao ao finalizar a origem, se apropriado.
- Nao conhecer clientes.

Fluxos alvo:

- `live`: `streamlink -> ffmpeg -> buffer`
- `vod`: `yt-dlp -> ffmpeg -> buffer`
- `upcoming`: `ffmpeg placeholder -> buffer`

Ponto critico:

- `live` nao deve mais escrever `streamlink.stdout` cru no buffer.
- Deve haver normalizacao por `ffmpeg` antes do `append`, mesmo sem reencode pesado.

### `src/player/smart-player.ts`

Responsabilidades apos migracao:

- `GET /api/stream/:videoId` abre ou reaproveita sessao TS.
- Resolve `kind` da stream.
- Usa `ts-session-registry` para lifecycle.
- Cria `ts-client-stream` para cada resposta HTTP.
- Remove uso do `stream-registry` como caminho principal.

## Fluxo alvo

### 1. Abertura da sessao

1. `smart-player` resolve `key` e `kind`.
2. `ts-session-registry` cria ou retorna uma sessao existente.
3. Se a sessao for nova, `ts-source-manager` sobe a origem.
4. A origem escreve somente no buffer.

### 2. Entrada do cliente

1. Cliente recebe `clientId`.
2. `localIndex` inicia alguns chunks atras do head.
3. A resposta HTTP comeca a drenar chunks a partir do proprio cursor.
4. O cliente nao participa do ritmo dos outros clientes.

### 3. Cliente atrasado

1. Se o cursor sair da janela retida, o cliente e marcado como atrasado.
2. O cliente salta para `skipAheadIndex()` ou e encerrado.
3. A sessao e os demais clientes continuam intactos.

### 4. Encerramento

1. Cliente fecha: contador decrementa.
2. Sessao sem clientes por `idleTimeoutMs`: origem finaliza e sessao e destruida.
3. Logs registram criacao, uso, salto, encerramento e cleanup.

## Politicas recomendadas

Valores iniciais para calibracao:

- `initialBehindChunks`: 3 a 6
- `maxClientLagChunks`: 24 a 48
- `maxBufferedChunks`: 64 a 128
- `ghostClientThreshold`: 20 a 40 leituras vazias
- `idleTimeoutMs`: 30000 a 60000
- `readBatchChunks`: 2 a 6 por iteracao

Observacao:

- Esses valores devem ser afinados com teste real de bitrate e latencia.
- `vod` e `upcoming` tendem a aceitar buffer maior.
- `live` pode exigir janela menor e salto mais agressivo.

## Fases de implementacao

### Fase 0 - Preparacao e instrumentacao

- Criar este plano e o(s) arquivo(s) de progresso.
- Mapear referencias HLS e arquivos sem uso.
- Preservar worktree do usuario fora do escopo.
- Definir logs minimos obrigatorios.

### Fase 1 - Buffer e sessao

- Criar `ts-stream-buffer.ts`.
- Criar `ts-session-registry.ts`.
- Adicionar cleanup por idle timeout.
- Adicionar logs de criacao e destruicao de sessao.

Entrega minima:

- Sessao e buffer criados sem integrar ao endpoint principal.

### Fase 2 - Cliente com cursor proprio

- Criar `ts-client-stream.ts`.
- Implementar entrada atras do head.
- Implementar leitura por cursor e lote de chunks.
- Implementar salto para frente e corte de ghost client.
- Adicionar logs de entrada, cursor inicial, salto e encerramento.

Entrega minima:

- Cliente consegue consumir de um buffer em memoria sem broadcast bruto.

### Fase 3 - Migracao de `vod` e `upcoming`

- Criar `ts-source-manager.ts`.
- Plugar `yt-dlp -> ffmpeg -> buffer` em `vod`.
- Plugar `ffmpeg placeholder -> buffer` em `upcoming`.
- Ajustar `smart-player.ts` para usar TS buffered path nessas categorias.

Entrega minima:

- `vod` e `upcoming` funcionando com 1 e 2 clientes sobre a nova arquitetura.

### Fase 4 - Migracao de `live`

- Trocar `streamlink -> broadcast` por `streamlink -> ffmpeg -> buffer`.
- Garantir preservacao de UA, cookie jar e flags de perfil.
- Definir normalizacao minima do ffmpeg para TS estavel.
- Adicionar fallback e encerramento correto da origem.

Entrega minima:

- `live` com 1 e 2 clientes sem tela verde e sem travar ambos quando entra cliente extra.

### Fase 5 - Remocao do fan-out antigo e limpeza

- Remover `stream-registry.ts` do caminho principal.
- Remover codigo, comentarios e logs de HLS experimental que nao tenham mais uso.
- Remover helpers, flags e arquivos mortos descobertos durante a migracao.
- Atualizar textos de UI e docs que ainda falem em proxy HLS quando o alvo agora e TS buffered.

Regra importante:

- Nao remover playlists IPTV `.m3u` ou `.m3u8` do produto; isso e outra concern e nao equivale ao HLS experimental do player.

### Fase 6 - Validacao final

- Validar `vod`, `upcoming` e `live` com 1 cliente.
- Validar `vod`, `upcoming` e `live` com 2+ clientes.
- Rodar `docker compose build`.
- Revisar logs e cleanup por idle timeout.

## Limpeza de HLS e arquivos sem uso

Inventario atual observado nesta etapa:

- Nao foram encontrados arquivos ativos de runtime HLS dentro de `src/player`.
- Foram encontrados residuos textuais e/ou documentais ligados a HLS, por exemplo referencia a "proxy HLS" na UI.
- O repositorio continua usando playlists IPTV `.m3u` e `.m3u8`, o que nao deve ser confundido com o caminho HLS experimental do player.

Acao planejada:

- Auditar antes de apagar.
- Apagar apenas o que estiver morto apos a migracao TS buffered estar ativa.
- Prioridade de remocao:
  - codigo de entrega HLS experimental
  - flags/envs mortos ligados a esse caminho
  - textos de UI e docs incorretos
  - comentarios e logs obsoletos

## Logs obrigatorios

Os logs devem mostrar:

- sessao criada
- sessao destruida
- cliente entrou
- cliente saiu
- cursor inicial do cliente
- cliente saltou para frente
- cliente encerrado por atraso
- cliente encerrado por ghost
- origem iniciada
- origem finalizada

Campos recomendados:

- `key`
- `kind`
- `clientId`
- `sessionState`
- `localIndex`
- `headIndex`
- `skipFrom`
- `skipTo`
- `clientCount`
- `pid`

## Riscos e mitigacoes

### Risco 1 - Crescimento de RAM

- Mitigacao: ring buffer fixo por sessao e `maxBufferedChunks` configuravel.

### Risco 2 - Join ruim em `live`

- Mitigacao: novo cliente entra alguns chunks atras do head, nao exatamente no head.

### Risco 3 - Normalizacao insuficiente do TS ao vivo

- Mitigacao: obrigar `ffmpeg` entre `streamlink` e buffer e validar parametros de mux TS.

### Risco 4 - Regressao de credenciais/perfis

- Mitigacao: reaproveitar `ToolProfileManager`, `streamlink-runner` e `ytdlp-runner` em vez de reescrever a resolucao de credenciais.

### Risco 5 - Cleanup agressivo demais

- Mitigacao: idle timeout so apos ausencia real de clientes e com logs claros.

### Observabilidade de teardown

- O caminho TS precisa logar explicitamente:
  - eventos `req.close`, `req.aborted`, `req.socket.close`, `res.close`, `res.finish`, `res.socket.close`, `socket.error`
  - `cleanup(reason)` com estado observado de `res.writableEnded`, `res.destroyed`, `req.aborted`, `socket.destroyed`, `socket.writable`
  - heartbeat por cliente com `localIndex`, `headIndex`, `writableLength`, `socket.bufferSize` e `writableNeedDrain`
- O registry de sessao deve manter diagnostico por `clientId`, nao apenas `clientCount`, para permitir identificar cliente fantasma preso no contador mas ja terminal no socket.

## Validacao minima

- `docker compose build`
- `vod` com 1 e 2 clientes sem travar
- `upcoming` com 1 e 2 clientes sem pular canal
- `live` com 1 e 2 clientes sem tela verde e sem travar ambos ao entrar cliente extra

## Definicao de pronto

Esta implantacao so deve ser considerada concluida quando:

- `smart-player` servir `.ts` via sessao bufferizada por padrao.
- `stream-registry` deixar de ser o caminho principal.
- `vod`, `upcoming` e `live` usarem a mesma arquitetura base de sessao + buffer + cursor.
- Slow client e ghost client forem tratados individualmente.
- HLS experimental e arquivos sem uso relacionados forem removidos do caminho principal.
- Os logs minimos estiverem presentes.
