"use client";

import { useMemo } from "react";
import useYmmFilterModal from "../../context/useYmmFilterModal";
import useAutoOpenYmmDropdowns from "@/hooks/useAutoOpenYmmDropdowns";
import FitmentGuidanceCard from "./components/FitmentGuidanceCard/FitmentGuidanceCard";
import VehicleFitmentSelect from "./components/VehicleFitmentSelect/VehicleFitmentSelect";
import SearchHistory from "./components/SearchHistory/SearchHistory";

export default function VehicleTabPanel() {
  const {
    yearValue,
    makeValue,
    modelValue,
    trimValue,
    driveValue,
    years,
    makes,
    models,
    trims,
    drives,
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
    onYearChange,
    onMakeChange,
    onModelChange,
    onTrimChange,
    onDriveChange,
  } = useYmmFilterModal();

  // Use shared auto-open dropdown hook
  const { dropdownState, trackedHandlers, setOpenMake, setOpenModel, setOpenTrim, setOpenDrive } =
    useAutoOpenYmmDropdowns({
      makes: makes || [],
      models: models || [],
      trims: trims || [],
      drives: drives || [],
      isMakeLoading,
      isModelLoading,
      isTrimLoading,
      isDriveLoading,
      year: yearValue,
      make: makeValue,
      model: modelValue,
      trim: trimValue,
      drive: driveValue,
      onYearChange,
      onMakeChange,
      onModelChange,
      onTrimChange,
      onDriveChange,
    });

  // Show trim/drive if there's data OR if there's an auto-filled value from garage
  const showTrim = (trims?.length ?? 0) > 0 || (trimValue !== undefined && trimValue !== "");
  const showDrive = (drives?.length ?? 0) > 0 || (driveValue !== undefined && driveValue !== "");

  // Calculate grid columns based on visible fields
  const gridCols = useMemo(() => {
    let cols = 3; // Year, Make, Model always shown
    if (showTrim) cols++;
    if (showDrive) cols++;
    return cols;
  }, [showTrim, showDrive]);

  // Build selection display text
  const selectionDisplay = [yearValue, makeValue, modelValue, trimValue, driveValue].filter(Boolean).join(" / ");

  return (
    <div className="pt-2">
      <div className="text-center text-xl sm:text-2xl font-bold mb-4">Enter your vehicle information.</div>

      {/* Use inline style for dynamic grid columns since Tailwind JIT doesn't support dynamic classes */}
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}>
        <VehicleFitmentSelect
          value={yearValue}
          placeholder={isYearLoading ? "Loading..." : "Year"}
          label="Year"
          required
          options={yearValue && !years.includes(yearValue) ? [...years, yearValue] : years}
          disabled={isYearDisabled}
          onChange={trackedHandlers.onYearChange}
          useDynamicHeight
        />
        <VehicleFitmentSelect
          value={makeValue}
          placeholder={isMakeLoading ? "Loading..." : "Make"}
          label="Make"
          required
          options={makeValue && !makes.includes(makeValue) ? [...makes, makeValue] : makes}
          disabled={isMakeDisabled}
          onChange={trackedHandlers.onMakeChange}
          useDynamicHeight
          open={dropdownState.openMake}
          onOpenChange={setOpenMake}
        />
        <VehicleFitmentSelect
          value={modelValue}
          placeholder={isModelLoading ? "Loading..." : "Model"}
          label="Model"
          required
          options={modelValue && !models.includes(modelValue) ? [...models, modelValue] : models}
          disabled={isModelDisabled}
          onChange={trackedHandlers.onModelChange}
          useDynamicHeight
          open={dropdownState.openModel}
          onOpenChange={setOpenModel}
        />
        {showTrim && (
          <VehicleFitmentSelect
            value={trimValue}
            placeholder={isTrimLoading ? "Loading..." : "Trim"}
            label="Trim"
            required
            options={trimValue && !trims.includes(trimValue) ? [...trims, trimValue] : trims}
            disabled={isTrimDisabled}
            onChange={trackedHandlers.onTrimChange}
            useDynamicHeight
            open={dropdownState.openTrim}
            onOpenChange={setOpenTrim}
          />
        )}
        {showDrive && (
          <VehicleFitmentSelect
            value={driveValue}
            placeholder={isDriveLoading ? "Loading..." : "Drive"}
            label="Drive"
            required
            options={driveValue && !drives.includes(driveValue) ? [...drives, driveValue] : drives}
            disabled={isDriveDisabled}
            onChange={trackedHandlers.onDriveChange}
            useDynamicHeight
            open={dropdownState.openDrive}
            onOpenChange={setOpenDrive}
          />
        )}
      </div>

      {selectionDisplay && (
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-500 mb-1">Selected Vehicle:</div>
          <div className="font-semibold text-lg">{selectionDisplay}</div>
        </div>
      )}

      <SearchHistory />
      <FitmentGuidanceCard />
    </div>
  );
}
