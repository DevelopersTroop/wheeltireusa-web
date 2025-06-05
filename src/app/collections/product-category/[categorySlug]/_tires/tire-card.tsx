import DeliveryWithStock from '@/app/cart/_components/delivery-with-stock';
import PaymentMessaging from '@/components/shared/payment-method-messaging';
import { TInventoryItem } from '@/types/product';
import { getPrice } from '@/utils/price';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import ComparisonWithFavorite from './comparisonwithfavorite';
import PriceSet from './price-set';
import TireAttributes from './tire-attributes';
import TireCardButton from './tire-card-button';
import TireCardPrice from './tire-card-price';
import TireQuantity from './tire-quantity';
import TireRating from './tire-rating';

const TireCard = ({
  products,
  wheelInfo,
}: {
  products: TInventoryItem[];
  wheelInfo: {
    frontForging: string;
    rearForging: string;
    hasDually: boolean;
    hasOffRoad: boolean;
  };
}) => {
  const isSquare = products.length === 1; // Check if the tire set is square (all tires same size)
  const frontTireQuantity =
    wheelInfo.rearForging === 'Dually' && isSquare ? 6 : isSquare ? 4 : 2; // Determine front tire quantity based on the wheel type
  const rearTireQuantity =
    wheelInfo.rearForging === 'Dually' && !isSquare ? 4 : !isSquare ? 2 : 0; // Determine rear tire quantity based on the wheel type

  const singleTirePageLink = `/collections/product/${products[0]?.slug}`; // Link to the tire's product page

  // if (products[1]) {
  //   // If a second tire exists (for non-square sets)
  //   singleTirePageLink += `&rearTire=${products[1].slug}`;
  // }

  const totalPrice = useMemo(() => {
    const frontPrice = getPrice(products[0]?.msrp, products[0]?.price)?.toFixed(
      2
    );
    const rearPrice = getPrice(products[1]?.msrp, products[1]?.price)?.toFixed(
      2
    );

    let totalPrice = Number(frontPrice) * frontTireQuantity;
    // Check if rearPrice is a valid number before adding to totalPrice
    if (!Number.isNaN(Number(rearPrice))) {
      totalPrice += Number(rearPrice) * rearTireQuantity;
    }
    return totalPrice;
  }, [products, rearTireQuantity, frontTireQuantity]);

  return (
    <div className="overflow-hidden rounded-xl border border-[#cfcfcf] flex flex-col gap-0 self-stretch relative w-full bg-white">
      <div className="px-5 py-6 flex flex-col gap-4 justify-center items-start relative w-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-[#464853] text-lg">Brand Name</h1>
          <button className="border border-[#CCC9CF] px-3 py-2 rounded-md text-[14px]">
            Grand Touring Summer
          </button>
        </div>
        <h4 className="text-2xl leading-[29px] text-[#210203]">
          <span className="text-[#210203] text-2xl font-bold uppercase">
            <Link href={singleTirePageLink}>
              {products[0]?.brand} {products[0]?.model} {products[0]?.tire_size}{' '}
              {products[0]?.tire_size !== products[1]?.tire_size &&
              typeof products[1]?.tire_size !== 'undefined'
                ? `AND ${products[1]?.tire_size}`
                : ''}
            </Link>
          </span>
        </h4>
        {/* <TireTypeBadge products={products} />  */}
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 w-full px-5 sm:pb-2">
        <TireRating />
        <ComparisonWithFavorite />
      </div>
      <div className="pl-5 pr-0 flex flex-col md:flex-row gap-6 self-stretch w-full">
        <div className="w-full h-full sm:w-auto my-auto flex justify-center items-center  ">
          {/* <div className='flex flex-row justify-between w-full'>
            <TireRating />
            <ComparisonWithFavorite/>
          </div> */}
          <Link href={singleTirePageLink}>
            <div className=" w-full flex justify-center items-center relative">
              {/* Display tire image */}
              <Image
                className="max-w-[272px] max-h-[272px] object-contain"
                src={products[0].image_url}
                width={272}
                height={272}
                alt={products[0]?.partnumber ?? ''}
              />
            </div>
          </Link>
        </div>
        <div className="w-full flex flex-col gap-4 justify-center items-start flex-1 relative">
          <div className="py-5 flex flex-col gap-10 justify-center items-start self-stretch relative w-full">
            <div className="flex flex-col gap-4 justify-center items-start self-stretch relative w-full">
              <div className="pl-0 pr-4 flex justify-between gap-4 items-center self-stretch relative w-full">
                <div className="flex flex-col gap-2 items-start relative">
                  <h5 className="text-xl leading-6 bg-[#F6511D] px-3 py-1 rounded-md text-white">
                    <span className="text-white text-xl font-semibold">
                      {isSquare ? 'Front & Rear' : 'Front'}
                    </span>
                  </h5>
                  {/* <StockBadge /> */}
                </div>
                {/* <TireQuantity quantity={frontTireQuantity} /> */}
              </div>

              <Link href={singleTirePageLink} className="block">
                <TireAttributes product={products[0] as TInventoryItem} />
              </Link>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 w-full pr-4">
              <div>
                {/* <StockBadge /> */}
                <DeliveryWithStock deliveryTime="Monday, 05/22" />
              </div>
              <div className="flex flex-row items-center w-full">
                <TireQuantity quantity={frontTireQuantity} />
                <TireCardPrice
                  price={getPrice(
                    products[0]?.msrp,
                    products[0]?.price
                  )?.toFixed(2)}
                />
              </div>
            </div>
          </div>

          {!isSquare ? (
            <>
              {/* If not square, display rear tire details */}
              <div className="border-t border-[#cfcfcf] py-5 flex flex-col gap-10 justify-center items-start self-stretch relative w-full">
                <div className="flex flex-col gap-4 justify-center items-start self-stretch relative w-full">
                  <div className="pl-0 pr-4 flex justify-between items-center self-stretch relative w-full">
                    <div className="flex flex-col gap-2 items-start relative">
                      <h5 className="text-xl leading-6 bg-[#F6511D] px-3 py-1 rounded-md text-white">
                        <span className="text-white text-xl font-semibold">
                          Rear
                        </span>
                      </h5>
                      {/* <StockBadge />  */}
                    </div>
                    {/* <TireQuantity quantity={rearTireQuantity} /> */}
                  </div>

                  <Link href={singleTirePageLink} className="block">
                    <TireAttributes product={products[1] as TInventoryItem} />
                  </Link>
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 w-full pr-4">
                  <div>
                    {/* <StockBadge /> */}
                    <DeliveryWithStock deliveryTime="Monday, 05/22" />
                  </div>
                  <div className="flex flex-row items-center w-full">
                    <TireQuantity quantity={frontTireQuantity} />
                    <TireCardPrice
                      price={getPrice(
                        products[1]?.msrp,
                        products[1]?.price
                      )?.toFixed(2)}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="border-x-0 border-t border-b-0 border-[#cfcfcf] px-5 py-6 flex flex-col sm:flex-row gap-8 justify-end items-center self-stretch relative w-full">
        <div className="flex flex-col gap-3 justify-center items-start relative max-w-[380px]">
          {/* Display price set (front and rear) */}
          <PriceSet
            frontPrice={getPrice(
              products[0]?.msrp,
              products[0]?.price
            )?.toFixed(2)}
            rearPrice={getPrice(products[1]?.msrp, products[1]?.price)?.toFixed(
              2
            )}
            frontQuantity={frontTireQuantity}
            rearQuantity={rearTireQuantity}
          />
          <div className="flex flex-col gap-1 justify-center items-end self-stretch relative w-full">
            <PaymentMessaging amount={totalPrice.toFixed(2)} />
          </div>
        </div>
        {/* Display add-to-cart button */}
        <TireCardButton
          frontTireQuantity={frontTireQuantity}
          rearTireQuantity={rearTireQuantity}
          wheelInfo={wheelInfo}
          products={products}
        />
      </div>
    </div>
  );
};

export default TireCard;
