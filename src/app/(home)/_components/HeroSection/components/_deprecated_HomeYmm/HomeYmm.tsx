"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useYmm from "@/hooks/useYmm";
import { cn } from "@/lib/utils";
import { addToGarage, clearYearMakeModel, setHomeYmmInView, submitYmm } from "@/redux/features/yearMakeModelSlice";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { TYmmGarageItem } from "@/types/ymm";
import { ArrowLeftRight, CarFront, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GiCarWheel } from 'react-icons/gi';
import { PiTireThin } from 'react-icons/pi';

interface HomeYmmProps {
  variant?: "hero" | "product";
}

const HomeYmm = ({ variant = "hero" }: HomeYmmProps) => {
  const {
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isTrimLoading,
    isDriveLoading,
    isYearDisabled,
    isMakeDisabled,
    isModelDisabled,
    isTrimDisabled,
    isDriveDisabled,
    shouldShowSubmit,
    list: { years, makes, models, trims, drives },
    onYearChange,
    onMakeChange,
    onModelChange,
    onTrimChange,
    onDriveChange,
    onSubmit,
    isDisabledSubmit,
    year,
    make,
    model,
    trim,
    drive,
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
  const activeGarageItem = activeGarageId ? garage?.[activeGarageId] : undefined;

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
      handleSubmit(undefined);
      hasUserInteracted.current = false; // Reset to prevent multiple submissions
    }
  }, [isDisabledSubmit, shouldShowSubmit, onSubmit]);

  const handleSubmit = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    options?: { targetPath?: string }
  ) => {
    const cleanModel = model && model !== '__DEFAULT_MODEL__' ? model : '';
    const cleanTrim = trim && trim !== '__DEFAULT_TRIM__' ? trim : '';
    const cleanDrive = drive && drive !== '__DEFAULT_DRIVE__' ? drive : '';
    
    if (year && make && cleanModel && cleanTrim && cleanDrive) {
      const newItem: TYmmGarageItem = {
        year,
        make,
        model: cleanModel,
        trim: cleanTrim,
        drive: cleanDrive,
      };
      dispatch(addToGarage(newItem));
      dispatch(submitYmm(newItem));
    }
    
    onSubmit(e, options);
  };

  const handleInteraction = <T extends (...args: any[]) => void>(fn: T) => {
    return (...args: Parameters<T>) => {
      hasUserInteracted.current = true;
      fn(...args);
    };
  };

  const handleYearChange = handleInteraction(onYearChange);
  const handleMakeChange = handleInteraction(onMakeChange);
  const handleModelChange = handleInteraction(onModelChange);
  const handleTrimChange = handleInteraction(onTrimChange);
  const handleDriveChange = handleInteraction(onDriveChange);

  const handleOpenChange = (key: string) => (open: boolean) => {
    if (open) {
      setActiveDropdown(key);
    } else {
      setActiveDropdown((prev) => (prev === key ? null : prev));
    }
  };

  useEffect(() => {
    if (!hasUserInteracted.current && !year) {
      // setActiveDropdown("year"); // Disabled year auto-expand
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
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [year, isMakeLoading, isMakeDisabled, makes?.length, make, isActive, isInView]);

  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (isInView && hasUserInteracted.current && make && !isModelLoading && !isModelDisabled && (models?.length ?? 0) > 0 && (!model || model === "__DEFAULT_MODEL__")) {
      timeoutId = setTimeout(() => {
        setActiveDropdown("model");
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [make, isModelLoading, isModelDisabled, models?.length, model, isActive, isInView]);

  // Auto-advance: open Trim after Model is selected
  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (isInView && hasUserInteracted.current && model && model !== "__DEFAULT_MODEL__" && !isTrimLoading && !isTrimDisabled && (trims?.length ?? 0) > 0 && (!trim || trim === "__DEFAULT_TRIM__")) {
      timeoutId = setTimeout(() => {
        setActiveDropdown("trim");
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [model, isTrimLoading, isTrimDisabled, trims?.length, trim, isInView, isActive]);

  // Auto-advance: open Drive after Trim is selected
  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (isInView && hasUserInteracted.current && trim && trim !== "__DEFAULT_TRIM__" && !isDriveLoading && !isDriveDisabled && (drives?.length ?? 0) > 0 && (!drive || drive === "__DEFAULT_DRIVE__")) {
      timeoutId = setTimeout(() => {
        setActiveDropdown("drive");
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [trim, isDriveLoading, isDriveDisabled, drives?.length, drive, isInView, isActive]);

  const hasVehicleSelected = Boolean(activeGarageId && activeGarageItem);

  // Optional rendering of sub-dropdowns based on whether they have items.
  // The mockups only show 3 inputs for the initial state, but we should let users select subModels if needed
  // so we dynamically render them if `bodyTypes` or `subModels` exist
  const showTrim = (trims?.length ?? 0) > 0;
  const showDrive = (drives?.length ?? 0) > 0;

  // Render Product Page Variant
  if (variant === "product") {
    if (hasVehicleSelected) {
      return (
        <div className="w-full bg-white border-b-4 border-primary px-4 md:px-6 py-4 shadow-md rounded-t-sm flex flex-col md:flex-row items-center justify-center gap-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 shrink-0 fill-primary text-white" />
            <span className="font-extrabold text-gray-900 uppercase text-[15px] tracking-tight">
              {`${activeGarageItem?.year} ${activeGarageItem?.make} ${activeGarageItem?.model || ''} ${activeGarageItem?.trim && activeGarageItem.trim !== '__DEFAULT_TRIM__' ? activeGarageItem.trim : ''} ${activeGarageItem?.drive && activeGarageItem.drive !== '__DEFAULT_DRIVE__' ? activeGarageItem.drive : ''}`.trim()}
            </span>
          </div>
          <div className="flex items-center gap-6">
            
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

    return null
    // return (
    //   <div className="w-full bg-white border-b-4 border-[#dc5454] px-4 lg:px-6 py-4 shadow-md rounded-t-sm flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
    //     <div className="flex items-center gap-2 font-black text-gray-900 whitespace-nowrap lg:w-48 uppercase tracking-tight text-[15px]">
    //       <CarFront className="text-[#dc5454] w-5 h-5 shrink-0" />
    //       SHOP BY VEHICLE
    //     </div>

    //     <div className="flex-1 flex flex-col sm:flex-row gap-2 w-full" ref={containerRef}>
    //       <div className="flex-1 min-w-[120px]">
    //         <Select onValueChange={handleYearChange} value={year || undefined} disabled={isYearDisabled}>
    //           <SelectTrigger className="w-full bg-white border border-gray-200 text-[#6B7280] h-10 shadow-none rounded-[2px] ring-0! ring-offset-0! text-sm">
    //             <SelectValue placeholder={isYearLoading ? "Loading..." : "Year"} />
    //           </SelectTrigger>
    //           <SelectContent>
    //             {years?.map((y) => (
    //               <SelectItem key={`year-${y}`} value={y}>{y}</SelectItem>
    //             ))}
    //           </SelectContent>
    //         </Select>
    //       </div>

    //       <div className="flex-1 min-w-[120px]">
    //         <Select open={activeDropdown === "make"} onOpenChange={handleOpenChange("make")} onValueChange={handleMakeChange} value={make || "__DEFAULT_MAKE__"} disabled={isMakeDisabled}>
    //           <SelectTrigger className="w-full bg-white border border-gray-200 text-[#6B7280] h-10 shadow-none rounded-[2px] ring-0! ring-offset-0! text-sm">
    //             <SelectValue placeholder={isMakeLoading ? "Loading..." : "Make"} />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="__DEFAULT_MAKE__" className="hidden" disabled>Make</SelectItem>
    //             {makes?.map((m) => (
    //               <SelectItem key={`make-${m}`} value={m}>{m}</SelectItem>
    //             ))}
    //           </SelectContent>
    //         </Select>
    //       </div>

    //       <div className="flex-1 min-w-[120px]">
    //         <Select open={activeDropdown === "model"} onOpenChange={handleOpenChange("model")} onValueChange={handleModelChange} value={model || "__DEFAULT_MODEL__"} disabled={isModelDisabled}>
    //           <SelectTrigger className="w-full bg-white border border-gray-200 text-[#6B7280] h-10 shadow-none rounded-[2px] ring-0! ring-offset-0! text-sm">
    //             <SelectValue placeholder={isModelLoading ? "Loading..." : "Model"} />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="__DEFAULT_MODEL__" className="hidden" disabled>Model</SelectItem>
    //             {models?.map((mdl) => (
    //               <SelectItem key={`model-${mdl}`} value={mdl}>{mdl}</SelectItem>
    //             ))}
    //           </SelectContent>
    //         </Select>
    //       </div>

    //       {showBodyType && (
    //         <div className="flex-1 min-w-[120px]">
    //           <Select open={activeDropdown === "bodyType"} onOpenChange={handleOpenChange("bodyType")} onValueChange={handleBodyTypeChange} value={bodyType || "__DEFAULT_BODYTYPE__"} disabled={isBodyTypeDisabled}>
    //             <SelectTrigger className="w-full bg-white border border-gray-200 text-[#6B7280] h-10 shadow-none rounded-[2px] ring-0! ring-offset-0! text-sm">
    //               <SelectValue placeholder={isBodyTypeLoading ? "Loading..." : "Body Type"} />
    //             </SelectTrigger>
    //             <SelectContent>
    //               <SelectItem value="__DEFAULT_BODYTYPE__" className="hidden" disabled>Body Type</SelectItem>
    //               {bodyTypes?.map((bt) => (
    //                 <SelectItem key={`bodyType-${bt}`} value={bt}>{bt}</SelectItem>
    //               ))}
    //             </SelectContent>
    //           </Select>
    //         </div>
    //       )}

    //       {showSubmodel && (
    //         <div className="flex-1 min-w-[120px]">
    //           <Select open={activeDropdown === "subModel"} onOpenChange={handleOpenChange("subModel")} onValueChange={handleSubModelChange} value={subModel?.SubModel || "__DEFAULT_SUBMODEL__"} disabled={isSubmodelDisabled}>
    //             <SelectTrigger className="w-full bg-white border border-gray-200 text-[#6B7280] h-10 shadow-none rounded-[2px] ring-0! ring-offset-0! text-sm">
    //               <SelectValue placeholder={isSubmodelLoading ? "Loading..." : "Submodel"} />
    //             </SelectTrigger>
    //             <SelectContent>
    //               <SelectItem value="__DEFAULT_SUBMODEL__" className="hidden" disabled>Submodel</SelectItem>
    //               {subModels?.map((sm) => (
    //                 <SelectItem key={`subModel-${sm.SubModel}`} value={sm.SubModel}>{sm.SubModel}</SelectItem>
    //               ))}
    //             </SelectContent>
    //           </Select>
    //         </div>
    //       )}
    //     </div>

    //     <button
    //       onClick={(e) => onSubmit(e, { targetPath: variant === 'product' && location.pathname.includes('/tire') ? '/collections/product-category/tire' : undefined })}
    //       disabled={isDisabledSubmit || !shouldShowSubmit}
    //       className={cn(
    //         "h-10 px-8 text-white font-bold text-sm uppercase rounded-[2px] transition-colors w-full lg:w-auto mt-3 lg:mt-0 shadow-sm shrink-0 tracking-wide",
    //         isDisabledSubmit || !shouldShowSubmit ? "bg-[#8B8B8B] cursor-not-allowed" : "bg-[#dc5454] hover:bg-red-600"
    //       )}
    //     >
    //       GO
    //     </button>
    //   </div>
    // );
  }

  // Render Hero Variant
  if (hasVehicleSelected) {
    return (
      <div className="w-full max-w-5xl mx-auto rounded-sm shadow-xl bg-[#F8F8F8] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 lg:gap-6">
          <CheckCircle2 className="w-10 h-10 shrink-0 fill-primary text-white" />
          <div className="flex flex-col">
            <span className="text-xs text-[#6B7280] font-bold uppercase tracking-wide mb-1">Shopping For</span>
            <span className="text-2xl lg:text-3xl font-black text-[#111827] uppercase leading-none">
              {`${activeGarageItem?.year} ${activeGarageItem?.make} ${activeGarageItem?.model || ''} ${activeGarageItem?.trim && activeGarageItem.trim !== "__DEFAULT_TRIM__" ? activeGarageItem.trim : ""} ${activeGarageItem?.drive && activeGarageItem.drive !== "__DEFAULT_DRIVE__" ? activeGarageItem.drive : ""}`.trim()}
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
            className="flex-1 md:flex-none min-[375px]:px-4 px-6 lg:px-8 py-3 bg-primary hover:bg-primary/90 rounded-sm text-sm font-bold text-white uppercase shadow-sm whitespace-nowrap transition-colors"
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
            className=" cursor-pointer flex-1 py-4 flex justify-center items-center gap-2 font-bold text-xs sm:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <CarFront className={cn("w-4 h-4", activeTab === "vehicle" ? "text-primary" : "text-gray-400")} />
            BY VEHICLE
          </TabsTrigger>
          <TabsTrigger
            value="wheel"
            className=" cursor-pointer flex-1 py-4 flex justify-center items-center gap-2 font-bold text-xs sm:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <GiCarWheel className={cn("w-4 h-4", activeTab === "wheel" ? "text-primary" : "text-gray-400")} />
            BY WHEEL
          </TabsTrigger>
          <TabsTrigger
            value="tire"
            className=" cursor-pointer flex-1 py-4 flex justify-center items-center gap-2 font-bold text-xs sm:text-sm uppercase transition-colors relative rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none text-gray-500 hover:bg-gray-50 bg-transparent"
          >
            <PiTireThin className={cn("w-4 h-4", activeTab === "tire" ? "text-primary" : "text-gray-400")} />
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
              {(showTrim || showDrive) && (
                <div className="flex-1 flex flex-col sm:flex-row gap-3">
                  {showTrim && (
                    <div className="flex-1">
                      <Select open={activeDropdown === "trim"} onOpenChange={handleOpenChange("trim")} onValueChange={handleTrimChange} value={trim || "__DEFAULT_TRIM__"} disabled={isTrimDisabled}>
                        <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                          <SelectValue placeholder={isTrimLoading ? "Loading..." : "Trim"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__DEFAULT_TRIM__" className="hidden" disabled>Trim</SelectItem>
                          {trims?.map((item) => (
                            <SelectItem key={`trim-${item}`} value={item}>{item}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {showDrive && (
                    <div className="flex-1">
                      <Select open={activeDropdown === "drive"} onOpenChange={handleOpenChange("drive")} onValueChange={handleDriveChange} value={drive || "__DEFAULT_DRIVE__"} disabled={isDriveDisabled}>
                        <SelectTrigger className="w-full bg-white border-gray-200 text-gray-700 h-12 text-base">
                          <SelectValue placeholder={isDriveLoading ? "Loading..." : "Drive"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__DEFAULT_DRIVE__" className="hidden" disabled>Drive</SelectItem>
                          {drives?.map((item) => (
                            <SelectItem key={`drive-${item}`} value={item}>{item}</SelectItem>
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
                    isDisabledSubmit || !shouldShowSubmit ? "bg-primary/50 cursor-not-allowed opacity-80" : "bg-primary hover:bg-primary/90"
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
                    "w-full h-12 text-white font-bold text-lg uppercase rounded shadow flex items-center justify-center transition-opacity bg-primary/50 cursor-not-allowed opacity-80"
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
                    "w-full h-12 text-white font-bold text-lg uppercase rounded shadow flex items-center justify-center transition-opacity bg-primary/50 cursor-not-allowed opacity-80"
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
