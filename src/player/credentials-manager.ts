import { getDb } from '../core/db';

export type SupportedPlatform = 'youtube' | 'dailymotion' | 'soultv';

export interface ResolvedCredentials {
  userAgent: string;
  cookieFile: string | null;
}

export class CredentialsManager {
  resolveCredentials(platform: SupportedPlatform): ResolvedCredentials {
    const cookie = getDb()
      .prepare(
        'SELECT value FROM credentials WHERE platform = ? AND type = ? AND active = 1 ORDER BY is_default DESC, id DESC LIMIT 1',
      )
      .get(platform, 'cookie') as { value: string } | undefined;

    const ua = getDb()
      .prepare(
        'SELECT value FROM credentials WHERE (platform = ? OR platform = ?) AND type = ? AND active = 1 ORDER BY is_default DESC, id DESC LIMIT 1',
      )
      .get(platform, 'global', 'user-agent') as { value: string } | undefined;

    return {
      userAgent: ua?.value ?? 'Mozilla/5.0',
      cookieFile: cookie?.value ?? null,
    };
  }
}
