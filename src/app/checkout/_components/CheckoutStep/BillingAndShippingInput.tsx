'use client';
import { GooglePlacesInput } from '@/components/shared-old/googlePlaceInput';
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

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionHeader = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
        {title}
      </span>
      <div className="h-[2px] w-7 bg-slate-900 rounded-full" />
    </div>
    {children}
  </div>
);

const FormCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-5 shadow-sm">
    {children}
  </div>
);

const FieldRow = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-3">{children}</div>
);

const Divider = () => <div className="border-t border-slate-100" />;

const SyncBadge = ({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] font-semibold uppercase tracking-wider transition-all duration-150 select-none
      ${active
        ? 'bg-slate-900 border-slate-900 text-white'
        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'
      }`}
  >
    <span
      className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors
        ${active ? 'bg-white border-white' : 'border-slate-400'}`}
    >
      {active && (
        <svg
          viewBox="0 0 10 8"
          className="w-2.5 h-2.5 stroke-slate-900 fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round"
        >
          <polyline points="1 4 3.5 6.5 9 1" />
        </svg>
      )}
    </span>
    Same as shipping
  </button>
);

const SyncActiveState = () => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
    <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 stroke-emerald-600 fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-800">Billing matches shipping</p>
      <p className="text-xs text-slate-400 mt-0.5">
        Toggle off above to enter a separate billing address
      </p>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

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

  const billingDefaultValues = useMemo(
    () => ({ ...billingAddress, country: billingAddress?.country || 'US' }),
    [billingAddress]
  );
  const shippingDefaultValues = useMemo(
    () => ({ ...shippingAddress, country: shippingAddress?.country || 'US' }),
    [shippingAddress]
  );

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
        if (!isEqual(billingAddress, finalBilling)) dispatch(setBillingAddress(finalBilling));
        if (!isEqual(shippingAddress, finalShipping)) dispatch(setShippingAddress(finalShipping));
      }, 400),
    [dispatch, billingAddress, shippingAddress, getValuesBilling, getValuesShipping]
  );

  useEffect(() => {
    const subB = billingWatch(() => debouncedSync());
    const subS = shippingWatch(() => debouncedSync());
    return () => {
      subB.unsubscribe();
      subS.unsubscribe();
      debouncedSync.cancel();
    };
  }, [billingWatch, shippingWatch, debouncedSync]);

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
  }, [billingSameAsShipping, selectedOptionTitle, shippingAddress, billingSetValue, dispatch]);

  const requiredFields: (keyof TBillingAddress)[] = [
    'address1', 'zipCode', 'country', 'cityState',
    'phone', 'email', 'fname', 'lname',
  ];

  const billingValues = billingWatch();
  const shippingValues = shippingWatch();

  useEffect(() => {
    const hasBillingInvalid = requiredFields.some((field) => {
      const value = billingValues[field];
      return !value || value.toString().trim().length === 0 || !!billingErrors[field];
    });
    let hasShippingInvalid = false;
    if (selectedOptionTitle === 'Direct to Customer') {
      hasShippingInvalid = requiredFields.some((field) => {
        const value = shippingValues[field];
        return !value || value.toString().trim().length === 0 || !!shippingErrors[field];
      });
    }
    setShouldDisableButton(hasBillingInvalid || hasShippingInvalid);
  }, [billingValues, shippingValues, billingErrors, shippingErrors, orderInfo.termsAndConditions, selectedOptionTitle]);

  const zipCode = shippingValues.zipCode || billingValues.zipCode;
  useEffect(() => { setValidatedZipCode(zipCode); }, [zipCode]);

  const isDTC = selectedOptionTitle === 'Direct to Customer';

  return (
    <div className="w-full space-y-8">

      {/* ── SHIPPING ─────────────────────────────── */}
      {isDTC && (
        <section className="space-y-3">
          <SectionHeader title="Shipping destination" />
          <FormCard>
            <FieldRow>
              <Input
                label="First name"
                required
                error={shippingErrors.fname?.message}
                {...shippingRegister('fname', { required: 'First name is required' })}
              />
              <Input
                label="Last name"
                required
                error={shippingErrors.lname?.message}
                {...shippingRegister('lname', { required: 'Last name is required' })}
              />
            </FieldRow>

            <div className="space-y-1">
              <GooglePlacesInput
                label="Address line 1"
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
                {...shippingRegister('address1', { required: 'Address is required' })}
              />
              <p className="text-[11px] text-slate-400">Select from suggestions when available</p>
            </div>

            <Input
              label="Address line 2"
              {...shippingRegister('address2')}
            />

            <FieldRow>
              <Input
                label="ZIP / Postal code"
                required
                error={shippingErrors.zipCode?.message}
                {...shippingRegister('zipCode', { required: 'ZIP/Postal Code is required' })}
              />
              <Input
                label="City"
                required
                error={shippingErrors.city?.message}
                {...shippingRegister('city', { required: 'City is required' })}
              />
            </FieldRow>

            <Divider />

            <FieldRow>
              <ModernSelect
                label="State"
                required
                value={shippingWatch('cityState')}
                onValueChange={(val) => shippingSetValue('cityState', val, { shouldValidate: true })}
                options={US_STATES}
                error={shippingErrors.cityState?.message}
              />
              <Input
                label="Country"
                disabled
                required
                placeholder="United States"
                error={shippingErrors.country?.message}
                {...shippingRegister('country', { required: 'Country is required' })}
              />
            </FieldRow>

            <Divider />

            <FieldRow>
              <PhoneInput billingErrors={shippingErrors} billingRegister={shippingRegister} />
              <Input
                label="Email address"
                required
                type="email"
                error={shippingErrors.email?.message}
                {...shippingRegister('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
            </FieldRow>
          </FormCard>
        </section>
      )}

      {/* ── BILLING ──────────────────────────────── */}
      <section className="space-y-3">
        <SectionHeader title="Billing profile">
          {isDTC && (
            <SyncBadge
              active={billingSameAsShipping}
              onToggle={() => setBillingSameAsShipping((prev) => !prev)}
            />
          )}
        </SectionHeader>

        <FormCard>
          {isDTC && billingSameAsShipping ? (
            <SyncActiveState />
          ) : (
            <>
              <FieldRow>
                <Input
                  label="First name"
                  required
                  error={billingErrors.fname?.message}
                  {...billingRegister('fname', { required: 'First name is required' })}
                />
                <Input
                  label="Last name"
                  required
                  error={billingErrors.lname?.message}
                  {...billingRegister('lname', { required: 'Last name is required' })}
                />
              </FieldRow>

              <div className="space-y-1">
                <GooglePlacesInput
                  label="Address line 1"
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
                  {...billingRegister('address1', { required: 'Address is required' })}
                />
                <p className="text-[11px] text-slate-400">Select from suggestions when available</p>
              </div>

              <Input
                label="Address line 2"
                {...billingRegister('address2')}
              />

              <FieldRow>
                <Input
                  label="ZIP / Postal code"
                  required
                  error={billingErrors.zipCode?.message}
                  {...billingRegister('zipCode', { required: 'ZIP/Postal Code is required' })}
                />
                <Input
                  label="City"
                  required
                  error={billingErrors.city?.message}
                  {...billingRegister('city', { required: 'City is required' })}
                />
              </FieldRow>

              <Divider />

              <FieldRow>
                <ModernSelect
                  label="State"
                  required
                  value={billingWatch('cityState')}
                  onValueChange={(val) => billingSetValue('cityState', val, { shouldValidate: true })}
                  options={US_STATES}
                  error={billingErrors.cityState?.message}
                />
                <Input
                  label="Country"
                  required
                  placeholder="United States"
                  error={billingErrors.country?.message}
                  {...billingRegister('country', { required: 'Country is required' })}
                />
              </FieldRow>

              <Divider />

              <FieldRow>
                <PhoneInput billingErrors={billingErrors} billingRegister={billingRegister} />
                <Input
                  label="Email address"
                  required
                  type="email"
                  error={billingErrors.email?.message}
                  {...billingRegister('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
              </FieldRow>
            </>
          )}
        </FormCard>
      </section>
    </div>
  );
};
