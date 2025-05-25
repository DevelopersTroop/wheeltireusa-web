'use client';
import React, { useEffect, useState } from 'react';
import FilterHeading from '../../template/filter-heading';
import SelectFilterTemplate from '../../template/select-filter-template';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { TSingleFilter } from '@/types/filter';

const Wheelsize = ({
  size,
  filterKey,
}: {
  filterKey: string;
  size: TSingleFilter[];
}) => {
  console.log('🚀 ~ size:', size);
  const searchParams = useSearchParams();
  const sizeGroupToggle = searchParams.get(filterKey);
  const [showFilter, setshowFilter] = useState(
    sizeGroupToggle === null ? false : true
  );

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };
  const [sizeSearchValue, setSizeSearchValue] = useState('');
  const [searchedSize, setSearchedSize] = useState<TSingleFilter[]>(size);
  useEffect(() => {
    if (sizeSearchValue === '') {
      setSearchedSize(size);
    } else {
      const searchedSize = size.filter((size) =>
        String(size.value).toLowerCase().includes(sizeSearchValue.toLowerCase())
      );
      setSearchedSize(searchedSize);
    }
  }, [sizeSearchValue, size]);

  const handleSizeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizeSearchValue(e.target.value);
  };
  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Size"
        disabled={searchedSize.length === 0}
      />

      {showFilter && searchedSize.length > 0 && (
        <>
          <Input
            onChange={handleSizeSearch}
            value={sizeSearchValue}
            type="text"
            placeholder="20 x 20"
            className="mb-2 bg-white w-full"
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

export default Wheelsize;
