import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ViewType = 'grid' | 'list';

interface LayoutState {
  viewType: ViewType;
}

const initialState: LayoutState = {
  viewType: 'grid',
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setViewType: (state, action: PayloadAction<ViewType>) => {
      state.viewType = action.payload;
    },
  },
});

export const { setViewType } = layoutSlice.actions;
export default layoutSlice.reducer;
