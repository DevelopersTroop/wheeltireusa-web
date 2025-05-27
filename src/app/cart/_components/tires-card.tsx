'use client';

import { TCartProduct } from '@/types/cart';
import { s3BucketUrl } from '@/utils/api';
import { getPrice } from '@/utils/price';
import Image from 'next/image';
import CardPrice from './card-price';
import DeliveryWithStock from './delivery-with-stock';
import Quantity from './quantity';
import TireAttributes from './tire-attributes';

const TiresCard = ({ tire }: { tire: TCartProduct }) => {
  // const dispatch = useDispatch();
  // const { products: cartProducts } = useTypedSelector((state) => state.persisted.cart)

  // const removeCartProduct = (cartSerial: string) => {
  //   dispatch(removeFromCart({ cartSerial }));
  // };

  const deliveryTime = 'Monday, 05/22 to 83756';
  return (
    <div className="w-full flex flex-col rounded-b-none border-b border-[#cfcfcf]">
      <div className="flex flex-row justify-between items-start relative w-full">
        <div className="px-2 sm:px-5 pt-6 pb-3 flex flex-col gap-2 justify-center items-start relative w-full">
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-[#210203] text-base font-normal">
              {tire.brand}
            </span>
          </p>

          <h4 className="text-2xl leading-[29px] text-[#210203]">
            <span className="text-[#210203] text-2xl font-bold">
              {tire.model_group} {tire?.tire_size}{' '}
              {tire?.tire_size !== tire?.tire_size &&
              typeof tire?.tire_size !== 'undefined'
                ? `AND ${tire?.tire_size}`
                : ''}
            </span>
          </h4>
        </div>

        <div className="px-2 sm:px-5 pt-6 pb-3 justify-center items-end">
          <button>
            <small className="text-sm leading-[17px] underline text-[#210203]">
              <span className="text-[#210203] text-sm font-semibold">
                Delete
              </span>
            </small>
          </button>
        </div>
      </div>

      <div className="pl-2 sm:pl-5 pr-0 flex flex-col sm:flex-row gap-6 items-start self-stretch relative w-full">
        {/* Rating and Image */}
        <div className=" w-full sm:w-auto flex flex-col gap-4 items-start relative">
          {/* <Rating /> */}
          <div className="w-full flex justify-center relative">
            <Image
              src={`${s3BucketUrl}/${tire.item_image}`}
              width={160}
              height={160}
              alt={tire?.title ?? ''}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-start flex-1 relative w-full">
          <div
            key={tire.cartSerial}
            className={`py-5 flex flex-col items-start self-stretch relative w-full `}
          >
            <div className="pl-0 pr-4 flex justify-between items-center self-stretch relative w-full">
              <div className="flex flex-col gap-2 items-start relative">
                <h5 className="text-xl leading-6 bg-[#F6511D] text-white px-2 py-1 rounded ">
                  <span className="text-xl font-semibold">
                    {/* {tires.length <= 1
                          ? 'Front & Rear'
                          : tire.isFrontTire
                            ? 'Front'
                            : 'Rear'} */}
                    {tire.isFrontTire && tire.isRearTire
                      ? 'Front & Rear'
                      : tire.isFrontTire
                        ? 'Front'
                        : tire.isRearTire
                          ? 'Rear'
                          : ''}
                  </span>
                </h5>
                <CardPrice
                  price={getPrice(tire?.msrp, tire?.price) ?? 0}
                  type="tire"
                />
              </div>
            </div>
            <DeliveryWithStock deliveryTime={deliveryTime} />
            <div className="flex flex-col md:flex-row gap-2 items-start relative w-full">
              <TireAttributes product={tire} />
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center w-full pr-4 mt-4">
              <Quantity cartProduct={tire} />
              <div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="text-[#210203] text-base font-semibold">
                    {tire?.singleQuantityPrice}
                  </span>{' '}
                  per tire
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiresCard;
