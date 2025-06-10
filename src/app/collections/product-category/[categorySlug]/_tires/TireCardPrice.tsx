import { TInventoryListItem } from '@/types/product';
import { formatPrice } from '@/utils/price';

// This component displays the price of a tire, formatting it and appending a 'per tire' label.
const TireCardPrice = ({ product }: { product: TInventoryListItem }) => {
  // Splitting the price string into integer and decimal parts
  const splitedPrice = formatPrice(product)?.split('.') ?? [];

  return (
    <div className="flex gap-1 items-baseline relative">
      {/* The main container for the price, showing the dollar amount */}
      <div className="flex gap-0 items-baseline relative">
        <h4 className="text-xl leading-[29px] text-[#212227]">
          {/* Displaying the integer part of the price */}
          <span className="text-[#212227] text-xl font-semibold">
            ${splitedPrice[0]}.
          </span>
        </h4>

        {/* Displaying the decimal part of the price, if available */}
        <small className="text-sm leading-[17px] text-[#212227]">
          <span className="text-[#212227] text-sm font-semibold">
            {splitedPrice[1]}
          </span>
        </small>
      </div>

      {/* Displaying 'per tire' label */}
      <small className="text-base leading-[17px] text-[#464853]">
        <span className="text-[#464853] text-sm font-normal">per tire</span>
      </small>
    </div>
  );
};

export default TireCardPrice;
