"use client";
import useYmm from "@/hooks/useYmm";
import { CarFront, CheckCircle2, ChevronDown, RotateCcw, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTypedSelector, useAppDispatch } from "@/redux/store";
import { clearYearMakeModel, addToGarage, submitYmm } from "@/redux/features/yearMakeModelSlice";
import { TYmmGarageItem } from "@/types/ymm";
import { useRouter, usePathname } from "next/navigation";
import YmmCustomSelect from "./YmmCustomSelect/YmmCustomSelect";

const StickyVehicleSelector = ({ scrollOffset = 180 }: { scrollOffset?: number }) => {
  const {
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isTrimLoading,
    isDriveLoading,
    isYearDisabled,
    isMakeDisabled,
    isModelDisabled,
    isTrimDisabled,
    isDriveDisabled,
    shouldShowSubmit,
    list: { years, makes, models, trims, drives },
    onYearChange,
    onMakeChange,
    onModelChange,
    onTrimChange,
    onDriveChange,
    onSubmit,
    isDisabledSubmit,
    year,
    make,
    model,
    trim,
    drive,
    isActive,
  } = useYmm("header_ymm");

  const dispatch = useAppDispatch();
  const isHomeYmmInView = useTypedSelector((state) => state.persisted.yearMakeModel.isHomeYmmInView);
  const garage = useTypedSelector((state) => state.persisted.yearMakeModel.garage);
  const activeGarageId = useTypedSelector((state) => state.persisted.yearMakeModel.activeGarageId);

  // Use the active garage item as the primary source of truth for selected vehicle
  const activeGarageItem = activeGarageId ? garage?.[activeGarageId] : undefined;

  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isFirstRender = useRef(true);
  const hasUserInteracted = useRef(false);

  useEffect(() => {
    isFirstRender.current = false;

    // Auto popup 'Year' Select when initialized and completely empty
    if (!hasUserInteracted.current && !year) {
      // setActiveDropdown("year"); // Disabled year auto-expand
    }
  }, []);

  // Determine if a vehicle is fully selected - strict check for active garage item only
  const hasVehicleSelected = Boolean(activeGarageId && activeGarageItem);

  // Track screen size to conditionally render desktop vs mobile
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setActiveDropdown(null); // close any open dropdown on resize
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const handleCustomSubmit = () => {
    if (year && make && model) {
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
      
      const targetPath = pathname?.includes('/tire')
        ? '/collections/product-category/tire'
        : '/collections/product-category/wheels';
      
      router.push(`${targetPath}?vehicle=selectedVehicleInformation`);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  // The header should be shown only when scrolled past sentinel AND HomeYmm is NOT in view
  const shouldShow = isVisible && !isHomeYmmInView;

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

  const handleOpenChange = (key: string) => (open: boolean) => {
    if (open) setActiveDropdown(key);
    else setActiveDropdown((prev) => (prev === key ? null : prev));
  };

  const handleClear = () => {
    dispatch(clearYearMakeModel());
  };

  const router = useRouter();
  const pathname = usePathname();
  const handleShopNow = () => {
    const targetPath = pathname?.includes('/tire')
      ? '/collections/product-category/tire'
      : '/collections/product-category/wheels';

    if (activeGarageItem) {
      router.push(`${targetPath}?vehicle=selectedVehicleInformation`);
    } else {
      onSubmit(undefined, { targetPath });
    }
  };

  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (shouldShow && hasUserInteracted.current && year && !isMakeLoading && !isMakeDisabled && (makes?.length ?? 0) > 0 && (!make || make === "__DEFAULT_MAKE__")) {
      timeoutId = setTimeout(() => {
        if (selectorRef.current?.offsetParent) setActiveDropdown("make");
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [year, isMakeLoading, isMakeDisabled, makes?.length, make, isActive, shouldShow]);

  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (shouldShow && hasUserInteracted.current && make && !isModelLoading && !isModelDisabled && (models?.length ?? 0) > 0 && (!model || model === "__DEFAULT_MODEL__")) {
      timeoutId = setTimeout(() => {
        if (selectorRef.current?.offsetParent) setActiveDropdown("model");
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [make, isModelLoading, isModelDisabled, models?.length, model, isActive, shouldShow]);

  // Auto-advance: open Trim after Model is selected
  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (shouldShow && hasUserInteracted.current && model && model !== "__DEFAULT_MODEL__" && !isTrimLoading && !isTrimDisabled && (trims?.length ?? 0) > 0 && (!trim || trim === "__DEFAULT_TRIM__")) {
      timeoutId = setTimeout(() => {
        if (selectorRef.current?.offsetParent) setActiveDropdown("trim");
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [model, isTrimLoading, isTrimDisabled, trims?.length, trim, shouldShow, isActive]);

  // Auto-advance: open Drive after Trim is selected
  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (shouldShow && hasUserInteracted.current && trim && trim !== "__DEFAULT_TRIM__" && !isDriveLoading && !isDriveDisabled && (drives?.length ?? 0) > 0 && (!drive || drive === "__DEFAULT_DRIVE__")) {
      timeoutId = setTimeout(() => {
        if (selectorRef.current?.offsetParent) setActiveDropdown("drive");
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [trim, isDriveLoading, isDriveDisabled, drives?.length, drive, shouldShow, isActive]);

  const handleReset = () => {
    onYearChange("");
    onMakeChange("");
    onModelChange("");
  };

  const showTrim = (trims?.length ?? 0) > 0 && model && model !== "__DEFAULT_MODEL__";
  const showDrive = (drives?.length ?? 0) > 0 && trim && trim !== "__DEFAULT_TRIM__";

  // Build vehicle display string — strictly from active garage item
  const vehicleLabel = activeGarageItem
    ? `${activeGarageItem.year} ${activeGarageItem.make} ${activeGarageItem.model || ''} ${activeGarageItem.trim && activeGarageItem.trim !== '__DEFAULT_TRIM__' ? activeGarageItem.trim : ''} ${activeGarageItem.drive && activeGarageItem.drive !== '__DEFAULT_DRIVE__' ? activeGarageItem.drive : ''}`.trim()
    : "";

  return (
    <>
      <div ref={sentinelRef} className="h-px" />

      {/* Desktop View */}
      {!isMobile && <div
        ref={selectorRef}
        className={`bg-[#E8EDF2] max-w-[1350px] mx-auto border-b border-gray-200 transition-all duration-300 z-20 fixed top-0 left-0 right-0 shadow-md ${shouldShow
          ? "opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          {hasVehicleSelected ? (
            /* Selected Vehicle Display */
            <div className="flex items-center justify-center gap-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 fill-primary text-white" />
                <span className="font-bold text-gray-900 uppercase text-sm tracking-wide">
                  {vehicleLabel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className="px-4 py-2 border border-gray-300 bg-white rounded-sm text-xs font-bold text-gray-600 hover:bg-gray-50 uppercase tracking-wide transition-colors flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  CHANGE VEHICLE
                </button>
                <button
                  onClick={handleShopNow}
                  className="px-8 py-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-sm transition-colors uppercase cursor-pointer"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          ) : (
            /* YMM Selector Dropdowns */
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-[140px]">
                <YmmCustomSelect
                  value={year || undefined}
                  options={years || []}
                  disabled={isYearDisabled}
                  loading={isYearLoading}
                  onChange={handleYearChange}
                  placeholder="YEAR"
                  stepNumber="1"
                />
              </div>

              <div className="flex-1 min-w-[140px]">
                <YmmCustomSelect
                  value={make === "__DEFAULT_MAKE__" ? undefined : make}
                  options={makes || []}
                  disabled={isMakeDisabled}
                  loading={isMakeLoading}
                  onChange={handleMakeChange}
                  placeholder="MAKE"
                  stepNumber="2"
                />
              </div>

              <div className="flex-1 min-w-[140px]">
                <YmmCustomSelect
                  value={model === "__DEFAULT_MODEL__" ? undefined : model}
                  options={models || []}
                  disabled={isModelDisabled}
                  loading={isModelLoading}
                  onChange={handleModelChange}
                  placeholder="MODEL"
                  stepNumber="3"
                />
              </div>

              {showTrim && (
                <div className="flex-1 min-w-[140px]">
                  <YmmCustomSelect
                    value={trim === "__DEFAULT_TRIM__" ? undefined : trim}
                    options={trims || []}
                    disabled={isTrimDisabled}
                    loading={isTrimLoading}
                    onChange={handleTrimChange}
                    placeholder="TRIM"
                    stepNumber="4"
                  />
                </div>
              )}

              {showDrive && (
                <div className="flex-1 min-w-[140px]">
                  <YmmCustomSelect
                    value={drive === "__DEFAULT_DRIVE__" ? undefined : drive}
                    options={drives || []}
                    disabled={isDriveDisabled}
                    loading={isDriveLoading}
                    onChange={handleDriveChange}
                    placeholder="DRIVE"
                    stepNumber={showTrim ? "5" : "4"}
                  />
                </div>
              )}

              <button
                onClick={handleReset}
                title="Reset"
                className="p-2.5 text-gray-500 hover:text-red-600 bg-white border border-gray-300 rounded-sm hover:bg-red-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleCustomSubmit}
                disabled={isDisabledSubmit}
                className="px-8 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                GO
              </button>
            </div>
          )}
        </div>
      </div>}

      {/* Mobile View */}
      {isMobile && <div
        className={`bg-[#E8EDF2] transition-all duration-300 z-50 fixed top-0 left-0 right-0 shadow-lg border-b border-gray-200 ${shouldShow
          ? "opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        style={shouldShow ? { transform: `translateY(${scrollOffset}px)` } : {}}
      >
        <div className="flex">
          {hasVehicleSelected ? (
            /* Mobile - Selected Vehicle Display */
            <>
              <div className="flex-1 flex flex-col gap-2 px-4 py-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0 fill-primary text-white" />
                  <span className="font-bold text-gray-900 text-sm uppercase tracking-wide truncate">
                    {vehicleLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClear}
                    className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded-sm text-xs font-bold text-gray-600 hover:bg-gray-50 uppercase tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    CHANGE VEHICLE
                  </button>
                  <button
                    onClick={handleShopNow}
                    className="flex-1 px-3 py-2 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-sm transition-colors uppercase cursor-pointer"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Mobile - YMM Selector Toggle */
            <>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="flex-1 bg-[#E8EDF2] text-gray-900 px-4 py-3.5 flex items-center cursor-pointer justify-between text-sm font-bold uppercase tracking-wide"
              >
                <div className="flex items-center gap-2">
                  <CarFront className="w-4 h-4 text-primary" />
                  SELECT YOUR VEHICLE
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isMobileOpen ? "rotate-180" : ""}`} />
              </button>
            </>
          )}
        </div>

        {!hasVehicleSelected && (
          <div className={`overflow-hidden transition-all duration-300 ${isMobileOpen ? "max-h-[600px]" : "max-h-0"}`}>
            <div className="bg-[#E8EDF2] px-4 pb-4 space-y-2.5">
              {/* Year */}
              <div className="relative flex items-center">
                <YmmCustomSelect
                  value={year || undefined}
                  options={years || []}
                  disabled={isYearDisabled}
                  loading={isYearLoading}
                  onChange={handleYearChange}
                  placeholder="YEAR"
                  stepNumber="1"
                />
              </div>

              {/* Make */}
              <div className="relative flex items-center">
                <YmmCustomSelect
                  value={make === "__DEFAULT_MAKE__" ? undefined : make}
                  options={makes || []}
                  disabled={isMakeDisabled}
                  loading={isMakeLoading}
                  onChange={handleMakeChange}
                  placeholder="MAKE"
                  stepNumber="2"
                />
              </div>

              {/* Model */}
              <div className="relative flex items-center">
                <YmmCustomSelect
                  value={model === "__DEFAULT_MODEL__" ? undefined : model}
                  options={models || []}
                  disabled={isModelDisabled}
                  loading={isModelLoading}
                  onChange={handleModelChange}
                  placeholder="MODEL"
                  stepNumber="3"
                />
              </div>

              {/* Body Type */}
              {showTrim && (
                <div className="relative flex items-center">
                  <YmmCustomSelect
                    value={trim === "__DEFAULT_TRIM__" ? undefined : trim}
                    options={trims || []}
                    disabled={isTrimDisabled}
                    loading={isTrimLoading}
                    onChange={handleTrimChange}
                    placeholder="TRIM"
                    stepNumber="4"
                  />
                </div>
              )}

              {showDrive && (
                <div className="relative flex items-center">
                  <YmmCustomSelect
                    value={drive === "__DEFAULT_DRIVE__" ? undefined : drive}
                    options={drives || []}
                    disabled={isDriveDisabled}
                    loading={isDriveLoading}
                    onChange={handleDriveChange}
                    placeholder="DRIVE"
                    stepNumber={showTrim ? "5" : "4"}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleReset}
                  className="p-2.5 text-gray-500 hover:text-red-600 bg-white border border-gray-300 rounded-sm hover:bg-red-50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    handleCustomSubmit()
                    setIsMobileOpen(false)
                  }}
                  disabled={isDisabledSubmit}
                  className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                >
                  GO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>}
    </>
  );
};

export default StickyVehicleSelector;
