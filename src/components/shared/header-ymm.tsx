"use client";
import useYmm from "@/hooks/useYmm";
import { ChevronDown, RotateCcw, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StickyVehicleSelector = ({ offset = 0 }: { offset?: number }) => {
  const {
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isBodyTypeLoading,
    isSubmodelLoading,
    isYearDisabled,
    isMakeDisabled,
    isModelDisabled,
    isBodyTypeDisabled,
    isSubmodelDisabled,
    shouldShowSubmit,
    list: { years, makes, models, subModels, bodyTypes },
    onYearChange,
    onMakeChange,
    onModelChange,
    onBodyTypeChange,
    onSubModelChange,
    onSubmit,
    isDisabledSubmit,
    year,
    make,
    model,
    subModel,
    bodyType,
  } = useYmm();

  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isFirstRender = useRef(true);
  const hasUserInteracted = useRef(false);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  // Track screen size to conditionally render desktop vs mobile
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setActiveDropdown(null); // close any open dropdown on resize
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInteraction = <T extends (...args: any[]) => void>(fn: T) => {
    return (...args: Parameters<T>) => {
      hasUserInteracted.current = true;
      fn(...args);
    };
  };

  const handleYearChange = handleInteraction(onYearChange);
  const handleMakeChange = handleInteraction(onMakeChange);
  const handleModelChange = handleInteraction(onModelChange);
  const handleBodyTypeChange = handleInteraction(onBodyTypeChange);
  const handleSubModelChange = handleInteraction(onSubModelChange);

  const handleOpenChange = (key: string) => (open: boolean) => {
    if (open) setActiveDropdown(key);
    else setActiveDropdown((prev) => (prev === key ? null : prev));
  };

  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (isVisible && year && !isMakeLoading && !isMakeDisabled && (makes?.length ?? 0) > 0 && (!make || make === "__DEFAULT_MAKE__")) {
      timeoutId = setTimeout(() => {
        setActiveDropdown("make");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [year, isMakeLoading, isMakeDisabled, makes?.length, make, isVisible]);

  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (isVisible && make && !isModelLoading && !isModelDisabled && (models?.length ?? 0) > 0 && (!model || model === "__DEFAULT_MODEL__")) {
      timeoutId = setTimeout(() => {
        setActiveDropdown("model");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [make, isModelLoading, isModelDisabled, models?.length, model, isVisible]);

  // Auto-advance: open Body Type after Model is selected
  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (isVisible && model && model !== "__DEFAULT_MODEL__" && !isBodyTypeLoading && !isBodyTypeDisabled && (bodyTypes?.length ?? 0) > 0 && (!bodyType || bodyType === "__DEFAULT_BODYTYPE__")) {
      timeoutId = setTimeout(() => {
        setActiveDropdown("bodyType");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [model, isBodyTypeLoading, isBodyTypeDisabled, bodyTypes?.length, bodyType, isVisible]);

  // Auto-advance: open SubModel after Body Type is selected
  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (isVisible && bodyType && bodyType !== "__DEFAULT_BODYTYPE__" && !isSubmodelLoading && !isSubmodelDisabled && (subModels?.length ?? 0) > 0 && (!subModel || subModel?.SubModel === "__DEFAULT_SUBMODEL__")) {
      timeoutId = setTimeout(() => {
        setActiveDropdown("subModel");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [bodyType, isSubmodelLoading, isSubmodelDisabled, subModels?.length, subModel, isVisible]);

  const handleReset = () => {
    onYearChange("");
    onMakeChange("");
    onModelChange("");
  };

  const showBodyType = (bodyTypes?.length ?? 0) > 0;
  const showSubmodel = (subModels?.length ?? 0) > 0;

  return (
    <>
      <div ref={sentinelRef} className="h-px" />

      {/* Desktop View */}
      {!isMobile && <div
        ref={selectorRef}
        className={`bg-[#E8EDF2] border-b border-gray-200 transition-all duration-300 z-20 fixed top-0 left-0 right-0 shadow-md ${isVisible
          ? "opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative flex items-center bg-white border border-gray-300 rounded-sm">
              <div className="pl-3 pr-3 text-gray-900 font-bold text-sm">1</div>
              <div className="w-px h-5 bg-gray-300"></div>
              <Select onValueChange={handleYearChange} value={year || undefined} disabled={isYearDisabled}>
                <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-3 py-2.5 shadow-none border-none ring-0 focus:ring-0 appearance-none h-auto [&>svg]:hidden">
                  <SelectValue placeholder={isYearLoading ? "LOADING..." : "YEAR"} />
                </SelectTrigger>
                <SelectContent>
                  {years?.map((y) => (
                    <SelectItem key={`year-${y}`} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ChevronDown className="absolute right-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            <div className="flex-1 relative flex items-center bg-white border border-gray-300 rounded-sm">
              <div className="pl-3 pr-3 text-gray-900 font-bold text-sm">2</div>
              <div className="w-px h-5 bg-gray-300"></div>
              <Select open={activeDropdown === "make"} onOpenChange={handleOpenChange("make")} onValueChange={handleMakeChange} value={make || "__DEFAULT_MAKE__"} disabled={isMakeDisabled}>
                <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-3 py-2.5 shadow-none border-none ring-0 focus:ring-0 appearance-none h-auto [&>svg]:hidden">
                  <SelectValue placeholder={isMakeLoading ? "LOADING..." : "MAKE"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__DEFAULT_MAKE__" className="hidden" disabled>MAKE</SelectItem>
                  {makes?.map((m) => (
                    <SelectItem key={`make-${m}`} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ChevronDown className="absolute right-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            <div className="flex-1 relative flex items-center bg-white border border-gray-300 rounded-sm">
              <div className="pl-3 pr-3 text-gray-900 font-bold text-sm">3</div>
              <div className="w-px h-5 bg-gray-300"></div>
              <Select open={activeDropdown === "model"} onOpenChange={handleOpenChange("model")} onValueChange={handleModelChange} value={model || "__DEFAULT_MODEL__"} disabled={isModelDisabled}>
                <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-3 py-2.5 shadow-none border-none ring-0 focus:ring-0 appearance-none h-auto [&>svg]:hidden">
                  <SelectValue placeholder={isModelLoading ? "LOADING..." : "MODEL"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__DEFAULT_MODEL__" className="hidden" disabled>MODEL</SelectItem>
                  {models?.map((mdl) => (
                    <SelectItem key={`model-${mdl}`} value={mdl}>{mdl}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ChevronDown className="absolute right-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {showBodyType && (
              <div className="flex-1 relative flex items-center bg-white border border-gray-300 rounded-sm">
                <div className="pl-3 pr-3 text-gray-900 font-bold text-sm">4</div>
                <div className="w-px h-5 bg-gray-300"></div>
                <Select open={activeDropdown === "bodyType"} onOpenChange={handleOpenChange("bodyType")} onValueChange={handleBodyTypeChange} value={bodyType || "__DEFAULT_BODYTYPE__"} disabled={isBodyTypeDisabled}>
                  <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-3 py-2.5 shadow-none border-none ring-0 focus:ring-0 appearance-none h-auto [&>svg]:hidden">
                    <SelectValue placeholder={isBodyTypeLoading ? "LOADING..." : "BODY TYPE"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__DEFAULT_BODYTYPE__" className="hidden" disabled>BODY TYPE</SelectItem>
                    {bodyTypes?.map((bt) => (
                      <SelectItem key={`bodyType-${bt}`} value={bt}>{bt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ChevronDown className="absolute right-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            )}

            {showSubmodel && (
              <div className="flex-1 relative flex items-center bg-white border border-gray-300 rounded-sm">
                <div className="pl-3 pr-3 text-gray-900 font-bold text-sm">{showBodyType ? "5" : "4"}</div>
                <div className="w-px h-5 bg-gray-300"></div>
                <Select open={activeDropdown === "subModel"} onOpenChange={handleOpenChange("subModel")} onValueChange={handleSubModelChange} value={subModel?.SubModel || "__DEFAULT_SUBMODEL__"} disabled={isSubmodelDisabled}>
                  <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-3 py-2.5 shadow-none border-none ring-0 focus:ring-0 appearance-none h-auto [&>svg]:hidden">
                    <SelectValue placeholder={isSubmodelLoading ? "LOADING..." : "SUBMODEL"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__DEFAULT_SUBMODEL__" className="hidden" disabled>SUBMODEL</SelectItem>
                    {subModels?.map((sm) => (
                      <SelectItem key={`subModel-${sm.SubModel}`} value={sm.SubModel}>{sm.SubModel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ChevronDown className="absolute right-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            )}

            <button
              onClick={handleReset}
              title="Reset"
              className="p-2.5 text-gray-500 hover:text-red-600 bg-white border border-gray-300 rounded-sm hover:bg-red-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSubmit(undefined)}
              disabled={isDisabledSubmit}
              className="px-8 py-2.5 bg-[#3b5998] hover:bg-[#2d4373] text-white font-bold text-sm rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              GO
            </button>
          </div>
        </div>
      </div>}

      {/* Mobile View */}
      {isMobile && <div
        className={`bg-gray-800 transition-all duration-300 z-50 fixed top-0 left-0 right-0 shadow-lg ${isVisible
          ? "opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        style={isVisible ? { transform: `translateY(${offset}px)` } : {}}
      >
        <div className="flex">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex-1 bg-gray-700 text-white px-4 py-4 flex items-center cursor-pointer justify-between text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <ChevronDown className={`w-5 h-5 transition-transform ${isMobileOpen ? "rotate-180" : ""}`} />
              SELECT YOUR VEHICLE
            </div>
          </button>
          <button
            onClick={() => onSubmit(undefined)}
            hidden={isMobileOpen}
            disabled={isDisabledSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 font-bold uppercase text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Find
          </button>
        </div>

        <div className={`overflow-hidden transition-all duration-300 h-full ${isMobileOpen ? "max-h-full" : "max-h-0 hidden"}`}>
          <div className="bg-gray-700 p-4 space-y-3">
            <div>
              <label className="text-white text-xs font-bold mb-1 block uppercase">Year</label>
              <div className="relative">
                <Select open={activeDropdown === "year"} onOpenChange={handleOpenChange("year")} onValueChange={handleYearChange} value={year || undefined} disabled={isYearDisabled}>
                  <SelectTrigger className="w-full bg-white text-gray-800 px-4 py-2 border-none shadow-none ring-0 focus:ring-2 focus:ring-red-500 appearance-none h-auto [&>svg]:hidden text-left font-normal">
                    <SelectValue placeholder={isYearLoading ? "Loading..." : "Please Select ..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {years?.map((y) => (
                      <SelectItem key={`year-${y}`} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-white text-xs font-bold mb-1 block uppercase">Make</label>
              <div className="relative">
                <Select open={activeDropdown === "make"} onOpenChange={handleOpenChange("make")} onValueChange={handleMakeChange} value={make || "__DEFAULT_MAKE__"} disabled={isMakeDisabled}>
                  <SelectTrigger className="w-full bg-white text-gray-800 px-4 py-2 border-none shadow-none ring-0 focus:ring-2 focus:ring-red-500 appearance-none h-auto [&>svg]:hidden text-left font-normal">
                    <SelectValue placeholder={isMakeLoading ? "Loading..." : "Please Select ..."} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__DEFAULT_MAKE__" className="hidden" disabled>Please Select ...</SelectItem>
                    {makes?.map((m) => (
                      <SelectItem key={`make-${m}`} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-white text-xs font-bold mb-1 block uppercase">Model</label>
              <div className="relative">
                <Select open={activeDropdown === "model"} onOpenChange={handleOpenChange("model")} onValueChange={handleModelChange} value={model || "__DEFAULT_MODEL__"} disabled={isModelDisabled}>
                  <SelectTrigger className="w-full bg-white text-gray-800 px-4 py-2 border-none shadow-none ring-0 focus:ring-2 focus:ring-red-500 appearance-none h-auto [&>svg]:hidden text-left font-normal">
                    <SelectValue placeholder={isModelLoading ? "Loading..." : "Please Select ..."} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__DEFAULT_MODEL__" className="hidden" disabled>Please Select ...</SelectItem>
                    {models?.map((mdl) => (
                      <SelectItem key={`model-${mdl}`} value={mdl}>{mdl}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
              </div>
            </div>

            {showBodyType && (
              <div>
                <label className="text-white text-xs font-bold mb-1 block uppercase">Body Type</label>
                <div className="relative">
                  <Select open={activeDropdown === "bodyType"} onOpenChange={handleOpenChange("bodyType")} onValueChange={handleBodyTypeChange} value={bodyType || "__DEFAULT_BODYTYPE__"} disabled={isBodyTypeDisabled}>
                    <SelectTrigger className="w-full bg-white text-gray-800 px-4 py-2 border-none shadow-none ring-0 focus:ring-2 focus:ring-red-500 appearance-none h-auto [&>svg]:hidden text-left font-normal">
                      <SelectValue placeholder={isBodyTypeLoading ? "Loading..." : "Please Select ..."} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__DEFAULT_BODYTYPE__" className="hidden" disabled>Please Select ...</SelectItem>
                      {bodyTypes?.map((bt) => (
                        <SelectItem key={`bodyType-${bt}`} value={bt}>{bt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
                </div>
              </div>
            )}

            {showSubmodel && (
              <div>
                <label className="text-white text-xs font-bold mb-1 block uppercase">Submodel</label>
                <div className="relative">
                  <Select open={activeDropdown === "subModel"} onOpenChange={handleOpenChange("subModel")} onValueChange={handleSubModelChange} value={subModel?.SubModel || "__DEFAULT_SUBMODEL__"} disabled={isSubmodelDisabled}>
                    <SelectTrigger className="w-full bg-white text-gray-800 px-4 py-2 border-none shadow-none ring-0 focus:ring-2 focus:ring-red-500 appearance-none h-auto [&>svg]:hidden text-left font-normal">
                      <SelectValue placeholder={isSubmodelLoading ? "Loading..." : "Please Select ..."} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__DEFAULT_SUBMODEL__" className="hidden" disabled>Please Select ...</SelectItem>
                      {subModels?.map((sm) => (
                        <SelectItem key={`subModel-${sm.SubModel}`} value={sm.SubModel}>{sm.SubModel}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
                </div>
              </div>
            )}

            <div className="w-full flex items-center">
              <button
                onClick={handleReset}
                className="bg-white w-full hover:bg-gray-100 text-red-600 px-4 py-4 flex items-center justify-center gap-2 font-bold uppercase text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={() => {
                  onSubmit(undefined)
                  setIsMobileOpen(false)
                }}
                disabled={isDisabledSubmit}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 font-bold uppercase text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
              >
                Find
              </button>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};

export default StickyVehicleSelector;
