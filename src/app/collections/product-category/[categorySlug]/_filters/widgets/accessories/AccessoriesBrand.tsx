"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/FilterHeading";
import SelectFilterTemplate from "../../template/SelectFilterTemplate";

const AccessoriesBrand = ({
  brand,
  filterKey,
}: {
  filterKey: string;
  brand: TSingleFilter[];
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
        title="Brand"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={brand} />
      )}
    </>
  );
};

export default AccessoriesBrand;
