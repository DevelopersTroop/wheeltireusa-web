'use client';

import { TInventoryItem } from '@/types/product';
import QuantityInput from './quantity-input';

const TireQuantitySection = ({ product }: { product: TInventoryItem }) => {
  return (
    <>
      {/* Display total price */}
      <div className="flex justify-between items-baseline self-stretch relative w-full">
        <h4 className="text-xl font-bold text-[#0C0F0A]">Tires</h4>
      </div>
      {/* Quantity input and Add to Cart button */}
      <div className="flex flex-row justify-between items-baseline self-stretch relative w-full gap-4 mt-4">
        <QuantityInput
          product={product}
          inventoryAvailable={product?.inventory_available ?? 4}
          name={'quantity'}
          id={'quantity'}
          isDually={product?.dually ?? false}
        />

        <div>
          <h2 className="text-xl">
            x <span className="font-semibold">${product?.price}</span>{' '}
          </h2>
        </div>
      </div>
      <div className="flex flex-row justify-between items-baseline self-stretch relative w-full gap-4 mt-4">
        <h2 className="text-base font-normal">Tire set discount</h2>
        <h2 className="text-xl font-semibold">-${product?.price * 4} </h2>
      </div>
    </>
  );
};

export default TireQuantitySection;
