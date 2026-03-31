"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useGetFilterListQuery } from "@/redux/apis/product";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { setActiveGarage } from "@/redux/features/yearMakeModelSlice";
import { Loader2 } from "lucide-react";

type Category = "tire" | "wheels";

export default function SizeTab() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [category, setCategory] = useState<Category>("tire");
  const [openDropdown, setOpenDropdown] = useState<"category" | "width" | "ratio" | "diameter" | "boltPattern" | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Tire flow state
  const [tireWidth, setTireWidth] = useState<string | null>(null);
  const [tireRatio, setTireRatio] = useState<string | null>(null);
  const [tireDiameter, setTireDiameter] = useState<string | null>(null);

  // Wheel flow state
  const [wheelDiameter, setWheelDiameter] = useState<string | null>(null);
  const [wheelWidth, setWheelWidth] = useState<string | null>(null);
  const [boltPattern, setBoltPattern] = useState<string | null>(null);

  // Track if user made manual selection (to prevent auto-redirect on initial load)
  const hasUserManuallyChangedRef = useRef(false);

  // Preserve dropdown options independently
  const [tireWidths, setTireWidths] = useState<any[]>([]);
  const [tireRatios, setTireRatios] = useState<any[]>([]);
  const [tireDiameters, setTireDiameters] = useState<any[]>([]);
  const [wheelDiameters, setWheelDiameters] = useState<any[]>([]);
  const [wheelWidths, setWheelWidths] = useState<any[]>([]);
  const [boltPatterns, setBoltPatterns] = useState<any[]>([]);

  // Fetch tire data
  const { data: tireData, isLoading: isTireLoading, isFetching: isTireFetching } = useGetFilterListQuery({
    category: "tire",
    ...(tireWidth ? { tireWidth } : {}),
    ...(tireRatio && tireWidth ? { tireRatio, tireWidth } : {}),
  });

  // Fetch wheel data
  const { data: wheelData, isLoading: isWheelLoading, isFetching: isWheelFetching } = useGetFilterListQuery({
    category: "wheels",
    ...(wheelDiameter ? { wheelDiameter } : {}),
    ...(wheelWidth && wheelWidth !== "any" && wheelDiameter ? { wheelWidth, wheelDiameter } : {}),
  });

  // Preserve tire widths from initial API response
  useEffect(() => {
    if (Array.isArray(tireData?.filters?.tireWidth) && tireData.filters.tireWidth.length > 0) {
      setTireWidths(current => current.length === 0 ? tireData.filters.tireWidth : current);
    }
  }, [tireData?.filters?.tireWidth]);

  // Preserve tire ratios when width is selected
  useEffect(() => {
    if (tireWidth && Array.isArray(tireData?.filters?.tireRatio) && tireData.filters.tireRatio.length > 0) {
      setTireRatios(current => current.length === 0 ? tireData.filters.tireRatio : current);
    }
  }, [tireData?.filters?.tireRatio, tireWidth]);

  // Preserve tire diameters when ratio is selected
  useEffect(() => {
    if (tireRatio && Array.isArray(tireData?.filters?.tireDiameter) && tireData.filters.tireDiameter.length > 0) {
      setTireDiameters(current => current.length === 0 ? tireData.filters.tireDiameter : current);
    }
  }, [tireData?.filters?.tireDiameter, tireRatio]);

  // Preserve wheel diameters from initial API response
  useEffect(() => {
    if (Array.isArray(wheelData?.filters?.wheelDiameter) && wheelData.filters.wheelDiameter.length > 0) {
      setWheelDiameters(current => current.length === 0 ? wheelData.filters.wheelDiameter : current);
    }
  }, [wheelData?.filters?.wheelDiameter]);

  // Preserve wheel widths when diameter is selected
  useEffect(() => {
    if (wheelDiameter && Array.isArray(wheelData?.filters?.wheelWidth) && wheelData.filters.wheelWidth.length > 0) {
      setWheelWidths(current => current.length === 0 ? wheelData.filters.wheelWidth : current);
    }
  }, [wheelData?.filters?.wheelWidth, wheelDiameter]);

  // Preserve bolt patterns when width is selected
  useEffect(() => {
    if (wheelWidth && wheelWidth !== "any" && Array.isArray(wheelData?.filters?.boltPatterns) && wheelData.filters.boltPatterns.length > 0) {
      setBoltPatterns(current => current.length === 0 ? wheelData.filters.boltPatterns : current);
    }
  }, [wheelData?.filters?.boltPatterns, wheelWidth]);

  // Reset state when category changes
  useEffect(() => {
    setTireWidth(null);
    setTireRatio(null);
    setTireDiameter(null);
    setWheelDiameter(null);
    setWheelWidth(null);
    setBoltPattern(null);
    hasUserManuallyChangedRef.current = false;
    setIsRedirecting(false);
    // Reset preserved options
    setTireWidths([]);
    setTireRatios([]);
    setTireDiameters([]);
    setWheelDiameters([]);
    setWheelWidths([]);
    setBoltPatterns([]);
  }, [category]);

  // Determine which specific dropdown should show loading
  // For tires: width only loads initially, ratio loads when width changes, diameter loads when ratio changes
  const isWidthLoading = isTireLoading;
  const isRatioLoading = Boolean(tireWidth && isTireFetching && !tireRatio);
  const isDiameterLoading = Boolean(tireRatio && isTireFetching);

  // For wheels: diameter only loads initially, width loads when diameter changes, bolt pattern loads when width changes
  const isWheelDiameterLoading = isWheelLoading;
  const isWheelWidthLoading = Boolean(wheelDiameter && isWheelFetching && !wheelWidth);
  const isBoltPatternLoading = Boolean(wheelWidth && wheelWidth !== "any" && isWheelFetching);

  // Get options from API data - only return empty for the specific dropdown that's loading
  // Note: Using stored state to preserve dropdown options independently
  const displayTireWidths = (!isWidthLoading && tireWidths.length > 0) ? tireWidths : [];
  const displayTireRatios = (tireWidth && !isRatioLoading && tireRatios.length > 0) ? tireRatios : [];
  const displayTireDiameters = (tireRatio && !isDiameterLoading && tireDiameters.length > 0) ? tireDiameters : [];

  const displayWheelDiameters = (!isWheelDiameterLoading && wheelDiameters.length > 0) ? wheelDiameters : [];
  const displayWheelWidths = (wheelDiameter && !isWheelWidthLoading && wheelWidths.length > 0) ? wheelWidths : [];
  const displayBoltPatterns = (wheelWidth && wheelWidth !== "any" && !isBoltPatternLoading && boltPatterns.length > 0) ? boltPatterns : [];

  const canShowTireRatio = tireWidth !== null;
  const canShowTireDiameter = tireRatio !== null;
  const canShowWheelWidth = wheelDiameter !== null;
  const canShowBoltPattern = wheelWidth !== null;

  const handleTireSubmit = () => {
    if (!tireWidth || !tireRatio || !tireDiameter) return;
    dispatch(setActiveGarage(null));
    const url = `/collections/product-category/tires?tireDiameter=${encodeURIComponent(tireDiameter)}&tireRatio=${encodeURIComponent(tireRatio)}&tireWidth=${encodeURIComponent(tireWidth)}`;
    router.push(url);
  };

  const handleWheelSubmit = () => {
    if (!wheelDiameter || !wheelWidth || !boltPattern) return;
    dispatch(setActiveGarage(null));
    let url = `/collections/product-category/wheels?wheelDiameter=${encodeURIComponent(wheelDiameter)}`;
    if (wheelWidth !== "any") {
      url += `&wheelWidth=${encodeURIComponent(wheelWidth)}`;
    }
    url += `&boltPatterns=${encodeURIComponent(boltPattern)}`;
    router.push(url);
  };

  // Auto-redirect when tire diameter is selected (last field for tire flow)
  useEffect(() => {
    if (tireWidth && tireRatio && tireDiameter && hasUserManuallyChangedRef.current) {
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        handleTireSubmit();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [tireDiameter, tireWidth, tireRatio, dispatch, router]);

  // Auto-redirect when bolt pattern is selected (last field for wheel flow)
  useEffect(() => {
    if (wheelDiameter && wheelWidth && boltPattern && hasUserManuallyChangedRef.current) {
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        handleWheelSubmit();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [boltPattern, wheelDiameter, wheelWidth, dispatch, router]);

  return (
    <div>
      {/* Category Toggle - Top Left, Small */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCategory("tire")}
          className={cn(
            "px-3 py-1 rounded text-[10px] font-semibold uppercase transition-colors",
            category === "tire"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          Tires
        </button>
        <button
          type="button"
          onClick={() => setCategory("wheels")}
          className={cn(
            "px-3 py-1 rounded text-[10px] font-semibold uppercase transition-colors",
            category === "wheels"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          Wheels
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 mt-3">
        {/* Tire Flow */}
        {category === "tire" && (
          <>
            {/* Tire Width */}
            <div className="flex-1">
              <DropdownSelect
                label="Width"
                value={tireWidth}
                placeholder="Select Width"
                options={displayTireWidths.map((w: any) => ({ label: w.value, value: w.value }))}
                isOpen={openDropdown === "width"}
                onToggle={() => setOpenDropdown(openDropdown === "width" ? null : "width")}
                onSelect={(val) => {
                  setTireWidth(val);
                  setTireRatio(null);
                  setTireDiameter(null);
                  setOpenDropdown(null);
                  setIsRedirecting(false);
                  // Reset downstream preserved options
                  setTireRatios([]);
                  setTireDiameters([]);
                }}
                isLoading={isWidthLoading}
              />
            </div>

            {/* Tire Ratio */}
            <div className={cn("flex-1", !canShowTireRatio && "opacity-50 pointer-events-none")}>
              <DropdownSelect
                label="Ratio"
                value={tireRatio}
                placeholder="Select Ratio"
                options={displayTireRatios.map((r: any) => ({ label: r.value, value: r.value }))}
                isOpen={openDropdown === "ratio"}
                onToggle={() => setOpenDropdown(openDropdown === "ratio" ? null : "ratio")}
                onSelect={(val) => {
                  setTireRatio(val);
                  setTireDiameter(null);
                  setOpenDropdown(null);
                  setIsRedirecting(false);
                  hasUserManuallyChangedRef.current = true;
                  // Reset downstream preserved options
                  setTireDiameters([]);
                }}
                isLoading={isRatioLoading}
              />
            </div>

            {/* Tire Diameter */}
            <div className={cn("flex-1", !canShowTireDiameter && "opacity-50 pointer-events-none")}>
              <DropdownSelect
                label="Diameter"
                value={tireDiameter}
                placeholder="Select Diameter"
                options={displayTireDiameters.map((d: any) => ({ label: d.value, value: d.value }))}
                isOpen={openDropdown === "diameter"}
                onToggle={() => setOpenDropdown(openDropdown === "diameter" ? null : "diameter")}
                onSelect={(val) => {
                  setTireDiameter(val);
                  setOpenDropdown(null);
                  hasUserManuallyChangedRef.current = true;
                }}
                isLoading={isDiameterLoading}
              />
            </div>

            {/* Submit Button */}
            <div className="lg:w-32 shrink-0">
              <button
                onClick={handleTireSubmit}
                disabled={!tireWidth || !tireRatio || !tireDiameter}
                className={cn(
                  "w-full h-14 text-white font-bold text-lg uppercase rounded shadow flex items-center justify-center transition-opacity",
                  !tireWidth || !tireRatio || !tireDiameter
                    ? "bg-primary/50 cursor-not-allowed opacity-80"
                    : "bg-primary hover:bg-primary/90"
                )}
              >
                GO
              </button>
            </div>
          </>
        )}

        {/* Wheel Flow */}
        {category === "wheels" && (
          <>
            {/* Wheel Diameter */}
            <div className="flex-1">
              <DropdownSelect
                label="Diameter"
                value={wheelDiameter}
                placeholder="Select Diameter"
                options={displayWheelDiameters.map((d: any) => ({ label: `${d.value}"`, value: d.value }))}
                isOpen={openDropdown === "diameter"}
                onToggle={() => setOpenDropdown(openDropdown === "diameter" ? null : "diameter")}
                onSelect={(val) => {
                  setWheelDiameter(val);
                  setWheelWidth(null);
                  setBoltPattern(null);
                  setOpenDropdown(null);
                  setIsRedirecting(false);
                  // Reset downstream preserved options
                  setWheelWidths([]);
                  setBoltPatterns([]);
                }}
                isLoading={isWheelDiameterLoading}
              />
            </div>

            {/* Wheel Width */}
            <div className={cn("flex-1", !canShowWheelWidth && "opacity-50 pointer-events-none")}>
              <DropdownSelect
                label="Width"
                value={wheelWidth}
                placeholder="Select Width"
                options={[
                  { label: "Any", value: "any" },
                  ...displayWheelWidths.map((w: any) => ({ label: w.value, value: w.value }))
                ]}
                isOpen={openDropdown === "width"}
                onToggle={() => setOpenDropdown(openDropdown === "width" ? null : "width")}
                onSelect={(val) => {
                  setWheelWidth(val);
                  setBoltPattern(null);
                  setOpenDropdown(null);
                  setIsRedirecting(false);
                  hasUserManuallyChangedRef.current = true;
                  // Reset downstream preserved options
                  setBoltPatterns([]);
                }}
                isLoading={isWheelWidthLoading}
              />
            </div>

            {/* Bolt Pattern */}
            <div className={cn("flex-1", !canShowBoltPattern && "opacity-50 pointer-events-none")}>
              <DropdownSelect
                label="Bolt Pattern"
                value={boltPattern}
                placeholder="Select Bolt Pattern"
                options={displayBoltPatterns.map((b: any) => ({ label: b.value, value: b.value }))}
                isOpen={openDropdown === "boltPattern"}
                onToggle={() => setOpenDropdown(openDropdown === "boltPattern" ? null : "boltPattern")}
                onSelect={(val) => {
                  setBoltPattern(val);
                  setOpenDropdown(null);
                  hasUserManuallyChangedRef.current = true;
                }}
                isLoading={isBoltPatternLoading}
              />
            </div>

            {/* Submit Button */}
            <div className="lg:w-32 shrink-0">
              <button
                onClick={handleWheelSubmit}
                disabled={!wheelDiameter || !wheelWidth || !boltPattern}
                className={cn(
                  "w-full h-14 text-white font-bold text-lg uppercase rounded shadow flex items-center justify-center transition-opacity",
                  !wheelDiameter || !wheelWidth || !boltPattern
                    ? "bg-primary/50 cursor-not-allowed opacity-80"
                    : "bg-primary hover:bg-primary/90"
                )}
              >
                GO
              </button>
            </div>
          </>
        )}
      </div>

      {/* Display selected values */}
      {(category === "tire" && tireWidth && tireRatio && tireDiameter) && (
        <div className="mt-2 text-center">
          <div className="text-sm text-gray-500 mb-1">Selected Size:</div>
          <div className="font-semibold text-lg uppercase">
            {tireWidth} / {tireRatio} - {tireDiameter}
          </div>
        </div>
      )}

      {(category === "wheels" && wheelDiameter && wheelWidth && boltPattern) && (
        <div className="mt-2 text-center">
          <div className="text-sm text-gray-500 mb-1">Selected Size:</div>
          <div className="font-semibold text-lg uppercase">
            {wheelDiameter}" x {wheelWidth === "any" ? "Any" : wheelWidth} - {boltPattern}
          </div>
        </div>
      )}

      {/* Redirecting Indicator */}
      {isRedirecting && (
        <div className="mt-3 flex items-center justify-center gap-2 text-primary">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-semibold">Redirecting...</span>
        </div>
      )}
    </div>
  );
}

type DropdownSelectProps = {
  label: string;
  value: string | null;
  placeholder: string;
  options: { label: string; value: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  isLoading?: boolean;
};

function DropdownSelect({ label, value, placeholder, options, isOpen, onToggle, onSelect, isLoading }: DropdownSelectProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        disabled={isLoading}
        className={cn(
          "w-full bg-white flex items-center justify-between shadow-none ring-0 focus:ring-0 appearance-none h-14 relative rounded-sm transition-colors",
          "text-gray-600 uppercase text-xs font-semibold px-3 py-2.5",
          isOpen
            ? "border border-primary ring-1 ring-primary z-10"
            : "border border-gray-300 hover:border-primary",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className="absolute -top-2 left-2 px-1 bg-white text-xs font-semibold text-gray-700">
          {label}
          <span className="text-red-600 ml-0.5">*</span>
        </span>
        <span className="truncate">{isLoading ? "Loading..." : value || placeholder}</span>
        <svg
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform shrink-0",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full z-50 rounded-md border bg-white shadow-lg overflow-y-auto custom-scrollbar max-h-[250px]">
          {options.length === 0 ? (
            <div className="px-3 py-4 text-sm text-gray-500 text-center">No options available</div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelect(option.value)}
                className={cn(
                  "w-full text-left px-3 py-2.5 text-sm transition-colors hover:bg-primary/10",
                  value === option.value && "text-primary font-bold bg-primary/5"
                )}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
