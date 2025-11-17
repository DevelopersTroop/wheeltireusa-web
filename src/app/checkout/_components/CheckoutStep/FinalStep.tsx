'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Clock, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  revokeCouponCode,
  updateOrderSuccessData,
} from '@/redux/features/checkoutSlice';
import { useTypedSelector } from '@/redux/store';
import { TOrder } from '@/types/order';
import { triggerGaPurchaseEvent } from '@/utils/analytics';
import { apiBaseUrl } from '@/utils/api';
import { CartSummary } from './CartSummary';
import { CreateAccountSection } from './CreateAccountSection';
import { DeliveryOptions } from './DeliveryOptions';
import { OrderConfirmation } from './OrderConfirmation';
import { OrderSummary } from './OrderSummary';
import { PaymentInfo } from './PaymentInfo';
import { ShippingDetails } from './ShippingDetails';
import StaticImage from '@/components/ui/staticImage';
import { useCheckout } from '@/context/checkoutContext';
import useAuth from '@/hooks/useAuth';
import { emptyCart } from '@/redux/features/cartSlice';
import { toast } from 'sonner';

// Interface for checkout step props

// FinalStep Component
export const FinalStep: React.FC = () => {
  /**
   * Redux Store & Dispatch hook
   */
  const { orderSuccessData, isAccountCreated } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  const dispatch = useDispatch(); // Redux dispatch hook

  // Use a ref to track if verification has already been attempted
  const hasVerified = useRef(false);

  /**
   * Checkout context
   */
  const { clearCheckoutState, setStep } = useCheckout(); // Functions to clear checkout state and set the current step
  const { user }: any = useAuth(); // Authentication context
  const searchParams = useSearchParams(); // Hook to access query parameters
  const router = useRouter(); // Hook for navigation

  // Component state
  const [showSurvey, setShowSurvey] = useState(false); // State to show the survey modal
  const [survey, setSurvey] = useState<'yes' | 'no' | ''>(''); // State to track survey response
  const [verifying, setVerifying] = useState(true); // State to track payment verification
  const [progress, setProgress] = useState(0); // State to track progress bar value
  const [paymentData, setPaymentData] = useState(null); // State to store payment data

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
        const sessionId = searchParams.get('session_id');
        const orderId = searchParams.get('order_id');

        //PayPal params
        const paymentId = searchParams.get('paymentId');
        const PayerID = searchParams.get('PayerID');

        // Early return if no order ID is present
        if (!orderId) {
          throw new Error('Missing order information');
        }

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
            `${apiBaseUrl}/payments/stripe/verify-payment?orderId=${orderId}`
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
            `${apiBaseUrl}/payments/verify-paypal-payment?paymentId=${paymentId}&PayerID=${PayerID}&orderId=${orderId}`
          );
        }

        const result = await response.json();

        // Handle successful payment verification
        if (response.ok && result.data?.order) {
          const order = result.data.order as TOrder;
          setProgress(100);
          // Update Redux state with order success data
          dispatch(updateOrderSuccessData(result.data.order));
          setPaymentData(result.data.payment);
          // Trigger Google Analytics purchase event
          triggerGaPurchaseEvent(order);
          toast.success('Order Confirmed', {
            description: 'Your payment has been processed successfully.',
          });
          clearCheckoutState();
          setStep(4);
          dispatch(emptyCart());
          dispatch(revokeCouponCode());
        } else {
          // throw new Error(result.message || "Payment verification failed");
        }
      } catch (err) {
        // Redirect to checkout page with error status
        router.push('/checkout?step=3&order_status=false');
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
        <div className="w-full max-w-md space-y-4">
          <div className="text-center pb-2">
            <div className="mx-auto mb-4 bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center">
              <Clock className="h-8 w-8 text-blue-500 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Verifying Payment
            </h2>
            <p className="text-gray-600 mt-2">
              Please wait while we confirm your payment...
            </p>
          </div>
          <Progress value={progress} className="h-2 w-full" />
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing your order
          </div>
        </div>
      </div>
    );
  }

  // Render final step content
  return (
    <div>
      {searchParams.get('method') === 'pay_tomorrow' && (
        <div className="rounded-2xl border border-blue-300 bg-blue-50 p-4 mt-4">
          <h3 className="text-lg font-semibold text-primary">
            Your Order is Being Processed
          </h3>
          <p className="text-sm text-primary mt-1">
            You’ve chosen <strong>Pay Tomorrow</strong> as your payment method.
            This option allows you to complete your purchase through a loan
            system. We’ll wait for <strong>verification and funding</strong> to
            be completed before shipping your order. Stay tuned — we’ll update
            you by email once your order is cleared for shipment.
          </p>
        </div>
      )}
      <div className="grid grid-cols-11 gap-6 lg:gap-8 pt-8 pb-20">
        {/* Left Section: Order Details */}
        <div className="col-span-11 lg:col-span-7">
          <OrderConfirmation
            email={orderSuccessData?.data?.shippingAddress?.email}
            orderData={orderSuccessData}
          />

          <div className="flex flex-col gap-8">
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
              // shippingAddress={orderSuccessData?.data?.shippingAddress}
              // selectedDealer={orderSuccessData?.data?.selectedDealer}
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
        </div>

        {/* Right Section: Order Summary and Account Creation */}
        <div className="col-span-11 lg:col-span-4 sticky top-0 flex flex-col gap-8">
          {!isAccountCreated && !user?._id && (
            <CreateAccountSection orderSuccessData={orderSuccessData} />
          )}
          <OrderSummary
            totalCost={orderSuccessData?.data?.totalCost}
            taxAmount={orderSuccessData?.data?.taxAmount}
            totalWithTax={
              orderSuccessData?.data?.totalWithTax ||
              orderSuccessData?.data?.netCost
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
