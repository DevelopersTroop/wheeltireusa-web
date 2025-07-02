import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  terms: z.boolean().default(false).optional(),
});

export type TFieldValues = z.infer<typeof formSchema>;

export const defaultValues: TFieldValues = {
  email: '',
  password: '',
};
