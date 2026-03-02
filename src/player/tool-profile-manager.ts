import { getDb } from '../core/db';
import { logger } from '../core/logger';

export type SupportedTool = 'streamlink' | 'yt-dlp' | 'ffmpeg';

export interface ResolvedToolProfile {
  flags: string[];
  cookieFile: string | null;
  userAgent: string;
}

const DEFAULT_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function parseFlags(raw: string): string[] {
  const text = raw.trim();
  if (!text) return [];

  // Parse simples de argv com suporte a aspas simples e duplas.
  // Evita quebrar flags como: --http-header "User-Agent=..."
  const argv: string[] = [];
  const re = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|(\S+)/g;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    const token = (match[1] ?? match[2] ?? match[3] ?? '').trim();
    if (!token) continue;
    argv.push(token.replace(/\\(["'\\])/g, '$1'));
  }

  if (argv.length > 0) return argv;
  return text.split(/\s+/).filter(Boolean);
}

export class ToolProfileManager {
  /**
   * Resolve o perfil ativo para uma ferramenta.
   * Se nenhum perfil estiver ativo, faz fallback para o sistema legado de credenciais.
   */
  resolveProfile(tool: SupportedTool): ResolvedToolProfile {
    try {
      const row = getDb().prepare(`
        SELECT tp.flags,
               c.file_path  AS cookie_file,
               cr.value     AS ua_value
        FROM   tool_profiles tp
        LEFT JOIN cookies     c  ON c.id  = tp.cookie_id AND c.active = 1
        LEFT JOIN credentials cr ON cr.id = tp.ua_id
        WHERE  tp.tool = ? AND tp.is_active = 1
        LIMIT  1
      `).get(tool) as { flags: string; cookie_file: string | null; ua_value: string | null } | undefined;

      if (row) {
        logger.info(`[ToolProfileManager] Usando perfil ativo para tool=${tool}`);
        return {
          flags: row.flags ? parseFlags(row.flags) : [],
          cookieFile: row.cookie_file || null,
          userAgent: row.ua_value || DEFAULT_UA,
        };
      }
    } catch (err) {
      logger.warn(`[ToolProfileManager] Erro ao buscar perfil para ${tool}: ${err}`);
    }

    return this.legacyResolve(tool);
  }

  /** Fallback: usa UA padrão da tabela credentials e cookie ativo da tabela cookies. */
  private legacyResolve(tool: SupportedTool): ResolvedToolProfile {
    try {
      const db = getDb();

      const ua = db.prepare(
        'SELECT value FROM credentials WHERE type = ? AND active = 1 ORDER BY is_default DESC, id DESC LIMIT 1'
      ).get('user-agent') as { value: string } | undefined;

      const cookie = (tool === 'streamlink' || tool === 'yt-dlp')
        ? db.prepare('SELECT file_path FROM cookies WHERE active = 1 ORDER BY id DESC LIMIT 1').get() as { file_path: string } | undefined
        : undefined;

      return {
        flags: [],
        cookieFile: cookie?.file_path || null,
        userAgent: ua?.value || DEFAULT_UA,
      };
    } catch {
      return { flags: [], cookieFile: null, userAgent: DEFAULT_UA };
    }
  }
}
