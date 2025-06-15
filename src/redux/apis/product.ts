import { TInventoryItem } from '@/types/product';
import { TPaginatedResponse } from '@/types/response';
import { baseApi } from './base';
import { TFilters } from '@/types/filter';

const shouldArray = ['model', 'tire_size', 'diameter'];

const products = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      TPaginatedResponse<{ products: TInventoryItem[][] }>,
      any
    >({
      // Custom serialization to support caching with POST
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const normalized = JSON.stringify(queryArgs ?? {});
        return `${endpointName}(${normalized})`;
      },

      // Using queryFn to POST data but keep query behavior
      queryFn: async (params, _queryApi, _extraOptions, baseQuery) => {
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
            shouldArray.includes(key) &&
            typeof value === 'string' &&
            value.includes(',')
          ) {
            shallowParams[key] = value.split(',');
          }
          if (key === 'sale') {
            shallowParams[key] = value === 'true' ? true : false;
          }
        });

        const result = await baseQuery({
          url: '/products/list',
          method: 'POST',
          data: { ...shallowParams, category: 'tire' },
        });

        if (result.error) return { error: result.error };
        return {
          data: result.data as TPaginatedResponse<{
            products: TInventoryItem[][];
          }>,
        };
      },
    }),
    getProduct: builder.query<
      TPaginatedResponse<{ product: TInventoryItem[] }>,
      { slugOne: string; slugTwo: string }
    >({
      // Custom serialization to support caching with POST
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const normalized = JSON.stringify(queryArgs ?? {});
        return `${endpointName}(${normalized})`;
      },

      // Using queryFn to POST data but keep query behavior
      queryFn: async (params, _queryApi, _extraOptions, baseQuery) => {
        const shallowParams = { ...params };

        const result = await baseQuery({
          url: '/products/pair-details',
          method: 'POST',
          data: { ...shallowParams },
        });

        if (result.error) return { error: result.error };
        return {
          data: result.data as TPaginatedResponse<{
            product: TInventoryItem[];
          }>,
        };
      },
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
