import { TCartProduct } from '@/redux/features/cartSlice';
import { TCheckoutState } from '@/redux/features/checkoutSlice';
import { TProductInfo } from '@/types/order';
import { TInventoryItem } from '@/types/product';

export function formatPrice(data?: number | null | TInventoryItem): string {
  const formatter = (price: number) =>
    price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  if (typeof data === 'number') {
    return isNaN(data) ? '0.00' : formatter(data);
  }

  if (data && typeof data === 'object') {
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
  const msrp = product?.msrp ?? 0;
  const map = product?.price ?? 0;

  if (map === 0 && msrp === 0) {
    return 0;
  }

  if (isSale(msrp, map) || msrp === 0) {
    return map;
  }

  return msrp;
}

export function calculateCartTotal<T = string>(
  products: TCartProduct[],
  discount?: number,
  format: boolean = true
): T {
  let totalPrice = 0;
  for (const product of products) {
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
