"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/FilterHeading";
import SelectFilterTemplate from "../../template/SelectFilterTemplate";

const WheelBoltPattern = ({
  boltPattern,
  filterKey,
}: {
  filterKey: string;
  boltPattern: TSingleFilter[];
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
        title="Bolt Pattern"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={boltPattern} />
      )}
    </>
  );
};

export default WheelBoltPattern;
