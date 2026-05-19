import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const BlogPagination: React.FC<{
  pages: number;
  page: number;
}> = ({ pages, page }) => {
  if (pages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (pages <= maxPagesToShow) {
      for (let i = 1; i <= pages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(pages - 1, page + 1);
      if (page <= 3) endPage = 4;
      if (page >= pages - 2) startPage = pages - 3;
      if (startPage > 2) pageNumbers.push('...');
      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
      if (endPage < pages - 1) pageNumbers.push('...');
      pageNumbers.push(pages);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 py-10">
      {/* Previous */}
      <Link
        href={`/blog?page=${page > 1 ? page - 1 : 1}`}
        aria-disabled={page <= 1}
        tabIndex={page <= 1 ? -1 : 0}
        aria-label="Previous page"
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
          page <= 1
            ? 'text-gray-300 border-gray-100 cursor-not-allowed bg-gray-50'
            : 'text-gray-600 border-gray-200 hover:bg-primary hover:text-white hover:border-primary'
        }`}
      >
        <ChevronLeft size={16} />
        Prev
      </Link>

      {/* Page numbers */}
      {pageNumbers.map((pageNum, index) => (
        <React.Fragment key={index}>
          {pageNum === '...' ? (
            <span className="w-10 h-10 flex items-center justify-center text-gray-400 select-none">
              ···
            </span>
          ) : (
            <Link
              href={`/blog?page=${pageNum}`}
              aria-current={pageNum === page ? 'page' : undefined}
              aria-label={`Page ${pageNum}`}
              className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                pageNum === page
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/30 scale-105'
                  : 'text-gray-600 border-gray-200 hover:bg-primary hover:text-white hover:border-primary'
              }`}
            >
              {pageNum}
            </Link>
          )}
        </React.Fragment>
      ))}

      {/* Next */}
      <Link
        href={`/blog?page=${page < pages ? page + 1 : pages}`}
        aria-disabled={page >= pages}
        tabIndex={page >= pages ? -1 : 0}
        aria-label="Next page"
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
          page >= pages
            ? 'text-gray-300 border-gray-100 cursor-not-allowed bg-gray-50'
            : 'text-gray-600 border-gray-200 hover:bg-primary hover:text-white hover:border-primary'
        }`}
      >
        Next
        <ChevronRight size={16} />
      </Link>
    </div>
  );
};
