import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useYmm from "@/hooks/useYmm";

const WheelYMMFilters = () => {
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
    list: { years,
      makes,
      models,
      trims,
      drives },
    onYearChange,
    onMakeChange,
    onModelChange,
    onTrimChange,
    onDriveChange,
    onSubmit,
    isDisabledSubmit,
    year, make, model, trim, drive, isActive
  } = useYmm("wheel_ymm_filter");

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const hasUserInteracted = useRef(false);

  useEffect(() => {
    isFirstRender.current = false;
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
  const handleTrimChange = handleInteraction(onTrimChange);
  const handleDriveChange = handleInteraction(onDriveChange);

  // Auto-submit when fully populated
  useEffect(() => {
    const isReady = !isDisabledSubmit && shouldShowSubmit;
    if (isReady && hasUserInteracted.current) {
      onSubmit(undefined);
      hasUserInteracted.current = false; // Reset
    }
  }, [isDisabledSubmit, shouldShowSubmit, onSubmit]);

  const showTrim = (trims?.length ?? 0) > 0;
  const showDrive = (drives?.length ?? 0) > 0;

  const handleOpenChange = (key: string) => (open: boolean) => {
    if (open) {
      setActiveDropdown(key);
    } else {
      setActiveDropdown((prev) => (prev === key ? null : prev));
    }
  };

  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (
      hasUserInteracted.current &&
      year &&
      !isMakeLoading &&
      !isMakeDisabled &&
      (makes?.length ?? 0) > 0 &&
      (!make || make === "__DEFAULT_MAKE__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("make");
        }
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [year, isMakeLoading, isMakeDisabled, makes?.length, make, isActive]);

  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (
      hasUserInteracted.current &&
      make &&
      !isModelLoading &&
      !isModelDisabled &&
      (models?.length ?? 0) > 0 &&
      (!model || model === "__DEFAULT_MODEL__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("model");
        }
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [make, isModelLoading, isModelDisabled, models?.length, model, isActive]);

  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (
      hasUserInteracted.current &&
      model &&
      !isTrimLoading &&
      !isTrimDisabled &&
      (trims?.length ?? 0) > 0 &&
      (!trim || trim === "__DEFAULT_TRIM__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("trim");
        }
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [model, isTrimLoading, isTrimDisabled, trims?.length, trim, isActive]);

  useEffect(() => {
    if (isFirstRender.current || !isActive) return;
    let timeoutId: NodeJS.Timeout;
    if (
      hasUserInteracted.current &&
      trim &&
      !isDriveLoading &&
      !isDriveDisabled &&
      (drives?.length ?? 0) > 0 &&
      (!drive || drive === "__DEFAULT_DRIVE__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("drive");
        }
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [trim, isDriveLoading, isDriveDisabled, drives?.length, drive, isActive]);

  return (
    <div ref={containerRef} className={"filter-shadow bg-gray-200"}>
      <div
        className={
          "hidden md:flex justify-between items-center font-medium text-gray-900 hover:text-gray-600 transition-colors pr-5 pb-3 border-y"
        }
      >
        <div className="uppercase bg-primary hover:bg-primary-hover text-white pl-3 pr-7 py-1">
          <p className="text-xs">Search by</p>
          <h2 className="text-base">Vehicle</h2>
        </div>
        <p className="text-xs text-primary cursor-pointer">
          New Vehicle Search
        </p>
      </div>

      <div className="px-10 pb-10 pt-5 md:pt-2 border-y">
        <div className="w-full flex flex-col gap-1 mt-4">
          <div className="w-full">
            <Select onValueChange={handleYearChange} value={year || undefined} disabled={isYearDisabled} >
              <SelectTrigger className="w-full p-2 rounded bg-white text-base text-black disabled:opacity-50">
                <SelectValue placeholder={isYearLoading ? "Loading..." : "Year"} />
              </SelectTrigger>
              <SelectContent>
                {years?.map((y) => (
                  <SelectItem key={`year-${y}`} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Select open={activeDropdown === "make"} onOpenChange={handleOpenChange("make")} onValueChange={handleMakeChange} value={make || "__DEFAULT_MAKE__"} disabled={isMakeDisabled} >
              <SelectTrigger className="w-full p-2 rounded bg-white text-base text-black disabled:opacity-50">
                <SelectValue placeholder={isMakeLoading ? "Loading..." : "Make"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__DEFAULT_MAKE__" className="hidden" disabled>
                  {isMakeLoading ? "Loading..." : "Make"}
                </SelectItem>
                {makes?.map((m) => (
                  <SelectItem key={`make-${m}`} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Select open={activeDropdown === "model"} onOpenChange={handleOpenChange("model")} onValueChange={handleModelChange} value={model || "__DEFAULT_MODEL__"} disabled={isModelDisabled} >
              <SelectTrigger className="w-full p-2 rounded bg-white text-base text-black disabled:opacity-50">
                <SelectValue placeholder={isModelLoading ? "Loading..." : "Model"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__DEFAULT_MODEL__" className="hidden" disabled>
                  {isModelLoading ? "Loading..." : "Model"}
                </SelectItem>
                {models?.map((mdl) => (
                  <SelectItem key={`model-${mdl}`} value={mdl}>
                    {mdl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {showTrim && (
            <div className="w-full">
              <Select open={activeDropdown === "trim"} onOpenChange={handleOpenChange("trim")} onValueChange={handleTrimChange} value={trim || "__DEFAULT_TRIM__"} disabled={isTrimDisabled} >
                <SelectTrigger className="w-full p-2 rounded bg-white text-base text-black disabled:opacity-50">
                  <SelectValue placeholder={isTrimLoading ? "Loading..." : "Trim"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__DEFAULT_TRIM__" className="hidden" disabled>
                    {isTrimLoading ? "Loading..." : "Trim"}
                  </SelectItem>
                  {trims?.map((item) => (
                    <SelectItem key={`trim-${item}`} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {showDrive && (
            <div className="w-full">
              <Select open={activeDropdown === "drive"} onOpenChange={handleOpenChange("drive")} onValueChange={handleDriveChange} value={drive || "__DEFAULT_DRIVE__"} disabled={isDriveDisabled} >
                <SelectTrigger className="w-full p-2 rounded bg-white text-base text-black disabled:opacity-50">
                  <SelectValue placeholder={isDriveLoading ? "Loading..." : "Drive"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__DEFAULT_DRIVE__" className="hidden" disabled>
                    {isDriveLoading ? "Loading..." : "Drive"}
                  </SelectItem>
                  {drives?.map((item) => (
                    <SelectItem key={`drive-${item}`} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="w-full p-4">
          <button
            onClick={() => onSubmit(undefined)}
            disabled={isDisabledSubmit && !shouldShowSubmit}
            className={cn(
              "w-full bg-primary hover:bg-primary-hover  text-white py-1 text-base uppercase cursor-pointer",
              isDisabledSubmit ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            {shouldShowSubmit ? "Submit" : "Loading"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WheelYMMFilters;
