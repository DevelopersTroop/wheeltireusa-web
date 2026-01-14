import { create } from 'zustand';

export const useZipCodePopup = create<{
  open: boolean;
  setOpen: () => void;
}>((set, get) => ({
  open: false,
  setOpen: function () {
    set({
      open: !get().open,
    });
  },
}));
