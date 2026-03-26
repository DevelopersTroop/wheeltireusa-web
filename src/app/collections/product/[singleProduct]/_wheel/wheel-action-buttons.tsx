'use client';

import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { TWheelProduct } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';
import React, { useContext } from 'react';
import WheelQuantityInput from './wheel-quantity-input';
import { WheelContext } from './context/WheelProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { addPackage } from '@/redux/features/packageSlice';
import { triggerGaAddToCart } from '@/utils/analytics';
import { addToCart } from '@/redux/features/cartSlice';
import { CartData } from '@/types/cart';
import { useCartHook } from '@/hooks/useCartHook';
import CompareButton from '@/components/shared/CompareButton/CompareButton';
import { MdOutlineLocalPhone } from 'react-icons/md';

const WheelActionButtons = ({ product }: { product: TWheelProduct }) => {
  const searchParams = useSearchParams();
  const cartPackage = searchParams.get('cartPackage') as string;

  const packages = useTypedSelector((state) => state.persisted.package);
  const cartProducts = useTypedSelector(
    (state) => state.persisted.cart.products
  );

  const dispatch = useAppDispatch();
  const { quantity } = useContext(WheelContext);
  const { setOpen } = useCartHook();
  const router = useRouter();

  const tire = packages[cartPackage]?.tire;

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

    return { cartSerial, cartPackage: packageId };
  };

  // ✅ handle add to cart
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

  // ✅ build tire flow
  const addTires = () => {
    const pkg = uuidv4();

    dispatch(
      addPackage({
        packageId: pkg,
        wheel: { ...product, cartPackage: pkg },
      })
    );

    router.push(
      `/collections/product-category/tires?tireDiameter=${product.wheelDiameter}&cartPackage=${pkg}`
    );
  };

  // ✅ add wheels to existing package
  const addWheelsToPackage = () => {
    dispatch(
      addPackage({
        packageId: cartPackage,
        wheel: { ...product, cartPackage },
      })
    );

    router.push(`/wheel-and-tire-package?cartPackage=${cartPackage}`);
  };

  return (
    <div className="flex flex-col gap-3">

      {/* Quantity + Add to Cart */}
      <div className="flex items-stretch gap-2">
        <div className="w-[120px] shrink-0">
          <WheelQuantityInput
            product={product}
            inventoryAvailable={20}
            name="quantity"
            id="quantity"
          />
        </div>

        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-red-600 active:scale-[0.99] text-white font-bold py-3 rounded-lg uppercase tracking-wide text-sm transition-all disabled:opacity-60"
        >
          {loading ? "ADDING..." : isInCart ? "GO TO CART" : "ADD TO CART"}
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

      {/* Package Builder */}
      {tire?.id ? (
        <button
          onClick={addWheelsToPackage}
          className="w-full flex items-center justify-center gap-2 border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-all font-bold py-3 rounded-xl uppercase tracking-wide text-sm"
        >
          Add Wheels to Your Package
        </button>
      ) : (
        <button
          onClick={addTires}
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

export default WheelActionButtons;