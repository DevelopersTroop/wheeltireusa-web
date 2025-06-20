'use client';
import { TSingleFilter } from '@/types/filter';
// import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FilterHeading from '../../template/FilterHeading';
import SelectFilterTemplate from '../../template/SelectFilterTemplate';
import SearchBox from '../components/SearchBox';

const TireBrand = ({
  brand,
  filterKey,
}: {
  filterKey: string;
  brand: TSingleFilter[];
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
  const [sizeSearchValue, setSizeSearchValue] = useState('');
  const [searchedSize, setSearchedSize] = useState<TSingleFilter[]>(brand);
  useEffect(() => {
    if (sizeSearchValue === '') {
      setSearchedSize(brand);
    } else {
      const searchedSize = brand.filter((size) =>
        String(size.value).toLowerCase().includes(sizeSearchValue.toLowerCase())
      );
      setSearchedSize(searchedSize);
    }
  }, [sizeSearchValue, brand]);

  const handleSizeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizeSearchValue(e.target.value);
  };
  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Brand"
        disabled={brand.length === 0}
      />

      {showFilter && brand.length > 0 && (
        <>
          <SearchBox
            onChange={handleSizeSearch}
            value={sizeSearchValue}
            placeholder="e.g., Michelin"
          />
          <SelectFilterTemplate
            filterKey={filterKey}
            filterData={searchedSize}
          />
        </>
      )}
    </>
  );
};

export default TireBrand;
