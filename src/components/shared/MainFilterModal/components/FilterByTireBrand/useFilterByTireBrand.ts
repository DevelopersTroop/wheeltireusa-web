import { useTypedSelector } from '@/redux/store';

const useFilterByTireBrand = () => {
  const mainFilterState = useTypedSelector((state) => state.mainFilter);
  return {
    brand: mainFilterState.filters.byTireBrand.current.brand,
  };
};

export default useFilterByTireBrand;
