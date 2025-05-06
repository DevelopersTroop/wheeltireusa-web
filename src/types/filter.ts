export type TPriceFilter = {
  min: number;
  max: number;
};
export type TSingleFilter = {
  value: string | number;
  count: number;
};

export type TFilters = {
  [filterType: string | 'price']: TPriceFilter | TSingleFilter[];
};
