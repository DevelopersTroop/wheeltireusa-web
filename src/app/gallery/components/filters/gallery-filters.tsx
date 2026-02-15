"use client";

import { useGetFilterListQuery } from "@/redux/apis/gallery";
import GalleryTireHeight from "./widgets/gallery-tire-height";
import GalleryTireWidth from "./widgets/gallery-tire-width";
import GalleryTypeOfStance from "./widgets/gallery-type-of-stance";
import GalleryWheelDiameter from "./widgets/gallery-wheel-diameter";
import GalleryWheelOffset from "./widgets/gallery-wheel-offset";
import GalleryWheelWidth from "./widgets/gallery-wheel-width";
import SuspensionBrand from "./widgets/suspension-brand";

const SkeletonItem = () => (
  <div className="px-5 py-3 border-b border-gray-300">
    <div className="h-5 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
  </div>
);

const GalleryFilters = () => {
  const { data, isLoading } = useGetFilterListQuery();

  // Render loading skeleton
  if (!data || isLoading) {
    return (
      <div className="filter-shadow bg-gray-200">
        <div
          className={
            "flex justify-between text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors px-5 py-3 border-b border-gray-300 bg-gray-100 md:bg-transparent md:static sticky top-7 z-40"
          }
        >
          <p>Action Filter</p>
          <p className="text-sm text-primary cursor-pointer hidden md:block">
            Clear filter
          </p>
        </div>

        {/* Skeleton Items */}
        {[...Array(7)].map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </div>
    );
  }

  // Render actual data
  return (
    <div className={"filter-shadow bg-gray-200"}>
      <div
        className={
          "flex justify-between text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors px-5 py-3 border-b border-gray-300 bg-gray-100 md:bg-transparent md:static sticky top-7 z-40"
        }
      >
        <p>Action Filter</p>
        <p className="text-sm text-primary cursor-pointer hidden md:block">
          Clear filter
        </p>
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <SuspensionBrand
          filterKey={"suspensionBrand"}
          suspensionBrand={data.suspensionBrand}
        />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryWheelDiameter
          filterKey={"wheelDiameter"}
          diameter={data.wheelDiameter}
        />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryWheelWidth
          filterKey={"wheelWidth"}
          wheelWidth={data.wheelWidth}
        />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryTireHeight
          filterKey={"tireHeight"}
          tireHeight={data.tireHeight}
        />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryTireWidth filterKey={"tireWidth"} tireWidth={data.tireWidth} />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryWheelOffset
          filterKey={"wheelOffset"}
          wheelOffset={data.wheelOffset}
        />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryTypeOfStance
          filterKey={"stanceType"}
          typeOfStance={data.stanceType}
        />
      </div>
    </div>
  );
};

export default GalleryFilters;
