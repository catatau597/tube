root@master2:~# docker logs -f tubewranglerr
2026-03-03 09:48:26 INFO [StateManager] Cache carregado com 36 streams.
2026-03-03 09:48:26 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-03 09:48:26 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-03 09:48:26 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-03 09:48:26 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-03 09:48:26 INFO [Scheduler] 3 stream(s) na janela pré-evento.
2026-03-03 09:48:26 INFO [Scheduler] Verificação alta frequência: 3 stream(s).
2026-03-03 09:48:26 INFO [Scheduler] Estado: 0 live | 26 upcoming | 10 vod.
2026-03-03 09:48:30 INFO [HTTP] GET / → 302 (5ms) [anon]
2026-03-03 09:48:30 INFO [HTTP] GET /login → 200 (4ms) [anon]
2026-03-03 09:48:36 INFO [HTTP] GET / → 302 (2ms) [anon]
2026-03-03 09:48:36 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 09:48:36 INFO [HTTP] GET /css/style.css → 200 (3ms) [anon]
2026-03-03 09:48:36 INFO [HTTP] GET /favicon.ico → 404 (3ms) [anon]
2026-03-03 09:48:41 INFO [HTTP] POST /api/auth/login → 200 (75ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET / → 200 (2ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /css/style.css → 304 (2ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /js/app.js → 200 (1ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /js/dashboard.js → 200 (3ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /js/channels.js → 200 (5ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /js/streams.js → 200 (7ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /js/playlists.js → 200 (6ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /js/settings.js → 200 (6ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /js/title-format.js → 200 (5ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /js/logs.js → 200 (6ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /api/scheduler/status → 200 (3ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /api/streams → 200 (4ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /api/config → 304 (3ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /api/channels → 304 (2ms) [admin]
2026-03-03 09:48:41 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-03 09:48:45 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-03 09:48:54 INFO [HTTP] GET /vod-proxy.m3u → 200 (3ms) [anon]
2026-03-03 09:48:54 INFO [SmartPlayer] Init HLS: key=PXqX2hK5RF4 status=none
2026-03-03 09:48:54 INFO [hls-session] Sessao criada: key=PXqX2hK5RF4 kind=vod dir=/tmp/tubewranglerr-hls/PXqX2hK5RF4
2026-03-03 09:48:54 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=PXqX2hK5RF4 args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=PXqX2hK5RF4
2026-03-03 09:48:55 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-03 09:48:55 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/PXqX2hK5RF4
2026-03-03 09:48:55 INFO [SmartPlayer] VOD HLS iniciado: key=PXqX2hK5RF4 PID=29
2026-03-03 09:48:55 INFO [SmartPlayer] Manifesto bootstrap HLS servido: key=PXqX2hK5RF4 mode=cold-start kind=vod
2026-03-03 09:48:55 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (1702ms) [anon]
2026-03-03 09:48:58 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (1ms) [anon]
2026-03-03 09:49:00 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (1ms) [anon]
2026-03-03 09:49:00 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 09:49:00 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 09:49:02 INFO [SmartPlayer] Primeiro manifesto HLS servido: key=PXqX2hK5RF4 mode=cold-start segments=1 timeoutMs=12000 startOffset=0
2026-03-03 09:49:02 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (1ms) [anon]
2026-03-03 09:49:07 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (1ms) [anon]
2026-03-03 09:49:07 INFO [HTTP] GET /api/stream/PXqX2hK5RF4/segment_00000.ts → 200 (3ms) [anon]
2026-03-03 09:49:07 INFO [HTTP] GET /api/stream/PXqX2hK5RF4/segment_00001.ts → 200 (1ms) [anon]
2026-03-03 09:49:12 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (1ms) [anon]
2026-03-03 09:49:12 INFO [HTTP] GET /api/stream/PXqX2hK5RF4/segment_00002.ts → 200 (2ms) [anon]
2026-03-03 09:49:17 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (1ms) [anon]
2026-03-03 09:49:17 INFO [HTTP] GET /api/stream/PXqX2hK5RF4/segment_00003.ts → 200 (2ms) [anon]
2026-03-03 09:49:22 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (1ms) [anon]
2026-03-03 09:49:22 INFO [HTTP] GET /api/stream/PXqX2hK5RF4/segment_00004.ts → 200 (2ms) [anon]
2026-03-03 09:49:27 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (1ms) [anon]
2026-03-03 09:49:27 INFO [HTTP] GET /api/stream/PXqX2hK5RF4/segment_00005.ts → 200 (2ms) [anon]
2026-03-03 09:49:30 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-03 09:49:30 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 09:49:32 INFO [HTTP] GET /api/stream/PXqX2hK5RF4 → 200 (1ms) [anon]
2026-03-03 09:49:32 INFO [HTTP] GET /api/stream/PXqX2hK5RF4/segment_00006.ts → 200 (2ms) [anon]
2026-03-03 09:49:33 INFO [SmartPlayer] Init HLS: key=OisGcrQk6gA status=none
2026-03-03 09:49:33 INFO [hls-session] Sessao criada: key=OisGcrQk6gA kind=vod dir=/tmp/tubewranglerr-hls/OisGcrQk6gA
2026-03-03 09:49:33 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=OisGcrQk6gA args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=OisGcrQk6gA
2026-03-03 09:49:34 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-03 09:49:34 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/OisGcrQk6gA
2026-03-03 09:49:34 INFO [SmartPlayer] VOD HLS iniciado: key=OisGcrQk6gA PID=49
2026-03-03 09:49:34 INFO [SmartPlayer] Manifesto bootstrap HLS servido: key=OisGcrQk6gA mode=cold-start kind=vod
2026-03-03 09:49:34 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (1479ms) [anon]
2026-03-03 09:49:37 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (0ms) [anon]
2026-03-03 09:49:39 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (1ms) [anon]
2026-03-03 09:49:41 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (0ms) [anon]
2026-03-03 09:49:43 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (1ms) [anon]
2026-03-03 09:49:45 INFO [SmartPlayer] Primeiro manifesto HLS servido: key=OisGcrQk6gA mode=cold-start segments=1 timeoutMs=12000 startOffset=0
2026-03-03 09:49:45 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (1ms) [anon]
2026-03-03 09:49:52 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (2004ms) [anon]
2026-03-03 09:49:52 INFO [HTTP] GET /api/stream/OisGcrQk6gA/segment_00000.ts → 200 (10ms) [anon]
2026-03-03 09:49:52 INFO [HTTP] GET /api/stream/OisGcrQk6gA/segment_00001.ts → 200 (3ms) [anon]
2026-03-03 09:49:57 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (1ms) [anon]
2026-03-03 09:50:00 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 09:50:00 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 09:50:02 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (1ms) [anon]
2026-03-03 09:50:02 INFO [HTTP] GET /api/stream/OisGcrQk6gA/segment_00002.ts → 200 (12ms) [anon]
2026-03-03 09:50:07 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (1ms) [anon]
2026-03-03 09:50:12 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (0ms) [anon]
2026-03-03 09:50:12 INFO [HTTP] GET /api/stream/OisGcrQk6gA/segment_00003.ts → 200 (9ms) [anon]
2026-03-03 09:50:17 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (1ms) [anon]
2026-03-03 09:50:17 INFO [HTTP] GET /api/stream/OisGcrQk6gA/segment_00004.ts → 200 (3ms) [anon]
2026-03-03 09:50:22 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (1ms) [anon]
2026-03-03 09:50:26 INFO [hls-session] Sessao destruida: key=PXqX2hK5RF4 reason=idle-timeout
2026-03-03 09:50:26 INFO [ffmpeg-hls-urls] SIGTERM → PID 29
2026-03-03 09:50:26 INFO [hls-runner] finalizado code=255
2026-03-03 09:50:26 INFO [ffmpeg-hls-urls] PID 29 encerrado
2026-03-03 09:50:27 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (1ms) [anon]
2026-03-03 09:50:27 INFO [HTTP] GET /api/stream/OisGcrQk6gA/segment_00005.ts → 200 (11ms) [anon]
2026-03-03 09:50:30 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-03 09:50:30 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 09:50:32 INFO [HTTP] GET /api/stream/OisGcrQk6gA → 200 (1ms) [anon]
2026-03-03 09:50:32 INFO [HTTP] GET /api/stream/OisGcrQk6gA/segment_00006.ts → 200 (2ms) [anon]
2026-03-03 09:50:34 INFO [SmartPlayer] Init HLS: key=G1XX_0ckbYE status=none
2026-03-03 09:50:34 INFO [hls-session] Sessao criada: key=G1XX_0ckbYE kind=vod dir=/tmp/tubewranglerr-hls/G1XX_0ckbYE
2026-03-03 09:50:34 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=G1XX_0ckbYE args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=G1XX_0ckbYE
2026-03-03 09:50:36 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-03 09:50:36 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/G1XX_0ckbYE
2026-03-03 09:50:36 INFO [SmartPlayer] VOD HLS iniciado: key=G1XX_0ckbYE PID=69
2026-03-03 09:50:36 INFO [SmartPlayer] Manifesto bootstrap HLS servido: key=G1XX_0ckbYE mode=cold-start kind=vod
2026-03-03 09:50:36 INFO [HTTP] GET /api/stream/G1XX_0ckbYE → 200 (1731ms) [anon]
2026-03-03 09:50:38 INFO [HTTP] GET /api/stream/G1XX_0ckbYE → 200 (0ms) [anon]
2026-03-03 09:50:40 INFO [HTTP] GET /api/stream/G1XX_0ckbYE → 200 (1ms) [anon]
2026-03-03 09:50:42 INFO [HTTP] GET /api/stream/G1XX_0ckbYE → 200 (0ms) [anon]
2026-03-03 09:50:44 INFO [SmartPlayer] Primeiro manifesto HLS servido: key=G1XX_0ckbYE mode=cold-start segments=1 timeoutMs=12000 startOffset=0
2026-03-03 09:50:44 INFO [HTTP] GET /api/stream/G1XX_0ckbYE → 200 (1ms) [anon]
2026-03-03 09:50:51 INFO [HTTP] GET /api/stream/G1XX_0ckbYE → 200 (1ms) [anon]
2026-03-03 09:50:51 INFO [HTTP] GET /api/stream/G1XX_0ckbYE/segment_00000.ts → 200 (4ms) [anon]
2026-03-03 09:50:51 INFO [HTTP] GET /api/stream/G1XX_0ckbYE/segment_00001.ts → 200 (1ms) [anon]
2026-03-03 09:50:58 INFO [HTTP] GET /api/stream/G1XX_0ckbYE → 200 (1ms) [anon]
2026-03-03 09:50:58 INFO [HTTP] GET /api/stream/G1XX_0ckbYE/segment_00002.ts → 200 (8ms) [anon]
2026-03-03 09:51:00 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-03 09:51:00 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-03 09:51:01 INFO [SmartPlayer] Init HLS: key=lQcklyoAOVY status=none
2026-03-03 09:51:01 INFO [hls-session] Sessao criada: key=lQcklyoAOVY kind=vod dir=/tmp/tubewranglerr-hls/lQcklyoAOVY
2026-03-03 09:51:01 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=lQcklyoAOVY args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=lQcklyoAOVY
2026-03-03 09:51:02 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-03 09:51:02 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/lQcklyoAOVY
2026-03-03 09:51:02 INFO [SmartPlayer] VOD HLS iniciado: key=lQcklyoAOVY PID=83
2026-03-03 09:51:02 INFO [SmartPlayer] Manifesto bootstrap HLS servido: key=lQcklyoAOVY mode=cold-start kind=vod
2026-03-03 09:51:02 INFO [HTTP] GET /api/stream/lQcklyoAOVY → 200 (1745ms) [anon]
2026-03-03 09:51:04 INFO [HTTP] GET /api/stream/lQcklyoAOVY → 200 (1ms) [anon]
2026-03-03 09:51:06 INFO [HTTP] GET /api/stream/lQcklyoAOVY → 200 (1ms) [anon]
2026-03-03 09:51:08 INFO [HTTP] GET /api/stream/lQcklyoAOVY → 200 (1ms) [anon]
2026-03-03 09:51:10 INFO [HTTP] GET /api/stream/lQcklyoAOVY → 200 (1ms) [anon]
2026-03-03 09:51:12 INFO [HTTP] GET /api/stream/lQcklyoAOVY → 200 (1ms) [anon]
2026-03-03 09:51:14 INFO [HTTP] GET /api/stream/lQcklyoAOVY → 200 (1ms) [anon]
2026-03-03 09:51:16 INFO [SmartPlayer] Primeiro manifesto HLS servido: key=lQcklyoAOVY mode=cold-start segments=1 timeoutMs=12000 startOffset=0
2026-03-03 09:51:16 INFO [HTTP] GET /api/stream/lQcklyoAOVY → 200 (2ms) [anon]
2026-03-03 09:51:26 INFO [hls-session] Sessao destruida: key=OisGcrQk6gA reason=idle-timeout
2026-03-03 09:51:26 INFO [ffmpeg-hls-urls] SIGTERM → PID 49
2026-03-03 09:51:26 INFO [hls-runner] finalizado code=255
2026-03-03 09:51:26 INFO [ffmpeg-hls-urls] PID 49 encerrado
2026-03-03 09:51:27 INFO [HTTP] GET /api/stream/lQcklyoAOVY → 200 (3508ms) [anon]
2026-03-03 09:51:27 INFO [HTTP] GET /api/stream/lQcklyoAOVY/segment_00000.ts → 200 (6ms) [anon]
2026-03-03 09:51:27 INFO [HTTP] GET /api/stream/lQcklyoAOVY/segment_00001.ts → 200 (1ms) [anon]
2026-03-03 09:51:31 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 09:51:31 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-03 09:51:32 INFO [SmartPlayer] Init HLS: key=-7biqdPkz0M status=none
2026-03-03 09:51:32 INFO [hls-session] Sessao criada: key=-7biqdPkz0M kind=vod dir=/tmp/tubewranglerr-hls/-7biqdPkz0M
2026-03-03 09:51:32 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=-7biqdPkz0M args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=-7biqdPkz0M
2026-03-03 09:51:33 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-03 09:51:33 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/-7biqdPkz0M
2026-03-03 09:51:33 INFO [SmartPlayer] VOD HLS iniciado: key=-7biqdPkz0M PID=97
2026-03-03 09:51:33 INFO [SmartPlayer] Manifesto bootstrap HLS servido: key=-7biqdPkz0M mode=cold-start kind=vod
2026-03-03 09:51:33 INFO [HTTP] GET /api/stream/-7biqdPkz0M → 200 (1743ms) [anon]
2026-03-03 09:51:36 INFO [HTTP] GET /api/stream/-7biqdPkz0M → 200 (0ms) [anon]
2026-03-03 09:51:38 INFO [HTTP] GET /api/stream/-7biqdPkz0M → 200 (1ms) [anon]
2026-03-03 09:51:40 INFO [HTTP] GET /api/stream/-7biqdPkz0M → 200 (1ms) [anon]
2026-03-03 09:51:42 INFO [SmartPlayer] Primeiro manifesto HLS servido: key=-7biqdPkz0M mode=cold-start segments=1 timeoutMs=12000 startOffset=0
2026-03-03 09:51:42 INFO [HTTP] GET /api/stream/-7biqdPkz0M → 200 (1ms) [anon]
2026-03-03 09:51:46 INFO [hls-session] Sessao destruida: key=G1XX_0ckbYE reason=idle-timeout
2026-03-03 09:51:46 INFO [ffmpeg-hls-urls] SIGTERM → PID 69
2026-03-03 09:51:46 INFO [hls-runner] finalizado code=255
2026-03-03 09:51:46 INFO [ffmpeg-hls-urls] PID 69 encerrado
2026-03-03 09:51:48 INFO [HTTP] GET /api/stream/-7biqdPkz0M → 200 (0ms) [anon]
2026-03-03 09:51:48 INFO [HTTP] GET /api/stream/-7biqdPkz0M/segment_00000.ts → 200 (2ms) [anon]
2026-03-03 09:51:48 INFO [HTTP] GET /api/stream/-7biqdPkz0M/segment_00001.ts → 200 (2ms) [anon]
2026-03-03 09:51:54 INFO [HTTP] GET /api/stream/-7biqdPkz0M → 200 (1ms) [anon]
2026-03-03 09:51:54 INFO [HTTP] GET /api/stream/-7biqdPkz0M/segment_00002.ts → 200 (2ms) [anon]
2026-03-03 09:52:00 INFO [HTTP] GET /api/stream/-7biqdPkz0M → 200 (1ms) [anon]
2026-03-03 09:52:00 INFO [HTTP] GET /api/stream/-7biqdPkz0M/segment_00003.ts → 200 (3ms) [anon]
2026-03-03 09:52:01 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-03 09:52:01 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 09:52:06 INFO [HTTP] GET /api/stream/-7biqdPkz0M → 200 (1ms) [anon]
2026-03-03 09:52:06 INFO [HTTP] GET /api/stream/-7biqdPkz0M/segment_00004.ts → 200 (3ms) [anon]
2026-03-03 09:52:16 INFO [hls-session] Sessao destruida: key=lQcklyoAOVY reason=idle-timeout
2026-03-03 09:52:16 INFO [ffmpeg-hls-urls] SIGTERM → PID 83
2026-03-03 09:52:16 INFO [hls-runner] finalizado code=255
2026-03-03 09:52:16 INFO [ffmpeg-hls-urls] PID 83 encerrado
2026-03-03 09:52:16 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (2ms) [anon]
2026-03-03 09:52:16 INFO [SmartPlayer] Init HLS: key=O6vgcSIxUUo status=upcoming
2026-03-03 09:52:16 INFO [hls-session] Sessao criada: key=O6vgcSIxUUo kind=upcoming dir=/tmp/tubewranglerr-hls/O6vgcSIxUUo
2026-03-03 09:52:16 INFO [hls-runner] Iniciando placeholder HLS dir=/tmp/tubewranglerr-hls/O6vgcSIxUUo imageUrl=https://i.ytimg.com/vi/O6vgcSIxUUo/maxresdefault_live.jpg
2026-03-03 09:52:16 INFO [SmartPlayer] Placeholder HLS iniciado: key=O6vgcSIxUUo PID=106
2026-03-03 09:52:16 INFO [SmartPlayer] Manifesto bootstrap HLS servido: key=O6vgcSIxUUo mode=cold-start kind=upcoming
2026-03-03 09:52:16 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (5ms) [anon]
2026-03-03 09:52:17 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (0ms) [anon]
2026-03-03 09:52:18 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (0ms) [anon]
2026-03-03 09:52:19 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:20 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:21 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:22 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (0ms) [anon]
2026-03-03 09:52:23 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:24 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (2ms) [anon]
2026-03-03 09:52:25 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:26 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (0ms) [anon]
2026-03-03 09:52:27 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:28 INFO [SmartPlayer] Primeiro manifesto HLS servido: key=O6vgcSIxUUo mode=cold-start segments=1 timeoutMs=5000 startOffset=0
2026-03-03 09:52:28 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:30 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:30 INFO [HTTP] GET /api/stream/O6vgcSIxUUo/segment_00000.ts → 200 (1ms) [anon]
2026-03-03 09:52:30 INFO [HTTP] GET /api/stream/O6vgcSIxUUo/segment_00001.ts → 200 (2ms) [anon]
2026-03-03 09:52:31 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-03 09:52:31 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 09:52:32 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (0ms) [anon]
2026-03-03 09:52:32 INFO [HTTP] GET /api/stream/O6vgcSIxUUo/segment_00002.ts → 200 (1ms) [anon]
2026-03-03 09:52:34 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:34 INFO [HTTP] GET /api/stream/O6vgcSIxUUo/segment_00003.ts → 200 (1ms) [anon]
2026-03-03 09:52:36 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:36 INFO [HTTP] GET /api/stream/O6vgcSIxUUo/segment_00004.ts → 200 (1ms) [anon]
2026-03-03 09:52:38 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:38 INFO [HTTP] GET /api/stream/O6vgcSIxUUo/segment_00005.ts → 200 (2ms) [anon]
2026-03-03 09:52:40 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (0ms) [anon]
2026-03-03 09:52:40 INFO [HTTP] GET /api/stream/O6vgcSIxUUo/segment_00006.ts → 200 (1ms) [anon]
2026-03-03 09:52:42 INFO [HTTP] GET /api/stream/O6vgcSIxUUo → 200 (1ms) [anon]
2026-03-03 09:52:42 INFO [HTTP] GET /api/stream/O6vgcSIxUUo/segment_00007.ts → 200 (1ms) [anon]
2026-03-03 09:52:43 INFO [SmartPlayer] Init HLS: key=n3Me5kJ4cdk status=upcoming
2026-03-03 09:52:43 INFO [hls-session] Sessao criada: key=n3Me5kJ4cdk kind=upcoming dir=/tmp/tubewranglerr-hls/n3Me5kJ4cdk
2026-03-03 09:52:43 INFO [hls-runner] Iniciando placeholder HLS dir=/tmp/tubewranglerr-hls/n3Me5kJ4cdk imageUrl=https://i.ytimg.com/vi/n3Me5kJ4cdk/maxresdefault_live.jpg
2026-03-03 09:52:43 INFO [SmartPlayer] Placeholder HLS iniciado: key=n3Me5kJ4cdk PID=145
2026-03-03 09:52:43 INFO [SmartPlayer] Manifesto bootstrap HLS servido: key=n3Me5kJ4cdk mode=cold-start kind=upcoming
2026-03-03 09:52:43 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (6ms) [anon]
2026-03-03 09:52:44 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:52:45 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:52:46 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:52:47 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:52:48 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:52:49 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:52:50 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:52:51 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (0ms) [anon]
2026-03-03 09:52:52 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (0ms) [anon]
2026-03-03 09:52:53 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:52:54 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:52:55 INFO [SmartPlayer] Primeiro manifesto HLS servido: key=n3Me5kJ4cdk mode=cold-start segments=1 timeoutMs=5000 startOffset=0
2026-03-03 09:52:55 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:52:56 INFO [hls-session] Sessao destruida: key=-7biqdPkz0M reason=idle-timeout
2026-03-03 09:52:56 INFO [ffmpeg-hls-urls] SIGTERM → PID 97
2026-03-03 09:52:56 INFO [hls-runner] finalizado code=255
2026-03-03 09:52:56 INFO [ffmpeg-hls-urls] PID 97 encerrado
2026-03-03 09:52:57 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (0ms) [anon]
2026-03-03 09:52:57 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk/segment_00000.ts → 200 (1ms) [anon]
2026-03-03 09:52:57 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk/segment_00001.ts → 200 (1ms) [anon]
2026-03-03 09:52:59 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:53:00 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk/segment_00002.ts → 200 (1ms) [anon]
2026-03-03 09:53:01 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-03 09:53:01 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-03 09:53:02 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (1ms) [anon]
2026-03-03 09:53:02 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk/segment_00003.ts → 200 (1ms) [anon]
2026-03-03 09:53:04 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk → 200 (2ms) [anon]
2026-03-03 09:53:04 INFO [HTTP] GET /api/stream/n3Me5kJ4cdk/segment_00004.ts → 200 (2ms) [anon]
2026-03-03 09:53:06 INFO [hls-session] Sessao destruida: key=O6vgcSIxUUo reason=idle-timeout
2026-03-03 09:53:06 INFO [ffmpeg-hls-placeholder] SIGTERM → PID 106
2026-03-03 09:53:06 INFO [hls-placeholder] finalizado code=255
2026-03-03 09:53:06 INFO [ffmpeg-hls-placeholder] PID 106 encerrado