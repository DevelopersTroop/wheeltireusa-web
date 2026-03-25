"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetFilterListQuery } from "@/redux/apis/product";
import { cn } from "@/lib/utils";
import YmmCustomSelect from "@/components/shared/YmmCustomSelect/YmmCustomSelect";

export default function TireTab() {
  const router = useRouter();

  const [selectedWidth, setSelectedWidth] = useState<string | null>(null);
  const [selectedRatio, setSelectedRatio] = useState<string | null>(null);
  const [selectedDiameter, setSelectedDiameter] = useState<string | null>(null);

  const { data: filterData, isFetching } = useGetFilterListQuery({
    category: "tire",
    ...(selectedWidth ? { tireWidth: selectedWidth } : {}),
    ...(selectedRatio && selectedWidth ? { tireRatio: selectedRatio, tireWidth: selectedWidth } : {}),
  });

  const widths = Array.isArray(filterData?.filters?.tireWidth) 
    ? filterData.filters.tireWidth.map((w: any) => w.value) 
    : [];

  const ratios = selectedWidth && Array.isArray(filterData?.filters?.tireRatio)
    ? filterData.filters.tireRatio.map((r: any) => r.value)
    : [];

  const diameters = selectedRatio && Array.isArray(filterData?.filters?.tireDiameter)
    ? filterData.filters.tireDiameter.map((d: any) => d.value)
    : [];

  const handleWidthChange = (val: string) => {
    setSelectedWidth(val);
    setSelectedRatio(null);
    setSelectedDiameter(null);
  };

  const handleRatioChange = (val: string) => {
    setSelectedRatio(val);
    setSelectedDiameter(null);
  };

  const handleDiameterChange = (val: string) => {
    setSelectedDiameter(val);
  };

  const handleSubmit = () => {
    if (!selectedWidth || !selectedRatio || !selectedDiameter) return;

    router.push(
      `/collections/product-category/tires?tireDiameter=${encodeURIComponent(
        selectedDiameter
      )}&tireRatio=${encodeURIComponent(selectedRatio)}&tireWidth=${encodeURIComponent(
        selectedWidth
      )}`
    );
  };

  const isSubmitDisabled = !selectedWidth || !selectedRatio || !selectedDiameter;

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="flex-1 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <YmmCustomSelect
            label="WIDTH"
            required={true}
            value={selectedWidth || undefined}
            options={widths}
            disabled={isFetching && !widths.length}
            loading={isFetching && !widths.length}
            onChange={handleWidthChange}
            placeholder="WIDTH"
          />
        </div>
        <div className="flex-1">
          <YmmCustomSelect
            label="ASPECT / WIDTH"
            required={true}
            value={selectedRatio || undefined}
            options={ratios}
            disabled={!selectedWidth || (isFetching && !ratios.length)}
            loading={isFetching && selectedWidth !== null && !ratios.length}
            onChange={handleRatioChange}
            placeholder="ASPECT / WIDTH"
          />
        </div>
        <div className="flex-1">
          <YmmCustomSelect
            label="DIAMETER"
            required={true}
            value={selectedDiameter || undefined}
            options={diameters}
            disabled={!selectedRatio || (isFetching && !diameters.length)}
            loading={isFetching && selectedRatio !== null && !diameters.length}
            onChange={handleDiameterChange}
            placeholder="DIAMETER"
          />
        </div>
      </div>
      <div className="lg:w-32 shrink-0">
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className={cn(
            "w-full h-14 text-white font-bold text-lg uppercase rounded shadow flex items-center justify-center transition-opacity",
            isSubmitDisabled
              ? "bg-primary/50 cursor-not-allowed opacity-80"
              : "bg-primary hover:bg-primary/90"
          )}
        >
          GO
        </button>
      </div>
    </div>
  );
}
