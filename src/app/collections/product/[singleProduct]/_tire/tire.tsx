"use client";

import { useState } from "react";
import { TTireProduct } from "@/types/product";
import { getProductThumbnail } from "@/utils/product";
import TireProvider from "./context/TireProvider";
import TireProductLeftPanel from "./components/TireProductLeftPanel";
import TireProductRightPanel from "./components/TireProductRightPanel";

const Tire = ({ product }: { product: TTireProduct }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.tireSize || "");
  const [qty, setQty] = useState(4);

  // Generate thumbnails from actual product images
  const mainImage = getProductThumbnail(product) || "/tire-not-available.png";
  const productImages = product?.images || [];

  // Create thumbs array with actual images
  const thumbs = [
    { id: 0, label: "Main", image: mainImage },
    ...(productImages.length > 0
      ? productImages.slice(0, 3).map((img, idx) => ({
          id: idx + 1,
          label: `View ${idx + 2}`,
          image: img
        }))
      : [
          { id: 1, label: "Side", image: mainImage },
          { id: 2, label: "Tread", image: mainImage },
          { id: 3, label: "Angle", image: mainImage }
        ])
  ];

  // Get available sizes - could be expanded to fetch related sizes
  const availableSizes = product?.tireSize ? [product.tireSize] : ["225/50R18 99V XL", "215/55R17 98V XL"];

  return (
    <TireProvider>
      <div
        className="min-h-screen  flex items-center justify-center p-4 sm:p-6"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        <div className="bg-white rounded-2xl shadow-lg max-w-6xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* LEFT PANEL */}
          <TireProductLeftPanel
            product={product}
            thumbs={thumbs}
            activeThumb={activeThumb}
            setActiveThumb={setActiveThumb}
          />



          {/* RIGHT PANEL */}
          <TireProductRightPanel
            product={product}
            thumbs={thumbs}
            activeThumb={activeThumb}
            setActiveThumb={setActiveThumb}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            availableSizes={availableSizes}
            qty={qty}
            setQty={setQty}
          />

        </div>
      </div>
    </TireProvider>
  );
};

export default Tire;
