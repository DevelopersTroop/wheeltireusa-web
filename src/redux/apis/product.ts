import { TInventoryItem } from '@/types/product';
import { TPaginatedResponse } from '@/types/response';
import { baseApi } from './base';
import { TFilters } from '@/types/filter';

const products = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      TPaginatedResponse<{ products: TInventoryItem[] }>,
      any
    >({
      query: (params) => ({ params, url: '/products/list' }),
    }),
    getProduct: builder.query<{ product: TInventoryItem }, string>({
      query: (slug) => ({ url: `/products/${slug}` }),
    }),
    getFilterList: builder.query<{ filters: TFilters }, any>({
      query: (params) => ({ params, url: '/products/filter-list' }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetFilterListQuery,
  useLazyGetFilterListQuery,
} = products;
