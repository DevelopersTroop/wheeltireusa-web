import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters') // Minimum length check
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter') // Uppercase letter check
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter') // Lowercase letters check
  .regex(/\d/, 'Password must contain at least one digit'); // Digit check

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // This makes the error show up under confirmPassword field
  });

export type TResetPasswordFields = z.infer<typeof resetPasswordSchema>;
