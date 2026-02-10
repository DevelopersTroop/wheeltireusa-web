"use client";
import { ProductCardRating } from "@/components/shared/Reviews/components/ProductCardRating/ProductCardRating";
import { TInventoryItem } from "@/types/product";
import { FaStar } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiTireBold } from "react-icons/pi";
// import { PiTireBold } from "react-icons/pi";

const WheelCardDescription = ({ product }: { product: TInventoryItem }) => {
  return (
    <div>
      {/* product title */}
      <div>
        <h3 className="text-xs font-semibold uppercase text-black">
          {product.title}
        </h3>
      </div>
      {/* product review */}

      <ProductCardRating productId={product.id} />

      {/* product pricing */}
      <div className="hidden flex-col gap-3 min-[600px]:flex">
        <div className="flex items-start gap-1">
          $
          <span className="text-3xl font-semibold">
            {(product.sellingPrice)?.toFixed(2) ?? "N/A"}
          </span>{" "}
          <span className="my-auto text-xs font-medium uppercase text-primary">
            \ea
          </span>
        </div>
        <div>
          <p className="text-xs">
            Starting at <span className="font-bold">$82</span>/MO{" "}
            <span className="font-bold">Affirm</span>{" "}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {/* <div className=" flex items-center gap-2">
          <div className={"rounded-full p-1 inline-block bg-primary"}>
            <AiOutlineDollarCircle className={"text-white"} />
          </div>
          <p className="text-xs uppercase text-gray-600">
            {product.item_promo}
          </p>
        </div> */}
        {/* <div className="flex items-center gap-2">
          <div className={"inline-block rounded-full bg-primary p-1"}>
            <MdOutlineShoppingCart className={"text-white"} />
          </div>
          <div className="text-xs uppercase">
            <p className="text-gray-800">{product.item_shipping}</p>
            <p className="font-semibold">
              {" "}
              {product.delivery_date} to the lower 48{" "}
            </p>
          </div>
        </div> */}
        <div className="flex items-center gap-2">
          <div className={"inline-block rounded-full bg-primary p-1"}>
            <MdOutlineShoppingCart className={"text-white"} />
          </div>
          <div className="text-xs uppercase">
            <p className="text-gray-800">In Stock & Free Quick Delivery </p>
            <p className="">
              {" "}
              As Fast As: <span className="font-semibold">  {(() => {
                                      const today = new Date();
                                      const start = new Date(today);
                                      start.setDate(today.getDate() + 3);
                                      const end = new Date(today);
                                      end.setDate(today.getDate() + 7);

                                      const format = (date: Date) =>
                                        date.toLocaleString("en-US", {
                                          month: "short",
                                          day: "2-digit",
                                        });

                                      return `${format(start)} - ${format(end)}`;
                                    })()} </span> to the lower 48{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={"inline-block rounded-full bg-primary p-1"}>
            <PiTireBold className={"text-white"} />
          </div>
          <p className="text-xs uppercase text-gray-800">
            {"Performance"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={"inline-block rounded-full bg-primary p-1"}>
            <FaStar className={"text-white"} />
          </div>
          <p className="text-xs uppercase text-gray-800">{"Manufacturer Mileage Warranty"}</p>
        </div>
      </div>

      {/* product pricing */}
      <div className="flex flex-col gap-3 min-[600px]:hidden">
        <div className="flex items-start gap-1">
          $
          <span className="text-2xl font-semibold">
            {((product.sellingPrice ?? 0) * 4)?.toFixed(2) || "N/A"}
          </span>{" "}
          <span className="my-auto text-xs font-medium text-primary">
            \ea
          </span>
        </div>
        <div>
          <p className="text-xs">
            Starting at <span className="font-bold">$82</span>/MO{" "}
            <span className="font-bold">Affirm</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WheelCardDescription;
