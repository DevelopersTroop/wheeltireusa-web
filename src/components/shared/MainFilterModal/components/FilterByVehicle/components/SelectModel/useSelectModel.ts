import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useSelectModel = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const selectedYear = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.year
  );
  const selectedMake = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.make
  );
  const allModels = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.list.models
  );
  const [filteredModels, setFilteredModels] = useState<string[] | null>(null);

  useEffect(() => {
    if (!allModels) {
      fetch(
        `https://api.driverightdata.com/eu/api/aaia/GetAAIAModels?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${selectedYear}&regionID=1&manufacturer=${selectedMake}`
      )
        .then((res) => res.json())
        .then((data) => {
          // set all models
          dispatch(
            setMainFilter({
              filters: {
                byVehicle: {
                  list: {
                    models: data.map(
                      (modelObj: { Model: string }) => modelObj.Model
                    ),
                  },
                },
              },
            })
          );
        });
    }
  }, [selectedYear, selectedMake, allModels]);

  const setModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              model: e?.currentTarget?.textContent?.trim(),
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredModels(() => {
        if (search) {
          return (
            allModels?.filter((model) =>
              model.toLowerCase().includes(search.toLowerCase())
            ) ?? null
          );
        }
        return allModels ?? null;
      });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search, allModels]);

  return { search, filteredModels, setSearch, setModel };
};

export default useSelectModel;
