"use client";

export default function ShopByBrandPanelLoadingFallback() {
  return (
    <div className="pt-2">
      <div className="my-6 h-px bg-gray-200" />
      <div className="mx-auto flex justify-center gap-3 sm:gap-4 mb-6">
        <div className="w-32 sm:w-40 h-11 rounded-md border border-gray-300 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-pulse" />
        <div className="w-32 sm:w-40 h-11 rounded-md border border-gray-300 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-pulse" />
      </div>
      <div className="my-6 h-px bg-gray-200" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[440px] overflow-hidden">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={`brand-tab-skeleton-${index}`}
            className="h-12 rounded-md border border-gray-200 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
