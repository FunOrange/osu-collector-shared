export interface CreateTournamentDto {
  name: string;
  link: string;
  banner?: string;
  downloadUrl?: string;
  description?: string;
  organizers?: number[];
  rounds: {
    round: string;
    mods: {
      mod: string;
      maps: number[];
    }[];
  }[];
}
