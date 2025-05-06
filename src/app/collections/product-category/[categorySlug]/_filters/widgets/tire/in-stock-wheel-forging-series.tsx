'use client';
import { TSingleFilter } from '@/app/types/filter';
import React, { useState } from 'react';
import FilterHeading from '../../template/filter-heading';
import SelectFilterTemplate from '../../template/select-filter-template';
import { sortSeriesFilter } from '@/app/utils/filter';

const InStockWheelForgingSeries = ({
  series,
  filterKey,
}: {
  filterKey: string;
  series: TSingleFilter[];
}) => {
  const [showFilter, setshowFilter] = useState(true);

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };

  const sortedSeries = sortSeriesFilter(series, [
    'Passenger',
    'Wire Wheels',
    'Off-Road',
    'Dually',
  ]);

  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Vehicle Type"
        disabled={series.length === 0}
      />
      {showFilter && sortedSeries.length > 0 && (
        <SelectFilterTemplate
          filterKey={filterKey}
          filterData={sortedSeries}
          capitalize={false}
          acceptMultipleValues={true}
        />
      )}
    </>
  );
};

export default InStockWheelForgingSeries;
