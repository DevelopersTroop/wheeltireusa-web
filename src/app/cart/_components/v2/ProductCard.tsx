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
    <div
  className={`flex gap-3 py-3 ${
    !isLast && isPartOfPackage ? 'border-b border-gray-200' : ''
  }`}
>
  {/* 🖼 Image */}
  <div className="w-16 h-16 shrink-0 bg-white border rounded-lg flex items-center justify-center overflow-hidden">
    <img
      src={getProductThumbnail(product)}
      alt={product.title ?? ''}
      className="w-full h-full object-contain p-1"
    />
  </div>

  {/* 📄 Content */}
  <div className="flex-1 min-w-0 flex flex-col justify-between">
    
    {/* Title + Price */}
    <div className="flex justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[10px] text-primary font-semibold uppercase">
          {typeLabels[type]}
        </p>

        <h4 className="text-sm font-semibold text-slate-900 truncate">
          {product.brand || 'Brand'}
        </h4>

        <p className="text-xs text-slate-500 truncate">
          {product.model || product.title}
        </p>
      </div>

      <div className="text-right shrink-0">
        {msrpPrice > totalPrice && (
          <p className="text-[10px] text-gray-400 line-through">
            {formatPrice(msrpPrice)}
          </p>
        )}
        <p className="text-sm font-bold text-slate-900">
          {formatPrice(totalPrice)}
        </p>
      </div>
    </div>

    {/* Actions */}
    <div className="flex items-center justify-between mt-2">
      <button
        onClick={() => setOpen(true, product)}
        className="flex items-center gap-1 text-[11px] px-2 py-1 border rounded-md hover:bg-gray-100"
      >
        QTY: {product.quantity}
        <ChevronDown size={12} />
      </button>

      <button
        onClick={removeCartProduct}
        className="p-1.5 text-gray-400 hover:text-red-500"
      >
        <Trash2 size={14} />
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

      <div className="relative bg-white/60 backdrop-blur-xl rounded-md  border border-white/50 shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
        {/* Package Header - Only show for bundles */}
        {isBundle && (
          <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 bg-slate-900/5 backdrop-blur-sm border-b border-white/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-slate-900 text-white p-1.5 sm:p-2 rounded-xl">
                <Package size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest leading-none">
                  Premium Bundle
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 uppercase italic">
                  {items.length} items
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Package</span>
              <span className="text-base sm:text-xl font-black text-slate-900 tabular-nums">
                {formatPrice(totalPackagePrice)}
              </span>
            </div>
          </div>
        )}

        {/* Package Items */}
        <div className="px-4 sm:px-8 py-2 sm:py-1">
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
