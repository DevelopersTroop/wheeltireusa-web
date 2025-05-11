import { useTypedSelector } from '@/redux/store';

const useMainFilterModal = () => {
  const mainFilterState = useTypedSelector((state) => state.mainFilter);
  // const dispatch = useDispatch()

  return {
    ...mainFilterState,
  };
};
export default useMainFilterModal;
