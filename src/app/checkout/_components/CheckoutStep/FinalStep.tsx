/** eslint-disable @next/next/no-img-element */
'use client';

import { Progress } from '@/components/ui/progress';
import { Clock, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import { OrderConfirmation } from './OrderConfirmation';
import { OrderSummary } from './OrderSummary';
import { PaymentData, PaymentInfo } from './PaymentInfo';
import { ShippingInfo } from './ShippingInfo';
import { trackEvent } from '@/lib/tracker';
import { useTypedSelector } from '@/redux/store';
import { customFetch } from '@/lib/commonFetch';
import { IApiRes } from '@/types/reduxHelper';
import { TOrder } from '@/types/order';
import {
  revokeCouponCode,
  updateOrderSuccessData,
} from '@/redux/features/checkoutSlice';
import { triggerGaPurchaseEvent } from '@/utils/analytics';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const FinalStep: React.FC = () => {
  /**
   * Redux Store & Dispatch hook
   */
  const { orderSuccessData } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  const dispatch = useDispatch();

  /**
   * Checkout context
   */
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verifying, setVerifying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const queryParams = useMemo(
    () => ({
      sessionId: searchParams.get('session_id'),
      orderId: searchParams.get('order_id'),
      paymentId: searchParams.get('paymentId'),
      PayerID: searchParams.get('PayerID'),
      method: searchParams.get('method'),
    }),
    [searchParams]
  );

  const { sessionId, orderId, paymentId, PayerID, method } = queryParams;

  useEffect(() => {
    if (!orderId || !method) {
      return; // Prevent unnecessary effect execution
    }

    let isMounted = true; // Prevent state updates on unmounted component
    setVerifying(true);

    const verifyPayment = async () => {
      try {
        // Start progress animation only if below 90
        const stripe = await stripePromise;
        const paymentIntentClientSecret = searchParams.get(
          'payment_intent_client_secret'
        );
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

        if (method === 'stripe' && !stripe)
          throw new Error('Expected stripe promise to be resolved');

        const paymentIntentResult = await stripe?.retrievePaymentIntent(
          paymentIntentClientSecret as string
        );
        const paymentIntent = paymentIntentResult?.paymentIntent;

        if (method === 'stripe' && !paymentIntent)
          throw new Error('Expected payment intent to be resolved');

        if (method === 'stripe') {
          response = await customFetch(
            `payments/stripe/verify-payment?orderId=${orderId}`
          );
        } else if (method === 'pay_tomorrow') {
          response = await customFetch(
            `payments/pay-tomorrow/status?orderId=${orderId}`
          );
        } else if (method === 'snap_finance') {
          response = await customFetch(
            `payments/snap-finance/status?orderId=${orderId}`
          );
        } else {
          response = await customFetch<
            IApiRes<{ order: TOrder; payment: PaymentData }>
          >(
            `payments/verify-paypal-payment?paymentId=${paymentId}&PayerID=${PayerID}&orderId=${orderId}`
          );
        }

        clearInterval(interval); // Stop progress animation

        if (!isMounted) return;

        if (!response || !response.data) {
          throw new Error('Invalid response from payment verification');
        }

        const result = response.data as { order: TOrder; payment: any };
        console.log('TCL: verifyPayment -> result', result);

        if (result?.order) {
          setProgress(80);
          if (method === 'stripe' && paymentIntent?.status !== 'succeeded') {
            router.push('/checkout?step=1&order_status=false');
            return;
          }

          setProgress(100);
          dispatch(updateOrderSuccessData(result.order));
          setPaymentData(result.payment);
          triggerGaPurchaseEvent(result.order);
          trackEvent('checkout_complete', {
            order_id: result.order.orderId,
            payment_id: result.payment._id,
          });
          toast.success('Order Placed Successfully');
          // dispatch(emptyCart());
          dispatch(revokeCouponCode());
        } else {
          throw new Error('Payment verification failed');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        toast.error('Payment verification failed. Please try again.');
        if (isMounted) {
          router.push('/checkout?step=1&order_status=false');
        }
      } finally {
        if (isMounted) {
          setVerifying(false);
        }
      }
    };

    verifyPayment();

    return () => {
      isMounted = false;
    };
  }, [sessionId, orderId, paymentId, PayerID, dispatch, router]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (verifying) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto space-y-4">
          <div className="pb-2 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <Clock className="h-8 w-8 animate-pulse text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Verifying Payment
            </h2>
            <p className="mt-2 text-gray-600">
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
      <div className="grid grid-cols-11 gap-6 pb-20 pt-8 lg:gap-8">
        <div className="col-span-11 lg:col-span-7">
          <OrderConfirmation
            email={orderSuccessData?.data?.shippingAddress?.email}
            orderData={orderSuccessData}
          />

          <div className="flex flex-col gap-8">
            {/* <CartSummary
              productsInfo={orderSuccessData?.data?.productsInfo}
              totalCost={orderSuccessData?.data?.totalCost}
            /> */}

            {/* <DeliveryOptions
              requestedDealer={orderSuccessData?.data?.requestedDealer}
              selectedDealerInfo={orderSuccessData?.data?.selectedDealerInfo}
              selectedOptionTitle={orderSuccessData?.data?.selectedOptionTitle}
            /> */}

            <ShippingInfo
              shippingAddress={orderSuccessData?.data?.shippingAddress}
              selectedDealer={orderSuccessData?.data?.selectedDealer}
            />

            {paymentData && (
              <PaymentInfo paymentData={paymentData as PaymentData} />
            )}
          </div>
        </div>

        <div className="sticky top-0 col-span-11 flex flex-col gap-8 lg:col-span-4">
          <OrderSummary
            totalCost={orderSuccessData?.data?.totalCost}
            taxAmount={orderSuccessData?.data?.taxAmount}
            totalWithTax={
              orderSuccessData?.data?.totalWithTax ||
              (orderSuccessData?.data?.netCost
                ? parseFloat(orderSuccessData?.data?.netCost)
                : parseFloat('0.00'))
            }
            netCost={orderSuccessData?.data?.netCost}
            cartType={orderSuccessData?.data?.cartType}
            discount={orderSuccessData?.data?.discount}
            zipCode={orderSuccessData?.data?.shippingAddress?.zipCode}
          />
        </div>
      </div>
    </div>
  );
};
