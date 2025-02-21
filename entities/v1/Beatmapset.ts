import * as v2 from '../v2/Beatmapset';

export interface Beatmapset extends Omit<v2.Beatmapset, 'cover'> {
  covers: {
    card: string;
    cover: string;
  };
}
