"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function VehicleTabPanelLoadingFallback() {
  return (
    <div className="pt-2">
      <div className="h-12 w-2/3 mx-auto rounded-md bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
      <div className="mt-2 h-8 w-1/2 mx-auto rounded-md bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
      <div className="my-6 h-px bg-gray-200" />
      <div className="mx-auto mb-5 h-10 w-[420px] max-w-full rounded-md bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
      <div className="mx-auto mb-4 h-8 w-[360px] max-w-full rounded-md bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`vehicle-field-skeleton-${index}`}
            className="h-12 rounded-md border border-gray-300 bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse"
          />
        ))}
      </div>
      <div className="mt-10 h-24 rounded-md bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
    </div>
  );
}
