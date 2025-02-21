import { Beatmapset } from './Beatmapset';
import { pick } from 'ramda';

export const BeatmapSample = {
  beatmapset_id: 3,
  id: 53,
  checksum: '1d23c37a2fda439be752ae2bca06c0cd',
  version: '-Crusin-',
  mode: 'osu' as 'osu' | 'taiko' | 'mania' | 'fruits',
  difficulty_rating: 1.83,
  accuracy: 4,
  drain: 3,
  bpm: 172,
  cs: 5,
  ar: 4,
  hit_length: 77,
  status: 'ranked',
};
export type Beatmap = typeof BeatmapSample;
export const BeatmapKeys = Object.keys(BeatmapSample) as (keyof Beatmap)[];
export interface BeatmapWithBeatmapset extends Beatmap {
  beatmapset: Beatmapset;
}

export function trimRawBeatmap(doc: any): Beatmap {
  return pick(BeatmapKeys, doc);
}
