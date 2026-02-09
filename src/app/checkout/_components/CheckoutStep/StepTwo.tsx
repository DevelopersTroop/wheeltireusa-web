import { useCheckout } from '@/context/checkoutContext';
import {
  revokeCouponCode,
  setOrderId,
  setOrderInfo,
  setPaymentMethod,
} from '@/redux/features/checkoutSlice';
import { useTypedSelector } from '@/redux/store';
import { triggerGaAddPaymentInfoEvent } from '@/utils/analytics';
import { apiBaseUrl } from '@/utils/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useActiveAccordion } from '@/hooks/useActiveAccordion';
import { useApplyCoupon } from '@/hooks/useApplyCoupon';
import { usePaytomorrowCheckout } from '@/hooks/usePayTomorrowCheckout';
import { usePaypalCheckout } from '@/hooks/usePaypalCheckout';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { getLatestOrderId, useSnapFinanceOrderData } from '@/lib/order';
import { getSnapFinanceToken } from '@/lib/snapFinance';
import {
  Stripe,
  StripeElements,
  StripePaymentElement,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js';
import { AlertCircle, InfoIcon, Loader, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PaymentFormWrapper } from './payment-form-wrapper';
import { BillingAndShippingInput } from './BillingAndShippingInput';
import { TSnapCheckoutReturn, TSnapInputCheckout } from '@/types/snap';
import { toast } from 'sonner';
import StripeProvider from '@/context/stripeProvider';

// StepThree Component
export const StepTwo = ({}) => {
  const {
    selectedOptionTitle,
    discount,
    orderInfo,
    couponCode,
    isCouponApplied,
    productBasedDiscountApplied,
    productsInfo,
    affiliateDiscount,
    billingAddress,
    taxAmount,
    totalWithTax,
  } = useTypedSelector((state) => state.persisted.checkout);
  const newsLetterRef = useRef<HTMLDivElement>(null); // Ref for newsletter section
  const phoneNumberRef = useRef<HTMLDivElement>(null); // Ref for phone number section
  const [billingSameAsShipping, setShippingSameAsBilling] = useState(
    selectedOptionTitle === 'Direct to Customer'
  );

  const { activeAccordion, setActiveAccordion } = useActiveAccordion();
  const [shouldDisableButton, setShouldDisableButton] = useState(false);
  const elementsRef = useRef<StripeElements | null>(null);
  const paymentElement = useRef<StripePaymentElement | null>(null);
  useEffect(() => {
    if (activeAccordion) {
      if (paymentElement?.current) paymentElement?.current.collapse();
      if (paymentElement?.current) paymentElement?.current.blur();
      setIsCard(false);
      dispatch(setPaymentMethod(''));
    }
  }, [activeAccordion]);

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

  const [showTermsAlert, setShowTermsAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  const autoCloseTimerRef = useRef<NodeJS.Timeout>(null);

  const dispatch = useDispatch();
  const snapInstanceRef = useRef<TSnapCheckoutReturn | null>(null);
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [stripeMethod, setStripeMethod] = useState(false);

  // Hooks
  const { initiateCheckout } = useStripeCheckout();
  const { applyCoupon } = useApplyCoupon();
  const { initiatePaypalCheckout } = usePaypalCheckout();
  const { initiatePaytomorrowCheckout } = usePaytomorrowCheckout();

  /**
   * Redux Store And Dispatch Hook
   */
  const [isCard, setIsCard] = useState(false);

  const [coupon, setCoupon] = useState(couponCode);

  const { cartType, subTotalCost, totalCost } = useCheckout();

  const { getSnapFinanceTransactionData, placeOrderWithSnapFinance } =
    useSnapFinanceOrderData();

  // ✅ Define handlers (stable, no re-creation)
  const onClickHandler = (data: any, actions: any) => {
    console.log('TCL: onClickHandler -> data', data);
    // Trigger Snap app logic here (apply for credit, etc.)
  };

  const onApprovedHandler = (
    data: { applicationId: string; type: string },
    actions: any
  ) => {
    placeOrderWithSnapFinance(data.applicationId, data.type);
  };

  const onErrorHandler = (error: any) => {
    console.error('Error occurred: And I can see', error);
  };

  const onInitHandler = (d: string) => {
    console.log('Init data:', d);
  };

  // ✅ Input config
  const inputCheckout: TSnapInputCheckout = {
    init: onInitHandler,
    onClick: onClickHandler,
    onApproved: onApprovedHandler,
    onError: onErrorHandler,
    onInit(data, actions) {
      console.log('TCL: onInit -> data', data);
    },
  };

  useEffect(() => {
    const initSnap = async () => {
      if (snapInstanceRef.current) return; // prevent re-init

      try {
        // ✅ Fetch token once
        const token = await getSnapFinanceToken();

        // ✅ Initialize Snap SDK
        window.snap.init(token);

        // ✅ Create Snap instance
        const instance = window.snap.checkoutButton(inputCheckout);
        console.log('TCL: initSnap -> instance', instance);
        snapInstanceRef.current = instance;
      } catch (error) {
        console.error('Snap Finance init failed:', error);
      }
    };

    initSnap();
  }, []);

  const handleSnapFinanceCheckout = async () => {
    getLatestOrderId()
      .then((orderId) => {
        const stringOrderID = orderId.split('-')?.[1] || `AF-0000`;
        const newOrderId = `AF-${(parseInt(stringOrderID, 10) + 1)
          .toString()
          .padStart(6, '0')}`;
        if (newOrderId) {
          dispatch(setOrderId(newOrderId));
        }
        const transactionData = getSnapFinanceTransactionData(newOrderId);
        snapInstanceRef.current?._actions?.launchCheckout(transactionData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Checkout Context
   */
  const { validatedZipCode } = useCheckout();

  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPaymentError, setShowPaymentError] = useState(false);

  const [cardError, setCardError] = useState<string | null>(null);

  // Handle payment error alert
  useEffect(() => {
    const orderStatus = searchParams.get('order_status');
    if (orderStatus === 'false') {
      setShowPaymentError(true);
      autoCloseTimerRef.current = setTimeout(() => {
        handleCloseAlert();
      }, 5000);
    }

    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [searchParams]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Hide terms alert when terms are accepted
  useEffect(() => {
    if (orderInfo.termsAndConditions) {
      setShowTermsAlert(false);
    }
  }, [orderInfo.termsAndConditions]);

  // Event handlers
  const handleCloseAlert = useCallback(() => {
    setShowPaymentError(false);
    router.replace(`/checkout?step=1`);
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
  }, [router]);

  const toggleAccordion = useCallback((accordion: string) => {
    setActiveAccordion(accordion);
  }, []);

  const processPayment = useCallback(async () => {
    switch (activeAccordion) {
      case 'paypal':
        await initiatePaypalCheckout();
        break;
      case 'pay-tomorrow':
        await initiatePaytomorrowCheckout();
        break;
      case 'snap-finance':
        await handleSnapFinanceCheckout();
        break;
      default:
        await initiateCheckout(stripe, elementsRef.current);
    }
  }, [activeAccordion, initiatePaypalCheckout, initiatePaytomorrowCheckout]);

  const handlePlaceOrder = useCallback(async () => {
    if (isLoading) return;

    if (subTotalCost < 50) {
      return toast.error('Error', {
        description: 'Minimum order amount is $50',
      });
    }

    try {
      if (!orderInfo.termsAndConditions) {
        setShowTermsAlert(true);
        termsRef.current?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      setIsLoading(true);
      triggerGaAddPaymentInfoEvent(
        totalWithTax ?? 0,
        productsInfo,
        activeAccordion ? activeAccordion : 'Stripe'
      );
      await processPayment();

      // Subscribe to newsletter
      await fetch(`${apiBaseUrl}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: billingAddress.email,
        }),
      });
    } catch (error) {
      console.log('TCL: handlePlaceOrder -> error', error);
      toast.error('Error', {
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    subTotalCost,
    orderInfo.termsAndConditions,
    processPayment,
    billingAddress.email,
  ]);

  const handleCouponAction = useCallback(() => {
    if (isCouponApplied) {
      dispatch(revokeCouponCode());
    } else {
      applyCoupon(coupon);
    }
  }, [isCouponApplied, applyCoupon, coupon, dispatch]);

  const handleToggleTerms = useCallback(() => {
    dispatch(
      setOrderInfo({
        ...orderInfo,
        termsAndConditions: !orderInfo.termsAndConditions,
      })
    );
  }, [dispatch, orderInfo]);

  // Computed values
  const handlePaymentElementChange = (
    event: StripePaymentElementChangeEvent
  ) => {
    setStripeMethod(true);
    // Check if the currently selected payment method is 'card'
    if (event.value.type === 'card' || event.value.type === 'link') {
      setIsCard(true);
      dispatch(setPaymentMethod('card'));
      if (event.empty) {
        // Stripe's built-in validation error (e.g., "Invalid card number")
        setCardError('Card information empty');
      } else if (!event.complete) {
        // You can set a generic "incomplete" message or wait for submission
        setCardError('Card information is incomplete.');
      } else {
        // It's a card, and it's complete with no errors
        setCardError(null);
      }
    } else if (event.value.type === 'us_bank_account') {
      dispatch(setPaymentMethod(''));
      setIsCard(false);
      if (event.empty) {
        setCardError('Bank information empty');
      } else if (!event.complete) {
        setCardError('Bank information is incomplete.');
      } else {
        setCardError(null);
      }
    } else {
      dispatch(setPaymentMethod(''));
      setIsCard(false);
      // Another payment method is selected (e.g., Klarna, Afterpay)
      // Clear any card-specific errors
      setCardError(null);
    }
  };

  // Render payment method option
  const renderPaymentOption = useCallback(
    (method: string, label: string, icon: React.ReactNode) => (
      <div
        key={method}
        onClick={() => {
          toggleAccordion(method);
          setIsCard(false);
          setCardError('');
        }}
        className="relative border border-[#e5e5e5] rounded-[12px] px-2.5 h-[48px] cursor-pointer"
      >
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center cursor-pointer min-w-0 gap-3">
            <div className="ml-2 flex items-center">
              {activeAccordion === method ? (
                <div className="relative w-[15px] h-[15px]">
                  <span className="absolute inset-0 rounded-full border-2 border-black"></span>
                  <span className="absolute inset-[4px] rounded-full bg-black"></span>
                </div>
              ) : (
                <span
                  className={`inline-block w-[15px] h-[15px] rounded-full border-[2px] border-[#6d6e78]`}
                />
              )}
            </div>
            <div className="flex items-center h-full">
              {icon}
              {label && (
                <span className="font-semibold text-gray-900 text-xl truncate">
                  {label}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    [activeAccordion, toggleAccordion]
  );

  // Order summary component to avoid duplication
  const OrderSummary = useMemo(
    () => (
      <div className="rounded-xs bg-[#F7F7F7] py-7">
        <div className="space-y-6 text-[#210203]">
          <div className="space-y-2 px-6">
            <h3 className="text-base font-semibold text-black uppercase tracking-wider">
              Delivery Option
            </h3>
            <div className="text-sm text-[#210203]">{selectedOptionTitle}</div>
          </div>

          <div className="space-y-2 text-[#210203]">
            <div className="flex justify-between items-baseline py-2 px-6">
              <p className="text-base leading-[19px] text-[#210203]">
                Item(s) Total
              </p>
              <div className="flex gap-0 items-baseline relative">
                <p className="text-xl leading-[29px] text-[#210203]">
                  <span className="text-xl font-bold">
                    ${Math.floor(subTotalCost)}.
                  </span>
                  <span className="text-sm font-bold">
                    {subTotalCost.toFixed(2).split('.')[1]}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-between items-baseline self-stretch relative w-full px-6">
              <div className="flex gap-2 items-center relative">
                <p className="text-base leading-[19px] text-[#210203]">
                  Shipping
                </p>
                <div className="flex gap-0 items-center relative">
                  <p className="text-base leading-[19px] text-[#210203]">
                    ({validatedZipCode}):
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

            {taxAmount ? (
              <div className="flex justify-between items-baseline px-6">
                <div className="flex gap-2 items-center">
                  <span className="text-[#210203] text-base font-normal">
                    Sales Tax {validatedZipCode && `(${validatedZipCode}):`}
                  </span>
                </div>
                <h4 className="text-2xl leading-[29px] text-[#210203] font-normal">
                  ${taxAmount.toFixed(2)}
                </h4>
              </div>
            ) : null}

            {discount ? (
              <div className="flex justify-between px-6">
                <span className="">Discount:</span>
                <span className="font-bold text-2xl">-${discount}</span>
              </div>
            ) : null}

            <div className="border-x-0 border-t-0 border-b border-[#cfcfcf] pb-4 flex justify-between items-baseline self-stretch relative w-full px-6 pt-2">
              <h5 className="text-xl leading-6 text-[#210203]">Total:</h5>
              <div className="flex gap-0 items-baseline relative">
                <p className="text-xl leading-[38px] text-[#210203]">
                  <span className="font-bold">
                    ${totalWithTax?.toFixed(2) || totalCost?.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 px-6" ref={termsRef}>
          <div
            onClick={handleToggleTerms}
            className="flex items-start gap-2 cursor-pointer"
          >
            <Checkbox
              checked={orderInfo.termsAndConditions}
              className="rounded-md data-[state=checked]:border-none bg-white h-5 w-5 border border-[#AAAAAA]"
            />
            <p className="text-base">
              I acknowledge the{' '}
              <Link
                href="/terms-conditions"
                target="_blank"
                className="font-semibold"
              >
                Terms and Conditions
              </Link>{' '}
              and the{' '}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="font-semibold"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          {showTermsAlert && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>
                To place your order, please accept our policies.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="px-6">
          <Button
            disabled={
              (!stripeMethod && !activeAccordion) ||
              !orderInfo.termsAndConditions ||
              (isCard && !!cardError)
            }
            className="font-semibold rounded-xs antialiased w-full h-14 mt-2 flex items-center justify-center gap-2"
            onClick={handlePlaceOrder}
          >
            {isLoading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                <span className="text-base">Place Order</span>
              </>
            )}
          </Button>
        </div>
      </div>
    ),
    [
      productBasedDiscountApplied,
      affiliateDiscount,
      coupon,
      setCoupon,
      isLoading,
      handleCouponAction,
      isCouponApplied,
      selectedOptionTitle,
      subTotalCost,
      validatedZipCode,
      cartType,
      discount,
      totalCost,
      handleToggleTerms,
      orderInfo.termsAndConditions,
      showTermsAlert,
      handlePlaceOrder,
      cardError,
      activeAccordion,
      stripeMethod,
    ]
  );

  // Modify stripe

  return (
    <div className="flex flex-col">
      {showPaymentError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span>
              Payment failed. Please try again or choose a different payment
              method.
            </span>
          </div>
          <button
            onClick={handleCloseAlert}
            className="text-red-700 hover:text-red-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="grid grid-cols-11 gap-6 lg:gap-8 pt-8 pb-20">
        <div className="col-span-11 lg:col-span-6 space-y-8">
          <BillingAndShippingInput
            billingSameAsShipping={billingSameAsShipping}
            setBillingSameAsShipping={setShippingSameAsBilling}
            setShouldDisableButton={setShouldDisableButton}
          />
        </div>

        {/**
         * Order Summary
         */}
        <div className="col-span-11 lg:col-span-5 mt-12">
          <div className="w-full flex flex-col gap-y-4">
            <h3 className="text-2xl font-bold">Select Payment Option</h3>

            <div className="flex flex-col space-y-4">
              <StripeProvider>
                <PaymentFormWrapper
                  setActiveAccordion={setActiveAccordion}
                  elementsRef={elementsRef}
                  paymentElementRef={paymentElement}
                  onPaymentElementChange={handlePaymentElementChange}
                  setIsCard={setIsCard}
                  setStripe={setStripe}
                />
                {renderPaymentOption(
                  'paypal',
                  '',
                  <Image
                    src="/paypal.png"
                    width={100}
                    height={50}
                    alt="PayPal"
                    className="h-8"
                  />
                )}

                {renderPaymentOption(
                  'pay-tomorrow',
                  '',
                  <Image
                    src="/PTLogo.png"
                    width={100}
                    height={50}
                    alt="PayTomorrow"
                    className="h-8"
                  />
                )}
                {renderPaymentOption(
                  'snap-finance',
                  '',
                  <img
                    src="https://snapfinance.com/assets/icons/logo.svg"
                    className="w-auto h-8 mr-2"
                    alt="Snap Finance"
                  />
                )}
              </StripeProvider>
            </div>

            <div>
              {isCard && !activeAccordion && (
                <div className="flex items-center gap-1 text-primary py-4">
                  <InfoIcon />
                  <p>
                    Note: If you pay with credit card, we will ship these
                    products to provided Billing Address
                  </p>
                </div>
              )}
            </div>
          </div>

          {OrderSummary}
        </div>
      </div>
    </div>
  );
};
