import {
  closeMainFilterModal,
  setMainFilter,
} from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { TDriverightData, TMainFilterTireSize } from '@/types/main-filter';
import { getSupportedTireSizes } from '@/utils/filter';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useFilterByVehicle = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const mainFilterState = useTypedSelector((state) => state.mainFilter);
  const selectedYear = mainFilterState.filters.byVehicle.current.year;
  const selectedMake = mainFilterState.filters.byVehicle.current.make;
  const selectedModel = mainFilterState.filters.byVehicle.current.model;
  const selectedFrontTireSize =
    mainFilterState.filters.byVehicle.current.frontTireSize;
  const selectedRearTireSize =
    mainFilterState.filters.byVehicle.current.rearTireSize;
  const selectedZipCode = mainFilterState.filters.byVehicle.current.zipCode;
  const allBodyTypes = mainFilterState.filters.byVehicle.list.bodyTypes;
  const allSubModels = mainFilterState.filters.byVehicle.list.subModels;
  const allTireSizes =
    mainFilterState.filters.byVehicle.current.vehicleInformation.tireSizes;

  // Get all body types
  useEffect(() => {
    if (!allBodyTypes) {
      fetch(
        `https://api.driverightdata.com/eu/api/aaia/GetAAIABodyTypes?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${selectedYear}&regionID=1&manufacturer=${selectedMake}&model=${selectedModel}`
      )
        .then((res) => res.json())
        .then((data) => {
          // set all body types
          dispatch(
            setMainFilter({
              filters: {
                byVehicle: {
                  list: {
                    bodyTypes:
                      data && Array.isArray(data)
                        ? data?.map(
                            (bodyType: { BodyType: string }) =>
                              bodyType.BodyType
                          )
                        : null,
                  },
                },
              },
            })
          );
        });
    }
  }, [selectedYear, selectedMake, selectedModel, allBodyTypes]);

  // get all sub models
  useEffect(() => {
    if (!allSubModels && Array.isArray(allBodyTypes)) {
      for (const bodyType of allBodyTypes) {
        fetch(
          `https://api.driverightdata.com/eu/api/aaia/GetAAIASubModelsWheels?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${selectedYear}&regionID=1&manufacturer=${selectedMake}&model=${selectedModel}&bodyType=${bodyType}`
        )
          .then((res) => res.json())
          .then((data) => {
            // set all sub models
            dispatch(
              setMainFilter({
                filters: { byVehicle: { list: { subModels: data ?? null } } },
              })
            );
          });
      }
    } else if (Array.isArray(allSubModels) && allTireSizes === null) {
      // get all tire sizes from all sub models via GetVehicleDataFromDRD_NA api
      const vehicleDataPromises: Promise<Response>[] = [];
      allSubModels.forEach(({ DRChassisID, DRModelID }) => {
        vehicleDataPromises.push(
          fetch(
            `https://api.driverightdata.com/eu/api/vehicle-info/GetVehicleDataFromDRD_NA?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&DRDModelID=${DRModelID}&DRDChassisID=${DRChassisID}`
          )
        );
      });
      Promise.all(vehicleDataPromises).then((responses) => {
        const vehicleDataPromises: Promise<TDriverightData>[] = [];
        responses.forEach(async (response) => {
          vehicleDataPromises.push(response.json());
        });
        Promise.all(vehicleDataPromises).then((vehicleData) => {
          const allTireSizesTemp: TMainFilterTireSize[] = [];
          vehicleData.forEach((data) => {
            const tireSizes = getSupportedTireSizes(data);
            if (tireSizes) {
              allTireSizesTemp.push(tireSizes);
            }
          });
          dispatch(
            setMainFilter({
              filters: {
                byVehicle: {
                  current: {
                    vehicleInformation: {
                      tireSizes: Array.from(new Set(allTireSizesTemp)),
                    },
                  },
                },
              },
            })
          );
        });
      });
    }
  }, [selectedYear, selectedMake, selectedModel, allBodyTypes, allSubModels]);

  const isDisabled =
    !allTireSizes || allTireSizes?.length === 0 || !selectedZipCode;
  const submitFilter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isDisabled) {
      return;
    }
    router.push(
      `/collections/product-category/tire?frontTireSize=${encodeURIComponent(selectedFrontTireSize ?? '')}&rearTireSize=${encodeURIComponent(selectedRearTireSize ?? '')}`
    );
    dispatch(closeMainFilterModal());
  };
  return {
    year: selectedYear,
    make: selectedMake,
    model: selectedModel,
    frontTireSize: selectedFrontTireSize,
    rearTireSize: selectedRearTireSize,
    allBodyTypes,
    allSubModels,
    allTireSizes,
    isDisabled,
    submitFilter,
  };
};

export default useFilterByVehicle;
