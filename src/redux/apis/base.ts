import { TErrorResponse } from '@/types/response';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

apiInstance.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem('persist:tirematic-store');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const parsedUser = JSON.parse(parsedData?.user || '{}');
      const accessToken = parsedUser?.accessToken;
      if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  }
  return req;
});

apiInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // If token is expired
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const storedData = localStorage.getItem('persist:tirematic-store');
      const parsedData = storedData ? JSON.parse(storedData) : null;
      const parsedUser = parsedData?.user ? JSON.parse(parsedData.user) : null;
      const refreshToken = parsedUser?.refreshToken;

      if (!refreshToken) return Promise.reject(error);

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({
            resolve: (token: string) => {
              console.log('🚀 ~ token:', token);
              originalRequest.headers.Authorization = 'Bearer ' + token;
              resolve(apiInstance(originalRequest));
            },
            reject: (err: any) => {
              reject(err);
            },
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await apiInstance.post<{
          data: { token: { accessToken: string; refreshToken: string } };
        }>('/auth/refresh-token', {
          refreshToken,
        });

        const newAccessToken = response.data.data.token.accessToken;

        // Update token in localStorage
        parsedUser.accessToken = newAccessToken;
        parsedUser.refreshToken = response.data.data.token.refreshToken;
        localStorage.setItem(
          'persist:tirematic-store',
          JSON.stringify({
            ...parsedData,
            user: JSON.stringify(parsedUser),
          })
        );

        apiInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const err = error as TErrorResponse;

    const message = err?.response?.data?.message || 'Something went wrong';
    const errorsArray = err?.response?.data?.errors;

    if (err.request?.resposneURL?.includes('subscriptions')) {
      return Promise.reject(error);
    }

    if (Array.isArray(errorsArray) && errorsArray.length > 0) {
      toast.error(message, {
        description: errorsArray.map((e) => e?.message),
      });
    } else {
      toast.error(message);
    }

    return Promise.reject(error); // Always return rejected promise to maintain error chain
  }
);

type IBaseQueryArgs<TData> = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: TData;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
};

type ApiResponse<T> = {
  data: T;
  statusCode: number;
  [key: string]: unknown;
};

export type TBaseQueryError = {
  error: {
    status: number;
    data: unknown;
    statusText: string;
    message: string;
  };
};

export const baseQuery =
  <TData = unknown, TRes extends ApiResponse<TData> = ApiResponse<TData>>({
    baseURL = '/',
  }: {
    baseURL?: string;
  }): BaseQueryFn<IBaseQueryArgs<TData>, TData, unknown> =>
  async ({ method = 'GET', url, data, headers, params }) => {
    try {
      const response: AxiosResponse<TRes> = await apiInstance.request({
        method,
        url: baseURL + url,
        data,
        headers,
        params,
      });

      const { statusCode, ...rest } = response.data;

      return {
        data: response.data.data,
        meta: { statusCode, ...rest },
      };
    } catch (axiosError: unknown) {
      const error = axiosError as AxiosError;
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
          message: error.message,
          statusText: error.response?.statusText,
        },
      };
    }
  };

export const baseApi = createApi({
  baseQuery: baseQuery({ baseURL: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: () => ({}),
  refetchOnReconnect: true,
  tagTypes: ['Wishlist'],
});
