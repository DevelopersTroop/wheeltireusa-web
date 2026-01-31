export type IApiRes<T, K extends keyof T & string = keyof T & string> = {
  total?: number;
  pages?: number;
} & {
  [U in K]: T[U];
};
