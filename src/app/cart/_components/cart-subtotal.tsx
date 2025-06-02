'use client';

const CartSubtotal = () => {
  // const cart = useSelector((state: RootState) => state.persisted.cart);
  // const subTotalCost = calculateCartTotal(cart.products);
  const subTotalCost = '10000.12';
  return (
    <div className="overflow-hidden px-2 sm:px-5 py-5 flex justify-between items-baseline self-stretch relative w-full bg-white">
      <p className="text-base leading-[19px] text-[#210203]">
        <span className="text-[#210203] text-base font-normal">Subtotal:</span>
      </p>
      <div className="flex gap-0 items-baseline relative">
        <p>
          <span className="text-[#210203] text-[32px] font-bold">
            ${String(subTotalCost).split('.')[0] || '0'}.
          </span>
          <span className="text-[#210203] text-xl font-bold">
            {String(subTotalCost).split('.')[1] || '00'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartSubtotal;
