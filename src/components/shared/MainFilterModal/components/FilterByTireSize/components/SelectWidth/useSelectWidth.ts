import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { TSingleFilter } from '@/types/filter';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Popular widths as requested by user
const popularWidths = [
  '235',
  '225',
  '245',
  '275',
  '265',
  '215',
  '255',
  '205',
  '285',
  '145',
];

interface UseSelectWidthProps {
  isRearMode?: boolean;
}

const useSelectWidth = ({ isRearMode = false }: UseSelectWidthProps = {}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const allWidths = useTypedSelector(
    (state) => state.mainFilter.filters.byTireSize.list.widths
  );
  const [filteredWidths, setFilteredWidths] = useState<string[] | null>(null);

  const setWidth = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedWidth = e?.currentTarget?.textContent?.trim();

    if (isRearMode) {
      // Only update rear tire width and clear downstream rear selections
      dispatch(
        setMainFilter({
          filters: {
            byTireSize: {
              current: {
                rearTireWidth: selectedWidth,
                // Clear downstream rear selections when width changes
                rearTireAspectRatio: '',
                rearTireDiameter: '',
              },
            },
          },
        })
      );
    } else {
      // Update front tire width and clear downstream selections
      dispatch(
        setMainFilter({
          filters: {
            byTireSize: {
              current: {
                frontTireWidth: selectedWidth,
                // Clear downstream front selections when width changes
                frontTireAspectRatio: '',
                frontTireDiameter: '',
              },
            },
          },
        })
      );
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredWidths(() => {
        if (search) {
          return (
            allWidths
              ?.filter((width) =>
                width.value
                  .toString()
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((width) => width.value.toString()) ?? null
          );
        }
        return allWidths && allWidths.length > 0
          ? (allWidths?.map((width) => width.value.toString()) ?? null)
          : null;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, allWidths]);

  return {
    search,
    filteredWidths,
    setSearch,
    setWidth,
    popularWidths,
    isRearMode,
  };
};

export default useSelectWidth;
