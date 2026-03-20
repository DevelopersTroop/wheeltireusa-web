"use client";

import { Info, ShieldCheck } from "lucide-react";

export default function FitmentGuidanceCard() {
  return (
    <div className="mt-10 rounded-md py-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-xl sm:text-2xl font-extrabold leading-tight">
          Select your vehicle to view guaranteed fitment options
        </h4>
        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-1" />
      </div>
      <div className="mt-3 flex items-start gap-2 text-gray-700">
        <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
        <p className="text-base sm:text-lg font-medium">
          We use your Year, Make, Model, Trim, and Drive selections to show
          wheels and tires that match your vehicle.
        </p>
      </div>
    </div>
  );
}

