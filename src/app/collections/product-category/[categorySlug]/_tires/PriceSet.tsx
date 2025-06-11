import { TInventoryItem, TInventoryListItem } from '@/types/product';
import { getPrice } from '@/utils/price';
import React from 'react';

// PriceSet component to calculate and display the total price of a set of tires
const PriceSet = ({
  front,
  rear,
  frontQuantity,
  rearQuantity,
}: {
  front: TInventoryItem;
  rear: TInventoryItem;
  frontQuantity: number;
  rearQuantity: number;
}) => {
  const frontPrice = getPrice(front).toFixed(2);
  const rearPrice = getPrice(rear).toFixed(2);
  // Calculate total price by multiplying price per unit with quantity
  let totalPrice = Number(frontPrice) * frontQuantity;
  // Check if rearPrice is a valid number before adding to totalPrice
  if (!Number.isNaN(Number(rearPrice))) {
    totalPrice += Number(rearPrice) * rearQuantity;
  }

  // Convert total price to fixed decimal format and split into dollars and cents
  const splitedPrice = totalPrice.toFixed(2).split('.');
  return (
    <div className="flex gap-1 items-baseline relative">
      {/* Display total quantity of tires */}
      <small className="text-lg leading-[17px] font-normal text-[#464853]">
        <span className="">Set of {frontQuantity + rearQuantity} tires:</span>
      </small>
      {/* Display formatted price */}
      <div className="flex gap-0 items-baseline relative text-[#AFB0B6] line-through">
        <h4 className="text-2xl leading-[29px] ">
          <span className="text-2xl">${splitedPrice[0]}.</span>
        </h4>
        <small className="text-sm leading-[17px]">
          <span className="">{splitedPrice[1]}</span>
        </small>
      </div>

      <div className="flex gap-0 items-baseline relative">
        <h4 className="text-2xl leading-[29px] text-[#210203]">
          <span className="text-[#210203] text-2xl font-bold">
            ${splitedPrice[0]}.
          </span>
        </h4>
        <small className="text-sm leading-[17px] text-[#210203]">
          <span className="text-[#210203] text-sm font-bold">
            {splitedPrice[1]}
          </span>
        </small>
      </div>
    </div>
  );
};

export default PriceSet;
