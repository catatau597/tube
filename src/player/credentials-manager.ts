import { getDb } from '../core/db';
import { CookieManager } from '../core/cookie-manager';

export type SupportedPlatform = 'youtube' | 'dailymotion' | 'soultv';

export interface ResolvedCredentials {
  userAgent: string;
  cookieFile: string | null;
}

const cookieManager = new CookieManager();

export class CredentialsManager {
  resolveCredentials(platform: SupportedPlatform): ResolvedCredentials {
    // 1. Tenta resolver cookie do novo sistema de perfis
    const cookieProfile = cookieManager.resolve(platform);
    
    // 2. Se o perfil tiver user-agent, usa ele; senão busca no sistema legado
    let userAgent = cookieProfile.userAgent;
    
    if (!userAgent) {
      const ua = getDb()
        .prepare(
          'SELECT value FROM credentials WHERE (platform = ? OR platform = ?) AND type = ? AND active = 1 ORDER BY is_default DESC, id DESC LIMIT 1',
        )
        .get(platform, 'global', 'user-agent') as { value: string } | undefined;
      userAgent = ua?.value || null;
    }

    // 3. Fallback para o sistema legado de cookies se o novo não retornar nada
    let cookieFile = cookieProfile.cookieFile;
    
    if (!cookieFile) {
      const cookie = getDb()
        .prepare(
          'SELECT value FROM credentials WHERE platform = ? AND type = ? AND active = 1 ORDER BY is_default DESC, id DESC LIMIT 1',
        )
        .get(platform, 'cookie') as { value: string } | undefined;
      cookieFile = cookie?.value || null;
    }

    return {
      userAgent: userAgent ?? 'Mozilla/5.0',
      cookieFile,
    };
  }
}
