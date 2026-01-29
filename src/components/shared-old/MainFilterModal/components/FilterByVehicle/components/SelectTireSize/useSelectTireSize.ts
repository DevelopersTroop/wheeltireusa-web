import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { getAllPossibleTireSizes } from '@/utils/product';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useSelectTireSize = ({ direction }: { direction: 'front' | 'rear' }) => {
  const tireSizesState = useTypedSelector(
    (state) =>
      state.mainFilter.filters.byVehicle.current.vehicleInformation.tireSizes
  );
  const dispatch = useDispatch();

  const [tireSizes, setTireSizes] = useState<string[] | null>(null);

  useEffect(() => {
    const tempTireSizes: string[] = [];
    // get available tire sizes
    if (tireSizesState) {
      tireSizesState?.forEach((tireSize) => {
        if (
          tireSize.factory &&
          !tempTireSizes.includes(tireSize.factory[direction])
        ) {
          tempTireSizes.push(tireSize.factory[direction]);
        }

        // get all after market tire sizes
        // if (tireSize.factory) {
        //   const optionalTireSizes = getAllPossibleTireSizes(
        //     tireSize.factory[direction]
        //   );
        //   for (const tireSize of optionalTireSizes) {
        //     if (!tempTireSizes.includes(tireSize)) {
        //       tempTireSizes.push(tireSize);
        //     }
        //   }
        // }
      });
    }
    setTireSizes(tempTireSizes);
  }, [tireSizesState]);

  // set front tire size
  const setTireSize = (tireSize: string) => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              [`${direction}TireSize`]: tireSize,
            },
          },
        },
      })
    );
  };

  return {
    setTireSize,
    tireSizes,
  };
};

export default useSelectTireSize;
