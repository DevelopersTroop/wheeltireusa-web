import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type YmmModalSource = "nav_menu" | "vehicle_selector_button" | "other";
export type YmmMainTab = "vehicle" | "brand";
export type YmmBrandCategory = "tire" | "wheels";

interface YmmFilterState {
  isModalOpen: boolean;
  source: YmmModalSource;
  redirectPath: string | null;
  initialMainTab: YmmMainTab;
  initialBrandCategory: YmmBrandCategory;
}

const initialState: YmmFilterState = {
  isModalOpen: false,
  source: "other",
  redirectPath: null,
  initialMainTab: "vehicle",
  initialBrandCategory: "tire",
};

const ymmFilterSlice = createSlice({
  name: "ymmFilter",
  initialState,
  reducers: {
    setIsModalOpen: (
      state,
      action: PayloadAction<
        boolean | { 
          isOpen: boolean; 
          source?: YmmModalSource; 
          redirectPath?: string | null;
          mainTab?: YmmMainTab;
          brandCategory?: YmmBrandCategory;
        }
      >
    ) => {
      if (typeof action.payload === "boolean") {
        state.isModalOpen = action.payload;
        if (!action.payload) {
          state.source = "other";
          state.redirectPath = null;
          state.initialMainTab = "vehicle";
          state.initialBrandCategory = "tire";
        }
      } else {
        state.isModalOpen = action.payload.isOpen;
        state.source = action.payload.source || "other";
        state.redirectPath = action.payload.redirectPath || null;
        if (action.payload.isOpen) {
          state.initialMainTab = action.payload.mainTab || "vehicle";
          state.initialBrandCategory = action.payload.brandCategory || "tire";
        }
      }
    },
  },
});

export const { setIsModalOpen } = ymmFilterSlice.actions;
export default ymmFilterSlice.reducer;
