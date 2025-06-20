'use client';
import { TSingleFilter } from '@/types/filter';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FilterHeading from '../../template/FilterHeading';
import SelectFilterTemplate from '../../template/SelectFilterTemplate';

const Category = ({
  category,
  filterKey,
}: {
  filterKey: string;
  category: TSingleFilter[];
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
  const [searchedSize, setSearchedSize] = useState<TSingleFilter[]>(category);
  useEffect(() => {
    if (sizeSearchValue === '') {
      setSearchedSize(category);
    } else {
      const searchedSize = category.filter((size) =>
        String(size.value).toLowerCase().includes(sizeSearchValue.toLowerCase())
      );
      setSearchedSize(searchedSize);
    }
  }, [sizeSearchValue, category]);

  const handleSizeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizeSearchValue(e.target.value);
  };
  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Category"
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

export default Category;
