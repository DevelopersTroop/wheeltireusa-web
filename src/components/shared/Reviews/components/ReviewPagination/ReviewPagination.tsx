import React from 'react';
import { cn } from '@/lib/utils'; // class merging utility

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 4) pages.push('...');
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 3) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex gap-2 justify-center mt-6 items-center flex-wrap">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={cn(
                    'px-3 py-1 rounded border text-sm',
                    currentPage === 1
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                )}
            >
                Prev
            </button>

            {getPageNumbers().map((p, i) =>
                typeof p === 'number' ? (
                    <button
                        key={i}
                        onClick={() => onPageChange(p)}
                        className={cn(
                            'px-3 py-1 rounded border text-sm font-medium',
                            currentPage === p
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        )}
                    >
                        {p}
                    </button>
                ) : (
                    <span key={i} className="px-2 text-gray-400 select-none">
                        ...
                    </span>
                )
            )}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={cn(
                    'px-3 py-1 rounded border text-sm',
                    currentPage === totalPages
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                )}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
