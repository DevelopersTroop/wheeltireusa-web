'use client';

import store, { useAppDispatch, useTypedSelector } from '@/redux/store';
import { TTireProduct } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';
import React, { useContext } from 'react';
import wait from 'wait';
import QuantityInput from './quantity-input';
import { TireContext } from './context/TireProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { addPackage } from '@/redux/features/packageSlice';
import { triggerGaAddToCart } from '@/utils/analytics';
import { addToCart } from '@/redux/features/cartSlice';
import { CartData } from '@/types/cart';
import { useCartHook } from '@/hooks/useCartHook';
import CompareButton from '@/components/shared/CompareButton/CompareButton';
import { MdOutlineShoppingCart, MdFavoriteBorder, MdSave } from 'react-icons/md';
import { TbArrowsExchange } from 'react-icons/tb';

const ActionButtons = ({ product }: { product: TTireProduct }) => {
  const searchParams = useSearchParams();
  const cartPackage = searchParams.get('cartPackage') as string;
  const packages = useTypedSelector((state) => state.persisted.package);
  const dispatch = useAppDispatch();
  const { quantity } = useContext(TireContext);
  const { setOpen } = useCartHook();
  const wheel = packages[cartPackage]?.wheel;
  const router = useRouter();

  const addProductToCart = async (meta?: any) => {
    triggerGaAddToCart(product, quantity);
    return new Promise<CartData>((resolve, reject) => {
      try {
        const packageId = uuidv4();
        const cartSerial = uuidv4();
        const metaData = meta || {};
        dispatch(addToCart({ ...product, cartPackage: packageId, cartSerial, quantity, metaData }));
        setTimeout(() => {
          const updatedProducts = store.getState().persisted.cart.products;
          const addedProduct = Object.values(updatedProducts).find(
            (p) => p.id === product.id && JSON.stringify(p.metaData) === JSON.stringify(metaData)
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

  const [addToCartText, setAddToCartText] = React.useState('Add To Cart');
  const [loading, setLoading] = React.useState(false);

  const addWheels = () => {
    new Promise<{ cartPackage: string }>((res) => {
      const pkg = uuidv4();
      dispatch(addPackage({ packageId: pkg, tire: { ...product, cartPackage: pkg } }));
      res({ cartPackage: pkg });
    }).then((res) => {
      router.push(
        `/collections/product-category/wheels?tireDiameter=${product.tireDiameter}&cartPackage=${res.cartPackage}`
      );
    });
  };

  const addTires = () => {
    new Promise<{ cartPackage: string }>((res) => {
      dispatch(addPackage({ packageId: cartPackage, tire: { ...product, cartPackage } }));
      res({ cartPackage });
    }).then((res) => {
      router.push(`/wheel-and-tire-package?cartPackage=${res.cartPackage}`);
    });
  };

  return (
    <div className="flex flex-col gap-3">

      {/* Total + quantity row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Total</p>
          <p className="text-xl font-extrabold text-gray-900">
            ${((product?.sellingPrice ?? 0) * quantity).toFixed(2)}
          </p>
        </div>
        <div className="max-w-[130px]">
          <QuantityInput
            product={product}
            inventoryAvailable={20}
            name="quantity"
            id="quantity"
          />
        </div>
      </div>

      {/* Primary CTA: Add to Cart */}
      <button
        onClick={() => {
          setLoading(true);
          setAddToCartText('Adding...');
          wait(400).then(() => {
            addProductToCart();
            setOpen();
            setTimeout(() => {
              setAddToCartText('Add To Cart');
              setLoading(false);
            }, 1200);
          });
        }}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#ea6c0a] active:scale-[0.99] text-white font-bold py-3.5 rounded-xl uppercase tracking-wide text-sm transition-all shadow-md shadow-[#f97316]/20 disabled:opacity-60"
      >
        <MdOutlineShoppingCart className="w-5 h-5" />
        {addToCartText}
      </button>

      {/* Build wheel & tire package */}
      {wheel?.id ? (
        <button
          onClick={addTires}
          className="w-full flex items-center justify-center gap-2 border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-all font-bold py-3 rounded-xl uppercase tracking-wide text-sm"
        >
          Add Tires to Your Package
        </button>
      ) : (
        <button
          onClick={addWheels}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:border-[#111111] hover:text-[#111111] transition-all font-semibold py-3 rounded-xl text-sm"
        >
          🔧 Build a wheel and tire package
        </button>
      )}

      {/* Save to email + Save for later */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button className="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-800 transition-all rounded-lg py-2.5 text-xs font-medium">
          <MdFavoriteBorder className="w-4 h-4" />
          Save to email
        </button>
        <button className="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-800 transition-all rounded-lg py-2.5 text-xs font-medium">
          <MdSave className="w-4 h-4" />
          Save for later
        </button>
      </div>

      {/* Compare */}
      <CompareButton product={product} variant="outline" />
    </div>
  );
};

export default ActionButtons;
