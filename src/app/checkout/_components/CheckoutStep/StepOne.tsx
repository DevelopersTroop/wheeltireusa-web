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
import { AlertCircle, ChevronRight, InfoIcon, Loader, ShoppingCart, X } from 'lucide-react';
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
export const StepOne = ({ }) => {
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
        className={`group relative rounded-xl p-4 h-16 cursor-pointer transition-all duration-500 border-2 ${activeAccordion === method
          ? 'border-slate-900 bg-slate-900 text-white shadow-xl -translate-y-0.5'
          : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-lg'
          }`}
      >
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${activeAccordion === method ? 'border-primary' : 'border-slate-200'
              }`}>
              {activeAccordion === method && <div className="w-2 h-2 rounded-full bg-primary" />}
            </div>
            <div className="flex items-center">
              {icon}
              {label && (
                <span className={`text-lg font-black uppercase italic tracking-tighter ml-3 ${activeAccordion === method ? 'text-white' : 'text-slate-900'
                  }`}>
                  {label}
                </span>
              )}
            </div>
          </div>
          {activeAccordion === method && (
            <div className="bg-primary/20 p-2 rounded-xl">
              <ChevronRight size={16} className="text-primary" />
            </div>
          )}
        </div>
      </div>
    ),
    [activeAccordion, toggleAccordion]
  );

  // Order summary component to avoid duplication
  const OrderSummary = useMemo(
    () => (
      <div className="rounded-3xl bg-white border border-slate-100 shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
              Protocol: {selectedOptionTitle}
            </h3>
            <div className="h-1 w-12 bg-primary rounded-full" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-baseline group">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                Base Valuation
              </p>
              <div className="flex gap-1 items-baseline">
                <span className="text-slate-900 text-2xl font-black italic tracking-tighter">
                  ${Math.floor(subTotalCost)}
                </span>
                <span className="text-slate-400 text-[10px] font-black italic">
                  .{subTotalCost.toFixed(2).split('.')[1]}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline group">
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                  Shipping Fee
                </p>
                <span className="text-[8px] text-primary font-black uppercase tracking-tighter">Verified: {validatedZipCode}</span>
              </div>
              <div className="flex gap-0 items-baseline">
                <h4 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">
                  {cartType === 'CENTER_CAP_ONLY' ? '$14.99' : 'Free'}
                </h4>
              </div>
            </div>

            {taxAmount ? (
              <div className="flex justify-between items-baseline group">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                  Mandatory Tax
                </span>
                <h4 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">
                  ${taxAmount.toFixed(2)}
                </h4>
              </div>
            ) : null}

            {discount ? (
              <div className="flex justify-between items-baseline group">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Incentive Applied</span>
                <span className="font-black text-primary text-2xl italic tracking-tighter">-${discount}</span>
              </div>
            ) : null}

            <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Net Total</h5>
              <div className="flex gap-1 items-baseline">
                <span className="text-slate-900 text-4xl font-black italic tracking-tighter">
                  ${Math.floor(totalWithTax || totalCost || 0)}
                </span>
                <span className="text-slate-400 text-lg font-black italic">
                  .{(totalWithTax || totalCost || 0).toFixed(2).split('.')[1]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 px-6 bg-slate-50/50 rounded-2xl border border-slate-100" ref={termsRef}>
          <div
            onClick={handleToggleTerms}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <Checkbox
              checked={orderInfo.termsAndConditions}
              className="rounded-md data-[state=checked]:bg-slate-900 border-slate-300 h-5 w-5 transition-all group-hover:border-primary"
            />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
              I certify and accept the{' '}
              <Link
                href="/terms-conditions"
                target="_blank"
                className="text-slate-900 underline decoration-primary decoration-1 underline-offset-4"
              >
                Terms of Engagement
              </Link>{' '}
              and the{' '}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="text-slate-900 underline decoration-primary decoration-1 underline-offset-4"
              >
                Privacy Protocol
              </Link>
              .
            </p>
          </div>
          {showTermsAlert && (
            <Alert variant="destructive" className="mt-4 border-2 border-rose-500 bg-rose-50 rounded-xl p-3">
              <AlertDescription className="text-[10px] font-black uppercase tracking-tighter text-rose-700">
                Action Required: Authorization protocol incomplete.
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
            className="group relative font-black uppercase italic tracking-widest w-full h-16 mb-2 overflow-hidden rounded-2xl bg-slate-900 text-white hover:bg-primary transition-all duration-500 shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-95 disabled:grayscale disabled:opacity-50 disabled:translate-y-0"
            onClick={handlePlaceOrder}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-base">Processing...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 group-hover:animate-bounce" />
                  <span className="text-base">Finalize Order</span>
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
          <p className="text-center text-[8px] font-black text-slate-400 uppercase tracking-widest">Secure TLS 1.3 Encryption Protocol Active</p>
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
        <div className="col-span-11 lg:col-span-5 space-y-6">
          <div className="w-full flex flex-col gap-y-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
                Secure Payment
              </h3>
              <div className="h-1 w-12 bg-primary rounded-full" />
            </div>

            <div className="flex flex-col space-y-4 p-6 bg-white/40 backdrop-blur-3xl rounded-3xl border border-slate-100 shadow-xl">
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
                    src="/images/financing/PayPal.png"
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
