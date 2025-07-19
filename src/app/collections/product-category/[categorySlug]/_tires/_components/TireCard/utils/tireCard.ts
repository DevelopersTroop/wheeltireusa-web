import { TInventoryItem } from '@/types/product';
import { getPrice } from '@/utils/price';

// Type for TireCard props
export interface TireCardProps {
  products: TInventoryItem[];
  wheelInfo: {
    frontForging: string;
    rearForging: string;
    hasDually: boolean;
    hasOffRoad: boolean;
  };
}

// Generate product page link based on product array
export const generateProductLink = (products: TInventoryItem[]) => {
  let link = `/collections/product/${products[0]?.slug}`;
  if (products.length > 1) {
    link += `?slug=${products[1]?.slug}`;
  }
  return link;
};

// Calculate total price based on front and rear tire quantities
export const calculateTotalPrice = (
  products: TInventoryItem[],
  frontQuantity: number,
  rearQuantity: number
) => {
  const frontPrice = getPrice(products[0])?.toFixed(2);
  const rearPrice = getPrice(products[1])?.toFixed(2);

  let total = Number(frontPrice) * frontQuantity;
  if (!Number.isNaN(rearPrice)) {
    total += Number(rearPrice) * rearQuantity;
  }
  return total;
};
