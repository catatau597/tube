root@master2:~# docker logs -f tubewranglerr
2026-03-02 00:47:07 INFO [StateManager] Cache carregado com 40 streams.
2026-03-02 00:47:07 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-02 00:47:07 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-02 00:47:07 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-02 00:47:07 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-02 00:47:07 INFO [Scheduler] 5 stream(s) live em monitoramento.
2026-03-02 00:47:07 INFO [Scheduler] Verificação alta frequência: 11 stream(s).
2026-03-02 00:47:08 WARN [ApiKeyRotator] Key #0 marcada como esgotada (1/1).
2026-03-02 00:47:08 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão com quota esgotada.
2026-03-02 00:47:08 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-02 00:47:11 INFO [HTTP] GET / → 302 (5ms) [anon]
2026-03-02 00:47:11 INFO [HTTP] GET /login → 200 (11ms) [anon]
2026-03-02 00:47:36 INFO [HTTP] GET / → 302 (2ms) [anon]
2026-03-02 00:47:36 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:47:36 INFO [HTTP] GET /css/style.css → 200 (2ms) [anon]
2026-03-02 00:47:37 INFO [HTTP] GET /favicon.ico → 404 (3ms) [anon]
2026-03-02 00:47:41 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:47:41 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 00:47:43 INFO [HTTP] POST /api/auth/login → 200 (76ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET / → 200 (2ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /css/style.css → 304 (2ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/app.js → 200 (2ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/dashboard.js → 200 (3ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/channels.js → 200 (3ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/streams.js → 200 (3ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/playlists.js → 200 (4ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/settings.js → 200 (4ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/logs.js → 200 (4ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/title-format.js → 200 (4ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /api/scheduler/status → 200 (2ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /api/channels → 304 (4ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /api/streams → 200 (3ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:47:47 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:47:59 INFO [HTTP] GET /vod-proxy.m3u → 200 (3ms) [anon]
2026-03-02 00:47:59 INFO [SmartPlayer] Init: key=wDDK04fJBZ8 status=none
2026-03-02 00:47:59 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=wDDK04fJBZ8 args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --extractor-args youtube:player_client=android --no-playlist --print %(url)s https://www.youtube.com/watch?v=wDDK04fJBZ8
2026-03-02 00:48:01 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-02 00:48:01 INFO [stream-registry] Sessao criada: key=wDDK04fJBZ8
2026-03-02 00:48:01 INFO [stream-registry] +cliente key=wDDK04fJBZ8 client=1 total=1
2026-03-02 00:48:01 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 00:48:01 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=wDDK04fJBZ8 PID=35
2026-03-02 00:48:07 INFO [Scheduler] Verificação alta frequência: 6 stream(s).
2026-03-02 00:48:07 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão esgotadas. Reset à meia-noite UTC.
2026-03-02 00:48:07 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-02 00:48:12 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:48:12 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 00:48:30 INFO [ytdlp-runner] ffmpeg finalizado code=0
2026-03-02 00:48:30 INFO [stream-registry] Sessao destruida: key=wDDK04fJBZ8
2026-03-02 00:48:30 INFO [ytdlp-ffmpeg] PID 35 já encerrado, skip kill
2026-03-02 00:48:41 INFO [HTTP] GET /api/stream/wDDK04fJBZ8 → 200 (42192ms) [anon]
2026-03-02 00:48:42 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:48:42 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:49:06 INFO [SmartPlayer] Init: key=vdsB2bnTC2s status=none
2026-03-02 00:49:06 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=vdsB2bnTC2s args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --extractor-args youtube:player_client=android --no-playlist --print %(url)s https://www.youtube.com/watch?v=vdsB2bnTC2s
2026-03-02 00:49:07 INFO [Scheduler] Verificação alta frequência: 6 stream(s).
2026-03-02 00:49:07 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão esgotadas. Reset à meia-noite UTC.
2026-03-02 00:49:07 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-02 00:49:08 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-02 00:49:08 INFO [stream-registry] Sessao criada: key=vdsB2bnTC2s
2026-03-02 00:49:08 INFO [stream-registry] +cliente key=vdsB2bnTC2s client=1 total=1
2026-03-02 00:49:08 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 00:49:08 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=vdsB2bnTC2s PID=55
2026-03-02 00:49:12 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:49:12 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 00:49:30 INFO [stream-registry] -cliente key=vdsB2bnTC2s client=1 reason=disconnect restantes=0
2026-03-02 00:49:30 INFO [stream-registry] Sessao destruida: key=vdsB2bnTC2s
2026-03-02 00:49:30 INFO [ytdlp-ffmpeg] SIGTERM → PID 55
2026-03-02 00:49:31 INFO [SmartPlayer] Init: key=UwkL22fKsUM status=none
2026-03-02 00:49:31 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=UwkL22fKsUM args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --extractor-args youtube:player_client=android --no-playlist --print %(url)s https://www.youtube.com/watch?v=UwkL22fKsUM
2026-03-02 00:49:31 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 00:49:31 INFO [ytdlp-ffmpeg] PID 55 encerrado
2026-03-02 00:49:32 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-02 00:49:32 INFO [stream-registry] Sessao criada: key=UwkL22fKsUM
2026-03-02 00:49:32 INFO [stream-registry] +cliente key=UwkL22fKsUM client=1 total=1
2026-03-02 00:49:32 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 00:49:32 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=UwkL22fKsUM PID=69
2026-03-02 00:49:42 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:49:42 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:50:02 WARN [stream-registry] Cliente draining prolongado, encerrando: key=UwkL22fKsUM client=1 drainingMs=25001 backpressure=24089
2026-03-02 00:50:02 INFO [stream-registry] -cliente key=UwkL22fKsUM client=1 reason=draining-timeout>25001ms restantes=0
2026-03-02 00:50:02 INFO [stream-registry] Zero clientes apos drop draining, encerrando: key=UwkL22fKsUM
2026-03-02 00:50:02 INFO [stream-registry] Sessao destruida: key=UwkL22fKsUM
2026-03-02 00:50:02 INFO [ytdlp-ffmpeg] SIGTERM → PID 69
2026-03-02 00:50:02 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 00:50:02 INFO [ytdlp-ffmpeg] PID 69 encerrado
2026-03-02 00:50:07 INFO [Scheduler] Verificação alta frequência: 6 stream(s).
2026-03-02 00:50:07 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão esgotadas. Reset à meia-noite UTC.
2026-03-02 00:50:07 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-02 00:50:12 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:50:12 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:50:21 INFO [HTTP] GET /api/stream/UwkL22fKsUM → 200 (50480ms) [anon]
2026-03-02 00:50:42 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:50:42 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:50:43 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-03-02 00:50:43 INFO [HTTP] GET /api/cookies → 304 (1ms) [admin]
2026-03-02 00:50:43 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-03-02 00:50:43 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 00:50:43 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:50:44 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-03-02 00:50:44 INFO [HTTP] GET /api/cookies → 304 (1ms) [admin]
2026-03-02 00:50:44 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-03-02 00:50:44 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 00:50:44 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:51:07 INFO [Scheduler] Verificação alta frequência: 6 stream(s).
2026-03-02 00:51:07 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão esgotadas. Reset à meia-noite UTC.
2026-03-02 00:51:07 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-02 00:51:13 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:51:13 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:51:17 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
2026-03-02 00:51:17 INFO [API][config] Atualização de configurações (1 chave(s)).
2026-03-02 00:51:17 INFO [HTTP] PATCH /api/config → 200 (5ms) [admin]
2026-03-02 00:51:38 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:51:38 INFO [HTTP] GET /api/config → 200 (1ms) [admin]
2026-03-02 00:51:38 INFO [HTTP] GET /api/channels → 304 (1ms) [admin]
2026-03-02 00:51:38 INFO [HTTP] GET /api/streams → 200 (2ms) [admin]
2026-03-02 00:51:38 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:51:43 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:51:43 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:51:43 INFO [Scheduler] Trigger manual recebido. Executando busca principal imediata...
2026-03-02 00:51:43 INFO [Scheduler] Iniciando busca principal. Tipo: full sync. maxScheduleHours: 96h
2026-03-02 00:51:44 INFO [YouTubeApi] fetchBySearch eventType=live: 1 id(s) encontrado(s) até agora
2026-03-02 00:51:44 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 7 id(s) encontrado(s) até agora
2026-03-02 00:51:46 INFO [YouTubeApi] Filtro de janela: 3 válidos (1 live, 2 upcoming) | Rejeitados: 129 VOD, 4 futuro demais, 0 passado
2026-03-02 00:51:46 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:47 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 4 id(s) encontrado(s) até agora
2026-03-02 00:51:48 INFO [YouTubeApi] Filtro de janela: 2 válidos (0 live, 2 upcoming) | Rejeitados: 107 VOD, 0 futuro demais, 0 passado
2026-03-02 00:51:49 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:49 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 25 id(s) encontrado(s) até agora
2026-03-02 00:51:50 INFO [YouTubeApi] Filtro de janela: 6 válidos (0 live, 6 upcoming) | Rejeitados: 27 VOD, 18 futuro demais, 0 passado
2026-03-02 00:51:50 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:50 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:51 INFO [YouTubeApi] Filtro de janela: 0 válidos (0 live, 0 upcoming) | Rejeitados: 38 VOD, 0 futuro demais, 0 passado
2026-03-02 00:51:51 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:51 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 11 id(s) encontrado(s) até agora
2026-03-02 00:51:52 INFO [YouTubeApi] Filtro de janela: 9 válidos (0 live, 9 upcoming) | Rejeitados: 56 VOD, 0 futuro demais, 0 passado
2026-03-02 00:51:53 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:53 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:54 INFO [YouTubeApi] Filtro de janela: 0 válidos (0 live, 0 upcoming) | Rejeitados: 9 VOD, 0 futuro demais, 0 passado
2026-03-02 00:51:54 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:54 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 5 id(s) encontrado(s) até agora
2026-03-02 00:51:55 INFO [YouTubeApi] Filtro de janela: 3 válidos (0 live, 3 upcoming) | Rejeitados: 27 VOD, 0 futuro demais, 0 passado
2026-03-02 00:51:55 INFO [Scheduler] Verificação alta frequência: 3 stream(s).
2026-03-02 00:51:55 INFO [Scheduler] Estado: 5 live | 25 upcoming | 8 vod.
2026-03-02 00:51:55 INFO [HTTP] POST /api/scheduler/trigger → 200 (11610ms) [admin]
2026-03-02 00:51:55 INFO [HTTP] GET /api/scheduler/status → 200 (0ms) [admin]
2026-03-02 00:51:55 INFO [HTTP] GET /api/channels → 200 (2ms) [admin]
2026-03-02 00:51:55 INFO [HTTP] GET /api/streams → 200 (1ms) [admin]
2026-03-02 00:51:55 INFO [HTTP] GET /api/config → 304 (0ms) [admin]
2026-03-02 00:51:55 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET / → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /css/style.css → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/app.js → 304 (2ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/dashboard.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/channels.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/streams.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/playlists.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/settings.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/title-format.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/logs.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /api/channels → 304 (4ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /api/streams → 304 (3ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-03-02 00:52:02 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:52:07 INFO [Scheduler] 5 stream(s) live em monitoramento.
2026-03-02 00:52:07 INFO [Scheduler] Verificação alta frequência: 5 stream(s).
2026-03-02 00:52:08 INFO [Scheduler] Estado: 1 live | 25 upcoming | 10 vod.
2026-03-02 00:52:13 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:52:13 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 00:52:14 INFO [HTTP] GET /api/scheduler/status → 200 (1ms) [admin]
2026-03-02 00:52:28 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-02 00:52:28 INFO [SmartPlayer] Init: key=V580YrkHCB8 status=live
2026-03-02 00:52:28 INFO [SmartPlayer] Iniciando streamlink diretamente: key=V580YrkHCB8
2026-03-02 00:52:28 INFO [stream-registry] Sessao criada: key=V580YrkHCB8
2026-03-02 00:52:28 INFO [stream-registry] +cliente key=V580YrkHCB8 client=1 total=1
2026-03-02 00:52:28 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=V580YrkHCB8 args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --stdout https://www.youtube.com/watch?v=V580YrkHCB8 best
2026-03-02 00:52:28 INFO [SmartPlayer] Streamlink iniciado: key=V580YrkHCB8 PID=108
2026-03-02 00:52:31 INFO [SmartPlayer] Streamlink primeiro byte: key=V580YrkHCB8 t=2856ms
2026-03-02 00:52:43 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:52:43 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:52:45 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:52:45 INFO [HTTP] GET /api/channels → 200 (2ms) [admin]
2026-03-02 00:52:45 INFO [HTTP] GET /api/streams → 200 (5ms) [admin]
2026-03-02 00:52:45 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-03-02 00:52:45 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-03-02 00:53:03 INFO [streamlink-runner] Processo finalizado code=0
2026-03-02 00:53:03 INFO [stream-registry] Sessao destruida: key=V580YrkHCB8
2026-03-02 00:53:03 INFO [streamlink] PID 108 já encerrado, skip kill
2026-03-02 00:53:03 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (34585ms) [anon]
2026-03-02 00:53:13 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:53:13 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:53:25 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-02 00:53:25 INFO [SmartPlayer] Init: key=V580YrkHCB8 status=live
2026-03-02 00:53:25 INFO [SmartPlayer] Iniciando streamlink diretamente: key=V580YrkHCB8
2026-03-02 00:53:25 INFO [stream-registry] Sessao criada: key=V580YrkHCB8
2026-03-02 00:53:25 INFO [stream-registry] +cliente key=V580YrkHCB8 client=1 total=1
2026-03-02 00:53:25 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=V580YrkHCB8 args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --stdout https://www.youtube.com/watch?v=V580YrkHCB8 best
2026-03-02 00:53:25 INFO [SmartPlayer] Streamlink iniciado: key=V580YrkHCB8 PID=125
2026-03-02 00:53:26 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 00:53:29 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 00:53:30 WARN [streamlink-runner][stderr] error: No playable streams found on this URL: https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 00:53:31 WARN [streamlink-runner] Processo finalizado code=1 stderrTail=**)\n[cli][info] Waiting for streams, retrying every 1.0 second(s)\n[plugins.youtube][error] Could not get video info - OK: This live event has ended.\n[cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)\n[plugins.youtube][error] Could not get video info - OK: This live event has ended.\nerror: No playable streams found on this URL: https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 00:53:31 WARN [SmartPlayer] Streamlink falhou sem output (5991ms, code=1), iniciando fallback yt-dlp: key=V580YrkHCB8
2026-03-02 00:53:31 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=V580YrkHCB8 args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --extractor-args youtube:player_client=android --no-playlist --print %(url)s https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 00:53:32 WARN [ytdlp-runner] Resolução falhou code=1 stderr=ube] V580YrkHCB8: android client dash formats require a GVS PO Token which was not provided. They will be skipped as they may yield HTTP Error 403. You can manually pass a GVS PO Token for this client with --extractor-args "youtube:po_token=android.gvs+XXX". For more information, refer to  https://github.com/yt-dlp/yt-dlp/wiki/PO-Token-Guide
ERROR: [youtube] V580YrkHCB8: This live event has ended.
2026-03-02 00:53:32 ERROR [SmartPlayer] Fallback yt-dlp: falha na resolucao de URL: Error: yt-dlp exited 1
2026-03-02 00:53:32 INFO [stream-registry] Sessao destruida: key=V580YrkHCB8
2026-03-02 00:53:32 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (7390ms) [anon]
2026-03-02 00:53:37 INFO [SmartPlayer] Init: key=V580YrkHCB8 status=live
2026-03-02 00:53:37 INFO [SmartPlayer] Iniciando streamlink diretamente: key=V580YrkHCB8
2026-03-02 00:53:37 INFO [stream-registry] Sessao criada: key=V580YrkHCB8
2026-03-02 00:53:37 INFO [stream-registry] +cliente key=V580YrkHCB8 client=1 total=1
2026-03-02 00:53:37 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=V580YrkHCB8 args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --stdout https://www.youtube.com/watch?v=V580YrkHCB8 best
2026-03-02 00:53:37 INFO [SmartPlayer] Streamlink iniciado: key=V580YrkHCB8 PID=132
2026-03-02 00:53:40 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 00:53:42 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 00:53:43 INFO [stream-registry] -cliente key=V580YrkHCB8 client=1 reason=disconnect restantes=0
2026-03-02 00:53:43 INFO [stream-registry] Sessao destruida: key=V580YrkHCB8
2026-03-02 00:53:43 INFO [streamlink] SIGTERM → PID 132
2026-03-02 00:53:43 WARN [streamlink-runner] Processo finalizado code=130 stderrTail=lugins.youtube][error] Could not get video info - OK: This live event has ended.\n[cli][info] Waiting for streams, retrying every 1.0 second(s)\n[cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)\n[cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 00:53:43 INFO [streamlink] PID 132 encerrado
2026-03-02 00:53:43 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:53:43 INFO [HTTP] GET /login → 200 (0ms) [anon]
^Croot@master2:~# ^C
root@master2:~# docker logs -f tubewranglerr
2026-03-02 00:47:07 INFO [StateManager] Cache carregado com 40 streams.
2026-03-02 00:47:07 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-02 00:47:07 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-02 00:47:07 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-02 00:47:07 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-02 00:47:07 INFO [Scheduler] 5 stream(s) live em monitoramento.
2026-03-02 00:47:07 INFO [Scheduler] Verificação alta frequência: 11 stream(s).
2026-03-02 00:47:08 WARN [ApiKeyRotator] Key #0 marcada como esgotada (1/1).
2026-03-02 00:47:08 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão com quota esgotada.
2026-03-02 00:47:08 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-02 00:47:11 INFO [HTTP] GET / → 302 (5ms) [anon]
2026-03-02 00:47:11 INFO [HTTP] GET /login → 200 (11ms) [anon]
2026-03-02 00:47:36 INFO [HTTP] GET / → 302 (2ms) [anon]
2026-03-02 00:47:36 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:47:36 INFO [HTTP] GET /css/style.css → 200 (2ms) [anon]
2026-03-02 00:47:37 INFO [HTTP] GET /favicon.ico → 404 (3ms) [anon]
2026-03-02 00:47:41 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:47:41 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 00:47:43 INFO [HTTP] POST /api/auth/login → 200 (76ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET / → 200 (2ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /css/style.css → 304 (2ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/app.js → 200 (2ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/dashboard.js → 200 (3ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/channels.js → 200 (3ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/streams.js → 200 (3ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/playlists.js → 200 (4ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/settings.js → 200 (4ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/logs.js → 200 (4ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /js/title-format.js → 200 (4ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /api/scheduler/status → 200 (2ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /api/channels → 304 (4ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /api/streams → 200 (3ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-03-02 00:47:43 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:47:47 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:47:59 INFO [HTTP] GET /vod-proxy.m3u → 200 (3ms) [anon]
2026-03-02 00:47:59 INFO [SmartPlayer] Init: key=wDDK04fJBZ8 status=none
2026-03-02 00:47:59 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=wDDK04fJBZ8 args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --extractor-args youtube:player_client=android --no-playlist --print %(url)s https://www.youtube.com/watch?v=wDDK04fJBZ8
2026-03-02 00:48:01 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-02 00:48:01 INFO [stream-registry] Sessao criada: key=wDDK04fJBZ8
2026-03-02 00:48:01 INFO [stream-registry] +cliente key=wDDK04fJBZ8 client=1 total=1
2026-03-02 00:48:01 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 00:48:01 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=wDDK04fJBZ8 PID=35
2026-03-02 00:48:07 INFO [Scheduler] Verificação alta frequência: 6 stream(s).
2026-03-02 00:48:07 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão esgotadas. Reset à meia-noite UTC.
2026-03-02 00:48:07 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-02 00:48:12 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:48:12 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 00:48:30 INFO [ytdlp-runner] ffmpeg finalizado code=0
2026-03-02 00:48:30 INFO [stream-registry] Sessao destruida: key=wDDK04fJBZ8
2026-03-02 00:48:30 INFO [ytdlp-ffmpeg] PID 35 já encerrado, skip kill
2026-03-02 00:48:41 INFO [HTTP] GET /api/stream/wDDK04fJBZ8 → 200 (42192ms) [anon]
2026-03-02 00:48:42 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:48:42 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:49:06 INFO [SmartPlayer] Init: key=vdsB2bnTC2s status=none
2026-03-02 00:49:06 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=vdsB2bnTC2s args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --extractor-args youtube:player_client=android --no-playlist --print %(url)s https://www.youtube.com/watch?v=vdsB2bnTC2s
2026-03-02 00:49:07 INFO [Scheduler] Verificação alta frequência: 6 stream(s).
2026-03-02 00:49:07 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão esgotadas. Reset à meia-noite UTC.
2026-03-02 00:49:07 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-02 00:49:08 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-02 00:49:08 INFO [stream-registry] Sessao criada: key=vdsB2bnTC2s
2026-03-02 00:49:08 INFO [stream-registry] +cliente key=vdsB2bnTC2s client=1 total=1
2026-03-02 00:49:08 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 00:49:08 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=vdsB2bnTC2s PID=55
2026-03-02 00:49:12 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:49:12 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 00:49:30 INFO [stream-registry] -cliente key=vdsB2bnTC2s client=1 reason=disconnect restantes=0
2026-03-02 00:49:30 INFO [stream-registry] Sessao destruida: key=vdsB2bnTC2s
2026-03-02 00:49:30 INFO [ytdlp-ffmpeg] SIGTERM → PID 55
2026-03-02 00:49:31 INFO [SmartPlayer] Init: key=UwkL22fKsUM status=none
2026-03-02 00:49:31 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=UwkL22fKsUM args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --extractor-args youtube:player_client=android --no-playlist --print %(url)s https://www.youtube.com/watch?v=UwkL22fKsUM
2026-03-02 00:49:31 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 00:49:31 INFO [ytdlp-ffmpeg] PID 55 encerrado
2026-03-02 00:49:32 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-02 00:49:32 INFO [stream-registry] Sessao criada: key=UwkL22fKsUM
2026-03-02 00:49:32 INFO [stream-registry] +cliente key=UwkL22fKsUM client=1 total=1
2026-03-02 00:49:32 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 00:49:32 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=UwkL22fKsUM PID=69
2026-03-02 00:49:42 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:49:42 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:50:02 WARN [stream-registry] Cliente draining prolongado, encerrando: key=UwkL22fKsUM client=1 drainingMs=25001 backpressure=24089
2026-03-02 00:50:02 INFO [stream-registry] -cliente key=UwkL22fKsUM client=1 reason=draining-timeout>25001ms restantes=0
2026-03-02 00:50:02 INFO [stream-registry] Zero clientes apos drop draining, encerrando: key=UwkL22fKsUM
2026-03-02 00:50:02 INFO [stream-registry] Sessao destruida: key=UwkL22fKsUM
2026-03-02 00:50:02 INFO [ytdlp-ffmpeg] SIGTERM → PID 69
2026-03-02 00:50:02 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 00:50:02 INFO [ytdlp-ffmpeg] PID 69 encerrado
2026-03-02 00:50:07 INFO [Scheduler] Verificação alta frequência: 6 stream(s).
2026-03-02 00:50:07 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão esgotadas. Reset à meia-noite UTC.
2026-03-02 00:50:07 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-02 00:50:12 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:50:12 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:50:21 INFO [HTTP] GET /api/stream/UwkL22fKsUM → 200 (50480ms) [anon]
2026-03-02 00:50:42 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:50:42 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:50:43 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-03-02 00:50:43 INFO [HTTP] GET /api/cookies → 304 (1ms) [admin]
2026-03-02 00:50:43 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-03-02 00:50:43 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 00:50:43 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:50:44 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-03-02 00:50:44 INFO [HTTP] GET /api/cookies → 304 (1ms) [admin]
2026-03-02 00:50:44 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-03-02 00:50:44 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 00:50:44 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:51:07 INFO [Scheduler] Verificação alta frequência: 6 stream(s).
2026-03-02 00:51:07 ERROR [Scheduler] Erro na verificação de alta frequência: Error: Todas as API keys estão esgotadas. Reset à meia-noite UTC.
2026-03-02 00:51:07 INFO [Scheduler] Estado: 5 live | 27 upcoming | 8 vod.
2026-03-02 00:51:13 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:51:13 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:51:17 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
2026-03-02 00:51:17 INFO [API][config] Atualização de configurações (1 chave(s)).
2026-03-02 00:51:17 INFO [HTTP] PATCH /api/config → 200 (5ms) [admin]
2026-03-02 00:51:38 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:51:38 INFO [HTTP] GET /api/config → 200 (1ms) [admin]
2026-03-02 00:51:38 INFO [HTTP] GET /api/channels → 304 (1ms) [admin]
2026-03-02 00:51:38 INFO [HTTP] GET /api/streams → 200 (2ms) [admin]
2026-03-02 00:51:38 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:51:43 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:51:43 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:51:43 INFO [Scheduler] Trigger manual recebido. Executando busca principal imediata...
2026-03-02 00:51:43 INFO [Scheduler] Iniciando busca principal. Tipo: full sync. maxScheduleHours: 96h
2026-03-02 00:51:44 INFO [YouTubeApi] fetchBySearch eventType=live: 1 id(s) encontrado(s) até agora
2026-03-02 00:51:44 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 7 id(s) encontrado(s) até agora
2026-03-02 00:51:46 INFO [YouTubeApi] Filtro de janela: 3 válidos (1 live, 2 upcoming) | Rejeitados: 129 VOD, 4 futuro demais, 0 passado
2026-03-02 00:51:46 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:47 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 4 id(s) encontrado(s) até agora
2026-03-02 00:51:48 INFO [YouTubeApi] Filtro de janela: 2 válidos (0 live, 2 upcoming) | Rejeitados: 107 VOD, 0 futuro demais, 0 passado
2026-03-02 00:51:49 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:49 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 25 id(s) encontrado(s) até agora
2026-03-02 00:51:50 INFO [YouTubeApi] Filtro de janela: 6 válidos (0 live, 6 upcoming) | Rejeitados: 27 VOD, 18 futuro demais, 0 passado
2026-03-02 00:51:50 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:50 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:51 INFO [YouTubeApi] Filtro de janela: 0 válidos (0 live, 0 upcoming) | Rejeitados: 38 VOD, 0 futuro demais, 0 passado
2026-03-02 00:51:51 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:51 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 11 id(s) encontrado(s) até agora
2026-03-02 00:51:52 INFO [YouTubeApi] Filtro de janela: 9 válidos (0 live, 9 upcoming) | Rejeitados: 56 VOD, 0 futuro demais, 0 passado
2026-03-02 00:51:53 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:53 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:54 INFO [YouTubeApi] Filtro de janela: 0 válidos (0 live, 0 upcoming) | Rejeitados: 9 VOD, 0 futuro demais, 0 passado
2026-03-02 00:51:54 INFO [YouTubeApi] fetchBySearch eventType=live: 0 id(s) encontrado(s) até agora
2026-03-02 00:51:54 INFO [YouTubeApi] fetchBySearch eventType=upcoming: 5 id(s) encontrado(s) até agora
2026-03-02 00:51:55 INFO [YouTubeApi] Filtro de janela: 3 válidos (0 live, 3 upcoming) | Rejeitados: 27 VOD, 0 futuro demais, 0 passado
2026-03-02 00:51:55 INFO [Scheduler] Verificação alta frequência: 3 stream(s).
2026-03-02 00:51:55 INFO [Scheduler] Estado: 5 live | 25 upcoming | 8 vod.
2026-03-02 00:51:55 INFO [HTTP] POST /api/scheduler/trigger → 200 (11610ms) [admin]
2026-03-02 00:51:55 INFO [HTTP] GET /api/scheduler/status → 200 (0ms) [admin]
2026-03-02 00:51:55 INFO [HTTP] GET /api/channels → 200 (2ms) [admin]
2026-03-02 00:51:55 INFO [HTTP] GET /api/streams → 200 (1ms) [admin]
2026-03-02 00:51:55 INFO [HTTP] GET /api/config → 304 (0ms) [admin]
2026-03-02 00:51:55 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET / → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /css/style.css → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/app.js → 304 (2ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/dashboard.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/channels.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/streams.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/playlists.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/settings.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/title-format.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /js/logs.js → 304 (1ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /api/channels → 304 (4ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /api/streams → 304 (3ms) [admin]
2026-03-02 00:52:01 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-03-02 00:52:02 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:52:07 INFO [Scheduler] 5 stream(s) live em monitoramento.
2026-03-02 00:52:07 INFO [Scheduler] Verificação alta frequência: 5 stream(s).
2026-03-02 00:52:08 INFO [Scheduler] Estado: 1 live | 25 upcoming | 10 vod.
2026-03-02 00:52:13 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:52:13 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 00:52:14 INFO [HTTP] GET /api/scheduler/status → 200 (1ms) [admin]
2026-03-02 00:52:28 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-02 00:52:28 INFO [SmartPlayer] Init: key=V580YrkHCB8 status=live
2026-03-02 00:52:28 INFO [SmartPlayer] Iniciando streamlink diretamente: key=V580YrkHCB8
2026-03-02 00:52:28 INFO [stream-registry] Sessao criada: key=V580YrkHCB8
2026-03-02 00:52:28 INFO [stream-registry] +cliente key=V580YrkHCB8 client=1 total=1
2026-03-02 00:52:28 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=V580YrkHCB8 args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --stdout https://www.youtube.com/watch?v=V580YrkHCB8 best
2026-03-02 00:52:28 INFO [SmartPlayer] Streamlink iniciado: key=V580YrkHCB8 PID=108
2026-03-02 00:52:31 INFO [SmartPlayer] Streamlink primeiro byte: key=V580YrkHCB8 t=2856ms
2026-03-02 00:52:43 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:52:43 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:52:45 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 00:52:45 INFO [HTTP] GET /api/channels → 200 (2ms) [admin]
2026-03-02 00:52:45 INFO [HTTP] GET /api/streams → 200 (5ms) [admin]
2026-03-02 00:52:45 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-03-02 00:52:45 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-03-02 00:53:03 INFO [streamlink-runner] Processo finalizado code=0
2026-03-02 00:53:03 INFO [stream-registry] Sessao destruida: key=V580YrkHCB8
2026-03-02 00:53:03 INFO [streamlink] PID 108 já encerrado, skip kill
2026-03-02 00:53:03 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (34585ms) [anon]
2026-03-02 00:53:13 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:53:13 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:53:25 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-02 00:53:25 INFO [SmartPlayer] Init: key=V580YrkHCB8 status=live
2026-03-02 00:53:25 INFO [SmartPlayer] Iniciando streamlink diretamente: key=V580YrkHCB8
2026-03-02 00:53:25 INFO [stream-registry] Sessao criada: key=V580YrkHCB8
2026-03-02 00:53:25 INFO [stream-registry] +cliente key=V580YrkHCB8 client=1 total=1
2026-03-02 00:53:25 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=V580YrkHCB8 args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --stdout https://www.youtube.com/watch?v=V580YrkHCB8 best
2026-03-02 00:53:25 INFO [SmartPlayer] Streamlink iniciado: key=V580YrkHCB8 PID=125
2026-03-02 00:53:26 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 00:53:29 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 00:53:30 WARN [streamlink-runner][stderr] error: No playable streams found on this URL: https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 00:53:31 WARN [streamlink-runner] Processo finalizado code=1 stderrTail=**)\n[cli][info] Waiting for streams, retrying every 1.0 second(s)\n[plugins.youtube][error] Could not get video info - OK: This live event has ended.\n[cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)\n[plugins.youtube][error] Could not get video info - OK: This live event has ended.\nerror: No playable streams found on this URL: https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 00:53:31 WARN [SmartPlayer] Streamlink falhou sem output (5991ms, code=1), iniciando fallback yt-dlp: key=V580YrkHCB8
2026-03-02 00:53:31 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=V580YrkHCB8 args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --extractor-args youtube:player_client=android --no-playlist --print %(url)s https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 00:53:32 WARN [ytdlp-runner] Resolução falhou code=1 stderr=ube] V580YrkHCB8: android client dash formats require a GVS PO Token which was not provided. They will be skipped as they may yield HTTP Error 403. You can manually pass a GVS PO Token for this client with --extractor-args "youtube:po_token=android.gvs+XXX". For more information, refer to  https://github.com/yt-dlp/yt-dlp/wiki/PO-Token-Guide
ERROR: [youtube] V580YrkHCB8: This live event has ended.
2026-03-02 00:53:32 ERROR [SmartPlayer] Fallback yt-dlp: falha na resolucao de URL: Error: yt-dlp exited 1
2026-03-02 00:53:32 INFO [stream-registry] Sessao destruida: key=V580YrkHCB8
2026-03-02 00:53:32 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (7390ms) [anon]
2026-03-02 00:53:37 INFO [SmartPlayer] Init: key=V580YrkHCB8 status=live
2026-03-02 00:53:37 INFO [SmartPlayer] Iniciando streamlink diretamente: key=V580YrkHCB8
2026-03-02 00:53:37 INFO [stream-registry] Sessao criada: key=V580YrkHCB8
2026-03-02 00:53:37 INFO [stream-registry] +cliente key=V580YrkHCB8 client=1 total=1
2026-03-02 00:53:37 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=V580YrkHCB8 args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --stdout https://www.youtube.com/watch?v=V580YrkHCB8 best
2026-03-02 00:53:37 INFO [SmartPlayer] Streamlink iniciado: key=V580YrkHCB8 PID=132
2026-03-02 00:53:40 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 00:53:42 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 00:53:43 INFO [stream-registry] -cliente key=V580YrkHCB8 client=1 reason=disconnect restantes=0
2026-03-02 00:53:43 INFO [stream-registry] Sessao destruida: key=V580YrkHCB8
2026-03-02 00:53:43 INFO [streamlink] SIGTERM → PID 132
2026-03-02 00:53:43 WARN [streamlink-runner] Processo finalizado code=130 stderrTail=lugins.youtube][error] Could not get video info - OK: This live event has ended.\n[cli][info] Waiting for streams, retrying every 1.0 second(s)\n[cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)\n[cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-02 00:53:43 INFO [streamlink] PID 132 encerrado
2026-03-02 00:53:43 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:53:43 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 00:54:14 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:54:14 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:54:44 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:54:44 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:55:14 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:55:14 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 00:55:44 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:55:44 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:56:14 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:56:14 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 00:56:44 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:56:44 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:57:07 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-02 00:57:07 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-03-02 00:57:08 INFO [Scheduler] Estado: 0 live | 25 upcoming | 10 vod.
2026-03-02 00:57:15 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:57:15 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:57:45 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 00:57:45 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 00:58:15 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:58:15 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:58:45 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:58:45 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:59:15 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:59:15 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 00:59:46 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 00:59:46 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:00:16 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:00:16 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:00:46 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 01:00:46 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:01:16 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 01:01:16 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:01:18 INFO [HTTP] GET /api/scheduler/status → 200 (1ms) [admin]
2026-03-02 01:01:34 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (3ms) [anon]
2026-03-02 01:01:34 INFO [SmartPlayer] Init: key=PXqX2hK5RF4 status=upcoming
2026-03-02 01:01:34 INFO [stream-registry] Sessao criada: key=PXqX2hK5RF4
2026-03-02 01:01:34 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=1 total=1
2026-03-02 01:01:34 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/PXqX2hK5RF4/maxresdefault_live.jpg
2026-03-02 01:01:34 INFO [SmartPlayer] Placeholder iniciado: key=PXqX2hK5RF4 PID=229
2026-03-02 01:01:46 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:01:46 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:01:53 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (2ms) [anon]
2026-03-02 01:01:53 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=PXqX2hK5RF4
2026-03-02 01:01:53 INFO [stream-registry] +cliente key=PXqX2hK5RF4 client=2 total=2
2026-03-02 01:02:00 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=1 reason=disconnect restantes=1
2026-03-02 01:02:00 INFO [SmartPlayer] Init: key=G1XX_0ckbYE status=upcoming
2026-03-02 01:02:00 INFO [stream-registry] Sessao criada: key=G1XX_0ckbYE
2026-03-02 01:02:00 INFO [stream-registry] +cliente key=G1XX_0ckbYE client=1 total=1
2026-03-02 01:02:00 INFO [ffmpeg-runner] Iniciando placeholder: imageUrl=https://i.ytimg.com/vi/G1XX_0ckbYE/maxresdefault_live.jpg
2026-03-02 01:02:00 INFO [SmartPlayer] Placeholder iniciado: key=G1XX_0ckbYE PID=268
2026-03-02 01:02:06 INFO [stream-registry] -cliente key=PXqX2hK5RF4 client=2 reason=disconnect restantes=0
2026-03-02 01:02:06 INFO [stream-registry] Sessao destruida: key=PXqX2hK5RF4
2026-03-02 01:02:06 INFO [ffmpeg-placeholder] SIGTERM → PID 229
2026-03-02 01:02:06 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=G1XX_0ckbYE
2026-03-02 01:02:06 INFO [stream-registry] +cliente key=G1XX_0ckbYE client=2 total=2
2026-03-02 01:02:06 WARN [ffmpeg-placeholder] SIGTERM timeout (500ms) → SIGKILL PID 229
2026-03-02 01:02:06 INFO [ffmpeg-runner] Placeholder finalizado code=null
2026-03-02 01:02:06 INFO [ffmpeg-placeholder] PID 229 encerrado
2026-03-02 01:02:12 INFO [stream-registry] -cliente key=G1XX_0ckbYE client=2 reason=disconnect restantes=1
2026-03-02 01:02:14 INFO [stream-registry] -cliente key=G1XX_0ckbYE client=1 reason=disconnect restantes=0
2026-03-02 01:02:14 INFO [stream-registry] Sessao destruida: key=G1XX_0ckbYE
2026-03-02 01:02:14 INFO [ffmpeg-placeholder] SIGTERM → PID 268
2026-03-02 01:02:14 WARN [ffmpeg-placeholder] SIGTERM timeout (500ms) → SIGKILL PID 268
2026-03-02 01:02:14 INFO [ffmpeg-runner] Placeholder finalizado code=null
2026-03-02 01:02:14 INFO [ffmpeg-placeholder] PID 268 encerrado
2026-03-02 01:02:16 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:02:16 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:02:28 INFO [HTTP] GET /vod-proxy.m3u → 200 (3ms) [anon]
2026-03-02 01:02:28 INFO [SmartPlayer] Init: key=9O1fSxoDN7w status=none
2026-03-02 01:02:28 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=9O1fSxoDN7w args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --extractor-args youtube:player_client=android --no-playlist --print %(url)s https://www.youtube.com/watch?v=9O1fSxoDN7w
2026-03-02 01:02:30 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-02 01:02:30 INFO [stream-registry] Sessao criada: key=9O1fSxoDN7w
2026-03-02 01:02:30 INFO [stream-registry] +cliente key=9O1fSxoDN7w client=1 total=1
2026-03-02 01:02:30 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 01:02:30 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=9O1fSxoDN7w PID=312
2026-03-02 01:02:35 INFO [HTTP] GET /vod-proxy.m3u → 200 (1ms) [anon]
2026-03-02 01:02:36 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=9O1fSxoDN7w
2026-03-02 01:02:36 INFO [stream-registry] +cliente key=9O1fSxoDN7w client=2 total=2
2026-03-02 01:02:47 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 01:02:47 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 01:02:59 INFO [stream-registry] -cliente key=9O1fSxoDN7w client=2 reason=disconnect restantes=1
2026-03-02 01:03:00 INFO [SmartPlayer] Init: key=E1iV2m9fPv4 status=none
2026-03-02 01:03:00 INFO [ytdlp-runner] Resolvendo URL: https://www.youtube.com/watch?v=E1iV2m9fPv4 args=-f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --extractor-args youtube:player_client=android --no-playlist --print %(url)s https://www.youtube.com/watch?v=E1iV2m9fPv4
2026-03-02 01:03:01 INFO [ytdlp-runner] 1 URL(s) resolvida(s)
2026-03-02 01:03:01 INFO [stream-registry] Sessao criada: key=E1iV2m9fPv4
2026-03-02 01:03:01 INFO [stream-registry] +cliente key=E1iV2m9fPv4 client=1 total=1
2026-03-02 01:03:01 INFO [ytdlp-runner] Iniciando ffmpeg (1 URL)
2026-03-02 01:03:01 INFO [SmartPlayer] yt-dlp->ffmpeg iniciado: key=E1iV2m9fPv4 PID=326
2026-03-02 01:03:09 INFO [stream-registry] -cliente key=9O1fSxoDN7w client=1 reason=disconnect restantes=0
2026-03-02 01:03:09 INFO [stream-registry] Sessao destruida: key=9O1fSxoDN7w
2026-03-02 01:03:09 INFO [ytdlp-ffmpeg] SIGTERM → PID 312
2026-03-02 01:03:09 INFO [ytdlp-runner] ffmpeg finalizado code=255
2026-03-02 01:03:09 INFO [ytdlp-ffmpeg] PID 312 encerrado
2026-03-02 01:03:10 INFO [SmartPlayer] Stream ativo, subscrevendo cliente: key=E1iV2m9fPv4
2026-03-02 01:03:10 INFO [stream-registry] +cliente key=E1iV2m9fPv4 client=2 total=2
2026-03-02 01:03:17 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 01:03:17 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:03:41 INFO [ytdlp-runner] ffmpeg finalizado code=0
2026-03-02 01:03:41 INFO [stream-registry] Sessao destruida: key=E1iV2m9fPv4
2026-03-02 01:03:41 INFO [ytdlp-ffmpeg] PID 326 já encerrado, skip kill
2026-03-02 01:03:41 INFO [HTTP] GET /api/stream/E1iV2m9fPv4 → 200 (31457ms) [anon]
2026-03-02 01:03:47 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:03:47 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:03:47 INFO [HTTP] GET /api/stream/E1iV2m9fPv4 → 200 (47895ms) [anon]
2026-03-02 01:04:17 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:04:17 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:04:47 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:04:47 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 01:05:17 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 01:05:17 INFO [HTTP] GET /login → 200 (1ms) [anon]
