"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useYmm from "@/hooks/useYmm";
import { CarFront, Circle, Disc, CheckCircle2, ArrowLeftRight, ShipWheelIcon, TimerOffIcon } from "lucide-react";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { clearYearMakeModel, setHomeYmmInView } from "@/redux/features/yearMakeModelSlice";
import Link from "next/link";
import { PiTireThin } from 'react-icons/pi'
import { GiCarWheel } from 'react-icons/gi'

interface HomeYmmProps {
  variant?: "hero" | "product";
}

const HomeYmm = ({ variant = "hero" }: HomeYmmProps) => {
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
    list: { years, makes, models, bodyTypes, subModels },
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
    bodyType,
    subModel,
    isActive,
  } = useYmm("home_hero_ymm");

  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"vehicle" | "wheel" | "tire">("vehicle");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const hasUserInteracted = useRef(false);
  const [isInView, setIsInView] = useState(false);

  // Read garage state from Redux
  const garage = useTypedSelector((state) => state.persisted.yearMakeModel.garage);
  const activeGarageId = useTypedSelector((state) => state.persisted.yearMakeModel.activeGarageId);
  const activeGarageItem = garage?.find((item) => item.id === activeGarageId);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  // Track whether the hero YMM is actually visible in the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        dispatch(setHomeYmmInView(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      dispatch(setHomeYmmInView(false));
    };
  }, [dispatch]);

  // Auto-submit when fully populated
  useEffect(() => {
    const isReady = !isDisabledSubmit && shouldShowSubmit;
    if (isReady && hasUserInteracted.current) {
      onSubmit(undefined);
      hasUserInteracted.current = false; // Reset to prevent multiple submissions
    }
  }, [isDisabledSubmit, shouldShowSubmit, onSubmit]);

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
    if (open) {
      setActiveDropdown(key);
    } else {
      setActiveDropdown((prev) => (prev === key ? null : prev));
    }
  };

  useEffect(() => {
    if (!hasUserInteracted.current && !year) {
      setActiveDropdown("year");
    }
  }, []);

  const handleClear = () => {
    dispatch(clearYearMakeModel());
  };

  // Auto-advance dropdowns
  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (isInView && hasUserInteracted.current && year && !isMakeLoading && !isMakeDisabled && (makes?.length ?? 0) > 0 && (!make || make === "__DEFAULT_MAKE__")) {
      timeoutId = setTimeout(() => {
        setActiveDropdown("make");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [year, isMakeLoading, isMakeDisabled, makes?.length, make, isActive, isInView]);

  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (isInView && hasUserInteracted.current && make && !isModelLoading && !isModelDisabled && (models?.length ?? 0) > 0 && (!model || model === "__DEFAULT_MODEL__")) {
      timeoutId = setTimeout(() => {
        setActiveDropdown("model");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [make, isModelLoading, isModelDisabled, models?.length, model, isActive, isInView]);

  // Auto-advance: open Body Type after Model is selected
  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (isInView && hasUserInteracted.current && model && model !== "__DEFAULT_MODEL__" && !isBodyTypeLoading && !isBodyTypeDisabled && (bodyTypes?.length ?? 0) > 0 && (!bodyType || bodyType === "__DEFAULT_BODYTYPE__")) {
      timeoutId = setTimeout(() => {
        setActiveDropdown("bodyType");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [model, isBodyTypeLoading, isBodyTypeDisabled, bodyTypes?.length, bodyType, isInView, isActive]);

  // Auto-advance: open SubModel after Body Type is selected
  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (isInView && hasUserInteracted.current && bodyType && bodyType !== "__DEFAULT_BODYTYPE__" && !isSubmodelLoading && !isSubmodelDisabled && (subModels?.length ?? 0) > 0 && (!subModel || subModel?.SubModel === "__DEFAULT_SUBMODEL__")) {
      timeoutId = setTimeout(() => {
        setActiveDropdown("subModel");
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [bodyType, isSubmodelLoading, isSubmodelDisabled, subModels?.length, subModel, isInView, isActive]);

  const hasVehicleSelected = Boolean(activeGarageItem) || Boolean(year && make && model && model !== "__DEFAULT_MODEL__" && subModel && subModel.SubModel !== "__DEFAULT_SUBMODEL__" && bodyType && bodyType !== "__DEFAULT_BODY_TYPE__");

  // Optional rendering of sub-dropdowns based on whether they have items.
  // The mockups only show 3 inputs for the initial state, but we should let users select subModels if needed
  // so we dynamically render them if `bodyTypes` or `subModels` exist
  const showBodyType = (bodyTypes?.length ?? 0) > 0;
  const showSubmodel = (subModels?.length ?? 0) > 0;

  // Render Product Page Variant
  if (variant === "product") {
    if (hasVehicleSelected) {
      return (
        <div className="w-full bg-white border-b-4 border-[#3D8B3D] px-4 md:px-6 py-4 shadow-md rounded-t-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 shrink-0 fill-[#3D8B3D] text-white" />
            <span className="font-extrabold text-gray-900 uppercase text-[15px] tracking-tight">
              {activeGarageItem
                ? `${activeGarageItem.year} ${activeGarageItem.make} ${activeGarageItem.model || ''} ${activeGarageItem.subModel?.SubModel && activeGarageItem.subModel.SubModel !== '__DEFAULT_SUBMODEL__' ? activeGarageItem.subModel.SubModel : ''}`.trim()
                : `${year} ${make} ${model} ${subModel?.SubModel && subModel.SubModel !== "__DEFAULT_SUBMODEL__" ? subModel.SubModel : ""}`}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href={`/collections/product-category/wheels?q=${year}-${make}-${model}`}
              className="text-xs font-bold text-[#111827] border-b-2 border-[#111827] uppercase hover:text-gray-600 hover:border-gray-600 transition-colors pb-0.5 tracking-wide"
            >
              VIEW ALL PRODUCTS FOR MY VEHICLE
            </Link>
            <button
              onClick={handleClear}
              className="px-6 py-2 border border-gray-300 rounded-sm text-xs font-bold text-[#4B5563] hover:bg-gray-50 uppercase tracking-wide transition-colors"
            >
              CLEAR
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full bg-white border-b-4 border-[#dc5454] px-4 lg:px-6 py-4 shadow-md rounded-t-sm flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
        <div className="flex items-center gap-2 font-black text-gray-900 whitespace-nowrap lg:w-48 uppercase tracking-tight text-[15px]">
          <CarFront className="text-[#dc5454] w-5 h-5 shrink-0" />
          SHOP BY VEHICLE
        </div>

        <div className="flex-1 flex flex-col sm:flex-row gap-2 w-full" ref={containerRef}>
          <div className="flex-1 min-w-[120px]">
            <Select onValueChange={handleYearChange} value={year || undefined} disabled={isYearDisabled}>
              <SelectTrigger className="w-full bg-white border border-gray-200 text-[#6B7280] h-10 shadow-none rounded-[2px] ring-0! ring-offset-0! text-sm">
                <SelectValue placeholder={isYearLoading ? "Loading..." : "Year"} />
              </SelectTrigger>
              <SelectContent>
                {years?.map((y) => (
                  <SelectItem key={`year-${y}`} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[120px]">
            <Select open={activeDropdown === "make"} onOpenChange={handleOpenChange("make")} onValueChange={handleMakeChange} value={make || "__DEFAULT_MAKE__"} disabled={isMakeDisabled}>
              <SelectTrigger className="w-full bg-white border border-gray-200 text-[#6B7280] h-10 shadow-none rounded-[2px] ring-0! ring-offset-0! text-sm">
                <SelectValue placeholder={isMakeLoading ? "Loading..." : "Make"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__DEFAULT_MAKE__" className="hidden" disabled>Make</SelectItem>
                {makes?.map((m) => (
                  <SelectItem key={`make-${m}`} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[120px]">
            <Select open={activeDropdown === "model"} onOpenChange={handleOpenChange("model")} onValueChange={handleModelChange} value={model || "__DEFAULT_MODEL__"} disabled={isModelDisabled}>
              <SelectTrigger className="w-full bg-white border border-gray-200 text-[#6B7280] h-10 shadow-none rounded-[2px] ring-0! ring-offset-0! text-sm">
                <SelectValue placeholder={isModelLoading ? "Loading..." : "Model"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__DEFAULT_MODEL__" className="hidden" disabled>Model</SelectItem>
                {models?.map((mdl) => (
                  <SelectItem key={`model-${mdl}`} value={mdl}>{mdl}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showBodyType && (
            <div className="flex-1 min-w-[120px]">
              <Select open={activeDropdown === "bodyType"} onOpenChange={handleOpenChange("bodyType")} onValueChange={handleBodyTypeChange} value={bodyType || "__DEFAULT_BODYTYPE__"} disabled={isBodyTypeDisabled}>
                <SelectTrigger className="w-full bg-white border border-gray-200 text-[#6B7280] h-10 shadow-none rounded-[2px] ring-0! ring-offset-0! text-sm">
                  <SelectValue placeholder={isBodyTypeLoading ? "Loading..." : "Body Type"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__DEFAULT_BODYTYPE__" className="hidden" disabled>Body Type</SelectItem>
                  {bodyTypes?.map((bt) => (
                    <SelectItem key={`bodyType-${bt}`} value={bt}>{bt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showSubmodel && (
            <div className="flex-1 min-w-[120px]">
              <Select open={activeDropdown === "subModel"} onOpenChange={handleOpenChange("subModel")} onValueChange={handleSubModelChange} value={subModel?.SubModel || "__DEFAULT_SUBMODEL__"} disabled={isSubmodelDisabled}>
                <SelectTrigger className="w-full bg-white border border-gray-200 text-[#6B7280] h-10 shadow-none rounded-[2px] ring-0! ring-offset-0! text-sm">
                  <SelectValue placeholder={isSubmodelLoading ? "Loading..." : "Submodel"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__DEFAULT_SUBMODEL__" className="hidden" disabled>Submodel</SelectItem>
                  {subModels?.map((sm) => (
                    <SelectItem key={`subModel-${sm.SubModel}`} value={sm.SubModel}>{sm.SubModel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <button
          onClick={(e) => onSubmit(e, { targetPath: variant === 'product' && location.pathname.includes('/tire') ? '/collections/product-category/tire' : undefined })}
          disabled={isDisabledSubmit || !shouldShowSubmit}
          className={cn(
            "h-10 px-8 text-white font-bold text-sm uppercase rounded-[2px] transition-colors w-full lg:w-auto mt-3 lg:mt-0 shadow-sm shrink-0 tracking-wide",
            isDisabledSubmit || !shouldShowSubmit ? "bg-[#8B8B8B] cursor-not-allowed" : "bg-[#dc5454] hover:bg-red-600"
          )}
        >
          GO
        </button>
      </div>
    );
  }

  // Render Hero Variant
  if (hasVehicleSelected) {
    return (
      <div className="w-full max-w-5xl mx-auto rounded-sm shadow-xl bg-[#F8F8F8] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 lg:gap-6">
          <CheckCircle2 className="w-10 h-10 shrink-0 fill-green-600 text-white" />
          <div className="flex flex-col">
            <span className="text-xs text-[#6B7280] font-bold uppercase tracking-wide mb-1">Shopping For</span>
            <span className="text-2xl lg:text-3xl font-black text-[#111827] uppercase leading-none">
              {year} {make} {model} {subModel?.SubModel && subModel.SubModel !== "__DEFAULT_SUBMODEL__" ? subModel.SubModel : ""}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:gap-4 w-full md:w-auto">
          <button
            onClick={handleClear}
            className="flex-1 md:flex-none min-[375px]:px-2 flex items-center justify-center gap-2 px-4 lg:px-6 py-3 border border-gray-300 bg-white rounded-sm text-sm font-bold text-[#4B5563] hover:bg-gray-50 uppercase shadow-sm whitespace-nowrap transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4" />
            CHANGE VEHICLE
          </button>
          <button
            onClick={(e) => onSubmit(e, { targetPath: activeTab === 'tire' ? '/collections/product-category/tire' : '/collections/product-category/wheels' })}
            className="flex-1 md:flex-none min-[375px]:px-4 px-6 lg:px-8 py-3 bg-[#dc5454] hover:bg-red-600 rounded-sm text-sm font-bold text-white uppercase shadow-sm whitespace-nowrap transition-colors"
          >
            SHOP NOW
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto rounded-sm shadow-xl bg-[#F8F8F8] overflow-hidden" ref={containerRef}>
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full">
        {/* Tabs */}
        <TabsList className="w-full flex bg-[#F0F2F5] border-b border-gray-200 h-auto p-0 rounded-none justify-start">
          <TabsTrigger
            value="vehicle"
            className=" cursor-pointer flex-1 py-4 flex justify-center items-center gap-2 font-bold text-xs sm:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <CarFront className={cn("w-4 h-4", activeTab === "vehicle" ? "text-red-600" : "text-gray-400")} />
            BY VEHICLE
          </TabsTrigger>
          <TabsTrigger
            value="wheel"
            className=" cursor-pointer flex-1 py-4 flex justify-center items-center gap-2 font-bold text-xs sm:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <GiCarWheel className={cn("w-4 h-4", activeTab === "wheel" ? "text-red-600" : "text-gray-400")} />
            BY WHEEL
          </TabsTrigger>
          <TabsTrigger
            value="tire"
            className=" cursor-pointer flex-1 py-4 flex justify-center items-center gap-2 font-bold text-xs sm:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <PiTireThin className={cn("w-4 h-4", activeTab === "tire" ? "text-red-600" : "text-gray-400")} />
            BY TIRE
          </TabsTrigger>
        </TabsList>

        {/* Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 bg-[#F8F8F8]">
          <TabsContent value="vehicle" className="m-0 mt-0">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Select open={activeDropdown === "year"} onOpenChange={handleOpenChange("year")} onValueChange={handleYearChange} value={year || undefined} disabled={isYearDisabled}>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                      <SelectValue placeholder={isYearLoading ? "Loading..." : "Year"} />
                    </SelectTrigger>
                    <SelectContent>
                      {years?.map((y) => (
                        <SelectItem key={`year-${y}`} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <Select open={activeDropdown === "make"} onOpenChange={handleOpenChange("make")} onValueChange={handleMakeChange} value={make || "__DEFAULT_MAKE__"} disabled={isMakeDisabled}>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                      <SelectValue placeholder={isMakeLoading ? "Loading..." : "Make"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__DEFAULT_MAKE__" className="hidden" disabled>Make</SelectItem>
                      {makes?.map((m) => (
                        <SelectItem key={`make-${m}`} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <Select open={activeDropdown === "model"} onOpenChange={handleOpenChange("model")} onValueChange={handleModelChange} value={model || "__DEFAULT_MODEL__"} disabled={isModelDisabled}>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                      <SelectValue placeholder={isModelLoading ? "Loading..." : "Model"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__DEFAULT_MODEL__" className="hidden" disabled>Model</SelectItem>
                      {models?.map((mdl) => (
                        <SelectItem key={`model-${mdl}`} value={mdl}>{mdl}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dynamically push body/sub to next line visually on smaller screens, or keep in same row if large enough */}
              {(showBodyType || showSubmodel) && (
                <div className="flex-1 flex flex-col sm:flex-row gap-3">
                  {showBodyType && (
                    <div className="flex-1">
                      <Select open={activeDropdown === "bodyType"} onOpenChange={handleOpenChange("bodyType")} onValueChange={handleBodyTypeChange} value={bodyType || "__DEFAULT_BODYTYPE__"} disabled={isBodyTypeDisabled}>
                        <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                          <SelectValue placeholder={isBodyTypeLoading ? "Loading..." : "Body Type"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__DEFAULT_BODYTYPE__" className="hidden" disabled>Body Type</SelectItem>
                          {bodyTypes?.map((bt) => (
                            <SelectItem key={`bodyType-${bt}`} value={bt}>{bt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {showSubmodel && (
                    <div className="flex-1">
                      <Select open={activeDropdown === "subModel"} onOpenChange={handleOpenChange("subModel")} onValueChange={handleSubModelChange} value={subModel?.SubModel || "__DEFAULT_SUBMODEL__"} disabled={isSubmodelDisabled}>
                        <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                          <SelectValue placeholder={isSubmodelLoading ? "Loading..." : "Submodel"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__DEFAULT_SUBMODEL__" className="hidden" disabled>Submodel</SelectItem>
                          {subModels?.map((sm) => (
                            <SelectItem key={`subModel-${sm.SubModel}`} value={sm.SubModel}>{sm.SubModel}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}

              <div className="lg:w-32 shrink-0">
                <button
                  onClick={() => onSubmit()}
                  disabled={isDisabledSubmit || !shouldShowSubmit}
                  className={cn(
                    "w-full h-12 text-white font-bold text-lg uppercase rounded shadow flex items-center justify-center transition-opacity",
                    isDisabledSubmit || !shouldShowSubmit ? "bg-[#dca4a4] cursor-not-allowed opacity-80" : "bg-[#dc5454] hover:bg-red-600"
                  )}
                >
                  GO
                </button>
              </div>
            </div>
          </TabsContent>

          {/* BY WHEEL Tab */}
          <TabsContent value="wheel" className="m-0 mt-0">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Select>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                      <SelectValue placeholder="Diameter" />
                    </SelectTrigger>
                    <SelectContent>
                      {["14", "15", "16", "17", "18", "19", "20", "22", "24", "26", "28", "30"].map((d) => (
                        <SelectItem key={`dia-${d}`} value={d}>{d}&quot;</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                      <SelectValue placeholder="Width" />
                    </SelectTrigger>
                    <SelectContent>
                      {["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12", "14"].map((w) => (
                        <SelectItem key={`width-${w}`} value={w}>{w}&quot;</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                      <SelectValue placeholder="Bolt Pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      {["4x100", "4x114.3", "5x100", "5x108", "5x110", "5x112", "5x114.3", "5x115", "5x120", "5x127", "5x130", "5x139.7", "5x150", "6x114.3", "6x120", "6x127", "6x135", "6x139.7", "8x165.1", "8x170", "8x180"].map((bp) => (
                        <SelectItem key={`bp-${bp}`} value={bp}>{bp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="lg:w-32 shrink-0">
                <button
                  className={cn(
                    "w-full h-12 text-white font-bold text-lg uppercase rounded shadow flex items-center justify-center transition-opacity bg-[#dca4a4] cursor-not-allowed opacity-80"
                  )}
                  disabled
                >
                  GO
                </button>
              </div>
            </div>
          </TabsContent>

          {/* BY TIRE Tab */}
          <TabsContent value="tire" className="m-0 mt-0">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Select>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                      <SelectValue placeholder="Width / Height" />
                    </SelectTrigger>
                    <SelectContent>
                      {["145", "155", "165", "175", "185", "195", "205", "215", "225", "235", "245", "255", "265", "275", "285", "295", "305", "315", "325", "335", "345", "355"].map((w) => (
                        <SelectItem key={`tw-${w}`} value={w}>{w}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                      <SelectValue placeholder="Aspect / Width" />
                    </SelectTrigger>
                    <SelectContent>
                      {["25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80", "85"].map((a) => (
                        <SelectItem key={`ta-${a}`} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                      <SelectValue placeholder="Diameter" />
                    </SelectTrigger>
                    <SelectContent>
                      {["13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "24", "26", "28", "30"].map((d) => (
                        <SelectItem key={`td-${d}`} value={d}>{d}&quot;</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="lg:w-32 shrink-0">
                <button
                  className={cn(
                    "w-full h-12 text-white font-bold text-lg uppercase rounded shadow flex items-center justify-center transition-opacity bg-[#dca4a4] cursor-not-allowed opacity-80"
                  )}
                  disabled
                >
                  GO
                </button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default HomeYmm;
