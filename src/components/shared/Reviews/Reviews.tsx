import { useGetReviewsQuery } from "@/redux/apis/reviews";
import { formatDistanceToNow } from "date-fns";
import { FC, useEffect, useRef, useState } from "react";
import StarRating from "./components/StarRating/StarRating";
import { WriteAReview } from "./components/WriteAReview/WriteAReview";
import { useProductRating } from "./hooks/useProductRating";
import { TReview } from "@/types/reviews";

const ReviewPagination: FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center gap-3 mt-6">
    <button
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:border-gray-900 hover:text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
    >
      ← Previous
    </button>
    <span className="flex-1 text-center text-gray-400 text-sm">
      Page {currentPage} of {totalPages}
    </span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:border-gray-900 hover:text-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Next →
    </button>
  </div>
);

export const Reviews: React.FC<{ productId: number | undefined }> = ({
  productId,
}) => {
  const { focus, setFocus } = useProductRating();
  const [page, setPage] = useState(1);
  const reviewRef = useRef<HTMLDivElement>(null);
  const { isLoading, isFetching, data } = useGetReviewsQuery(
    { productId: productId ?? 0, page },
    { skip: !productId }
  );

  useEffect(() => {
    if (reviewRef.current && focus) {
      reviewRef.current.scrollIntoView({ behavior: "smooth" });
      setFocus();
    }
  }, [focus]);

  return (
    <div ref={reviewRef} className="w-full">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-600">
          Reviews
        </h2>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Write a review */}
      <div className="mb-6">
        <WriteAReview productId={String(productId)} />
      </div>

      {/* Review list */}
      {isLoading || isFetching ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, id) => (
            <div key={id} className="border-b border-gray-100 pb-5 animate-pulse space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-32" />
              </div>
              <div className="flex gap-1 ml-13">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : data?.reviews.length ? (
        <div>
          {data.reviews.map((review: TReview) => {
            if (!review.userId?.firstName && !review.name) return null;

            const initials =
              (review.userId?.firstName?.charAt(0) || review?.name?.charAt(0) || "").toUpperCase() +
              (review.userId?.lastName?.charAt(0) || review?.name?.split(" ")[1]?.charAt(0) || "").toUpperCase();

            const displayName = review?.userId?.firstName
              ? `${review.userId.firstName} ${review.userId.lastName}`
              : review?.name;

            return (
              <div key={review.id} className="border-b border-gray-100 last:border-none py-5 space-y-2">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {initials}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{displayName}</p>
                    <p className="text-gray-400 text-xs">
                      {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="ml-13 pl-1 space-y-2">
                  <StarRating className="gap-1" rating={review.rating} />
                  <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>

                  {/* Media */}
                  {((review?.photos?.length ?? 0) > 0 || (review?.videos?.length ?? 0) > 0) && (
                    <div className="flex flex-wrap gap-2 pt-1">
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
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                            loading="lazy"
                            onError={(e) =>
                              (e.currentTarget.src = "https://placehold.co/100x100/EEE/999?text=N/A")
                            }
                          />
                        </a>
                      ))}
                      {review.videos?.map((videoUrl, index) => (
                        <video
                          key={`video-${index}`}
                          controls
                          src={videoUrl}
                          className="w-24 h-20 object-cover rounded-lg border border-gray-200 bg-black"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ))}
                    </div>
                  )}
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
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-8 text-center">
          <p className="text-gray-400 text-sm">No reviews yet. Be the first to review this product.</p>
        </div>
      )}
    </div>
  );
};
