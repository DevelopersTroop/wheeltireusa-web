'use client';

import { useQuantityModal } from '@/hooks/useQuantityModal';
import {
  updateCartQuantity,
  removeProductById,
  TCartProduct,
} from '@/redux/features/cartSlice';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { getPrice } from '@/utils/price';
import { getProductThumbnail } from '@/utils/product';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useMemo } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';

// Helper
const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

// 🔹 Compact Product Row
function ProductRow({
  product,
  onUpdateQuantity,
  onRemove,
  canRemove,
}: {
  product: TCartProduct;
  onUpdateQuantity: (id: number, change: number) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-3 border-b last:border-0">
      {/* Image */}
      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          src={getProductThumbnail(product)}
          className="w-full h-full object-contain p-1"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-primary uppercase font-semibold">
          {product.brand}
        </p>
        <p className="text-sm font-semibold text-slate-900 truncate">
          {product.model}
        </p>
        <p className="text-xs text-slate-500">
          {formatPrice(getPrice(product))}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
        <button
          onClick={() => onUpdateQuantity(product.id, -1)}
          disabled={product.quantity <= 1}
          className="p-1 text-gray-500 disabled:opacity-30"
        >
          <Minus size={14} />
        </button>

        <span className="text-sm font-semibold w-5 text-center">
          {product.quantity}
        </span>

        <button
          onClick={() => onUpdateQuantity(product.id, 1)}
          className="p-1 text-gray-500"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Remove */}
      {canRemove && (
        <button
          onClick={() => onRemove(product.id)}
          className="p-1 text-gray-400 hover:text-red-500"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}

// 🔹 Main Component
export const ProductQuantity = () => {
  const { open, setOpen, product, cartPackage } = useQuantityModal();
  const dispatch = useAppDispatch();

  const { products } = useTypedSelector((state) => state.persisted.cart);

  // Get package items
  const packageProducts = useMemo(() => {
    if (!cartPackage) return [];
    return products.filter((p) => p.cartPackage === cartPackage);
  }, [cartPackage, products]);

  const isBundle = packageProducts.length > 1;

  const packageTotal = useMemo(() => {
    return packageProducts.reduce(
      (acc, p) => acc + getPrice(p) * p.quantity,
      0
    );
  }, [packageProducts]);

  const handleUpdateQuantity = (id: number, change: number) => {
    dispatch(updateCartQuantity({ id, quantity: change }));
  };

  const handleRemoveProduct = (id: number) => {
    dispatch(removeProductById(id));
    if (packageProducts.length <= 1) {
      setOpen(false);
    }
  };

  if (!product || !cartPackage) return null;

  return (
    <div
      className={`absolute inset-0 bg-white z-50 flex flex-col transition-all duration-300 ${
        open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Header */}
      <div className="px-4 py-3 flex justify-between items-center border-b">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            {isBundle ? 'Edit Package' : 'Edit Item'}
          </h2>
          <p className="text-xs text-slate-500">
            {packageProducts.length} item
            {packageProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="p-2 rounded-lg transition hover:scale-150"
        >
          <FaAngleDoubleRight />
        </button>
      </div>

      {/* Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
        {/* Total */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500">Total</span>
          <span className="text-lg font-bold text-slate-900">
            {formatPrice(packageTotal)}
          </span>
        </div>

        {/* Items */}
        <div className="bg-white border rounded-xl px-3">
          {packageProducts.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveProduct}
              canRemove={isBundle}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-white">
        <button
          onClick={() => setOpen(false)}
          className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary transition"
        >
          Update Cart
        </button>
      </div>
    </div>
  );
};