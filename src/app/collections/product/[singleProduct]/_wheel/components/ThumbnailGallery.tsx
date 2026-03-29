"use client";

import { useState } from "react";
import { getProductThumbnail } from "@/utils/product";

interface ThumbnailGalleryProps {
  product: any;
  fallbackImage: string;
  onImageSelect: (imageUrl: string) => void;
}

const ThumbnailGallery = ({ product, fallbackImage, onImageSelect }: ThumbnailGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(() => {
    return getProductThumbnail(product) || fallbackImage;
  });

  // Collect all available images
  const images: string[] = [];
  const mainImage = getProductThumbnail(product);
  if (mainImage) images.push(mainImage);

  if (product?.images && Array.isArray(product.images)) {
    product.images.forEach((img: string) => {
      if (img && !images.includes(img)) {
        images.push(img);
      }
    });
  }

  // Ensure we have at least the fallback
  if (images.length === 0) {
    images.push(fallbackImage);
  }

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onImageSelect(imageUrl);
  };

  const handleViewAll = () => {
    // Could open a modal or scroll to a full gallery section
    console.log("View all images clicked");
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-2.5">
      {/* Thumbnails */}
      <div className="flex flex-row lg:flex-col gap-2 sm:gap-2.5 overflow-x-auto lg:overflow-visible scrollbar-hide">
        {images.map((imageUrl, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(imageUrl)}
            className={`
              relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-lg overflow-hidden flex-shrink-0
              transition-all duration-200
              ${selectedImage === imageUrl
                ? "border-2 border-yellow-400 ring-2 ring-yellow-100"
                : "border border-gray-200 hover:border-gray-300"
              }
            `}
          >
            <img
              src={imageUrl}
              alt={`Wheel thumbnail ${index + 1}`}
              className="w-full h-full object-cover bg-white"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
          </button>
        ))}
      </div>

      {/* View All Button */}
      <button
        onClick={handleViewAll}
        className="text-xs text-gray-600 hover:text-gray-900 font-medium transition-colors text-left hidden lg:block"
      >
        View All
      </button>
    </div>
  );
};

export default ThumbnailGallery;
