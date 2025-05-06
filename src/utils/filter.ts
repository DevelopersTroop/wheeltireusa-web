import { TFilters, TPriceFilter, TSingleFilter } from '../types/filter';
// import defaultLipSizeData from "../../public/default-lip.json";

export const getPriceFilter = (filters: TFilters) => {
  return 'min' in filters?.price ? filters?.price : { min: 0, max: 0 };
};
export function isPriceFilter(
  filter: TPriceFilter | TSingleFilter[]
): filter is TPriceFilter {
  return 'min' in filter;
}
export const getFiltersExceptPriceFilterBy = (
  filters: TFilters,
  filterKey: string
) => {
  return !isPriceFilter(filters?.[filterKey])
    ? typeof filters[filterKey][0] === 'string'
      ? (filters[filterKey] as unknown as string[]).map(
          (item) =>
            ({
              value: item,
              count: 0,
            }) as TSingleFilter
        )
      : filters[filterKey]
    : ([] as TSingleFilter[]);
};

export const isPassengerForging = (forging: string) => {
  const passengerForgings = [
    'Flat',
    'Slight Concave',
    'Slight Round',
    'Round',
    'AXL Concave',
    'Deep Concave',
    'Off-Road',
    'Dually',
  ];
  return passengerForgings.includes(forging);
};

export const selectDefaultFrontLip = (
  diameter: string,
  width: string
): string => {
  for (const singleDefaultLipData of defaultLipSizeData) {
    if (
      singleDefaultLipData.diameter === diameter &&
      singleDefaultLipData.frontWidth === width
    ) {
      return singleDefaultLipData.defaultFrontLip;
    }
  }
  return '1';
};

export const selectDefaultRearLip = (
  diameter: string,
  width: string
): string => {
  for (const singleDefaultLipData of defaultLipSizeData) {
    if (
      singleDefaultLipData.diameter === diameter &&
      singleDefaultLipData.rearWidth === width
    ) {
      return singleDefaultLipData.defaultRearLip;
    }
  }
  return '1';
};

/**
 * Sorts the series filter based on the provided criteria.
 * @param series - The series filter to be sorted.
 * @returns The sorted series filter.
 */
export const sortSeriesFilter = (
  series: TSingleFilter[],
  mandatoryForgings?: string[]
) => {
  const modifiedSeries = series.reduce((acc, curr, index) => {
    if (index === series.length - 1) {
      if (typeof mandatoryForgings !== 'undefined') {
        mandatoryForgings.forEach((mandatoryForging) => {
          if (
            acc.find((item) => item.value === mandatoryForging) === undefined
          ) {
            acc.push({
              count: 0,
              value: mandatoryForging,
            });
          }
        });
      }
    }
    acc.push(curr);

    return acc;
  }, [] as TSingleFilter[]);

  const sortedSeries: TSingleFilter[] = [];
  const sortingCriteria: string[] = [
    'Passenger',
    'Signature Series',
    'Signature XL Series',
    'AXL Concave',
    'Wire Wheels',
    'Off-Road',
    'Dually',
  ];
  sortingCriteria.forEach((criteria) => {
    const series = modifiedSeries.find((item) => item.value === criteria);
    if (series) {
      sortedSeries.push(series);
    }
  });
  return sortedSeries;
};
