"use client";

import { ActionFilter } from "@/components/shared/ActionFilter/ActionFilter";
import { useFetchFilters } from "@/hooks/useFetchFilters";
import React from "react";
import DynamicFilters from "./DynamicFilters";

const TireFilters = React.memo(() => {
  const { filters, loading } = useFetchFilters("tire");

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
