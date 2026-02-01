"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/FilterHeading";
import SelectFilterTemplate from "../../template/SelectFilterTemplate";

const TireLoadRange = ({
  loadRange,
  filterKey,
}: {
  filterKey: string;
  loadRange: TSingleFilter[];
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
        title="Load Range"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={loadRange} />
      )}
    </>
  );
};

export default TireLoadRange;
