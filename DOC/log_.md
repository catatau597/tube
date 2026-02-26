2026-02-25 22:35:39 INFO [Scheduler] Loop parado.
2026-02-25 22:35:42 INFO [StateManager] Cache carregado com 17 streams.
2026-02-25 22:35:42 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-02-25 22:35:42 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-02-25 22:35:42 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-02-25 22:35:42 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-02-25 22:36:02 INFO [HTTP] GET / → 302 (5ms) [anon]
2026-02-25 22:36:02 INFO [HTTP] GET /login → 200 (5ms) [anon]
2026-02-25 22:36:02 INFO [HTTP] GET /css/style.css → 200 (3ms) [anon]
2026-02-25 22:36:02 INFO [HTTP] GET /favicon.ico → 404 (2ms) [anon]
2026-02-25 22:36:09 INFO [HTTP] POST /api/auth/login → 200 (74ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET / → 200 (2ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /css/style.css → 304 (1ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /js/app.js → 304 (2ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /js/dashboard.js → 304 (1ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /js/channels.js → 304 (1ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /js/streams.js → 304 (4ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /js/playlists.js → 304 (3ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /js/settings.js → 304 (4ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /js/logs.js → 304 (2ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /api/scheduler/status → 200 (3ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /api/channels → 304 (4ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /api/streams → 304 (3ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /api/config → 304 (2ms) [admin]
2026-02-25 22:36:09 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-02-25 22:36:22 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-25 22:36:23 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-02-25 22:36:23 INFO [HTTP] GET /api/channels → 304 (2ms) [admin]
2026-02-25 22:36:23 INFO [HTTP] GET /api/streams → 304 (1ms) [admin]
2026-02-25 22:36:23 INFO [HTTP] GET /api/config → 304 (1ms) [admin]
2026-02-25 22:36:23 INFO [HTTP] GET /api/scheduler/status → 304 (1ms) [admin]
2026-02-25 22:36:24 INFO [HTTP] GET /api/scheduler/status → 304 (0ms) [admin]
2026-02-25 22:36:36 INFO [HTTP] GET /upcoming-proxy.m3u → 200 (3ms) [anon]
2026-02-25 22:36:36 INFO [SmartPlayer] Requisição de stream: videoId=1ufsTmR3ccI
2026-02-25 22:36:36 INFO [SmartPlayer] Stream encontrado: videoId=1ufsTmR3ccI status=upcoming
2026-02-25 22:36:36 INFO [SmartPlayer] Enviando placeholder com texto para videoId=1ufsTmR3ccI
[ffmpeg-runner] Comando ffmpeg: ffmpeg '-loglevel' 'error' '-user_agent' 'Mozilla/5.0' '-i' 'https://i.ytimg.com/vi/1ufsTmR3ccI/maxresdefault.jpg' '-f' 'lavfi' '-i' 'anullsrc=r=44100:cl=mono' '-filter_complex' '[0:v]scale=854:480,loop=-1:1:0,drawtext=fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf':text='Ao vivo em 13h 24m':x=(w-text_w)/2:y=h-100:fontsize=48:fontcolor=white:borderw=2:bordercolor=black@0.8,drawtext=fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf':text='26 Fev às 12\:00':x=(w-text_w)/2:y=h-50:fontsize=36:fontcolor=white:borderw=2:bordercolor=black@0.8[v]' '-map' '[v]' '-map' '1:a' '-c:v' 'libx264' '-preset' 'ultrafast' '-crf' '45' '-b:v' '150k' '-r' '1' '-g' '120' '-pix_fmt' 'yuv420p' '-c:a' 'aac' '-b:a' '24k' '-ac' '1' '-tune' 'stillimage' '-f' 'mpegts' 'pipe:1'
[ffmpeg-runner] User-Agent: Mozilla/5.0
2026-02-25 22:36:36 INFO [ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=https://i.ytimg.com/vi/1ufsTmR3ccI/maxresdefault.jpg
2026-02-25 22:36:43 INFO [ffmpeg-runner] Evento 'close' (response) disparado. Encerrando ffmpeg pid=18...
2026-02-25 22:36:43 INFO [ffmpeg-runner] Evento 'close' (request) disparado. Encerrando ffmpeg pid=18...
2026-02-25 22:36:43 INFO [SmartPlayer] Requisição de stream: videoId=BMgbdb43F2k
2026-02-25 22:36:43 INFO [SmartPlayer] Stream encontrado: videoId=BMgbdb43F2k status=upcoming
2026-02-25 22:36:43 INFO [SmartPlayer] Enviando placeholder com texto para videoId=BMgbdb43F2k
[ffmpeg-runner] Comando ffmpeg: ffmpeg '-loglevel' 'error' '-user_agent' 'Mozilla/5.0' '-i' 'https://i.ytimg.com/vi/BMgbdb43F2k/maxresdefault_live.jpg' '-f' 'lavfi' '-i' 'anullsrc=r=44100:cl=mono' '-filter_complex' '[0:v]scale=854:480,loop=-1:1:0,drawtext=fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf':text='Ao vivo em 22h 39m':x=(w-text_w)/2:y=h-100:fontsize=48:fontcolor=white:borderw=2:bordercolor=black@0.8,drawtext=fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf':text='26 Fev às 21\:15':x=(w-text_w)/2:y=h-50:fontsize=36:fontcolor=white:borderw=2:bordercolor=black@0.8[v]' '-map' '[v]' '-map' '1:a' '-c:v' 'libx264' '-preset' 'ultrafast' '-crf' '45' '-b:v' '150k' '-r' '1' '-g' '120' '-pix_fmt' 'yuv420p' '-c:a' 'aac' '-b:a' '24k' '-ac' '1' '-tune' 'stillimage' '-f' 'mpegts' 'pipe:1'
[ffmpeg-runner] User-Agent: Mozilla/5.0
2026-02-25 22:36:43 INFO [ffmpeg-runner] Iniciando ffmpeg placeholder: imageUrl=https://i.ytimg.com/vi/BMgbdb43F2k/maxresdefault_live.jpg
2026-02-25 22:36:50 INFO [ffmpeg-runner] Evento 'close' (response) disparado. Encerrando ffmpeg pid=51...
2026-02-25 22:36:50 INFO [ffmpeg-runner] Evento 'close' (request) disparado. Encerrando ffmpeg pid=51...
2026-02-25 22:36:58 INFO [HTTP] GET /vod-proxy.m3u → 200 (2ms) [anon]
2026-02-25 22:36:58 INFO [SmartPlayer] Requisição de stream: videoId=XWhoMk128aM
2026-02-25 22:36:58 INFO [SmartPlayer] Stream encontrado: videoId=XWhoMk128aM status=none
2026-02-25 22:36:58 INFO [SmartPlayer] Usando yt-dlp para videoId=XWhoMk128aM status=none
2026-02-25 22:36:58 INFO [ytdlp-runner] Iniciando yt-dlp: url=https://www.youtube.com/watch?v=XWhoMk128aM
2026-02-25 22:36:58 WARN [ytdlp-runner][ffmpeg stderr] ffmpeg version 8.0.1 Copyright (c) 2000-2025 the FFmpeg developers
  built with gcc 15.2.0 (Alpine 15.2.0)
  configuration: --prefix=/usr --disable-librtmp --disable-lzma --disable-static --disable-stripping --enable-avfilter --enable-gpl --enable-ladspa --enable-libaom --enable-libass --enable-libbluray --enable-libdav1d --enable-libdrm --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-libjxl --enable-libmp3lame --enable-libopenmpt --enable-libopus --enable-libplacebo --enable-libpulse --enable-librav1e --enable-librist --enable-libshaderc --enable-libsoxr --enable-libsrt --enable-libssh --enable-libtheora --enable-libv4l2 --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxcb --enable-libxml2 --enable-libxvid --enable-libzimg --enable-libzmq --enable-lto=auto --enable-lv2 --enable-openssl --enable-pic --enable-pthreads --enable-shared --enable-vaapi --enable-vdpau --enable-version3 --enable-vulkan --optflags=-O3 --enable-libsvtav1 --enable-libvpl
  libavutil      60.  8.100 / 60.  8.100
  libavcodec     62. 11.100 / 62. 11.100
  libavformat    62.  3.100 / 62.  3.100
  libavdevice    62.  1.100 / 62.  1.100
  libavfilter    11.  4.100 / 11.  4.100
  libswscale      9.  1.100 /  9.  1.100
  libswresample   6.  1.100 /  6.  1.100

2026-02-25 22:36:59 WARN [ytdlp-runner][yt-dlp stderr] [youtube] Extracting URL: https://www.youtube.com/watch?v=XWhoMk128aM

2026-02-25 22:36:59 WARN [ytdlp-runner][yt-dlp stderr] [youtube] XWhoMk128aM: Downloading webpage

2026-02-25 22:37:00 WARN [ytdlp-runner][yt-dlp stderr] WARNING: [youtube] No supported JavaScript runtime could be found. Only deno is enabled by default; to use another runtime add  --js-runtimes RUNTIME[:PATH]  to your command/config. YouTube extraction without a JS runtime has been deprecated, and some formats may be missing. See  https://github.com/yt-dlp/yt-dlp/wiki/EJS  for details on installing one

2026-02-25 22:37:00 WARN [ytdlp-runner][yt-dlp stderr] [youtube] XWhoMk128aM: Downloading android vr player API JSON

2026-02-25 22:37:00 WARN [ytdlp-runner][yt-dlp stderr] [info] XWhoMk128aM: Downloading 1 format(s): 137+140

2026-02-25 22:37:00 WARN [ytdlp-runner][yt-dlp stderr] [download] Destination: -

2026-02-25 22:37:01 WARN [ytdlp-runner][yt-dlp stderr] Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'https://rr2---sn-b8u-jfcr.googlevideo.com/videoplayback?expire=1772091420&ei=vKOfaZPGFp_S1sQP7JK4mQE&ip=177.207.209.234&id=o-AIa6zC4900-24lFJOHRlZFgl9DrVPw-vRk1HvAvuFohM&itag=137&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=535&met=1772069820%2C&mh=E4&mm=31%2C29&mn=sn-b8u-jfcr%2Csn-bg0e6nes&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2075000&bui=AVNa5-y6y8scIUfaISj4kiThTIcmuFWW-3NZpz350xAUlwoCduwWZWWgMgkbyyHhUBg2crXBjcXlMuIb&spc=6dlaFJ7-dgKg&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=290545490&dur=607.239&lmt=1771593015419763&mt=1772069354&fvip=4&keepalive=yes&fexp=51552689%2C51565115%2C51565681%2C51580968%2C51791334&c=ANDROID_VR&txp=4432534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJEij0EwRgIhAK1BXWkpe9EToZdLhn8wZC0bQUwGBalnc58QJewxEBpWAiEArpUaGxdV6aTxrK5x7JmZ2oK9_5fVzytB-i-8oH6NTVo%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRgIhAJ5G13wSSEJnGOli3S10ypvDaWCHd8VEpt6LuTk46S7dAiEAmqKk2d3e8ZxViK-L2lCfroRPx7dgpZDjLdECvzu6lBM%3D':
  Metadata:
    major_brand     : dash
    minor_version   : 0
    compatible_brands: iso6avc1mp41
    creation_time   : 2026-02-20T12:48:48.000000Z
  Duration: 00:10:07.24, start: 0.000000, bitrate: 3827 kb/s

2026-02-25 22:37:01 WARN [ytdlp-runner][yt-dlp stderr]   Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], 3140 kb/s, 29.97 fps, 29.97 tbr, 30k tbn (default)
    Metadata:
      creation_time   : 2026-02-20T12:48:48.000000Z
      handler_name    : ISO Media file produced by Google Inc.
      vendor_id       : [0][0][0][0]

2026-02-25 22:37:01 WARN [ytdlp-runner][yt-dlp stderr] Input #1, mov,mp4,m4a,3gp,3g2,mj2, from 'https://rr2---sn-b8u-jfcr.googlevideo.com/videoplayback?expire=1772091420&ei=vKOfaZPGFp_S1sQP7JK4mQE&ip=177.207.209.234&id=o-AIa6zC4900-24lFJOHRlZFgl9DrVPw-vRk1HvAvuFohM&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=535&met=1772069820%2C&mh=E4&mm=31%2C29&mn=sn-b8u-jfcr%2Csn-bg0e6nes&ms=au%2Crdu&mv=m&mvi=2&pl=23&rms=au%2Cau&initcwndbps=2075000&bui=AVNa5-y6y8scIUfaISj4kiThTIcmuFWW-3NZpz350xAUlwoCduwWZWWgMgkbyyHhUBg2crXBjcXlMuIb&spc=6dlaFJ7-dgKg&vprv=1&svpuc=1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=9829427&dur=607.294&lmt=1771592667102963&mt=1772069354&fvip=4&keepalive=yes&fexp=51552689%2C51565115%2C51565681%2C51580968%2C51791334&c=ANDROID_VR&txp=4432534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJEij0EwRAIgGLnjQTNKNeL6wEoPJQFTUGkT3gqslz0Ez76dG1Uia5ACIFtsDqTstoDKWMzfWrygRyV8tAsGIZmuaKRq23iudRuG&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRgIhAJ5G13wSSEJnGOli3S10ypvDaWCHd8VEpt6LuTk46S7dAiEAmqKk2d3e8ZxViK-L2lCfroRPx7dgpZDjLdECvzu6lBM%3D':
  Metadata:
    major_brand     : dash
    minor_version   : 0
    compatible_brands: iso6mp41
    creation_time   : 2026-02-20T13:04:10.000000Z
    encoder         : Google
  Duration: 00:10:07.29, start: 0.000000, bitrate: 129 kb/s
  Stream #1:0[0x1]
2026-02-25 22:37:01 WARN [ytdlp-runner][yt-dlp stderr] (eng): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 128 kb/s (default)
    Metadata:
      creation_time   : 2026-02-20T13:04:10.000000Z
      handler_name    : ISO Media file produced by Google Inc.
      vendor_id       : [0][0][0][0]
Stream mapping:
  Stream #0:0 -> #0:0 (copy)
  Stream #1:0 -> #0:1 (copy)
Output #0, mpegts, to 'pipe:':
  Metadata:
    major_brand     : dash
    minor_version   : 0
    compatible_brands: iso6avc1mp41
    encoder         : Lavf62.3.100
  Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], q=2-31, 3140 kb/s, 29.97 fps, 29.97 tbr, 90k tbn (default)
    Metadata:
      creation_time   : 2026-02-20T12:48:48.000000Z
      handler_name    : ISO Media file produced by Google Inc.
      vendor_id       : [0][0][0][0]
  Stream #0:1(eng): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 128 kb/s (default)
    Metadata:
      creation_time   : 2026-02-20T13:04:10.000000Z
      handler_name    : ISO Media file produced by Google Inc.
      vendor_id       : [0][0][0][0]
Press [q] to stop, [?] for help

2026-02-25 22:37:01 WARN [ytdlp-runner][yt-dlp stderr] frame=   66 fps=0.0 q=-1.0 size=     959KiB time=00:00:02.16 bitrate=3621.9kbits/s speed=4.34x elapsed=0:00:00.50
2026-02-25 22:37:02 WARN [ytdlp-runner][yt-dlp stderr] frame=  107 fps=107 q=-1.0 size=    1479KiB time=00:00:03.53 bitrate=3426.1kbits/s speed=3.54x elapsed=0:00:01.00
2026-02-25 22:37:02 WARN [ytdlp-runner][yt-dlp stderr] frame=  143 fps= 95 q=-1.0 size=    1983KiB time=00:00:04.73 bitrate=3429.2kbits/s speed=3.16x elapsed=0:00:01.50
2026-02-25 22:37:02 WARN [ytdlp-runner][ffmpeg stderr] Input #0, mpegts, from 'fd:':
  Duration: N/A, start: 1.433367, bitrate: N/A
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0
2026-02-25 22:37:02 WARN [ytdlp-runner][ffmpeg stderr] :0[0x100]: Video: h264 (High) ([27][0][0][0] / 0x001B), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], 29.97 fps, 29.97 tbr, 90k tbn, start 1.433367
  Stream #0:1[0x101](eng): Audio: aac (LC) ([15][0][0][0] / 0x000F), 44100 Hz, stereo, fltp, 130 kb/s, start 1.433367
Stream mapping:
  Stream #0:0 -> #0:0 (copy)
  Stream #0:1 -> #0:1 (copy)
Output #0, mpegts, to 'pipe:1':
  Metadata:
    encoder         : Lavf62.3.100
  Stream #0:0: Video: h264 (High) ([27][0][0][0] / 0x001B), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], q=2-31, 29.97 fps, 29.97 tbr, 90k tbn
  Stream #0:1(eng): Audio: aac (LC) ([15][0][0][0] / 0x000F), 44100 Hz, stereo, fltp, 130 kb/s

2026-02-25 22:37:03 WARN [ytdlp-runner][yt-dlp stderr] frame=  174 fps= 87 q=-1.0 size=    2500KiB time=00:00:05.77 bitrate=3548.2kbits/s speed=2.89x elapsed=0:00:02.00
2026-02-25 22:37:03 WARN [ytdlp-runner][ffmpeg stderr] frame=   84 fps=0.0 q=-1.0 size=    1175KiB time=00:00:02.86 bitrate=3354.4kbits/s speed=5.74x elapsed=0:00:00.50
2026-02-25 22:37:03 WARN [ytdlp-runner][yt-dlp stderr] frame=  184 fps= 74 q=-1.0 size=    2624KiB time=00:00:06.20 bitrate=3464.0kbits/s speed=2.48x elapsed=0:00:02.50
2026-02-25 22:37:03 WARN [ytdlp-runner][ffmpeg stderr] frame=  138 fps=138 q=-1.0 size=    1917KiB time=00:00:04.64 bitrate=3381.7kbits/s speed=4.64x elapsed=0:00:01.00
2026-02-25 22:37:04 WARN [ytdlp-runner][yt-dlp stderr] frame=  249 fps= 83 q=-1.0 size=    3372KiB time=00:00:08.27 bitrate=3338.6kbits/s speed=2.76x elapsed=0:00:03.00
2026-02-25 22:37:04 WARN [ytdlp-runner][ffmpeg stderr] frame=  231 fps=154 q=-1.0 size=    3197KiB time=00:00:07.75 bitrate=3376.7kbits/s speed=5.17x elapsed=0:00:01.50
2026-02-25 22:37:04 WARN [ytdlp-runner][yt-dlp stderr] frame=  287 fps= 82 q=-1.0 size=    4024KiB time=00:00:09.54 bitrate=3454.4kbits/s speed=2.73x elapsed=0:00:03.50
2026-02-25 22:37:04 WARN [ytdlp-runner][ffmpeg stderr] frame=  295 fps=147 q=-1.0 size=    4104KiB time=00:00:09.75 bitrate=3447.6kbits/s speed=4.88x elapsed=0:00:02.00
2026-02-25 22:37:05 WARN [ytdlp-runner][yt-dlp stderr] frame=  322 fps= 80 q=-1.0 size=    4513KiB time=00:00:10.71 bitrate=3452.1kbits/s speed=2.68x elapsed=0:00:04.00
2026-02-25 22:37:05 WARN [ytdlp-runner][ffmpeg stderr] frame=  331 fps=132 q=-1.0 size=    4575KiB time=00:00:10.89 bitrate=3441.7kbits/s speed=4.36x elapsed=0:00:02.50
2026-02-25 22:37:05 WARN [ytdlp-runner][yt-dlp stderr] frame=  352 fps= 78 q=-1.0 size=    5025KiB time=00:00:11.71 bitrate=3515.1kbits/s speed= 2.6x elapsed=0:00:04.50
2026-02-25 22:37:05 WARN [ytdlp-runner][ffmpeg stderr] frame=  360 fps=120 q=-1.0 size=    5105KiB time=00:00:11.88 bitrate=3517.9kbits/s speed=3.96x elapsed=0:00:03.00
2026-02-25 22:37:06 WARN [ytdlp-runner][yt-dlp stderr] frame=  381 fps= 76 q=-1.0 size=    5525KiB time=00:00:12.67 bitrate=3569.7kbits/s speed=2.54x elapsed=0:00:05.00
2026-02-25 22:37:06 WARN [ytdlp-runner][ffmpeg stderr] frame=  390 fps=111 q=-1.0 size=    5609KiB time=00:00:12.86 bitrate=3571.7kbits/s speed=3.67x elapsed=0:00:03.50
2026-02-25 22:37:06 WARN [ytdlp-runner][yt-dlp stderr] frame=  409 fps= 74 q=-1.0 size=    5998KiB time=00:00:13.61 bitrate=3609.1kbits/s speed=2.47x elapsed=0:00:05.50
2026-02-25 22:37:06 WARN [ytdlp-runner][ffmpeg stderr] frame=  417 fps=104 q=-1.0 size=    6104KiB time=00:00:13.83 bitrate=3613.4kbits/s speed=3.46x elapsed=0:00:04.00
2026-02-25 22:37:07 WARN [ytdlp-runner][yt-dlp stderr] frame=  435 fps= 72 q=-1.0 size=    6535KiB time=00:00:14.48 bitrate=3697.1kbits/s speed=2.41x elapsed=0:00:06.00
2026-02-25 22:37:07 WARN [ytdlp-runner][ffmpeg stderr] frame=  435 fps= 97 q=-1.0 size=    6493KiB time=00:00:14.48 bitrate=3673.3kbits/s speed=3.22x elapsed=0:00:04.50
2026-02-25 22:37:07 WARN [ytdlp-runner][yt-dlp stderr] frame=  454 fps= 70 q=-1.0 size=    7024KiB time=00:00:15.11 bitrate=3806.8kbits/s speed=2.32x elapsed=0:00:06.50
2026-02-25 22:37:07 WARN [ytdlp-runner][ffmpeg stderr] frame=  464 fps= 93 q=-1.0 size=    7112KiB time=00:00:15.32 bitrate=3801.5kbits/s speed=3.06x elapsed=0:00:05.00
2026-02-25 22:37:08 WARN [ytdlp-runner][yt-dlp stderr] frame=  489 fps= 70 q=-1.0 size=    7542KiB time=00:00:16.28 bitrate=3794.3kbits/s speed=2.33x elapsed=0:00:07.00
2026-02-25 22:37:08 WARN [ytdlp-runner][ffmpeg stderr] frame=  496 fps= 90 q=-1.0 size=    7629KiB time=00:00:16.50 bitrate=3785.3kbits/s speed=   3x elapsed=0:00:05.50
2026-02-25 22:37:08 WARN [ytdlp-runner][yt-dlp stderr] frame=  518 fps= 69 q=-1.0 size=    8029KiB time=00:00:17.25 bitrate=3812.8kbits/s speed= 2.3x elapsed=0:00:07.50
2026-02-25 22:37:08 WARN [ytdlp-runner][ffmpeg stderr] frame=  524 fps= 87 q=-1.0 size=    8070KiB time=00:00:17.32 bitrate=3816.7kbits/s speed=2.89x elapsed=0:00:06.00
2026-02-25 22:37:09 WARN [ytdlp-runner][yt-dlp stderr] frame=  547 fps= 68 q=-1.0 size=    8527KiB time=00:00:18.21 bitrate=3834.1kbits/s speed=2.28x elapsed=0:00:08.00
2026-02-25 22:37:09 WARN [ytdlp-runner][ffmpeg stderr] frame=  551 fps= 85 q=-1.0 size=    8576KiB time=00:00:18.29 bitrate=3839.8kbits/s speed=2.81x elapsed=0:00:06.50
2026-02-25 22:37:09 WARN [ytdlp-runner][yt-dlp stderr] frame=  566 fps= 67 q=-1.0 size=    8944KiB time=00:00:18.85 bitrate=3886.3kbits/s speed=2.22x elapsed=0:00:08.50
2026-02-25 22:37:09 WARN [ytdlp-runner][ffmpeg stderr] frame=  568 fps= 81 q=-1.0 size=    8917KiB time=00:00:18.80 bitrate=3883.9kbits/s speed=2.69x elapsed=0:00:07.00
2026-02-25 22:37:10 WARN [ytdlp-runner][yt-dlp stderr] frame=  576 fps= 64 q=-1.0 size=    9503KiB time=00:00:19.18 bitrate=4057.5kbits/s speed=2.13x elapsed=0:00:09.00
2026-02-25 22:37:10 WARN [ytdlp-runner][ffmpeg stderr] frame=  579 fps= 77 q=-1.0 size=    9579KiB time=00:00:19.28 bitrate=4068.8kbits/s speed=2.57x elapsed=0:00:07.50
2026-02-25 22:37:10 WARN [ytdlp-runner][yt-dlp stderr] frame=  603 fps= 63 q=-1.0 size=    9992KiB time=00:00:20.08 bitrate=4074.9kbits/s speed=2.11x elapsed=0:00:09.50
2026-02-25 22:37:10 WARN [ytdlp-runner][ffmpeg stderr] frame=  612 fps= 76 q=-1.0 size=   10109KiB time=00:00:20.34 bitrate=4071.3kbits/s speed=2.54x elapsed=0:00:08.00
2026-02-25 22:37:11 WARN [ytdlp-runner][yt-dlp stderr] frame=  634 fps= 63 q=-1.0 size=   10513KiB time=00:00:21.12 bitrate=4077.4kbits/s speed=2.11x elapsed=0:00:10.00
2026-02-25 22:37:11 WARN [ytdlp-runner][ffmpeg stderr] frame=  644 fps= 76 q=-1.0 size=   10641KiB time=00:00:21.45 bitrate=4062.8kbits/s speed=2.52x elapsed=0:00:08.50
2026-02-25 22:37:11 INFO [ytdlp-runner] Cliente desconectou (response-close), encerrando processos.
2026-02-25 22:37:11 INFO [ytdlp-runner] Cliente desconectou (request-close), encerrando processos.
2026-02-25 22:37:11 WARN [ytdlp-runner][yt-dlp stderr] frame=  671 fps= 64 q=-1.0 size=   11010KiB time=00:00:22.35 bitrate=4034.3kbits/s speed=2.13x elapsed=0:00:10.50
2026-02-25 22:37:12 WARN [ytdlp-runner][yt-dlp stderr] frame=  695 fps= 63 q=-1.0 size=   11472KiB time=00:00:23.15 bitrate=4058.4kbits/s speed= 2.1x elapsed=0:00:11.00
2026-02-25 22:37:12 WARN [ytdlp-runner][yt-dlp stderr] frame=  701 fps= 61 q=-1.0 size=   11584KiB time=00:00:23.45 bitrate=4045.5kbits/s speed=2.04x elapsed=0:00:11.50
2026-02-25 22:37:13 WARN [ytdlp-runner][yt-dlp stderr] frame=  701 fps= 58 q=-1.0 size=   11584KiB time=00:00:23.45 bitrate=4045.5kbits/s speed=1.95x elapsed=0:00:12.00
2026-02-25 22:37:13 WARN [ytdlp-runner] Forçando SIGKILL em processos yt-dlp/ffmpeg para garantir limpeza.
2026-02-25 22:37:13 WARN [ytdlp-runner] Forçando SIGKILL em processos yt-dlp/ffmpeg para garantir limpeza.
node:events:502
      throw er; // Unhandled 'error' event
      ^

Error: write EPIPE
    at WriteWrap.onWriteComplete [as oncomplete] (node:internal/stream_base_commons:95:16)
Emitted 'error' event on Socket instance at:
    at Socket.onerror (node:internal/streams/readable:1028:14)
    at Socket.emit (node:events:524:28)
    at emitErrorNT (node:internal/streams/destroy:169:8)
    at emitErrorCloseNT (node:internal/streams/destroy:128:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  errno: -32,
  code: 'EPIPE',
  syscall: 'write'
}

Node.js v20.20.0
2026-02-25 22:37:15 INFO [StateManager] Cache carregado com 17 streams.
2026-02-25 22:37:15 INFO [YouTubeApi] Lista de chaves atualizada (1 chave(s)).
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
2026-02-25 22:37:15 INFO Servidor HTTP iniciado em http://0.0.0.0:8888
2026-02-25 22:37:15 INFO [Scheduler] Iniciado com delay inicial (cache existente detectado).
2026-02-25 22:37:15 INFO [Scheduler] Loop iniciado. Tick a cada 60s.
2026-02-25 22:37:16 INFO [SmartPlayer] Requisição de stream: videoId=smDmy-EVXUE
2026-02-25 22:37:16 INFO [SmartPlayer] Stream encontrado: videoId=smDmy-EVXUE status=none
2026-02-25 22:37:16 INFO [SmartPlayer] Usando yt-dlp para videoId=smDmy-EVXUE status=none
2026-02-25 22:37:16 INFO [ytdlp-runner] Iniciando yt-dlp: url=https://www.youtube.com/watch?v=smDmy-EVXUE
2026-02-25 22:37:17 WARN [ytdlp-runner][ffmpeg stderr] ffmpeg version 8.0.1 Copyright (c) 2000-2025 the FFmpeg developers
  built with gcc 15.2.0 (Alpine 15.2.0)
  configuration: --prefix=/usr --disable-librtmp --disable-lzma --disable-static --disable-stripping --enable-avfilter --enable-gpl --enable-ladspa --enable-libaom --enable-libass --enable-libbluray --enable-libdav1d --enable-libdrm --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-libjxl --enable-libmp3lame --enable-libopenmpt --enable-libopus --enable-libplacebo --enable-libpulse --enable-librav1e --enable-librist --enable-libshaderc --enable-libsoxr --enable-libsrt --enable-libssh --enable-libtheora --enable-libv4l2 --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxcb --enable-libxml2 --enable-libxvid --enable-libzimg --enable-libzmq --enable-lto=auto --enable-lv2 --enable-openssl --enable-pic --enable-pthreads --enable-shared --enable-vaapi --enable-vdpau --enable-version3 --enable-vulkan --optflags=-O3 --enable-libsvtav1 --enable-libvpl
  libavutil      60.  8.100 / 60.  8.100
  libavcodec     62. 11.100 / 62. 11.100
  libavformat    62.  3.100 / 62.  3.100
  libavdevice    62.  1.100 / 62.  1.100
  libavfilter    11.  4.100 / 11.  4.100
  libswscale      9.  1.100 /  9.  1.100
  libswresample   6.  1.100 /  6.  1.100

2026-02-25 22:37:17 WARN [ytdlp-runner][yt-dlp stderr] [youtube] Extracting URL: https://www.youtube.com/watch?v=smDmy-EVXUE

2026-02-25 22:37:17 WARN [ytdlp-runner][yt-dlp stderr] [youtube] smDmy-EVXUE: Downloading webpage

2026-02-25 22:37:18 WARN [ytdlp-runner][yt-dlp stderr] WARNING: [youtube] No supported JavaScript runtime could be found. Only deno is enabled by default; to use another runtime add  --js-runtimes RUNTIME[:PATH]  to your command/config. YouTube extraction without a JS runtime has been deprecated, and some formats may be missing. See  https://github.com/yt-dlp/yt-dlp/wiki/EJS  for details on installing one

2026-02-25 22:37:18 WARN [ytdlp-runner][yt-dlp stderr] [youtube] smDmy-EVXUE: Downloading android vr player API JSON

2026-02-25 22:37:18 WARN [ytdlp-runner][yt-dlp stderr] [youtube] smDmy-EVXUE: Downloading MPD manifest

2026-02-25 22:37:19 WARN [ytdlp-runner][yt-dlp stderr] [info] smDmy-EVXUE: Downloading 1 format(s): 299+140

2026-02-25 22:37:19 WARN [ytdlp-runner][yt-dlp stderr] [download] Destination: -

2026-02-25 22:37:21 INFO [ytdlp-runner] Cliente desconectou (response-close), encerrando processos.
2026-02-25 22:37:21 INFO [ytdlp-runner] Cliente desconectou (request-close), encerrando processos.
2026-02-25 22:37:23 WARN [ytdlp-runner] Forçando SIGKILL em processos yt-dlp/ffmpeg para garantir limpeza.
2026-02-25 22:37:23 WARN [ytdlp-runner] Forçando SIGKILL em processos yt-dlp/ffmpeg para garantir limpeza.
2026-02-25 22:37:23 INFO [ytdlp-runner] ffmpeg finalizado com code=null
2026-02-25 22:37:26 WARN [ytdlp-runner][yt-dlp stderr] Input #0, dash, from 'https://manifest.googlevideo.com/api/manifest/dash/expire/1772091438/ei/zqOfaYzaJOuO-LAPlZzwwQM/ip/177.207.209.234/id/smDmy-EVXUE.1/source/yt_live_broadcast/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/hfr/1/as/fmp4_audio_clear%2Cwebm_audio_clear%2Cwebm2_audio_clear%2Cfmp4_sd_hd_clear%2Cwebm2_sd_hd_clear/force_finished/1/gcr/br/sident/1/spc/6dlaFIGtvkyU/vprv/1/rqh/2/reg/0/pacing/0/itag_bl/374%2C375%2C407%2C408%2C612%2C613%2C617%2C619%2C623%2C628%2C655%2C656%2C660%2C662%2C666%2C671%2C798%2C799%2C803%2C804%2C834%2C868%2C870%2C872%2C874%2C876%2C880%2C882%2C884%2C886%2C888%2C893%2C897%2C899/keepalive/yes/fexp/51552689%2C51565115%2C51565681%2C51580968%2C51791333/itag/0/playlist_type/DVR/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Chfr%2Cas%2Cforce_finished%2Cgcr%2Csident%2Cspc%2Cvprv%2Crqh%2Creg%2Citag%2Cplaylist_type/sig/AJEij0EwRAIgWxSsPMa0Ap187QXLZQUeatwzB2JleNcXkJeVCRJrdWQCIEAoBFxzSfhqMwY6AXM0kywZS8Tp_hdn1Og5M8E6VyG4':
  Duration: 00:00:00.00, start: 14172.903039, bitrate: N/A
  Program 0
  Stream #0:0: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 426x240 [SAR 1:1 DAR 71:40], 3168 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:

2026-02-25 22:37:26 WARN [ytdlp-runner][yt-dlp stderr]       variant_bitrate : 419256
      id              : 133
  Stream #0:1: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 640x360 [SAR 1:1 DAR 16:9], 5612 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 772630
      id              : 134
  Stream #0:2: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 854x480 [SAR 1:1 DAR 427:240], 8538 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 1077445
      id              : 135
  Stream #0:3: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 256x144 [SAR 1:1 DAR 16:9], 1586 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 192223
      id              : 160
  Stream #0:4: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1280x720 [SAR 1:1 DAR 16:9], 38413 kb/s, 59.94 fps, 59.94 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 2639005
      id              : 298
  Stream #0:5: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], 78987 kb/s, 59.94 fps, 59.94 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 5144200
      id              : 299
  Stream #0:6: Audio: aac (HE-AAC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 59 kb/s, start 14172.903039 (default)
    Metadata:
      variant_bitrate : 64000
      id              : 139
  Stream #0:7: Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 119 kb/s, start 14172.926259 (default)
    Metadata:
      variant_bitrate : 144000
      id              : 140

2026-02-25 22:37:29 INFO [SmartPlayer] Requisição de stream: videoId=smDmy-EVXUE
2026-02-25 22:37:29 INFO [SmartPlayer] Stream encontrado: videoId=smDmy-EVXUE status=none
2026-02-25 22:37:29 INFO [SmartPlayer] Usando yt-dlp para videoId=smDmy-EVXUE status=none
2026-02-25 22:37:29 INFO [ytdlp-runner] Iniciando yt-dlp: url=https://www.youtube.com/watch?v=smDmy-EVXUE
2026-02-25 22:37:29 WARN [ytdlp-runner][ffmpeg stderr] ffmpeg version 8.0.1
2026-02-25 22:37:29 WARN [ytdlp-runner][ffmpeg stderr]  Copyright (c) 2000-2025 the FFmpeg developers
2026-02-25 22:37:29 WARN [ytdlp-runner][ffmpeg stderr]

2026-02-25 22:37:29 WARN [ytdlp-runner][ffmpeg stderr]   built with gcc 15.2.0 (Alpine 15.2.0)
  configuration: --prefix=/usr --disable-librtmp --disable-lzma --disable-static --disable-stripping --enable-avfilter --enable-gpl --enable-ladspa --enable-libaom --enable-libass --enable-libbluray --enable-libdav1d --enable-libdrm --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-libjxl --enable-libmp3lame --enable-libopenmpt --enable-libopus --enable-libplacebo --enable-libpulse --enable-librav1e --enable-librist --enable-libshaderc --enable-libsoxr --enable-libsrt --enable-libssh --enable-libtheora --enable-libv4l2 --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxcb --enable-libxml2 --enable-libxvid --enable-libzimg --enable-libzmq --enable-lto=auto --enable-lv2 --enable-openssl --enable-pic --enable-pthreads --enable-shared --enable-vaapi --enable-vdpau --enable-version3 --enable-vulkan --optflags=-O3 --enable-libsvtav1 --enable-libvpl

2026-02-25 22:37:29 WARN [ytdlp-runner][ffmpeg stderr]   libavutil      60.  8.100 / 60.  8.100
  libavcodec     62. 11.100 / 62. 11.100
  libavformat    62.  3.100 / 62.  3.100
  libavdevice    62.  1.100 / 62.  1.100
  libavfilter    11.  4.100 / 11.  4.100
  libswscale      9.  1.100 /  9.  1.100
  libswresample   6.  1.100 /  6.  1.100

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] Input #1, dash, from 'https://manifest.googlevideo.com/api/manifest/dash/expire/1772091438/ei/zqOfaYzaJOuO-LAPlZzwwQM/ip/177.207.209.234/id/smDmy-EVXUE.1/source/yt_live_broadcast/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/hfr/1/as/fmp4_audio_clear%2Cwebm_audio_clear%2Cwebm2_audio_clear%2Cfmp4_sd_hd_clear%2Cwebm2_sd_hd_clear/force_finished/1/gcr/br/sident/1/spc/6dlaFIGtvkyU/vprv/1/rqh/2/reg/0/pacing/0/itag_bl/374%2C375%2C407%2C408%2C612%2C613%2C617%2C619%2C623%2C628%2C655%2C656%2C660%2C662%2C666%2C671%2C798%2C799%2C803%2C804%2C834%2C868%2C870%2C872%2C874%2C876%2C880%2C882%2C884%2C886%2C888%2C893%2C897%2C899/keepalive/yes/fexp/51552689%2C51565115%2C51565681%2C51580968%2C51791333/itag/0/playlist_type/DVR/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Chfr%2Cas%2Cforce_finished%2Cgcr%2Csident%2Cspc%2Cvprv%2Crqh%2Creg%2Citag%2Cplaylist_type/sig/AJEij0EwRAIgWxSsPMa0Ap187QXLZQUeatwzB2JleNcXkJeVCRJrdWQCIEAoBFxzSfhqMwY6AXM0kywZS8Tp_hdn1Og5M8E6VyG4':
  Duration: 00:00:00.00, start: 14172.903039, bitrate: N/A
  Program 0
  Stream #1:0: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 426x240 [SAR 1:1 DAR 71:40], 3168 kb/s, 29.97 fps, 29.97 tbr, 90k tbn
2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] , start 14172.925433 (default)
    Metadata:
      variant_bitrate : 419256
      id              : 133
  Stream #1:1: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 640x360 [SAR 1:1 DAR 16:9], 5612 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 772630
      id              : 134
  Stream #1:2: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 854x480 [SAR 1:1 DAR 427:240], 8538 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 1077445
      id              : 135
  Stream #1:3: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 256x144 [SAR 1:1 DAR 16:9], 1586 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 192223
      id              : 160
  Stream #1:4: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1280x720 [SAR 1:1 DAR 16:9], 38413 kb/s, 59.94 fps, 59.94 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 2639005
      id              : 298
  Stream #1:5: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], 78987 kb/s, 59.94 fps, 59.94 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 5144200
      id              : 299
  Stream #1:6: Audio: aac (HE-AAC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 59 kb/s, start 14172.903039 (default)
    Metadata:
      variant_bitrate : 64000
      id              : 139
  Stream #1:7: Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 119 kb/s, start 14172.926259 (default)
    Metadata:
      variant_bitrate : 144000
      id              : 140
Stream mapping:
  Stream #0:7 -> #0:0 (copy)
  Stream #1:1 -> #0:1 (copy)
Output #0, mpegts, to 'pipe:':
  Metadata:
    encoder         : Lavf62.3.100
  Stream #0:0: Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 119 kb/s (default)
    Metadata:
      variant_bitrate : 144000
      id              : 140
  Stream #0:1: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 640x360 [SAR 1:1 DAR 16:9], q=2-31, 5612 kb/s, 29.97 fps, 29.97 tbr, 90k tbn (default)
    Metadata:
      variant_bitrate : 772630
      id              : 134
Press [q] to stop, [?] for help

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe70ff4740] No longer receiving stream_index 0

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe77e5e380] No longer receiving stream_index 0

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe77e5e380] No longer receiving stream_index 1

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe77e5e380] No longer receiving stream_index 2

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe77e5e380] No longer receiving stream_index 3

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe77e5e380] No longer receiving stream_index 4

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe70ff4740] No longer receiving stream_index 2

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe70ff4740] No longer receiving stream_index 3

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe70ff4740] No longer receiving stream_index 4

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe70ff4740] No longer receiving stream_index 5

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe70ff4740] No longer receiving stream_index 6

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe70ff4740] No longer receiving stream_index 7

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe77e5e380] No longer receiving stream_index 5

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7fbe77e5e380] No longer receiving stream_index 6

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [youtube] Extracting URL: https://www.youtube.com/watch?v=smDmy-EVXUE

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] [youtube] smDmy-EVXUE: Downloading webpage

2026-02-25 22:37:29 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=0.0 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=4.18x elapsed=0:00:00.50
2026-02-25 22:37:30 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps= 59 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=2.09x elapsed=0:00:01.00
2026-02-25 22:37:30 WARN [ytdlp-runner][yt-dlp stderr] WARNING: [youtube] No supported JavaScript runtime could be found. Only deno is enabled by default; to use another runtime add  --js-runtimes RUNTIME[:PATH]  to your command/config. YouTube extraction without a JS runtime has been deprecated, and some formats may be missing. See  https://github.com/yt-dlp/yt-dlp/wiki/EJS  for details on installing one

2026-02-25 22:37:30 WARN [ytdlp-runner][yt-dlp stderr] [youtube] smDmy-EVXUE: Downloading android vr player API JSON

2026-02-25 22:37:30 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps= 39 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=1.39x elapsed=0:00:01.50
2026-02-25 22:37:30 WARN [ytdlp-runner][yt-dlp stderr] [youtube] smDmy-EVXUE: Downloading MPD manifest

2026-02-25 22:37:31 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps= 29 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=1.05x elapsed=0:00:02.00
2026-02-25 22:37:31 WARN [ytdlp-runner][yt-dlp stderr] [info] smDmy-EVXUE: Downloading 1 format(s): 299+140

2026-02-25 22:37:31 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps= 24 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.836x elapsed=0:00:02.50
2026-02-25 22:37:31 WARN [ytdlp-runner][yt-dlp stderr] [download] Destination: -

2026-02-25 22:37:32 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps= 20 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.697x elapsed=0:00:03.00
2026-02-25 22:37:32 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps= 17 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.597x elapsed=0:00:03.50
2026-02-25 22:37:33 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps= 15 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.523x elapsed=0:00:04.00
2026-02-25 22:37:33 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps= 13 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.465x elapsed=0:00:04.50
2026-02-25 22:37:34 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps= 12 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.418x elapsed=0:00:05.00
2026-02-25 22:37:34 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps= 11 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.38x elapsed=0:00:05.50
2026-02-25 22:37:35 WARN [ytdlp-runner][yt-dlp stderr] Input #0, dash, from 'https://manifest.googlevideo.com/api/manifest/dash/expire/1772091450/ei/2qOfacTJLvKl-LAPybSOuA0/ip/177.207.209.234/id/smDmy-EVXUE.1/source/yt_live_broadcast/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/tx/51691028/txs/51691027%2C51691028/hfr/1/as/fmp4_audio_clear%2Cwebm_audio_clear%2Cwebm2_audio_clear%2Cfmp4_sd_hd_clear%2Cwebm2_sd_hd_clear/force_finished/1/gcr/br/sident/1/spc/6dlaFH1eU6jS/vprv/1/rqh/2/reg/0/pacing/0/itag_bl/374%2C375%2C407%2C408%2C612%2C613%2C617%2C619%2C623%2C628%2C655%2C656%2C660%2C662%2C666%2C671%2C798%2C799%2C803%2C804%2C834%2C868%2C870%2C872%2C874%2C876%2C880%2C882%2C884%2C886%2C888%2C893%2C897%2C899/keepalive/yes/fexp/51552689%2C51565116%2C51565681%2C51580968%2C51791333/itag/0/playlist_type/DVR/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Ctx%2Ctxs%2Chfr%2Cas%2Cforce_finished%2Cgcr%2Csident%2Cspc%2Cvprv%2Crqh%2Creg%2Citag%2Cplaylist_type/sig/AJEij0EwRgIhALnVmacSBREW7czLUFX3AMk3U1dSKZ_zy1vwGp_wkvvEAiEAg4GwcBL4aJ8EOlJFzxokwPtqEacGUKDY6GFHcvpO8G8%3D':
  Duration: 00:00:00.00, start: 14172.903039, bitrate: N/A
  Program 0
  Stream #0:0: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 426x240 [SAR 1:1 DAR 71:40], 3168 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 419256
      id              : 133

2026-02-25 22:37:35 WARN [ytdlp-runner][yt-dlp stderr]   Stream #0:1: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 640x360 [SAR 1:1 DAR 16:9], 5612 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 772630
      id              : 134
  Stream #0:2: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 854x480 [SAR 1:1 DAR 427:240], 8538 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 1077445
      id              : 135
  Stream #0:3: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 256x144 [SAR 1:1 DAR 16:9], 1586 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 192223
      id              : 160
  Stream #0:4: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1280x720 [SAR 1:1 DAR 16:9], 38413 kb/s, 59.94 fps, 59.94 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 2639005
      id              : 298
  Stream #0:5: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], 78987 kb/s, 59.94 fps, 59.94 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 5144200
      id              : 299
  Stream #0:6: Audio: aac (HE-AAC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 59 kb/s, start 14172.903039 (default)
    Metadata:
      variant_bitrate : 64000
      id              : 139
  Stream #0:7: Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 119 kb/s, start 14172.926259 (default)
    Metadata:
      variant_bitrate : 144000
      id              : 140

2026-02-25 22:37:35 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=9.8 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.348x elapsed=0:00:06.00
2026-02-25 22:37:35 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=9.1 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.322x elapsed=0:00:06.50
2026-02-25 22:37:36 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=8.4 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.299x elapsed=0:00:07.00
2026-02-25 22:37:36 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=7.9 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.279x elapsed=0:00:07.50
2026-02-25 22:37:37 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=7.4 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.261x elapsed=0:00:08.00
2026-02-25 22:37:37 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=6.9 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.246x elapsed=0:00:08.50
2026-02-25 22:37:38 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=6.6 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.232x elapsed=0:00:09.00
2026-02-25 22:37:38 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=6.2 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.22x elapsed=0:00:09.50
2026-02-25 22:37:39 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=5.9 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.209x elapsed=0:00:10.00
2026-02-25 22:37:39 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=5.6 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.199x elapsed=0:00:10.50
2026-02-25 22:37:40 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=5.4 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.19x elapsed=0:00:11.00
2026-02-25 22:37:40 WARN [ytdlp-runner][yt-dlp stderr] Input #1, dash, from 'https://manifest.googlevideo.com/api/manifest/dash/expire/1772091450/ei/2qOfacTJLvKl-LAPybSOuA0/ip/177.207.209.234/id/smDmy-EVXUE.1/source/yt_live_broadcast/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/tx/51691028/txs/51691027%2C51691028/hfr/1/as/fmp4_audio_clear%2Cwebm_audio_clear%2Cwebm2_audio_clear%2Cfmp4_sd_hd_clear%2Cwebm2_sd_hd_clear/force_finished/1/gcr/br/sident/1/spc/6dlaFH1eU6jS/vprv/1/rqh/2/reg/0/pacing/0/itag_bl/374%2C375%2C407%2C408%2C612%2C613%2C617%2C619%2C623%2C628%2C655%2C656%2C660%2C662%2C666%2C671%2C798%2C799%2C803%2C804%2C834%2C868%2C870%2C872%2C874%2C876%2C880%2C882%2C884%2C886%2C888%2C893%2C897%2C899/keepalive/yes/fexp/51552689%2C51565116%2C51565681%2C51580968%2C51791333/itag/0/playlist_type/DVR/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Ctx%2Ctxs%2Chfr%2Cas%2Cforce_finished%2Cgcr%2Csident%2Cspc%2Cvprv%2Crqh%2Creg%2Citag%2Cplaylist_type/sig/AJEij0EwRgIhALnVmacSBREW7czLUFX3AMk3U1dSKZ_zy1vwGp_wkvvEAiEAg4GwcBL4aJ8EOlJFzxokwPtqEacGUKDY6GFHcvpO8G8%3D':
  Duration: 00:00:00.00, start: 14172.903039, bitrate: N/A
  Program 0
  Stream #1:0: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 426x240 [SAR 1:1 DAR 71:40], 3168 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 419256
2026-02-25 22:37:40 WARN [ytdlp-runner][yt-dlp stderr]
      id              : 133
  Stream #1:1: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 640x360 [SAR 1:1 DAR 16:9], 5612 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 772630
      id              : 134
  Stream #1:2: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 854x480 [SAR 1:1 DAR 427:240], 8538 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 1077445
      id              : 135
  Stream #1:3: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 256x144 [SAR 1:1 DAR 16:9], 1586 kb/s, 29.97 fps, 29.97 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 192223
      id              : 160
  Stream #1:4: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1280x720 [SAR 1:1 DAR 16:9], 38413 kb/s, 59.94 fps, 59.94 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 2639005
      id              : 298
  Stream #1:5: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], 78987 kb/s, 59.94 fps, 59.94 tbr, 90k tbn, start 14172.925433 (default)
    Metadata:
      variant_bitrate : 5144200
      id              : 299
  Stream #1:6: Audio: aac (HE-AAC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 59 kb/s, start 14172.903039 (default)
    Metadata:
      variant_bitrate : 64000
      id              : 139
  Stream #1:7: Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 119 kb/s, start 14172.926259 (default)
    Metadata:
      variant_bitrate : 144000
      id              : 140
Stream mapping:
  Stream #0:7 -> #0:0 (copy)
  Stream #1:1 -> #0:1 (copy)
Output #0, mpegts, to 'pipe:':
  Metadata:
    encoder         : Lavf62.3.100
  Stream #0:0: Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 119 kb/s (default)
    Metadata:
      variant_bitrate : 144000
      id              : 140

2026-02-25 22:37:40 WARN [ytdlp-runner][yt-dlp stderr]   Stream #0:1: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 640x360 [SAR 1:1 DAR 16:9], q=2-31, 5612 kb/s, 29.97 fps, 29.97 tbr, 90k tbn (default)
    Metadata:
      variant_bitrate : 772630
      id              : 134
Press [q] to stop, [?] for help

2026-02-25 22:37:40 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7f8b9675d380] No longer receiving stream_index 0
[dash @ 0x7f8b8f8e7740] No longer receiving stream_index 0
[dash @ 0x7f8b8f8e7740] No longer receiving stream_index 2
[dash @ 0x7f8b9675d380] No longer receiving stream_index 1
[dash @ 0x7f8b8f8e7740] No longer receiving stream_index 3
[dash @ 0x7f8b9675d380] No longer receiving stream_index 2
[dash @ 0x7f8b8f8e7740] No longer receiving stream_index 4
[dash @ 0x7f8b9675d380] No longer receiving stream_index 3

2026-02-25 22:37:40 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7f8b8f8e7740]
2026-02-25 22:37:40 WARN [ytdlp-runner][yt-dlp stderr] No longer receiving stream_index 5

2026-02-25 22:37:40 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7f8b9675d380] No longer receiving stream_index 4
[dash @ 0x7f8b8f8e7740] No longer receiving stream_index 6

2026-02-25 22:37:40 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7f8b9675d380] No longer receiving stream_index 5

2026-02-25 22:37:40 WARN [ytdlp-runner][yt-dlp stderr] [dash @ 0x7f8b9675d380] No longer receiving stream_index 6
[dash @ 0x7f8b8f8e7740] No longer receiving stream_index 7

2026-02-25 22:37:40 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=5.1 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.182x elapsed=0:00:11.50
2026-02-25 22:37:40 WARN [ytdlp-runner][ffmpeg stderr] Input #0, mpegts, from 'fd:':
  Duration: N/A, start: 1.422389, bitrate: N/A
  Program 1

2026-02-25 22:37:40 WARN [ytdlp-runner][ffmpeg stderr]     Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x100]: Audio: aac (LC) ([15][0][0][0] / 0x000F), 44100 Hz, stereo, fltp, 130 kb/s, start 1.423222
  Stream #0:1[0x101]: Video: h264 (Main) ([27][0][0][0] / 0x001B), yuv420p(tv, bt709, progressive), 640x360 [SAR 1:1 DAR 16:9], 29.97 fps, 29.97 tbr, 90k tbn, start 1.422389
Stream mapping:
  Stream #0:1 -> #0:0 (copy)
  Stream #0:0 -> #0:1 (copy)
Output #0, mpegts, to 'pipe:1':
  Metadata:
    encoder         : Lavf62.3.100
  Stream #0:0: Video: h264 (Main) ([27][0][0][0] / 0x001B), yuv420p(tv, bt709, progressive), 640x360 [SAR 1:1 DAR 16:9], q=2-31, 29.97 fps, 29.97 tbr, 90k tbn
  Stream #0:1: Audio: aac (LC) ([15][0][0][0] / 0x000F), 44100 Hz, stereo, fltp, 130 kb/s

2026-02-25 22:37:41 WARN [ytdlp-runner][yt-dlp stderr] frame=  360 fps=0.0 q=-1.0 size=     885KiB time=00:00:12.03 bitrate= 602.1kbits/s speed=24.1x elapsed=0:00:00.50
2026-02-25 22:37:41 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=4.9 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.174x elapsed=0:00:12.00
2026-02-25 22:37:41 WARN [ytdlp-runner][ffmpeg stderr] frame=  378 fps=0.0 q=-1.0 size=     965KiB time=00:00:12.71 bitrate= 622.1kbits/s speed=25.4x elapsed=0:00:00.50
2026-02-25 22:37:41 WARN [ytdlp-runner][yt-dlp stderr] frame=  599 fps=599 q=-1.0 size=    1486KiB time=00:00:20.00 bitrate= 608.2kbits/s speed=  20x elapsed=0:00:01.00
2026-02-25 22:37:41 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=4.7 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.167x elapsed=0:00:12.50
2026-02-25 22:37:41 WARN [ytdlp-runner][ffmpeg stderr] frame=  597 fps=597 q=-1.0 size=    1468KiB time=00:00:19.91 bitrate= 603.8kbits/s speed=19.9x elapsed=0:00:01.00
2026-02-25 22:37:42 WARN [ytdlp-runner][yt-dlp stderr] frame=  779 fps=519 q=-1.0 size=    2274KiB time=00:00:26.01 bitrate= 716.1kbits/s speed=17.3x elapsed=0:00:01.50
2026-02-25 22:37:42 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=4.5 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.161x elapsed=0:00:13.00
2026-02-25 22:37:42 WARN [ytdlp-runner][ffmpeg stderr] frame=  777 fps=518 q=-1.0 size=    2259KiB time=00:00:25.89 bitrate= 714.8kbits/s speed=17.3x elapsed=0:00:01.50
2026-02-25 22:37:42 WARN [ytdlp-runner][yt-dlp stderr] frame=  959 fps=479 q=-1.0 size=    2911KiB time=00:00:32.02 bitrate= 744.7kbits/s speed=  16x elapsed=0:00:02.00
2026-02-25 22:37:42 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=4.4 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.155x elapsed=0:00:13.50
2026-02-25 22:37:42 WARN [ytdlp-runner][ffmpeg stderr] frame= 1017 fps=508 q=-1.0 size=    3065KiB time=00:00:33.85 bitrate= 741.6kbits/s speed=16.9x elapsed=0:00:02.00
2026-02-25 22:37:43 WARN [ytdlp-runner][yt-dlp stderr] frame= 1019 fps=408 q=-1.0 size=    3072KiB time=00:00:34.02 bitrate= 739.8kbits/s speed=13.6x elapsed=0:00:02.50
2026-02-25 22:37:43 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=4.2 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.149x elapsed=0:00:14.00
2026-02-25 22:37:43 WARN [ytdlp-runner][ffmpeg stderr] frame= 1077 fps=431 q=-1.0 size=    3266KiB time=00:00:35.85 bitrate= 746.2kbits/s speed=14.3x elapsed=0:00:02.50
2026-02-25 22:37:43 WARN [ytdlp-runner][yt-dlp stderr] frame= 1259 fps=420 q=-1.0 size=    3855KiB time=00:00:42.03 bitrate= 751.3kbits/s speed=  14x elapsed=0:00:03.00
2026-02-25 22:37:43 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=4.1 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.144x elapsed=0:00:14.50
2026-02-25 22:37:43 WARN [ytdlp-runner][ffmpeg stderr] frame= 1377 fps=459 q=-1.0 size=    4211KiB time=00:00:45.90 bitrate= 751.4kbits/s speed=15.3x elapsed=0:00:03.00
2026-02-25 22:37:44 WARN [ytdlp-runner][yt-dlp stderr] frame= 1558 fps=445 q=-1.0 size=    4738KiB time=00:00:52.00 bitrate= 746.4kbits/s speed=14.9x elapsed=0:00:03.50
2026-02-25 22:37:44 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=3.9 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.139x elapsed=0:00:15.00
2026-02-25 22:37:44 WARN [ytdlp-runner][ffmpeg stderr] frame= 1676 fps=479 q=-1.0 size=    5030KiB time=00:00:55.86 bitrate= 737.6kbits/s speed=  16x elapsed=0:00:03.50
2026-02-25 22:37:44 WARN [ytdlp-runner][yt-dlp stderr] frame= 1798 fps=449 q=-1.0 size=    5408KiB time=00:01:00.01 bitrate= 738.1kbits/s speed=  15x elapsed=0:00:04.00
2026-02-25 22:37:44 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=3.8 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.135x elapsed=0:00:15.50
2026-02-25 22:37:44 WARN [ytdlp-runner][ffmpeg stderr] frame= 1916 fps=479 q=-1.0 size=    5764KiB time=00:01:03.87 bitrate= 739.2kbits/s speed=  16x elapsed=0:00:04.00
2026-02-25 22:37:45 WARN [ytdlp-runner][yt-dlp stderr] frame= 2158 fps=479 q=-1.0 size=    6462KiB time=00:01:12.02 bitrate= 734.9kbits/s speed=  16x elapsed=0:00:04.50
2026-02-25 22:37:45 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=3.7 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.131x elapsed=0:00:16.00
2026-02-25 22:37:45 WARN [ytdlp-runner][ffmpeg stderr] frame= 2216 fps=492 q=-1.0 size=    6620KiB time=00:01:13.81 bitrate= 734.7kbits/s speed=16.4x elapsed=0:00:04.50
2026-02-25 22:37:45 WARN [ytdlp-runner][yt-dlp stderr] frame= 2338 fps=468 q=-1.0 size=    6898KiB time=00:01:18.03 bitrate= 724.2kbits/s speed=15.6x elapsed=0:00:05.00
2026-02-25 22:37:45 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=3.6 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.127x elapsed=0:00:16.50
2026-02-25 22:37:45 WARN [ytdlp-runner][ffmpeg stderr] frame= 2396 fps=479 q=-1.0 size=    7073KiB time=00:01:19.92 bitrate= 724.9kbits/s speed=  16x elapsed=0:00:05.00
2026-02-25 22:37:46 WARN [ytdlp-runner][yt-dlp stderr] frame= 2517 fps=458 q=-1.0 size=    7450KiB time=00:01:24.00 bitrate= 726.5kbits/s speed=15.3x elapsed=0:00:05.50
2026-02-25 22:37:46 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=3.5 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.123x elapsed=0:00:17.00
2026-02-25 22:37:46 WARN [ytdlp-runner][ffmpeg stderr] frame= 2635 fps=479 q=-1.0 size=    7742KiB time=00:01:27.79 bitrate= 722.4kbits/s speed=  16x elapsed=0:00:05.50
2026-02-25 22:37:46 WARN [ytdlp-runner][yt-dlp stderr] frame= 2785 fps=464 q=-1.0 size=    8343KiB time=00:01:32.94 bitrate= 735.3kbits/s speed=15.5x elapsed=0:00:06.00
2026-02-25 22:37:46 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=3.4 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.119x elapsed=0:00:17.50
2026-02-25 22:37:46 WARN [ytdlp-runner][ffmpeg stderr] frame= 2875 fps=479 q=-1.0 size=    8619KiB time=00:01:35.85 bitrate= 736.6kbits/s speed=  16x elapsed=0:00:06.00
2026-02-25 22:37:47 WARN [ytdlp-runner][yt-dlp stderr] frame= 3057 fps=470 q=-1.0 size=    8995KiB time=00:01:42.02 bitrate= 722.3kbits/s speed=15.7x elapsed=0:00:06.50
2026-02-25 22:37:47 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=3.3 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.116x elapsed=0:00:18.00
2026-02-25 22:37:47 INFO [ytdlp-runner] Cliente desconectou (response-close), encerrando processos.
2026-02-25 22:37:47 INFO [ytdlp-runner] Cliente desconectou (request-close), encerrando processos.
2026-02-25 22:37:47 WARN [ytdlp-runner][yt-dlp stderr] frame= 3177 fps=454 q=-1.0 size=    9195KiB time=00:01:46.02 bitrate= 710.4kbits/s speed=15.1x elapsed=0:00:07.00
2026-02-25 22:37:47 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=3.2 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.113x elapsed=0:00:18.50
2026-02-25 22:37:48 WARN [ytdlp-runner][yt-dlp stderr] frame= 3177 fps=424 q=-1.0 size=    9195KiB time=00:01:46.02 bitrate= 710.4kbits/s speed=14.1x elapsed=0:00:07.50
2026-02-25 22:37:48 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=3.1 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.11x elapsed=0:00:19.00
2026-02-25 22:37:48 WARN [ytdlp-runner][yt-dlp stderr] frame= 3177 fps=397 q=-1.0 size=    9195KiB time=00:01:46.02 bitrate= 710.4kbits/s speed=13.3x elapsed=0:00:08.00
2026-02-25 22:37:48 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=3.0 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.107x elapsed=0:00:19.50
2026-02-25 22:37:49 WARN [ytdlp-runner][yt-dlp stderr] frame= 3177 fps=374 q=-1.0 size=    9195KiB time=00:01:46.02 bitrate= 710.4kbits/s speed=12.5x elapsed=0:00:08.50
2026-02-25 22:37:49 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.9 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.105x elapsed=0:00:20.00
2026-02-25 22:37:49 WARN [ytdlp-runner] Forçando SIGKILL em processos yt-dlp/ffmpeg para garantir limpeza.
2026-02-25 22:37:49 WARN [ytdlp-runner] Forçando SIGKILL em processos yt-dlp/ffmpeg para garantir limpeza.
2026-02-25 22:37:49 INFO [ytdlp-runner] ffmpeg finalizado com code=null
2026-02-25 22:37:49 WARN [ytdlp-runner][yt-dlp stderr] frame= 3177 fps=353 q=-1.0 size=    9195KiB time=00:01:46.02 bitrate= 710.4kbits/s speed=11.8x elapsed=0:00:09.00
2026-02-25 22:37:49 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.9 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.102x elapsed=0:00:20.50
2026-02-25 22:37:50 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=343 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=11.5x elapsed=0:00:09.50
2026-02-25 22:37:50 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.8 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0996x elapsed=0:00:21.00
2026-02-25 22:37:50 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=326 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=10.9x elapsed=0:00:10.00
2026-02-25 22:37:50 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.7 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0972x elapsed=0:00:21.50
2026-02-25 22:37:51 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=311 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=10.4x elapsed=0:00:10.50
2026-02-25 22:37:51 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.7 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.095x elapsed=0:00:22.00
2026-02-25 22:37:51 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=297 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=9.91x elapsed=0:00:11.00
2026-02-25 22:37:51 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.6 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0929x elapsed=0:00:22.50
2026-02-25 22:37:52 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=284 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=9.48x elapsed=0:00:11.50
2026-02-25 22:37:52 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.6 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0909x elapsed=0:00:23.00
2026-02-25 22:37:52 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=272 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=9.08x elapsed=0:00:12.00
2026-02-25 22:37:52 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.5 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.089x elapsed=0:00:23.50
2026-02-25 22:37:53 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=261 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=8.72x elapsed=0:00:12.50
2026-02-25 22:37:53 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.5 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0871x elapsed=0:00:24.00
2026-02-25 22:37:53 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=251 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=8.38x elapsed=0:00:13.00
2026-02-25 22:37:53 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.4 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0853x elapsed=0:00:24.50
2026-02-25 22:37:54 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=242 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=8.07x elapsed=0:00:13.50
2026-02-25 22:37:54 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.4 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0836x elapsed=0:00:25.00
2026-02-25 22:37:54 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=233 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=7.78x elapsed=0:00:14.00
2026-02-25 22:37:54 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.3 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.082x elapsed=0:00:25.50
2026-02-25 22:37:55 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=225 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=7.52x elapsed=0:00:14.50
2026-02-25 22:37:55 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.3 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0804x elapsed=0:00:26.00
2026-02-25 22:37:55 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=217 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=7.26x elapsed=0:00:15.00
2026-02-25 22:37:55 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.2 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0789x elapsed=0:00:26.50
2026-02-25 22:37:56 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=210 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=7.03x elapsed=0:00:15.50
2026-02-25 22:37:56 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.2 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0774x elapsed=0:00:27.00
2026-02-25 22:37:56 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=204 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=6.81x elapsed=0:00:16.00
2026-02-25 22:37:56 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.1 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.076x elapsed=0:00:27.50
2026-02-25 22:37:57 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=198 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed= 6.6x elapsed=0:00:16.50
2026-02-25 22:37:57 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.1 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0747x elapsed=0:00:28.00
2026-02-25 22:37:57 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=192 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=6.41x elapsed=0:00:17.00
2026-02-25 22:37:57 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.1 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0734x elapsed=0:00:28.50
2026-02-25 22:37:58 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=186 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=6.23x elapsed=0:00:17.50
2026-02-25 22:37:58 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.0 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0721x elapsed=0:00:29.00
2026-02-25 22:37:58 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=181 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=6.05x elapsed=0:00:18.00
2026-02-25 22:37:58 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.0 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0709x elapsed=0:00:29.50
2026-02-25 22:37:59 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=176 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=5.89x elapsed=0:00:18.50
2026-02-25 22:37:59 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=2.0 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0697x elapsed=0:00:30.00
2026-02-25 22:37:59 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=172 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=5.74x elapsed=0:00:19.00
2026-02-25 22:37:59 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=1.9 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0685x elapsed=0:00:30.50
2026-02-25 22:38:00 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=167 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=5.59x elapsed=0:00:19.50
2026-02-25 22:38:00 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=1.9 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0674x elapsed=0:00:31.00
2026-02-25 22:38:00 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=163 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=5.45x elapsed=0:00:20.00
2026-02-25 22:38:00 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=1.9 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0664x elapsed=0:00:31.50
2026-02-25 22:38:01 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=159 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=5.32x elapsed=0:00:20.50
2026-02-25 22:38:01 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=1.8 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0653x elapsed=0:00:32.00
2026-02-25 22:38:01 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=155 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=5.19x elapsed=0:00:21.00
2026-02-25 22:38:01 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=1.8 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0643x elapsed=0:00:32.50
2026-02-25 22:38:02 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=152 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=5.07x elapsed=0:00:21.50
2026-02-25 22:38:02 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=1.8 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0634x elapsed=0:00:33.00
2026-02-25 22:38:02 WARN [ytdlp-runner][yt-dlp stderr] frame= 3263 fps=148 q=-1.0 size=    9333KiB time=00:01:48.99 bitrate= 701.4kbits/s speed=4.95x elapsed=0:00:22.00
2026-02-25 22:38:02 WARN [ytdlp-runner][yt-dlp stderr] frame=   59 fps=1.8 q=-1.0 size=     144KiB time=00:00:02.09 bitrate= 566.0kbits/s speed=0.0624x elapsed=0:00:33.50
