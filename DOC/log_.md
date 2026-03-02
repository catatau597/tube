root@master2:~# docker logs -f tubewranglerr
2026-03-01 23:37:56 INFO [StateManager] Cache carregado com 40 streams.
2026-03-01 23:37:56 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-01 23:37:56 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-01 23:37:56 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-01 23:37:56 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-01 23:37:56 INFO [Scheduler] 5 stream(s) live em monitoramento.
2026-03-01 23:37:56 INFO [Scheduler] Verificação alta frequência: 11 stream(s).
2026-03-01 23:37:56 WARN [ApiKeyRotator] Key #0 marcada como esgotada (1/1).
2026-03-01 23:37:56 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão com quota esgotada.
2026-03-01 23:37:56 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-01 23:38:00 INFO [HTTP] GET / → 302 (4ms) [anon]
2026-03-01 23:38:00 INFO [HTTP] GET /login → 200 (4ms) [anon]
2026-03-01 23:38:19 INFO [HTTP] GET / → 302 (2ms) [anon]
2026-03-01 23:38:19 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-01 23:38:19 INFO [HTTP] GET /css/style.css → 200 (3ms) [anon]
2026-03-01 23:38:19 INFO [HTTP] GET /favicon.ico → 404 (2ms) [anon]
2026-03-01 23:38:25 INFO [HTTP] POST /api/auth/login → 200 (74ms) [admin]
2026-03-01 23:38:25 INFO [HTTP] GET / → 200 (2ms) [admin]
2026-03-01 23:38:25 INFO [HTTP] GET /css/style.css → 304 (2ms) [admin]
2026-03-01 23:38:25 INFO [HTTP] GET /js/app.js → 200 (2ms) [admin]
2026-03-01 23:38:25 INFO [HTTP] GET /js/dashboard.js → 200 (1ms) [admin]
2026-03-01 23:38:25 INFO [HTTP] GET /js/channels.js → 200 (1ms) [admin]
2026-03-01 23:38:25 INFO [HTTP] GET /js/streams.js → 200 (4ms) [admin]
2026-03-01 23:38:25 INFO [HTTP] GET /js/playlists.js → 200 (5ms) [admin]
2026-03-01 23:38:25 INFO [HTTP] GET /js/settings.js → 200 (5ms) [admin]
2026-03-01 23:38:25 INFO [HTTP] GET /js/logs.js → 200 (6ms) [admin]
2026-03-01 23:38:25 INFO [HTTP] GET /js/title-format.js → 200 (3ms) [admin]
2026-03-01 23:38:26 INFO [HTTP] GET /api/scheduler/status → 200 (3ms) [admin]
2026-03-01 23:38:26 INFO [HTTP] GET /api/channels → 304 (4ms) [admin]
2026-03-01 23:38:26 INFO [HTTP] GET /api/streams → 200 (4ms) [admin]
2026-03-01 23:38:26 INFO [HTTP] GET /api/config → 304 (3ms) [admin]
2026-03-01 23:38:26 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-01 23:38:29 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-03-01 23:38:30 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-01 23:38:30 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-01 23:38:42 INFO [SmartPlayer] Init: key=V580YrkHCB8 status=live
2026-03-01 23:38:42 INFO [SmartPlayer] Iniciando streamlink diretamente: key=V580YrkHCB8
2026-03-01 23:38:42 INFO [stream-registry] Sessao criada: key=V580YrkHCB8
2026-03-01 23:38:42 INFO [stream-registry] +cliente key=V580YrkHCB8 total=1
2026-03-01 23:38:42 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-01 23:38:42 INFO [SmartPlayer] Streamlink iniciado: key=V580YrkHCB8 PID=30
2026-03-01 23:38:44 WARN [streamlink-runner][stderr] error: Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-01 23:38:44 WARN [streamlink-runner] Processo finalizado code=1 stderrTail=[cli][info] streamlink is running as root! Be careful!\n[cli][info] Found matching plugin youtube for URL https://www.youtube.com/watch?v=V580YrkHCB8\nerror: Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-01 23:38:44 WARN [SmartPlayer] Streamlink fast fail (1283ms, code=1), iniciando fallback yt-dlp: key=V580YrkHCB8
2026-03-01 23:38:44 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-01 23:38:46 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-01 23:38:46 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-01 23:38:46 INFO [SmartPlayer] Fallback yt-dlp->ffmpeg iniciado: key=V580YrkHCB8 PID=37
2026-03-01 23:38:56 INFO [Scheduler] Verificação alta frequência: 6 stream(s).
2026-03-01 23:38:56 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão esgotadas. Reset à meia-noite UTC.
2026-03-01 23:38:56 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-01 23:39:00 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-01 23:39:00 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-01 23:39:09 INFO [stream-registry] -cliente key=V580YrkHCB8 restantes=0
2026-03-01 23:39:09 INFO [stream-registry] Sessao destruida: key=V580YrkHCB8
2026-03-01 23:39:09 INFO [ytdlp-ffmpeg] SIGTERM → PID 37
2026-03-01 23:39:09 INFO [SmartPlayer] Init: key=5asXKLOXBkk status=live
2026-03-01 23:39:09 INFO [SmartPlayer] Iniciando streamlink diretamente: key=5asXKLOXBkk
2026-03-01 23:39:09 INFO [stream-registry] Sessao criada: key=5asXKLOXBkk
2026-03-01 23:39:09 INFO [stream-registry] +cliente key=5asXKLOXBkk total=1
2026-03-01 23:39:09 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=5asXKLOXBkk
2026-03-01 23:39:09 INFO [SmartPlayer] Streamlink iniciado: key=5asXKLOXBkk PID=46
2026-03-01 23:39:12 WARN [ytdlp-ffmpeg] SIGTERM timeout (3000ms) → SIGKILL PID 37
2026-03-01 23:39:12 INFO [ytdlp-runner] ffmpeg finalizado code=null
2026-03-01 23:39:12 INFO [ytdlp-ffmpeg] PID 37 encerrado
2026-03-01 23:39:26 INFO [stream-registry] -cliente key=5asXKLOXBkk restantes=0
2026-03-01 23:39:26 INFO [stream-registry] Sessao destruida: key=5asXKLOXBkk
2026-03-01 23:39:26 INFO [streamlink] SIGTERM → PID 46
2026-03-01 23:39:26 INFO [SmartPlayer] Init: key=jgH4vzaYUus status=live
2026-03-01 23:39:26 INFO [SmartPlayer] Iniciando streamlink diretamente: key=jgH4vzaYUus
2026-03-01 23:39:26 INFO [stream-registry] Sessao criada: key=jgH4vzaYUus
2026-03-01 23:39:26 INFO [stream-registry] +cliente key=jgH4vzaYUus total=1
2026-03-01 23:39:26 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=jgH4vzaYUus
2026-03-01 23:39:26 INFO [SmartPlayer] Streamlink iniciado: key=jgH4vzaYUus PID=49
2026-03-01 23:39:26 WARN [streamlink-runner] Processo finalizado code=130 stderrTail=[cli][info] streamlink is running as root! Be careful!\n[cli][info] Found matching plugin youtube for URL https://www.youtube.com/watch?v=5asXKLOXBkk\n[cli][info] Available streams: 360p (worst, best)\n[cli][info] Opening stream: 360p (http)
2026-03-01 23:39:26 INFO [streamlink] PID 46 encerrado
2026-03-01 23:39:27 WARN [streamlink-runner][stderr] error: Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-01 23:39:27 WARN [streamlink-runner] Processo finalizado code=1 stderrTail=[cli][info] streamlink is running as root! Be careful!\n[cli][info] Found matching plugin youtube for URL https://www.youtube.com/watch?v=jgH4vzaYUus\nerror: Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-01 23:39:27 WARN [SmartPlayer] Streamlink fast fail (1196ms, code=1), iniciando fallback yt-dlp: key=jgH4vzaYUus
2026-03-01 23:39:27 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=jgH4vzaYUus
2026-03-01 23:39:28 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-01 23:39:28 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-01 23:39:28 INFO [SmartPlayer] Fallback yt-dlp->ffmpeg iniciado: key=jgH4vzaYUus PID=56
2026-03-01 23:39:30 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-01 23:39:30 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-01 23:39:35 INFO [stream-registry] -cliente key=jgH4vzaYUus restantes=0
2026-03-01 23:39:35 INFO [stream-registry] Sessao destruida: key=jgH4vzaYUus
2026-03-01 23:39:35 INFO [ytdlp-ffmpeg] SIGTERM → PID 56
2026-03-01 23:39:35 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-01 23:39:35 INFO [ytdlp-ffmpeg] PID 56 encerrado
2026-03-01 23:39:45 INFO [HTTP] GET /vod-proxy.m3u → 200 (4ms) [anon]
2026-03-01 23:39:45 INFO [SmartPlayer] Init: key=wDDK04fJBZ8 status=none
2026-03-01 23:39:45 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=wDDK04fJBZ8
2026-03-01 23:39:47 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-01 23:39:47 INFO [stream-registry] Sessao criada: key=wDDK04fJBZ8
2026-03-01 23:39:47 INFO [stream-registry] +cliente key=wDDK04fJBZ8 total=1
2026-03-01 23:39:47 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-01 23:39:47 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=wDDK04fJBZ8 PID=70
2026-03-01 23:39:52 WARN [stream-registry] Cliente draining > 3000ms, encerrando para reconectar: key=wDDK04fJBZ8
2026-03-01 23:39:52 INFO [stream-registry] Zero clientes apos drop draining, encerrando: key=wDDK04fJBZ8
2026-03-01 23:39:52 INFO [stream-registry] Sessao destruida: key=wDDK04fJBZ8
2026-03-01 23:39:52 INFO [ytdlp-ffmpeg] SIGTERM → PID 70
2026-03-01 23:39:52 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-01 23:39:52 INFO [ytdlp-ffmpeg] PID 70 encerrado
2026-03-01 23:39:54 INFO [HTTP] GET /api/stream/wDDK04fJBZ8 → 200 (8413ms) [anon]
2026-03-01 23:39:54 INFO [SmartPlayer] Init: key=UwkL22fKsUM status=none
2026-03-01 23:39:54 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=UwkL22fKsUM
2026-03-01 23:39:56 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-01 23:39:56 INFO [stream-registry] Sessao criada: key=UwkL22fKsUM
2026-03-01 23:39:56 INFO [stream-registry] +cliente key=UwkL22fKsUM total=1
2026-03-01 23:39:56 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-01 23:39:56 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=UwkL22fKsUM PID=78
2026-03-01 23:39:56 INFO [Scheduler] Verificação alta frequência: 6 stream(s).
2026-03-01 23:39:56 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão esgotadas. Reset à meia-noite UTC.
2026-03-01 23:39:56 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-01 23:40:00 INFO [stream-registry] -cliente key=UwkL22fKsUM restantes=0
2026-03-01 23:40:00 INFO [stream-registry] Sessao destruida: key=UwkL22fKsUM
2026-03-01 23:40:00 INFO [ytdlp-ffmpeg] SIGTERM → PID 78
2026-03-01 23:40:00 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-01 23:40:00 INFO [ytdlp-ffmpeg] PID 78 encerrado
2026-03-01 23:40:01 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-01 23:40:01 INFO [HTTP] GET /login → 200 (1ms) [anon]
^Cread unix @->/run/docker.sock: use of closed network connection
