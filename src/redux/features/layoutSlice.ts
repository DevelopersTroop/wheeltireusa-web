import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ViewType = 'grid' | 'list';

interface LayoutState {
  viewType: ViewType;
  searchHistory: string[];
}

const initialState: LayoutState = {
  viewType: 'grid',
  searchHistory: [],
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setViewType: (state, action: PayloadAction<ViewType>) => {
      state.viewType = action.payload;
    },
    addSearchHistory: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query) {
        state.searchHistory = [
          query,
          ...state.searchHistory.filter((item) => item.toLowerCase() !== query.toLowerCase()),
        ].slice(0, 10); // Keep last 10 entries
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    removeSearchHistoryItem: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      state.searchHistory = state.searchHistory.filter((item) => item.toLowerCase() !== query.toLowerCase());
    },
  },
});

export const { setViewType, addSearchHistory, clearSearchHistory, removeSearchHistoryItem } = layoutSlice.actions;
export default layoutSlice.reducer;
