'use client';
import { useCartHook } from '@/hooks/useCartHook';
import { useGroupedProducts, TGroupedProducts } from '@/hooks/useGroupedProducts';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { calculateCartTotal, getPrice } from '@/utils/price';
import { ArrowRight, Info, Lock, ShoppingBag, Truck, X } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import ProductCard from '../_components/v2/ProductCard';
import { ProductQuantity } from '../_components/v2/ProductQuantity';
import ZipCodeEntryModal from '../_components/v2/ZipCode';
import { initiateCheckout, setSelectedOptionTitle } from '@/redux/features/checkoutSlice';
import InstallationSection from '../_components/v2/InstallationPartner';
import { TCartProduct } from '@/redux/features/cartSlice';

// Helper to get all products from a package group
const getPackageProducts = (group: TGroupedProducts) => {
  return [group.tire, group.wheel, group.accessory].filter(Boolean);
};

// ==================== END DEMO DATA ====================

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
      const totalPrice = products.reduce((p, q) => p + getPrice(q!) * (q?.quantity || 0), 0);
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
      {/* Background Overlay for the Side Drawer */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 transition-opacity" />
      )}

      {/* MAIN CART DRAWER */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-4xl bg-white/90 backdrop-blur-2xl z-50 transform transition-all duration-500 ease-in-out shadow-[0_0_50px_rgba(0,0,0,0.1)] border-l border-white/20 ${open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        {!groupedProducts.length ? (
          <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-10 flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                  Cart summary
                </h2>
                <div className="h-1.5 w-12 bg-primary rounded-full" />
              </div>
              <button
                onClick={setOpen}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-all hover:rotate-90"
              >
                <X size={28} className="text-slate-400" />
              </button>
            </div>

            {/* Empty State Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <div className="relative w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-gray-100 animate-bounce-subtle">
                  <ShoppingBag size={56} className="text-primary" strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                Your cart is feeling light
              </h3>
              <p className="text-slate-500 max-w-2xl mb-10 text-lg leading-relaxed">
                Unlock the full potential of your vehicle with our premium selection of wheels and tires.
              </p>

              <Link
                href={'/collections/product-category/tires'}
                onClick={setOpen}
                className="group relative flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
              >
                Start Exploring
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
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
            <div className="px-4 md:px-10 py-8 flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                  Your Cart
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1 w-8 bg-primary rounded-full" />
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    {cart.products.length} item{cart.products.length !== 1 ? 's' : ''} total
                  </p>
                </div>
              </div>
              <button
                onClick={setOpen}
                className="p-3 hover:bg-slate-100 rounded-2xl transition-all hover:rotate-90 group"
              >
                <X size={28} className="text-slate-400 group-hover:text-slate-900" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto h-[calc(100vh-180px)] px-4 md:px-10 py-6 pb-64 space-y-10 custom-scrollbar">
              {/* Products Section */}
              <div className="space-y-6">
                {groupedProducts.map((group, id) => {
                  return <ProductCard key={id} packageGroup={group} />;
                })}
              </div>

              {/* Order Summary */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-[2rem] -z-10 transition-all group-hover:bg-primary/10" />
                <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/50 p-10 space-y-8 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic">
                      Order Summary
                    </h3>
                    <div className="h-px flex-1 bg-slate-200 ml-6" />
                  </div>

                  <div className="space-y-4">
                    {quantity.map((p, idx) => (
                      <div key={idx} className="flex justify-between items-center group/item">
                        <span className="text-slate-500 font-bold text-sm uppercase tracking-wide group-hover/item:text-slate-900 transition-colors">
                          {p.title} <span className="text-primary ml-1">×{p.quantity}</span>
                        </span>
                        <span className="text-slate-900 font-black tabular-nums">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                    ))}

                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <span className="text-slate-500 font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                        Shipping & handling
                        <Info size={14} className="text-primary animate-pulse" />
                      </span>
                      <span className="text-primary font-black text-sm uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                        FREE
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-2">
                    <div className="flex flex-col">
                      <span className="text-slate-400 font-black text-xs uppercase tracking-[0.2em]">Estimated Total</span>
                      <span className="text-slate-900 text-5xl font-black tracking-tighter">
                        ${subTotalCost}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STICKY FOOTER */}
            <div className="absolute bottom-0 inset-x-4 md:inset-x-10">
              <div className="group relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-3xl transition-all group-hover:bg-primary/30" />
                <Link
                  href={'/checkout'}
                  onClick={() => {
                    dispatch(initiateCheckout());
                    dispatch(setSelectedOptionTitle('Direct to Customer'));
                    setOpen();
                  }}
                  className="relative w-full bg-slate-900 text-white font-black text-xl uppercase tracking-widest rounded-3xl h-20 flex items-center justify-center gap-4 transition-all hover:bg-primary hover:-translate-y-1 shadow-2xl active:translate-y-0"
                >
                  <Lock size={20} />
                  Secure Checkout
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center mt-6 leading-relaxed">
                By placing an order, you agree to our{' '}
                <span className="text-slate-900 underline cursor-pointer hover:text-primary transition-colors">
                  Terms of Service
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
