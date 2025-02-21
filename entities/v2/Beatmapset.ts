import { assoc, pick, pipe } from 'ramda';

export const BeatmapsetSample = {
  id: 29,
  creator: 'MCXD',
  artist: 'Hinoi Team',
  artist_unicode: 'Hinoi Team',
  title: 'Emoticons',
  title_unicode: 'Emoticons',
  bpm: 153,
  cover: 'https://assets.ppy.sh/beatmaps/31/covers/cover.jpg?1622017904',
  submitted_date: '2007-10-07T22:52:27+00:00',
  last_updated: '2007-10-07T22:52:27+00:00',
  ranked_date: '2007-10-07T22:52:27+00:00',
  favourite_count: 108,
  status: 'ranked',
};
export type Beatmapset = typeof BeatmapsetSample;
export const BeatmapsetKeys = Object.keys(BeatmapsetSample) as (keyof Beatmapset)[];

export function trimRawBeatmapset(raw: any): Beatmapset {
  return pipe(pick(BeatmapsetKeys), assoc('cover', raw.covers?.cover))(raw) as Beatmapset;
}
