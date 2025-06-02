'use client';
import { TSingleFilter } from '@/types/filter';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import FilterHeading from '../../template/filter-heading';
import SelectFilterTemplate from '../../template/select-filter-template';

const WheelFinish = ({
  finish,
  filterKey,
}: {
  filterKey: string;
  finish: TSingleFilter[];
}) => {
  const searchParams = useSearchParams();
  const finishToggle = searchParams.get(filterKey);

  const [showFilter, setshowFilter] = useState(
    finishToggle === null ? false : true
  );

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };

  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Finish"
        disabled={finish.length === 0}
      />
      {showFilter && finish.length > 0 && (
        <SelectFilterTemplate filterKey={filterKey} filterData={finish} />
      )}
    </>
  );
};

export default WheelFinish;
