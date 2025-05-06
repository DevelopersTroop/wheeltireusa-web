// Importing necessary components and utilities
import Container from '@/components/ui/container/container';
import ProductCardSkeleton from './product-category/[categorySlug]/_loading/product-card-skeleton';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';

// Defining the ProductCategory component as an async function
const ProductCategory = async () => {
  // Main container for the product category page
  return (
    <Container>
      {/* Breadcrumb component to display the navigation path */}
      <Breadcrumb>
        <Item href={'#'}>Home</Item>
        <Item href={'#'}>Collection</Item>
        <Item href={'#'} isEnd={true}>
          Tires
        </Item>
      </Breadcrumb>
      {/* Layout for the page's content */}
      <div className="flex w-full gap-6 pt-12">
        {/* Sidebar, hidden on smaller screens, with skeleton loaders */}
        <div className={'hidden lg:block lg:w-1/4 mt-2'}>
          <div>
            {/* Skeleton loaders to simulate content loading */}
            <div className="animate-color-pulse w-4/5 h-6 rounded-xl"></div>
            <div className="animate-color-pulse mt-6 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
          </div>
          {/* Another section with skeleton loaders */}
          <div className="mt-6">
            <div className="animate-color-pulse w-4/5 h-6 rounded-xl"></div>
            <div className="animate-color-pulse mt-6 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
          </div>
          {/* Another section with skeleton loaders */}
          <div className="mt-6">
            <div className="animate-color-pulse w-4/5 h-6 rounded-xl"></div>
            <div className="animate-color-pulse mt-6 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
            <div className="animate-color-pulse mt-3 w-2/4 h-3 rounded-xl"></div>
          </div>
        </div>
        {/* Main content area displaying the skeleton loader for product cards */}
        <div
          className={
            'w-full lg:w-3/4 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min'
          }
        >
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <ProductCardSkeleton key={`collection-loading-${index}`} />
            ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductCategory;
