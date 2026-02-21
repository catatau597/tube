
[+] Running 1/1
 ✔ Container tube  Started                                                                                                                             0.6s
root@master3:~# docker logs -f tube
2026-02-19 23:35:37 INFO [StateManager] Cache carregado com 10 streams.
2026-02-19 23:35:37 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-02-19 23:35:37 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-02-19 23:35:37 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-02-19 23:35:37 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-02-19 23:35:37 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-19 23:35:37 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-19 23:35:37 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-19 23:35:49 INFO [HTTP] GET / → 302 (3ms) [anon]
2026-02-19 23:35:49 INFO [HTTP] GET /login → 200 (4ms) [anon]
2026-02-19 23:35:49 INFO [HTTP] GET /css/style.css → 200 (7ms) [anon]
2026-02-19 23:35:49 INFO [HTTP] GET /favicon.ico → 404 (4ms) [anon]
2026-02-19 23:35:55 INFO [HTTP] POST /api/auth/login → 401 (44ms) [anon]
2026-02-19 23:36:06 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:36:09 INFO [HTTP] POST /api/auth/login → 200 (48ms) [admin]
2026-02-19 23:36:09 INFO [HTTP] GET / → 200 (3ms) [admin]
2026-02-19 23:36:10 INFO [HTTP] GET /css/style.css → 304 (3ms) [admin]
2026-02-19 23:36:10 INFO [HTTP] GET /js/app.js → 200 (4ms) [admin]
2026-02-19 23:36:11 INFO [HTTP] GET /js/dashboard.js → 200 (5ms) [admin]
2026-02-19 23:36:11 INFO [HTTP] GET /js/channels.js → 200 (2ms) [admin]
2026-02-19 23:36:11 INFO [HTTP] GET /js/streams.js → 200 (3ms) [admin]
2026-02-19 23:36:11 INFO [HTTP] GET /js/playlists.js → 200 (8ms) [admin]
2026-02-19 23:36:11 INFO [HTTP] GET /js/settings.js → 200 (12ms) [admin]
2026-02-19 23:36:11 INFO [HTTP] GET /js/logs.js → 200 (12ms) [admin]
2026-02-19 23:36:11 INFO [HTTP] GET /api/scheduler/status → 200 (6ms) [admin]
2026-02-19 23:36:12 INFO [HTTP] GET /api/channels → 304 (4ms) [admin]
2026-02-19 23:36:12 INFO [HTTP] GET /api/streams → 200 (6ms) [admin]
2026-02-19 23:36:12 INFO [HTTP] GET /api/config → 304 (3ms) [admin]
2026-02-19 23:36:12 INFO [HTTP] GET /api/scheduler/status → 304 (3ms) [admin]
2026-02-19 23:36:36 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:36:46 INFO [HTTP] GET /api/logs?limit=200 → 200 (3ms) [admin]
2026-02-19 23:36:47 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-19 23:36:48 INFO [HTTP] GET /api/logs?limit=200 → 200 (5ms) [admin]
2026-02-19 23:36:49 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-19 23:36:50 INFO [HTTP] GET /api/scheduler/status → 304 (4ms) [admin]
2026-02-19 23:36:51 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-19 23:36:54 INFO [HTTP] GET /api/streams → 304 (2ms) [admin]
2026-02-19 23:36:54 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-19 23:36:55 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-19 23:37:06 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:37:12 INFO [HTTP] GET /live-proxy.m3u → 200 (4ms) [anon]
2026-02-19 23:37:37 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:37:45 INFO [HTTP] GET /api/config → 304 (3ms) [admin]
2026-02-19 23:37:45 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-02-19 23:37:45 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-19 23:37:53 INFO [HTTP] GET /api/config → 304 (4ms) [admin]
2026-02-19 23:37:53 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-02-19 23:37:53 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-19 23:37:56 INFO [HTTP] GET /api/config → 304 (3ms) [admin]
2026-02-19 23:37:56 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-02-19 23:37:56 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-19 23:37:58 INFO [Scheduler] Configuração atualizada em hot reload: LOCAL_TIMEZONE=America/Sao_Paulo
2026-02-19 23:37:58 INFO [Scheduler] Configuração atualizada em hot reload: STALE_HOURS=6
2026-02-19 23:37:58 INFO [Scheduler] Configuração atualizada em hot reload: USE_PLAYLIST_ITEMS=true
2026-02-19 23:37:58 INFO Nível de log atualizado para DEBUG
2026-02-19 23:37:58 INFO [API][config] Atualização de configurações (8 chave(s)).
2026-02-19 23:37:58 INFO [HTTP] PATCH /api/config → 200 (5ms) [admin]
2026-02-19 23:37:58 INFO [HTTP] GET /api/config → 200 (6ms) [admin]
2026-02-19 23:37:58 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET / → 304 (3ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET /css/style.css → 304 (3ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET /js/app.js → 304 (4ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET /js/dashboard.js → 304 (3ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET /js/channels.js → 304 (3ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET /js/streams.js → 304 (3ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET /js/playlists.js → 304 (4ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET /js/settings.js → 304 (7ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET /js/logs.js → 304 (6ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET /api/credentials → 304 (0ms) [admin]
2026-02-19 23:38:04 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-19 23:38:07 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:38:12 INFO [Scheduler] Configuração atualizada em hot reload: LOCAL_TIMEZONE=America/Sao_Paulo
2026-02-19 23:38:12 INFO [Scheduler] Configuração atualizada em hot reload: STALE_HOURS=6
2026-02-19 23:38:12 INFO [Scheduler] Configuração atualizada em hot reload: USE_PLAYLIST_ITEMS=true
2026-02-19 23:38:12 INFO Nível de log atualizado para DEBUG
2026-02-19 23:38:12 INFO [API][config] Atualização de configurações (8 chave(s)).
2026-02-19 23:38:12 INFO [HTTP] PATCH /api/config → 200 (7ms) [admin]
2026-02-19 23:38:12 INFO [HTTP] GET /api/config → 200 (3ms) [admin]
2026-02-19 23:38:12 INFO [HTTP] GET /api/credentials → 304 (0ms) [admin]
2026-02-19 23:38:14 INFO [Scheduler] Configuração atualizada em hot reload: LOCAL_TIMEZONE=America/Sao_Paulo
2026-02-19 23:38:14 INFO [Scheduler] Configuração atualizada em hot reload: STALE_HOURS=6
2026-02-19 23:38:14 INFO [Scheduler] Configuração atualizada em hot reload: USE_PLAYLIST_ITEMS=true
2026-02-19 23:38:14 INFO Nível de log atualizado para DEBUG
2026-02-19 23:38:14 INFO [API][config] Atualização de configurações (8 chave(s)).
2026-02-19 23:38:14 INFO [HTTP] PATCH /api/config → 200 (4ms) [admin]
2026-02-19 23:38:14 INFO [HTTP] GET /api/config → 200 (3ms) [admin]
2026-02-19 23:38:14 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-02-19 23:38:25 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-19 23:38:26 INFO [HTTP] GET / → 304 (2ms) [admin]
2026-02-19 23:38:26 INFO [HTTP] GET /css/style.css → 304 (2ms) [admin]
2026-02-19 23:38:26 INFO [HTTP] GET /js/app.js → 304 (2ms) [admin]
2026-02-19 23:38:26 INFO [HTTP] GET /js/dashboard.js → 304 (1ms) [admin]
2026-02-19 23:38:26 INFO [HTTP] GET /js/channels.js → 304 (2ms) [admin]
2026-02-19 23:38:26 INFO [HTTP] GET /js/streams.js → 304 (3ms) [admin]
2026-02-19 23:38:26 INFO [HTTP] GET /js/playlists.js → 304 (3ms) [admin]
2026-02-19 23:38:26 INFO [HTTP] GET /js/settings.js → 304 (3ms) [admin]
2026-02-19 23:38:26 INFO [HTTP] GET /js/logs.js → 304 (0ms) [admin]
2026-02-19 23:38:26 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-02-19 23:38:37 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:38:42 INFO [HTTP] GET /live-proxy.m3u → 200 (2ms) [anon]
2026-02-19 23:38:42 INFO [HTTP] GET //api/stream/mRsLcC-fRgU → 401 (1ms) [anon]
2026-02-19 23:38:42 INFO [HTTP] GET //api/stream/mRsLcC-fRgU → 401 (2ms) [anon]
2026-02-19 23:39:02 INFO [HTTP] GET /live-proxy.m3u → 200 (3ms) [admin]
2026-02-19 23:39:02 INFO [HTTP] GET /live-proxy.m3u → 200 (2ms) [admin]
2026-02-19 23:39:02 INFO [HTTP] GET /live-proxy.m3u → 304 (5ms) [admin]
2026-02-19 23:39:05 INFO [HTTP] GET /live-proxy.m3u → 304 (3ms) [admin]
2026-02-19 23:39:07 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:39:28 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-02-19 23:39:28 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-02-19 23:39:28 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-19 23:39:28 INFO [HTTP] GET /api/config → 304 (3ms) [admin]
2026-02-19 23:39:28 INFO [HTTP] GET /api/credentials → 304 (0ms) [admin]
2026-02-19 23:39:28 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-19 23:39:32 INFO [HTTP] GET /api/config → 304 (3ms) [admin]
2026-02-19 23:39:32 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-02-19 23:39:32 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-02-19 23:39:36 INFO [Scheduler] Configuração atualizada em hot reload: LOCAL_TIMEZONE=America/Sao_Paulo
2026-02-19 23:39:36 INFO [Scheduler] Configuração atualizada em hot reload: STALE_HOURS=6
2026-02-19 23:39:36 INFO [Scheduler] Configuração atualizada em hot reload: USE_PLAYLIST_ITEMS=true
2026-02-19 23:39:36 INFO Nível de log atualizado para DEBUG
2026-02-19 23:39:36 INFO [API][config] Atualização de configurações (8 chave(s)).
2026-02-19 23:39:36 INFO [HTTP] PATCH /api/config → 200 (4ms) [admin]
2026-02-19 23:39:36 INFO [HTTP] GET /api/config → 200 (1ms) [admin]
2026-02-19 23:39:36 INFO [HTTP] GET /api/credentials → 304 (0ms) [admin]
2026-02-19 23:39:37 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:39:41 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-19 23:39:53 INFO [HTTP] GET /live-proxy.m3u → 200 (2ms) [anon]
2026-02-19 23:39:53 INFO [SmartPlayer] Requisição de stream: videoId=mRsLcC-fRgU
2026-02-19 23:39:53 INFO [SmartPlayer] Stream encontrado: videoId=mRsLcC-fRgU status=live
2026-02-19 23:39:53 INFO [SmartPlayer] Stream está genuinamente ao vivo: videoId=mRsLcC-fRgU
2026-02-19 23:39:53 INFO [streamlink-runner] Testando streamlinkHasPlayableStream: url=https://www.youtube.com/watch?v=mRsLcC-fRgU
2026-02-19 23:39:55 INFO [streamlink-runner] streamlinkHasPlayableStream finalizado code=0
2026-02-19 23:39:55 INFO [SmartPlayer] streamlinkHasPlayableStream=true videoId=mRsLcC-fRgU
2026-02-19 23:39:55 INFO [SmartPlayer] Usando Streamlink para videoId=mRsLcC-fRgU
2026-02-19 23:39:55 INFO [streamlink-runner] Iniciando streamlink: url=https://www.youtube.com/watch?v=mRsLcC-fRgU
2026-02-19 23:39:55 WARN [streamlink-runner][stderr] [cli][info] streamlink is running as root! Be careful!

2026-02-19 23:39:55 WARN [streamlink-runner][stderr] [cli][info] Found matching plugin youtube for URL https://www.youtube.com/watch?v=mRsLcC-fRgU

2026-02-19 23:39:57 WARN [streamlink-runner][stderr] [cli][info] Available streams: 144p (worst), 240p, 360p, 480p, 720p, 1080p (best)

2026-02-19 23:39:57 WARN [streamlink-runner][stderr] [cli][info] Opening stream: 1080p (hls)

2026-02-19 23:40:07 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:40:37 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-19 23:40:37 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-19 23:40:37 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:40:37 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-19 23:40:46 INFO [streamlink-runner] Resposta fechada, processo streamlink encerrado.
2026-02-19 23:40:46 WARN [streamlink-runner][stderr] [cli][info] Stream ended

2026-02-19 23:40:46 WARN [streamlink-runner][stderr] Interrupted! Exiting...
[cli][info] Closing currently open stream...

2026-02-19 23:40:46 INFO [streamlink-runner] streamlink finalizado com code=130
2026-02-19 23:41:07 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:41:15 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (4ms) [anon]
2026-02-19 23:41:15 INFO [SmartPlayer] Requisição de stream: videoId=qNSDllcfgv0
2026-02-19 23:41:15 INFO [SmartPlayer] Stream encontrado: videoId=qNSDllcfgv0 status=upcoming
2026-02-19 23:41:15 INFO [SmartPlayer] Enviando placeholder com texto para videoId=qNSDllcfgv0
2026-02-19 23:41:15 INFO [ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=https://i.ytimg.com/vi/qNSDllcfgv0/maxresdefault_live.jpg
2026-02-19 23:41:15 WARN [ffmpeg-runner][stderr] [Parsed_drawtext_1 @ 0x7f403cff2200] Cannot find a valid font for the family Sans
[AVFilterGraph @ 0x7f403d429ec0] Error initializing filters

2026-02-19 23:41:15 WARN [ffmpeg-runner][stderr] Error : No such file or directory

2026-02-19 23:41:15 INFO [HTTP] GET /api/stream/qNSDllcfgv0 → 200 (59ms) [anon]
2026-02-19 23:41:15 INFO [ffmpeg-runner] Resposta fechada, processo ffmpeg encerrado.
2026-02-19 23:41:15 INFO [ffmpeg-runner] ffmpeg finalizado com code=254
2026-02-19 23:41:16 INFO [SmartPlayer] Requisição de stream: videoId=34lJLkCX0kU
2026-02-19 23:41:16 INFO [SmartPlayer] Stream encontrado: videoId=34lJLkCX0kU status=upcoming
2026-02-19 23:41:16 INFO [SmartPlayer] Enviando placeholder com texto para videoId=34lJLkCX0kU
2026-02-19 23:41:16 INFO [ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=https://i.ytimg.com/vi/34lJLkCX0kU/maxresdefault_live.jpg
2026-02-19 23:41:16 WARN [ffmpeg-runner][stderr] [Parsed_drawtext_1 @ 0x7f509aa3c3c0] Cannot find a valid font for the family Sans
[AVFilterGraph @ 0x7f509af26ec0] Error initializing filters
Error : No such file or directory

2026-02-19 23:41:16 INFO [HTTP] GET /api/stream/34lJLkCX0kU → 200 (51ms) [anon]
2026-02-19 23:41:16 INFO [ffmpeg-runner] Resposta fechada, processo ffmpeg encerrado.
2026-02-19 23:41:16 INFO [ffmpeg-runner] ffmpeg finalizado com code=254
2026-02-19 23:41:16 INFO [SmartPlayer] Requisição de stream: videoId=XW6a62qPFQc
2026-02-19 23:41:16 INFO [SmartPlayer] Stream encontrado: videoId=XW6a62qPFQc status=upcoming
2026-02-19 23:41:16 INFO [SmartPlayer] Enviando placeholder com texto para videoId=XW6a62qPFQc
2026-02-19 23:41:16 INFO [ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=https://i.ytimg.com/vi/XW6a62qPFQc/maxresdefault_live.jpg
2026-02-19 23:41:16 WARN [ffmpeg-runner][stderr] [Parsed_drawtext_1 @ 0x7fc31a55c3c0] Cannot find a valid font for the family Sans
[AVFilterGraph @ 0x7fc31aa46ec0] Error initializing filters
Error : No such file or directory

2026-02-19 23:41:16 INFO [HTTP] GET /api/stream/XW6a62qPFQc → 200 (90ms) [anon]
2026-02-19 23:41:16 INFO [ffmpeg-runner] Resposta fechada, processo ffmpeg encerrado.
2026-02-19 23:41:16 INFO [ffmpeg-runner] ffmpeg finalizado com code=254
2026-02-19 23:41:16 INFO [SmartPlayer] Requisição de stream: videoId=IUcNwAqPqGo
2026-02-19 23:41:16 INFO [SmartPlayer] Stream encontrado: videoId=IUcNwAqPqGo status=upcoming
2026-02-19 23:41:16 INFO [SmartPlayer] Enviando placeholder com texto para videoId=IUcNwAqPqGo
2026-02-19 23:41:16 INFO [ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=https://i.ytimg.com/vi/IUcNwAqPqGo/maxresdefault_live.jpg
2026-02-19 23:41:16 WARN [ffmpeg-runner][stderr] [Parsed_drawtext_1 @ 0x7f8128a86200] Cannot find a valid font for the family Sans
[AVFilterGraph @ 0x7f8128ebdec0] Error initializing filters
Error : No such file or directory

2026-02-19 23:41:16 INFO [HTTP] GET /api/stream/IUcNwAqPqGo → 200 (88ms) [anon]
2026-02-19 23:41:16 INFO [ffmpeg-runner] Resposta fechada, processo ffmpeg encerrado.
2026-02-19 23:41:16 INFO [ffmpeg-runner] ffmpeg finalizado com code=254
2026-02-19 23:41:16 INFO [SmartPlayer] Requisição de stream: videoId=fTnw7DMq89Y
2026-02-19 23:41:16 INFO [SmartPlayer] Stream encontrado: videoId=fTnw7DMq89Y status=upcoming
2026-02-19 23:41:16 INFO [SmartPlayer] Enviando placeholder com texto para videoId=fTnw7DMq89Y
2026-02-19 23:41:16 INFO [ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=https://i.ytimg.com/vi/fTnw7DMq89Y/maxresdefault_live.jpg
2026-02-19 23:41:16 WARN [ffmpeg-runner][stderr] [Parsed_drawtext_1 @ 0x7f9f201093c0] Cannot find a valid font for the family Sans
[AVFilterGraph @ 0x7f9f205f3ec0] Error initializing filters
Error : No such file or directory

2026-02-19 23:41:16 INFO [HTTP] GET /api/stream/fTnw7DMq89Y → 200 (53ms) [anon]
2026-02-19 23:41:16 INFO [ffmpeg-runner] Resposta fechada, processo ffmpeg encerrado.
2026-02-19 23:41:16 INFO [ffmpeg-runner] ffmpeg finalizado com code=254
2026-02-19 23:41:16 INFO [SmartPlayer] Requisição de stream: videoId=JhjQr18W_ak
2026-02-19 23:41:16 INFO [SmartPlayer] Stream encontrado: videoId=JhjQr18W_ak status=upcoming
2026-02-19 23:41:16 INFO [SmartPlayer] Enviando placeholder com texto para videoId=JhjQr18W_ak
2026-02-19 23:41:16 INFO [ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=https://i.ytimg.com/vi/JhjQr18W_ak/maxresdefault_live.jpg
2026-02-19 23:41:16 WARN [ffmpeg-runner][stderr] [Parsed_drawtext_1 @ 0x7fd626c073c0] Cannot find a valid font for the family Sans
[AVFilterGraph @ 0x7fd6270f1ec0] Error initializing filters
Error : No such file or directory

2026-02-19 23:41:16 INFO [HTTP] GET /api/stream/JhjQr18W_ak → 200 (84ms) [anon]
2026-02-19 23:41:16 INFO [ffmpeg-runner] Resposta fechada, processo ffmpeg encerrado.
2026-02-19 23:41:16 INFO [ffmpeg-runner] ffmpeg finalizado com code=254
2026-02-19 23:41:37 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:42:07 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:42:37 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:43:07 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:43:38 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:44:08 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:44:38 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:45:08 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:45:37 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-19 23:45:37 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-19 23:45:37 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-19 23:45:38 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:46:08 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:46:38 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:47:08 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:47:38 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:48:08 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:48:39 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:49:09 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:49:39 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:50:09 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:50:37 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-19 23:50:37 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-19 23:50:37 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-19 23:50:39 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:51:09 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:51:39 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:52:09 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:52:39 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:53:09 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:53:39 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:54:10 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:54:40 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:55:10 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:55:37 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-19 23:55:37 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-19 23:55:38 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-19 23:55:40 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:56:10 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:56:40 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:57:10 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:57:40 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-19 23:58:10 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:58:40 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:59:11 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-19 23:59:41 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:00:11 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:00:37 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-20 00:00:37 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-20 00:00:38 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-20 00:00:41 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:01:11 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:01:41 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:02:11 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:02:41 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:03:11 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:03:42 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:04:12 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:04:42 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:05:12 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:05:38 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-20 00:05:38 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-20 00:05:38 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-20 00:05:42 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:06:12 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:06:42 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:07:12 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:07:42 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:08:12 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:08:30 INFO [HTTP] GET /vod-proxy.m3u → 200 (2ms) [anon]
2026-02-20 00:08:39 INFO [HTTP] GET /vod-proxy.m3u → 200 (2ms) [anon]
2026-02-20 00:08:43 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:08:46 INFO [HTTP] GET /api/config → 304 (3ms) [admin]
2026-02-20 00:08:46 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-02-20 00:08:46 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-20 00:08:57 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-20 00:08:57 INFO [HTTP] GET /api/channels → 304 (5ms) [admin]
2026-02-20 00:08:57 INFO [HTTP] GET /api/streams → 200 (1ms) [admin]
2026-02-20 00:08:57 INFO [HTTP] GET /api/config → 304 (0ms) [admin]
2026-02-20 00:08:57 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-20 00:09:13 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:09:43 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:10:13 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:10:38 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-20 00:10:38 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-20 00:10:38 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-20 00:10:43 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:11:13 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:11:43 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:12:13 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:12:43 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:13:14 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:13:44 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:14:14 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:14:44 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:15:14 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:15:38 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-20 00:15:38 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-20 00:15:38 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-20 00:15:44 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:16:14 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:16:44 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:17:14 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:17:44 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:18:15 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:18:45 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:19:15 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:19:45 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:20:15 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:20:38 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-20 00:20:38 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-20 00:20:38 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-20 00:20:45 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:21:15 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:21:45 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:22:15 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:22:45 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:23:15 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:23:45 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:24:16 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:24:46 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:25:16 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:25:38 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-20 00:25:38 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-20 00:25:38 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-20 00:25:46 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:26:16 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:26:46 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:27:16 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:27:46 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:28:16 INFO [HTTP] GET / → 304 (2ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /css/style.css → 304 (3ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /js/app.js → 304 (3ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /js/dashboard.js → 304 (3ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /js/channels.js → 304 (3ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /js/streams.js → 304 (7ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /js/playlists.js → 304 (6ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /js/settings.js → 304 (7ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /js/logs.js → 304 (4ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:28:16 INFO [HTTP] GET /api/channels → 304 (0ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /api/streams → 200 (2ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /api/config → 304 (0ms) [admin]
2026-02-20 00:28:16 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-20 00:28:46 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:28:55 INFO [HTTP] GET /api/channels → 304 (3ms) [admin]
2026-02-20 00:28:55 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-20 00:29:09 INFO [HTTP] GET /api/streams → 304 (3ms) [admin]
2026-02-20 00:29:10 INFO [HTTP] GET /api/scheduler/status → 304 (4ms) [admin]
2026-02-20 00:29:16 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:29:47 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 00:30:11 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-20 00:30:17 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:30:23 INFO [HTTP] GET /live-proxy.m3u → 200 (3ms) [anon]
2026-02-20 00:30:23 INFO [SmartPlayer] Requisição de stream: videoId=mRsLcC-fRgU
2026-02-20 00:30:23 INFO [SmartPlayer] Stream encontrado: videoId=mRsLcC-fRgU status=live
2026-02-20 00:30:23 INFO [SmartPlayer] Stream está genuinamente ao vivo: videoId=mRsLcC-fRgU
2026-02-20 00:30:23 INFO [streamlink-runner] Testando streamlinkHasPlayableStream: url=https://www.youtube.com/watch?v=mRsLcC-fRgU
2026-02-20 00:30:24 INFO [streamlink-runner] streamlinkHasPlayableStream finalizado code=0
2026-02-20 00:30:24 INFO [SmartPlayer] streamlinkHasPlayableStream=true videoId=mRsLcC-fRgU
2026-02-20 00:30:24 INFO [SmartPlayer] Usando Streamlink para videoId=mRsLcC-fRgU
2026-02-20 00:30:24 INFO [streamlink-runner] Iniciando streamlink: url=https://www.youtube.com/watch?v=mRsLcC-fRgU
2026-02-20 00:30:25 WARN [streamlink-runner][stderr] [cli][info] streamlink is running as root! Be careful!

2026-02-20 00:30:25 WARN [streamlink-runner][stderr] [cli][info] Found matching plugin youtube for URL https://www.youtube.com/watch?v=mRsLcC-fRgU

2026-02-20 00:30:25 WARN [streamlink-runner][stderr] [cli][info] Available streams: 144p (worst), 240p, 360p, 480p, 720p, 1080p (best)

2026-02-20 00:30:25 WARN [streamlink-runner][stderr] [cli][info] Opening stream: 1080p (hls)

2026-02-20 00:30:38 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-20 00:30:38 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-02-20 00:30:38 INFO [Scheduler] Estado: 1 live | 9 upcoming | 0 vod.
2026-02-20 00:30:47 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 00:31:02 INFO [streamlink-runner] Resposta fechada, processo streamlink encerrado.
2026-02-20 00:31:02 WARN [streamlink-runner][stderr] [cli][info] Stream ended

2026-02-20 00:31:02 WARN [streamlink-runner][stderr] Interrupted! Exiting...
[cli][info] Closing currently open stream...

2026-02-20 00:31:02 INFO [streamlink-runner] streamlink finalizado com code=130
