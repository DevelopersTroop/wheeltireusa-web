"use client";

import { ActionFilter } from "@/components/shared/ActionFilter/ActionFilter";
import { useGetFilterListQuery } from "@/redux/apis/product";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import DynamicFilters from "./DynamicFilters";
import { useFilterSync } from "@/hooks/useFilterSync";

const WheelFilters = React.memo(() => {

  const { filters: syncedFilters } = useFilterSync()
  const { data, isLoading: loading } = useGetFilterListQuery({
    category: "wheels",
    ...syncedFilters
  }, { refetchOnMountOrArgChange: true });
  const filters = data?.filters || null;
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
          { key: "price" },
          { key: "wheelDiameter", title: "Wheel Diameter", defaultOpen: true },
          { key: "wheelWidth", title: "Wheel Width" },
          { key: "color", title: "Color" },
          { key: "brand", title: "Brand" },
          { key: "model", title: "Model" },
          { key: "boltPatterns", title: "Bolt Pattern" },
          { key: "offset", title: "Wheel Offset" },
          { key: "backspacing", title: "Backspacing" },
          { key: "loadRating", title: "Load Rating" },
          { key: "centerBore", title: "Center Bore" },
          { key: "wheelMaterial", title: "Wheel Material" },
          { key: "wheelStructure", title: "Wheel Structure" },
        ]}
      />
    </div>
  );
});

WheelFilters.displayName = "WheelFilters";
export default WheelFilters;
