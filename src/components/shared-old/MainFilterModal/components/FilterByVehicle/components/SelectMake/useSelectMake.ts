import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useSelectMake = () => {
  const dispatch = useDispatch();
  const allMakes = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.list.makes
  );
  const selectedYear = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.current.year
  );
  const [search, setSearch] = useState('');
  const [alphabets, setAlphabets] = useState<string[]>([]);
  const [filteredMakes, setFilteredMakes] = useState<string[] | null>(null);

  useEffect(() => {
    if (!allMakes) {
      fetch(
        `https://api.driverightdata.com/eu/api/aaia/GetAAIAManufacturers?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e&year=${selectedYear}&regionID=1`
      )
        .then((res) => res.json())
        .then((data) => {
          // set all makes to the state
          dispatch(
            setMainFilter({
              filters: {
                byVehicle: {
                  list: {
                    makes: data.map(
                      (make: { Manufacturer: string }) => make.Manufacturer
                    ),
                  },
                },
              },
            })
          );
        });
    }
  }, [allMakes, selectedYear]);

  const setMake = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              make: e?.currentTarget?.textContent?.trim(),
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredMakes(() => {
        if (search || alphabets.length > 0) {
          const searchedWithText =
            search !== ''
              ? allMakes?.filter((make) =>
                  make.toLowerCase().includes(search.toLowerCase())
                )
              : (allMakes ?? null);
          const searchedWithAlphabet =
            alphabets.length > 0
              ? searchedWithText?.filter((make) =>
                  alphabets.includes(make.charAt(0).toLowerCase())
                )
              : (searchedWithText ?? null);
          return searchedWithAlphabet ?? null;
        }
        return allMakes ?? null;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, alphabets, allMakes]);

  return { search, filteredMakes, setSearch, setMake, alphabets, setAlphabets };
};

export default useSelectMake;
