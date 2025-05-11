import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const tireBrandsData = [
  'Achilles',
  'Apollo Tyres',
  'BFGoodrich',
  'Bridgestone',
  'Continental',
  'Cooper Tires',
  'Double Coin',
  'Dunlop',
  'Falken',
  'Firestone',
  'General Tire',
  'Giti Tire',
  'Goodyear',
  'Goodride',
  'Hankook',
  'Kumho Tire',
  'Linglong Tire',
  'Michelin',
  'Nexen',
  'Pirelli',
  'Roadstone',
  'Sailun Tire',
  'Sumitomo',
  'Toyo Tires',
  'Triangle Tire',
  'Uniroyal',
  'Wanli',
  'Westlake',
  'Yokohama',
  'Zeetex',
];

// Custom hook
const useSelectBrand = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [alphabets, setAlphabets] = useState<string[]>([]);
  const [filteredBrands, setFilteredBrands] = useState(tireBrandsData);
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
              ? tireBrandsData.filter((brand) =>
                  brand.toLowerCase().includes(search.toLowerCase())
                )
              : tireBrandsData;
          const searchedWithAlphabet =
            alphabets.length > 0
              ? searchedWithText.filter((brand) =>
                  alphabets.includes(brand.charAt(0).toLowerCase())
                )
              : searchedWithText;
          return searchedWithAlphabet;
        }
        return tireBrandsData;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, alphabets, tireBrandsData]);

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
