import { TInventoryItem, TInventoryListItem } from '@/types/product';
import { TPaginatedResponse } from '@/types/response';
import { baseApi } from './base';
import { TFilters } from '@/types/filter';

const shouldArray = ['model', 'tire_size', 'diameter'];

const products = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      TPaginatedResponse<{ products: TInventoryListItem[] }>,
      any
    >({
      query: (params) => {
        const shallowParams = { ...params };
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

        Object.entries(shallowParams).forEach(([key, value]) => {
          if (
            shouldArray.indexOf(key) !== -1 &&
            typeof value === 'string' &&
            value.includes(',')
          ) {
            shallowParams[key] = value.split(',');
          }
        });

        return { params: shallowParams, url: '/products/list' };
      },
    }),
    getProduct: builder.query<{ product: TInventoryItem }, string>({
      query: (slug) => ({ url: `/products/${slug}` }),
    }),
    getFilterList: builder.query<{ filters: TFilters }, void>({
      query: () => ({
        url: '/products/filter-list',
        params: { category: 'tire' },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductQuery,
  useGetFilterListQuery,
  useLazyGetFilterListQuery,
} = products;
