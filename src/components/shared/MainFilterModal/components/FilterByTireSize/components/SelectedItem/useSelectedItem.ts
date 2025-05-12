import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

const useSelectedItem = () => {
  const dispatch = useDispatch();
  const mainFilterState = useTypedSelector((state) => state.mainFilter);

  const clearFrontTireDiameter = () => {
    dispatch(
      setMainFilter({
        filters: { byTireSize: { current: { frontTireDiameter: '' } } },
      })
    );
  };

  const clearRearTireDiameter = () => {
    dispatch(
      setMainFilter({
        filters: { byTireSize: { current: { rearTireDiameter: '' } } },
      })
    );
  };

  const clearFrontTireWidth = () => {
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

  const clearRearTireWidth = () => {
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

  const clearFrontTireAspectRatio = () => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: { frontTireAspectRatio: '', frontTireWidth: '' },
          },
        },
      })
    );
  };

  const clearRearTireAspectRatio = () => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: { rearTireAspectRatio: '', rearTireWidth: '' },
          },
        },
      })
    );
  };

  return {
    frontTireDiameter:
      mainFilterState.filters.byTireSize.current.frontTireDiameter,
    rearTireDiameter:
      mainFilterState.filters.byTireSize.current.rearTireDiameter,
    frontTireWidth: mainFilterState.filters.byTireSize.current.frontTireWidth,
    rearTireWidth: mainFilterState.filters.byTireSize.current.rearTireWidth,
    frontTireAspectRatio:
      mainFilterState.filters.byTireSize.current.frontTireAspectRatio,
    rearTireAspectRatio:
      mainFilterState.filters.byTireSize.current.rearTireAspectRatio,
    clearFrontTireDiameter,
    clearRearTireDiameter,
    clearFrontTireWidth,
    clearRearTireWidth,
    clearFrontTireAspectRatio,
    clearRearTireAspectRatio,
  };
};

export default useSelectedItem;
