import { TInventoryItem } from '@/types/product';
import { triggerGaAddToCart } from '@/utils/analytics';
import { v4 as uuidv4 } from 'uuid';

// Types
export interface TireCardButtonProps {
  products: TInventoryItem[];
  wheelInfo: {
    frontForging: string;
    rearForging: string;
    hasDually: boolean;
    hasOffRoad: boolean;
  };
  frontTireQuantity: number;
  rearTireQuantity: number;
}

// Cart products preparation logic
export const prepareCartProducts = (
  products: TInventoryItem[],
  frontTireQuantity: number,
  rearTireQuantity: number
) => {
  const cartPackage = uuidv4();

  return products.map((product, index) => {
    const quantity = index === 0 ? frontTireQuantity : rearTireQuantity;

    triggerGaAddToCart(product, frontTireQuantity + rearTireQuantity);

    return {
      ...product,
      cartPackage,
      quantity,
    };
  });
};
