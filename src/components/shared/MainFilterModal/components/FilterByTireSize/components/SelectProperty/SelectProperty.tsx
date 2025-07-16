import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

type SelectPropertyProps = {
  label: string;
  name: string;
  options: (string | number)[];
  control: Control<any>;
};

const SelectProperty = ({
  label,
  name,
  options,
  control,
}: SelectPropertyProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl className="!bg-white">
              <SelectTrigger className="w-full lg:w-[250px]">
                <SelectValue placeholder={label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectProperty;
