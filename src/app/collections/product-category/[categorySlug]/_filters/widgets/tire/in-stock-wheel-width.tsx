'use client';
import { TSingleFilter } from '@/types/filter';
import React, { useState } from 'react';
import FilterHeading from '../../template/filter-heading';
import SelectFilterTemplate from '../../template/select-filter-template';

const InStockWheelWidth = ({
  width,
  filterKey,
}: {
  filterKey: string;
  width: TSingleFilter[];
}) => {
  const [showFilter, setshowFilter] = useState(false);

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };

  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Width"
        disabled={width.length === 0}
      />
      {showFilter && width.length > 0 && (
        <SelectFilterTemplate filterKey={filterKey} filterData={width} />
      )}
    </>
  );
};

export default InStockWheelWidth;
