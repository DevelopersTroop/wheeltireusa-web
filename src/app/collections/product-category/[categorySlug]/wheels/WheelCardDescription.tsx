'use client';
import { ProductCardRating } from '@/components/shared/Reviews/components/ProductCardRating/ProductCardRating';
import { addPackage } from '@/redux/features/packageSlice';
import { useAppDispatch } from '@/redux/store';
import { TInventoryItem, TWheelProduct } from '@/types/product';
import { useRouter, useSearchParams } from 'next/navigation';
import { DollarSign, HeadphonesIcon, Truck } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { addDays, format } from 'date-fns';

const WheelCardDescription = ({ product }: { product: TWheelProduct }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const cartPackage = searchParams.get('cartPackage');

  // Calculate delivery date range
  const deliveryStart = addDays(new Date(), 3);
  const deliveryEnd = addDays(new Date(), 7);
  const deliveryDateRange = `${format(deliveryStart, 'MMM dd')} - ${format(deliveryEnd, 'MMM dd')}`;

  const addTires = () => {
    new Promise<{ cartPackage: string }>((res) => {
      const cartPackage = uuidv4();
      dispatch(
        addPackage({
          packageId: cartPackage,
          wheel: {
            ...product,
            cartPackage,
          } as any,
        })
      );
      res({ cartPackage });
    }).then((res) => {
      router.push(
        `/collections/product-category/tires?wheelDiameter=${product.wheelDiameter}&cartPackage=${res.cartPackage}`
      );
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/collections/product/${product.id}${cartPackage ? `?cartPackage=${cartPackage}` : ''}`);
  };

  const handleNeedHelp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Open help chat or contact page
    window.open('/contact', '_blank');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Brand Name */}
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {product.brand || 'Premium Brand'}
      </p>

      {/* Product Title */}
      <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
        {product.title}
      </h3>

      {/* Wheel Specs */}
      <div className="text-xs text-gray-600 mb-2">
        {product.wheelDiameter && product.wheelWidth && (
          <span>
            {product.wheelDiameter}&quot;x{product.wheelWidth}
            {product.offset && ` ${product.offset}`}
          </span>
        )}
      </div>

      {/* Star Rating */}
      <div className="mb-2">
        <ProductCardRating productId={product.id} />
      </div>



      <div className="flex items-baseline gap-2 mb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              ${product.sellingPrice?.toFixed(2) ?? 'N/A'}
            </span>
            <span className="text-xs text-gray-500">per wheel</span>
          </div>
        </div>

      {/* Promo Message */}
      {!cartPackage && (
        <div className="mb-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-xs font-medium text-gray-600 px-2 py-1.5 rounded-lg">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Save up to $20 by adding tires</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addTires();
            }}
            className="w-full sm:w-1/2 text-xs  font-medium text-primary border border-primary rounded-lg py-1.5 sm:py-1 px-2 sm:px-3 hover:bg-primary hover:text-white transition-all duration-200"
          >
            Add Tires
          </button>
        </div>
      )}

      {/* Delivery Info */}
      <div className="mb-4 flex items-center gap-1.5 text-xs rounded-lg px-2 bg-green-50 text-green-700">
        <Truck className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <div>
          <p className="font-medium ">Free delivery to the lower 48</p>
          <p>as soon as {deliveryDateRange}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleBuyNow}
          className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 sm:py-2.5 sm:px-4 bg-gray-900 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200"
        >
          <span>Buy Now</span>
        </button>
        <button
          onClick={handleNeedHelp}
          className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 sm:py-2.5 sm:px-4 bg-transparent text-gray-900 text-xs sm:text-xs font-semibold rounded-xl border-2 border-gray-900 hover:bg-gray-100 transition-all duration-200"
        >
          <HeadphonesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Need Help</span>
        </button>
      </div>
    </div>
  );
};

export default WheelCardDescription;
