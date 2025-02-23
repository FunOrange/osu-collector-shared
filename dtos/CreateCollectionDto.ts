export interface CreateCollectionDto {
  name: string;
  beatmapChecksums: string[];
}
export type CreateCollectionsDto = CreateCollectionDto[];
