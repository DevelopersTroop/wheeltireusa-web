import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { TDriverightData } from '@/types/main-filter';
import { getSupportedTireSizes } from '@/utils/filter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useFilterFooter = () => {
  const dispatch = useDispatch();
  const selectedYear = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.year
  );
  const selectedMake = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.make
  );
  const selectedModel = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.model
  );
  const allBodyTypes = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.list.bodyTypes
  );
  const allSubModels = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.list.subModels
  );
  const allTireSizes = useTypedSelector(
    (state) =>
      state.mainFilter.filters.byVehicle.current.vehicleInformation.tireSizes
  );

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
                    bodyTypes: data.map(
                      (bodyType: { BodyType: string }) => bodyType.BodyType
                    ),
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
                filters: { byVehicle: { list: { subModels: data } } },
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
          const allTireSizesTemp: Record<'front' | 'rear', string>[] = [];
          vehicleData.forEach((data) => {
            const tireSizes = getSupportedTireSizes(data);
            if (tireSizes) {
              allTireSizesTemp.push(...tireSizes);
            }
          });
          dispatch(
            setMainFilter({
              filters: {
                byVehicle: {
                  current: {
                    vehicleInformation: {
                      tireSizes: allTireSizesTemp,
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

  return {
    allTireSizes,
  };
};

export default useFilterFooter;
