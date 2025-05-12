import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

const useSelectedItem = () => {
  const dispatch = useDispatch();
  const mainFilterState = useTypedSelector((state) => state.mainFilter);

  const clearModel = () => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              model: undefined,
            },
          },
        },
      })
    );
  };
  const clearMake = () => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              make: undefined,
              model: undefined,
            },
          },
        },
      })
    );
  };
  const clearYear = () => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              year: undefined,
              model: undefined,
              make: undefined,
            },
          },
        },
      })
    );
  };
  return {
    clearModel,
    clearMake,
    clearYear,
    model: mainFilterState.filters.byVehicle.current.model,
    make: mainFilterState.filters.byVehicle.current.make,
    year: mainFilterState.filters.byVehicle.current.year,
  };
};

export default useSelectedItem;
