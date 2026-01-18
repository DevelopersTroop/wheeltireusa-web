'use client';
import React, { useMemo, useState } from 'react';
import {
  X,
  Trash2,
  Truck,
  Lock,
  Plus,
  Minus,
  ChevronRight,
  Info,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import InstallationSection from '../_components/v2/InstallationPartner';
import ZipCodeEntryModal from '../_components/v2/ZipCode';
import { useCartHook } from '@/hooks/useCartHook';
import Link from 'next/link';
import { useTypedSelector } from '@/redux/store';
import { useGroupedProducts } from '@/hooks/useGroupedProducts';
import ProductCard from '../_components/v2/ProductCard';
import { calculateCartTotal, getPrice } from '@/utils/price';
import { ProductQuantity } from '../_components/v2/ProductQuantity';

const CartSystem = () => {
  const { open, setOpen } = useCartHook();
  const cart = useTypedSelector((state) => state.persisted.cart);
  const groupedProducts = useGroupedProducts(cart?.products || []);
  const subTotalCost = calculateCartTotal(cart.products);
  const quantity = useMemo(() => {
    return groupedProducts.map((product) => {
      return {
        quantity: product.tires.reduce((p, q) => p + q.quantity, 0),
        price: product.tires.reduce((p, q) => getPrice(q) * q.quantity + p, 0),
        title: product.tires[0].title,
      };
    });
  }, [groupedProducts]);

  if (!open) return null;

  return (
    <div className="relative h-screen w-full bg-gray-100 overflow-hidden font-sans">
      {/* Background Overlay for the Side Drawer */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" />
      )}

      {/* MAIN CART DRAWER */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-4xl bg-white z-40 transform transition-transform duration-300 shadow-2xl ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {!groupedProducts.length ? (
          <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-8 flex justify-between items-center bg-white border-b border-gray-50">
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Cart summary
              </h2>
              <button
                onClick={setOpen}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            {/* Empty State Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={40} className="text-gray-300" />
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 max-w-xl mb-8">
                Looks like you haven't added any items yet. Start browsing to
                find the perfect tires.
              </p>

              <Link
                href={'/collections/product-category/tires'}
                onClick={setOpen} // Or navigate to shop
                className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Shopping
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="relative">
              <ZipCodeEntryModal />
            </div>

            {/* Header */}
            <div className="p-8 flex justify-between items-center bg-white border-b border-gray-50">
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Cart summary
              </h2>
              <button onClick={setOpen}>
                <X size={28} className="text-gray-400" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto h-[calc(100vh-140px)] p-8 pb-40 space-y-10">
              {/* Tire Section */}
              <div>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                  Tires
                </h3>
                <div className="flex flex-col gap-y-2">
                  {groupedProducts.map((p, id) => {
                    return <ProductCard key={id} product={p.tires} />;
                  })}
                </div>
              </div>

              {/* Shipping Selectors */}
              {/* <section>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Shipping & Shop Services
            </h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="relative p-3 border-2 border-[#ff5a13] rounded-xl flex flex-col items-center justify-center text-center bg-white h-28">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff5a13] text-white text-[8px] font-black px-2 py-1 rounded w-max tracking-tighter">
                  MOST POPULAR
                </span>
                <Truck className="text-[#ff5a13] mb-1" size={24} />
                <p className="text-[10px] font-bold leading-tight">
                  Ship to local installer
                </p>
                <p className="text-[9px] text-gray-400 mt-1">
                  Shipping & installation
                </p>
                <div className="absolute top-1 right-1 bg-[#ff5a13] text-white rounded-full p-0.5">
                  <div className="w-1.5 h-1.5 border-r-2 border-b-2 border-white rotate-45 transform -translate-y-0.5" />
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center opacity-40 h-28 grayscale">
                <Truck size={24} className="mb-1" />
                <p className="text-[10px] font-bold">Ship to mobile</p>
              </div>
            </div>
          </section> */}

              {/* <InstallationSection /> */}

              {/* Breakdown Section */}
              <section className="space-y-4 pt-4">
                {quantity.map((p) => {
                  return (
                    <div className="flex justify-between text-sm font-medium text-gray-600">
                      <span>
                        {p.title} × {p.quantity}
                      </span>
                      <span className="text-slate-900 font-bold">
                        ${p.price}
                      </span>
                    </div>
                  );
                })}
                <div className="flex justify-between text-sm font-medium text-gray-600 pb-4 border-b border-gray-100">
                  <span className="flex items-center gap-1 italic">
                    Shipping & handling <Info size={14} />
                  </span>
                  <span className="text-black font-black tracking-widest">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between text-sm font-medium text-gray-600">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">
                    ${subTotalCost}
                  </span>
                </div>
              </section>
            </div>

            {/* STICKY FOOTER */}
            <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-100 p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.08)] z-50">
              <div className="flex gap-4">
                <Link
                  href={'/checkout'}
                  onClick={() => {
                    setOpen();
                  }}
                  className="flex-[2.5] bg-[#ff5a13] hover:bg-[#e84e0e] text-white font-black text-lg italic rounded-full h-14 flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
                >
                  <Lock size={18} fill="white" /> Checkout
                </Link>
              </div>
              <p className="text-[9px] text-gray-400 text-center mt-4 px-10 leading-tight">
                By placing an order, you agree and accept the{' '}
                <span className="underline">terms of sale</span>. SimpleTire is
                not liable if the tire does not fit correctly.
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
