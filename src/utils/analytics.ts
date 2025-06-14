import { sendGAEvent } from '@next/third-parties/google';
import { TInventoryItem } from '../types/product';

export const triggerEvent = (
  eventName: string,
  eventParams: Record<string, any>
) => {
  sendGAEvent('event', eventName, {
    ...eventParams,
    app_name: 'Tirematic',
    // category: eventName,
  });
};

export const triggerGaAddToCart = (
  product: TInventoryItem | null,
  quantity: number
) => {
  if (!product) {
    return;
  }
  triggerEvent('add_to_cart', {
    item_id: product.partnumber || product._id,
    item_name: product.title,
    price: product.price,
    item_category: product?.category?.title,
    quantity,
    category: 'Add to Cart',
  });
};

export const triggerGaPurchaseEvent = (eventParams: Record<string, any>) => {
  triggerEvent('purchase', eventParams);
};

export const triggerGaSignupEvent = (eventParams: Record<string, any>) => {
  triggerEvent('sign_up', {
    ...eventParams,
    category: 'Sign Up',
  });
};

export const triggerGaNewsletterSignupEvent = (
  eventParams: Record<string, any>
) => {
  triggerEvent('newsletter_signup', {
    ...eventParams,
    category: 'Newsletter Signup',
  });
};
