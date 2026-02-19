import { EventEmitter } from 'events';
import { getDb } from './db';

export const configEvents = new EventEmitter();

export function getConfig(key: string): string {
  const row = getDb().prepare('SELECT value FROM settings WHERE key = ?').get(key) as
    | { value: string }
    | undefined;
  return row?.value ?? '';
}

export function getConfigBool(key: string): boolean {
  return getConfig(key).toLowerCase() === 'true';
}

export function getConfigNumber(key: string, fallback: number): number {
  const parsed = Number(getConfig(key));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getAllConfig(): Record<string, string> {
  const rows = getDb().prepare('SELECT key, value FROM settings').all() as Array<{
    key: string;
    value: string;
  }>;
  const out: Record<string, string> = {};
  for (const row of rows) out[row.key] = row.value;
  return out;
}

export function setConfig(key: string, value: string): void {
  getDb()
    .prepare(
      'INSERT INTO settings(key, value, updated_at) VALUES(?, ?, datetime(\'now\')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime(\'now\')',
    )
    .run(key, value);
  configEvents.emit('configChanged', key, value);
}

export function patchConfig(values: Record<string, string>): void {
  for (const [key, value] of Object.entries(values)) {
    setConfig(key, value);
  }
}

export function resetConfig(defaults: Record<string, string>): void {
  for (const [key, value] of Object.entries(defaults)) {
    setConfig(key, value);
  }
}
