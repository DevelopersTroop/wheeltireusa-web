"use client";

import useYmmFilterModal from "../../context/useYmmFilterModal";
import ClassifierStepFields from "../ClassifierStepFields/ClassifierStepFields";
import FitmentGuidanceCard from "../FitmentGuidanceCard/FitmentGuidanceCard";
import VehicleSelectionHeader from "../VehicleSelectionHeader/VehicleSelectionHeader";
import VehicleStepFields from "../VehicleStepFields/VehicleStepFields";
import VehicleStepIndicator from "../VehicleStepIndicator/VehicleStepIndicator";

export default function VehicleTabPanel() {
  const { activeStep } = useYmmFilterModal();

  return (
    <>
      <VehicleSelectionHeader />
      <div className="pt-2">
        <div className="my-6 h-px bg-gray-200" />
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
