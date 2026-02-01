"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/FilterHeading";
import SelectFilterTemplate from "../../template/SelectFilterTemplate";

const TireLoadIndex = ({
  loadIndex,
  filterKey,
}: {
  filterKey: string;
  loadIndex: TSingleFilter[];
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
        title="Load Index"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={loadIndex} />
      )}
    </>
  );
};

export default TireLoadIndex;
