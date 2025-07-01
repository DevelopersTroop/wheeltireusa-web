'use client';

import TireQuantity from '@/app/collections/product-category/[categorySlug]/_tires/TireQuantity';
import { removeFromCart, TCartProduct } from '@/redux/features/cartSlice';
import { getPrice } from '@/utils/price';
import { getProductThumbnail } from '@/utils/product';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import DeliveryWithStock from './delivery-with-stock';
import TireAttributes from './tire-attributes';
import Link from 'next/link';

const TiresCard = ({ tires }: { tires: TCartProduct[] }) => {
  const dispatch = useDispatch();
  // const { products: cartProducts } = useTypedSelector((state) => state.persisted.cart)

  const isSquare = tires.length === 1;
  let singleTirePageLink = `/collections/product/${tires[0]?.slug}`; // Link to the tire's product page
  if (tires.length > 1) {
    singleTirePageLink += `?slug=${tires[1]?.slug}`; // Add front tire slug to the link
  }

  const removeCartProduct = (cartPackage: string) => {
    dispatch(removeFromCart(cartPackage));
  };

  const deliveryTime = 'Monday, 05/22 to 83756';
  return (
    <div className="w-full flex flex-col rounded-b-none border-b border-[#cfcfcf]">
      <div
        className={`flex flex-row justify-between items-start relative w-full ${!isSquare && 'sm:border-b'}`}
      >
        <div
          className={`px-2 sm:px-5 pt-6 pb-3 hidden sm:flex flex-col gap-2 justify-center items-start relative w-full`}
        >
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-[#210203] text-base font-normal">
              {/* {tire.brand} */}Brand name
            </span>
          </p>

          <h4 className="text-2xl leading-[29px] text-[#210203]">
            <span className="text-[#210203] text-2xl font-bold">
              <Link href={singleTirePageLink}>
                {tires[0]?.brand} {tires[0]?.model_group} {tires[0]?.tire_size}{' '}
                {tires[0]?.tire_size !== tires[1]?.tire_size &&
                typeof tires[1]?.tire_size !== 'undefined'
                  ? `AND ${tires[1]?.tire_size}`
                  : ''}
              </Link>
            </span>
          </h4>
        </div>

        <div className="px-2 sm:px-5 pt-6 pb-3 justify-center items-end ml-auto">
          <button
            onClick={() => removeCartProduct(tires[0]?.cartPackage ?? '')}
          >
            <small className="text-sm leading-[17px] underline text-[#210203]">
              <span className="text-[#210203] text-sm font-semibold">
                Delete
              </span>
            </small>
          </button>
        </div>
      </div>

      <div className="sm:pl-5 pr-0 flex flex-col sm:flex-row gap-6 items-center justify-center self-stretch relative w-full">
        {/* Rating and Image */}
        <div className=" w-full sm:w-auto flex flex-col gap-4 items-center  justify-center relative">
          {/* <Rating /> */}
          <div className="w-full flex justify-center relative">
            <Image
              src={getProductThumbnail(tires[0])}
              width={160}
              height={160}
              alt={tires[0]?.tire_size ?? ''}
            />
          </div>

          <div className="pl-4 pt-6 pb-3 flex flex-col sm:hidden gap-2 justify-start items-start relative w-full border-b">
            <p className="text-base leading-[19px] text-[#210203]">
              <span className="text-[#210203] text-base font-normal">
                Brand name
              </span>
            </p>

            <h4 className="text-2xl leading-[29px] text-[#210203]">
              <span className="text-[#210203] text-2xl font-bold">
                <Link href={singleTirePageLink}>
                  {tires[0]?.brand} {tires[0]?.model_group}{' '}
                  {tires[0]?.tire_size}{' '}
                  {tires[0]?.tire_size !== tires[1]?.tire_size &&
                  typeof tires[1]?.tire_size !== 'undefined'
                    ? `AND ${tires[1]?.tire_size}`
                    : ''}
                </Link>
              </span>
            </h4>
          </div>
        </div>

        <div
          className={`flex flex-col justify-center items-start flex-1 relative w-full ${!isSquare && 'sm:border-l'} `}
        >
          <div
            className={`py-5 pl-4 flex flex-col items-start gap-6 self-stretch relative w-full `}
          >
            {!isSquare && (
              <div className="pl-0 pr-4 flex justify-between items-center self-stretch relative w-full">
                <div className="flex flex-col gap-2 items-start relative">
                  <h5 className="text-xl leading-6 bg-[#F6511D] text-white px-2 py-1 rounded ">
                    <span className="text-xl font-semibold">
                      {!isSquare ? 'Front' : ''}
                    </span>
                  </h5>
                </div>
              </div>
            )}
            <DeliveryWithStock deliveryTime={deliveryTime} />
            <div className="flex flex-col md:flex-row gap-2 items-start relative w-full">
              <TireAttributes product={tires[0]} />
            </div>
            <div className="flex flex-row gap-2 justify-between items-center w-full pr-4">
              <TireQuantity
                otherQuantity={2}
                quantity={tires[0].quantity}
                setQuantity={(quantity) => {
                  // Update quantity logic here
                  console.log('Update quantity:', quantity);
                }}
                isCart={true}
                cartProduct={tires[0]}
              />
              <div>
                <p className="text-base leading-[19px] text-[#210203] whitespace-nowrap">
                  <span className="text-[#210203] text-base font-semibold">
                    {getPrice(tires[0])}
                  </span>{' '}
                  per tire
                </p>
              </div>
            </div>
          </div>

          {!isSquare && tires[1] !== null && (
            <div
              className={`py-5 pl-4 flex flex-col items-start gap-6 self-stretch relative w-full border-t `}
            >
              {!isSquare && (
                <div className="pl-0 pr-4 flex justify-between items-center self-stretch relative w-full">
                  <div className="flex flex-col gap-2 items-start relative">
                    <h5 className="text-xl leading-6 bg-[#F6511D] text-white px-2 py-1 rounded ">
                      <span className="text-xl font-semibold">
                        {!isSquare ? 'Rear' : ''}
                      </span>
                    </h5>
                  </div>
                </div>
              )}
              <DeliveryWithStock deliveryTime={deliveryTime} />
              <div className="flex flex-col md:flex-row gap-2 items-start relative w-full">
                <TireAttributes product={tires[1]} />
              </div>
              <div className="flex flex-row gap-2 justify-between items-center w-full pr-4">
                <TireQuantity
                  otherQuantity={2}
                  quantity={tires[1].quantity}
                  setQuantity={(quantity) => {
                    // Update quantity logic here
                    console.log('Update quantity:', quantity);
                  }}
                  isCart={true}
                  cartProduct={tires[1]}
                />
                <div>
                  <p className="text-base leading-[19px] text-[#210203] whitespace-nowrap">
                    <span className="text-[#210203] text-base font-semibold">
                      {getPrice(tires[1])}
                    </span>{' '}
                    per tire
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TiresCard;
