'use client';

import { useCartHook } from '@/hooks/useCartHook';
import { useGroupedProducts, TGroupedProducts } from '@/hooks/useGroupedProducts';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { calculateCartTotal, getPrice } from '@/utils/price';
import { ArrowRight, Info, Lock, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import ProductCard from '../_components/v2/ProductCard';
import { ProductQuantity } from '../_components/v2/ProductQuantity';
import { initiateCheckout, setSelectedOptionTitle } from '@/redux/features/checkoutSlice';
import { TCartProduct } from '@/redux/features/cartSlice';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { PiShoppingBagOpenFill } from 'react-icons/pi';

// Helper
const getPackageProducts = (group: TGroupedProducts) => {
  return [group.tire, group.wheel, group.accessory].filter(Boolean);
};

const CartSystem = () => {
  const { open, setOpen } = useCartHook();
  const dispatch = useAppDispatch();
  const cart = useTypedSelector((state) => state.persisted.cart);

  const realGroupedProducts = useGroupedProducts(cart?.products || []);
  const subTotalCost = calculateCartTotal(cart.products);

  const groupedProducts = realGroupedProducts;

  const quantity = useMemo(() => {
    return groupedProducts.map((group) => {
      const products = getPackageProducts(group);
      const totalQty = products.reduce((p, q) => p + (q?.quantity || 0), 0);
      const totalPrice = products.reduce(
        (p, q) => p + getPrice(q!) * (q?.quantity || 0),
        0
      );
      const firstProduct = products[0];

      return {
        quantity: totalQty,
        price: totalPrice,
        title: firstProduct?.title || 'Product',
      };
    });
  }, [groupedProducts]);

  if (!open) return null;

  return (
    <div className="relative h-screen w-full bg-gray-100 overflow-hidden font-sans">
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={setOpen}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 right-0 w-full h-[87.5vh] max-w-[400px] flex flex-col bg-white/90 backdrop-blur-2xl z-50 transform transition-all duration-500 ease-in-out shadow-[0_0_50px_rgba(0,0,0,0.1)] border-l border-white/20 ${
          open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {!groupedProducts.length ? (
          <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="bg-primary text-white px-4 py-2 flex justify-between items-center">
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Cart Overview
              </h3>
            </div>

            {/* Summary */}
            <div className="p-4 flex bg-gray-100 justify-between items-center">
              <div className="flex gap-3 items-center">
                <ShoppingBag className="text-primary" />
                <div>
                  <h4 className="font-bold italic">
                    {cart.products.length} item
                    {cart.products.length !== 1 ? 's' : ''}
                  </h4>
                  <p className="text-xs font-bold text-primary">
                    Products in your cart
                  </p>
                </div>
              </div>

              <button
                onClick={setOpen}
                className="p-2 rounded-lg transition hover:scale-150"
              >
                <FaAngleDoubleRight />
              </button>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center">
                <PiShoppingBagOpenFill size={100} className="text-primary" />
              </div>

              <h3 className="text-xl font-bold mt-4">
                Your cart is feeling light
              </h3>
              <p className="text-slate-500 mt-2 mb-4">
                Discover premium wheels and tires to upgrade your ride.
              </p>

              <Link
                href="/collections/product-category/tires"
                onClick={setOpen}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition"
              >
                Start Exploring
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-slate-900 text-white px-5 py-3 flex justify-between items-center">
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Cart Overview
              </h3>
            </div>

            {/* Summary */}
            <div className="p-4 flex bg-gray-100 justify-between items-center">
              <div className="flex gap-3 items-center">
                <ShoppingBag className="text-primary" />
                <div>
                  <h4 className="font-bold italic">
                    {cart.products.length} item
                    {cart.products.length !== 1 ? 's' : ''}
                  </h4>
                  <p className="text-xs font-bold text-primary">
                    Products in your cart
                  </p>
                </div>
              </div>

              <button
                onClick={setOpen}
                className="p-2 hover:scale-150 rounded-lg transition"
              >
                <FaAngleDoubleRight />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-4 custom-scrollbar">
              {groupedProducts.map((group, id) => (
                <ProductCard key={id} packageGroup={group} />
              ))}
            </div>

            {/* Sticky Footer */}
            <div className="border-t bg-white p-4">
              <Link
                href="/checkout"
                onClick={() => {
                  dispatch(initiateCheckout());
                  dispatch(setSelectedOptionTitle('Direct to Customer'));
                  setOpen();
                }}
                className="w-full flex items-center justify-start gap-20 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary transition"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-gray-300">
                    Total 
                  </span>
                  <span className="text-xs font-semibold">
                    ${subTotalCost}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Lock size={16} />
                  Checkout
                  <ArrowRight size={16} />
                </div>
              </Link>

              <p className="text-[10px] text-slate-400 text-center mt-2">
                By placing an order, you agree to our{' '}
                <span className="underline cursor-pointer hover:text-primary">
                  Terms
                </span>
              </p>
            </div>
          </>
        )}

        <ProductQuantity />
      </div>
    </div>
  );
};

export default CartSystem;