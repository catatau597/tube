root@master2:~# docker logs -f tubewranglerr
2026-03-02 08:48:17 INFO [StateManager] Cache carregado com 33 streams.
2026-03-02 08:48:18 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-02 08:48:18 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-02 08:48:18 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-02 08:48:18 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-02 08:48:18 INFO [Scheduler] 4 stream(s) na janela pré-evento.
2026-03-02 08:48:18 INFO [Scheduler] Verificação alta frequência: 4 stream(s).
2026-03-02 08:48:18 INFO [Scheduler] Estado: 0 live | 23 upcoming | 10 vod.
2026-03-02 08:48:21 INFO [HTTP] GET / → 302 (4ms) [anon]
2026-03-02 08:48:21 INFO [HTTP] GET /login → 200 (5ms) [anon]
2026-03-02 08:48:36 INFO [HTTP] GET / → 302 (2ms) [anon]
2026-03-02 08:48:36 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 08:48:36 INFO [HTTP] GET /css/style.css → 200 (3ms) [anon]
2026-03-02 08:48:37 INFO [HTTP] GET /favicon.ico → 404 (2ms) [anon]
2026-03-02 08:48:46 INFO [HTTP] POST /api/auth/login → 200 (74ms) [admin]
2026-03-02 08:48:46 INFO [HTTP] GET / → 200 (2ms) [admin]
2026-03-02 08:48:46 INFO [HTTP] GET /css/style.css → 304 (1ms) [admin]
2026-03-02 08:48:46 INFO [HTTP] GET /js/app.js → 200 (1ms) [admin]
2026-03-02 08:48:46 INFO [HTTP] GET /js/streams.js → 200 (1ms) [admin]
2026-03-02 08:48:46 INFO [HTTP] GET /js/dashboard.js → 200 (5ms) [admin]
2026-03-02 08:48:46 INFO [HTTP] GET /js/settings.js → 200 (8ms) [admin]
2026-03-02 08:48:46 INFO [HTTP] GET /js/channels.js → 200 (6ms) [admin]
2026-03-02 08:48:46 INFO [HTTP] GET /js/logs.js → 200 (7ms) [admin]
2026-03-02 08:48:46 INFO [HTTP] GET /js/title-format.js → 200 (8ms) [admin]
2026-03-02 08:48:46 INFO [HTTP] GET /js/playlists.js → 200 (5ms) [admin]
2026-03-02 08:48:47 INFO [HTTP] GET /api/scheduler/status → 200 (3ms) [admin]
2026-03-02 08:48:47 INFO [HTTP] GET /api/channels → 200 (5ms) [admin]
2026-03-02 08:48:47 INFO [HTTP] GET /api/streams → 200 (4ms) [admin]
2026-03-02 08:48:47 INFO [HTTP] GET /api/config → 304 (3ms) [admin]
2026-03-02 08:48:47 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 08:48:52 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 08:48:52 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:48:56 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-03-02 08:49:14 INFO [HTTP] GET /vod-proxy.m3u → 200 (3ms) [anon]
2026-03-02 08:49:14 INFO [SmartPlayer] Init: key=9O1fSxoDN7w status=none
2026-03-02 08:49:14 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=9O1fSxoDN7w args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=9O1fSxoDN7w
2026-03-02 08:49:16 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 08:49:16 INFO [stream-registry] Sessao criada: key=9O1fSxoDN7w
2026-03-02 08:49:16 INFO [stream-registry] +cliente key=9O1fSxoDN7w client=1 total=1
2026-03-02 08:49:16 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 08:49:16 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=9O1fSxoDN7w PID=35
2026-03-02 08:49:22 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:49:22 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:49:52 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 08:49:52 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:50:16 INFO [HTTP] GET /vod-proxy.m3u → 200 (1ms) [anon]
2026-03-02 08:50:16 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=9O1fSxoDN7w
2026-03-02 08:50:16 INFO [stream-registry] +cliente key=9O1fSxoDN7w client=2 total=2
2026-03-02 08:50:22 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 08:50:22 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:50:51 INFO [HTTP] GET /vod-proxy.m3u → 200 (1ms) [anon]
2026-03-02 08:50:51 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=9O1fSxoDN7w
2026-03-02 08:50:51 INFO [stream-registry] +cliente key=9O1fSxoDN7w client=3 total=3
2026-03-02 08:50:52 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 08:50:52 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:51:09 INFO [HTTP] GET /vod-proxy.m3u → 200 (2ms) [anon]
2026-03-02 08:51:09 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=9O1fSxoDN7w
2026-03-02 08:51:09 INFO [stream-registry] +cliente key=9O1fSxoDN7w client=4 total=4
2026-03-02 08:51:22 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 08:51:22 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:51:53 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 08:51:53 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:52:23 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 08:52:23 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:52:53 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 08:52:53 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:53:18 INFO [Scheduler] 4 stream(s) na janela pré-evento.
2026-03-02 08:53:18 INFO [Scheduler] Verificação alta frequência: 4 stream(s).
2026-03-02 08:53:18 INFO [Scheduler] Estado: 1 live | 22 upcoming | 10 vod.
2026-03-02 08:53:23 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:53:23 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:53:53 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 08:53:53 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:54:24 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:54:24 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:54:37 INFO [stream-registry] -cliente key=9O1fSxoDN7w client=4 reason=disconnect restantes=3
2026-03-02 08:54:37 INFO [SmartPlayer] Init: key=gQKdGo8GRJw status=none
2026-03-02 08:54:37 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=gQKdGo8GRJw args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=gQKdGo8GRJw
2026-03-02 08:54:39 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 08:54:39 INFO [stream-registry] Sessao criada: key=gQKdGo8GRJw
2026-03-02 08:54:39 INFO [stream-registry] +cliente key=gQKdGo8GRJw client=1 total=1
2026-03-02 08:54:39 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 08:54:39 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=gQKdGo8GRJw PID=108
2026-03-02 08:54:41 INFO [stream-registry] -cliente key=9O1fSxoDN7w client=3 reason=disconnect restantes=2
2026-03-02 08:54:41 INFO [SmartPlayer] Init: key=woXMZqd9j14 status=none
2026-03-02 08:54:41 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=woXMZqd9j14 args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=woXMZqd9j14
2026-03-02 08:54:43 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 08:54:43 INFO [stream-registry] Sessao criada: key=woXMZqd9j14
2026-03-02 08:54:43 INFO [stream-registry] +cliente key=woXMZqd9j14 client=1 total=1
2026-03-02 08:54:43 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 08:54:43 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=woXMZqd9j14 PID=116
2026-03-02 08:54:45 INFO [stream-registry] -cliente key=9O1fSxoDN7w client=2 reason=disconnect restantes=1
2026-03-02 08:54:45 INFO [SmartPlayer] Init: key=uM6U9TRKQak status=none
2026-03-02 08:54:45 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=uM6U9TRKQak args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=uM6U9TRKQak
2026-03-02 08:54:46 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 08:54:46 INFO [stream-registry] Sessao criada: key=uM6U9TRKQak
2026-03-02 08:54:46 INFO [stream-registry] +cliente key=uM6U9TRKQak client=1 total=1
2026-03-02 08:54:46 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 08:54:46 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=uM6U9TRKQak PID=124
2026-03-02 08:54:54 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 08:54:54 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:55:24 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:55:24 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:55:54 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:55:54 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:56:24 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 08:56:24 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:56:54 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:56:54 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:57:25 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:57:25 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:57:50 INFO [stream-registry] -cliente key=uM6U9TRKQak client=1 reason=disconnect restantes=0
2026-03-02 08:57:50 INFO [stream-registry] Sessao destruida: key=uM6U9TRKQak
2026-03-02 08:57:50 INFO [ytdlp-ffmpeg] SIGTERM → PID 124
2026-03-02 08:57:50 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 08:57:50 INFO [ytdlp-ffmpeg] PID 124 encerrado
2026-03-02 08:57:52 INFO [stream-registry] -cliente key=gQKdGo8GRJw client=1 reason=disconnect restantes=0
2026-03-02 08:57:52 INFO [stream-registry] Sessao destruida: key=gQKdGo8GRJw
2026-03-02 08:57:52 INFO [ytdlp-ffmpeg] SIGTERM → PID 108
2026-03-02 08:57:52 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 08:57:52 INFO [ytdlp-ffmpeg] PID 108 encerrado
2026-03-02 08:57:55 INFO [stream-registry] -cliente key=9O1fSxoDN7w client=1 reason=disconnect restantes=0
2026-03-02 08:57:55 INFO [stream-registry] Sessao destruida: key=9O1fSxoDN7w
2026-03-02 08:57:55 INFO [ytdlp-ffmpeg] SIGTERM → PID 35
2026-03-02 08:57:55 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 08:57:55 INFO [ytdlp-ffmpeg] PID 35 encerrado
2026-03-02 08:57:55 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:57:55 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:57:57 INFO [stream-registry] -cliente key=woXMZqd9j14 client=1 reason=disconnect restantes=0
2026-03-02 08:57:57 INFO [stream-registry] Sessao destruida: key=woXMZqd9j14
2026-03-02 08:57:57 INFO [ytdlp-ffmpeg] SIGTERM → PID 116
2026-03-02 08:57:57 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 08:57:57 INFO [ytdlp-ffmpeg] PID 116 encerrado
2026-03-02 08:58:18 INFO [Scheduler] 3 stream(s) na janela pré-evento.
2026-03-02 08:58:18 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-02 08:58:18 INFO [Scheduler] Verificação alta frequência: 4 stream(s).
2026-03-02 08:58:18 INFO [Scheduler] Estado: 1 live | 22 upcoming | 10 vod.
2026-03-02 08:58:25 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:58:25 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:58:55 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:58:55 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:59:23 INFO [HTTP] GET /api/scheduler/status → 200 (1ms) [admin]
2026-03-02 08:59:23 INFO [HTTP] GET /api/channels → 200 (1ms) [admin]
2026-03-02 08:59:23 INFO [HTTP] GET /api/streams → 200 (2ms) [admin]
2026-03-02 08:59:23 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-03-02 08:59:23 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 08:59:25 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:59:25 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 08:59:27 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 08:59:52 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-02 08:59:52 INFO [SmartPlayer] Init: key=pYowbb2vLfI status=live
2026-03-02 08:59:52 INFO [SmartPlayer] Iniciando streamlink diretamente: key=pYowbb2vLfI
2026-03-02 08:59:52 INFO [stream-registry] Sessao criada: key=pYowbb2vLfI
2026-03-02 08:59:52 INFO [stream-registry] +cliente key=pYowbb2vLfI client=1 total=1
2026-03-02 08:59:52 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=pYowbb2vLfI args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --stdout https://www.youtube.com/watch?v=pYowbb2vLfI best
2026-03-02 08:59:52 INFO [SmartPlayer] Streamlink iniciado: key=pYowbb2vLfI PID=187
2026-03-02 08:59:54 INFO [SmartPlayer] Streamlink primeiro byte: key=pYowbb2vLfI t=2128ms
2026-03-02 08:59:55 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 08:59:55 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:00:26 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:00:26 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:00:56 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:00:56 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 09:01:10 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-02 09:01:10 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=pYowbb2vLfI
2026-03-02 09:01:10 INFO [stream-registry] +cliente key=pYowbb2vLfI client=2 total=2
2026-03-02 09:01:26 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:01:26 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:01:56 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:01:56 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:02:11 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-02 09:02:11 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=pYowbb2vLfI
2026-03-02 09:02:11 INFO [stream-registry] +cliente key=pYowbb2vLfI client=3 total=3
2026-03-02 09:02:26 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:02:26 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 09:02:43 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-02 09:02:43 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=pYowbb2vLfI
2026-03-02 09:02:43 INFO [stream-registry] +cliente key=pYowbb2vLfI client=4 total=4
2026-03-02 09:02:56 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:02:56 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:03:18 INFO [Scheduler] 3 stream(s) na janela pré-evento.
2026-03-02 09:03:18 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-02 09:03:18 INFO [Scheduler] Verificação alta frequência: 4 stream(s).
2026-03-02 09:03:18 INFO [Scheduler] Estado: 1 live | 22 upcoming | 10 vod.
2026-03-02 09:03:27 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:03:27 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:03:56 INFO [stream-registry] -cliente key=pYowbb2vLfI client=1 reason=disconnect restantes=3
2026-03-02 09:03:57 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:03:57 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:04:05 INFO [stream-registry] -cliente key=pYowbb2vLfI client=2 reason=disconnect restantes=2
2026-03-02 09:04:27 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:04:27 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:04:57 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:04:57 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 09:05:27 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:05:27 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 09:05:30 INFO [stream-registry] -cliente key=pYowbb2vLfI client=3 reason=disconnect restantes=1
2026-03-02 09:05:57 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:05:57 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 09:06:02 INFO [stream-registry] -cliente key=pYowbb2vLfI client=4 reason=disconnect restantes=0
2026-03-02 09:06:02 INFO [stream-registry] Sessao destruida: key=pYowbb2vLfI
2026-03-02 09:06:02 INFO [streamlink] SIGTERM → PID 187
2026-03-02 09:06:02 WARN [streamlink-runner] Processo finalizado code=130 stderrTail=[cli][info] streamlink is running as root! Be careful!\n[cli][info] Found matching plugin youtube for URL https://www.youtube.com/watch?v=pYowbb2vLfI\n[cli][info] Available streams: 144p (worst), 240p, 360p, 480p, 720p, 1080p (best)\n[cli][info] Opening stream: 1080p (hls)
2026-03-02 09:06:02 INFO [streamlink] PID 187 encerrado
2026-03-02 09:06:28 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:06:28 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:06:28 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (2ms) [anon]
2026-03-02 09:06:28 INFO [SmartPlayer] Init: key=PXqX2hK5RF4 status=upcoming
2026-03-02 09:06:28 INFO [stream-registry] Sessao criada: key=PXqX2hK5RF4
2026-03-02 09:06:28 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=1 total=1
2026-03-02 09:06:28 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/PXqX2hK5RF4/maxresdefault_live.jpg
2026-03-02 09:06:28 INFO [SmartPlayer] Placeholder iniciado: key=PXqX2hK5RF4 PID=275
2026-03-02 09:06:58 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:06:58 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:07:15 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (2ms) [anon]
2026-03-02 09:07:15 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 09:07:15 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=2 total=2
2026-03-02 09:07:28 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:07:28 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:07:40 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (1ms) [anon]
2026-03-02 09:07:40 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 09:07:40 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=3 total=3
2026-03-02 09:07:48 WARN [stream-registry] Cliente draining prolongado, encerrando: key=PXqX2hK5RF4 client=1 drainingMs=25000 backpressure=7406
2026-03-02 09:07:48 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=1 reason=draining-timeout>25000ms restantes=2
2026-03-02 09:07:54 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (1ms) [anon]
2026-03-02 09:07:54 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 09:07:54 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=4 total=3
2026-03-02 09:07:58 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:07:58 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 09:08:02 WARN [stream-registry] Cliente draining prolongado, encerrando: key=PXqX2hK5RF4 client=2 drainingMs=25000 backpressure=7393
2026-03-02 09:08:02 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=2 reason=draining-timeout>25000ms restantes=2
2026-03-02 09:08:16 WARN [stream-registry] Cliente draining prolongado, encerrando: key=PXqX2hK5RF4 client=3 drainingMs=24999 backpressure=7545
2026-03-02 09:08:16 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=3 reason=draining-timeout>24999ms restantes=1
2026-03-02 09:08:18 INFO [Scheduler] 3 stream(s) na janela pré-evento.
2026-03-02 09:08:18 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-02 09:08:18 INFO [Scheduler] Verificação alta frequência: 4 stream(s).
2026-03-02 09:08:18 INFO [Scheduler] Estado: 1 live | 22 upcoming | 10 vod.
2026-03-02 09:08:28 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:08:28 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:08:29 WARN [stream-registry] Cliente draining prolongado, encerrando: key=PXqX2hK5RF4 client=4 drainingMs=25001 backpressure=3468
2026-03-02 09:08:29 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=4 reason=draining-timeout>25001ms restantes=0
2026-03-02 09:08:29 INFO [stream-registry] Zero clientes apos drop draining, encerrando: key=PXqX2hK5RF4
2026-03-02 09:08:29 INFO [stream-registry] Sessao destruida: key=PXqX2hK5RF4
2026-03-02 09:08:29 INFO [ffmpeg-placeholder] SIGTERM → PID 275
2026-03-02 09:08:32 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (77917ms) [anon]
2026-03-02 09:08:33 INFO [SmartPlayer] Init: key=hrgCZGC2lcg status=upcoming
2026-03-02 09:08:33 INFO [stream-registry] Sessao criada: key=hrgCZGC2lcg
2026-03-02 09:08:33 INFO [stream-registry] +cliente key=hrgCZGC2lcg client=1 total=1
2026-03-02 09:08:33 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/hrgCZGC2lcg/maxresdefault_live.jpg
2026-03-02 09:08:33 INFO [SmartPlayer] Placeholder iniciado: key=hrgCZGC2lcg PID=333
2026-03-02 09:08:34 WARN [ffmpeg-placeholder] SIGTERM timeout (5000ms) → SIGKILL PID 275
2026-03-02 09:08:34 INFO [ffmpeg-runner] Placeholder finalizado code=null
2026-03-02 09:08:34 INFO [ffmpeg-placeholder] PID 275 encerrado
2026-03-02 09:08:36 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (56076ms) [anon]
2026-03-02 09:08:41 INFO [SmartPlayer] Init: key=FAal3Q6V7Qk status=upcoming
2026-03-02 09:08:41 INFO [stream-registry] Sessao criada: key=FAal3Q6V7Qk
2026-03-02 09:08:41 INFO [stream-registry] +cliente key=FAal3Q6V7Qk client=1 total=1
2026-03-02 09:08:41 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/FAal3Q6V7Qk/maxresdefault_live.jpg
2026-03-02 09:08:41 INFO [SmartPlayer] Placeholder iniciado: key=FAal3Q6V7Qk PID=366
2026-03-02 09:08:48 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (54309ms) [anon]
2026-03-02 09:08:48 INFO [SmartPlayer] Init: key=Ybaje1mFiF4 status=upcoming
2026-03-02 09:08:48 INFO [stream-registry] Sessao criada: key=Ybaje1mFiF4
2026-03-02 09:08:48 INFO [stream-registry] +cliente key=Ybaje1mFiF4 client=1 total=1
2026-03-02 09:08:48 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/Ybaje1mFiF4/maxresdefault_live.jpg
2026-03-02 09:08:48 INFO [SmartPlayer] Placeholder iniciado: key=Ybaje1mFiF4 PID=399
2026-03-02 09:08:48 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (140232ms) [anon]
2026-03-02 09:08:59 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:08:59 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:09:29 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:09:29 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:09:46 WARN [stream-registry] Cliente draining prolongado, encerrando: key=FAal3Q6V7Qk client=1 drainingMs=25004 backpressure=1
2026-03-02 09:09:46 INFO [stream-registry] -cliente key=FAal3Q6V7Qk client=1 reason=draining-timeout>25004ms restantes=0
2026-03-02 09:09:46 INFO [stream-registry] Zero clientes apos drop draining, encerrando: key=FAal3Q6V7Qk
2026-03-02 09:09:46 INFO [stream-registry] Sessao destruida: key=FAal3Q6V7Qk
2026-03-02 09:09:46 INFO [ffmpeg-placeholder] SIGTERM → PID 366
2026-03-02 09:09:51 WARN [ffmpeg-placeholder] SIGTERM timeout (5000ms) → SIGKILL PID 366
2026-03-02 09:09:51 INFO [ffmpeg-runner] Placeholder finalizado code=null
2026-03-02 09:09:51 INFO [ffmpeg-placeholder] PID 366 encerrado
2026-03-02 09:09:56 WARN [stream-registry] Cliente draining prolongado, encerrando: key=hrgCZGC2lcg client=1 drainingMs=25005 backpressure=1
2026-03-02 09:09:56 INFO [stream-registry] -cliente key=hrgCZGC2lcg client=1 reason=draining-timeout>25005ms restantes=0
2026-03-02 09:09:56 INFO [stream-registry] Zero clientes apos drop draining, encerrando: key=hrgCZGC2lcg
2026-03-02 09:09:56 INFO [stream-registry] Sessao destruida: key=hrgCZGC2lcg
2026-03-02 09:09:56 INFO [ffmpeg-placeholder] SIGTERM → PID 333
2026-03-02 09:09:57 INFO [HTTP] GET /api/stream/FAal3Q6V7Qk → 200 (76155ms) [anon]
2026-03-02 09:09:58 INFO [HTTP] GET /api/stream/hrgCZGC2lcg → 200 (85892ms) [anon]
2026-03-02 09:09:59 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:09:59 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:10:01 WARN [ffmpeg-placeholder] SIGTERM timeout (5000ms) → SIGKILL PID 333
2026-03-02 09:10:01 INFO [ffmpeg-runner] Placeholder finalizado code=null
2026-03-02 09:10:01 INFO [ffmpeg-placeholder] PID 333 encerrado
2026-03-02 09:10:04 INFO [stream-registry] -cliente key=Ybaje1mFiF4 client=1 reason=disconnect restantes=0
2026-03-02 09:10:04 INFO [stream-registry] Sessao destruida: key=Ybaje1mFiF4
2026-03-02 09:10:04 INFO [ffmpeg-placeholder] SIGTERM → PID 399
2026-03-02 09:10:09 WARN [ffmpeg-placeholder] SIGTERM timeout (5000ms) → SIGKILL PID 399
2026-03-02 09:10:09 INFO [ffmpeg-runner] Placeholder finalizado code=null
2026-03-02 09:10:09 INFO [ffmpeg-placeholder] PID 399 encerrado
2026-03-02 09:10:29 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:10:29 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:10:33 INFO [SmartPlayer] Init: key=hrgCZGC2lcg status=upcoming
2026-03-02 09:10:33 INFO [stream-registry] Sessao criada: key=hrgCZGC2lcg
2026-03-02 09:10:33 INFO [stream-registry] +cliente key=hrgCZGC2lcg client=1 total=1
2026-03-02 09:10:33 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/hrgCZGC2lcg/maxresdefault_live.jpg
2026-03-02 09:10:33 INFO [SmartPlayer] Placeholder iniciado: key=hrgCZGC2lcg PID=456
2026-03-02 09:10:49 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-02 09:10:49 INFO [SmartPlayer] Init: key=pYowbb2vLfI status=live
2026-03-02 09:10:49 INFO [SmartPlayer] Iniciando streamlink diretamente: key=pYowbb2vLfI
2026-03-02 09:10:49 INFO [stream-registry] Sessao criada: key=pYowbb2vLfI
2026-03-02 09:10:49 INFO [stream-registry] +cliente key=pYowbb2vLfI client=1 total=1
2026-03-02 09:10:49 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=pYowbb2vLfI args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --stdout https://www.youtube.com/watch?v=pYowbb2vLfI best
2026-03-02 09:10:49 INFO [SmartPlayer] Streamlink iniciado: key=pYowbb2vLfI PID=489
2026-03-02 09:10:51 INFO [SmartPlayer] Streamlink primeiro byte: key=pYowbb2vLfI t=2256ms
2026-03-02 09:10:59 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:10:59 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 09:11:02 INFO [HTTP] GET /vod-proxy.m3u → 200 (1ms) [anon]
2026-03-02 09:11:02 INFO [SmartPlayer] Init: key=9O1fSxoDN7w status=none
2026-03-02 09:11:02 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=9O1fSxoDN7w args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=9O1fSxoDN7w
2026-03-02 09:11:04 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 09:11:04 INFO [stream-registry] Sessao criada: key=9O1fSxoDN7w
2026-03-02 09:11:04 INFO [stream-registry] +cliente key=9O1fSxoDN7w client=1 total=1
2026-03-02 09:11:04 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 09:11:04 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=9O1fSxoDN7w PID=505
2026-03-02 09:11:16 INFO [stream-registry] -cliente key=hrgCZGC2lcg client=1 reason=disconnect restantes=0
2026-03-02 09:11:16 INFO [stream-registry] Sessao destruida: key=hrgCZGC2lcg
2026-03-02 09:11:16 INFO [ffmpeg-placeholder] SIGTERM → PID 456
2026-03-02 09:11:16 INFO [SmartPlayer] Init: key=PXqX2hK5RF4 status=upcoming
2026-03-02 09:11:16 INFO [stream-registry] Sessao criada: key=PXqX2hK5RF4
2026-03-02 09:11:16 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=1 total=1
2026-03-02 09:11:16 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/PXqX2hK5RF4/maxresdefault_live.jpg
2026-03-02 09:11:16 INFO [SmartPlayer] Placeholder iniciado: key=PXqX2hK5RF4 PID=508
2026-03-02 09:11:21 WARN [ffmpeg-placeholder] SIGTERM timeout (5000ms) → SIGKILL PID 456
2026-03-02 09:11:21 INFO [ffmpeg-runner] Placeholder finalizado code=null
2026-03-02 09:11:21 INFO [ffmpeg-placeholder] PID 456 encerrado
2026-03-02 09:11:29 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:11:29 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:11:47 INFO [HTTP] GET /vod-proxy.m3u → 200 (1ms) [anon]
2026-03-02 09:11:47 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=9O1fSxoDN7w
2026-03-02 09:11:47 INFO [stream-registry] +cliente key=9O1fSxoDN7w client=2 total=2
2026-03-02 09:12:00 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 09:12:00 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:12:29 INFO [stream-registry] -cliente key=9O1fSxoDN7w client=2 reason=disconnect restantes=1
2026-03-02 09:12:30 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:12:30 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:12:30 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (1ms) [anon]
2026-03-02 09:12:30 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 09:12:30 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=2 total=2
2026-03-02 09:12:38 WARN [stream-registry] Cliente ainda drenando, mantendo conexao: key=PXqX2hK5RF4 client=1 drainingMs=24999 backpressure=1
2026-03-02 09:12:46 WARN [stream-registry] Cliente removido (watchdog): key=PXqX2hK5RF4 client=1 reason=phantom idleMs=32959
2026-03-02 09:12:46 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=1 reason=watchdog:phantom idleMs=32959 restantes=1
2026-03-02 09:13:00 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:13:00 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:13:18 INFO [Scheduler] 3 stream(s) na janela pré-evento.
2026-03-02 09:13:18 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-02 09:13:18 INFO [Scheduler] Verificação alta frequência: 4 stream(s).
2026-03-02 09:13:18 INFO [Scheduler] Estado: 1 live | 22 upcoming | 10 vod.
2026-03-02 09:13:23 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=2 reason=disconnect restantes=0
2026-03-02 09:13:23 INFO [stream-registry] Sessao destruida: key=PXqX2hK5RF4
2026-03-02 09:13:23 INFO [ffmpeg-placeholder] SIGTERM → PID 508
2026-03-02 09:13:26 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-02 09:13:26 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=pYowbb2vLfI
2026-03-02 09:13:26 INFO [stream-registry] +cliente key=pYowbb2vLfI client=2 total=2
2026-03-02 09:13:28 WARN [ffmpeg-placeholder] SIGTERM timeout (5000ms) → SIGKILL PID 508
2026-03-02 09:13:28 INFO [ffmpeg-runner] Placeholder finalizado code=null
2026-03-02 09:13:28 INFO [ffmpeg-placeholder] PID 508 encerrado
2026-03-02 09:13:30 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:13:30 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:13:36 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (139919ms) [anon]
2026-03-02 09:14:00 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 09:14:00 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 09:14:08 INFO [stream-registry] -cliente key=pYowbb2vLfI client=2 reason=disconnect restantes=1
2026-03-02 09:14:10 INFO [stream-registry] -cliente key=9O1fSxoDN7w client=1 reason=disconnect restantes=0
2026-03-02 09:14:10 INFO [stream-registry] Sessao destruida: key=9O1fSxoDN7w
2026-03-02 09:14:10 INFO [ytdlp-ffmpeg] SIGTERM → PID 505
2026-03-02 09:14:10 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 09:14:10 INFO [ytdlp-ffmpeg] PID 505 encerrado
2026-03-02 09:14:15 INFO [stream-registry] -cliente key=pYowbb2vLfI client=1 reason=disconnect restantes=0
2026-03-02 09:14:15 INFO [stream-registry] Sessao destruida: key=pYowbb2vLfI
2026-03-02 09:14:15 INFO [streamlink] SIGTERM → PID 489
2026-03-02 09:14:16 WARN [streamlink-runner] Processo finalizado code=130 stderrTail=[cli][info] streamlink is running as root! Be careful!\n[cli][info] Found matching plugin youtube for URL https://www.youtube.com/watch?v=pYowbb2vLfI\n[cli][info] Available streams: 144p (worst), 240p, 360p, 480p, 720p, 1080p (best)\n[cli][info] Opening stream: 1080p (hls)
2026-03-02 09:14:16 INFO [streamlink] PID 489 encerrado
2026-03-02 09:14:25 INFO [HTTP] GET / → 304 (0ms) [admin]
2026-03-02 09:14:26 INFO [HTTP] GET /css/style.css → 304 (0ms) [admin]
2026-03-02 09:14:26 INFO [HTTP] GET /js/app.js → 304 (1ms) [admin]
2026-03-02 09:14:26 INFO [HTTP] GET /js/dashboard.js → 304 (2ms) [admin]
2026-03-02 09:14:26 INFO [HTTP] GET /js/channels.js → 304 (2ms) [admin]
2026-03-02 09:14:26 INFO [HTTP] GET /js/streams.js → 304 (2ms) [admin]
2026-03-02 09:14:26 INFO [HTTP] GET /js/playlists.js → 304 (5ms) [admin]
2026-03-02 09:14:26 INFO [HTTP] GET /js/settings.js → 304 (4ms) [admin]
2026-03-02 09:14:26 INFO [HTTP] GET /js/title-format.js → 304 (1ms) [admin]
2026-03-02 09:14:26 INFO [HTTP] GET /js/logs.js → 304 (1ms) [admin]
2026-03-02 09:14:26 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]