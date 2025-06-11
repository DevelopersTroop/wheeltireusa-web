import { TCartProduct } from '@/redux/features/cartSlice';
import { TCheckoutState } from '@/redux/features/checkoutSlice';
import { TProductInfo } from '@/types/order';
import { TInventoryItem } from '@/types/product';

export function formatPrice(data?: number | null | TInventoryItem): string {
  // Fix the number to 2 decimal places and add comma formatting
  const formatter = (price: number) =>
    price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  if (
    typeof data === 'number' ||
    typeof data === 'undefined' ||
    data === null
  ) {
    if (typeof data === 'undefined' || data === null || isNaN(data)) {
      return '0.00';
    }
  } else {
    return formatter(getPrice(data));
  }
  return '0.00';
}
export function isSale(
  msrp: number | undefined | null,
  map: number | undefined | null
): boolean {
  if (typeof msrp === 'undefined' || msrp === null) {
    return false;
  }
  if (typeof map === 'undefined' || map === null) {
    return false;
  }
  return msrp > map && map !== 0 && msrp !== 0;
}
export function getPrice(
  product: TInventoryItem | TProductInfo | TCartProduct
): number {
  const msrp = product?.msrp;
  const map = product?.price;
  if (typeof msrp === 'undefined' || msrp === null) {
    return map ?? 0;
  }
  if (typeof map === 'undefined' || map === null) {
    return msrp;
  }
  if (isSale(msrp, map)) {
    return map;
  }
  if (msrp === 0) {
    return map;
  }
  if (map === 0) {
    return msrp;
  }
  return map;
}

export function calculateCartTotal<T = string>(
  products: TCartProduct[],
  discount?: number,
  format: boolean = true
): T {
  let totalPrice = 0;
  for (const sku in products) {
    const product = products[sku];
    totalPrice += (getPrice(product) ?? 0) * (product?.quantity ?? 1);
  }
  return format
    ? (formatPrice(totalPrice - (discount ?? 0)) as T)
    : (totalPrice as T);
}

export const calculateCheckoutTotal = <T = string>(
  products: TCheckoutState['productsInfo'],
  discount?: number,
  format: boolean = true
) => {
  let totalPrice = 0;
  for (const product of products) {
    totalPrice += (getPrice(product) ?? 0) * (product?.quantity ?? 1);
  }
  return format
    ? (formatPrice(totalPrice - (discount ?? 0)) as T)
    : (totalPrice as T);
};
