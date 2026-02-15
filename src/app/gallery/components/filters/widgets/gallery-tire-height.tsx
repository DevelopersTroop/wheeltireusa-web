"use client";
import FilterHeading from "@/app/collections/product-category/[categorySlug]/_filters/template/FilterHeading";
import SelectFilterTemplate from "@/app/collections/product-category/[categorySlug]/_filters/template/SelectFilterTemplate";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";

const GalleryTireHeight = ({
  tireHeight,
  filterKey,
}: {
  filterKey: string;
  tireHeight: TSingleFilter[];
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
        title="Tire Height"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={tireHeight} />
      )}
    </>
  );
};

export default GalleryTireHeight;
