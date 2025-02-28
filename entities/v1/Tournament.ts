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

const tournamentBeatmapSample = {
  difficulty_rating: 5.74,
  accuracy: 8,
  version: 'Collab Special',
  mode: 'osu',
  cs: 4,
  beatmapset: {
    creator: 'Mirash',
    artist: 'Chikamori Kayako',
    id: 1312079,
    title: 'Kigurumi Sungeki',
    covers: {
      card: 'https://assets.ppy.sh/beatmaps/1312079/covers/card.jpg?1622202395',
    },
  },
  ar: 9,
  checksum: '0c71eb36c90b232bc14ea2d9c2ea5b1e',
  id: 2755564,
  hit_length: 180,
  bpm: 185,
  status: 'ranked',
};
export type TournamentBeatmap = typeof tournamentBeatmapSample;

export interface Mod {
  mod: string;
  maps: (typeof tournamentBeatmapSample)[];
}

export interface Covers {
  card: string;
}

export const flattenTournamentBeatmaps = (tournament: Pick<Tournament, 'id' | 'rounds'>) => {
  const tournamentBeatmaps: {
    tournament_id: number;
    round: string;
    round_sequence: number;
    mod: string;
    mod_sequence: number;
    beatmap_id: number;
    beatmap_sequence: number;
  }[] = [];
  tournament.rounds.forEach((round, round_sequence) => {
    round.mods.forEach((mod, mod_sequence) => {
      mod.maps.forEach((beatmap, beatmap_sequence) => {
        tournamentBeatmaps.push({
          tournament_id: tournament.id,
          round: round.round,
          round_sequence,
          mod: mod.mod,
          mod_sequence,
          beatmap_id: beatmap.id,
          beatmap_sequence,
        });
      });
    });
  });
  return tournamentBeatmaps;
};
