'use client';
import { TSingleFilter } from '@/app/types/filter';
import React, { useState } from 'react';
import FilterHeading from '../../template/filter-heading';
import SelectFilterTemplate from '../../template/select-filter-template';
import { useSearchParams } from 'next/navigation';

const WheelBoltPattern = ({
  boltPattern,
  filterKey,
}: {
  filterKey: string;
  boltPattern: TSingleFilter[];
}) => {
  const searchParams = useSearchParams();
  const boltPatternTypeToggle = searchParams.get(filterKey);

  const [showFilter, setshowFilter] = useState(
    boltPatternTypeToggle === null ? false : true
  );

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };

  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Bolt Pattern"
        disabled={boltPattern.length === 0}
      />
      {showFilter && boltPattern.length > 0 && (
        <SelectFilterTemplate filterKey={filterKey} filterData={boltPattern} />
      )}
    </>
  );
};

export default WheelBoltPattern;
