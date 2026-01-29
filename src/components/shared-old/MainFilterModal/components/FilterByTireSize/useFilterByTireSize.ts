import { useGetFilterListQuery } from '@/redux/apis/product';
import {
  closeMainFilterModal,
  setMainFilter,
} from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { getFiltersExceptPriceFilterBy } from '@/utils/filter';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useRearMode } from './context/RearModeContext';

const useFilterByTireSize = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const mainFilterState = useTypedSelector((state) => state.mainFilter);
  const ref = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetFilterListQuery();

  // Populate Redux with API data when available
  useEffect(() => {
    if (!isLoading && data && typeof data === 'object' && data.filters) {
      const { filters } = data;

      // Use getFiltersExceptPriceFilterBy to properly format the data
      const widths = getFiltersExceptPriceFilterBy(filters, 'width');
      const aspectRatios = getFiltersExceptPriceFilterBy(
        filters,
        'aspect_ratio'
      );
      const diameters = getFiltersExceptPriceFilterBy(filters, 'diameter');

      // Only update if we have new data and current lists are empty
      const currentWidths = mainFilterState.filters.byTireSize.list.widths;
      const currentAspectRatios =
        mainFilterState.filters.byTireSize.list.aspectRatios;
      const currentDiameters =
        mainFilterState.filters.byTireSize.list.diameters;

      const shouldUpdate =
        (widths.length > 0 && currentWidths.length === 0) ||
        (aspectRatios.length > 0 && currentAspectRatios.length === 0) ||
        (diameters.length > 0 && currentDiameters.length === 0);

      if (shouldUpdate) {
        dispatch(
          setMainFilter({
            filters: {
              byTireSize: {
                list: {
                  widths: widths.length > 0 ? widths : currentWidths,
                  aspectRatios:
                    aspectRatios.length > 0
                      ? aspectRatios
                      : currentAspectRatios,
                  diameters:
                    diameters.length > 0 ? diameters : currentDiameters,
                },
              },
            },
          })
        );
      }
    }
  }, [data, isLoading, dispatch]);

  const { isRearTireMode, setIsRearTireMode } = useRearMode();

  // scroll to top when main filter state changes
  useEffect(() => {
    if (ref?.current) {
      const scrollArea = ref.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollArea) {
        scrollArea.scrollTo({ left: 0, top: 0, behavior: 'instant' });
      }
    }
  }, [
    JSON.stringify(mainFilterState.filters.byTireSize.current),
    ref?.current,
  ]);

  const selectedWidth =
    mainFilterState.filters.byTireSize.current.frontTireWidth;
  const selectedAspectRatio =
    mainFilterState.filters.byTireSize.current.frontTireAspectRatio;
  const selectedDiameter =
    mainFilterState.filters.byTireSize.current.frontTireDiameter;
  const selectedZipCode = mainFilterState.zipCode;

  const selectedRearWidth =
    mainFilterState.filters.byTireSize.current.rearTireWidth;
  const selectedRearAspectRatio =
    mainFilterState.filters.byTireSize.current.rearTireAspectRatio;
  const selectedRearDiameter =
    mainFilterState.filters.byTireSize.current.rearTireDiameter;

  // Check if front tire selection is complete
  const isFrontTireComplete =
    selectedWidth && selectedAspectRatio && selectedDiameter;

  // Check if rear tire selection is complete (when in rear tire mode)
  const isRearTireComplete =
    selectedRearWidth && selectedRearAspectRatio && selectedRearDiameter;

  // Determine if we should show rear tire selections
  const hasRearSelections =
    selectedRearWidth || selectedRearAspectRatio || selectedRearDiameter;

  console.log('hasRearSelections', hasRearSelections);
  console.log('isRearTireMode', isRearTireMode);


  const shouldShowRearSelections = isRearTireMode || hasRearSelections;

  const isDisabled =
    !isFrontTireComplete ||
    !selectedZipCode ||
    (shouldShowRearSelections && !isRearTireComplete);

  const submitFilter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isDisabled) {
      return;
    }

    // Create front tire parameters object
    const frontParams = {
      width: selectedWidth,
      ratio: selectedAspectRatio,
      diameter: selectedDiameter,
    };

    // Encode front parameters
    const frontQuery = encodeURIComponent(JSON.stringify(frontParams));

    // Start building the URL
    let url = `/collections/product-category/tires?frontParams=${frontQuery}`;

    // Add rear parameters only if rear tire data exists and is complete
    if (shouldShowRearSelections && isRearTireComplete) {
      const rearParams = {
        width: selectedRearWidth,
        ratio: selectedRearAspectRatio,
        diameter: selectedRearDiameter,
      };

      const rearQuery = encodeURIComponent(JSON.stringify(rearParams));
      url += `&rearParams=${rearQuery}`;
    }

    router.push(url);
    dispatch(closeMainFilterModal());
  };
  useEffect(() => {
    console.log("setIsRearTireMode", setIsRearTireMode)
  }, [setIsRearTireMode]);

  const handleRearTireSizeLinkClick = () => {
    setIsRearTireMode(true);
  };

  const exitRearTireMode = () => {
    setIsRearTireMode(false);
  };

  return {
    width: selectedWidth,
    aspectRatio: selectedAspectRatio,
    diameter: selectedDiameter,
    rearWidth: selectedRearWidth,
    rearAspectRatio: selectedRearAspectRatio,
    rearDiameter: selectedRearDiameter,
    isDisabled,
    submitFilter,
    ref,
    isRearTireMode,
    shouldShowRearSelections,
    isFrontTireComplete,
    isRearTireComplete,
    handleRearTireSizeLinkClick,
    exitRearTireMode,
  };
};

export default useFilterByTireSize;
