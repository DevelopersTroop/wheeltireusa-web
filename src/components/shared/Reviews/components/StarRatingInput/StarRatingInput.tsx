"use client";

import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

type Props = {
  selectedStars: number;
  onSelect: (star: number) => void;
};

const messageObject: Record<number, { text: string; style: string }> = {
  1: { text: "Very Poor", style: "text-red-600" },
  1.5: { text: "Very Poor", style: "text-red-600" },
  2: { text: "Poor", style: "text-red-500" },
  2.5: { text: "Poor", style: "text-red-500" },
  3: { text: "Average", style: "text-gray-700" },
  3.5: { text: "Average", style: "text-gray-700" },
  4: { text: "Good", style: "text-green-600" },
  4.5: { text: "Good", style: "text-green-600" },
  5: { text: "Very Good", style: "text-green-700" },
};

export const StarRatingInput: React.FC<Props> = ({
  selectedStars,
  onSelect,
}) => {
  return (
    <div className="flex gap-8 items-center">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;
          const isFull = selectedStars >= starValue;
          const isHalf =
            selectedStars + 0.5 >= starValue && selectedStars < starValue;

          return (
            <span
              key={index}
              onClick={(e) => {
                const { left, width } = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - left;
                let clickedValue =
                  clickX < width / 2 ? starValue - 0.5 : starValue;
                if (clickedValue < 1) clickedValue = 1;
                onSelect(clickedValue);
              }}
              className="relative w-8 h-8 inline-block cursor-pointer"
            >
              <StarIcon size={32} className="text-[#9e9e9e] fill-[#9e9e9e]" />
              {(isFull || isHalf) && (
                <div
                  className="absolute top-0 left-0 h-full overflow-hidden"
                  style={{ width: isHalf ? "50%" : "100%" }}
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
      {messageObject[selectedStars] && (
        <p
          className={cn(
            `${messageObject[selectedStars]?.style} font-semibold text-md`
          )}
        >
          {messageObject[selectedStars]?.text}
        </p>
      )}
    </div>
  );
};
