import { AxiosError } from 'axios';

export type TPaginatedResponse<T> = {
  total: number;
  pages: number;
} & T;

export type TResponse<T> = T;

export type TErrorResponse = AxiosError<{
  errors: { message: string }[];
  message?: string;
}>;
