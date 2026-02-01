import { TInventoryItem } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export type TCartProduct = TInventoryItem & {
  cartPackage: string;
  quantity: number;
  cartSerial: string;
  metaData: Record<string, string>;
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
      console.log(productsToAdd);

      for (const newProduct of productsToAdd) {
        const existingProduct = state.products.find(
          (p) => p.id === newProduct.id
        );

        if (existingProduct) {
          if (
            existingProduct.quantity + newProduct.quantity >
            (existingProduct?.availableStock || 4)
          ) {
            // If the new quantity exceeds available inventory, set it to available inventory
            newProduct.quantity =
              (existingProduct?.availableStock || 4) -
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
      state.products = state.products.filter(
        (p) => p.cartPackage !== action.payload
      );
    },
    emptyCart: (state) => {
      state.products = [];
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.products.find((p) => p.id === id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, emptyCart } =
  cartSlice.actions;
export default cartSlice.reducer;
