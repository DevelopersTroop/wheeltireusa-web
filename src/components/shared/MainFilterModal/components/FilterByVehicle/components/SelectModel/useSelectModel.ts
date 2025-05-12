import { setMainFilter } from '@/redux/features/mainFilterSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const model = {
  statusCode: 200,
  response: true,
  message: 'Get models successfully',
  data: {
    models: [
      '228i Gran Coupe',
      '228i xDrive Gran Coupe',
      '230i',
      '230i xDrive',
      '330e',
      '330e xDrive',
      '330i',
      '330i xDrive',
      '430i',
      '430i Gran Coupe',
      '430i xDrive',
      '430i xDrive Gran Coupe',
      '530e',
      '530e xDrive',
      '530i',
      '530i xDrive',
      '540i',
      '540i xDrive',
      '740i',
      '760i xDrive',
      '840i',
      '840i Gran Coupe',
      '840i xDrive',
      '840i xDrive Gran Coupe',
      'Alpina B8 Gran Coupe',
      'Alpina XB7',
      'i4',
      'i7',
      'iX',
      'M2',
      'M235i xDrive Gran Coupe',
      'M240i',
      'M240i xDrive',
      'M3',
      'M340i',
      'M340i xDrive',
      'M4',
      'M440i',
      'M440i Gran Coupe',
      'M440i xDrive',
      'M440i xDrive Gran Coupe',
      'M5',
      'M550i xDrive',
      'M8',
      'M8 Gran Coupe',
      'M850i xDrive',
      'M850i xDrive Gran Coupe',
      'X1',
      'X2',
      'X3',
      'X4',
      'X5',
      'X6',
      'X7',
      'XM',
      'Z4',
    ],
  },
};
const useSelectModel = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredModels, setFilteredModels] = useState(model.data.models);

  const setModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              model: e?.currentTarget?.textContent?.trim(),
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredModels(() => {
        if (search) {
          return model.data.models.filter((model) =>
            model.toLowerCase().includes(search.toLowerCase())
          );
        }
        return model.data.models;
      });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search, model.data.models]);

  return { search, filteredModels, setSearch, setModel };
};

export default useSelectModel;
