"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetFilterListQuery } from "@/redux/apis/product";
import useYmmFilterModal from "../../../../context/useYmmFilterModal";
import SizeStepIndicator from "../SizeStepIndicator/SizeStepIndicator";
import SizeListSkeleton from "../SizeListSkeleton/SizeListSkeleton";
import SizeOptionButton from "../SizeOptionButton/SizeOptionButton";

export default function TireSizeFlow() {
  const router = useRouter();
  const { closeModal, openNeedHelpModal } = useYmmFilterModal();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedWidth, setSelectedWidth] = useState<string | null>(null);
  const [selectedRatio, setSelectedRatio] = useState<string | null>(null);
  const [selectedDiameter, setSelectedDiameter] = useState<string | null>(null);

  const { data: filterData, isLoading, isFetching } = useGetFilterListQuery({
    category: "tire",
    ...(step >= 2 && selectedWidth ? { tireWidth: selectedWidth } : {}),
    ...(step >= 3 && selectedRatio && selectedWidth ? { tireRatio: selectedRatio, tireWidth: selectedWidth } : {}),
  });

  // Clear data when fetching to avoid showing stale options
  const widths = (!isLoading && !isFetching && Array.isArray(filterData?.filters?.tireWidth)) ? filterData.filters.tireWidth : [];
  const ratios = (step >= 2 && !isLoading && !isFetching && Array.isArray(filterData?.filters?.tireRatio)) ? filterData.filters.tireRatio : [];
  const diameters = (step >= 3 && !isLoading && !isFetching && Array.isArray(filterData?.filters?.tireDiameter)) ? filterData.filters.tireDiameter : [];

  const handleWidthSelect = (val: string) => {
    setSelectedWidth(val);
    setSelectedRatio(null);
    setSelectedDiameter(null);
    setStep(2);
  };

  const handleRatioSelect = (val: string) => {
    setSelectedRatio(val);
    setSelectedDiameter(null);
    setStep(3);
  };

  const handleDiameterSelect = (val: string) => {
    setSelectedDiameter(val);
    setStep(4);
  };

  const handleEdit = () => {
    setSelectedWidth(null);
    setSelectedRatio(null);
    setSelectedDiameter(null);
    setStep(1);
  };

  const handleViewTires = () => {
    closeModal();
    const url = `/collections/product-category/tires?tireDiameter=${encodeURIComponent(selectedDiameter!)}&tireRatio=${encodeURIComponent(selectedRatio!)}&tireWidth=${encodeURIComponent(selectedWidth!)}`;
    router.push(url);
  };

  const steps = [
    {
      id: 1,
      label: "Width",
      isCompleted: !!selectedWidth,
      isActive: step === 1,
      isDisabled: false,
      onClick: () => setStep(1),
    },
    {
      id: 2,
      label: "Ratio",
      isCompleted: !!selectedRatio,
      isActive: step === 2,
      isDisabled: !selectedWidth,
      onClick: () => selectedWidth && setStep(2),
    },
    {
      id: 3,
      label: "Diameter",
      isCompleted: !!selectedDiameter,
      isActive: step === 3 || step === 4,
      isDisabled: !selectedRatio,
      onClick: () => selectedRatio && setStep(3),
    },
  ];

  const renderStepIndicator = () => (
    <div className="w-full mb-8">
      <div className="flex items-start w-full gap-4">
        <div className="flex-1">
          <SizeStepIndicator steps={steps} />
        </div>
        <button
          onClick={openNeedHelpModal}
          className="text-primary text-xs font-semibold hover:underline flex items-center gap-1.5 shrink-0 mt-1"
        >
          <span className="w-5 h-5 rounded-full border border-primary text-[10px] flex items-center justify-center font-bold">i</span>
          need help?
        </button>
      </div>
    </div>
  );

  if (step === 4) {
    return (
      <div>
        {renderStepIndicator()}
        <div className="flex flex-col items-center mt-4">
          <div className="relative w-full flex justify-center items-center mb-6">
            <div className="text-4xl font-black flex items-center gap-2">
              <span>{selectedWidth}</span>
              <span className="text-gray-400">/</span>
              <span>{selectedRatio}</span>
              <span className="text-gray-400">-</span>
              <span>{selectedDiameter}</span>
            </div>
            <button 
              onClick={handleEdit}
              className="absolute right-0 sm:right-10 text-primary font-semibold text-sm hover:underline"
            >
              edit
            </button>
          </div>

          <button
            onClick={handleViewTires}
            className="mt-6 bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold text-lg py-3 px-12 rounded-md transition-colors uppercase w-full sm:w-auto"
          >
            VIEW TIRES
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderStepIndicator()}

      {isFetching ? (
        <SizeListSkeleton />
      ) : (
        <div className="pb-6 overflow-y-auto custom-scrollbar max-h-[300px]">
          {step === 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {widths.map((w: any) => (
                <SizeOptionButton
                  key={w.value}
                  onClick={() => handleWidthSelect(w.value)}
                >
                  {w.value}
                </SizeOptionButton>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center">
              <div className="text-3xl font-black mb-6">{selectedWidth}</div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 w-full">
                {ratios.map((r: any) => (
                  <SizeOptionButton
                    key={r.value}
                    onClick={() => handleRatioSelect(r.value)}
                  >
                    {r.value}
                  </SizeOptionButton>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center">
              <div className="text-3xl font-black mb-6 flex items-center gap-2">
                <span>{selectedWidth}</span>
                <span className="text-gray-400">/</span>
                <span>{selectedRatio}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 w-full">
                {diameters.map((d: any) => (
                  <SizeOptionButton
                    key={d.value}
                    onClick={() => handleDiameterSelect(d.value)}
                  >
                    {d.value}
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