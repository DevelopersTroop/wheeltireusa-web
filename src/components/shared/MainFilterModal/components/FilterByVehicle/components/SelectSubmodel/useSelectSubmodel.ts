import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { TMainFilterSubModel } from '@/types/main-filter';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useSelectSubmodel = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const selectedYear = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.year
  );
  const selectedMake = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.make
  );
  const selectedModel = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.model
  );
  const selectedBodyType = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.bodyType
  );
  const selectedSubModel = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.subModel
  );
  const allSubmodels = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.list.subModels
  );

  const [filteredSubmodels, setFilteredSubmodels] = useState<
    Partial<TMainFilterSubModel>[] | null
  >(null);

  useEffect(() => {
    if (!selectedSubModel.SubModel) {
      fetch(
        `https://api.driverightdata.com/eu/api/aaia/GetAAIASubModelsWheels?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${selectedYear}&regionID=1&manufacturer=${selectedMake}&model=${selectedModel}&bodyType=${selectedBodyType}`
      )
        .then((res) => res.json())
        .then((subModels) => {
          // set all submodels
          dispatch(
            setMainFilter({
              filters: {
                byVehicle: {
                  list: {
                    subModels: subModels ?? null,
                  },
                },
              },
            })
          );
        });
    }
  }, [selectedSubModel]);

  const setSubmodel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const submodel = e?.currentTarget?.textContent?.trim() ?? '';
    const submodelData = allSubmodels?.find(
      (submodelData) => submodelData.SubModel === submodel
    );
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              subModel: {
                SubModel: submodelData?.SubModel ?? '',
                DRChassisID: submodelData?.DRChassisID ?? '',
                DRModelID: submodelData?.DRModelID ?? '',
              },
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredSubmodels(() => {
        if (search) {
          const searchedWithText =
            search !== ''
              ? allSubmodels?.filter((submodel) =>
                  submodel.SubModel.toLowerCase().includes(search.toLowerCase())
                )
              : (allSubmodels ?? null);
          return searchedWithText ?? null;
        }
        return allSubmodels ?? null;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, allSubmodels]);

  return { search, filteredSubmodels, setSearch, setSubmodel };
};

export default useSelectSubmodel;
