import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export const SimilaPostsPagination: React.FC<{
    pages: number,
    page: number,
    setPage: (page: number) => void
}> = ({ pages, page, setPage }) => {
    // No pagination needed if there's only one page
    if (pages <= 1) {
        return null;
    }

    // Generate array of page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = [];
        // Show fewer pages on mobile
        const maxPagesToShow = window.innerWidth < 640 ? 3 : 5;

        if (pages <= maxPagesToShow) {
            // If total pages <= maxPagesToShow, show all pages
            for (let i = 1; i <= pages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always include first page
            pageNumbers.push(1);

            // Calculate start and end page numbers to show
            let startPage = Math.max(2, page - Math.floor((maxPagesToShow - 3) / 2));
            let endPage = Math.min(pages - 1, page + Math.floor((maxPagesToShow - 3) / 2));

            // Adjust when near the beginning
            if (page <= Math.floor(maxPagesToShow / 2)) {
                endPage = maxPagesToShow - 1;
            }

            // Adjust when near the end
            if (page >= pages - Math.floor(maxPagesToShow / 2)) {
                startPage = pages - (maxPagesToShow - 1);
            }

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pageNumbers.push("...");
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis before last page if needed
            if (endPage < pages - 1) {
                pageNumbers.push("...");
            }

            // Always include last page
            pageNumbers.push(pages);
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 py-4 sm:py-6 md:py-8 overflow-x-auto px-2">
            {/* Previous button */}
            <button
                onClick={() => setPage(page > 1 ? page - 1 : 1)}
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border ${
                    page <= 1 
                        ? "text-gray-300 border-gray-200 cursor-not-allowed" 
                        : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                disabled={page <= 1}
                aria-disabled={page <= 1}
                tabIndex={page <= 1 ? -1 : 0}
                aria-label="Previous page"
            >
                <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>

            {/* Page numbers */}
            {pageNumbers.map((pageNum, index) => (
                <React.Fragment key={index}>
                    {pageNum === "..." ? (
                        <span className="w-6 h-8 sm:w-8 sm:h-10 flex items-center justify-center text-sm sm:text-base">...</span>
                    ) : (
                        <button
                            onClick={() => setPage(parseInt(pageNum as string))}
                            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base ${
                                pageNum === page
                                    ? "bg-primary text-white font-medium"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                            aria-current={pageNum === page ? "page" : undefined}
                            aria-label={`Page ${pageNum}`}
                        >
                            {pageNum}
                        </button>
                    )}
                </React.Fragment>
            ))}

            {/* Next button */}
            <button
                onClick={() => setPage(page < pages ? page + 1 : pages)}
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border ${
                    page >= pages 
                        ? "text-gray-300 border-gray-200 cursor-not-allowed" 
                        : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                disabled={page >= pages}
                aria-disabled={page >= pages}
                tabIndex={page >= pages ? -1 : 0}
                aria-label="Next page"
            >
                <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
        </div>
    );
};