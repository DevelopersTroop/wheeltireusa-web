'use client';
import { GooglePlacesInput } from '@/components/shared-old/googlePlaceInput';
import { Checkbox } from '@/components/ui/checkbox';
import { useCheckout } from '@/context/checkoutContext';
import {
  setBillingAddress,
  setShippingAddress,
} from '@/redux/features/checkoutSlice';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { US_STATES } from '@/states';
import { TBillingAddress } from '@/types/order';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import React, { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './Input';
import { PhoneInput } from './PhoneInput';
import { ModernSelect } from './Select';

interface ICompProps {
  setBillingSameAsShipping: React.Dispatch<React.SetStateAction<boolean>>;
  billingSameAsShipping: boolean;
  setShouldDisableButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BillingAndShippingInput: React.FC<ICompProps> = ({
  setBillingSameAsShipping,
  billingSameAsShipping,
  setShouldDisableButton,
}) => {
  const { orderInfo, billingAddress, shippingAddress, selectedOptionTitle } =
    useTypedSelector((state) => state.persisted.checkout);
  const { setValidatedZipCode } = useCheckout();
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
    control: shippingControl,
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
    control: billingControl,
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
          name: `${billingData.fname?.trim() || ''} ${billingData.lname?.trim() || ''
            }`.trim(),
        };
        const finalShipping = {
          ...shippingData,
          name: `${shippingData.fname?.trim() || ''} ${shippingData.lname?.trim() || ''
            }`.trim(),
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
    const shouldDisable = hasBillingInvalid || hasShippingInvalid;
    setShouldDisableButton(shouldDisable);
  }, [
    billingValues, // ✅ now changes on every keystroke
    shippingValues, // ✅ now changes on every keystroke
    billingErrors,
    shippingErrors,
    orderInfo.termsAndConditions,
    selectedOptionTitle,
  ]);

  const zipCode = shippingValues.zipCode || billingValues.zipCode;

  useEffect(() => {
    setValidatedZipCode(zipCode);
  }, [zipCode]);

  return (
    <div className="w-full space-y-8">
      {/* ===== SHIPPING INFO ===== */}
      {selectedOptionTitle === 'Direct to Customer' && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
              Shipping Destination
            </h2>
            <div className="h-1 w-12 bg-primary rounded-full" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-y-6 w-full">
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

              {/* <Input
                placeholder="Company/Care of"
                label="Company/Care of"
                {...shippingRegister('company')}
              /> */}

              <div className="flex flex-col gap-3">
                <GooglePlacesInput
                  label="Address Line 1"
                  error={shippingErrors.address1?.message}
                  value={shippingWatch('address1')}
                  onSelect={(address) => {
                    console.log('TCL: address', address);
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
                disabled
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

              <ModernSelect
                label="State"
                required
                value={shippingWatch('cityState')}
                onValueChange={(val) => shippingSetValue('cityState', val, { shouldValidate: true })}
                options={US_STATES}
                error={shippingErrors.cityState?.message}
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
              Billing Profile
            </h2>
            <div className="h-1 w-12 bg-primary rounded-full" />
          </div>

          {selectedOptionTitle === 'Direct to Customer' && (
            <div
              className="flex items-center gap-2 cursor-pointer py-3 px-5 bg-slate-50 rounded-xl border border-slate-100 transition-all hover:bg-slate-100 active:scale-95"
              onClick={() => setBillingSameAsShipping((prev) => !prev)}
            >
              <Checkbox
                checked={billingSameAsShipping}
                className="data-[state=checked]:bg-slate-900 border-slate-300 w-5 h-5 rounded-md"
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 italic">Echo Dispatch Path</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {selectedOptionTitle === 'Direct to Customer' &&
            billingSameAsShipping ? (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-full">
                <Checkbox checked className="border-none bg-transparent h-4 w-4" />
              </div>
              <div>
                <p className="text-base font-black text-slate-900 uppercase tracking-tighter italic">Sync Protocol Active</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Billing matches dispatch destination</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-6 w-full">
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

              {/* <Input
                placeholder="Company/Care of"
                label="Company/Care of"
                {...billingRegister('company')}
              /> */}

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

              <ModernSelect
                label="State"
                required
                value={billingWatch('cityState')}
                onValueChange={(val) => billingSetValue('cityState', val, { shouldValidate: true })}
                options={US_STATES}
                error={billingErrors.cityState?.message}
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
          )}
        </div>
      </div>
    </div>
  );
};
