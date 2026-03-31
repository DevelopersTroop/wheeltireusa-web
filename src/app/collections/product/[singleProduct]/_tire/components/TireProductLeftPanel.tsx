"use client";

import { useState } from "react";
import Image from "next/image";
import { TTireProduct } from "@/types/product";
import { getProductThumbnail } from "@/utils/product";
import { MdOutlineArrowForwardIos, MdFavoriteBorder, MdFavorite } from "react-icons/md";

interface TireProductLeftPanelProps {
  product: TTireProduct;
  thumbs: Array<{ id: number; label: string; image: string }>;
  activeThumb: number;
  setActiveThumb: (id: number) => void;
}

const TireProductLeftPanel = ({ product, thumbs, activeThumb, setActiveThumb }: TireProductLeftPanelProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const brandName = product?.brand || "BRAND";
  const isEVTire = product?.tireType?.toString().toLowerCase().includes('ev') ||
                   String(product?.category || "").toLowerCase().includes('ev') ||
                   product?.title?.toLowerCase().includes('ev');

  // Get current image to display
  const currentImage = thumbs[activeThumb]?.image || getProductThumbnail(product) || "/tire-not-available.png";

  // Navigate images
  const nextImage = () => {
    const nextIndex = (activeThumb + 1) % thumbs.length;
    setActiveThumb(nextIndex);
  };

  return (
    <div className="bg-gray-50 p-6 sm:p-8 flex flex-col gap-5">

      {/* Brand + EV Badge */}
      <div className="flex items-start gap-3">
        <div
          className="leading-[1.1] uppercase text-gray-900"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          <div className="text-2xl font-semibold">{brandName}</div>
          <div className="text-2xl font-extrabold">TIRES</div>
        </div>
        {isEVTire && (
          <span className="w-9 h-9 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center tracking-wide shrink-0 mt-0.5">
            EV
          </span>
        )}
      </div>

      {/* Main Image Stage */}
      <div className="relative flex items-center justify-center py-4">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 bg-gradient-to-r from-transparent via-green-500/20 to-transparentrounded pointer-events-none -rotate-4" />

        {/* Main Image */}
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 z-10">
          <img
            src={currentImage}
            alt={product?.title || "Tire"}
            className="w-full h-full object-contain drop-shadow-[4px_10px_18px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/tire-not-available.png";
            }}
          />

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <MdFavorite className="w-4 h-4 text-red-500" />
            ) : (
              <MdFavoriteBorder className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>

        {/* Next Image Button */}
        {thumbs.length > 1 && (
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-20"
          >
            <MdOutlineArrowForwardIos className="w-4 h-4 text-gray-700" />
          </button>
        )}
      </div>

      <p className="text-[10px] text-gray-400 text-center -mt-3">
        Rims not included with purchase of tires
      </p>

      {/* Thumbnails */}
      {thumbs.length > 1 && (
        <div className="flex gap-2.5 justify-center">
          {thumbs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveThumb(t.id)}
              aria-label={t.label}
              className={[
                "w-14 h-14 rounded-lg border-2 bg-white flex items-center justify-center transition-all shadow-sm overflow-hidden",
                activeThumb === t.id ? "border-gray-900" : "border-transparent hover:border-gray-300",
              ].join(" ")}
            >
              <img
                src={t.image}
                alt={t.label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/tire-not-available.png";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TireProductLeftPanel;
