'use client';

import React, { useState } from 'react';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { setIsModalOpen } from '@/redux/features/ymmFilterSlice';
import VehicleSelectorModal from './VehicleSelectorModal';

/**
 * Vehicle Selector Button Component
 * Shows active vehicle and garage count; opens modal on click
 */
export const VehicleSelectorButton = () => {
  const [isModalOpenLocal, setIsModalOpenLocal] = useState(false);
  const dispatch = useAppDispatch();
  const { garage, activeGarageId } = useTypedSelector(
    (state) => state.persisted.yearMakeModel
  );

  const activeItem = activeGarageId ? garage?.[activeGarageId] : undefined;
  const count = Object.keys(garage || {}).length;

  const activeLabel = activeItem
    ? `${activeItem.year} ${activeItem.make} ${activeItem.model && activeItem.model !== '__DEFAULT_MODEL__' ? activeItem.model : ''} ${activeItem.trim && activeItem.trim !== '__DEFAULT_TRIM__' ? activeItem.trim : ''} ${activeItem.drive && activeItem.drive !== '__DEFAULT_DRIVE__' ? activeItem.drive : ''}`.trim()
    : 'SELECT YOUR VEHICLE';

  // Helper to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleClick = (): void => {
    if (count > 0) {
      setIsModalOpenLocal(true);
    } else {
      dispatch(
        setIsModalOpen({ isOpen: true, source: 'vehicle_selector_button' })
      );
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-3 py-2 bg-[#F0F4F8] hover:bg-[#E2E8F0] rounded-md transition-colors cursor-pointer w-full"
        aria-label="Select vehicle"
      >
        {/* Car icon */}
        <div className="flex-1 flex items-center gap-2">
          <div className="relative shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-gray-700"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
            <div className="absolute -top-2 -right-2.5 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
              {Object.keys(garage)?.length || 0}
            </div>
          </div>

          <span className="text-primary font-bold text-xs sm:text-xs whitespace-nowrap tracking-wide overflow-hidden">
            {truncateText(activeLabel, 19)}
          </span>
        </div>
        {activeItem ? (
          <>
            <span className="h-6 bg-gray-300 w-px block" />
            <span className="text-blue-500 font-bold text-xs sm:text-sm whitespace-nowrap tracking-wide hover:underline">
              CHANGE
            </span>
          </>
        ) : null}
      </button>

      {/* Render the VehicleSelectorModal when there are garage items */}
      <VehicleSelectorModal
        isOpen={isModalOpenLocal}
        onOpenChange={setIsModalOpenLocal}
      />
    </>
  );
};
