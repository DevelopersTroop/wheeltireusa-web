import { TInventoryItem } from '@/types/product';
import { TPaginatedResponse } from '@/types/response';
import { baseApi } from './base';

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
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = products;
