"use client";

import { CarFront, Tag, Ruler } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import useYmmFilterModal from "../../context/useYmmFilterModal";

type TopTab = {
  id: "vehicle" | "brand" | "size";
  label: string;
  icon: ReactNode;
};

const topTabs: TopTab[] = [
  {
    id: "vehicle",
    label: "By Vehicle",
    icon: <CarFront className="h-5 w-5" />,
  },
  {
    id: "size",
    label: "By Size",
    icon: <Ruler className="h-5 w-5" />,
  },
  {
    id: "brand",
    label: "By Brand",
    icon: <Tag className="h-5 w-5" />,
  },
];

export default function ModalTopTabs() {
  const { activeMainTab, setActiveMainTab } = useYmmFilterModal();

  return (
    <div className="-mx-4 -mt-4 sm:-mx-6 sm:-mt-6 border-b border-gray-200">
      <div className="grid grid-cols-3">
        {topTabs.map((tab) => {
          const isActive = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMainTab(tab.id)}
              className={cn(
                "flex items-center justify-center gap-1 sm:gap-2 px-2 py-3 sm:px-4 sm:py-4 text-center transition-colors",
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
                  "text-sm sm:text-base font-bold whitespace-nowrap",
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
