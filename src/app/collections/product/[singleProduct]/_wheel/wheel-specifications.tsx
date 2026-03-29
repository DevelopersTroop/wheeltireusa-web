'use client';

import { camelCaseToWords } from "@/utils/string";
import { TWheelProduct } from "@/types/product";

const wheel_specs_key: (keyof TWheelProduct)[] = [
  "wheelSize", "wheelDiameter", "wheelWidth", "wheelStyle",
  "wheelStructure", "wheelMaterial", "wheelSpokeNumber", "wheelExposedLugs",
  "trueDirectional", "boltPatterns", "offset", "backspacing",
  "centerBore", "color", "weight", "maxLoadLbs",
  "maxLoadKg", "raw_size",
];

const mobile_specs_key: (keyof TWheelProduct)[] = [
  "wheelSize",
  "wheelWidth",
  "offset",
];

// reusable formatter
const formatValue = (value: any) => {
  if (value == null || value === "") return null;
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

const WheelSpecifications = ({
  product,
  variant,
}: {
  product: TWheelProduct;
  variant: "compact" | "full";
}) => {

  /* ───────── COMPACT (MOBILE TOP) ───────── */
  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-1 sm:gap-1.5 text-xs sm:text-sm">

        {/* Brand */}
        <div className="flex justify-between">
          <span className="text-gray-500 text-[11px] sm:text-xs">Brand</span>
          <span className="font-medium text-gray-800 text-[11px] sm:text-xs">{product?.brand}</span>
        </div>

        {/* Model */}
        <div className="flex justify-between">
          <span className="text-gray-500 text-[11px] sm:text-xs">Model</span>
          <span className="font-medium text-gray-800 text-[11px] sm:text-xs">{product?.model}</span>
        </div>

        {mobile_specs_key.map((key) => {
          const displayValue = formatValue(product[key]);
          if (!displayValue) return null;

          return (
            <div key={key} className="flex justify-between">
              <span className="text-gray-500 text-[11px] sm:text-xs">{camelCaseToWords(key)}</span>
              <span className="font-medium text-gray-800 text-[11px] sm:text-xs">{displayValue}</span>
            </div>
          );
        })}
      </div>
    );
  }

  /* ───────── FULL (TABLE VIEW) ───────── */
  return (
    <div className="w-full">

      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-gray-600">
          Specifications
        </h2>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <div className="rounded border border-gray-200 overflow-hidden divide-y divide-gray-100">

        {/* Header */}
        <div className="grid grid-cols-2 bg-[#111111] px-4 sm:px-6 md:px-10 py-2 sm:py-2.5">
          <span className="text-[10px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider">
            Spec
          </span>
        </div>

        {/* Brand */}
        <div className="grid grid-cols-2 px-4 sm:px-6 md:px-10 py-2 sm:py-3 bg-gray-50">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Brand
          </span>
          <span className="text-xs sm:text-sm font-semibold text-gray-800 text-right">
            {product?.brand}
          </span>
        </div>

        {/* Model */}
        <div className="grid grid-cols-2 px-4 sm:px-6 md:px-10 py-2 sm:py-3">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Model
          </span>
          <span className="text-xs sm:text-sm font-semibold text-gray-800 text-right">
            {product?.model}
          </span>
        </div>

        {wheel_specs_key.map((key, i) => {
          const displayValue = formatValue(product[key]);
          if (!displayValue) return null;

          return (
            <div
              key={key}
              className={`grid grid-cols-2 px-4 sm:px-6 md:px-10 py-2 sm:py-3 ${
                i % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {camelCaseToWords(key)}
              </span>
              <span className="text-xs sm:text-sm text-gray-800 font-medium text-right">
                {displayValue}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default WheelSpecifications;