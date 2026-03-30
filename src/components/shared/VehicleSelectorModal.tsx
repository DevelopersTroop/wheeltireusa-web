"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Trash2, CarFront, Check, Circle, X, CircleDot } from "lucide-react";
import useYmm from "@/hooks/useYmm";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { addToGarage, removeFromGarage, clearGarage, submitYmm, setActiveGarage, clearYearMakeModel } from "@/redux/features/yearMakeModelSlice";
import { setIsModalOpen } from "@/redux/features/ymmFilterSlice";
import { TYmmGarageItem } from "@/types/ymm";
import { useRouter, usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export const VehicleSelectorModal = ({ isOpen, onOpenChange, skipToGarage }: { isOpen: boolean, onOpenChange: (open: boolean) => void, skipToGarage?: boolean }) => {
  const { garage, activeGarageId } = useTypedSelector((state) => state.persisted.yearMakeModel);
  const garageCount = Object.keys(garage || {}).length;
  const dispatch = useAppDispatch();

  // Show garage view by default if there are vehicles, otherwise show add view
  useEffect(() => {
    if (isOpen) {
      if (garageCount === 0) {
        onOpenChange(false);
        // Dispatch to open the new YMM modal instead of using the local add view
        dispatch(setIsModalOpen({ isOpen: true, source: "vehicle_selector_button" }));
      }
    }
  }, [isOpen, garageCount, onOpenChange, dispatch]);

  const handleClearAll = () => {
    dispatch(clearGarage());
    onOpenChange(false);
    // Dispatch to open the new YMM modal instead
    dispatch(setIsModalOpen({ isOpen: true, source: "vehicle_selector_button" }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromGarage(id));
    // If we removed the last vehicle, close this modal and open the add vehicle one
    if (garageCount <= 1) {
      onOpenChange(false);
      dispatch(setIsModalOpen({ isOpen: true, source: "vehicle_selector_button" }));
    }
  };

  const handleAddVehicle = () => {
    onOpenChange(false);
    dispatch(setIsModalOpen({ isOpen: true, source: "vehicle_selector_button" }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[480px] mx-auto p-0 gap-0 border border-border/50 shadow-xl rounded overflow-hidden bg-background"
        hideCloseButton
      >
        <GarageView
          garage={garage}
          activeGarageId={activeGarageId}
          onAddVehicle={handleAddVehicle}
          onClearAll={handleClearAll}
          onRemove={handleRemove}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

const GarageView = ({ garage, activeGarageId, onAddVehicle, onClearAll, onRemove, onClose }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  // Sets vehicle as active BEFORE navigation
  const handleBrowseTires = (id: string, item: TYmmGarageItem) => {
    // Always set as active first (even if already active)
    dispatch(setActiveGarage(id));
    dispatch(submitYmm({ ...item }));
    onClose();
    router.push('/collections/product-category/tires');
  };

  const handleBrowseWheels = (id: string, item: TYmmGarageItem) => {
    // Always set as active first (even if already active)
    dispatch(setActiveGarage(id));
    dispatch(submitYmm({ ...item }));
    onClose();
    router.push('/collections/product-category/wheels');
  };

  // Click on card - only set active, no redirect
  const handleCardClick = (id: string, item: TYmmGarageItem) => {
    dispatch(setActiveGarage(id));
    dispatch(submitYmm({ ...item }));
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
                onClick={onClearAll}
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
            <p className="text-foreground font-semibold mb-1">Your garage is empty</p>
            <p className="text-sm text-muted-foreground text-center max-w-[200px]">
              Add a vehicle to see products that fit
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {Object.entries((garage as Record<string, TYmmGarageItem>) || {}).map(([id, item]) => (
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
                    <div className={`shrink-0 w-10 h-10 rounded flex items-center justify-center ${
                      id === activeGarageId ? 'bg-primary/10' : 'bg-gray-100'
                    }`}>
                      <CarFront className={`w-5 h-5 ${id === activeGarageId ? 'text-primary' : 'text-gray-500'}`} />
                    </div>

                    {/* Vehicle Info */}
                    <div className="flex-1 min-w-0">
                      {/* Vehicle Name - Clear hierarchy */}
                      <h3 className="font-semibold text-foreground text-sm leading-snug">
                        {item.year} {item.make}
                        {item.model && item.model !== '__DEFAULT_MODEL__' && (
                          <span className="font-normal text-foreground/80"> {item.model}</span>
                        )}
                      </h3>

                      {/* Trim/Details - Subtle */}
                      {(item.trim && item.trim !== '__DEFAULT_TRIM__') || (item.drive && item.drive !== '__DEFAULT_DRIVE__') ? (
                        <p className="text-xs text-muted-foreground mt-0.5 mb-2">
                          {[item.trim, item.drive].filter(Boolean).join(' · ')}
                        </p>
                      ) : (
                        <div className="mb-2" />
                      )}

                      {/* Action Buttons - Clear, clickable styling */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleBrowseTires(id, item); }}
                          className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                        >
                          Browse Tires
                        </button>
                        <span className="text-gray-200">|</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleBrowseWheels(id, item); }}
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
                        onClick={(e) => { e.stopPropagation(); onRemove(id); }}
                        className="w-6 h-6 flex items-center justify-center rounded text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                        aria-label="Remove vehicle"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

/**
 * @deprecated This component is no longer used for adding vehicles.
 * Use the new YmmFilterModal component instead.
 */
const AddVehicleView = ({ onClose }: { onClose: () => void }) => {
  const {
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isTrimLoading,
    isDriveLoading,
    isYearDisabled,
    isMakeDisabled,
    isModelDisabled,
    list: { years, makes, models, trims, drives },
    onYearChange,
    onMakeChange,
    onModelChange,
    onTrimChange,
    onDriveChange,
    isDisabledSubmit,
    isTrimDisabled,
    isDriveDisabled,
    year,
    make,
    model,
    trim,
    drive,
    shouldShowSubmit,
  } = useYmm("vehicle_selector_modal");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const hasUserInteracted = useRef(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>("year");

  const handleOpenChange = (key: string) => (open: boolean) => {
    setActiveDropdown(open ? key : null);
  };

  const handleInteraction = <T extends (...args: any[]) => void>(fn: T) => {
    return (...args: Parameters<T>) => {
      hasUserInteracted.current = true;
      fn(...args);
    };
  };

  const handleYearChange = handleInteraction(onYearChange);
  const handleMakeChange = handleInteraction(onMakeChange);
  const handleModelChange = handleInteraction(onModelChange);
  const handleTrimChange = handleInteraction(onTrimChange);
  const handleDriveChange = handleInteraction(onDriveChange);

  // Auto-advance dropdowns 
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (year && !isMakeLoading && !isMakeDisabled && (makes?.length ?? 0) > 0 && (!make || make === "__DEFAULT_MAKE__")) {
      timeoutId = setTimeout(() => setActiveDropdown("make"), 300);
    }
    return () => clearTimeout(timeoutId);
  }, [year, isMakeLoading, isMakeDisabled, makes?.length, make]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (make && !isModelLoading && !isModelDisabled && (models?.length ?? 0) > 0 && (!model || model === "__DEFAULT_MODEL__")) {
      timeoutId = setTimeout(() => setActiveDropdown("model"), 300);
    }
    return () => clearTimeout(timeoutId);
  }, [make, isModelLoading, isModelDisabled, models?.length, model]);

  const showTrim = (trims?.length ?? 0) > 0;
  const showDrive = (drives?.length ?? 0) > 0;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showTrim && model && model !== "__DEFAULT_MODEL__" && !isTrimLoading && !isTrimDisabled && (!trim || trim === "__DEFAULT_TRIM__")) {
      timeoutId = setTimeout(() => setActiveDropdown("trim"), 300);
    }
    return () => clearTimeout(timeoutId);
  }, [showTrim, model, isTrimLoading, isTrimDisabled, trim]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showDrive && trim && trim !== "__DEFAULT_TRIM__" && !isDriveLoading && !isDriveDisabled && (!drive || drive === "__DEFAULT_DRIVE__")) {
      timeoutId = setTimeout(() => setActiveDropdown("drive"), 300);
    }
    return () => clearTimeout(timeoutId);
  }, [showDrive, trim, isDriveLoading, isDriveDisabled, drive]);

  const handleSubmit = () => {
    const cleanModel = model && model !== '__DEFAULT_MODEL__' ? model : '';
    const cleanTrim = trim && trim !== '__DEFAULT_TRIM__' ? trim : '';
    const cleanDrive = drive && drive !== '__DEFAULT_DRIVE__' ? drive : '';
    const newItem: TYmmGarageItem = {
      year,
      make,
      model: cleanModel,
      trim: cleanTrim,
      drive: cleanDrive,
    };
    dispatch(addToGarage(newItem));
    dispatch(submitYmm(newItem));
    onClose();
    if (pathname && !pathname.includes('/collections')) {
      const targetPath = pathname.includes('/tire')
        ? '/collections/product-category/tire'
        : '/collections/product-category/wheels';
      router.push(targetPath);
    }
  };

  // Auto-submit when fully populated
  useEffect(() => {
    const isReady = !isDisabledSubmit && shouldShowSubmit;
    if (isReady && hasUserInteracted.current) {
      handleSubmit();
      hasUserInteracted.current = false; // Reset
    }
  }, [isDisabledSubmit, shouldShowSubmit]);

  return (
    <div className="bg-[#E8EDF2] p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Select Your Vehicle</h2>
        <p className="text-sm text-gray-600">Provide vehicle details to confirm fitment</p>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-center">
        {/* Year Dropdown */}
        <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
          <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">1</div>
          <div className="w-px h-5 bg-gray-300"></div>
          <Select open={activeDropdown === "year"} onOpenChange={handleOpenChange("year")} onValueChange={handleYearChange} value={year || undefined} disabled={isYearDisabled}>
            <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 shadow-none border-none ring-0 focus:ring-0 appearance-none h-14 [&>svg]:hidden shrink-0 whitespace-nowrap">
              <SelectValue placeholder={isYearLoading ? "LOADING..." : "YEAR"} />
            </SelectTrigger>
            <SelectContent>
              {years?.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Make Dropdown */}
        <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
          <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">2</div>
          <div className="w-px h-5 bg-gray-300"></div>
          <Select open={activeDropdown === "make"} onOpenChange={handleOpenChange("make")} onValueChange={handleMakeChange} value={make || "__DEFAULT_MAKE__"} disabled={isMakeDisabled}>
            <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 shadow-none border-none ring-0 focus:ring-0 appearance-none h-14 [&>svg]:hidden shrink-0 whitespace-nowrap">
              <SelectValue placeholder={isMakeLoading ? "LOADING..." : "MAKE"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__DEFAULT_MAKE__" className="hidden" disabled>MAKE</SelectItem>
              {makes?.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Model Dropdown */}
        <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
          <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">3</div>
          <div className="w-px h-5 bg-gray-300"></div>
          <Select open={activeDropdown === "model"} onOpenChange={handleOpenChange("model")} onValueChange={handleModelChange} value={model || "__DEFAULT_MODEL__"} disabled={isModelDisabled}>
            <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 shadow-none border-none ring-0 focus:ring-0 appearance-none h-14 [&>svg]:hidden shrink-0 whitespace-nowrap">
              <SelectValue placeholder={isModelLoading ? "LOADING..." : "MODEL"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__DEFAULT_MODEL__" className="hidden" disabled>MODEL</SelectItem>
              {models?.map((mdl) => (
                <SelectItem key={mdl} value={mdl}>{mdl}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {showTrim && (
          <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
            <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">4</div>
            <div className="w-px h-5 bg-gray-300"></div>
            <Select open={activeDropdown === "trim"} onOpenChange={handleOpenChange("trim")} onValueChange={handleTrimChange} value={trim || "__DEFAULT_TRIM__"} disabled={isTrimDisabled}>
              <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 shadow-none border-none ring-0 focus:ring-0 appearance-none h-14 [&>svg]:hidden shrink-0 whitespace-nowrap">
                <SelectValue placeholder={isTrimLoading ? "LOADING..." : "TRIM"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__DEFAULT_TRIM__" className="hidden" disabled>TRIM</SelectItem>
                {trims?.map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        )}

        {showDrive && (
          <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
            <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">5</div>
            <div className="w-px h-5 bg-gray-300"></div>
            <Select open={activeDropdown === "drive"} onOpenChange={handleOpenChange("drive")} onValueChange={handleDriveChange} value={drive || "__DEFAULT_DRIVE__"} disabled={isDriveDisabled}>
              <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 shadow-none border-none ring-0 focus:ring-0 appearance-none h-14 [&>svg]:hidden shrink-0 whitespace-nowrap">
                <SelectValue placeholder={isDriveLoading ? "LOADING..." : "DRIVE"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__DEFAULT_DRIVE__" className="hidden" disabled>DRIVE</SelectItem>
                {drives?.map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isDisabledSubmit}
          className="w-full sm:w-auto px-8 py-3 whitespace-nowrap bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-sm transition-colors disabled:opacity-50"
        >
          GO
        </button>
      </div>


    </div>
  );
};

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
    : "SELECT YOUR VEHICLE";

  // Helper to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <>
      <button
        onClick={() => {
          if (count > 0) {
            setIsModalOpenLocal(true);
          } else {
            dispatch(setIsModalOpen({ isOpen: true, source: "vehicle_selector_button" }));
          }
        }}
        className="flex items-center gap-2 px-3 py-2 bg-[#F0F4F8] hover:bg-[#E2E8F0] rounded-md transition-colors cursor-pointer w-full"
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
        {
          activeItem ? (
            <>
              <span className="h-6 bg-gray-300 w-px block" />
              <span className="text-blue-500 font-bold text-xs sm:text-sm whitespace-nowrap tracking-wide hover:underline">
                CHANGE
              </span>
            </>
          ) : null
        }
      </button>

      <VehicleSelectorModal
        isOpen={isModalOpenLocal}
        onOpenChange={setIsModalOpenLocal}
        skipToGarage={count > 0}
      />
    </>
  );
};
