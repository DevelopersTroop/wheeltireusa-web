'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Clock, Loader2, ShieldCheck } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import StaticImage from '@/components/ui/staticImage';
import { useCheckout } from '@/context/checkoutContext';
import useAuth from '@/hooks/useAuth';
import { emptyCart } from '@/redux/features/cartSlice';
import {
  revokeCouponCode,
  updateOrderSuccessData,
} from '@/redux/features/checkoutSlice';
import { useTypedSelector } from '@/redux/store';
import { TOrder, TOrderData } from '@/types/order';
import { triggerGaPurchaseEvent } from '@/utils/analytics';
import { apiBaseUrl } from '@/utils/api';
import { toast } from 'sonner';
import { CartSummary } from './CartSummary';
import { CreateAccountSection } from './CreateAccountSection';
import { DeliveryOptions } from './DeliveryOptions';
import { OrderConfirmation } from './OrderConfirmation';
import { OrderSummary } from './OrderSummary';
import { PaymentInfo } from './PaymentInfo';
import { ShippingDetails } from './ShippingInfo';
import { loadStripe, PaymentIntentResult } from '@stripe/stripe-js';

// Interface for checkout step props
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

// FinalStep Component
export const FinalStep: React.FC = () => {
  /**
   * Redux Store & Dispatch hook
   */
  const { orderSuccessData, isAccountCreated } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  const dispatch = useDispatch();

  // Use a ref to track if verification has already been attempted
  const hasVerified = useRef(false);

  /**
   * Checkout context
   */
  const { clearCheckoutState, setStep } = useCheckout();
  const { user }: any = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Component state
  const [showSurvey, setShowSurvey] = useState(false);
  const [survey, setSurvey] = useState<'yes' | 'no' | ''>('');
  const [verifying, setVerifying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [paymentData, setPaymentData] = useState(null);

  // Function to handle survey submission
  const handleSumbitSurvey = (data: typeof survey) => {
    setSurvey(data);
    setShowSurvey(false);
  };

  // Effect to verify payment
  useEffect(() => {
    const verifyPayment = async () => {
      // Prevent multiple verification attempts
      if (hasVerified.current) return;
      hasVerified.current = true;

      try {
        setVerifying(true);

        const method = searchParams.get('method');

        //Stripe params
        const orderId = searchParams.get('order_id');
        const paymentIntentClientSecret = searchParams.get(
          'payment_intent_client_secret'
        );

        //PayPal params
        const paymentId = searchParams.get('paymentId');
        const PayerID = searchParams.get('PayerID');

        // Early return if no order ID is present
        if (!orderId) {
          throw new Error('Missing order information');
        }

        const stripe = await stripePromise;

        if (method === 'stripe' && !stripe)
          throw new Error('Expected stripe promise to be resolved');

        let paymentIntentResult: PaymentIntentResult | undefined = undefined;
        if (method === 'stripe') {
          paymentIntentResult = await stripe?.retrievePaymentIntent(
            paymentIntentClientSecret as string
          );
        }
        const paymentIntent = paymentIntentResult?.paymentIntent;

        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(interval);
              return 90;
            }
            return prev + 10;
          });
        }, 200);

        let response;

        if (method === 'stripe') {
          // Stripe
          response = await fetch(
            `${apiBaseUrl}/payments/verify-payment?orderId=${orderId}`
          );
        } else if (method === 'pay_tomorrow') {
          response = await fetch(
            `${apiBaseUrl}/payments/pay-tomorrow/status?orderId=${orderId}`
          );
        } else if (method === 'snap_finance') {
          response = await fetch(
            `${apiBaseUrl}/payments/snap-finance/status?orderId=${orderId}`
          );
        } else {
          // PayPal
          response = await fetch(
            `${apiBaseUrl}/payments/verify-payment?orderId=${orderId}`
          );
        }

        const result = await response.json();

        // Handle successful payment verification
        if (response.ok && result.data?.order) {
          const order = result.data.order as TOrder;
          setProgress(100);

          if (method === 'stripe' && paymentIntent?.status !== 'succeeded') {
            router.push('/checkout?step=1&order_status=false');
            return;
          }
          // Update Redux state with order success data
          dispatch(updateOrderSuccessData(result.data.order));
          setPaymentData(result.data.payment);
          // Trigger Google Analytics purchase event
          triggerGaPurchaseEvent(order);
          toast.success('Order Confirmed', {
            description: 'Your payment has been processed successfully.',
          });
          clearCheckoutState();
          setStep(2);
          dispatch(emptyCart());
          dispatch(revokeCouponCode());
        } else {
          throw new Error(result.message || "Payment verification failed");
        }
      } catch (err) {
        console.log("TCL: verifyPayment -> err", err)
        // router.push('/checkout?step=1&order_status=false');
      } finally {
        setVerifying(false);
      }
    };

    // Only run verification if we have URL parameters indicating a payment return
    const hasPaymentParams =
      searchParams.get('session_id') ||
      (searchParams.get('paymentId') && searchParams.get('PayerID')) ||
      searchParams.get('method');

    if (hasPaymentParams && searchParams.get('order_id')) {
      verifyPayment();
    }

    // Empty dependency array to ensure this effect runs only once on component mount
  }, []);

  // Effect to scroll to the top of the page on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Render loading state while verifying payment
  if (verifying) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white border border-slate-100 rounded-2xl p-8 space-y-6 shadow-sm">
            {/* Animated Clock Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-white animate-spin-slow" style={{ animationDuration: '3s' }} />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Verifying order</h2>
              <p className="text-slate-500 text-sm">Please wait while we confirm your payment</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-1.5 w-full bg-slate-100" />
              <div className="flex justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <span>Processing</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Secure SSL Connection • 256-bit Encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render final step content
  return (
    <div className="space-y-6">
      {searchParams.get('method') === 'pay_tomorrow' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <div className="bg-amber-100 p-2 rounded-lg shrink-0">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-1">
              Order Processing — Pay Tomorrow
            </h3>
            <p className="text-xs font-semibold text-amber-700 leading-relaxed">
              Your loan application is being processed. We'll ship your order once verification and funding are complete.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-11 gap-6 lg:gap-8 pt-4 pb-16">
        {/* Left Section: Order Details */}
        <div className="col-span-11 lg:col-span-7 space-y-6">
          <OrderConfirmation
            email={orderSuccessData?.data?.shippingAddress?.email}
            orderData={orderSuccessData}
          />

          <CartSummary
            productsInfo={orderSuccessData?.data?.productsInfo as any}
            totalCost={orderSuccessData?.data?.totalCost}
          />

          <DeliveryOptions
            requestedDealer={orderSuccessData?.data?.requestedDealer}
            selectedDealerInfo={orderSuccessData?.data?.selectedDealerInfo}
            selectedOptionTitle={orderSuccessData?.data?.selectedOptionTitle}
          />

          <ShippingDetails
            localDealerInfo={orderSuccessData?.data?.localDealerInfo}
            selectedDealer={orderSuccessData?.data?.selectedDealer}
            shippingAddress={orderSuccessData?.data?.shippingAddress}
            selectedOptionTitle={orderSuccessData?.data?.selectedOptionTitle}
          />

          {paymentData && (
            <PaymentInfo
              paymentData={
                {
                  ...(paymentData as any),
                  orderId: orderSuccessData?.orderId,
                } as any
              }
            />
          )}
        </div>

        {/* Right Section: Order Summary and Account Creation */}
        <div className="col-span-11 lg:col-span-4 space-y-6">
          {!isAccountCreated && !user?._id && (
            <CreateAccountSection orderSuccessData={orderSuccessData} />
          )}
          <OrderSummary
            totalCost={orderSuccessData?.data?.totalCost}
            taxAmount={orderSuccessData?.data?.taxAmount}
            totalWithTax={
              orderSuccessData?.data?.totalWithTax
                ? orderSuccessData?.data?.totalWithTax
                : orderSuccessData?.data?.netCost
                  ? parseFloat(orderSuccessData?.data?.netCost)
                  : 0
            }
            netCost={orderSuccessData?.data?.netCost}
            cartType={orderSuccessData?.data?.cartType}
            discount={orderSuccessData?.data?.discount}
            zipCode={orderSuccessData?.data?.shippingAddress?.zipCode}
            deliveryCharge={orderSuccessData?.data?.deliveryCharge}
          />
        </div>
      </div>

      {/* Survey Modal */}
      <Dialog open={showSurvey} onOpenChange={setShowSurvey}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="relative w-fit">
              <StaticImage
                src="images/AmaniLogo.webp"
                className="w-20 h-20 rounded-full"
              />
            </DialogTitle>
          </DialogHeader>
          <h2 className="font-bold text-lg mt-2">Your Opinion Counts</h2>
          <h3 className="font-bold">
            Is this your first time placing an order with us?
          </h3>
          <div className="flex items-center gap-4">
            <div
              onClick={() => handleSumbitSurvey('yes')}
              className="flex items-center font-bold gap-2 cursor-pointer"
            >
              <Checkbox
                checked={survey === 'yes'}
                className="rounded-full border-slate-300"
              />
              <p>Yes</p>
            </div>
            <div
              onClick={() => handleSumbitSurvey('no')}
              className="flex items-center font-bold gap-2 cursor-pointer"
            >
              <Checkbox
                checked={survey === 'no'}
                className="rounded-full border-slate-300"
              />
              <p>No</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
