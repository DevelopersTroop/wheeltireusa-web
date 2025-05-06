import { TCartState } from './../globalRedux/features/cart/cart-slice';
export function formatPrice(number: number | undefined | null): string {
  if (typeof number === 'undefined' || number === null || isNaN(number)) {
    return '0.00';
  }
  // Fix the number to 2 decimal places and add comma formatting
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
  msrp: number | undefined | null,
  map: number | undefined | null
): number {
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
  products: TCartState['products'],
  discount?: number,
  format: boolean = true
): T {
  let totalPrice = 0;
  for (const sku in products) {
    const product = products[sku];
    totalPrice +=
      (getPrice(product?.msrp, product?.price) ?? 0) * (product?.quantity ?? 1);
  }
  return format
    ? (formatPrice(totalPrice - (discount ?? 0)) as T)
    : (totalPrice as T);
}
