import { configEvents, getConfigNumber } from './config-manager';
import { logger } from './logger';
import { StateManager } from './state-manager';
import { YouTubeApi } from './youtube-api';

interface SchedulerConfig {
  mainIntervalHours: number;
  preEventWindowHours: number;
  preEventIntervalMinutes: number;
  postEventIntervalMinutes: number;
  fullSyncIntervalHours: number;
  staleHours: number;
  enableActiveHours: boolean;
  activeStartHour: number;
  activeEndHour: number;
  usePlaylistItems: boolean;
  localTimezone: string;
  maxScheduleHours: number;
}

export class Scheduler {
  private config: SchedulerConfig;
  private state: StateManager;
  private api: YouTubeApi;
  private lastMainRun: Date;
  private lastFullSync: Date;
  private lastPreEventRun: Date;
  private lastPostEventRun: Date;
  private isPaused = false;
  private isRunning = false;
  private tickInterval: NodeJS.Timeout | null = null;
  private readonly TICK_MS = 60_000;

  constructor(state: StateManager, api: YouTubeApi, config: SchedulerConfig) {
    this.state = state;
    this.api = api;
    this.config = config;

    const epoch = new Date(0);
    this.lastMainRun = state.getMeta('lastMainRun') ?? epoch;
    this.lastFullSync = state.getMeta('lastFullSync') ?? epoch;
    this.lastPreEventRun = epoch;
    this.lastPostEventRun = epoch;

    configEvents.on('configChanged', (key: string, value: string) => {
      this.onConfigChanged(key, value);
    });
  }

  start(applyInitialDelay = false): void {
    if (this.tickInterval) return;

    if (applyInitialDelay) {
      logger.info('[Scheduler] Iniciado com delay inicial (cache existente detectado).');
      this.lastMainRun = new Date();
    }

    logger.info('[Scheduler] Loop iniciado. Tick a cada 60s.');
    this.tickInterval = setInterval(() => void this.safeTick(), this.TICK_MS);
    void this.safeTick();
  }

  stop(): void {
    if (!this.tickInterval) return;
    clearInterval(this.tickInterval);
    this.tickInterval = null;
    logger.info('[Scheduler] Loop parado.');
  }

  pause(): void {
    this.isPaused = true;
    logger.info('[Scheduler] Pausado. Ticks continuam mas jobs não serão executados.');
  }

  resume(): void {
    this.isPaused = false;
    logger.info('[Scheduler] Retomado.');
  }

  async triggerNow(): Promise<void> {
    logger.info('[Scheduler] Trigger manual recebido. Executando busca principal imediata...');
    this.lastMainRun = new Date(0);
    await this.safeTick();
  }

  /**
   * Sincroniza apenas um canal específico pelo channelId.
   */
  async syncChannel(channelId: string): Promise<void> {
    const channels = this.state.getActiveChannels().filter((ch) => ch.channelId === channelId);
    if (channels.length === 0) {
      logger.warn(`[Scheduler] syncChannel: canal ${channelId} não encontrado ou não está ativo.`);
      return;
    }

    const channel = channels[0];
    logger.info(`[Scheduler] Sincronização individual do canal ${channelId} (${channel.title}).`);

    try {
      const fetchOptions = { maxScheduleHours: this.config.maxScheduleHours };
      const streams = [];
      if (this.config.usePlaylistItems && channel.uploadsPlaylistId) {
        streams.push(...(await this.api.fetchByPlaylistItems(channel.uploadsPlaylistId, fetchOptions)));
      } else {
        streams.push(...(await this.api.fetchBySearch(channel.channelId, fetchOptions)));
      }
      this.state.updateStreams(streams);
      this.state.saveEpgTexts(this.config.localTimezone);
      this.state.mirrorStreamsToDb();
      this.state.saveToDisk();
      logger.info(`[Scheduler] Sincronização individual concluída: ${streams.length} streams.`);
    } catch (error) {
      logger.error(`[Scheduler] Erro na sincronização individual do canal ${channelId}: ${String(error)}`);
    }
  }

  getStatus(): object {
    return {
      running: !!this.tickInterval,
      paused: this.isPaused,
      busy: this.isRunning,
      lastMainRun: this.lastMainRun.toISOString(),
      lastFullSync: this.lastFullSync.toISOString(),
      nextMainRun: new Date(this.lastMainRun.getTime() + this.config.mainIntervalHours * 3_600_000).toISOString(),
      activeLives: this.state.countByStatus('live'),
      activeUpcoming: this.state.countByStatus('upcoming'),
    };
  }

  private async safeTick(): Promise<void> {
    if (this.isRunning) {
      logger.debug('[Scheduler] Tick pulado: tick anterior ainda em execução.');
      return;
    }

    this.isRunning = true;
    try {
      await this.tick();
    } catch (error) {
      logger.error(`[Scheduler] Erro não tratado no tick: ${String(error)}`);
    } finally {
      this.isRunning = false;
    }
  }

  private async tick(): Promise<void> {
    if (this.isPaused) {
      logger.debug('[Scheduler] Tick: pausado, pulando.');
      return;
    }

    const now = new Date();
    const mainIntervalMs = this.config.mainIntervalHours * 3_600_000;
    const timeForMainRun = now.getTime() - this.lastMainRun.getTime() >= mainIntervalMs;

    if (timeForMainRun) {
      if (this.isActiveHour(now)) {
        await this.runMainFetch(now);
      } else {
        logger.info(
          `[Scheduler] Busca principal pulada: fora do horário ativo (${this.config.activeStartHour}h–${this.config.activeEndHour}h).`,
        );
      }
    }

    const idsToCheck = new Set<string>();

    const preIntervalMs = this.config.preEventIntervalMinutes * 60_000;
    if (now.getTime() - this.lastPreEventRun.getTime() >= preIntervalMs) {
      const ids = this.getPreEventIds(now);
      ids.forEach((id) => idsToCheck.add(id));
      this.lastPreEventRun = now;
      if (ids.size > 0) logger.info(`[Scheduler] ${ids.size} stream(s) na janela pré-evento.`);
    }

    const postIntervalMs = this.config.postEventIntervalMinutes * 60_000;
    if (now.getTime() - this.lastPostEventRun.getTime() >= postIntervalMs) {
      const ids = this.getPostEventIds();
      ids.forEach((id) => idsToCheck.add(id));
      this.lastPostEventRun = now;
      if (ids.size > 0) logger.info(`[Scheduler] ${ids.size} stream(s) live em monitoramento.`);
    }

    const staleIds = this.getStaleIds(now);
    staleIds.forEach((id) => idsToCheck.add(id));

    if (idsToCheck.size > 0) {
      await this.runHighFrequencyCheck(idsToCheck);
    }

    if (timeForMainRun || idsToCheck.size > 0) {
      this.state.saveEpgTexts(this.config.localTimezone);
      this.state.mirrorStreamsToDb();
      this.state.saveToDisk();
      this.logCurrentState();
    }
  }

  private async runMainFetch(now: Date): Promise<void> {
    const fullSyncIntervalMs = this.config.fullSyncIntervalHours * 3_600_000;
    const timeForFullSync = now.getTime() - this.lastFullSync.getTime() >= fullSyncIntervalMs;
    const firstRun = this.lastMainRun.getTime() === 0;

    const channels = this.state.getActiveChannels();
    if (channels.length === 0) {
      logger.warn('[Scheduler] Nenhum canal ativo. Busca pulada.');
      this.lastMainRun = now;
      return;
    }

    const allStreams = [];
    const fetchOptions = { maxScheduleHours: this.config.maxScheduleHours };
    
    logger.info(
      `[Scheduler] Iniciando busca principal. Tipo: ${timeForFullSync || firstRun ? 'full sync' : 'incremental'}. ` +
      `maxScheduleHours: ${this.config.maxScheduleHours}h`,
    );

    for (const channel of channels) {
      try {
        if (this.config.usePlaylistItems && channel.uploadsPlaylistId) {
          allStreams.push(...(await this.api.fetchByPlaylistItems(channel.uploadsPlaylistId, fetchOptions)));
        } else {
          allStreams.push(...(await this.api.fetchBySearch(channel.channelId, fetchOptions)));
        }
      } catch (error) {
        logger.error(`[Scheduler] Erro ao buscar canal ${channel.channelId}: ${String(error)}`);
      }
    }

    this.state.updateStreams(allStreams);
    this.lastMainRun = now;
    this.state.setMeta('lastMainRun', now);
    if (timeForFullSync || firstRun) {
      this.lastFullSync = now;
      this.state.setMeta('lastFullSync', now);
    }
  }

  private async runHighFrequencyCheck(ids: Set<string>): Promise<void> {
    const idList = Array.from(ids);
    logger.info(`[Scheduler] Verificação alta frequência: ${idList.length} stream(s).`);

    try {
      const updatedStreams = await this.api.fetchStreamsByIds(idList);
      this.state.updateStreams(updatedStreams);

      const returnedIds = new Set(updatedStreams.map((stream) => stream.videoId));
      const missingIds = idList.filter((id) => !returnedIds.has(id));
      const toMarkAsEnded = missingIds.filter((id) => {
        const stream = this.state.getStream(id);
        return !!stream && (stream.status === 'live' || stream.status === 'upcoming');
      });

      if (toMarkAsEnded.length > 0) {
        this.state.markAsEnded(toMarkAsEnded);
        logger.warn(`[Scheduler] ${toMarkAsEnded.length} stream(s) não retornados pela API. Marcados como encerrados.`);
      }
    } catch (error) {
      logger.error(`[Scheduler] Erro na verificação de alta frequência: ${String(error)}`);
    }
  }

  private getPreEventIds(now: Date): Set<string> {
    const cutoff = new Date(now.getTime() + this.config.preEventWindowHours * 3_600_000);
    return new Set(
      this.state
        .getAllStreams()
        .filter(
          (stream) =>
            stream.status === 'upcoming' &&
            stream.scheduledStart instanceof Date &&
            stream.scheduledStart > now &&
            stream.scheduledStart < cutoff,
        )
        .map((stream) => stream.videoId),
    );
  }

  private getPostEventIds(): Set<string> {
    return new Set(
      this.state
        .getAllStreams()
        .filter((stream) => stream.status === 'live' && stream.actualStart instanceof Date && !stream.actualEnd)
        .map((stream) => stream.videoId),
    );
  }

  private getStaleIds(now: Date): Set<string> {
    const staleCutoff = new Date(now.getTime() - this.config.staleHours * 3_600_000);
    return new Set(
      this.state
        .getAllStreams()
        .filter(
          (stream) =>
            (stream.status === 'live' || stream.status === 'upcoming') &&
            stream.fetchTime instanceof Date &&
            stream.fetchTime < staleCutoff,
        )
        .map((stream) => stream.videoId),
    );
  }

  private isActiveHour(now: Date): boolean {
    if (!this.config.enableActiveHours) return true;

    const localHour = new Date(now.toLocaleString('en-US', { timeZone: this.config.localTimezone })).getHours();
    return localHour >= this.config.activeStartHour && localHour < this.config.activeEndHour;
  }

  private logCurrentState(): void {
    logger.info(
      `[Scheduler] Estado: ${this.state.countByStatus('live')} live | ${this.state.countByStatus('upcoming')} upcoming | ${this.state.countByStatus('none')} vod.`,
    );
  }

  private onConfigChanged(key: string, value: string): void {
    switch (key) {
      case 'SCHEDULER_MAIN_INTERVAL_HOURS':
        this.config.mainIntervalHours = Number(value);
        break;
      case 'SCHEDULER_PRE_EVENT_WINDOW_HOURS':
        this.config.preEventWindowHours = Number(value);
        break;
      case 'SCHEDULER_PRE_EVENT_INTERVAL_MINUTES':
        this.config.preEventIntervalMinutes = Number(value);
        break;
      case 'SCHEDULER_POST_EVENT_INTERVAL_MINUTES':
        this.config.postEventIntervalMinutes = Number(value);
        break;
      case 'FULL_SYNC_INTERVAL_HOURS':
        this.config.fullSyncIntervalHours = Number(value);
        break;
      case 'STALE_HOURS':
        this.config.staleHours = Number(value);
        break;
      case 'ENABLE_SCHEDULER_ACTIVE_HOURS':
        this.config.enableActiveHours = value === 'true';
        break;
      case 'SCHEDULER_ACTIVE_START_HOUR':
        this.config.activeStartHour = Number(value);
        break;
      case 'SCHEDULER_ACTIVE_END_HOUR':
        this.config.activeEndHour = Number(value);
        break;
      case 'USE_PLAYLIST_ITEMS':
        this.config.usePlaylistItems = value === 'true';
        break;
      case 'LOCAL_TIMEZONE':
        this.config.localTimezone = value;
        break;
      case 'MAX_SCHEDULE_HOURS':
        this.config.maxScheduleHours = Number(value);
        break;
      default:
        return;
    }
    logger.info(`[Scheduler] Configuração atualizada em hot reload: ${key}=${value}`);
  }
}

export type { SchedulerConfig };
