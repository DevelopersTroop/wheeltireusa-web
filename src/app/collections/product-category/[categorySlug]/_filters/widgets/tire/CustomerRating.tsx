'use client';
import { TSingleFilter } from '@/types/filter';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FilterHeading from '../../template/FilterHeading';
import SelectFilterTemplate from '../../template/SelectFilterTemplate';

const CustomerRating = ({
  customer_rating,
  filterKey,
}: {
  filterKey: string;
  customer_rating: TSingleFilter[];
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
    useState<TSingleFilter[]>(customer_rating);
  useEffect(() => {
    if (sizeSearchValue === '') {
      setSearchedSize(customer_rating);
    } else {
      const searchedSize = customer_rating.filter((size) =>
        String(size.value).toLowerCase().includes(sizeSearchValue.toLowerCase())
      );
      setSearchedSize(searchedSize);
    }
  }, [sizeSearchValue, customer_rating]);

  const handleSizeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizeSearchValue(e.target.value);
  };
  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Customer Rating"
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

export default CustomerRating;
