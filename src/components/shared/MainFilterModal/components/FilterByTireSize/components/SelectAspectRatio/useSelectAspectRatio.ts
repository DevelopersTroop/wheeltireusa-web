import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { TSingleFilter } from '@/types/filter';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface UseSelectAspectRatioProps {
  isRearMode?: boolean;
}

const useSelectAspectRatio = ({
  isRearMode = false,
}: UseSelectAspectRatioProps = {}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const allAspectRatios = useTypedSelector(
    (state) => state.mainFilter.filters.byTireSize.list.aspectRatios
  );
  const [filteredAspectRatios, setFilteredAspectRatios] = useState<
    string[] | null
  >(null);

  const setAspectRatio = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedAspectRatio = e?.currentTarget?.textContent?.trim();

    if (isRearMode) {
      // Only update rear tire aspect ratio and clear downstream rear selections
      dispatch(
        setMainFilter({
          filters: {
            byTireSize: {
              current: {
                rearTireAspectRatio: selectedAspectRatio,
                // Clear downstream rear selections when aspect ratio changes
                rearTireDiameter: '',
              },
            },
          },
        })
      );
    } else {
      // Update front tire aspect ratio and clear downstream selections
      dispatch(
        setMainFilter({
          filters: {
            byTireSize: {
              current: {
                frontTireAspectRatio: selectedAspectRatio,
                // Clear downstream front selections when aspect ratio changes
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
      setFilteredAspectRatios(() => {
        if (search) {
          return (
            allAspectRatios
              ?.filter((aspectRatio) =>
                aspectRatio.value
                  .toString()
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((aspectRatio) => aspectRatio.value.toString()) ?? null
          );
        }
        return (
          allAspectRatios?.map((aspectRatio) => aspectRatio.value.toString()) ??
          null
        );
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, allAspectRatios]);

  return {
    search,
    filteredAspectRatios,
    setSearch,
    setAspectRatio,
    isRearMode,
  };
};

export default useSelectAspectRatio;