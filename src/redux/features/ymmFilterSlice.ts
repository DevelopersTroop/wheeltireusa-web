import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ymmFilterSlice = createSlice({
  name: "ymmFilter",
  initialState: {
   isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    
  },
});

export const { setIsModalOpen } = ymmFilterSlice.actions;
export default ymmFilterSlice.reducer;
