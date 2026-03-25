'use client';

import { TTireProduct } from "@/types/product";
import React, { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import store, { useAppDispatch, useTypedSelector } from '@/redux/store';
import { TireContext } from './context/TireProvider';
import { useCartHook } from '@/hooks/useCartHook';
import { addToCart } from '@/redux/features/cartSlice';
import { triggerGaAddToCart } from '@/utils/analytics';
import wait from 'wait';
import { CartData } from '@/types/cart';

const MobileStickyBar = ({ product }: { product: TTireProduct }) => {
  const dispatch = useAppDispatch();
  const { quantity } = useContext(TireContext);
  const { setOpen } = useCartHook();

  const cartProducts = useTypedSelector(
    (state) => state.persisted.cart.products
  );

  const [loading, setLoading] = React.useState(false);

  // ✅ check if already in cart
  const isInCart = Object.values(cartProducts).some(
    (p: any) => p.id === product.id
  );

  // ✅ add to cart (same logic as ActionButtons)
  const addProductToCart = async () => {
    triggerGaAddToCart(product, quantity);

    return new Promise<CartData>((resolve, reject) => {
      try {
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

        setTimeout(() => {
          const updatedProducts = store.getState().persisted.cart.products;

          const addedProduct = Object.values(updatedProducts).find(
            (p: any) => p.id === product.id
          );

          resolve({
            cartSerial: addedProduct?.cartSerial || cartSerial,
            cartPackage: addedProduct?.cartPackage || packageId,
          });
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  };

  // ✅ button click handler
  const handleAddToCart = () => {
    if (isInCart) {
      setOpen();
      return;
    }

    setLoading(true);

    wait(400).then(() => {
      addProductToCart();
      setOpen();

      setTimeout(() => {
        setLoading(false);
      }, 1200);
    });
  };

  // ✅ dynamic button text
  const getButtonText = () => {
    if (loading) return "ADDING...";
    if (isInCart) return "GO TO CART";
    return "ADD TO CART";
  };

  const price = product.sellingPrice ?? 0;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-lg lg:hidden">
      
      <div className="flex items-center justify-between px-4 py-3 gap-3">

        {/* Total Price */}
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900">
            ${(price * quantity).toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">
            {quantity} × ${price}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg uppercase text-sm disabled:opacity-60"
        >
          {getButtonText()}
        </button>

      </div>
    </div>
  );
};

export default MobileStickyBar;