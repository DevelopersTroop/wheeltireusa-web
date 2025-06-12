import { ApplyCoupon } from '@/components/shared/applyCoupon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useCheckout } from '@/context/checkoutContext';
import { setOrderInfo } from '@/redux/features/checkoutSlice';
import { useTypedSelector } from '@/redux/store';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeliveryDetails } from './deliveryDetails';
import { ProductCard } from './productCard';
import { ShippingDetails } from './shippingDetails';
import { ICheckoutStepProps } from './stepOne';
import { calculateCheckoutTotal } from '@/utils/price';

// StepThree Component
export const StepThree: React.FC<ICheckoutStepProps> = ({ setStep }) => {
  const newsLetterRef = useRef<HTMLDivElement>(null); // Ref for newsletter section
  const phoneNumberRef = useRef<HTMLDivElement>(null); // Ref for phone number section
  /**
   * Redux Store & Dispatch
   */ // Access cart products from Redux store
  const {
    discount,
    shippingAddress,
    orderInfo,
    requestedDealer,
    selectedDealerInfo,
    selectedOptionTitle,
    selectedDealer,
    couponCode,
    isCouponApplied,
    localDealerInfo,
    productBasedDiscountApplied,
    productsInfo,
    affiliateDiscount,
  } = useTypedSelector((state) => state.persisted.checkout); // Access checkout-related state from Redux store
  const [coupon, setCoupon] = useState(couponCode);
  // const { applyCoupon, isLoading } = useApplyCoupon()
  const dispatch = useDispatch();

  const { cartType, subTotalCost, netCost } = useCheckout();

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
   * Memoized product details
   */
  const product = useMemo(() => {
    let count = 0;
    const productsData: unknown[] = [];
    let totalPrice = 0;

    for (const value of productsInfo) {
      count += value?.quantity ?? 1;
      totalPrice += value?.price ?? 0;
      productsData.push(value ?? {});
    }
    return {
      qty: count,
      products: productsData,
      totalPrice,
    };
  }, [productsInfo]);

  /**
   * Handle place order validation and navigation
   */
  const handlePlaceOrderModal = function () {
    if (!orderInfo?.newsLetter?.length) {
      // Check if an error element already exists
      const existingError =
        newsLetterRef.current?.querySelector('.error-message');

      // If it exists, do nothing
      if (!existingError) {
        const erroEl = document.createElement('p');
        erroEl.innerText = 'Please select an option';
        erroEl.classList.add('error-message'); // Add a class to identify the error element later
        newsLetterRef.current?.focus();

        // Insert the error element before the last element
        const lastElement = newsLetterRef.current?.lastElementChild;
        if (lastElement) {
          newsLetterRef.current?.insertBefore(erroEl, lastElement);
        } else {
          // If there are no elements, prepend it
          newsLetterRef.current?.prepend(erroEl);
        }
      }
      newsLetterRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
      return;
    }
    if (orderInfo.orderInfoText && !orderInfo.phone.length) {
      const existingError =
        phoneNumberRef.current?.querySelector('.error-message');
      // If it exists, do nothing
      if (!existingError) {
        const erroEl = document.createElement('p');
        erroEl.innerText = 'Please enter phone number';
        erroEl.classList.add('error-message'); // Add a class to identify the error element later
        newsLetterRef.current?.focus();

        // Insert the error element before the last element
        const lastElement =
          phoneNumberRef.current?.querySelector('.error-wrapper');
        if (lastElement) {
          phoneNumberRef.current?.insertBefore(erroEl, lastElement);
        } else {
          // If there are no elements, prepend it
          phoneNumberRef.current?.prepend(erroEl);
        }
      }
      phoneNumberRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
      return;
    }
    if (typeof setStep !== 'undefined') setStep(4);
  };

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
      {/* Order Summary Section */}
      <div className="flex flex-col gap-4 pt-3 pb-5">
        <h2 className="font-bold text-xl">Order Summary</h2>
        <p className="text-gray-700">
          Please review your order details below to ensure everything is
          correct.
        </p>
      </div>
      <div className="grid grid-cols-11 gap-6 lg:gap-8 pt-8 pb-20">
        <div className="col-span-11 lg:col-span-7 space-y-8">
          <div className="flex items-start gap-4 font-bold">
            <div className="relative mt-1 hidden md:block">
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.86383 1.90704C1.53636 1.79789 1.18241 1.97486 1.07326 2.30233C0.964103 2.62979 1.14108 2.98374 1.46854 3.0929L1.6893 3.16648C2.25297 3.35438 2.62564 3.47959 2.90018 3.60731C3.16015 3.72825 3.27255 3.82558 3.34456 3.9255C3.41658 4.02541 3.47337 4.16282 3.50589 4.44769C3.54024 4.74853 3.54119 5.14167 3.54119 5.73583L3.54118 7.96237C3.54117 9.10202 3.54115 10.0206 3.63829 10.7431C3.73913 11.4932 3.95488 12.1247 4.45648 12.6263C4.95807 13.1279 5.58964 13.3437 6.33973 13.4445C7.0622 13.5417 7.98079 13.5417 9.12045 13.5416H14.9995C15.3447 13.5416 15.6245 13.2618 15.6245 12.9166C15.6245 12.5715 15.3447 12.2916 14.9995 12.2916H9.16618C7.97 12.2916 7.13574 12.2903 6.50629 12.2057C5.89481 12.1235 5.571 11.9731 5.34036 11.7425C5.14437 11.5465 5.00634 11.2832 4.91885 10.8333H13.3512C14.1507 10.8333 14.5505 10.8333 14.8636 10.6269C15.1767 10.4204 15.3341 10.053 15.6491 9.3181L16.0062 8.48477C16.6808 6.91075 17.0181 6.12374 16.6476 5.56186C16.2771 4.99997 15.4208 4.99997 13.7084 4.99997H4.78706C4.78215 4.74357 4.77138 4.51223 4.74783 4.3059C4.7017 3.90189 4.6012 3.53117 4.35862 3.19461C4.11604 2.85805 3.79612 2.64547 3.42743 2.47395C3.08057 2.31259 2.63946 2.16557 2.11749 1.9916L1.86383 1.90704Z"
                  fill="#210203"
                />
                <path
                  d="M6.24935 15C6.9397 15 7.49935 15.5596 7.49935 16.25C7.49935 16.9404 6.9397 17.5 6.24935 17.5C5.55899 17.5 4.99935 16.9404 4.99935 16.25C4.99935 15.5596 5.55899 15 6.24935 15Z"
                  fill="#210203"
                />
                <path
                  d="M13.7493 15.0001C14.4397 15.0001 14.9993 15.5597 14.9993 16.2501C14.9993 16.9404 14.4397 17.5001 13.7493 17.5001C13.059 17.5001 12.4993 16.9404 12.4993 16.2501C12.4993 15.5597 13.059 15.0001 13.7493 15.0001Z"
                  fill="#210203"
                />
              </svg>

              <span className="absolute h-5 w-5 rounded-full text-xs bg-primary text-white flex items-center justify-center -top-1 -right-2">
                {product.qty}
              </span>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="relative mt-1 md:hidden">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.86383 1.90704C1.53636 1.79789 1.18241 1.97486 1.07326 2.30233C0.964103 2.62979 1.14108 2.98374 1.46854 3.0929L1.6893 3.16648C2.25297 3.35438 2.62564 3.47959 2.90018 3.60731C3.16015 3.72825 3.27255 3.82558 3.34456 3.9255C3.41658 4.02541 3.47337 4.16282 3.50589 4.44769C3.54024 4.74853 3.54119 5.14167 3.54119 5.73583L3.54118 7.96237C3.54117 9.10202 3.54115 10.0206 3.63829 10.7431C3.73913 11.4932 3.95488 12.1247 4.45648 12.6263C4.95807 13.1279 5.58964 13.3437 6.33973 13.4445C7.0622 13.5417 7.98079 13.5417 9.12045 13.5416H14.9995C15.3447 13.5416 15.6245 13.2618 15.6245 12.9166C15.6245 12.5715 15.3447 12.2916 14.9995 12.2916H9.16618C7.97 12.2916 7.13574 12.2903 6.50629 12.2057C5.89481 12.1235 5.571 11.9731 5.34036 11.7425C5.14437 11.5465 5.00634 11.2832 4.91885 10.8333H13.3512C14.1507 10.8333 14.5505 10.8333 14.8636 10.6269C15.1767 10.4204 15.3341 10.053 15.6491 9.3181L16.0062 8.48477C16.6808 6.91075 17.0181 6.12374 16.6476 5.56186C16.2771 4.99997 15.4208 4.99997 13.7084 4.99997H4.78706C4.78215 4.74357 4.77138 4.51223 4.74783 4.3059C4.7017 3.90189 4.6012 3.53117 4.35862 3.19461C4.11604 2.85805 3.79612 2.64547 3.42743 2.47395C3.08057 2.31259 2.63946 2.16557 2.11749 1.9916L1.86383 1.90704Z"
                      fill="#210203"
                    />
                    <path
                      d="M6.24935 15C6.9397 15 7.49935 15.5596 7.49935 16.25C7.49935 16.9404 6.9397 17.5 6.24935 17.5C5.55899 17.5 4.99935 16.9404 4.99935 16.25C4.99935 15.5596 5.55899 15 6.24935 15Z"
                      fill="#210203"
                    />
                    <path
                      d="M13.7493 15.0001C14.4397 15.0001 14.9993 15.5597 14.9993 16.2501C14.9993 16.9404 14.4397 17.5001 13.7493 17.5001C13.059 17.5001 12.4993 16.9404 12.4993 16.2501C12.4993 15.5597 13.059 15.0001 13.7493 15.0001Z"
                      fill="#210203"
                    />
                  </svg>

                  <span className="absolute h-5 w-5 rounded-full text-xs bg-primary text-white flex items-center justify-center -top-1 -right-2">
                    {product.qty}
                  </span>
                </div>
                <h2 className="text-lg">Shopping Cart</h2>
              </div>
              <ProductCard />
              <Link
                href={'/cart'}
                className="py-3 inline-block text-black underline font-medium"
              >
                Return to Cart
              </Link>
            </div>
          </div>

          {/**
           * Delivery Options
           */}
          <DeliveryDetails
            requestedDealer={requestedDealer}
            selectedDealerInfo={selectedDealerInfo ?? undefined}
            selectedOptionTitle={selectedOptionTitle}
            setStep={setStep}
          />
          {/**
           * Shipping Info
           */}
          <ShippingDetails
            localDealerInfo={localDealerInfo}
            selectedDealer={selectedDealer}
            shippingAddress={shippingAddress}
            selectedOptionTitle={selectedOptionTitle}
            setStep={setStep}
          />
        </div>
        {/**
         * Order Summary
         */}
        <div className="col-span-11 lg:col-span-4 sticky top-0 bg-[#F7F7F7] mt-12 py-5 rounded-xs h-fit">
          {productBasedDiscountApplied || affiliateDiscount ? null : (
            <ApplyCoupon />
          )}

          <div className="space-y-2 text-[#210203]">
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
                      (33625)
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
                    {cartType === 'CENTER_CAP_ONLY' ? '$14.99' : 'Free'}
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
                    ${netCost.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 py-5 px-md">
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
          <div className="px-md">
            <Button
              onClick={handlePlaceOrderModal}
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
