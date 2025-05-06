'use client';
import React, { createContext, useState } from 'react';
import ProductCardSkeleton from './product-card-skeleton';

// Create a context to manage loading state globally
export const LoadingProvider = createContext<{
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

// LoadingOnFilter component manages loading state and displays skeleton loaders while data is being fetched
const LoadingOnFilter = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false); // State to track loading status
  return (
    <LoadingProvider.Provider value={{ setLoading }}>
      {' '}
      {/* Provide setLoading function to child components */}
      {loading
        ? Array(12)
            .fill(0)
            .map((_, index) => (
              <ProductCardSkeleton key={`widget-filter-loading-${index}`} />
            ))
        : children}
    </LoadingProvider.Provider>
  );
};

export default LoadingOnFilter;
