'use client'; // Use client-side rendering for this component
import { TInventoryItem } from '@/types/product';
import Image from 'next/image';

const TireSave = ({}: { product: TInventoryItem }) => {
  return (
    <>
      <div className="relative flex w-full flex-col items-start justify-center self-stretch">
        {/* Container for Save to Email button and Wishlist button */}
        <div className="relative flex w-full flex-col items-center justify-between gap-2 self-stretch sm:flex-row lg:flex-col">
          {/* Save to Email button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative flex min-h-14 w-full flex-1 items-center justify-center gap-2 rounded-xl border bg-white transition duration-300 ease-in-out hover:bg-[#1F7A8C] hover:text-white"
          >
            {/* <HiMiniEnvelope className="text-lg text-[#210203] group-hover:text-white" /> */}
            <img src="/Align-Horizonta-Spacing.png" alt="add to comparizon" />

            <p className="text-lg leading-[22px] text-[#210203] group-hover:text-white">
              <span className="text-lg font-semibold text-[#210203] group-hover:text-white">
                Add to comparison
              </span>
            </p>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative flex min-h-14 w-full flex-1 items-center justify-center gap-2 rounded-xl border bg-white transition duration-300 ease-in-out hover:bg-[#1F7A8C] hover:text-white"
          >
            <img src="/Bookmark-Circle.png" alt="Save for later" />

            <p className="text-lg leading-[22px] text-[#210203] group-hover:text-white">
              <span className="text-lg font-semibold text-[#210203] group-hover:text-white">
                Save for later
              </span>
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default TireSave;
