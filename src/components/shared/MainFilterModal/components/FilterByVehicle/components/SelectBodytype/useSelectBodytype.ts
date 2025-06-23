import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useSelectBodytype = () => {
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
  const allBodytypes = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.list.bodyTypes
  );

  const [filteredBodytypes, setFilteredBodytypes] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    if (!selectedBodyType) {
      fetch(
        `https://api.driverightdata.com/eu/api/aaia/GetAAIABodyTypes?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${selectedYear}&regionID=1&manufacturer=${selectedMake}&model=${selectedModel}`
      )
        .then((res) => res.json())
        .then((bodyTypes) => {
          // set all bodytypes
          dispatch(
            setMainFilter({
              filters: {
                byVehicle: {
                  list: {
                    bodyTypes:
                      bodyTypes?.map(
                        (bodyType: { BodyType: string }) => bodyType.BodyType
                      ) ?? null,
                  },
                },
              },
            })
          );
        });
    }
  }, [selectedBodyType]);

  const setBodytype = (e: React.MouseEvent<HTMLButtonElement>) => {
    const bodytype = e?.currentTarget?.textContent?.trim() ?? '';
    const bodytypeData = allBodytypes?.find(
      (bodytypeData) => bodytypeData === bodytype
    );
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              bodyType: bodytypeData ?? '',
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredBodytypes(() => {
        if (search) {
          const searchedWithText =
            search !== ''
              ? allBodytypes?.filter((bodytype) =>
                  bodytype.toLowerCase().includes(search.toLowerCase())
                )
              : (allBodytypes ?? null);
          return searchedWithText ?? null;
        }
        return allBodytypes ?? null;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, allBodytypes]);

  return { search, filteredBodytypes, setSearch, setBodytype };
};

export default useSelectBodytype;
