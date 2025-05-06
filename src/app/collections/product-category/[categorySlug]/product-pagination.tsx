'use client';
import Pagination from '@/components/ui/pagination/pagination';
import PaginationItem from '@/components/ui/pagination/pagination-item';
import { ReadonlyURLSearchParams } from 'next/navigation';

// Define the types for the props that will be passed into the ProductPagination component
type ProductPaginationProps = {
  totalPages: number;
  page: number;
  categorySlug: string | string[] | undefined;
  searchParams: URLSearchParams | ReadonlyURLSearchParams;
};

const ProductPagination = ({
  categorySlug,
  page,
  totalPages,
  searchParams,
}: ProductPaginationProps) => {
  const maxVisiblePages = 8; // Set the maximum number of pages to display

  let pagesToShow: (number | string)[] = []; // Initialize an array to store pages to show

  if (totalPages <= maxVisiblePages) {
    // If there are 8 or fewer pages, just show them all
    pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    // If there are more than 8 pages, we need to handle the ellipsis
    if (page <= maxVisiblePages - 1) {
      // If on the first few pages, show the first 8
      pagesToShow = Array.from({ length: maxVisiblePages }, (_, i) => i + 1);
      pagesToShow.push('...'); // Add ellipsis
      pagesToShow.push(totalPages); // Add last page
    } else if (page >= totalPages - (maxVisiblePages - 1)) {
      // If near the end, show the last 8 pages
      pagesToShow.push(1); // Show the first page
      pagesToShow.push('...'); // Add ellipsis
      pagesToShow = pagesToShow.concat(
        Array.from(
          { length: maxVisiblePages },
          (_, i) => totalPages - (maxVisiblePages - 1) + i
        )
      );
    } else {
      // If in the middle, show first few, ellipsis, and current +/-1, and last few pages
      pagesToShow.push(1); // Show the first page
      pagesToShow.push('...'); // Add ellipsis
      pagesToShow = pagesToShow.concat(
        Array.from({ length: 5 }, (_, i) => page - 1 + i) // Show current page +/-1
      );
      pagesToShow.push('...'); // Add ellipsis
      pagesToShow.push(totalPages); // Add last page
    }
  }

  return (
    <>
      <Pagination ariaLabel={'Product Pagination'}>
        <PaginationItem
          key={'previous'}
          href={`/collections/product-category/${categorySlug}/${
            page - 1
          }?${searchParams.toString()}`}
          disabled={page === 1}
          className={page === 1 ? 'not-allowed pointer-events-none' : 'pointer'}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.3335 12.6667L5.3335 8.00008L9.3335 3.33341"
              stroke={page === 1 ? '#D6D6D6' : '#210203'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PaginationItem>
        {pagesToShow.map((item, index) =>
          typeof item === 'number' ? (
            <PaginationItem
              key={'apagination_' + index}
              href={`/collections/product-category/${categorySlug}/${item}?${searchParams.toString()}`}
              active={page === item}
            >
              {item}
            </PaginationItem>
          ) : (
            <PaginationItem key={'ellipsis_' + index} disabled={true} href={''}>
              ...
            </PaginationItem>
          )
        )}
        <PaginationItem
          key={'next'}
          href={`/collections/product-category/${categorySlug}/${
            page + 1
          }?${searchParams.toString()}`}
          disabled={page === totalPages}
          className={
            page === totalPages ? 'not-allowed pointer-events-none' : 'pointer'
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.6665 3.33325L10.6665 7.99992L6.6665 12.6666"
              stroke={page === totalPages ? '#D6D6D6' : '#210203'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default ProductPagination;
