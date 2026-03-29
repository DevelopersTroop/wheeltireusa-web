'use client';

import { TWheelProduct } from "@/types/product";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { WheelContext } from './context/WheelProvider';
import { useCartHook } from '@/hooks/useCartHook';
import { addToCart } from '@/redux/features/cartSlice';
import { triggerGaAddToCart } from '@/utils/analytics';
import { CartData } from '@/types/cart';

const WheelMobileStickyBar = ({ product }: { product: TWheelProduct }) => {
  const dispatch = useAppDispatch();
  const { quantity } = useContext(WheelContext);
  const { setOpen } = useCartHook();

  const cartProducts = useTypedSelector(
    (state) => state.persisted.cart.products
  );

  const [loading, setLoading] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide sticky bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ check if already in cart
  const isInCart = Object.values(cartProducts).some(
    (p: any) => p.id === product.id
  );

  // ✅ clean add to cart
  const addProductToCart = async (): Promise<CartData> => {
    triggerGaAddToCart(product, quantity);

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

    return {
      cartSerial,
      cartPackage: packageId,
    };
  };

  // ✅ better handler (no wait, no timeout hacks)
  const handleAddToCart = async () => {
    if (isInCart) {
      setOpen();
      return;
    }

    try {
      setLoading(true);
      await addProductToCart();
      setOpen();
    } finally {
      setLoading(false);
    }
  };

  // ✅ dynamic button text
  const getButtonText = () => {
    if (loading) return "ADDING...";
    if (isInCart) return "GO TO CART";
    return "ADD TO CART";
  };

  const price = product.sellingPrice ?? 0;
  const totalPrice = (price * quantity).toFixed(2);
  const productImage = product?.itemImage || product?.images?.[0] || "/wheel-not-available.png";

  return (
    <div className={`
      fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-lg
      transition-transform duration-300 ease-in-out
      ${isVisible ? 'translate-y-0' : 'translate-y-full'}
    `}>

      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 gap-2 sm:gap-3">

        {/* Product Image + Title + Price */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {/* Product Thumbnail */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded bg-gray-100 overflow-hidden">
            <img
              src={productImage}
              alt={product?.brand || "Wheel"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col min-w-0">
            <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
              {product?.brand || "Wheel"} {product?.model || ""}
            </h3>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              ${price.toFixed(2)} / ${totalPrice}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-red-600 text-white font-semibold rounded uppercase text-xs sm:text-sm disabled:opacity-60 transition-all duration-200"
        >
          {getButtonText()}
        </button>

      </div>
    </div>
  );
};

export default WheelMobileStickyBar;