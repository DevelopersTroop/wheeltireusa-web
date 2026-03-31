"use client";

import { useEffect, useRef, useState } from "react";
import useYmm from "@/hooks/useYmm";
import { cn } from "@/lib/utils";
import YmmCustomSelect from "@/components/shared/YmmCustomSelect/YmmCustomSelect";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { setHomeYmmInView, addToGarage, submitYmm } from "@/redux/features/yearMakeModelSlice";
import { TYmmGarageItem } from "@/types/ymm";
import { useRouter } from "next/navigation";
import useAutoOpenYmmDropdowns from "@/hooks/useAutoOpenYmmDropdowns";

type Category = "tire" | "wheels";

export default function VehicleTab() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<Category>("wheels");

  const {
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isTrimLoading,
    isDriveLoading,
    isYearFetching,
    isMakeFetching,
    isModelFetching,
    isTrimFetching,
    isDriveFetching,
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
  } = useYmm("home_hero_ymm");

  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Get garage state
  const garage = useTypedSelector((state) => state.persisted.yearMakeModel.garage);
  const activeGarageId = useTypedSelector((state) => state.persisted.yearMakeModel.activeGarageId);

  const activeGarageItem = activeGarageId ? garage?.[activeGarageId] : undefined;

  // Use shared auto-open dropdown hook
  const { dropdownState, trackedHandlers, setOpenMake, setOpenModel, setOpenTrim, setOpenDrive, hasUserManuallyChanged } =
    useAutoOpenYmmDropdowns({
      makes: makes || [],
      models: models || [],
      trims: trims || [],
      drives: drives || [],
      isMakeLoading,
      isModelLoading,
      isTrimLoading,
      isDriveLoading,
      year,
      make,
      model,
      trim,
      drive,
      onYearChange,
      onMakeChange,
      onModelChange,
      onTrimChange,
      onDriveChange,
    });

  // Sync with active garage vehicle on mount
  useEffect(() => {
    if (activeGarageItem && isFirstRender.current) {
      if (activeGarageItem.year && !year) {
        onYearChange(activeGarageItem.year);
      }
      if (activeGarageItem.make && !make) {
        onMakeChange(activeGarageItem.make);
      }
      if (activeGarageItem.model && !model) {
        onModelChange(activeGarageItem.model);
      }
      if (activeGarageItem.trim && !trim) {
        onTrimChange(activeGarageItem.trim);
      }
      if (activeGarageItem.drive && !drive) {
        onDriveChange(activeGarageItem.drive);
      }
    }
  }, [activeGarageItem]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  // Track whether the hero YMM is actually visible in the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        dispatch(setHomeYmmInView(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      dispatch(setHomeYmmInView(false));
    };
  }, [dispatch]);

  // Auto-submit and redirect when Drive is selected (only if valid YMM exists and user manually changed a value)
  useEffect(() => {
    if (year && make && model && drive && drive !== "__DEFAULT_DRIVE__" && hasUserManuallyChanged) {
      // Redirect based on selected category
      const targetPath = category === "tire" ? "/collections/product-category/tires" : "/collections/product-category/wheels";

      // Create garage item
      const newItem: TYmmGarageItem = {
        year,
        make,
        model: model !== "__DEFAULT_MODEL__" ? model : "",
        trim: trim !== "__DEFAULT_TRIM__" ? trim : "",
        drive: drive !== "__DEFAULT_DRIVE__" ? drive : "",
      };

      dispatch(addToGarage(newItem));
      dispatch(submitYmm(newItem));
      router.push(targetPath);
    }
  }, [year, make, model, trim, drive, dispatch, router, category, hasUserManuallyChanged]);

  const handleSubmit = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>, options?: { targetPath?: string }) => {
    const cleanModel = model && model !== "__DEFAULT_MODEL__" ? model : "";
    const cleanTrim = trim && trim !== "__DEFAULT_TRIM__" ? trim : "";
    const cleanDrive = drive && drive !== "__DEFAULT_DRIVE__" ? drive : "";

    if (year && make && cleanModel) {
      const newItem: TYmmGarageItem = {
        year,
        make,
        model: cleanModel,
        trim: cleanTrim,
        drive: cleanDrive,
      };
      dispatch(addToGarage(newItem));
      dispatch(submitYmm(newItem));

      const targetPath = category === "tire" ? "/collections/product-category/tires" : "/collections/product-category/wheels";

      router.push(targetPath);
    } else {
      onSubmit(e, options);
    }
  };

  const showTrim = (trims?.length ?? 0) > 0;
  const showDrive = (drives?.length ?? 0) > 0;

  return (
    <div className="flex flex-col" ref={containerRef}>
      {/* Category Toggle - Top Left, Small */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setCategory("tire")}
          className={cn("px-3 py-1 rounded text-[10px] font-semibold uppercase transition-colors", category === "tire" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}
        >
          Tires
        </button>
        <button
          type="button"
          onClick={() => setCategory("wheels")}
          className={cn("px-3 py-1 rounded text-[10px] font-semibold uppercase transition-colors", category === "wheels" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}
        >
          Wheels
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          <div className="col-span-1">
            <YmmCustomSelect
              label="YEAR"
              required={true}
              value={year || undefined}
              options={years || []}
              disabled={isYearDisabled}
              loading={isYearLoading || isYearFetching}
              onChange={trackedHandlers.onYearChange}
              placeholder="YEAR"
            />
          </div>

          <div className="col-span-1">
            <YmmCustomSelect
              label="MAKE"
              required={true}
              value={make === "__DEFAULT_MAKE__" ? undefined : make}
              options={(makes || []).filter((m) => m !== "__DEFAULT_MAKE__")}
              disabled={isMakeDisabled}
              loading={isMakeLoading || isMakeFetching}
              onChange={trackedHandlers.onMakeChange}
              placeholder="MAKE"
              open={dropdownState.openMake}
              onOpenChange={setOpenMake}
            />
          </div>

          <div className="col-span-1">
            <YmmCustomSelect
              label="MODEL"
              required={true}
              value={model === "__DEFAULT_MODEL__" ? undefined : model}
              options={models || []}
              disabled={isModelDisabled}
              loading={isModelLoading || isModelFetching}
              onChange={trackedHandlers.onModelChange}
              placeholder="MODEL"
              open={dropdownState.openModel}
              onOpenChange={setOpenModel}
            />
          </div>

          {showTrim && (
            <div className="col-span-1">
              <YmmCustomSelect
                label="TRIM"
                required={true}
                value={trim === "__DEFAULT_TRIM__" ? undefined : trim}
                options={trims || []}
                disabled={isTrimDisabled}
                loading={isTrimLoading || isTrimFetching}
                onChange={trackedHandlers.onTrimChange}
                placeholder="TRIM"
                open={dropdownState.openTrim}
                onOpenChange={setOpenTrim}
              />
            </div>
          )}

          {showDrive && (
            <div className="col-span-1">
              <YmmCustomSelect
                label="DRIVE"
                required={true}
                value={drive === "__DEFAULT_DRIVE__" ? undefined : drive}
                options={drives || []}
                disabled={isDriveDisabled}
                loading={isDriveLoading || isDriveFetching}
                onChange={trackedHandlers.onDriveChange}
                placeholder="DRIVE"
                open={dropdownState.openDrive}
                onOpenChange={setOpenDrive}
              />
            </div>
          )}
        </div>

        <div className="w-full sm:w-auto sm:self-end">
          <button
            onClick={(e) => onSubmit(e)}
            disabled={isDisabledSubmit || !shouldShowSubmit}
            className={cn("w-full sm:w-32 h-12 sm:h-14 text-white font-bold text-base sm:text-lg uppercase rounded shadow flex items-center justify-center transition-opacity", isDisabledSubmit || !shouldShowSubmit ? "bg-primary/50 cursor-not-allowed opacity-80" : "bg-primary hover:bg-primary/90")}
          >
            GO
          </button>
        </div>
      </div>
    </div>
  );
}
