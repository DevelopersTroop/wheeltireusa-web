import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Input } from "../ShippingAddress";
import { TBillingAddress } from "@/types/order";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { GooglePlacesInput } from "@/components/shared/googlePlaceInput";
import { PhoneInput } from "./PhoneInput";

interface ICompProps {
  selectedOptionTitle: string;
  shippingRegister: UseFormRegister<TBillingAddress>;
  setBillingSameAsShipping: React.Dispatch<React.SetStateAction<boolean>>;
  billingSameAsShipping: boolean;
  activeAccordion: string;
  shippingSetValue: UseFormSetValue<TBillingAddress>;
  shippingErrors: FieldErrors<TBillingAddress>;
  shippingWatch: UseFormWatch<TBillingAddress>;
  billingWatch: UseFormWatch<TBillingAddress>;
  billingRegister: UseFormRegister<TBillingAddress>;
  billingSetValue: UseFormSetValue<TBillingAddress>;
  billingErrors: FieldErrors<TBillingAddress>;
}

export const BillingAndShippingInput: React.FC<ICompProps> = ({
  selectedOptionTitle,
  shippingRegister,
  setBillingSameAsShipping,
  billingSameAsShipping,
  activeAccordion,
  shippingSetValue,
  shippingErrors,
  shippingWatch,
  billingRegister,
  billingSetValue,
  billingErrors,
  billingWatch,
}) => {
  return (
    <div className="w-full">
      {selectedOptionTitle === "Direct To Customer" && (
        <div className="flex flex-col gap-y-2 pt-8">
          <h2 className="text-xl font-bold">Shipping Info</h2>
          <div className="space-y-8 w-full">
            <div className="flex flex-col gap-y-8 w-full">
              <div className="flex gap-4 w-full">
                <Input
                  label="First Name"
                  required
                  error={shippingErrors.fname?.message}
                  placeholder="Borhan"
                  {...shippingRegister("fname", {
                    required: "First name is required",
                  })}
                />
                <Input
                  label="Last Name"
                  required
                  placeholder="U."
                  error={shippingErrors.lname?.message}
                  {...shippingRegister("lname", {
                    required: "Last name is required",
                  })}
                />
              </div>
              <Input
                placeholder="EWWFL"
                label="Company/Care of"
                {...shippingRegister("company")}
              />
              <div className="flex flex-col gap-3">
                <GooglePlacesInput
                  label={"Address Line 1"}
                  error={shippingErrors.address1?.message}
                  value={shippingWatch("address1")}
                  onSelect={(address) => {
                    address.addressLines.map((line, index) => {
                      shippingSetValue(`address${index + 1}` as any, line);
                    });
                    shippingSetValue("cityState", `${address.state}`);
                    shippingSetValue("city", address.city);
                    shippingSetValue("zipCode", address.zipcode);
                    shippingSetValue("country", "US");
                  }}
                  {...shippingRegister("address1", {
                    required: "Address is required",
                  })}
                />
                <div className="text-sm text-muted">
                  Select an address from the suggestion if possible
                </div>
              </div>

              <Input
                placeholder="APO, 88 2"
                label="Address Line 2"
                {...shippingRegister("address2")}
              />
              <Input
                label="ZIP/Postal Code"
                required
                placeholder="33425"
                error={shippingErrors.zipCode?.message}
                {...shippingRegister("zipCode", {
                  required: "ZIP/Postal Code is required",
                })}
              />
              <Input
                label="Country"
                required
                error={shippingErrors.country?.message}
                {...shippingRegister("country", {
                  required: "Country is required",
                })}
                placeholder="Enter country name or wait for auto-detection"
              />
              <Input
                label="City"
                required
                placeholder="Tampa"
                error={shippingErrors.city?.message}
                {...shippingRegister("city", {
                  required: "City is required",
                })}
              />
              <Input
                label="State"
                required
                placeholder="FL"
                error={shippingErrors.cityState?.message}
                {...shippingRegister("cityState", {
                  required: "State is required",
                  maxLength: {
                    value: 2,
                    message: "Must be 2 letter state",
                  },
                  minLength: {
                    value: 2,
                    message: "Must be 2 letter state",
                  },
                  pattern: {
                    value: /^[A-Za-z]{2}$/,
                    message: "Must be valid 2-letter state code",
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
                placeholder="your mail@example.com"
                error={shippingErrors.email?.message}
                {...shippingRegister("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-y-2 pt-8">
        <h2 className="text-xl font-bold">Billing Info</h2>
        {selectedOptionTitle === "Direct To Customer" && (
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
        {selectedOptionTitle === "Direct To Customer" &&
          billingSameAsShipping ? (
          <></>
        ) : (
          <div className="space-y-8 max-w-xl w-full">
            <div className="flex flex-col gap-y-8 w-full">
              <div className="flex gap-4 w-full">
                <Input
                  label="First Name"
                  required
                  error={billingErrors.fname?.message}
                  placeholder="Borhan"
                  {...billingRegister("fname", {
                    required: "First name is required",
                  })}
                />
                <Input
                  label="Last Name"
                  required
                  placeholder="U."
                  error={billingErrors.lname?.message}
                  {...billingRegister("lname", {
                    required: "Last name is required",
                  })}
                />
              </div>
              <Input
                placeholder="EWWFL"
                label="Company/Care of"
                {...billingRegister("company")}
              />
              <div className="flex flex-col gap-3">
                <GooglePlacesInput
                  label={"Address Line 1"}
                  error={billingErrors.address1?.message}
                  value={billingWatch("address1")}
                  onSelect={(address) => {
                    address.addressLines.map((line, index) => {
                      billingSetValue(`address${index + 1}` as any, line);
                    });
                    billingSetValue("cityState", `${address.state}`);
                    billingSetValue("city", address.city);
                    billingSetValue("zipCode", address.zipcode);
                    billingSetValue("country", "US");
                  }}
                  {...billingRegister("address1", {
                    required: "Address is required",
                  })}
                />
                <div className="text-sm text-muted">
                  Select an address from the suggestion if possible
                </div>
              </div>

              <Input
                placeholder="APO, 88 2"
                label="Address Line 2"
                {...billingRegister("address2")}
              />
              <Input
                label="ZIP/Postal Code"
                required
                placeholder="33425"
                error={billingErrors.zipCode?.message}
                {...billingRegister("zipCode", {
                  required: "ZIP/Postal Code is required",
                })}
              />
              <Input
                label="Country"
                required
                error={billingErrors.country?.message}
                {...billingRegister("country", {
                  required: "Country is required",
                })}
                placeholder="Enter country name or wait for auto-detection"
              />
              <Input
                label="City"
                required
                placeholder="Tampa"
                error={billingErrors.city?.message}
                {...billingRegister("city", {
                  required: "City is required",
                })}
              />
              <Input
                label="State"
                required
                placeholder="FL"
                error={billingErrors.cityState?.message}
                {...billingRegister("cityState", {
                  required: "State is required",
                  maxLength: {
                    value: 2,
                    message: "Must be 2 letter state",
                  },
                  minLength: {
                    value: 2,
                    message: "Must be 2 letter state",
                  },
                  pattern: {
                    value: /^[A-Za-z]{2}$/,
                    message: "Must be valid 2-letter state code",
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
                placeholder="your mail@example.com"
                error={billingErrors.email?.message}
                {...billingRegister("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
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
