import { TInventoryItem } from '@/types/product';
import { FiSearch } from 'react-icons/fi';

const DeliveryCost = ({ product }: { product: TInventoryItem }) => {
  return (
    <div>
      <div className="">
        <h2 className="text-xl font-bold">Estimated delivery cost</h2>
      </div>
      <div className="flex flex-col justify-between items-baseline self-stretch relative w-full gap-4 mt-4">
        <h2 className="text-base font-normal">
          Change ZIP code to update information:{' '}
        </h2>
        <div className="flex flex-row justify-between items-baseline self-stretch relative w-full gap-4 mt-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="98056"
              className="border border-[#cfcfcf] bg-white rounded-md p-2 w-full pr-10"
            />
            <span className="absolute inset-y-0 right-3 flex items-center">
              <FiSearch className="text-xl" />
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">${product?.price}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCost;
