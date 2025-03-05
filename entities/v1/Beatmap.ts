import { Beatmapset } from './Beatmapset';
import * as v2 from '../v2/Beatmap';

export interface Beatmap extends v2.Beatmap {
  url: string;
  beatmapset: Beatmapset;
}

export const groupBeatmapsets = (beatmaps: Beatmap[]) => {
  if (!beatmaps?.length) {
    return [];
  }
  let groups = [];
  let currentGroup = null;
  for (const beatmap of beatmaps) {
    if (!beatmap.beatmapset) continue;

    if (currentGroup === null) {
      currentGroup = {
        beatmapset: beatmap.beatmapset,
        beatmaps: [beatmap],
      };
    } else if (beatmap.beatmapset.id === currentGroup.beatmapset.id) {
      currentGroup.beatmaps.push(beatmap);
    } else {
      currentGroup.beatmaps.sort((a, b) => b.difficulty_rating - a.difficulty_rating);
      groups.push(currentGroup);
      currentGroup = {
        beatmapset: beatmap.beatmapset,
        beatmaps: [beatmap],
      };
    }
  }
  groups.push(currentGroup);
  return groups.filter(Boolean);
};
