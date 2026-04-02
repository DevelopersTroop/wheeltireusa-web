"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetFilterListQuery } from "@/redux/apis/product";
import useYmmFilterModal from "../../../../context/useYmmFilterModal";
import SizeStepIndicator from "../SizeStepIndicator/SizeStepIndicator";
import SizeListSkeleton from "../SizeListSkeleton/SizeListSkeleton";
import SizeOptionButton from "../SizeOptionButton/SizeOptionButton";

export default function WheelsSizeFlow() {
  const router = useRouter();
  const { closeModal, openNeedHelpModal } = useYmmFilterModal();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDiameter, setSelectedDiameter] = useState<string | null>(null);
  const [selectedWidth, setSelectedWidth] = useState<string | null>(null);

  // Preserve dropdown options independently
  const [diameters, setDiameters] = useState<any[]>([]);
  const [widths, setWidths] = useState<any[]>([]);
  const [boltPatterns, setBoltPatterns] = useState<any[]>([]);

  const { data: filterData, isLoading, isFetching } = useGetFilterListQuery({
    category: "wheels",
    ...(step >= 2 && selectedDiameter ? { wheelDiameter: selectedDiameter } : {}),
    ...(step >= 3 && selectedWidth && selectedWidth !== "any" ? { wheelWidth: selectedWidth } : {}),
  });

  // Preserve diameters from initial API response
  useEffect(() => {
    if (Array.isArray(filterData?.filters?.wheelDiameter) && filterData.filters.wheelDiameter.length > 0) {
      setDiameters((current) => (current.length === 0 ? [...(filterData.filters.wheelDiameter as any[])] : current));
    }
  }, [filterData?.filters?.wheelDiameter]);

  // Preserve widths when diameter is selected
  useEffect(() => {
    if (selectedDiameter && Array.isArray(filterData?.filters?.wheelWidth) && filterData.filters.wheelWidth.length > 0) {
      setWidths((current) => (current.length === 0 ? [...(filterData.filters.wheelWidth as any[])] : current));
    }
  }, [filterData?.filters?.wheelWidth, selectedDiameter]);

  // Preserve bolt patterns when width is selected
  useEffect(() => {
    if (selectedWidth && selectedWidth !== "any" && Array.isArray(filterData?.filters?.boltPatterns) && filterData.filters.boltPatterns.length > 0) {
      setBoltPatterns((current) => (current.length === 0 ? [...(filterData.filters.boltPatterns as any[])] : current));
    }
  }, [filterData?.filters?.boltPatterns, selectedWidth]);

  const handleDiameterSelect = (val: string) => {
    setSelectedDiameter(val);
    setSelectedWidth(null);
    setStep(2);
    // Reset downstream preserved options
    setWidths([]);
    setBoltPatterns([]);
  };

  const handleWidthSelect = (val: string) => {
    setSelectedWidth(val);
    setStep(3);
    // Reset downstream preserved options
    setBoltPatterns([]);
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
      onClick: () => {
        setStep(1);
        // Reset all preserved options when going back to first step
        setDiameters([]);
        setWidths([]);
        setBoltPatterns([]);
      },
    },
    {
      id: 2,
      label: "Wheel Width",
      isCompleted: !!selectedWidth,
      isActive: step === 2,
      isDisabled: !selectedDiameter,
      onClick: () => {
        if (selectedDiameter) {
          setStep(2);
          // Reset downstream preserved options when going back to width
          setWidths([]);
          setBoltPatterns([]);
        }
      },
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

  return (
    <div>
      {renderStepIndicator()}

      {isFetching ? (
        <SizeListSkeleton />
      ) : (
        <div className="pb-6 overflow-y-auto custom-scrollbar max-h-[300px]">
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
