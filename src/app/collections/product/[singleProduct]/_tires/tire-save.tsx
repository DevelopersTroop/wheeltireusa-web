'use client'; // Use client-side rendering for this component
import { TInventoryItem } from '@/types/product';
import TireWishlist from './tire-wish-list';

const TireSave = ({ product }: { product: TInventoryItem }) => {
  console.log('product', product);
  return (
    <>
      <div className="relative flex w-full flex-col items-start justify-center self-stretch">
        {/* Container for Save to Email button and Wishlist button */}
        <div className="relative flex w-full flex-col items-center justify-between gap-2 self-stretch sm:flex-row lg:flex-col">
          {/* Save to Email button */}
          <button
            onClick={() => {}}
            className="group relative flex min-h-14 w-full flex-1 items-center justify-center gap-2 rounded-md border border-[#212227] hover:border-transparent bg-white transition duration-300 ease-in-out hover:bg-primary"
          >
            {/* <HiMiniEnvelope className="text-lg text-[#210203] group-hover:text-white" /> */}
            <img src="/Align-Horizonta-Spacing.svg" alt="add to comparizon" />

            <p className="text-lg leading-[22px] text-[#464853]">
              <span className="text-lg font-semibold text-[#464853]">
                Add to comparison
              </span>
            </p>
          </button>

          <TireWishlist product={product} />
        </div>
      </div>
    </>
  );
};

export default TireSave;
