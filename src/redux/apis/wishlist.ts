import { baseApi, TBaseQueryError } from './base';
import { toast } from 'sonner';
import { TPaginatedResponse, TResponse } from '@/types/response';
import { TWishListData, TWishlistItem } from '@/types/wishlist';

const wishlist = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<
      TPaginatedResponse<{ wishlists: TWishListData[] }>,
      void
    >({
      query: () => {
        return {
          url: `/wishlists/list`,
        };
      },
      providesTags: ['Wishlist'],
      transformResponse(
        baseQueryReturnValue: TPaginatedResponse<{
          wishlists: TWishlistItem[];
        }>
      ): TPaginatedResponse<{ wishlists: TWishListData[] }> {
        console.log('🚀 ~ baseQueryReturnValue:', baseQueryReturnValue);
        return {
          pages: baseQueryReturnValue.pages,
          total: baseQueryReturnValue.total,
          wishlists: baseQueryReturnValue.wishlists.map((wishlist) => {
            return {
              wishlist_id: wishlist.id,
              title: wishlist.data?.title || '',
              imageUrl: wishlist.data?.imageUrl || '',
              category: wishlist.data?.category || {},
              slug: wishlist.slug,
              partNumber: wishlist.data?.partNumber || '',
            };
          }),
        };
      },
    }),
    createWishlist: builder.mutation<
      TResponse<{ wishlist: TWishListData }>,
      any
    >({
      query: (body) => {
        return {
          url: `/wishlists/${body.slug}`,
          method: 'POST',
          data: body,
        };
      },
      transformResponse(
        baseQueryReturnValue: TResponse<{ wishlist: TWishlistItem }>
      ): TResponse<{ wishlist: TWishListData }> {
        console.log(baseQueryReturnValue);
        return {
          wishlist: {
            wishlist_id: baseQueryReturnValue.wishlist.id,
            title: baseQueryReturnValue.wishlist.data.title,
            imageUrl: baseQueryReturnValue.wishlist.data.imageUrl,
            category: baseQueryReturnValue.wishlist.data.category,
            slug: baseQueryReturnValue.wishlist.slug,
            partNumber: baseQueryReturnValue.wishlist.data.partNumber,
          },
        };
      },

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            wishlist.util.updateQueryData('getWishlist', undefined, (draft) => {
              draft.wishlists.push(data.wishlist);
            })
          );
          toast('Success', {
            description: 'Product added to favourite list',
          });
        } catch (error) {
          const err = error as TBaseQueryError;
          console.log('Error creating wishlist:', err);
          // if (err.error.status === 401) {
          //   toast("Login required",{
          //     description: "Please login first test",
          //   });
          // }
        }
      },
    }),
    removeWishlist: builder.mutation<
      TResponse<{ wishlist: TWishListData }>,
      string
    >({
      query: (id) => {
        return {
          url: `/wishlists/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            wishlist.util.updateQueryData('getWishlist', undefined, (draft) => {
              draft.wishlists = draft.wishlists.filter(
                (wishlist) => wishlist.wishlist_id !== arg
              );
            })
          );
          toast('Success', {
            description: 'Product removed from favourite list',
          });
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useCreateWishlistMutation,
  useRemoveWishlistMutation,
} = wishlist;
