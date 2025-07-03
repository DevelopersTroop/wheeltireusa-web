import { TInventoryItem } from '@/types/product';

const DeliveryCost = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <h2 className="text-xl font-semibold">Shipping to</h2>
      </div>
      <div className="flex justify-between items-baseline self-stretch relative w-full ">
        <p className="text-base font-normal font-[#464853]">
          Deliver to: <span className="font-semibold">83756 - Tampa, FL </span>{' '}
          <span className="text-base">Change</span>
        </p>
        <p className="text-xl font-semibold">${'0.00'}</p>
      </div>
    </div>
  );
};

export default DeliveryCost;
