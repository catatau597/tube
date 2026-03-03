root@master2:~# docker logs -f tubewranglerr
2026-03-02 20:01:35 INFO [StateManager] Cache carregado com 25 streams.
2026-03-02 20:01:35 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-02 20:01:35 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-02 20:01:35 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-02 20:01:35 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-02 20:01:35 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-02 20:01:35 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-03-02 20:01:36 INFO [Scheduler] Estado: 1 live | 14 upcoming | 10 vod.
2026-03-02 20:01:39 INFO [HTTP] GET / → 302 (4ms) [anon]
2026-03-02 20:01:39 INFO [HTTP] GET /login → 200 (6ms) [anon]
2026-03-02 20:02:04 INFO [HTTP] PATCH /api/config → 401 (4ms) [anon]
2026-03-02 20:02:04 INFO [HTTP] GET /login → 304 (2ms) [anon]
2026-03-02 20:02:05 INFO [HTTP] GET /css/style.css → 304 (1ms) [anon]
2026-03-02 20:02:09 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 20:02:09 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:02:11 INFO [HTTP] POST /api/auth/login → 200 (73ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET / → 304 (1ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /css/style.css → 304 (1ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /js/app.js → 304 (1ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /js/dashboard.js → 304 (1ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /js/channels.js → 304 (1ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /js/streams.js → 304 (1ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /js/playlists.js → 304 (2ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /js/settings.js → 304 (1ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /js/logs.js → 304 (2ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /js/title-format.js → 304 (0ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /api/scheduler/status → 200 (2ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /api/config → 200 (2ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /api/channels → 200 (2ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /api/streams → 200 (2ms) [admin]
2026-03-02 20:02:11 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-03-02 20:02:14 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-03-02 20:02:14 INFO [HTTP] GET /api/cookies → 304 (2ms) [admin]
2026-03-02 20:02:14 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-03-02 20:02:14 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 20:02:14 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (2ms) [admin]
2026-03-02 20:02:14 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 20:02:14 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:02:40 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 20:02:40 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:03:06 INFO [API][config] Atualização de configurações (31 chave(s)).
2026-03-02 20:03:06 INFO [HTTP] PATCH /api/config → 200 (13ms) [admin]
2026-03-02 20:03:06 INFO [HTTP] GET /api/config → 200 (1ms) [admin]
2026-03-02 20:03:06 INFO [HTTP] GET /api/cookies → 304 (1ms) [admin]
2026-03-02 20:03:06 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-03-02 20:03:06 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 20:03:06 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:03:06 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:03:10 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 20:03:10 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:03:40 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 20:03:40 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:03:49 INFO [SmartPlayer] Init HLS: key=V580YrkHCB8 status=none
2026-03-02 20:03:49 INFO [hls-session] Sessao criada: key=V580YrkHCB8 kind=vod dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 20:03:49 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=V580YrkHCB8 args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 20:03:51 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 20:03:51 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 20:03:51 INFO [SmartPlayer] VOD HLS iniciado: key=V580YrkHCB8 PID=53
2026-03-02 20:04:06 ERROR [PlayerRouter] Erro ao servir manifesto HLS V580YrkHCB8: Error: Manifesto HLS indisponivel para key=V580YrkHCB8
2026-03-02 20:04:06 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 500 (17044ms) [anon]
2026-03-02 20:04:07 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (503ms) [anon]
2026-03-02 20:04:07 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00000.ts → 200 (5ms) [anon]
2026-03-02 20:04:07 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00001.ts → 200 (2ms) [anon]
2026-03-02 20:04:08 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00002.ts → 200 (4ms) [anon]
2026-03-02 20:04:10 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 20:04:10 INFO [HTTP] GET /login → 200 (2ms) [anon]
2026-03-02 20:04:28 INFO [API][config] Atualização de configurações (31 chave(s)).
2026-03-02 20:04:28 INFO [HTTP] PATCH /api/config → 200 (13ms) [admin]
2026-03-02 20:04:28 INFO [HTTP] GET /api/config → 200 (0ms) [admin]
2026-03-02 20:04:28 INFO [HTTP] GET /api/cookies → 304 (1ms) [admin]
2026-03-02 20:04:28 INFO [HTTP] GET /api/credentials → 304 (0ms) [admin]
2026-03-02 20:04:28 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 20:04:28 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (2ms) [admin]
2026-03-02 20:04:28 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:04:40 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 20:04:40 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:04:55 INFO [hls-session] Sessao destruida: key=V580YrkHCB8 reason=idle-timeout
2026-03-02 20:04:55 INFO [ffmpeg-hls-urls] SIGTERM → PID 53
2026-03-02 20:04:55 INFO [hls-runner] finalizado code=255
2026-03-02 20:04:55 INFO [ffmpeg-hls-urls] PID 53 encerrado
2026-03-02 20:05:10 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 20:05:10 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:05:29 INFO [SmartPlayer] Init HLS: key=V580YrkHCB8 status=none
2026-03-02 20:05:29 INFO [hls-session] Sessao criada: key=V580YrkHCB8 kind=vod dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 20:05:29 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=V580YrkHCB8 args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 20:05:31 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 20:05:31 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 20:05:31 INFO [SmartPlayer] VOD HLS iniciado: key=V580YrkHCB8 PID=79
2026-03-02 20:05:41 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 20:05:41 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:05:42 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (12686ms) [anon]
2026-03-02 20:05:42 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00000.ts → 200 (4ms) [anon]
2026-03-02 20:05:42 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00001.ts → 200 (2ms) [anon]
2026-03-02 20:06:04 INFO [API][config] Atualização de configurações (31 chave(s)).
2026-03-02 20:06:04 INFO [HTTP] PATCH /api/config → 200 (10ms) [admin]
2026-03-02 20:06:04 INFO [HTTP] GET /api/config → 200 (2ms) [admin]
2026-03-02 20:06:04 INFO [HTTP] GET /api/cookies → 304 (1ms) [admin]
2026-03-02 20:06:04 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-03-02 20:06:04 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 20:06:04 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (0ms) [admin]
2026-03-02 20:06:04 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (0ms) [admin]
2026-03-02 20:06:11 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 20:06:11 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:06:18 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 20:06:18 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00005.ts → 200 (7ms) [anon]
2026-03-02 20:06:19 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00006.ts → 200 (2ms) [anon]
2026-03-02 20:06:19 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00007.ts → 200 (4ms) [anon]
2026-03-02 20:06:21 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00008.ts → 200 (3ms) [anon]
2026-03-02 20:06:24 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 20:06:29 INFO [API][config] Atualização de configurações (31 chave(s)).
2026-03-02 20:06:29 INFO [HTTP] PATCH /api/config → 200 (6ms) [admin]
2026-03-02 20:06:29 INFO [HTTP] GET /api/config → 200 (1ms) [admin]
2026-03-02 20:06:29 INFO [HTTP] GET /api/cookies → 304 (1ms) [admin]
2026-03-02 20:06:29 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-03-02 20:06:29 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 20:06:29 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:06:29 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (0ms) [admin]
2026-03-02 20:06:35 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-02 20:06:35 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-03-02 20:06:36 INFO [Scheduler] Estado: 1 live | 14 upcoming | 10 vod.
2026-03-02 20:06:41 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 20:06:41 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:07:11 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 20:07:11 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:07:15 INFO [hls-session] Sessao destruida: key=V580YrkHCB8 reason=idle-timeout
2026-03-02 20:07:15 INFO [ffmpeg-hls-urls] SIGTERM → PID 79
2026-03-02 20:07:16 INFO [hls-runner] finalizado code=255
2026-03-02 20:07:16 INFO [ffmpeg-hls-urls] PID 79 encerrado
2026-03-02 20:07:18 INFO [SmartPlayer] Init HLS: key=V580YrkHCB8 status=none
2026-03-02 20:07:18 INFO [hls-session] Sessao criada: key=V580YrkHCB8 kind=vod dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 20:07:18 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=V580YrkHCB8 args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 20:07:20 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 20:07:20 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 20:07:20 INFO [SmartPlayer] VOD HLS iniciado: key=V580YrkHCB8 PID=111
2026-03-02 20:07:35 ERROR [PlayerRouter] Erro ao servir manifesto HLS V580YrkHCB8: Error: Manifesto HLS indisponivel para key=V580YrkHCB8
2026-03-02 20:07:35 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 500 (16885ms) [anon]
2026-03-02 20:07:35 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (502ms) [anon]
2026-03-02 20:07:35 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00000.ts → 200 (4ms) [anon]
2026-03-02 20:07:35 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00001.ts → 200 (2ms) [anon]
2026-03-02 20:07:36 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00002.ts → 200 (3ms) [anon]
2026-03-02 20:07:41 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 20:07:41 INFO [HTTP] GET /login → 200 (0ms) [anon]
2026-03-02 20:07:47 INFO [API][config] Atualização de configurações (31 chave(s)).
2026-03-02 20:07:47 INFO [HTTP] PATCH /api/config → 200 (12ms) [admin]
2026-03-02 20:07:47 INFO [HTTP] GET /api/config → 200 (1ms) [admin]
2026-03-02 20:07:47 INFO [HTTP] GET /api/cookies → 304 (2ms) [admin]
2026-03-02 20:07:47 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-03-02 20:07:47 INFO [HTTP] GET /api/tool-profiles → 304 (0ms) [admin]
2026-03-02 20:07:47 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:07:47 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:07:48 INFO [API][config] Atualização de configurações (31 chave(s)).
2026-03-02 20:07:48 INFO [HTTP] PATCH /api/config → 200 (13ms) [admin]
2026-03-02 20:07:48 INFO [HTTP] GET /api/config → 200 (2ms) [admin]
2026-03-02 20:07:48 INFO [HTTP] GET /api/cookies → 304 (2ms) [admin]
2026-03-02 20:07:48 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-03-02 20:07:48 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 20:07:48 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:07:48 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET / → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /css/style.css → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /js/app.js → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /js/dashboard.js → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /js/channels.js → 304 (2ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /js/streams.js → 304 (0ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /js/playlists.js → 304 (0ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /js/settings.js → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /js/logs.js → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /js/title-format.js → 304 (2ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /api/cookies → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-03-02 20:07:54 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:08:07 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (0ms) [anon]
2026-03-02 20:08:07 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00005.ts → 200 (7ms) [anon]
2026-03-02 20:08:07 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00006.ts → 200 (2ms) [anon]
2026-03-02 20:08:08 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00007.ts → 200 (2ms) [anon]
2026-03-02 20:08:11 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 20:08:11 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:08:42 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 20:08:42 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:08:53 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (1ms) [anon]
2026-03-02 20:08:53 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00014.ts → 200 (10ms) [anon]
2026-03-02 20:08:53 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00015.ts → 200 (3ms) [anon]
2026-03-02 20:08:54 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00016.ts → 200 (2ms) [anon]
2026-03-02 20:08:56 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00017.ts → 200 (2ms) [anon]
2026-03-02 20:09:04 INFO [API][config] Atualização de configurações (31 chave(s)).
2026-03-02 20:09:04 INFO [HTTP] PATCH /api/config → 200 (15ms) [admin]
2026-03-02 20:09:04 INFO [HTTP] GET /api/config → 200 (1ms) [admin]
2026-03-02 20:09:04 INFO [HTTP] GET /api/cookies → 304 (1ms) [admin]
2026-03-02 20:09:04 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-03-02 20:09:04 INFO [HTTP] GET /api/tool-profiles → 304 (0ms) [admin]
2026-03-02 20:09:04 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:09:04 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (0ms) [admin]
2026-03-02 20:09:06 INFO [API][config] Atualização de configurações (31 chave(s)).
2026-03-02 20:09:06 INFO [HTTP] PATCH /api/config → 200 (3ms) [admin]
2026-03-02 20:09:06 INFO [HTTP] GET /api/config → 200 (2ms) [admin]
2026-03-02 20:09:06 INFO [HTTP] GET /api/cookies → 304 (2ms) [admin]
2026-03-02 20:09:06 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-03-02 20:09:06 INFO [HTTP] GET /api/tool-profiles → 304 (1ms) [admin]
2026-03-02 20:09:06 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:09:06 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:09:12 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 20:09:12 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:09:42 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 20:09:42 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:09:45 INFO [hls-session] Sessao destruida: key=V580YrkHCB8 reason=idle-timeout
2026-03-02 20:09:45 INFO [ffmpeg-hls-urls] SIGTERM → PID 111
2026-03-02 20:09:46 INFO [hls-runner] finalizado code=255
2026-03-02 20:09:46 INFO [ffmpeg-hls-urls] PID 111 encerrado
2026-03-02 20:09:52 INFO [SmartPlayer] Init HLS: key=V580YrkHCB8 status=none
2026-03-02 20:09:52 INFO [hls-session] Sessao criada: key=V580YrkHCB8 kind=vod dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 20:09:52 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=V580YrkHCB8 args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 20:09:54 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 20:09:54 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 20:09:54 INFO [SmartPlayer] VOD HLS iniciado: key=V580YrkHCB8 PID=148
2026-03-02 20:10:09 ERROR [PlayerRouter] Erro ao servir manifesto HLS V580YrkHCB8: Error: Manifesto HLS indisponivel para key=V580YrkHCB8
2026-03-02 20:10:09 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 500 (17092ms) [anon]
2026-03-02 20:10:09 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (502ms) [anon]
2026-03-02 20:10:09 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00000.ts → 200 (6ms) [anon]
2026-03-02 20:10:09 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00001.ts → 200 (1ms) [anon]
2026-03-02 20:10:10 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00002.ts → 200 (3ms) [anon]
2026-03-02 20:10:12 INFO [HTTP] GET / → 302 (1ms) [anon]
2026-03-02 20:10:12 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:10:42 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 20:10:42 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:11:05 INFO [hls-session] Sessao destruida: key=V580YrkHCB8 reason=idle-timeout
2026-03-02 20:11:05 INFO [ffmpeg-hls-urls] SIGTERM → PID 148
2026-03-02 20:11:05 INFO [hls-runner] finalizado code=255
2026-03-02 20:11:05 INFO [ffmpeg-hls-urls] PID 148 encerrado
2026-03-02 20:11:12 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 20:11:12 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:11:22 INFO [API][config] Atualização de configurações (31 chave(s)).
2026-03-02 20:11:22 INFO [HTTP] PATCH /api/config → 200 (3ms) [admin]
2026-03-02 20:11:22 INFO [HTTP] GET /api/config → 200 (1ms) [admin]
2026-03-02 20:11:22 INFO [HTTP] GET /api/cookies → 304 (1ms) [admin]
2026-03-02 20:11:22 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-03-02 20:11:22 INFO [HTTP] GET /api/tool-profiles → 304 (0ms) [admin]
2026-03-02 20:11:22 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:11:22 INFO [HTTP] GET /api/config/hls-start-profiles/schema → 304 (1ms) [admin]
2026-03-02 20:11:28 INFO [SmartPlayer] Init HLS: key=V580YrkHCB8 status=none
2026-03-02 20:11:28 INFO [hls-session] Sessao criada: key=V580YrkHCB8 kind=vod dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 20:11:28 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=V580YrkHCB8 args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=V580YrkHCB8
2026-03-02 20:11:30 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-02 20:11:30 INFO [hls-runner] Iniciando ffmpeg HLS (1 URL) dir=/tmp/tubewranglerr-hls/V580YrkHCB8
2026-03-02 20:11:30 INFO [SmartPlayer] VOD HLS iniciado: key=V580YrkHCB8 PID=173
2026-03-02 20:11:35 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-03-02 20:11:35 INFO [Scheduler] Verificação alta frequência: 1 stream(s).
2026-03-02 20:11:36 INFO [Scheduler] Estado: 1 live | 14 upcoming | 10 vod.
2026-03-02 20:11:43 INFO [HTTP] GET / → 302 (0ms) [anon]
2026-03-02 20:11:43 INFO [HTTP] GET /login → 200 (1ms) [anon]
2026-03-02 20:11:45 ERROR [PlayerRouter] Erro ao servir manifesto HLS V580YrkHCB8: Error: Manifesto HLS indisponivel para key=V580YrkHCB8
2026-03-02 20:11:45 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 500 (16977ms) [anon]
2026-03-02 20:11:45 INFO [HTTP] GET /api/stream/V580YrkHCB8 → 200 (501ms) [anon]
2026-03-02 20:11:45 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00000.ts → 200 (4ms) [anon]
2026-03-02 20:11:45 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00001.ts → 200 (3ms) [anon]
2026-03-02 20:11:46 INFO [HTTP] GET /api/stream/V580YrkHCB8/segment_00002.ts → 200 (2ms) [anon]