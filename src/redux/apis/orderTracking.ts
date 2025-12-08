import { TResponse } from '@/types/response';
import { baseApi } from './base';
import { TOrder } from '@/types/order';

export const orderTracking = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    trackByOrder: builder.mutation<
      TResponse<{ order: TOrder | null }>,
      { orderNumber: string; zipCode: string }
    >({
      query: (data) => ({
        data,
        url: '/orders/track-by-order',
        method: 'POST',
      }),
    }),
    trackByEmail: builder.mutation<
      TResponse<{
        orders: {
          orderId: string;
          status: string;
          createdAt: Date;
          currentSnapStep: Date;
          totalCost: string;
          netCost: string;
          productsCount: number;
          totalWithTax: number;
        }[];
      }>,
      { email: string; zipCode: string }
    >({
      query: (data) => ({
        data,
        url: '/orders/track-by-email',
        method: 'POST',
      }),
    }),
  }),
});

export const { useTrackByEmailMutation, useTrackByOrderMutation } =
  orderTracking;
