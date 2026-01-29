import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// const yearsData = {
//   statusCode: 200,
//   response: true,
//   message: 'Get years successfully',
//   data: {
//     years: [
//       '2026',
//       '2025',
//       '2024',
//       '2023',
//       '2022',
//       '2021',
//       '2020',
//       '2019',
//       '2018',
//       '2017',
//       '2016',
//       '2015',
//       '2014',
//       '2013',
//       '2012',
//       '2011',
//       '2010',
//       '2009',
//       '2008',
//       '2007',
//       '2006',
//       '2005',
//       '2004',
//       '2003',
//       '2002',
//       '2001',
//       '2000',
//       '1999',
//       '1998',
//       '1997',
//       '1996',
//       '1995',
//       '1994',
//       '1993',
//       '1992',
//       '1991',
//       '1990',
//       '1989',
//       '1988',
//       '1987',
//       '1986',
//       '1985',
//       '1984',
//       '1983',
//       '1982',
//       '1981',
//       '1980',
//       '1979',
//       '1978',
//       '1977',
//       '1976',
//       '1975',
//       '1974',
//       '1973',
//       '1972',
//       '1971',
//       '1970',
//       '1969',
//       '1968',
//       '1967',
//       '1966',
//       '1965',
//       '1964',
//       '1963',
//       '1962',
//       '1961',
//       '1960',
//       '1959',
//       '1958',
//       '1957',
//       '1956',
//       '1955',
//       '1954',
//       '1953',
//       '1952',
//       '1951',
//       '1950',
//       '1949',
//       '1948',
//     ],
//   },
// };
// Custom hook
const useSelectYear = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const allYears = useTypedSelector(
    (state) => state.mainFilter.filters.byVehicle.list.years
  );
  const [filteredYears, setFilteredYears] = useState<string[] | null>(null);

  useEffect(() => {
    if (!allYears) {
      fetch(
        'https://api.driverightdata.com/eu/api/aaia/GetAAIAYears?username=Tire_Wheel_Experts&securityToken=0b035d5ccecc43f2a9adce9849c7024e',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // set all years to the state
          dispatch(
            setMainFilter({
              filters: {
                byVehicle: {
                  list: {
                    years: data.map(
                      (yearObj: { Year: string }) => yearObj.Year
                    ),
                  },
                },
              },
            })
          );
        });
    }
  }, []);

  const setYear = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              year: e?.currentTarget?.textContent?.trim(),
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredYears(() => {
        if (search) {
          return (
            allYears?.filter((year) =>
              year.toLowerCase().includes(search.toLowerCase())
            ) ?? null
          );
        }
        return allYears ?? null;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, allYears]);

  return { search, filteredYears, setSearch, setYear };
};

export default useSelectYear;
