"use client";

import useYmmFilterModal from "../../context/useYmmFilterModal";
import ClassifierStepFields from "./components/ClassifierStepFields/ClassifierStepFields";
import FitmentGuidanceCard from "./components/FitmentGuidanceCard/FitmentGuidanceCard";
import VehicleSelectionHeader from "./components/VehicleSelectionHeader/VehicleSelectionHeader";
import VehicleStepFields from "./components/VehicleStepFields/VehicleStepFields";
import VehicleStepIndicator from "./components/VehicleStepIndicator/VehicleStepIndicator";

export default function VehicleTabPanel() {
  const { activeStep } = useYmmFilterModal();

  return (
    <>
      <VehicleSelectionHeader />
      <div className="pt-2 overflow-y-auto custom-scrollbar max-h-[400px]">
        <div className="mt-2 mb-4 h-px bg-gray-200" />
        <VehicleStepIndicator />
        <div className="text-center text-xl sm:text-2xl font-bold mb-4">
          Enter your vehicle information.
        </div>
        {activeStep === 1 ? <VehicleStepFields /> : <ClassifierStepFields />}
        <FitmentGuidanceCard />
      </div>
    </>
  );
}
