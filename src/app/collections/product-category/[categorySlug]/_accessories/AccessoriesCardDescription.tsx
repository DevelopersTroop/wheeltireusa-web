"use client";
import { ProductCardRating } from "@/components/shared/Reviews/components/ProductCardRating/ProductCardRating";
import { TInventoryItem } from "@/types/product";
import { getProductDeliveryDate } from "@/utils/product";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiHandCoinsDuotone } from "react-icons/pi";

const AccessoriesCardDescription = ({
  product,
}: {
  product: TInventoryItem;
}) => {
  return (
    <div className="px-4 pb-6">
      <div className="pb-1">
        <p className="text-xs uppercase text-gray-800">
          Starting at $82/MO <span className="font-bold">Affirm</span>{" "}
        </p>
      </div>
      {/* product title */}
      <div>
        <h3 className="text-sm uppercase font-semibold text-black">
          {product?.title}
        </h3>
      </div>


      <ProductCardRating productId={product.id} />

      <div className="flex flex-col gap-3 mt-3">
        <div className=" flex items-center gap-2">
          <div className={"rounded-full p-1 inline-block bg-primary"}>
            <LiaShippingFastSolid className={"text-white"} />
          </div>
          <div className="text-xs uppercase">
            <p className="text-gray-800">
              Estimate Delivery:{" "}
              <span className="font-semibold text-black">{getProductDeliveryDate(product)}</span>{" "}
              to the lower 48{" "}
            </p>
          </div>
        </div>
        <div className=" flex items-center gap-2">
          <div className={"rounded-full p-1 inline-block bg-primary"}>
            <PiHandCoinsDuotone className={"text-white"} />
          </div>
          <div className="text-xs uppercase">
            <p className="text-gray-800">Financing Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoriesCardDescription;
