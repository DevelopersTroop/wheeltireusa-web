'use client';

import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router for navigation
import { useEffect, useRef, useState } from 'react'; // React hooks for managing state and side effects
import { mapPendingOrderToCheckout } from './helper/map-pending-order-to-checkout';
import { useCheckout } from '@/context/checkoutContext';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/shared/loading/spinner';
import { LocationAccess } from '@/components/shared/locationAccess';
import Stepper from './_components/stepper';
import { Renderer } from './_components/stepRenderer';
import StripeProvider from './stripe';

// Main component for the checkout page
const ClientComponent: React.FC = () => {
  const router = useRouter(); // Router instance for navigation
  const { step, setStep } = useCheckout(); // Access the current step and a function to update it from the checkout context
  const products = useTypedSelector((state) => state.persisted.cart.products); // Access the products in the cart from the Redux store
  const [isLoading, setIsLoading] = useState(true); // State to track whether the page is loading
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const requestSent = useRef(false);

  // Define the steps for the checkout process
  const steps = [
    {
      title: 'Installation',
      subTitle: 'Enter your ZIP code to view your installation options.',
    },
    // {
    //     title: "Shipping Info",
    //     subTitle: "Enter shipping info and a few additional details.",
    // },
    // {
    //     title: "Order Summary",
    //     subTitle: "Select preferred payment method.",
    // },
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
    if (step === 2 && searchParams.get('order_id')?.length) {
      if (requestSent.current) return;
      mapPendingOrderToCheckout(
        dispatch,
        searchParams.get('order_id') as string,
        router,
        searchParams.get('coupon') as string | undefined | null
      ).finally(() => {
        requestSent.current = true;
      });
    } else if (Object.keys(products).length === 0 && step !== 3) {
      toast.error('Empty cart', {
        description:
          'Your cart is empty. Please add items before proceeding to checkout.',
      });
      // Show a toast notification
      router.push('/cart'); // Redirect the user to the cart page
      return;
    }
    setIsLoading(false); // Set loading to false once the cart is validated
  }, [products, router, step, requestSent]); // Dependencies for the effect

  // Render a loading spinner if the page is still loading
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Render the checkout page
  return (
    <>
      <LocationAccess />
      <div className="w-full my-10">
        <div className="container mx-auto px-6 w-full">
          {/* Stepper component to display the current step and allow navigation between steps */}
          <Stepper currentStep={step} steps={steps} setStep={setStep} />
          {/* Renderer component to render the content for the current step */}
          <StripeProvider>
            <Renderer setStep={setStep} step={step} />
          </StripeProvider>
        </div>
      </div>
    </>
  );
};

export default ClientComponent;
