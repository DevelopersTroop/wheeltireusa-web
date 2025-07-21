import { TReview } from '@/types/reviews';
import { baseApi } from './base';
import { toast } from 'sonner';
import { TPaginatedResponse } from '@/types/response';

const reviews = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<
      { review: TReview },
      { productId: number; comment: string; rating: number }
    >({
      query(data) {
        return {
          url: '/reviews',
          method: 'POST',
          data,
        };
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('Your review is submitted');
        } catch {
          console.log('Review error');
        }
      },
    }),
    getReviews: builder.query<
      TPaginatedResponse<{
        reviews: TReview[];
        average: number;
        currentPage: number;
        count: number;
      }>,
      { productId: number; page: number }
    >({
      query: (productId) => ({
        url: `/reviews/${productId.productId}`,
        params: { page: productId.page },
      }),
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviews;
