import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BillingAndShippingInput } from './BillingAndShippingInput';
import { useCheckout } from '@/context/checkoutContext';
import { triggerGaAddShippingInfoEvent } from '@/utils/analytics';
import { useTypedSelector } from '@/redux/store';
import { useApplyCoupon } from '@/hooks/useApplyCoupon';
import { revokeCouponCode, setOrderInfo } from '@/redux/features/checkoutSlice';

// StepThree Component
export const StepOne: React.FC<any> = ({ setStep, handleContinue }) => {
  const {
    selectedOptionTitle,
    discount,
    orderInfo,
    couponCode,
    isCouponApplied,
    productBasedDiscountApplied,
    productsInfo,
    affiliateDiscount,
  } = useTypedSelector((state) => state.persisted.checkout);
  const newsLetterRef = useRef<HTMLDivElement>(null); // Ref for newsletter section
  const phoneNumberRef = useRef<HTMLDivElement>(null); // Ref for phone number section
  const showNotice = false;
  console.log('TCL: showNotice', showNotice);
  const [billingSameAsShipping, setShippingSameAsBilling] = useState(
    selectedOptionTitle === 'Direct to Customer'
  );
  /**
   * Redux Store & Dispatch
   */ // Access cart products from Redux store
  const [coupon, setCoupon] = useState(couponCode);
  const { applyCoupon, isLoading } = useApplyCoupon();
  const dispatch = useDispatch();

  const [shouldDisableButton, setShouldDisableButton] = useState(false);

  const { cartType, subTotalCost, totalCost, validatedZipCode } = useCheckout();

  /**
   * Handle newsletter validation
   */
  useEffect(() => {
    if (orderInfo?.newsLetter !== '') {
      const element = newsLetterRef?.current?.querySelector('.error-message');
      if (element) newsLetterRef.current?.removeChild(element);
    }
  }, [orderInfo?.newsLetter]);

  /**
   * Handle phone number validation
   */
  useEffect(() => {
    if (orderInfo.phone !== '') {
      const element = phoneNumberRef?.current?.querySelector('.error-message');
      if (element) phoneNumberRef.current?.removeChild(element);
    }
  }, [orderInfo.phone]);
  /**
   * Update newsletter state when order info changes
   */
  useEffect(() => {
    if (!orderInfo.orderInfoText && orderInfo.newsLetterText) {
      dispatch(setOrderInfo({ ...orderInfo, newsLetterText: false }));
    }
  }, [orderInfo.orderInfoText]);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-11 gap-6 lg:gap-8 pt-8 pb-20">
        <div className="col-span-11 lg:col-span-7 space-y-8">
          <BillingAndShippingInput
            billingSameAsShipping={billingSameAsShipping}
            setBillingSameAsShipping={setShippingSameAsBilling}
            setShouldDisableButton={setShouldDisableButton}
          />
        </div>
        {/**
         * Order Summary
         */}
        <div className="col-span-11 lg:col-span-4 sticky top-0 bg-[#F7F7F7] mt-12 py-5 rounded-xs h-fit">
          {productBasedDiscountApplied || affiliateDiscount ? null : (
            <div className="px-2 sm:px-6 w-full pb-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Do you have a coupon code?
                  </AccordionTrigger>
                  <AccordionContent className="flex items-center gap-2 py-1 px-1">
                    <Input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter your coupon "
                      className="h-12 bg-white!"
                    />
                    <Button
                      disabled={isLoading}
                      onClick={() => {
                        if (isCouponApplied) {
                          dispatch(revokeCouponCode());
                        } else {
                          applyCoupon(coupon);
                        }
                      }}
                      className="h-12! font-semibold"
                    >
                      {isLoading
                        ? 'Loading'
                        : isCouponApplied
                          ? 'Revoke'
                          : 'Apply'}
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          <div className="space-y-2 text-[#210203] px-6">
            <div className="flex justify-between items-baseline py-2 px-md">
              <p className="text-base leading-[19px] text-[#210203]">
                <span className="text-[#210203] text-base font-normal">
                  Item(s) Total
                </span>
              </p>
              <div className="flex gap-0 items-baseline relative">
                <p className="text-2xl leading-[29px] text-[#210203]">
                  <span className="text-[#210203] text-2xl font-bold">
                    ${Math.floor(subTotalCost)}.
                  </span>
                  <span className="text-[#210203] text-sm font-bold">
                    {subTotalCost.toFixed(2).split('.')[1]}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-between items-baseline self-stretch relative w-full px-md">
              <div className="flex gap-2 items-center relative">
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="text-[#210203] text-base font-normal">
                    Shipping{' '}
                  </span>
                </p>
                <div className="flex gap-0 items-center relative">
                  <p className="text-base leading-[19px] text-[#210203]">
                    <span className="text-[#210203] text-base font-semibold">
                      ({validatedZipCode})
                    </span>
                  </p>

                  <p className="text-base leading-[19px] text-[#210203]">
                    <span className="text-[#210203] text-base font-normal">
                      :
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-0 items-baseline relative">
                <h4 className="text-2xl leading-[29px] text-[#210203]">
                  <span className="text-[#210203] text-2xl font-bold">
                    {cartType === 'CENTER_CAP_ONLY' ? (
                      '$14.99'
                    ) : !showNotice ? (
                      'Free'
                    ) : (
                      <p className="text-[13px] leading-snug font-normal text-primary">
                        This location is not included free shipping
                      </p>
                    )}
                  </span>
                </h4>
              </div>
            </div>

            {discount ? (
              <div className="flex justify-between py-2 items-center px-md">
                <span className="">Discount:</span>
                <span className="font-bold text-2xl">-${discount}</span>
              </div>
            ) : null}

            <div className="border-x-0 border-t-0 border-b border-[#cfcfcf] pb-4 flex justify-between items-baseline self-stretch relative w-full px-md pt-2">
              <h5 className="text-xl leading-6 text-[#210203]">
                <span className="text-[#210203] text-xl font-normal">
                  Total:
                </span>
              </h5>
              <div className="flex gap-0 items-baseline relative">
                <p className="text-[32px] leading-[38px] text-[#210203]">
                  <span className="text-[#210203] text-[32px] font-bold">
                    ${totalCost.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 py-5 px-6">
            <div ref={newsLetterRef} className="grid gap-y-3">
              <p className="text-lg">
                Would you like to recive emails with special offers and new
                production information?
              </p>
              <div className="grid gap-3 font-semibold">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() =>
                    dispatch(setOrderInfo({ ...orderInfo, newsLetter: 'yes' }))
                  }
                >
                  <Checkbox
                    checked={orderInfo?.newsLetter === 'yes'}
                    className="rounded-full data-[state=checked]:border-none bg-white h-6 w-6 border border-[#AAAAAA]"
                  />
                  <p className="text-sm">Yes</p>
                </div>
                <div
                  onClick={() =>
                    dispatch(setOrderInfo({ ...orderInfo, newsLetter: 'no' }))
                  }
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={orderInfo?.newsLetter === 'no'}
                    className="rounded-full data-[state=checked]:border-none  bg-white h-6 w-6 border border-[#AAAAAA]"
                  />
                  <p className="text-sm">No, thanks.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6">
            <Button
              disabled={shouldDisableButton}
              onClick={(e) => {
                // handleContinue?.(e);
                setStep(2);
                triggerGaAddShippingInfoEvent(
                  totalCost,
                  productsInfo,
                  'unknown'
                );
              }}
              className="w-full font-bold mt-4 h-14 rounded-xs flex items-center"
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.166 3.33337H8.83268C5.68999 3.33337 4.11864 3.33337 3.14233 4.30968C2.43938 5.01264 2.24255 6.02406 2.18745 7.70837H18.8113C18.7561 6.02406 18.5593 5.01264 17.8564 4.30968C16.8801 3.33337 15.3087 3.33337 12.166 3.33337Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.166 16.6667H8.83268C5.68999 16.6667 4.11864 16.6667 3.14233 15.6904C2.16602 14.7141 2.16602 13.1427 2.16602 10C2.16602 9.63176 2.16602 9.28507 2.16759 8.95837H18.8311C18.8327 9.28507 18.8327 9.63176 18.8327 10C18.8327 13.1427 18.8327 14.7141 17.8564 15.6904C16.8801 16.6667 15.3087 16.6667 12.166 16.6667ZM13.87 10.2084C14.2307 10.2083 14.5613 10.2083 14.8304 10.2445C15.1266 10.2843 15.4397 10.378 15.6972 10.6355C15.9547 10.893 16.0484 11.2061 16.0883 11.5024C16.1244 11.7714 16.1244 12.1021 16.1244 12.4628V12.5373C16.1244 12.898 16.1244 13.2287 16.0883 13.4977C16.0484 13.7939 15.9547 14.1071 15.6972 14.3646C15.4397 14.6221 15.1266 14.7158 14.8304 14.7556C14.5613 14.7918 14.2306 14.7918 13.87 14.7917L13.8327 14.7917L13.7954 14.7917C13.4347 14.7918 13.104 14.7918 12.835 14.7556C12.5388 14.7158 12.2257 14.6221 11.9682 14.3646C11.7106 14.1071 11.6169 13.7939 11.5771 13.4977C11.5409 13.2287 11.541 12.898 11.541 12.5373L11.541 12.5L11.541 12.4628C11.541 12.1021 11.5409 11.7714 11.5771 11.5024C11.6169 11.2061 11.7106 10.893 11.9682 10.6355C12.2257 10.378 12.5388 10.2843 12.835 10.2445C13.104 10.2083 13.4347 10.2083 13.7954 10.2084H13.87ZM4.87435 11.25C4.87435 10.9049 5.15417 10.625 5.49935 10.625H7.16602C7.51119 10.625 7.79102 10.9049 7.79102 11.25C7.79102 11.5952 7.51119 11.875 7.16602 11.875H5.49935C5.15417 11.875 4.87435 11.5952 4.87435 11.25ZM4.87435 13.75C4.87435 13.4049 5.15417 13.125 5.49935 13.125H8.83268C9.17786 13.125 9.45768 13.4049 9.45768 13.75C9.45768 14.0952 9.17786 14.375 8.83268 14.375H5.49935C5.15417 14.375 4.87435 14.0952 4.87435 13.75Z"
                  fill="white"
                />
                <path
                  d="M12.8521 11.5193L12.8541 11.5183C12.8557 11.5174 12.8584 11.5161 12.8627 11.5143C12.8808 11.5069 12.9211 11.4941 13.0016 11.4833C13.1772 11.4597 13.4222 11.4584 13.8327 11.4584C14.2432 11.4584 14.4882 11.4597 14.6638 11.4833C14.7443 11.4941 14.7846 11.5069 14.8027 11.5143C14.8069 11.5161 14.8097 11.5174 14.8113 11.5183L14.8133 11.5194L14.8145 11.5214C14.8153 11.523 14.8167 11.5258 14.8184 11.53C14.8259 11.5482 14.8386 11.5885 14.8494 11.6689C14.873 11.8445 14.8743 12.0895 14.8743 12.5C14.8743 12.9105 14.873 13.1556 14.8494 13.3312C14.8386 13.4116 14.8259 13.4519 14.8184 13.4701C14.8167 13.4743 14.8153 13.477 14.8145 13.4786L14.8133 13.4807L14.8113 13.4818C14.8097 13.4827 14.8069 13.484 14.8027 13.4857C14.7846 13.4932 14.7443 13.506 14.6638 13.5168C14.4882 13.5404 14.2432 13.5417 13.8327 13.5417C13.4222 13.5417 13.1772 13.5404 13.0016 13.5168C12.9211 13.506 12.8808 13.4932 12.8627 13.4857C12.8584 13.484 12.8557 13.4827 12.8541 13.4818L12.852 13.4807L12.8509 13.4786C12.8501 13.477 12.8487 13.4743 12.847 13.4701C12.8395 13.4519 12.8268 13.4116 12.816 13.3312C12.7923 13.1556 12.791 12.9105 12.791 12.5C12.791 12.0895 12.7923 11.8445 12.816 11.6689C12.8268 11.5885 12.8395 11.5482 12.847 11.53C12.8487 11.5258 12.8501 11.523 12.8509 11.5214L12.8521 11.5193Z"
                  fill="white"
                />
              </svg>
              <span className="text-[18px]">Continue to Payment</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
