import { useQuantityModal } from '@/hooks/useQuantityModal';
import { removeFromCart, TCartProduct } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/store';
import { getPrice } from '@/utils/price';
import { getProductThumbnail } from '@/utils/product';
import { ChevronDown, Trash2, Package } from 'lucide-react';
import { TGroupedProducts } from '@/hooks/useGroupedProducts';

// Helper to format currency
const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    price
  );

type ProductItemProps = {
  product: TCartProduct;
  type: 'tire' | 'wheel' | 'accessory';
  isPartOfPackage?: boolean;
  isLast?: boolean;
};

// Individual product item component
function ProductItem({ product, type, isPartOfPackage, isLast }: ProductItemProps) {
  const { setOpen } = useQuantityModal();
  const dispatch = useAppDispatch();

  const typeLabels = {
    tire: 'Tire',
    wheel: 'Wheel',
    accessory: 'Accessory',
  };

  const totalPrice = getPrice(product) * product.quantity;
  const msrpPrice = (product.sellingPrice ?? 0) * product.quantity;

  const removeCartProduct = () => {
    dispatch(removeFromCart(product.cartPackage));
  };

  return (
    <div className={`flex gap-6 py-6 ${!isLast && isPartOfPackage ? 'border-b border-dashed border-slate-200' : ''} group/item transition-all hover:bg-slate-50/50 rounded-2xl px-4 -mx-4`}>
      {/* Product Image */}
      <div className="relative w-28 h-28 shrink-0">
        <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full scale-0 group-hover/item:scale-100 transition-transform duration-500" />
        <div className="relative w-full h-full bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm transition-all group-hover/item:shadow-md group-hover/item:-translate-y-1">
          <img
            src={getProductThumbnail(product)}
            alt={product.title ?? ''}
            className="w-full h-full object-contain p-2"
          />
        </div>
        {isPartOfPackage && (
          <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[8px] font-black uppercase tracking-tighter px-2 py-1 rounded-md shadow-lg border border-white/20">
            P-ITEM
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 py-1">
        <div className="flex justify-between items-start gap-4">
          <div className="min-w-0 flex-1">
            {/* Type Label */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                {typeLabels[type]}
              </span>
              <div className="h-px w-4 bg-slate-100" />
            </div>

            {/* Brand & Model */}
            <h4 className="font-black text-xl text-slate-900 truncate leading-tight tracking-tight uppercase italic">
              {product.brand || 'Brand'}
            </h4>
            <p className="text-slate-500 text-sm truncate font-medium mt-0.5">
              {product.model || product.title || 'Product'}
            </p>
          </div>

          {/* Pricing */}
          <div className="text-right shrink-0">
            {msrpPrice > totalPrice && (
              <p className="text-xs text-slate-400 line-through font-bold">
                {formatPrice(msrpPrice)}
              </p>
            )}
            <p className="text-2xl font-black text-slate-900 tracking-tighter tabular-nums">
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => {
              setOpen(true, product)
            }}
            className="group/btn flex items-center gap-2 bg-white hover:bg-slate-900 border border-slate-200 rounded-xl px-4 py-2 text-xs font-black text-slate-900 hover:text-white transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            QTY: <span className="text-primary group-hover/btn:text-white">{product.quantity}</span>
            <ChevronDown size={14} className="group-hover/btn:rotate-180 transition-transform" />
          </button>

          <button
            onClick={removeCartProduct}
            className="p-2.5 text-slate-300 hover:text-white hover:bg-rose-500 rounded-xl transition-all shadow-sm hover:shadow-lg active:scale-90"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Package Card component
export default function ProductCard({ packageGroup }: { packageGroup: TGroupedProducts }) {
  const { tire, wheel, accessory } = packageGroup;

  // Get all items in this package
  const items: { product: TCartProduct; type: 'tire' | 'wheel' | 'accessory' }[] = [];
  if (tire) items.push({ product: tire, type: 'tire' });
  if (wheel) items.push({ product: wheel, type: 'wheel' });
  if (accessory) items.push({ product: accessory, type: 'accessory' });

  const isBundle = items.length > 1;

  // Calculate total package price
  const totalPackagePrice = items.reduce(
    (acc, { product }) => acc + getPrice(product) * product.quantity,
    0
  );

  if (items.length === 0) return null;

  return (
    <div className="group relative">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-slate-200/20 to-primary/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

      <div className="relative bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
        {/* Package Header - Only show for bundles */}
        {isBundle && (
          <div className="flex items-center justify-between px-8 py-5 bg-slate-900/5 backdrop-blur-sm border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 text-white p-2 rounded-xl">
                <Package size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Premium Bundle
                </span>
                <span className="text-sm font-black text-slate-900 uppercase italic">
                  {items.length} items included
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Package Price</span>
              <span className="text-xl font-black text-slate-900 tabular-nums">
                {formatPrice(totalPackagePrice)}
              </span>
            </div>
          </div>
        )}

        {/* Package Items */}
        <div className="px-8 py-4">
          {items.map(({ product, type }, index) => (
            <ProductItem
              key={product.id}
              product={product}
              type={type}
              isPartOfPackage={isBundle}
              isLast={index === items.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
