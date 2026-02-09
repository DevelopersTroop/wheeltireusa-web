import { TCartProduct } from '@/redux/features/cartSlice';
import { create } from 'zustand';

type TState = {
  open: boolean;
  setOpen: (open: boolean, product?: TCartProduct) => void;
  product?: TCartProduct;
  cartPackage?: string;
};

export const useQuantityModal = create<TState>((set) => {
  return {
    open: false,
    product: undefined,
    cartPackage: undefined,
    setOpen(open, product) {
      set({
        open,
        product,
        cartPackage: product?.cartPackage,
      });
    },
  };
});
