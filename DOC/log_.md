
root@master3:~# docker logs -f tube
2026-02-20 23:09:10 INFO [StateManager] Cache carregado com 10 streams.
2026-02-20 23:09:10 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-02-20 23:09:10 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-02-20 23:09:10 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-02-20 23:09:10 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-02-20 23:09:10 INFO [Scheduler] Verificação alta frequência: 9 stream(s).
2026-02-20 23:09:10 INFO [Scheduler] Estado: 0 live | 0 upcoming | 1 vod.
2026-02-20 23:09:24 INFO [HTTP] GET / → 302 (13ms) [anon]
2026-02-20 23:09:24 INFO [HTTP] GET /login → 200 (13ms) [anon]
2026-02-20 23:09:24 INFO [HTTP] GET /css/style.css → 200 (10ms) [anon]
2026-02-20 23:09:25 INFO [HTTP] GET /favicon.ico → 404 (5ms) [anon]
2026-02-20 23:09:31 INFO [HTTP] POST /api/auth/login → 401 (45ms) [anon]
2026-02-20 23:09:39 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 23:09:47 INFO [HTTP] POST /api/auth/login → 401 (48ms) [anon]
2026-02-20 23:09:58 INFO [HTTP] POST /api/auth/login → 200 (45ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET / → 200 (4ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /css/style.css → 304 (3ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /js/app.js → 200 (6ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /js/dashboard.js → 200 (5ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /js/channels.js → 200 (3ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /js/streams.js → 200 (4ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /js/playlists.js → 200 (3ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /js/settings.js → 200 (3ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /js/logs.js → 200 (3ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /api/streams → 200 (8ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /api/config → 304 (11ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /api/scheduler/status → 200 (11ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /api/channels → 200 (10ms) [admin]
2026-02-20 23:09:58 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-20 23:10:06 INFO [HTTP] GET /api/channels → 304 (3ms) [admin]
2026-02-20 23:10:07 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-20 23:10:09 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 23:10:13 INFO [HTTP] GET /api/streams → 304 (3ms) [admin]
2026-02-20 23:10:13 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-02-20 23:10:17 INFO [HTTP] GET /api/scheduler/status → 304 (4ms) [admin]
2026-02-20 23:10:17 INFO [HTTP] GET /api/channels → 304 (4ms) [admin]
2026-02-20 23:10:17 INFO [HTTP] GET /api/streams → 304 (3ms) [admin]
2026-02-20 23:10:17 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-02-20 23:10:17 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-20 23:10:20 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-20 23:10:40 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 23:10:40 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (5ms) [anon]
2026-02-20 23:10:52 INFO [HTTP] GET /upcoming.m3u → 200 (3ms) [anon]
2026-02-20 23:11:05 INFO [HTTP] GET /vod-proxy.m3u → 200 (3ms) [anon]
2026-02-20 23:11:05 INFO [SmartPlayer] Requisição de stream: videoId=fTnw7DMq89Y
2026-02-20 23:11:05 INFO [SmartPlayer] Stream encontrado: videoId=fTnw7DMq89Y status=none
2026-02-20 23:11:05 INFO [SmartPlayer] Usando yt-dlp para videoId=fTnw7DMq89Y status=none
2026-02-20 23:11:05 INFO [ytdlp-runner] Iniciando yt-dlp: url=https://www.youtube.com/watch?v=fTnw7DMq89Y
2026-02-20 23:11:05 WARN [ytdlp-runner][stderr] WARNING: "-f best" selects the best pre-merged format which is often not the best option.
         To let yt-dlp download and merge the best available formats, simply do not pass any format selection.
         If you know what you are doing and want only the best pre-merged format, use "-f b" instead to suppress this warning

2026-02-20 23:11:05 WARN [ytdlp-runner][stderr] [youtube] Extracting URL: https://www.youtube.com/watch?v=fTnw7DMq89Y

2026-02-20 23:11:05 WARN [ytdlp-runner][stderr] [youtube] fTnw7DMq89Y: Downloading webpage

2026-02-20 23:11:06 WARN [ytdlp-runner][stderr] WARNING: [youtube] No supported JavaScript runtime could be found. Only deno is enabled by default; to use a  nother runtime add  --js-runtimes RUNTIME[:PATH]  to your command/config. YouTube extraction without a JS runtime has been deprecated, and some formats may   be missing. See  https://github.com/yt-dlp/yt-dlp/wiki/EJS  for details on installing one

2026-02-20 23:11:06 WARN [ytdlp-runner][stderr] [youtube] fTnw7DMq89Y: Downloading android vr player API JSON

2026-02-20 23:11:06 WARN [ytdlp-runner][stderr] [info] fTnw7DMq89Y: Downloading 1 format(s): 18

2026-02-20 23:11:06 WARN [ytdlp-runner][stderr] [download] Destination: -

[download]   0.0% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   0.0% of  893.04MiB at    1.09MiB/s ETA 13:50
[download]   0.0% of  893.04MiB at    1.53MiB/s ETA 09:49
[download]   0.0% of  893.04MiB at    2.33MiB/s ETA 06:25
[download]   0.0% of  893.04MiB at    3.65MiB/s ETA 04:05
[download]   0.0% of  893.04MiB at    6.63MiB/s ETA 02:14
[download]   0.0% of  893.04MiB at   11.05MiB/s ETA 01:20
[download]   0.0% of  893.04MiB at   15.46MiB/s ETA 00:57
[download]   0.1% of  893.04MiB at   11.35MiB/s ETA 01:18
[download]   0.1% of  893.04MiB at    9.95MiB/s ETA 01:29
[download]   0.2% of  893.04MiB at    3.94MiB/s ETA 03:46
[download]   0.4% of  893.04MiB at    3.52MiB/s ETA 04:12
[download]   0.8% of  893.04MiB at    4.04MiB/s ETA 03:39
[download]   1.1% of  893.04MiB at    3.85MiB/s ETA 03:49
[download]   1.1% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   1.1% of  893.04MiB at    1.56MiB/s ETA 09:33
[download]   1.1% of  893.04MiB at    1.87MiB/s ETA 07:54
[download]   1.1% of  893.04MiB at    2.72MiB/s ETA 05:26
[download]   1.1% of  893.04MiB at    4.06MiB/s ETA 03:38
[download]   1.1% of  893.04MiB at    6.41MiB/s ETA 02:18
[download]   1.1% of  893.04MiB at   10.28MiB/s ETA 01:26
[download]   1.1% of  893.04MiB at   15.63MiB/s ETA 00:56
[download]   1.2% of  893.04MiB at   19.02MiB/s ETA 00:46
[download]   1.2% of  893.04MiB at   21.98MiB/s ETA 00:40
2026-02-20 23:11:10 INFO [HTTP] GET /health → 200 (1ms) [anon]
[download]   1.3% of  893.04MiB at    2.44MiB/s ETA 06:01
[download]   1.5% of  893.04MiB at    2.89MiB/s ETA 05:04
[download]   1.8% of  893.04MiB at    2.76MiB/s ETA 05:17
[download]   2.1% of  893.04MiB at    2.18MiB/s ETA 06:41
[download]   2.2% of  893.04MiB at    2.09MiB/s ETA 06:57
[download]   2.2% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   2.2% of  893.04MiB at    1.48MiB/s ETA 09:57
[download]   2.2% of  893.04MiB at    1.63MiB/s ETA 08:58
[download]   2.2% of  893.04MiB at    2.45MiB/s ETA 05:59
[download]   2.2% of  893.04MiB at    3.43MiB/s ETA 04:15
[download]   2.2% of  893.04MiB at    5.66MiB/s ETA 02:34
[download]   2.2% of  893.04MiB at    9.35MiB/s ETA 01:33
[download]   2.2% of  893.04MiB at   11.18MiB/s ETA 01:18
[download]   2.2% of  893.04MiB at  674.38KiB/s ETA 22:05
[download]   2.3% of  893.04MiB at    1.10MiB/s ETA 13:15
[download]   2.4% of  893.04MiB at    1.67MiB/s ETA 08:40
[download]   2.5% of  893.04MiB at    2.30MiB/s ETA 06:18
[download]   2.8% of  893.04MiB at    1.99MiB/s ETA 07:16
[download]   3.0% of  893.04MiB at    2.02MiB/s ETA 07:09
[download]   3.3% of  893.04MiB at    2.03MiB/s ETA 07:05
[download]   3.3% of  893.04MiB at    2.03MiB/s ETA 07:04
[download]   3.3% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   3.3% of  893.04MiB at    1.54MiB/s ETA 09:27
[download]   3.3% of  893.04MiB at    1.93MiB/s ETA 07:29
[download]   3.3% of  893.04MiB at    2.83MiB/s ETA 05:06
[download]   3.3% of  893.04MiB at    4.31MiB/s ETA 03:20
[download]   3.3% of  893.04MiB at    6.83MiB/s ETA 02:06
[download]   3.3% of  893.04MiB at   11.06MiB/s ETA 01:18
[download]   3.3% of  893.04MiB at   13.95MiB/s ETA 01:02
[download]   3.4% of  893.04MiB at   15.25MiB/s ETA 00:56
[download]   3.4% of  893.04MiB at   16.81MiB/s ETA 00:51
[download]   3.5% of  893.04MiB at    6.43MiB/s ETA 02:14
[download]   3.7% of  893.04MiB at    6.27MiB/s ETA 02:17
[download]   4.2% of  893.04MiB at    4.62MiB/s ETA 03:05
[download]   4.4% of  893.04MiB at    4.78MiB/s ETA 02:58
[download]   4.4% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   4.4% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   4.4% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   4.4% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   4.4% of  893.04MiB at   22.87MiB/s ETA 00:37
[download]   4.4% of  893.04MiB at   20.24MiB/s ETA 00:42
[download]   4.4% of  893.04MiB at   21.40MiB/s ETA 00:39
[download]   4.4% of  893.04MiB at   22.58MiB/s ETA 00:37
[download]   4.4% of  893.04MiB at   21.04MiB/s ETA 00:40
[download]   4.5% of  893.04MiB at   20.38MiB/s ETA 00:41
[download]   4.6% of  893.04MiB at    4.88MiB/s ETA 02:54
[download]   4.8% of  893.04MiB at    4.47MiB/s ETA 03:10
[download]   5.3% of  893.04MiB at  538.97KiB/s ETA 26:46
[download]   5.5% of  893.04MiB at  651.69KiB/s ETA 22:05
[download]   5.5% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   5.5% of  893.04MiB at    1.36MiB/s ETA 10:26
[download]   5.5% of  893.04MiB at    1.43MiB/s ETA 09:56
[download]   5.5% of  893.04MiB at    1.81MiB/s ETA 07:49
[download]   5.5% of  893.04MiB at    2.66MiB/s ETA 05:17
[download]   5.5% of  893.04MiB at    4.14MiB/s ETA 03:25
[download]   5.5% of  893.04MiB at    6.73MiB/s ETA 02:05
[download]   5.5% of  893.04MiB at   10.65MiB/s ETA 01:19
[download]   5.6% of  893.04MiB at   14.12MiB/s ETA 00:59
[download]   5.6% of  893.04MiB at   15.77MiB/s ETA 00:53
[download]   5.7% of  893.04MiB at   17.83MiB/s ETA 00:47
[download]   6.0% of  893.04MiB at    9.32MiB/s ETA 01:30
[download]   6.4% of  893.04MiB at    6.28MiB/s ETA 02:13
[download]   6.6% of  893.04MiB at    6.39MiB/s ETA 02:10
[download]   6.6% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   6.6% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   6.6% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   6.6% of  893.04MiB at   11.86MiB/s ETA 01:10
[download]   6.6% of  893.04MiB at   16.81MiB/s ETA 00:49
[download]   6.6% of  893.04MiB at   17.36MiB/s ETA 00:48
[download]   6.6% of  893.04MiB at   19.59MiB/s ETA 00:42
[download]   6.6% of  893.04MiB at   21.10MiB/s ETA 00:39
[download]   6.7% of  893.04MiB at   21.12MiB/s ETA 00:39
[download]   6.7% of  893.04MiB at   22.68MiB/s ETA 00:36
[download]   6.8% of  893.04MiB at   12.17MiB/s ETA 01:08
[download]   7.1% of  893.04MiB at    7.43MiB/s ETA 01:51
2026-02-20 23:11:40 INFO [HTTP] GET /health → 200 (1ms) [anon]
[download]   7.5% of  893.04MiB at  545.04KiB/s ETA 25:51
[download]   7.7% of  893.04MiB at  654.50KiB/s ETA 21:29
[download]   7.7% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   7.7% of  893.04MiB at    1.48MiB/s ETA 09:21
[download]   7.7% of  893.04MiB at    1.82MiB/s ETA 07:35
[download]   7.7% of  893.04MiB at    2.67MiB/s ETA 05:09
[download]   7.7% of  893.04MiB at    4.01MiB/s ETA 03:26
[download]   7.7% of  893.04MiB at    5.71MiB/s ETA 02:24
[download]   7.7% of  893.04MiB at    9.14MiB/s ETA 01:30
[download]   7.7% of  893.04MiB at   11.93MiB/s ETA 01:09
[download]   7.8% of  893.04MiB at   12.62MiB/s ETA 01:05
[download]   7.8% of  893.04MiB at   13.97MiB/s ETA 00:58
[download]   7.9% of  893.04MiB at    5.87MiB/s ETA 02:20
[download]   8.2% of  893.04MiB at    4.16MiB/s ETA 03:16
[download]   8.5% of  893.04MiB at    4.38MiB/s ETA 03:06
[download]   8.8% of  893.04MiB at    4.39MiB/s ETA 03:05
[download]   8.8% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   8.8% of  893.04MiB at    1.51MiB/s ETA 09:10
[download]   8.8% of  893.04MiB at    1.83MiB/s ETA 07:30
[download]   8.8% of  893.04MiB at    2.23MiB/s ETA 06:07
[download]   8.8% of  893.04MiB at    3.16MiB/s ETA 04:18
[download]   8.8% of  893.04MiB at    4.81MiB/s ETA 02:49
[download]   8.8% of  893.04MiB at    7.62MiB/s ETA 01:47
[download]   8.8% of  893.04MiB at   11.20MiB/s ETA 01:12
[download]   8.9% of  893.04MiB at   14.67MiB/s ETA 00:55
[download]   8.9% of  893.04MiB at   17.55MiB/s ETA 00:46
[download]   9.0% of  893.04MiB at    2.79MiB/s ETA 04:50
[download]   9.2% of  893.04MiB at    3.50MiB/s ETA 03:51
[download]   9.6% of  893.04MiB at    3.29MiB/s ETA 04:05
[download]   9.9% of  893.04MiB at    3.74MiB/s ETA 03:35
[download]   9.9% of  893.04MiB at  Unknown B/s ETA Unknown
[download]   9.9% of  893.04MiB at    1.13MiB/s ETA 12:00
[download]   9.9% of  893.04MiB at    1.62MiB/s ETA 08:21
[download]   9.9% of  893.04MiB at    2.07MiB/s ETA 06:30
[download]   9.9% of  893.04MiB at    3.02MiB/s ETA 04:26
[download]   9.9% of  893.04MiB at    5.09MiB/s ETA 02:38
[download]   9.9% of  893.04MiB at    8.54MiB/s ETA 01:34
[download]   9.9% of  893.04MiB at   10.78MiB/s ETA 01:14
[download]  10.0% of  893.04MiB at   12.26MiB/s ETA 01:05
[download]  10.0% of  893.04MiB at    2.74MiB/s ETA 04:53
[download]  10.1% of  893.04MiB at    1.55MiB/s ETA 08:37
[download]  10.2% of  893.04MiB at    2.38MiB/s ETA 05:37
[download]  10.5% of  893.04MiB at    2.90MiB/s ETA 04:35
[download]  10.9% of  893.04MiB at    3.28MiB/s ETA 04:02
[download]  11.0% of  893.04MiB at    3.48MiB/s ETA 03:48
[download]  11.0% of  893.04MiB at  Unknown B/s ETA Unknown
[download]  11.0% of  893.04MiB at  590.53KiB/s ETA 23:08
[download]  11.0% of  893.04MiB at  878.31KiB/s ETA 15:31
[download]  11.0% of  893.04MiB at    1.34MiB/s ETA 09:55
[download]  11.0% of  893.04MiB at    2.25MiB/s ETA 05:54
[download]  11.0% of  893.04MiB at    3.54MiB/s ETA 03:44
[download]  11.0% of  893.04MiB at    6.13MiB/s ETA 02:09
[download]  11.0% of  893.04MiB at    8.75MiB/s ETA 01:30
[download]  11.1% of  893.04MiB at   10.70MiB/s ETA 01:14
[download]  11.1% of  893.04MiB at   13.04MiB/s ETA 01:00
[download]  11.2% of  893.04MiB at    5.59MiB/s ETA 02:21
[download]  11.4% of  893.04MiB at    3.35MiB/s ETA 03:56
[download]  11.7% of  893.04MiB at    3.35MiB/s ETA 03:55
[download]  12.1% of  893.04MiB at    3.83MiB/s ETA 03:24
[download]  12.1% of  893.04MiB at  Unknown B/s ETA Unknown
[download]  12.1% of  893.04MiB at    1.46MiB/s ETA 09:02
[download]  12.1% of  893.04MiB at    1.51MiB/s ETA 08:46
[download]  12.1% of  893.04MiB at    1.94MiB/s ETA 06:47
[download]  12.1% of  893.04MiB at    2.93MiB/s ETA 04:28
[download]  12.1% of  893.04MiB at    4.54MiB/s ETA 02:53
[download]  12.1% of  893.04MiB at    7.50MiB/s ETA 01:44
[download]  12.1% of  893.04MiB at    1.42MiB/s ETA 09:13
[download]  12.1% of  893.04MiB at    2.77MiB/s ETA 04:43
[download]  12.2% of  893.04MiB at    5.27MiB/s ETA 02:28
[download]  12.3% of  893.04MiB at    4.17MiB/s ETA 03:07
[download]  12.5% of  893.04MiB at    5.16MiB/s ETA 02:31
[download]  13.0% of  893.04MiB at    4.81MiB/s ETA 02:41
[download]  13.2% of  893.04MiB at    4.86MiB/s ETA 02:39
[download]  13.2% of  893.04MiB at  Unknown B/s ETA Unknown
[download]  13.2% of  893.04MiB at    1.49MiB/s ETA 08:50
[download]  13.2% of  893.04MiB at    1.73MiB/s ETA 07:31
[download]  13.2% of  893.04MiB at    2.27MiB/s ETA 05:43
[download]  13.2% of  893.04MiB at    9.97MiB/s ETA 01:17
[download]  13.2% of  893.04MiB at   11.69MiB/s ETA 01:06
[download]  13.2% of  893.04MiB at    1.37MiB/s ETA 09:24
[download]  13.3% of  893.04MiB at    2.68MiB/s ETA 04:48
[download]  13.4% of  893.04MiB at    2.37MiB/s ETA 05:25
[download]  13.6% of  893.04MiB at    3.13MiB/s ETA 04:06
2026-02-20 23:12:08 INFO [ytdlp-runner] Resposta fechada, processo yt-dlp encerrado.
2026-02-20 23:12:08 INFO [ytdlp-runner] yt-dlp finalizado com code=null
2026-02-20 23:12:10 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 23:12:34 INFO [HTTP] GET /upcoming.m3u → 200 (4ms) [anon]
2026-02-20 23:12:38 INFO [HTTP] GET /api/scheduler/status → 304 (3ms) [admin]
2026-02-20 23:12:38 INFO [HTTP] GET /api/channels → 304 (1ms) [admin]
2026-02-20 23:12:38 INFO [HTTP] GET /api/streams → 304 (1ms) [admin]
2026-02-20 23:12:38 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-02-20 23:12:38 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-20 23:12:40 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 23:12:41 INFO [Scheduler] Trigger manual recebido. Executando busca principal imediata...
2026-02-20 23:12:41 INFO [Scheduler] Iniciando busca principal. Tipo: full sync. publishedAfter: nenhum
2026-02-20 23:12:50 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-02-20 23:12:50 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-02-20 23:12:50 INFO [HTTP] GET /api/scheduler/status → 200 (2ms) [admin]
2026-02-20 23:12:50 INFO [HTTP] GET /api/config → 304 (3ms) [admin]
2026-02-20 23:12:50 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-02-20 23:12:50 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-20 23:12:54 WARN [YouTubeApi] fetchByPlaylistItems atingiu limite de 40 páginas.
2026-02-20 23:13:04 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_MAIN_INTERVAL_HOURS=4
2026-02-20 23:13:04 INFO [Scheduler] Configuração atualizada em hot reload: ENABLE_SCHEDULER_ACTIVE_HOURS=true
2026-02-20 23:13:04 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_ACTIVE_START_HOUR=7
2026-02-20 23:13:04 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_ACTIVE_END_HOUR=22
2026-02-20 23:13:04 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_PRE_EVENT_WINDOW_HOURS=2
2026-02-20 23:13:04 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_PRE_EVENT_INTERVAL_MINUTES=5
2026-02-20 23:13:04 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_POST_EVENT_INTERVAL_MINUTES=5
2026-02-20 23:13:04 INFO [Scheduler] Configuração atualizada em hot reload: FULL_SYNC_INTERVAL_HOURS=48
2026-02-20 23:13:04 INFO [API][config] Atualização de configurações (10 chave(s)).
2026-02-20 23:13:04 INFO [HTTP] PATCH /api/config → 200 (3ms) [admin]
2026-02-20 23:13:04 INFO [HTTP] GET /api/config → 200 (1ms) [admin]
2026-02-20 23:13:04 INFO [HTTP] GET /api/credentials → 304 (1ms) [admin]
2026-02-20 23:13:09 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_MAIN_INTERVAL_HOURS=4
2026-02-20 23:13:09 INFO [Scheduler] Configuração atualizada em hot reload: ENABLE_SCHEDULER_ACTIVE_HOURS=false
2026-02-20 23:13:09 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_ACTIVE_START_HOUR=7
2026-02-20 23:13:09 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_ACTIVE_END_HOUR=22
2026-02-20 23:13:09 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_PRE_EVENT_WINDOW_HOURS=2
2026-02-20 23:13:09 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_PRE_EVENT_INTERVAL_MINUTES=5
2026-02-20 23:13:09 INFO [Scheduler] Configuração atualizada em hot reload: SCHEDULER_POST_EVENT_INTERVAL_MINUTES=5
2026-02-20 23:13:09 INFO [Scheduler] Configuração atualizada em hot reload: FULL_SYNC_INTERVAL_HOURS=48
2026-02-20 23:13:09 INFO [API][config] Atualização de configurações (10 chave(s)).
2026-02-20 23:13:09 INFO [HTTP] PATCH /api/config → 200 (4ms) [admin]
2026-02-20 23:13:09 INFO [HTTP] GET /api/config → 200 (3ms) [admin]
2026-02-20 23:13:09 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-02-20 23:13:10 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 23:13:10 DEBUG [Scheduler] Tick pulado: tick anterior ainda em execução.
2026-02-20 23:13:17 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-02-20 23:13:17 INFO [HTTP] GET /api/credentials → 304 (0ms) [admin]
2026-02-20 23:13:17 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-20 23:13:24 WARN [YouTubeApi] fetchByPlaylistItems atingiu limite de 40 páginas.
2026-02-20 23:13:33 INFO [Scheduler] Estado: 1 live | 29 upcoming | 1 vod.
2026-02-20 23:13:33 INFO [HTTP] POST /api/scheduler/trigger → 200 (51868ms) [admin]
2026-02-20 23:13:33 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-02-20 23:13:33 INFO [HTTP] GET /api/credentials → 304 (2ms) [admin]
2026-02-20 23:13:33 INFO [HTTP] GET /api/scheduler/status → 200 (2ms) [admin]
2026-02-20 23:13:37 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-20 23:13:37 INFO [HTTP] GET /api/channels → 200 (3ms) [admin]
2026-02-20 23:13:37 INFO [HTTP] GET /api/streams → 200 (1ms) [admin]
2026-02-20 23:13:37 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-02-20 23:13:37 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-02-20 23:13:40 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-20 23:13:48 INFO [HTTP] GET /api/scheduler/status → 304 (3ms) [admin]
2026-02-20 23:14:01 INFO [HTTP] GET /live-proxy.m3u → 200 (4ms) [anon]
2026-02-20 23:14:01 INFO [SmartPlayer] Requisição de stream: videoId=NXTnj1RM5s4
2026-02-20 23:14:01 INFO [SmartPlayer] Stream encontrado: videoId=NXTnj1RM5s4 status=live
2026-02-20 23:14:01 INFO [SmartPlayer] Stream está genuinamente ao vivo: videoId=NXTnj1RM5s4
2026-02-20 23:14:01 INFO [streamlink-runner] Testando streamlinkHasPlayableStream: url=https://www.youtube.com/watch?v=NXTnj1RM5s4
2026-02-20 23:14:03 INFO [streamlink-runner] streamlinkHasPlayableStream finalizado code=0
2026-02-20 23:14:03 INFO [SmartPlayer] streamlinkHasPlayableStream=true videoId=NXTnj1RM5s4
2026-02-20 23:14:03 INFO [SmartPlayer] Usando Streamlink para videoId=NXTnj1RM5s4
2026-02-20 23:14:03 INFO [streamlink-runner] Iniciando streamlink: url=https://www.youtube.com/watch?v=NXTnj1RM5s4
2026-02-20 23:14:03 WARN [streamlink-runner][stderr] [cli][info] streamlink is running as root! Be careful!

2026-02-20 23:14:03 WARN [streamlink-runner][stderr] [cli][info] Found matching plugin youtube for URL https://www.youtube.com/watch?v                        =NXTnj1RM5s4

2026-02-20 23:14:04 WARN [streamlink-runner][stderr] [cli][info] Available streams: 144p (worst), 240p, 360p, 480p, 720p, 1080p (best)

2026-02-20 23:14:04 WARN [streamlink-runner][stderr] [cli][info] Opening stream: 1080p (hls)

2026-02-20 23:14:10 INFO [Scheduler] 1 stream(s) na janela pré-evento.
2026-02-20 23:14:10 INFO [Scheduler] 1 stream(s) live em monitoramento.
2026-02-20 23:14:10 INFO [Scheduler] Verificação alta frequência: 2 stream(s).
2026-02-20 23:14:10 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 23:14:10 INFO [Scheduler] Estado: 1 live | 29 upcoming | 1 vod.
2026-02-20 23:14:24 INFO [streamlink-runner] Resposta fechada, processo streamlink encerrado.
2026-02-20 23:14:24 WARN [streamlink-runner][stderr] [cli][info] Stream ended
Interrupted! Exiting...

2026-02-20 23:14:24 WARN [streamlink-runner][stderr] [cli][info] Closing currently open stream...

2026-02-20 23:14:24 INFO [streamlink-runner] streamlink finalizado com code=130
2026-02-20 23:14:40 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 23:14:43 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (4ms) [anon]
2026-02-20 23:14:43 INFO [SmartPlayer] Requisição de stream: videoId=9RT02iytLqA
2026-02-20 23:14:43 INFO [SmartPlayer] Stream encontrado: videoId=9RT02iytLqA status=upcoming
2026-02-20 23:14:43 INFO [SmartPlayer] Enviando placeholder com texto para videoId=9RT02iytLqA
2026-02-20 23:14:43 INFO [ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=https://i.ytimg.com/vi/9RT02iytLqA/maxresdefault_live.                        jpg
2026-02-20 23:15:11 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-20 23:15:16 INFO [ffmpeg-runner] Resposta fechada, processo ffmpeg encerrado.
2026-02-20 23:15:16 INFO [SmartPlayer] Requisição de stream: videoId=DdG6lwy_e6o
2026-02-20 23:15:16 INFO [SmartPlayer] Stream encontrado: videoId=DdG6lwy_e6o status=upcoming
2026-02-20 23:15:16 INFO [SmartPlayer] Enviando placeholder com texto para videoId=DdG6lwy_e6o
2026-02-20 23:15:16 INFO [ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=https://i.ytimg.com/vi/DdG6lwy_e6o/maxresdefault_live.jpg
2026-02-20 23:15:17 INFO [ffmpeg-runner] ffmpeg finalizado com code=255
2026-02-20 23:15:26 INFO [ffmpeg-runner] Resposta fechada, processo ffmpeg encerrado.
2026-02-20 23:15:26 INFO [SmartPlayer] Requisição de stream: videoId=ABLbUtFmxPw
2026-02-20 23:15:26 INFO [SmartPlayer] Stream encontrado: videoId=ABLbUtFmxPw status=upcoming
2026-02-20 23:15:26 INFO [SmartPlayer] Enviando placeholder com texto para videoId=ABLbUtFmxPw
2026-02-20 23:15:26 INFO [ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=https://i.ytimg.com/vi/ABLbUtFmxPw/maxresdefault_live.jpg
2026-02-20 23:15:26 WARN [ffmpeg-runner][stderr] [tls @ 0x7f46923714c0] Unknown error

2026-02-20 23:15:26 WARN [ffmpeg-runner][stderr] [image2 @ 0x7f4698747380] Could not open file : https://i.ytimg.com/vi/DdG6lwy_e6o/maxresdefault_live.jpg

2026-02-20 23:15:27 INFO [ffmpeg-runner] ffmpeg finalizado com code=255
2026-02-20 23:15:31 INFO [ffmpeg-runner] Resposta fechada, processo ffmpeg encerrado.
2026-02-20 23:15:31 WARN [ffmpeg-runner][stderr] [tls @ 0x7f022a9da040] Unknown error

2026-02-20 23:15:32 WARN [ffmpeg-runner][stderr] [mjpeg @ 0x7f022a9be340] overread 8

2026-02-20 23:15:32 INFO [ffmpeg-runner] ffmpeg finalizado com code=255
2026-02-20 23:15:41 INFO [HTTP] GET /health → 200 (0ms) [anon]
^Ccontext canceled
