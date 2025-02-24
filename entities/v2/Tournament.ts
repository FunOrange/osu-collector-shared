import * as V1 from '../v1';
import { toFirestoreTimestamp } from '@/shared/entities/v1/FirestoreTimestamp';
import { TournamentBeatmap, TournamentOrganizer } from '@/entities/mysql-entities';
import { User } from '@/shared/entities/v2/User';
import { Beatmap } from '@/shared/entities/v2/Beatmap';

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
  uploader?: User,
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
  uploader: uploader
    ? {
        id: uploader.id,
        username: uploader.username,
        rank: uploader.global_rank,
      }
    : undefined,
  organizers:
    organizers?.map((organizer) => ({
      id: organizer.user_id,
      username: organizer.username,
    })) ?? undefined,
  organizerIds: organizers?.map((organizer) => organizer.user_id),
  dateUploaded: toFirestoreTimestamp(tournament.date_uploaded),
  dateModified: toFirestoreTimestamp(tournament.date_modified),
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
        id: tournamentBeatmap.beatmap_id,
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
