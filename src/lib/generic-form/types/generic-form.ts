import { Control, FieldValues, UseFormReturn } from 'react-hook-form';

export type GenericFormContextValue<T extends FieldValues = any> = {
  control: Control<T>;
};

export type GenericFormRef<T extends FieldValues = any> = {
  form: UseFormReturn<T>;
};
