import { TCartProduct } from '@/redux/features/cartSlice';
import { TInventoryItem } from '@/types/product';

// Props type for the TireQuantity component
export interface TireQuantityProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  product?: TInventoryItem;
  otherQuantity: number;
  quantityStep?: number;
  isCart?: boolean;
  cartProduct?: TCartProduct;
}

// Check if increasing quantity should be disabled
export const isIncreaseDisabled = (
  quantity: number,
  otherQuantity: number,
  quantityStep: number,
  product?: TInventoryItem,
  cartProduct?: TCartProduct
) => {
  return (
    quantityStep + otherQuantity + quantity >
    (product?.inventory_available || cartProduct?.inventory_available || 4)
  );
};

// Check if decreasing quantity should be disabled
export const isDecreaseDisabled = (quantity: number, quantityStep: number) => {
  return quantity - quantityStep < 1;
};
