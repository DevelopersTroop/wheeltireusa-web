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
  model: TSingleFilter[];
  tire_size: TSingleFilter[];
  tire_type: TSingleFilter[];
  diameter: TSingleFilter[];
  brand: TSingleFilter[];
  tire_height: TSingleFilter[];
  load_range: TSingleFilter[];
  load_index: TSingleFilter[];
};
