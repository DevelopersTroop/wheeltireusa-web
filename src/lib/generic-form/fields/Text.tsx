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
import React from 'react';

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
};

const Text = <T extends FieldValues>({
  heading,
  name,
  type = 'text',
  description,
  showMessage = true,
  ...props
}: TextProps<T>) => {
  const { control } = useGenericForm<T>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {heading && <FormLabel>{heading}</FormLabel>}
          <FormControl>
            <Input type={type} {...props} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default Text;
