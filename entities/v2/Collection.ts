import { assoc, pick, pipe } from 'ramda';

export const CollectionSample = {
  id: 10001,
  name: '/del',
  description: 'No description',
  uploader_id: 9689041,
  date_uploaded: '2023-12-31T11:24:16.000Z',
  date_modified: '2023-12-31T11:24:16.000Z',
};
export type Collection = typeof CollectionSample;
export const CollectionKeys = Object.keys(CollectionSample) as (keyof Collection)[];

export function trimRawCollection(raw: any): Collection {
  return pipe(
    pick(CollectionKeys),
    assoc('uploader_id', raw.uploader.id),
    assoc('date_uploaded', raw.dateUploaded.toDate()),
    assoc('date_modified', raw.dateLastModified.toDate()),
  )(raw);
}
