import { TCartProduct } from '@/redux/features/cartSlice';
import { useMemo } from 'react';

export type TGroupedProducts = {
  tire?: TCartProduct;
  wheel?: TCartProduct;
  accessory?: TCartProduct;
};

/**
 * Determines the product type based on category slug
 */
const getProductType = (product: TCartProduct): keyof TGroupedProducts => {
  const categorySlug = product.category?.slug?.toLowerCase() || '';

  if (categorySlug.includes('tire') || categorySlug.includes('tires')) {
    return 'tire';
  }

  if (
    categorySlug.includes('wheel') ||
    categorySlug.includes('wheels') ||
    categorySlug.includes('rim')
  ) {
    return 'wheel';
  }

  // Default to accessory for anything else
  return 'accessory';
};

export const useGroupedProducts = (products: TCartProduct[]) => {
  const groupedProducts = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        const key = `${product.cartPackage}`;

        if (!acc[key]) {
          acc[key] = {};
        }

        const productType = getProductType(product);
        acc[key][productType] = product;

        return acc;
      },
      {} as Record<string, TGroupedProducts>
    );
  }, [products]);

  return Object.values(groupedProducts);
};
