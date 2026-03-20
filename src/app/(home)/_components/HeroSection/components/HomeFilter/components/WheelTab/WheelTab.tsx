"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetFilterListQuery } from "@/redux/apis/product";
import { cn } from "@/lib/utils";
import YmmCustomSelect from "@/components/shared/YmmCustomSelect/YmmCustomSelect";

export default function WheelTab() {
  const router = useRouter();

  const [selectedDiameter, setSelectedDiameter] = useState<string | null>(null);
  const [selectedWidth, setSelectedWidth] = useState<string | null>(null);
  const [selectedBoltPattern, setSelectedBoltPattern] = useState<string | null>(null);

  const { data: filterData, isFetching } = useGetFilterListQuery({
    category: "wheels",
    ...(selectedDiameter ? { wheelDiameter: selectedDiameter } : {}),
    ...(selectedWidth && selectedWidth !== "any" ? { wheelWidth: selectedWidth } : {}),
  });

  const diameters = Array.isArray(filterData?.filters?.wheelDiameter) 
    ? filterData.filters.wheelDiameter.map((d: any) => d.value) 
    : [];
  
  // Widths only make sense if diameter is selected
  const widths = selectedDiameter && Array.isArray(filterData?.filters?.wheelWidth)
    ? ["any", ...filterData.filters.wheelWidth.map((w: any) => w.value)]
    : [];

  // Bolt patterns only make sense if width is selected
  const boltPatterns = selectedWidth && Array.isArray(filterData?.filters?.boltPatterns)
    ? filterData.filters.boltPatterns.map((b: any) => b.value)
    : [];

  const handleDiameterChange = (val: string) => {
    setSelectedDiameter(val);
    setSelectedWidth(null);
    setSelectedBoltPattern(null);
  };

  const handleWidthChange = (val: string) => {
    setSelectedWidth(val);
    setSelectedBoltPattern(null);
  };

  const handleBoltPatternChange = (val: string) => {
    setSelectedBoltPattern(val);
  };

  const handleSubmit = () => {
    if (!selectedDiameter || !selectedWidth || !selectedBoltPattern) return;

    let url = `/collections/product-category/wheels?wheelDiameter=${encodeURIComponent(selectedDiameter)}`;
    if (selectedWidth !== "any") {
      url += `&wheelWidth=${encodeURIComponent(selectedWidth)}`;
    }
    url += `&boltPatterns=${encodeURIComponent(selectedBoltPattern)}`;
    router.push(url);
  };

  const isSubmitDisabled = !selectedDiameter || !selectedWidth || !selectedBoltPattern;

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="flex-1 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <YmmCustomSelect
            label="DIAMETER"
            required={true}
            value={selectedDiameter || undefined}
            options={diameters}
            disabled={isFetching && !diameters.length}
            loading={isFetching && !diameters.length}
            onChange={handleDiameterChange}
            placeholder="DIAMETER"
          />
        </div>
        <div className="flex-1">
          <YmmCustomSelect
            label="WIDTH"
            required={true}
            value={selectedWidth || undefined}
            options={widths}
            disabled={!selectedDiameter || (isFetching && !widths.length)}
            loading={isFetching && selectedDiameter !== null && !widths.length}
            onChange={handleWidthChange}
            placeholder="WIDTH"
          />
        </div>
        <div className="flex-1">
          <YmmCustomSelect
            label="BOLT PATTERN"
            required={true}
            value={selectedBoltPattern || undefined}
            options={boltPatterns}
            disabled={!selectedWidth || (isFetching && !boltPatterns.length)}
            loading={isFetching && selectedWidth !== null && !boltPatterns.length}
            onChange={handleBoltPatternChange}
            placeholder="BOLT PATTERN"
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
