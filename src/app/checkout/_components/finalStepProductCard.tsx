import { TInventoryItem } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import TiresCard from '@/app/cart/_components/tires-card';
import { TCartProduct } from '@/redux/features/cartSlice';

{
  /* Order Details Section */
}
export const FinalStepProductCard: React.FC<{
  products?: {
    tires: TCartProduct[];
  }[]; // Array of products to display
  totalCost?: any; // Total cost of the products
}> = ({ products, totalCost }) => {
  return (
    <div className=" flex flex-col xl:flex-row mt-4 md:mt-8 gap-8">
      {/* Left Section: Cart Details */}
      <div className="w-full">
        {/* <CartTitle /> Display cart title */}

        <div className="overflow-hidden rounded-xl border border-[#cfcfcf] flex flex-col gap-0 items-start self-stretch relative w-full bg-white">
          {/* <CartYMM /> */}

          {products?.map((product, index) => (
            <TiresCard key={index} tires={product.tires} />
          ))}
          {/* <TiresCard tires={products} /> */}
          <div className="w-full items-center flex justify-between px-4 py-5 border-t">
            <p>SUB-TOTAL:</p>
            <p className="text-[32px] leading-[38px] text-[#210203]">
              ${isNaN(totalCost) ? '0.00' : Number(totalCost).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* summery */}
      {/* <CartSummary /> */}
    </div>
  );
};

// TireAttributes Component
const TireAttributes: React.FC<{ product: TInventoryItem }> = ({ product }) => {
  return (
    <div className="flex gap-2 w-full">
      {/* Tire Size */}
      <div className="border px-3 py-2 rounded-[6px] text-center w-fit">
        <div className="flex items-center justify-center gap-1">
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 8L1 11.5M1 11.5H3.92857M1 11.5V8.57143"
              stroke="#504949"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 5L11 1.5M11 1.5H8.07143M11 1.5V4.42857"
              stroke="#504949"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm font-normal text-muted-foreground">Size</p>
        </div>
        <p>{product.tireSize}</p>
      </div>

      {/* <div className="border px-3 py-2 rounded-[6px] text-center w-fit">
        <div className="flex items-center justify-center gap-1">
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 6.51306C1 9.08617 2.93356 11.2065 5.42339 11.4931C5.7908 11.5354 6.14691 11.3788 6.40841 11.1166C6.73514 10.7891 6.73514 10.2579 6.40841 9.93036C6.14691 9.66818 5.93372 9.27707 6.13094 8.96341C6.91927 7.7096 11 10.589 11 6.51306C11 3.74442 8.76142 1.5 6 1.5C3.23858 1.5 1 3.74442 1 6.51306Z"
              stroke="#504949"
            />
            <circle cx="8.75" cy="6.25" r="0.75" stroke="#504949" />
            <circle cx="3.25" cy="6.25" r="0.75" stroke="#504949" />
            <path
              d="M5.54297 3.99988C5.54297 4.41409 5.20718 4.74988 4.79297 4.74988C4.37876 4.74988 4.04297 4.41409 4.04297 3.99988C4.04297 3.58566 4.37876 3.24988 4.79297 3.24988C5.20718 3.24988 5.54297 3.58566 5.54297 3.99988Z"
              stroke="#504949"
            />
            <path
              d="M8 4C8 4.41421 7.66421 4.75 7.25 4.75C6.83579 4.75 6.5 4.41421 6.5 4C6.5 3.58579 6.83579 3.25 7.25 3.25C7.66421 3.25 8 3.58579 8 4Z"
              stroke="#504949"
            />
          </svg>

          <p className="text-sm font-normal text-muted-foreground">Finish</p>
        </div>
        <p>{product.finish}</p>
      </div>
      <div className="border px-3 py-2 rounded-[6px] text-center w-fit">
        <div className="flex items-center justify-center gap-1">
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 6.51306C1 9.08617 2.93356 11.2065 5.42339 11.4931C5.7908 11.5354 6.14691 11.3788 6.40841 11.1166C6.73514 10.7891 6.73514 10.2579 6.40841 9.93036C6.14691 9.66818 5.93372 9.27707 6.13094 8.96341C6.91927 7.7096 11 10.589 11 6.51306C11 3.74442 8.76142 1.5 6 1.5C3.23858 1.5 1 3.74442 1 6.51306Z"
              stroke="#504949"
            />
            <circle cx="8.75" cy="6.25" r="0.75" stroke="#504949" />
            <circle cx="3.25" cy="6.25" r="0.75" stroke="#504949" />
            <path
              d="M5.54297 3.99988C5.54297 4.41409 5.20718 4.74988 4.79297 4.74988C4.37876 4.74988 4.04297 4.41409 4.04297 3.99988C4.04297 3.58566 4.37876 3.24988 4.79297 3.24988C5.20718 3.24988 5.54297 3.58566 5.54297 3.99988Z"
              stroke="#504949"
            />
            <path
              d="M8 4C8 4.41421 7.66421 4.75 7.25 4.75C6.83579 4.75 6.5 4.41421 6.5 4C6.5 3.58579 6.83579 3.25 7.25 3.25C7.66421 3.25 8 3.58579 8 4Z"
              stroke="#504949"
            />
          </svg>

          <p className="text-sm font-normal text-muted-foreground">Offset</p>
        </div>
        <p>{product.offset}mm</p>
      </div> */}
    </div>
  );
};

// QuantityInput Component
type QuantityInputProps = {
  className?: string;
  onIncrease: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onDecrease: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string | number;
  quantityStep: string | number;
  maxInputValue: string | number;
  inputName: string;
  id: string;
};

const QuantityInput: React.FC<QuantityInputProps> = ({
  onDecrease,
  onIncrease,
  onInputChange,
  inputValue,
  quantityStep,
  maxInputValue,
  id,
  inputName,
}) => {
  return (
    <div className="flex items-center w-fit border rounded-xs !py-0 !my-0 h-14">
      {/* Decrease Button */}
      <div
        onClick={onDecrease}
        className="w-full flex items-center justify-center border-r h-full max-w-14 min-w-14 cursor-pointer"
      >
        <Minus />
      </div>
      {/* Quantity Input */}
      <Input
        onChange={onInputChange}
        value={inputValue}
        step={quantityStep}
        min={quantityStep}
        max={maxInputValue}
        name={inputName}
        id={id}
        className="border-none w-full focus:outline-none focus:ring-0 h-full max-w-14 min-w-14"
      />
      {/* Increase Button */}
      <div
        onClick={onIncrease}
        className="w-full flex items-center justify-center border-l h-full max-w-14 min-w-14 cursor-pointer"
      >
        <Plus />
      </div>
    </div>
  );
};
