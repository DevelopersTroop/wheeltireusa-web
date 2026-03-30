'use client';

import React from 'react';
import { Trash2, CarFront, X, CircleDot } from 'lucide-react';
import { useTypedSelector } from '@/redux/store';
import { useAppDispatch } from '@/redux/store';
import { removeFromGarage, clearGarage } from '@/redux/features/yearMakeModelSlice';
import { TYmmGarageItem } from '@/types/ymm';
import { useGarageView } from '../../hooks/useGarageView';

export interface GarageViewProps {
  onAddVehicle: () => void;
  onClose: () => void;
}

/**
 * Garage View Component
 * Displays saved vehicles with browse actions
 * Vehicle selection logic extracted to useGarageView hook
 */
const GarageView: React.FC<GarageViewProps> = ({ onAddVehicle, onClose }) => {
  const dispatch = useAppDispatch();
  const { garage, activeGarageId } = useTypedSelector(
    (state) => state.persisted.yearMakeModel
  );

  const { handleBrowseTires, handleBrowseWheels, handleCardClick } =
    useGarageView({ onClose });

  const handleClearAll = (): void => {
    dispatch(clearGarage());
    onAddVehicle(); // Will trigger opening the add vehicle modal
  };

  const handleRemove = (id: string): void => {
    dispatch(removeFromGarage(id));
  };

  const vehicleCount = Object.keys(garage || {}).length;

  return (
    <div className="w-full bg-background">
      {/* Header - Clean, light background */}
      <div className="px-5 py-4 border-b border-border/60 bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">My Garage</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {vehicleCount} {vehicleCount === 1 ? 'vehicle' : 'vehicles'} saved
            </p>
          </div>
          <div className="flex items-center gap-3">
            {vehicleCount > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors font-medium"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle List */}
      <div className="max-h-[360px] overflow-y-auto custom-scrollbar">
        {vehicleCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 px-4">
            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
              <CarFront className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-foreground font-semibold mb-1">
              Your garage is empty
            </p>
            <p className="text-sm text-muted-foreground text-center max-w-[200px]">
              Add a vehicle to see products that fit
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {Object.entries((garage as Record<string, TYmmGarageItem>) || {}).map(
              ([id, item]) => (
                <div
                  key={id}
                  onClick={() => handleCardClick(id, item)}
                  className={`group relative transition-all duration-200 cursor-pointer ${
                    id === activeGarageId
                      ? 'bg-primary/[0.04]'
                      : 'bg-background hover:bg-blue-50/50'
                  }`}
                >
                  {/* Active indicator - subtle left accent */}
                  {id === activeGarageId && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-r-full" />
                  )}

                  <div className="p-4 pl-5">
                    <div className="flex items-start gap-3">
                      {/* Vehicle Icon - Light, soft background */}
                      <div
                        className={`shrink-0 w-10 h-10 rounded flex items-center justify-center ${
                          id === activeGarageId ? 'bg-primary/10' : 'bg-gray-100'
                        }`}
                      >
                        <CarFront
                          className={`w-5 h-5 ${
                            id === activeGarageId ? 'text-primary' : 'text-gray-500'
                          }`}
                        />
                      </div>

                      {/* Vehicle Info */}
                      <div className="flex-1 min-w-0">
                        {/* Vehicle Name - Clear hierarchy */}
                        <h3 className="font-semibold text-foreground text-sm leading-snug">
                          {item.year} {item.make}
                          {item.model &&
                            item.model !== '__DEFAULT_MODEL__' && (
                              <span className="font-normal text-foreground/80">
                                {' '}
                                {item.model}
                              </span>
                            )}
                        </h3>

                        {/* Trim/Details - Subtle */}
                        {(item.trim && item.trim !== '__DEFAULT_TRIM__') ||
                        (item.drive && item.drive !== '__DEFAULT_DRIVE__') ? (
                          <p className="text-xs text-muted-foreground mt-0.5 mb-2">
                            {[item.trim, item.drive].filter(Boolean).join(' · ')}
                          </p>
                        ) : (
                          <div className="mb-2" />
                        )}

                        {/* Action Buttons - Clear, clickable styling */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBrowseTires(id, item);
                            }}
                            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                          >
                            Browse Tires
                          </button>
                          <span className="text-gray-200">|</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBrowseWheels(id, item);
                            }}
                            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                          >
                            Browse Wheels
                          </button>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="flex flex-col items-end gap-1">
                        {/* Active Badge - Clean pill */}
                        {id === activeGarageId && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded">
                            <CircleDot className="w-2.5 h-2.5 fill-current" />
                            Active
                          </span>
                        )}

                        {/* Delete Icon - Subtle */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(id);
                          }}
                          className="w-6 h-6 flex items-center justify-center rounded text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                          aria-label="Remove vehicle"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Footer - Light background, clean button */}
      <div className="p-4 border-t border-border/60 bg-background">
        <button
          onClick={onAddVehicle}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"
        >
          <CarFront className="w-4 h-4" />
          Add Vehicle
        </button>
      </div>
    </div>
  );
};

export default GarageView;
