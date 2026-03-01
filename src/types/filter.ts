export type TPriceFilter = {
  min: number;
  max: number;
};
export type TSingleFilter = {
  value: string | number;
  count: number;
};

/**
 * Dynamic filter type: the API returns a flat object where
 * - `price` is always a { min, max } range
 * - every other key is an array of { value, count } items
 *
 * Using a loose index signature so we never need to hardcode keys again.
 */
export type TFilters = {
  price: TPriceFilter;
} & {
  [key: string]: TSingleFilter[] | TPriceFilter;
};
