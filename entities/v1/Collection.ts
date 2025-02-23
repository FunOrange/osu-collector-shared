import { Uploader } from './Uploader';
import { FirestoreTimestamp } from './FirestoreTimestamp';
import * as v2 from '../v2/Collection';

export interface Collection extends Omit<v2.Collection, 'uploader_id' | 'date_uploaded' | 'date_modified'> {
  uploader: Uploader;
  dateUploaded: FirestoreTimestamp;
  dateLastModified: FirestoreTimestamp;
  beatmapCount: number;
  unsubmittedBeatmapCount: number;
  unknownChecksums: [];
  beatmapsets: {
    beatmaps: {
      checksum: string;
      id: number;
    }[];
    id: number;
  }[];
  modes: {
    osu: number;
    taiko: number;
    fruits: number;
    mania: number;
  };
  difficultySpread: DifficultySpread;
  bpmSpread: BpmSpread;
  /**
   * @deprecated
   */
  favouritedBy?: number[];
  favourites: number;
  comments: Comment[];
}

interface DifficultySpread {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
}

interface BpmSpread {
  150: number;
  160: number;
  170: number;
  180: number;
  190: number;
  200: number;
  210: number;
  220: number;
  230: number;
  240: number;
  250: number;
  260: number;
  270: number;
  280: number;
  290: number;
  300: number;
}

export interface Comment {
  date: FirestoreTimestamp;
  upvotes: number[];
  id: string;
  message: string;
  userId: number;
  username: string;
}
