'use client';
import { openMainFilterModal } from '@/redux/features/mainFilterSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const YmmFilter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="bg-white hover:bg-gray-100 px-5 py-4 w-full rounded-[6px] cursor-pointer flex flex-row justify-between gap-5"
        onClick={() => dispatch(openMainFilterModal({ tab: 'Vehicle' }))}
      >
        <div className="flex flex-row gap-2 items-center">
          <img src={'/images/header/Car.svg'} alt="car" className="w-6 h-6" />
          <span>Search by Vehicle model</span>
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

export default YmmFilter;
