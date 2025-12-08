import StarRating from '@/components/shared/StarRating';
import { useGetReviewsQuery } from '@/redux/apis/reviews';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import ReviewPagination from '../ReviewPagination/ReviewPagination';

export const Reviews: React.FC<{ productId: number }> = ({ productId }) => {
  const [page, setPage] = useState(1);

  const { isLoading, isFetching, data } = useGetReviewsQuery({
    productId,
    page: 1,
  });
  return (
    <div>
      {isLoading || isFetching ? (
        <div>
          {Array.from({ length: 10 }).map((_, id) => {
            return (
              <div
                key={id}
                className="space-y-2 border-b last:border-none animate-pulse"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                  <div className="h-4 bg-gray-300 rounded w-32" />
                </div>

                <div className="space-y-2 ml-10">
                  {/* Star rating placeholders */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-gray-300 rounded" />
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-20" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : data?.reviews.length ? (
        <div>
          {data?.reviews.map((review) => {
            return (
              <div
                className="space-y-2 border-b last:border-none py-1"
                key={review.id}
              >
                <p className="flex items-center gap-2 font-semibold">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                    {review.userId.firstName.split('')[0]}
                    {review.userId.lastName.split('')[0]}
                  </div>
                  {review.userId.firstName + ' ' + review.userId.lastName}
                </p>
                <div className="space-y-1 ml-10">
                  <StarRating className="gap-1" rating={review.rating} />
                  <div className="flex justify-between items-center">
                    <p>{review.comment}</p>
                    <p className="text-gray-500">
                      {formatDistanceToNow(review.createdAt, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <ReviewPagination
            currentPage={data.currentPage}
            onPageChange={setPage}
            totalPages={data.pages}
          />
        </div>
      ) : (
        <div>
          <p>There is No reviews for this product</p>
        </div>
      )}
    </div>
  );
};
