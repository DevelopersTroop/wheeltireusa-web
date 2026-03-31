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
          { key: "price" },
          { key: "tireDiameter", title: "Tire Diameter", defaultOpen: true },
          { key: "tireWidth", title: "Tire Width" },
          { key: "tireRatio", title: "Aspect Ratio" },
          { key: "tireType", title: "Tire Type" },
          { key: "brand", title: "Brand" },
          { key: "model", title: "Model" },
          { key: "loadIndex", title: "Load Index" },
          { key: "speedRating", title: "Speed Rating" },
          { key: "tireSize", title: "Tire Size" },
          { key: "loadRange", title: "Load Range" },
          { key: "mileageWarranty", title: "Mileage Warranty" },
          { key: "terrain", title: "Terrain" },
          { key: "sidewall", title: "Sidewall" },
          { key: "ply", title: "Ply" },
        ]}
      />
    </div>
  );
});

TireFilters.displayName = "TireFilters";
export default TireFilters;
