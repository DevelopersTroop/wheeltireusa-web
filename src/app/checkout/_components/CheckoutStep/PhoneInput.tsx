import { TBillingAddress } from "@/types/order";
import { useMask } from "@react-input/mask";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "./Input";

export function PhoneInput({
  billingRegister,
  billingErrors,
}: {
  billingRegister: UseFormRegister<TBillingAddress>;
  billingErrors: FieldErrors<TBillingAddress>;
}) {
  const maskRef = useMask({
    mask: "(999) 999-9999",
    replacement: { 9: /\d/ },
  });

  const { ref: registerRef, ...registerProps } = billingRegister("phone", {
    required: "Phone number is required",
    validate: (value) =>
      value.replace(/\D/g, "").length === 10 ||
      "Phone number must be 10 digits",
  });

  return (
    <Input
      label="Phone Number"
      type="tel"
      required
      placeholder="(123) 456-7890"
      error={billingErrors.phone?.message}
      {...registerProps}
      ref={(el: any) => {
        // combine both refs
        maskRef.current = el;
        registerRef(el);
      }}
    />
  );
}
