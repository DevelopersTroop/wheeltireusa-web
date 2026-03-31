"use client";

import { TTireProduct } from "@/types/product";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Image from "next/image";
import { TireSVG, ThumbSVG } from "./TireSVG";

interface LeftPanelProps {
  product: TTireProduct;
  thumbs: Array<{ id: number; label: string; image: string }>;
  activeThumb: number;
  setActiveThumb: (id: number) => void;
}

const LeftPanel = ({ product, thumbs, activeThumb, setActiveThumb }: LeftPanelProps) => {
  return (
    <div className="bg-gray-50 p-6 sm:p-8 flex flex-col gap-5">

      {/* Brand + EV Badge */}
      <div className="flex items-start gap-3">
        <div
          className="leading-[1.1] uppercase text-gray-900"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          <div className="text-2xl font-semibold">{product?.brand || 'BRAND'}</div>
          <div className="text-2xl font-extrabold">TIRES</div>
        </div>
        {(product?.tireType?.toLowerCase().includes('ev') || product?.category?.toLowerCase().includes('ev')) && (
          <span className="w-9 h-9 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center tracking-wide shrink-0 mt-0.5">
            EV
          </span>
        )}
      </div>

      {/* Main Image Stage */}
      <div className="relative flex items-center justify-center py-4">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 bg-gradient-to-r from-transparent via-green-400/20 to-transparent rounded pointer-events-none" />
        <TireSVG className="w-40 h-40 sm:w-52 sm:h-52 relative z-10 drop-shadow-[4px_10px_18px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:scale-105 hover:-rotate-2 cursor-pointer" />
        <button
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-20"
        >
          <MdOutlineArrowForwardIos className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <p className="text-[10px] text-gray-400 text-center -mt-3">
        Rims not included with purchase of tires
      </p>

      {/* Thumbnails */}
      <div className="flex gap-2.5 justify-center">
        {thumbs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveThumb(t.id)}
            aria-label={t.label}
            className={`w-14 h-14 rounded-lg border-2 bg-white flex items-center justify-center transition-all shadow-sm overflow-hidden ${
              activeThumb === t.id ? "border-gray-900" : "border-transparent hover:border-gray-300"
            }`}
          >
            <ThumbSVG id={t.id} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;
