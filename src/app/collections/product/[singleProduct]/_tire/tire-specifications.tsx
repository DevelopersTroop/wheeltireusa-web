'use client';

import { camelCaseToWords } from "@/utils/string";
import { TTireProduct } from "@/types/product";
import { useState } from "react";

const tire_specs_key: (keyof TTireProduct)[] = [
  "tireSize",
  "tireWidth",
  "tireRatio",
  "tireDiameter",
  "speedRating",
  "loadIndex",
  "loadRange",
  "ply",
  "tireClass",
  "tireType",
  "runFlat",
  "MSRating",
  "treadDepthIn",
  "treadDepthMm",
  "maxAirPressurePsi",
  "utqg",
  "sidewall",
  "revsPerMile",
];

const TireSpecifications = ({ product }: { product: TTireProduct }) => {
  return (
    <div className="w-full">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-600">
          Specifications
        </h2>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
        {/* Header row */}
        <div className="grid grid-cols-3 bg-[#111111] px-4 py-2.5">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Spec</span>
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{product.brand} Front</span>
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{product.brand} Rear</span>
        </div>

        {/* Brand */}
        <div className="grid grid-cols-3 px-4 py-3 bg-gray-50">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider self-center">Brand</span>
          <span className="text-sm font-semibold text-gray-800 col-span-2">{product?.brand}</span>
        </div>

        {/* Model */}
        <div className="grid grid-cols-3 px-4 py-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider self-center">Model</span>
          <span className="text-sm font-semibold text-gray-800 col-span-2">{product?.model}</span>
        </div>

        {/* Dynamic specs */}
        {tire_specs_key.map((key, i) => {
          const value = product[key];
          if (value == null || value === "") return null;
          return (
            <div
              key={key}
              className={`grid grid-cols-3 px-4 py-3 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider self-center">
                {camelCaseToWords(key)}
              </span>
              <span className="text-sm text-gray-800 font-medium">{String(value)}</span>
              <span className="text-sm text-gray-800 font-medium">{String(value)}</span>
            </div>
          );
        })}
      </div>

      {/* Info cards below specs */}
      <div className="mt-6 rounded-xl border border-gray-200 p-5 bg-gray-50">
        <h3 className="text-base font-bold text-gray-900 mb-1">
          Not seeing your size or finish?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          We offer fully customizable options for this tire — available in multiple sizes and configurations to perfectly fit your vehicle.
        </p>
        <button className="bg-primary hover:bg-[#ea6c0a] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
          Build Your Custom Tire
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 bg-white">
          <span className="text-2xl">🔧</span>
          <p className="text-sm text-gray-600 font-medium">
            Free mount and balance with tire and wheel packages
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 bg-white">
          <span className="text-2xl">📦</span>
          <p className="text-sm text-gray-600 font-medium">
            Allow 7–14 days to process orders. Express 5–7 day transit available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TireSpecifications;
