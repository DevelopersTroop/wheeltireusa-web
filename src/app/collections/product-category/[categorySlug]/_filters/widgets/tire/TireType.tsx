'use client';
import { TSingleFilter } from '@/types/filter';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FilterHeading from '../../template/FilterHeading';
import SelectFilterTemplate from '../../template/SelectFilterTemplate';

const TireType = ({
  tire_type,
  filterKey,
}: {
  filterKey: string;
  tire_type: TSingleFilter[];
}) => {
  const searchParams = useSearchParams();
  const sizeGroupToggle = searchParams.get(filterKey);
  const [showFilter, setshowFilter] = useState(
    sizeGroupToggle === null ? false : true
  );

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };
  const [sizeSearchValue] = useState('');
  const [searchedSize, setSearchedSize] = useState<TSingleFilter[]>(tire_type);
  useEffect(() => {
    if (sizeSearchValue === '') {
      setSearchedSize(tire_type);
    } else {
      const searchedSize = tire_type.filter((size) =>
        String(size.value).toLowerCase().includes(sizeSearchValue.toLowerCase())
      );
      setSearchedSize(searchedSize);
    }
  }, [sizeSearchValue, tire_type]);

  // const handleSizeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSizeSearchValue(e.target.value);
  // };
  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Tire Style"
        disabled={tire_type.length === 0}
      />

      {showFilter && tire_type.length > 0 && (
        <>
          {/* <SearchBox
            onChange={handleSizeSearch}
            value={sizeSearchValue}
            placeholder="e.g., Q"
          /> */}
          <SelectFilterTemplate
            filterKey={filterKey}
            filterData={searchedSize}
          />
        </>
      )}
    </>
  );
};

export default TireType;
