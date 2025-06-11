'use client';

import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import { useGetProductsQuery } from '@/redux/apis/product';
import { TInventoryItem } from '@/types/product';
import { useParams, useSearchParams } from 'next/navigation';
import useFilter from '../_filters/filter-store/use-filter';
import SidebarTireFilters from '../_filters/mobile-filters/sidebar-tire-filters';
import TireFilters from '../_filters/tire-filters';
import ProductCardSkeleton from '../_loading/product-card-skeleton';
import NoProductsFound from '../no-products-found';
import ProductPagination from '../product-pagination';
import TireCard from './TireCard';
import TireFilterAndSort from './TireFilterAndSort';

// Type definition for page props, optional page parameter
type ProductsPageProps = {
  page?: number;
};

const tireProducts: TInventoryItem[][] = [
  [
    {
      _id: '6835714eceef664ee7629685',
      title: 'Venom Power 275/35ZR24  106W XL Ragnarok GTS',
      slug: 'venom-power-275-35zr24-106w-xl-ragnarok-gts-cvpgts37',
      item_class: 'Tire',
      brand: 'Venom Power',
      model_group: 'Ragnarok GTS',
      load_rating: 'XL',
      raw_size: '2753524',
      width: '275',
      tire_size: '275/35ZR24',
      aspect_ratio: '35',
      diameter: '24',
      ship_weight: '42.8',
      item_image: 'ns-products/sspszlaiomcg_1748877121268.png',
      // original_image:
      //   'https://4520456.app.netsuite.com/core/media/media.nl?id=6534931&c=4520456&h=zAuBhp-uY3AN8asoJeJ-JLf3R-rn2VoL5UARwYphcz2czId_',
      // gallery_images: [],
      stock_available: true,
      msrp: 0,
      price: 160.38,
      inventory_available: 100,
      // terrain: 'Street',
      spoke_style: [],
      tire_type: ['Ultra High Performance (UHP)'],
      // meta: '2753524',
      speed_rating: 'W',
      sidewall: 'BLK',
      load_index: '106',
      approved_rim_contours: '9.0-11.0',
      // tread_depth_32nds: '10.1',
      std_rim: '9 1/2J',
      sort_price: 160.38,
      // dually: false,
      // passenger: false,
      // manual: false,
      imageUploaded: true,
      transferImage: false,
      renderedImages: [],
      categoryId: '682db270759498df6822fb7c',
      // isDelete: false,
      createdAt: '2025-05-27T08:01:18.704Z',
      updatedAt: '2025-06-10T08:01:07.237Z',
      images: [],
      map: 0,
      comparedData: [],
      category: {
        _id: '682db270759498df6822fb7c',
        title: 'Tire',
        slug: 'tire',
      },
      description: '',
      partnumber: '',
    },
    {
      _id: '6835714eceef664ee762968b',
      title: 'Venom Power 255/30ZR20  92W XL Ragnarok GTS',
      slug: 'venom-power-255-30zr20-92w-xl-ragnarok-gts-cvpgts26',
      item_class: 'Tire',
      brand: 'Venom Power',
      model_group: 'Ragnarok GTS',
      load_rating: 'XL',
      raw_size: '2553020',
      width: '255',
      tire_size: '255/30ZR20',
      aspect_ratio: '30',
      diameter: '20',
      ship_weight: '28.4',
      item_image: 'ns-products/gvyovsqlldex_1748877060941.png',
      // original_image:
      //   'https://4520456.app.netsuite.com/core/media/media.nl?id=6534931&c=4520456&h=zAuBhp-uY3AN8asoJeJ-JLf3R-rn2VoL5UARwYphcz2czId_',
      // gallery_images: [],
      stock_available: true,
      msrp: 0,
      price: 108.59,
      inventory_available: 100,
      // terrain: 'Street',
      spoke_style: [],
      tire_type: ['Ultra High Performance (UHP)'],
      // meta: '2553020',
      speed_rating: 'W',
      sidewall: 'BLK',
      load_index: '92',
      approved_rim_contours: '8.5-9.5',
      // tread_depth_32nds: '10.1',
      std_rim: '9J',
      sort_price: 108.59,
      // dually: false,
      // passenger: false,
      // manual: false,
      imageUploaded: true,
      transferImage: false,
      renderedImages: [],
      categoryId: '682db270759498df6822fb7c',
      // isDelete: false,
      createdAt: '2025-05-27T08:01:18.707Z',
      updatedAt: '2025-06-10T08:01:07.223Z',
      images: [],
      map: 0,
      comparedData: [],
      category: {
        _id: '682db270759498df6822fb7c',
        title: 'Tire',
        slug: 'tire',
      },
      description: '',
      partnumber: '',
    },
  ],
  [
    {
      _id: '6835714eceef664ee76296a1',
      title: 'Venom Power 33X13.50R24LT 12PR 113S Ragnarok GTS',
      slug: 'venom-power-33x1350r24lt-12pr-113s-ragnarok-gts-cvpgts21',
      item_class: 'Tire',
      brand: 'Venom Power',
      model_group: 'Ragnarok GTS',
      raw_size: '33135024',
      width: '33',
      tire_size: '33X13.50R24LT',
      aspect_ratio: '13.50',
      diameter: '24',
      ship_weight: '58.4',
      item_image: 'ns-products/rhtsmxihpmsd_1748877541295.png',
      // original_image:
      //   'https://4520456.app.netsuite.com/core/media/media.nl?id=6534931&c=4520456&h=zAuBhp-uY3AN8asoJeJ-JLf3R-rn2VoL5UARwYphcz2czId_',
      // gallery_images: [],
      stock_available: true,
      msrp: 0,
      price: 358.99,
      inventory_available: 100,
      // terrain: 'Street',
      spoke_style: [],
      tire_type: ['Ultra High Performance (UHP)'],
      // meta: '33135024',
      speed_rating: 'S',
      sidewall: 'BLK',
      load_index: '113',
      ply: '12PR',
      approved_rim_contours: '11.5-13.0',
      // tread_depth_32nds: '13.9',
      std_rim: '12J',
      sort_price: 358.99,
      // dually: false,
      // passenger: false,
      // manual: false,
      imageUploaded: true,
      transferImage: false,
      renderedImages: [],
      categoryId: '682db270759498df6822fb7c',
      // isDelete: false,
      createdAt: '2025-05-27T08:01:18.722Z',
      updatedAt: '2025-06-02T15:19:01.474Z',
      images: [],
      map: 0,
      comparedData: [],
      category: {
        _id: '682db270759498df6822fb7c',
        title: 'Tire',
        slug: 'tire',
      },
      description: '',
      partnumber: '',
    },
  ],
];

const TireCategory = ({ page = 1 }: ProductsPageProps) => {
  const searchParams = useSearchParams(); // Accessing search parameters from the URL
  const { categorySlug } = useParams(); // Getting the category slug from the URL parameters
  const { filters } = useFilter();
  const { data, isLoading, isFetching } = useGetProductsQuery(
    { page, category: 'tire', ...filters },
    { refetchOnMountOrArgChange: true }
  );

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
        <div className="w-full min-[1300px]:hidden pb-3 pt-1 lg:pt-3">
          <SidebarTireFilters>
            <TireFilters />
          </SidebarTireFilters>
        </div>
        {/* Main content layout */}
        <div className="flex w-full gap-8 pt-2 lg:pt-0">
          {/* Filters section (visible on large screens) */}
          <div className={'hidden min-[1300px]:block min-[1300px]:w-[304px]'}>
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
          {isLoading || isFetching ? (
            <div
              className={
                'w-full min-[1300px]:w-3/4 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min pt-16'
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
                <div className="hidden min-[1300px]:block py-3">
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
                <div className="hidden min-[1300px]:block py-3">
                  <TireFilterAndSort />
                </div>
                <div className={'w-full flex flex-col gap-y-4'}>
                  {/* {data?.products.map((product) => (
                    <ProductCard product={products} key={product.slug} />
                  ))} */}
                  {tireProducts.map((product) => {
                    return (
                      <TireCard
                        key={product[0]._id}
                        products={product}
                        wheelInfo={{
                          frontForging: '',
                          rearForging: '',
                          hasDually: false,
                          hasOffRoad: false,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
        {/* Pagination */}
        {data?.products && (
          <div className={'flex flex-row-reverse w-full pt-8'}>
            <div className={'w-full min-[1300px]:w-3/4 text-center'}>
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
