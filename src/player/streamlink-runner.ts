import { spawn } from 'child_process';
import { ManagedProcess } from './process-manager';
import { logger } from '../core/logger';

/**
 * Remove API keys e tokens dos logs de stderr do streamlink.
 * Evita vazamento de credenciais em logs de producao.
 */
function sanitizeStreamlinkLog(text: string): string {
  return text
    .replace(/key=AIza[A-Za-z0-9_-]+/gi, 'key=***REDACTED***')
    .replace(/oauth_token=[^&\s]+/gi, 'oauth_token=***REDACTED***')
    .replace(/Authorization: Bearer [^\s]+/gi, 'Authorization: Bearer ***REDACTED***');
}

function buildArgs(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  extraFlags: string[],
): string[] {
  const args = [
    ...extraFlags,
    '--http-header', `User-Agent=${userAgent}`,
    // Remove --config /dev/null: pode estar impedindo streamlink de carregar
    // defaults importantes para YouTube (player client, etc)
    '--no-plugin-sideloading',
    // Bypass SSL verification: alguns ISPs/firewalls causam problemas
    '--http-no-ssl-verify',
    // Forca loglevel info (nao trace, muito verboso)
    '--loglevel', 'info',
    '--stdout',
    url,
    'best',
  ];
  if (cookieFile) args.push('--http-cookie-jar', cookieFile);
  return args;
}

export interface StreamlinkParams {
  url:        string;
  userAgent:  string;
  cookieFile: string | null;
  extraFlags: string[];
  onData: (chunk: Buffer) => void;
  onExit: (code: number | null) => void;
}

export function startStreamlink(params: StreamlinkParams): ManagedProcess {
  const { url, userAgent, cookieFile, extraFlags, onData, onExit } = params;
  logger.info(`[streamlink-runner] Iniciando stream: url=${url}`);

  const proc = new ManagedProcess(
    'streamlink',
    'streamlink',
    buildArgs(url, userAgent, cookieFile, extraFlags),
    { stdio: ['ignore', 'pipe', 'pipe'] },
  );

  proc.stdout?.on('data', (chunk: Buffer) => onData(chunk));

  // Streamlink escreve progresso e info em stderr (padrao CLI).
  // Filtra linhas que sao apenas info/progresso, loga apenas erros reais.
  proc.stderr?.on('data', (chunk: Buffer) => {
    const text = chunk.toString().trim();
    const sanitized = sanitizeStreamlinkLog(text);

    // Ignora logs info do streamlink ([cli][info]), loga apenas erros/avisos
    if (/\[cli\]\[error\]|\[cli\]\[warning\]|^error:/i.test(sanitized)) {
      logger.warn(`[streamlink-runner][stderr] ${sanitized}`);
    } else {
      logger.debug(`[streamlink-runner][stderr] ${sanitized}`);
    }
  });

  proc.onClose((code) => {
    logger.info(`[streamlink-runner] Processo finalizado code=${code}`);
    onExit(code);
  });
  proc.onError((err) => {
    logger.error(`[streamlink-runner] Erro: ${err}`);
    onExit(null);
  });

  return proc;
}
