import * as V1 from '../v1';
import { toFirestoreTimestamp } from '../v1/FirestoreTimestamp';
import { User } from './User';
import { Beatmap } from './Beatmap';

export interface Tournament {
  id: number;
  name: string;
  link: string;
  banner: string;
  download_url: string;
  description: string;
  uploader_id: number;
  date_uploaded: string;
  date_modified: string;
}

export const toV1Tournament = (
  tournament: Tournament,
  uploader?: Pick<User, 'id' | 'username' | 'global_rank'>,
  organizers?: TournamentOrganizer[],
  tournamentBeatmaps?: (TournamentBeatmap &
    Beatmap & {
      beatmapset_id: number;
      beatmapset_artist: string;
      beatmapset_title: string;
      beatmapset_creator: string;
      beatmapset_cover: string;
    })[],
): V1.Tournament => ({
  id: tournament.id,
  name: tournament.name,
  link: tournament.link,
  banner: tournament.banner,
  downloadUrl: tournament.download_url,
  description: tournament.description,
  // @ts-ignore:next-line
  uploader: uploader
    ? {
        id: uploader.id,
        username: uploader.username,
        rank: uploader.global_rank,
      }
    : undefined,
  // @ts-ignore:next-line
  organizers:
    organizers?.map((organizer) => ({
      id: organizer.user_id,
      username: organizer.username,
    })) ?? undefined,
  // @ts-ignore:next-line
  organizerIds: organizers?.map((organizer) => organizer.user_id),
  // @ts-ignore:next-line
  dateUploaded: toFirestoreTimestamp(tournament.date_uploaded),
  // @ts-ignore:next-line
  dateModified: toFirestoreTimestamp(tournament.date_modified),
  // @ts-ignore:next-line
  rounds: (() => {
    if (!tournamentBeatmaps) {
      return undefined;
    }
    const sorted = tournamentBeatmaps.sort((a, b) => {
      if (a.round_sequence !== b.round_sequence) {
        return a.round_sequence - b.round_sequence;
      } else if (a.mod_sequence !== b.mod_sequence) {
        return a.mod_sequence - b.mod_sequence;
      } else {
        return a.beatmap_sequence - b.beatmap_sequence;
      }
    });
    const rounds: V1.Tournament['rounds'] = [];
    for (const tournamentBeatmap of sorted) {
      const push = <T>(arr: T[], item: T): T => {
        arr.push(item);
        return item;
      };
      const round =
        rounds.find(({ round }) => round === tournamentBeatmap.round) ??
        push(rounds, {
          mods: [],
          round: tournamentBeatmap.round,
        });
      const mod =
        round.mods.find(({ mod }) => mod === tournamentBeatmap.mod) ??
        push(round.mods, {
          mod: tournamentBeatmap.mod,
          maps: [],
        });
      mod.maps.push({
        id: tournamentBeatmap.beatmap_id_unsafe,
        checksum: tournamentBeatmap.checksum,
        difficulty_rating: tournamentBeatmap.difficulty_rating,
        accuracy: tournamentBeatmap.accuracy,
        version: tournamentBeatmap.version,
        mode: tournamentBeatmap.mode,
        cs: tournamentBeatmap.cs,
        ar: tournamentBeatmap.ar,
        hit_length: tournamentBeatmap.hit_length,
        bpm: tournamentBeatmap.bpm,
        status: tournamentBeatmap.status,
        beatmapset: {
          id: tournamentBeatmap.beatmapset_id,
          artist: tournamentBeatmap.beatmapset_artist,
          title: tournamentBeatmap.beatmapset_title,
          creator: tournamentBeatmap.beatmapset_creator,
          covers: {
            card: tournamentBeatmap.beatmapset_cover,
          },
        },
      });
    }
    return rounds;
  })(),
});

export interface TournamentBeatmap {
  id: number;
  tournament_id: number;
  round: string;
  round_sequence: number;
  mod: string;
  mod_sequence: number;
  beatmap_id_unsafe: number;
  beatmap_id?: number;
  beatmap_sequence: number;
}

export interface TournamentOrganizer {
  tournament_id: number;
  user_id: number;
  username: string;
}
