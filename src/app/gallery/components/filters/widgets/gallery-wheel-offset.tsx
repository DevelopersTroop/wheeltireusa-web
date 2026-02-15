"use client";
import FilterHeading from "@/app/collections/product-category/[categorySlug]/_filters/template/FilterHeading";
import SelectFilterTemplate from "@/app/collections/product-category/[categorySlug]/_filters/template/SelectFilterTemplate";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";

const GalleryWheelOffset = ({
  wheelOffset,
  filterKey,
}: {
  filterKey: string;
  wheelOffset: TSingleFilter[];
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
        title="Wheel Offset"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={wheelOffset} />
      )}
    </>
  );
};

export default GalleryWheelOffset;
