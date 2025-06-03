import { TInventoryItem } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TCartProduct = TInventoryItem & { cartPackage: string; quantity: number };

type TCartSliceState = {
  products: TCartProduct[];
};

const initialState: TCartSliceState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<TCartProduct | TCartProduct[]>
    ) => {
      const productsToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      for (const newProduct of productsToAdd) {
        const existingProduct = state.products.find(
          (p) => p._id === newProduct._id
        );

        if (existingProduct) {
          existingProduct.quantity += newProduct.quantity;
        } else {
          state.products.push({ ...newProduct });
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<TCartProduct>) => {
      state.products = state.products.filter(
        (p) => p.cartPackage !== action.payload.cartPackage
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
