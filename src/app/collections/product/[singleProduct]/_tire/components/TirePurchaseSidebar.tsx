"use client";

import { TTireProduct } from "@/types/product";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { addToCart } from "@/redux/features/cartSlice";
import { useState, useEffect } from "react";
import { useGetReviewsQuery } from "@/redux/apis/reviews";
import { MdStar } from "react-icons/md";

interface TirePurchaseSidebarProps {
  product: TTireProduct;
}

const TirePurchaseSidebar = ({ product }: TirePurchaseSidebarProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [quantity] = useState(4);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);

  const { data } = useGetReviewsQuery(
    { productId: product.id, page: 1 },
    { skip: !product.id }
  );
  const averageRating = data?.average || 0;
  const reviewCount = data?.count || 0;

  const cartProducts = useTypedSelector((state) => state.persisted.cart.products);

  const sellingPrice = product?.sellingPrice ?? 0;
  const originalPrice = sellingPrice * 1.5;
  const discount = Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);

  // Get tire subtitle based on tire type
  const getTireSubtitle = () => {
    if (product?.category) {
      return `${product.category} tire`;
    }
    if (product?.speedRating && product?.loadIndex) {
      return `Passenger tire`;
    }
    return "All Weather Passenger tire";
  };

  // Generate 5 stars
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < Math.round(averageRating) ? "text-orange-500" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  // Check if item is already in cart
  const isInCart = Object.values(cartProducts).some((p: any) => p.id === product.id);

  const handleAddToCart = async () => {
    if (isInCart) {
      return;
    }
    try {
      setLoading(true);
      const packageId = uuidv4();
      const cartSerial = uuidv4();
      dispatch(
        addToCart({
          ...product,
          cartPackage: packageId,
          cartSerial,
          quantity,
          metaData: {},
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-[380px]">
      <div className="lg:sticky lg:top-6">
        {/* Purchase box with parallelogram corners */}
        <div className="bg-white shadow-lg border border-gray-200" style={{
          clipPath: 'polygon(
            12px 0,
            100% 0,
            100% calc(100% - 12px),
            calc(100% - 12px) 100%,
            0 100%,
            0 12px
          )'
        }}>
          {/* Inner padding container */}
          <div className="p-6">

          {/* Title + Rating */}
          <div className="flex justify-between items-start mb-4 gap-4">
            <h2 className="text-2xl font-semibold leading-tight text-gray-900">
              {product?.title || `${product?.brand} ${product?.model}`}
            </h2>

            {product?.id && reviewCount > 0 && (
              <div className="flex items-center gap-1 text-orange-500 text-sm shrink-0">
                {renderStars()}
                <span className="text-gray-600 ml-1">{averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <p className="text-gray-500 text-sm mb-5">
            {getTireSubtitle()}
          </p>

          {/* Tire Size */}
          {product?.tireSize && (
            <div
              className="bg-gray-100 rounded-xl px-4 py-3 mb-5 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => setShowSizeDropdown(!showSizeDropdown)}
            >
              <div>
                <p className="text-xs text-gray-500">Tire size</p>
                <p className="font-semibold text-gray-900">{product.tireSize}</p>
              </div>
              <span className="text-gray-500 text-lg">⌄</span>
            </div>
          )}

          {/* Fitment */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <span className="text-green-500 text-lg">👍</span>
            <span className="text-gray-700">
              Fits the <span className="font-semibold">{product?.title}</span>
            </span>
          </div>

          <hr className="my-4 border-gray-200" />

          {/* Stock + Shipping */}
          <div className="flex items-center gap-3 text-sm mb-3">
            <span className="text-green-600 font-medium">● In stock</span>
            <span className="text-gray-500">• Free 1-day shipping</span>
          </div>

          {/* Discount */}
          {discount > 0 && (
            <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
              {discount}% OFF
            </span>
          )}

          {/* Price + Quantity */}
          <div className="flex justify-between items-center mb-5 gap-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">${sellingPrice.toFixed(2)}</p>
              <p className="text-sm text-gray-400 line-through">
                ${originalPrice.toFixed(2)} / tire
              </p>
            </div>

            {/* Quantity Pill */}
            <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-sm text-gray-700">4 tires</span>
              <span className="text-gray-500">⌄</span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : isInCart ? "Added to cart" : "Add to cart"}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TirePurchaseSidebar;
