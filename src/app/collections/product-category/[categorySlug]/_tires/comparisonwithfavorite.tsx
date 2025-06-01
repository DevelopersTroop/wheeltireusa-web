import Link from 'next/link';
import React from 'react';

const ComparisonWithFavorite = () => {
  return (
    <div className="w-full flex flex-1 flex-row gap-4   ">
      <div className="text-base text-[#212227] underline whitespace-nowrap">
        <Link href="/collections/product-category/tires">
          Add to comparison
        </Link>
      </div>
      <div className="text-base text-[#212227] underline whitespace-nowrap">
        <Link href="/collections/product-category/tires">
          Save to favorites
        </Link>
      </div>
    </div>
  );
};

export default ComparisonWithFavorite;
