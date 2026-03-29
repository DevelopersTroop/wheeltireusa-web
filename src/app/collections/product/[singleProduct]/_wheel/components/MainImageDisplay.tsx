"use client";

import { useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { getProductThumbnail } from "@/utils/product";

interface MainImageDisplayProps {
  product: any;
  fallbackImage: string;
  selectedImage?: string;
}

const MainImageDisplay = ({ product, fallbackImage, selectedImage }: MainImageDisplayProps) => {
  const [currentImage, setCurrentImage] = useState<string>(fallbackImage);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (selectedImage) {
      setCurrentImage(selectedImage);
    } else {
      const mainImage = getProductThumbnail(product);
      setCurrentImage(mainImage || fallbackImage);
    }
  }, [selectedImage, product, fallbackImage]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Could integrate with a favorites/wishlist system
  };

  return (
    <div className="relative w-full">
      {/* Main Image Container */}
      <div className="w-full aspect-square max-w-[450px] mx-auto mt-2 sm:mt-3 md:mt-5 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-gray-100">
        <img
          src={currentImage}
          alt={product?.title || "Wheel"}
          className="w-full h-full object-contain p-3 sm:p-4 md:p-6"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      {/* Favorite Heart Icon */}
      <button
        onClick={toggleFavorite}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <MdFavorite className="w-6 h-6 text-red-500" />
        ) : (
          <MdFavoriteBorder className="w-6 h-6 text-gray-400 hover:text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default MainImageDisplay;
