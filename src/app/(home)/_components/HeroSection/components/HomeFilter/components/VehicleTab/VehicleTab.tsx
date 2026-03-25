"use client";

import { useEffect, useRef, useState } from "react";
import useYmm from "@/hooks/useYmm";
import { cn } from "@/lib/utils";
import YmmCustomSelect from "@/components/shared/YmmCustomSelect/YmmCustomSelect";
import { useAppDispatch } from "@/redux/store";
import { setHomeYmmInView, addToGarage, submitYmm } from "@/redux/features/yearMakeModelSlice";
import { TYmmGarageItem } from "@/types/ymm";

export default function VehicleTab() {
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
  } = useYmm("home_hero_ymm");

  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const hasUserInteracted = useRef(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  // Track whether the hero YMM is actually visible in the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
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

  // Auto-submit when fully populated
  useEffect(() => {
    const isReady = !isDisabledSubmit && shouldShowSubmit;
    if (isReady && hasUserInteracted.current) {
      handleSubmit(undefined);
      hasUserInteracted.current = false; // Reset to prevent multiple submissions
    }
  }, [isDisabledSubmit, shouldShowSubmit, onSubmit]);

  const handleSubmit = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    options?: { targetPath?: string }
  ) => {
    const cleanModel = model && model !== "__DEFAULT_MODEL__" ? model : "";
    const cleanTrim = trim && trim !== "__DEFAULT_TRIM__" ? trim : "";
    const cleanDrive = drive && drive !== "__DEFAULT_DRIVE__" ? drive : "";

    if (year && make && cleanModel && cleanTrim && cleanDrive) {
      const newItem: TYmmGarageItem = {
        year,
        make,
        model: cleanModel,
        trim: cleanTrim,
        drive: cleanDrive,
      };
      dispatch(addToGarage(newItem));
      dispatch(submitYmm(newItem));
    }

    onSubmit(e, options);
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

  const showTrim = (trims?.length ?? 0) > 0;
  const showDrive = (drives?.length ?? 0) > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-3" ref={containerRef}>
      <div className="flex-1 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <YmmCustomSelect
            label="YEAR"
            required={true}
            value={year || undefined}
            options={years || []}
            disabled={isYearDisabled}
            loading={isYearLoading}
            onChange={handleYearChange}
            placeholder="YEAR"
          />
        </div>

        <div className="flex-1">
          <YmmCustomSelect
            label="MAKE"
            required={true}
            value={make === "__DEFAULT_MAKE__" ? undefined : make}
            options={makes || []}
            disabled={isMakeDisabled}
            loading={isMakeLoading}
            onChange={handleMakeChange}
            placeholder="MAKE"
          />
        </div>

        <div className="flex-1">
          <YmmCustomSelect
            label="MODEL"
            required={true}
            value={model === "__DEFAULT_MODEL__" ? undefined : model}
            options={models || []}
            disabled={isModelDisabled}
            loading={isModelLoading}
            onChange={handleModelChange}
            placeholder="MODEL"
          />
        </div>

        {showTrim && (
          <div className="flex-1">
            <YmmCustomSelect
              label="TRIM"
              required={true}
              value={trim === "__DEFAULT_TRIM__" ? undefined : trim}
              options={trims || []}
              disabled={isTrimDisabled}
              loading={isTrimLoading}
              onChange={handleTrimChange}
              placeholder="TRIM"
            />
          </div>
        )}

        {showDrive && (
          <div className="flex-1">
            <YmmCustomSelect
              label="DRIVE"
              required={true}
              value={drive === "__DEFAULT_DRIVE__" ? undefined : drive}
              options={drives || []}
              disabled={isDriveDisabled}
              loading={isDriveLoading}
              onChange={handleDriveChange}
              placeholder="DRIVE"
            />
          </div>
        )}
      </div>

      <div className="lg:w-32 shrink-0">
        <button
          onClick={(e) => onSubmit(e)}
          disabled={isDisabledSubmit || !shouldShowSubmit}
          className={cn(
            "w-full h-14 text-white font-bold text-lg uppercase rounded shadow flex items-center justify-center transition-opacity",
            isDisabledSubmit || !shouldShowSubmit
              ? "bg-primary/50 cursor-not-allowed opacity-80"
              : "bg-primary hover:bg-primary/90"
          )}
        >
          GO
        </button>
      </div>
    </div>
  );
}
