import { useTypedSelector } from '@/redux/store';

const useFilterByVehicle = () => {
  const mainFilterState = useTypedSelector((state) => state.mainFilter);

  return {
    year: mainFilterState.filters.byVehicle.current.year,
    make: mainFilterState.filters.byVehicle.current.make,
    model: mainFilterState.filters.byVehicle.current.model,
  };
};

export default useFilterByVehicle;
