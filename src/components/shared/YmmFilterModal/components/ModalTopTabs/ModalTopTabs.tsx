"use client";

import { CarFront, Tag } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import useYmmFilterModal from "../../context/useYmmFilterModal";

type TopTab = {
  id: "vehicle" | "brand";
  label: string;
  icon: ReactNode;
};

const topTabs: TopTab[] = [
  {
    id: "vehicle",
    label: "Shop by Vehicle",
    icon: <CarFront className="h-6 w-6" />,
  },
  {
    id: "brand",
    label: "Shop by Brand",
    icon: <Tag className="h-6 w-6" />,
  },
];

export default function ModalTopTabs() {
  const { activeMainTab, setActiveMainTab } = useYmmFilterModal();

  return (
    <div className="-mx-4 -mt-4 sm:-mx-6 sm:-mt-6 border-b border-gray-200">
      <div className="grid grid-cols-2">
        {topTabs.map((tab) => {
          const isActive = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMainTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 sm:px-8 sm:py-5 text-left transition-colors",
                isActive
                  ? "border-t-4 border-primary bg-white"
                  : "border-t-4 border-transparent bg-gray-50 hover:bg-gray-100"
              )}
            >
              <span className={cn(isActive ? "text-black" : "text-gray-600")}>
                {tab.icon}
              </span>
              <span
                className={cn(
                  "text-base sm:text-lg font-bold",
                  isActive ? "text-black" : "text-gray-700"
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
