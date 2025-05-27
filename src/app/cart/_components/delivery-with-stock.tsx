const DeliveryWithStock = ({ deliveryTime }: { deliveryTime: string }) => {
  // const deliveryTimeString = getFormatedDeliveryTimeString(deliveryTime)
  return (
    <div className="pl-0 pr-5 flex flex-col gap-3 items-start  flex-1 relative w-full">
      <div className="flex gap-1 items-center relative">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="4" width="8" height="8" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.6663 7.99992C14.6663 11.6818 11.6816 14.6666 7.99967 14.6666C4.31778 14.6666 1.33301 11.6818 1.33301 7.99992C1.33301 4.31802 4.31778 1.33325 7.99967 1.33325C11.6816 1.33325 14.6663 4.31802 14.6663 7.99992ZM10.6866 5.9797C10.8818 6.17496 10.8818 6.49154 10.6866 6.68681L7.35323 10.0201C7.15797 10.2154 6.84138 10.2154 6.64612 10.0201L5.31279 8.68681C5.11753 8.49154 5.11753 8.17496 5.31279 7.9797C5.50805 7.78444 5.82463 7.78444 6.01989 7.9797L6.99967 8.95948L8.48956 7.46959L9.97945 5.9797C10.1747 5.78444 10.4913 5.78444 10.6866 5.9797Z"
            fill="#04A777"
          />
        </svg>

        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#210203] text-base font-normal">
            {'In Stock'}
          </span>
        </p>
      </div>
      <div className="flex gap-1 items-baseline relative whitespace-nowrap">
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#210203] text-base font-normal">
            Delivered in
          </span>
        </p>

        <h5 className="text-xl leading-6 text-[#210203]">
          <span className="text-[#210203] text-xl font-bold">
            {deliveryTime}
          </span>
        </h5>
      </div>
    </div>
  );
};

export default DeliveryWithStock;
