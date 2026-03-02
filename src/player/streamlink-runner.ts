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

const DEFAULT_STREAM_SELECTION = '720p,480p,best';

function hasFlag(extraFlags: string[], flagName: string): boolean {
  return extraFlags.some((flag) => flag === flagName || flag.startsWith(`${flagName}=`));
}

function buildArgs(
  url: string,
  userAgent: string,
  cookieFile: string | null,
  extraFlags: string[],
): string[] {
  const args = [
    // Garante que nenhum config externo (/root/.config/streamlink/config ou similar)
    // cause conflito de flags ou erros de parsing (exit code=2).
    '--no-config',
    '--no-plugin-sideloading',
    '--loglevel', 'info',
    '--stream-timeout', '30',
    '--retry-streams', '1',
    '--retry-max', '3',
    '--http-header', `User-Agent=${userAgent}`,
  ];
  if (cookieFile) args.push('--http-cookie-jar', cookieFile);

  // Flags de perfil devem ficar antes dos argumentos posicionais (URL/qualidade).
  // Isso evita parser ambiguity e garante override explícito do usuário.
  args.push(...extraFlags);

  // Usa 720p por padrao para reduzir bitrate no fan-out, mas respeita override
  // explicito por perfil via --default-stream.
  if (hasFlag(extraFlags, '--default-stream')) {
    args.push('--stdout', url);
  } else {
    args.push('--stdout', url, DEFAULT_STREAM_SELECTION);
  }
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

/** Tamanho maximo do buffer de stderr acumulado para diagnostico. */
const STDERR_TAIL_MAX = 6_000;

export function startStreamlink(params: StreamlinkParams): ManagedProcess {
  const { url, userAgent, cookieFile, extraFlags, onData, onExit } = params;
  const args = buildArgs(url, userAgent, cookieFile, extraFlags);
  const sanitizedCmd = args
    .map((part) => sanitizeStreamlinkLog(part))
    .join(' ')
    .slice(0, 500);
  logger.info(`[streamlink-runner] Iniciando stream: url=${url} args=${sanitizedCmd}`);

  const proc = new ManagedProcess(
    'streamlink',
    'streamlink',
    args,
    { stdio: ['ignore', 'pipe', 'pipe'] },
  );

  // Acumula stderr sanitizado para diagnostico em caso de falha.
  let stderrTail = '';
  let finished = false;
  const finish = (code: number | null) => {
    if (finished) return;
    finished = true;
    onExit(code);
  };

  proc.stdout?.on('data', (chunk: Buffer) => onData(chunk));

  proc.stderr?.on('data', (chunk: Buffer) => {
    const text = chunk.toString();
    const sanitized = sanitizeStreamlinkLog(text);

    // Mantém um tail rotativo para logar quando o processo falha.
    stderrTail = (stderrTail + sanitized).slice(-STDERR_TAIL_MAX);

    // Loga apenas erros/avisos em tempo real; info vai para debug.
    const line = sanitized.trim();
    if (!line) return;
    if (/\[cli\]\[(error|warning)\]|^error:/i.test(line)) {
      logger.warn(`[streamlink-runner][stderr] ${line}`);
    } else {
      logger.debug(`[streamlink-runner][stderr] ${line}`);
    }
  });

  proc.onClose((code) => {
    if (code === 130) {
      logger.info(`[streamlink-runner] Processo finalizado code=${code} (encerramento solicitado)`);
    } else if (code !== 0) {
      // Loga tail do stderr para identificar o motivo real da falha
      // (ex.: "unrecognized arguments", "400 Bad Request", etc.).
      // Normaliza para uma unica linha: substitui quebras/controles para evitar log-forging.
      const tail = stderrTail.trim().slice(-500)
        .replace(/\r?\n/g, '\\n')
        .replace(/[\x00-\x1f\x7f]/g, '');
      logger.warn(`[streamlink-runner] Processo finalizado code=${code} stderrTail=${tail}`);
    } else {
      logger.info(`[streamlink-runner] Processo finalizado code=${code}`);
    }
    finish(code);
  });

  proc.onError((err) => {
    logger.error(`[streamlink-runner] Erro: ${err}`);
    finish(null);
  });

  return proc;
}
