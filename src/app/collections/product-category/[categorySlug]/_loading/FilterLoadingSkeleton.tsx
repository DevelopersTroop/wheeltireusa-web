import React from 'react';

//FilterLoadingSkeleton Component
const FilterLoadingSkeleton = () => {
  return (
    <>
      {/* First section of the loading skeleton */}
      <div>
        <div className="animate-color-pulse w-4/5 h-6 rounded-xl"></div>
        <div className="animate-color-pulse mt-6 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
      </div>
      {/* Second section of the loading skeleton */}
      <div className="mt-6">
        <div className="animate-color-pulse w-4/5 h-6 rounded-xl"></div>
        <div className="animate-color-pulse mt-6 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
      </div>
      {/* Third section of the loading skeleton */}
      <div className="mt-6">
        <div className="animate-color-pulse w-4/5 h-6 rounded-xl"></div>
        <div className="animate-color-pulse mt-6 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
        <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
      </div>
    </>
  );
};

export default FilterLoadingSkeleton;
