export type DeepPartial<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof T]?: T[P] extends object
    ? T[P] extends any[]
      ? T[P]
      : DeepPartial<T[P]>
    : T[P];
};
