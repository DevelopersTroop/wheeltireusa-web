"use client";

import { useState } from "react";
import TireSpecifications from "./tire-specifications";
import TireDescription from "./tire-description";
import { Reviews } from "@/components/shared/Reviews/Reviews";

type TabType = "specs" | "description" | "reviews";

const TireTabs = ({ product }: { product: any }) => {
  const [activeTab, setActiveTab] = useState<TabType>("specs");

  const tabClass = (tab: TabType) =>
    `px-4 py-2 text-sm font-medium border-b-2 transition ${
      activeTab === tab
        ? "border-black text-black"
        : "border-transparent text-gray-400 hover:text-black"
    }`;

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex gap-6 border-b border-gray-200">
        <button onClick={() => setActiveTab("specs")} className={tabClass("specs")}>
          Specifications
        </button>
        <button onClick={() => setActiveTab("description")} className={tabClass("description")}>
          Description
        </button>
        <button onClick={() => setActiveTab("reviews")} className={tabClass("reviews")}>
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "specs" && (
          <>
            {/* MOBILE: compact specs */}
            <div className="block sm:hidden">
              <div className="lg:hidden px-4 sm:px-6 mt-4">
          <TireSpecifications product={product} variant="compact" />
        </div>
            </div>

            {/* DESKTOP: full specs table */}
            <div className="hidden sm:block">
              <TireSpecifications product={product} variant="full" />
            </div>
          </>
        )}

        {activeTab === "description" && (
          <TireDescription product={product} />
        )}

        {activeTab === "reviews" && (
          <Reviews productId={product.id} />
        )}
      </div>
    </div>
  );
};

export default TireTabs;