"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/FilterHeading";
import SelectFilterTemplate from "../../template/SelectFilterTemplate";

const AccessoriesSubCategory = ({
  subCategory,
  filterKey,
}: {
  filterKey: string;
  subCategory: TSingleFilter[];
}) => {
  const [showFilter, setshowFilter] = useState(false);

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };

  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Subcategory"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={subCategory} />
      )}
    </>
  );
};

export default AccessoriesSubCategory;
