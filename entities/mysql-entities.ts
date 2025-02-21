import { RowDataPacket } from "mysql2";

export type SELECT<T> = (T & RowDataPacket)[];

export type CollectionBeatmap = {
  collection_id: number;
  beatmap_id: number;
};

export enum SQLTable {
  Users = "users",
  Beatmaps = "beatmaps",
  Beatmapsets = "beatmapsets",
  Collections = "collections",
  CollectionBeatmaps = "collection_beatmaps",
  CollectionPendingBeatmaps = "collection_pending_beatmaps",
}
