"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/FilterHeading";
import SelectFilterTemplate from "../../template/SelectFilterTemplate";

const WheelFinish = ({
  finish,
  filterKey,
}: {
  filterKey: string;
  finish: TSingleFilter[];
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
        title="Finish"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={finish} />
      )}
    </>
  );
};

export default WheelFinish;
