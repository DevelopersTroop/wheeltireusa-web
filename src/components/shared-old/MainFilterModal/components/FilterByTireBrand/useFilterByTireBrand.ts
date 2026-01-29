import { closeMainFilterModal } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const useFilterByTireBrand = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const mainFilterState = useTypedSelector((state) => state.mainFilter);
  const selectedBrand = mainFilterState.filters.byTireBrand.current.brand;
  const selectedZipCode = mainFilterState.zipCode;
  const isDisabled = !selectedBrand || !selectedZipCode;
  const submitFilter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/collections/product-category/tire?brand=${selectedBrand}`);
    dispatch(closeMainFilterModal());
  };
  return {
    brand: selectedBrand,
    isDisabled,
    submitFilter,
  };
};

export default useFilterByTireBrand;
