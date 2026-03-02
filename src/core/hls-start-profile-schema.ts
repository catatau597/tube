export type HlsPlaylistKind = 'live' | 'vod' | 'upcoming';
export type HlsStartPreset = 'aggressive' | 'moderate' | 'conservative' | 'custom';
export type LiveSourcePriority = 'streamlink-first' | 'yt-dlp-first';
export type VodResolveStrategy = 'auto' | 'android-first' | 'web-first' | 'default-first';

export interface HlsStartProfileValues {
  segmentDurationSeconds: number;
  maxSegments: number;
  deleteThreshold: number | null;
  idleTimeoutSeconds: number;
  manifestTimeoutMs: number;
  minReadySegments: number;
  startOffsetSeconds: number;
  liveSourcePriority: LiveSourcePriority;
  vodResolveStrategy: VodResolveStrategy;
  vodPaceInput: boolean;
}

export interface HlsStartFieldSchema {
  key: keyof HlsStartProfileValues;
  label: string;
  group: 'hls' | 'start' | 'recovery' | 'source';
  type: 'number' | 'select' | 'boolean';
  min?: number;
  max?: number;
  step?: number;
  allowEmpty?: boolean;
  appliesTo: HlsPlaylistKind[] | 'all';
  help: string;
  options?: Array<{ value: string; label: string }>;
}

const DEFAULT_LIVE_SOURCE_PRIORITY: LiveSourcePriority = 'streamlink-first';
const DEFAULT_VOD_RESOLVE_STRATEGY: VodResolveStrategy = 'android-first';
const DEFAULT_VOD_PACE_INPUT = true;

export const HLS_START_PRESETS: Record<Exclude<HlsStartPreset, 'custom'>, Record<HlsPlaylistKind, HlsStartProfileValues>> = {
  aggressive: {
    live: {
      segmentDurationSeconds: 2,
      maxSegments: 10,
      deleteThreshold: 6,
      idleTimeoutSeconds: 30,
      manifestTimeoutMs: 9000,
      minReadySegments: 2,
      startOffsetSeconds: -4,
      liveSourcePriority: DEFAULT_LIVE_SOURCE_PRIORITY,
      vodResolveStrategy: DEFAULT_VOD_RESOLVE_STRATEGY,
      vodPaceInput: DEFAULT_VOD_PACE_INPUT,
    },
    vod: {
      segmentDurationSeconds: 2,
      maxSegments: 16,
      deleteThreshold: null,
      idleTimeoutSeconds: 45,
      manifestTimeoutMs: 12000,
      minReadySegments: 2,
      startOffsetSeconds: -3,
      liveSourcePriority: DEFAULT_LIVE_SOURCE_PRIORITY,
      vodResolveStrategy: 'android-first',
      vodPaceInput: true,
    },
    upcoming: {
      segmentDurationSeconds: 1,
      maxSegments: 8,
      deleteThreshold: null,
      idleTimeoutSeconds: 20,
      manifestTimeoutMs: 5000,
      minReadySegments: 1,
      startOffsetSeconds: -2,
      liveSourcePriority: DEFAULT_LIVE_SOURCE_PRIORITY,
      vodResolveStrategy: DEFAULT_VOD_RESOLVE_STRATEGY,
      vodPaceInput: DEFAULT_VOD_PACE_INPUT,
    },
  },
  moderate: {
    live: {
      segmentDurationSeconds: 2,
      maxSegments: 15,
      deleteThreshold: 15,
      idleTimeoutSeconds: 45,
      manifestTimeoutMs: 15000,
      minReadySegments: 4,
      startOffsetSeconds: -8,
      liveSourcePriority: DEFAULT_LIVE_SOURCE_PRIORITY,
      vodResolveStrategy: DEFAULT_VOD_RESOLVE_STRATEGY,
      vodPaceInput: DEFAULT_VOD_PACE_INPUT,
    },
    vod: {
      segmentDurationSeconds: 2,
      maxSegments: 24,
      deleteThreshold: null,
      idleTimeoutSeconds: 45,
      manifestTimeoutMs: 15000,
      minReadySegments: 3,
      startOffsetSeconds: -6,
      liveSourcePriority: DEFAULT_LIVE_SOURCE_PRIORITY,
      vodResolveStrategy: 'android-first',
      vodPaceInput: true,
    },
    upcoming: {
      segmentDurationSeconds: 2,
      maxSegments: 20,
      deleteThreshold: null,
      idleTimeoutSeconds: 45,
      manifestTimeoutMs: 15000,
      minReadySegments: 4,
      startOffsetSeconds: -8,
      liveSourcePriority: DEFAULT_LIVE_SOURCE_PRIORITY,
      vodResolveStrategy: DEFAULT_VOD_RESOLVE_STRATEGY,
      vodPaceInput: DEFAULT_VOD_PACE_INPUT,
    },
  },
  conservative: {
    live: {
      segmentDurationSeconds: 3,
      maxSegments: 18,
      deleteThreshold: 18,
      idleTimeoutSeconds: 60,
      manifestTimeoutMs: 22000,
      minReadySegments: 5,
      startOffsetSeconds: -12,
      liveSourcePriority: DEFAULT_LIVE_SOURCE_PRIORITY,
      vodResolveStrategy: DEFAULT_VOD_RESOLVE_STRATEGY,
      vodPaceInput: DEFAULT_VOD_PACE_INPUT,
    },
    vod: {
      segmentDurationSeconds: 3,
      maxSegments: 28,
      deleteThreshold: null,
      idleTimeoutSeconds: 60,
      manifestTimeoutMs: 25000,
      minReadySegments: 4,
      startOffsetSeconds: -8,
      liveSourcePriority: DEFAULT_LIVE_SOURCE_PRIORITY,
      vodResolveStrategy: 'auto',
      vodPaceInput: true,
    },
    upcoming: {
      segmentDurationSeconds: 2,
      maxSegments: 24,
      deleteThreshold: null,
      idleTimeoutSeconds: 60,
      manifestTimeoutMs: 18000,
      minReadySegments: 3,
      startOffsetSeconds: -6,
      liveSourcePriority: DEFAULT_LIVE_SOURCE_PRIORITY,
      vodResolveStrategy: DEFAULT_VOD_RESOLVE_STRATEGY,
      vodPaceInput: DEFAULT_VOD_PACE_INPUT,
    },
  },
};

export const HLS_START_FIELDS: HlsStartFieldSchema[] = [
  {
    key: 'segmentDurationSeconds',
    label: 'Segment Duration',
    group: 'hls',
    type: 'number',
    min: 1,
    max: 10,
    step: 1,
    appliesTo: 'all',
    help: 'Duracao alvo de cada segmento HLS. Menor abre mais rapido, mas aumenta overhead.',
  },
  {
    key: 'maxSegments',
    label: 'Max Segments',
    group: 'hls',
    type: 'number',
    min: 4,
    max: 60,
    step: 1,
    appliesTo: 'all',
    help: 'Quantidade maxima de segmentos mantidos na janela da sessao.',
  },
  {
    key: 'deleteThreshold',
    label: 'Delete Threshold',
    group: 'hls',
    type: 'number',
    min: 1,
    max: 60,
    step: 1,
    allowEmpty: true,
    appliesTo: 'all',
    help: 'Historico extra antes de apagar segmentos. Vazio desliga a flag de delete threshold.',
  },
  {
    key: 'idleTimeoutSeconds',
    label: 'Idle Timeout',
    group: 'recovery',
    type: 'number',
    min: 10,
    max: 600,
    step: 5,
    appliesTo: 'all',
    help: 'Tempo sem requests de manifesto/segmento antes de encerrar a sessao.',
  },
  {
    key: 'manifestTimeoutMs',
    label: 'Manifest Timeout',
    group: 'start',
    type: 'number',
    min: 1000,
    max: 60000,
    step: 500,
    appliesTo: 'all',
    help: 'Tempo maximo aguardando o manifesto atingir condicao minima de abertura.',
  },
  {
    key: 'minReadySegments',
    label: 'Min Ready Segments',
    group: 'start',
    type: 'number',
    min: 1,
    max: 10,
    step: 1,
    appliesTo: 'all',
    help: 'Numero minimo de segmentos listados antes de liberar o manifesto ao cliente.',
  },
  {
    key: 'startOffsetSeconds',
    label: 'Start Offset',
    group: 'start',
    type: 'number',
    min: -30,
    max: 0,
    step: 1,
    appliesTo: 'all',
    help: 'Offset negativo usado em #EXT-X-START para clientes novos entrarem atras do topo.',
  },
  {
    key: 'liveSourcePriority',
    label: 'Live Source Priority',
    group: 'source',
    type: 'select',
    appliesTo: ['live'],
    help: 'Define se live tenta streamlink primeiro ou vai direto para o fallback yt-dlp.',
    options: [
      { value: 'streamlink-first', label: 'Streamlink primeiro' },
      { value: 'yt-dlp-first', label: 'yt-dlp primeiro' },
    ],
  },
  {
    key: 'vodResolveStrategy',
    label: 'VOD Resolve Strategy',
    group: 'source',
    type: 'select',
    appliesTo: ['vod'],
    help: 'Ordem preferida de tentativa do yt-dlp para resolver a URL final do VOD.',
    options: [
      { value: 'android-first', label: 'Android first' },
      { value: 'web-first', label: 'Web first' },
      { value: 'default-first', label: 'Default first' },
      { value: 'auto', label: 'Auto' },
    ],
  },
  {
    key: 'vodPaceInput',
    label: 'VOD Pace Input',
    group: 'source',
    type: 'boolean',
    appliesTo: ['vod'],
    help: 'Controla uso de -re no ffmpeg do VOD para manter fluxo compartilhado em tempo real.',
  },
];

export function clonePresetValues(values: HlsStartProfileValues): HlsStartProfileValues {
  return { ...values };
}

function flatKey(kind: HlsPlaylistKind, suffix: string): string {
  return `HLS_START_${kind.toUpperCase()}_${suffix}`;
}

export function getHlsStartDefaultSettings(): Record<string, string> {
  const defaults: Record<string, string> = {
    HLS_START_GLOBAL_PROFILE: 'moderate',
  };

  const moderate = HLS_START_PRESETS.moderate;
  for (const kind of ['live', 'vod', 'upcoming'] as HlsPlaylistKind[]) {
    defaults[flatKey(kind, 'INHERIT_GLOBAL')] = 'true';
    defaults[flatKey(kind, 'PROFILE')] = 'moderate';
    defaults[flatKey(kind, 'SEGMENT_DURATION')] = String(moderate[kind].segmentDurationSeconds);
    defaults[flatKey(kind, 'MAX_SEGMENTS')] = String(moderate[kind].maxSegments);
    defaults[flatKey(kind, 'DELETE_THRESHOLD')] = moderate[kind].deleteThreshold == null ? '' : String(moderate[kind].deleteThreshold);
    defaults[flatKey(kind, 'IDLE_TIMEOUT_SECONDS')] = String(moderate[kind].idleTimeoutSeconds);
    defaults[flatKey(kind, 'MANIFEST_TIMEOUT_MS')] = String(moderate[kind].manifestTimeoutMs);
    defaults[flatKey(kind, 'MIN_READY_SEGMENTS')] = String(moderate[kind].minReadySegments);
    defaults[flatKey(kind, 'START_OFFSET_SECONDS')] = String(moderate[kind].startOffsetSeconds);
    defaults[flatKey(kind, 'LIVE_SOURCE_PRIORITY')] = moderate[kind].liveSourcePriority;
    defaults[flatKey(kind, 'VOD_RESOLVE_STRATEGY')] = moderate[kind].vodResolveStrategy;
    defaults[flatKey(kind, 'VOD_PACE_INPUT')] = String(moderate[kind].vodPaceInput);
  }

  return defaults;
}

export function getHlsStartSchema() {
  return {
    presets: HLS_START_PRESETS,
    fields: HLS_START_FIELDS,
    defaults: getHlsStartDefaultSettings(),
  };
}
