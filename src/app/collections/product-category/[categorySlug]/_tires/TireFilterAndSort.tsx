import { useSearchParams } from 'next/navigation'; // Hook to access the URL search parameters

// Import UI components for select dropdown
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import useFilter from '../_filters/filter-store/use-filter';

//InStockWheelFilterAndSort Component

const TireFilterAndSort = () => {
  // Access the URL search parameters to extract current filters and sorting options
  const searchParams = useSearchParams();
  const getCustomTireSizeLabel = (key: string) => {
    const hasFrontParams = searchParams.get('frontParams') !== null;
    const hasRearParams = searchParams.get('rearParams') !== null;
    const isDifferentOnRear =
      hasFrontParams && hasRearParams && hasFrontParams !== null ? true : false;
    if (key === 'frontParams' && isDifferentOnRear) {
      return 'Front Tire Size: ';
    } else if (key === 'rearParams' && isDifferentOnRear) {
      return 'Rear Tire Size: ';
    } else if (key === 'frontParams' && !isDifferentOnRear) {
      return 'Tire Size: ';
    } else if (key === 'rearParams' && !isDifferentOnRear) {
      return 'Tire Size: ';
    }
    return '';
  };

  // const filterOptions = Array.from(searchParams.entries());

  const filterOptions = Array.from(searchParams.entries())
    .filter(([key]) => key !== 'page')
    .flatMap(([key, value]) => {
      if (key === 'frontParams' || key === 'rearParams') {
        return [[key, value]];
      }
      return value.split(',').map((v) => [key, v]);
    });

  // Destructure functions from custom hook for filter management
  const {
    toggleFilterValue,
    removeFilterValue,
    clearAllFilters,
    formatFilterValue,
  } = useFilter();
  return (
    <div className="w-full flex justify-between gap-8">
      {/* Filter display section (only visible if there are active filters) */}
      <div
        className={`hidden min-[1300px]:w-2/3 min-[1300px]:flex flex-wrap gap-2 ${filterOptions.length > 0 && 'pb-5'}  `}
      >
        {/* Display each filter option as a button */}
        {filterOptions.length > 0
          ? filterOptions.map(([key, value], index) => {
              return key !== 'passenger' ? (
                <button
                  onClick={() => removeFilterValue(key, value)}
                  key={index}
                  className="flex justify-between items-center bg-[#F7F7F7] px-4 py-3 gap-4  rounded-[9px] text-base font-normal"
                >
                  {key === 'minPrice' ? (
                    <span className="text-[#210203] text-base font-normal">{`From $${value}`}</span>
                  ) : key === 'maxPrice' ? (
                    <span className="text-[#210203] text-base font-normal">{`To $${value}`}</span>
                  ) : key === 'sale' ? (
                    <span className="text-[#210203] text-base font-normal">{`On Sale`}</span>
                  ) : (
                    <span className="text-[#210203] text-base font-normal">
                      {getCustomTireSizeLabel(key)}
                      {`${formatFilterValue(value, key)}`}
                    </span>
                  )}
                  <div className="text-btext ml-2">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3331 5.16668L4.6665 11.8333M4.66648 5.16666L11.3331 11.8333"
                        stroke="#210203"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </button>
              ) : (
                // Empty fragment for "passenger" key (do not render anything)
                <React.Fragment key={index}></React.Fragment>
              );
            })
          : ''}
        {/* Display "Clear all" button if there are filters */}
        {filterOptions.length > 0 && (
          <button
            className="underline text-base font-semibold text-[#210203]"
            onClick={() => clearAllFilters()}
          >
            Clear all
          </button>
        )}
      </div>
      {/* Sorting section */}
      <div className="w-full min-[1300px]:w-1/3 flex items-center flex-row gap-3 justify-end -mt-1.5">
        {/* Select dropdown for sorting options */}
        <Select
          onValueChange={(value) => toggleFilterValue('sort', value, false)}
          value={searchParams.get('sort') || undefined}
        >
          <p className="text-base leading-[19px] flex items-center text-[#504949]">
            <span className="text-[#504949] text-base font-normal whitespace-nowrap">
              Sort by
            </span>
          </p>
          <SelectTrigger className="w-full max-w-[180px] !h-[41px]">
            <SelectValue placeholder="Sort options" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Options</SelectLabel>
              <SelectItem value="Sort by price (low to high)">
                Price (Low to High)
              </SelectItem>
              <SelectItem value="Sort by price (high to low)">
                Price (High to Low)
              </SelectItem>
              <SelectItem value="Sort by name (A to Z)">
                Name (A to Z)
              </SelectItem>
              <SelectItem value="Sort by name (Z to A)">
                Name (Z to A)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TireFilterAndSort;
