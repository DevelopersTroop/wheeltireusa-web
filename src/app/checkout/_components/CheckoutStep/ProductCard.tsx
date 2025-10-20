import React from 'react';
import CheckoutSubTotal from './checkoutSubtotal';
import { useTypedSelector } from '@/redux/store';
import TiresCard from '@/app/cart/_components/TiresCard/TiresCard';
import { useGroupedProducts } from '@/hooks/useGroupedProducts';

// ProductCard Component
export const ProductCard: React.FC<{
  disableQuantityInput?: boolean;
}> = ({ disableQuantityInput = false }) => {
  const { productsInfo } = useTypedSelector(
    (state) => state.persisted.checkout
  );

  const groupedProducts = useGroupedProducts(productsInfo || []);

  return (
    <div className="flex flex-col xl:flex-row mt-2 md:mt-8 gap-8">
      {/* Left Section: Cart Details */}
      <div className="w-full">
        {/* <CartTitle /> Display cart title */}

        <div className="overflow-hidden rounded-xl border border-[#cfcfcf] flex flex-col gap-0 items-start self-stretch relative w-full bg-white">
          {/* <CartYMM /> */}
          {groupedProducts?.map((tires, index) => (
            <TiresCard key={index} tires={tires.tires} />
          ))}
          {/* <TiresCard tires={productsInfo} /> */}
          <CheckoutSubTotal /> {/* Display cart subtotal */}
        </div>
      </div>

      {/* summery */}
      {/* <CartSummary /> */}
    </div>
  );
};