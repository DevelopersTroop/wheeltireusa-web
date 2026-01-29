import {
  initialMainFilterVehicleInformation,
  setMainFilter,
} from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const useSelectedItem = () => {
  const dispatch = useDispatch();
  const selectedItemRef = useRef<HTMLDivElement>(null);

  const mainFilterState = useTypedSelector((state) => state.mainFilter);
  const clearFrontTireSize = () => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              frontTireSize: null,
              rearTireSize: null,
              vehicleInformation: initialMainFilterVehicleInformation,
            },
          },
        },
      })
    );
  };
  const clearRearTireSize = () => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              rearTireSize: null,
              vehicleInformation: initialMainFilterVehicleInformation,
            },
          },
        },
      })
    );
  };
  const clearBodyTypeWithSubmodel = () => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              bodyType: '',
              subModel: {
                SubModel: '',
                DRChassisID: '',
                DRModelID: '',
              },
              bodyTypeWithSubmodel: '',
              frontTireSize: null,
              rearTireSize: null,
              vehicleInformation: initialMainFilterVehicleInformation,
            },
          },
        },
      })
    );
  };
  const clearModel = () => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            list: {
              bodyTypesWithSubmodels: null,
            },
            current: {
              model: '',
              bodyType: '',
              subModel: {
                SubModel: '',
                DRChassisID: '',
                DRModelID: '',
              },
              bodyTypeWithSubmodel: '',
              frontTireSize: null,
              rearTireSize: null,
              vehicleInformation: initialMainFilterVehicleInformation,
            },
          },
        },
      })
    );
  };
  const clearMake = () => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            list: {
              models: null,
              bodyTypesWithSubmodels: null,
            },
            current: {
              make: '',
              model: '',
              bodyType: '',
              frontTireSize: null,
              rearTireSize: null,
              subModel: {
                SubModel: '',
                DRChassisID: '',
                DRModelID: '',
              },
              bodyTypeWithSubmodel: '',
              vehicleInformation: initialMainFilterVehicleInformation,
            },
          },
        },
      })
    );
  };
  const clearYear = () => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            list: {
              makes: null,
              models: null,
              bodyTypesWithSubmodels: null,
            },
            current: {
              year: '',
              make: '',
              model: '',
              bodyType: '',
              frontTireSize: null,
              rearTireSize: null,
              subModel: {
                SubModel: '',
                DRChassisID: '',
                DRModelID: '',
              },
              bodyTypeWithSubmodel: '',
              vehicleInformation: initialMainFilterVehicleInformation,
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollLeft =
        selectedItemRef.current.scrollWidth - 100;
    }
  }, [mainFilterState.filters.byVehicle.current]);
  return {
    clearModel,
    clearMake,
    clearYear,
    clearFrontTireSize,
    clearRearTireSize,
    clearBodyTypeWithSubmodel,
    model: mainFilterState.filters.byVehicle.current.model,
    make: mainFilterState.filters.byVehicle.current.make,
    year: mainFilterState.filters.byVehicle.current.year,
    bodyType: mainFilterState.filters.byVehicle.current.bodyType,
    subModel: mainFilterState.filters.byVehicle.current.subModel,
    frontTireSize: mainFilterState.filters.byVehicle.current.frontTireSize,
    rearTireSize: mainFilterState.filters.byVehicle.current.rearTireSize,
    selectedItemRef,
  };
};

export default useSelectedItem;
