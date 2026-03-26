'use client';

import { TWheelProduct } from "@/types/product";
import React, { useContext } from "react";
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

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-lg lg:hidden">

      <div className="flex items-center justify-between px-4 py-3 gap-3">

        {/* Price */}
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900">
            ${totalPrice}
          </span>
          <span className="text-xs text-gray-500">
            {quantity} × ${price}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="flex-1 flex items-center justify-center bg-primary hover:bg-red-600 text-white font-bold py-3 rounded-lg uppercase text-sm disabled:opacity-60 transition-all duration-200"
        >
          {getButtonText()}
        </button>

      </div>
    </div>
  );
};

export default WheelMobileStickyBar;