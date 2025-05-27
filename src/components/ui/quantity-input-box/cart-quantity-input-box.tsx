'use client';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

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
const CartQuantityInputBox = ({
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
  // const { products } = useTypedSelector((state) => state.persisted.cart);

  // const isDisabled = useMemo(() => {
  //   const productsData = Object.values(products).filter(
  //     (p) => p.cartPackage === id && p.item_class !== 'Accessories'
  //   );
  //   const increseDisabled = productsData.some((p) => {
  //     return (
  //       p.inventory_available &&
  //       (p?.quantity ?? 1) + (p?.inventoryStep ?? 1) - 1 >=
  //         p.inventory_available
  //     );
  //   });
  //   const decreaseDisabled = productsData.some(
  //     (p) => p.quantity === p.minInventory
  //   );
  //   return {
  //     increase: increseDisabled,
  //     decrease: decreaseDisabled,
  //   };
  // }, [Object.values(products), id]);
  return (
    <div className={'flex gap-0 items-start relative w-[164px]'}>
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
          disabled={true}
          onChange={onInputChange}
          value={inputValue}
          step={quantityStep}
          min={quantityStep}
          max={maxInputValue}
          type="number"
          name={inputName}
          id={id}
          className={
            'p-3 w-14 disabled:cursor-not-allowed disabled:bg-white text-base leading-[19px] text-[#210203] font-normal focus:outline-none text-center'
          }
        />
      </div>
      <button
        // disabled={isDisabled.increase}
        onClick={onDecrease}
        className="rounded-tr-xl rounded-br-xl border border-[#cfcfcf] p-3 flex gap-2 justify-center items-center relative w-14 h-14 bg-white disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default CartQuantityInputBox;
