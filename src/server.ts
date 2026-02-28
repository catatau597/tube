import 'dotenv/config';
import http from 'http';
import path from 'path';
import express from 'express';
import session from 'express-session';
import { WebSocketServer } from 'ws';
import { initDb } from './core/db';
import {
  configEvents,
  getConfig,
  getConfigBool,
  getConfigNumber,
} from './core/config-manager';
import { logger, setLoggerLevel, wsLogHub } from './core/logger';
import { StateManager } from './core/state-manager';
import { YouTubeApi } from './core/youtube-api';
import { Scheduler } from './core/scheduler';
import { requireAuth } from './api/middleware/auth';
import { createAuthRouter } from './api/routes/auth';
import { createChannelsRouter } from './api/routes/channels';
import { createStreamsRouter } from './api/routes/streams';
import { createConfigRouter } from './api/routes/config';
import { createPlaylistsRouter } from './api/routes/playlists';
import { createSchedulerRouter } from './api/routes/scheduler';
import { createCredentialsRouter } from './api/routes/credentials';
import { createPlayerRouter } from './api/routes/player';
import { createLogsRouter } from './api/routes/logs';
import cookiesRouter from './api/routes/cookies';

initDb();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const publicDir = path.join(process.cwd(), 'public');

const state = new StateManager('/data');
const cacheLoaded = state.loadFromDisk();
state.saveEpgTexts(getConfig('LOCAL_TIMEZONE') || 'America/Sao_Paulo');

const youtubeApi = new YouTubeApi();

const scheduler = new Scheduler(state, youtubeApi, {
  mainIntervalHours: getConfigNumber('SCHEDULER_MAIN_INTERVAL_HOURS', 4),
  preEventWindowHours: getConfigNumber('SCHEDULER_PRE_EVENT_WINDOW_HOURS', 2),
  preEventIntervalMinutes: getConfigNumber('SCHEDULER_PRE_EVENT_INTERVAL_MINUTES', 5),
  postEventIntervalMinutes: getConfigNumber('SCHEDULER_POST_EVENT_INTERVAL_MINUTES', 5),
  fullSyncIntervalHours: getConfigNumber('FULL_SYNC_INTERVAL_HOURS', 48),
  staleHours: getConfigNumber('STALE_HOURS', 6),
  enableActiveHours: getConfigBool('ENABLE_SCHEDULER_ACTIVE_HOURS'),
  activeStartHour: getConfigNumber('SCHEDULER_ACTIVE_START_HOUR', 7),
  activeEndHour: getConfigNumber('SCHEDULER_ACTIVE_END_HOUR', 22),
  usePlaylistItems: getConfigBool('USE_PLAYLIST_ITEMS'),
  localTimezone: getConfig('LOCAL_TIMEZONE') || 'America/Sao_Paulo',
  maxScheduleHours: getConfigNumber('MAX_SCHEDULE_HOURS', 72),
});

configEvents.on('configChanged', (key: string, value: string) => {
  if (key === 'LOG_LEVEL') setLoggerLevel(value);
});

app.use(express.json({ limit: '5mb' }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'tubewranglerr-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

// Log every HTTP request for debugging
app.use((request, response, next) => {
  const start = Date.now();
  response.on('finish', () => {
    const ms = Date.now() - start;
    const user = request.session?.user?.username || 'anon';
    logger.info(`[HTTP] ${request.method} ${request.originalUrl} → ${response.statusCode} (${ms}ms) [${user}]`);
  });
  next();
});

app.get('/health', (_request, response) => {
  response.json({ status: 'ok', version: '1.0.0' });
});

app.get('/login', (_request, response) => {
  response.sendFile(path.join(publicDir, 'login.html'));
});

app.get('/setup', (request, response) => {
  if (!request.session.user) {
    response.redirect('/login');
    return;
  }
  if (!request.session.user.mustChangePassword) {
    response.redirect('/');
    return;
  }
  response.sendFile(path.join(publicDir, 'setup.html'));
});

app.get('/', (request, response) => {
  if (!request.session.user) {
    response.redirect('/login');
    return;
  }
  if (request.session.user.mustChangePassword) {
    response.redirect('/setup');
    return;
  }
  response.sendFile(path.join(publicDir, 'index.html'));
});

app.use('/api/auth', createAuthRouter());
app.use(createPlaylistsRouter(state));
app.use('/api', createPlayerRouter());

app.use('/api', (request, response, next) => {
  if (
    request.path.startsWith('/auth/login') ||
    request.path.startsWith('/auth/password') ||
    request.path.startsWith('/auth/me') ||
    request.path.startsWith('/auth/logout') ||
    request.path.startsWith('/stream/') ||
    request.path.startsWith('/thumbnail/')
  ) {
    next();
    return;
  }
  requireAuth(request, response, next);
});

app.use('/api', (request, response, next) => {
  if (request.session.user?.mustChangePassword) {
    response.status(403).json({ error: 'Password change required', code: 'PASSWORD_CHANGE_REQUIRED' });
    return;
  }
  next();
});

app.use('/api/channels', createChannelsRouter(youtubeApi, scheduler));
app.use('/api/streams', createStreamsRouter());
app.use('/api/config', createConfigRouter());
app.use('/api/scheduler', createSchedulerRouter(scheduler));
app.use('/api/credentials', createCredentialsRouter());
app.use('/api/cookies', cookiesRouter);
app.use('/api/logs', createLogsRouter());

app.use((request, response, next) => {
  const isPublicPath =
    request.path === '/login' ||
    request.path === '/setup' ||
    request.path === '/favicon.ico' ||
    request.path.startsWith('/css/') ||
    request.path.startsWith('/js/') ||
    request.path.startsWith('/health') ||
    request.path.endsWith('.m3u') ||
    request.path.endsWith('.xml') ||
    request.path.startsWith('/ws/');

  if (isPublicPath || request.path.startsWith('/api')) {
    next();
    return;
  }

  if (!request.session.user) {
    response.status(401).send('Unauthorized');
    return;
  }

  next();
});

app.use(express.static(publicDir));

wss.on('connection', (socket, request) => {
  if (request.url !== '/ws/logs') {
    socket.close(1008, 'Unknown path');
    return;
  }

  wsLogHub.addClient(socket);
  socket.on('close', () => wsLogHub.removeClient(socket));
});

const port = getConfigNumber('HTTP_PORT', 8888);
server.listen(port, () => {
  logger.info(`Servidor HTTP iniciado em http://0.0.0.0:${port}`);
  scheduler.start(cacheLoaded);
});

process.on('SIGTERM', () => {
  scheduler.stop();
  process.exit(0);
});
