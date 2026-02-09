'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Renderer } from './_components/StepRenderer';
import { useCheckout } from '@/context/checkoutContext';
import { useTypedSelector } from '@/redux/store';
import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner';
import Container from '@/components/ui/container/container';
import { GoogleLibraryLoader } from './_components/CheckoutStep/GoogleLibraryLoader';

const Page: React.FC = () => {
  const router = useRouter();
  const { step, setStep } = useCheckout();
  const products = useTypedSelector((state) => state.persisted.cart.products);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(products).length === 0 && step !== 2) {
      toast.error(
        'Your cart is empty. Please add items before proceeding to checkout.'
      );
      router.push('/');
      return;
    }
    setIsLoading(false);
  }, [products, router, step]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="my-10 w-full">
      <Container className='mx-auto'>
        <GoogleLibraryLoader>
          <Renderer setStep={setStep} step={step} />
        </GoogleLibraryLoader>
      </Container>
    </div>
  );
};

export default Page;
