import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import CheckoutSubTotal from './checkoutSubTotal';
import { useTypedSelector } from '@/redux/store';
import TiresCard from '@/app/cart/_components/tires-card';

// ProductCard Component
export const ProductCard: React.FC<{
  disableQuantityInput?: boolean;
}> = ({ disableQuantityInput = false }) => {
  const { productsInfo } = useTypedSelector(
    (state) => state.persisted.checkout
  );

  return (
    <div className="flex flex-col xl:flex-row mt-2 md:mt-8 gap-8">
      {/* Left Section: Cart Details */}
      <div className="w-full">
        {/* <CartTitle /> Display cart title */}

        <div className="overflow-hidden rounded-xl border border-[#cfcfcf] flex flex-col gap-0 items-start self-stretch relative w-full bg-white">
          {/* <CartYMM /> */}
          {productsInfo.map((product) => (
            <TiresCard key={product._id} tire={product} />
          ))}
          <CheckoutSubTotal /> {/* Display cart subtotal */}
        </div>
      </div>

      {/* summery */}
      {/* <CartSummary /> */}
    </div>
  );
};
