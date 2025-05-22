'use client';

import { TPriceFilter } from '@/types/filter';
import { useState, useCallback, useRef } from 'react';
import FilterHeading from '../../template/filter-heading';
import useFilter from '../../filter-store/use-filter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import debounce from 'debounce';
import MultiRangeSlider from '@/components/ui/multi-range-slider/multi-range-slider';

const WheelPriceRange = ({ price }: { price: TPriceFilter }) => {
  const { filters, toggleFilterValue } = useFilter();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showFilter, setShowFilter] = useState(true);

  // Use refs to prevent unnecessary re-renders
  const minPriceRef = useRef(price.min);
  const maxPriceRef = useRef(price.max);
  const currentLowPriceRef = useRef(Number(filters.minPrice) || price.min);
  const currentHighPriceRef = useRef(Number(filters.maxPrice) || price.max);

  const createQueryString = useCallback(
    (minPrice: number, maxPrice: number) => {
      const params = new URLSearchParams(searchParams.toString());
      minPrice !== price.min
        ? params.set('minPrice', String(minPrice))
        : params.delete('minPrice');
      maxPrice !== price.max
        ? params.set('maxPrice', String(maxPrice))
        : params.delete('maxPrice');
      return params.toString();
    },
    [searchParams, price.min, price.max]
  );

  const debouncedUpdate = useRef(
    debounce((minPrice: number, maxPrice: number) => {
      const queryString = createQueryString(minPrice, maxPrice);
      if (minPrice !== price.min || maxPrice !== price.max) {
        router.push(queryString ? `${pathname}?${queryString}` : pathname, {
          scroll: false,
        });
      }
      toggleFilterValue('minPrice', String(minPrice), false);
      toggleFilterValue('maxPrice', String(maxPrice), false);
    }, 500)
  ).current;

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
      if (min !== minPriceRef.current || max !== maxPriceRef.current) {
        minPriceRef.current = min;
        maxPriceRef.current = max;
      }

      if (
        currentLow !== currentLowPriceRef.current ||
        currentHigh !== currentHighPriceRef.current
      ) {
        currentLowPriceRef.current = currentLow;
        currentHighPriceRef.current = currentHigh;
        debouncedUpdate(currentLow, currentHigh);
      }
    },
    []
  );

  if (maxPriceRef.current === minPriceRef.current) return null;

  return (
    <div className="px-5 py-3 border-b">
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Price"
      />
      {showFilter && (
        <div className="mt-3">
          <MultiRangeSlider
            min={minPriceRef.current}
            max={maxPriceRef.current}
            currentLow={currentLowPriceRef.current}
            currentHigh={currentHighPriceRef.current}
            onChange={getMinMax}
          />
        </div>
      )}
    </div>
  );
};

export default WheelPriceRange;
