"use client";
import { ProductCardRating } from "@/components/shared/Reviews/components/ProductCardRating/ProductCardRating";
import { TInventoryItem } from "@/types/product";
import { HeadphonesIcon, Truck } from "lucide-react";
import { addDays, format } from "date-fns";

const AccessoriesCardDescription = ({
  product,
}: {
  product: TInventoryItem;
}) => {
  // Calculate delivery date range
  const deliveryStart = addDays(new Date(), 3);
  const deliveryEnd = addDays(new Date(), 7);
  const deliveryDateRange = `${format(deliveryStart, 'MMM dd')} - ${format(deliveryEnd, 'MMM dd')}`;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/collections/product/${product.slug}`;
  };

  const handleNeedHelp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Open help chat or contact page
    window.open('/contact', '_blank');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Brand Name */}
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {product.brand || 'Premium Brand'}
      </p>

      {/* Product Title */}
      <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
        {product.title}
      </h3>

      {/* Star Rating */}
      <div className="mb-3">
        <ProductCardRating productId={product.id} />
      </div>

      {/* Delivery Info */}
      <div className="mb-3 flex items-start gap-1.5 text-xs text-gray-600">
        <Truck className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <div>
          <p className="font-medium text-gray-900">Free delivery to the lower 48</p>
          <p>as soon as {deliveryDateRange}</p>
        </div>
      </div>

      {/* Price Section */}
      <div className="mt-auto">
        <div className="flex items-baseline gap-2 mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              ${product.sellingPrice?.toFixed(2) ?? 'N/A'}
            </span>
            <span className="text-xs text-gray-500">ea</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 sm:py-2.5 sm:px-4 bg-gray-900 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200"
          >
            <span>Buy Now</span>
          </button>
          <button
            onClick={handleNeedHelp}
            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 sm:py-2.5 sm:px-4 bg-transparent text-gray-900 text-xs sm:text-sm font-semibold rounded-xl border-2 border-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            <HeadphonesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Need Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessoriesCardDescription;
