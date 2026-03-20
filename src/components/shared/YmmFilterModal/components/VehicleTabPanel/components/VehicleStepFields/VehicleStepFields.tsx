"use client";

import VehicleFitmentSelect from "../VehicleFitmentSelect/VehicleFitmentSelect";
import useYmmFilterModal from "../../../../context/useYmmFilterModal";

export default function VehicleStepFields() {
  const {
    yearValue,
    makeValue,
    modelValue,
    years,
    makes,
    models,
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isYearDisabled,
    isMakeDisabled,
    isModelDisabled,
    onYearChange,
    onMakeChange,
    onModelChange,
  } = useYmmFilterModal();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <VehicleFitmentSelect
        value={yearValue}
        placeholder={isYearLoading ? "Loading..." : "Year"}
        label="Year"
        required
        options={years}
        disabled={isYearDisabled}
        onChange={onYearChange}
      />
      <VehicleFitmentSelect
        value={makeValue}
        placeholder={isMakeLoading ? "Loading..." : "Make"}
        label="Make"
        required
        options={makes}
        disabled={isMakeDisabled}
        onChange={onMakeChange}
      />
      <VehicleFitmentSelect
        value={modelValue}
        placeholder={isModelLoading ? "Loading..." : "Model"}
        label="Model"
        required
        options={models}
        disabled={isModelDisabled}
        onChange={onModelChange}
      />
    </div>
  );
}

