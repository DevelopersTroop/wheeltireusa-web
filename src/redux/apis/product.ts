import { TInventoryItem } from '@/types/product';
import { TPaginatedResponse, TResponse } from '@/types/response';
import { baseApi } from './base';
import { TFilters } from '@/types/filter';

const shouldArray = [
  'model',
  'tire_size',
  'diameter',
  'tire_type',
  'customer_rating',
  'speed_index',
  'load_index',
  'mileage_warranty',
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
            shallowParams.sort = [{ whom: '_id', order: 'desc' }];
        }

        Object.entries(shallowParams).forEach(([key, value]) => {
          console.log(value, typeof value === 'string' && value?.split(','));
          if (shouldArray.includes(key) && typeof value === 'string') {
            shallowParams[key] = value.split(',');
          } else if (key === 'sale') {
            shallowParams[key] = value === 'true' ? true : false;
          } else if (key === 'frontParams' || key === 'rearParams') {
            shallowParams[key] =
              typeof value === 'string' ? JSON.parse(value) : value;
          }
        });

        console.log('Shallow params', shallowParams);
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
      transformResponse(baseQueryReturnValue: { filters: TFilters }) {
        return {
          filters: {
            ...baseQueryReturnValue.filters,
            speed_index: [
              {
                value: 'H',
                count: 0,
              },
              {
                value: 'T',
                count: 0,
              },
              {
                value: 'V',
                count: 0,
              },
              {
                value: 'W',
                count: 0,
              },
              {
                value: 'Y',
                count: 0,
              },
              {
                value: 'Z',
                count: 0,
              },
              {
                value: 'Q',
                count: 0,
              },
              {
                value: 'S',
                count: 0,
              },
            ],
            category: [
              {
                value: 'Passenger',
                count: 0,
              },
              {
                value: 'Truck/SUV',
                count: 0,
              },
              {
                value: 'Truck/SUV - Sport Truck',
                count: 0,
              },
            ],
            customer_rating: [
              {
                value: '5 Stars',
                count: 0,
              },
              {
                value: '4 Stars',
                count: 0,
              },
            ],
            special_offers: [
              {
                value: 'Free Shipping',
                count: 0,
              },
              {
                value: 'Save $100',
                count: 0,
              },
              {
                value: 'Consumer Rebate',
                count: 0,
              },
            ],
            mileage_warranty: [
              {
                value: 'None',
                count: 0,
              },
              {
                value: '30,000 miles',
                count: 0,
              },
              {
                value: '40,000 miles',
                count: 0,
              },
              {
                value: '50,000 miles',
                count: 0,
              },
              {
                value: '60,000 miles',
                count: 0,
              },
              {
                value: '70,000 miles',
                count: 0,
              },
              {
                value: '80,000 miles',
                count: 0,
              },
              {
                value: '90,000 miles',
                count: 0,
              },
            ],
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
