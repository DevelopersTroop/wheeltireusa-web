import { FC } from 'react';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
    rating: number;
    maxStars?: number;
    size?: number;
    className?: string;
}

export const StarRating: FC<StarRatingProps> = ({
    rating,
    maxStars = 5,
    size = 24,
    className = '',
}) => {
    return (
        <div className={`flex ${className}`}>
            {Array.from({ length: maxStars }).map((_, i) => {
                const starValue = i + 1;
                const isFull = rating >= starValue;
                const isHalf = rating >= starValue - 0.5 && rating < starValue;

                return (
                    <span
                        key={i}
                        className={cn(`relative inline-block w-[${size}px] h-[${size}px]`)}
                    >
                        {/* Base gray star */}
                        <StarIcon size={size} className="text-[#9e9e9e] fill-[#9e9e9e]" />

                        {/* Overlay for full or half yellow star */}
                        {(isFull || isHalf) && (
                            <div
                                className="absolute top-0 left-0 h-full overflow-hidden"
                                style={{ width: isHalf ? '50%' : '100%' }}
                            >
                                <StarIcon
                                    size={size}
                                    className="text-yellow-500 fill-yellow-500"
                                />
                            </div>
                        )}
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;
