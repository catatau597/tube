import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { getDb } from './db';
import { logger } from './logger';

const COOKIES_DIR = '/data/cookies';

export interface CookieProfile {
  id: number;
  name: string;
  platform: string;
  file_path: string;
  user_agent: string | null;
  is_default: number;
  active: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCookieProfileInput {
  name: string;
  platform: string;
  fileContent: string; // Conteúdo do arquivo Netscape
  userAgent?: string;
  isDefault?: boolean;
  active?: boolean;
}

export interface UpdateCookieProfileInput {
  name?: string;
  userAgent?: string;
  isDefault?: boolean;
  active?: boolean;
  fileContent?: string; // Opcional: atualizar o arquivo
}

export class CookieManager {
  /**
   * Cria um novo perfil de cookie
   */
  create(input: CreateCookieProfileInput): CookieProfile {
    const db = getDb();
    const now = new Date().toISOString();
    const uuid = randomUUID();
    const filePath = path.join(COOKIES_DIR, `${uuid}.txt`);

    // Salva o arquivo no disco
    fs.mkdirSync(COOKIES_DIR, { recursive: true });
    fs.writeFileSync(filePath, input.fileContent, 'utf-8');
    logger.info(`[CookieManager] Arquivo salvo: ${filePath}`);

    // Se marcar como padrão, remove o padrão anterior da mesma plataforma
    if (input.isDefault) {
      db.prepare('UPDATE cookie_profiles SET is_default = 0 WHERE platform = ?').run(
        input.platform,
      );
    }

    const result = db
      .prepare(
        `INSERT INTO cookie_profiles (name, platform, file_path, user_agent, is_default, active, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        input.name,
        input.platform,
        filePath,
        input.userAgent || null,
        input.isDefault ? 1 : 0,
        input.active !== false ? 1 : 0,
        now,
        now,
      );

    logger.info(
      `[CookieManager] Perfil criado: id=${result.lastInsertRowid} name=${input.name} platform=${input.platform}`,
    );

    return this.getById(Number(result.lastInsertRowid))!;
  }

  /**
   * Lista todos os perfis
   */
  listAll(): CookieProfile[] {
    return getDb()
      .prepare('SELECT * FROM cookie_profiles ORDER BY platform, is_default DESC, name')
      .all() as CookieProfile[];
  }

  /**
   * Lista perfis por plataforma
   */
  listByPlatform(platform: string): CookieProfile[] {
    return getDb()
      .prepare(
        'SELECT * FROM cookie_profiles WHERE platform = ? ORDER BY is_default DESC, name',
      )
      .all(platform) as CookieProfile[];
  }

  /**
   * Busca perfil por ID
   */
  getById(id: number): CookieProfile | null {
    const row = getDb()
      .prepare('SELECT * FROM cookie_profiles WHERE id = ?')
      .get(id) as CookieProfile | undefined;
    return row || null;
  }

  /**
   * Atualiza um perfil
   */
  update(id: number, input: UpdateCookieProfileInput): CookieProfile | null {
    const db = getDb();
    const existing = this.getById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const updates: string[] = [];
    const values: any[] = [];

    if (input.name !== undefined) {
      updates.push('name = ?');
      values.push(input.name);
    }
    if (input.userAgent !== undefined) {
      updates.push('user_agent = ?');
      values.push(input.userAgent || null);
    }
    if (input.active !== undefined) {
      updates.push('active = ?');
      values.push(input.active ? 1 : 0);
    }
    if (input.isDefault !== undefined) {
      if (input.isDefault) {
        // Remove o padrão anterior da mesma plataforma
        db.prepare('UPDATE cookie_profiles SET is_default = 0 WHERE platform = ?').run(
          existing.platform,
        );
      }
      updates.push('is_default = ?');
      values.push(input.isDefault ? 1 : 0);
    }
    if (input.fileContent !== undefined) {
      // Atualiza o arquivo no disco
      fs.writeFileSync(existing.file_path, input.fileContent, 'utf-8');
      logger.info(`[CookieManager] Arquivo atualizado: ${existing.file_path}`);
    }

    updates.push('updated_at = ?');
    values.push(now);

    if (updates.length > 0) {
      values.push(id);
      db.prepare(`UPDATE cookie_profiles SET ${updates.join(', ')} WHERE id = ?`).run(...values);
      logger.info(`[CookieManager] Perfil atualizado: id=${id}`);
    }

    return this.getById(id);
  }

  /**
   * Exclui um perfil
   */
  delete(id: number): boolean {
    const existing = this.getById(id);
    if (!existing) return false;

    // Remove o arquivo do disco
    if (fs.existsSync(existing.file_path)) {
      fs.unlinkSync(existing.file_path);
      logger.info(`[CookieManager] Arquivo excluído: ${existing.file_path}`);
    }

    getDb().prepare('DELETE FROM cookie_profiles WHERE id = ?').run(id);
    logger.info(`[CookieManager] Perfil excluído: id=${id}`);
    return true;
  }

  /**
   * Resolve o perfil de cookie correto para uma plataforma
   * Prioridade: padrão ativo > primeiro ativo > null
   */
  resolve(platform: string): { cookieFile: string | null; userAgent: string | null } {
    const profile = getDb()
      .prepare(
        `SELECT * FROM cookie_profiles 
         WHERE platform = ? AND active = 1 
         ORDER BY is_default DESC, id ASC 
         LIMIT 1`,
      )
      .get(platform) as CookieProfile | undefined;

    if (!profile) {
      return { cookieFile: null, userAgent: null };
    }

    // Verifica se o arquivo ainda existe
    if (!fs.existsSync(profile.file_path)) {
      logger.warn(
        `[CookieManager] Arquivo não encontrado para perfil id=${profile.id}: ${profile.file_path}`,
      );
      return { cookieFile: null, userAgent: null };
    }

    return {
      cookieFile: profile.file_path,
      userAgent: profile.user_agent || null,
    };
  }

  /**
   * Define um perfil como padrão (remove o padrão anterior da mesma plataforma)
   */
  setDefault(id: number): boolean {
    const profile = this.getById(id);
    if (!profile) return false;

    const db = getDb();
    db.prepare('UPDATE cookie_profiles SET is_default = 0 WHERE platform = ?').run(
      profile.platform,
    );
    db.prepare('UPDATE cookie_profiles SET is_default = 1, updated_at = ? WHERE id = ?').run(
      new Date().toISOString(),
      id,
    );

    logger.info(`[CookieManager] Perfil id=${id} definido como padrão para ${profile.platform}`);
    return true;
  }

  /**
   * Toggle ativo/inativo
   */
  toggleActive(id: number): boolean {
    const profile = this.getById(id);
    if (!profile) return false;

    const newActive = profile.active === 1 ? 0 : 1;
    getDb()
      .prepare('UPDATE cookie_profiles SET active = ?, updated_at = ? WHERE id = ?')
      .run(newActive, new Date().toISOString(), id);

    logger.info(`[CookieManager] Perfil id=${id} active=${newActive}`);
    return true;
  }
}
