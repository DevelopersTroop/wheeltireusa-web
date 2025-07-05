import { TCartProduct } from '@/redux/features/cartSlice';
import { TInventoryItem } from '@/types/product';
import { triggerGaAddToCart } from '@/utils/analytics';
import { getPrice } from '@/utils/price';
import { v4 as uuidv4 } from 'uuid';

// Calculate total price and return formatted price
export const calculateTotalPrice = (
  product: TInventoryItem[],
  frontQuantity: number,
  rearQuantity: number
) => {
  const frontPrice = getPrice(product[0])?.toFixed(2);
  const rearPrice = getPrice(product[1])?.toFixed(2);

  let totalPrice = Number(frontPrice) * frontQuantity;
  if (!Number.isNaN(Number(rearPrice))) {
    totalPrice += Number(rearPrice) * rearQuantity;
  }

  return totalPrice.toFixed(2).split('.');
};

// Prepare cart product data to dispatch
export const prepareCartData = (
  product: TInventoryItem[],
  isSquare: boolean,
  frontQuantity: number,
  rearQuantity: number
) => {
  const cartPackage = uuidv4();

  if (isSquare) {
    const cartProduct = {
      ...product[0],
      cartPackage,
      quantity: 4,
    };
    return cartProduct as TCartProduct;
  } else {
    const cartProducts = product.map((p, id) => {
      triggerGaAddToCart(p, frontQuantity + rearQuantity);
      return {
        ...p,
        cartPackage,
        quantity: id === 0 ? frontQuantity : rearQuantity,
      };
    });
    return cartProducts as TCartProduct[];
  }
};
