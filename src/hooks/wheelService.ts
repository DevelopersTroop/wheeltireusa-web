import { RootState } from '@/redux/store';
import { TYmmVehicleInformation } from '@/types/ymm';

export const wrapWheelFilters = (
  { minPrice, maxPrice, ...filters }: RootState['wheel']['filters'],
  page: number,
  vehicleInformation: Partial<TYmmVehicleInformation>
) => {
  const shouldArray = [
    'brand',
    'model',
    'color',
    'diameter',
    'brandDesc',
    'suspensionBrand',
    'wheelDiameter',
    'wheelWidth',
    'tireHeight',
    'tireWidth',
    'wheelOffset',
  ];
  const price =
    minPrice !== undefined || maxPrice !== undefined
      ? {
          ...(minPrice !== undefined && {
            minPrice: parseInt(minPrice.toString(), 10),
          }),
          ...(maxPrice !== undefined && {
            maxPrice: parseInt(maxPrice.toString(), 10),
          }),
        }
      : {};

  const obj: Record<string, string[] | number[] | string | number | object> =
    {};

  Object.entries(filters).forEach(function ([key, value]) {
    if (
      shouldArray.includes(key) &&
      key !== 'sort' &&
      typeof value !== 'object'
    ) {
      obj[key] = value.split(',').map((brand: string) => brand.trim());
    } else if (key === 'sort' && typeof value === 'string') {
      obj[key] = [
        {
          whom: value.split(',')[0],
          order: value.split(',')[1],
        },
      ];
    } else if (key === 'vehicle') {
      obj['vehicleInformation'] = {
        ...vehicleInformation,
        boltPattern: vehicleInformation.boltPattern?.toUpperCase(),
      };
    }
    // else if (key === "vehicle") {
    //   obj['vehicleInformation'] = vehicleInformation
    // }
    else {
      obj[key] =
        key === 'vehicle'
          ? {
              ...vehicleInformation,
              boltPattern: vehicleInformation?.boltPattern?.toUpperCase(),
            }
          : value;
    }
  });
  return {
    sort: [
      {
        whom: 'msrp',
        order: 'desc',
      },
    ],
    ...obj,
    maxPrice: price.maxPrice ? Math.round(price.maxPrice / 4) : price.maxPrice,
    minPrice: price.minPrice ? Math.round(price.minPrice / 4) : price.minPrice,
    page,
    category: 'wheels',
    size: 12,
  };
};
