'use client';

import { TInventoryItem } from '@/types/product';
import { useEffect, useState } from 'react';
import TireQuantity from '@/components/shared-old/TireQuantity/TireQuantity';
import { getPrice } from '@/utils/price';

const TireQuantitySection = ({ product }: { product: TInventoryItem[] }) => {
  const isSquare = product[1] !== null; // Check if the tire set is square (all tires same size)
  const [frontTireQuantity, setFrontTireQuantity] = useState(2);
  const [rearTireQuantity, setRearTireQuantity] = useState(2);

  useEffect(() => {
    // Reset quantities if the products change
    setFrontTireQuantity(4);
    setRearTireQuantity(0);
  }, [product, isSquare]);

  const price = getPrice(product[0]);

  return (
    <>
      {/* Display total price */}
      {/* <div className="flex justify-between items-baseline self-stretch relative w-full">
        <h4 className="text-xl font-bold text-[#0C0F0A]">Tires</h4>
      </div> */}
      {/* Quantity input and Add to Cart button */}
      <div className="flex flex-row justify-between items-baseline self-stretch relative w-full gap-4 mt-4">
        <TireQuantity
          otherQuantity={rearTireQuantity}
          product={product[0]}
          setQuantity={setFrontTireQuantity}
          quantityStep={isSquare ? 2 : 1}
          quantity={frontTireQuantity}
        />

        <div>
          <h2 className="text-xl">
            x <span className="font-semibold">${price}</span>{' '}
          </h2>
        </div>
      </div>
      <div className="flex flex-row justify-between items-baseline self-stretch relative w-full gap-4 mt-4">
        <h2 className="text-base font-normal">Tire set discount</h2>
        <h2 className="text-xl font-semibold">-${'0.00'}</h2>
      </div>
    </>
  );
};

export default TireQuantitySection;
