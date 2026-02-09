import { TCartProduct } from '../types/cart';
import { TOrder, TProductInfo } from '../types/order';
import { TInventoryItem } from '../types/product';
import { getPrice } from './price';

export const sendGtmEvent = (
  event: string,
  params: Record<string, any> = {}
) => {
  if (typeof window === 'undefined') return;

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  window.dataLayer.push({
    event,
    ...params,
  });
};

export const triggerEvent = (
  eventName: string,
  eventParams: Record<string, any>
) => {
  sendGtmEvent(eventName, {
    ...eventParams,
    app_name: 'Amani Forged',
  });
};

export const triggerGaAddToCart = (
  product: TInventoryItem | null,
  quantity: number
) => {
  if (!product) return;

  triggerEvent('add_to_cart', {
    ecommerce: {
      currency: 'USD',
      items: [
        {
          item_id: product?.partNumber || product?.id,
          item_name: product.title,
          item_category: product?.category?.title,
          price: getPrice(product),
          quantity,
        },
      ],
    },
  });
};

export const triggerGaSignupEvent = (eventParams: Record<string, any>) => {
  triggerEvent('sign_up', {
    method: eventParams.method || 'email',
  });
};

// Option 1: keep custom event
export const triggerGaNewsletterSignupEvent = (
  eventParams: Record<string, any>
) => {
  triggerEvent('newsletter_signup', {
    ...eventParams,
  });
};

// Option 2 (recommended): treat as a special signup
/*
export const triggerGaNewsletterSignupEvent = () => {
  triggerEvent("sign_up", { method: "newsletter" });
};
*/

export const triggerGaBeginCheckoutEvent = (
  subTotalCost: number,
  products: TCartProduct[]
) => {
  triggerEvent('begin_checkout', {
    ecommerce: {
      value: subTotalCost,
      currency: 'USD',
      items: products.map((product, index) => ({
        item_id: product.sku || product.id,
        item_name: product.title,
        item_category: product.category?.title || 'Uncategorized',
        item_brand: product.brand,
        item_variant: `Front:${
          product?.metaData?.frontForging || 'N/A'
        } | Rear:${product?.metaData?.rearForging || 'N/A'}`,
        price: product?.sellingPrice,
        quantity: product.quantity || 1,
        index,
      })),
    },
  });
};

export const triggerGaAddShippingInfoEvent = (
  subTotalCost: number,
  products: TProductInfo[],
  shippingTier: string // e.g., "Ground", "2-Day Air", "Overnight"
) => {
  triggerEvent('add_shipping_info', {
    ecommerce: {
      value: subTotalCost,
      currency: 'USD',
      shipping_tier: shippingTier, // Add the selected shipping tier
      items: products.map((product, index) => ({
        item_id: product.partNumber || product.id,
        item_name: product.title,
        item_category: product.category?.title || 'Uncategorized',
        item_brand: product.brand,

        price: product?.sellingPrice,
        quantity: product.quantity || 1,
        index,
      })),
    },
  });
};

// --- ✨ NEW FUNCTION 2: ADD PAYMENT INFO ---
/**
 * Call this function when the user selects a payment method
 * (e.g., clicks "Credit Card" or "PayPal").
 */
export const triggerGaAddPaymentInfoEvent = (
  subTotalCost: number,
  products: TProductInfo[],
  paymentType: string // e.g., "Credit Card", "PayPal", "Apple Pay"
) => {
  triggerEvent('add_payment_info', {
    ecommerce: {
      value: subTotalCost,
      currency: 'USD',
      payment_type: paymentType, // Add the selected payment type
      items: products.map((product, index) => ({
        item_id: product.partNumber || product.id,
        item_name: product.title,
        item_category: product.category?.title || 'Uncategorized',
        item_brand: product.brand,
        price: product?.sellingPrice,
        quantity: product.quantity || 1,
        index,
      })),
    },
  });
};

export const triggerGaPurchaseEvent = (order: TOrder) => {
  triggerEvent('purchase', {
    ecommerce: {
      transaction_id: order.orderId,
      affiliation: order.data.referralCode || 'Online', // optional but useful
      value: order.data.totalWithTax,
      currency: 'USD',
      tax: order.data.taxAmount,
      shipping: order.data.deliveryCharge,
      coupon: order.data.couponCode || undefined,
      items: order.data.productsInfo.map((product, index) => ({
        item_id: product.partNumber || product.id,
        item_name: product.title,
        item_category: product.category?.title || 'Uncategorized',
        item_brand: product.brand,
        price: product.sellingPrice,
        quantity: product.quantity,
        index,
      })),
    },
  });
};

export const handleCookieConsent = (accepted: boolean) => {
  if (typeof window === 'undefined') return;

  // Push GTM event
  sendGtmEvent('cookie_consent', {
    consent_state: accepted ? 'granted' : 'denied',
  });
};
