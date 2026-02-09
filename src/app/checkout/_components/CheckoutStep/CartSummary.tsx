'use client';
import { ShoppingCart } from 'lucide-react';

interface Product {
  _id: string;
  title: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartSummaryProps {
  productsInfo?: Product[];
  totalCost: any;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  productsInfo,
  totalCost,
}) => {
  // Add null check and default to empty array if productsInfo is undefined
  const safeProductsInfo = productsInfo || [];

  const quantity = safeProductsInfo.reduce(
    (sum, product) => sum + (product.quantity || 0),
    0
  );

  return (
    <div className="flex items-start gap-4 font-bold">
      <div className="relative mt-1">
        <ShoppingCart className="h-5 w-5 text-[#210203]" />
        <span className="absolute h-4 w-4 rounded-full text-xs bg-primary text-white flex items-center justify-center -top-1 -right-2">
          {quantity}
        </span>
      </div>
      <div className="w-full">
        <h2 className="text-lg">Shopping Cart</h2>
        <div className="border w-full my-3 rounded-xs">
          <div className="flex justify-between px-4 py-2 border-b">
            <p>Cart Items</p>
          </div>

          {/* <div className="py-4 px-4 space-y-4">
            <FinalStepProductCard products={safeProductsInfo} />
          </div> */}

          <div className="flex justify-between px-4 py-5 border-t">
            <p>SUB-TOTAL:</p>
            <p className="text-[32px] leading-[38px] text-[#210203]">
              ${isNaN(totalCost) ? '0.00' : Number(totalCost).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
