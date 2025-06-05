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
      query: (params) => {
        const shallowParams = { ...params };
        console.log(shallowParams);
        switch (shallowParams?.sort) {
          case 'Sort by price (high to low)':
            shallowParams.sort = [{ whom: 'price', order: 'desc' }];
            break;
          case 'Sort by price (low to high)':
            shallowParams.sort = [{ whom: 'price', order: 'asc' }];
            break;
          case 'Sort by name (A to Z)':
            shallowParams.sort = [{ whom: 'description', order: 'asc' }];
            break;
          case 'Sort by name (Z to A)':
            shallowParams.sort = [{ whom: 'description', order: 'desc' }];
            break;
          default:
            shallowParams.sort = [{ whom: '_id', order: 'desc' }];
        }
        return { params: shallowParams, url: '/products/list' };
      },
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
