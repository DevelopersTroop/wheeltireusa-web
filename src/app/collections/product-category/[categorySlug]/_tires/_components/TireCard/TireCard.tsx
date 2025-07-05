import DeliveryWithStock from '@/app/cart/_components/delivery-with-stock';
import PaymentMessaging from '@/components/shared/payment-method-messaging';
import { TInventoryItem } from '@/types/product';
import { getProductThumbnail } from '@/utils/product';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import ComparisonWithFavorite from '../ComparisonWithFavorite/ComparisonWithFavorite';
import PriceSet from '../PriceSet/PriceSet';
import TireAttributes from '../TireAttributes/TireAttributes';
import TireCardButton from '../TireCardButton/TireCardButton';
import TireCardPrice from '../TireCardPrice/TireCardPrice';
import TireQuantity from '../TireQuantity/TireQuantity';
import TireRating from '../TireRating/TireRating';
import {
  calculateTotalPrice,
  generateProductLink,
  TireCardProps,
} from './utils/tireCard';
import { isSameWeek } from 'date-fns';

const TireCard = ({ products, wheelInfo }: TireCardProps) => {
  const isSquare = products.length === 1; // Check if the tire set is square (all tires same size)
  const [frontTireQuantity, setFrontTireQuantity] = useState(2);
  const [rearTireQuantity, setRearTireQuantity] = useState(2);

  useEffect(() => {
    // Reset quantities if the products change
    setFrontTireQuantity(isSquare ? 4 : 2);
    setRearTireQuantity(isSquare ? 0 : 2);
  }, [products, isSquare]);

  const singleTirePageLink = generateProductLink(products);

  const totalPrice = useMemo(() => {
    return calculateTotalPrice(products, frontTireQuantity, rearTireQuantity);
  }, [products, rearTireQuantity, frontTireQuantity]);

  return (
    <div className="overflow-hidden rounded-xl border border-[#cfcfcf] flex flex-col py-5 self-stretch relative w-full bg-white">
      <div className={`flex flex-col gap-4 ${!isSquare && 'border-b'}`}>
        <div className="px-4  flex flex-col gap-2 justify-center items-start relative w-full">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-[#464853] text-lg">Brand Name</h1>
            <button className="border border-[#CCC9CF] px-3 py-2 rounded-md text-[14px]">
              Grand Touring Summer
            </button>
          </div>
          <h4 className="text-2xl leading-[29px] text-[#210203]">
            <span className="text-[#210203] text-2xl font-bold uppercase">
              <Link href={singleTirePageLink}>
                {products[0]?.brand} {products[0]?.model_group}{' '}
                {products[0]?.tire_size}{' '}
                {products[0]?.tire_size !== products[1]?.tire_size &&
                typeof products[1]?.tire_size !== 'undefined'
                  ? `AND ${products[1]?.tire_size}`
                  : ''}
              </Link>
            </span>
          </h4>
          {/* <TireTypeBadge products={products} />  */}
        </div>
        <div
          className={`flex flex-col sm:flex-row justify-between gap-2 w-full px-4 pb-6`}
        >
          <TireRating productId={products[0]._id} />
          <ComparisonWithFavorite product={products} />
        </div>
      </div>
      <div className="pr-0 flex flex-col md:flex-row gap-6 self-stretch w-full border-b">
        <div className="pl-4 w-full h-full sm:w-auto my-auto flex justify-center items-center">
          {/* <div className='flex flex-row justify-between w-full'>
            <TireRating />
            <ComparisonWithFavorite/>
          </div> */}
          <Link href={singleTirePageLink}>
            <div className=" w-full flex justify-center items-center relative my-2">
              {/* Display tire image */}
              <Image
                className="max-w-[272px] max-h-[272px] object-contain"
                src={getProductThumbnail(products[0])}
                width={272}
                height={272}
                alt={products[0]?.partnumber ?? ''}
              />
            </div>
          </Link>
        </div>
        <div
          className={`w-full flex flex-col justify-center items-start flex-1 relative ${!isSquare && 'md:border-l'}`}
        >
          <div className="py-4 pl-4 flex flex-col gap-10 justify-center items-start self-stretch relative w-full">
            <div className="flex flex-col gap-4 justify-center items-start self-stretch relative w-full">
              {!isSquare ? (
                <div className="pl-0 pr-4 flex justify-between gap-4 items-center self-stretch relative w-full">
                  <div className="flex flex-col gap-2 items-start relative">
                    <h5 className="text-xl leading-6 bg-[#F6511D] px-3 py-1 rounded-md text-white">
                      <span className="text-white text-xl font-semibold">
                        {'Front'}
                      </span>
                    </h5>

                    {/* <h5 className="text-xl leading-6 bg-[#F6511D] px-3 py-1 rounded-md text-white">
                        <span className="text-white text-xl font-semibold">
                          {isSquare ? 'Front & Rear' : 'Front'}
                        </span>
                      </h5> */}
                    {/* <StockBadge /> */}
                  </div>
                  {/* <TireQuantity quantity={frontTireQuantity} /> */}
                </div>
              ) : (
                <> </>
              )}

              <Link href={singleTirePageLink} className="block">
                <TireAttributes product={products[0] as TInventoryItem} />
              </Link>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-2 lg:gap-0 w-full pr-4">
              <div className="w-full">
                {/* <StockBadge /> */}
                <DeliveryWithStock deliveryTime="Monday, 05/22" />
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <TireQuantity
                  otherQuantity={rearTireQuantity}
                  product={products[0]}
                  setQuantity={setFrontTireQuantity}
                  quantityStep={isSquare ? 4 : 2}
                  quantity={frontTireQuantity}
                />
                <TireCardPrice product={products[0]} />
              </div>
            </div>
          </div>

          {!isSquare ? (
            <>
              {/* If not square, display rear tire details */}
              <div className="border-t border-[#cfcfcf] py-4 flex flex-col gap-10 justify-center items-start self-stretch relative w-full">
                <div className="pl-4 flex flex-col gap-4 justify-center items-start self-stretch relative w-full">
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

                <div className="pl-4 flex flex-col lg:flex-row justify-between items-start gap-2 lg:gap-0 w-full pr-4">
                  <div className="w-full">
                    {/* <StockBadge /> */}
                    <DeliveryWithStock deliveryTime="Monday, 05/22" />
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <TireQuantity
                      product={products[1]}
                      otherQuantity={frontTireQuantity}
                      setQuantity={setRearTireQuantity}
                      quantity={rearTireQuantity}
                    />
                    <TireCardPrice product={products[1]} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-8 justify-end items-center self-stretch relative w-full px-4 md:px-8 mt-6">
        <div className="flex flex-col gap-1 justify-center items-start relative max-w-[380px]">
          {/* Display price set (front and rear) */}
          <PriceSet
            front={products[0]}
            rear={products[1]}
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
