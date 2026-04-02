import StarRating from '../StarRating/StarRating';
import { useGetReviewsQuery } from '@/redux/apis/reviews';
import React from 'react';

export const ProductCardRating: React.FC<{ productId: number }> = ({ productId }) => {
    const { data } = useGetReviewsQuery(
        { productId, page: 1 },
        { skip: !productId }
    );
if (!data?.average || !data.count) return null;
    return (
        <div className="flex items-center gap-2">
            <StarRating size={14} rating={data?.average || 0} />
            <span className="text-xs text-gray-600">
                {data?.count || 0} review{data.count !== 1 ? 's' : ''}
            </span>
        </div>
    );
};

