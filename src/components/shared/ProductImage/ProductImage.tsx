'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
    onError?: () => void;
}

const ProductImage = ({ className, onError, alt, ...props }: ProductImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className="relative w-full h-full">
            {/* Shimmer skeleton while loading */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl" />
                    <div
                        className="absolute inset-0 rounded-xl"
                        style={{
                            background:
                                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s ease-in-out infinite',
                        }}
                    />
                    <style jsx>{`
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
                </div>
            )}
            <Image
                className={cn(
                    'transition-opacity duration-300 ease-in-out',
                    isLoaded ? 'opacity-100' : 'opacity-0',
                    className
                )}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                    setHasError(true);
                    setIsLoaded(true);
                    onError?.();
                }}
                {...props}
            />
        </div>
    );
};

export default ProductImage;
