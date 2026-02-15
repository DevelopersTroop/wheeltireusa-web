"use client";
import FilterHeading from "@/app/collections/product-category/[categorySlug]/_filters/template/FilterHeading";
import SelectFilterTemplate from "@/app/collections/product-category/[categorySlug]/_filters/template/SelectFilterTemplate";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";

const GalleryTypeOfStance = ({
  typeOfStance,
  filterKey,
}: {
  filterKey: string;
  typeOfStance: TSingleFilter[];
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
        title="Type of Stance"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={typeOfStance} />
      )}
    </>
  );
};

export default GalleryTypeOfStance;
