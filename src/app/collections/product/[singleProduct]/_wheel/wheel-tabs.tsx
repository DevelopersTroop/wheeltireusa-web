"use client";

import { useState } from "react";
import WheelSpecifications from "./wheel-specifications";
import { Reviews } from "@/components/shared/Reviews/Reviews";

type TabType = "features" | "details" | "warranty" | "reviews" | "qa";

const WheelTabs = ({ product }: { product: any }) => {
  const [activeTab, setActiveTab] = useState<TabType>("features");

  // Mock review and QA counts - replace with actual data from API
  const reviewCount = 173;
  const qaCount = 0;

  return (
    <div className=" overflow-hidden">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-300 mt-6 sm:mt-8 md:mt-10 overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
        <button
          onClick={() => setActiveTab("features")}
          className={`
            shrink-0 px-3 sm:px-4 md:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide
            transition-colors border-b-2 whitespace-nowrap
            ${activeTab === "features"
              ? "border-black text-black bg-white"
              : "border-transparent text-gray-600 hover:text-gray-900"
            }
          `}
        >
          Features
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`
            shrink-0 px-3 sm:px-4 md:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide
            transition-colors border-b-2 whitespace-nowrap
            ${activeTab === "details"
              ? "border-black text-black bg-white"
              : "border-transparent text-gray-600 hover:text-gray-900"
            }
          `}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("warranty")}
          className={`
            shrink-0 px-3 sm:px-4 md:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide
            transition-colors border-b-2 whitespace-nowrap
            ${activeTab === "warranty"
              ? "border-black text-black bg-white"
              : "border-transparent text-gray-600 hover:text-gray-900"
            }
          `}
        >
          Warranty
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`
            shrink-0 px-3 sm:px-4 md:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide
            transition-colors border-b-2 whitespace-nowrap
            ${activeTab === "reviews"
              ? "border-black text-black bg-white"
              : "border-transparent text-gray-600 hover:text-gray-900"
            }
          `}
        >
          Reviews ({reviewCount})
        </button>
        <button
          onClick={() => setActiveTab("qa")}
          className={`
            shrink-0 px-3 sm:px-4 md:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide
            transition-colors border-b-2 whitespace-nowrap
            ${activeTab === "qa"
              ? "border-black text-black bg-white"
              : "border-transparent text-gray-600 hover:text-gray-900"
            }
          `}
        >
          Q&A ({qaCount})
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-3 sm:p-4 md:p-6 bg-white">
        {activeTab === "features" && (
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Key Features</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {product?.brand && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700"><strong>Brand:</strong> {product.brand}</span>
                </li>
              )}
              {product?.model && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700"><strong>Model:</strong> {product.model}</span>
                </li>
              )}
              {product?.wheelStyle && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700"><strong>Style:</strong> {product.wheelStyle}</span>
                </li>
              )}
              {product?.wheelMaterial && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700"><strong>Material:</strong> {product.wheelMaterial}</span>
                </li>
              )}
              {product?.wheelStructure && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700"><strong>Construction:</strong> {product.wheelStructure}</span>
                </li>
              )}
              {product?.wheelSpokeNumber && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700"><strong>Spoke Count:</strong> {product.wheelSpokeNumber}</span>
                </li>
              )}
              {product?.color && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700"><strong>Finish:</strong> {product.color}</span>
                </li>
              )}
              {product?.wheelSize && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700"><strong>Size:</strong> {product.wheelSize}</span>
                </li>
              )}
              {product?.offset && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700"><strong>Offset:</strong> {product.offset}</span>
                </li>
              )}
              {product?.boltPatterns && Array.isArray(product.boltPatterns) && product.boltPatterns.length > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700"><strong>Bolt Pattern:</strong> {product.boltPatterns.join(", ")}</span>
                </li>
              )}
            </ul>
          </div>
        )}

        {activeTab === "details" && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl text-gray-700 font-bold">
                About The {product?.brand}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3">{product?.title}</p>
            </div>
            <WheelSpecifications product={product} variant="full" />
          </div>
        )}

        {activeTab === "warranty" && (
          <div className="prose prose-sm max-w-none">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Warranty Information</h3>
            <p className="text-sm sm:text-base text-gray-700">
              All our wheels come with a manufacturer&apos;s warranty covering structural defects.
              Please contact us for specific warranty details for this product.
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <Reviews productId={product.id} />
        )}

        {activeTab === "qa" && (
          <div className="text-center py-8">
            <p className="text-gray-500">No questions yet. Be the first to ask!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WheelTabs;
