'use client';

import { ShoppingCart } from 'lucide-react';
import { FinalStepProductCard } from './finalStepProductCard';
import { TProductInfo } from '@/types/order';

// Interface for individual product details
interface Product {
  _id: string;
  title: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
}

// Props interface for the CartSummary component
interface CartSummaryProps {
  productsInfo?: TProductInfo[];
  totalCost: string;
}

// CartSummary Component
export const CartSummary: React.FC<CartSummaryProps> = ({
  productsInfo,
  totalCost,
}) => {
  // Add null check and default to empty array if productsInfo is undefined
  const safeProductsInfo = productsInfo || [];

  // Calculate the total quantity of items in the cart
  const quantity = safeProductsInfo.reduce(
    (sum, product) => sum + (product.quantity || 0),
    0
  );

  return (
    <div className="flex items-start gap-4 font-bold">
      {/* Icon Section */}
      <div className="relative mt-1 hidden">
        <ShoppingCart className="h-5 w-5 text-[#210203]" />
        <span className="absolute h-4 w-4 rounded-full text-xs bg-primary text-white flex items-center justify-center -top-1 -right-2">
          {quantity}
        </span>
      </div>
      <div className="w-full">
        <div className="flex gap-4">
          <div className="relative mt-1 md:hidden">
            <ShoppingCart className="h-5 w-5 text-[#210203]" />
            <span className="absolute h-4 w-4 rounded-full text-xs bg-primary text-white flex items-center justify-center -top-1 -right-2">
              {quantity}
            </span>
          </div>
          <h2 className="text-lg">Shopping Cart</h2>
        </div>
        <FinalStepProductCard
          products={safeProductsInfo}
          totalCost={totalCost}
        />
      </div>
    </div>
  );
};

export default CartSummary;
