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
import VehicleTabPanelLoadingFallback from "./components/VehicleTabPanel/components/VehicleTabPanelLoadingFallback/VehicleTabPanelLoadingFallback";
import ShopByBrandPanelLoadingFallback from "./components/ShopByBrandPanel/components/ShopByBrandPanelLoadingFallback/ShopByBrandPanelLoadingFallback";
import ShopBySizePanelLoadingFallback from "./components/ShopBySizePanel/components/ShopBySizePanelLoadingFallback/ShopBySizePanelLoadingFallback";
import { NeedHelpModal } from "./components/NeedHelpModal";

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

const ShopBySizePanel = dynamic(
  () => import("./components/ShopBySizePanel/ShopBySizePanel"),
  {
    loading: () => <ShopBySizePanelLoadingFallback />,
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
  const { isModalOpen, closeModal, activeMainTab, modalHeight, isNeedHelpModalOpen, openNeedHelpModal, closeNeedHelpModal } = useYmmFilterModal();

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
      >
        <DialogContent
          hideCloseButton
          onPointerDownOutside={() => closeModal()}
          className="w-[95vw] sm:w-[92vw] max-w-[980px]! border-0 bg-transparent p-0 shadow-none max-h-[90vh]"
        >
          <DialogClose className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 rounded-full bg-white p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 z-50 border border-gray-200">
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </DialogClose>
          <div
            className="w-full rounded-md bg-white px-4 py-4 sm:px-6 sm:py-6 relative flex flex-col max-h-[90vh] overflow-hidden"
          >
            <div className="shrink-0">
              <ModalTopTabs />
            </div>
            <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar overscroll-contain">
              {activeMainTab === "vehicle" && <VehicleTabPanel />}
              {activeMainTab === "brand" && <ShopByBrandPanel />}
              {activeMainTab === "size" && <ShopBySizePanel />}
            </div>
            {/* Need Help Link */}
            <div className="shrink-0 pt-3 border-t border-gray-100 mt-2">
              <button
                onClick={openNeedHelpModal}
                className="text-sm text-gray-500 hover:text-primary transition-colors duration-200 flex items-center gap-1 mx-auto"
              >
                Need Help? <span className="font-semibold">Get a Custom Quote</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Need Help Modal */}
      <NeedHelpModal isOpen={isNeedHelpModalOpen} onClose={closeNeedHelpModal} />
    </>
  );
};

export default YmmFilterModal;
