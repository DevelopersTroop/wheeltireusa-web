import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import React from 'react';
import { FieldValues, Path } from 'react-hook-form';
import useGenericForm from '../context/useGenericForm';

type TextProps<T> = {
  [K in Exclude<
    keyof React.ComponentProps<'input'>,
    'name' | 'type'
  >]?: React.ComponentProps<'input'>[K];
} & {
  name: Path<T>;
  type?: 'checkbox';
};

const TextCheckBox = <T extends FieldValues>({
  name,
  type = 'checkbox',
}: TextProps<T>) => {
  const { control } = useGenericForm<T>();
  console.log('type', type);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-2">
          <Checkbox
            id="rememberMe"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <FormLabel htmlFor="rememberMe" className="mt-0! cursor-pointer">
            Remember Me
          </FormLabel>
        </FormItem>
      )}
    />
  );
};

export default TextCheckBox;
