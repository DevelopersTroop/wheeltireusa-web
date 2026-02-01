import { create } from "zustand";

type TState = {
  focus: boolean;
  setFocus: () => void;
};

export const useProductRating = create<TState>((set, get) => ({
  focus: false,
  setFocus() {
    set({
      focus: !get().focus,
    });
  },
}));
