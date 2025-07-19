import { z } from 'zod';

export const reviewSchema = z.object({
  comment: z.string().min(3, 'Please enter your comment'),
  rating: z.number().min(1, 'Please select a valid rating').max(5),
  productId: z.number(),
});

export type TReviewFormValues = z.infer<typeof reviewSchema>;
