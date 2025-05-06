'use client';
import { TSingleFilter } from '@/app/types/filter';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import FilterHeading from '../../template/filter-heading';
import SelectFilterTemplate from '../../template/select-filter-template';

const WheelDesign = ({
  design,
  filterKey,
}: {
  filterKey: string;
  design: TSingleFilter[];
}) => {
  const searchParams = useSearchParams();
  const designTypeToggle = searchParams.get(filterKey);

  const [showFilter, setshowFilter] = useState(
    designTypeToggle === null ? false : true
  );

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };

  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Design Type"
        disabled={design.length === 0}
      />
      {showFilter && design.length > 0 && (
        <SelectFilterTemplate filterKey={filterKey} filterData={design} />
      )}
    </>
  );
};

export default WheelDesign;
