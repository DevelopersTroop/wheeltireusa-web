"use client";
import useYmm from "@/hooks/useYmm";
import { ChevronDown, RotateCcw, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Mock hook - replace with your actual useYmm hook

const StickyVehicleSelector = ({ offset = 0 }: { offset?: number }) => {
  const {
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isMakeDisabled,
    isModelDisabled,
    shouldShowSubmit,
    list: { years, makes, models, subModels, bodyTypes },
    onYearChange,
    onMakeChange,
    onModelChange,
    onBodyTypeChange,
    onSubModelChange,
    onSubmit,
    isDisabledSubmit,
    isBodyTypeDisabled,
    isSubmodelDisabled,
    year,
    make,
    model,
    subModel,
    bodyType,
  } = useYmm();

  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show when sentinel is not visible (scrolled past)
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleReset = () => {
    onYearChange("");
    onMakeChange("");
    onModelChange("");
  };

  return (
    <>
      {/* Sentinel element to detect when selector should become sticky */}
      <div ref={sentinelRef} className="h-px" />

      {/* Desktop View */}
      <div
        ref={selectorRef}
        className={`hidden md:block bg-[#E8EDF2] border-b border-gray-200 transition-all duration-300 z-20 fixed top-0 left-0 right-0 shadow-md ${isVisible
          ? "opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Year Dropdown */}
            <div className="flex-1 relative flex items-center bg-white border border-gray-300 rounded-sm">
              <div className="pl-3 pr-3 text-gray-900 font-bold text-sm">1</div>
              <div className="w-px h-5 bg-gray-300"></div>
              <select
                value={year || ""}
                onChange={(e) => onYearChange(e.target.value)}
                className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-3 py-2.5 appearance-none cursor-pointer focus:outline-none"
              >
                <option value="">YEAR</option>
                {years?.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Make Dropdown */}
            <div className="flex-1 relative flex items-center bg-white border border-gray-300 rounded-sm">
              <div className="pl-3 pr-3 text-gray-900 font-bold text-sm">2</div>
              <div className="w-px h-5 bg-gray-300"></div>
              <select
                value={make || ""}
                onChange={(e) => onMakeChange(e.target.value)}
                disabled={isMakeDisabled}
                className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-3 py-2.5 appearance-none cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">MAKE</option>
                {makes?.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Model Dropdown */}
            <div className="flex-1 relative flex items-center bg-white border border-gray-300 rounded-sm">
              <div className="pl-3 pr-3 text-gray-900 font-bold text-sm">3</div>
              <div className="w-px h-5 bg-gray-300"></div>
              <select
                value={model || ""}
                onChange={(e) => onModelChange(e.target.value)}
                disabled={isModelDisabled}
                className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-3 py-2.5 appearance-none cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">MODEL</option>
                {models?.map((mdl) => (
                  <option key={mdl} value={mdl}>
                    {mdl}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Body Type Dropdown */}
            <div className="flex-1 relative flex items-center bg-white border border-gray-300 rounded-sm">
              <div className="pl-3 pr-3 text-gray-900 font-bold text-sm">4</div>
              <div className="w-px h-5 bg-gray-300"></div>
              <select
                value={bodyType || ""}
                onChange={(e) => onBodyTypeChange(e.target.value)}
                disabled={isBodyTypeDisabled}
                className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-3 py-2.5 appearance-none cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">BODY TYPE</option>
                {bodyTypes?.map((mdl) => (
                  <option key={mdl} value={mdl}>
                    {mdl}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Submodel Dropdown */}
            <div className="flex-1 relative flex items-center bg-white border border-gray-300 rounded-sm">
              <div className="pl-3 pr-3 text-gray-900 font-bold text-sm">5</div>
              <div className="w-px h-5 bg-gray-300"></div>
              <select
                value={subModel.SubModel || ""}
                onChange={(e) => onSubModelChange(e.target.value)}
                disabled={isSubmodelDisabled}
                className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-3 py-2.5 appearance-none cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">SUBMODEL</option>
                {subModels?.map((mdl) => (
                  <option key={mdl.SubModel} value={mdl.SubModel}>
                    {mdl.SubModel}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Reset Button (Icon only to save space) */}
            <button
              onClick={handleReset}
              title="Reset"
              className="p-2.5 text-gray-500 hover:text-red-600 bg-white border border-gray-300 rounded-sm hover:bg-red-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Go Button */}
            <button
              onClick={onSubmit}
              disabled={isDisabledSubmit}
              className="px-8 py-2.5 bg-[#3b5998] hover:bg-[#2d4373] text-white font-bold text-sm rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              GO
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div
        className={`md:hidden  bg-gray-800 transition-all duration-300 z-50 fixed top-0 left-0 right-0 shadow-lg ${isVisible
          ? "opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        style={isVisible ? { transform: `translateY(${offset}px)` } : {}}
      >
        <div className="flex " >
          {/* Toggle Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex-1 bg-gray-700 text-white px-4 py-4 flex items-center cursor-pointer justify-between text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <ChevronDown
                className={`w-5 h-5 transition-transform ${isMobileOpen ? "rotate-180" : ""
                  }`}
              />
              SELECT YOUR VEHICLE
            </div>
          </button>

          {/* Find Button */}
          <button
            onClick={onSubmit}
            hidden={isMobileOpen}
            disabled={isDisabledSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 font-bold uppercase text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Find
          </button>
        </div>

        {/* Expandable Content */}
        <div
          className={`overflow-hidden transition-all duration-300 h-full ${isMobileOpen ? "max-h-full" : "max-h-0"
            }`}
        >
          <div className="bg-gray-700 p-4 space-y-3">
            {/* Year */}
            <div>
              <label className="text-white text-xs font-bold mb-1 block uppercase">
                Year
              </label>
              <div className="relative">
                <select
                  value={year || ""}
                  onChange={(e) => onYearChange(e.target.value)}
                  className="w-full bg-white text-gray-800 px-4 py-2 pr-10 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Please Select ...</option>
                  {years?.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
              </div>
            </div>

            {/* Make */}
            <div>
              <label className="text-white text-xs font-bold mb-1 block uppercase">
                Make
              </label>
              <div className="relative">
                <select
                  value={make || ""}
                  onChange={(e) => onMakeChange(e.target.value)}
                  disabled={isMakeDisabled}
                  className="w-full bg-white text-gray-800 px-4 py-2 pr-10 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Please Select ...</option>
                  {makes?.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
              </div>
            </div>

            {/* Model */}
            <div>
              <label className="text-white text-xs font-bold mb-1 block uppercase">
                Model
              </label>
              <div className="relative">
                <select
                  value={model || ""}
                  onChange={(e) => onModelChange(e.target.value)}
                  disabled={isModelDisabled}
                  className="w-full bg-white text-gray-800 px-4 py-2 pr-10 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Please Select ...</option>
                  {models?.map((mdl) => (
                    <option key={mdl} value={mdl}>
                      {mdl}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-white text-xs font-bold mb-1 block uppercase">
                Body Type
              </label>
              <div className="relative">
                <select
                  value={bodyType || ""}
                  onChange={(e) => onBodyTypeChange(e.target.value)}
                  disabled={isBodyTypeDisabled}
                  className="w-full bg-white text-gray-800 px-4 py-2 pr-10 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Please Select ...</option>
                  {bodyTypes?.map((mdl) => (
                    <option key={mdl} value={mdl}>
                      {mdl}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-white text-xs font-bold mb-1 block uppercase">
                Submodel
              </label>
              <div className="relative">
                <select
                  value={subModel.SubModel || ""}
                  onChange={(e) => onSubModelChange(e.target.value)}
                  disabled={isModelDisabled}
                  className="w-full bg-white text-gray-800 px-4 py-2 pr-10 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Please Select ...</option>
                  {subModels?.map((mdl) => (
                    <option key={mdl.SubModel} value={mdl.SubModel}>
                      {mdl.SubModel}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
              </div>
            </div>

            {/* Reset Button */}
            <div className="w-full flex items-center">
              <button
                onClick={handleReset}
                className=" bg-white w-full hover:bg-gray-100 text-red-600 px-4 py-4 flex items-center justify-center gap-2 font-bold uppercase text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={onSubmit}
                disabled={isDisabledSubmit}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 font-bold uppercase text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
              >
                Find
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyVehicleSelector;
