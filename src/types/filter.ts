export type TPriceFilter = {
  min: number;
  max: number;
};
export type TSingleFilter = {
  value: string | number;
  count: number;
};

export type TFilters = {
  price: TPriceFilter;
} & {
  [filterType: string]: TSingleFilter[];
  model: TSingleFilter[];
  tire_size: TSingleFilter[];
  tire_type: TSingleFilter[];
  diameter: TSingleFilter[];
  brand: TSingleFilter[];
  tire_height: TSingleFilter[];
  load_range: TSingleFilter[];
  load_index: TSingleFilter[];
  speed_index: TSingleFilter[];
  category: TSingleFilter[];
  customer_rating: TSingleFilter[];
  mileage_warranty: TSingleFilter[];
  special_offers: TSingleFilter[];
};
