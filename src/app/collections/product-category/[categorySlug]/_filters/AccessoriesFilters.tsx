"use client";

import { ActionFilter } from "@/components/shared/ActionFilter/ActionFilter";
import { useGetFilterListQuery } from "@/redux/apis/product";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import AccessoriesSearchByKey from "./widgets/accessories/AccessoriesSearchByKey";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import DynamicFilters from "./DynamicFilters";
import { useFilterSync } from "@/hooks/useFilterSync";

const AccessoriesFilters = React.memo(() => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchKey, setSearchKey] = useState(query);

  const { filters: syncedFilters } = useFilterSync()
  const { data, isLoading: loading } = useGetFilterListQuery({
    category: "accessories",
    ...syncedFilters
  }, { refetchOnMountOrArgChange: true });
  const filters = data?.filters || null;
  useSearchFilter(searchKey, setSearchKey, query);

  return (
    <div className="filter-shadow ">
      <ActionFilter />
      <DynamicFilters
        filters={filters}
        loading={loading}
        include={[
          "price",
          { key: "brand", defaultOpen: true },
          "category",
        ]}
      />
      <div className="border-b border-gray-300 px-5 py-3">
        <AccessoriesSearchByKey
          setSearchKey={setSearchKey}
          searchKey={searchKey}
        />
      </div>
    </div>
  );
});

AccessoriesFilters.displayName = "AccessoriesFilters";
export default AccessoriesFilters;
