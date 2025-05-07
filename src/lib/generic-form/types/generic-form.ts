import { Control, FieldValues, UseFormReturn } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericFormContextValue<T extends FieldValues = any> = {
  control: Control<T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericFormRef<T extends FieldValues = any> = {
  form: UseFormReturn<T>;
};
