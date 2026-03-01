"use client";

import { TPriceFilter } from "@/types/filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import FilterHeading from "../../template/FilterHeading";
import { Slider } from "@/components/ui/slider";

const PriceRange = ({ price }: { price?: TPriceFilter }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);

  const sliderMin = Math.floor(price?.min || 0);
  const sliderMax = Math.ceil((price?.max || 0) * 4);

  const [currentLow, setCurrentLow] = useState(sliderMin);
  const [currentHigh, setCurrentHigh] = useState(sliderMax);

  // Track whether we're pushing to the URL to avoid sync-back loop
  const isPushingRef = useRef(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync when price prop changes (initial load)
  useEffect(() => {
    if (price) {
      const min =
        Number(searchParams.get("minPrice")) || Math.floor(price.min);
      const max =
        Number(searchParams.get("maxPrice")) || Math.ceil(price.max * 4);
      setCurrentLow(min);
      setCurrentHigh(max);
    }
    // Only run on price change, not on every searchParams change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  // Sync from URL params (e.g. browser back/forward, external filter clear)
  useEffect(() => {
    if (isPushingRef.current || !price) return;
    const urlMin =
      Number(searchParams.get("minPrice")) || Math.floor(price.min);
    const urlMax =
      Number(searchParams.get("maxPrice")) || Math.ceil(price.max * 4);

    // Only update if values actually differ to prevent unnecessary re-renders
    setCurrentLow((prev) => (prev !== urlMin ? urlMin : prev));
    setCurrentHigh((prev) => (prev !== urlMax ? urlMax : prev));
  }, [searchParams, price]);

  const pushToUrl = useCallback(
    (min: number, max: number) => {
      // Cancel any pending debounce
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        isPushingRef.current = true;

        const params = new URLSearchParams(searchParams.toString());
        if (min !== sliderMin) {
          params.set("minPrice", String(min));
        } else {
          params.delete("minPrice");
        }
        if (max !== sliderMax) {
          params.set("maxPrice", String(max));
        } else {
          params.delete("maxPrice");
        }

        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname, {
          scroll: false,
        });

        // Reset the flag after navigation settles
        setTimeout(() => {
          isPushingRef.current = false;
        }, 100);
      }, 500);
    },
    [searchParams, sliderMin, sliderMax, router, pathname]
  );

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSliderChange = (values: number[]) => {
    if (values[0] < values[1]) {
      setCurrentLow(values[0]);
      setCurrentHigh(values[1]);
      pushToUrl(values[0], values[1]);
    }
  };

  const handleMinInputChange = (val: string) => {
    const num = Number(val) || 0;
    if (num < currentHigh) {
      setCurrentLow(num);
      pushToUrl(num, currentHigh);
    }
  };

  const handleMaxInputChange = (val: string) => {
    const num = Number(val) || 0;
    if (num > currentLow) {
      setCurrentHigh(num);
      pushToUrl(currentLow, num);
    }
  };

  const toggleFilter = () => setShowFilter((prev) => !prev);

  return (
    <div className="border-b border-gray-200 px-5 py-4">
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Price"
      />
      {showFilter && (
        <div className="pt-3 pb-1">
          {/* Min/Max labels above slider */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] text-[#6b7280]">
              ${currentLow.toLocaleString()}
            </span>
            <span className="text-[13px] text-[#6b7280]">
              ${currentHigh.toLocaleString()}
            </span>
          </div>

          {/* Slider */}
          <Slider
            value={[currentLow, currentHigh]}
            onValueChange={handleSliderChange}
            min={sliderMin}
            max={sliderMax}
            step={1}
            className="w-full"
          />

          {/* Input fields */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center border border-gray-300 rounded-sm flex-1 overflow-hidden">
              <span className="text-[13px] text-[#6b7280] pl-2.5 pr-1 select-none">
                $
              </span>
              <input
                type="number"
                value={currentLow}
                onChange={(e) => handleMinInputChange(e.target.value)}
                className="w-full py-2 pr-2.5 text-[13px] text-[#1a1a2e] font-medium bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <span className="text-gray-400 text-sm select-none">—</span>
            <div className="flex items-center border border-gray-300 rounded-sm flex-1 overflow-hidden">
              <span className="text-[13px] text-[#6b7280] pl-2.5 pr-1 select-none">
                $
              </span>
              <input
                type="number"
                value={currentHigh}
                onChange={(e) => handleMaxInputChange(e.target.value)}
                className="w-full py-2 pr-2.5 text-[13px] text-[#1a1a2e] font-medium bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRange;
