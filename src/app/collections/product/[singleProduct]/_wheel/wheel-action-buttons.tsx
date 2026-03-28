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
import { MdOutlineLocalPhone, MdShoppingCart, MdCheck } from 'react-icons/md';
import { TbPackage } from 'react-icons/tb';

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

  const isInCart = Object.values(cartProducts).some(
    (p: any) => p.id === product.id
  );

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

      {/* ── Focal CTA zone ── */}
      <div className="rounded-2xl border-2 border-primary/30 bg-primary/[0.03] p-3.5">

        {/* eyebrow */}
        <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-primary text-center mb-2.5">
          Select qty &amp; add to cart
        </p>

        {/* qty + button row */}
        <div className="flex items-stretch gap-4">
          <div className="w-[110px] shrink-0">
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
            className={`
              flex-1 flex items-center justify-center gap-2
              h-[54px] rounded-xl font-black uppercase tracking-wider text-[17px]
              transition-all duration-150 active:scale-[0.98] disabled:opacity-60
              ${isInCart
                ? 'bg-gray-900 text-white hover:bg-gray-700'
                : 'bg-primary text-white hover:bg-red-700'}
            `}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {loading ? (
              <span className="text-sm tracking-wide font-semibold">Adding...</span>
            ) : isInCart ? (
              <>
                <MdCheck className="w-5 h-5" />
                Go to Cart
              </>
            ) : (
              <>
                <MdShoppingCart className="w-8 h-8 ml-3" />
                Add to Cart
              </>
            )}
          </button>
        </div>

        {/* trust nudge */}
        <p className="text-[11px] text-primary/70 text-center mt-2.5 tracking-wide">
          Free shipping · No sales tax
        </p>
      </div>

      {/* ── Phone strip ── */}
      <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 bg-gray-50">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <MdOutlineLocalPhone className="text-primary w-3.5 h-3.5" />
        </div>
        <div>
          <p className="text-[11px] text-gray-400">Questions? Call us</p>
          <p className="text-[13px] font-semibold text-primary">+1 (813) 812-5257</p>
        </div>
      </div>

      {/* ── Package Builder ── */}
      {tire?.id ? (
        <button
          onClick={addWheelsToPackage}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-800 transition-all font-medium py-2.5 rounded-xl text-sm"
        >
          <TbPackage className="w-4 h-4" />
          Add Wheels to Your Package
        </button>
      ) : (
        <button
          onClick={addTires}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-800 transition-all font-medium py-2.5 rounded-xl text-sm"
        >
          <TbPackage className="w-4 h-4" />
          Build a Wheel &amp; Tire Package
        </button>
      )}

      {/* ── Compare ── */}
      <CompareButton product={product} variant="outline" />
    </div>
  );
};

export default WheelActionButtons;
