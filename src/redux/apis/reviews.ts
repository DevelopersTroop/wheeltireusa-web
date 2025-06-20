import { TReview } from '@/types/reviews';
import { baseApi } from './base';
import { toast } from 'sonner';
import { TPaginatedResponse } from '@/types/response';

const reviews = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<
      { review: TReview },
      { productId: string; comment: string; rating: number }
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
      TPaginatedResponse<{ reviews: TReview[] }>,
      string
    >({
      query: (productId) => ({
        url: `/reviews/${productId}`,
      }),
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviews;
