import { TInventoryItem } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export type TCartProduct = TInventoryItem & {
  cartPackage: string;
  quantity: number;
};

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
          if (
            existingProduct.quantity + newProduct.quantity >
            (existingProduct?.inventory_available || 4)
          ) {
            // If the new quantity exceeds available inventory, set it to available inventory
            newProduct.quantity =
              (existingProduct?.inventory_available || 4) -
              existingProduct.quantity;
            toast.error(
              `You can only add ${newProduct.quantity} more of this product to your cart.`
            );
            return;
          }
          existingProduct.quantity += newProduct.quantity;
        } else {
          state.products.push({ ...newProduct });
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.products.find((p) => p._id === id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
