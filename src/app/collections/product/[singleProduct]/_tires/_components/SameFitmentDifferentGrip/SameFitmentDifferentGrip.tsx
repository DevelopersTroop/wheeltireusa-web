import { useGetProductsQuery } from '@/redux/apis/product';
import { getProductThumbnail } from '@/utils/product';
import Image from 'next/image';
import Link from 'next/link';

const SameFitmentDifferentGrip = () => {
  const { data } = useGetProductsQuery({
    size: 4,
    sort: 'Sort by price (high to low)',
  });

  return (
    <div className="flex flex-col gap-6 pt-14 pb-30">
      <div>
        <h1 className="text-2xl font-bold">Same fitment, different grip</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {data?.products.map((tire, index) => {
          let singleTirePageLink = `/collections/product/${tire[0]?.slug}`; // Link to the tire's product page
          if (tire.length > 1) {
            singleTirePageLink += `?slug=${tire[1]?.slug}`; // Add front tire slug to the link
          }

          return (
            <Link href={singleTirePageLink} key={index}>
              <div className="border rounded-[4px] overflow-hidden bg-white text-left">
                <div className="w-full px-4 py-6 flex flex-col ">
                  <div className="w-full flex items-center justify-center">
                    <Image
                      src={getProductThumbnail(tire[0])}
                      alt={tire[0].title || tire[0].description || ''}
                      width={304}
                      height={220}
                      className="w-[304px] h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-6 py-4 px-6">
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-base text-[#464853] font-normal">
                      {/* {tire[0].brand} */} Brand name
                    </p>

                    <h4 className="text-xl font-semibold text-[#212227]">
                      <span className="text-[#210203] text-2xl font-bold uppercase">
                        {tire[0]?.brand} {tire[0]?.model_group}{' '}
                        {tire[0]?.tire_size}{' '}
                        {/* {tire[0]?.tire_size !== tire[1]?.tire_size &&
                                              typeof tire[1]?.tire_size !== 'undefined'
                                                ? `AND ${tire[1]?.tire_size}`
                                                : ''} */}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SameFitmentDifferentGrip;
