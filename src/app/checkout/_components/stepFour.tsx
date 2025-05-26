'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon, Loader, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Input } from './stepTwo';
import { ICheckoutStepProps } from './stepOne';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { useSearchParams, useRouter } from 'next/navigation';
import { AlertCircle, X } from 'lucide-react';
import { RootState, useTypedSelector } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { TBillingAddress } from '@/types/order';
import {
  setBillingAddress,
  setOrderInfo,
} from '@/redux/features/checkoutSlice';
import { GooglePlacesInput } from '@/components/shared/googlePlaceInput';
import { toast } from 'sonner';
import { useCheckout } from '@/context/checkoutContext';
import { apiInstance } from '@/redux/apis/base';

// StepFour Component
export const StepFour: React.FC<ICheckoutStepProps> = () => {
  // Component state
  const [activeAccordion, setActiveAccordion] = useState('card'); // State to track the active payment method
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(false);
  const [showTermsAlert, setShowTermsAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  const billingAddressUpdate = useSelector(
    (state: RootState) => state.persisted.checkout.billingAddress
  );
  const [triggerPayment, setTriggerPayment] = useState(false);

  const { initiateCheckout } = useStripeCheckout();
  // const { initiatePaypalCheckout } = usePaypalCheckout();

  /**
   * Redux Store And Dispatch Hook
   */
  const { billingAddress, shippingAddress, orderInfo, selectedOptionTitle } =
    useTypedSelector((state) => state.persisted.checkout);
  const dispatch = useDispatch();
  /**
   * Checkout Context
   */
  const { totalCost, subTotalCost, discount, cartType } = useCheckout();

  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPaymentError, setShowPaymentError] = useState(false);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle payment error alert
  useEffect(() => {
    const orderStatus = searchParams.get('order_status');
    if (orderStatus === 'false') {
      setShowPaymentError(true);
      autoCloseTimerRef.current = setTimeout(() => {
        handleCloseAlert();
      }, 5000);
    }

    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [searchParams]);

  const handleCloseAlert = () => {
    setShowPaymentError(false);
    router.replace(`/checkout?step=4`);
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
  };

  // Toggle active payment method
  const toggleAccordion = (accordion: string) => {
    setActiveAccordion(accordion);
  };

  const defaultValues = useMemo(() => {
    return {
      ...billingAddress,
      country: 'US',
    };
  }, [JSON.stringify(billingAddress)]);

  // React Hook Form setup
  const {
    register,
    getValues,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
  } = useForm<TBillingAddress>({
    defaultValues: defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    values: defaultValues,
  });

  // Handle place order logic
  const handlePlaceOrder = async () => {
    if (isLoading) return;

    if (subTotalCost < 50) {
      return toast('Error', {
        description: 'Minimum order amount is $50',
      });
    }

    try {
      // Trigger validation to ensure all fields update
      const isValid = await trigger();

      if (!isValid) {
        return toast('Error', {
          description: 'Please fill in all required fields',
        });
      }

      // Ensure form values are up-to-date
      await new Promise((resolve) => setTimeout(resolve, 0));

      const formValues = getValues(); // Get the latest values

      // Format user full name
      const formattedFName = formValues.fname?.trim() || '';
      const formattedLName = formValues.lname?.trim() || '';
      const fullName = [formattedFName, formattedLName]
        .filter(Boolean)
        .join(' ');

      const finalData = {
        ...formValues,
        fname: formattedFName,
        lname: formattedLName,
        name: fullName,
      };

      if (!orderInfo.termsAndConditions) {
        setShowTermsAlert(true);
        termsRef.current?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      setIsLoading(true);

      // Dispatch billing address update
      dispatch(setBillingAddress(finalData));

      // Trigger payment process after Redux update
      setTriggerPayment(true);
    } catch (error) {
      console.error('Error in handlePlaceOrder:', error);
      toast('Error', {
        description: 'Something went wrong. Please try again.',
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderInfo.termsAndConditions) {
      setShowTermsAlert(false);
    }
  }, [orderInfo.termsAndConditions]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Extracted Payment Processing Logic
  const processPayment = async () => {
    switch (activeAccordion) {
      case 'card':
      case 'affirm':
      case 'cashapp':
      case 'klarna':
        await initiateCheckout(activeAccordion);
        break;
      case 'paypal':
        // await initiatePaypalCheckout();
        break;
      default:
        console.warn('No valid payment method selected.');
    }
  };

  // **Detect Redux Update & Trigger Payment**
  useEffect(() => {
    if (triggerPayment && billingAddressUpdate?.name) {
      processPayment()
        .catch((error) => {
          console.error('Payment processing error:', error);
          toast('Error', {
            description: 'Payment processing failed. Please try again.',
          });
        })
        .finally(async () => {
          await apiInstance.post('/subscriptions', {
            email: billingAddress.email,
          });
          setIsLoading(false);
          setTriggerPayment(false); // Reset trigger
        });
    }
  }, [billingAddressUpdate, triggerPayment]);

  /**
   * Place order button should be disabled
   */
  const formValues = watch(); // Move outside to ensure reactivity

  const shouldDisableButton = useMemo(() => {
    if (isLoading) return true;

    const paymentMethodsRequiringValidation = new Set([
      'card',
      'affirm',
      'cashapp',
      'klarna',
      'paypal',
    ]);

    if (paymentMethodsRequiringValidation.has(activeAccordion)) {
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

      const hasAllRequiredFields = requiredFields.every(
        (field) => formValues[field]?.trim()?.length
      );

      return !hasAllRequiredFields || !orderInfo.termsAndConditions;
    }

    return !activeAccordion;
  }, [isLoading, activeAccordion, formValues, orderInfo.termsAndConditions]);

  // Watch for form changes and validate
  useEffect(() => {
    const subscription = watch(() => {
      trigger();
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  // Sync shipping and billing addresses
  useEffect(() => {
    if (shippingSameAsBilling) {
      Object.keys(shippingAddress).forEach((key) => {
        setValue(
          key as keyof TBillingAddress,
          shippingAddress[key as keyof typeof billingAddress]
        );
      });
      setValue('country', 'US');
    }
  }, [shippingSameAsBilling, shippingAddress, billingAddress, setValue]);

  return (
    <div>
      {/* Payment Error Alert */}
      {showPaymentError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span>
              Payment failed. Please try again or choose a different payment
              method.
            </span>
          </div>
          <button
            onClick={handleCloseAlert}
            className="text-red-700 hover:text-red-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      {/* Payment Options and Billing Info */}
      <div className="grid grid-cols-11 gap-8">
        {/* Left Section: Payment Options */}
        <div className="w-full col-span-11 lg:col-span-7 flex flex-col gap-y-8">
          <h3 className="text-2xl font-bold">Select Payment Option</h3>
          {/* Payment Methods */}
          <div>
            <div className="flex flex-col space-y-4">
              <div
                onClick={() => toggleAccordion('card')}
                className="relative border rounded-lg p-2.5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center cursor-pointer min-w-0">
                    {/* Radio button with absolute positioning */}
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                      <span
                        className={`inline-block w-5 h-5 rounded-full border ${
                          activeAccordion === 'card'
                            ? 'border-4 border-black'
                            : 'border-gray-600'
                        }`}
                      />
                    </div>
                    {/* Content with consistent left padding */}
                    <div className="flex items-center pl-10">
                      <img
                        src="https://js.stripe.com/v3/fingerprinted/img/card-ce24697297bd3c6a00fdd2fb6f760f0d.svg"
                        className="w-4 h-4 mr-2"
                        alt="Credit Card"
                      />
                      <span className="font-semibold text-gray-900 text-xl truncate">
                        Card
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleAccordion('affirm')}
                className="relative border rounded-lg p-2.5 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                    <span
                      className={`inline-block w-5 h-5 rounded-full border ${
                        activeAccordion === 'affirm'
                          ? 'border-4 border-black'
                          : 'border-gray-600'
                      }`}
                    />
                  </div>
                  <div className="flex items-center pl-10">
                    <img
                      src="https://js.stripe.com/v3/fingerprinted/img/affirm-bce57680b3d99bf1f1390bda5d024909.svg"
                      className="w-4 h-4 mr-2"
                      alt="Affirm"
                    />
                    <span className="font-semibold text-gray-900 text-xl truncate">
                      Affirm
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleAccordion('cashapp')}
                className="relative border rounded-lg p-2.5 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                    <span
                      className={`inline-block w-5 h-5 rounded-full border ${
                        activeAccordion === 'cashapp'
                          ? 'border-4 border-black'
                          : 'border-gray-600'
                      }`}
                    />
                  </div>
                  <div className="flex items-center pl-10">
                    <img
                      src="https://js.stripe.com/v3/fingerprinted/img/payment-methods/icon-pm-cashapp-981164a833e417d28a8ac2684fda2324.svg"
                      className="w-4 h-4 mr-2"
                      alt="Cash App"
                    />
                    <span className="font-semibold text-gray-900 text-xl truncate">
                      Cash App Pay
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleAccordion('klarna')}
                className="relative border rounded-lg p-2.5 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                    <span
                      className={`inline-block w-5 h-5 rounded-full border ${
                        activeAccordion === 'klarna'
                          ? 'border-4 border-black'
                          : 'border-gray-600'
                      }`}
                    />
                  </div>
                  <div className="flex items-center pl-10">
                    <img
                      src="https://js.stripe.com/v3/fingerprinted/img/klarna-531cd07130cfad7de4c678ef467cbeb7.svg"
                      className="w-4 h-4 mr-2"
                      alt="Klarna"
                    />
                    <span className="font-semibold text-gray-900 text-xl truncate">
                      Klarna
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleAccordion('paypal')}
                className="relative border rounded-lg p-2.5 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                    <span
                      className={`inline-block w-5 h-5 rounded-full border ${
                        activeAccordion === 'paypal'
                          ? 'border-4 border-black'
                          : 'border-gray-600'
                      }`}
                    />
                  </div>
                  <div className="flex items-center pl-10">
                    <Image
                      src="/paypal.png"
                      width={100}
                      height={50}
                      alt="PayPal"
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2">
              {activeAccordion === 'card' && (
                <div className="flex items-center gap-1 text-primary">
                  <InfoIcon />
                  <p>
                    Note: If you pay with credit card, we will ship these
                    products to provided Billing Address
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-y-8 pt-8">
              <h2 className="text-xl font-bold">Billing Info</h2>
              {selectedOptionTitle === 'Direct To Customer' && (
                <div
                  className="flex items-center gap-1 cursor-pointer py-2"
                  onClick={() => setShippingSameAsBilling((prev) => !prev)}
                >
                  <Checkbox
                    checked={shippingSameAsBilling}
                    className="data-[state=checked]:bg-black border-black w-5 h-5"
                  />
                  <span className="text-lg">Same as shipping address</span>
                </div>
              )}
              <div className="space-y-8 max-w-xl">
                <div className="flex flex-col gap-y-8">
                  <div className="flex gap-4">
                    <Input
                      label="First Name"
                      required
                      error={errors.fname?.message}
                      {...register('fname', {
                        required: 'First name is required',
                      })}
                    />
                    <Input
                      label="Last Name"
                      required
                      error={errors.lname?.message}
                      {...register('lname', {
                        required: 'Last name is required',
                      })}
                    />
                  </div>
                  <Input label="Company/Care of" {...register('company')} />
                  <div className="flex flex-col gap-3">
                    <GooglePlacesInput
                      label={'Address Line 1'}
                      error={errors.address1?.message}
                      value={watch('address1')}
                      onSelect={(address) => {
                        address.addressLines.map((line, index) => {
                          setValue(`address${index + 1}` as any, line);
                        });
                        setValue('cityState', `${address.state}`);
                        setValue('city', address.city);
                        setValue('zipCode', address.zipcode);
                        setValue('country', 'US');
                      }}
                      {...register('address1', {
                        required: 'Address is required',
                      })}
                    />
                    <div className="text-sm text-muted-foreground">
                      Note: Cannot be a P.O. box, except at APO/FPO addresses.
                    </div>
                  </div>
                  <Input
                    disabled
                    label="Address Line 2"
                    {...register('address2')}
                  />
                  <Input
                    label="ZIP/Postal Code"
                    required
                    disabled
                    error={errors.zipCode?.message}
                    {...register('zipCode', {
                      required: 'ZIP/Postal Code is required',
                    })}
                  />
                  <Input
                    label="Country"
                    required
                    disabled
                    error={errors.country?.message}
                    {...register('country', {
                      required: 'Country is required',
                    })}
                    placeholder="Enter country name or wait for auto-detection"
                  />
                  <Input
                    disabled
                    label="City"
                    required
                    error={errors.city?.message}
                    {...register('city', {
                      required: 'City is required',
                    })}
                  />
                  <Input
                    disabled
                    label="State"
                    required
                    error={errors.cityState?.message}
                    {...register('cityState', {
                      required: 'State is required',
                    })}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    required
                    error={errors.phone?.message}
                    {...register('phone', {
                      required: 'Phone number is required',
                    })}
                  />
                  <Input
                    label="Email Address"
                    required
                    type="email"
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full col-span-11 lg:col-span-4 space-y-6">
          <div className="space-y-6">
            <div className="rounded-xs bg-[#F7F7F7] py-7">
              <div className="space-y-6 text-[#210203]">
                <div className="space-y-2 px-6">
                  <h3 className="text-base font-semibold text-black uppercase tracking-wider">
                    Delivery Option
                  </h3>
                  <div className="text-sm text-[#210203]">
                    {selectedOptionTitle}
                  </div>
                </div>
                <div className="space-y-2 text-[#210203]">
                  <div className="flex justify-between items-baseline py-2 px-6">
                    <p className="text-base leading-[19px] text-[#210203]">
                      Item(s) Total
                    </p>
                    <div className="flex gap-0 items-baseline relative">
                      <p className="text-xl leading-[29px] text-[#210203]">
                        <span className="text-xl font-bold">
                          ${Math.floor(subTotalCost)}.
                        </span>
                        <span className="text-sm font-bold">
                          {subTotalCost.toFixed(2).split('.')[1]}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline self-stretch relative w-full px-6">
                    <div className="flex gap-2 items-center relative">
                      <p className="text-base leading-[19px] text-[#210203]">
                        Shipping
                      </p>
                      <div className="flex gap-0 items-center relative">
                        <p className="text-base leading-[19px] text-[#210203]">
                          (33625):
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0 items-baseline relative">
                      <h4 className="text-xl leading-[29px] text-[#210203] font-bold">
                        {cartType === 'CENTER_CAP_ONLY' ? '$14.99' : 'Free'}
                      </h4>
                    </div>
                  </div>
                  {discount ? (
                    <div className="flex justify-between px-md">
                      <span className="">Discount:</span>
                      <span className="font-bold text-2xl">-${discount}</span>
                    </div>
                  ) : null}

                  <div className="border-x-0 border-t-0 border-b border-[#cfcfcf] pb-4 flex justify-between items-baseline self-stretch relative w-full px-6 pt-2">
                    <h5 className="text-xl leading-6 text-[#210203]">Total:</h5>
                    <div className="flex gap-0 items-baseline relative">
                      <p className="text-xl leading-[38px] text-[#210203]">
                        <span className="font-bold">
                          ${totalCost?.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-4 px-6" ref={termsRef}>
                <div
                  onClick={() =>
                    dispatch(
                      setOrderInfo({
                        ...orderInfo,
                        termsAndConditions: !orderInfo.termsAndConditions,
                      })
                    )
                  }
                  className="flex items-start gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={orderInfo.termsAndConditions}
                    className="rounded-md data-[state=checked]:border-none bg-white h-5 w-5 border border-[#AAAAAA]"
                  />
                  <p className="text-base">
                    I acknowledge the{' '}
                    <Link
                      href="/terms-conditions"
                      target="_blank"
                      className="font-semibold"
                    >
                      Terms and Conditions
                    </Link>{' '}
                    and the{' '}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      className="font-semibold"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
                {showTermsAlert && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>
                      To place your order, please accept our policies.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="px-6">
                <Button
                  disabled={shouldDisableButton}
                  className="font-semibold rounded-xs antialiased w-full h-14 mt-2 flex items-center justify-center gap-2"
                  onClick={handlePlaceOrder}
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      <span className="text-base">Place Order</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          {/* <WhatWeAccept /> */}
        </div>
      </div>
    </div>
  );
};
