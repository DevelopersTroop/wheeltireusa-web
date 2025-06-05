'use client';
// import { duallyStep, step } from "@/app/(pages)/collections/product/[singleProduct]/_in-stock-product/in-stock-wheel";
import QuantityInputBox from '@/components/ui/quantity-input-box/quantity-input-box';
// import QuantityInputBox from '@/app/ui/quantity-input-box/quantity-input-box';

// Type definition for the props expected by QuantityInput component
type QuantityInputProps = {
  name: string;
  inventoryAvailable: number;
  id: string;
  className?: string;
  [props: string]: unknown;
};

// The main component for inputting the product quantity
const QuantityInput = ({
  name,
  inventoryAvailable,
  id,
  className = '',
}: QuantityInputProps) => {
  const maxQuantity =
    inventoryAvailable === -1
      ? Infinity
      : Math.floor(inventoryAvailable / 1) * 1;

  // Function to update the quantity in the Redux store based on product type (dually or regular)

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
