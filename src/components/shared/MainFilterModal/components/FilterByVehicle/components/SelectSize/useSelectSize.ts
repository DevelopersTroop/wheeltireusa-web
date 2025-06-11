import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const isTireSizeAddedInArray = (
  tireSizes: Record<'front' | 'rear', string>[],
  frontTireSize: string,
  rearTireSize: string
) => {
  return tireSizes.some(
    (tireSize) =>
      tireSize.front === frontTireSize && tireSize.rear === rearTireSize
  );
};

const useSelectSize = () => {
  const tireSizesState = useTypedSelector(
    (state) =>
      state.mainFilter.filters.byVehicle.current.vehicleInformation.tireSizes
  );
  const dispatch = useDispatch();

  const [tireSizes, setTireSizes] = useState<
    Record<'front' | 'rear', string>[] | null
  >(null);

  useEffect(() => {
    const tempTireSizes: Record<'front' | 'rear', string>[] = [];
    // get available tire sizes
    if (tireSizesState) {
      tireSizesState?.forEach((tireSize) => {
        if (
          tireSize.factory &&
          !isTireSizeAddedInArray(
            tempTireSizes,
            tireSize.factory.front,
            tireSize.factory.rear
          )
        ) {
          tempTireSizes.push(tireSize.factory);
        }
        if (tireSize.optional) {
          for (const optional of tireSize.optional) {
            if (
              !isTireSizeAddedInArray(
                tempTireSizes,
                optional.front,
                optional.rear
              )
            ) {
              tempTireSizes.push({
                front: optional.front,
                rear: optional.rear,
              });
            }
          }
        }
      });
    }
    setTireSizes(tempTireSizes);
  }, [tireSizesState]);
  const setTireSize = (frontTireSize: string, rearTireSize: string) => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              frontTireSize,
              rearTireSize,
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

export default useSelectSize;
