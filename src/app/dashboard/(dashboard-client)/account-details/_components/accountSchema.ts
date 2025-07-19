import { z } from 'zod';

export const accountSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  role: z.string().optional(),
});

export type TAccountFieldValues = z.infer<typeof accountSchema>;
