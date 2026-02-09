import LoadingSpinner from '@/components/shared-old/loading/spinner';
import { useCheckout } from '@/context/checkoutContext';
import { apiInstance } from '@/redux/apis/base';
import {
  setPaymentIntentId,
  setTaxAmount,
} from '@/redux/features/checkoutSlice';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { TBillingAddress } from '@/types/order';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

// --------------------
// Types
// --------------------
type TStripeContext = {
  clientSecret?: string;
  paymentIntentId?: string;
  stripe: Stripe | null;
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
  const { totalCost, step } = useCheckout();
	console.log("TCL: StripeProvider -> totalCost", totalCost)
  const { billingAddress, shippingAddress, paymentIntentId, productsInfo } =
    useTypedSelector((state) => state.persisted.checkout);
  console.log('TCL: StripeProvider -> shippingAddress', shippingAddress);

  const stripe = use(stripePromise);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const lastFetchedAddresses = useRef<string>('');
  const dispatch = useAppDispatch();
  const [err, setErr] = useState('');

  const requiredFields: (keyof TBillingAddress)[] = [
    'address1',
    'zipCode',
    'country',
    'cityState',
    'phone',
    'email',
    'fname',
    'lname',
  ];

  // Helper function to check if an address has all required fields
  const hasAllRequiredFields = (address: TBillingAddress | null): boolean => {
    if (!address) return false;
    return requiredFields.every((field) => {
      const value = address[field];
      return value !== undefined && value !== null && value !== '';
    });
  };

  // Check if addresses are complete
  const isBillingComplete = hasAllRequiredFields(billingAddress);
  const isShippingComplete = hasAllRequiredFields(shippingAddress);
  const areAddressesComplete = isBillingComplete || isShippingComplete;

  useEffect(() => {
    // Don't fetch if no totalCost
    if (!totalCost) return;

    // Don't fetch if addresses aren't complete
    if (!areAddressesComplete) {
      setClientSecret('');
      setErr('');
      return;
    }

    // Create a hash of the current addresses to detect changes
    const currentAddressHash = JSON.stringify({
      billing: billingAddress,
      shipping: shippingAddress,
      totalCost,
    });

    // Don't refetch if addresses haven't changed
    if (lastFetchedAddresses.current === currentAddressHash) {
      return;
    }

    // Update the last fetched addresses
    lastFetchedAddresses.current = currentAddressHash;

    setLoading(true);
    setErr('');

    const amount = Math.round(parseFloat(totalCost) * 100); // always integer cents

    apiInstance
      .post<{
        data: {
          secret: string;
          id: string;
          taxAmount: number;
          totalWithTax: number;
        };
      }>('/payments/stripe/intent', {
        amount,
        currency: 'USD',
        billingAddress,
        shippingAddress,
        products: productsInfo,
      })
      .then((res) => {
        console.log('StripeProvider -> PaymentIntent created:', res.data);
        setClientSecret(res.data.data.secret);
        dispatch(setPaymentIntentId(res.data.data.id));
        dispatch(
          setTaxAmount({
            taxAmount: res.data.data.taxAmount / 100,
            totalWithTax: res.data.data.totalWithTax / 100,
          })
        );
      })
      .catch((err) => {
        console.error('StripeProvider error:', err);
        setErr(
          err?.error?.data?.errors?.map((c: any) => c.message).join(', ') ||
            'Failed to create payment intent'
        );
        setClientSecret('');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    totalCost,
    JSON.stringify(billingAddress),
    JSON.stringify(shippingAddress),
    areAddressesComplete,
    dispatch,
    productsInfo,
  ]);

  // Wait until clientSecret is ready
  if (loading) return <LoadingSpinner />;

  if (!clientSecret) {
    return (
      <div className="text-left text-xl text-primary font-semibold">
        <h2>{err || 'Please enter your address to select payment methods'}</h2>
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
    <StripeContext.Provider value={{ clientSecret, paymentIntentId, stripe }}>
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
