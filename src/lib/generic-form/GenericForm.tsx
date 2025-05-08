'use client';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Ref, useImperativeHandle } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import GenericFormContext from './context/GenericFormContext';
import { GenericFormRef } from './types/generic-form';

type GenericFormProps<TSchema extends z.ZodType> = {
  children: React.ReactNode;
  schema: TSchema;
  defaultValues: Partial<z.infer<TSchema>>;
  onSubmit: (data: z.infer<TSchema>) => void;
  ref?: Ref<GenericFormRef<z.infer<TSchema>>>;
};

const GenericForm = <TSchema extends z.ZodType<object>>(
  props: GenericFormProps<TSchema>
) => {
  const { children, schema, defaultValues, onSubmit, ref } = props;
  type TFieldValues = z.infer<typeof schema>;
  const form = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<TFieldValues>,
  });

  useImperativeHandle(ref, () => ({
    form,
  }));

  return (
    <GenericFormContext.Provider
      value={{
        control: form.control,
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {children}
        </form>
      </Form>
    </GenericFormContext.Provider>
  );
};

export default GenericForm;
