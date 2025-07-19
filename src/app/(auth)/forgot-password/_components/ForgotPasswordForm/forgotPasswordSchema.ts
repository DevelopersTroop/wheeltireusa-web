import { z } from 'zod';

export const formSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .nonempty('Email is required'),
});

export type TFieldValues = z.infer<typeof formSchema>;

export const defaultValues: TFieldValues = {
  email: '',
};
