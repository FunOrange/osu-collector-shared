import { Beatmap } from './Beatmap';
import { Uploader } from './Uploader';
import { FirestoreTimestamp } from './FirestoreTimestamp';

export interface Tournament {
  id: number;
  name: string;
  link: string;
  banner: string;
  downloadUrl: string;
  description: string;
  organizerIds: number[];
  organizers: Organizer[];
  uploader: Uploader;
  rounds: Round[];
  unknownIds: any[];
  dateUploaded: FirestoreTimestamp;
  dateModified: FirestoreTimestamp;
}

export interface Organizer {
  id: number;
  username: string;
}

export interface Round {
  mods: Mod[];
  round: string;
}

export interface Mod {
  mod: string;
  maps: Beatmap[];
}

export interface Beatmapset {
  creator: string;
  artist: string;
  id: number;
  title: string;
  covers: Covers;
}

export interface Covers {
  card: string;
}
