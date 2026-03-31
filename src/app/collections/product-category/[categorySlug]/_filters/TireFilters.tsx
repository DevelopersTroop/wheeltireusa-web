"use client";

import { ActionFilter } from "@/components/shared/ActionFilter/ActionFilter";
import { useGetFilterListQuery } from "@/redux/apis/product";
import React from "react";
import DynamicFilters from "./DynamicFilters";
import { useFilterSync } from "@/hooks/useFilterSync";

const TireFilters = React.memo(() => {
  const { filters: syncedFilters } = useFilterSync()
  const { data, isLoading: loading } = useGetFilterListQuery({
    category: "tire",
    ...syncedFilters
  }, { refetchOnMountOrArgChange: true });
  const filters = data?.filters || null;

  return (
    <div className="filter-shadow ">
      <ActionFilter />
      <DynamicFilters
        filters={filters}
        loading={loading}
        include={[
          "price",
          { key: "tireDiameter", defaultOpen: true },
          "tireWidth",
          "tireRatio",
          "tireType",
          "brand",
          "model",
          "loadIndex",
          "speedRating",
          "tireSize",
          "loadRange",
          "mileageWarranty",
          "terrain",
          "sidewall",
          "ply",
        ]}
      />
    </div>
  );
});

TireFilters.displayName = "TireFilters";
export default TireFilters;
