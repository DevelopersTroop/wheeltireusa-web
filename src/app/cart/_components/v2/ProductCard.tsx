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
    <div className={`flex gap-4 py-4 ${!isLast && isPartOfPackage ? 'border-b border-dashed border-gray-200' : ''}`}>
      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
        <img
          src={getProductThumbnail(product)}
          alt={product.title ?? ''}
          className="w-full h-full object-contain p-1"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0 flex-1">
            {/* Type Label */}
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              {typeLabels[type]}
            </span>

            {/* Brand & Model */}
            <h4 className="font-bold text-base text-foreground truncate mt-0.5">
              {product.brand || 'Brand'}
            </h4>
            <p className="text-muted-foreground text-sm truncate">
              {product.model || product.title || 'Product'}
            </p>

            {/* Size/Specs */}
            {product.tireSize && (
              <p className="text-muted-foreground/70 text-xs mt-1 font-medium">
                {product.tireSize} {product.loadIndex && `${product.loadIndex}${product.speedRating || ''}`}
              </p>
            )}
          </div>

          {/* Pricing */}
          <div className="text-right shrink-0">
            {msrpPrice > totalPrice && (
              <p className="text-xs text-muted-foreground/50 line-through">
                {formatPrice(msrpPrice)}
              </p>
            )}
            <p className="text-lg font-bold text-foreground">
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => {
              console.log(product)
              setOpen(true, product)
            }}
            className="flex items-center gap-1.5 bg-secondary hover:bg-secondary/80 border border-border rounded-lg px-3 py-1.5 text-xs font-semibold text-secondary-foreground transition-colors"
          >
            Qty: {product.quantity}
            <ChevronDown size={12} />
          </button>

          <button
            onClick={removeCartProduct}
            className="p-1.5 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
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
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      {/* Package Header - Only show for bundles */}
      {isBundle && (
        <div className="flex items-center justify-between px-5 py-3 bg-primary/5 border-b border-border">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Package Deal
            </span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              {items.length} items
            </span>
          </div>
          <span className="text-base font-bold text-foreground">
            {formatPrice(totalPackagePrice)}
          </span>
        </div>
      )}

      {/* Package Items */}
      <div className="px-5">
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
  );
}
