"use client";

import { TTireProduct } from "@/types/product";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { addToCart } from "@/redux/features/cartSlice";
import { triggerGaAddToCart } from "@/utils/analytics";
import { useCartHook } from "@/hooks/useCartHook";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdCheckCircle, MdLocationOn, MdKeyboardArrowDown } from "react-icons/md";
import CompareButton from "@/components/shared/CompareButton/CompareButton";
import ZipCodeModal from "./ZipCodeModal";

interface TirePurchaseSidebarProps {
  product: TTireProduct;
}

const TirePurchaseSidebar = ({ product }: TirePurchaseSidebarProps) => {
  const dispatch = useAppDispatch();
  const { setOpen } = useCartHook();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(4);
  const [justAdded, setJustAdded] = useState(false);

  // Delivery location state
  const [isZipModalOpen, setIsZipModalOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState({
    zipCode: "97129",
    city: "Hillsboro",
    state: "OR",
  });

  // Load saved location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("deliveryLocation");
    if (savedLocation) {
      try {
        setDeliveryLocation(JSON.parse(savedLocation));
      } catch {
        // Use default if parse fails
      }
    }
  }, []);

  // Handle zip code save
  const handleZipSave = (zipCode: string, city: string, state: string) => {
    const newLocation = { zipCode, city, state };
    setDeliveryLocation(newLocation);
    localStorage.setItem("deliveryLocation", JSON.stringify(newLocation));
  };

  // Calculate delivery date (7 days from now)
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 7);

  const formattedDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const cartProducts = useTypedSelector((state) => state.persisted.cart.products);

  // Calculate pricing
  const sellingPrice = product?.sellingPrice ?? 0;
  const originalPrice = sellingPrice * 1.5;
  const discountPct = Math.round((1 - sellingPrice / originalPrice) * 100);
  const totalSavings = ((originalPrice - sellingPrice) * quantity).toFixed(2);
  const inStock = (product?.availableStock ?? 5) > 0;
  const stockQuantity = product?.availableStock ?? 0;

  // Reset "just added" animation state after a delay
  useEffect(() => {
    if (justAdded) {
      const timer = setTimeout(() => setJustAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [justAdded]);

  // Check if item is already in cart
  const isInCart = Object.values(cartProducts).some(
    (p: any) => p.id === product.id
  );

  // Get available sizes
  const availableSizes = product?.tireSize ? [product.tireSize] : [];

  // Get quantity options based on stock
  const QTY_OPTIONS = stockQuantity > 0
    ? [1, 2, 3, 4].filter(q => q <= stockQuantity)
    : [1, 2, 3, 4];

  const handleAddToCart = async () => {
    if (!inStock) return;

    setJustAdded(true);
    try {
      triggerGaAddToCart(product, quantity);
      const packageId = uuidv4();
      const cartSerial = uuidv4();
      dispatch(
        addToCart({
          ...product,
          cartPackage: packageId,
          cartSerial,
          quantity,
          metaData: {},
        })
      );
      setOpen();
    } catch (error) {
      setJustAdded(false);
    }
  };

  // Buy with wheels - navigate to wheel selection
  const handleBuyWithWheels = () => {
    router.push("/collections/product-category/wheels");
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 bg-[#EFF6FF] px-4 py-3 rounded">
      {/* Discount & Shipping Badges */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* Discount Badge */}
        {discountPct > 0 && (
          <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-red-50 border border-red-200 text-red-600 text-[8px] sm:text-[9px] font-bold uppercase tracking-wide rounded">
            {discountPct}% Additional Discount
          </span>
        )}

        {/* Free Shipping Badge */}
        <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-green-50 border border-green-200 text-green-600 text-[10px] sm:text-[9px] font-bold uppercase tracking-wide rounded">
          Free Shipping
        </span>
      </div>

      {/* Price Display */}
      <div>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
          ${sellingPrice.toFixed(2)} ea. / ${(sellingPrice * 4).toFixed(2)} set
        </p>
      </div>

      {/* In Stock & Delivery */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        {/* Stock Status */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <MdCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-green-600">In Stock</span>
        </div>

        {/* Delivery Info */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <MdLocationOn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
          <span className="text-[10px] sm:text-xs text-gray-600">
            Delivery by {formattedDate} to the lower 48
          </span>
        </div>
      </div>

      {/* Tire Size Selection */}
      {availableSizes.length > 0 && (
        <div>
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
            Tire size
          </label>
          <div className="relative">
            <select
              value={product.tireSize || ""}
              className="w-full appearance-none bg-white border-[1.5px] border-gray-200 rounded-lg px-3.5 py-2.5 pr-9 text-sm font-semibold text-gray-900 focus:outline-none focus:border-gray-900 hover:border-gray-400 transition-colors cursor-pointer"
            >
              {availableSizes.map((s) => <option key={s}>{s}</option>)}
            </select>
            <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 sm:gap-3">
        {/* Primary Button - Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={loading || !inStock}
          className="
            w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded
            bg-primary hover:bg-primary/90 text-white
            text-base sm:text-base font-semibold uppercase tracking-wide
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {justAdded ? "Added ✓" : isInCart ? "Go to Cart" : "Add to Cart"}
        </button>

        {/* Green Button - Buy With Wheels */}
        <button
          onClick={handleBuyWithWheels}
          disabled={loading}
          className="
            w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded
            bg-green-600 hover:bg-green-700 text-white
            text-sm sm:text-base font-semibold uppercase tracking-wide
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Buy with Wheels
        </button>

        {/* Comparison Button */}
        <CompareButton product={product} variant="outline" />
      </div>

      {/* Availability */}
      <p className="text-xs sm:text-sm text-gray-500">
        Availability Varies by Warehouse
      </p>

      {/* Delivery Location */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        <TbTruckDelivery className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
        <span className="text-xs sm:text-sm text-gray-500">
          Deliver to:{" "}
          <span className="font-medium text-gray-700">
            {deliveryLocation.zipCode} - {deliveryLocation.city}, {deliveryLocation.state}
          </span>
        </span>
        <button
          onClick={() => setIsZipModalOpen(true)}
          className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-700 font-medium underline"
        >
          change
        </button>
      </div>

      {/* Perks */}
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 shrink-0" />
          <span>Free mounting and balancing</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 shrink-0" />
          <span>Free shipping on all orders</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 shrink-0" />
          <span>Road hazard protection available</span>
        </div>
      </div>

      {/* Guarantee */}
      <p className="text-[11.5px] text-gray-500 leading-relaxed -mt-1">
        as low as ${(sellingPrice * 1.1).toFixed(2)}/tire with installation ⚑<br />
        <a href="#" className="text-blue-600 underline hover:text-blue-800">
          Best price guarantee
        </a>{" "}
        <span className="text-gray-400 text-[10px]">ⓘ</span>
      </p>

      {/* Zip Code Modal */}
      <ZipCodeModal
        isOpen={isZipModalOpen}
        onClose={() => setIsZipModalOpen(false)}
        currentZip={deliveryLocation.zipCode}
        onSave={handleZipSave}
      />
    </div>
  );
};

export default TirePurchaseSidebar;
