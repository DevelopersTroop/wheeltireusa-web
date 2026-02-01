"use client";

import { ActionFilter } from "@/components/shared/ActionFilter/ActionFilter";
import { useFetchFilters } from "@/hooks/useFetchFilters";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import AccessoriesBrand from "./widgets/accessories/AccessoriesBrand";
import AccessoriesSearchByKey from "./widgets/accessories/AccessoriesSearchByKey";
import AccessoriesSubCategory from "./widgets/accessories/AccessoriesSubcategory";
import { useSearchFilter } from "@/hooks/useSearchFilter";
const AccessoriesFilters = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchKey, setSearchKey] = useState(query);
  const { filters } = useFetchFilters("accessories");
  // Rerender every time if the search key changes
  useSearchFilter(searchKey, setSearchKey, query);

  return (
    <div className={"filter-shadow bg-gray-200"}>
      <ActionFilter />

      <div className={"border-y border-gray-300 px-5 py-3"}>
        <AccessoriesSubCategory
          filterKey={"product_sub_type"}
          subCategory={filters?.product_sub_type || []}
        />
      </div>
      <div className={"border-b border-gray-300 px-5 py-3"}>
        <AccessoriesBrand filterKey={"brand_desc"} brand={filters?.brand_desc || []} />
      </div>

      <div className={"border-b border-gray-300 px-5 py-3"}>
        <AccessoriesSearchByKey
          setSearchKey={setSearchKey}
          searchKey={searchKey}
        />
      </div>
    </div>
  );
};

export default AccessoriesFilters;
