import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  newsletterShown: false,
  isSubmitted: false,
  closingTimeStamp: 0,
};

const newsletterModalSlice = createSlice({
  name: "newsletterModal",
  initialState,
  reducers: {
    openNewsletterModal: (state) => {
      state.isOpen = true;
    },
    closeNewsletterModal: (state) => {
      state.closingTimeStamp = Date.now();
      state.isOpen = false;
    },
    setNewsletterShown: (state) => {
      state.newsletterShown = true;
    },
    setIsNewsLetterSubmitted: (state, action) => {
      state.isSubmitted = action.payload;
    },
  },
});

export default newsletterModalSlice.reducer;
export const {
  openNewsletterModal,
  closeNewsletterModal,
  setNewsletterShown,
  setIsNewsLetterSubmitted,
} = newsletterModalSlice.actions;
