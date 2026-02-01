"use client";

import { TPriceFilter } from "@/types/filter";
import debounce from "debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FilterHeading from "../../template/FilterHeading";
import MultiRangeSlider from "@/components/ui/multi-range-slider/multi-range-slider";
import { useFilterSync } from "@/hooks/useFilterSync";

const PriceRange = ({ price }: { price?: TPriceFilter }) => {
  const { toggleFilterValue } = useFilterSync();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);

  // Use state instead of ref to track min/max price
  const [minPrice, setMinPrice] = useState(price?.min || 0);
  const [maxPrice, setMaxPrice] = useState(price?.max || 0);
  const [currentLow, setCurrentLow] = useState(price?.min || 0);
  const [currentHigh, setCurrentHigh] = useState(
    price?.max ? price?.max * 4 : 0,
  );

  // Ensure min/max values are updated when price prop changes
  useEffect(() => {
    if (price) {
      setMinPrice(price.min);
      setMaxPrice(price.max);
      setCurrentLow(price.min);
      setCurrentHigh(price.max * 4);
    }
  }, [price]);

  useEffect(() => {
    if (price) {
      setCurrentLow(Number(searchParams.get("minPrice")) || price.min);
      setCurrentHigh(Number(searchParams.get("maxPrice")) || price.max * 4);
    }
  }, [searchParams, price]);

  const createQueryString = useCallback(
    (min: number, max: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (min !== price?.min) {
        params.set("minPrice", String(min));
      } else {
        params.delete("minPrice");
      }
      if (max !== price?.max) {
        params.set("maxPrice", String(max));
      } else {
        params.delete("maxPrice");
      }
      return params.toString();
    },
    [searchParams, price?.min, price?.max],
  );

  const debouncedUpdate = useCallback(
    debounce((min: number, max: number) => {
      const queryString = createQueryString(min, max);
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
      toggleFilterValue("minPrice", String(min), false);
      toggleFilterValue("maxPrice", String(max), false);
    }, 500),
    [router, pathname, createQueryString, toggleFilterValue],
  );

  const toggleFilter = () => setShowFilter((prev) => !prev);

  const getMinMax = useCallback(
    ({
      min,
      max,
      currentLow,
      currentHigh,
    }: {
      min: number;
      max: number;
      currentLow: number;
      currentHigh: number;
    }) => {
      setMinPrice(min);
      setMaxPrice(max);
      setCurrentLow(currentLow);
      setCurrentHigh(currentHigh);
    },
    [],
  );

  const applyFilter = () => {
    debouncedUpdate(currentLow, currentHigh);
  };

  return (
    <div className="border-y px-5 py-3">
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Price Range"
      />
      {showFilter && (
        <div className="mt-3">
          <MultiRangeSlider
            min={minPrice}
            max={maxPrice}
            currentLow={currentLow}
            currentHigh={currentHigh}
            onChange={getMinMax}
          />
          <div className="mt-3">
            <button onClick={applyFilter} className="box-button">
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRange;
