"use client";

import { TTireProduct } from "@/types/product";
import { useGetReviewsQuery } from "@/redux/apis/reviews";
import { useTypedSelector } from "@/redux/store";
import { MdStar, MdInfo } from "react-icons/md";
import { TbPhone } from "react-icons/tb";
import DealerBadge from "./DealerBadge";

interface TireProductInfoCenterProps {
  product: TTireProduct;
}

const TireProductInfoCenter = ({ product }: TireProductInfoCenterProps) => {
  const { data } = useGetReviewsQuery(
    { productId: product.id, page: 1 },
    { skip: !product.id }
  );

  // Get active garage vehicle for fitment info
  const garage = useTypedSelector((state) => state.persisted.yearMakeModel.garage);
  const activeGarageId = useTypedSelector((state) => state.persisted.yearMakeModel.activeGarageId);
  const activeGarageItem = activeGarageId ? garage?.[activeGarageId] : undefined;

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
        {product?.title || `${product?.brand} ${product?.model}`}
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

      {/* Vehicle Fitment Note */}
      {activeGarageItem ? (
        <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-start gap-2 sm:gap-3">
            {/* Blue Info Icon */}
            <MdInfo className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base text-gray-700 font-medium mb-1.5 sm:mb-2">
                Vehicle Specific
              </p>

              {/* Bullet Points */}
              <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-gray-600">
                {product?.tireSize && (
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
                    <span>Size: {product.tireSize}</span>
                  </li>
                )}
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
                  <span>Fits: {activeGarageItem.year} {activeGarageItem.make} {activeGarageItem.model}
                    {activeGarageItem.trim && activeGarageItem.trim !== "__DEFAULT_TRIM__" && ` ${activeGarageItem.trim}`}
                  </span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
                  <span>Fitment guaranteed when purchased as a set</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-start gap-2 sm:gap-3">
            {/* Blue Info Icon */}
            <MdInfo className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base text-gray-700 font-medium mb-1.5 sm:mb-2">
                Vehicle Specific
              </p>

              {/* Bullet Points */}
              <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-gray-600">
                {product?.tireSize && (
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
                    <span>Size: {product.tireSize}</span>
                  </li>
                )}
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
                  <span>Select your vehicle to verify fitment</span>
                </li>
                <li className="flex items-start gap-1.5 sm:gap-2">
                  <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
                  <span>Fitment guaranteed when purchased as a set</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Key-Value Pairs - Product Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-4 gap-y-2 text-xs">
        {/* Tire Size */}
        {product?.tireSize && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Size:</span>
            <span className="text-gray-700 font-semibold">{product.tireSize}</span>
          </div>
        )}

        {/* Tire Type */}
        {product?.tireType && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Type:</span>
            <span className="text-gray-700 font-semibold">{product.tireType}</span>
          </div>
        )}

        {/* Speed Rating */}
        {product?.speedRating && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Speed Rating:</span>
            <span className="text-gray-700 font-semibold">{product.speedRating}</span>
          </div>
        )}

        {/* Load Index */}
        {product?.loadIndex && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Load Index:</span>
            <span className="text-gray-700 font-semibold">{product.loadIndex}</span>
          </div>
        )}

        {/* UTQG Rating */}
        {product?.utqg && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">UTQG:</span>
            <span className="text-gray-700 font-semibold">{product.utqg}</span>
          </div>
        )}

        {/* Load Range */}
        {product?.loadRange && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Load Range:</span>
            <span className="text-gray-700 font-semibold">{product.loadRange}</span>
          </div>
        )}

        {/* Sidewall */}
        {product?.sidewall && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Sidewall:</span>
            <span className="text-gray-700 font-semibold">{product.sidewall}</span>
          </div>
        )}

        {/* Tire Class */}
        {product?.tireClass && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Class:</span>
            <span className="text-gray-700 font-semibold">{product.tireClass}</span>
          </div>
        )}
      </div>

      

      {/* Phone Support */}
      <div className="rounded-lg -ml-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
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
    </div>
  );
};

export default TireProductInfoCenter;
