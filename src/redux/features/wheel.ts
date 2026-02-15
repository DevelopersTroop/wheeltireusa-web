import { TInventoryItem } from '@/types/product';
import { IApiRes } from '@/types/reduxHelper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  sort?: {
    whom: string;
    order: 'desc' | 'asc';
  }[];
  minPrice?: number;
  maxPrice?: number;
  width?: string;
  diameter?: string;
}

interface WheelState {
  data: IApiRes<{ products: TInventoryItem[] }> | null;
  filters: FilterState;
  loading: boolean;
  error: string | null;
}

const initialState: WheelState = {
  data: null,
  filters: {}, // Default filter state
  loading: false,
  error: null,
};

const wheelSlice = createSlice({
  name: 'wheel',
  initialState,
  reducers: {
    fetchWheelStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWheelSuccess: (
      state,
      action: PayloadAction<IApiRes<{ products: TInventoryItem[] }>>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchWheelFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload }; // Merging instead of replacing
    },
  },
});

export const {
  fetchWheelStart,
  fetchWheelSuccess,
  fetchWheelFailure,
  updateFilters,
} = wheelSlice.actions;
export default wheelSlice.reducer;
