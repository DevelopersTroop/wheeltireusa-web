"use client";

import useYmmFilterModal from "../../context/useYmmFilterModal";

export default function VehicleStepIndicator() {
  const {
    activeStep,
    setActiveStep,
    isVehicleStepCompleted,
    canOpenClassifierStep,
  } = useYmmFilterModal();

  return (
    <div className="flex items-center justify-center gap-6 sm:gap-10 mb-5">
      <button type="button" onClick={() => setActiveStep(1)} className="flex items-center gap-2">
        <span
          className={`w-7 h-7 text-sm rounded-full flex items-center justify-center text-white font-bold ${
            activeStep === 1 || isVehicleStepCompleted ? "bg-primary" : "bg-gray-400"
          }`}
        >
          1
        </span>
        <span
          className={`text-base sm:text-lg font-bold ${
            activeStep === 1 || isVehicleStepCompleted ? "text-black" : "text-gray-400"
          }`}
        >
          Vehicle
        </span>
      </button>
      <button
        type="button"
        onClick={() => canOpenClassifierStep && setActiveStep(2)}
        className="flex items-center gap-2"
      >
        <span
          className={`w-7 h-7 text-sm rounded-full flex items-center justify-center text-white font-bold ${
            activeStep === 2 ? "bg-primary" : "bg-gray-400"
          }`}
        >
          2
        </span>
        <span className={`text-base sm:text-lg font-bold ${activeStep === 2 ? "text-black" : "text-gray-400"}`}>
          Classifier
        </span>
      </button>
    </div>
  );
}
