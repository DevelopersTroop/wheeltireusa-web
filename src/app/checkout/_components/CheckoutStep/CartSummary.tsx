'use client';
import { Package } from 'lucide-react';
import Image from 'next/image';

interface Product {
  _id: string;
  title: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
  wheelSize?: string;
  boltPattern?: string;
}

interface CartSummaryProps {
  productsInfo?: Product[];
  totalCost: any;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  productsInfo,
  totalCost,
}) => {
  const safeProductsInfo = productsInfo || [];

  const quantity = safeProductsInfo.reduce(
    (sum, product) => sum + (product.quantity || 0),
    0
  );

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            Cart summary
          </span>
          <div className="h-[2px] w-7 bg-slate-900 rounded-full" />
        </div>
        {quantity > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {quantity} {quantity === 1 ? 'item' : 'items'}
            </span>
          </div>
        )}
      </div>

      {/* Cart Items Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-sm">
        {safeProductsInfo.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <Package className="h-10 w-10 mb-2 opacity-40" />
            <p className="text-xs font-semibold uppercase tracking-wider">Cart is empty</p>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="divide-y divide-slate-100">
              {safeProductsInfo.map((product) => (
                <div
                  key={product._id}
                  className="flex gap-3 py-3 last:pb-0 first:pt-0"
                >
                  {/* Product Image */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 truncate pr-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                        SKU: {product.sku}
                      </span>
                      {(product.wheelSize || product.boltPattern) && (
                        <>
                          <span className="text-slate-200">•</span>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                            {[product.wheelSize, product.boltPattern].filter(Boolean).join(' / ')}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Price & Quantity */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Qty: <span className="font-semibold text-slate-700">{product.quantity}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Subtotal</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-bold text-slate-900">
                  ${isNaN(totalCost) ? '0' : Math.floor(Number(totalCost))}
                </span>
                <span className="text-sm text-slate-400">
                  .{isNaN(totalCost) ? '00' : Number(totalCost).toFixed(2).split('.')[1]}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
