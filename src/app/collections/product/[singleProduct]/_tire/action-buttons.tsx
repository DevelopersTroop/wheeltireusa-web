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
import { MdOutlineLocalPhone } from 'react-icons/md';

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

  const [addToCartText, setAddToCartText] = React.useState('ADD TO CART');
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

      {/* Quantity + Add to Cart inline */}
      <div className="flex items-stretch gap-2">
        <div className="w-[120px] shrink-0">
          <QuantityInput
            product={product}
            inventoryAvailable={20}
            name="quantity"
            id="quantity"
          />
        </div>
        <button
          onClick={() => {
            setLoading(true);
            setAddToCartText('Adding...');
            wait(400).then(() => {
              addProductToCart();
              setOpen();
              setTimeout(() => {
                setAddToCartText('ADD TO CART');
                setLoading(false);
              }, 1200);
            });
          }}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-red-600 active:scale-[0.99] text-white font-bold py-3 rounded-lg uppercase tracking-wide text-sm transition-all disabled:opacity-60"
        >
          {addToCartText}
        </button>
      </div>

      <div className="flex items-start gap-3 border border-gray-100 rounded-lg p-3 bg-gray-50">
        {/* Phone */}
        <div className="flex items-center gap-2">
          <MdOutlineLocalPhone className="text-primary w-4 h-4 flex-shrink-0" />
          <p className="text-xs uppercase text-gray-600">
            Questions? Call{" "}
            <span className="text-primary font-semibold">+1 (813) 812-5257</span>
          </p>
        </div>
      </div>

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
          className="w-full flex items-center justify-center gap-2 bg-green-700 border border-gray-200 text-white hover:bg-green-600 transition-all font-semibold py-2.5 rounded-xl text-sm"
        >
          Build a wheel and tire package
        </button>
      )}

      {/* Compare */}
      <CompareButton product={product} variant="outline" />
    </div>
  );
};

export default ActionButtons;