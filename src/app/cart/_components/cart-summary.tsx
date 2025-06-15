'use client';
import { FaShippingFast } from 'react-icons/fa';

// import PaymentMessaging from '@/components/shared/payment-method-messaging';
import { WhatWeAccept } from '@/components/shared/what-we-accept';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/redux/store';
import { calculateCartTotal, formatPrice } from '@/utils/price';
import { initiateCheckout } from '@/redux/features/checkoutSlice';
import PaymentMessaging from '@/components/shared/payment-method-messaging';

const CartSummary = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCheckout = () => {
    dispatch(initiateCheckout());
    router.push('/checkout');
  };
  const cart = useSelector((state: RootState) => state.persisted.cart);
  const subTotalCost = calculateCartTotal(cart.products);

  // const netCost = calculateCartTotal(cart.products, discount)
  const requiredStateFee = 0;
  const salesTax = 0;
  const setDiscount = 0;

  // Remove commas before parsing to float
  const netCost =
    parseFloat(String(subTotalCost).replace(/,/g, '')) +
    Number(requiredStateFee) +
    Number(salesTax) -
    Number(setDiscount);

  const netCostString = formatPrice(netCost);

  return (
    <div className="w-full sm:w-[415px] xl:mt-10 space-y-6">
      <div className="w-full rounded-xl py-5 flex flex-col gap-0 items-start  bg-[#f7f7f7]">
        {/* {
          (productBasedDiscount || affiliateDiscount) ? (
            null
          ) : (
            <div className="px-2 sm:px-6 w-full pb-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Do you have a coupon code?</AccordionTrigger>
                  <AccordionContent className="flex items-center gap-2 py-1 px-1">
                    <Input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter your coupon " className="h-12 !bg-white" />
                    <Button disabled={isLoading} onClick={() => {
                      if (isCouponApplied) {
                        dispatch(revokeCouponCode())
                      } else {
                        applyCoupon(coupon)
                      }
                    }} className="!h-12 font-semibold">{isLoading ? 'Loading' : isCouponApplied ? 'Revoke' : 'Apply'}</Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion >
            </div >
          )
        } */}
        <div className="px-2 sm:px-6 py-2 flex justify-between items-baseline self-stretch relative w-full border-b border-[#cfcfcf]">
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-[#210203] text-base font-normal">
              Item(s) Total{' '}
            </span>
          </p>
          <div className="flex gap-0 items-baseline relative">
            <p className="text-2xl leading-[29px] text-[#210203]">
              <span className="text-[#210203] text-2xl font-normal">
                ${String(subTotalCost).split('.')[0] || '0'}.
              </span>
              <span className="text-[#210203] text-sm font-normal">
                {String(subTotalCost).split('.')[1] || '00'}
              </span>
            </p>
          </div>
        </div>

        <div className="px-2 sm:px-6 py-2 flex justify-between items-baseline self-stretch relative w-full border-b border-[#cfcfcf]">
          <div className="flex gap-2 items-center relative">
            <p className="text-base leading-[19px] text-[#210203]">
              <span className="text-[#210203] text-base font-normal">
                Shipping{' '}
              </span>
            </p>
            <div className="flex gap-0 items-center relative">
              <p className="text-base leading-[19px] text-[#210203]">
                <span className="text-[#210203] text-base font-semibold">
                  (33625)
                </span>
              </p>

              <p className="text-base leading-[19px] text-[#210203]">
                <span className="text-[#210203] text-base font-normal">:</span>
              </p>
            </div>
          </div>
          <div className="flex gap-0 items-baseline relative">
            <p className="text-2xl leading-[29px] text-[#210203]">
              <span className="text-[#210203] text-2xl font-normal">
                {/* ${String(subTotalCost).split(".")[0] || "0"}. */} {'0.'}
              </span>
              <span className="text-[#210203] text-sm font-normal">{'00'}</span>
            </p>
          </div>
        </div>
        {/* {
          discount ? (
            <div className="px-2 sm:px-6 py-2 flex justify-between items-baseline self-stretch relative w-full">
              <div className="flex gap-2 items-center relative">
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="text-[#210203] text-base font-normal">
                    Discount{" "}
                  </span>
                </p>
                <div className="flex gap-0 items-center relative">
                  <p className="text-base leading-[19px] text-[#210203]">
                    <span className="text-[#210203] text-base font-normal">:</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-0 items-baseline relative">
                <h4 className="text-2xl leading-[29px] text-[#210203]">
                  <span className="text-[#210203] font-bold">
                    -${String(discount.toFixed(2)).split(".")[0] || "0"}.
                  </span>
                  <span className="text-[#210203] text-base font-semibold">
                    {String(discount.toFixed(2)).split(".")[1] || "00"}
                  </span>
                </h4>
              </div>
            </div>
          ) : null
        } */}
        <div className="px-2 sm:px-6 py-2 flex justify-between items-baseline self-stretch relative w-full border-b border-[#cfcfcf]">
          <div className="flex gap-2 items-baseline relative">
            <p className="text-base leading-[19px] text-[#210203]">
              <span className="text-[#210203] text-base font-normal">
                Road Hazard
              </span>
            </p>
            <div className="flex gap-1.5 items-baseline relative">
              <div className="flex gap-0 items-baseline relative">
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="text-[#210203] text-base font-semibold">
                    ($84.
                  </span>
                </p>

                <small className="text-sm leading-[17px] text-[#210203]">
                  <span className="text-[#210203] text-sm font-semibold">
                    08
                  </span>
                </small>
              </div>
              <p className="text-base leading-[19px] text-[#210203]">
                <span className="text-[#210203] text-base font-normal">
                  value):
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-0 items-baseline relative">
            <p className="text-2xl leading-[29px] text-[#210203]">
              <span className="text-[#210203] text-2xl font-normal">
                {/* ${String(subTotalCost).split(".")[0] || "0"}. */} {'0.'}
              </span>
              <span className="text-[#210203] text-sm font-normal">{'00'}</span>
            </p>
          </div>
        </div>

        <div className="px-2 sm:px-6 py-2 flex justify-between items-baseline self-stretch relative w-full">
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-[#210203] text-base font-normal">
              Required State Fee:
            </span>
          </p>
          <div className="flex gap-0 items-baseline relative">
            <h4 className="text-2xl leading-[29px] text-[#210203]">
              <span className="text-[#210203] text-2xl font-normal">$0.</span>
            </h4>

            <small className="text-sm leading-[17px] text-[#210203]">
              <span className="text-[#210203] text-sm font-normal">00</span>
            </small>
          </div>
        </div>
        <div className="border-x-0 border-t-0 border-b border-[#cfcfcf] px-2 sm:px-6 pt-2 pb-4 flex justify-between items-baseline self-stretch relative w-full">
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-[#210203] text-base font-normal">
              Sales Tax:
            </span>
          </p>
          <div className="flex gap-0 items-baseline relative">
            <h4 className="text-2xl leading-[29px] text-[#210203]">
              <span className="text-[#210203] text-2xl font-normal">$0.</span>
            </h4>

            <small className="text-sm leading-[17px] text-[#210203]">
              <span className="text-[#210203] text-sm font-normal">0</span>
            </small>
          </div>
        </div>

        <div className="px-2 sm:px-6 py-2 flex justify-between items-baseline self-stretch relative w-full">
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-[#210203] text-base font-normal">
              Set discount
            </span>
          </p>
          <div className="flex gap-0 items-baseline relative">
            <h4 className="text-2xl leading-[29px] text-[#210203]">
              <span className="text-[#210203] text-2xl font-normal">-$0.</span>
            </h4>

            <small className="text-sm leading-[17px] text-[#210203]">
              <span className="text-[#210203] text-sm font-normal">00</span>
            </small>
          </div>
        </div>
        <div className="border-x-0 border-t-0 border-b border-[#cfcfcf] px-2 sm:px-6 pt-2 pb-4 flex justify-between items-baseline self-stretch relative w-full">
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-[#210203] text-base font-normal">
              Promocode <span className="underline">Add</span>
            </span>
          </p>
          <div className="flex gap-0 items-baseline relative">
            <h4 className="text-2xl leading-[29px] text-[#210203]">
              <span className="text-[#210203] text-2xl font-normal">$0.</span>
            </h4>

            <small className="text-sm leading-[17px] text-[#210203]">
              <span className="text-[#210203] text-sm font-normal">00</span>
            </small>
          </div>
        </div>

        <div className="px-2 sm:px-6 pt-4 pb-2 flex justify-between items-baseline self-stretch relative w-full">
          <h5 className="text-xl leading-6 text-[#210203]">
            <span className="text-[#210203] text-xl font-normal">Total:</span>
          </h5>
          <div className="flex gap-0 items-baseline relative">
            <p className="text-[32px] leading-[38px] text-[#210203]">
              <span className="text-[#210203] text-[32px] font-bold">
                ${String(netCostString).split('.')[0] || '0'}.
              </span>
              <span className="text-[#210203] text-xl font-bold">
                {String(netCostString).split('.')[1] || '00'}
              </span>
            </p>
          </div>
        </div>
        <div className="px-2 sm:px-6 pt-0 pb-3 flex gap-3 items-baseline self-stretch relative w-full">
          <small className="text-sm leading-[17px] text-[#504949]">
            <span className="text-[#504949] text-sm font-normal">
              Installation cost is not included. Proceed to see your delivery &
              installation options.
            </span>
          </small>
        </div>
        <div className=" px-2 sm:px-6 py-2 flex gap-3 items-baseline self-stretch relative w-full">
          <button
            onClick={handleCheckout}
            className="rounded-xl px-6 flex gap-2 justify-center items-center flex-1 relative w-full h-14 bg-[#F6511D]"
          >
            <FaShippingFast className="text-white w-4 h-4" />
            <p className="text-lg leading-[22px] text-white">
              <span className="text-white text-sm sm:text-lg font-semibold sm:whitespace-nowrap">
                Continue to Delivery & Installation
              </span>
            </p>
          </button>
        </div>
        <div className="px-2 sm:px-6 pt-3 pb-0 flex flex-col gap-1 justify-center items-start self-stretch relative w-full">
          <PaymentMessaging amount={subTotalCost} />
          {/* <p>
            <span className="font-medium">$116.00</span> per month
          </p> */}
        </div>
      </div>
      <WhatWeAccept />
    </div>
  );
};

export default CartSummary;
