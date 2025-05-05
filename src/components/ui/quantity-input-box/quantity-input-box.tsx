'use client';
import { cn } from '@/lib/utils';
import React, { ChangeEvent } from 'react';
import { Minus, Plus } from 'lucide-react';

type QuantityInputBoxProps = {
  className?: string;
  onIncrease: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDecrease: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string | number;
  quantityStep: string | number;
  maxInputValue: string | number;
  inputName: string;
  id: string;
  borderColor?: string;
  minInputValue?: number;
};
const QuantityInputBox = ({
  minInputValue = 1,
  onIncrease,
  onDecrease,
  inputName,
  id,
  onInputChange,
  inputValue,
  quantityStep,
  maxInputValue,
}: QuantityInputBoxProps) => {
  return (
    <>
      <div className="flex gap-0 items-start relative w-[164px]">
        <button
          onClick={onIncrease}
          className={cn(
            'rounded-tl-xl rounded-bl-xl border border-[#cfcfcf] p-3 flex gap-2 justify-center items-center relative w-14 h-14 bg-white disabled:cursor-not-allowed disabled:text-gray-500'
          )}
          disabled={Number(inputValue) <= Number(minInputValue)}
        >
          <Minus size={18} />
        </button>
        <div className="border-x-0 border-y border-[#cfcfcf]  flex gap-2 justify-center items-center flex-1 self-stretch relative  bg-white">
          <input
            type="number"
            disabled={true}
            value={inputValue}
            onChange={onInputChange}
            step={quantityStep}
            min={quantityStep}
            max={maxInputValue}
            name={inputName}
            id={id}
            className="p-3 w-14 disabled:cursor-not-allowed disabled:bg-white text-base leading-[19px] text-[#210203] font-normal focus:outline-none text-center"
          />
        </div>
        <button
          onClick={onDecrease}
          className={cn(
            'rounded-tr-xl rounded-br-xl border border-[#cfcfcf] p-3 flex gap-2 justify-center items-center relative w-14 h-14 bg-white disabled:cursor-not-allowed disabled:text-gray-500'
          )}
          disabled={Number(inputValue) >= Number(maxInputValue)}
        >
          <Plus size={18} />
        </button>
      </div>
    </>
  );
};

export default QuantityInputBox;
