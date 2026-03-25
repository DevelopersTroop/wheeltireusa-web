"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CarFront } from "lucide-react";
import { useState } from "react";
import { GiCarWheel } from "react-icons/gi";
import { PiTireThin } from "react-icons/pi";
import VehicleTab from "./components/VehicleTab/VehicleTab";
import TireTab from "./components/TireTab/TireTab";
import { useTypedSelector } from "@/redux/store";
import { CheckCircle2, ArrowLeftRight } from "lucide-react";
import { clearYearMakeModel } from "@/redux/features/yearMakeModelSlice";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import WheelTab from "./components/WheelTab/WheelTab";

export default function HomeFilter({ variant = "hero" }: { variant?: "hero" | "product" }) {
  const [activeTab, setActiveTab] = useState<"vehicle" | "wheel" | "tire">("vehicle");
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
    // If we had a target path logic from `onSubmit`, we can navigate
    if (activeTab === "tire") {
      router.push("/collections/product-category/tire");
    } else {
      router.push("/collections/product-category/wheels");
    }
  };

  if (variant === "product") {
    if (hasVehicleSelected) {
      return (
        <div className="w-full bg-white border-b-4 border-primary px-4 md:px-6 py-4 shadow-md rounded-t-sm flex flex-col md:flex-row items-center justify-center gap-5">
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
      <div className="w-full max-w-5xl mx-auto rounded-sm shadow-xl bg-[#F8F8F8] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 lg:gap-6">
          <CheckCircle2 className="w-10 h-10 shrink-0 fill-primary text-white" />
          <div className="flex flex-col">
            <span className="text-xs text-[#6B7280] font-bold uppercase tracking-wide mb-1">
              Shopping For
            </span>
            <span className="text-2xl lg:text-3xl font-black text-[#111827] uppercase leading-none">
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
        <div className="flex items-center gap-3 lg:gap-4 w-full md:w-auto">
          <button
            onClick={handleClear}
            className="flex-1 md:flex-none min-[375px]:px-2 flex items-center justify-center gap-2 px-4 lg:px-6 py-3 border border-gray-300 bg-white rounded-sm text-sm font-bold text-[#4B5563] hover:bg-gray-50 uppercase shadow-sm whitespace-nowrap transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4" />
            CHANGE VEHICLE
          </button>
          <button
            onClick={handleShopNow}
            className="flex-1 md:flex-none min-[375px]:px-4 px-6 lg:px-8 py-3 bg-primary hover:bg-primary/90 rounded-sm text-sm font-bold text-white uppercase shadow-sm whitespace-nowrap transition-colors"
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
        <TabsList className="w-full flex bg-[#F0F2F5] border-b border-gray-200 h-auto p-0 rounded-t-sm rounded-b-none justify-start">
          <TabsTrigger
            value="vehicle"
            className="cursor-pointer flex-1 py-4 flex justify-center items-center gap-2 font-bold text-xs sm:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <CarFront
              className={cn("w-4 h-4", activeTab === "vehicle" ? "text-primary" : "text-gray-400")}
            />
            BY VEHICLE
          </TabsTrigger>
          <TabsTrigger
            value="wheel"
            className="cursor-pointer flex-1 py-4 flex justify-center items-center gap-2 font-bold text-xs sm:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <GiCarWheel
              className={cn("w-4 h-4", activeTab === "wheel" ? "text-primary" : "text-gray-400")}
            />
            BY WHEEL
          </TabsTrigger>
          <TabsTrigger
            value="tire"
            className="cursor-pointer flex-1 py-4 flex justify-center items-center gap-2 font-bold text-xs sm:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <PiTireThin
              className={cn("w-4 h-4", activeTab === "tire" ? "text-primary" : "text-gray-400")}
            />
            BY TIRE
          </TabsTrigger>
        </TabsList>

        {/* Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 bg-[#F8F8F8] rounded-b-sm">
          <TabsContent value="vehicle" className="m-0 mt-0">
            <VehicleTab />
          </TabsContent>

          <TabsContent value="wheel" className="m-0 mt-0">
            <WheelTab />
          </TabsContent>

          <TabsContent value="tire" className="m-0 mt-0">
            <TireTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
