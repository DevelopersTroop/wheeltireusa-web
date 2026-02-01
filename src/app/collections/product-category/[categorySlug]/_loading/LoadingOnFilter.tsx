"use client"
import React, { createContext, useState } from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';

export const LoadingProvider = createContext<{setLoading: React.Dispatch<React.SetStateAction<boolean>>}|null>(null);
const LoadingOnFilter = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <LoadingProvider.Provider value={{setLoading}} >
            {loading ? Array(12).fill(0).map((_, index) => <ProductCardSkeleton key={`widget-filter-loading-${index}`} />) :
                children}
        </LoadingProvider.Provider>
    );
};

export default LoadingOnFilter;