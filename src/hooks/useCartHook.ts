import { create } from 'zustand';

export const useCartHook = create<{ open: boolean; setOpen: () => void }>(
  (set, get) => {
    return {
      open: false,
      setOpen() {
        set({
          open: !get().open,
        });
      },
    };
  }
);
