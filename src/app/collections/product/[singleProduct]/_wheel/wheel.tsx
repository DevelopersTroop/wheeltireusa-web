import { TWheelProduct } from "@/types/product";
import WheelProvider from "./context/WheelProvider";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Link from "next/link";
import { MdChevronRight, MdHeadsetMic, MdVerified, MdShoppingBag, MdPalette, MdPrecisionManufacturing, MdSensors, MdBuild, MdHardware } from "react-icons/md";
import WheelTabs from "./wheel-tabs";
import WheelSpecifications from "./wheel-specifications";
import { useState } from "react";

// New components for screenshot clone design
import ThumbnailGallery from "./components/ThumbnailGallery";
import MainImageDisplay from "./components/MainImageDisplay";
import ProductInfoCenter from "./components/ProductInfoCenter";
import PurchaseSidebar from "./components/PurchaseSidebar";
import WheelMobileStickyBar from "./mobile-sticky-bar";

const Wheel = ({ product }: { product: TWheelProduct }) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    product?.itemImage || product?.images?.[0] || "/wheel-not-available.png"
  );

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // Calculate total number of unique images
  const imageCount = (() => {
    const images = new Set<string>();
    if (product?.itemImage) images.add(product.itemImage);
    if (product?.images && Array.isArray(product.images)) {
      product.images.forEach((img) => { if (img) images.add(img); });
    }
    return images.size;
  })();

  // Only show gallery if there's more than 1 image
  const showGallery = imageCount > 1;

  return (
    <WheelProvider>
      <div className="min-h-screen bg-white">

        {/* ── LIGHT BREADCRUMB HEADER ── */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <Breadcrumb>
              {[
                { label: "Wheels & Tires", href: "/" },
                { label: "Custom Wheels", href: "/collections/product-category/wheels" },
                { label: product?.brand || "Brand", href: `/collections/product-category/wheels` },
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
                  fallbackImage="/wheel-not-available.png"
                  onImageSelect={handleImageSelect}
                />
              </div>
            )}

            {/* CENTER COLUMN - Main Image + Product Details (widest) */}
            <div className="flex-1 min-w-0 order-1 xl:order-2 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Main Image Display */}
                <div className="lg:col-span-1">
                  <MainImageDisplay
                    product={product}
                    fallbackImage="/wheel-not-available.png"
                    selectedImage={selectedImage}
                  />
                </div>

                {/* Product Info Center */}
                <div className="lg:col-span-1">
                  <ProductInfoCenter product={product} />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Purchase Sidebar (~300px) */}
            <div className="xl:w-[320px] w-full shrink-0 order-2 xl:order-3">
              <PurchaseSidebar product={product} />
            </div>

          </div>

          {/* ── TABS SECTION (Full Width) ── */}
          <div className="mt-8 sm:mt-10 md:mt-12">
            <WheelTabs product={product} />
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
                  title: "Dedicated Wheel Experts",
                  description: "Our in-house Wheel Team is always on hand to assist you with any questions",
                  icon: <MdHeadsetMic className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-blue-600",
                  bgColor: "bg-blue-50",
                },
                {
                  title: "Guaranteed Fitment",
                  description: "Your new wheel and tire package will perfectly fit your car - guaranteed by Elite",
                  icon: <MdVerified className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-green-600",
                  bgColor: "bg-green-50",
                },
                {
                  title: "Wheel & Tire Packages",
                  description: "Save your precious time and money by ordering a complete wheel and tire set",
                  icon: <MdShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-purple-600",
                  bgColor: "bg-purple-50",
                },
                {
                  title: "Customization Options",
                  description: "Whatever color you want, we can customize many of our wheels in our in-house paint facility",
                  icon: <MdPalette className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-pink-600",
                  bgColor: "bg-pink-50",
                },
                {
                  title: "State-of-the-Art Equipment",
                  description: "We use advanced Hunter® equipment to ensure damage-free mounting & accurate balancing",
                  icon: <MdPrecisionManufacturing className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-orange-600",
                  bgColor: "bg-orange-50",
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
                  description: "Order a wheel & tire package and get professional mounting and balancing for free",
                  icon: <MdBuild className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-red-600",
                  bgColor: "bg-red-50",
                },
                {
                  title: "Installation Kit",
                  description: "Your new wheels will come with all hardware needed for hassle-free installation (where applicable)",
                  icon: <MdHardware className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
                  color: "text-indigo-600",
                  bgColor: "bg-indigo-50",
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
                    We take pride in our fitment information and don&apos;t take our fitment guarantee lightly. You can depend on the fitment advice from our professionals because they have decades of knowledge and experience to draw from. Research the brands of equipment we use and the wheel accessories we offer and you&apos;ll find they&apos;re the finest in the industry, because we want you to have the best.
                  </p>

                  <p className="text-sm sm:text-base">
                    The combination of products and services we provide cannot be matched, especially by a local tire store. From premium custom wheels to top-tier tires, our extensive selection ensures you&apos;ll find the perfect match for your vehicle. Our commitment to quality, competitive pricing, and exceptional customer service sets us apart as the trusted choice for wheel and tire enthusiasts nationwide.
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Mobile Sticky Bar */}
        <WheelMobileStickyBar product={product} />

      </div>
    </WheelProvider>
  );
};

export default Wheel;