"use client";
import useYmm from "@/hooks/useYmm";
import {
  CarFront,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTypedSelector, useAppDispatch } from "@/redux/store";
import {
  clearYearMakeModel,
  addToGarage,
  submitYmm,
} from "@/redux/features/yearMakeModelSlice";
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
    list: { years, makes, models, trims, drives },
    onYearChange,
    onMakeChange,
    onModelChange,
    onTrimChange,
    onDriveChange,
    year,
    make,
    model,
    trim,
    drive,
  } = useYmm("header_ymm");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const isHomeYmmInView = useTypedSelector(
    (state) => state.persisted.yearMakeModel.isHomeYmmInView
  );

  const garage = useTypedSelector(
    (state) => state.persisted.yearMakeModel.garage
  );
  const activeGarageId = useTypedSelector(
    (state) => state.persisted.yearMakeModel.activeGarageId
  );

  const activeGarageItem = activeGarageId
    ? garage?.[activeGarageId]
    : undefined;

  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const selectorRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Scroll detection (KEEP THIS)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  const shouldShow = isVisible && !isHomeYmmInView;

  const hasVehicleSelected = Boolean(
    activeGarageId && activeGarageItem
  );

  const handleCustomSubmit = () => {
    if (year && make && model) {
      const newItem: TYmmGarageItem = {
        year,
        make,
        model: model !== "__DEFAULT_MODEL__" ? model : "",
        trim: trim !== "__DEFAULT_TRIM__" ? trim : "",
        drive: drive !== "__DEFAULT_DRIVE__" ? drive : "",
      };

      dispatch(addToGarage(newItem));
      dispatch(submitYmm(newItem));

      const targetPath = pathname?.includes("/tire")
        ? "/collections/product-category/tire"
        : "/collections/product-category/wheels";

      router.push(`${targetPath}?vehicle=selectedVehicleInformation`);
    }
  };

  const handleClear = () => dispatch(clearYearMakeModel());

  const handleReset = () => {
    onYearChange("");
    onMakeChange("");
    onModelChange("");
  };

  const handleShopNow = () => {
    const targetPath = pathname?.includes("/tire")
      ? "/collections/product-category/tire"
      : "/collections/product-category/wheels";

    router.push(`${targetPath}?vehicle=selectedVehicleInformation`);
  };

  const showTrim =
    (trims?.length ?? 0) > 0 &&
    model &&
    model !== "__DEFAULT_MODEL__";

  const showDrive =
    (drives?.length ?? 0) > 0 &&
    trim &&
    trim !== "__DEFAULT_TRIM__";

  const vehicleLabel = activeGarageItem
    ? `${activeGarageItem.year} ${activeGarageItem.make} ${
        activeGarageItem.model || ""
      } ${activeGarageItem.trim || ""} ${
        activeGarageItem.drive || ""
      }`.trim()
    : "";

  return (
    <>
      {/* Sentinel (DO NOT REMOVE) */}
      <div ref={sentinelRef} className="h-px" />

      {/* STICKY BAR */}
      <div
        ref={selectorRef}
        className={`fixed top-0 left-0 right-0 z-50 bg-[#E8EDF2] border-b border-gray-200 shadow-md transition-all duration-300 ${
          shouldShow
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">

          {/* DESKTOP */}
          {!isMobile ? (
            hasVehicleSelected ? (
              <div className="flex items-center justify-center gap-5">
                <CheckCircle2 className="w-5 h-5 fill-primary text-white" />
                <span className="font-bold text-sm uppercase">
                  {vehicleLabel}
                </span>

                <button onClick={handleClear} className="px-4 py-2 bg-white border text-xs font-bold">
                  CHANGE
                </button>

                <button onClick={handleShopNow} className="px-6 py-2 bg-primary text-white font-bold text-sm">
                  SHOP NOW
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <YmmCustomSelect value={year || undefined} options={years || []} onChange={onYearChange} placeholder="YEAR" />
                <YmmCustomSelect value={make || undefined} options={makes || []} onChange={onMakeChange} placeholder="MAKE" />
                <YmmCustomSelect value={model || undefined} options={models || []} onChange={onModelChange} placeholder="MODEL" />

                {showTrim && (
                  <YmmCustomSelect value={trim || undefined} options={trims || []} onChange={onTrimChange} placeholder="TRIM" />
                )}

                {showDrive && (
                  <YmmCustomSelect value={drive || undefined} options={drives || []} onChange={onDriveChange} placeholder="DRIVE" />
                )}

                <button onClick={handleReset} className="p-2 bg-white border">
                  <RotateCcw size={16} />
                </button>

                <button onClick={handleCustomSubmit} className="px-6 py-2 bg-primary text-white font-bold">
                  GO
                </button>
              </div>
            )
          ) : (
            /* MOBILE */
            <>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="w-full flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <CarFront className="w-4 h-4 text-primary" />
                  SELECT VEHICLE
                </div>
                <ChevronDown className={`${isMobileOpen ? "rotate-180" : ""}`} />
              </button>

              {isMobileOpen && (
                <div className="mt-3 space-y-2">
                  <YmmCustomSelect value={year || undefined} options={years || []} onChange={onYearChange} placeholder="YEAR" />
                  <YmmCustomSelect value={make || undefined} options={makes || []} onChange={onMakeChange} placeholder="MAKE" />
                  <YmmCustomSelect value={model || undefined} options={models || []} onChange={onModelChange} placeholder="MODEL" />

                  <button onClick={handleCustomSubmit} className="w-full py-2 bg-primary text-white font-bold">
                    GO
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StickyVehicleSelector;