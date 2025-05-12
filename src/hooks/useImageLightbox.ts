import { create } from 'zustand';

interface ILightboxState {
  open: boolean;
  setOpen: (open: boolean, index: number) => void;
  index: number;
}

export const useImageLightbox = create<ILightboxState>((set) => ({
  open: false,
  setOpen(open, index) {
    set({
      open,
      index,
    });
  },
  index: 0,
}));
