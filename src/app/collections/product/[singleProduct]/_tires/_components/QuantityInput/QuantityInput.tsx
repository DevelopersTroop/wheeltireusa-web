'use client';
import QuantityInputBox from '@/components/ui/quantity-input-box/quantity-input-box';
import { getMaxQuantity, QuantityInputProps } from './utils/quantityInput';

// The main component for inputting the product quantity
const QuantityInput = ({
  name,
  inventoryAvailable,
  id,
  className = '',
}: QuantityInputProps) => {
  const maxQuantity = getMaxQuantity(inventoryAvailable);
  return (
    <>
      {/* Render the QuantityInputBox component to manage the quantity input UI */}
      <QuantityInputBox
        className={className}
        id={id}
        inputName={name}
        inputValue={4}
        maxInputValue={maxQuantity}
        minInputValue={4}
        onDecrease={() => {}}
        onIncrease={() => {}}
        onInputChange={() => {}}
        quantityStep={1}
      />
    </>
  );
};

export default QuantityInput;
