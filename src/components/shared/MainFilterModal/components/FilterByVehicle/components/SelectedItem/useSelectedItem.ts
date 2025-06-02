import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

const useSelectedItem = () => {
  const dispatch = useDispatch();
  const mainFilterState = useTypedSelector((state) => state.mainFilter);

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
  return {
    clearModel,
    clearMake,
    clearYear,
    model: mainFilterState.filters.byVehicle.current.model,
    make: mainFilterState.filters.byVehicle.current.make,
    year: mainFilterState.filters.byVehicle.current.year,
  };
};

export default useSelectedItem;
