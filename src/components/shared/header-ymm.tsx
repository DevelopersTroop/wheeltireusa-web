"use client";
import { useRef } from "react";
import StickyVehicleBar from "./StickyVehicleBar";

const StickyVehicleSelector = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Sentinel (DO NOT REMOVE) - Used by StickyVehicleBar for scroll detection */}
      <div ref={sentinelRef} className="h-px" />

      {/* Use the new StickyVehicleBar component */}
      <StickyVehicleBar />
    </>
  );
};

export default StickyVehicleSelector;
