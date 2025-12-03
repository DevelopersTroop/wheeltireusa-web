import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

const useSelectedItem = () => {
  const dispatch = useDispatch();
  const selectedItemRef = useRef<HTMLDivElement>(null);

  const mainFilterState = useTypedSelector((state) => state.mainFilter);

  const width = mainFilterState.filters.byTireSize.current.frontTireWidth;
  const aspectRatio =
    mainFilterState.filters.byTireSize.current.frontTireAspectRatio;
  const diameter = mainFilterState.filters.byTireSize.current.frontTireDiameter;

  const rearWidth = mainFilterState.filters.byTireSize.current.rearTireWidth;
  const rearAspectRatio =
    mainFilterState.filters.byTireSize.current.rearTireAspectRatio;
  const rearDiameter =
    mainFilterState.filters.byTireSize.current.rearTireDiameter;

  // Check if we're in rear tire mode (has any rear selections or rear tire mode is active)
  const isRearTireMode = Boolean(rearWidth || rearAspectRatio || rearDiameter);

  const updateFrontWidth = (newWidth: string) => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireWidth: newWidth,
              frontTireAspectRatio: '',
              frontTireDiameter: '',
              rearTireWidth: '',
              rearTireAspectRatio: '',
              rearTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const updateFrontAspectRatio = (newAspectRatio: string) => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireAspectRatio: newAspectRatio,
              frontTireDiameter: '',
              rearTireWidth: '',
              rearTireAspectRatio: '',
              rearTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const updateFrontDiameter = (newDiameter: string) => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireDiameter: newDiameter,
              rearTireWidth: '',
              rearTireAspectRatio: '',
              rearTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const updateRearWidth = (newRearWidth: string) => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              rearTireWidth: newRearWidth,
              rearTireAspectRatio: '',
              rearTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const updateRearAspectRatio = (newRearAspectRatio: string) => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              rearTireAspectRatio: newRearAspectRatio,
              rearTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const updateRearDiameter = (newRearDiameter: string) => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              rearTireDiameter: newRearDiameter,
            },
          },
        },
      })
    );
  };

  return {
    width,
    aspectRatio,
    diameter,
    rearWidth,
    rearAspectRatio,
    rearDiameter,
    updateFrontWidth,
    updateFrontAspectRatio,
    updateFrontDiameter,
    updateRearWidth,
    updateRearAspectRatio,
    updateRearDiameter,
    selectedItemRef,
    isRearTireMode,
  };
};

export default useSelectedItem;
