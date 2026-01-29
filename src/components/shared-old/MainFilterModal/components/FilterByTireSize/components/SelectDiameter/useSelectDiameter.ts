import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { TSingleFilter } from '@/types/filter';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface UseSelectDiameterProps {
  isRearMode?: boolean;
}

const useSelectDiameter = ({
  isRearMode = false,
}: UseSelectDiameterProps = {}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const allDiameters = useTypedSelector(
    (state) => state.mainFilter.filters.byTireSize.list.diameters
  );
  const [filteredDiameters, setFilteredDiameters] = useState<string[] | null>(
    null
  );

  const setDiameter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedDiameter = e?.currentTarget?.textContent?.trim();

    if (isRearMode) {
      // Only update rear tire diameter
      dispatch(
        setMainFilter({
          filters: {
            byTireSize: {
              current: {
                rearTireDiameter: selectedDiameter,
              },
            },
          },
        })
      );
    } else {
      // Update front tire diameter
      dispatch(
        setMainFilter({
          filters: {
            byTireSize: {
              current: {
                frontTireDiameter: selectedDiameter,
              },
            },
          },
        })
      );
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredDiameters(() => {
        if (search) {
          return (
            allDiameters
              ?.filter((diameter) =>
                diameter.value
                  .toString()
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((diameter) => diameter.value.toString()) ?? null
          );
        }
        return (
          allDiameters?.map((diameter) => diameter.value.toString()) ?? null
        );
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, allDiameters]);

  return { search, filteredDiameters, setSearch, setDiameter, isRearMode };
};

export default useSelectDiameter;