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

  const clearWidth = () => {
    // Clearing width clears all downstream selections
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireWidth: '',
              rearTireWidth: '',
              frontTireAspectRatio: '',
              rearTireAspectRatio: '',
              frontTireDiameter: '',
              rearTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const clearAspectRatio = () => {
    // Clearing aspect ratio clears diameter but keeps width
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireAspectRatio: '',
              rearTireAspectRatio: '',
              frontTireDiameter: '',
              rearTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const clearDiameter = () => {
    // Clearing diameter only clears diameter, keeps width and aspect ratio
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireDiameter: '',
              rearTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const clearRearWidth = () => {
    // Clearing rear width clears all rear downstream selections
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              rearTireWidth: '',
              rearTireAspectRatio: '',
              rearTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const clearRearAspectRatio = () => {
    // Clearing rear aspect ratio clears rear diameter but keeps rear width
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              rearTireAspectRatio: '',
              rearTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const clearRearDiameter = () => {
    // Clearing rear diameter only clears rear diameter, keeps rear width and aspect ratio
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              rearTireDiameter: '',
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
    clearWidth,
    clearAspectRatio,
    clearDiameter,
    clearRearWidth,
    clearRearAspectRatio,
    clearRearDiameter,
    selectedItemRef,
    isRearTireMode,
  };
};

export default useSelectedItem;
