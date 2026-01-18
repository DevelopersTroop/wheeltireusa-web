import { TCartProduct } from '@/redux/features/cartSlice';
import { create } from 'zustand';

type TState = {
  open: boolean;
  setOpen: (open: boolean, product?: TCartProduct) => void;
  product?: TCartProduct;
};

export const useQuantityModal = create<TState>((set, get) => {
  return {
    open: false,
    product: undefined,
    setOpen(open, product) {
      set({
        open,
        product,
      });
    },
  };
});
