import { TInventoryItem } from '@/types/product';

// Generate wishlist slug URL
export const generateWishlistSlug = (product: TInventoryItem[]) => {
  let link = `/collections/product/${product[0]?.slug}`;
  if (product[1] !== null) {
    link += `?slug=${product[1]?.slug}`;
  }
  return link;
};

// Generate wishlist title
export const generateWishlistTitle = (product: TInventoryItem[]) => {
  return product[1] !== null
    ? `${product[0].brand} ${product[1].brand}`
    : `${product[0].brand}`;
};
