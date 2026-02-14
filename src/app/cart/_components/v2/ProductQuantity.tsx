import { useQuantityModal } from '@/hooks/useQuantityModal';
import { updateCartQuantity, removeProductById, TCartProduct } from '@/redux/features/cartSlice';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { getPrice } from '@/utils/price';
import { getProductThumbnail } from '@/utils/product';
import { Minus, Plus, Truck, X, Trash2 } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

// Helper to format currency
const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    price
  );

// Individual product row in package
type ProductRowProps = {
  product: TCartProduct;
  onUpdateQuantity: (id: number, change: number) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
  isDemo?: boolean;
};

function ProductRow({ product, onUpdateQuantity, onRemove, canRemove, isDemo }: ProductRowProps) {
  const itemTotal = getPrice(product) * product.quantity;

  return (
    <div className="flex items-center gap-6 py-6 border-b border-white/20 last:border-b-0 group/row">
      {/* Product Image */}
      <div className="relative w-20 h-20 shrink-0">
        <div className="absolute inset-0 bg-primary/5 blur-lg rounded-full scale-0 group-hover/row:scale-100 transition-transform" />
        <div className="relative w-full h-full bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm">
          <img
            src={getProductThumbnail(product)}
            alt={product.title ?? ''}
            className="w-full h-full object-contain p-2"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-black text-xs text-slate-400 uppercase tracking-widest leading-tight transition-colors group-hover/row:text-slate-900">
          {product.brand}
        </h4>
        <h3 className="font-black text-lg text-slate-900 truncate uppercase italic tracking-tight mt-0.5">
          {product.model}
        </h3>
        <p className="text-sm font-bold text-primary tabular-nums mt-1">
          {formatPrice(getPrice(product))} <span className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">per unit</span>
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-inner">
        <button
          onClick={() => onUpdateQuantity(product.id, -1)}
          disabled={product.quantity <= 1 || isDemo}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus size={16} />
        </button>
        <span className="text-xl font-black text-slate-900 w-10 text-center tabular-nums italic">
          {product.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(product.id, 1)}
          disabled={isDemo}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Item Total */}
      <div className="text-right w-28">
        <p className="text-2xl font-black text-slate-900 tracking-tighter tabular-nums">
          {formatPrice(itemTotal)}
        </p>
      </div>

      {/* Remove Button */}
      {canRemove && (
        <button
          onClick={() => onRemove(product.id)}
          disabled={isDemo}
          className="p-3 text-slate-300 hover:text-white hover:bg-rose-500 rounded-2xl transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm hover:shadow-lg active:scale-90"
          aria-label="Remove from package"
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
  );
}

export const ProductQuantity = () => {
  const { open, setOpen, product, cartPackage } = useQuantityModal();
  const dispatch = useAppDispatch();

  const { products } = useTypedSelector((state) => state.persisted.cart);

  // Get all products in this package from Redux store
  const storePackageProducts = useMemo(() => {
    if (!cartPackage) return [];
    return products.filter((p) => p.cartPackage === cartPackage);
  }, [cartPackage, products]);

  // Check if this is demo data (product exists but not in store)
  const isDemo = product && storePackageProducts.length === 0;

  // Use store products if available, otherwise use the product passed to modal (for demo)
  const packageProducts = storePackageProducts.length > 0
    ? storePackageProducts
    : product ? [product] : [];

  // Calculate total price for all items in the package
  const packageTotal = useMemo(() => {
    return packageProducts.reduce((acc, p) => acc + getPrice(p) * p.quantity, 0);
  }, [packageProducts]);

  const handleUpdateQuantity = (id: number, change: number) => {
    if (isDemo) return; // Don't dispatch for demo data
    dispatch(updateCartQuantity({ id, quantity: change }));
  };

  const handleRemoveProduct = (id: number) => {
    if (isDemo) return; // Don't dispatch for demo data
    dispatch(removeProductById(id));
    // If no more products in package, close modal
    if (packageProducts.length <= 1) {
      setOpen(false);
    }
  };

  if (!product || !cartPackage) return null;

  const isBundle = packageProducts.length > 1;

  return (
    <div
      className={`absolute inset-0 bg-white/90 backdrop-blur-3xl z-70 transform transition-all duration-500 ease-in-out flex flex-col ${open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
    >
      {/* Header */}
      <div className="px-10 py-10 flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
            {isBundle ? 'Package Edit' : 'Edit Quantity'}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-1 w-8 bg-primary rounded-full" />
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              {isBundle ? `${packageProducts.length} items grouped` : 'Single unit item'}
            </p>
          </div>
          {isDemo && (
            <div className="inline-block bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mt-3 animate-pulse">
              Sandbox Mode
            </div>
          )}
        </div>
        <button
          onClick={() => setOpen(false)}
          className="p-4 hover:bg-slate-100 rounded-[2.5rem] transition-all hover:rotate-90 group"
        >
          <X size={32} className="text-slate-400 group-hover:text-slate-900" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-10 pb-40">
        {/* Pro Tip Section */}
        <div className="relative group/tip mb-12">
          <div className="absolute -inset-1 bg-primary/20 blur-2xl rounded-[2.5rem] opacity-50 transition-opacity group-hover/tip:opacity-100" />
          <div className="relative flex flex-col items-center text-center p-10 bg-white/40 backdrop-blur-md border border-white/50 rounded-[2.5rem] shadow-sm">
            <div className="text-white bg-slate-900 p-4 rounded-2xl mb-4 shadow-xl -translate-y-2 group-hover/tip:-translate-y-4 transition-transform duration-500">
              <Truck size={32} />
            </div>
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">
              Pro Guidance
            </h3>
            <p className="text-2xl font-black text-slate-900 leading-tight mt-3 max-w-2xl uppercase tracking-tight italic">
              Optimize for Peak Performance
            </p>
            <p className="text-slate-500 font-medium mt-4 max-w-2xl leading-relaxed">
              Most professional drivers replace tires in sets of 4 to ensure balanced traction, handling, and braking safety.
            </p>
          </div>
        </div>

        {/* Package Items List */}
        <div className="space-y-6">
          <div className="flex justify-between items-end mb-4">
            <div className="space-y-1">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                {isBundle ? 'Package Components' : 'Item Specification'}
              </h3>
              <div className="h-1 w-6 bg-slate-200 rounded-full" />
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Total</p>
              <span className="text-4xl font-black text-slate-900 tracking-tighter italic">
                {formatPrice(packageTotal)}
              </span>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/50 px-8 shadow-sm">
            {packageProducts.map((p) => (
              <ProductRow
                key={p.id}
                product={p}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveProduct}
                canRemove={isBundle} // Can only remove if there are multiple items
                isDemo={isDemo}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="p-10 absolute bottom-0 inset-x-0 bg-white/50 backdrop-blur-xl border-t border-white/20">
        <button
          onClick={() => setOpen(false)}
          className="w-full bg-slate-900 text-white font-black text-xl uppercase tracking-widest py-6 rounded-3xl transition-all hover:bg-primary shadow-2xl hover:-translate-y-1 active:translate-y-0"
        >
          Confirm Updates
        </button>
      </div>
    </div>
  );
};
