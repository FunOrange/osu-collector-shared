import * as V1 from '../entities/v1';

export interface UpdateTournamentDto {
  name?: string;
  link?: string;
  banner?: string;
  downloadUrl?: string;
  description?: string;
  organizers?: number[];
  rounds?: V1.Tournament['rounds'];
}
