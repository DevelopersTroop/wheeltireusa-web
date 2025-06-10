import { TInventoryItem, TInventoryListItem } from '@/types/product';
import { s3BucketUrl } from './api';
import { TCartProduct } from '@/types/cart';

export const isInventoryItem = (
  product: TInventoryItem | TInventoryListItem | TCartProduct
): product is TInventoryItem => {
  return 'image_url' in product;
};

export const getProductThumbnail = (
  product: TInventoryItem | TInventoryListItem | TCartProduct
) => {
  const imageUrl = isInventoryItem(product)
    ? product?.image_url
    : product?.item_image;
  if (!imageUrl?.length) {
    return '/tire-not-available.png';
  }
  if (imageUrl.startsWith('https') || imageUrl.startsWith('http')) {
    return imageUrl;
  }
  return `${s3BucketUrl}/${imageUrl}`;
};
