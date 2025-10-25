import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { useCheckout } from '@/context/checkoutContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { apiInstance } from '@/redux/apis/base';
import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner';

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
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!totalCost || hasFetched.current) return;
    hasFetched.current = true;

    const amount = Math.round(parseFloat(totalCost) * 100); // always integer cents

    apiInstance
      .post<{ data: { secret: string; id: string } }>(
        '/payments/stripe/intent',
        { amount, currency: 'USD' }
      )
      .then((res) => {
        console.log('StripeProvider -> PaymentIntent created:', res.data);
        setClientSecret(res.data.data.secret);
        setPaymentIntentId(res.data.data.id);
      })
      .catch((err) => {
        console.error('Failed to create PaymentIntent:', err);
      });
  }, [totalCost]);

  // Wait until clientSecret is ready
  if (!clientSecret) return <LoadingSpinner />;

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
