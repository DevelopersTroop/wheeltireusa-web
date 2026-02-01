import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { Control, FieldPath } from "react-hook-form";

export type FieldValues = Record<string, any>;
// Define TextInputProps interface

export function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  control,
  variant = "primary",
  type,
  labelClassName,
  ...props
}: InputProps & {
  name?: TName;
  control?: Control<TFieldValues>;
  label?: string;
  variant?: "primary" | "secondary";
  labelClassName?: string;
}) {
  const [show, setShow] = useState(false);
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    if (type === "password") {
      if (show) {
        setInputType("text");
      } else {
        setInputType("password");
      }
    }
  }, [show, type]);
  return (
    <FormField
      render={({ field }) => {
        return (
          <FormItem className={"w-full"}>
            <div
              className={cn(
                variant === "secondary" ? "flex items-center" : "",
                "w-full",
              )}
            >
              {label ? (
                <FormLabel
                className={cn(
                  "mb-3 inline-block w-full max-w-fit text-[1.1rem] font-normal",
                  labelClassName || "text-[#210203]"
                )}
                >
                  {props.required ? (
                    <span>
                      {label} <span className="text-primary">*</span>
                    </span>
                  ) : (
                    label
                  )}
                </FormLabel>
              ) : (
                ""
              )}
              <FormControl className={"w-full"}>
                <div className="relative">
                  <Input
                    className={cn(
                      "h-14 text-black placeholder:text-sm placeholder:text-muted",
                      props.className,
                    )}
                    key={inputType}
                    type={inputType}
                    {...field}
                    {...props}
                  />

                  {type === "password" ? (
                    <div
                      onClick={() => {
                        setShow((prev) => !prev);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {show ? (
                        <EyeClosed className="cursor-pointer text-muted" />
                      ) : (
                        <Eye className="cursor-pointer text-muted" />
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </FormControl>
            </div>
            <FormMessage className="text-red-500" />
          </FormItem>
        );
      }}
      name={name ?? ("" as any)}
      control={control}
    />
  );
}
