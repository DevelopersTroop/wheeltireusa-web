import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  initiateCheckout,
  updateProductFromCart,
} from '../features/checkoutSlice';
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
} from '../features/cartSlice';
import { RootState } from '../store';

export const checkoutMiddleware = createListenerMiddleware();

// This middleware listens for the initiateCheckout, updateCartQuantity, addToCart, and removeFromCart actions and can perform side effects
checkoutMiddleware.startListening({
  matcher: isAnyOf(
    initiateCheckout,
    updateCartQuantity,
    addToCart,
    removeFromCart
  ),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const cart = state.persisted.cart.products;
    listenerApi.dispatch(updateProductFromCart(cart));
  },
});
