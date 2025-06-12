'use client'; // Indicates that this component is using client-side React
import { useTypedSelector } from '@/redux/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { TDealer } from '../types/order';
import { TCategory } from '../types/category';
import { getPrice } from '../utils/price';

type ValidatedAddress = {
  country: string;
  state: string;
  city: string;
  zipCode: string;
};

// Defining types for the Checkout context
interface CheckoutContextType {
  relocateMap: () => void;
  step: any;
  setStep: (step: number) => void;
  nearestDealer: TDealer;
  setNearestDealer: (dealer: any) => void;
  otherDealers: TDealer[];
  setOtherDealers: (dealers: TDealer[]) => void;
  isDialogOpen: any;
  setIsDialogOpen: (isOpen: any) => void;
  cartType: any;
  subTotalCost: any;
  discount: any;
  salesTax: any;
  netCost: any;
  validatedZipCode: any;
  setValidatedZipCode: React.Dispatch<React.SetStateAction<any>>;
  isValidZipCode: any;
  setIsValidZipCode: React.Dispatch<React.SetStateAction<any>>;
  zipCodeAddress: ValidatedAddress | undefined;
  setZipCodeAddress: React.Dispatch<
    React.SetStateAction<ValidatedAddress | undefined>
  >;
  relocate: any;
}

// Key for saving state to local storage
const STORAGE_KEY = 'checkout_state';

// Function to load state from local storage
const loadState = () => {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};

// Creating the Checkout context
const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

// Provider component for the Checkout context
export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Redux Checkout Store
  const { discount, productsInfo } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Load initial state from local storage
  const initialState = loadState();

  // Get the current step from URL query params, default to 1
  const urlStep = searchParams.get('step');
  const [relocate, setRelocate] = useState<any>(
    initialState?.relocate || false
  );
  const [step, setStep] = useState<any>(
    urlStep ? parseInt(urlStep) : initialState?.step || 1
  );
  const [validatedZipCode, setValidatedZipCode] = useState<
    ValidatedAddress | undefined
  >(initialState?.validatedZipCode || undefined);

  const [zipCodeAddress, setZipCodeAddress] = useState<any>(
    initialState?.zipCodeAddress || ''
  );
  const [isValidZipCode, setIsValidZipCode] = useState<any>(
    initialState?.isValidZipCode || false
  );
  const [nearestDealer, setNearestDealer] = useState<any>(
    initialState?.nearestDealer || null
  );
  const [otherDealers, setOtherDealers] = useState<any[]>(
    initialState?.otherDealers || []
  );
  const [isDialogOpen, setIsDialogOpen] = useState<any>(
    initialState?.isDialogOpen || false
  );

  // Function to save state to local storage
  const saveState = (updates: any) => {
    if (typeof window === 'undefined') return;
    const currentState = loadState() || {};
    const newState = { ...currentState, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  };

  // Function to set the current checkout step
  const handleSetStep = useCallback(
    (newStep: string | number | null | undefined) => {
      if (newStep == null) {
        console.warn('Attempted to set an invalid step:', newStep);
        return;
      }

      if (newStep === step) return;

      setStep(newStep);
      saveState({ step: newStep });

      if (pathname === '/checkout') {
        router.replace(`/checkout?step=${newStep}`, { scroll: false });
      }
    },
    [step, pathname, router, saveState]
  );

  // Function to set the nearest dealer and save the state
  const handleSetNearestDealer = (dealer: any) => {
    setNearestDealer(dealer);
    saveState({ nearestDealer: dealer });
  };

  // Function to set the list of other dealers and save the state
  const handleSetOtherDealers = (dealers: any[]) => {
    setOtherDealers(dealers);
    saveState({ otherDealers: dealers });
  };

  // Function to set the dialog state and save the state
  const handleSetIsDialogOpen = (isOpen: any) => {
    setIsDialogOpen(isOpen);
    saveState({ isDialogOpen: isOpen });
  };

  // Function to set validated zip code and save the state
  const handleSetValidatedZipCode = (zipCode: any) => {
    setValidatedZipCode(zipCode);
    saveState({ validatedZipCode: zipCode });
  };

  // Function to set the validity of zip code and save the state
  const handleSetIsValidZipCode = (isValid: any) => {
    setIsValidZipCode(isValid);
    saveState({ isValidZipCode: isValid });
  };

  // Function to set zip code address and save the state
  const handleSetZipCodeAddress = (address: any) => {
    setZipCodeAddress(address);
    saveState({ zipCodeAddress: address });
  };
  const cartType = () => 'TIRES'; // Assuming cartType is always 'TIRES' for this context
  /**
   * Getting Products Cost From Redux Store
   */

  // Calculate the subtotal of the cart
  const subTotalCost = useMemo(() => {
    if (!productsInfo) return 0;
    return productsInfo?.reduce(
      (acc, product) => acc + getPrice(product) * product.quantity,
      0
    );
  }, [productsInfo]);

  // Define the delivery charge, sales tax, and total cost based on the cart type
  const deliveryCharge = cartType() === 'CENTER_CAP_ONLY' ? 14.99 : 0;
  const salesTax = 0;
  const totalCost = subTotalCost - discount + salesTax + deliveryCharge;

  // Effect to sync the checkout step with the URL query parameter
  useEffect(() => {
    if (pathname === '/checkout') {
      const stepParam = searchParams.get('step');
      if (stepParam) {
        const parsedStep = parseInt(stepParam);
        if (parsedStep !== step) {
          setStep(parsedStep);
          saveState({ step: parsedStep });
        }
      } else if (!urlStep && step !== 1) {
        handleSetStep(1);
      }
    }
  }, [pathname, urlStep]);

  // Function to toggle the map relocation state
  const handleRelocateMap = () => {
    const newRelocate = !relocate;
    setRelocate(newRelocate);
    saveState({ relocate: newRelocate });
  };

  // Checkout context value to be passed to children components
  const contextValue = {
    relocate,
    relocateMap: handleRelocateMap,
    step,
    setStep: handleSetStep,
    nearestDealer,
    setNearestDealer: handleSetNearestDealer,
    otherDealers,
    setOtherDealers: handleSetOtherDealers,
    isDialogOpen,
    setIsDialogOpen: handleSetIsDialogOpen,
    cartType,
    subTotalCost,
    discount,
    salesTax,
    netCost: totalCost,
    validatedZipCode,
    setValidatedZipCode: handleSetValidatedZipCode,
    isValidZipCode,
    setIsValidZipCode: handleSetIsValidZipCode,
    zipCodeAddress,
    setZipCodeAddress: handleSetZipCodeAddress,
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook to access Checkout context
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }

  // Function to clear the checkout state from both context and local storage
  const clearCheckoutState = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    context.setNearestDealer(null);
    context.setOtherDealers([]);
    context.setIsDialogOpen(false);
    context.setValidatedZipCode('');
    context.setIsValidZipCode(false);
    context.setZipCodeAddress(undefined);
  };

  return {
    ...context,
    clearCheckoutState,
  };
};
