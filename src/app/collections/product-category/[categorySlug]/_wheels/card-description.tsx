"use client";

import { TInventoryItem } from "@/types/product";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";
import { ProductCardRating } from "@/components/shared/Reviews/components/ProductCardRating/ProductCardRating";

const CardDescription = ({
  product,
  sales,
}: {
  product: TInventoryItem;
  sales: boolean;
}) => {
  return (
    <div>
      {/* product title */}
      <div>
        <h3 className="text-xs font-extrabold uppercase text-black">
          {product.title}
        </h3>
        <h4 className="text-xs uppercase text-gray-600">{product?.model}</h4>
        <p className="text-xs uppercase text-black">{product?.brand}</p>
      </div>
      {/* product review */}
      <ProductCardRating productId={product.id} />

      {/* product pricing */}
      <div className="hidden flex-col gap-3 min-[600px]:flex">
        <div className="flex items-start gap-1">
          $
          <span className="text-3xl font-semibold">
            {parseFloat(String(product.sellingPrice)).toFixed(2)}
          </span>{" "}
          <span className="my-auto text-xs font-medium text-primary">
            \ea
          </span>
        </div>
        <div>
          <p className="text-sm">
            Starting at <span className="font-bold">$82</span>/MO{" "}
            <span className="font-bold">Affirm</span>{" "}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className={"inline-block rounded-full bg-primary p-1"}>
            <FaDollarSign size={14} className={"text-white"} />
          </div>
          <div className="text-xs uppercase">
            <p className="text-gray-600">
              Save up to <span className="font-semibold"> $20</span> When adding
              tires to package
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={"inline-block rounded-full bg-primary p-1"}>
            <MdOutlineShoppingCart size={14} className={"text-white"} />
          </div>
          <div className="text-xs uppercase">
            <p className="text-gray-800">In Stock & Free Quick Delivery </p>
            <p className="">
              {" "}
              As Fast As:{" "}
              <span className="font-semibold">
                {" "}
                {(() => {
                  const today = new Date();
                  const start = new Date(today);
                  start.setDate(today.getDate());
                  const end = new Date(today);
                  end.setDate(today.getDate() + 5);

                  const format = (date: Date) =>
                    date.toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                    });

                  return `${format(start)} - ${format(end)}`;
                })()}{" "}
              </span>{" "}
              to the lower 48{" "}
            </p>
          </div>
        </div>
      </div>

      {/* product pricing */}
      <div className="flex flex-col gap-3 min-[600px]:hidden">
        <div className="flex items-start gap-1">
          $
          <span className="text-3xl font-semibold">
            {parseFloat(String(product.sellingPrice)).toFixed(2)}
          </span>{" "}
          <span className="my-auto text-xs font-medium text-primary">
            \ea
          </span>
        </div>

        {sales && (
          <div className="flex items-center gap-1">
            <div>Was</div>
            <div className="flex items-start gap-1 line-through">
              $
              <span className="text-xl font-semibold">
                {parseFloat(String(product.sellingPrice)).toFixed(2)}
              </span>
            </div>
          </div>
        )}
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

export default CardDescription;
