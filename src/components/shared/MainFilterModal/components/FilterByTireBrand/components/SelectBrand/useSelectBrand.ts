import { useGetFilterListQuery } from '@/redux/apis/product';
import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { TSingleFilter } from '@/types/filter';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// const tireBrandsData = [
//   'Achilles',
//   'Apollo Tyres',
//   'BFGoodrich',
//   'Bridgestone',
//   'Continental',
//   'Cooper Tires',
//   'Double Coin',
//   'Dunlop',
//   'Falken',
//   'Firestone',
//   'General Tire',
//   'Giti Tire',
//   'Goodyear',
//   'Goodride',
//   'Hankook',
//   'Kumho Tire',
//   'Linglong Tire',
//   'Michelin',
//   'Nexen',
//   'Pirelli',
//   'Roadstone',
//   'Sailun Tire',
//   'Sumitomo',
//   'Toyo Tires',
//   'Triangle Tire',
//   'Uniroyal',
//   'Wanli',
//   'Westlake',
//   'Yokohama',
//   'Zeetex',
// ];

// Custom hook
const useSelectBrand = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [alphabets, setAlphabets] = useState<string[]>([]);
  const { data, isLoading } = useGetFilterListQuery({ category: 'tire' });
  const allBrands = data?.filters?.brand as TSingleFilter[] | undefined;
  const [filteredBrands, setFilteredBrands] = useState(allBrands);
  const setBrand = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      setMainFilter({
        filters: {
          byTireBrand: {
            current: {
              brand: e?.currentTarget?.textContent?.trim(),
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredBrands(() => {
        if (search || alphabets.length > 0) {
          const searchedWithText =
            search !== ''
              ? allBrands?.filter((brand) =>
                  brand.value
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
              : allBrands;
          const searchedWithAlphabet =
            alphabets.length > 0
              ? searchedWithText?.filter((brand) =>
                  alphabets.includes(
                    brand.value.toString().charAt(0).toLowerCase()
                  )
                )
              : searchedWithText;
          return searchedWithAlphabet;
        }
        return allBrands;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, alphabets, allBrands]);

  return {
    search,
    filteredBrands,
    setSearch,
    setBrand,
    alphabets,
    setAlphabets,
  };
};

export default useSelectBrand;
