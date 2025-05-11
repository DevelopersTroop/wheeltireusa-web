import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const makeData = {
  statusCode: 200,
  response: true,
  message: 'Get makes successfully',
  data: {
    makes: [
      'Acura',
      'Alfa Romeo',
      'Aston Martin',
      'Audi',
      'Bentley',
      'BMW',
      'BrightDrop',
      'Buick',
      'Cadillac',
      'Chevrolet',
      'Chrysler',
      'Dodge',
      'Ferrari',
      'Fiat',
      'Fisker',
      'Ford',
      'Genesis',
      'GMC',
      'Honda',
      'Hyundai',
      'INEOS',
      'INFINITI',
      'Jaguar',
      'Jeep',
      'Karma',
      'Kia',
      'Lamborghini',
      'Land Rover',
      'Lexus',
      'Lincoln',
      'Lotus',
      'Lucid',
      'Maserati',
      'Mazda',
      'McLaren',
      'Mercedes-Benz',
      'Mini',
      'Mitsubishi',
      'Nissan',
      'Polestar',
      'Porsche',
      'Ram',
      'Rivian',
      'Rolls-Royce',
      'Subaru',
      'Tesla',
      'Toyota',
      'VinFast',
      'Volkswagen',
      'Volvo',
    ],
  },
};
// Custom hook
const useSelectMake = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredMakes, setFilteredMakes] = useState(makeData.data.makes);
  const setMake = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      setMainFilter({
        current: {
          make: e?.currentTarget?.textContent?.trim(),
        },
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredMakes(() => {
        if (search) {
          return makeData.data.makes.filter((make) =>
            make.toLowerCase().includes(search.toLowerCase())
          );
        }
        return makeData.data.makes;
      });
    }, 300); // debounce delay in ms

    // Cleanup function clears timeout if search changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [search, makeData.data.makes]);

  return { search, filteredMakes, setSearch, setMake };
};

export default useSelectMake;
