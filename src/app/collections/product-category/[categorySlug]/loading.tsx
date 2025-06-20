// Import necessary components for the page layout and skeleton loading
import ProductCardSkeleton from './_loading/ProductCardSkeleton';
import FilterLoadingSkeleton from './_loading/FilterLoadingSkeleton';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';

// Define the types for the props expected by the ProductCategory component
type ProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ categorySlug: string }>;
  page?: number;
};

// The ProductCategory component renders a page with breadcrumb, filters, and product cards
const ProductCategory = async ({
  searchParams,
  params,
  page = 1,
}: ProductsPageProps) => {
  console.log('searchParams', searchParams);
  console.log('params', params);
  console.log('page', page);

  return (
    <Container>
      {/* Breadcrumb navigation for the page */}
      <Breadcrumb>
        <Item href={'#'}>Home</Item>
        <Item href={'#'}>Collection</Item>
        <Item href={'#'} isEnd={true}>
          Tire
        </Item>
      </Breadcrumb>
      {/* Main content section, split into filter and product grid */}
      <div className="flex w-full gap-6 pt-6">
        {/* Filter sidebar - hidden on smaller screens */}
        <div className={'hidden lg:block lg:w-1/4'}>
          <FilterLoadingSkeleton />
        </div>
        {/* Product grid section - displays product card skeletons */}
        <div
          className={
            'w-full lg:w-3/4 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min'
          }
        >
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <ProductCardSkeleton key={`product-card-loading-${index}`} />
            ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductCategory;
