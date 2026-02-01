import { useGetReviewsQuery } from "@/redux/apis/reviews";
import { formatDistanceToNow } from "date-fns";
import { FC, useEffect, useRef, useState } from "react";
import StarRating from "./components/StarRating/StarRating";
import { WriteAReview } from "./components/WriteAReview/WriteAReview";
import { useProductRating } from "./hooks/useProductRating";
import { TReview } from "@/types/reviews";

// Mock ReviewPagination
const ReviewPagination: FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex gap-2 mt-4">
    <button
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Previous
    </button>
    <span className="px-3 py-1">
      Page {currentPage} of {totalPages}
    </span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

// --- END MOCKED DEPENDENCIES ---

export const Reviews: React.FC<{ productId: number | undefined }> = ({
  productId,
}) => {
  const { focus, setFocus } = useProductRating();
  const [page, setPage] = useState(1);
  const reviewRef = useRef<HTMLDivElement>(null);
  const { isLoading, isFetching, data } = useGetReviewsQuery(
    {
      productId: productId ?? 0,
      page: page, // Use state 'page'
    },
    {
      skip: !productId,
    }
  );

  useEffect(() => {
    if (reviewRef.current && focus) {
      reviewRef.current.scrollIntoView({ behavior: "smooth" });
      setFocus();
    }
  }, [focus]);

  return (
    <div ref={reviewRef} className="my-6">
      <div className="space-y-2">
        <WriteAReview productId={String(productId)} />
      </div>
      <h2 className="text-2xl font-semibold mb-4 pb-1 border-b">
        Customer Reviews
      </h2>
      {isLoading || isFetching ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, id) => {
            return (
              <div
                key={id}
                className="space-y-2 border-b last:border-none animate-pulse py-4"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                  <div className="h-4 bg-gray-300 rounded w-32" />
                </div>

                <div className="space-y-3 ml-12">
                  {/* Star rating placeholders */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gray-300 rounded-sm" />
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                    <div className="h-4 bg-gray-300 rounded w-1/2" />
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : data?.reviews.length ? (
        <div>
          {data?.reviews.map((review:TReview) => {
            if (!review.userId?.firstName && !review.name) return null;
            return (
              <div
                className="space-y-2 border-b last:border-none py-4"
                key={review.id}
              >
                <p className="flex items-center gap-2 font-semibold">
                  <span className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-bold">
                    {review.userId?.firstName.split("")[0] ||
                      review?.name?.split(" ")[0]?.charAt(0) ||
                      review?.name?.charAt(0)}
                    {review.userId?.lastName.split("")[0] ||
                      review?.name?.split(" ")[1]?.charAt(0)}
                  </span>
                  {review?.userId?.firstName
                    ? review.userId?.firstName + " " + review.userId?.lastName
                    : review?.name}
                </p>
                <div className="space-y-2 ml-12">
                  {" "}
                  {/* Changed to ml-12 to align with skeleton */}
                  <StarRating className="gap-1" rating={review.rating} />
                  <div className="flex justify-between items-start">
                    <p className="flex-1 pr-4">{review.comment}</p>
                    <p className="text-gray-500 text-sm shrink-0">
                      {formatDistanceToNow(new Date(review.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  {/* --- NEW MEDIA GALLERY --- */}
                  {(review?.photos?.length && review?.photos?.length > 0) ||
                  (review?.videos?.length && review?.videos?.length > 0) ? (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {/* Render Photos */}
                      {review.photos?.map((photoUrl, index) => (
                        <a
                          href={photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={`photo-${index}`}
                          className="hover:opacity-80 transition-opacity"
                        >
                          <img
                            src={photoUrl}
                            alt={`Review photo ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-md border"
                            loading="lazy"
                            onError={(e) =>
                              (e.currentTarget.src =
                                "https://placehold.co/100x100/EEE/31343C?text=Invalid")
                            }
                          />
                        </a>
                      ))}

                      {/* Render Videos */}
                      {review.videos?.map((videoUrl, index) => (
                        <video
                          key={`video-${index}`}
                          controls
                          src={videoUrl}
                          className="w-24 h-20 object-cover rounded-md border bg-black"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ))}
                    </div>
                  ) : null}
                  {/* --- END MEDIA GALLERY --- */}
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
        <div className="py-4">
          <p>There are no reviews for this product yet.</p>
        </div>
      )}
    </div>
  );
};
