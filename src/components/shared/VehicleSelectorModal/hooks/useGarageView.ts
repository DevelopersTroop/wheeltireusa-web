'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/store';
import { TYmmGarageItem } from '@/types/ymm';
import { setActiveGarage, submitYmm } from '@/redux/features/yearMakeModelSlice';

export interface UseGarageViewParams {
  onClose: () => void;
}

export interface UseGarageViewReturn {
  handleBrowseTires: (id: string, item: TYmmGarageItem) => void;
  handleBrowseWheels: (id: string, item: TYmmGarageItem) => void;
  handleCardClick: (id: string, item: TYmmGarageItem) => void;
}

/**
 * Hook for GarageView interactions
 * Handles vehicle selection, activation, and navigation to product categories
 */
export const useGarageView = ({
  onClose,
}: UseGarageViewParams): UseGarageViewReturn => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleBrowseTires = useCallback(
    (id: string, item: TYmmGarageItem) => {
      // Always set as active first (even if already active)
      dispatch(setActiveGarage(id));
      dispatch(submitYmm({ ...item }));
      onClose();
      router.push('/collections/product-category/tires');
    },
    [dispatch, onClose, router]
  );

  const handleBrowseWheels = useCallback(
    (id: string, item: TYmmGarageItem) => {
      // Always set as active first (even if already active)
      dispatch(setActiveGarage(id));
      dispatch(submitYmm({ ...item }));
      onClose();
      router.push('/collections/product-category/wheels');
    },
    [dispatch, onClose, router]
  );

  // Click on card - only set active, no redirect
  const handleCardClick = useCallback(
    (id: string, item: TYmmGarageItem) => {
      dispatch(setActiveGarage(id));
      dispatch(submitYmm({ ...item }));
    },
    [dispatch]
  );

  return {
    handleBrowseTires,
    handleBrowseWheels,
    handleCardClick,
  };
};
