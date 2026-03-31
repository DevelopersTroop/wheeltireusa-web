"use client";

import { TTireProduct } from "@/types/product";
import { useState } from "react";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { addToCart } from "@/redux/features/cartSlice";
import { v4 as uuidv4 } from "uuid";
import { useCartHook } from "@/hooks/useCartHook";
import { MdExpandMore } from "react-icons/md";

interface TirePurchaseSectionProps {
  product: TTireProduct;
}

const TirePurchaseSection = ({ product }: TirePurchaseSectionProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(4); // Default to set of 4
  const [showQuantityDropdown, setShowQuantityDropdown] = useState(false);
  const { setOpen } = useCartHook();

  const cartProducts = useTypedSelector((state) => state.persisted.cart.products);

  // Check if item is already in cart
  const isInCart = Object.values(cartProducts).some((p: any) => p.id === product.id);

  // Calculate total price
  const sellingPrice = product?.sellingPrice ?? 0;
  const totalPrice = sellingPrice * quantity;

  // Quantity options
  const quantityOptions = [1, 2, 3, 4, 8, 12];

  // Add to cart
  const handleAddToCart = async () => {
    if (isInCart) {
      setOpen();
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
      // Open cart slider
      setOpen();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity Selector */}
      <div className="relative">
        <button
          onClick={() => setShowQuantityDropdown(!showQuantityDropdown)}
          className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 hover:border-gray-400 transition-colors"
        >
          <span className="text-sm text-gray-600">
            {quantity} {quantity === 1 ? 'tire' : 'tires'}
          </span>
          <MdExpandMore className={`w-5 h-5 text-gray-400 transition-transform ${showQuantityDropdown ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown */}
        {showQuantityDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {quantityOptions.map((qty) => (
              <button
                key={qty}
                onClick={() => {
                  setQuantity(qty);
                  setShowQuantityDropdown(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {qty} {qty === 1 ? 'tire' : 'tires'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="
          w-full py-3 sm:py-4 px-6 rounded-lg
          bg-[#f97316] hover:bg-[#ea680a] text-white
          text-base sm:text-lg font-semibold uppercase tracking-wide
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? "Adding..." : isInCart ? "Go to Cart" : "Add to cart"}
      </button>

      {/* Total Price Display */}
      <p className="text-center text-sm text-gray-600">
        Total: <span className="font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default TirePurchaseSection;
