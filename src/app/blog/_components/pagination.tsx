import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const BlogPagination: React.FC<{
  pages: number;
  page: number;
}> = ({ pages, page }) => {
  // No pagination needed if there's only one page
  if (pages <= 1) {
    return null;
  }

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show at most 5 page numbers

    if (pages <= maxPagesToShow) {
      // If total pages <= 5, show all pages
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end page numbers to show
      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(pages - 1, page + 1);

      // Adjust when near the beginning
      if (page <= 3) {
        endPage = 4;
      }

      // Adjust when near the end
      if (page >= pages - 2) {
        startPage = pages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < pages - 1) {
        pageNumbers.push('...');
      }

      // Always include last page
      pageNumbers.push(pages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 py-8">
      {/* Previous button */}
      <Link
        href={`/blog?page=${page > 1 ? page - 1 : 1}`}
        className={`flex items-center justify-center w-10 h-10 rounded-full border ${
          page <= 1
            ? 'text-gray-300 border-gray-200 cursor-not-allowed'
            : 'text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
        aria-disabled={page <= 1}
        tabIndex={page <= 1 ? -1 : 0}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </Link>

      {/* Page numbers */}
      {pageNumbers.map((pageNum, index) => (
        <React.Fragment key={index}>
          {pageNum === '...' ? (
            <span className="w-10 h-10 flex items-center justify-center">
              ...
            </span>
          ) : (
            <Link
              href={`/blog?page=${pageNum}`}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                pageNum === page
                  ? 'bg-primary text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-current={pageNum === page ? 'page' : undefined}
              aria-label={`Page ${pageNum}`}
            >
              {pageNum}
            </Link>
          )}
        </React.Fragment>
      ))}

      {/* Next button */}
      <Link
        href={`/blog?page=${page < pages ? page + 1 : pages}`}
        className={`flex items-center justify-center w-10 h-10 rounded-full border ${
          page >= pages
            ? 'text-gray-300 border-gray-200 cursor-not-allowed'
            : 'text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
        aria-disabled={page >= pages}
        tabIndex={page >= pages ? -1 : 0}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </Link>
    </div>
  );
};
