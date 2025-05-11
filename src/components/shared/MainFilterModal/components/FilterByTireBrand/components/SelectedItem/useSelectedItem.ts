import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

const useSelectedItem = () => {
  const dispatch = useDispatch();
  const mainFilterState = useTypedSelector((state) => state.mainFilter);

  const clearBrand = () => {
    dispatch(
      setMainFilter({
        filters: {
          byTireBrand: {
            current: {
              brand: undefined,
            },
          },
        },
      })
    );
  };
  return {
    clearBrand,
    brand: mainFilterState.filters.byTireBrand.current.brand,
  };
};

export default useSelectedItem;
