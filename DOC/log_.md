2026-02-21 18:26:46 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-21 18:27:16 INFO [SmartPlayer] Requisição de stream: videoId=kRX_dNg4fVU
2026-02-21 18:27:16 INFO [SmartPlayer] Stream encontrado: videoId=kRX_dNg4fVU status=none
2026-02-21 18:27:16 INFO [SmartPlayer] Usando yt-dlp para videoId=kRX_dNg4fVU status=none
2026-02-21 18:27:16 INFO [ytdlp-runner] Iniciando yt-dlp: url=https://www.youtube.com/watch?v=kRX_dNg4fVU
2026-02-21 18:27:16 WARN [ytdlp-runner][ffmpeg stderr] ffmpeg version 8.0.1 Copyright (c) 2000-2025 the FFmpeg developers
  built with gcc 15.2.0 (Alpine 15.2.0)
  configuration: --prefix=/usr --disable-librtmp --disable-lzma --disable-static --disable-stripping --enable-avfilter --enable-gpl --enable-ladspa --enable-libaom --enable-libass --enable-libbluray --enable-libdav1d --enable-libdrm --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-libjxl --enable-libmp3lame --enable-libopenmpt --enable-libopus --enable-libplacebo --enable-libpulse --enable-librav1e --enable-librist --enable-libshaderc --enable-libsoxr --enable-libsrt --enable-libssh --enable-libtheora --enable-libv4l2 --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxcb --enable-libxml2 --enable-libxvid --enable-libzimg --enable-libzmq --enable-lto=auto --enable-lv2 --enable-openssl --enable-pic --enable-pthreads --enable-shared --enable-vaapi --enable-vdpau --enable-version3 --enable-vulkan --optflags=-O3 --enable-libsvtav1 --enable-libvpl
  libavutil      60.  8.100 / 60.  8.100
  libavcodec     62. 11.100 / 62. 11.100
  libavformat    62.  3.100 / 62.  3.100
  libavdevice    62.  1.100 / 62.  1.100
  libavfilter    11.  4.100 / 11.  4.100
  libswscale      9.  1.100 /  9.  1.100
  libswresample   6.  1.100 /  6.  1.100

2026-02-21 18:27:16 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-21 18:27:16 WARN [ytdlp-runner][yt-dlp stderr] [youtube] Extracting URL: https://www.youtube.com/watch?v=kRX_dNg4fVU

2026-02-21 18:27:16 WARN [ytdlp-runner][yt-dlp stderr] [youtube] kRX_dNg4fVU: Downloading webpage

2026-02-21 18:27:17 WARN [ytdlp-runner][yt-dlp stderr] WARNING: [youtube] No supported JavaScript runtime could be found. Only deno is enabled by default; to use another runtime add  --js-runtimes RUNTIME[:PATH]  to your command/config. YouTube extraction without a JS runtime has been deprecated, and some formats may be missing. See  https://github.com/yt-dlp/yt-dlp/wiki/EJS  for details on installing one

2026-02-21 18:27:17 WARN [ytdlp-runner][yt-dlp stderr] [youtube] kRX_dNg4fVU: Downloading android vr player API JSON

2026-02-21 18:27:17 WARN [ytdlp-runner][yt-dlp stderr] [info] kRX_dNg4fVU: Downloading 1 format(s): 137+140

2026-02-21 18:27:17 WARN [ytdlp-runner][yt-dlp stderr] [download] Destination: -

2026-02-21 18:27:18 WARN [ytdlp-runner][yt-dlp stderr] Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'https://rr4---sn-b8u-jfcy.googlevideo.com/videoplayback?expire=1771730837&ei=NSOaaYySKaqX-LAPraqx-Qs&ip=177.207.209.234&id=o-AFqDEbcLiYhWbinqaTI7PRHaiZXW1jnASzQUbjQVWYRL&itag=137&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=918&met=1771709237%2C&mh=u6&mm=31%2C29&mn=sn-b8u-jfcy%2Csn-bg0e6nll&ms=au%2Crdu&mv=m&mvi=4&pcm2cms=yes&pl=23&rms=au%2Cau&initcwndbps=2458750&bui=AVNa5-x5NG0-ZSooPEUTmsjn1Bl7OKL-gQp7Blb6CbxBMi88-ZQXwozTb8vS33NYvKhrlJJQsB5RiRzG&spc=6dlaFARoWUgP&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=583781929&dur=3284.999&lmt=1771649945363130&mt=1771708634&fvip=1&keepalive=yes&fexp=51552689%2C51565115%2C51565681%2C51580968&c=ANDROID_VR&txp=4432534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJEij0EwRQIhAMlQlFiwLc4eFta7JMvmPP8vwAW3MxU3E_YpJsTLpk4EAiAFt5bb2rIFmVLfO3Mueld466WO_CAZZSibcVfeeNw-GQ%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgKFT9IS07pRODMDsWq5mvj1zU4BkvED9emJ9NutS0Ua8CIBhzCXkEBoB2p8urV2ZPPPtJELgLKXYTRWRYIbRfxtBW':
  Metadata:
    major_brand     : dash
    minor_version   : 0
    compatible_brands: iso6avc1mp41
    creation_time   : 2026-02-21T04:41:10.000000Z
  Duration: 00:54:45.00, start: 0.000000, bitrate: 1421 kb/s

2026-02-21 18:27:18 WARN [ytdlp-runner][yt-dlp stderr]   Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], 1271 kb/s, 30 fps, 30 tbr, 15360 tbn (default)
    Metadata:
      creation_time   : 2026-02-21T04:41:10.000000Z
      handler_name    : ISO Media file produced by Google Inc.
      vendor_id       : [0][0][0][0]

2026-02-21 18:27:18 WARN [ytdlp-runner][yt-dlp stderr] Input #1, mov,mp4,m4a,3gp,3g2,mj2, from 'https://rr4---sn-b8u-jfcy.googlevideo.com/videoplayback?expire=1771730837&ei=NSOaaYySKaqX-LAPraqx-Qs&ip=177.207.209.234&id=o-AFqDEbcLiYhWbinqaTI7PRHaiZXW1jnASzQUbjQVWYRL&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=918&met=1771709237%2C&mh=u6&mm=31%2C29&mn=sn-b8u-jfcy%2Csn-bg0e6nll&ms=au%2Crdu&mv=m&mvi=4&pcm2cms=yes&pl=23&rms=au%2Cau&initcwndbps=2458750&bui=AVNa5-x5NG0-ZSooPEUTmsjn1Bl7OKL-gQp7Blb6CbxBMi88-ZQXwozTb8vS33NYvKhrlJJQsB5RiRzG&spc=6dlaFARoWUgP&vprv=1&svpuc=1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=53165999&dur=3285.066&lmt=1771649319532182&mt=1771708634&fvip=1&keepalive=yes&fexp=51552689%2C51565115%2C51565681%2C51580968&c=ANDROID_VR&txp=4432534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJEij0EwRQIgNcLl31A2kiA10uGQjvLbvFRqjSaJz5bBJb-JO93MxJUCIQDScT6WEzmCBFQ32pasFddwyw-v4dAPns8oSfGKAn_2jw%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgKFT9IS07pRODMDsWq5mvj1zU4BkvED9emJ9NutS0Ua8CIBhzCXkEBoB2p8urV2ZPPPtJELgLKXYTRWRYIbRfxtBW':
  Metadata:
    major_brand     : dash
    minor_version   : 0
    compatible_brands: iso6mp41
    creation_time   : 2026-02-21T04:44:47.000000Z
    encoder         : Google
  Duration: 00:54:45.07
2026-02-21 18:27:18 WARN [ytdlp-runner][yt-dlp stderr] , start: 0.000000, bitrate: 129 kb/s
  Stream #1:0[0x1](eng): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 128 kb/s (default)
    Metadata:
      creation_time   : 2026-02-21T04:44:47.000000Z
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
  Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], q=2-31, 1271 kb/s, 30 fps, 30 tbr, 90k tbn (default)
    Metadata:
      creation_time   : 2026-02-21T04:41:10.000000Z
      handler_name    : ISO Media file produced by Google Inc.
2026-02-21 18:27:18 WARN [ytdlp-runner][yt-dlp stderr]
      vendor_id       : [0][0][0][0]
  Stream #0:1(eng): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 128 kb/s (default)
    Metadata:
      creation_time   : 2026-02-21T04:44:47.000000Z
      handler_name    : ISO Media file produced by Google Inc.
      vendor_id       : [0][0][0][0]
Press [q] to stop, [?] for help

2026-02-21 18:27:19 WARN [ytdlp-runner][yt-dlp stderr] frame=   22 fps=0.0 q=-1.0 size=     148KiB time=00:00:00.58 bitrate=2083.1kbits/s speed=1.16x elapsed=0:00:00.50
2026-02-21 18:27:19 WARN [ytdlp-runner][yt-dlp stderr] frame=   83 fps= 83 q=-1.0 size=     540KiB time=00:00:02.60 bitrate=1702.0kbits/s speed= 2.6x elapsed=0:00:01.00
2026-02-21 18:27:20 WARN [ytdlp-runner][yt-dlp stderr] frame=   83 fps= 55 q=-1.0 size=     540KiB time=00:00:02.60 bitrate=1702.0kbits/s speed=1.73x elapsed=0:00:01.50
2026-02-21 18:27:20 WARN [ytdlp-runner][yt-dlp stderr] frame=  114 fps= 57 q=-1.0 size=     708KiB time=00:00:03.64 bitrate=1591.2kbits/s speed=1.82x elapsed=0:00:02.00
2026-02-21 18:27:21 WARN [ytdlp-runner][ffmpeg stderr] Input #0, mpegts, from 'fd:':
  Duration: N/A, start: 1.433333, bitrate: N/A
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x100]: Video: h264 (High) ([27][0][0][0] / 0x001B), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9],
2026-02-21 18:27:21 WARN [ytdlp-runner][ffmpeg stderr] 30 fps, 30 tbr, 90k tbn, start 1.433333
  Stream #0:1[0x101](eng): Audio: aac (LC) ([15][0][0][0] / 0x000F), 44100 Hz, stereo, fltp, 130 kb/s, start 1.433333
Stream mapping:
  Stream #0:0 -> #0:0 (copy)
  Stream #0:1 -> #0:1 (copy)
Output #0, mpegts, to 'pipe:1':
  Metadata:
    encoder         : Lavf62.3.100
  Stream #0:0: Video: h264 (High) ([27][0][0][0] / 0x001B), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], q=2-31, 30 fps, 30 tbr, 90k tbn
  Stream #0:1(eng): Audio: aac (LC) ([15][0][0][0] / 0x000F), 44100 Hz, stereo, fltp, 130 kb/s

2026-02-21 18:27:21 WARN [ytdlp-runner][yt-dlp stderr] frame=  175 fps= 70 q=-1.0 size=    1071KiB time=00:00:05.68 bitrate=1542.1kbits/s speed=2.27x elapsed=0:00:02.50
2026-02-21 18:27:21 WARN [ytdlp-runner][ffmpeg stderr] frame=  134 fps=0.0 q=-1.0 size=     836KiB time=00:00:04.48 bitrate=1529.0kbits/s speed=8.96x elapsed=0:00:00.50
2026-02-21 18:27:21 WARN [ytdlp-runner][yt-dlp stderr] frame=  175 fps= 58 q=-1.0 size=    1071KiB time=00:00:05.68 bitrate=1542.1kbits/s speed= 1.9x elapsed=0:00:03.00
2026-02-21 18:27:22 WARN [ytdlp-runner][ffmpeg stderr] frame=  200 fps=200 q=-1.0 size=    1190KiB time=00:00:06.63 bitrate=1469.2kbits/s speed=6.63x elapsed=0:00:01.00
2026-02-21 18:27:22 WARN [ytdlp-runner][yt-dlp stderr] frame=  237 fps= 68 q=-1.0 size=    1339KiB time=00:00:07.75 bitrate=1414.7kbits/s speed=2.22x elapsed=0:00:03.50
2026-02-21 18:27:22 WARN [ytdlp-runner][ffmpeg stderr] frame=  231 fps=154 q=-1.0 size=    1320KiB time=00:00:07.63 bitrate=1415.7kbits/s speed=5.09x elapsed=0:00:01.50
2026-02-21 18:27:22 WARN [ytdlp-runner][yt-dlp stderr] frame=  237 fps= 59 q=-1.0 size=    1339KiB time=00:00:07.75 bitrate=1414.7kbits/s speed=1.94x elapsed=0:00:04.00
2026-02-21 18:27:23 WARN [ytdlp-runner][ffmpeg stderr] frame=  262 fps=131 q=-1.0 size=    1480KiB time=00:00:08.61 bitrate=1407.9kbits/s speed=4.31x elapsed=0:00:02.00
2026-02-21 18:27:23 WARN [ytdlp-runner][yt-dlp stderr] frame=  298 fps= 66 q=-1.0 size=    1629KiB time=00:00:09.79 bitrate=1361.7kbits/s speed=2.18x elapsed=0:00:04.50
2026-02-21 18:27:23 WARN [ytdlp-runner][ffmpeg stderr] frame=  293 fps=117 q=-1.0 size=    1605KiB time=00:00:09.63 bitrate=1364.3kbits/s speed=3.85x elapsed=0:00:02.50
2026-02-21 18:27:23 WARN [ytdlp-runner][yt-dlp stderr] frame=  298 fps= 60 q=-1.0 size=    1629KiB time=00:00:09.79 bitrate=1361.7kbits/s speed=1.96x elapsed=0:00:05.00
2026-02-21 18:27:24 WARN [ytdlp-runner][ffmpeg stderr] frame=  351 fps=117 q=-1.0 size=    1940KiB time=00:00:11.63 bitrate=1366.0kbits/s speed=3.88x elapsed=0:00:03.00
2026-02-21 18:27:24 WARN [ytdlp-runner][yt-dlp stderr] frame=  356 fps= 65 q=-1.0 size=    1961KiB time=00:00:11.72 bitrate=1370.1kbits/s speed=2.13x elapsed=0:00:05.50
2026-02-21 18:27:24 WARN [ytdlp-runner][ffmpeg stderr] frame=  351 fps=100 q=-1.0 size=    1940KiB time=00:00:11.63 bitrate=1366.0kbits/s speed=3.32x elapsed=0:00:03.50
2026-02-21 18:27:24 WARN [ytdlp-runner][yt-dlp stderr] frame=  363 fps= 60 q=-1.0 size=    2007KiB time=00:00:12.06 bitrate=1362.6kbits/s speed=2.01x elapsed=0:00:06.00
2026-02-21 18:27:25 WARN [ytdlp-runner][ffmpeg stderr] frame=  382 fps= 95 q=-1.0 size=    2093KiB time=00:00:12.67 bitrate=1352.3kbits/s speed=3.17x elapsed=0:00:04.00
2026-02-21 18:27:25 WARN [ytdlp-runner][yt-dlp stderr] frame=  418 fps= 64 q=-1.0 size=    2291KiB time=00:00:13.76 bitrate=1362.8kbits/s speed=2.12x elapsed=0:00:06.50
2026-02-21 18:27:25 WARN [ytdlp-runner][ffmpeg stderr] frame=  412 fps= 92 q=-1.0 size=    2265KiB time=00:00:13.67 bitrate=1356.6kbits/s speed=3.04x elapsed=0:00:04.50
2026-02-21 18:27:25 WARN [ytdlp-runner][yt-dlp stderr] frame=  480 fps= 69 q=-1.0 size=    2641KiB time=00:00:15.83 bitrate=1366.1kbits/s speed=2.26x elapsed=0:00:07.00
2026-02-21 18:27:26 WARN [ytdlp-runner][ffmpeg stderr] frame=  474 fps= 95 q=-1.0 size=    2610KiB time=00:00:15.67 bitrate=1364.1kbits/s speed=3.13x elapsed=0:00:05.00
2026-02-21 18:27:26 WARN [ytdlp-runner][yt-dlp stderr] frame=  480 fps= 64 q=-1.0 size=    2641KiB time=00:00:15.83 bitrate=1366.1kbits/s speed=2.11x elapsed=0:00:07.50
2026-02-21 18:27:26 WARN [ytdlp-runner][ffmpeg stderr] frame=  474 fps= 86 q=-1.0 size=    2610KiB time=00:00:15.67 bitrate=1364.1kbits/s speed=2.85x elapsed=0:00:05.50
2026-02-21 18:27:26 WARN [ytdlp-runner][yt-dlp stderr] frame=  480 fps= 60 q=-1.0 size=    2641KiB time=00:00:15.83 bitrate=1366.1kbits/s speed=1.98x elapsed=0:00:08.00
2026-02-21 18:27:27 WARN [ytdlp-runner][ffmpeg stderr] frame=  535 fps= 89 q=-1.0 size=    2916KiB time=00:00:17.80 bitrate=1342.0kbits/s speed=2.97x elapsed=0:00:06.00
2026-02-21 18:27:27 WARN [ytdlp-runner][yt-dlp stderr] frame=  541 fps= 64 q=-1.0 size=    2928KiB time=00:00:17.87 bitrate=1341.7kbits/s speed= 2.1x elapsed=0:00:08.50
2026-02-21 18:27:27 WARN [ytdlp-runner][ffmpeg stderr] frame=  535 fps= 82 q=-1.0 size=    2916KiB time=00:00:17.80 bitrate=1342.0kbits/s speed=2.74x elapsed=0:00:06.50
2026-02-21 18:27:27 WARN [ytdlp-runner][yt-dlp stderr] frame=  541 fps= 60 q=-1.0 size=    2928KiB time=00:00:17.87 bitrate=1341.7kbits/s speed=1.99x elapsed=0:00:09.00
2026-02-21 18:27:28 WARN [ytdlp-runner][ffmpeg stderr] frame=  535 fps= 76 q=-1.0 size=    2916KiB time=00:00:17.80 bitrate=1342.0kbits/s speed=2.54x elapsed=0:00:07.00
2026-02-21 18:27:28 WARN [ytdlp-runner][yt-dlp stderr] frame=  602 fps= 63 q=-1.0 size=    3171KiB time=00:00:19.92 bitrate=1303.9kbits/s speed= 2.1x elapsed=0:00:09.50
2026-02-21 18:27:28 WARN [ytdlp-runner][ffmpeg stderr] frame=  596 fps= 79 q=-1.0 size=    3164KiB time=00:00:19.82 bitrate=1307.0kbits/s speed=2.64x elapsed=0:00:07.50
2026-02-21 18:27:28 WARN [ytdlp-runner][yt-dlp stderr] frame=  602 fps= 60 q=-1.0 size=    3171KiB time=00:00:19.92 bitrate=1303.9kbits/s speed=1.99x elapsed=0:00:10.00
2026-02-21 18:27:29 WARN [ytdlp-runner][ffmpeg stderr] frame=  596 fps= 74 q=-1.0 size=    3164KiB time=00:00:19.82 bitrate=1307.0kbits/s speed=2.48x elapsed=0:00:08.00
2026-02-21 18:27:29 WARN [ytdlp-runner][yt-dlp stderr] frame=  691 fps= 66 q=-1.0 size=    3583KiB time=00:00:22.87 bitrate=1283.3kbits/s speed=2.18x elapsed=0:00:10.50
2026-02-21 18:27:29 WARN [ytdlp-runner][ffmpeg stderr] frame=  685 fps= 81 q=-1.0 size=    3575KiB time=00:00:22.80 bitrate=1284.4kbits/s speed=2.68x elapsed=0:00:08.50
2026-02-21 18:27:29 WARN [ytdlp-runner][yt-dlp stderr] frame=  691 fps= 63 q=-1.0 size=    3583KiB time=00:00:22.87 bitrate=1283.3kbits/s speed=2.08x elapsed=0:00:11.00
2026-02-21 18:27:30 WARN [ytdlp-runner][ffmpeg stderr] frame=  685 fps= 76 q=-1.0 size=    3575KiB time=00:00:22.80 bitrate=1284.4kbits/s speed=2.53x elapsed=0:00:09.00
2026-02-21 18:27:30 WARN [ytdlp-runner][yt-dlp stderr] frame=  691 fps= 60 q=-1.0 size=    3583KiB time=00:00:22.87 bitrate=1283.3kbits/s speed=1.99x elapsed=0:00:11.50
2026-02-21 18:27:30 WARN [ytdlp-runner][ffmpeg stderr] frame=  747 fps= 79 q=-1.0 size=    4100KiB time=00:00:24.82 bitrate=1353.1kbits/s speed=2.61x elapsed=0:00:09.50
2026-02-21 18:27:30 WARN [ytdlp-runner][yt-dlp stderr] frame=  753 fps= 63 q=-1.0 size=    4129KiB time=00:00:24.93 bitrate=1356.4kbits/s speed=2.08x elapsed=0:00:12.00
2026-02-21 18:27:31 WARN [ytdlp-runner][ffmpeg stderr] frame=  747 fps= 75 q=-1.0 size=    4100KiB time=00:00:24.82 bitrate=1353.1kbits/s speed=2.48x elapsed=0:00:10.00
2026-02-21 18:27:31 WARN [ytdlp-runner][yt-dlp stderr] frame=  753 fps= 60 q=-1.0 size=    4129KiB time=00:00:24.93 bitrate=1356.4kbits/s speed=1.99x elapsed=0:00:12.50
2026-02-21 18:27:31 WARN [ytdlp-runner][ffmpeg stderr] frame=  747 fps= 71 q=-1.0 size=    4100KiB time=00:00:24.82 bitrate=1353.1kbits/s speed=2.36x elapsed=0:00:10.50
2026-02-21 18:27:31 WARN [ytdlp-runner][yt-dlp stderr] frame=  814 fps= 63 q=-1.0 size=    4693KiB time=00:00:26.98 bitrate=1424.9kbits/s speed=2.07x elapsed=0:00:13.00
2026-02-21 18:27:32 WARN [ytdlp-runner][ffmpeg stderr] frame=  808 fps= 73 q=-1.0 size=    4667KiB time=00:00:26.81 bitrate=1425.7kbits/s speed=2.44x elapsed=0:00:11.00
2026-02-21 18:27:32 WARN [ytdlp-runner][yt-dlp stderr] frame=  814 fps= 60 q=-1.0 size=    4693KiB time=00:00:26.98 bitrate=1424.9kbits/s speed=   2x elapsed=0:00:13.50
2026-02-21 18:27:32 WARN [ytdlp-runner][ffmpeg stderr] frame=  808 fps= 70 q=-1.0 size=    4667KiB time=00:00:26.81 bitrate=1425.7kbits/s speed=2.33x elapsed=0:00:11.50
2026-02-21 18:27:32 WARN [ytdlp-runner][yt-dlp stderr] frame=  903 fps= 64 q=-1.0 size=    5431KiB time=00:00:29.95 bitrate=1485.4kbits/s speed=2.14x elapsed=0:00:14.00
2026-02-21 18:27:33 WARN [ytdlp-runner][ffmpeg stderr] frame=  897 fps= 75 q=-1.0 size=    5408KiB time=00:00:29.81 bitrate=1486.1kbits/s speed=2.48x elapsed=0:00:12.00
2026-02-21 18:27:33 WARN [ytdlp-runner][yt-dlp stderr] frame=  903 fps= 62 q=-1.0 size=    5431KiB time=00:00:29.95 bitrate=1485.4kbits/s speed=2.06x elapsed=0:00:14.50
2026-02-21 18:27:33 WARN [ytdlp-runner][ffmpeg stderr] frame=  897 fps= 72 q=-1.0 size=    5408KiB time=00:00:29.81 bitrate=1486.1kbits/s speed=2.38x elapsed=0:00:12.50
2026-02-21 18:27:33 WARN [ytdlp-runner][yt-dlp stderr] frame=  903 fps= 60 q=-1.0 size=    5431KiB time=00:00:29.95 bitrate=1485.4kbits/s speed=   2x elapsed=0:00:15.00
2026-02-21 18:27:34 WARN [ytdlp-runner][ffmpeg stderr] frame=  958 fps= 74 q=-1.0 size=    5925KiB time=00:00:31.90 bitrate=1521.5kbits/s speed=2.45x elapsed=0:00:13.00
2026-02-21 18:27:34 WARN [ytdlp-runner][yt-dlp stderr] frame=  964 fps= 62 q=-1.0 size=    5942KiB time=00:00:31.97 bitrate=1522.5kbits/s speed=2.06x elapsed=0:00:15.50
2026-02-21 18:27:34 WARN [ytdlp-runner][ffmpeg stderr] frame=  958 fps= 71 q=-1.0 size=    5925KiB time=00:00:31.90 bitrate=1521.5kbits/s speed=2.36x elapsed=0:00:13.50
2026-02-21 18:27:34 WARN [ytdlp-runner][yt-dlp stderr] frame=  964 fps= 60 q=-1.0 size=    5942KiB time=00:00:31.97 bitrate=1522.5kbits/s speed=   2x elapsed=0:00:16.00
2026-02-21 18:27:35 WARN [ytdlp-runner][ffmpeg stderr] frame=  958 fps= 68 q=-1.0 size=    5925KiB time=00:00:31.90 bitrate=1521.5kbits/s speed=2.28x elapsed=0:00:14.00
2026-02-21 18:27:35 WARN [ytdlp-runner][yt-dlp stderr] frame= 1025 fps= 62 q=-1.0 size=    6342KiB time=00:00:34.01 bitrate=1527.4kbits/s speed=2.06x elapsed=0:00:16.50
2026-02-21 18:27:35 WARN [ytdlp-runner][ffmpeg stderr] frame= 1019 fps= 70 q=-1.0 size=    6321KiB time=00:00:33.92 bitrate=1526.3kbits/s speed=2.34x elapsed=0:00:14.50
2026-02-21 18:27:35 WARN [ytdlp-runner][yt-dlp stderr] frame= 1056 fps= 62 q=-1.0 size=    6542KiB time=00:00:35.06 bitrate=1528.6kbits/s speed=2.06x elapsed=0:00:17.00
2026-02-21 18:27:36 WARN [ytdlp-runner][ffmpeg stderr] frame= 1051 fps= 70 q=-1.0 size=    6502KiB time=00:00:34.92 bitrate=1525.2kbits/s speed=2.33x elapsed=0:00:15.00
2026-02-21 18:27:36 WARN [ytdlp-runner][yt-dlp stderr] frame= 1056 fps= 60 q=-1.0 size=    6542KiB time=00:00:35.06 bitrate=1528.6kbits/s speed=   2x elapsed=0:00:17.50
2026-02-21 18:27:36 WARN [ytdlp-runner][ffmpeg stderr] frame= 1051 fps= 68 q=-1.0 size=    6502KiB time=00:00:34.92 bitrate=1525.2kbits/s speed=2.25x elapsed=0:00:15.50
2026-02-21 18:27:36 WARN [ytdlp-runner][yt-dlp stderr] frame= 1086 fps= 60 q=-1.0 size=    6745KiB time=00:00:36.06 bitrate=1532.3kbits/s speed=   2x elapsed=0:00:18.00
2026-02-21 18:27:37 WARN [ytdlp-runner][ffmpeg stderr] frame= 1112 fps= 69 q=-1.0 size=    6888KiB time=00:00:36.94 bitrate=1527.5kbits/s speed=2.31x elapsed=0:00:16.00
2026-02-21 18:27:37 WARN [ytdlp-runner][yt-dlp stderr] frame= 1118 fps= 60 q=-1.0 size=    6993KiB time=00:00:37.10 bitrate=1543.8kbits/s speed=   2x elapsed=0:00:18.50
2026-02-21 18:27:37 WARN [ytdlp-runner][ffmpeg stderr] frame= 1142 fps= 69 q=-1.0 size=    7139KiB time=00:00:37.94 bitrate=1541.4kbits/s speed= 2.3x elapsed=0:00:16.50
2026-02-21 18:27:37 WARN [ytdlp-runner][yt-dlp stderr] frame= 1148 fps= 60 q=-1.0 size=    7171KiB time=00:00:38.10 bitrate=1541.6kbits/s speed=   2x elapsed=0:00:19.00
2026-02-21 18:27:38 WARN [ytdlp-runner][ffmpeg stderr] frame= 1142 fps= 67 q=-1.0 size=    7139KiB time=00:00:37.94 bitrate=1541.4kbits/s speed=2.23x elapsed=0:00:17.00
2026-02-21 18:27:38 WARN [ytdlp-runner][yt-dlp stderr] frame= 1179 fps= 60 q=-1.0 size=    7351KiB time=00:00:39.14 bitrate=1538.2kbits/s speed=2.01x elapsed=0:00:19.50
2026-02-21 18:27:38 WARN [ytdlp-runner][ffmpeg stderr] frame= 1173 fps= 67 q=-1.0 size=    7320KiB time=00:00:38.96 bitrate=1539.0kbits/s speed=2.23x elapsed=0:00:17.50
2026-02-21 18:27:38 WARN [ytdlp-runner][yt-dlp stderr] frame= 1237 fps= 62 q=-1.0 size=    7825KiB time=00:00:41.09 bitrate=1559.6kbits/s speed=2.05x elapsed=0:00:20.00
2026-02-21 18:27:39 WARN [ytdlp-runner][ffmpeg stderr] frame= 1232 fps= 68 q=-1.0 size=    7796KiB time=00:00:40.98 bitrate=1558.4kbits/s speed=2.28x elapsed=0:00:18.00
2026-02-21 18:27:39 WARN [ytdlp-runner][yt-dlp stderr] frame= 1237 fps= 60 q=-1.0 size=    7825KiB time=00:00:41.09 bitrate=1559.6kbits/s speed=   2x elapsed=0:00:20.50
2026-02-21 18:27:39 WARN [ytdlp-runner][ffmpeg stderr] frame= 1232 fps= 67 q=-1.0 size=    7796KiB time=00:00:40.98 bitrate=1558.4kbits/s speed=2.21x elapsed=0:00:18.50
2026-02-21 18:27:39 WARN [ytdlp-runner][yt-dlp stderr] frame= 1299 fps= 62 q=-1.0 size=    8294KiB time=00:00:43.14 bitrate=1575.0kbits/s speed=2.05x elapsed=0:00:21.00
2026-02-21 18:27:40 WARN [ytdlp-runner][ffmpeg stderr] frame= 1293 fps= 68 q=-1.0 size=    8244KiB time=00:00:42.98 bitrate=1571.3kbits/s speed=2.26x elapsed=0:00:19.00
2026-02-21 18:27:40 WARN [ytdlp-runner][yt-dlp stderr] frame= 1299 fps= 60 q=-1.0 size=    8294KiB time=00:00:43.14 bitrate=1575.0kbits/s speed=2.01x elapsed=0:00:21.50
2026-02-21 18:27:40 WARN [ytdlp-runner][ffmpeg stderr] frame= 1324 fps= 68 q=-1.0 size=    8502KiB time=00:00:44.10 bitrate=1579.3kbits/s speed=2.26x elapsed=0:00:19.50
2026-02-21 18:27:40 WARN [ytdlp-runner][yt-dlp stderr] frame= 1329 fps= 60 q=-1.0 size=    8528KiB time=00:00:44.16 bitrate=1581.9kbits/s speed=2.01x elapsed=0:00:22.00
2026-02-21 18:27:41 WARN [ytdlp-runner][ffmpeg stderr] frame= 1355 fps= 68 q=-1.0 size=    8786KiB time=00:00:45.09 bitrate=1596.1kbits/s speed=2.25x elapsed=0:00:20.00
2026-02-21 18:27:41 WARN [ytdlp-runner][yt-dlp stderr] frame= 1361 fps= 60 q=-1.0 size=    8802KiB time=00:00:45.20 bitrate=1595.0kbits/s speed=2.01x elapsed=0:00:22.50
2026-02-21 18:27:41 WARN [ytdlp-runner][ffmpeg stderr] frame= 1355 fps= 66 q=-1.0 size=    8786KiB time=00:00:45.09 bitrate=1596.1kbits/s speed= 2.2x elapsed=0:00:20.50
2026-02-21 18:27:41 WARN [ytdlp-runner][yt-dlp stderr] frame= 1391 fps= 60 q=-1.0 size=    9025KiB time=00:00:46.20 bitrate=1600.0kbits/s speed=2.01x elapsed=0:00:23.00
2026-02-21 18:27:42 WARN [ytdlp-runner][ffmpeg stderr] frame= 1385 fps= 66 q=-1.0 size=    9007KiB time=00:00:46.09 bitrate=1600.9kbits/s speed=2.19x elapsed=0:00:21.00
2026-02-21 18:27:42 WARN [ytdlp-runner][yt-dlp stderr] frame= 1453 fps= 62 q=-1.0 size=    9498KiB time=00:00:48.27 bitrate=1611.8kbits/s speed=2.05x elapsed=0:00:23.50
2026-02-21 18:27:42 WARN [ytdlp-runner][ffmpeg stderr] frame= 1447 fps= 67 q=-1.0 size=    9473KiB time=00:00:48.11 bitrate=1612.9kbits/s speed=2.24x elapsed=0:00:21.50
2026-02-21 18:27:42 WARN [ytdlp-runner][yt-dlp stderr] frame= 1453 fps= 61 q=-1.0 size=    9498KiB time=00:00:48.27 bitrate=1611.8kbits/s speed=2.01x elapsed=0:00:24.01
2026-02-21 18:27:43 WARN [ytdlp-runner][ffmpeg stderr] frame= 1447 fps= 66 q=-1.0 size=    9473KiB time=00:00:48.11 bitrate=1612.9kbits/s speed=2.19x elapsed=0:00:22.00
2026-02-21 18:27:43 WARN [ytdlp-runner][yt-dlp stderr] frame= 1511 fps= 62 q=-1.0 size=    9888KiB time=00:00:50.20 bitrate=1613.5kbits/s speed=2.05x elapsed=0:00:24.51
2026-02-21 18:27:43 WARN [ytdlp-runner][ffmpeg stderr] frame= 1505 fps= 67 q=-1.0 size=    9849KiB time=00:00:50.08 bitrate=1610.9kbits/s speed=2.23x elapsed=0:00:22.50
2026-02-21 18:27:43 WARN [ytdlp-runner][yt-dlp stderr] frame= 1511 fps= 60 q=-1.0 size=    9888KiB time=00:00:50.20 bitrate=1613.5kbits/s speed=2.01x elapsed=0:00:25.01
2026-02-21 18:27:44 WARN [ytdlp-runner][ffmpeg stderr] frame= 1505 fps= 65 q=-1.0 size=    9849KiB time=00:00:50.08 bitrate=1610.9kbits/s speed=2.18x elapsed=0:00:23.00
2026-02-21 18:27:44 WARN [ytdlp-runner][yt-dlp stderr] frame= 1511 fps= 59 q=-1.0 size=    9888KiB time=00:00:50.20 bitrate=1613.5kbits/s speed=1.97x elapsed=0:00:25.51
2026-02-21 18:27:44 WARN [ytdlp-runner][ffmpeg stderr] frame= 1566 fps= 67 q=-1.0 size=   10248KiB time=00:00:52.08 bitrate=1611.9kbits/s speed=2.22x elapsed=0:00:23.50
2026-02-21 18:27:44 WARN [ytdlp-runner][yt-dlp stderr] frame= 1572 fps= 60 q=-1.0 size=   10287KiB time=00:00:52.24 bitrate=1613.0kbits/s speed=2.01x elapsed=0:00:26.01
2026-02-21 18:27:45 WARN [ytdlp-runner][ffmpeg stderr] frame= 1566 fps= 65 q=-1.0 size=   10248KiB time=00:00:52.08 bitrate=1611.9kbits/s speed=2.17x elapsed=0:00:24.00
2026-02-21 18:27:45 WARN [ytdlp-runner][yt-dlp stderr] frame= 1572 fps= 59 q=-1.0 size=   10287KiB time=00:00:52.24 bitrate=1613.0kbits/s speed=1.97x elapsed=0:00:26.51
2026-02-21 18:27:45 WARN [ytdlp-runner][ffmpeg stderr] frame= 1627 fps= 66 q=-1.0 size=   10661KiB time=00:00:54.20 bitrate=1611.4kbits/s speed=2.21x elapsed=0:00:24.50
2026-02-21 18:27:45 WARN [ytdlp-runner][yt-dlp stderr] frame= 1633 fps= 60 q=-1.0 size=   10683KiB time=00:00:54.28 bitrate=1612.1kbits/s speed=2.01x elapsed=0:00:27.01
2026-02-21 18:27:46 WARN [ytdlp-runner][ffmpeg stderr] frame= 1627 fps= 65 q=-1.0 size=   10661KiB time=00:00:54.20 bitrate=1611.4kbits/s speed=2.17x elapsed=0:00:25.00
2026-02-21 18:27:46 WARN [ytdlp-runner][yt-dlp stderr] frame= 1664 fps= 60 q=-1.0 size=   10929KiB time=00:00:55.33 bitrate=1618.0kbits/s speed=2.01x elapsed=0:00:27.51
2026-02-21 18:27:46 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-21 18:27:46 WARN [ytdlp-runner][ffmpeg stderr] frame= 1689 fps= 66 q=-1.0 size=   11077KiB time=00:00:56.21 bitrate=1614.2kbits/s speed= 2.2x elapsed=0:00:25.51
2026-02-21 18:27:46 WARN [ytdlp-runner][yt-dlp stderr] frame= 1694 fps= 60 q=-1.0 size=   11177KiB time=00:00:56.33 bitrate=1625.4kbits/s speed=2.01x elapsed=0:00:28.01
2026-02-21 18:27:47 WARN [ytdlp-runner][ffmpeg stderr] frame= 1689 fps= 65 q=-1.0 size=   11077KiB time=00:00:56.21 bitrate=1614.2kbits/s speed=2.16x elapsed=0:00:26.01
2026-02-21 18:27:47 WARN [ytdlp-runner][yt-dlp stderr] frame= 1725 fps= 61 q=-1.0 size=   11381KiB time=00:00:57.35 bitrate=1625.6kbits/s speed=2.01x elapsed=0:00:28.51
2026-02-21 18:27:47 WARN [ytdlp-runner][ffmpeg stderr] frame= 1719 fps= 65 q=-1.0 size=   11362KiB time=00:00:57.21 bitrate=1626.8kbits/s speed=2.16x elapsed=0:00:26.51
2026-02-21 18:27:47 WARN [ytdlp-runner][yt-dlp stderr] frame= 1756 fps= 61 q=-1.0 size=   11604KiB time=00:00:58.39 bitrate=1627.8kbits/s speed=2.01x elapsed=0:00:29.01
2026-02-21 18:27:48 WARN [ytdlp-runner][ffmpeg stderr] frame= 1781 fps= 66 q=-1.0 size=   11765KiB time=00:00:59.33 bitrate=1624.3kbits/s speed= 2.2x elapsed=0:00:27.01
2026-02-21 18:27:48 WARN [ytdlp-runner][yt-dlp stderr] frame= 1787 fps= 61 q=-1.0 size=   11789KiB time=00:00:59.41 bitrate=1625.2kbits/s speed=2.01x elapsed=0:00:29.51
2026-02-21 18:27:48 WARN [ytdlp-runner][ffmpeg stderr] frame= 1809 fps= 66 q=-1.0 size=   11926KiB time=00:01:00.16 bitrate=1623.9kbits/s speed=2.19x elapsed=0:00:27.51
2026-02-21 18:27:48 WARN [ytdlp-runner][yt-dlp stderr] frame= 1814 fps= 60 q=-1.0 size=   11952KiB time=00:01:00.32 bitrate=1623.1kbits/s speed=2.01x elapsed=0:00:30.01
2026-02-21 18:27:49 WARN [ytdlp-runner][ffmpeg stderr] frame= 1839 fps= 66 q=-1.0 size=   12112KiB time=00:01:01.26 bitrate=1619.6kbits/s speed=2.19x elapsed=0:00:28.01
2026-02-21 18:27:49 WARN [ytdlp-runner][yt-dlp stderr] frame= 1845 fps= 60 q=-1.0 size=   12119KiB time=00:01:01.34 bitrate=1618.3kbits/s speed=2.01x elapsed=0:00:30.51
2026-02-21 18:27:49 WARN [ytdlp-runner][ffmpeg stderr] frame= 1839 fps= 65 q=-1.0 size=   12112KiB time=00:01:01.26 bitrate=1619.6kbits/s speed=2.15x elapsed=0:00:28.51
2026-02-21 18:27:49 WARN [ytdlp-runner][yt-dlp stderr] frame= 1845 fps= 59 q=-1.0 size=   12119KiB time=00:01:01.34 bitrate=1618.3kbits/s speed=1.98x elapsed=0:00:31.01
2026-02-21 18:27:50 WARN [ytdlp-runner][ffmpeg stderr] frame= 1870 fps= 64 q=-1.0 size=   12299KiB time=00:01:02.30 bitrate=1617.2kbits/s speed=2.15x elapsed=0:00:29.01
2026-02-21 18:27:50 WARN [ytdlp-runner][yt-dlp stderr] frame= 1876 fps= 60 q=-1.0 size=   12318KiB time=00:01:02.36 bitrate=1617.9kbits/s speed=1.98x elapsed=0:00:31.51
2026-02-21 18:27:50 WARN [ytdlp-runner][ffmpeg stderr] frame= 1931 fps= 65 q=-1.0 size=   12831KiB time=00:01:04.31 bitrate=1634.2kbits/s speed=2.18x elapsed=0:00:29.51
2026-02-21 18:27:50 WARN [ytdlp-runner][yt-dlp stderr] frame= 1937 fps= 61 q=-1.0 size=   12857KiB time=00:01:04.41 bitrate=1635.2kbits/s speed=2.01x elapsed=0:00:32.01
2026-02-21 18:27:51 WARN [ytdlp-runner][ffmpeg stderr] frame= 1931 fps= 64 q=-1.0 size=   12831KiB time=00:01:04.31 bitrate=1634.2kbits/s speed=2.14x elapsed=0:00:30.01
2026-02-21 18:27:51 WARN [ytdlp-runner][yt-dlp stderr] frame= 1968 fps= 61 q=-1.0 size=   13123KiB time=00:01:05.45 bitrate=1642.4kbits/s speed=2.01x elapsed=0:00:32.51
2026-02-21 18:27:51 WARN [ytdlp-runner][ffmpeg stderr] frame= 1963 fps= 64 q=-1.0 size=   13078KiB time=00:01:05.29 bitrate=1640.8kbits/s speed=2.14x elapsed=0:00:30.51
2026-02-21 18:27:51 WARN [ytdlp-runner][yt-dlp stderr] frame= 1968 fps= 60 q=-1.0 size=   13123KiB time=00:01:05.45 bitrate=1642.4kbits/s speed=1.98x elapsed=0:00:33.01
2026-02-21 18:27:52 WARN [ytdlp-runner][ffmpeg stderr] frame= 1992 fps= 64 q=-1.0 size=   13352KiB time=00:01:06.36 bitrate=1648.2kbits/s speed=2.14x elapsed=0:00:31.01
2026-02-21 18:27:52 WARN [ytdlp-runner][yt-dlp stderr] frame= 1998 fps= 60 q=-1.0 size=   13359KiB time=00:01:06.45 bitrate=1646.8kbits/s speed=1.98x elapsed=0:00:33.51
2026-02-21 18:27:52 WARN [ytdlp-runner][ffmpeg stderr] frame= 2044 fps= 65 q=-1.0 size=   13739KiB time=00:01:08.10 bitrate=1652.7kbits/s speed=2.16x elapsed=0:00:31.51
2026-02-21 18:27:52 WARN [ytdlp-runner][yt-dlp stderr] frame= 2060 fps= 61 q=-1.0 size=   13840KiB time=00:01:08.52 bitrate=1654.6kbits/s speed=2.01x elapsed=0:00:34.01
2026-02-21 18:27:53 WARN [ytdlp-runner][ffmpeg stderr] frame= 2054 fps= 64 q=-1.0 size=   13820KiB time=00:01:08.43 bitrate=1654.4kbits/s speed=2.14x elapsed=0:00:32.01
2026-02-21 18:27:53 WARN [ytdlp-runner][yt-dlp stderr] frame= 2072 fps= 60 q=-1.0 size=   13938KiB time=00:01:09.03 bitrate=1654.0kbits/s speed=   2x elapsed=0:00:34.51
2026-02-21 18:27:53 WARN [ytdlp-runner][ffmpeg stderr] frame= 2082 fps= 64 q=-1.0 size=   14117KiB time=00:01:09.28 bitrate=1669.1kbits/s speed=2.13x elapsed=0:00:32.51
2026-02-21 18:27:53 WARN [ytdlp-runner][yt-dlp stderr] frame= 2097 fps= 60 q=-1.0 size=   14258KiB time=00:01:09.86 bitrate=1671.8kbits/s speed=   2x elapsed=0:00:35.01
2026-02-21 18:27:54 WARN [ytdlp-runner][ffmpeg stderr] frame= 2101 fps= 64 q=-1.0 size=   14264KiB time=00:01:09.93 bitrate=1670.7kbits/s speed=2.12x elapsed=0:00:33.01
2026-02-21 18:27:54 WARN [ytdlp-runner][yt-dlp stderr] frame= 2118 fps= 60 q=-1.0 size=   14414KiB time=00:01:10.44 bitrate=1676.1kbits/s speed=1.98x elapsed=0:00:35.51
2026-02-21 18:27:54 WARN [ytdlp-runner][ffmpeg stderr] frame= 2125 fps= 63 q=-1.0 size=   14498KiB time=00:01:10.77 bitrate=1678.1kbits/s speed=2.11x elapsed=0:00:33.51
2026-02-21 18:27:54 WARN [ytdlp-runner][yt-dlp stderr] frame= 2141 fps= 59 q=-1.0 size=   14631KiB time=00:01:11.33 bitrate=1680.2kbits/s speed=1.98x elapsed=0:00:36.01
2026-02-21 18:27:55 WARN [ytdlp-runner][ffmpeg stderr] frame= 2151 fps= 63 q=-1.0 size=   14691KiB time=00:01:11.61 bitrate=1680.6kbits/s speed=2.11x elapsed=0:00:34.01
2026-02-21 18:27:55 WARN [ytdlp-runner][yt-dlp stderr] frame= 2170 fps= 59 q=-1.0 size=   14841KiB time=00:01:12.30 bitrate=1681.6kbits/s speed=1.98x elapsed=0:00:36.51
2026-02-21 18:27:55 WARN [ytdlp-runner][ffmpeg stderr] frame= 2183 fps= 63 q=-1.0 size=   14909KiB time=00:01:12.60 bitrate=1682.1kbits/s speed= 2.1x elapsed=0:00:34.51
2026-02-21 18:27:55 WARN [ytdlp-runner][yt-dlp stderr] frame= 2196 fps= 59 q=-1.0 size=   15039KiB time=00:01:13.16 bitrate=1683.8kbits/s speed=1.98x elapsed=0:00:37.01
2026-02-21 18:27:56 WARN [ytdlp-runner][ffmpeg stderr] frame= 2202 fps= 63 q=-1.0 size=   15075KiB time=00:01:13.28 bitrate=1685.2kbits/s speed=2.09x elapsed=0:00:35.01
2026-02-21 18:27:56 WARN [ytdlp-runner][yt-dlp stderr] frame= 2221 fps= 59 q=-1.0 size=   15243KiB time=00:01:14.00 bitrate=1687.4kbits/s speed=1.97x elapsed=0:00:37.51
2026-02-21 18:27:56 WARN [ytdlp-runner][ffmpeg stderr] frame= 2229 fps= 63 q=-1.0 size=   15302KiB time=00:01:14.25 bitrate=1688.1kbits/s speed=2.09x elapsed=0:00:35.51
2026-02-21 18:27:56 WARN [ytdlp-runner][yt-dlp stderr] frame= 2249 fps= 59 q=-1.0 size=   15460KiB time=00:01:14.93 bitrate=1690.2kbits/s speed=1.97x elapsed=0:00:38.01
2026-02-21 18:27:57 WARN [ytdlp-runner][ffmpeg stderr] frame= 2258 fps= 63 q=-1.0 size=   15525KiB time=00:01:15.23 bitrate=1690.5kbits/s speed=2.09x elapsed=0:00:36.01
2026-02-21 18:27:57 WARN [ytdlp-runner][yt-dlp stderr] frame= 2262 fps= 59 q=-1.0 size=   15542KiB time=00:01:15.36 bitrate=1689.3kbits/s speed=1.96x elapsed=0:00:38.51
2026-02-21 18:27:57 WARN [ytdlp-runner][ffmpeg stderr] frame= 2272 fps= 62 q=-1.0 size=   15684KiB time=00:01:15.58 bitrate=1700.0kbits/s speed=2.07x elapsed=0:00:36.51
2026-02-21 18:27:57 WARN [ytdlp-runner][yt-dlp stderr] frame= 2289 fps= 59 q=-1.0 size=   15836KiB time=00:01:16.26 bitrate=1701.0kbits/s speed=1.95x elapsed=0:00:39.01
2026-02-21 18:27:58 WARN [ytdlp-runner][ffmpeg stderr] frame= 2294 fps= 62 q=-1.0 size=   15872KiB time=00:01:16.41 bitrate=1701.5kbits/s speed=2.06x elapsed=0:00:37.01
2026-02-21 18:27:58 WARN [ytdlp-runner][yt-dlp stderr] frame= 2313 fps= 59 q=-1.0 size=   16036KiB time=00:01:17.06 bitrate=1704.6kbits/s speed=1.95x elapsed=0:00:39.51
2026-02-21 18:27:58 WARN [ytdlp-runner][ffmpeg stderr] frame= 2319 fps= 62 q=-1.0 size=   16075KiB time=00:01:17.22 bitrate=1705.1kbits/s speed=2.06x elapsed=0:00:37.51
2026-02-21 18:27:58 WARN [ytdlp-runner][yt-dlp stderr] frame= 2334 fps= 58 q=-1.0 size=   16215KiB time=00:01:17.76 bitrate=1708.1kbits/s speed=1.94x elapsed=0:00:40.01
2026-02-21 18:27:59 WARN [ytdlp-runner][ffmpeg stderr] frame= 2345 fps= 62 q=-1.0 size=   16288KiB time=00:01:18.04 bitrate=1709.8kbits/s speed=2.05x elapsed=0:00:38.01
2026-02-21 18:27:59 WARN [ytdlp-runner][yt-dlp stderr] frame= 2360 fps= 58 q=-1.0 size=   16400KiB time=00:01:18.63 bitrate=1708.5kbits/s speed=1.94x elapsed=0:00:40.51
2026-02-21 18:27:59 WARN [ytdlp-runner][ffmpeg stderr] frame= 2367 fps= 61 q=-1.0 size=   16482KiB time=00:01:18.86 bitrate=1712.0kbits/s speed=2.05x elapsed=0:00:38.51
2026-02-21 18:27:59 WARN [ytdlp-runner][yt-dlp stderr] frame= 2386 fps= 58 q=-1.0 size=   16611KiB time=00:01:19.50 bitrate=1711.7kbits/s speed=1.94x elapsed=0:00:41.01
2026-02-21 18:28:00 WARN [ytdlp-runner][ffmpeg stderr] frame= 2409 fps= 62 q=-1.0 size=   16703KiB time=00:01:20.17 bitrate=1706.5kbits/s speed=2.06x elapsed=0:00:39.01
2026-02-21 18:28:00 WARN [ytdlp-runner][yt-dlp stderr] frame= 2444 fps= 59 q=-1.0 size=   16845KiB time=00:01:21.43 bitrate=1694.6kbits/s speed=1.96x elapsed=0:00:41.51
2026-02-21 18:28:00 WARN [ytdlp-runner][ffmpeg stderr] frame= 2466 fps= 62 q=-1.0 size=   16923KiB time=00:01:22.15 bitrate=1687.5kbits/s speed=2.08x elapsed=0:00:39.51
2026-02-21 18:28:00 WARN [ytdlp-runner][yt-dlp stderr] frame= 2494 fps= 59 q=-1.0 size=   17047KiB time=00:01:23.10 bitrate=1680.5kbits/s speed=1.98x elapsed=0:00:42.01
2026-02-21 18:28:01 WARN [ytdlp-runner][ffmpeg stderr] frame= 2509 fps= 63 q=-1.0 size=   17119KiB time=00:01:23.63 bitrate=1676.8kbits/s speed=2.09x elapsed=0:00:40.01
2026-02-21 18:28:01 WARN [ytdlp-runner][yt-dlp stderr] frame= 2540 fps= 60 q=-1.0 size=   17277KiB time=00:01:24.63 bitrate=1672.4kbits/s speed=1.99x elapsed=0:00:42.51
2026-02-21 18:28:01 WARN [ytdlp-runner][ffmpeg stderr] frame= 2548 fps= 63 q=-1.0 size=   17303KiB time=00:01:24.79 bitrate=1671.6kbits/s speed=2.09x elapsed=0:00:40.51
2026-02-21 18:28:01 WARN [ytdlp-runner][yt-dlp stderr] frame= 2572 fps= 60 q=-1.0 size=   17470KiB time=00:01:25.70 bitrate=1669.9kbits/s speed=1.99x elapsed=0:00:43.01
2026-02-21 18:28:02 WARN [ytdlp-runner][ffmpeg stderr] frame= 2589 fps= 63 q=-1.0 size=   17531KiB time=00:01:26.26 bitrate=1664.9kbits/s speed= 2.1x elapsed=0:00:41.01
2026-02-21 18:28:02 WARN [ytdlp-runner][yt-dlp stderr] frame= 2606 fps= 60 q=-1.0 size=   17592KiB time=00:01:26.72 bitrate=1661.7kbits/s speed=1.99x elapsed=0:00:43.51
2026-02-21 18:28:02 WARN [ytdlp-runner][ffmpeg stderr] frame= 2645 fps= 64 q=-1.0 size=   17763KiB time=00:01:28.09 bitrate=1651.8kbits/s speed=2.12x elapsed=0:00:41.51
2026-02-21 18:28:02 WARN [ytdlp-runner][yt-dlp stderr] frame= 2668 fps= 61 q=-1.0 size=   17854KiB time=00:01:28.76 bitrate=1647.7kbits/s speed=2.02x elapsed=0:00:44.01
2026-02-21 18:28:03 WARN [ytdlp-runner][ffmpeg stderr] frame= 2662 fps= 63 q=-1.0 size=   17849KiB time=00:01:28.70 bitrate=1648.5kbits/s speed=2.11x elapsed=0:00:42.01
2026-02-21 18:28:03 WARN [ytdlp-runner][yt-dlp stderr] frame= 2668 fps= 60 q=-1.0 size=   17854KiB time=00:01:28.76 bitrate=1647.7kbits/s speed=1.99x elapsed=0:00:44.51
2026-02-21 18:28:03 WARN [ytdlp-runner][ffmpeg stderr] frame= 2709 fps= 64 q=-1.0 size=   18177KiB time=00:01:30.23 bitrate=1650.2kbits/s speed=2.12x elapsed=0:00:42.51
2026-02-21 18:28:03 WARN [ytdlp-runner][yt-dlp stderr] frame= 2721 fps= 60 q=-1.0 size=   18282KiB time=00:01:30.66 bitrate=1651.9kbits/s speed=2.01x elapsed=0:00:45.01
2026-02-21 18:28:04 WARN [ytdlp-runner][ffmpeg stderr] frame= 2720 fps= 63 q=-1.0 size=   18263KiB time=00:01:30.55 bitrate=1652.1kbits/s speed=2.11x elapsed=0:00:43.01
2026-02-21 18:28:04 WARN [ytdlp-runner][yt-dlp stderr] frame= 2725 fps= 60 q=-1.0 size=   18307KiB time=00:01:30.69 bitrate=1653.6kbits/s speed=1.99x elapsed=0:00:45.51
2026-02-21 18:28:04 WARN [ytdlp-runner][ffmpeg stderr] frame= 2752 fps= 63 q=-1.0 size=   18528KiB time=00:01:31.70 bitrate=1655.2kbits/s speed=2.11x elapsed=0:00:43.51
2026-02-21 18:28:04 WARN [ytdlp-runner][yt-dlp stderr] frame= 2771 fps= 60 q=-1.0 size=   18699KiB time=00:01:32.33 bitrate=1659.0kbits/s speed=2.01x elapsed=0:00:46.01
2026-02-21 18:28:05 WARN [ytdlp-runner][ffmpeg stderr] frame= 2779 fps= 63 q=-1.0 size=   18760KiB time=00:01:32.55 bitrate=1660.4kbits/s speed= 2.1x elapsed=0:00:44.01
2026-02-21 18:28:05 WARN [ytdlp-runner][yt-dlp stderr] frame= 2787 fps= 60 q=-1.0 size=   18807KiB time=00:01:32.74 bitrate=1661.3kbits/s speed=1.99x elapsed=0:00:46.51
2026-02-21 18:28:05 WARN [ytdlp-runner][ffmpeg stderr] frame= 2781 fps= 62 q=-1.0 size=   18784KiB time=00:01:32.66 bitrate=1660.6kbits/s speed=2.08x elapsed=0:00:44.51
2026-02-21 18:28:05 WARN [ytdlp-runner][yt-dlp stderr] frame= 2818 fps= 60 q=-1.0 size=   19073KiB time=00:01:33.90 bitrate=1664.0kbits/s speed=   2x elapsed=0:00:47.01
2026-02-21 18:28:06 WARN [ytdlp-runner][ffmpeg stderr] frame= 2806 fps= 62 q=-1.0 size=   18963KiB time=00:01:33.55 bitrate=1660.5kbits/s speed=2.08x elapsed=0:00:45.01
2026-02-21 18:28:06 WARN [ytdlp-runner][yt-dlp stderr] frame= 2848 fps= 60 q=-1.0 size=   19290KiB time=00:01:34.80 bitrate=1666.8kbits/s speed=   2x elapsed=0:00:47.51
2026-02-21 18:28:06 WARN [ytdlp-runner][ffmpeg stderr] frame= 2846 fps= 63 q=-1.0 size=   19290KiB time=00:01:34.89 bitrate=1665.2kbits/s speed=2.08x elapsed=0:00:45.51
2026-02-21 18:28:06 WARN [ytdlp-runner][yt-dlp stderr] frame= 2871 fps= 60 q=-1.0 size=   19492KiB time=00:01:35.66 bitrate=1669.1kbits/s speed=1.99x elapsed=0:00:48.02
2026-02-21 18:28:07 WARN [ytdlp-runner][ffmpeg stderr] frame= 2879 fps= 63 q=-1.0 size=   19531KiB time=00:01:35.85 bitrate=1669.2kbits/s speed=2.08x elapsed=0:00:46.01
2026-02-21 18:28:07 WARN [ytdlp-runner][yt-dlp stderr] frame= 2896 fps= 60 q=-1.0 size=   19676KiB time=00:01:36.50 bitrate=1670.3kbits/s speed=1.99x elapsed=0:00:48.52
2026-02-21 18:28:07 WARN [ytdlp-runner][ffmpeg stderr] frame= 2907 fps= 62 q=-1.0 size=   19725KiB time=00:01:36.85 bitrate=1668.4kbits/s speed=2.08x elapsed=0:00:46.51
2026-02-21 18:28:07 WARN [ytdlp-runner][yt-dlp stderr] frame= 2913 fps= 59 q=-1.0 size=   19882KiB time=00:01:37.06 bitrate=1678.0kbits/s speed=1.98x elapsed=0:00:49.02
2026-02-21 18:28:08 WARN [ytdlp-runner][ffmpeg stderr] frame= 2919 fps= 62 q=-1.0 size=   19913KiB time=00:01:37.17 bitrate=1678.7kbits/s speed=2.07x elapsed=0:00:47.01
2026-02-21 18:28:08 WARN [ytdlp-runner][yt-dlp stderr] frame= 2935 fps= 59 q=-1.0 size=   20057KiB time=00:01:37.80 bitrate=1680.1kbits/s speed=1.97x elapsed=0:00:49.52
2026-02-21 18:28:08 WARN [ytdlp-runner][ffmpeg stderr] frame= 2942 fps= 62 q=-1.0 size=   20117KiB time=00:01:38.01 bitrate=1681.4kbits/s speed=2.06x elapsed=0:00:47.51
2026-02-21 18:28:08 WARN [ytdlp-runner][yt-dlp stderr] frame= 2961 fps= 59 q=-1.0 size=   20263KiB time=00:01:38.66 bitrate=1682.4kbits/s speed=1.97x elapsed=0:00:50.02
2026-02-21 18:28:09 WARN [ytdlp-runner][ffmpeg stderr] frame= 2968 fps= 62 q=-1.0 size=   20314KiB time=00:01:38.82 bitrate=1683.9kbits/s speed=2.06x elapsed=0:00:48.01
2026-02-21 18:28:09 WARN [ytdlp-runner][yt-dlp stderr] frame= 2983 fps= 59 q=-1.0 size=   20441KiB time=00:01:39.40 bitrate=1684.6kbits/s speed=1.97x elapsed=0:00:50.52
2026-02-21 18:28:09 WARN [ytdlp-runner][ffmpeg stderr] frame= 2995 fps= 62 q=-1.0 size=   20523KiB time=00:01:39.79 bitrate=1684.6kbits/s speed=2.06x elapsed=0:00:48.51
2026-02-21 18:28:09 WARN [ytdlp-runner][yt-dlp stderr] frame= 3014 fps= 59 q=-1.0 size=   20685KiB time=00:01:40.43 bitrate=1687.2kbits/s speed=1.97x elapsed=0:00:51.02
2026-02-21 18:28:10 WARN [ytdlp-runner][ffmpeg stderr] frame= 3024 fps= 62 q=-1.0 size=   20741KiB time=00:01:40.76 bitrate=1686.1kbits/s speed=2.06x elapsed=0:00:49.01
2026-02-21 18:28:10 WARN [ytdlp-runner][yt-dlp stderr] frame= 3039 fps= 59 q=-1.0 size=   20867KiB time=00:01:41.26 bitrate=1688.0kbits/s speed=1.97x elapsed=0:00:51.52
2026-02-21 18:28:10 WARN [ytdlp-runner][ffmpeg stderr] frame= 3045 fps= 61 q=-1.0 size=   20912KiB time=00:01:41.42 bitrate=1689.0kbits/s speed=2.05x elapsed=0:00:49.51
2026-02-21 18:28:10 WARN [ytdlp-runner][yt-dlp stderr] frame= 3060 fps= 59 q=-1.0 size=   21044KiB time=00:01:41.96 bitrate=1690.7kbits/s speed=1.96x elapsed=0:00:52.02
2026-02-21 18:28:11 WARN [ytdlp-runner][ffmpeg stderr] frame= 3069 fps= 61 q=-1.0 size=   21107KiB time=00:01:42.26 bitrate=1690.9kbits/s speed=2.04x elapsed=0:00:50.02
2026-02-21 18:28:11 WARN [ytdlp-runner][yt-dlp stderr] frame= 3087 fps= 59 q=-1.0 size=   21268KiB time=00:01:42.86 bitrate=1693.7kbits/s speed=1.96x elapsed=0:00:52.52
2026-02-21 18:28:11 WARN [ytdlp-runner][ffmpeg stderr] frame= 3091 fps= 61 q=-1.0 size=   21286KiB time=00:01:42.91 bitrate=1694.4kbits/s speed=2.04x elapsed=0:00:50.52
2026-02-21 18:28:11 WARN [ytdlp-runner][yt-dlp stderr] frame= 3108 fps= 59 q=-1.0 size=   21407KiB time=00:01:43.56 bitrate=1693.3kbits/s speed=1.95x elapsed=0:00:53.02
2026-02-21 18:28:12 WARN [ytdlp-runner][ffmpeg stderr] frame= 3127 fps= 61 q=-1.0 size=   21528KiB time=00:01:44.07 bitrate=1694.6kbits/s speed=2.04x elapsed=0:00:51.02
2026-02-21 18:28:12 WARN [ytdlp-runner][yt-dlp stderr] frame= 3138 fps= 59 q=-1.0 size=   21633KiB time=00:01:44.56 bitrate=1694.8kbits/s speed=1.95x elapsed=0:00:53.52
2026-02-21 18:28:12 WARN [ytdlp-runner][ffmpeg stderr] frame= 3151 fps= 61 q=-1.0 size=   21709KiB time=00:01:44.90 bitrate=1695.2kbits/s speed=2.04x elapsed=0:00:51.52
2026-02-21 18:28:12 WARN [ytdlp-runner][yt-dlp stderr] frame= 3174 fps= 59 q=-1.0 size=   21858KiB time=00:01:45.76 bitrate=1692.9kbits/s speed=1.96x elapsed=0:00:54.02
2026-02-21 18:28:13 WARN [ytdlp-runner][ffmpeg stderr] frame= 3189 fps= 61 q=-1.0 size=   21915KiB time=00:01:46.20 bitrate=1690.3kbits/s speed=2.04x elapsed=0:00:52.02
2026-02-21 18:28:13 WARN [ytdlp-runner][yt-dlp stderr] frame= 3217 fps= 59 q=-1.0 size=   22069KiB time=00:01:47.20 bitrate=1686.5kbits/s speed=1.97x elapsed=0:00:54.52
2026-02-21 18:28:13 WARN [ytdlp-runner][ffmpeg stderr] frame= 3231 fps= 62 q=-1.0 size=   22120KiB time=00:01:47.55 bitrate=1684.8kbits/s speed=2.05x elapsed=0:00:52.52
2026-02-21 18:28:13 WARN [ytdlp-runner][yt-dlp stderr] frame= 3254 fps= 59 q=-1.0 size=   22267KiB time=00:01:48.43 bitrate=1682.2kbits/s speed=1.97x elapsed=0:00:55.02
2026-02-21 18:28:14 WARN [ytdlp-runner][ffmpeg stderr] frame= 3268 fps= 62 q=-1.0 size=   22340KiB time=00:01:48.90 bitrate=1680.5kbits/s speed=2.05x elapsed=0:00:53.02
2026-02-21 18:28:14 WARN [ytdlp-runner][yt-dlp stderr] frame= 3291 fps= 59 q=-1.0 size=   22476KiB time=00:01:49.66 bitrate=1678.9kbits/s speed=1.98x elapsed=0:00:55.52
2026-02-21 18:28:14 WARN [ytdlp-runner][ffmpeg stderr] frame= 3299 fps= 62 q=-1.0 size=   22516KiB time=00:01:49.87 bitrate=1678.7kbits/s speed=2.05x elapsed=0:00:53.52
2026-02-21 18:28:14 WARN [ytdlp-runner][yt-dlp stderr] frame= 3323 fps= 59 q=-1.0 size=   22696KiB time=00:01:50.73 bitrate=1679.0kbits/s speed=1.98x elapsed=0:00:56.02
2026-02-21 18:28:15 WARN [ytdlp-runner][ffmpeg stderr] frame= 3336 fps= 62 q=-1.0 size=   22746KiB time=00:01:51.08 bitrate=1677.4kbits/s speed=2.06x elapsed=0:00:54.02
2026-02-21 18:28:15 WARN [ytdlp-runner][yt-dlp stderr] frame= 3358 fps= 59 q=-1.0 size=   22884KiB time=00:01:51.90 bitrate=1675.3kbits/s speed=1.98x elapsed=0:00:56.52
2026-02-21 18:28:15 WARN [ytdlp-runner][ffmpeg stderr] frame= 3368 fps= 62 q=-1.0 size=   22962KiB time=00:01:52.22 bitrate=1676.2kbits/s speed=2.06x elapsed=0:00:54.52
2026-02-21 18:28:15 WARN [ytdlp-runner][yt-dlp stderr] frame= 3392 fps= 59 q=-1.0 size=   23096KiB time=00:01:53.03 bitrate=1673.9kbits/s speed=1.98x elapsed=0:00:57.02
2026-02-21 18:28:16 WARN [ytdlp-runner][ffmpeg stderr] frame= 3403 fps= 62 q=-1.0 size=   23158KiB time=00:01:53.35 bitrate=1673.5kbits/s speed=2.06x elapsed=0:00:55.02
2026-02-21 18:28:16 WARN [ytdlp-runner][yt-dlp stderr] frame= 3426 fps= 60 q=-1.0 size=   23283KiB time=00:01:54.16 bitrate=1670.6kbits/s speed=1.98x elapsed=0:00:57.52
2026-02-21 18:28:16 WARN [ytdlp-runner][ffmpeg stderr] frame= 3435 fps= 62 q=-1.0 size=   23318KiB time=00:01:54.38 bitrate=1670.1kbits/s speed=2.06x elapsed=0:00:55.52
2026-02-21 18:28:16 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-21 18:28:16 WARN [ytdlp-runner][yt-dlp stderr] frame= 3461 fps= 60 q=-1.0 size=   23497KiB time=00:01:55.33 bitrate=1669.0kbits/s speed=1.99x elapsed=0:00:58.02
2026-02-21 18:28:17 WARN [ytdlp-runner][ffmpeg stderr] frame= 3476 fps= 62 q=-1.0 size=   23551KiB time=00:01:55.70 bitrate=1667.4kbits/s speed=2.07x elapsed=0:00:56.02
2026-02-21 18:28:17 WARN [ytdlp-runner][yt-dlp stderr] frame= 3484 fps= 60 q=-1.0 size=   23711KiB time=00:01:56.10 bitrate=1673.0kbits/s speed=1.98x elapsed=0:00:58.52
2026-02-21 18:28:17 WARN [ytdlp-runner][ffmpeg stderr] frame= 3498 fps= 62 q=-1.0 size=   23790KiB time=00:01:56.54 bitrate=1672.3kbits/s speed=2.06x elapsed=0:00:56.52
2026-02-21 18:28:17 WARN [ytdlp-runner][yt-dlp stderr] frame= 3513 fps= 60 q=-1.0 size=   23911KiB time=00:01:57.06 bitrate=1673.2kbits/s speed=1.98x elapsed=0:00:59.02
2026-02-21 18:28:18 WARN [ytdlp-runner][ffmpeg stderr] frame= 3518 fps= 62 q=-1.0 size=   23942KiB time=00:01:57.21 bitrate=1673.3kbits/s speed=2.06x elapsed=0:00:57.02
2026-02-21 18:28:18 INFO [ytdlp-runner] Resposta fechada, processos yt-dlp e ffmpeg encerrados.
2026-02-21 18:28:18 WARN [ytdlp-runner][yt-dlp stderr] frame= 3532 fps= 59 q=-1.0 size=   24093KiB time=00:01:57.70 bitrate=1676.9kbits/s speed=1.98x elapsed=0:00:59.52
2026-02-21 18:28:18 WARN [ytdlp-runner][ffmpeg stderr] [out#0/mpegts @ 0x7f379b79e7c0] video:20824KiB audio:1877KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 6.343927%
frame= 3536 fps= 61 q=-1.0 Lsize=   24141KiB time=00:01:57.83 bitrate=1678.3kbits/s speed=2.05x elapsed=0:00:57.53

2026-02-21 18:28:18 WARN [ytdlp-runner][ffmpeg stderr] Exiting normally, received signal 15.

2026-02-21 18:28:18 INFO [ytdlp-runner] ffmpeg finalizado com code=255
2026-02-21 18:28:18 WARN [ytdlp-runner][yt-dlp stderr] frame= 3553 fps= 59 q=-1.0 size=   24292KiB time=00:01:58.40 bitrate=1680.7kbits/s speed=1.97x elapsed=0:01:00.02
2026-02-21 18:28:19 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 59 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.97x elapsed=0:01:00.52
2026-02-21 18:28:19 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 58 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.95x elapsed=0:01:01.02
2026-02-21 18:28:20 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 58 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.93x elapsed=0:01:01.52
2026-02-21 18:28:20 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 57 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.92x elapsed=0:01:02.02
2026-02-21 18:28:21 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 57 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed= 1.9x elapsed=0:01:02.52
2026-02-21 18:28:21 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 57 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.89x elapsed=0:01:03.02
2026-02-21 18:28:22 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 56 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.87x elapsed=0:01:03.52
2026-02-21 18:28:22 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 56 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.86x elapsed=0:01:04.02
2026-02-21 18:28:23 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 55 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.84x elapsed=0:01:04.52
2026-02-21 18:28:23 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 55 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.83x elapsed=0:01:05.02
2026-02-21 18:28:24 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 54 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.82x elapsed=0:01:05.52
2026-02-21 18:28:24 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 54 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed= 1.8x elapsed=0:01:06.02
2026-02-21 18:28:25 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 54 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.79x elapsed=0:01:06.52
2026-02-21 18:28:25 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 53 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.77x elapsed=0:01:07.02
2026-02-21 18:28:26 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 53 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.76x elapsed=0:01:07.52
2026-02-21 18:28:26 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 52 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.75x elapsed=0:01:08.02
2026-02-21 18:28:27 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 52 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.74x elapsed=0:01:08.52
2026-02-21 18:28:27 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 52 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.72x elapsed=0:01:09.02
2026-02-21 18:28:28 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 51 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.71x elapsed=0:01:09.52
2026-02-21 18:28:28 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 51 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed= 1.7x elapsed=0:01:10.02
2026-02-21 18:28:29 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 51 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.69x elapsed=0:01:10.53
2026-02-21 18:28:29 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 50 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.67x elapsed=0:01:11.03
2026-02-21 18:28:30 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 50 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.66x elapsed=0:01:11.53
2026-02-21 18:28:30 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 50 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.65x elapsed=0:01:12.03
2026-02-21 18:28:31 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 49 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.64x elapsed=0:01:12.53
2026-02-21 18:28:31 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 49 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.63x elapsed=0:01:13.03
2026-02-21 18:28:32 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 48 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.62x elapsed=0:01:13.53
2026-02-21 18:28:32 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 48 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.61x elapsed=0:01:14.03
2026-02-21 18:28:33 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 48 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed= 1.6x elapsed=0:01:14.53
2026-02-21 18:28:33 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 48 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.59x elapsed=0:01:15.03
2026-02-21 18:28:34 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 47 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.57x elapsed=0:01:15.53
2026-02-21 18:28:34 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 47 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.56x elapsed=0:01:16.03
2026-02-21 18:28:35 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 47 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.55x elapsed=0:01:16.53
2026-02-21 18:28:35 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 46 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.54x elapsed=0:01:17.03
2026-02-21 18:28:36 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 46 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.53x elapsed=0:01:17.53
2026-02-21 18:28:36 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 46 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.52x elapsed=0:01:18.03
2026-02-21 18:28:37 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 45 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.51x elapsed=0:01:18.53
2026-02-21 18:28:37 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 45 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed= 1.5x elapsed=0:01:19.03
2026-02-21 18:28:38 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 45 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed= 1.5x elapsed=0:01:19.53
2026-02-21 18:28:38 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 45 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.49x elapsed=0:01:20.03
2026-02-21 18:28:39 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 44 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.48x elapsed=0:01:20.53
2026-02-21 18:28:39 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 44 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.47x elapsed=0:01:21.03
2026-02-21 18:28:40 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 44 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.46x elapsed=0:01:21.53
2026-02-21 18:28:40 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 43 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.45x elapsed=0:01:22.03
2026-02-21 18:28:41 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 43 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.44x elapsed=0:01:22.53
2026-02-21 18:28:41 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 43 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.43x elapsed=0:01:23.03
2026-02-21 18:28:42 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 43 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.42x elapsed=0:01:23.53
2026-02-21 18:28:43 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 42 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.42x elapsed=0:01:24.03
2026-02-21 18:28:43 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 42 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.41x elapsed=0:01:24.53
2026-02-21 18:28:44 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 42 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed= 1.4x elapsed=0:01:25.03
2026-02-21 18:28:44 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 42 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.39x elapsed=0:01:25.53
2026-02-21 18:28:45 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 41 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.38x elapsed=0:01:26.03
2026-02-21 18:28:45 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 41 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.37x elapsed=0:01:26.53
2026-02-21 18:28:46 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 41 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.37x elapsed=0:01:27.03
2026-02-21 18:28:46 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 41 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.36x elapsed=0:01:27.53
2026-02-21 18:28:46 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-21 18:28:47 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 41 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.35x elapsed=0:01:28.03
2026-02-21 18:28:47 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 40 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.34x elapsed=0:01:28.53
2026-02-21 18:28:48 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 40 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.34x elapsed=0:01:29.03
2026-02-21 18:28:48 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 40 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.33x elapsed=0:01:29.53
2026-02-21 18:28:49 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 40 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.32x elapsed=0:01:30.03
2026-02-21 18:28:49 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 39 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.31x elapsed=0:01:30.53
2026-02-21 18:28:50 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 39 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.31x elapsed=0:01:31.03
2026-02-21 18:28:50 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 39 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed= 1.3x elapsed=0:01:31.53
2026-02-21 18:28:51 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 39 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.29x elapsed=0:01:32.03
2026-02-21 18:28:51 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 39 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.29x elapsed=0:01:32.53
2026-02-21 18:28:52 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 38 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.28x elapsed=0:01:33.04
2026-02-21 18:28:52 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 38 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.27x elapsed=0:01:33.54
2026-02-21 18:28:53 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 38 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.26x elapsed=0:01:34.04
2026-02-21 18:28:53 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 38 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.26x elapsed=0:01:34.54
2026-02-21 18:28:54 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 38 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.25x elapsed=0:01:35.04
2026-02-21 18:28:54 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 37 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.24x elapsed=0:01:35.54
2026-02-21 18:28:55 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 37 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.24x elapsed=0:01:36.04
2026-02-21 18:28:55 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 37 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.23x elapsed=0:01:36.54
2026-02-21 18:28:56 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 37 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.23x elapsed=0:01:37.04
2026-02-21 18:28:56 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 37 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.22x elapsed=0:01:37.54
2026-02-21 18:28:57 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 36 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.21x elapsed=0:01:38.04
2026-02-21 18:28:57 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 36 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.21x elapsed=0:01:38.54
2026-02-21 18:28:58 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 36 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed= 1.2x elapsed=0:01:39.04
2026-02-21 18:28:58 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 36 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.19x elapsed=0:01:39.54
2026-02-21 18:28:59 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 36 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.19x elapsed=0:01:40.04
2026-02-21 18:28:59 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 35 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.18x elapsed=0:01:40.54
2026-02-21 18:29:00 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 35 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.18x elapsed=0:01:41.04
2026-02-21 18:29:00 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 35 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.17x elapsed=0:01:41.54
2026-02-21 18:29:01 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 35 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.17x elapsed=0:01:42.04
2026-02-21 18:29:01 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 35 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.16x elapsed=0:01:42.54
2026-02-21 18:29:02 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 35 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.15x elapsed=0:01:43.04
2026-02-21 18:29:02 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 34 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.15x elapsed=0:01:43.54
2026-02-21 18:29:03 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 34 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.14x elapsed=0:01:44.04
2026-02-21 18:29:03 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 34 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.14x elapsed=0:01:44.54
2026-02-21 18:29:04 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 34 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.13x elapsed=0:01:45.04
2026-02-21 18:29:04 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 34 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.13x elapsed=0:01:45.54
2026-02-21 18:29:05 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 34 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.12x elapsed=0:01:46.04
2026-02-21 18:29:05 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 33 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.12x elapsed=0:01:46.54
2026-02-21 18:29:06 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 33 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.11x elapsed=0:01:47.04
2026-02-21 18:29:06 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 33 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.11x elapsed=0:01:47.54
2026-02-21 18:29:07 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 33 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed= 1.1x elapsed=0:01:48.04
2026-02-21 18:29:07 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 33 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed= 1.1x elapsed=0:01:48.54
2026-02-21 18:29:08 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 33 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.09x elapsed=0:01:49.04
2026-02-21 18:29:08 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 33 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.09x elapsed=0:01:49.54
2026-02-21 18:29:09 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 32 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.08x elapsed=0:01:50.04
2026-02-21 18:29:09 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 32 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.08x elapsed=0:01:50.54
2026-02-21 18:29:10 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 32 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.07x elapsed=0:01:51.04
2026-02-21 18:29:10 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 32 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.07x elapsed=0:01:51.54
2026-02-21 18:29:11 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 32 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.06x elapsed=0:01:52.04
2026-02-21 18:29:11 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 32 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.06x elapsed=0:01:52.54
2026-02-21 18:29:12 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 32 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.05x elapsed=0:01:53.04
2026-02-21 18:29:12 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 31 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.05x elapsed=0:01:53.54
2026-02-21 18:29:13 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 31 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.04x elapsed=0:01:54.04
2026-02-21 18:29:13 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 31 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.04x elapsed=0:01:54.54
2026-02-21 18:29:14 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 31 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.03x elapsed=0:01:55.05
2026-02-21 18:29:14 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 31 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.03x elapsed=0:01:55.55
2026-02-21 18:29:15 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 31 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.02x elapsed=0:01:56.05
2026-02-21 18:29:15 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 31 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.02x elapsed=0:01:56.55
2026-02-21 18:29:16 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 30 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.02x elapsed=0:01:57.05
2026-02-21 18:29:16 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 30 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.01x elapsed=0:01:57.55
2026-02-21 18:29:16 INFO [HTTP] GET /health → 200 (1ms) [anon]
2026-02-21 18:29:17 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 30 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=1.01x elapsed=0:01:58.05
2026-02-21 18:29:17 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 30 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=   1x elapsed=0:01:58.55
2026-02-21 18:29:18 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 30 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.999x elapsed=0:01:59.05
2026-02-21 18:29:18 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 30 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.995x elapsed=0:01:59.55
2026-02-21 18:29:19 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 30 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.991x elapsed=0:02:00.05
2026-02-21 18:29:19 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 30 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.987x elapsed=0:02:00.55
2026-02-21 18:29:20 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 29 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.982x elapsed=0:02:01.05
2026-02-21 18:29:20 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 29 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.978x elapsed=0:02:01.55
2026-02-21 18:29:21 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 29 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.974x elapsed=0:02:02.05
2026-02-21 18:29:21 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 29 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.97x elapsed=0:02:02.55
2026-02-21 18:29:22 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 29 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.967x elapsed=0:02:03.05
2026-02-21 18:29:22 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 29 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.963x elapsed=0:02:03.55
2026-02-21 18:29:23 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 29 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.959x elapsed=0:02:04.05
2026-02-21 18:29:23 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 29 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.955x elapsed=0:02:04.55
2026-02-21 18:29:24 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 29 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.951x elapsed=0:02:05.05
2026-02-21 18:29:24 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 28 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.947x elapsed=0:02:05.55
2026-02-21 18:29:25 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 28 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.944x elapsed=0:02:06.05
2026-02-21 18:29:25 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 28 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.94x elapsed=0:02:06.55
2026-02-21 18:29:26 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 28 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.936x elapsed=0:02:07.05
2026-02-21 18:29:26 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 28 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.932x elapsed=0:02:07.55
2026-02-21 18:29:27 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 28 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.929x elapsed=0:02:08.05
2026-02-21 18:29:27 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 28 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.925x elapsed=0:02:08.55
2026-02-21 18:29:28 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 28 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.922x elapsed=0:02:09.05
2026-02-21 18:29:28 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 28 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.918x elapsed=0:02:09.55
2026-02-21 18:29:29 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 27 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.914x elapsed=0:02:10.05
2026-02-21 18:29:29 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 27 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.911x elapsed=0:02:10.55
2026-02-21 18:29:30 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 27 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.907x elapsed=0:02:11.05
2026-02-21 18:29:30 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 27 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.904x elapsed=0:02:11.55
2026-02-21 18:29:31 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 27 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.901x elapsed=0:02:12.05
2026-02-21 18:29:31 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 27 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.897x elapsed=0:02:12.55
2026-02-21 18:29:32 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 27 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.894x elapsed=0:02:13.05
2026-02-21 18:29:32 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 27 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.89x elapsed=0:02:13.55
2026-02-21 18:29:33 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 27 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.887x elapsed=0:02:14.05
2026-02-21 18:29:33 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 27 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.884x elapsed=0:02:14.55
2026-02-21 18:29:34 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 26 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.881x elapsed=0:02:15.05
2026-02-21 18:29:34 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 26 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.877x elapsed=0:02:15.55
2026-02-21 18:29:35 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 26 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.874x elapsed=0:02:16.05
2026-02-21 18:29:35 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 26 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.871x elapsed=0:02:16.55
2026-02-21 18:29:36 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 26 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.868x elapsed=0:02:17.06
2026-02-21 18:29:36 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 26 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.865x elapsed=0:02:17.56
2026-02-21 18:29:37 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 26 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.861x elapsed=0:02:18.06
2026-02-21 18:29:37 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 26 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.858x elapsed=0:02:18.56
2026-02-21 18:29:38 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 26 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.855x elapsed=0:02:19.06
2026-02-21 18:29:38 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 26 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.852x elapsed=0:02:19.56
2026-02-21 18:29:39 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 25 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.849x elapsed=0:02:20.06
2026-02-21 18:29:39 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 25 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.846x elapsed=0:02:20.56
2026-02-21 18:29:40 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 25 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.843x elapsed=0:02:21.06
2026-02-21 18:29:40 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 25 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.84x elapsed=0:02:21.56
2026-02-21 18:29:41 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 25 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.837x elapsed=0:02:22.06
2026-02-21 18:29:41 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 25 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.834x elapsed=0:02:22.56
2026-02-21 18:29:42 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 25 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.831x elapsed=0:02:23.06
2026-02-21 18:29:42 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 25 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.828x elapsed=0:02:23.56
2026-02-21 18:29:43 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 25 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.826x elapsed=0:02:24.06
2026-02-21 18:29:43 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 25 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.823x elapsed=0:02:24.56
2026-02-21 18:29:44 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 25 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.82x elapsed=0:02:25.06
2026-02-21 18:29:44 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.817x elapsed=0:02:25.56
2026-02-21 18:29:45 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.814x elapsed=0:02:26.06
2026-02-21 18:29:45 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.811x elapsed=0:02:26.56
2026-02-21 18:29:46 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.809x elapsed=0:02:27.06
2026-02-21 18:29:46 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.806x elapsed=0:02:27.56
2026-02-21 18:29:46 INFO [HTTP] GET /health → 200 (0ms) [anon]
2026-02-21 18:29:47 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.803x elapsed=0:02:28.06
2026-02-21 18:29:47 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.801x elapsed=0:02:28.56
2026-02-21 18:29:48 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.798x elapsed=0:02:29.06
2026-02-21 18:29:48 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.795x elapsed=0:02:29.56
2026-02-21 18:29:49 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.793x elapsed=0:02:30.06
2026-02-21 18:29:49 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.79x elapsed=0:02:30.56
2026-02-21 18:29:50 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.787x elapsed=0:02:31.06
2026-02-21 18:29:50 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 24 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.785x elapsed=0:02:31.56
2026-02-21 18:29:51 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.782x elapsed=0:02:32.06
2026-02-21 18:29:51 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.78x elapsed=0:02:32.56
2026-02-21 18:29:52 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.777x elapsed=0:02:33.06
2026-02-21 18:29:52 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.774x elapsed=0:02:33.56
2026-02-21 18:29:53 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.772x elapsed=0:02:34.06
2026-02-21 18:29:53 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.769x elapsed=0:02:34.56
2026-02-21 18:29:54 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.767x elapsed=0:02:35.06
2026-02-21 18:29:54 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.765x elapsed=0:02:35.56
2026-02-21 18:29:55 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.762x elapsed=0:02:36.06
2026-02-21 18:29:55 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.76x elapsed=0:02:36.56
2026-02-21 18:29:56 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.757x elapsed=0:02:37.06
2026-02-21 18:29:56 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.755x elapsed=0:02:37.56
2026-02-21 18:29:57 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 23 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.752x elapsed=0:02:38.06
2026-02-21 18:29:57 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 22 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.75x elapsed=0:02:38.56
2026-02-21 18:29:58 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 22 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.748x elapsed=0:02:39.06
2026-02-21 18:29:58 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 22 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.745x elapsed=0:02:39.57
2026-02-21 18:29:59 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 22 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.743x elapsed=0:02:40.07
2026-02-21 18:29:59 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 22 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.741x elapsed=0:02:40.57
2026-02-21 18:30:00 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 22 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.738x elapsed=0:02:41.07
2026-02-21 18:30:00 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 22 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.736x elapsed=0:02:41.57
2026-02-21 18:30:01 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 22 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.734x elapsed=0:02:42.07
2026-02-21 18:30:01 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 22 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.732x elapsed=0:02:42.57
2026-02-21 18:30:02 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 22 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.729x elapsed=0:02:43.07
2026-02-21 18:30:02 WARN [ytdlp-runner][yt-dlp stderr] frame= 3566 fps= 22 q=-1.0 size=   24411KiB time=00:01:58.93 bitrate=1681.4kbits/s speed=0.727x elapsed=0:02:43.57
