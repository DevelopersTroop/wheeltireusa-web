'use client';
import { openMainFilterModal } from '@/redux/features/mainFilterSlice';
import { useDispatch } from 'react-redux';

const TireBrandFilter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="bg-white hover:bg-gray-100 px-5 py-5 w-full rounded-[6px] cursor-pointer flex flex-row justify-between gap-5"
        onClick={() => dispatch(openMainFilterModal({ tab: 'TireBrand' }))}
      >
        <div className="flex flex-row gap-2 items-center">
          <img src={'/images/header/Tag.svg'} alt="wheel" className="w-6 h-6" />
          <span>Search by Tire brand</span>
        </div>
        <img
          src={'/images/header/ArrowRight.svg'}
          alt="Arrow"
          className="w-4 h-4 mt-1"
        />
      </button>
    </>
  );
};

export default TireBrandFilter;
