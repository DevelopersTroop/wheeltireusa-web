import { useDispatch } from 'react-redux';
import { setMainFilter } from '@/redux/features/mainFilterSlice';

const useAddZipCode = () => {
  const dispatch = useDispatch();
  const onChangeZipCode = (zipCode: string) => {
    dispatch(
      setMainFilter({
        filters: {
          byVehicle: {
            current: {
              zipCode: zipCode.trim().length === 5 ? zipCode : null,
            },
          },
        },
      })
    );
  };
  return {
    onChangeZipCode,
  };
};
export default useAddZipCode;
