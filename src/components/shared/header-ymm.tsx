"use client";
import useYmm from "@/hooks/useYmm";
import { CarFront, CheckCircle2, ChevronDown, RotateCcw, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTypedSelector, useAppDispatch } from "@/redux/store";
import { clearYearMakeModel } from "@/redux/features/yearMakeModelSlice";
import { useRouter } from "next/navigation";

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
    isActive,
  } = useYmm("header_ymm");

  const dispatch = useAppDispatch();
  const isHomeYmmInView = useTypedSelector((state) => state.persisted.yearMakeModel.isHomeYmmInView);
  const garage = useTypedSelector((state) => state.persisted.yearMakeModel.garage);
  const activeGarageId = useTypedSelector((state) => state.persisted.yearMakeModel.activeGarageId);

  // Use the active garage item as the primary source of truth for selected vehicle
  const activeGarageItem = garage?.find((item) => item.id === activeGarageId);

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

  // Determine if a vehicle is fully selected - prefer garage item, fallback to hook state
  const hasVehicleSelected = Boolean(activeGarageItem) || Boolean(
    year &&
    make &&
    model &&
    model !== "__DEFAULT_MODEL__" &&
    subModel &&
    subModel.SubModel &&
    subModel.SubModel !== "__DEFAULT_SUBMODEL__" &&
    bodyType &&
    bodyType !== "__DEFAULT_BODYTYPE__"
  );

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

  // The header should be shown only when scrolled past sentinel AND HomeYmm is NOT in view
  const shouldShow = isVisible && !isHomeYmmInView;

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

  const handleClear = () => {
    dispatch(clearYearMakeModel());
  };

  const router = useRouter();
  const handleShopNow = () => {
    if (activeGarageItem) {
      router.push('/collections/product-category/wheels?vehicle=selectedVehicleInformation');
    } else {
      onSubmit(undefined);
    }
  };

  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (shouldShow && hasUserInteracted.current && year && !isMakeLoading && !isMakeDisabled && (makes?.length ?? 0) > 0 && (!make || make === "__DEFAULT_MAKE__")) {
      timeoutId = setTimeout(() => {
        if (selectorRef.current?.offsetParent) setActiveDropdown("make");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [year, isMakeLoading, isMakeDisabled, makes?.length, make, isActive, shouldShow]);

  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (shouldShow && hasUserInteracted.current && make && !isModelLoading && !isModelDisabled && (models?.length ?? 0) > 0 && (!model || model === "__DEFAULT_MODEL__")) {
      timeoutId = setTimeout(() => {
        if (selectorRef.current?.offsetParent) setActiveDropdown("model");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [make, isModelLoading, isModelDisabled, models?.length, model, isActive, shouldShow]);

  // Auto-advance: open Body Type after Model is selected
  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (shouldShow && hasUserInteracted.current && model && model !== "__DEFAULT_MODEL__" && !isBodyTypeLoading && !isBodyTypeDisabled && (bodyTypes?.length ?? 0) > 0 && (!bodyType || bodyType === "__DEFAULT_BODYTYPE__")) {
      timeoutId = setTimeout(() => {
        if (selectorRef.current?.offsetParent) setActiveDropdown("bodyType");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [model, isBodyTypeLoading, isBodyTypeDisabled, bodyTypes?.length, bodyType, shouldShow, isActive]);

  // Auto-advance: open SubModel after Body Type is selected
  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (shouldShow && hasUserInteracted.current && bodyType && bodyType !== "__DEFAULT_BODYTYPE__" && !isSubmodelLoading && !isSubmodelDisabled && (subModels?.length ?? 0) > 0 && (!subModel || subModel?.SubModel === "__DEFAULT_SUBMODEL__")) {
      timeoutId = setTimeout(() => {
        if (selectorRef.current?.offsetParent) setActiveDropdown("subModel");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [bodyType, isSubmodelLoading, isSubmodelDisabled, subModels?.length, subModel, shouldShow, isActive]);

  const handleReset = () => {
    onYearChange("");
    onMakeChange("");
    onModelChange("");
  };

  const showBodyType = (bodyTypes?.length ?? 0) > 0 && model && model !== "__DEFAULT_MODEL__";
  const showSubmodel = (subModels?.length ?? 0) > 0 && bodyType && bodyType !== "__DEFAULT_BODYTYPE__";

  // Build vehicle display string — prefer garage item data, fallback to hook state
  const vehicleLabel = activeGarageItem
    ? `${activeGarageItem.year} ${activeGarageItem.make} ${activeGarageItem.model || ''} ${activeGarageItem.subModel?.SubModel && activeGarageItem.subModel.SubModel !== '__DEFAULT_SUBMODEL__' ? activeGarageItem.subModel.SubModel : ''}`.trim()
    : `${year} ${make} ${model}${subModel?.SubModel && subModel.SubModel !== "__DEFAULT_SUBMODEL__" ? ` ${subModel.SubModel}` : ""}`;

  return (
    <>
      <div ref={sentinelRef} className="h-px" />

      {/* Desktop View */}
      {!isMobile && <div
        ref={selectorRef}
        className={`bg-[#E8EDF2] border-b border-gray-200 transition-all duration-300 z-20 fixed top-0 left-0 right-0 shadow-md ${shouldShow
          ? "opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          {hasVehicleSelected ? (
            /* Selected Vehicle Display */
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 fill-green-600 text-white" />
                <span className="font-bold text-gray-900 uppercase text-sm tracking-wide">
                  {vehicleLabel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className="px-4 py-2 border border-gray-300 bg-white rounded-sm text-xs font-bold text-gray-600 hover:bg-gray-50 uppercase tracking-wide transition-colors flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  CHANGE VEHICLE
                </button>
                <button
                  onClick={handleShopNow}
                  className="px-8 py-2 bg-[#3b5998] hover:bg-[#2d4373] text-white font-bold text-sm rounded-sm transition-colors uppercase cursor-pointer"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          ) : (
            /* YMM Selector Dropdowns */
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
          )}
        </div>
      </div>}

      {/* Mobile View */}
      {isMobile && <div
        className={`bg-[#E8EDF2] transition-all duration-300 z-50 fixed top-0 left-0 right-0 shadow-lg border-b border-gray-200 ${shouldShow
          ? "opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        style={shouldShow ? { transform: `translateY(${offset}px)` } : {}}
      >
        <div className="flex">
          {hasVehicleSelected ? (
            /* Mobile - Selected Vehicle Display */
            <>
              <div className="flex-1 flex flex-col gap-2 px-4 py-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0 fill-green-600 text-white" />
                  <span className="font-bold text-gray-900 text-sm uppercase tracking-wide truncate">
                    {vehicleLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClear}
                    className="flex-1 px-3 py-2 border border-gray-300 bg-white rounded-sm text-xs font-bold text-gray-600 hover:bg-gray-50 uppercase tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    CHANGE VEHICLE
                  </button>
                  <button
                    onClick={handleShopNow}
                    className="flex-1 px-3 py-2 bg-[#3b5998] hover:bg-[#2d4373] text-white font-bold text-xs rounded-sm transition-colors uppercase cursor-pointer"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Mobile - YMM Selector Toggle */
            <>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="flex-1 bg-[#E8EDF2] text-gray-900 px-4 py-3.5 flex items-center cursor-pointer justify-between text-sm font-bold uppercase tracking-wide"
              >
                <div className="flex items-center gap-2">
                  <CarFront className="w-4 h-4 text-[#3b5998]" />
                  SELECT YOUR VEHICLE
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isMobileOpen ? "rotate-180" : ""}`} />
              </button>
            </>
          )}
        </div>

        {!hasVehicleSelected && (
          <div className={`overflow-hidden transition-all duration-300 ${isMobileOpen ? "max-h-[600px]" : "max-h-0"}`}>
            <div className="bg-[#E8EDF2] px-4 pb-4 space-y-2.5">
              {/* Year */}
              <div className="relative flex items-center bg-white border border-gray-300 rounded-sm">
                <div className="pl-3 pr-2 text-gray-900 font-bold text-xs">1</div>
                <div className="w-px h-4 bg-gray-300"></div>
                <Select open={activeDropdown === "year"} onOpenChange={handleOpenChange("year")} onValueChange={handleYearChange} value={year || undefined} disabled={isYearDisabled}>
                  <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-3 py-2.5 shadow-none border-none ring-0 focus:ring-0 appearance-none h-auto [&>svg]:hidden">
                    <SelectValue placeholder={isYearLoading ? "LOADING..." : "YEAR"} />
                  </SelectTrigger>
                  <SelectContent>
                    {years?.map((y) => (
                      <SelectItem key={`year-${y}`} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ChevronDown className="absolute right-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Make */}
              <div className="relative flex items-center bg-white border border-gray-300 rounded-sm">
                <div className="pl-3 pr-2 text-gray-900 font-bold text-xs">2</div>
                <div className="w-px h-4 bg-gray-300"></div>
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
                <ChevronDown className="absolute right-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Model */}
              <div className="relative flex items-center bg-white border border-gray-300 rounded-sm">
                <div className="pl-3 pr-2 text-gray-900 font-bold text-xs">3</div>
                <div className="w-px h-4 bg-gray-300"></div>
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
                <ChevronDown className="absolute right-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Body Type */}
              {showBodyType && (
                <div className="relative flex items-center bg-white border border-gray-300 rounded-sm">
                  <div className="pl-3 pr-2 text-gray-900 font-bold text-xs">4</div>
                  <div className="w-px h-4 bg-gray-300"></div>
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
                  <ChevronDown className="absolute right-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              )}

              {/* Submodel */}
              {showSubmodel && (
                <div className="relative flex items-center bg-white border border-gray-300 rounded-sm">
                  <div className="pl-3 pr-2 text-gray-900 font-bold text-xs">{showBodyType ? "5" : "4"}</div>
                  <div className="w-px h-4 bg-gray-300"></div>
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
                  <ChevronDown className="absolute right-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleReset}
                  className="p-2.5 text-gray-500 hover:text-red-600 bg-white border border-gray-300 rounded-sm hover:bg-red-50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onSubmit(undefined)
                    setIsMobileOpen(false)
                  }}
                  disabled={isDisabledSubmit}
                  className="flex-1 py-2.5 bg-[#3b5998] hover:bg-[#2d4373] text-white font-bold text-sm rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                >
                  GO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>}
    </>
  );
};

export default StickyVehicleSelector;
