import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentMethodMessagingElement,
} from '@stripe/react-stripe-js';
import Link from 'next/link';
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const PaymentMessaging: React.FC<{ amount: string }> = ({ amount }) => {
  const formatted = amount.replace(/,/g, ''); // "5728.99"
  const amountInCents = Math.round(parseFloat(formatted) * 100); // 572899
  return (
    <>
      {/* If you plan to use Stripe Elements for other things */}
      <Elements stripe={stripePromise}>
        <PaymentMethodMessagingElement
          options={{
            amount: amountInCents > 0 ? amountInCents : 0,
            currency: 'USD',
            countryCode: 'US',
            paymentMethodTypes: ['klarna', 'affirm', 'afterpay_clearpay'],
          }}
        />
      </Elements>
      <div className="flex flex-col gap-2 items-start relative">
        <p className="text-[14px] text-[#61636B] font-normal">
          $32.86 / mo suggested payment with 6-month promotional financing on
          your Credit Card{' '}
          <Link href={'/financing'}>
            <span className="text-[#210203] text-sm font-semibold">
              Learn how
            </span>{' '}
          </Link>
        </p>
      </div>
    </>
  );
};

export default PaymentMessaging;
