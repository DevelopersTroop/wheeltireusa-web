import { ImageGallery } from '@/components/shared/imageGallery';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import { TInventoryItem } from '@/types/product';
import TireDescription from './TireDescription';
import TireDetails from './tire-details';
import { getProductThumbnail } from '@/utils/product';
import TireSpecifications from './tire-specifications';
import Link from 'next/link';
import TireRating from '@/app/collections/product-category/[categorySlug]/_tires/TireRating';
import ReliableTires from './reliable-tires';
import SameFitmentDifferentGrip from './samefitment-differentgrip';

const Tire = ({ product }: { product: TInventoryItem[] }) => {
  let singleTirePageLink = `/collections/product/${product[0]?.slug}`; // Link to the tire's product page
  if (product.length > 1) {
    singleTirePageLink += `?slug=${product[1]?.slug}`; // Add front tire slug to the link
  }

  console.log('single page product ======= ', product);

  return (
    <div className="container mx-auto px-0 sm:px-4">
      <div className="px-4 sm:px-0 py-4">
        <Breadcrumb>
          <Item href={'/'}>Home</Item>
          <Item href={'/'}>Collection</Item>
          <Item href={`/`}>Tire</Item>
          <Item isEnd={true} href={`/collections/product/${product[0]?.slug}`}>
            {product[0]?.model_group} {product[1]?.model_group ? '&' : ''}{' '}
            {product[1]?.model_group}
          </Item>
        </Breadcrumb>
      </div>

      <div className="flex w-full flex-col gap-4 mt-6 mb-10 lg:flex-row lg:gap-8">
        <div className="px-4 sm:px-0 flex w-full flex-col lg:w-4/6">
          <div className="flex flex-col py-6 gap-4">
            <div className="flex flex-col gap-3 justify-center items-start relative w-full ">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-[#464853] text-lg">
                  {' '}
                  {product[0].brand} {product[1]?.brand}{' '}
                </h1>
                {/* Stock Status */}
                <div className="flex gap-1 items-start relative pr-4">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-1"
                  >
                    <rect x="4" y="4.5" width="8" height="8" fill="white" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.6668 8.49998C14.6668 12.1819 11.6821 15.1666 8.00016 15.1666C4.31826 15.1666 1.3335 12.1819 1.3335 8.49998C1.3335 4.81808 4.31826 1.83331 8.00016 1.83331C11.6821 1.83331 14.6668 4.81808 14.6668 8.49998ZM10.687 6.47976C10.8823 6.67502 10.8823 6.9916 10.687 7.18687L7.35372 10.5202C7.15845 10.7155 6.84187 10.7155 6.64661 10.5202L5.31328 9.18687C5.11801 8.9916 5.11801 8.67502 5.31328 8.47976C5.50854 8.2845 5.82512 8.2845 6.02038 8.47976L7.00016 9.45954L8.49005 7.96965L9.97994 6.47976C10.1752 6.2845 10.4918 6.2845 10.687 6.47976Z"
                      fill={'#04A777'}
                    />
                  </svg>

                  <p className="text-base leading-[19px] text-[#210203]">
                    <span className="text-[#210203] text-base font-normal">
                      {'In Stock'}
                    </span>
                  </p>
                </div>
              </div>
              <h4 className="text-2xl leading-[29px] text-[#210203]">
                <span className="text-[#210203] text-2xl font-bold uppercase">
                  <Link href={singleTirePageLink}>
                    {product[0]?.brand} {product[0]?.model_group}{' '}
                    {product[0]?.tire_size}{' '}
                    {product[0]?.tire_size !== product[1]?.tire_size &&
                    typeof product[1]?.tire_size !== 'undefined'
                      ? `AND ${product[1]?.tire_size}`
                      : ''}
                  </Link>
                </span>
              </h4>
              {/* <TireTypeBadge products={products} />  */}
            </div>
            <TireRating productId={product[0]._id} />
          </div>
          <div className="w-full relative">
            <ImageGallery
              images={Array.from({ length: 6 }).map(() => ({
                src: getProductThumbnail(product[0]),
              }))}
            />
            <div className="absolute top-3 left-0 z-10">
              <span className="bg-[#5762D5] text-white text-base font-semibold px-2 py-2 rounded-md tracking-wide">
                Best Seller
              </span>
            </div>
          </div>
          <TireDescription product={product} />
        </div>

        <div className="mt-6 w-full lg:mt-0 lg:w-2/6">
          <div className="mt-8 rounded-lg bg-[#F7F7F7] py-1">
            <TireSpecifications
              product={product[0]}
              tire={product[1] !== null ? 'Front' : ''}
            />
            {product[1] !== null && (
              <TireSpecifications product={product[1]} tire={'Rear'} />
            )}
            <TireDetails product={product} />
          </div>
        </div>
      </div>
      <ReliableTires />
      <SameFitmentDifferentGrip />
    </div>
  );
};

export default Tire;
