"use client";

import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/store";
import { setActiveGarage } from "@/redux/features/yearMakeModelSlice";
import { useRouter } from "next/navigation";
import useYmmFilterModal from "../../context/useYmmFilterModal";

export default function ShopByBrandPanel() {
  const {
    brandCategory,
    setBrandCategory,
    brands,
    isBrandsLoading,
    closeModal,
  } = useYmmFilterModal();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleBrandClick = (brandName: string) => {
    dispatch(setActiveGarage(null));
    closeModal();
    const categoryPath = brandCategory === "tire" ? "tires" : "wheels";
    router.push(`/collections/product-category/${categoryPath}?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="pt-2">
      <div className="mx-auto flex justify-center gap-3 sm:gap-4 mb-6">
        <button
          type="button"
          onClick={() => setBrandCategory("tire")}
          className={cn(
            "w-32 sm:w-40 py-2.5 rounded-md border text-base sm:text-lg font-bold transition-colors",
            brandCategory === "tire"
              ? "border-primary bg-primary text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary"
          )}
        >
          Tires
        </button>
        <button
          type="button"
          onClick={() => setBrandCategory("wheels")}
          className={cn(
            "w-32 sm:w-40 py-2.5 rounded-md border text-base sm:text-lg font-bold transition-colors",
            brandCategory === "wheels"
              ? "border-primary bg-primary text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary"
          )}
        >
          Wheels
        </button>
      </div>
      <div className="my-6 h-px bg-gray-200" />
      {isBrandsLoading ? (
        <BrandListSkeleton />
      ) : brands.length === 0 ? (
        <div className="h-[440px] rounded-md border border-gray-300 flex items-center justify-center text-lg font-semibold text-gray-600">
          No brands available right now.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pb-4">
          {brands.map((brand) => {
            const brandText = brand.toLowerCase().includes("tire") || brand.toLowerCase().includes("wheel")
              ? brand
              : `${brand} ${brandCategory === "tire" ? "Tires" : "Wheels"}`;
            return (
              <button
                key={brand}
                type="button"
                onClick={() => handleBrandClick(brand)}
                className="py-3 px-2 rounded-md border border-gray-300 bg-white text-center text-sm sm:text-base font-bold text-gray-800 transition-colors hover:border-primary hover:text-primary"
              >
                {brandText}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BrandListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-hidden pb-4">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={`brand-skeleton-${index}`}
          className="h-12 rounded-md border border-gray-200 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-pulse"
        />
      ))}
    </div>
  );
}
