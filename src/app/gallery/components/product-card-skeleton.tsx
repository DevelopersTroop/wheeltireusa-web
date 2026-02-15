"use client";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-gray-500 animate-pulse rounded w-full max-h-[452px]">
      {/* Title Section */}
      <div className="text-start text-white p-3 space-y-2">
        <div className="h-6 bg-gray-400 rounded w-2/3"></div>
        <div className="h-5 bg-gray-400 rounded w-1/2"></div>
      </div>

      {/* Image Placeholder */}
      <div className="w-[250px] h-[300px] bg-gray-400"></div>

      {/* Info Section */}
      <div className="text-start text-white p-2 space-y-3">
        <div>
          <div className="h-5 bg-gray-400 rounded w-2/3"></div>
        </div>
        <div>
          <div className="h-5 bg-gray-400 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
