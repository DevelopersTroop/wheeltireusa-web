import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosResponse } from "axios";

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiInstance.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("persist:amani-forged-store");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (!parsedData?.user?.length) return req;
      const parsedUser = JSON.parse(parsedData?.user);
      const accessToken = parsedUser?.accessToken;
      if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  }
  return req;
});

type IBaseQueryArgs<TData> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: TData;
  headers?: Record<string, string>;
  params?: Record<string, any>;
};

type ApiResponse<T> = {
  data: T;
  statusCode: number;
  [key: string]: any;
};

export type TBaseQueryError = {
  error: {
    status: number;
    data: any;
    statusText: string;
    message: string;
  };
};

export const baseQuery =
  <TData = unknown, TRes extends ApiResponse<TData> = ApiResponse<TData>>({
    baseURL = "/",
  }: {
    baseURL?: string;
  }): BaseQueryFn<IBaseQueryArgs<TData>, TData, unknown> =>
  async ({ method = "GET", url, data, headers, params }) => {
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
    } catch (axiosError: any) {
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
  tagTypes: [],
});
