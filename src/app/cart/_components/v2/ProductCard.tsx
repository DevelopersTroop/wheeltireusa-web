import { useQuantityModal } from '@/hooks/useQuantityModal';
import { removeFromCart, TCartProduct } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/store';
import { getPrice } from '@/utils/price';
import { getProductThumbnail } from '@/utils/product';
import { ChevronRight, Trash2 } from 'lucide-react';

// Helper to format currency
const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    price
  );

export default function ProductCard({ product }: { product: TCartProduct[] }) {
  const { setOpen, open } = useQuantityModal();
  console.log('TCL: ProductCard -> open', open);
  const dispatch = useAppDispatch();

  // 1. Identify setup type
  const isStaggered = product.length > 1;
  const frontTire = product[0];
  const rearTire = isStaggered ? product[1] : null;

  // 2. Safety check
  if (!frontTire) return null;

  // 3. Construct Link
  let singleTirePageLink = `/collections/product/${frontTire.slug}`;
  if (rearTire) {
    singleTirePageLink += `?slug=${rearTire.slug}`;
  }

  // 4. Calculate Totals (Assuming we sum them up for the card display)
  // You might need to adjust this depending on if your API gives pre-calculated totals
  const totalQuantity = product.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = product.reduce(
    (acc, item) => acc + getPrice(item) * item.quantity,
    0
  );
  const totalMSRP = product.reduce(
    (acc, item) => acc + (item.msrp ?? 0) * item.quantity,
    0
  ); // Assuming 'msrp' exists

  const removeCartProduct = () => {
    // Assuming we remove by the ID of the main product, or a bundle ID
    dispatch(removeFromCart(frontTire.cartPackage));
  };

  return (
    <div className="flex gap-6 p-6 rounded-3xl border border-gray-100 shadow-md bg-white">
      <img
        src={getProductThumbnail(frontTire)} // Use dynamic image if available
        alt={frontTire.title ?? ''}
        className="w-20 h-20 object-contain"
      />

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            {/* Brand Name */}
            <h4 className="font-black text-2xl italic uppercase border-b-4 border-black inline-block leading-none">
              {frontTire.brand || 'MILESTAR'}
            </h4>

            {/* Model Name */}
            <p className="text-gray-600 font-medium mt-1">
              {frontTire.model || 'Weatherguard AW365'}
            </p>

            {/* Dynamic Specs Section */}
            <div className="mt-1 flex flex-col gap-1">
              {/* Front Tire (Always renders) */}
              <p className="text-gray-400 text-xs flex items-center gap-1">
                {isStaggered && (
                  <span className="font-bold text-gray-500">Front:</span>
                )}
                {frontTire.tireSize} {frontTire.loadIndex}
                {frontTire.speedRating}
                {!isStaggered && (
                  <ChevronRight size={14} className="inline text-gray-300" />
                )}
              </p>

              {/* Rear Tire (Only renders if array > 1) */}
              {isStaggered && rearTire && (
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  <span className="font-bold text-gray-500">Rear:</span>
                  {rearTire.tireSize} {rearTire.loadIndex}
                  {rearTire.speedRating}
                </p>
              )}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="text-right">
            {/* Show MSRP if it's higher than price */}
            {totalMSRP > totalPrice && (
              <p className="text-xs text-gray-300 line-through font-bold">
                {formatPrice(totalMSRP)}
              </p>
            )}
            <p className="text-xl font-black text-slate-800">
              {formatPrice(totalPrice)}
            </p>
            <p className="text-[10px] text-gray-400 font-bold">
              {formatPrice(getPrice(frontTire))} / tire
            </p>
          </div>
        </div>

        {/* Quantity Trigger Button */}
        <div className="flex gap-2 mt-4">
          <button
            // Pass the whole product array or just the front depending on how your modal works
            onClick={() => {
              if (frontTire) setOpen(true, frontTire);
            }}
            className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-full px-5 py-2 text-sm font-bold hover:bg-gray-100 transition-colors"
          >
            {totalQuantity} tires{' '}
            <ChevronRight size={14} className="rotate-90" />
          </button>

          <button
            onClick={removeCartProduct}
            className="p-2 border border-gray-200 rounded-full text-gray-300 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
