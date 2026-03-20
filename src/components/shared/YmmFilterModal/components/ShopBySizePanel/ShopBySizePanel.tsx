"use client";

import { cn } from "@/lib/utils";
import useYmmFilterModal from "../../context/useYmmFilterModal";
import WheelsSizeFlow from "./WheelsSizeFlow";
import TireSizeFlow from "./TireSizeFlow";

export default function ShopBySizePanel() {
  const { sizeCategory, setSizeCategory } = useYmmFilterModal();

  return (
    <div className="pt-2">
      <div className="mx-auto flex justify-center gap-3 sm:gap-4 mb-6">
        <button
          type="button"
          onClick={() => setSizeCategory("tire")}
          className={cn(
            "w-32 sm:w-40 py-2.5 rounded-md border text-base sm:text-lg font-bold transition-colors",
            sizeCategory === "tire"
              ? "border-primary bg-primary text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary"
          )}
        >
          Tires
        </button>
        <button
          type="button"
          onClick={() => setSizeCategory("wheels")}
          className={cn(
            "w-32 sm:w-40 py-2.5 rounded-md border text-base sm:text-lg font-bold transition-colors",
            sizeCategory === "wheels"
              ? "border-primary bg-primary text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary"
          )}
        >
          Wheels
        </button>
      </div>
      <div className="my-6 h-px bg-gray-200" />
      
      {sizeCategory === "wheels" ? (
        <WheelsSizeFlow />
      ) : (
        <TireSizeFlow />
      )}
    </div>
  );
}
