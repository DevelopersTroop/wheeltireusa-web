'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';
import { setIsModalOpen } from '@/redux/features/ymmFilterSlice';

export interface UseVehicleSelectorModalParams {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Hook for VehicleSelectorModal behavior
 * Handles modal opening logic - redirects to YMM filter modal if garage is empty
 */
export const useVehicleSelectorModal = ({
  isOpen,
  onOpenChange,
}: UseVehicleSelectorModalParams) => {
  const dispatch = useAppDispatch();

  // NOTE: This hook doesn't directly access garage count
  // The parent component is responsible for passing garageCount as a prop
  // This keeps the hook focused on modal behavior only

  const handleOpenYmmModal = (): void => {
    dispatch(setIsModalOpen({ isOpen: true, source: 'vehicle_selector_button' }));
  };

  return {
    handleOpenYmmModal,
  };
};
