"use client";

export default function ShopBySizePanelLoadingFallback() {
  return (
    <div className="pt-2">
      {/* Top Toggle Buttons Skeleton */}
      <div className="mx-auto flex justify-center gap-3 sm:gap-4 mb-6">
        <div className="w-32 sm:w-40 h-[46px] rounded-md border border-gray-300 bg-linear-to-r from-gray-50 via-gray-100 to-gray-50 animate-pulse" />
        <div className="w-32 sm:w-40 h-[46px] rounded-md border border-gray-300 bg-linear-to-r from-gray-50 via-gray-100 to-gray-50 animate-pulse" />
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-gray-200" />

      {/* Step Indicator Skeleton */}
      <div className="relative flex flex-col sm:block items-center mb-8">
        <div className="flex justify-center items-center gap-2 sm:gap-4">
          <div className="h-8 w-24 rounded-full bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
          <div className="w-8 h-0.5 bg-gray-200" />
          <div className="h-8 w-24 rounded-full bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
          <div className="w-8 h-0.5 bg-gray-200" />
          <div className="h-8 w-24 rounded-full bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
        </div>
      </div>

      {/* Grid List Skeleton */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 pb-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-12 w-full rounded-md border border-gray-200 bg-linear-to-r from-gray-50 via-gray-100 to-gray-50 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
