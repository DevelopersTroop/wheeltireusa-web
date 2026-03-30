"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useGetFilterListQuery } from "@/redux/apis/product";
import { useAppDispatch } from "@/redux/store";
import { setActiveGarage } from "@/redux/features/yearMakeModelSlice";
import { useRouter } from "next/navigation";

export default function BrandTab() {
  const [category, setCategory] = useState<"tire" | "wheels">("tire");
  const [brand, setBrand] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<"category" | "brand" | null>(null);

  const { data: filterData, isLoading: isBrandsLoading, isFetching: isBrandsFetching } = useGetFilterListQuery(
    { category },
    { skip: false }
  );

  const brands = (!isBrandsLoading && !isBrandsFetching && filterData?.filters?.brand)
    ? (filterData.filters.brand as { value: string }[]).map((item) => item.value.toString().trim())
    : [];

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Reset brand when category changes
  useEffect(() => {
    setBrand(null);
  }, [category]);

  const handleSubmit = () => {
    if (!brand) return;
    dispatch(setActiveGarage(null));
    const categoryPath = category === "tire" ? "tires" : "wheels";
    router.push(`/collections/product-category/${categoryPath}?brand=${encodeURIComponent(brand)}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {/* Category Select */}
      <div className="flex-1">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
            className={cn(
              "w-full bg-white flex items-center justify-between shadow-none ring-0 focus:ring-0 appearance-none h-14 relative rounded-sm transition-colors",
              "text-gray-600 uppercase text-xs font-semibold px-3 py-2.5",
              openDropdown === "category"
                ? "border border-primary ring-1 ring-primary z-10"
                : "border border-gray-300 hover:border-primary"
            )}
          >
            <span className="absolute -top-2 left-2 px-1 bg-white text-xs font-semibold text-gray-700">
              Category
            </span>
            <span className="truncate uppercase">{category}</span>
            <svg
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform shrink-0",
                openDropdown === "category" && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openDropdown === "category" && (
            <div className="absolute left-0 top-full mt-1 w-full z-50 rounded-md border bg-white shadow-lg overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  setCategory("tire");
                  setOpenDropdown(null);
                }}
                className={cn(
                  "w-full text-left px-3 py-3 text-sm transition-colors hover:bg-primary/10",
                  category === "tire" && "text-primary font-bold bg-primary/5"
                )}
              >
                Tire
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory("wheels");
                  setOpenDropdown(null);
                }}
                className={cn(
                  "w-full text-left px-3 py-3 text-sm transition-colors hover:bg-primary/10",
                  category === "wheels" && "text-primary font-bold bg-primary/5"
                )}
              >
                Wheels
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Brand Select */}
      <div className="flex-1">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
            disabled={isBrandsLoading || isBrandsFetching}
            className={cn(
              "w-full bg-white flex items-center justify-between shadow-none ring-0 focus:ring-0 appearance-none h-14 relative rounded-sm transition-colors",
              "text-gray-600 uppercase text-xs font-semibold px-3 py-2.5",
              openDropdown === "brand"
                ? "border border-primary ring-1 ring-primary z-10"
                : "border border-gray-300 hover:border-primary",
              (isBrandsLoading || isBrandsFetching) && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="absolute -top-2 left-2 px-1 bg-white text-xs font-semibold text-gray-700">
              Brand
              <span className="text-red-600 ml-0.5">*</span>
            </span>
            <span className="truncate">
              {(isBrandsLoading || isBrandsFetching) ? "Loading..." : brand || "Select Brand"}
            </span>
            <svg
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform shrink-0",
                openDropdown === "brand" && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openDropdown === "brand" && (
            <div className="absolute left-0 top-full mt-1 w-full z-50 rounded-md border bg-white shadow-lg overflow-y-auto custom-scrollbar max-h-[250px]">
              {brands.length === 0 ? (
                <div className="px-3 py-4 text-sm text-gray-500 text-center">No brands available</div>
              ) : (
                brands.map((brandName) => (
                  <button
                    key={brandName}
                    type="button"
                    onClick={() => {
                      setBrand(brandName);
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2.5 text-sm transition-colors hover:bg-primary/10",
                      brand === brandName && "text-primary font-bold bg-primary/5"
                    )}
                  >
                    {brandName}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="lg:w-32 shrink-0">
        <button
          onClick={handleSubmit}
          disabled={!brand}
          className={cn(
            "w-full h-14 text-white font-bold text-lg uppercase rounded shadow flex items-center justify-center transition-opacity",
            !brand ? "bg-primary/50 cursor-not-allowed opacity-80" : "bg-primary hover:bg-primary/90"
          )}
        >
          GO
        </button>
      </div>
    </div>
  );
}
