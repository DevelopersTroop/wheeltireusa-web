import { TInventoryItem } from '@/types/product';
import { TPaginatedResponse, TResponse } from '@/types/response';
import { baseApi } from './base';
import { TFilters } from '@/types/filter';

const shouldArray = [
  // Wheel filters
  'wheelDiameter',
  'wheelWidth',
  'color',
  'brand',
  'model',
  'boltPatterns',
  'offset',
  'backspacing',
  'loadRating',
  'centerBore',
  'wheelMaterial',
  'wheelStructure',
  // Tire filters
  'tireDiameter',
  'tireWidth',
  'tireAspectRatio',
  'tireType',
  'tireSize',
  'loadIndex',
  'speedRating',
  'loadRange',
  'mileageWarranty',
  'terrain',
  'sidewall',
  'ply',
  // Accessories filters
  // 'category',
  // Legacy keys (kept for backward compatibility)
  'diameter',
  'customerRating',
  'speedIndex',
];

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
            shallowParams.sort = [{ whom: 'createdAt', order: 'asc' }];
        }

        Object.entries(shallowParams).forEach(([key, value]) => {
          if (shouldArray.includes(key) && typeof value === 'string') {
            shallowParams[key] = value.split(',');
          } else if (key === 'sale') {
            shallowParams[key] = value === 'true' ? true : false;
          } else if (key === 'frontParams' || key === 'rearParams') {
            shallowParams[key] =
              typeof value === 'string' ? JSON.parse(value) : value;
          }
        });
        if (shallowParams.frontParams && !shallowParams.rearParams) {
          Object.assign(shallowParams, {
            rearParams: shallowParams.frontParams,
          });
        }
        const result = await baseQuery({
          url: '/products/list',
          method: 'POST',
          data: { ...shallowParams },
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
    getFilterList: builder.query<
      { filters: TFilters },
      { category?: 'wheels' | 'tire' | 'accessories' } & Record<string, any> | void
    >({
      query: (arg) => {
        if (!arg) {
          return { url: '/products/filter-list', params: { category: 'tire' } };
        }
        const { category, ...rest } = arg;
        return {
          url: '/products/filter-list',
          params: {
            category: category ?? 'tire',
            ...rest,
          },
        };
      },
      transformResponse(
        baseQueryReturnValue: { filters: TFilters },
        _meta,
        arg
      ) {
        if (arg?.category && arg.category !== 'tire') {
          return {
            filters: {
              ...baseQueryReturnValue.filters,
            },
          };
        }
        return {
          filters: {
            ...baseQueryReturnValue.filters
          },
        };
      },
    }),
    searchProduct: builder.query<
      TResponse<{ products: TInventoryItem[] }>,
      string
    >({
      query: (q) => ({
        url: '/products/search',
        params: { q },
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
  useLazySearchProductQuery,
} = products;
