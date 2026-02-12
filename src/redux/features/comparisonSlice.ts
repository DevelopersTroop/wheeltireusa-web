import { TInventoryItem } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

// Maximum number of products that can be compared at once
const MAX_COMPARISON_ITEMS = 4;

export type TComparisonProduct = TInventoryItem;

type TComparisonSliceState = {
  products: TComparisonProduct[];
  isComparisonDrawerOpen: boolean;
};

const initialState: TComparisonSliceState = {
  products: [],
  isComparisonDrawerOpen: false,
};

const comparisonSlice = createSlice({
  name: 'comparisonSlice',
  initialState: initialState,
  reducers: {
    addToComparison: (state, action: PayloadAction<TComparisonProduct>) => {
      const newProduct = action.payload;

      // Check if product already exists in comparison
      const existingProduct = state.products.find(
        (p) => p.id === newProduct.id
      );

      if (existingProduct) {
        toast.info('Product already in comparison', {
          description: 'This product is already in your comparison list.',
        });
        return;
      }

      // Enforce same category comparison
      if (state.products.length > 0) {
        const firstProductCategory = state.products[0].category?.slug;
        const newProductCategory = newProduct.category?.slug;

        if (firstProductCategory !== newProductCategory) {
          toast.error('Category mismatch', {
            description: `You can only compare ${firstProductCategory} with ${firstProductCategory}.`,
          });
          return;
        }
      }

      // Check if maximum limit is reached
      if (state.products.length >= MAX_COMPARISON_ITEMS) {
        toast.error('Maximum items reached', {
          description: `You can only compare up to ${MAX_COMPARISON_ITEMS} products at a time. Please remove a product first.`,
        });
        return;
      }

      state.products.push(newProduct);
      state.isComparisonDrawerOpen = true;
      toast.success('Added to comparison', {
        description: `${newProduct.brand} ${newProduct.model} has been added to your comparison list.`,
      });
    },

    removeFromComparison: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);

      state.products = state.products.filter((p) => p.id !== productId);

      if (product) {
        toast.success('Removed from comparison', {
          description: `${product.brand} ${product.model} has been removed from your comparison list.`,
        });
      }

      // Close drawer if no more products
      if (state.products.length === 0) {
        state.isComparisonDrawerOpen = false;
      }
    },

    clearComparison: (state) => {
      state.products = [];
      state.isComparisonDrawerOpen = false;
      toast.success('Comparison cleared', {
        description:
          'All products have been removed from your comparison list.',
      });
    },

    toggleComparisonDrawer: (state) => {
      state.isComparisonDrawerOpen = !state.isComparisonDrawerOpen;
    },

    setComparisonDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isComparisonDrawerOpen = action.payload;
    },
  },
});

export const {
  addToComparison,
  removeFromComparison,
  clearComparison,
  toggleComparisonDrawer,
  setComparisonDrawerOpen,
} = comparisonSlice.actions;

export default comparisonSlice.reducer;
