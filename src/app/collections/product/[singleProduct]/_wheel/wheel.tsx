"use client";

import { TWheelProduct } from "@/types/product";
import WheelProvider from "./context/WheelProvider";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import WheelTabs from "./wheel-tabs";
import WheelSpecifications from "./wheel-specifications";
import { useState } from "react";

import ThumbnailGallery from "./components/ThumbnailGallery";
import MainImageDisplay from "./components/MainImageDisplay";
import ProductInfoCenter from "./components/ProductInfoCenter";
import PurchaseSidebar from "./components/PurchaseSidebar";
import WheelMobileStickyBar from "./mobile-sticky-bar";

import Advantage from "@/components/shared/Advantage/advantage";
import WhyChooseElite from "@/components/shared/WhyChooseElite/why-choose-elite";

import {
  wheelAdvantageItems,
  wheelWhyChooseParagraphs,
} from "./config/wheelAdvantage";

const Wheel = ({ product }: { product: TWheelProduct }) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    product?.itemImage || product?.images?.[0] || "/wheel-not-available.png"
  );

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const imageCount = (() => {
    const images = new Set<string>();
    if (product?.itemImage) images.add(product.itemImage);
    if (product?.images && Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img) images.add(img);
      });
    }
    return images.size;
  })();

  const showGallery = imageCount > 1;

  return (
    <WheelProvider>
      <div className="min-h-screen bg-white">

        {/* ── BREADCRUMB ── */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

            {/* ❌ FIX: removed <li> wrapper, using div instead */}
            <Breadcrumb>
              <div className="flex items-center gap-1 text-xs">
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  Wheels & Tires
                </Link>
                
              </div>

              <div className="flex items-center gap-1 text-xs">
                <Link
                  href="/collections/product-category/wheels"
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  Custom Wheels
                </Link>
                
              </div>

              <div className="flex items-center gap-1 text-xs">
                <Link
                  href="/collections/product-category/wheels"
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  {product?.brand || "Brand"}
                </Link>
              </div>
            </Breadcrumb>

          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 md:gap-8 items-start">

            {showGallery && (
              <div className="xl:w-[120px] w-full shrink-0 order-3 xl:order-1">
                <ThumbnailGallery
                  product={product}
                  fallbackImage="/wheel-not-available.png"
                  onImageSelect={handleImageSelect}
                />
              </div>
            )}

            <div className="flex-1 min-w-0 order-1 xl:order-2 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

                <MainImageDisplay
                  product={product}
                  fallbackImage="/wheel-not-available.png"
                  selectedImage={selectedImage}
                />

                <ProductInfoCenter product={product} />

              </div>
            </div>

            <div className="xl:w-[320px] w-full shrink-0 order-2 xl:order-3">
              <PurchaseSidebar product={product} />
            </div>

          </div>

          <div className="mt-8 sm:mt-10 md:mt-12">
            <WheelTabs product={product} />
          </div>

          <Advantage items={wheelAdvantageItems} />

          <WhyChooseElite paragraphs={wheelWhyChooseParagraphs} />

        </div>

        <WheelMobileStickyBar product={product} />

      </div>
    </WheelProvider>
  );
};

export default Wheel;