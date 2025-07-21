'use client'; // Enables React's client-side rendering mode
import { TInventoryItem } from '@/types/product';
import { formatPrice, getPrice, isSale } from '@/utils/price';

// CardDescription component to display product details
const CardDescription = ({
  product,
  isSaleProduct,
  showOnlyPrice = false,
}: {
  product: TInventoryItem;
  isSaleProduct: boolean;
  showOnlyPrice?: boolean;
}) => {
  console.log('isSaleProduct', isSaleProduct);

  return (
    <div className="flex flex-col gap-4 justify-center items-start self-stretch relative w-full">
      <div className="inline-block">
        <h4 className="text-2xl leading-[29px] font-bold text-[#210203] line-clamp-1 lg:line-clamp-2">
          {product?.modelGroup}
        </h4>
      </div>
      {/* Show inventory status and details only if showOnlyPrice is false */}
      {!showOnlyPrice && (
        <>
          {/* Inventory Availability */}
          <div className="flex gap-1 items-center relative">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="4.5" width="8" height="8" fill="white" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.6668 8.49998C14.6668 12.1819 11.6821 15.1666 8.00016 15.1666C4.31826 15.1666 1.3335 12.1819 1.3335 8.49998C1.3335 4.81808 4.31826 1.83331 8.00016 1.83331C11.6821 1.83331 14.6668 4.81808 14.6668 8.49998ZM10.687 6.47976C10.8823 6.67502 10.8823 6.9916 10.687 7.18687L7.35372 10.5202C7.15845 10.7155 6.84187 10.7155 6.64661 10.5202L5.31328 9.18687C5.11801 8.9916 5.11801 8.67502 5.31328 8.47976C5.50854 8.2845 5.82512 8.2845 6.02038 8.47976L7.00016 9.45954L8.49005 7.96965L9.97994 6.47976C10.1752 6.2845 10.4918 6.2845 10.687 6.47976Z"
                fill={product?.inventoryAvailable ? '#04A777' : '#FF0000'}
              />
            </svg>

            <p className="text-base leading-[19px] text-[#210203]">
              <span className="text-[#210203] text-base font-normal">
                {product?.inventoryAvailable ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>
          </div>

          {/* Product Attributes: Size, Bolt Pattern, Lip Size, Finish */}
          <div className="flex flex-col gap-2 items-start  w-full">
            <div className="w-full flex flex-row gap-2">
              <div className="rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative w-1/2 hover:bg-[#210203] transition duration-300 ease-in-out group cursor-pointer">
                <div className="flex gap-1 items-center relative">
                  <i
                    className={
                      'icon-size text-[#504949]  group-hover:text-[#ffffff]'
                    }
                  />

                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
                      Size
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="text-[#210203] text-base font-normal line-clamp-1  group-hover:text-[#ffffff]">
                    {product?.tireSize ? product?.tireSize : 'N/A'}
                  </span>
                </p>
              </div>
              {/* <div className="rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative w-1/2 hover:bg-[#210203] transition duration-300 ease-in-out group cursor-pointer">
                <div className="flex gap-1 items-center relative">
                  <i
                    className={
                      'icon-bolt-pattern text-[#504949] group-hover:text-[#ffffff]'
                    }
                  />

                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-[#504949] text-xs font-normal whitespace-nowrap group-hover:text-[#ffffff]">
                      Bolt pattern
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="text-[#210203] text-base font-normal line-clamp-1 group-hover:text-[#ffffff]">
                    {product?.bolt_pattern_1 ? product?.bolt_pattern_1 : 'N/A'}
                  </span>
                </p>
              </div> */}
            </div>
            <div className="w-full flex flex-row gap-2">
              {/* <div className="rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative w-1/2 hover:bg-[#210203] transition duration-300 ease-in-out group cursor-pointer">
                <div className="flex gap-1 items-center relative">
                  <i
                    className={
                      'icon-lip-size text-[#504949] group-hover:text-[#ffffff]'
                    }
                  />
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
                      Lip Size
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="text-[#210203] text-base font-normal line-clamp-1 group-hover:text-[#ffffff]">
                    {product?.lip_size ? product?.lip_size : 'N/A'}
                  </span>
                </p>
              </div> */}
              {/* <div className="rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative w-1/2 hover:bg-[#210203] transition duration-300 ease-in-out group cursor-pointer">
                <div className="flex gap-1 items-center relative">
                  <i
                    className={
                      'icon-finish text-[#504949] group-hover:text-[#ffffff]'
                    }
                  />

                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
                      Finish
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="text-[#210203] text-base font-normal line-clamp-1 group-hover:text-[#ffffff]">
                    {product?.finish ? product?.finish : 'N/A'}
                  </span>
                </p>
              </div> */}
            </div>
          </div>
        </>
      )}
      {/* Pricing Section */}
      <div className="flex gap-4 items-baseline relative">
        <h5 className="text-xl leading-6 text-[#210203]">
          <span className="text-[#210203] text-xl font-bold">
            {showOnlyPrice ? 'Price ' : ''} ${formatPrice(getPrice(product))}
          </span>
        </h5>
        {/* Show original price if product is on sale */}
        {isSale(product?.msrp ?? 0, product?.price ?? 0) && (
          <p className="text-base leading-[19px] line-through text-[#949494]">
            <span className="text-[#949494] text-base font-normal">
              ${formatPrice(product?.msrp)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default CardDescription;
