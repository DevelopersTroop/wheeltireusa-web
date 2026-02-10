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
import { initiateCheckout } from '@/redux/features/checkoutSlice';
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
        className={`fixed inset-y-0 right-0 w-full max-w-4xl bg-white z-50 transform transition-transform duration-300 shadow-2xl ${open ? 'translate-x-0' : 'translate-x-full'}`}
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
                onClick={setOpen}
                className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-all"
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
            <div className="px-6 py-5 flex justify-between items-center bg-card border-b border-border">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Your Cart
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {cart.products.length} item{cart.products.length !== 1 ? 's' : ''} in your cart
                </p>
              </div>
              <button
                onClick={setOpen}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X size={24} className="text-muted-foreground" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto h-[calc(100vh-180px)] px-6 py-6 pb-48 space-y-6 bg-secondary/30">
              {/* Products Section */}
              <div className="space-y-3">
                {groupedProducts.map((group, id) => {
                  return <ProductCard key={id} packageGroup={group} />;
                })}
              </div>

              {/* Order Summary */}
              <div className="bg-card rounded-xl border border-border p-5 space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Order Summary
                </h3>

                <div className="space-y-3">
                  {quantity.map((p, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {p.title} × {p.quantity}
                      </span>
                      <span className="text-foreground font-medium">
                        ${p.price.toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between text-sm pt-3 border-t border-border">
                    <span className="text-muted-foreground flex items-center gap-1">
                      Shipping & handling
                      <Info size={14} className="text-muted-foreground/50" />
                    </span>
                    <span className="text-primary font-semibold">
                      FREE
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="text-foreground font-semibold">Subtotal</span>
                  <span className="text-foreground text-lg font-bold">
                    ${subTotalCost}
                  </span>
                </div>
              </div>
            </div>

            {/* STICKY FOOTER */}
            <div className="absolute bottom-0 inset-x-0 bg-card border-t border-border p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
              <Link
                href={'/checkout'}
                onClick={() => {
                  dispatch(initiateCheckout());
                  setOpen();
                }}
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-base rounded-lg h-12 flex items-center justify-center gap-2 transition-colors"
              >
                <Lock size={16} />
                Proceed to Checkout
              </Link>
              <p className="text-[10px] text-muted-foreground text-center mt-3 leading-relaxed">
                By placing an order, you agree to our{' '}
                <span className="underline cursor-pointer hover:text-primary transition-colors">
                  terms of sale
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
