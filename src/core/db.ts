import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import { logger } from './logger';

const DATA_DIR = '/data';
const DB_PATH = path.join(DATA_DIR, 'tubewranglerr.db');

const DEFAULT_SETTINGS: Record<string, string> = {
  YOUTUBE_API_KEY: '',
  SCHEDULER_MAIN_INTERVAL_HOURS: '4',
  ENABLE_SCHEDULER_ACTIVE_HOURS: 'false',
  SCHEDULER_ACTIVE_START_HOUR: '7',
  SCHEDULER_ACTIVE_END_HOUR: '22',
  SCHEDULER_PRE_EVENT_WINDOW_HOURS: '2',
  SCHEDULER_PRE_EVENT_INTERVAL_MINUTES: '5',
  SCHEDULER_POST_EVENT_INTERVAL_MINUTES: '5',
  FULL_SYNC_INTERVAL_HOURS: '48',
  RESOLVE_HANDLES_TTL_HOURS: '24',
  MAX_SCHEDULE_HOURS: '72',
  MAX_UPCOMING_PER_CHANNEL: '6',
  TITLE_FILTER_EXPRESSIONS: 'ao vivo,AO VIVO',
  FILTER_BY_CATEGORY: 'false',
  ALLOWED_CATEGORY_IDS: '17',
  CATEGORY_MAPPINGS: 'Sports|ESPORTES,Gaming|JOGOS,People & Blogs|ESPORTES,News & Politics|NOTICIAS',
  CHANNEL_NAME_MAPPINGS: '',
  EPG_DESCRIPTION_CLEANUP: 'true',
  PLAYLIST_GENERATE_DIRECT: 'true',
  PLAYLIST_GENERATE_PROXY: 'true',
  PREFIX_TITLE_WITH_STATUS: 'true',
  PREFIX_TITLE_WITH_CHANNEL_NAME: 'true',
  TITLE_USE_BRACKETS: 'true',
  KEEP_RECORDED_STREAMS: 'true',
  MAX_RECORDED_PER_CHANNEL: '2',
  RECORDED_RETENTION_DAYS: '2',
  PLACEHOLDER_IMAGE_URL: '',
  USE_INVISIBLE_PLACEHOLDER: 'true',
  HTTP_PORT: '8888',
  LOCAL_TIMEZONE: 'America/Sao_Paulo',
  STALE_HOURS: '6',
  USE_PLAYLIST_ITEMS: 'true',
  PROXY_ENABLE_ANALYTICS: 'true',
  TUBEWRANGLERR_URL: '',
  PROXY_THUMBNAIL_CACHE_HOURS: '24',
  LOG_LEVEL: 'INFO',
};

export function getDefaultSettings(): Record<string, string> {
  return { ...DEFAULT_SETTINGS };
}

function parseSimpleEnvFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf-8');
  const values: Record<string, string> = {};
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    const inlineComment = value.indexOf(' #');
    if (inlineComment >= 0) value = value.slice(0, inlineComment).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

function readSeedEnv(): Record<string, string> {
  const rootEnv = parseSimpleEnvFile(path.join(process.cwd(), '.env'));
  const docEnv = parseSimpleEnvFile(path.join(process.cwd(), 'DOC', '.env'));
  return { ...docEnv, ...rootEnv };
}

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!dbInstance) throw new Error('Database ainda não inicializado. Chame initDb() antes.');
  return dbInstance;
}

export function initDb(): Database.Database {
  if (dbInstance) return dbInstance;

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(path.join(DATA_DIR, 'cookies'), { recursive: true });

  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');

  /* ------------------------------------------------------------------ */
  /* Tabelas base                                                         */
  /* ------------------------------------------------------------------ */
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key         TEXT PRIMARY KEY,
      value       TEXT NOT NULL,
      updated_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS channels (
      id                  INTEGER PRIMARY KEY AUTOINCREMENT,
      channel_id          TEXT NOT NULL UNIQUE,
      handle              TEXT,
      title               TEXT NOT NULL,
      thumbnail_url       TEXT,
      uploads_playlist_id TEXT,
      status              TEXT NOT NULL DEFAULT 'active',
      created_at          TEXT DEFAULT (datetime('now')),
      updated_at          TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS streams (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      video_id        TEXT NOT NULL UNIQUE,
      channel_id      TEXT NOT NULL REFERENCES channels(channel_id),
      title           TEXT NOT NULL,
      status          TEXT NOT NULL,
      scheduled_start TEXT,
      actual_start    TEXT,
      actual_end      TEXT,
      thumbnail_url   TEXT,
      category_id     TEXT,
      created_at      TEXT DEFAULT (datetime('now')),
      updated_at      TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS credentials (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      platform    TEXT NOT NULL,
      type        TEXT NOT NULL,
      label       TEXT,
      value       TEXT NOT NULL,
      active      INTEGER NOT NULL DEFAULT 1,
      is_default  INTEGER NOT NULL DEFAULT 0,
      created_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS auth_users (
      id                   INTEGER PRIMARY KEY AUTOINCREMENT,
      username             TEXT NOT NULL UNIQUE,
      password_hash        TEXT NOT NULL,
      must_change_password INTEGER NOT NULL DEFAULT 0,
      created_at           TEXT DEFAULT (datetime('now')),
      updated_at           TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS cookies (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      provider   TEXT NOT NULL DEFAULT 'youtube',
      file_path  TEXT NOT NULL,
      active     INTEGER NOT NULL DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  /* ------------------------------------------------------------------ */
  /* tool_profiles: cria ou migra para novo schema                       */
  /* ------------------------------------------------------------------ */
  const tpMeta = db.prepare(
    "SELECT sql FROM sqlite_master WHERE type='table' AND name='tool_profiles'"
  ).get() as { sql: string } | undefined;

  if (!tpMeta) {
    /* Instalação nova */
    db.exec(`
      CREATE TABLE tool_profiles (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        name       TEXT NOT NULL,
        tool       TEXT NOT NULL,
        flags      TEXT NOT NULL DEFAULT '',
        cookie_id  INTEGER REFERENCES cookies(id),
        ua_id      INTEGER REFERENCES credentials(id),
        is_active  INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `);
    logger.info('[DB] Tabela tool_profiles criada.');
  } else if (tpMeta.sql.includes('cookie_platform') || tpMeta.sql.includes("CHECK(tool IN")) {
    /* Schema antigo: migrar */
    db.exec(`
      CREATE TABLE tool_profiles_v2 (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        name       TEXT NOT NULL,
        tool       TEXT NOT NULL,
        flags      TEXT NOT NULL DEFAULT '',
        cookie_id  INTEGER REFERENCES cookies(id),
        ua_id      INTEGER REFERENCES credentials(id),
        is_active  INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
      INSERT OR IGNORE INTO tool_profiles_v2 (id, name, tool, flags, ua_id, is_active, created_at, updated_at)
        SELECT id, name, tool, flags, ua_id, is_active, created_at, updated_at FROM tool_profiles;
      DROP TABLE tool_profiles;
      ALTER TABLE tool_profiles_v2 RENAME TO tool_profiles;
    `);
    logger.info('[DB] tool_profiles migrado para novo schema (cookie_id + ffmpeg).');
  } else {
    /* Schema já novo: garantir coluna cookie_id */
    try {
      db.exec('ALTER TABLE tool_profiles ADD COLUMN cookie_id INTEGER REFERENCES cookies(id)');
    } catch { /* coluna já existe */ }
  }

  /* ------------------------------------------------------------------ */
  /* Seeds                                                                */
  /* ------------------------------------------------------------------ */
  const envSeed = readSeedEnv();

  const settingsCount = db.prepare('SELECT COUNT(*) as count FROM settings').get() as { count: number };
  if (settingsCount.count === 0) {
    const insert = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
    const tx = db.transaction((entries: Array<[string, string]>) => {
      for (const [key, value] of entries) insert.run(key, value);
    });
    tx(Object.entries({ ...DEFAULT_SETTINGS, ...envSeed }));
    logger.info('[DB] Seed inicial de settings aplicado.');
  }

  const usersCount = db.prepare('SELECT COUNT(*) as count FROM auth_users').get() as { count: number };
  if (usersCount.count === 0) {
    const hash = bcrypt.hashSync('tubewranglerr', 10);
    db.prepare('INSERT INTO auth_users (username, password_hash, must_change_password) VALUES (?, ?, 1)').run('admin', hash);
    logger.info('[DB] Usuário admin padrão criado.');
  }

  const channelsCount = db.prepare('SELECT COUNT(*) as count FROM channels').get() as { count: number };
  if (channelsCount.count === 0) {
    const handles = (envSeed.TARGET_CHANNEL_HANDLES ?? '').split(',').map((v) => v.trim()).filter(Boolean);
    const ids = (envSeed.TARGET_CHANNEL_IDS ?? '').split(',').map((v) => v.trim()).filter(Boolean);
    const insert = db.prepare('INSERT OR IGNORE INTO channels (channel_id, handle, title, thumbnail_url, uploads_playlist_id, status) VALUES (?, ?, ?, ?, ?, ?)');
    for (const handle of handles) insert.run(`pending:${handle}`, handle, handle, '', '', 'not_found');
    for (const id of ids) insert.run(id, null, id, '', '', 'active');
    if (handles.length > 0 || ids.length > 0) logger.info(`[DB] Seed de canais aplicado (${handles.length + ids.length}).`);
  }

  dbInstance = db;
  return db;
}
