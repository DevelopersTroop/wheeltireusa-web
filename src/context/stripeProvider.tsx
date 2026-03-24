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
  useMemo,
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
// Constants
// --------------------
const REQUIRED_ADDRESS_FIELDS: (keyof TBillingAddress)[] = [
  "address1",
  "zipCode",
  "country",
  "cityState",
  "phone",
  "email",
  "fname",
  "lname",
];

const DEBOUNCE_MS = 600;

// --------------------
// Helpers
// --------------------
function hasAllRequiredFields(address: TBillingAddress | null): boolean {
  if (!address) return false;
  return REQUIRED_ADDRESS_FIELDS.every((field) => {
    const value = address[field];
    return value !== undefined && value !== null && value !== "";
  });
}

// --------------------
// Provider Component
// --------------------
export default function StripeProvider({ children }: React.PropsWithChildren) {
  const { totalCost } = useCheckout();
  const { billingAddress, shippingAddress, paymentIntentId } = useTypedSelector(
    (state) => state.persisted.checkout
  );

  const stripe = use(stripePromise);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const lastFetchedHash = useRef<string>("");
  const dispatch = useAppDispatch();
  const [err, setErr] = useState("");

  // Stable serialized strings — only recompute when the underlying object changes
  const billingHash = useMemo(
    () => JSON.stringify(billingAddress),
    [billingAddress]
  );
  const shippingHash = useMemo(
    () => JSON.stringify(shippingAddress),
    [shippingAddress]
  );

  // Derived flags (memoized so they don't re-trigger effects unnecessarily)
  const areAddressesComplete = useMemo(
    () =>
      hasAllRequiredFields(billingAddress) ||
      hasAllRequiredFields(shippingAddress),
    [billingAddress, shippingAddress]
  );

  useEffect(() => {
    // ── Guard: nothing to charge ──
    if (!totalCost) return;

    // ── Guard: addresses not ready yet ──
    if (!areAddressesComplete) {
      setClientSecret("");
      setErr("");
      return;
    }

    // ── Build a comparable hash of the inputs ──
    const currentHash = `${billingHash}|${shippingHash}|${totalCost}`;

    // ── Guard: nothing changed since last successful fetch ──
    if (lastFetchedHash.current === currentHash) {
      return;
    }

    // ── Debounce: wait for the user to stop typing ──
    const abortController = new AbortController();

    const timerId = setTimeout(() => {
      // Re-check hash inside the timeout callback in case it was already
      // fetched while we were waiting (e.g. another effect instance ran).
      if (lastFetchedHash.current === currentHash) return;

      setLoading(true);
      setErr("");

      const amount = Math.round(parseFloat(totalCost) * 100);

      apiInstance
        .post<{
          data: {
            secret: string;
            id: string;
            taxAmount: number;
            totalWithTax: number;
          };
        }>(
          "/payments/stripe/intent",
          {
            amount,
            currency: "USD",
            billingAddress,
            shippingAddress,
          },
          { signal: abortController.signal }
        )
        .then((res) => {
          // Only apply the result if this request wasn't aborted
          if (abortController.signal.aborted) return;

          lastFetchedHash.current = currentHash;
          setClientSecret(res.data.data.secret);
          dispatch(setPaymentIntentId(res.data.data.id));
          dispatch(
            setTaxAmount({
              taxAmount: res.data.data.taxAmount / 100,
              totalWithTax: res.data.data.totalWithTax / 100,
            })
          );
        })
        .catch((error) => {
          // Ignore aborted requests — they're expected during rapid changes
          if (abortController.signal.aborted) return;

          console.error("StripeProvider error:", error);
          setErr(
            error?.error?.data?.errors
              ?.map((c: any) => c.message)
              .join(", ") || "Failed to create payment intent"
          );
          setClientSecret("");
        })
        .finally(() => {
          if (!abortController.signal.aborted) {
            setLoading(false);
          }
        });
    }, DEBOUNCE_MS);

    // ── Cleanup: cancel pending debounce timer & abort in-flight request ──
    return () => {
      clearTimeout(timerId);
      abortController.abort();
    };
  }, [totalCost, billingHash, shippingHash, areAddressesComplete, dispatch]);

  // Wait until clientSecret is ready
  if (loading) return <LoadingSpinner />;

  if (!clientSecret) {
    return (
      <div className="text-left text-xl text-primary font-semibold">
        <h2>{err || "Please enter your address to select payment methods"}</h2>
      </div>
    );
  }

  // Stripe Element appearance and options
  const options: StripeElementsOptions = {
    clientSecret,
    loader: "always",
    appearance: {
      theme: "flat",
      variables: {
        colorPrimary: "#000",
        accordionItemSpacing: "16px",
        borderRadius: "12px",
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
    throw new Error("useStripeContext must be used within StripeProvider");
  return context;
};
