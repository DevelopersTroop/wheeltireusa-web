import React from 'react';
import { cn } from '@/lib/utils'; // class merging utility
import { getPageNumbers, PaginationProps } from './utils/pagination';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
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

      {getPageNumbers(currentPage, totalPages).map((p, i) =>
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
