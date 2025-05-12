import { useTypedSelector } from '@/redux/store';

const useFilterByTireSize = () => {
  const mainFilterState = useTypedSelector((state) => state.mainFilter);

  const frontTireDiameter =
    mainFilterState.filters.byTireSize.current.frontTireDiameter;
  const frontTireWidth =
    mainFilterState.filters.byTireSize.current.frontTireWidth;
  const frontTireAspectRatio =
    mainFilterState.filters.byTireSize.current.frontTireAspectRatio;

  const shouldShowFooter =
    frontTireDiameter && frontTireWidth && frontTireAspectRatio;

  return {
    frontTireDiameter,
    frontTireWidth,
    frontTireAspectRatio,
    shouldShowFooter,
  };
};

export default useFilterByTireSize;
