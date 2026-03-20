"use client";

import { Check } from "lucide-react";
import useYmmFilterModal from "../../context/useYmmFilterModal";

export default function VehicleStepIndicator() {
  const {
    activeStep,
    setActiveStep,
    isVehicleStepCompleted,
    canOpenClassifierStep,
  } = useYmmFilterModal();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8">
      <button 
        type="button" 
        onClick={() => setActiveStep(1)} 
        className="flex items-center gap-2"
      >
        <span
          className={`w-6 h-6 sm:w-7 sm:h-7 text-xs sm:text-sm rounded-full flex items-center justify-center text-white font-bold ${
            activeStep === 1 ? "bg-primary" : canOpenClassifierStep ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          {canOpenClassifierStep && activeStep > 1 ? <Check className="w-4 h-4" /> : 1}
        </span>
        <span
          className={`text-sm sm:text-base font-bold ${
            activeStep === 1 || canOpenClassifierStep ? "text-black" : "text-gray-400"
          }`}
        >
          Vehicle
        </span>
      </button>
      <button
        type="button"
        onClick={() => canOpenClassifierStep && setActiveStep(2)}
        className="flex items-center gap-2 disabled:cursor-not-allowed"
        disabled={!canOpenClassifierStep}
      >
        <span
          className={`w-6 h-6 sm:w-7 sm:h-7 text-xs sm:text-sm rounded-full flex items-center justify-center text-white font-bold ${
            activeStep === 2 ? "bg-primary" : "bg-gray-300"
          }`}
        >
          2
        </span>
        <span className={`text-sm sm:text-base font-bold ${activeStep === 2 ? "text-black" : "text-gray-400"}`}>
          Classifier
        </span>
      </button>
    </div>
  );
}
