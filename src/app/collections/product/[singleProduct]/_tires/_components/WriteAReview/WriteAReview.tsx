import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useCreateReviewMutation } from '@/redux/apis/reviews';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StarRatingInput } from './components/StarRatingInput';
import { reviewSchema, TReviewFormValues } from './utils/reviewSchema';

export const WriteAReview: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [createReview] = useCreateReviewMutation();
  const handleStarClick = useCallback((star: number) => {
    setSelectedStars(star);
  }, []);

  const form = useForm<TReviewFormValues>({
    defaultValues: {
      productId,
    },
    values: {
      productId,
      comment: '',
      rating: 0,
    },
    resolver: zodResolver(reviewSchema),
  });

  useEffect(() => {
    form.setValue('rating', selectedStars);
  }, [selectedStars, form]);

  const onSubmit = (data: TReviewFormValues) => {
    createReview(data);
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            render={() => {
              return (
                <FormItem>
                  <StarRatingInput
                    selectedStars={selectedStars}
                    onSelect={handleStarClick}
                  />
                  <FormMessage />
                </FormItem>
              );
            }}
            control={form.control}
            name="rating"
          />
          <FormField
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Enter your comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="enter your message"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
            control={form.control}
            name="comment"
          />
          <Button type="submit" className="w-fit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
