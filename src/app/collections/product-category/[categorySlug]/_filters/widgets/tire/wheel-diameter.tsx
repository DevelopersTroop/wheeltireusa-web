'use client';
import { TSingleFilter } from '@/types/filter';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import FilterHeading from '../../template/filter-heading';
import SelectFilterTemplate from '../../template/select-filter-template';

const WheelDiameter = ({
  diameter,
  filterKey,
}: {
  filterKey: string;
  diameter: TSingleFilter[];
}) => {
  const searchParams = useSearchParams();
  const currentSelectedDiameters = searchParams.get(filterKey);
  const [showFilter, setshowFilter] = useState(
    currentSelectedDiameters === null ? false : true
  );

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };
  const currentSelectedDiametersArr =
    currentSelectedDiameters?.split(',') ?? [];
  const modifiedDiameter: TSingleFilter[] = [...diameter];

  // add missing diameter with count: 0 to modifiedDiameter
  currentSelectedDiametersArr.forEach((selectedDiameter) => {
    const isDiameterExist = modifiedDiameter.some(
      (diameter) => diameter.value === selectedDiameter
    );
    if (!isDiameterExist) {
      modifiedDiameter.push({ value: selectedDiameter, count: 0 });
    }
  });

  // sort the modifiedDiameter via Number(value)
  if (currentSelectedDiametersArr.length > 0) {
    modifiedDiameter.sort((a, b) => Number(a.value) - Number(b.value));
  }
  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Diameter"
        disabled={modifiedDiameter.length === 0}
      />
      {showFilter && modifiedDiameter.length > 0 && (
        <SelectFilterTemplate
          filterKey={filterKey}
          filterData={modifiedDiameter}
        />
      )}
    </>
  );
};

export default WheelDiameter;
