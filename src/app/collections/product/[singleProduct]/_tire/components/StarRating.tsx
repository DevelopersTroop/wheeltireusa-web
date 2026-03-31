"use client";

import React from "react";

interface StarRatingProps {
  rating: number;
  count: number;
}

export const StarRating = ({ rating, count }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-base leading-none ${i < Math.floor(rating) ? "text-amber-400" : "text-gray-200"}`}
          >★</span>
        ))}
      </div>
      <span className="text-sm font-bold text-gray-900">{rating.toFixed(1)}</span>
      <span className="text-xs text-blue-600 underline cursor-pointer">({count})</span>
    </div>
  );
};
