root@master2:~# docker logs -f tubewranglerr
2026-03-02 01:47:21 INFO [StateManager] Cache carregado com 35 streams.
2026-03-02 01:47:21 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-02 01:47:22 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-02 01:47:22 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-02 01:47:22 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-02 01:47:25 INFO [HTTP] GET / → 302 (5ms) [anon]
2026-03-02 01:47:25 INFO [HTTP] GET /login → 200 (5ms) [anon]
2026-03-02 01:47:29 INFO [HTTP] GET / → 302 (2ms) [anon]
2026-03-02 01:47:29 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 01:47:29 INFO [HTTP] GET /css/style.css → 200 (8ms) [anon]
2026-03-02 01:47:34 INFO [HTTP] POST /api/auth/login → 200 (75ms) [admin]
2026-03-02 01:47:34 INFO [HTTP] GET / → 200 (3ms) [admin]
2026-03-02 01:47:34 INFO [HTTP] GET /css/style.css → 304 (2ms) [admin]
2026-03-02 01:47:34 INFO [HTTP] GET /js/app.js → 200 (4ms) [admin]
2026-03-02 01:47:34 INFO [HTTP] GET /js/dashboard.js → 200 (1ms) [admin]
2026-03-02 01:47:34 INFO [HTTP] GET /js/channels.js → 200 (3ms) [admin]
2026-03-02 01:47:34 INFO [HTTP] GET /js/streams.js → 200 (2ms) [admin]
2026-03-02 01:47:34 INFO [HTTP] GET /js/playlists.js → 200 (1ms) [admin]
2026-03-02 01:47:34 INFO [HTTP] GET /js/settings.js → 200 (3ms) [admin]
2026-03-02 01:47:34 INFO [HTTP] GET /js/logs.js → 200 (3ms) [admin]
2026-03-02 01:47:34 INFO [HTTP] GET /js/title-format.js → 200 (1ms) [admin]
2026-03-02 01:47:35 INFO [HTTP] GET /api/scheduler/status → 200 (4ms) [admin]
2026-03-02 01:47:35 INFO [HTTP] GET /api/channels → 304 (4ms) [admin]
2026-03-02 01:47:35 INFO [HTTP] GET /api/streams → 304 (3ms) [admin]
2026-03-02 01:47:35 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-03-02 01:47:35 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 01:47:38 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 01:47:40 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-03-02 01:47:40 INFO [HTTP] GET /api/channels → 304 (2ms) [admin]
2026-03-02 01:47:40 INFO [HTTP] GET /api/streams → 304 (2ms) [admin]
2026-03-02 01:47:40 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-03-02 01:47:40 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 01:47:41 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 01:47:55 INFO [HTTP] GET /vod-proxy.m3u → 200 (3ms) [anon]
2026-03-02 01:47:55 INFO [SmartPlayer] Init: key=9O1fSxoDN7w status=none
2026-03-02 01:47:55 INFO [ytdlp-runner] Resolvendo URL (web) cookie=off: https://www.youtube.com/watch?v=9O1fSxoDN7w args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s --extractor-args youtube:player_client=web https://www.youtube.com/watch?v=9O1fSxoDN7w
2026-03-02 01:47:56 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 01:47:56 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:47:57 WARN [ytdlp-runner] Resolução falhou code=1 stderr= a supported JavaScript runtime and challenge solver script distribution installed. Review any warnings presented before this message. For more details, refer to  https://github.com/yt-dlp/yt-dlp/wiki/EJS
WARNING: Only images are available for download. use --list-formats to see them
ERROR: [youtube] 9O1fSxoDN7w: Requested format is not available. Use --list-formats for a list of available formats
2026-03-02 01:47:57 WARN [ytdlp-runner] Tentativa web falhou: yt-dlp exited 1
2026-03-02 01:47:57 INFO [ytdlp-runner] Resolvendo URL (default) cookie=off: https://www.youtube.com/watch?v=9O1fSxoDN7w args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s https://www.youtube.com/watch?v=9O1fSxoDN7w
2026-03-02 01:47:59 WARN [ytdlp-runner] Tentativa default falhou: yt-dlp: nenhuma URL retornada
2026-03-02 01:47:59 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=9O1fSxoDN7w args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=9O1fSxoDN7w
2026-03-02 01:48:00 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 01:48:00 INFO [stream-registry] Sessao criada: key=9O1fSxoDN7w
2026-03-02 01:48:00 INFO [stream-registry] +cliente key=9O1fSxoDN7w client=1 total=1
2026-03-02 01:48:00 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 01:48:00 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=9O1fSxoDN7w PID=45
2026-03-02 01:48:14 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:14 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:14 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:14 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:16 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:16 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:16 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:16 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:17 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:17 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:17 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:17 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:22 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:22 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:23 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:23 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:23 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:23 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:23 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:23 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:24 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:24 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:24 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:24 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:24 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:24 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:25 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:25 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:25 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:25 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:26 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:48:26 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:48:26 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:26 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:26 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:26 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:27 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:27 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:27 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:27 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:28 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:28 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:28 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:28 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:29 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:29 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:30 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:30 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:31 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:31 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:31 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:31 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:37 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:37 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:43 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:43 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:49 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:49 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:53 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:53 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:53 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:53 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:54 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:54 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:55 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:55 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:55 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:48:55 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:48:56 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 01:48:56 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:49:01 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:49:01 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:49:01 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:49:01 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:49:01 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:49:01 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:49:05 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:49:05 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:49:07 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:49:07 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:49:08 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:49:08 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:49:08 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:49:08 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:49:08 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:49:08 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:49:10 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:49:10 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:49:11 INFO [stream-registry] -cliente key=9O1fSxoDN7w client=1 reason=disconnect restantes=0
2026-03-02 01:49:11 INFO [stream-registry] Sessao destruida: key=9O1fSxoDN7w
2026-03-02 01:49:11 INFO [ytdlp-ffmpeg] SIGTERM → PID 45
2026-03-02 01:49:11 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 01:49:11 INFO [ytdlp-ffmpeg] PID 45 encerrado
2026-03-02 01:49:26 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:49:26 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:49:46 INFO [SmartPlayer] Init: key=fJZlVVtw-Ew status=none
2026-03-02 01:49:46 INFO [ytdlp-runner] Resolvendo URL (web) cookie=off: https://www.youtube.com/watch?v=fJZlVVtw-Ew args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s --extractor-args youtube:player_client=web https://www.youtube.com/watch?v=fJZlVVtw-Ew
2026-03-02 01:49:48 WARN [ytdlp-runner] Resolução falhou code=1 stderr= a supported JavaScript runtime and challenge solver script distribution installed. Review any warnings presented before this message. For more details, refer to  https://github.com/yt-dlp/yt-dlp/wiki/EJS
WARNING: Only images are available for download. use --list-formats to see them
ERROR: [youtube] fJZlVVtw-Ew: Requested format is not available. Use --list-formats for a list of available formats
2026-03-02 01:49:48 WARN [ytdlp-runner] Tentativa web falhou: yt-dlp exited 1
2026-03-02 01:49:48 INFO [ytdlp-runner] Resolvendo URL (default) cookie=off: https://www.youtube.com/watch?v=fJZlVVtw-Ew args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s https://www.youtube.com/watch?v=fJZlVVtw-Ew
2026-03-02 01:49:50 WARN [ytdlp-runner] Tentativa default falhou: yt-dlp: nenhuma URL retornada
2026-03-02 01:49:50 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=fJZlVVtw-Ew args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=fJZlVVtw-Ew
2026-03-02 01:49:51 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 01:49:51 INFO [stream-registry] Sessao criada: key=fJZlVVtw-Ew
2026-03-02 01:49:51 INFO [stream-registry] +cliente key=fJZlVVtw-Ew client=1 total=1
2026-03-02 01:49:51 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 01:49:51 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=fJZlVVtw-Ew PID=81
2026-03-02 01:49:56 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:49:56 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:50:02 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:02 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:02 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:02 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:04 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:04 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:05 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:05 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:05 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:05 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:05 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:05 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:06 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:06 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:06 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:06 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:08 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:08 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:08 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:08 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:09 INFO [HTTP] GET /vod-proxy.m3u → 200 (1ms) [anon]
2026-03-02 01:50:09 INFO [SmartPlayer] Init: key=9O1fSxoDN7w status=none
2026-03-02 01:50:09 INFO [ytdlp-runner] Resolvendo URL (web) cookie=off: https://www.youtube.com/watch?v=9O1fSxoDN7w args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s --extractor-args youtube:player_client=web https://www.youtube.com/watch?v=9O1fSxoDN7w
2026-03-02 01:50:11 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:11 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:12 WARN [ytdlp-runner] Resolução falhou code=1 stderr= a supported JavaScript runtime and challenge solver script distribution installed. Review any warnings presented before this message. For more details, refer to  https://github.com/yt-dlp/yt-dlp/wiki/EJS
WARNING: Only images are available for download. use --list-formats to see them
ERROR: [youtube] 9O1fSxoDN7w: Requested format is not available. Use --list-formats for a list of available formats
2026-03-02 01:50:12 WARN [ytdlp-runner] Tentativa web falhou: yt-dlp exited 1
2026-03-02 01:50:12 INFO [ytdlp-runner] Resolvendo URL (default) cookie=off: https://www.youtube.com/watch?v=9O1fSxoDN7w args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s https://www.youtube.com/watch?v=9O1fSxoDN7w
2026-03-02 01:50:13 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:13 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:13 WARN [ytdlp-runner] Tentativa default falhou: yt-dlp: nenhuma URL retornada
2026-03-02 01:50:13 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=9O1fSxoDN7w args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=9O1fSxoDN7w
2026-03-02 01:50:14 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:14 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:14 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:14 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:15 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:15 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:15 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 01:50:15 INFO [stream-registry] Sessao criada: key=9O1fSxoDN7w
2026-03-02 01:50:15 INFO [stream-registry] +cliente key=9O1fSxoDN7w client=1 total=1
2026-03-02 01:50:15 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 01:50:15 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=9O1fSxoDN7w PID=105
2026-03-02 01:50:15 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:15 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:16 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:16 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:19 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:19 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:21 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:21 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:21 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:21 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:21 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:21 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:22 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:22 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:23 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:23 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:23 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:23 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:24 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:24 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:24 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:24 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:24 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:24 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:24 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:24 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:24 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:24 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:25 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:25 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:25 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:25 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:26 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:26 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:26 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 01:50:26 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 01:50:27 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=1
2026-03-02 01:50:27 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:50:28 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:50:28 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:50:29 WARN [stream-registry] Pausando origem por backpressure: key=9O1fSxoDN7w client=1
2026-03-02 01:50:29 INFO [stream-registry] Retomando origem: key=9O1fSxoDN7w
2026-03-02 01:50:30 INFO [stream-registry] -cliente key=9O1fSxoDN7w client=1 reason=disconnect restantes=0
2026-03-02 01:50:30 INFO [stream-registry] Sessao destruida: key=9O1fSxoDN7w
2026-03-02 01:50:30 INFO [ytdlp-ffmpeg] SIGTERM → PID 105
2026-03-02 01:50:30 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=fJZlVVtw-Ew
2026-03-02 01:50:30 INFO [stream-registry] +cliente key=fJZlVVtw-Ew client=2 total=2
2026-03-02 01:50:30 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 01:50:30 INFO [ytdlp-ffmpeg] PID 105 encerrado
2026-03-02 01:50:57 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 01:50:57 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:51:06 INFO [stream-registry] -cliente key=fJZlVVtw-Ew client=1 reason=disconnect restantes=1
2026-03-02 01:51:06 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:06 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:06 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:06 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:07 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:07 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:07 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:07 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:08 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:08 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:08 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:08 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:09 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:09 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:09 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:09 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:09 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:09 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:09 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:09 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:09 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:09 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:11 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:11 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:13 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:13 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:14 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:14 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:15 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:15 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:15 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:15 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:16 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:16 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:16 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:16 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:17 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:17 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:17 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:17 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:18 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:18 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:18 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:18 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:19 WARN [stream-registry] Pausando origem por backpressure: key=fJZlVVtw-Ew client=2
2026-03-02 01:51:19 INFO [stream-registry] Retomando origem: key=fJZlVVtw-Ew
2026-03-02 01:51:19 INFO [stream-registry] -cliente key=fJZlVVtw-Ew client=2 reason=disconnect restantes=0
2026-03-02 01:51:19 INFO [stream-registry] Sessao destruida: key=fJZlVVtw-Ew
2026-03-02 01:51:19 INFO [ytdlp-ffmpeg] SIGTERM → PID 81
2026-03-02 01:51:19 INFO [SmartPlayer] Init: key=uM6U9TRKQak status=none
2026-03-02 01:51:19 INFO [ytdlp-runner] Resolvendo URL (web) cookie=off: https://www.youtube.com/watch?v=uM6U9TRKQak args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s --extractor-args youtube:player_client=web https://www.youtube.com/watch?v=uM6U9TRKQak
2026-03-02 01:51:19 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 01:51:19 INFO [ytdlp-ffmpeg] PID 81 encerrado
2026-03-02 01:51:21 WARN [ytdlp-runner] Resolução falhou code=1 stderr= a supported JavaScript runtime and challenge solver script distribution installed. Review any warnings presented before this message. For more details, refer to  https://github.com/yt-dlp/yt-dlp/wiki/EJS
WARNING: Only images are available for download. use --list-formats to see them
ERROR: [youtube] uM6U9TRKQak: Requested format is not available. Use --list-formats for a list of available formats
2026-03-02 01:51:21 WARN [ytdlp-runner] Tentativa web falhou: yt-dlp exited 1
2026-03-02 01:51:21 INFO [ytdlp-runner] Resolvendo URL (default) cookie=off: https://www.youtube.com/watch?v=uM6U9TRKQak args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s https://www.youtube.com/watch?v=uM6U9TRKQak
2026-03-02 01:51:23 WARN [ytdlp-runner] Tentativa default falhou: yt-dlp: nenhuma URL retornada
2026-03-02 01:51:23 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=uM6U9TRKQak args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=uM6U9TRKQak
2026-03-02 01:51:24 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 01:51:24 INFO [stream-registry] Sessao criada: key=uM6U9TRKQak
2026-03-02 01:51:24 INFO [stream-registry] +cliente key=uM6U9TRKQak client=1 total=1
2026-03-02 01:51:24 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 01:51:24 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=uM6U9TRKQak PID=134
2026-03-02 01:51:25 WARN [stream-registry] Pausando origem por backpressure: key=uM6U9TRKQak client=1
2026-03-02 01:51:25 INFO [stream-registry] Retomando origem: key=uM6U9TRKQak
2026-03-02 01:51:27 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 01:51:27 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:51:30 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=uM6U9TRKQak
2026-03-02 01:51:30 INFO [stream-registry] +cliente key=uM6U9TRKQak client=2 total=2
2026-03-02 01:51:51 INFO [stream-registry] -cliente key=uM6U9TRKQak client=1 reason=disconnect restantes=1
2026-03-02 01:51:55 WARN [stream-registry] Pausando origem por backpressure: key=uM6U9TRKQak client=2
2026-03-02 01:51:55 INFO [stream-registry] Retomando origem: key=uM6U9TRKQak
2026-03-02 01:51:56 INFO [stream-registry] -cliente key=uM6U9TRKQak client=2 reason=disconnect restantes=0
2026-03-02 01:51:56 INFO [stream-registry] Sessao destruida: key=uM6U9TRKQak
2026-03-02 01:51:56 INFO [ytdlp-ffmpeg] SIGTERM → PID 134
2026-03-02 01:51:56 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 01:51:56 INFO [ytdlp-ffmpeg] PID 134 encerrado
2026-03-02 01:51:57 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:51:57 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:52:21 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (2ms) [anon]
2026-03-02 01:52:21 INFO [SmartPlayer] Init: key=PXqX2hK5RF4 status=upcoming
2026-03-02 01:52:21 INFO [stream-registry] Sessao criada: key=PXqX2hK5RF4
2026-03-02 01:52:21 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=1 total=1
2026-03-02 01:52:21 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/PXqX2hK5RF4/maxresdefault_live.jpg
2026-03-02 01:52:21 INFO [SmartPlayer] Placeholder iniciado: key=PXqX2hK5RF4 PID=149
2026-03-02 01:52:22 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:22 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:22 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:22 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:22 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:22 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:22 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:22 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:22 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:22 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:22 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:23 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:23 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:23 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:23 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:23 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:23 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:23 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:23 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:23 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:23 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (2ms) [anon]
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:24 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:24 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:25 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 01:52:25 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=2 total=2
2026-03-02 01:52:25 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:27 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 01:52:27 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:52:42 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=2 reason=disconnect restantes=1
2026-03-02 01:52:42 INFO [SmartPlayer] Init: key=fLVKpXDO_Ms status=upcoming
2026-03-02 01:52:42 INFO [stream-registry] Sessao criada: key=fLVKpXDO_Ms
2026-03-02 01:52:42 INFO [stream-registry] +cliente key=fLVKpXDO_Ms client=1 total=1
2026-03-02 01:52:42 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/fLVKpXDO_Ms/maxresdefault_live.jpg
2026-03-02 01:52:42 INFO [SmartPlayer] Placeholder iniciado: key=fLVKpXDO_Ms PID=188
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:42 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:42 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:43 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:43 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:44 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:44 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:45 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:45 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:46 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:46 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:47 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:47 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:48 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:49 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:49 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:50 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:50 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:51 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:51 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:52 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:52 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:53 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:53 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:54 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:54 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:55 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:55 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:56 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:56 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:52:57 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:52:57 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:57 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=PXqX2hK5RF4 client=1
2026-03-02 01:52:57 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:58 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:58 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:52:59 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:52:59 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:00 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:00 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:01 INFO [stream-registry] Retomando origem: key=PXqX2hK5RF4
2026-03-02 01:53:01 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=1 reason=disconnect restantes=0
2026-03-02 01:53:01 INFO [stream-registry] Sessao destruida: key=PXqX2hK5RF4
2026-03-02 01:53:01 INFO [ffmpeg-placeholder] SIGTERM → PID 149
2026-03-02 01:53:01 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:01 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:01 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:01 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:01 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:01 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:01 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:01 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:01 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:01 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:01 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:01 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:01 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:01 WARN [stream-registry] Pausando origem por backpressure: key=fLVKpXDO_Ms client=1
2026-03-02 01:53:01 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=fLVKpXDO_Ms
2026-03-02 01:53:01 INFO [stream-registry] +cliente key=fLVKpXDO_Ms client=2 total=2
2026-03-02 01:53:01 INFO [stream-registry] Retomando origem: key=fLVKpXDO_Ms
2026-03-02 01:53:04 WARN [ffmpeg-placeholder] SIGTERM timeout (3000ms) → SIGKILL PID 149
2026-03-02 01:53:04 INFO [ffmpeg-runner] Placeholder finalizado code=null
2026-03-02 01:53:04 INFO [ffmpeg-placeholder] PID 149 encerrado
2026-03-02 01:53:09 INFO [stream-registry] -cliente key=fLVKpXDO_Ms client=2 reason=disconnect restantes=1
2026-03-02 01:53:11 INFO [stream-registry] -cliente key=fLVKpXDO_Ms client=1 reason=disconnect restantes=0
2026-03-02 01:53:11 INFO [stream-registry] Sessao destruida: key=fLVKpXDO_Ms
2026-03-02 01:53:11 INFO [ffmpeg-placeholder] SIGTERM → PID 188
2026-03-02 01:53:14 WARN [ffmpeg-placeholder] SIGTERM timeout (3000ms) → SIGKILL PID 188
2026-03-02 01:53:14 INFO [ffmpeg-runner] Placeholder finalizado code=null
2026-03-02 01:53:14 INFO [ffmpeg-placeholder] PID 188 encerrado
