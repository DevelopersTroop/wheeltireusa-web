import { TWheelProduct } from "@/types/product";
import { MdCheckCircle, MdLocationOn } from "react-icons/md";
import { TbRulerMeasure, TbWeight } from "react-icons/tb";
import { MdOutlineColorLens } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import WheelActionButtons from "./wheel-action-buttons";

const WheelDetails = ({ product }: { product: TWheelProduct }) => {
  const today = new Date();
  const end = new Date(today);
  end.setDate(today.getDate() + 7);
  const deliveryDate = end.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const chips = [
    {
      icon: <TbRulerMeasure className="w-3.5 h-3.5" />,
      label: "Size",
      value: product?.wheelSize || `${product?.wheelDiameter}" x ${product?.wheelWidth}"`,
    },
    {
      icon: <TbWeight className="w-3.5 h-3.5" />,
      label: "Bolt",
      value: product?.boltPatterns?.[0],
    },
    {
      icon: <MdOutlineColorLens className="w-3.5 h-3.5" />,
      label: "Color",
      value: product?.color,
    },
    {
      icon: <LiaShippingFastSolid className="w-3.5 h-3.5" />,
      label: "Offset",
      value: product?.offset ? `${product.offset}mm` : undefined,
    },
  ];

  return (
    <div className="flex flex-col gap-4 font-sans">

      {/* ── Pricing ── */}
      <div>
        <div className="flex items-end gap-2">
          <span
            className="text-[52px] font-black leading-none tracking-tight text-gray-900"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            ${product.sellingPrice}
          </span>
          <span className="text-[11px] uppercase tracking-widest text-gray-400 font-medium pb-2.5">
            / wheel
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] uppercase tracking-widest text-gray-400 font-medium">
            Set of 4
          </span>
          <div className="w-px h-3 bg-gray-200" />
          <span
            className="text-[22px] font-bold text-primary leading-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            ${((product?.sellingPrice ?? 0) * 4).toFixed(2)}
          </span>
        </div>
      </div>

      {/* ── Spec chips ── */}
      <div className="hidden sm:grid grid-cols-4 gap-1.5">
        {chips.map((chip) =>
          chip.value ? (
            <div
              key={chip.label}
              className="relative flex flex-col items-center gap-1 rounded-xl border border-gray-100 bg-gray-50 py-3 px-1 overflow-hidden"
            >
              {/* accent stripe */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary rounded-t-xl" />
              <span className="text-gray-400 mt-0.5">{chip.icon}</span>
              <span className="text-[9px] text-gray-400 font-medium tracking-widest uppercase">
                {chip.label}
              </span>
              <span className="text-gray-900 text-[11px] text-center font-semibold">
                {chip.value}
              </span>
            </div>
          ) : null
        )}
      </div>

      {/* ── Stock + delivery ── */}
      <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.15)] flex-shrink-0" />
          <span className="text-green-700 font-semibold text-sm">In Stock</span>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-400 leading-tight">Est. delivery by</p>
          <p className="text-[12px] font-semibold text-gray-800">{deliveryDate}</p>
        </div>
      </div>

      {/* ── Wheel Action Buttons ── */}
      <WheelActionButtons product={product} />
    </div>
  );
};

export default WheelDetails;
