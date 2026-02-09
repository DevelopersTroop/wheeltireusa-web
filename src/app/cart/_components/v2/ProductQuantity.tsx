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
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-b-0">
      {/* Product Image */}
      <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center overflow-hidden shrink-0">
        <img
          src={getProductThumbnail(product)}
          alt={product.title ?? ''}
          className="w-full h-full object-contain p-1"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-foreground truncate">
          {product.brand} {product.model}
        </h4>
        {product.tireSize && (
          <p className="text-xs text-muted-foreground">
            {product.tireSize}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatPrice(getPrice(product))} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(product.id, -1)}
          disabled={product.quantity <= 1 || isDemo}
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus size={14} />
        </button>
        <span className="text-base font-semibold text-foreground w-8 text-center tabular-nums">
          {product.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(product.id, 1)}
          disabled={isDemo}
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Item Total */}
      <div className="text-right w-20">
        <p className="font-semibold text-foreground">
          {formatPrice(itemTotal)}
        </p>
      </div>

      {/* Remove Button */}
      {canRemove && (
        <button
          onClick={() => onRemove(product.id)}
          disabled={isDemo}
          className="p-2 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Remove from package"
        >
          <Trash2 size={16} />
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
      className={`absolute inset-0 bg-card z-60 transform transition-transform duration-300 flex flex-col ${open ? 'translate-y-0' : 'translate-y-full'}`}
    >
      {/* Header */}
      <div className="px-6 py-5 flex justify-between items-center border-b border-border shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {isBundle ? 'Edit Package' : 'Update Quantity'}
          </h2>
          {isBundle && (
            <p className="text-sm text-muted-foreground">
              {packageProducts.length} items in this package
            </p>
          )}
          {isDemo && (
            <p className="text-xs text-primary mt-1">
              Demo mode - changes won't persist
            </p>
          )}
        </div>
        <button
          onClick={() => setOpen(false)}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <X size={24} className="text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Pro Tip Section */}
        <div className="flex flex-col items-center text-center py-8 px-6 bg-secondary/30">
          <div className="text-primary bg-primary/10 p-3 rounded-xl mb-3">
            <Truck size={24} />
          </div>
          <h3 className="text-xs font-semibold text-primary uppercase tracking-wide">
            Pro Tip
          </h3>
          <p className="text-lg font-bold text-foreground leading-tight mt-1 max-w-2xl">
            Replace tires in pairs for better traction and braking
          </p>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Most drivers replace 4 tires. If you had a flat tire, replace at least two.
          </p>
        </div>

        {/* Package Items List */}
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {isBundle ? 'Package Items' : 'Your Item'}
            </h3>
            <span className="text-sm text-muted-foreground">
              Total: <span className="font-bold text-foreground">{formatPrice(packageTotal)}</span>
            </span>
          </div>

          <div className="bg-secondary/30 rounded-xl px-4">
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
      <div className="p-6 border-t border-border shrink-0">
        <button
          onClick={() => setOpen(false)}
          className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-base py-3 rounded-lg transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};
