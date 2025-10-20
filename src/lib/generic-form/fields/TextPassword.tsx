import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useGenericForm from '../context/useGenericForm';
import { FieldValues, Path } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type TextProps<T> = {
  [K in Exclude<
    keyof React.ComponentProps<'input'>,
    'name' | 'type'
  >]?: React.ComponentProps<'input'>[K];
} & {
  name: Path<T>;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  heading?: string;
  description?: string;
  showMessage?: boolean;
  checkForgotPassword?: boolean;
  onChangeValidationCheck?: (value: string) => void;
};

const TextPassword = <T extends FieldValues>({
  heading,
  name,
  type = 'password',
  description,
  showMessage = true,
  checkForgotPassword = false,
  onChangeValidationCheck,
  ...props
}: TextProps<T>) => {
  const { control } = useGenericForm<T>();

  const [show, setShow] = useState(false);
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    if (type === 'password') {
      if (show) {
        setInputType('text');
      } else {
        setInputType('password');
      }
    }
  }, [show, type]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between items-center">
            {heading && <FormLabel>{heading}</FormLabel>}
            {checkForgotPassword && (
              <Link href="/forgot-password" className="underline">
                Forgot password
              </Link>
            )}
          </div>
          <FormControl className="w-full">
            <div className="relative">
              <Input
                key={inputType}
                type={inputType}
                {...props}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onChangeValidationCheck?.(e.target.value);
                }}
              />
              {type === 'password' ? (
                <div
                  onClick={() => {
                    setShow((prev) => !prev);
                  }}
                  className="absolute -translate-y-1/2 cursor-pointer right-3 top-1/2"
                >
                  {show ? (
                    <Image
                      width={24}
                      height={24}
                      alt=""
                      src="password.svg"
                      className="cursor-pointer text-muted w-6 h-6"
                    />
                  ) : (
                    <Image
                      width={24}
                      height={24}
                      alt=""
                      src="password.svg"
                      className="cursor-pointer text-muted w-6 h-6"
                    />
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default TextPassword;
