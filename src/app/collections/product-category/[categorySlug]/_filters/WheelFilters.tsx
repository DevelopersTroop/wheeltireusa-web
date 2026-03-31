"use client";

import { ActionFilter } from "@/components/shared/ActionFilter/ActionFilter";
import { useFetchFilters } from "@/hooks/useFetchFilters";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import DynamicFilters from "./DynamicFilters";

const WheelFilters = React.memo(() => {
  const { filters, loading } = useFetchFilters("wheels");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchKey, setSearchKey] = useState(query);
  useSearchFilter(searchKey, setSearchKey, query);

  return (
    <div className="filter-shadow">
      <ActionFilter />
      <DynamicFilters
        filters={filters}
        loading={loading}
        include={[
          "price",
          { key: "wheelDiameter", defaultOpen: true },
          "wheelWidth",
          "color",
          "brand",
          "model",
          "boltPatterns",
          "offset",
          "backspacing",
          "loadRating",
          "centerBore",
          "wheelMaterial",
          "wheelStructure",
        ]}
      />
    </div>
  );
});

WheelFilters.displayName = "WheelFilters";
export default WheelFilters;
