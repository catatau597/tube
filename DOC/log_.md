root@master2:~# docker logs -f tubewranglerr
2026-03-03 14:21:02 INFO [StateManager] Cache carregado com 14 streams.
2026-03-03 14:21:02 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-03 14:21:02 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-03 14:21:02 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-03 14:21:02 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-03 14:21:02 INFO [Scheduler] 1 stream(s) na janela pré-evento.
2026-03-03 14:21:02 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-03 14:21:02 INFO [Scheduler] Verificação alta frequência: 2 stream(s).
2026-03-03 14:21:03 INFO [Scheduler] Estado: 1 live | 13 upcoming | 0 vod.
2026-03-03 14:21:06 INFO [HTTP] GET / → 302 (3ms) [anon]
2026-03-03 14:21:06 INFO [HTTP] GET /login → 200 (4ms) [anon]
2026-03-03 14:21:13 INFO [HTTP] GET / → 302 (5ms) [anon]
2026-03-03 14:21:13 INFO [HTTP] GET /login → 200 (4ms) [anon]
2026-03-03 14:21:13 INFO [HTTP] GET /css/style.css → 200 (3ms) [anon]
2026-03-03 14:21:14 INFO [HTTP] GET /favicon.ico → 404 (2ms) [anon]
2026-03-03 14:21:19 INFO [HTTP] POST /api/auth/login → 200 (74ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET / → 200 (2ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /css/style.css → 304 (2ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /js/app.js → 200 (2ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /js/dashboard.js → 200 (4ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /js/channels.js → 200 (4ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /js/streams.js → 200 (8ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /js/playlists.js → 200 (6ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /js/settings.js → 200 (6ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /js/title-format.js → 200 (6ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /js/logs.js → 200 (7ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /api/scheduler/status → 200 (2ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /api/channels → 304 (4ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /api/streams → 200 (3ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /api/config → 304 (3ms) [admin]
2026-03-03 14:21:19 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-03 14:21:22 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-03-03 14:21:31 INFO [HTTP] GET /live-proxy.m3u → 200 (2ms) [anon]
2026-03-03 14:21:33 INFO [ts-session-registry] Idle timer armado: key=Z6KbcBmFpA0 idleTimeoutMs=45000
2026-03-03 14:21:33 INFO [ts-session-registry] Sessao criada: key=Z6KbcBmFpA0 kind=live idleTimeoutMs=45000
2026-03-03 14:21:33 INFO [ffmpeg-runner] Iniciando normalizador TS por stdin/stdout
2026-03-03 14:21:33 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=Z6KbcBmFpA0 args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 --stdout https://www.youtube.com/watch?v=Z6KbcBmFpA0 720p,480p,best
2026-03-03 14:21:33 INFO [ts-session-registry] Idle timer armado: key=Z6KbcBmFpA0 idleTimeoutMs=45000
2026-03-03 14:21:33 INFO [ts-session-registry] Origem associada: key=Z6KbcBmFpA0 pid=24 state=initializing
2026-03-03 14:21:33 INFO [ts-session-registry] Idle timer armado: key=Z6KbcBmFpA0 idleTimeoutMs=45000
2026-03-03 14:21:33 INFO [ts-session-registry] Sessao atualizada: key=Z6KbcBmFpA0 state=active clients=0
2026-03-03 14:21:33 INFO [ts-source-manager] Origem iniciada: key=Z6KbcBmFpA0 kind=live pid=24
2026-03-03 14:21:33 INFO [ts-source-manager] Pipeline live iniciado: key=Z6KbcBmFpA0 streamlinkPid=25 ffmpegPid=24
2026-03-03 14:21:33 INFO [ts-session-registry] Cliente entrou: key=Z6KbcBmFpA0 clients=1 state=active
2026-03-03 14:21:33 INFO [ts-client-stream] Cliente iniciou: key=Z6KbcBmFpA0 client=tsc_1772558493101_6001 localIndex=0 headIndex=-1
2026-03-03 14:21:36 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 14:21:36 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 14:22:07 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-03 14:22:07 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 14:22:13 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-03 14:22:15 INFO [SmartPlayer] Sessao TS ativa, conectando cliente: key=Z6KbcBmFpA0 kind=live
2026-03-03 14:22:15 INFO [ts-session-registry] Cliente entrou: key=Z6KbcBmFpA0 clients=2 state=active
2026-03-03 14:22:15 INFO [ts-client-stream] Cliente iniciou: key=Z6KbcBmFpA0 client=tsc_1772558535350_1587 localIndex=322 headIndex=325
2026-03-03 14:22:26 INFO [HTTP] GET /live-proxy.m3u → 200 (2ms) [anon]
2026-03-03 14:22:29 INFO [SmartPlayer] Sessao TS ativa, conectando cliente: key=Z6KbcBmFpA0 kind=live
2026-03-03 14:22:29 INFO [ts-session-registry] Cliente entrou: key=Z6KbcBmFpA0 clients=3 state=active
2026-03-03 14:22:29 INFO [ts-client-stream] Cliente iniciou: key=Z6KbcBmFpA0 client=tsc_1772558549080_8451 localIndex=481 headIndex=484
2026-03-03 14:22:37 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-03 14:22:37 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-03 14:23:00 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (1ms) [anon]
2026-03-03 14:23:03 INFO [ts-session-registry] Idle timer armado: key=9eGq11HA6Pg idleTimeoutMs=45000
2026-03-03 14:23:03 INFO [ts-session-registry] Sessao criada: key=9eGq11HA6Pg kind=upcoming idleTimeoutMs=45000
2026-03-03 14:23:03 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/9eGq11HA6Pg/maxresdefault_live.jpg
2026-03-03 14:23:03 INFO [ts-session-registry] Idle timer armado: key=9eGq11HA6Pg idleTimeoutMs=45000
2026-03-03 14:23:03 INFO [ts-session-registry] Origem associada: key=9eGq11HA6Pg pid=51 state=initializing
2026-03-03 14:23:03 INFO [ts-session-registry] Idle timer armado: key=9eGq11HA6Pg idleTimeoutMs=45000
2026-03-03 14:23:03 INFO [ts-session-registry] Sessao atualizada: key=9eGq11HA6Pg state=active clients=0
2026-03-03 14:23:03 INFO [ts-source-manager] Origem iniciada: key=9eGq11HA6Pg kind=upcoming pid=51
2026-03-03 14:23:03 INFO [ts-session-registry] Cliente entrou: key=9eGq11HA6Pg clients=1 state=active
2026-03-03 14:23:03 INFO [ts-client-stream] Cliente iniciou: key=9eGq11HA6Pg client=tsc_1772558583038_1507 localIndex=0 headIndex=-1
2026-03-03 14:23:07 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 14:23:07 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 14:23:10 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (1ms) [anon]
2026-03-03 14:23:12 INFO [SmartPlayer] Sessao TS ativa, conectando cliente: key=9eGq11HA6Pg kind=upcoming
2026-03-03 14:23:12 INFO [ts-session-registry] Cliente entrou: key=9eGq11HA6Pg clients=2 state=active
2026-03-03 14:23:12 INFO [ts-client-stream] Cliente iniciou: key=9eGq11HA6Pg client=tsc_1772558592544_3787 localIndex=2131 headIndex=2134
2026-03-03 14:23:24 INFO [ts-session-registry] Idle timer armado: key=Ybaje1mFiF4 idleTimeoutMs=45000
2026-03-03 14:23:24 INFO [ts-session-registry] Sessao criada: key=Ybaje1mFiF4 kind=upcoming idleTimeoutMs=45000
2026-03-03 14:23:24 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/Ybaje1mFiF4/maxresdefault_live.jpg
2026-03-03 14:23:24 INFO [ts-session-registry] Idle timer armado: key=Ybaje1mFiF4 idleTimeoutMs=45000
2026-03-03 14:23:24 INFO [ts-session-registry] Origem associada: key=Ybaje1mFiF4 pid=90 state=initializing
2026-03-03 14:23:24 INFO [ts-session-registry] Idle timer armado: key=Ybaje1mFiF4 idleTimeoutMs=45000
2026-03-03 14:23:24 INFO [ts-session-registry] Sessao atualizada: key=Ybaje1mFiF4 state=active clients=0
2026-03-03 14:23:24 INFO [ts-source-manager] Origem iniciada: key=Ybaje1mFiF4 kind=upcoming pid=90
2026-03-03 14:23:24 INFO [ts-session-registry] Cliente entrou: key=Ybaje1mFiF4 clients=1 state=active
2026-03-03 14:23:24 INFO [ts-client-stream] Cliente iniciou: key=Ybaje1mFiF4 client=tsc_1772558604897_8270 localIndex=0 headIndex=-1
2026-03-03 14:23:37 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-03 14:23:37 INFO [HTTP] GET /login → 200 (3ms) [anon]
