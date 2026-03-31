"use client";

import { useState } from "react";
import { TTireProduct } from "@/types/product";
import { getProductThumbnail } from "@/utils/product";
import TireProvider from "./context/TireProvider";
import TireProductLeftPanel from "./components/TireProductLeftPanel";
import TireProductRightPanel from "./components/TireProductRightPanel";
import TireTabs from "./tire-tabs";
import MobileStickyBar from "./mobile-sticky-bar";
import { MdHeadsetMic, MdVerified, MdShoppingBag, MdPalette, MdPrecisionManufacturing, MdSensors, MdBuild, MdHardware } from "react-icons/md";

const Tire = ({ product }: { product: TTireProduct }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.tireSize || "");
  const [qty, setQty] = useState(4);

  // Generate thumbnails from actual product images
  const mainImage = getProductThumbnail(product) || "/tire-not-available.png";
  const productImages = product?.images || [];

  // Create unique images set (deduplicate)
  const uniqueImages = new Set<string>();
  if (mainImage) uniqueImages.add(mainImage);
  productImages.forEach(img => { if (img) uniqueImages.add(img); });

  // Create thumbs array only if there are multiple unique images
  const thumbs = uniqueImages.size > 1
    ? [
        { id: 0, label: "Main", image: mainImage },
        ...(productImages.slice(0, 3)
          .filter(img => img && img !== mainImage)
          .map((img, idx) => ({
            id: idx + 1,
            label: `View ${idx + 2}`,
            image: img
          }))
        )
      ]
    : [{ id: 0, label: "Main", image: mainImage }];

  // Get available sizes - could be expanded to fetch related sizes
  const availableSizes = product?.tireSize ? [product.tireSize] : ["225/50R18 99V XL", "215/55R17 98V XL"];

  return (
    <TireProvider>
      <div
        className="min-h-screen bg-white"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          <div className="bg-white rounded-2xl shadow-lg max-w-6xl mx-auto w-full overflow-hidden grid grid-cols-1 md:grid-cols-2">

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

          {/* ── TABS SECTION (Full Width) ── */}
          <div className="mt-8 sm:mt-10 md:mt-12">
            <TireTabs product={product} />
          </div>

          {/* ── ELITE ADVANTAGE SECTION ── */}
          <div className="mt-10 sm:mt-12 md:mt-16">
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                 Advantage
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mt-3 sm:mt-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  title: "Dedicated Tire Experts",
                  description: "Our in-house Tire Team is always on hand to assist you with any questions",
                  icon: <MdHeadsetMic className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-blue-600",
                  bgColor: "bg-blue-50",
                },
                {
                  title: "Guaranteed Fitment",
                  description: "Your new tire will perfectly fit your vehicle - guaranteed by Elite",
                  icon: <MdVerified className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-green-600",
                  bgColor: "bg-green-50",
                },
                {
                  title: "Tire & Wheel Packages",
                  description: "Save your precious time and money by ordering a complete tire and wheel set",
                  icon: <MdShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-purple-600",
                  bgColor: "bg-purple-50",
                },
                {
                  title: "Premium Tire Brands",
                  description: "We carry all major tire brands to ensure you get the best quality tires",
                  icon: <MdPrecisionManufacturing className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-orange-600",
                  bgColor: "bg-orange-50",
                },
                {
                  title: "State-of-the-Art Equipment",
                  description: "We use advanced Hunter® equipment to ensure damage-free mounting & accurate balancing",
                  icon: <MdBuild className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-red-600",
                  bgColor: "bg-red-50",
                },
                {
                  title: "TPMS Sensors",
                  description: "TPMS sensors purchased as part of a package are installed at no additional charge",
                  icon: <MdSensors className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-cyan-600",
                  bgColor: "bg-cyan-50",
                },
                {
                  title: "Free Mounting & Balancing",
                  description: "Order a tire & wheel package and get professional mounting and balancing for free",
                  icon: <MdHardware className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-indigo-600",
                  bgColor: "bg-indigo-50",
                },
                {
                  title: "Road Hazard Protection",
                  description: "Protect your investment with our comprehensive road hazard protection plans",
                  icon: <MdPalette className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-pink-600",
                  bgColor: "bg-pink-50",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg ${item.bgColor} ${item.color} shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 uppercase tracking-wide mb-1.5 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── WHY CHOOSE ELITE SECTION ── */}
          <div className="mt-10 sm:mt-12 md:mt-16">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 sm:p-8 md:p-12 border border-gray-200">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide text-center mb-4 sm:mb-6">
                  Why Choose WheelTire USA
                </h2>
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mb-5 sm:mb-6 md:mb-8" />

                <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-sm sm:text-base">
                    We take pride in our fitment information and don&apos;t take our fitment guarantee lightly. You can depend on the fitment advice from our professionals because they have decades of knowledge and experience to draw from. Research the brands of equipment we use and the tire accessories we offer and you&apos;ll find they&apos;re the finest in the industry, because we want you to have the best.
                  </p>

                  <p className="text-sm sm:text-base">
                    The combination of products and services we provide cannot be matched, especially by a local tire store. From premium performance tires to all-season tires, our extensive selection ensures you&apos;ll find the perfect match for your vehicle. Our commitment to quality, competitive pricing, and exceptional customer service sets us apart as the trusted choice for tire and wheel enthusiasts nationwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <MobileStickyBar product={product} />
    </TireProvider>
  );
};

export default Tire;
