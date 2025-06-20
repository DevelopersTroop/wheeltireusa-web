'use client';
import { TSingleFilter } from '@/types/filter';
// import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FilterHeading from '../../template/FilterHeading';
import SelectFilterTemplate from '../../template/SelectFilterTemplate';

const SpecialOffers = ({
  special_offers,
  filterKey,
}: {
  filterKey: string;
  special_offers: TSingleFilter[];
}) => {
  // const searchParams = useSearchParams();
  // const sizeGroupToggle = searchParams.get(filterKey);
  const [showFilter, setshowFilter] = useState(
    // sizeGroupToggle === null ? false : true // default: if has any active filter, then open. Otherwise, close.
    true // default: open
  );

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };
  const [sizeSearchValue] = useState('');
  const [searchedSize, setSearchedSize] =
    useState<TSingleFilter[]>(special_offers);
  useEffect(() => {
    if (sizeSearchValue === '') {
      setSearchedSize(special_offers);
    } else {
      const searchedSize = special_offers.filter((size) =>
        String(size.value).toLowerCase().includes(sizeSearchValue.toLowerCase())
      );
      setSearchedSize(searchedSize);
    }
  }, [sizeSearchValue, special_offers]);

  // const handleSizeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSizeSearchValue(e.target.value);
  // };
  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Special Offers"
        disabled={special_offers.length === 0}
      />

      {showFilter && special_offers.length > 0 && (
        <>
          {/* <SearchBox
            onChange={handleSizeSearch}
            value={sizeSearchValue}
            placeholder="e.g., Q"
          /> */}
          <SelectFilterTemplate
            isSwitch={true}
            filterKey={filterKey}
            filterData={searchedSize}
          />
        </>
      )}
    </>
  );
};

export default SpecialOffers;
