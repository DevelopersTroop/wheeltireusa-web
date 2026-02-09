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
    }

    const products = Object.values(state.persisted.cart.products);
    console.log('TCL: products', products);

    dispatch(updateProductFromCart(products));
  },
});
