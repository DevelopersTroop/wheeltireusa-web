"use client";

import VehicleFitmentSelect from "../VehicleFitmentSelect/VehicleFitmentSelect";
import useYmmFilterModal from "../../../../context/useYmmFilterModal";

export default function ClassifierStepFields() {
  const {
    trimValue,
    driveValue,
    trims,
    drives,
    isTrimLoading,
    isDriveLoading,
    isTrimDisabled,
    isDriveDisabled,
    onTrimChange,
    onDriveChange,
  } = useYmmFilterModal();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
      <VehicleFitmentSelect
        value={trimValue}
        placeholder={isTrimLoading ? "Loading..." : "Trim"}
        label="Trim"
        required
        options={trims}
        disabled={isTrimDisabled}
        onChange={onTrimChange}
      />
      <VehicleFitmentSelect
        value={driveValue}
        placeholder={isDriveLoading ? "Loading..." : "Drive"}
        label="Drive"
        required
        options={drives}
        disabled={isDriveDisabled}
        onChange={onDriveChange}
      />
    </div>
  );
}

