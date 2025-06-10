import { TInventoryItem, TInventoryListItem } from '@/types/product';
import { s3BucketUrl } from './api';
import { TWishListData } from '@/types/wishlist';
import { TCartProduct } from '@/redux/features/cartSlice';

export const isInventoryItem = (
  product: TInventoryItem | TInventoryListItem | TCartProduct | TWishListData
): product is TInventoryItem => {
  return 'image_url' in product;
};

export const isWishListData = (
  product: TInventoryItem | TInventoryListItem | TCartProduct | TWishListData
): product is TWishListData => {
  return 'image_url' in product;
};

export const getProductThumbnail = (
  product: TInventoryItem | TInventoryListItem | TCartProduct | TWishListData
) => {
  const imageUrl = isInventoryItem(product)
    ? product?.image_url
    : isWishListData(product)
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
