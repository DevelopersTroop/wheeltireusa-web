"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import YmmFilterModalProvider from "./context/YmmFilterModalProvider";
import useYmmFilterModal from "./context/useYmmFilterModal";
import ModalTopTabs from "./components/ModalTopTabs/ModalTopTabs";
import VehicleTabPanelLoadingFallback from "./components/VehicleTabPanelLoadingFallback/VehicleTabPanelLoadingFallback";
import ShopByBrandPanelLoadingFallback from "./components/ShopByBrandPanelLoadingFallback/ShopByBrandPanelLoadingFallback";

const VehicleTabPanel = dynamic(
  () => import("./components/VehicleTabPanel/VehicleTabPanel"),
  {
    loading: () => <VehicleTabPanelLoadingFallback />,
  }
);

const ShopByBrandPanel = dynamic(
  () => import("./components/ShopByBrandPanel/ShopByBrandPanel"),
  {
    loading: () => <ShopByBrandPanelLoadingFallback />,
  }
);

const YmmFilterModal = () => {
  return (
    <YmmFilterModalProvider>
      <YmmFilterModalDialog />
    </YmmFilterModalProvider>
  );
};

const YmmFilterModalDialog = () => {
  const { isModalOpen, closeModal, activeMainTab, modalHeight } = useYmmFilterModal();

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogContent 
        hideCloseButton 
        className="!left-0 !translate-x-0 w-screen max-w-none border-0 bg-transparent p-0 shadow-none"
        style={{ height: `${modalHeight}px` }}
      >
        <div 
          className="mx-auto w-[95vw] sm:w-[92vw] max-w-[980px] rounded-md bg-white px-4 py-4 sm:px-6 sm:py-6 relative flex flex-col"
          style={{ maxHeight: `${modalHeight}px` }}
        >
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-80 hover:opacity-100 z-10">
            <X className="h-6 w-6 text-primary" />
          </DialogClose>
          <div className="shrink-0">
            <ModalTopTabs />
          </div>
          <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
            {activeMainTab === "vehicle" ? <VehicleTabPanel /> : <ShopByBrandPanel />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YmmFilterModal;
