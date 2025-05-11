'use client';

import { useTypedSelector } from '@/redux/store';
import { Minus, Plus } from 'lucide-react';
import React, { useMemo } from 'react';

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
};
const CartQuantityInputBox = ({
  onIncrease,
  onDecrease,
  inputName,
  id,
  onInputChange,
  inputValue,
  quantityStep,
  maxInputValue,
}: QuantityInputBoxProps) => {
  const { products } = useTypedSelector((state) => state.persisted.cart);

  const isDisabled = useMemo(() => {
    const productsData = Object.values(products).filter(
      (p) => p.cartPackage === id && p.item_class !== 'Accessories'
    );
    const increseDisabled = productsData.some((p) => {
      return (
        p.inventory_available &&
        (p?.quantity ?? 1) + (p?.inventoryStep ?? 1) - 1 >=
          p.inventory_available
      );
    });
    const decreaseDisabled = productsData.some(
      (p) => p.quantity === p.minInventory
    );
    return {
      increase: increseDisabled,
      decrease: decreaseDisabled,
    };
  }, [Object.values(products), id]);
  return (
    <div className={'flex gap-0 items-start relative w-[164px]'}>
      <button
        onClick={onIncrease}
        disabled={isDisabled.decrease}
        className="rounded-tl-xl rounded-bl-xl border border-[#cfcfcf] p-3 flex gap-2 justify-center items-center relative w-14 h-14 bg-white disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <Minus size={18} />
      </button>
      <div className="border-x-0 border-y border-[#cfcfcf] p-3 flex gap-2 justify-center items-center flex-1 self-stretch relative w-full bg-white">
        <input
          disabled
          onChange={onInputChange}
          value={inputValue}
          step={quantityStep}
          min={quantityStep}
          max={maxInputValue}
          type="number"
          name={inputName}
          id={id}
          className={
            '-mt-0.5 h-full text-center appearance-none-input-number focus:outline-none disabled:cursor-not-allowed bg-white'
          }
        />
      </div>
      <button
        disabled={isDisabled.increase}
        onClick={onDecrease}
        className="rounded-tr-xl rounded-br-xl border border-[#cfcfcf] p-3 flex gap-2 justify-center items-center relative w-14 h-14 bg-white disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default CartQuantityInputBox;
