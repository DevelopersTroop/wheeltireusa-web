export type TPaginatedResponse<T> = {
  total: number;
  pages: number;
} & T;

export type TResponse<T> = T;
