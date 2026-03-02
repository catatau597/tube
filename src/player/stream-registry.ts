import { Response } from 'express';
import { logger } from '../core/logger';

/**
 * Tempo maximo (ms) que um cliente pode ficar em estado stuck/phantom
 * (writableNeedDrain=true sem drenar) antes de ser removido pelo watchdog.
 *
 * Cobre conexoes TCP abandonadas sem FIN (VLC, Kodi, etc.)
 */
const IDLE_CLIENT_TIMEOUT_MS = 30_000;

/**
 * Tempo maximo (ms) que um cliente pode ficar em draining=true antes de
 * ser derrubado e forcado a reconectar.
 *
 * Implementado como setTimeout por cliente (nao depende do ciclo do watchdog)
 * para garantir que o corte aconteca exatamente em DRAINING_DROP_TIMEOUT_MS.
 */
const DRAINING_DROP_TIMEOUT_MS = 3_000;

/**
 * Quantos eventos de backpressure consecutivos (write() retornando false)
 * sao tolerados antes de derrubar o cliente definitivamente.
 *
 * 1 ou 2 sao normais no inicio (TCP slow-start / buffer do player).
 * >= threshold = cliente genuinamente lento ou stuck.
 */
const BACKPRESSURE_DROP_THRESHOLD = 3;

interface ClientState {
  res: Response;
  backpressureCount: number;
  draining: boolean;
  drainingAt: number | null;
  /** Timer individual por cliente: dispara DRAINING_DROP_TIMEOUT_MS apos entrar em draining. */
  drainingTimer: ReturnType<typeof setTimeout> | null;
  lastDrainTimestamp: number;
  markedForRemoval: boolean;
}

interface StreamSession {
  clients: Map<Response, ClientState>;
  killFn: () => Promise<void>;
  idleWatchdogTimer: ReturnType<typeof setTimeout> | null;
  killed: boolean;
}

/**
 * Registro global de streams ativos.
 *
 * Responsabilidades:
 *  - Fan-out (tee): multiplos clientes HTTP compartilham um processo filho.
 *  - Auto-kill: stream e destruido quando todos os clientes desconectam.
 *  - Draining timer (por cliente, 3s): cliente que nao drenou em 3s e
 *    derrubado e forcado a reconectar, em vez de ficar recebendo stream furado.
 *  - Idle watchdog (30s): remove clientes phantom (VLC sem FIN TCP).
 *  - Backpressure: clientes lentos pulam chunks enquanto drenam; apos
 *    BACKPRESSURE_DROP_THRESHOLD consecutivos sao removidos.
 */
class StreamRegistry {
  private readonly sessions = new Map<string, StreamSession>();

  has(key: string): boolean { return this.sessions.has(key); }

  clientCount(key: string): number { return this.sessions.get(key)?.clients.size ?? 0; }

  create(key: string, killFn: () => Promise<void>): void {
    if (this.sessions.has(key)) return;
    this.sessions.set(key, { clients: new Map(), killFn, idleWatchdogTimer: null, killed: false });
    this.startIdleWatchdog(key);
    logger.info(`[stream-registry] Sessao criada: key=${key}`);
  }

  addClient(key: string, res: Response): boolean {
    const s = this.sessions.get(key);
    if (!s || s.killed) return false;
    const state: ClientState = {
      res,
      backpressureCount: 0,
      draining: false,
      drainingAt: null,
      drainingTimer: null,
      lastDrainTimestamp: Date.now(),
      markedForRemoval: false,
    };
    s.clients.set(res, state);
    res.on('error', () => { state.markedForRemoval = true; });
    logger.info(`[stream-registry] +cliente key=${key} total=${s.clients.size}`);
    return true;
  }

  removeClient(key: string, res: Response): void {
    const s = this.sessions.get(key);
    if (!s) return;
    const state = s.clients.get(res);
    if (state?.drainingTimer) {
      clearTimeout(state.drainingTimer);
      state.drainingTimer = null;
    }
    if (!s.clients.delete(res)) return;
    logger.info(`[stream-registry] -cliente key=${key} restantes=${s.clients.size}`);
    if (s.clients.size === 0) void this.kill(key);
  }

  broadcast(key: string, chunk: Buffer): void {
    const s = this.sessions.get(key);
    if (!s) return;

    const dead: Response[] = [];

    for (const [res, state] of s.clients) {
      if (state.markedForRemoval || res.writableEnded || res.destroyed) {
        dead.push(res);
        continue;
      }

      // Cliente ainda esta drenando: pula chunk para nao estourar buffer.
      if (state.draining) continue;

      try {
        const ok = res.write(chunk);
        if (ok) {
          state.backpressureCount = 0;
        } else {
          state.backpressureCount++;

          if (state.backpressureCount >= BACKPRESSURE_DROP_THRESHOLD) {
            logger.warn(
              `[stream-registry] Backpressure threshold (${BACKPRESSURE_DROP_THRESHOLD}) atingido, encerrando cliente lento key=${key}`,
            );
            dead.push(res);
            try { res.end(); } catch { /* */ }
          } else {
            // Entrou em draining: marca, atualiza timestamp e starta timer individual de 3s.
            state.draining = true;
            state.drainingAt = Date.now();
            state.lastDrainTimestamp = state.drainingAt;

            // Timer por cliente: garante corte em exatamente DRAINING_DROP_TIMEOUT_MS
            // sem depender do ciclo de 30s do watchdog.
            state.drainingTimer = setTimeout(() => {
              const s2 = this.sessions.get(key);
              if (!s2 || s2.killed) return;
              const st = s2.clients.get(res);
              if (!st || !st.draining) return; // Ja drenou antes do timer

              logger.warn(
                `[stream-registry] Cliente draining > ${DRAINING_DROP_TIMEOUT_MS}ms, encerrando para reconectar: key=${key}`,
              );
              st.drainingTimer = null;
              s2.clients.delete(res);
              try { if (!res.writableEnded) res.end(); } catch { /* */ }

              if (s2.clients.size === 0) {
                logger.info(`[stream-registry] Zero clientes apos drop draining, encerrando: key=${key}`);
                void this.kill(key);
              }
            }, DRAINING_DROP_TIMEOUT_MS);

            res.once('drain', () => {
              // Drenou a tempo: cancela o timer e volta a escrever normalmente.
              if (state.drainingTimer) {
                clearTimeout(state.drainingTimer);
                state.drainingTimer = null;
              }
              state.draining = false;
              state.drainingAt = null;
              state.backpressureCount = 0;
              state.lastDrainTimestamp = Date.now();
            });
          }
        }
      } catch {
        dead.push(res);
      }
    }

    for (const res of dead) {
      const st = s.clients.get(res);
      if (st?.drainingTimer) { clearTimeout(st.drainingTimer); st.drainingTimer = null; }
      s.clients.delete(res);
    }

    if (s.clients.size === 0) {
      logger.info(`[stream-registry] Zero clientes apos broadcast, encerrando: key=${key}`);
      void this.kill(key);
    }
  }

  async kill(key: string): Promise<void> {
    const s = this.sessions.get(key);
    if (!s || s.killed) return;
    s.killed = true;

    if (s.idleWatchdogTimer) { clearTimeout(s.idleWatchdogTimer); s.idleWatchdogTimer = null; }

    for (const [res, state] of s.clients) {
      // Limpa timers de draining antes de encerrar.
      if (state.drainingTimer) { clearTimeout(state.drainingTimer); state.drainingTimer = null; }
      try { if (!res.writableEnded) res.end(); } catch { /* */ }
    }
    s.clients.clear();

    this.sessions.delete(key);
    logger.info(`[stream-registry] Sessao destruida: key=${key}`);

    try { await s.killFn(); } catch (err) {
      logger.warn(`[stream-registry] Erro em killFn key=${key}: ${err}`);
    }
  }

  /**
   * Idle watchdog: roda a cada IDLE_CLIENT_TIMEOUT_MS (30s) e remove:
   *
   * 1. Clientes phantom (VLC sem FIN): writableNeedDrain=true + idleMs >= 30s.
   * 2. Clientes marcados com erro.
   *
   * O caso de draining stuck e tratado pelo timer individual por cliente (3s),
   * entao este watchdog foca apenas em conexoes fantasma de longa duracao.
   */
  private startIdleWatchdog(key: string): void {
    const s = this.sessions.get(key);
    if (!s) return;

    const check = () => {
      if (s.killed) return;

      const now = Date.now();
      const toRemove: Response[] = [];

      for (const [res, state] of s.clients) {
        const idleMs = now - state.lastDrainTimestamp;
        const isNeedDrain = (res as unknown as { writableNeedDrain?: boolean }).writableNeedDrain ?? false;

        const phantomConnection = isNeedDrain && idleMs >= IDLE_CLIENT_TIMEOUT_MS;

        if (state.markedForRemoval || phantomConnection) {
          const reason = state.markedForRemoval ? 'markedForRemoval' : `phantom idleMs=${idleMs}`;
          logger.warn(`[stream-registry] Cliente removido (watchdog ${reason}): key=${key}`);
          toRemove.push(res);
          if (state.drainingTimer) { clearTimeout(state.drainingTimer); state.drainingTimer = null; }
          try { res.end(); } catch { /* */ }
        }
      }

      for (const res of toRemove) s.clients.delete(res);

      if (s.clients.size === 0 && toRemove.length > 0) {
        logger.info(`[stream-registry] Todos os clientes removidos pelo watchdog, encerrando: key=${key}`);
        void this.kill(key);
      } else {
        s.idleWatchdogTimer = setTimeout(check, IDLE_CLIENT_TIMEOUT_MS);
      }
    };

    s.idleWatchdogTimer = setTimeout(check, IDLE_CLIENT_TIMEOUT_MS);
  }
}

export const streamRegistry = new StreamRegistry();
