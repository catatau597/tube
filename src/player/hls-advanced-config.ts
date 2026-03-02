import { getConfig, getConfigBool, getConfigNumber } from '../core/config-manager';
import {
  clonePresetValues,
  getHlsStartDefaultSettings,
  HlsPlaylistKind,
  HlsStartPreset,
  HlsStartProfileValues,
  HLS_START_PRESETS,
  LiveSourcePriority,
  VodResolveStrategy,
} from '../core/hls-start-profile-schema';

function getStringWithDefault(key: string): string {
  const value = getConfig(key);
  if (value !== '') return value;
  return getHlsStartDefaultSettings()[key] ?? '';
}

function getBoolWithDefault(key: string): boolean {
  const value = getConfig(key);
  if (value === '') return (getHlsStartDefaultSettings()[key] ?? '').toLowerCase() === 'true';
  return getConfigBool(key);
}

function getNumberWithDefault(key: string): number {
  const fallback = Number(getHlsStartDefaultSettings()[key]);
  return getConfigNumber(key, fallback);
}

function getOptionalNumberWithDefault(key: string): number | null {
  const value = getConfig(key);
  if (value.trim() === '') {
    const fallback = getHlsStartDefaultSettings()[key] ?? '';
    return fallback.trim() === '' ? null : Number(fallback);
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function isPreset(value: string): value is Exclude<HlsStartPreset, 'custom'> {
  return value === 'aggressive' || value === 'moderate' || value === 'conservative';
}

function kindPrefix(kind: HlsPlaylistKind): string {
  return `HLS_START_${kind.toUpperCase()}`;
}

function readCustomValues(kind: HlsPlaylistKind): HlsStartProfileValues {
  const prefix = kindPrefix(kind);
  return {
    segmentDurationSeconds: getNumberWithDefault(`${prefix}_SEGMENT_DURATION`),
    maxSegments: getNumberWithDefault(`${prefix}_MAX_SEGMENTS`),
    deleteThreshold: getOptionalNumberWithDefault(`${prefix}_DELETE_THRESHOLD`),
    idleTimeoutSeconds: getNumberWithDefault(`${prefix}_IDLE_TIMEOUT_SECONDS`),
    manifestTimeoutMs: getNumberWithDefault(`${prefix}_MANIFEST_TIMEOUT_MS`),
    minReadySegments: getNumberWithDefault(`${prefix}_MIN_READY_SEGMENTS`),
    startOffsetSeconds: getNumberWithDefault(`${prefix}_START_OFFSET_SECONDS`),
    liveSourcePriority: getStringWithDefault(`${prefix}_LIVE_SOURCE_PRIORITY`) as LiveSourcePriority,
    vodResolveStrategy: getStringWithDefault(`${prefix}_VOD_RESOLVE_STRATEGY`) as VodResolveStrategy,
    vodPaceInput: getBoolWithDefault(`${prefix}_VOD_PACE_INPUT`),
  };
}

export function resolveHlsProfile(kind: HlsPlaylistKind): HlsStartProfileValues {
  const inheritGlobal = getBoolWithDefault(`${kindPrefix(kind)}_INHERIT_GLOBAL`);
  const globalProfile = getStringWithDefault('HLS_START_GLOBAL_PROFILE');
  const scopedProfile = getStringWithDefault(`${kindPrefix(kind)}_PROFILE`);

  let base: HlsStartProfileValues;
  if (inheritGlobal && isPreset(globalProfile)) {
    base = clonePresetValues(HLS_START_PRESETS[globalProfile][kind]);
  } else if (isPreset(scopedProfile)) {
    base = clonePresetValues(HLS_START_PRESETS[scopedProfile][kind]);
  } else {
    base = clonePresetValues(HLS_START_PRESETS.moderate[kind]);
  }

  if (!inheritGlobal && scopedProfile === 'custom') {
    return readCustomValues(kind);
  }

  return base;
}
