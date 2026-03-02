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
const DRAINING_DROP_TIMEOUT_MS = 25_000;

/**
 * Quantos eventos de backpressure consecutivos (write() retornando false)
 * sao tolerados antes de derrubar o cliente definitivamente.
 *
 * 1 ou 2 sao normais no inicio (TCP slow-start / buffer do player).
 * >= threshold = cliente genuinamente lento ou stuck.
 */
const BACKPRESSURE_DROP_THRESHOLD = 8;

interface ClientState {
  id: number;
  res: Response;
  backpressureCount: number;
  draining: boolean;
  drainingAt: number | null;
  /** Timer individual por cliente: dispara DRAINING_DROP_TIMEOUT_MS apos entrar em draining. */
  drainingTimer: ReturnType<typeof setTimeout> | null;
  lastDrainTimestamp: number;
  markedForRemoval: boolean;
}

interface SessionFlowControl {
  pause: () => void;
  resume: () => void;
}

interface StreamSession {
  clients: Map<Response, ClientState>;
  killFn: () => Promise<void>;
  idleWatchdogTimer: ReturnType<typeof setTimeout> | null;
  killed: boolean;
  nextClientId: number;
  flowControl: SessionFlowControl | null;
  flowPaused: boolean;
}

/**
 * Registro global de streams ativos.
 *
 * Responsabilidades:
 *  - Fan-out (tee): multiplos clientes HTTP compartilham um processo filho.
 *  - Auto-kill: stream e destruido quando todos os clientes desconectam.
 *  - Draining timer (por cliente, 25s): tolera oscilações de rede/player
 *    antes de derrubar o cliente.
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
    this.sessions.set(key, {
      clients: new Map(),
      killFn,
      idleWatchdogTimer: null,
      killed: false,
      nextClientId: 1,
      flowControl: null,
      flowPaused: false,
    });
    this.startIdleWatchdog(key);
    logger.info(`[stream-registry] Sessao criada: key=${key}`);
  }

  addClient(key: string, res: Response): boolean {
    const s = this.sessions.get(key);
    if (!s || s.killed) return false;
    const state: ClientState = {
      id: s.nextClientId++,
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
    this.maybeResumeFlow(key, s);
    logger.info(`[stream-registry] +cliente key=${key} client=${state.id} total=${s.clients.size}`);
    return true;
  }

  setFlowControl(key: string, flowControl: SessionFlowControl): void {
    const s = this.sessions.get(key);
    if (!s || s.killed) return;
    s.flowControl = flowControl;

    // Se já está pausado por backpressure, aplica pause no novo controlador.
    if (s.flowPaused) {
      try { flowControl.pause(); } catch { /* */ }
    }
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
    this.maybeResumeFlow(key, s);
    logger.info(`[stream-registry] -cliente key=${key} client=${state?.id ?? '?'} reason=disconnect restantes=${s.clients.size}`);
    if (s.clients.size === 0) void this.kill(key);
  }

  broadcast(key: string, chunk: Buffer): void {
    const s = this.sessions.get(key);
    if (!s) return;
    const now = Date.now();

    for (const [res, state] of s.clients) {
      if (state.markedForRemoval || res.writableEnded || res.destroyed) {
        const reason = state.markedForRemoval ? 'error' : 'closed';
        this.removeClientByReason(key, s, res, reason);
        continue;
      }

      // Cliente ainda esta drenando: pula chunk para nao estourar buffer.
      if (state.draining) {
        if (s.clients.size > 1) state.backpressureCount++;
        const drainingMs = state.drainingAt ? now - state.drainingAt : 0;
        const shouldDropMulti = s.clients.size > 1 && drainingMs >= DRAINING_DROP_TIMEOUT_MS && state.backpressureCount >= BACKPRESSURE_DROP_THRESHOLD;
        if (shouldDropMulti) {
          this.removeClientByReason(key, s, res, `backpressure>${drainingMs}ms`);
        }
        continue;
      }

      try {
        const ok = res.write(chunk);
        if (ok) {
          state.backpressureCount = 0;
          state.lastDrainTimestamp = now;
        } else {
          state.backpressureCount++;
          // Entrou em draining: marca, atualiza timestamp e starta timer individual.
          state.draining = true;
          state.drainingAt = now;
          this.maybePauseFlow(key, s, state);
          this.armDrainingTimer(key, res);

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
            this.maybeResumeFlow(key, s);
          });
        }
      } catch {
        this.removeClientByReason(key, s, res, 'write-exception');
      }
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
    s.flowPaused = false;

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

  private armDrainingTimer(key: string, res: Response): void {
    const s = this.sessions.get(key);
    if (!s || s.killed) return;
    const state = s.clients.get(res);
    if (!state || !state.draining) return;

    if (state.drainingTimer) clearTimeout(state.drainingTimer);
    state.drainingTimer = setTimeout(() => {
      const s2 = this.sessions.get(key);
      if (!s2 || s2.killed) return;
      const st = s2.clients.get(res);
      if (!st || !st.draining) return; // Ja drenou antes do timer

      const drainingMs = st.drainingAt ? Date.now() - st.drainingAt : DRAINING_DROP_TIMEOUT_MS;
      const shouldDropSingle = s2.clients.size === 1;
      const shouldDropMulti = st.backpressureCount >= BACKPRESSURE_DROP_THRESHOLD;
      if (shouldDropSingle || shouldDropMulti) {
        logger.warn(
          `[stream-registry] Cliente draining prolongado, encerrando: key=${key} client=${st.id} drainingMs=${drainingMs} backpressure=${st.backpressureCount}`,
        );
        this.removeClientByReason(key, s2, res, `draining-timeout>${drainingMs}ms`);
        if (s2.clients.size === 0) {
          logger.info(`[stream-registry] Zero clientes apos drop draining, encerrando: key=${key}`);
          void this.kill(key);
        }
        return;
      }

      logger.warn(
        `[stream-registry] Cliente ainda drenando, mantendo conexao: key=${key} client=${st.id} drainingMs=${drainingMs} backpressure=${st.backpressureCount}`,
      );
      this.armDrainingTimer(key, res);
    }, DRAINING_DROP_TIMEOUT_MS);
  }

  private removeClientByReason(
    key: string,
    session: StreamSession,
    res: Response,
    reason: string,
  ): void {
    const state = session.clients.get(res);
    if (!state) return;
    if (state.drainingTimer) {
      clearTimeout(state.drainingTimer);
      state.drainingTimer = null;
    }
    session.clients.delete(res);
    this.maybeResumeFlow(key, session);
    logger.info(`[stream-registry] -cliente key=${key} client=${state.id} reason=${reason} restantes=${session.clients.size}`);
    try { if (!res.writableEnded) res.end(); } catch { /* */ }
  }

  private hasDrainingClient(session: StreamSession): boolean {
    for (const state of session.clients.values()) {
      if (state.draining) return true;
    }
    return false;
  }

  private maybePauseFlow(key: string, session: StreamSession, state: ClientState): void {
    // Fase atual: estabilizar 1 cliente sem dropar chunks.
    // Em modo 1 cliente, pausamos a origem ao entrar em draining para aplicar
    // backpressure real no processo filho (stdout.pause()).
    if (session.clients.size !== 1 || session.flowPaused || !session.flowControl) return;
    session.flowPaused = true;
    try { session.flowControl.pause(); } catch { /* */ }
    logger.warn(`[stream-registry] Pausando origem por backpressure: key=${key} client=${state.id}`);
  }

  private maybeResumeFlow(key: string, session: StreamSession): void {
    if (!session.flowPaused || !session.flowControl) return;
    if (this.hasDrainingClient(session)) return;
    session.flowPaused = false;
    try { session.flowControl.resume(); } catch { /* */ }
    logger.info(`[stream-registry] Retomando origem: key=${key}`);
  }

  /**
   * Idle watchdog: roda a cada IDLE_CLIENT_TIMEOUT_MS (30s) e remove:
   *
   * 1. Clientes phantom (VLC sem FIN): writableNeedDrain=true + idleMs >= 30s.
   * 2. Clientes marcados com erro.
   *
   * O caso de draining stuck e tratado pelo timer individual por cliente (25s),
   * entao este watchdog foca apenas em conexoes fantasma de longa duracao.
   */
  private startIdleWatchdog(key: string): void {
    const s = this.sessions.get(key);
    if (!s) return;

    const check = () => {
      if (s.killed) return;

      const now = Date.now();
      const toRemove: Array<{ res: Response; reason: string }> = [];

      for (const [res, state] of s.clients) {
        const idleMs = now - state.lastDrainTimestamp;
        const isNeedDrain = (res as unknown as { writableNeedDrain?: boolean }).writableNeedDrain ?? false;

        const phantomConnection = isNeedDrain && idleMs >= IDLE_CLIENT_TIMEOUT_MS;

        if (state.markedForRemoval || phantomConnection) {
          const reason = state.markedForRemoval ? 'markedForRemoval' : `phantom idleMs=${idleMs}`;
          logger.warn(`[stream-registry] Cliente removido (watchdog): key=${key} client=${state.id} reason=${reason}`);
          toRemove.push({ res, reason });
        }
      }

      for (const item of toRemove) this.removeClientByReason(key, s, item.res, `watchdog:${item.reason}`);

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
