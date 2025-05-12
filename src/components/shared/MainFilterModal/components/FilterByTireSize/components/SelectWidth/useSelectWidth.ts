import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const tireWidthsData = [
  '125',
  '135',
  '145',
  '155',
  '165',
  '175',
  '185',
  '195',
  '205',
  '215',
  '225',
  '235',
  '245',
  '255',
  '265',
  '275',
  '285',
  '295',
  '305',
  '315',
  '325',
  '335',
  '345',
  '355',
  '365',
  '375',
  '385',
  '395',
  '405',
];
// Custom hook
const useSelectWidth = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredWidths, setFilteredWidths] = useState(tireWidthsData);
  const setWidth = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireWidth: e?.currentTarget?.textContent?.trim(),
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredWidths(() => {
        if (search) {
          const searchedWithText =
            search !== ''
              ? tireWidthsData.filter((width) =>
                  width.toLowerCase().includes(search.toLowerCase())
                )
              : tireWidthsData;
          return searchedWithText;
        }
        return tireWidthsData;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, tireWidthsData]);

  return {
    search,
    filteredWidths,
    setSearch,
    setWidth,
  };
};

export default useSelectWidth;
