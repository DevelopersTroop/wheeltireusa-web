import { TInventoryItem } from '@/types/product';
import { s3BucketUrl } from './api';
import { TWishListData } from '@/types/wishlist';
import { TCartProduct } from '@/redux/features/cartSlice';

export const isInventoryItem = (
  product: TInventoryItem | TCartProduct | TWishListData
): product is TInventoryItem => {
  return 'image_url' in product;
};

export const isWishListData = (
  product: TInventoryItem | TCartProduct | TWishListData
): product is TWishListData => {
  return 'image_url' in product;
};

export const getProductThumbnail = (
  product: TInventoryItem | TCartProduct | TWishListData
) => {
  // const imageUrl = isInventoryItem(product)
  //   ? product?.image_url
  //   : isWishListData(product)
  //     ? product?.image_url
  //     : product?.item_image;

  let imageUrl: string | undefined;
  if (isInventoryItem(product)) {
    imageUrl = product.image_url;
  } else if (isWishListData(product)) {
    imageUrl = product.image_url;
  }

  if (!imageUrl?.length) {
    return '/tire-not-available.png';
  }
  if (imageUrl.startsWith('https') || imageUrl.startsWith('http')) {
    return imageUrl;
  }
  return `${s3BucketUrl}/${imageUrl}`;
};
