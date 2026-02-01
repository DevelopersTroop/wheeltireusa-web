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

const TireYMMFilters = () => {
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
  } = useYmm(false);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const handleOpenChange = (key: string) => (open: boolean) => {
    if (open) {
      setActiveDropdown(key);
    } else {
      setActiveDropdown((prev) => (prev === key ? null : prev));
    }
  };

  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (
      year &&
      !isMakeLoading &&
      (makes?.length ?? 0) > 0 &&
      (!make || make === "__DEFAULT_MAKE__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("make");
        }
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [year, isMakeLoading, makes?.length, make]);

  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (
      make &&
      !isModelLoading &&
      (models?.length ?? 0) > 0 &&
      (!model || model === "__DEFAULT_MODEL__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("model");
        }
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [make, isModelLoading, models?.length, model]);

  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (
      model &&
      !isBodyTypeLoading &&
      (bodyTypes?.length ?? 0) > 0 &&
      (!bodyType || bodyType === "__DEFAULT_BODYTYPE__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("bodyType");
        }
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [model, isBodyTypeLoading, bodyTypes?.length, bodyType]);

  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (
      bodyType &&
      !isSubmodelLoading &&
      (subModels?.length ?? 0) > 0 &&
      (!subModel?.SubModel || subModel?.SubModel === "__DEFAULT_SUBMODEL__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("subModel");
        }
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [bodyType, isSubmodelLoading, subModels?.length, subModel?.SubModel]);

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
        <p className="text-xs text-primary cursor-pointer">New Vehicle Search</p>
      </div>

      <div className="px-10 pb-10 pt-5 md:pt-2 border-y">
        <div className="w-full flex flex-col gap-1 mt-4">
          <div className="w-full">
            <Select onValueChange={onYearChange} value={year || undefined} disabled={isYearDisabled} >
              <SelectTrigger className="w-full p-2 rounded bg-white text-base text-black">
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
            <Select open={activeDropdown === "make"} onOpenChange={handleOpenChange("make")} onValueChange={onMakeChange} value={make || "__DEFAULT_MAKE__"} disabled={isMakeDisabled} >
              <SelectTrigger className="w-full p-2 rounded bg-white text-base text-black">
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
            <Select open={activeDropdown === "model"} onOpenChange={handleOpenChange("model")} onValueChange={onModelChange} value={model || "__DEFAULT_MODEL__"} disabled={isModelDisabled} >
              <SelectTrigger className="w-full p-2 rounded bg-white text-base text-black">
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
          <div className="w-full">
            <Select open={activeDropdown === "bodyType"} onOpenChange={handleOpenChange("bodyType")} onValueChange={onBodyTypeChange} value={bodyType || "__DEFAULT_BODYTYPE__"} disabled={isBodyTypeDisabled} >
              <SelectTrigger className="w-full p-2 rounded bg-white text-base text-black">
                <SelectValue placeholder={isBodyTypeLoading ? "Loading..." : "Body Type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__DEFAULT_BODYTYPE__" className="hidden" disabled>
                  {isBodyTypeLoading ? "Loading..." : "Body Type"}
                </SelectItem>
                {bodyTypes?.map((bt) => (
                  <SelectItem key={`bodyType-${bt}`} value={bt}>
                    {bt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Select open={activeDropdown === "subModel"} onOpenChange={handleOpenChange("subModel")} onValueChange={onSubModelChange} value={subModel?.SubModel || "__DEFAULT_SUBMODEL__"} disabled={isSubmodelDisabled} >
              <SelectTrigger className="w-full p-2 rounded bg-white text-base text-black">
                <SelectValue placeholder={isSubmodelLoading ? "Loading..." : "Submodel"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__DEFAULT_SUBMODEL__" className="hidden" disabled>
                  {isSubmodelLoading ? "Loading..." : "Submodel"}
                </SelectItem>
                {subModels?.map((sm) => (
                  <SelectItem key={`subModel-${sm.SubModel}`} value={sm.SubModel}>
                    {sm.SubModel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full p-4">
          <button
            onClick={onSubmit}
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

export default TireYMMFilters;
