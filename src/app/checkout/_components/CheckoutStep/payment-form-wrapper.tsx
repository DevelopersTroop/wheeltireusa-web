import { useStripeContext } from '@/context/stripeProvider';
import { PaymentElement, useElements } from '@stripe/react-stripe-js';
import {
  Stripe,
  StripeElements,
  StripePaymentElement,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js';
import { useEffect } from 'react';

// Create this new component
export function PaymentFormWrapper({
  onPaymentElementChange,
  setActiveAccordion,
  setIsCard,
  paymentElementRef,
  elementsRef, // NEW: Pass a ref to store elements
  setStripe,
}: {
  onPaymentElementChange: (event: StripePaymentElementChangeEvent) => void;
  setActiveAccordion: (value: string) => void;
  setIsCard: (value: boolean) => void;
  paymentElementRef: React.MutableRefObject<StripePaymentElement | null>;
  elementsRef: React.MutableRefObject<StripeElements | null>;
  setStripe: React.Dispatch<React.SetStateAction<Stripe | null>>; // NEW
}) {
  const elements = useElements(); // Get elements the proper way
  const { stripe } = useStripeContext();

  useEffect(() => {
    // Store elements in the ref so parent can access it
    elementsRef.current = elements;
  }, [elements, elementsRef]);
  useEffect(() => {
    setStripe(stripe);
  }, [stripe]);

  return (
    <PaymentElement
      onFocus={(event) => {
        console.log('TCL: event', event.elementType);
        setActiveAccordion('');
      }}
      onBlur={() => {
        setIsCard(false);
      }}
      options={{
        layout: {
          type: 'accordion',
          spacedAccordionItems: true,
          radios: true,
          defaultCollapsed: false
        },
      }}
      onChange={onPaymentElementChange}
      onReady={(e) => {
        paymentElementRef.current = e;
      }}
    />
  );
}
