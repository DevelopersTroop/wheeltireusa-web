"use client";

import { useEffect, useState } from "react";
import { TTireProduct } from "@/types/product";
import { getProductThumbnail } from "@/utils/product";
import TireProvider from "./context/TireProvider";
import TireProductInfoCenter from "./components/TireProductInfoCenter";
import TireTabs from "./tire-tabs";
import MobileStickyBar from "./mobile-sticky-bar";
import { MdChevronRight } from "react-icons/md";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Link from "next/link";

import ThumbnailGallery from "./components/ThumbnailGallery";
import MainImageDisplay from "./components/MainImageDisplay";
import TirePurchaseSidebar from "./components/TirePurchaseSidebar";

import Advantage from "@/components/shared/Advantage/advantage";
import WhyChooseElite from "@/components/shared/WhyChooseElite/why-choose-elite";

import {
  tireAdvantageItems,
  tireWhyChooseParagraphs,
} from "./config/tireAdvantage";

const Tire = ({ product }: { product: TTireProduct }) => {
  // ✅ Hooks ALWAYS at top (fixes React error)
  const [selectedImage, setSelectedImage] = useState<string>(
    "/tire-not-available.png"
  );

  // ✅ Sync product → state safely
  useEffect(() => {
    if (!product) return;

    const main = getProductThumbnail(product);

    const firstImage =
      Array.isArray(product?.images) && product.images.length > 0
        ? product.images[0]
        : null;

    setSelectedImage(
      main || firstImage || "/tire-not-available.png"
    );
  }, [product]);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // ✅ SAFE image count (prevents null crash)
  const imageCount = (() => {
    const images = new Set<string>();

    const mainImage = getProductThumbnail(product);
    if (mainImage) images.add(mainImage);

    if (Array.isArray(product?.images)) {
      product.images.forEach((img) => {
        if (img) images.add(img);
      });
    }

    return images.size;
  })();

  const showGallery = imageCount > 1;

  // ✅ AFTER hooks only
  if (!product) {
    return (
      <div className="p-4 max-w-7xl mx-auto">
        Loading product...
      </div>
    );
  }

  return (
    <TireProvider>
      <div className="min-h-screen bg-white">

        {/* ── BREADCRUMB ── */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <Breadcrumb>
              <li className="flex items-center gap-1 text-xs">
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Wheels & Tires
                </Link>
                
              </li>

              <li className="flex items-center gap-1 text-xs">
                <Link
                  href="/collections/product-category/tires"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Tires
                </Link>
                
              </li>

              <li className="text-xs text-gray-500 font-medium">
                {product?.brand || "Brand"}
              </li>
            </Breadcrumb>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 md:gap-8 items-start">

            {/* LEFT */}
            {showGallery && (
              <div className="xl:w-[120px] w-full shrink-0 order-3 xl:order-1">
                <ThumbnailGallery
                  product={product}
                  fallbackImage="/tire-not-available.png"
                  onImageSelect={handleImageSelect}
                />
              </div>
            )}

            {/* CENTER */}
            <div className="flex-1 min-w-0 order-1 xl:order-2 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

                <div className="lg:col-span-7">
                  <MainImageDisplay
                    product={product}
                    fallbackImage="/tire-not-available.png"
                    selectedImage={selectedImage}
                  />
                </div>

                <div className="lg:col-span-5">
                  <TireProductInfoCenter product={product} />
                </div>

              </div>
            </div>

            {/* RIGHT */}
            <div className="xl:w-[320px] w-full shrink-0 order-2 xl:order-3">
              <TirePurchaseSidebar product={product} />
            </div>

          </div>

          {/* TABS */}
          <div className="mt-8 sm:mt-10 md:mt-12">
            <TireTabs product={product} />
          </div>

          {/* EXTRA SECTIONS */}
          <Advantage items={tireAdvantageItems} />
          <WhyChooseElite paragraphs={tireWhyChooseParagraphs} />

        </div>

        {/* MOBILE */}
        <MobileStickyBar product={product} />

      </div>
    </TireProvider>
  );
};

export default Tire;