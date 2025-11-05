'use client';
import { GooglePlacesInput } from '@/components/shared/googlePlaceInput';
import { Checkbox } from '@/components/ui/checkbox';
import {
  setBillingAddress,
  setShippingAddress,
} from '@/redux/features/checkoutSlice';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { TBillingAddress } from '@/types/order';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import React, { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ShippingAddress';
import { PhoneInput } from './PhoneInput';

interface ICompProps {
  selectedOptionTitle: string;
  setBillingSameAsShipping: React.Dispatch<React.SetStateAction<boolean>>;
  billingSameAsShipping: boolean;
  activeAccordion: string;
  setShouldDisableButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BillingAndShippingInput: React.FC<ICompProps> = ({
  selectedOptionTitle,
  setBillingSameAsShipping,
  billingSameAsShipping,
  activeAccordion,
  setShouldDisableButton,
}) => {
  const { orderInfo, billingAddress, shippingAddress } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  const dispatch = useAppDispatch();
  const prevShippingRef = useRef<TBillingAddress | null>(null);

  // Default values
  const billingDefaultValues = useMemo(
    () => ({ ...billingAddress, country: billingAddress?.country || 'US' }),
    [billingAddress]
  );
  const shippingDefaultValues = useMemo(
    () => ({ ...shippingAddress, country: shippingAddress?.country || 'US' }),
    [shippingAddress]
  );

  // Shipping Form
  const {
    register: shippingRegister,
    formState: { errors: shippingErrors },
    watch: shippingWatch,
    setValue: shippingSetValue,
    getValues: getValuesShipping,
  } = useForm<TBillingAddress>({
    defaultValues: shippingDefaultValues,
    mode: 'onChange',
  });

  // Billing Form
  const {
    register: billingRegister,
    formState: { errors: billingErrors },
    watch: billingWatch,
    setValue: billingSetValue,
    getValues: getValuesBilling,
  } = useForm<TBillingAddress>({
    defaultValues: billingDefaultValues,
    mode: 'onChange',
  });

  /**
   * ✅ Debounced real-time sync
   */
  const debouncedSync = useMemo(
    () =>
      debounce(() => {
        const billingData = getValuesBilling();
        const shippingData = getValuesShipping();

        const finalBilling = {
          ...billingData,
          name: `${billingData.fname?.trim() || ''} ${billingData.lname?.trim() || ''}`.trim(),
        };
        const finalShipping = {
          ...shippingData,
          name: `${shippingData.fname?.trim() || ''} ${shippingData.lname?.trim() || ''}`.trim(),
        };

        if (!isEqual(billingAddress, finalBilling)) {
          dispatch(setBillingAddress(finalBilling));
        }
        if (!isEqual(shippingAddress, finalShipping)) {
          dispatch(setShippingAddress(finalShipping));
        }
      }, 400), // debounce interval (ms)
    [
      dispatch,
      billingAddress,
      shippingAddress,
      getValuesBilling,
      getValuesShipping,
    ]
  );

  // Subscribe to watch changes — update Redux with debounce
  useEffect(() => {
    const subB = billingWatch(() => debouncedSync());
    const subS = shippingWatch(() => debouncedSync());
    return () => {
      subB.unsubscribe();
      subS.unsubscribe();
      debouncedSync.cancel();
    };
  }, [billingWatch, shippingWatch, debouncedSync]);

  // Handle “Same as Shipping”
  useEffect(() => {
    if (
      billingSameAsShipping &&
      selectedOptionTitle === 'Direct to Customer' &&
      !isEqual(prevShippingRef.current, shippingAddress)
    ) {
      const merged = { ...shippingAddress, country: 'US' };
      Object.entries(merged).forEach(([key, value]) => {
        billingSetValue(key as keyof TBillingAddress, value as any, {
          shouldValidate: false,
          shouldDirty: false,
        });
      });
      dispatch(setBillingAddress(merged));
      prevShippingRef.current = merged;
    }
  }, [
    billingSameAsShipping,
    selectedOptionTitle,
    shippingAddress,
    billingSetValue,
    dispatch,
  ]);

  // Validation state control (error-based)
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

  const billingValues = billingWatch();
  const shippingValues = shippingWatch();

  useEffect(() => {
    // 🧩 Check billing form completeness and errors
    const hasBillingInvalid = requiredFields.some((field) => {
      const value = billingValues[field];
      // console.log('TCL: value', value);
      const isEmpty = !value || value.toString().trim().length === 0;
      const hasError = !!billingErrors[field];
      return isEmpty || hasError;
    });

    // 🧩 Check shipping form completeness and errors (when applicable)
    let hasShippingInvalid = false;
    if (selectedOptionTitle === 'Direct to Customer') {
      hasShippingInvalid = requiredFields.some((field) => {
        const value = shippingValues[field];
        console.log('TCL: value', value);
        const isEmpty = !value || value.toString().trim().length === 0;
        const hasError = !!shippingErrors[field];
        return isEmpty || hasError;
      });
    }

    // 🔥 Disable button if anything missing/invalid or terms not accepted
    const shouldDisable =
      hasBillingInvalid || hasShippingInvalid || !orderInfo.termsAndConditions;
    console.log('TCL: hasShippingInvalid', hasShippingInvalid);
    console.log('TCL: hasBillingInvalid', hasBillingInvalid);

    console.log('TCL: shouldDisable', shouldDisable);
    setShouldDisableButton(shouldDisable);
  }, [
    activeAccordion,
    billingValues, // ✅ now changes on every keystroke
    shippingValues, // ✅ now changes on every keystroke
    billingErrors,
    shippingErrors,
    orderInfo.termsAndConditions,
    selectedOptionTitle,
    setShouldDisableButton,
  ]);

  return (
    <div className="w-full">
      {/* ===== SHIPPING INFO ===== */}
      {selectedOptionTitle === 'Direct to Customer' && (
        <div className="flex flex-col gap-y-2 pt-8">
          <h2 className="text-xl font-bold">Shipping Info</h2>
          <div className="space-y-8 max-w-xl w-full">
            <div className="flex flex-col gap-y-8 w-full">
              {/* First & Last Name */}
              <div className="flex gap-4 w-full">
                <Input
                  label="First Name"
                  required
                  error={shippingErrors.fname?.message}
                  placeholder="John"
                  {...shippingRegister('fname', {
                    required: 'First name is required',
                  })}
                />
                <Input
                  label="Last Name"
                  required
                  placeholder="Doe"
                  error={shippingErrors.lname?.message}
                  {...shippingRegister('lname', {
                    required: 'Last name is required',
                  })}
                />
              </div>

              <Input
                placeholder="Company/Care of"
                label="Company/Care of"
                {...shippingRegister('company')}
              />

              <div className="flex flex-col gap-3">
                <GooglePlacesInput
                  label="Address Line 1"
                  error={shippingErrors.address1?.message}
                  value={shippingWatch('address1')}
                  onSelect={(address) => {
                    address.addressLines.forEach((line, i) => {
                      shippingSetValue(`address${i + 1}` as any, line);
                    });
                    shippingSetValue('cityState', address.state);
                    shippingSetValue('city', address.city);
                    shippingSetValue('zipCode', address.zipcode);
                    shippingSetValue('country', 'US');
                  }}
                  {...shippingRegister('address1', {
                    required: 'Address is required',
                  })}
                />
                <div className="text-sm text-muted">
                  Select an address from suggestions if possible
                </div>
              </div>

              <Input
                placeholder="Address Line 2"
                label="Address Line 2"
                {...shippingRegister('address2')}
              />

              <Input
                label="ZIP/Postal Code"
                required
                placeholder="33425"
                error={shippingErrors.zipCode?.message}
                {...shippingRegister('zipCode', {
                  required: 'ZIP/Postal Code is required',
                })}
              />

              <Input
                label="Country"
                required
                placeholder="Enter country"
                error={shippingErrors.country?.message}
                {...shippingRegister('country', {
                  required: 'Country is required',
                })}
              />

              <Input
                label="City"
                required
                placeholder="Tampa"
                error={shippingErrors.city?.message}
                {...shippingRegister('city', { required: 'City is required' })}
              />

              <Input
                label="State"
                required
                placeholder="FL"
                error={shippingErrors.cityState?.message}
                {...shippingRegister('cityState', {
                  required: 'State is required',
                  maxLength: { value: 2, message: 'Must be 2 letters' },
                  minLength: { value: 2, message: 'Must be 2 letters' },
                  pattern: {
                    value: /^[A-Za-z]{2}$/,
                    message: 'Invalid state code',
                  },
                })}
              />

              <PhoneInput
                billingErrors={shippingErrors}
                billingRegister={shippingRegister}
              />

              <Input
                label="Email Address"
                required
                type="email"
                placeholder="you@example.com"
                error={shippingErrors.email?.message}
                {...shippingRegister('email', {
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
      )}

      {/* ===== BILLING INFO ===== */}
      <div className="flex flex-col gap-y-2 pt-8">
        <h2 className="text-xl font-bold">Billing Info</h2>

        {selectedOptionTitle === 'Direct to Customer' && (
          <div
            className="flex items-center gap-1 cursor-pointer py-2"
            onClick={() => setBillingSameAsShipping((prev) => !prev)}
          >
            <Checkbox
              checked={billingSameAsShipping}
              className="data-[state=checked]:bg-black border-black w-5 h-5"
            />
            <span className="text-lg">Same as shipping address</span>
          </div>
        )}

        {selectedOptionTitle === 'Direct to Customer' &&
        billingSameAsShipping ? null : (
          <div className="space-y-8 max-w-xl w-full">
            <div className="flex flex-col gap-y-8 w-full">
              <div className="flex gap-4 w-full">
                <Input
                  label="First Name"
                  required
                  error={billingErrors.fname?.message}
                  placeholder="John"
                  {...billingRegister('fname', {
                    required: 'First name is required',
                  })}
                />
                <Input
                  label="Last Name"
                  required
                  placeholder="Doe"
                  error={billingErrors.lname?.message}
                  {...billingRegister('lname', {
                    required: 'Last name is required',
                  })}
                />
              </div>

              <Input
                placeholder="Company/Care of"
                label="Company/Care of"
                {...billingRegister('company')}
              />

              <div className="flex flex-col gap-3">
                <GooglePlacesInput
                  label="Address Line 1"
                  error={billingErrors.address1?.message}
                  value={billingWatch('address1')}
                  onSelect={(address) => {
                    address.addressLines.forEach((line, i) => {
                      billingSetValue(`address${i + 1}` as any, line);
                    });
                    billingSetValue('cityState', address.state);
                    billingSetValue('city', address.city);
                    billingSetValue('zipCode', address.zipcode);
                    billingSetValue('country', 'US');
                  }}
                  {...billingRegister('address1', {
                    required: 'Address is required',
                  })}
                />
                <div className="text-sm text-muted">
                  Select an address from suggestions if possible
                </div>
              </div>

              <Input
                placeholder="Address Line 2"
                label="Address Line 2"
                {...billingRegister('address2')}
              />

              <Input
                label="ZIP/Postal Code"
                required
                placeholder="33425"
                error={billingErrors.zipCode?.message}
                {...billingRegister('zipCode', {
                  required: 'ZIP/Postal Code is required',
                })}
              />

              <Input
                label="Country"
                required
                placeholder="Enter country"
                error={billingErrors.country?.message}
                {...billingRegister('country', {
                  required: 'Country is required',
                })}
              />

              <Input
                label="City"
                required
                placeholder="Tampa"
                error={billingErrors.city?.message}
                {...billingRegister('city', { required: 'City is required' })}
              />

              <Input
                label="State"
                required
                placeholder="FL"
                error={billingErrors.cityState?.message}
                {...billingRegister('cityState', {
                  required: 'State is required',
                  maxLength: { value: 2, message: 'Must be 2 letters' },
                  minLength: { value: 2, message: 'Must be 2 letters' },
                  pattern: {
                    value: /^[A-Za-z]{2}$/,
                    message: 'Invalid state code',
                  },
                })}
              />

              <PhoneInput
                billingErrors={billingErrors}
                billingRegister={billingRegister}
              />

              <Input
                label="Email Address"
                required
                type="email"
                placeholder="you@example.com"
                error={billingErrors.email?.message}
                {...billingRegister('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
