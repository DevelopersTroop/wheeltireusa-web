"use client";
import { ProductCardRating } from "@/components/shared/Reviews/components/ProductCardRating/ProductCardRating";
import { TInventoryItem } from "@/types/product";
import { HeadphonesIcon, Truck } from "lucide-react";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";

const AccessoriesCardDescription = ({
  product,
}: {
  product: TInventoryItem;
}) => {
  const router = useRouter();

  // Delivery range
  const deliveryStart = addDays(new Date(), 3);
  const deliveryEnd = addDays(new Date(), 7);
  const deliveryDateRange = `${format(deliveryStart, "MMM dd")} - ${format(
    deliveryEnd,
    "MMM dd"
  )}`;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/collections/product/${product.slug}`);
  };

  const handleNeedHelp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/contact");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {product.brand || "Premium Brand"}
      </p>

      {/* Title */}
      <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug">
        {product.title}
      </h3>

      {/* Rating */}
      <div className="mb-2">
        <ProductCardRating productId={product.id} />
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 mb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            ${product.sellingPrice?.toFixed(2) ?? "N/A"}
          </span>
          <span className="text-xs text-gray-500">each</span>
        </div>
      </div>

      {/* Optional Promo (matches wheel style) */}
      <div className="mb-2 flex items-center gap-1 text-xs font-medium text-gray-600 px-2 py-1.5 rounded-lg">
        <span>Premium quality accessory</span>
      </div>

      {/* Delivery (MATCHED STYLE ✅) */}
      <div className="hidden sm:flex mb-4 items-center gap-1.5 text-xs rounded-lg px-2 bg-green-50 text-green-700">
        <Truck className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <div>
          <p className="font-medium">Free delivery to the lower 48</p>
          <p>as soon as {deliveryDateRange}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleBuyNow}
          className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 sm:py-2.5 sm:px-4 bg-gray-900 text-white text-xs sm:text-sm font-semibold rounded hover:bg-gray-800 transition-all duration-200"
        >
          <span>Buy Now</span>
        </button>

        
      </div>
    </div>
  );
};

export default AccessoriesCardDescription;