'use client';

import LoadingSpinner from '@/components/shared/loading/spinner';
import { LocationAccess } from '@/components/shared/locationAccess';
import { useCheckout } from '@/context/checkoutContext'; // Custom context for managing checkout state
import { LoadScript } from '@react-google-maps/api';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router for navigation
import { useEffect, useRef, useState } from 'react'; // React hooks for managing state and side effects
import { Stepper } from './_components/stepper'; // Stepper component to display the checkout steps
import { Renderer } from './_components/stepRenderer'; // Renderer component to render the current step's content

// Main component for the checkout page
export const CheckoutClientComponent: React.FC = () => {
  const router = useRouter(); // Router instance for navigation
  const { step, setStep } = useCheckout(); // Access the current step and a function to update it from the checkout context
  // const products = useTypedSelector((state) => state.persisted.cart.products); // Access the products in the cart from the Redux store
  const [isLoading, setIsLoading] = useState(true); // State to track whether the page is loading
  const searchParams = useSearchParams();
  const requestSent = useRef(false);

  // Define the steps for the checkout process
  const steps = [
    {
      title: 'Installation',
      subTitle: 'Enter your ZIP code to view your installation options.',
    },
    {
      title: 'Shipping Info',
      subTitle: 'Enter shipping info and a few additional details.',
    },
    {
      title: 'Order Summary',
      subTitle: 'Select preferred payment method.',
    },
    {
      title: 'Secure payment options',
      subTitle: 'Check order details to ensure everything is correct.',
    },
    {
      title: 'Order Confirmation',
      subTitle: 'All information you need about your order.',
    },
  ];

  // Effect to handle empty cart scenarios and loading state
  useEffect(() => {
    if (step === 4 && searchParams.get('order_id')?.length) {
      if (requestSent.current) return;
      // mapPendingOrderToCheckout(dispatch, searchParams.get('order_id') as string, router, searchParams.get('coupon') as string | undefined | null).finally(() => {
      //     requestSent.current = true
      // })
    }
    // else if (Object.keys({}).length === 0 && step !== 5) {
    //     toast("Empty cart", {
    //         description:
    //             "Your cart is empty. Please add items before proceeding to checkout.",
    //     });
    //     // Show a toast notification
    //     router.push("/cart"); // Redirect the user to the cart page
    //     return;
    // }
    setIsLoading(false); // Set loading to false once the cart is validated
  }, [router, step, requestSent]); // Dependencies for the effect

  // Render a loading spinner if the page is still loading
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Render the checkout page
  return (
    <LoadScript
      loadingElement={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      libraries={['places']}
    >
      <LocationAccess />
      <div className="w-full my-10">
        <div className="container mx-auto px-6 w-full">
          {/* Stepper component to display the current step and allow navigation between steps */}
          <Stepper currentStep={step} steps={steps} setStep={setStep} />
          {/* Renderer component to render the content for the current step */}
          <div className="lg:max-w-[90%] mx-auto">
            <Renderer setStep={setStep} step={step} />
          </div>
        </div>
      </div>
    </LoadScript>
  );
};
