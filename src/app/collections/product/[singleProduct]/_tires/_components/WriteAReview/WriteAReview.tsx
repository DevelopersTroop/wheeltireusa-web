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
import { cn } from '@/lib/utils';
import { useCreateReviewMutation } from '@/redux/apis/reviews';
import { zodResolver } from '@hookform/resolvers/zod';
import { StarIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const messageObject: Record<number, { text: string; style: string }> = {
  1: {
    text: 'Very Poor',
    style: 'text-red-600',
  },
  1.5: {
    text: 'Very Poor',
    style: 'text-red-600',
  },
  2: {
    text: 'Poor',
    style: 'text-red-500',
  },
  2.5: {
    text: 'Poor',
    style: 'text-red-500',
  },
  3: {
    text: 'Average',
    style: 'text-gray-700',
  },
  3.5: {
    text: 'Average',
    style: 'text-gray-700',
  },
  4: {
    text: 'Good',
    style: 'text-green-600',
  },
  4.5: {
    text: 'Good',
    style: 'text-green-600',
  },
  5: {
    text: 'Very Good',
    style: 'text-green-700',
  },
};

export const WriteAReview: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [createReview] = useCreateReviewMutation();
  const handleStarClick = useCallback((star: number) => {
    setSelectedStars(star);
  }, []);
  const schema = z.object({
    comment: z.string().min(3, 'Please enter your comment'),
    rating: z.number().min(1, 'Please select a valid rating').max(5),
    productId: z.string(),
  });

  type TFieldValues = z.infer<typeof schema>;

  const form = useForm<TFieldValues>({
    defaultValues: {
      productId,
    },
    values: {
      productId,
      comment: '',
      rating: 0,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    form.setValue('rating', selectedStars);
  }, [selectedStars, form]);

  const onSubmit = (data: TFieldValues) => {
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
                  <div className="flex gap-8 items-center">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const starValue = index + 1;
                        const isFull = selectedStars >= starValue;
                        const isHalf =
                          selectedStars + 0.5 >= starValue &&
                          selectedStars < starValue;

                        return (
                          <span
                            key={index}
                            onClick={(e) => {
                              const { left, width } =
                                e.currentTarget.getBoundingClientRect();
                              const clickX = e.clientX - left;
                              let clickedValue =
                                clickX < width / 2
                                  ? starValue - 0.5
                                  : starValue;
                              if (clickedValue < 1) clickedValue = 1; // Minimum rating
                              handleStarClick(clickedValue);
                            }}
                            className="relative w-8 h-8 inline-block cursor-pointer"
                          >
                            {/* Gray base star */}
                            <StarIcon
                              size={32}
                              className="text-[#9e9e9e] fill-[#9e9e9e]"
                            />

                            {/* Yellow overlay */}
                            {(isFull || isHalf) && (
                              <div
                                className="absolute top-0 left-0 h-full overflow-hidden"
                                style={{ width: isHalf ? '50%' : '100%' }}
                              >
                                <StarIcon
                                  size={32}
                                  className="text-yellow-500 fill-yellow-500"
                                />
                              </div>
                            )}
                          </span>
                        );
                      })}
                    </div>
                    {messageObject[form.watch('rating')] && (
                      <p
                        className={cn(
                          `${messageObject[form.watch('rating')]?.style} font-semibold text-md`
                        )}
                      >
                        {messageObject[form.watch('rating')]?.text}
                      </p>
                    )}
                  </div>
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
