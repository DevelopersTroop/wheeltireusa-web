import { TCartProduct } from '@/redux/features/cartSlice';
import { useMemo } from 'react';

export const useGroupedProducts = (products: TCartProduct[]) => {
  const groupedProducts = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        const key = `${product.cartPackage}`;
        if (!acc[key]) {
          acc[key] = { tires: [] };
        }
        acc[key].tires.push(product);
        return acc;
      },
      {} as Record<
        string,
        {
          tires: TCartProduct[];
        }
      >
    );
  }, [products]);

  return Object.values(groupedProducts);
};
