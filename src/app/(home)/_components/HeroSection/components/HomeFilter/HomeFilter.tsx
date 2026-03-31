"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CarFront, Tag, Ruler } from "lucide-react";
import { useState } from "react";
import VehicleTab from "./components/VehicleTab/VehicleTab";
import BrandTab from "./components/BrandTab/BrandTab";
import SizeTab from "./components/SizeTab/SizeTab";
import { useTypedSelector } from "@/redux/store";
import { CheckCircle2, ArrowLeftRight } from "lucide-react";
import { clearYearMakeModel } from "@/redux/features/yearMakeModelSlice";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function HomeFilter({ variant = "hero" }: { variant?: "hero" | "product" }) {
  const [activeTab, setActiveTab] = useState<"vehicle" | "brand" | "size">("vehicle");
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Read garage state from Redux
  const garage = useTypedSelector((state) => state.persisted.yearMakeModel.garage);
  const activeGarageId = useTypedSelector((state) => state.persisted.yearMakeModel.activeGarageId);
  const activeGarageItem = activeGarageId ? garage?.[activeGarageId] : undefined;
  const hasVehicleSelected = Boolean(activeGarageId && activeGarageItem);

  const handleClear = () => {
    dispatch(clearYearMakeModel());
  };

  const handleShopNow = () => {
    // Navigate to wheels collection by default
    router.push("/collections/product-category/wheels");
  };

  if (variant === "product") {
    if (hasVehicleSelected) {
      return (
        <div className="hidden md:flex w-full bg-white border-b-4 border-primary px-6 py-4 shadow-md rounded-t-sm flex-row items-center justify-center gap-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 shrink-0 fill-primary text-white" />
            <span className="font-extrabold text-gray-900 uppercase text-[15px] tracking-tight">
              {`${activeGarageItem?.year} ${activeGarageItem?.make} ${activeGarageItem?.model || ""} ${
                activeGarageItem?.trim && activeGarageItem.trim !== "__DEFAULT_TRIM__"
                  ? activeGarageItem.trim
                  : ""
              } ${
                activeGarageItem?.drive && activeGarageItem.drive !== "__DEFAULT_DRIVE__"
                  ? activeGarageItem.drive
                  : ""
              }`.trim()}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={handleClear}
              className="px-6 py-2 border border-gray-300 rounded-sm text-xs font-bold text-[#4B5563] hover:bg-gray-50 uppercase tracking-wide transition-colors"
            >
              CLEAR
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  if (hasVehicleSelected) {
    return (
      <div className="w-full max-w-5xl mx-auto rounded-sm shadow-xl bg-[#F8F8F8] p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 w-full md:w-auto">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 fill-primary text-white" />
          <div className="flex flex-col min-w-0 flex-1 md:flex-none">
            <span className="text-[10px] sm:text-xs text-[#6B7280] font-bold uppercase tracking-wide mb-1">
              Shopping For
            </span>
            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-[#111827] uppercase leading-tight">
              {`${activeGarageItem?.year} ${activeGarageItem?.make} ${activeGarageItem?.model || ""} ${
                activeGarageItem?.trim && activeGarageItem.trim !== "__DEFAULT_TRIM__"
                  ? activeGarageItem.trim
                  : ""
              } ${
                activeGarageItem?.drive && activeGarageItem.drive !== "__DEFAULT_DRIVE__"
                  ? activeGarageItem.drive
                  : ""
              }`.trim()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full md:w-auto">
          <button
            onClick={handleClear}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 border border-gray-300 bg-white rounded-sm text-xs sm:text-sm font-bold text-[#4B5563] hover:bg-gray-50 uppercase shadow-sm whitespace-nowrap transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">CHANGE</span>
            <span>VEHICLE</span>
          </button>
          <button
            onClick={handleShopNow}
            className="flex-1 md:flex-none px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 rounded-sm text-xs sm:text-sm font-bold text-white uppercase shadow-sm whitespace-nowrap transition-colors"
          >
            SHOP NOW
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto rounded-sm shadow-xl bg-[#F8F8F8]">
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full overflow-visible">
        {/* Tabs */}
        <TabsList className="w-full flex bg-[#F0F2F5] border-b border-gray-200 h-auto p-0 rounded-t-sm rounded-b-none">
          <TabsTrigger
            value="vehicle"
            className="cursor-pointer flex-1 py-3 sm:py-4 flex justify-center items-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-xs md:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <CarFront
              className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", activeTab === "vehicle" ? "text-primary" : "text-gray-400")}
            />
            BY VEHICLE
          </TabsTrigger>
          <TabsTrigger
            value="brand"
            className="cursor-pointer flex-1 py-3 sm:py-4 flex justify-center items-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-xs md:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <Tag
              className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", activeTab === "brand" ? "text-primary" : "text-gray-400")}
            />
            BY BRAND
          </TabsTrigger>
          <TabsTrigger
            value="size"
            className="cursor-pointer flex-1 py-3 sm:py-4 flex justify-center items-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-xs md:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <Ruler
              className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", activeTab === "size" ? "text-primary" : "text-gray-400")}
            />
            BY SIZE
          </TabsTrigger>
        </TabsList>

        {/* Content Area */}
        <div className="bg-[#F8F8F8] rounded-b-sm">
          <TabsContent value="vehicle" className="px-3 sm:px-4 pt-0 pb-3 sm:pb-4 m-0 mt-0">
            <VehicleTab />
          </TabsContent>

          <TabsContent value="brand" className="px-3 sm:px-4 py-4 sm:py-6 m-0 mt-0">
            <BrandTab />
          </TabsContent>

          <TabsContent value="size" className="px-3 sm:px-4 pt-0 pb-3 sm:pb-4 m-0 mt-0">
            <SizeTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
