"use client";

import { useState } from "react";
import { TTireProduct } from "@/types/product";
import { getProductThumbnail } from "@/utils/product";
import TireProvider from "./context/TireProvider";
import TireProductInfoCenter from "./components/TireProductInfoCenter";
import TireTabs from "./tire-tabs";
import MobileStickyBar from "./mobile-sticky-bar";
import { MdChevronRight } from "react-icons/md";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Link from "next/link";

// New components for wheel-style layout
import ThumbnailGallery from "./components/ThumbnailGallery";
import MainImageDisplay from "./components/MainImageDisplay";
import TirePurchaseSidebar from "./components/TirePurchaseSidebar";

// Shared components
import Advantage from "@/components/shared/Advantage/advantage";
import WhyChooseElite from "@/components/shared/WhyChooseElite/why-choose-elite";

// Tire-specific config
import { tireAdvantageItems, tireWhyChooseParagraphs } from "./config/tireAdvantage";

const Tire = ({ product }: { product: TTireProduct }) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    getProductThumbnail(product) || product?.images?.[0] || "/tire-not-available.png"
  );

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // Calculate total number of unique images
  const imageCount = (() => {
    const images = new Set<string>();
    const mainImage = getProductThumbnail(product);
    if (mainImage) images.add(mainImage);
    if (product?.images && Array.isArray(product.images)) {
      product.images.forEach((img) => { if (img) images.add(img); });
    }
    return images.size;
  })();

  // Only show gallery if there's more than 1 image
  const showGallery = imageCount > 1;

  return (
    <TireProvider>
      <div className="min-h-screen bg-white">

        {/* ── LIGHT BREADCRUMB HEADER ── */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <Breadcrumb>
              {[
                { label: "Wheels & Tires", href: "/" },
                { label: "Tires", href: "/collections/product-category/tires" },
                { label: product?.brand || "Brand", href: `/collections/product-category/tires` },
              ].map((item, index, arr) => (
                <li key={index} className="flex items-center gap-1 text-xs">
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                  {index < arr.length - 1 && (
                    <MdChevronRight className="text-gray-400" />
                  )}
                </li>
              ))}
            </Breadcrumb>
          </div>
        </div>

        {/* ── MAIN 3-COLUMN LAYOUT ── */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 md:gap-8 items-start">

            {/* LEFT COLUMN - Thumbnail Gallery (~120px) - Only show if multiple images */}
            {showGallery && (
              <div className="xl:w-[120px] w-full shrink-0 order-3 xl:order-1">
                <ThumbnailGallery
                  product={product}
                  fallbackImage="/tire-not-available.png"
                  onImageSelect={handleImageSelect}
                />
              </div>
            )}

            {/* CENTER COLUMN - Main Image + Product Details (widest) */}
            <div className="flex-1 min-w-0 order-1 xl:order-2 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                {/* Main Image Display - 60% */}
                <div className="lg:col-span-7">
                  <MainImageDisplay
                    product={product}
                    fallbackImage="/tire-not-available.png"
                    selectedImage={selectedImage}
                  />
                </div>

                {/* Product Info Center - 40% */}
                <div className="lg:col-span-5">
                  <TireProductInfoCenter product={product} />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Purchase Sidebar (~300px) */}
            <div className="xl:w-[320px] w-full shrink-0 order-2 xl:order-3">
              <TirePurchaseSidebar product={product} />
            </div>

          </div>

          {/* ── TABS SECTION (Full Width) ── */}
          <div className="mt-8 sm:mt-10 md:mt-12">
            <TireTabs product={product} />
          </div>

          {/* ── ADVANTAGE SECTION ── */}
          <Advantage items={tireAdvantageItems} />

          {/* ── WHY CHOOSE ELITE SECTION ── */}
          <WhyChooseElite paragraphs={tireWhyChooseParagraphs} />

        </div>

        {/* Mobile Sticky Bar */}
        <MobileStickyBar product={product} />

      </div>
    </TireProvider>
  );
};

export default Tire;
