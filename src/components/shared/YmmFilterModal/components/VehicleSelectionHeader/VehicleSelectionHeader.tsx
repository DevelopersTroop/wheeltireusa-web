"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useYmmFilterModal from "../../context/useYmmFilterModal";

export default function VehicleSelectionHeader() {
  const { headerTitle, headerSubtitle } = useYmmFilterModal();

  return (
    <DialogHeader>
      <DialogTitle className="text-center">
        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-tight break-words">
          {headerTitle}
        </div>
        {headerSubtitle ? (
          <div className="mt-1 text-base sm:text-lg md:text-xl font-semibold uppercase text-gray-700 break-words">
            {headerSubtitle}
          </div>
        ) : null}
      </DialogTitle>
    </DialogHeader>
  );
}

