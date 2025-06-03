// import { TPaginatedResponse, TResponse } from "@/app/types/response";
import { baseApi, TBaseQueryError } from './base';
// import {
//   TWishListData,
//   TWishlistItem,
// } from "@/app/types/wishlist";
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
              wishlist_id: wishlist._id,
              title: wishlist.data?.title || '',
              image_url: wishlist.data?.image_url || '',
              category: wishlist.data?.category || {},
              slug: wishlist.slug,
              part_number: wishlist.data?.part_number || '',
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
          url: `/wishlists`,
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
            wishlist_id: baseQueryReturnValue.wishlist._id,
            title: baseQueryReturnValue.wishlist.data.title,
            image_url: baseQueryReturnValue.wishlist.data.image_url,
            category: baseQueryReturnValue.wishlist.data.category,
            slug: baseQueryReturnValue.wishlist.slug,
            part_number: baseQueryReturnValue.wishlist.data.part_number,
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
            description: 'Wishlist created successfully',
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
            description: 'Wishlist Removed successfully',
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
