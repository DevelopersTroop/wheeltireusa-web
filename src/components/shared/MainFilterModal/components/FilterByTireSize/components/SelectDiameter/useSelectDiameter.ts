import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const rimDiametersData = [
  'R12',
  'R13',
  'R14',
  'R15',
  'R16',
  'R17',
  'R18',
  'R19',
  'R20',
  'R21',
  'R22',
  'R23',
  'R24',
  'R25',
  'R26',
  'R27',
  'R28',
  'R29',
  'R30',
  'R31',
  'R32',
  'R33',
  'R34',
  'R35',
  'R36',
  'R37',
  'R38',
  'R39',
  'R40',
  'R42',
];

// Custom hook
const useSelectDiameter = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredDiameters, setFilteredDiameters] = useState(rimDiametersData);
  const setDiameter = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireDiameter: e?.currentTarget?.textContent?.trim(),
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredDiameters(() => {
        if (search) {
          const searchedWithText =
            search !== ''
              ? rimDiametersData.filter((diameter) =>
                  diameter.toLowerCase().includes(search.toLowerCase())
                )
              : rimDiametersData;
          return searchedWithText;
        }
        return rimDiametersData;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, rimDiametersData]);

  return {
    search,
    filteredDiameters,
    setSearch,
    setDiameter,
  };
};

export default useSelectDiameter;
