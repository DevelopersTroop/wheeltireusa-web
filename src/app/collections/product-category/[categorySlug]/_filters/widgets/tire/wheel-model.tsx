'use client';
import { TSingleFilter } from '@/types/filter';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import FilterHeading from '../../template/filter-heading';
import SelectFilterTemplate from '../../template/select-filter-template';

const WheelModel = ({
  model,
  filterKey,
}: {
  filterKey: string;
  model: TSingleFilter[];
}) => {
  const searchParams = useSearchParams();
  const modelGroupToggle = searchParams.get(filterKey);
  const [showFilter, setshowFilter] = useState(
    modelGroupToggle === null ? false : true
  );

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };

  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Model"
        disabled={model.length === 0}
      />
      {showFilter && model.length > 0 && (
        <SelectFilterTemplate filterKey={filterKey} filterData={model} />
      )}
    </>
  );
};

export default WheelModel;
