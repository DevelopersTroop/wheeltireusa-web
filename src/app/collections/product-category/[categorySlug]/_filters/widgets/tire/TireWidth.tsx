"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/FilterHeading";
import SelectFilterTemplate from "../../template/SelectFilterTemplate";

const TireWidth = ({
  width,
  filterKey,
}: {
  filterKey: string;
  width: TSingleFilter[];
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
        title="Tire Width"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={width} />
      )}
    </>
  );
};

export default TireWidth;
