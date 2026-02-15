import { TPaginatedResponse } from '@/types/response';
import { baseApi } from './base';
import { successMessage } from '@/lib/toast';
import { IGallery, IGalleryFormData } from '@/types/gallery';

export interface FilterItem {
  value: string;
  count: number;
}

export interface IGalleryFilters {
  suspensionBrand: FilterItem[];
  wheelDiameter: FilterItem[];
  wheelWidth: FilterItem[];
  tireHeight: FilterItem[];
  tireWidth: FilterItem[];
  wheelOffset: FilterItem[];
  stanceType: FilterItem[];
  spacers: FilterItem[];
  wheelBrand: FilterItem[];
  wheelModel: FilterItem[];
  tireBrand: FilterItem[];
  tireModel: FilterItem[];
}

export const gallery = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGalleries: builder.query<
      TPaginatedResponse<{ galleries: IGallery[] }>,
      any
    >({
      query: (params) => ({
        url: '/galleries/client-list',
        params,
      }),
      providesTags: ['Gallery'],
    }),
    getGallery: builder.query<{ gallery: IGallery }, string>({
      query: (id) => ({
        url: `/galleries/${id}`,
      }),
    }),
    getFilterList: builder.query<IGalleryFilters, void>({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: '/galleries/filter-list',
          method: 'POST',
        });

        // Forward error if baseQuery failed
        if (result.error) {
          return { error: result.error };
        }
        const filtersData = result.data as { filters: IGalleryFilters };
        // Validate and extract data safely
        if (result.data && 'filters' in filtersData) {
          return { data: filtersData.filters };
        }

        // Fallback in case filters not present
        return { error: { status: 500, data: 'Invalid response structure' } };
      },
    }),

    createGallery: builder.mutation<any, IGalleryFormData>({
      query: (data) => ({
        url: '/galleries',
        method: 'POST',
        data: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          successMessage(data?.message || 'Gallery submitted successfully');
        } catch {
          // handle error globally if needed
        }
      },
      invalidatesTags: ['Gallery'],
    }),
  }),
});

export const {
  useGetGalleriesQuery,
  useGetFilterListQuery,
  useGetGalleryQuery,
  useCreateGalleryMutation,
} = gallery;
