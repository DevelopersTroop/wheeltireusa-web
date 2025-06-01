'use client';

import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import { TInventoryItem } from '@/types/product';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SidebarTireFilters from '../_filters/mobile-filters/sidebar-tire-filters';
import TireFilters from '../_filters/tire-filters';
import ProductCardSkeleton from '../_loading/product-card-skeleton';
import NoProductsFound from '../no-products-found';
import ProductPagination from '../product-pagination';
import TireCard from './tire-card';
import TireFilterAndSort from './tire-filter-and-sort';

const mockData: {
  pages: number;
  total: number;
  products: TInventoryItem[];
} = {
  pages: 1,
  total: 6,
  products: [
    {
      internal_id: 'TI-001',
      slug: 'front-tire-123',
      name: 'Michelin Pilot Sport Front',
      title: 'Michelin Pilot Sport 225/45R17',
      item_type: 'tire',
      item_class: 'performance',
      brand: 'Michelin',
      model_group: 'Pilot Sport',
      category: { _id: 'cat1', title: 'Tires', slug: 'tires' },
      forging_style: 'Standard',
      wheel_size: '17',
      wheel_diameter: '17',
      wheel_width: '7.5',
      finish: 'Black',
      lip_size: '1.0',
      offset: '35',
      bolt_pattern_1: '5x114.3',
      bolt_pattern_2: '',
      centerbore: '66.1',
      load_rating: '1200',
      xfactor: 'N/A',
      yfactor: 'N/A',
      backspacing: '5.5',
      raw_size: '225/45R17',
      tire_width: '225',
      tire_aspect_ratio: '45',
      tire_diameter: '17',
      ship_weight: '22',
      ship_width: '9',
      ship_height: '25',
      ship_depth: '25',
      purchase_description: 'High performance summer tire.',
      short_description: 'Great grip and handling.',
      item_image: 'ns-products/tire.webp',
      msrp: 200,
      price: 180,
      inventory_available: 10,
      build_available: 'yes',
      steering_wheel_addon_options_1: '',
      steering_wheel_addon_options_2: '',
      steering_wheel_addon_options_3: '',
      terrain: { text: 'Street', value: 'street' },
      blank_bolt_patterns: '',
      design_type: 'asymmetric',
      style: 'sport',
      dually: false,
      finish_type: 'matte',
      suspension_type: 'standard',
      tire_type: [
        { text: 'Summer', value: 'summer' },
        { text: 'Performance', value: 'performance' },
      ],
      speed_rating: 'Y',
      sidewall: 'Black',
      tire_load_index: '91',
      tire_max_load_lbs: '1356',
      tire_max_load_lbs_2: '',
      tire_max_load_kg: '615',
      tire_max_load_kg_2: '',
      ply: '4',
      approved_rim_contours: '7-8.5',
      tread_depth_32nds: '10',
      tread_depth_mm: '8',
      std_rim: '7.5',
      max_air_pressure_kpa: '300',
      max_air_pressure_psi: '44',
      tire_size: '225/45R17',
      seo_description:
        'Michelin Pilot Sport 225/45R17 summer tire for performance vehicles.',
      front_size: '225/45R17',
      rear_size: '',
      front_diameter: '17',
      front_width: '225',
      rear_diameter: '',
      rear_width: '',
      dealer_price: '160',
    },
    {
      internal_id: 'TI-002',
      slug: 'rear-tire-456',
      name: 'Michelin Pilot Sport Rear',
      title: 'Michelin Pilot Sport 245/40R17',
      item_type: 'tire',
      item_class: 'performance',
      brand: 'Michelin',
      model_group: 'Pilot Sport',
      category: { _id: 'cat1', title: 'Tires', slug: 'tires' },
      forging_style: 'Standard',
      wheel_size: '17',
      wheel_diameter: '17',
      wheel_width: '8.5',
      finish: 'Black',
      lip_size: '1.2',
      offset: '40',
      bolt_pattern_1: '5x114.3',
      bolt_pattern_2: '',
      centerbore: '66.1',
      load_rating: '1300',
      xfactor: 'N/A',
      yfactor: 'N/A',
      backspacing: '6.0',
      raw_size: '245/40R17',
      tire_width: '245',
      tire_aspect_ratio: '40',
      tire_diameter: '17',
      ship_weight: '24',
      ship_width: '10',
      ship_height: '25',
      ship_depth: '25',
      purchase_description: 'Rear performance tire for sporty driving.',
      short_description: 'Enhanced rear traction.',
      item_image: 'tires/michelin-pilot-sport-rear.png',
      msrp: 220,
      price: 200,
      inventory_available: 8,
      build_available: 'yes',
      steering_wheel_addon_options_1: '',
      steering_wheel_addon_options_2: '',
      steering_wheel_addon_options_3: '',
      terrain: { text: 'Street', value: 'street' },
      blank_bolt_patterns: '',
      design_type: 'asymmetric',
      style: 'sport',
      dually: false,
      finish_type: 'matte',
      suspension_type: 'standard',
      tire_type: [
        { text: 'Summer', value: 'summer' },
        { text: 'Performance', value: 'performance' },
      ],
      speed_rating: 'Y',
      sidewall: 'Black',
      tire_load_index: '95',
      tire_max_load_lbs: '1521',
      tire_max_load_lbs_2: '',
      tire_max_load_kg: '690',
      tire_max_load_kg_2: '',
      ply: '4',
      approved_rim_contours: '8-9.5',
      tread_depth_32nds: '10',
      tread_depth_mm: '8',
      std_rim: '8.5',
      max_air_pressure_kpa: '300',
      max_air_pressure_psi: '44',
      tire_size: '245/40R17',
      seo_description:
        'Michelin Pilot Sport 245/40R17 rear summer tire for performance vehicles.',
      front_size: '',
      rear_size: '245/40R17',
      front_diameter: '',
      front_width: '',
      rear_diameter: '17',
      rear_width: '245',
      dealer_price: '180',
    },
  ],
};

// Type definition for page props, optional page parameter
type ProductsPageProps = {
  page?: number;
};

const TireCategory = ({ page = 1 }: ProductsPageProps) => {
  const searchParams = useSearchParams(); // Accessing search parameters from the URL
  const { categorySlug } = useParams(); // Getting the category slug from the URL parameters
  //   const { getProducts } = useProductFetch();
  // Update loading status when product data is fetched
  //   const isLoading = false;
  //   const { isLoading, data } = useGetProductQuery(getProducts(categorySlug as string, page).raw, {
  //     refetchOnMountOrArgChange: true
  //   })

  const useGetProductQuery = (data: typeof mockData) => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<TInventoryItem[]>([]);
    const [pages, setPages] = useState<number>(1);

    useEffect(() => {
      setIsLoading(true);
      const fetchData = async () => {
        // Simulate fetching data
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second loading time
        setProducts(data.products || []);
        setPages(data.pages || 1);
        setIsLoading(false);
      };

      fetchData();

      return () => {
        setProducts([]);
        setPages(1);
        setIsLoading(false);
      }; // Cleanup on unmount
    }, [data]);

    return {
      isLoading,
      data: {
        products,
        pages,
      },
    };
  };

  const { isLoading, data } = useGetProductQuery(mockData);

  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/collections/product-category/${categorySlug}`}>
                Collection
              </Item>
              <Item
                href={`/collections/product-category/${categorySlug}`}
                isEnd={true}
              >
                Tires
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      <div className="max-w-[1450px] mx-auto w-full px-5 lg:px-16 pb-20 lg:pb-30 pt-3">
        {/* Mobile filter sidebar */}
        <div className="w-full lg:hidden pb-3 pt-1 lg:pt-3">
          <SidebarTireFilters>
            <TireFilters />
          </SidebarTireFilters>
        </div>
        {/* Main content layout */}
        <div className="flex w-full gap-8 pt-2 lg:pt-0">
          {/* Filters section (visible on large screens) */}
          <div className={'hidden lg:block lg:w-[304px]'}>
            <div className="pt-[22px] pb-5">
              <p className="text-base leading-[19px] text-[#504949]">
                <span className="text-[#504949] text-base font-normal">
                  Filters
                </span>
              </p>
            </div>
            <TireFilters />
          </div>
          {/* Product loading state or product data */}
          {isLoading ? (
            <div
              className={
                'w-full lg:w-3/4 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min pt-16'
              }
            >
              {Array(12)
                .fill(0)
                .map((_, index) => (
                  <ProductCardSkeleton key={`product-card-loading-${index}`} />
                ))}
            </div>
          ) : data?.products?.length === 0 ? (
            <>
              {/* Display message when no products are found */}
              <div className="w-full flex flex-col">
                <div className="hidden lg:block py-3">
                  <TireFilterAndSort />
                </div>
                <NoProductsFound />{' '}
                {/* Component to show when no products are found */}
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                {/* Display products if available */}
                <div className="hidden lg:block py-3">
                  <TireFilterAndSort />
                </div>
                <div className={'w-full'}>
                  {/* {data?.products.map((product) => (
                    <ProductCard product={products} key={product.slug} />
                  ))} */}
                  {
                    <TireCard
                      products={data?.products || []}
                      wheelInfo={{
                        frontForging: '',
                        rearForging: '',
                        hasDually: false,
                        hasOffRoad: false,
                      }}
                      cartPackage={searchParams.get('cartPackage') || null}
                    />
                  }
                </div>
              </div>
            </>
          )}
        </div>
        {/* Pagination */}
        {data?.products && (
          <div className={'flex flex-row-reverse w-full pt-8'}>
            <div className={'w-full lg:w-3/4 text-center'}>
              <ProductPagination
                searchParams={new URLSearchParams(searchParams)}
                categorySlug={categorySlug}
                totalPages={data?.pages}
                page={page}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TireCategory;
