root@master3:~# docker logs -f tube
2026-03-08 23:29:13 INFO [StateManager] Cache carregado com 35 streams.
2026-03-08 23:29:13 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-03-08 23:29:13 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-03-08 23:29:13 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-03-08 23:29:13 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-03-08 23:29:13 INFO [Scheduler] 3 stream(s) live em monitoramento.
2026-03-08 23:29:13 INFO [Scheduler] Verificação alta frequência: 3 stream(s).
2026-03-08 23:29:13 INFO [Scheduler] Estado: 2 live | 25 upcoming | 8 vod.
2026-03-08 23:29:32 INFO [HTTP] GET / → 302 (2ms) [anon]
2026-03-08 23:29:32 INFO [HTTP] GET /login → 200 (17ms) [anon]
2026-03-08 23:29:33 INFO [HTTP] GET /css/style.css → 200 (9ms) [anon]
2026-03-08 23:29:33 INFO [HTTP] GET /favicon.ico → 404 (4ms) [anon]
2026-03-08 23:29:39 INFO [HTTP] POST /api/auth/login → 200 (63ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET / → 200 (5ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /css/style.css → 304 (4ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /js/app.js → 200 (5ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /js/dashboard.js → 200 (8ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /js/channels.js → 200 (8ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /js/streams.js → 200 (6ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /js/playlists.js → 200 (11ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /js/settings.js → 200 (12ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /js/logs.js → 200 (12ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /js/title-format.js → 200 (4ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /api/scheduler/status → 200 (8ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /api/channels → 200 (35ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /api/config → 304 (4ms) [admin]
2026-03-08 23:29:39 INFO [HTTP] GET /api/streams → 200 (166ms) [admin]
2026-03-08 23:29:40 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-03-08 23:29:42 INFO [HTTP] GET /api/scheduler/status → 304 (2ms) [admin]
2026-03-08 23:29:42 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-03-08 23:29:53 INFO [HTTP] GET /live-proxy.m3u → 200 (6ms) [anon]
2026-03-08 23:29:53 INFO [SmartPlayer] Init HLS: key=XVvu1RXPRcw status=live
2026-03-08 23:29:53 INFO [hls-session] Sessao criada: key=XVvu1RXPRcw kind=live dir=/tmp/tubewranglerr-hls/XVvu1RXPRcw
2026-03-08 23:29:53 INFO [hls-runner] Iniciando ffmpeg HLS via pipe dir=/tmp/tubewranglerr-hls/XVvu1RXPRcw
2026-03-08 23:29:53 INFO [streamlink-runner] Iniciando stream: url=https://www.youtube.com/watch?v=XVvu1RXPRcw args=--no-config --no-plugin-sideloading --loglevel info --stream-timeout 30 --retry-streams 1 --retry-max 3 --http-header User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3 --stdout https://www.youtube.com/watch?v=XVvu1RXPRcw best
2026-03-08 23:29:53 INFO [SmartPlayer] Live HLS fonte streamlink iniciada: key=XVvu1RXPRcw trigger=initial streamlinkPid=25 writerPid=24
2026-03-08 23:29:53 DEBUG [streamlink-runner][stderr] [cli][info] streamlink is running as root! Be careful!
2026-03-08 23:29:53 DEBUG [streamlink-runner][stderr] [cli][info] Found matching plugin youtube for URL https://www.youtube.com/watch?v=XVvu1RXPRcw
2026-03-08 23:29:54 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-08 23:29:54 DEBUG [streamlink-runner][stderr] [cli][info] Waiting for streams, retrying every 1.0 second(s)
2026-03-08 23:29:56 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-08 23:29:56 INFO [HTTP] GET /live-proxy.m3u → 200 (3ms) [anon]
2026-03-08 23:29:57 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
2026-03-08 23:29:59 WARN [streamlink-runner][stderr] [cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)
error: No playable streams found on this URL: https://www.youtube.com/watch?v=XVvu1RXPRcw
2026-03-08 23:29:59 WARN [streamlink-runner] Processo finalizado code=1 stderrTail=w.youtube.com/youtubei/v1/player?key=***REDACTED***)\n[cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)\n[cli][error] Unable to open URL: https://www.youtube.com/youtubei/v1/player (400 Client Error: Bad Request for url: https://www.youtube.com/youtubei/v1/player?key=***REDACTED***)\nerror: No playable streams found on this URL: https://www.youtube.com/watch?v=XVvu1RXPRcw
2026-03-08 23:29:59 WARN [SmartPlayer] Streamlink falhou sem output HLS, fallback yt-dlp: key=XVvu1RXPRcw code=1
2026-03-08 23:29:59 INFO [streamlink] PID 25 já encerrado, skip kill
2026-03-08 23:29:59 INFO [ffmpeg-hls-pipe] SIGTERM → PID 24
2026-03-08 23:29:59 INFO [hls-runner] finalizado code=183
2026-03-08 23:29:59 INFO [ffmpeg-hls-pipe] PID 24 encerrado
2026-03-08 23:29:59 INFO [ytdlp-runner] Resolvendo URL (android) cookie=off: https://www.youtube.com/watch?v=XVvu1RXPRcw args=--user-agent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3 --no-playlist --print %(url)s -f bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]/best --extractor-args youtube:player_client=android https://www.youtube.com/watch?v=XVvu1RXPRcw
2026-03-08 23:30:01 INFO [ytdlp-runner] 1 URL(s) resolvida(s) via android
2026-03-08 23:30:01 INFO [hls-runner] Iniciando ffmpeg HLS mode=live (1 URL) dir=/tmp/tubewranglerr-hls/XVvu1RXPRcw
2026-03-08 23:30:01 INFO [SmartPlayer] Live HLS fonte yt-dlp iniciada: key=XVvu1RXPRcw trigger=streamlink-no-output PID=32
2026-03-08 23:30:02 INFO [SmartPlayer] Primeiro manifesto HLS servido: key=XVvu1RXPRcw mode=fast-start segments=2 timeoutMs=9000 startOffset=-2
2026-03-08 23:30:02 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (5258ms) [anon]
2026-03-08 23:30:02 INFO [SmartPlayer] Primeiro segmento HLS servido: key=XVvu1RXPRcw
2026-03-08 23:30:02 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (8788ms) [anon]
2026-03-08 23:30:06 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00000.ts → 200 (4346ms) [anon]
2026-03-08 23:30:07 INFO [SmartPlayer] Sessao HLS aquecida: key=XVvu1RXPRcw kind=live segments=3
2026-03-08 23:30:07 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (3ms) [anon]
2026-03-08 23:30:07 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (2ms) [anon]
2026-03-08 23:30:09 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00001.ts → 200 (2511ms) [anon]
2026-03-08 23:30:12 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (3ms) [anon]
2026-03-08 23:30:13 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-03-08 23:30:13 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00002.ts → 200 (2876ms) [anon]
2026-03-08 23:30:14 INFO [HTTP] GET /live-proxy.m3u → 200 (1ms) [anon]
2026-03-08 23:30:14 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (2ms) [anon]
2026-03-08 23:30:15 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00000.ts → 200 (13006ms) [anon]
2026-03-08 23:30:16 INFO [HTTP] GET /live-proxy.m3u → 200 (3ms) [anon]
2026-03-08 23:30:16 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (2ms) [anon]
2026-03-08 23:30:17 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (2ms) [anon]
2026-03-08 23:30:18 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (3ms) [anon]
2026-03-08 23:30:22 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00001.ts → 200 (7647ms) [anon]
2026-03-08 23:30:23 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (2ms) [anon]
2026-03-08 23:30:23 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (1ms) [anon]
2026-03-08 23:30:26 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00001.ts → 200 (9437ms) [anon]
2026-03-08 23:30:27 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00001.ts → 200 (10638ms) [anon]
2026-03-08 23:30:27 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (0ms) [anon]
2026-03-08 23:30:27 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00003.ts → 200 (13573ms) [anon]
2026-03-08 23:30:29 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (2ms) [anon]
2026-03-08 23:30:29 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00002.ts → 200 (6034ms) [anon]
2026-03-08 23:30:30 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (2ms) [anon]
2026-03-08 23:30:34 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00002.ts → 200 (7029ms) [anon]
2026-03-08 23:30:38 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00002.ts → 200 (9199ms) [anon]
2026-03-08 23:30:42 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00003.ts → 200 (11490ms) [anon]
2026-03-08 23:30:43 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-03-08 23:30:45 INFO [HTTP] GET /api/stream/XVvu1RXPRcw → 200 (2ms) [anon]
2026-03-08 23:30:46 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00004.ts → 200 (16215ms) [anon]
2026-03-08 23:30:46 INFO [HTTP] GET /api/stream/XVvu1RXPRcw/segment_00003.ts → 200 (11301ms) [anon]



main info: playlist is empty
adaptive info: Changing stream format Unknown -> TS
mpeg4audio info: AAC channels: 2 samplerate: 48000
avcodec info: Using D3D11VA (Intel(R) HD Graphics Family, vendor 8086(Intel), device a16, revision 9) for hardware decoding
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 1000 ms)
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 1022 ms)
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 1045 ms)
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 1091 ms)
main error: Timestamp conversion failed for 15566667: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 2316 ms)
main error: ES_OUT_SET_(GROUP_)PCR is called too late (jitter of 5021 ms ignored)
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 3330 ms)
main error: Timestamp conversion failed for 21416667: no reference clock
main error: Could not convert timestamp 0 for FFmpeg



main info: playlist is empty
adaptive info: Changing stream format Unknown -> TS
mpeg4audio info: AAC channels: 2 samplerate: 48000
avcodec info: Using D3D11VA (Intel(R) HD Graphics Family, vendor 8086(Intel), device a16, revision 9) for hardware decoding
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 1574 ms)
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 1601 ms)
main error: Timestamp conversion failed for 10416667: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 1632 ms)
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 3714 ms)
main error: ES_OUT_SET_(GROUP_)PCR is called too late (jitter of 7480 ms ignored)
main error: Timestamp conversion failed for 24866667: no reference clock
main error: Could not get display date for timestamp 0
main error: Timestamp conversion failed for 24866667: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: Timestamp conversion failed for 24883334: no reference clock
main error: Could not get display date for timestamp 0
main error: Timestamp conversion failed for 24883334: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: Timestamp conversion failed for 24900001: no reference clock
main error: Could not get display date for timestamp 0
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 3833 ms)



main info: playlist is empty
adaptive info: Changing stream format Unknown -> TS
mpeg4audio info: AAC channels: 2 samplerate: 48000
avcodec info: Using D3D11VA (Intel(R) HD Graphics Family, vendor 8086(Intel), device a16, revision 9) for hardware decoding
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 1000 ms)
main error: Timestamp conversion failed for 16080000: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 1150 ms)
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 1730 ms)
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 4767 ms)
main error: ES_OUT_SET_(GROUP_)PCR is called too late (jitter of 10370 ms ignored)
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 4879 ms)
main error: Timestamp conversion failed for 29930000: no reference clock
main error: Could not convert timestamp 0 for FFmpeg



main info: playlist is empty
adaptive info: Changing stream format Unknown -> TS
mpeg4audio info: AAC channels: 2 samplerate: 48000
avcodec info: Using D3D11VA (Intel(R) HD Graphics Family, vendor 8086(Intel), device a16, revision 9) for hardware decoding
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 2592 ms)
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 2641 ms)
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 3021 ms)
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 3403 ms)
main error: Timestamp conversion failed for 15596667: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (jitter of 7683 ms ignored)
main error: Timestamp conversion failed for 20480000: no reference clock
main error: Could not get display date for timestamp 0
main error: Timestamp conversion failed for 20480000: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: Timestamp conversion failed for 20496667: no reference clock
main error: Could not get display date for timestamp 0
main error: Timestamp conversion failed for 20496667: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: Timestamp conversion failed for 20513333: no reference clock
main error: Could not get display date for timestamp 0
main error: Timestamp conversion failed for 20513333: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: Timestamp conversion failed for 20580711: no reference clock
main error: Could not convert timestamp 0 for faad
main error: Timestamp conversion failed for 20602044: no reference clock
main error: Could not convert timestamp 0 for faad
main error: Timestamp conversion failed for 20623377: no reference clock
main error: Could not convert timestamp 0 for faad
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 3572 ms)
main error: Timestamp conversion failed for 21180000: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: buffer deadlock prevented
main error: ES_OUT_SET_(GROUP_)PCR is called too late (jitter of 7780 ms ignored)
main error: Timestamp conversion failed for 27730000: no reference clock
main error: Could not get display date for timestamp 0
main error: Timestamp conversion failed for 27730000: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: Timestamp conversion failed for 27812710: no reference clock
main error: Could not convert timestamp 0 for faad
main error: Timestamp conversion failed for 27746667: no reference clock
main error: Could not get display date for timestamp 0
main error: Timestamp conversion failed for 27746667: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: Timestamp conversion failed for 27763333: no reference clock
main error: Could not get display date for timestamp 0
main error: Timestamp conversion failed for 27763333: no reference clock
main error: Could not convert timestamp 0 for FFmpeg
main error: Timestamp conversion failed for 27834044: no reference clock
main error: Could not convert timestamp 0 for faad
main error: ES_OUT_SET_(GROUP_)PCR is called too late (pts_delay increased to 3667 ms)