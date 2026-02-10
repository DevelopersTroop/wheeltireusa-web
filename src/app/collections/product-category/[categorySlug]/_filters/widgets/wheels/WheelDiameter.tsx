"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/FilterHeading";
import SelectFilterTemplate from "../../template/SelectFilterTemplate";

const WheelDiameter = ({
  diameter,
  filterKey,
}: {
  filterKey: string;
  diameter: TSingleFilter[];
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
        title="Wheel Diameter"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={diameter} />
      )}
    </>
  );
};

export default WheelDiameter;
