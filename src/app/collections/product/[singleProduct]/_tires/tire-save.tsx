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
            className="group relative flex min-h-14 w-full flex-1 items-center justify-center gap-2 rounded-xl border bg-white transition duration-300 ease-in-out hover:bg-primary hover:text-white"
          >
            {/* <HiMiniEnvelope className="text-lg text-[#210203] group-hover:text-white" /> */}
            <img src="/Align-Horizonta-Spacing.png" alt="add to comparizon" />

            <p className="text-lg leading-[22px] text-[#210203] group-hover:text-white">
              <span className="text-lg font-semibold text-[#210203] group-hover:text-white">
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
