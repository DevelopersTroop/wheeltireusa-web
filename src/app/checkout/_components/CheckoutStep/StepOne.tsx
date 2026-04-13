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
import { AlertCircle, ChevronRight, Info, Loader2, ShoppingCart, X, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
  const newsLetterRef = useRef<HTMLDivElement>(null);
  const phoneNumberRef = useRef<HTMLDivElement>(null);
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

  const onClickHandler = (data: any, actions: any) => {
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
    // console.log('Init data:', d);
  };

  // ✅ Input config
  const inputCheckout: TSnapInputCheckout = {
    init: onInitHandler,
    onClick: onClickHandler,
    onApproved: onApprovedHandler,
    onError: onErrorHandler,
    onInit(data, actions) {
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
        console.error(err);
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
        className={`group relative rounded-xl p-3 h-14 cursor-pointer transition-all duration-200 border
          ${activeAccordion === method
            ? 'border-slate-900 bg-slate-900 text-white'
            : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
      >
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                ${activeAccordion === method ? 'border-white' : 'border-slate-300'
                }`}
            >
              {activeAccordion === method && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            {icon}
          </div>
          {activeAccordion === method && (
            <ChevronRight size={16} className="text-white" />
          )}
        </div>
      </div>
    ),
    [activeAccordion, toggleAccordion]
  );

  // Order summary component
  const OrderSummary = useMemo(
    () => (
      <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-5 shadow-sm">
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {selectedOptionTitle}
            </span>
            <div className="h-[2px] w-7 bg-slate-900 rounded-full" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Subtotal</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-sm font-bold text-slate-900">
                  ${Math.floor(subTotalCost)}
                </span>
                <span className="text-xs text-slate-400">
                  .{subTotalCost.toFixed(2).split('.')[1]}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Shipping</span>
                <span className="text-[8px] text-slate-400 uppercase tracking-tighter">{validatedZipCode}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">
                {cartType === 'CENTER_CAP_ONLY' ? '$14.99' : 'Free'}
              </span>
            </div>

            {taxAmount ? (
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tax</span>
                <span className="text-sm font-bold text-slate-900">${taxAmount.toFixed(2)}</span>
              </div>
            ) : null}

            {discount && (
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Discount</span>
                <span className="text-sm font-bold text-primary">-${discount}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-900">Total</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-bold text-slate-900">
                  ${Math.floor(totalWithTax || totalCost || 0)}
                </span>
                <span className="text-xs text-slate-400">
                  .{(totalWithTax || totalCost || 0).toFixed(2).split('.')[1]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4" ref={termsRef}>
          <div
            onClick={handleToggleTerms}
            className="flex items-start gap-3 cursor-pointer"
          >
            <Checkbox
              checked={orderInfo.termsAndConditions}
              className="rounded-md border-slate-300 h-4 w-4 mt-0.5"
            />
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider leading-relaxed">
              I accept the{' '}
              <Link
                href="/terms-conditions"
                target="_blank"
                className="text-slate-900 underline"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="text-slate-900 underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          {showTermsAlert && (
            <Alert variant="destructive" className="mt-3 border-rose-500 bg-rose-50 rounded-lg p-3">
              <AlertDescription className="text-[9px] font-semibold uppercase tracking-wider text-rose-700">
                Please accept the terms to continue
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Button
          disabled={
            (!stripeMethod && !activeAccordion) ||
            !orderInfo.termsAndConditions ||
            (isCard && !!cardError)
          }
          className="w-full h-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors font-semibold uppercase tracking-wider text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePlaceOrder}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Place Order
            </span>
          )}
        </Button>
        <p className="text-center text-[8px] font-semibold text-slate-400 uppercase tracking-wider">Secure checkout</p>
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

  return (
    <div className="flex flex-col">
      {showPaymentError && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
            <span className="text-rose-700 font-semibold text-sm">
              Payment failed — Please try again
            </span>
          </div>
          <button
            onClick={handleCloseAlert}
            className="text-rose-600 hover:text-rose-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-11 gap-6 lg:gap-8 pt-6 pb-16">
        <div className="col-span-11 lg:col-span-7 space-y-8">
          <BillingAndShippingInput
            billingSameAsShipping={billingSameAsShipping}
            setBillingSameAsShipping={setShippingSameAsBilling}
            setShouldDisableButton={setShouldDisableButton}
          />
        </div>

        {/**
         * Order Summary & Payment
         */}
        <div className="col-span-11 lg:col-span-4 space-y-5">
          <div className="space-y-3">
            {/* Payment Section Header */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Payment method
              </span>
              <div className="h-[2px] w-7 bg-slate-900 rounded-full" />
            </div>

            {/* Payment Options */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-2 shadow-sm">
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
                    className="h-7"
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
                    className="h-7"
                  />
                )}
                {renderPaymentOption(
                  'snap-finance',
                  '',
                  <img
                    src="https://snapfinance.com/assets/icons/logo.svg"
                    className="w-auto h-7"
                    alt="Snap Finance"
                  />
                )}
              </StripeProvider>
            </div>
          </div>

          {/* Card Payment Notice */}
          {isCard && !activeAccordion && (
            <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
              <Info className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                Credit card orders ship to the billing address for security.
              </p>
            </div>
          )}

          {OrderSummary}
        </div>
      </div>
    </div>
  );
};
