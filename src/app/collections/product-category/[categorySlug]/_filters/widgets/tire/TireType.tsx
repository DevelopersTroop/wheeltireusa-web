"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/FilterHeading";
import SelectFilterTemplate from "../../template/SelectFilterTemplate";

const TireType = ({
  tireType,
  filterKey,
}: {
  filterKey: string;
  tireType: TSingleFilter[];
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
        title="Tire Type"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={tireType} />
      )}
    </>
  );
};

export default TireType;
