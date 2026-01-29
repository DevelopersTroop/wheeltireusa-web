import {
  setBodyTypeWithSubmodel,
  setMainFilter,
} from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { TMainFilterSubModel } from '@/types/main-filter';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useSelectBodyTypeWithSubmodel = () => {
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
  const selectedSubModel = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.subModel
  );
  const bodyTypesWithSubmodels = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.list.bodyTypesWithSubmodels
  );

  const [filteredBodyTypesWithSubmodels, setBodyTypesWithSubModels] = useState<
    | {
        BodyType: string;
        SubModel: (TMainFilterSubModel & { subModelWithBodyType: string })[];
      }[]
    | null
  >(null);

  useEffect(() => {
    (async () => {
      if (!selectedSubModel.SubModel) {
        const bodyTypeRes = await fetch(
          `https://api.driverightdata.com/eu/api/aaia/GetAAIABodyTypes?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${selectedYear}&regionID=1&manufacturer=${selectedMake}&model=${selectedModel}`
        );
        const bodyTypeData = await bodyTypeRes.json();
        if (bodyTypeData.length > 0) {
          const bodyTypesWithSubModels: {
            BodyType: string;
            SubModel: (TMainFilterSubModel & {
              subModelWithBodyType: string;
            })[];
          }[] = [];
          for (const bodyTypeDatum of bodyTypeData) {
            const bodyType = bodyTypeDatum.BodyType;
            const subModelRes = await fetch(
              `https://api.driverightdata.com/eu/api/aaia/GetAAIASubModelsWheels?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${selectedYear}&regionID=1&manufacturer=${selectedMake}&model=${selectedModel}&bodyType=${bodyType}`
            );
            const subModelData = await subModelRes.json();
            bodyTypesWithSubModels.push({
              BodyType: bodyType,
              SubModel: subModelData.map((submodel: TMainFilterSubModel) => ({
                ...submodel,
                subModelWithBodyType: `${bodyType} ${submodel.SubModel}`,
              })),
            });
          }

          dispatch(setBodyTypeWithSubmodel(bodyTypesWithSubModels));
        }
      }
    })();
  }, []);

  const setSubmodelWithBodyType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const submodelWithBodyType = e?.currentTarget?.textContent?.trim() ?? '';

    const submodelDataWithBodyTypeIndex =
      filteredBodyTypesWithSubmodels?.findIndex((submodelDataWithBodyType) =>
        submodelWithBodyType.startsWith(submodelDataWithBodyType.BodyType)
      );

    let submodelData:
      | (TMainFilterSubModel & { subModelWithBodyType: string })
      | null = null;
    if (submodelDataWithBodyTypeIndex === undefined) {
      return;
    }
    submodelData =
      filteredBodyTypesWithSubmodels?.[
        submodelDataWithBodyTypeIndex
      ]?.SubModel.find(
        (submodel) => submodel.subModelWithBodyType === submodelWithBodyType
      ) ?? null;

    const bodyType =
      filteredBodyTypesWithSubmodels?.[submodelDataWithBodyTypeIndex]
        ?.BodyType ?? '';
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              bodyTypeWithSubmodel: `${bodyType} ${submodelData?.SubModel ?? ''}`,
              bodyType,
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
      setBodyTypesWithSubModels(() => {
        if (search) {
          const doSearch = () => {
            const result = bodyTypesWithSubmodels?.filter(
              (bodyTypeWithSubModels) => {
                return bodyTypeWithSubModels?.SubModel?.filter((data) => {
                  return data.subModelWithBodyType
                    .toLowerCase()
                    .includes(search.toLowerCase());
                });
              }
            );
            return result;
          };
          const searchedWithText =
            search !== '' ? doSearch() : (bodyTypesWithSubmodels ?? null);
          return searchedWithText ?? null;
        }
        return bodyTypesWithSubmodels ?? null;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, bodyTypesWithSubmodels]);

  return {
    search,
    filteredBodyTypesWithSubmodels,
    setSearch,
    setSubmodelWithBodyType,
  };
};

export default useSelectBodyTypeWithSubmodel;
