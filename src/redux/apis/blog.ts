// import { TPaginatedResponse, TResponse } from "@/app/types/response";
import { TPaginatedResponse, TResponse } from '@/types/response';
import { baseApi } from './base';
import { TPost } from '@/types/post';
// import { TPost } from "@/app/types/post";

const blog = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<
      TPaginatedResponse<{ posts: TPost[] }>,
      { size: number; page: number; sort: any[] }
    >({
      query: (params) => {
        return {
          url: `/posts/list`,
          params,
        };
      },
    }),
    getBlogDetails: builder.query<TResponse<{ post: TPost }>, string>({
      query: (slug) => {
        return {
          url: `/posts/${slug}`,
        };
      },
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogDetailsQuery,
  useLazyGetBlogsQuery,
} = blog;
