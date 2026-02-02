// "use client";
// import { useCheckout } from "@/app/context/CheckoutContext";
// import { apiBaseUrl } from "@/app/utils/api";
// import {
//   CardCvcElement,
//   CardElement,
//   CardExpiryElement,
//   CardNumberElement,
//   Elements,
//   useElements,
//   useStripe
// } from "@stripe/react-stripe-js";
// import { loadStripe, StripeCardElementChangeEvent } from "@stripe/stripe-js";
// import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
// import { useProcessStripePayment } from "./ProcessPayment/stripe";

// type StripElements = 'cardNumber' | 'cardExpiry' | 'cardCvc'
// interface StripePaymentProps {
//   setCardDetails: React.Dispatch<React.SetStateAction<{
//     cardNumber?: {
//       error?: string;
//       empty?: boolean;
//       complete?: boolean;
//     };
//     cardExpiry?: {
//       error?: string;
//       empty?: boolean;
//       complete?: boolean;
//     };
//     cardCvc?: {
//       error?: string;
//       empty?: boolean;
//       complete?: boolean;
//     };
//   }

//   >>;
//   setStep?: (step: number) => void;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>
// }

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// const CheckoutForm = forwardRef<{ submit: () => void }, StripePaymentProps>(
//   ({ setCardDetails, setStep, setLoading }, ref) => {
//     const { totalCost } = useCheckout();
//     const stripe = useStripe();
//     const elements = useElements();
//     const [clientSecret, setClientSecret] = useState<string>("");

//     const { processPayment, error, loading, success } = useProcessStripePayment(
//       stripe!,
//       elements!,
//       clientSecret
//     );

//     const handleCardChange = (event: { elementType: "cardNumber" | "cardExpiry" | "cardCvc"; error?: string; empty: boolean; complete: boolean }) => {
//       const eventData = {
//         [event.elementType]: {
//           error: event.error,
//           empty: event.empty,
//           complete: event.complete,
//         },
//       };
//       setCardDetails((prev) => ({ ...prev, ...eventData }));
//     };

//     useEffect(() => {
//       fetch(`${apiBaseUrl}/payments/stripe/create-payment-intent`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: Math.round(totalCost * 100), // Amount in cents
//           currency: "usd",
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => setClientSecret(data?.data?.secret));
//     }, []);

//     useImperativeHandle(ref, () => ({
//       submit: async () => {
//         await processPayment(setStep);
//       },
//     }));

//     useEffect(() => {
//       setLoading(loading)
//     }, [loading])

//     return (
//       <div className="mt-2">
//         <form
//           onSubmit={async(e) => {
//             e.preventDefault();
//            await processPayment(setStep);
//           }}
//           className="space-y-4"
//         >
//           <div className="space-y-2">
//             <label htmlFor="card-number" className="text-sm font-medium">
//               Card Number <span className="text-primary">*</span>
//             </label>
//             <CardNumberElement
//               id="card-number"
//               onChange={handleCardChange as any}
//               options={{
//                 style: {
//                   base: {
//                     "::placeholder": {
//                       color: '#B1AAAA'
//                     }
//                   }
//                 }
//               }}
//               className="border border-gray-300 rounded-md px-3 w-full py-5 focus:outline-none focus:border-blue-500 "
//             />
//           </div>
//           <div className="flex space-x-4">
//             <div className="flex-1">
//               <label htmlFor="card-expiry" className="text-sm font-medium">
//                 Expiration Date <span className="text-primary">*</span>
//               </label>
//               <CardExpiryElement
//                 id="card-expiry"
//                 options={{
//                   style: {
//                     base: {
//                       "::placeholder": {
//                         color: '#B1AAAA'
//                       },
//                     }
//                   }
//                 }}
//                 onChange={handleCardChange as any}
//                 className="border border-gray-300 rounded-md px-3 w-full py-5 focus:outline-none focus:border-blue-500 "
//               />
//             </div>
//             <div className="flex-1">
//               <label htmlFor="card-cvc" className="text-sm font-medium">
//                 CVC <span className="text-primary">*</span>
//               </label>
//               <CardCvcElement
//                 options={{
//                   style: {
//                     base: {
//                       "::placeholder": {
//                         color: '#B1AAAA'
//                       }
//                     }
//                   }
//                 }}
//                 id="card-cvc"
//                 onChange={handleCardChange as any}
//                 className="border border-gray-300 rounded-md px-3 w-full py-5 focus:outline-none focus:border-blue-500"
//               />
//             </div>
//           </div>
//         </form>
//       </div>
//     );
//   }
// );


// const StripePayment = forwardRef<HTMLFormElement, StripePaymentProps>(
//   ({ setCardDetails, setStep, setLoading }, ref) => {
//     return (
//       <Elements stripe={stripePromise}>
//         <CheckoutForm setLoading={setLoading} setStep={setStep} ref={ref} setCardDetails={setCardDetails} />
//       </Elements>
//     );
//   }
// );

// export default StripePayment;

import React from 'react'
import { PaymentButton } from '../../(checkout)/PaymentButton '

const StripePayment = () => <PaymentButton />

export default StripePayment

