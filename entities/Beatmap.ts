import { Beatmapset, trimRawBeatmapset } from "./Beatmapset";
import { assoc, pick, pipe } from "ramda";

export const BeatmapSample = {
  beatmapset_id: 3,
  id: 53,
  checksum: "1d23c37a2fda439be752ae2bca06c0cd",
  version: "-Crusin-",
  mode: "osu" as "osu" | "taiko" | "mania" | "fruits",
  difficulty_rating: 1.83,
  accuracy: 4,
  drain: 3,
  bpm: 172,
  cs: 5,
  ar: 4,
  hit_length: 77,
  status: "ranked",
};
export type Beatmap = typeof BeatmapSample;
export const BeatmapKeys = Object.keys(BeatmapSample) as (keyof Beatmap)[];
export interface BeatmapWithBeatmapset extends Beatmap {
  beatmapset: Beatmapset;
}

export function trimRawBeatmap(doc: any): Beatmap {
  return pick(BeatmapKeys, doc);
}

// interface Failtimes {
//   fail: number[];
//   exit: number[];
// }

export const groupBeatmapsets = (beatmaps: BeatmapWithBeatmapset[]) => {
  if (beatmaps?.length === 0) {
    return [];
  }
  let currentGroup: {
    beatmapset: Beatmapset;
    beatmaps: Beatmap[];
  } = null;
  let groups: (typeof currentGroup)[] = [];
  for (const beatmap of beatmaps) {
    if (currentGroup === null) {
      currentGroup = {
        beatmapset: beatmap.beatmapset,
        beatmaps: [beatmap],
      };
    } else if (beatmap.beatmapset.id === currentGroup.beatmapset.id) {
      currentGroup.beatmaps.push(beatmap);
    } else {
      currentGroup.beatmaps.sort(
        (a, b) => b.difficulty_rating - a.difficulty_rating,
      );
      groups.push(currentGroup);
      currentGroup = {
        beatmapset: beatmap.beatmapset,
        beatmaps: [beatmap],
      };
    }
  }
  groups.push(currentGroup);
  return groups;
};
