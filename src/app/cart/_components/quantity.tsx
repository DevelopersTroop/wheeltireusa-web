import CartQuantityInputBox from '@/components/ui/quantity-input-box/cart-quantity-input-box';
import { TCartProduct } from '@/redux/features/cartSlice';

const Quantity = ({ cartProduct }: { cartProduct: TCartProduct }) => {
  return (
    <CartQuantityInputBox
      // borderColor={" border-[#cfcfcf]"}
      // className="scale-90"

      id={cartProduct?.cartPackage ?? ''}
      inputName={cartProduct?.cartPackage ?? ''}
      inputValue={cartProduct?.quantity ?? 1}
      maxInputValue={cartProduct?.inventory_available ?? 1}
      minInputValue={1}
      quantityStep={2}
      onDecrease={() => {}}
      onIncrease={() => {}}
      onInputChange={() => {}}
    />
  );
};

export default Quantity;
