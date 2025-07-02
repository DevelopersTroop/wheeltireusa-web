import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/\d/, 'Password must contain at least one digit');

export const formSchema = z
  .object({
    fullName: z.string().min(5, 'Full name must be at least 5 characters'),
    email: z.string().email('Invalid email'),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters'),
    terms: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type TFieldValues = z.infer<typeof formSchema>;

export const defaultValues: TFieldValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
};

export const passwordRules = [
  { label: 'Min. 8 characters', isValid: (pw: string) => pw.length >= 8 },
  { label: 'Uppercase letters', isValid: (pw: string) => /[A-Z]/.test(pw) },
  { label: 'Lowercase letters', isValid: (pw: string) => /[a-z]/.test(pw) },
  { label: 'At least 1 digit', isValid: (pw: string) => /\d/.test(pw) },
];
