'use client';
import { openMainFilterModal } from '@/redux/features/mainFilterSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const TireSizeFilter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="bg-white hover:bg-gray-100 p-[20px] w-full rounded-[6px] cursor-pointer"
        onClick={() => dispatch(openMainFilterModal({ tab: 'TireSize' }))}
      >
        Search by Tire size
      </button>
    </>
  );
};

export default TireSizeFilter;
