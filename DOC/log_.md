root@master2:~# docker logs -f tubewranglerr
2026-03-02 09:56:18 INFO [StateManager] Cache carregado com 33 streams.
2026-03-02 09:56:18 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-02 09:56:18 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-02 09:56:18 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-02 09:56:18 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-02 09:56:18 INFO [Scheduler] 2 stream(s) na janela pré-evento.
2026-03-02 09:56:18 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-02 09:56:18 INFO [Scheduler] Verificação alta frequência: 3 stream(s).
2026-03-02 09:56:18 INFO [Scheduler] Estado: 2 live | 21 upcoming | 10 vod.
2026-03-02 09:56:22 INFO [HTTP] GET / → 302 (5ms) [anon]
2026-03-02 09:56:22 INFO [HTTP] GET /login → 200 (4ms) [anon]
2026-03-02 09:56:31 INFO [HTTP] GET /api/scheduler/status → 401 (4ms) [anon]
2026-03-02 09:56:31 INFO [HTTP] GET /api/channels → 401 (1ms) [anon]
2026-03-02 09:56:31 INFO [HTTP] GET /api/streams → 401 (1ms) [anon]
2026-03-02 09:56:31 INFO [HTTP] GET /api/config → 401 (0ms) [anon]
2026-03-02 09:56:31 INFO [HTTP] GET /login → 304 (1ms) [anon]
2026-03-02 09:56:31 INFO [HTTP] GET /api/scheduler/status → 401 (1ms) [anon]
2026-03-02 09:56:31 INFO [HTTP] GET /login → 304 (3ms) [anon]
2026-03-02 09:56:31 INFO [HTTP] GET /login → 304 (1ms) [anon]
2026-03-02 09:56:31 INFO [HTTP] GET /css/style.css → 304 (1ms) [anon]
2026-03-02 09:56:36 INFO [HTTP] POST /api/auth/login → 200 (74ms) [admin]
2026-03-02 09:56:36 INFO [HTTP] GET / → 304 (1ms) [admin]
2026-03-02 09:56:36 INFO [HTTP] GET /css/style.css → 304 (2ms) [admin]
2026-03-02 09:56:36 INFO [HTTP] GET /js/app.js → 304 (1ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /js/dashboard.js → 304 (1ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /js/channels.js → 304 (1ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /js/streams.js → 304 (2ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /js/playlists.js → 304 (0ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /js/settings.js → 304 (1ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /js/logs.js → 304 (2ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /js/title-format.js → 304 (1ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /api/scheduler/status → 200 (2ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /api/channels → 200 (5ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /api/streams → 200 (4ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-03-02 09:56:37 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 09:56:39 INFO [HTTP] GET / → 304 (1ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /css/style.css → 304 (1ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /js/app.js → 304 (0ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /js/dashboard.js → 304 (3ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /js/channels.js → 304 (3ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /js/streams.js → 304 (3ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /js/playlists.js → 304 (1ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /js/settings.js → 304 (1ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /js/logs.js → 304 (1ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /js/title-format.js → 304 (0ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /api/channels → 304 (3ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /api/streams → 304 (3ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-03-02 09:56:40 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-03-02 09:56:41 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 09:56:50 INFO [HTTP] GET /live-proxy.m3u → 200 (5ms) [anon]
2026-03-02 09:56:50 INFO [SmartPlayer] Init: key=PXqX2hK5RF4 status=live
2026-03-02 09:56:50 INFO [SmartPlayer] Iniciando streamlink diretamente: key=PXqX2hK5RF4
2026-03-02 09:56:50 INFO [stream-registry] Sessao criada: key=PXqX2hK5RF4
2026-03-02 09:56:50 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=1 total=1
2026-03-02 09:56:50 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=PXqX2hK5RF4 args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --stdout https://www.youtube.com/watch?v=PXqX2hK5RF4 720p,480p,best
2026-03-02 09:56:50 INFO [SmartPlayer] Streamlink iniciado: key=PXqX2hK5RF4 PID=24
2026-03-02 09:56:51 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 09:56:52 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:56:52 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:56:54 INFO [SmartPlayer] Streamlink primeiro byte: key=PXqX2hK5RF4 t=3772ms
2026-03-02 09:57:00 INFO [HTTP] GET /live-proxy.m3u → 200 (2ms) [anon]
2026-03-02 09:57:00 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 09:57:00 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=2 total=2
2026-03-02 09:57:16 INFO [HTTP] GET /live-proxy.m3u → 200 (2ms) [anon]
2026-03-02 09:57:16 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 09:57:16 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=3 total=3
2026-03-02 09:57:19 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-02 09:57:19 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 09:57:19 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=4 total=4
2026-03-02 09:57:22 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:57:22 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:57:53 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:57:53 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:58:23 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:58:23 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:58:48 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=2 reason=disconnect restantes=3
2026-03-02 09:58:48 INFO [SmartPlayer] Init: key=pYowbb2vLfI status=live
2026-03-02 09:58:48 INFO [SmartPlayer] Iniciando streamlink diretamente: key=pYowbb2vLfI
2026-03-02 09:58:48 INFO [stream-registry] Sessao criada: key=pYowbb2vLfI
2026-03-02 09:58:48 INFO [stream-registry] +cliente key=pYowbb2vLfI client=1 total=1
2026-03-02 09:58:48 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=pYowbb2vLfI args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --stdout https://www.youtube.com/watch?v=pYowbb2vLfI 720p,480p,best
2026-03-02 09:58:48 INFO [SmartPlayer] Streamlink iniciado: key=pYowbb2vLfI PID=51
2026-03-02 09:58:50 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 09:58:52 INFO [SmartPlayer] Streamlink primeiro byte: key=pYowbb2vLfI t=3920ms
2026-03-02 09:58:53 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:58:53 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:59:03 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=4 reason=disconnect restantes=2
2026-03-02 09:59:04 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=pYowbb2vLfI
2026-03-02 09:59:04 INFO [stream-registry] +cliente key=pYowbb2vLfI client=2 total=2
2026-03-02 09:59:23 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:59:23 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 09:59:53 INFO [HTTP] GET / → 302 (2ms) [anon]
2026-03-02 09:59:53 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 10:00:24 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 10:00:24 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 10:00:46 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=3 reason=disconnect restantes=1
2026-03-02 10:00:46 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=pYowbb2vLfI
2026-03-02 10:00:46 INFO [stream-registry] +cliente key=pYowbb2vLfI client=3 total=3
2026-03-02 10:00:49 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=1 reason=disconnect restantes=0
2026-03-02 10:00:49 INFO [stream-registry] Sessao destruida: key=PXqX2hK5RF4
2026-03-02 10:00:49 INFO [streamlink] SIGTERM → PID 24
2026-03-02 10:00:49 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=pYowbb2vLfI
2026-03-02 10:00:49 INFO [stream-registry] +cliente key=pYowbb2vLfI client=4 total=4
2026-03-02 10:00:49 INFO [streamlink-runner] Processo finalizado code=130 (encerramento solicitado)
2026-03-02 10:00:49 INFO [streamlink] PID 24 encerrado
2026-03-02 10:00:54 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 10:00:54 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 10:01:18 INFO [Scheduler] 2 stream(s) live em monitoramento.
2026-03-02 10:01:18 INFO [Scheduler] Verificação alta frequência: 2 stream(s).
2026-03-02 10:01:18 INFO [Scheduler] Estado: 2 live | 21 upcoming | 10 vod.
2026-03-02 10:01:24 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 10:01:24 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 10:01:54 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 10:01:54 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 10:02:24 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 10:02:24 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 10:02:42 INFO [stream-registry] -cliente key=pYowbb2vLfI client=1 reason=disconnect restantes=3
2026-03-02 10:02:42 INFO [SmartPlayer] Init: key=PXqX2hK5RF4 status=live
2026-03-02 10:02:42 INFO [SmartPlayer] Iniciando streamlink diretamente: key=PXqX2hK5RF4
2026-03-02 10:02:42 INFO [stream-registry] Sessao criada: key=PXqX2hK5RF4
2026-03-02 10:02:42 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=1 total=1
2026-03-02 10:02:42 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=PXqX2hK5RF4 args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --stdout https://www.youtube.com/watch?v=PXqX2hK5RF4 720p,480p,best
2026-03-02 10:02:42 INFO [SmartPlayer] Streamlink iniciado: key=PXqX2hK5RF4 PID=105
2026-03-02 10:02:44 INFO [stream-registry] -cliente key=pYowbb2vLfI client=2 reason=disconnect restantes=2
2026-03-02 10:02:44 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 10:02:44 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 10:02:44 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=2 total=2
2026-03-02 10:02:45 INFO [stream-registry] -cliente key=pYowbb2vLfI client=3 reason=disconnect restantes=1
2026-03-02 10:02:45 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 10:02:45 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=3 total=3
2026-03-02 10:02:46 INFO [SmartPlayer] Streamlink primeiro byte: key=PXqX2hK5RF4 t=3817ms
2026-03-02 10:02:47 INFO [stream-registry] -cliente key=pYowbb2vLfI client=4 reason=disconnect restantes=0
2026-03-02 10:02:47 INFO [stream-registry] Sessao destruida: key=pYowbb2vLfI
2026-03-02 10:02:47 INFO [streamlink] SIGTERM → PID 51
2026-03-02 10:02:47 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 10:02:47 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=4 total=4
2026-03-02 10:02:47 INFO [streamlink-runner] Processo finalizado code=130 (encerramento solicitado)
2026-03-02 10:02:47 INFO [streamlink] PID 51 encerrado
2026-03-02 10:02:54 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 10:02:54 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 10:03:25 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 10:03:25 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 10:03:37 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=3 reason=disconnect restantes=3
2026-03-02 10:03:42 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=4 reason=disconnect restantes=2
2026-03-02 10:03:44 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=1 reason=disconnect restantes=1
2026-03-02 10:03:46 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=2 reason=disconnect restantes=0
2026-03-02 10:03:46 INFO [stream-registry] Sessao destruida: key=PXqX2hK5RF4
2026-03-02 10:03:46 INFO [streamlink] SIGTERM → PID 105
2026-03-02 10:03:47 INFO [streamlink-runner] Processo finalizado code=130 (encerramento solicitado)
2026-03-02 10:03:47 INFO [streamlink] PID 105 encerrado
2026-03-02 10:03:53 INFO [HTTP] GET / → 304 (1ms) [admin]
2026-03-02 10:03:53 INFO [HTTP] GET /css/style.css → 304 (1ms) [admin]
2026-03-02 10:03:53 INFO [HTTP] GET /js/app.js → 304 (1ms) [admin]
2026-03-02 10:03:53 INFO [HTTP] GET /js/dashboard.js → 304 (2ms) [admin]
2026-03-02 10:03:53 INFO [HTTP] GET /js/channels.js → 304 (1ms) [admin]
2026-03-02 10:03:53 INFO [HTTP] GET /js/streams.js → 304 (1ms) [admin]
2026-03-02 10:03:53 INFO [HTTP] GET /js/title-format.js → 304 (1ms) [admin]
2026-03-02 10:03:53 INFO [HTTP] GET /js/playlists.js → 304 (1ms) [admin]
2026-03-02 10:03:53 INFO [HTTP] GET /js/settings.js → 304 (0ms) [admin]
2026-03-02 10:03:53 INFO [HTTP] GET /js/logs.js → 304 (0ms) [admin]
2026-03-02 10:03:53 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 10:03:55 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 10:03:55 INFO [HTTP] GET /login → 200 (1ms) [anon]