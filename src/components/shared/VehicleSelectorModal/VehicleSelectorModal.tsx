'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { useTypedSelector } from '@/redux/store';
import { useAppDispatch } from '@/redux/store';
import { setIsModalOpen } from '@/redux/features/ymmFilterSlice';
import { clearGarage, removeFromGarage } from '@/redux/features/yearMakeModelSlice';
import { useVehicleSelectorModal } from './hooks/useVehicleSelectorModal';
import GarageView from './components/GarageView/GarageView';

export interface VehicleSelectorModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  skipToGarage?: boolean;
}

/**
 * Vehicle Selector Modal Component
 * Main container for garage management UI
 * Modal logic extracted to useVehicleSelectorModal hook
 */
const VehicleSelectorModal: React.FC<VehicleSelectorModalProps> = ({
  isOpen,
  onOpenChange,
  skipToGarage,
}) => {
  const { garage } = useTypedSelector((state) => state.persisted.yearMakeModel);
  const garageCount = Object.keys(garage || {}).length;
  const dispatch = useAppDispatch();

  const { handleOpenYmmModal } = useVehicleSelectorModal({
    isOpen,
    onOpenChange,
  });

  // Show garage view by default if there are vehicles, otherwise show add view
  useEffect(() => {
    if (isOpen) {
      if (garageCount === 0) {
        onOpenChange(false);
        // Dispatch to open the new YMM modal instead of using the local add view
        handleOpenYmmModal();
      }
    }
  }, [isOpen, garageCount, onOpenChange, handleOpenYmmModal]);

  const handleClearAll = (): void => {
    dispatch(clearGarage());
    onOpenChange(false);
    // Dispatch to open the new YMM modal instead
    handleOpenYmmModal();
  };

  const handleRemove = (id: string): void => {
    dispatch(removeFromGarage(id));
    // If we removed the last vehicle, close this modal and open the add vehicle one
    if (garageCount <= 1) {
      onOpenChange(false);
      handleOpenYmmModal();
    }
  };

  const handleAddVehicle = (): void => {
    onOpenChange(false);
    handleOpenYmmModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[480px] mx-auto p-0 gap-0 border border-border/50 shadow-xl rounded overflow-hidden bg-background"
        hideCloseButton
      >
        <GarageView
          onAddVehicle={handleAddVehicle}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default VehicleSelectorModal;
