// Importing necessary components from 'lucide-react' and React
import { Minus, Plus } from 'lucide-react';
import React from 'react';

// Functional component to display the tire quantity with disabled quantity controls
const TireQuantity = ({ quantity }: { quantity: number }) => {
  return (
    <div className="flex gap-0 items-start relative w-[164px]">
      {/* Decrease quantity button */}
      <button
        disabled={true}
        className="rounded-tl-xl rounded-bl-xl border border-[#cfcfcf] p-3 flex gap-2 justify-center items-center relative w-10 h-10 bg-white disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <Minus size={18} />
      </button>
      {/* Middle section displaying the current quantity */}
      <div className="border-x-0 border-y cursor-not-allowed border-[#cfcfcf] px-3 flex gap-2 justify-center items-center  self-stretch relative bg-white">
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#210203] text-base font-normal">
            {quantity}
          </span>
        </p>
      </div>
      {/* Increase quantity button */}
      <button
        disabled={true}
        className="rounded-tr-xl rounded-br-xl border border-[#cfcfcf] p-3 flex gap-2 justify-center items-center relative w-10 h-10 bg-white disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default TireQuantity;
