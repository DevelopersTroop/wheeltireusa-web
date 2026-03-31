"use client";

import { useState, useEffect } from "react";
import { TTireProduct } from "@/types/product";
import { useGetReviewsQuery } from "@/redux/apis/reviews";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { addToCart } from "@/redux/features/cartSlice";
import { triggerGaAddToCart } from "@/utils/analytics";
import { useCartHook } from "@/hooks/useCartHook";
import { MdKeyboardArrowDown, MdOutlineArrowForwardIos, MdOutlineLocalShipping, MdCheckCircle, MdThumbUp } from "react-icons/md";

interface TireProductRightPanelProps {
  product: TTireProduct;
  thumbs: Array<{ id: number; label: string; image: string }>;
  activeThumb: number;
  setActiveThumb: (id: number) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  availableSizes: string[];
  qty: number;
  setQty: (qty: number) => void;
}

const TireProductRightPanel = ({
  product,
  selectedSize,
  setSelectedSize,
  availableSizes,
  qty,
  setQty
}: TireProductRightPanelProps) => {
  const dispatch = useAppDispatch();
  const { setOpen } = useCartHook();
  const [justAdded, setJustAdded] = useState(false);

  // Get cart state to check if product is already in cart
  const cartProducts = useTypedSelector((state) => state.persisted.cart.products);

  // Check if this product is already in the cart
  const isInCart = Object.values(cartProducts).some(
    (p: any) => p.id === product.id
  );

  const { data } = useGetReviewsQuery(
    { productId: product.id, page: 1 },
    { skip: !product.id }
  );
  const averageRating = data?.average || 4.9;
  const reviewCount = data?.count || 0;

  const sellingPrice = product?.sellingPrice ?? 0;
  const originalPrice = sellingPrice * 1.5;
  const discountPct = Math.round((1 - sellingPrice / originalPrice) * 100);
  const totalSavings = ((originalPrice - sellingPrice) * qty).toFixed(2);
  const inStock = (product?.availableStock ?? 0) > 0;
  const stockQuantity = product?.availableStock ?? 0;

  // Reset "just added" animation state after a delay
  useEffect(() => {
    if (justAdded) {
      const timer = setTimeout(() => setJustAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [justAdded]);

  const handleAddToCart = async () => {
    if (!inStock) return;

    setJustAdded(true);
    try {
      triggerGaAddToCart(product, qty);
      const packageId = uuidv4();
      const cartSerial = uuidv4();
      dispatch(
        addToCart({
          ...product,
          cartPackage: packageId,
          cartSerial,
          quantity: qty,
          metaData: {},
        })
      );
      setOpen();
    } catch (error) {
      setJustAdded(false);
    }
  };

  const QTY_OPTIONS = stockQuantity > 0
    ? [1, 2, 3, 4].filter(q => q <= stockQuantity)
    : [1, 2, 3, 4];

  // Star Rating Component
  const StarRating = () => (
    <div className="flex items-center gap-1.5 shrink-0">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-base leading-none ${i < Math.floor(averageRating) ? "text-amber-400" : "text-gray-200"}`}
          >★</span>
        ))}
      </div>
      <span className="text-sm font-bold text-gray-900">{averageRating.toFixed(1)}</span>
      <span className="text-xs text-blue-600 underline cursor-pointer">({reviewCount})</span>
    </div>
  );

  return (
    <div className="p-5 sm:p-7 flex flex-col gap-4">

      {/* Title + Stars */}
      <div className="flex justify-between items-start gap-3">
        <div>
          <h1
            className="text-xl sm:text-[1.65rem] font-bold leading-tight text-gray-900 tracking-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {product?.title || `${product?.brand} ${product?.model}`}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {product?.tireClass || String(product?.category || "All Weather")} tire
          </p>
        </div>
        <StarRating />
      </div>

 {/* Price Section */}
 <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center sm:justify-between gap-4">
    {/* Price */}
      <div className="flex-1">
        {discountPct > 0 && (
          <span className="inline-block text-[11px] font-bold text-orange-600 bg-orange-50 border border-orange-200 rounded px-1.5 py-0.5 mb-2">
            {discountPct}% OFF
          </span>
        )}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl sm:text-[2rem] font-extrabold text-gray-900 leading-none tracking-tight">
            ${sellingPrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 font-medium">/tire</span>
          {discountPct > 0 && (
            <span className="text-sm text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-gray-500 text-xs uppercase tracking-wider">Set of 4</span>
          <span className="text-primary text-xl sm:text-2xl font-extrabold">
            ${(sellingPrice * 4).toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-700 font-medium mt-1">
          Total savings on {qty} tires:
          <span className="inline-block bg-yellow-300 text-gray-900 font-bold text-sm px-2 py-0.5 rounded ml-1.5">
            ${totalSavings}
          </span>
        </p>
      </div>

      {/* Qty + CTA */}
      <div className="flex gap-2 sm:gap-2.5">
        <div className="relative w-24 sm:w-auto">
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="appearance-none bg-white border-[1.5px] border-gray-200 rounded-lg pl-3.5 pr-8 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:border-gray-900 hover:border-gray-400 transition-colors cursor-pointer w-full"
          >
            {QTY_OPTIONS.map((q) => <option key={q} value={q}>{q} tires</option>)}
          </select>
          <MdKeyboardArrowDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={[
            "flex-1 min-w-[140px] sm:min-w-0 rounded-lg py-3 px-2 sm:px-3 text-[13px] sm:text-[15px] font-bold text-white transition-all duration-200 tracking-wide",
            !inStock
              ? "bg-gray-400 cursor-not-allowed"
              : isInCart || justAdded
                ? "bg-emerald-600 scale-[0.98]"
                : "bg-orange-600 hover:bg-orange-700 hover:-translate-y-0.5 active:translate-y-0",
          ].join(" ")}
        >
          {justAdded ? "Added ✓" : isInCart ? "In cart ✓" : inStock ? "Add to cart" : "Out of stock"}
        </button>
      </div>
 </div>

      {/* Size */}
      {availableSizes.length > 0 && (
        <div>
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
            Tire size
          </label>
          <div className="relative">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full appearance-none bg-white border-[1.5px] border-gray-200 rounded-lg px-3.5 py-2.5 pr-9 text-sm font-semibold text-gray-900 focus:outline-none focus:border-gray-900 hover:border-gray-400 transition-colors cursor-pointer"
            >
              {availableSizes.map((s) => <option key={s}>{s}</option>)}
            </select>
            <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          </div>
        </div>
      )}



      {/* Fitment */}
      <button className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-lg px-3.5 py-2.5 hover:bg-emerald-100 transition-colors text-left w-full">
        <MdThumbUp className="w-4 h-4 text-emerald-600 shrink-0" />
        <span className="text-sm font-semibold text-emerald-700 flex-1">
          {product?.tireSize
            ? `Size: ${product.tireSize} • ${product?.tireClass || String(product?.category || "All Weather")} tire`
            : `Fits the ${product?.title || "your vehicle"}`
          }
        </span>
        <MdOutlineArrowForwardIos className="w-4 h-4 text-emerald-600 shrink-0" />
      </button>



      {/* Stock / shipping */}
      <div className="flex items-center gap-4 sm:gap-5 text-[13px]">
        <span className={`flex items-center gap-1.5 font-semibold ${inStock ? "text-emerald-600" : "text-red-600"}`}>
          <MdCheckCircle className="w-3.5 h-3.5" /> {inStock ? "In stock" : "Out of stock"}
        </span>
        <span className="flex items-center gap-1.5 text-gray-500 font-medium">
          <MdOutlineLocalShipping className="w-3.5 h-3.5" /> Free 1-day shipping
        </span>
      </div>



      {/* Affirm */}
      <div className="flex items-center gap-2.5 border-[1.5px] border-gray-200 rounded-lg px-3.5 py-2.5">
        <MdThumbUp className="w-4 h-4 text-gray-400 shrink-0" />
        <p className="text-[12.5px] text-gray-700 font-medium flex-1">
          As low as <strong>${Math.round(sellingPrice / 4)}/mo</strong> or <strong>0% APR</strong> affirm
        </p>
        <button className="bg-white border-[1.5px] border-gray-200 rounded-md px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors shrink-0">
          Learn more
        </button>
      </div>

      {/* Guarantee */}
      <p className="text-[11.5px] text-gray-500 leading-relaxed -mt-1">
        as low as ${(sellingPrice * 1.1).toFixed(2)}/tire with installation ⚑<br />
        <a href="#" className="text-blue-600 underline hover:text-blue-800">
          Best price guarantee
        </a>{" "}
        <span className="text-gray-400 text-[10px]">ⓘ</span>
      </p>

    </div>
  );
};

export default TireProductRightPanel;
