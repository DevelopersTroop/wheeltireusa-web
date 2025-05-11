import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

const useFilterByVehicle = () => {
  const dispatch = useDispatch();
  const mainFilterState = useTypedSelector((state) => state.mainFilter);

  const clearModel = () => {
    dispatch(
      setMainFilter({
        current: {
          model: undefined,
        },
      })
    );
  };
  const clearMake = () => {
    dispatch(
      setMainFilter({
        current: {
          make: undefined,
          model: undefined,
        },
      })
    );
  };
  const clearYear = () => {
    dispatch(
      setMainFilter({
        current: {
          year: undefined,
          model: undefined,
          make: undefined,
        },
      })
    );
  };
  return {
    clearModel,
    clearMake,
    clearYear,
    model: mainFilterState.current.model,
    make: mainFilterState.current.make,
    year: mainFilterState.current.year,
  };
};

export default useFilterByVehicle;
