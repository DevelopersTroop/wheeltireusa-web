// src/stores/api/fileApi.ts

import { successMessage } from '@/lib/toast';
import { baseApi } from './base';

export const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/files/upload',
        method: 'POST',
        data: formData,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          successMessage(data?.message || 'File uploaded successfully');
        } catch {
          // handle error globally if needed
        }
      },
      invalidatesTags: ['File'],
    }),

    removeFile: builder.mutation<any, { path: string }>({
      query: ({ path }) => ({
        url: `/files?path=${encodeURIComponent(path)}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          successMessage(data?.message || 'File removed successfully');
        } catch {
          // handle error globally if needed
        }
      },
      invalidatesTags: ['File'],
    }),
  }),
});

export const { useUploadFileMutation, useRemoveFileMutation } = fileApi;
