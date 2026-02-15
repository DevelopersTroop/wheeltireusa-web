"use client";
import FilterHeading from "@/app/collections/product-category/[categorySlug]/_filters/template/FilterHeading";
import SelectFilterTemplate from "@/app/collections/product-category/[categorySlug]/_filters/template/SelectFilterTemplate";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";

const SuspensionBrand = ({
  suspensionBrand,
  filterKey,
}: {
  filterKey: string;
  suspensionBrand: TSingleFilter[];
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
        title="Suspension Brand"
      />
      {showFilter && (
        <SelectFilterTemplate
          filterKey={filterKey}
          filterData={suspensionBrand}
        />
      )}
    </>
  );
};

export default SuspensionBrand;
