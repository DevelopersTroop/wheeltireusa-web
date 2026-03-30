"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useTypedSelector, useAppDispatch } from "@/redux/store";
import { addToGarage, submitYmm } from "@/redux/features/yearMakeModelSlice";
import { TYmmGarageItem } from "@/types/ymm";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import useYmm from "@/hooks/useYmm";

// Hooks
import {
  useMobileDetection,
  useScrollVisibility,
  useAutoOpenDropdowns,
  useGarageSync,
  useTrackedHandlers,
  type YmmValues,
  type YmmData,
  type YmmLoading,
  type YmmHandlers,
} from "./hooks";

// Components
import CategoryToggle from "./CategoryToggle";
import VehicleDropdowns from "./VehicleDropdowns";
import GoButton from "./GoButton";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";

import type { YmmDisabled } from "./hooks";
import type { Category } from "./CategoryToggle";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function StickyVehicleBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // ==================== STATE ====================

  const [category, setCategory] = useState<"tire" | "wheels">("wheels");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ==================== REFS ====================

  const sentinelRef = useRef<HTMLDivElement>(null);

  // ==================== CUSTOM HOOKS ====================

  const isMobile = useMobileDetection();
  const isScrollVisible = useScrollVisibility(sentinelRef);

  // ==================== YMM HOOK ====================

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
    isDisabledSubmit,
    year,
    make,
    model,
    trim,
    drive,
  } = useYmm("sticky_vehicle_bar");

  // ==================== REDUX ====================

  const isHomeYmmInView = useTypedSelector((state) => state.persisted.yearMakeModel.isHomeYmmInView);
  const garage = useTypedSelector((state) => state.persisted.yearMakeModel.garage);
  const activeGarageId = useTypedSelector((state) => state.persisted.yearMakeModel.activeGarageId);

  // ==================== DERIVED VALUES ====================

  const activeGarageItem = useMemo(
    () => (activeGarageId ? garage?.[activeGarageId] : undefined),
    [activeGarageId, garage]
  );

  const loading: YmmLoading = useMemo(
    () => ({
      isYearLoading,
      isMakeLoading,
      isModelLoading,
      isTrimLoading,
      isDriveLoading,
    }),
    [isYearLoading, isMakeLoading, isModelLoading, isTrimLoading, isDriveLoading]
  );

  const disabled: YmmDisabled = useMemo(
    () => ({
      isYearDisabled,
      isMakeDisabled,
      isModelDisabled,
      isTrimDisabled,
      isDriveDisabled,
    }),
    [isYearDisabled, isMakeDisabled, isModelDisabled, isTrimDisabled, isDriveDisabled]
  );

  const data: YmmData = useMemo(
    () => ({
      years: years || [],
      makes: makes || [],
      models: models || [],
      trims: trims || [],
      drives: drives || [],
    }),
    [years, makes, models, trims, drives]
  );

  const values: YmmValues = useMemo(
    () => ({ year, make, model, trim, drive }),
    [year, make, model, trim, drive]
  );

  const handlers: YmmHandlers = useMemo(
    () => ({
      onYearChange,
      onMakeChange,
      onModelChange,
      onTrimChange,
      onDriveChange,
    }),
    [onYearChange, onMakeChange, onModelChange, onTrimChange, onDriveChange]
  );

  // ==================== AUTO-OPEN DROPDOWNS ====================

  const { dropdownState, setOpenMake, setOpenModel, setOpenTrim, setOpenDrive, markManualChange } =
    useAutoOpenDropdowns(loading, data, values);

  const trackedHandlers = useTrackedHandlers(handlers, markManualChange);

  // ==================== GARAGE SYNC ====================

  useGarageSync(activeGarageItem, values, trackedHandlers);

  // ==================== HANDLERS ====================

  const handleSubmit = useCallback(() => {
    if (!year || !make || !model) return;

    const newItem: TYmmGarageItem = {
      year,
      make,
      model: model !== "__DEFAULT_MODEL__" ? model : "",
      trim: trim !== "__DEFAULT_TRIM__" ? trim : "",
      drive: drive !== "__DEFAULT_DRIVE__" ? drive : "",
    };

    dispatch(addToGarage(newItem));
    dispatch(submitYmm(newItem));

    const targetPath =
      category === "tire"
        ? "/collections/product-category/tires"
        : "/collections/product-category/wheels";

    router.push(`${targetPath}?vehicle=selectedVehicleInformation`);
  }, [year, make, model, trim, drive, category, dispatch, router]);

  // ==================== COMPUTED VALUES ====================

  const shouldShow = isScrollVisible && !isHomeYmmInView;
  const isSubmitDisabled = isDisabledSubmit || !shouldShowSubmit;

  // ==================== SUB-COMPONENT PROPS ====================

  const dropdownsProps = {
    values,
    data,
    loading,
    disabled,
    handlers: trackedHandlers,
    dropdownState,
    onOpenChange: {
      make: setOpenMake,
      model: setOpenModel,
      trim: setOpenTrim,
      drive: setOpenDrive,
    },
  };

  // ==================== RENDER ====================

  return (
    <>
      {/* Sentinel */}
      <div ref={sentinelRef} className="h-px" />

      {/* STICKY BAR */}
      <div
        className={cn(
          "group fixed py-2 top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-md transition-all duration-300",
          shouldShow
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 group-hover:pt-1">
          {isMobile ? (
            <MobileView
              category={category}
              onCategoryChange={setCategory}
              isOpen={isMobileOpen}
              onToggle={() => setIsMobileOpen((prev) => !prev)}
              dropdownsProps={dropdownsProps}
              onSubmit={handleSubmit}
              isSubmitDisabled={isSubmitDisabled}
            />
          ) : (
            <DesktopView
              category={category}
              onCategoryChange={setCategory}
              dropdownsProps={dropdownsProps}
              onSubmit={handleSubmit}
              isSubmitDisabled={isSubmitDisabled}
            />
          )}
        </div>
      </div>
    </>
  );
}

export type { Category };
