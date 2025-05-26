import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import CheckoutSubTotal from './checkoutSubTotal';
import { useTypedSelector } from '@/redux/store';

// ProductCard Component
export const ProductCard: React.FC<{
  disableQuantityInput?: boolean;
}> = ({ disableQuantityInput = false }) => {
  const { productsInfo } = useTypedSelector(
    (state) => state.persisted.checkout
  );

  // Group products by package ID
  // const groupedProducts = productsInfo?.reduce(
  //     (acc, product) => {
  //         const packageId = product?.cartPackage || "no-package";
  //         if (!acc[packageId]) {
  //             acc[packageId] = { wheels: product, tires: [] };
  //         } else {
  //             // Filter accessories and add them to the group
  //             const accessories = productsInfo.filter(p => (isAccessories(p.category) || isCustomSteeringWheel(p.category) || isInStockSteeringWheel(p.category)) && p.cartPackage === packageId) || []
  //             acc[packageId].tires.push({ ...product, accessories });
  //         }
  //         return acc;
  //     },
  //     {} as Record<
  //         string,
  //         {
  //             wheels: TCartProduct; tires: Tire[]
  //         }
  //     >
  // ) as Record<
  //     string,
  //     {
  //         wheels: TCartProduct; tires: Tire[]
  //     }
  // > || {};

  return (
    <div className="flex flex-col xl:flex-row mt-2 md:mt-8 gap-8">
      {/* Left Section: Cart Details */}
      <div className="w-full">
        {/* <CartTitle /> Display cart title */}

        <div className="overflow-hidden rounded-xl border border-[#cfcfcf] flex flex-col gap-0 items-start self-stretch relative w-full bg-white">
          {/* <CartYMM /> */}
          {
            // Object.entries(groupedProducts).map(
            //     ([packageId, { wheels, tires }], index) => {
            //         return (
            //             <div key={`${packageId}-${index}`} className="w-full">
            //                 <WheelCard
            //                     key={wheels.cartSerial}
            //                     cartProduct={wheels}
            //                     isTirePackage={tires.some(t => t?.category?.title === 'Tire')}
            //                 />
            //                 {tires.some(t => t?.category?.title === 'Tire') && (
            //                     <TiresCard
            //                         key={tires[0].cartSerial}
            //                         tires={tires?.filter(t => t?.category?.title === 'Tire')}
            //                     />
            //                 )}
            //                 {
            //                     tires[0]?.accessories?.length > 0 && (
            //                         <AccessoriesCard
            //                             key={tires[0].accessories[0].cartSerial}
            //                             accessories={tires[0].accessories}
            //                         />
            //                     )
            //                 }
            //             </div>
            //         )
            //     }
            // )
          }
          <CheckoutSubTotal /> {/* Display cart subtotal */}
        </div>
      </div>

      {/* summery */}
      {/* <CartSummary /> */}
    </div>
  );
};
