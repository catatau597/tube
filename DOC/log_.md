root@master2:~# docker logs -f tubewranglerr
2026-03-03 13:49:14 INFO [StateManager] Cache carregado com 14 streams.
2026-03-03 13:49:14 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-03 13:49:14 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-03 13:49:14 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-03 13:49:14 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-03 13:49:14 INFO [Scheduler] 1 stream(s) na janela pré-evento.
2026-03-03 13:49:14 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-03 13:49:14 INFO [Scheduler] Verificação alta frequência: 2 stream(s).
2026-03-03 13:49:14 INFO [Scheduler] Estado: 1 live | 13 upcoming | 0 vod.
2026-03-03 13:49:16 INFO [HTTP] GET / → 302 (6ms) [anon]
2026-03-03 13:49:16 INFO [HTTP] GET /login → 200 (5ms) [anon]
2026-03-03 13:49:17 INFO [HTTP] GET /css/style.css → 200 (3ms) [anon]
2026-03-03 13:49:18 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 13:49:18 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 13:49:31 INFO [HTTP] POST /api/auth/login → 200 (74ms) [admin]
2026-03-03 13:49:31 INFO [HTTP] GET / → 200 (2ms) [admin]
2026-03-03 13:49:31 INFO [HTTP] GET /css/style.css → 304 (2ms) [admin]
2026-03-03 13:49:31 INFO [HTTP] GET /js/app.js → 200 (1ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /js/channels.js → 200 (1ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /js/dashboard.js → 200 (2ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /js/streams.js → 200 (1ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /js/playlists.js → 200 (2ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /js/settings.js → 200 (4ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /js/logs.js → 200 (2ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /js/title-format.js → 200 (3ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /api/scheduler/status → 200 (4ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /api/channels → 304 (2ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /api/config → 200 (2ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /api/streams → 200 (1ms) [admin]
2026-03-03 13:49:32 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-03 13:49:38 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-03 13:49:45 INFO [HTTP] GET /live-proxy.m3u → 200 (3ms) [anon]
2026-03-03 13:49:47 INFO [ts-session-registry] Idle timer armado: key=Z6KbcBmFpA0 idleTimeoutMs=45000
2026-03-03 13:49:47 INFO [ts-session-registry] Sessao criada: key=Z6KbcBmFpA0 kind=live idleTimeoutMs=45000
2026-03-03 13:49:47 INFO [ffmpeg-runner] Iniciando normalizador TS por stdin/stdout
2026-03-03 13:49:47 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=Z6KbcBmFpA0 args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 --stdout https://www.youtube.com/watch?v=Z6KbcBmFpA0 720p,480p,best
2026-03-03 13:49:47 INFO [ts-session-registry] Idle timer armado: key=Z6KbcBmFpA0 idleTimeoutMs=45000
2026-03-03 13:49:47 INFO [ts-session-registry] Origem associada: key=Z6KbcBmFpA0 pid=24 state=initializing
2026-03-03 13:49:47 INFO [ts-session-registry] Idle timer armado: key=Z6KbcBmFpA0 idleTimeoutMs=45000
2026-03-03 13:49:47 INFO [ts-session-registry] Sessao atualizada: key=Z6KbcBmFpA0 state=active clients=0
2026-03-03 13:49:47 INFO [ts-source-manager] Origem iniciada: key=Z6KbcBmFpA0 kind=live pid=24
2026-03-03 13:49:47 INFO [ts-source-manager] Pipeline live iniciado: key=Z6KbcBmFpA0 streamlinkPid=25 ffmpegPid=24
2026-03-03 13:49:47 INFO [ts-session-registry] Cliente entrou: key=Z6KbcBmFpA0 clients=1 state=active
2026-03-03 13:49:47 INFO [ts-client-stream] Cliente iniciou: key=Z6KbcBmFpA0 client=tsc_1772556587649_9968 localIndex=0 headIndex=-1
2026-03-03 13:49:48 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 13:49:48 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 13:50:18 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 13:50:18 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 13:50:26 INFO [HTTP] GET /live-proxy.m3u → 200 (2ms) [anon]
2026-03-03 13:50:28 INFO [SmartPlayer] Sessao TS ativa, conectando cliente: key=Z6KbcBmFpA0 kind=live
2026-03-03 13:50:28 INFO [ts-session-registry] Cliente entrou: key=Z6KbcBmFpA0 clients=2 state=active
2026-03-03 13:50:28 INFO [ts-client-stream] Cliente iniciou: key=Z6KbcBmFpA0 client=tsc_1772556628567_3394 localIndex=307 headIndex=310
2026-03-03 13:50:48 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 13:50:48 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 13:51:06 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-03 13:51:08 INFO [SmartPlayer] Sessao TS ativa, conectando cliente: key=Z6KbcBmFpA0 kind=live
2026-03-03 13:51:08 INFO [ts-session-registry] Cliente entrou: key=Z6KbcBmFpA0 clients=3 state=active
2026-03-03 13:51:08 INFO [ts-client-stream] Cliente iniciou: key=Z6KbcBmFpA0 client=tsc_1772556668738_7363 localIndex=484 headIndex=487
2026-03-03 13:51:18 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 13:51:18 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-03 13:51:48 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 13:51:48 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 13:52:07 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-03-03 13:52:07 INFO [HTTP] GET /api/channels → 304 (1ms) [admin]
2026-03-03 13:52:07 INFO [HTTP] GET /api/streams → 304 (1ms) [admin]
2026-03-03 13:52:07 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-03-03 13:52:07 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-03 13:52:12 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-03-03 13:52:19 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 13:52:19 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 13:52:27 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (2ms) [anon]
2026-03-03 13:52:30 INFO [ts-session-registry] Idle timer armado: key=4tpXl6N7q7A idleTimeoutMs=45000
2026-03-03 13:52:30 INFO [ts-session-registry] Sessao criada: key=4tpXl6N7q7A kind=upcoming idleTimeoutMs=45000
2026-03-03 13:52:30 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/4tpXl6N7q7A/maxresdefault_live.jpg
2026-03-03 13:52:30 INFO [ts-session-registry] Idle timer armado: key=4tpXl6N7q7A idleTimeoutMs=45000
2026-03-03 13:52:30 INFO [ts-session-registry] Origem associada: key=4tpXl6N7q7A pid=67 state=initializing
2026-03-03 13:52:30 INFO [ts-session-registry] Idle timer armado: key=4tpXl6N7q7A idleTimeoutMs=45000
2026-03-03 13:52:30 INFO [ts-session-registry] Sessao atualizada: key=4tpXl6N7q7A state=active clients=0
2026-03-03 13:52:30 INFO [ts-source-manager] Origem iniciada: key=4tpXl6N7q7A kind=upcoming pid=67
2026-03-03 13:52:30 INFO [ts-session-registry] Cliente entrou: key=4tpXl6N7q7A clients=1 state=active
2026-03-03 13:52:30 INFO [ts-client-stream] Cliente iniciou: key=4tpXl6N7q7A client=tsc_1772556750047_5507 localIndex=0 headIndex=-1
2026-03-03 13:52:43 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (2ms) [anon]
2026-03-03 13:52:45 INFO [SmartPlayer] Sessao TS ativa, conectando cliente: key=4tpXl6N7q7A kind=upcoming
2026-03-03 13:52:45 INFO [ts-session-registry] Cliente entrou: key=4tpXl6N7q7A clients=2 state=active
2026-03-03 13:52:45 INFO [ts-client-stream] Cliente iniciou: key=4tpXl6N7q7A client=tsc_1772556765963_5536 localIndex=4026 headIndex=4029
2026-03-03 13:52:49 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-03 13:52:49 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-03 13:52:59 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (1ms) [anon]
2026-03-03 13:53:01 INFO [SmartPlayer] Sessao TS ativa, conectando cliente: key=4tpXl6N7q7A kind=upcoming
2026-03-03 13:53:01 INFO [ts-session-registry] Cliente entrou: key=4tpXl6N7q7A clients=3 state=active
2026-03-03 13:53:01 INFO [ts-client-stream] Cliente iniciou: key=4tpXl6N7q7A client=tsc_1772556781527_6019 localIndex=7897 headIndex=7900
2026-03-03 13:53:19 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 13:53:19 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-03 13:53:49 INFO [ts-session-registry] Idle timer armado: key=Ybaje1mFiF4 idleTimeoutMs=45000
2026-03-03 13:53:49 INFO [ts-session-registry] Sessao criada: key=Ybaje1mFiF4 kind=upcoming idleTimeoutMs=45000
2026-03-03 13:53:49 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/Ybaje1mFiF4/maxresdefault_live.jpg
2026-03-03 13:53:49 INFO [ts-session-registry] Idle timer armado: key=Ybaje1mFiF4 idleTimeoutMs=45000
2026-03-03 13:53:49 INFO [ts-session-registry] Origem associada: key=Ybaje1mFiF4 pid=118 state=initializing
2026-03-03 13:53:49 INFO [ts-session-registry] Idle timer armado: key=Ybaje1mFiF4 idleTimeoutMs=45000
2026-03-03 13:53:49 INFO [ts-session-registry] Sessao atualizada: key=Ybaje1mFiF4 state=active clients=0
2026-03-03 13:53:49 INFO [ts-source-manager] Origem iniciada: key=Ybaje1mFiF4 kind=upcoming pid=118
2026-03-03 13:53:49 INFO [ts-session-registry] Cliente entrou: key=Ybaje1mFiF4 clients=1 state=active
2026-03-03 13:53:49 INFO [ts-client-stream] Cliente iniciou: key=Ybaje1mFiF4 client=tsc_1772556829732_5160 localIndex=0 headIndex=-1
2026-03-03 13:53:49 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 13:53:49 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 13:53:52 INFO [ts-session-registry] Idle timer armado: key=O6vgcSIxUUo idleTimeoutMs=45000
2026-03-03 13:53:52 INFO [ts-session-registry] Sessao criada: key=O6vgcSIxUUo kind=upcoming idleTimeoutMs=45000
2026-03-03 13:53:52 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/O6vgcSIxUUo/maxresdefault_live.jpg
2026-03-03 13:53:52 INFO [ts-session-registry] Idle timer armado: key=O6vgcSIxUUo idleTimeoutMs=45000
2026-03-03 13:53:52 INFO [ts-session-registry] Origem associada: key=O6vgcSIxUUo pid=151 state=initializing
2026-03-03 13:53:52 INFO [ts-session-registry] Idle timer armado: key=O6vgcSIxUUo idleTimeoutMs=45000
2026-03-03 13:53:52 INFO [ts-session-registry] Sessao atualizada: key=O6vgcSIxUUo state=active clients=0
2026-03-03 13:53:52 INFO [ts-source-manager] Origem iniciada: key=O6vgcSIxUUo kind=upcoming pid=151
2026-03-03 13:53:52 INFO [ts-session-registry] Cliente entrou: key=O6vgcSIxUUo clients=1 state=active
2026-03-03 13:53:52 INFO [ts-client-stream] Cliente iniciou: key=O6vgcSIxUUo client=tsc_1772556832869_7535 localIndex=0 headIndex=-1
2026-03-03 13:54:14 INFO [Scheduler] 1 stream(s) na janela pré-evento.
2026-03-03 13:54:14 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-03 13:54:14 INFO [Scheduler] Verificação alta frequência: 2 stream(s).
2026-03-03 13:54:14 INFO [Scheduler] Estado: 1 live | 13 upcoming | 0 vod.
2026-03-03 13:54:20 INFO [HTTP] GET / → 302 (8ms) [anon]
2026-03-03 13:54:20 INFO [HTTP] GET /login → 200 (2ms) [anon]
^Croot@master2:~#