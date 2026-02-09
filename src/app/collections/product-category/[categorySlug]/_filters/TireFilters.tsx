"use client";

import { useFetchFilters } from "@/hooks/useFetchFilters";
import TireModel from "./widgets/tire/TireModel";
import TireWheelDiameter from "./widgets/tire/TireWheelDiameter";
import TireWidth from "./widgets/tire/TireWidth";
import TireType from "./widgets/tire/TireType";
import { ActionFilter } from "@/components/shared/ActionFilter/ActionFilter";
import TireImage from "./widgets/tire/TireImage";
import PriceRange from "./widgets/components/PriceRange";
import TireLoadIndex from "./widgets/tire/TireLoadIndex";
import TireBrand from "./widgets/tire/TireBrand";

const TireFilters = () => {
  const { filters } = useFetchFilters("tires");
  console.log("TCL: TireFilters -> filters", filters)

  return (
    <div className={"filter-shadow bg-gray-200"}>
      <div className="border-b border-gray-300">
        <TireImage />
      </div>
      {/* <div className="border-b border-gray-300 px-3 pb-3 pt-10">
        <div className="relative p-1 outline outline-1">
          <h2 className="pt-3 text-base font-semibold uppercase">
            Not A pro at this?
          </h2>
          <p>
            Use the tire guided flow to get step-by-step support, and we'll get
            you exactly the tires your build needs.
          </p>
          <div className="mt-3 text-center">
            <button className="mx-auto bg-primary px-10 py-1.5 text-center uppercase text-white hover:bg-primary-hover">
              Get Guided
            </button>
          </div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform bg-gray-100 px-3">
            <h2 className="text-lg font-semibold uppercase">Never Fail</h2>
          </div>
        </div>
      </div> */}
      <ActionFilter />
      <div>
        <PriceRange price={filters?.price} />
      </div>
      <div className={"border-y border-gray-300 px-5 py-3"}>
        <TireWheelDiameter
          filterKey={"diameter"}
          diameter={filters?.diameter}
        />
      </div>
      {/* <div className={"border-b border-gray-300 px-5 py-3"}>
        <TireHeight filterKey={"tire_height"} height={filters?.tire_height || []} />
      </div> */}
      {/* <div className={"border-b border-gray-300 px-5 py-3"}>
        <TireWidth filterKey={"width"} width={filters?.wid || []} />
      </div> */}
      <div className={"border-b border-gray-300 px-5 py-3"}>
        <TireType filterKey={"tire_type"} tireType={filters?.tire_type || []} />
      </div>
      {/* <div className={"border-b border-gray-300 px-5 py-3"}>
        <TireLoadRange filterKey={"load_range"} loadRange={filters?.load_range || []} />
      </div> */}
      <div className={"border-b border-gray-300 px-5 py-3"}>
        <TireLoadIndex
          filterKey={"load_index"}
          loadIndex={filters?.load_index || []}
        />
      </div>
      <div className={"border-b border-gray-300 px-5 py-3"}>
        <TireBrand filterKey={"brand"} brand={filters?.brand || []} />
      </div>
      <div className={"border-b border-gray-300 px-5 py-3"}>
        <TireModel filterKey={"model"} model={filters?.model || []} />
      </div>
    </div>
  );
};

export default TireFilters;
