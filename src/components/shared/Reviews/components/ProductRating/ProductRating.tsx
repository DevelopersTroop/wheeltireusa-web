import StarRating from "../StarRating/StarRating";
import { useGetReviewsQuery } from "@/redux/apis/reviews";

import React from "react";
import { useProductRating } from "../../hooks/useProductRating";

export const ProductRating: React.FC<{ productId: number }> = ({
  productId,
}) => {
  const { setFocus } = useProductRating();
  const { data } = useGetReviewsQuery(
    { productId, page: 1 },
    { skip: !productId }
  );

  if (!data?.average || !data.count) return null;
  return (
    // Main container for the rating component
    <div
      onClick={setFocus}
      className="rounded-md flex gap-2 items-center self-stretch relative w-full cursor-pointer"
    >
      <div className="border-y-0 border-r border-l-0 border-[#cfcfcf] pl-0 pr-2 flex gap-1 items-center">
        <StarRating size={18} rating={data?.average || 0} />
        <small className="text-sm leading-[17px] text-[#210203]">
          <span className="text-[#210203] text-sm font-semibold">
            ({data?.average || 0})
          </span>
        </small>
      </div>
      {/* <small className="text-sm leading-[17px] text-[#210203]">
                <span className="text-[#210203] text-sm font-normal">Reviews</span>
            </small> */}

      <small className="text-sm leading-[17px] text-[#210203]">
        <span className="text-cyan-500 text-sm font-semibold">
          {data?.count || 0} Reviews
        </span>
      </small>
    </div>
  );
};
