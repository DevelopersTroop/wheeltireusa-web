import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useCheckout } from '@/context/checkoutContext';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { apiInstance } from '@/redux/apis/base';
import {
  setShippingCharge,
  setTaxAmount,
} from '@/redux/features/checkoutSlice';
import { useSearchParams } from 'next/navigation';

// --------------------
// Types
// --------------------
type TStripeContext = {
  clientSecret?: string;
  paymentIntentId?: string;
};

const StripeContext = createContext<TStripeContext | undefined>(undefined);

// --------------------
// Stripe Instance
// --------------------
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

// --------------------
// Provider Component
// --------------------
export default function StripeProvider({ children }: React.PropsWithChildren) {
  const { totalCost } = useCheckout();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  console.log('TCL: StripeProvider -> step', step);
  const { billingAddress, shippingAddress, productsInfo } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const hasFetched = useRef(false);
  const dispatch = useAppDispatch();
  const [err, setErr] = useState('');

  useEffect(() => {
    if (
      !totalCost ||
      hasFetched.current ||
      (!billingAddress && !shippingAddress) ||
      Number(step) !== 3
    )
      return;
    hasFetched.current = true;
    setLoading(true);

    const amount = Math.round(parseFloat(totalCost) * 100); // always integer cents

    apiInstance
      .post<{
        data: {
          secret: string;
          id: string;
          taxAmount: number;
          totalWithTax: number;
          shippingCharge: number;
        };
      }>('/payments/stripe/intent', {
        amount,
        currency: 'USD',
        billingAddress,
        shippingAddress,
        products: productsInfo.map((p) => ({
          sku: p.sku,
          quantity: p.quantity,
        })),
      })
      .then((res) => {
        console.log('StripeProvider -> PaymentIntent created:', res.data);
        setClientSecret(res.data.data.secret);
        setPaymentIntentId(res.data.data.id);
        dispatch(
          setTaxAmount({
            taxAmount: res.data.data.taxAmount / 100,
            totalWithTax: res.data.data.totalWithTax / 100,
          })
        );
        dispatch(setShippingCharge(res.data.data.shippingCharge));
      })
      .catch((err) => {
        setErr(
          err.error.data.errors.map((c: any) => c.message).join('') as string
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [totalCost, billingAddress, shippingAddress, dispatch, step]);

  // Wait until clientSecret is ready
  // if (loading) return <LoadingSpinner />;

  if (!clientSecret) {
    return (
      <div className="text-center py-10 text-2xl font-semibold">
        <h2>{err ?? "You don't have valid shipping or billing address"}</h2>
      </div>
    );
  }

  // Stripe Element appearance and options
  const options: StripeElementsOptions = {
    clientSecret,
    loader: 'always',
    appearance: {
      theme: 'flat',
      variables: {
        colorPrimary: '#000',
        accordionItemSpacing: '16px',
        borderRadius: '12px',
      },
    },
  };

  return (
    <StripeContext.Provider value={{ clientSecret, paymentIntentId }}>
      <Elements stripe={stripePromise} options={options}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
}

// --------------------
// Hook
// --------------------
export const useStripeContext = () => {
  const context = useContext(StripeContext);
  if (!context)
    throw new Error('useStripeContext must be used within StripeProvider');
  return context;
};
