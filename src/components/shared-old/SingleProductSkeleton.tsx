export const SingleProductSkeleton = () => {
  return (
    <div className="container mx-auto px-0 sm:px-4 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="py-4">
        <div className="flex gap-2 text-sm text-gray-400">
          <div className="h-4 w-16 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
          <div className="h-4 w-12 bg-gray-300 rounded" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6 flex w-full flex-col gap-4 lg:mt-3 mb-10 lg:flex-row lg:gap-8">
        {/* Left side (ImageGallery + Description) */}
        <div className="flex w-full flex-col lg:w-4/6">
          {/* Image Gallery Skeleton */}
          <div className="w-full grid grid-cols-12 px-4 pb-12 pt-6 gap-y-4">
            <div className="col-span-12 md:col-span-8 h-[400px] bg-gray-300 rounded" />
            <div className="md:col-span-2" />
            <div className="col-span-12 md:col-span-2 flex md:flex-col gap-2 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[80px] h-[80px] bg-gray-300 rounded"
                />
              ))}
            </div>
          </div>

          {/* Tire Description Skeleton */}
          <div className="bg-[#F7F7F7] p-4 rounded space-y-4">
            <div className="flex gap-4 text-sm">
              {['Description', 'Specifications', 'Reviews'].map((tab, i) => (
                <div key={i} className="h-4 w-24 bg-gray-300 rounded" />
              ))}
            </div>
            <div className="space-y-4 mt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded w-full" />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-white rounded space-y-2 border border-gray-200"
                >
                  <div className="h-4 w-1/3 bg-gray-300 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side (Tire Details Skeleton) */}
        <div className="mt-6 w-full lg:mt-0 lg:w-2/6">
          <div className="bg-[#F7F7F7] rounded-lg py-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-4">
                <div className="h-4 w-32 bg-gray-300 rounded mb-2" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 2 }).map((_, j) => (
                    <div
                      key={j}
                      className="w-[calc(50%-4px)] h-[70px] bg-white rounded border border-gray-200 p-2"
                    >
                      <div className="h-3 w-1/2 bg-gray-300 rounded mb-1" />
                      <div className="h-4 w-2/3 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="px-4">
              <div className="h-10 bg-gray-300 rounded w-full mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
