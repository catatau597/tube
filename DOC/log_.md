root@master2:~# docker logs -f tubewranglerr
2026-03-02 11:53:28 INFO [StateManager] Cache carregado com 31 streams.
2026-03-02 11:53:28 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-02 11:53:28 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-02 11:53:28 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-02 11:53:28 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-02 11:53:28 INFO [Scheduler] 1 stream(s) na janela pré-evento.
2026-03-02 11:53:28 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-03-02 11:53:28 INFO [Scheduler] Estado: 0 live | 21 upcoming | 10 vod.
2026-03-02 11:53:32 INFO [HTTP] GET / → 302 (5ms) [anon]
2026-03-02 11:53:32 INFO [HTTP] GET /login → 200 (5ms) [anon]
2026-03-02 11:53:42 INFO [HTTP] GET / → 302 (2ms) [anon]
2026-03-02 11:53:42 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 11:53:42 INFO [HTTP] GET /css/style.css → 200 (3ms) [anon]
2026-03-02 11:53:43 INFO [HTTP] GET /favicon.ico → 404 (2ms) [anon]
2026-03-02 11:53:49 INFO [HTTP] POST /api/auth/login → 401 (73ms) [anon]
2026-03-02 11:53:53 INFO [HTTP] POST /api/auth/login → 200 (74ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET / → 200 (2ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /css/style.css → 304 (3ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /js/app.js → 200 (3ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /js/dashboard.js → 200 (5ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /js/channels.js → 200 (5ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /js/streams.js → 200 (5ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /js/playlists.js → 200 (6ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /js/settings.js → 200 (6ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /js/logs.js → 200 (4ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /js/title-format.js → 200 (1ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /api/scheduler/status → 200 (3ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /api/channels → 200 (4ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /api/streams → 200 (3ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-03-02 11:53:53 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 11:54:02 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 11:54:02 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 11:54:06 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 11:54:22 INFO [HTTP] GET /vod-proxy.m3u → 200 (3ms) [anon]
2026-03-02 11:54:22 INFO [SmartPlayer] Init HLS: key=V580YrkHCB8 status=none
2026-03-02 11:54:22 INFO [hls-session] Sessao criada: key=V580YrkHCB8 kind=vod dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 11:54:22 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=V580YrkHCB8 args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 11:54:24 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 11:54:24 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 11:54:24 INFO [SmartPlayer] VOD HLS iniciado: key=V580YrkHCB8 PID=35
2026-03-02 11:54:25 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (2564ms) [anon]
2026-03-02 11:54:25 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00004.ts → 200 (11ms) [anon]
2026-03-02 11:54:25 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00005.ts → 200 (3ms) [anon]
2026-03-02 11:54:26 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00006.ts → 200 (2ms) [anon]
2026-03-02 11:54:28 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00007.ts → 200 (2ms) [anon]
2026-03-02 11:54:30 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 11:54:32 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00508.ts → 200 (3ms) [anon]
2026-03-02 11:54:32 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 11:54:32 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 11:55:03 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 11:55:03 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 11:55:12 INFO [hls-runner] finalizado code=0
2026-03-02 11:55:12 INFO [hls-session] Sessao destruida: key=V580YrkHCB8 reason=vod-exit
2026-03-02 11:55:12 INFO [ffmpeg-hls-urls] PID 35 já encerrado, skip kill
2026-03-02 11:55:28 INFO [SmartPlayer] Init HLS: key=V580YrkHCB8 status=none
2026-03-02 11:55:28 INFO [hls-session] Sessao criada: key=V580YrkHCB8 kind=vod dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 11:55:28 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=V580YrkHCB8 args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 11:55:30 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 11:55:30 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 11:55:30 INFO [SmartPlayer] VOD HLS iniciado: key=V580YrkHCB8 PID=55
2026-03-02 11:55:31 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (3079ms) [anon]
2026-03-02 11:55:31 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00010.ts → 200 (7ms) [anon]
2026-03-02 11:55:31 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00011.ts → 200 (3ms) [anon]
2026-03-02 11:55:32 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00012.ts → 200 (2ms) [anon]
2026-03-02 11:55:33 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 11:55:33 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 11:55:34 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00013.ts → 200 (3ms) [anon]
2026-03-02 11:55:36 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 11:55:38 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00415.ts → 200 (2ms) [anon]
2026-03-02 11:56:03 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 11:56:03 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 11:56:04 INFO [HTTP] GET /vod-proxy.m3u → 200 (1ms) [anon]
2026-03-02 11:56:04 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 11:56:04 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_01947.ts → 200 (21ms) [anon]
2026-03-02 11:56:04 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_01948.ts → 200 (4ms) [anon]
2026-03-02 11:56:05 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_01949.ts → 200 (3ms) [anon]
2026-03-02 11:56:07 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_01950.ts → 200 (4ms) [anon]
2026-03-02 11:56:10 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (2ms) [anon]
2026-03-02 11:56:12 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_02247.ts → 200 (2ms) [anon]
2026-03-02 11:56:33 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 11:56:33 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 11:56:41 INFO [HTTP] GET /vod-proxy.m3u → 200 (1ms) [anon]
2026-03-02 11:56:41 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 11:56:41 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_04251.ts → 200 (4ms) [anon]
2026-03-02 11:56:41 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_04252.ts → 200 (1ms) [anon]
2026-03-02 11:56:42 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_04253.ts → 200 (2ms) [anon]
2026-03-02 11:56:44 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_04254.ts → 200 (2ms) [anon]
2026-03-02 11:56:45 INFO [hls-runner] finalizado code=0
2026-03-02 11:56:45 INFO [hls-session] Sessao destruida: key=V580YrkHCB8 reason=vod-exit
2026-03-02 11:56:45 INFO [ffmpeg-hls-urls] PID 55 já encerrado, skip kill
2026-03-02 11:56:46 INFO [SmartPlayer] Init HLS: key=V580YrkHCB8 status=none
2026-03-02 11:56:46 INFO [hls-session] Sessao criada: key=V580YrkHCB8 kind=vod dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 11:56:46 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=V580YrkHCB8 args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 11:56:48 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 11:56:48 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 11:56:48 INFO [SmartPlayer] VOD HLS iniciado: key=V580YrkHCB8 PID=82
2026-03-02 11:56:49 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (2465ms) [anon]
2026-03-02 11:56:54 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 11:56:59 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 11:57:03 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 11:57:03 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 11:57:04 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 11:57:09 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 11:57:14 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 11:57:19 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (0ms) [anon]
2026-03-02 11:57:21 INFO [SmartPlayer] Init HLS: key=pYowbb2vLfI status=none
2026-03-02 11:57:21 INFO [hls-session] Sessao criada: key=pYowbb2vLfI kind=vod dir=/tmp/tubewranglerr-hls/pYowbb2vLfI
2026-03-02 11:57:21 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=pYowbb2vLfI args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=pYowbb2vLfI
2026-03-02 11:57:24 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 11:57:24 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/pYowbb2vLfI
2026-03-02 11:57:24 INFO [SmartPlayer] VOD HLS iniciado: key=pYowbb2vLfI PID=97
2026-03-02 11:57:24 INFO [HTTP] GET /api/stream/pYowbb2vLfI → 200 (2531ms) [anon]
2026-03-02 11:57:24 INFO [HTTP] GET /api/stream/pYowbb2vLfI/segment_00007.ts → 200 (7ms) [anon]
2026-03-02 11:57:24 INFO [HTTP] GET /api/stream/pYowbb2vLfI/segment_00008.ts → 200 (2ms) [anon]
2026-03-02 11:57:24 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 11:57:25 INFO [HTTP] GET /api/stream/pYowbb2vLfI/segment_00009.ts → 200 (5ms) [anon]
2026-03-02 11:57:27 INFO [HTTP] GET /api/stream/pYowbb2vLfI/segment_00010.ts → 200 (2ms) [anon]
2026-03-02 11:57:28 INFO [SmartPlayer] Init HLS: key=KruWlgjA2Us status=none
2026-03-02 11:57:28 INFO [hls-session] Sessao criada: key=KruWlgjA2Us kind=vod dir=/tmp/tubewranglerr-hls/KruWlgjA2Us
2026-03-02 11:57:28 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=KruWlgjA2Us args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=KruWlgjA2Us
2026-03-02 11:57:29 INFO [HTTP] GET /api/stream/pYowbb2vLfI → 200 (1ms) [anon]
2026-03-02 11:57:30 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 11:57:30 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/KruWlgjA2Us
2026-03-02 11:57:30 INFO [SmartPlayer] VOD HLS iniciado: key=KruWlgjA2Us PID=105
2026-03-02 11:57:31 INFO [HTTP] GET /api/stream/KruWlgjA2Us → 200 (2930ms) [anon]
2026-03-02 11:57:31 INFO [HTTP] GET /api/stream/KruWlgjA2Us/segment_00001.ts → 200 (7ms) [anon]
2026-03-02 11:57:31 INFO [HTTP] GET /api/stream/KruWlgjA2Us/segment_00002.ts → 200 (2ms) [anon]
2026-03-02 11:57:31 INFO [HTTP] GET /api/stream/pYowbb2vLfI/segment_00408.ts → 200 (2ms) [anon]
2026-03-02 11:57:33 INFO [SmartPlayer] Init HLS: key=woXMZqd9j14 status=none
2026-03-02 11:57:33 INFO [hls-session] Sessao criada: key=woXMZqd9j14 kind=vod dir=/tmp/tubewranglerr-hls/woXMZqd9j14
2026-03-02 11:57:33 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=woXMZqd9j14 args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=woXMZqd9j14
2026-03-02 11:57:33 INFO [HTTP] GET /api/stream/KruWlgjA2Us/segment_00003.ts → 200 (4ms) [anon]
2026-03-02 11:57:33 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 11:57:33 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 11:57:35 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 11:57:35 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/woXMZqd9j14
2026-03-02 11:57:35 INFO [SmartPlayer] VOD HLS iniciado: key=woXMZqd9j14 PID=118
2026-03-02 11:57:35 INFO [hls-runner] finalizado code=0
2026-03-02 11:57:35 INFO [hls-session] Sessao destruida: key=pYowbb2vLfI reason=vod-exit
2026-03-02 11:57:35 INFO [ffmpeg-hls-urls] PID 97 já encerrado, skip kill
2026-03-02 11:57:36 INFO [HTTP] GET /api/stream/woXMZqd9j14 → 200 (2903ms) [anon]
2026-03-02 11:57:36 INFO [HTTP] GET /api/stream/woXMZqd9j14/segment_00010.ts → 200 (9ms) [anon]
2026-03-02 11:57:36 INFO [HTTP] GET /api/stream/woXMZqd9j14/segment_00011.ts → 200 (2ms) [anon]
2026-03-02 11:57:38 INFO [HTTP] GET /api/stream/woXMZqd9j14/segment_00012.ts → 200 (2ms) [anon]
2026-03-02 11:57:38 INFO [hls-runner] finalizado code=0
2026-03-02 11:57:38 INFO [hls-session] Sessao destruida: key=V580YrkHCB8 reason=vod-exit
2026-03-02 11:57:38 INFO [ffmpeg-hls-urls] PID 82 já encerrado, skip kill
2026-03-02 11:57:38 INFO [HTTP] GET /api/stream/KruWlgjA2Us → 200 (1ms) [anon]
2026-03-02 11:57:40 INFO [HTTP] GET /api/stream/woXMZqd9j14/segment_00013.ts → 200 (2ms) [anon]
2026-03-02 11:57:40 INFO [HTTP] GET /api/stream/KruWlgjA2Us/segment_00123.ts → 200 (4ms) [anon]
2026-03-02 11:57:42 INFO [HTTP] GET /api/stream/woXMZqd9j14 → 200 (1ms) [anon]
2026-03-02 11:57:44 INFO [HTTP] GET /api/stream/woXMZqd9j14/segment_00289.ts → 200 (2ms) [anon]
2026-03-02 11:58:04 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 11:58:04 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 11:58:17 INFO [hls-runner] finalizado code=0
2026-03-02 11:58:17 INFO [hls-session] Sessao destruida: key=woXMZqd9j14 reason=vod-exit
2026-03-02 11:58:17 INFO [ffmpeg-hls-urls] PID 118 já encerrado, skip kill
