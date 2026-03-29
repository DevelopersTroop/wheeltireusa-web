"use client";

import { TWheelProduct } from "@/types/product";
import { useGetReviewsQuery } from "@/redux/apis/reviews";
import { MdStar } from "react-icons/md";
import DealerBadge from "./DealerBadge";
import VehicleSpecificNote from "./VehicleSpecificNote";
import VideosButton from "./VideosButton";
import { TbPhone } from "react-icons/tb";

interface ProductInfoCenterProps {
  product: TWheelProduct;
}

const ProductInfoCenter = ({ product }: ProductInfoCenterProps) => {
  const { data } = useGetReviewsQuery(
    { productId: product.id, page: 1 },
    { skip: !product.id }
  );

  const averageRating = data?.average || 0;
  const reviewCount = data?.count || 0;

  // Generate 5 stars
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <MdStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.round(averageRating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Product Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
        {product?.title || `${product?.brand} - ${product?.model}`}
      </h1>

      {/* Rating and Reviews - 5 Stars + Review Count */}
      {product?.id && reviewCount > 0 && (
        <div className="flex items-center gap-2">
          {/* 5 Stars */}
          <div className="flex items-center gap-0.5">
            {renderStars()}
          </div>

          {/* Review Count */}
          <span className="text-sm text-gray-500">
            {reviewCount} reviews
          </span>
        </div>
      )}

      {/* Item Number */}
      {product?.partNumber && (
        <p className="text-sm text-gray-500 font-medium">
          Item # {product.partNumber}
        </p>
      )}

      {/* Vehicle Specific Note */}
      <VehicleSpecificNote product={product} />

      {/* Key-Value Pairs - Product Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {/* Size */}
        {product?.wheelSize && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Size:</span>
            <span className="text-gray-700 font-semibold">{product.wheelSize}</span>
          </div>
        )}

        {/* Bolt Pattern */}
        {product?.boltPatterns && product.boltPatterns.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Bolt Pattern:</span>
            <span className="text-gray-700 font-semibold">{product.boltPatterns[0]}</span>
          </div>
        )}

        {/* Color/Finish */}
        {product?.color && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Finish:</span>
            <span className="text-gray-700 font-semibold">{product.color}</span>
          </div>
        )}

        {/* Offset */}
        {product?.offset && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Offset:</span>
            <span className="text-gray-700 font-semibold">{product.offset}mm</span>
          </div>
        )}

        {/* Style */}
        {product?.wheelStyle && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Style:</span>
            <span className="text-gray-700 font-semibold">{product.wheelStyle}</span>
          </div>
        )}

        {/* Material */}
        {product?.wheelMaterial && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Material:</span>
            <span className="text-gray-700 font-semibold">{product.wheelMaterial}</span>
          </div>
        )}

        {/* Spoke Number */}
        {product?.wheelSpokeNumber && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Spokes:</span>
            <span className="text-gray-700 font-semibold">{product.wheelSpokeNumber}</span>
          </div>
        )}

        {/* Center Bore */}
        {product?.centerBore && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Center Bore:</span>
            <span className="text-gray-700 font-semibold">{product.centerBore}</span>
          </div>
        )}
      </div>

      {/* Phone Support */}
      <div className="rounded-lg -ml-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8   flex items-center justify-center shrink-0">
            <TbPhone className="w-4 h-4 text-primary" />
          </div>
          <div className="flex justify-between gap-2 items-center">
            <p className="text-xs text-gray-500">Questions? Call</p>
            <a
              href="tel:+18138125257"
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              +1 (813) 812-5257
            </a>
          </div>
        </div>
      </div>

      {/* Dealer Badge */}
      <DealerBadge product={product} />

      {/* Videos Button */}
      {product?.id && (
        <VideosButton productId={product.id} />
      )}
    </div>
  );
};

export default ProductInfoCenter;
