import { setMainFilter } from '@/redux/features/mainFilterSlice';
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
              bodyTypes: null,
              subModels: null,
            },
            current: {
              model: '',
              bodyType: '',
              subModel: {
                SubModel: '',
                DRChassisID: '',
                DRModelID: '',
              },
              frontTireSize: null,
              rearTireSize: null,
              vehicleInformation: {
                boltPattern: '',
                frontRimSize: '',
                rearRimSize: '',
                frontCenterBore: '',
                rearCenterBore: '',
                maxWheelLoad: '',
                tireSizes: null,
                supportedWheels: [],
              },
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
              bodyTypes: null,
              subModels: null,
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
              vehicleInformation: {
                boltPattern: '',
                frontRimSize: '',
                rearRimSize: '',
                frontCenterBore: '',
                rearCenterBore: '',
                maxWheelLoad: '',
                tireSizes: null,
                supportedWheels: [],
              },
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
              bodyTypes: null,
              subModels: null,
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
              vehicleInformation: {
                boltPattern: '',
                frontRimSize: '',
                rearRimSize: '',
                frontCenterBore: '',
                rearCenterBore: '',
                maxWheelLoad: '',
                tireSizes: null,
                supportedWheels: [],
              },
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
    model: mainFilterState.filters.byVehicle.current.model,
    make: mainFilterState.filters.byVehicle.current.make,
    year: mainFilterState.filters.byVehicle.current.year,
    frontTireSize: mainFilterState.filters.byVehicle.current.frontTireSize,
    rearTireSize: mainFilterState.filters.byVehicle.current.rearTireSize,
    selectedItemRef,
  };
};

export default useSelectedItem;
