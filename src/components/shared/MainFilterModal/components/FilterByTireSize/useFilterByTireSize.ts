import { closeMainFilterModal } from '@/redux/features/mainFilterSlice';
import { useTypedSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

export type TTireSize = {
  front: {
    diameter: string;
    aspectRatio: string;
    width: string;
  };
  rear: {
    diameter: string;
    aspectRatio: string;
    width: string;
  };
};
const useFilterByTireSize = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedTireSizes, setSelectedTireSizes] = useState<TTireSize | null>(
    null
  );
  console.log(selectedTireSizes);

  // Check if the tire sizes are valid
  let isDisabled = true;
  if (!selectedTireSizes) {
    isDisabled = true;
  } else {
    if (
      selectedTireSizes.front.diameter &&
      selectedTireSizes.front.aspectRatio &&
      selectedTireSizes.front.width &&
      selectedTireSizes.rear.diameter &&
      selectedTireSizes.rear.aspectRatio &&
      selectedTireSizes.rear.width
    ) {
      isDisabled = false;
    }
  }
  const submitFilter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // router.push(`/collections/product-category/tire?aspect_ratio=${selectedAspectRatio}&diameter=${selectedDiameter}&width=${selectedWidth}`);
    dispatch(closeMainFilterModal());
  };

  return {
    setSelectedTireSizes,
    isDisabled,
    submitFilter,
  };
};

export default useFilterByTireSize;
