import { formatPrice } from '@/utils/price';

const CardPrice = ({ price, type }: { price: number; type?: string }) => {
  const splitedPrice = formatPrice(price).split('.');

  return (
    <div className="flex flex-col min-[400px]:flex-row gap-1 items-baseline relative">
      <div className="flex gap-0 items-baseline relative">
        <h4 className="text-2xl leading-[29px] text-[#210203]">
          <span className="text-[#210203] text-2xl font-bold">
            ${splitedPrice[0]}.
          </span>
        </h4>

        <small className="text-sm leading-[17px] text-[#210203]">
          <span className="text-[#210203] text-sm font-bold">
            {splitedPrice[1]}
          </span>
        </small>
      </div>
      {type ? (
        <small className="text-sm leading-[17px] text-[#210203]">
          <span className="text-[#210203] text-sm font-normal">per {type}</span>
        </small>
      ) : null}
    </div>
  );
};

export default CardPrice;
