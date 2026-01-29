// Importing necessary components from 'lucide-react' and React
import { useAppDispatch } from '@/redux/store';
import { Minus, Plus } from 'lucide-react';
import React, { useMemo } from 'react';
import {
  TireQuantityProps,
  isIncreaseDisabled,
  isDecreaseDisabled,
} from './utils/tireQuantity';
import { updateCartQuantity } from '@/redux/features/cartSlice';

// Functional component to display the tire quantity with disabled quantity controls
const TireQuantity: React.FC<TireQuantityProps> = ({
  quantity,
  setQuantity,
  product,
  otherQuantity,
  quantityStep = 1,
  isCart,
  cartProduct,
}) => {
  const dispatch = useAppDispatch();
  // Disable increase
  const isDisabledIncrease = useMemo(
    () =>
      isIncreaseDisabled(
        quantity,
        otherQuantity,
        quantityStep,
        product,
        cartProduct
      ),
    [quantity, otherQuantity, quantityStep, product, cartProduct]
  );

  // Disable Decrease
  const isDisabledDecrease = useMemo(
    () => isDecreaseDisabled(quantity, quantityStep),
    [quantity, quantityStep]
  );

  // Update Quantity
  const updateQuantity = (type: 'increase' | 'decrease') => {
    if (product) {
      setQuantity((prev) => {
        return type === 'decrease' ? prev - quantityStep : prev + quantityStep;
      });
    }
    if (cartProduct && isCart) {
      dispatch(
        updateCartQuantity({
          id: cartProduct.id,
          quantity: type === 'decrease' ? -quantityStep : quantityStep,
        })
      );
    }
  };
  return (
    <div className="flex gap-0 items-start relative ">
      {/* Decrease quantity button */}
      <button
        onClick={() => updateQuantity('decrease')}
        disabled={true}
        className="rounded-tl-xl rounded-bl-xl border border-[#cfcfcf] p-3 flex gap-2 justify-center items-center relative w-10 h-10 bg-white disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <Minus size={18} />
      </button>
      {/* Middle section displaying the current quantity */}
      <div className="border-x-0 border-y cursor-not-allowed w-10 border-[#cfcfcf] px-3 flex gap-2 justify-center items-center  self-stretch relative bg-white">
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#210203] text-base font-normal">
            {quantity}
          </span>
        </p>
      </div>
      {/* Increase quantity button */}
      <button
        onClick={() => updateQuantity('increase')}
        disabled={isDisabledIncrease}
        className="rounded-tr-xl rounded-br-xl border border-[#cfcfcf] p-3 flex gap-2 justify-center items-center relative w-10 h-10 bg-white disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default TireQuantity;
