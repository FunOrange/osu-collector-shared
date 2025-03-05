import { safe } from '@/utils/string-utils';

export const endpoints = {
  collections: {
    POST: '/api/collections',
    popularv2: { GET: '/api/collections/popularv2' },
    recent: { GET: '/api/collections/recent' },
    search: { GET: '/api/collections/search' },
    id: (collectionId: number) => ({
      GET: safe`/api/collections/${collectionId}`,
      DELETE: safe`/api/collections/${collectionId}`,
      collectionDb: {
        export: { GET: safe`/api/collections/${collectionId}/collectionDb/export` },
        merge: { GET: safe`/api/collections/${collectionId}/collectionDb/merge` },
      },
      comments: {
        POST: safe`/api/collections/${collectionId}/comments`,
        id: (commentId: number) => ({
          GET: safe`/api/collections/${collectionId}/comments/${commentId}`,
          like: { POST: safe`/api/collections/${collectionId}/comments/${commentId}/like` },
        }),
      },
      beatmapsv2: { GET: safe`/api/collections/${collectionId}/beatmapsv2` },
      beatmapsv3: { GET: safe`/api/collections/${collectionId}/beatmapsv3` },
      favourite: {
        POST: safe`/api/collections/${collectionId}/favourite`,
        DELETE: safe`/api/collections/${collectionId}/favourite`,
      },
      rename: {
        PUT: safe`/api/collections/${collectionId}/rename`,
      },
      description: {
        PUT: safe`/api/collections/${collectionId}/description`,
      },
    }),
  },
};
