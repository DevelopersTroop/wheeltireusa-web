import { TTireProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineLocalPhone, MdOutlineShoppingCart, MdCheckCircle, MdLocationOn } from "react-icons/md";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { TbRulerMeasure, TbWeight, TbStar } from "react-icons/tb";
import { MdOutlineColorLens } from "react-icons/md";
import ActionButtons from "./action-buttons";

const TireDetails = ({ product }: { product: TTireProduct }) => {
  // Delivery date
  const today = new Date();
  const end = new Date(today);
  end.setDate(today.getDate() + 7);
  const deliveryDate = end.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const chips = [
    { icon: <TbRulerMeasure className="w-4 h-4" />, label: "SIZE", value: product?.tireSize },
    { icon: <TbWeight className="w-4 h-4" />, label: "LOAD", value: product?.loadIndex },
    { icon: <TbStar className="w-4 h-4" />, label: "UTQG", value: product?.utqg },
    { icon: <MdOutlineColorLens className="w-4 h-4" />, label: "STYLE", value: product?.sidewall || "BLK" },
  ];

  return (
    <div className="flex flex-col gap-4">

      {/* Pricing */}
      <div>
        <div className="flex items-end gap-2 flex-wrap">
          <span className="text-3xl font-extrabold text-gray-900">
            ${product.sellingPrice}
          </span>
          <span className="text-gray-400 text-sm mb-1">/ tire</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-400 text-xs uppercase tracking-wider">Set of 4</span>
          <span className="text-primary text-xl font-extrabold">
            ${((product?.sellingPrice ?? 0) * 4).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Spec chips */}
      <div className="grid grid-cols-4 gap-1.5">
        {chips.map((chip) =>
          chip.value ? (
            <div
              key={chip.label}
              className="flex flex-col items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-1"
            >
              <span className="text-gray-400">{chip.icon}</span>
              <span className="text-[9px] text-gray-400 font-bold tracking-wider uppercase">
                {chip.label}
              </span>
              <span className="text-gray-900 text-xs font-bold">{chip.value}</span>
            </div>
          ) : null
        )}
      </div>

      {/* Stock + delivery */}
      <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <MdCheckCircle className="text-green-500 w-4 h-4 flex-shrink-0" />
          <span className="text-green-600 font-semibold text-sm">In Stock</span>
        </div>
        <div className="flex items-start gap-2 text-gray-500 text-xs">
          <MdLocationOn className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-400" />
          <span>
            Delivery by{" "}
            <span className="font-semibold text-gray-800">{deliveryDate}</span>{" "}
            to the lower 48
          </span>
        </div>
      </div>

        <ActionButtons product={product} />
    </div>
  );
};

export default TireDetails;
