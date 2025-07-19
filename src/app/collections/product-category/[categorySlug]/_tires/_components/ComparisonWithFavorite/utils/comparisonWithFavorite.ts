import { TInventoryItem } from '@/types/product';

// Type for the props
export interface ComparisonWithFavoriteProps {
  product: TInventoryItem[];
}

// Generate product link
export const generateProductLink = (product: TInventoryItem[]) => {
  let singleTirePageLink = `/collections/product/${product[0]?.slug}`;
  if (product.length > 1) {
    singleTirePageLink += `?slug=${product[1]?.slug}`;
  }
  return singleTirePageLink;
};

// Prepare wishlist payload
export const prepareWishlistData = (
  product: TInventoryItem[],
  slug: string
) => {
  return {
    slug,
    data: {
      title:
        product.length > 1
          ? `${product[0].brand} ${product[1].brand}`
          : `${product[0].brand}`,
      category: product[0]?.category,
      imageUrl: product[0].itemImage,
      partNumber: product[0]?.partnumber,
    },
  };
};
