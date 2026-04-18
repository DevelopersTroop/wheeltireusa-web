import { TCartProduct } from '@/types/cart';
import {
  createListenerMiddleware,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  addToCart,
  emptyCart,
  removeFromCart,
  updateCartQuantity,
} from '../features/cartSlice';
import {
  initiateCheckout,
  updateProductFromCart,
} from '../features/checkoutSlice';
import { RootState } from '../store';
import { trackEvent } from '@/lib/tracker';
import { getPrice } from '@/utils/price';

export const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
  matcher: isAnyOf(
    addToCart,
    removeFromCart,
    updateCartQuantity,
    emptyCart,
    initiateCheckout
  ),
  effect: async (action, listenerApi) => {
    const payloadAction = action as unknown as PayloadAction<{
      product: TCartProduct;
    }>;
    const { dispatch } = listenerApi;
    const state = listenerApi.getState() as RootState;

    /**
     * Update Product For Checkout
     */

    if (payloadAction.type === 'cart/addToCart') {
      const product = payloadAction.payload.product;
      if (!product) return;
      trackEvent('add_to_cart', {
        id: product.id,
        price: getPrice(product as any),
        quantity: product.quantity,
        title: product.title,
        url: `${window.location.origin}/collections/product/${product.slug}`,
      });
    }

    if (payloadAction.type === 'cart/updateCartQuantity') {
      const { payload } = action as PayloadAction<{ id: number }>;
      const existingProduct = state.persisted.cart.products.find(
        (p) => p.id === payload.id
      );
      if (!existingProduct) return;
      trackEvent('update_cart', {
        action: 'update_qty',
        id: existingProduct.id,
        quantity: existingProduct.quantity,
        price: getPrice(existingProduct),
        title: existingProduct.title,
        url: `${window.location.origin}/collections/product/${existingProduct.slug}`,
      });
    }

    const products = Object.values(state.persisted.cart.products);

    dispatch(updateProductFromCart(products));
  },
});
