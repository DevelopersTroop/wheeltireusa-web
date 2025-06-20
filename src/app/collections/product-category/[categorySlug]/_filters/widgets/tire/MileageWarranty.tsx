'use client';
import { TSingleFilter } from '@/types/filter';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FilterHeading from '../../template/FilterHeading';
import SelectFilterTemplate from '../../template/SelectFilterTemplate';

const MileageWarranty = ({
  mileage_warranty,
  filterKey,
}: {
  filterKey: string;
  mileage_warranty: TSingleFilter[];
}) => {
  const searchParams = useSearchParams();
  const sizeGroupToggle = searchParams.get(filterKey);
  const [showFilter, setshowFilter] = useState(
    sizeGroupToggle === null ? false : true
  );

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };
  const [sizeSearchValue, setSizeSearchValue] = useState('');
  const [searchedSize, setSearchedSize] =
    useState<TSingleFilter[]>(mileage_warranty);
  useEffect(() => {
    if (sizeSearchValue === '') {
      setSearchedSize(mileage_warranty);
    } else {
      const searchedSize = mileage_warranty.filter((size) =>
        String(size.value).toLowerCase().includes(sizeSearchValue.toLowerCase())
      );
      setSearchedSize(searchedSize);
    }
  }, [sizeSearchValue, mileage_warranty]);

  const handleSizeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizeSearchValue(e.target.value);
  };
  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Mileage Warranty"
        disabled={searchedSize.length === 0}
      />

      {showFilter && searchedSize.length > 0 && (
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

export default MileageWarranty;
