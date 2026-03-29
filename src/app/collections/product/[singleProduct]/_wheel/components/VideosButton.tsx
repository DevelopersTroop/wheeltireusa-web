"use client";

import { MdPlayCircle } from "react-icons/md";
import { useGetReviewsQuery } from "@/redux/apis/reviews";

interface VideosButtonProps {
  productId: number;
}

const VideosButton = ({ productId }: VideosButtonProps) => {
  const { data } = useGetReviewsQuery(
    { productId, page: 1 },
    { skip: !productId }
  );

  // Count reviews with videos
  const videoCount = data?.reviews?.filter((review: any) =>
    review.videos && review.videos.length > 0
  ).length || 0;

  if (videoCount === 0) {
    return null;
  }

  const handleClick = () => {
    // Scroll to reviews section or open video modal
    const reviewsSection = document.getElementById("reviews-section");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
    >
      {/* Red Play Icon */}
      <MdPlayCircle className="w-5 h-5 text-red-500" />

      {/* Text */}
      <span>Videos ({videoCount})</span>
    </button>
  );
};

export default VideosButton;
