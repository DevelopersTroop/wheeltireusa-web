import { TResponse } from './../../types/response';
import { baseApi } from './base';

const ymm = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegions: builder.query<
      TResponse<{ regions: Record<string, number> }>,
      void
    >({
      query: () => ({
        url: '/year-makes/regions',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetRegionsQuery, useLazyGetRegionsQuery } = ymm;
