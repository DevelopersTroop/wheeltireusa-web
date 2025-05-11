import { useTypedSelector } from '@/redux/store';

const useFilterFooter = () => {
  const mainFilterState = useTypedSelector((state) => state.mainFilter);

  return {
    year: mainFilterState.current.year,
    make: mainFilterState.current.make,
    model: mainFilterState.current.model,
  };
};

export default useFilterFooter;
