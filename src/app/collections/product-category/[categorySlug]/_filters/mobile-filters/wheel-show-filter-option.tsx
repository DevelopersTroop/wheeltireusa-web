// InStockWheelsShowFilterOption component displays the currently applied filter options for in-stock wheels.

import { useSearchParams } from 'next/navigation';
import React from 'react';
import useFilter from '../filter-store/use-filter';

const WheelsShowFilterOption = () => {
  // Get the current search parameters from the URL (e.g., filters applied via query string)
  const searchParams = useSearchParams();

  // const filterOptions = Array.from(searchParams.entries());

  // Extract filter options from the URL search parameters and handle multiple values per key
  const filterOptions = Array.from(searchParams.entries()).flatMap(
    ([key, value]) => {
      return value.split(',').map((v) => [key, v]);
    }
  );

  // Retrieve filter management functions from the useFilter custom hook
  const { removeFilterValue, clearAllFilters } = useFilter();

  return (
    <div className="flex flex-wrap gap-2 pt-3">
      {/* Display filter options as removable buttons */}
      {filterOptions.length > 0
        ? filterOptions.map(([key, value], index) =>
            key !== 'passenger' ? (
              <button
                onClick={() => removeFilterValue(key, value)}
                key={index}
                className="flex justify-between items-center bg-[#F7F7F7] px-4 py-3 gap-4  rounded-[9px] text-base font-normal"
              >
                {key === 'minPrice' ? (
                  <span className="text-[#210203] text-base font-normal">{`From $${value}`}</span>
                ) : key === 'maxPrice' ? (
                  <span className="text-[#210203] text-base font-normal">{`To $${value}`}</span>
                ) : (
                  <span className="text-[#210203] text-base font-normal">{`${value}`}</span>
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
              <React.Fragment key={index}></React.Fragment>
            )
          )
        : ''}

      {/* "Clear all" button to reset all filters if at least one filter is applied */}
      {filterOptions.length > 0 && (
        <button
          className="underline text-base font-semibold text-[#210203]"
          onClick={() => clearAllFilters()}
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default WheelsShowFilterOption;
