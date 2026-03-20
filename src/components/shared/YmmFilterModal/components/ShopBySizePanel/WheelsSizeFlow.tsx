"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetFilterListQuery } from "@/redux/apis/product";
import useYmmFilterModal from "../../context/useYmmFilterModal";
import SizeStepIndicator from "./components/SizeStepIndicator/SizeStepIndicator";
import SizeListSkeleton from "./components/SizeListSkeleton/SizeListSkeleton";
import SizeOptionButton from "./components/SizeOptionButton/SizeOptionButton";

export default function WheelsSizeFlow() {
  const router = useRouter();
  const { closeModal } = useYmmFilterModal();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDiameter, setSelectedDiameter] = useState<string | null>(null);
  const [selectedWidth, setSelectedWidth] = useState<string | null>(null);

  const { data: filterData, isFetching } = useGetFilterListQuery({
    category: "wheels",
    ...(step >= 2 && selectedDiameter ? { wheelDiameter: selectedDiameter } : {}),
    ...(step >= 3 && selectedWidth && selectedWidth !== "any" ? { wheelWidth: selectedWidth } : {}),
  });

  const diameters = Array.isArray(filterData?.filters?.wheelDiameter) ? filterData.filters.wheelDiameter : [];
  const widths = Array.isArray(filterData?.filters?.wheelWidth) ? filterData.filters.wheelWidth : [];
  const boltPatterns = Array.isArray(filterData?.filters?.boltPatterns) ? filterData.filters.boltPatterns : [];

  const handleDiameterSelect = (val: string) => {
    setSelectedDiameter(val);
    setSelectedWidth(null);
    setStep(2);
  };

  const handleWidthSelect = (val: string) => {
    setSelectedWidth(val);
    setStep(3);
  };

  const handleBoltPatternSelect = (val: string) => {
    closeModal();
    let url = `/collections/product-category/wheels?wheelDiameter=${encodeURIComponent(selectedDiameter!)}`;
    if (selectedWidth && selectedWidth !== "any") {
      url += `&wheelWidth=${encodeURIComponent(selectedWidth)}`;
    }
    url += `&boltPatterns=${encodeURIComponent(val)}`;
    router.push(url);
  };

  const steps = [
    {
      id: 1,
      label: "Diameter",
      isCompleted: !!selectedDiameter,
      isActive: step === 1,
      isDisabled: false,
      onClick: () => setStep(1),
    },
    {
      id: 2,
      label: "Wheel Width",
      isCompleted: !!selectedWidth,
      isActive: step === 2,
      isDisabled: !selectedDiameter,
      onClick: () => selectedDiameter && setStep(2),
    },
    {
      id: 3,
      label: "Bolt Pattern",
      isCompleted: false, // final step before redirect
      isActive: step === 3,
      isDisabled: !selectedWidth,
      onClick: () => {},
    },
  ];

  const renderStepIndicator = () => (
    <div className="relative">
      <SizeStepIndicator steps={steps} />
      <button className="absolute right-0 top-1 sm:top-2 text-primary text-sm hover:underline flex items-center gap-1">
        <span className="w-4 h-4 rounded-full border border-primary text-[10px] flex items-center justify-center font-bold">i</span>
        need help?
      </button>
    </div>
  );

  return (
    <div>
      {renderStepIndicator()}

      {isFetching ? (
        <SizeListSkeleton />
      ) : (
        <div className="pb-6">
          {step === 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {diameters.map((d: any) => (
                <SizeOptionButton
                  key={d.value}
                  onClick={() => handleDiameterSelect(d.value)}
                >
                  {d.value}"
                </SizeOptionButton>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center">
              <div className="text-2xl font-black mb-6">{selectedDiameter}</div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 w-full">
                <SizeOptionButton onClick={() => handleWidthSelect("any")}>
                  any
                </SizeOptionButton>
                {widths.map((w: any) => (
                  <SizeOptionButton
                    key={w.value}
                    onClick={() => handleWidthSelect(w.value)}
                  >
                    {w.value}
                  </SizeOptionButton>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center">
              <div className="text-2xl font-black mb-6 flex items-center gap-2">
                <span>{selectedDiameter}</span>
                <span className="text-gray-400">X</span>
                <span>{selectedWidth === "any" ? "any" : selectedWidth}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
                {boltPatterns.map((b: any) => (
                  <SizeOptionButton
                    key={b.value}
                    onClick={() => handleBoltPatternSelect(b.value)}
                  >
                    {b.value}
                  </SizeOptionButton>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
