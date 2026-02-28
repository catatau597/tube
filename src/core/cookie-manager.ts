import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from './db';
import { logger } from './logger';

export interface CookieProfile {
  id: number;
  name: string;
  platform: string;
  file_path: string;
  user_agent: string | null;
  is_default: number; // 1 = true, 0 = false
  active: number;     // 1 = true, 0 = false
  created_at: string;
  updated_at: string;
}

export interface CookieCredentials {
  cookieFile: string | null;
  userAgent: string;
}

export class CookieManager {
  private readonly cookiesDir = '/data/cookies';
  private readonly defaultUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

  constructor() {
    fs.mkdirSync(this.cookiesDir, { recursive: true });
  }

  /**
   * Lista todos os perfis de cookie
   */
  listProfiles(): CookieProfile[] {
    const db = getDb();
    return db.prepare('SELECT * FROM cookie_profiles ORDER BY platform, name').all() as CookieProfile[];
  }

  /**
   * Lista perfis por plataforma
   */
  listByPlatform(platform: string): CookieProfile[] {
    const db = getDb();
    return db.prepare('SELECT * FROM cookie_profiles WHERE platform = ? ORDER BY name').all(platform) as CookieProfile[];
  }

  /**
   * Busca perfil por ID
   */
  getProfile(id: number): CookieProfile | null {
    const db = getDb();
    return db.prepare('SELECT * FROM cookie_profiles WHERE id = ?').get(id) as CookieProfile | null;
  }

  /**
   * Cria novo perfil de cookie
   * @param name Nome amigável do perfil
   * @param platform Plataforma (youtube, twitch, etc)
   * @param cookieContent Conteúdo do arquivo Netscape (texto)
   * @param userAgent User-Agent específico (opcional)
   * @param setAsDefault Marcar como padrão da plataforma
   */
  createProfile(params: {
    name: string;
    platform: string;
    cookieContent: string;
    userAgent?: string;
    setAsDefault?: boolean;
  }): CookieProfile {
    const { name, platform, cookieContent, userAgent, setAsDefault } = params;
    const db = getDb();

    // Salva arquivo cookie com UUID
    const uuid = uuidv4();
    const fileName = `${uuid}.txt`;
    const filePath = path.join(this.cookiesDir, fileName);
    fs.writeFileSync(filePath, cookieContent, 'utf-8');
    logger.info(`[CookieManager] Arquivo cookie salvo: ${filePath}`);

    // Se marcar como padrão, remove padrão anterior da mesma plataforma
    if (setAsDefault) {
      db.prepare('UPDATE cookie_profiles SET is_default = 0 WHERE platform = ?').run(platform);
    }

    const result = db.prepare(`
      INSERT INTO cookie_profiles (name, platform, file_path, user_agent, is_default, active, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, datetime('now'))
    `).run(
      name,
      platform,
      filePath,
      userAgent || null,
      setAsDefault ? 1 : 0
    );

    logger.info(`[CookieManager] Perfil criado: id=${result.lastInsertRowid} name=${name} platform=${platform}`);
    return this.getProfile(Number(result.lastInsertRowid))!;
  }

  /**
   * Atualiza perfil existente
   */
  updateProfile(id: number, params: {
    name?: string;
    userAgent?: string;
    active?: boolean;
    setAsDefault?: boolean;
  }): CookieProfile | null {
    const db = getDb();
    const profile = this.getProfile(id);
    if (!profile) return null;

    const updates: string[] = [];
    const values: unknown[] = [];

    if (params.name !== undefined) {
      updates.push('name = ?');
      values.push(params.name);
    }
    if (params.userAgent !== undefined) {
      updates.push('user_agent = ?');
      values.push(params.userAgent || null);
    }
    if (params.active !== undefined) {
      updates.push('active = ?');
      values.push(params.active ? 1 : 0);
    }
    if (params.setAsDefault !== undefined && params.setAsDefault) {
      // Remove padrão anterior da mesma plataforma
      db.prepare('UPDATE cookie_profiles SET is_default = 0 WHERE platform = ?').run(profile.platform);
      updates.push('is_default = ?');
      values.push(1);
    }

    if (updates.length === 0) return profile;

    updates.push("updated_at = datetime('now')");
    values.push(id);

    db.prepare(`UPDATE cookie_profiles SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    logger.info(`[CookieManager] Perfil atualizado: id=${id}`);
    return this.getProfile(id);
  }

  /**
   * Exclui perfil e remove arquivo cookie
   */
  deleteProfile(id: number): boolean {
    const db = getDb();
    const profile = this.getProfile(id);
    if (!profile) return false;

    // Remove arquivo físico
    if (fs.existsSync(profile.file_path)) {
      fs.unlinkSync(profile.file_path);
      logger.info(`[CookieManager] Arquivo cookie removido: ${profile.file_path}`);
    }

    db.prepare('DELETE FROM cookie_profiles WHERE id = ?').run(id);
    logger.info(`[CookieManager] Perfil excluído: id=${id} name=${profile.name}`);
    return true;
  }

  /**
   * Resolve credenciais de cookie para uma plataforma
   * Lógica: padrão ativo > primeiro ativo > sem cookie
   */
  resolve(platform: string): CookieCredentials {
    const db = getDb();

    // Tenta perfil padrão ativo
    const defaultProfile = db.prepare(`
      SELECT * FROM cookie_profiles 
      WHERE platform = ? AND is_default = 1 AND active = 1
    `).get(platform) as CookieProfile | undefined;

    if (defaultProfile) {
      logger.debug(`[CookieManager] Usando perfil padrão: ${defaultProfile.name} (platform=${platform})`);
      return {
        cookieFile: defaultProfile.file_path,
        userAgent: defaultProfile.user_agent || this.defaultUserAgent,
      };
    }

    // Tenta primeiro perfil ativo
    const firstActive = db.prepare(`
      SELECT * FROM cookie_profiles 
      WHERE platform = ? AND active = 1 
      ORDER BY created_at ASC 
      LIMIT 1
    `).get(platform) as CookieProfile | undefined;

    if (firstActive) {
      logger.debug(`[CookieManager] Usando primeiro perfil ativo: ${firstActive.name} (platform=${platform})`);
      return {
        cookieFile: firstActive.file_path,
        userAgent: firstActive.user_agent || this.defaultUserAgent,
      };
    }

    // Sem cookie disponível
    logger.debug(`[CookieManager] Nenhum perfil ativo para platform=${platform}, usando sem cookie`);
    return {
      cookieFile: null,
      userAgent: this.defaultUserAgent,
    };
  }
}
