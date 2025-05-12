import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const aspectRatiosData = [
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '55',
  '60',
  '65',
  '70',
];

// Custom hook
const useSelectAspectRatio = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredAspectRatios, setFilteredAspectRatios] =
    useState(aspectRatiosData);
  const setAspectRatio = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      setMainFilter({
        filters: {
          byTireSize: {
            current: {
              frontTireAspectRatio: e?.currentTarget?.textContent?.trim(),
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredAspectRatios(() => {
        if (search) {
          const searchedWithText =
            search !== ''
              ? aspectRatiosData.filter((aspectRatio) =>
                  aspectRatio.toLowerCase().includes(search.toLowerCase())
                )
              : aspectRatiosData;
          return searchedWithText;
        }
        return aspectRatiosData;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, aspectRatiosData]);

  return {
    search,
    filteredAspectRatios,
    setSearch,
    setAspectRatio,
  };
};

export default useSelectAspectRatio;
