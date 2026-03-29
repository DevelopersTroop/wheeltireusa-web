"use client";

import { TWheelProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { addPackage } from "@/redux/features/packageSlice";
import { addToCart } from "@/redux/features/cartSlice";
import { useState, useEffect } from "react";
import { TbTruckDelivery, TbPhone } from "react-icons/tb";
import { MdCheckCircle, MdLocationOn } from "react-icons/md";
import CompareButton from "@/components/shared/CompareButton/CompareButton";
import { useCartHook } from "@/hooks/useCartHook";
import ZipCodeModal from "./ZipCodeModal";

interface PurchaseSidebarProps {
  product: TWheelProduct;
}

const PurchaseSidebar = ({ product }: PurchaseSidebarProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [quantity] = useState(4); // Default to set of 4
  const { setOpen } = useCartHook();

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
  const pricePerWheel = product?.sellingPrice || 0;
  const priceForSet = pricePerWheel * 4;

  // Check if item is already in cart
  const isInCart = Object.values(cartProducts).some((p: any) => p.id === product.id);

  // Add to cart
  const handleAddToCart = async () => {
    if (isInCart) {
      setOpen();
      return;
    }
    try {
      setLoading(true);
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
      // Open cart slider instead of redirecting
      setOpen();
    } finally {
      setLoading(false);
    }
  };

  // Buy with tires - navigate to tire selection
  const handleBuyWithTires = () => {
    const pkg = uuidv4();
    dispatch(
      addPackage({
        packageId: pkg,
        wheel: { ...product, cartPackage: pkg },
      })
    );
    router.push(
      `/collections/product-category/tires?wheelDiameter=${product.wheelDiameter}&cartPackage=${pkg}`
    );
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 bg-[#EFF6FF] px-4 py-3 rounded">
       {/* Discount & Shipping Badges */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* Discount Badge */}
        <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-red-50 border border-red-200 text-red-600 text-[8px] sm:text-[9px] font-bold uppercase tracking-wide rounded">
          10% Additional Discount
        </span>

        {/* Free Shipping Badge */}
        <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-green-50 border border-green-200 text-green-600 text-[10px] sm:text-[9px] font-bold uppercase tracking-wide rounded">
          Free Shipping
        </span>
      </div>

      {/* Price Display */}
      <div>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
          ${pricePerWheel.toFixed(2)} ea. / ${priceForSet.toFixed(2)} set
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



      {/* Action Buttons */}
      <div className="flex flex-col gap-2 sm:gap-3">
        {/* Primary Button - Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="
            w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded
            bg-primary hover:bg-primary/90 text-white
            text-base sm:text-base font-semibold uppercase tracking-wide
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isInCart ? "Go to Cart" : "Add to Cart"}
        </button>

        {/* Green Button - Buy With Tires */}
        <button
          onClick={handleBuyWithTires}
          disabled={loading}
          className="
            w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded
            bg-green-600 hover:bg-green-700 text-white
            text-sm sm:text-base font-semibold uppercase tracking-wide
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Buy With Tires
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
          <span>Lug nuts and center rings included</span>
        </div>
      </div>

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

export default PurchaseSidebar;
