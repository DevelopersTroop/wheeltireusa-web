import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useRearMode } from '../../context/RearModeContext';

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

  const { isRearTireMode, setIsRearTireMode } = useRearMode();

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

  const clearFrontWidth = () => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireWidth: '',
              frontTireAspectRatio: '',
              frontTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const clearFrontAspectRatio = () => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireAspectRatio: '',
              frontTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const clearFrontDiameter = () => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireDiameter: '',
            },
          },
        },
      })
    );
  };

  const clearRearWidth = () => {
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
    updateFrontWidth,
    updateFrontAspectRatio,
    updateFrontDiameter,
    updateRearWidth,
    updateRearAspectRatio,
    updateRearDiameter,
    clearFrontWidth,
    clearFrontAspectRatio,
    clearFrontDiameter,
    clearRearWidth,
    clearRearAspectRatio,
    clearRearDiameter,
    selectedItemRef,
    isRearTireMode,
    setIsRearTireMode
  };
};

export default useSelectedItem;
