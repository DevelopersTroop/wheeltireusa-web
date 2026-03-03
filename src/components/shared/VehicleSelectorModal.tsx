"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronDown, Trash2 } from "lucide-react";
import useYmm from "@/hooks/useYmm";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { addToGarage, removeFromGarage, clearGarage, setYmm, submitYmm, setActiveGarage } from "@/redux/features/yearMakeModelSlice";
import { TYmmGarageItem } from "@/types/ymm";
import { useRouter, usePathname } from 'next/navigation';

export const VehicleSelectorModal = ({ isOpen, onOpenChange, skipToGarage }: { isOpen: boolean, onOpenChange: (open: boolean) => void, skipToGarage?: boolean }) => {
  const { garage, activeGarageId } = useTypedSelector((state) => state.persisted.yearMakeModel);
  const [view, setView] = useState<'garage' | 'add'>(skipToGarage && garage?.length > 0 ? 'garage' : 'add');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      if (garage?.length > 0 && skipToGarage) {
        setView('garage');
      } else {
        setView('add');
      }
    }
  }, [isOpen, garage?.length, skipToGarage]);

  const handleClearAll = () => {
    dispatch(clearGarage());
    setView('add');
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromGarage(id));
    if (garage?.length <= 1) {
      setView('add');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl p-0 border-none rounded-md overflow-hidden bg-white">
        {view === 'garage' && garage?.length > 0 ? (
          <GarageView
            garage={garage}
            activeGarageId={activeGarageId}
            onAddVehicle={() => setView('add')}
            onClearAll={handleClearAll}
            onRemove={handleRemove}
            onClose={() => onOpenChange(false)}
          />
        ) : (
          <AddVehicleView onClose={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
};

const GarageView = ({ garage, activeGarageId, onAddVehicle, onClearAll, onRemove, onClose }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectVehicle = (item: TYmmGarageItem) => {
    dispatch(setActiveGarage(item.id));
    dispatch(setYmm({
      year: item.year,
      make: item.make,
      model: item.model,
      bodyType: item.bodyType || "",
      subModel: item.subModel || { SubModel: "", DRChassisID: "", DRModelID: "" },
      list: {
        makes: [],
        models: [],
        bodyTypes: [],
        subModels: []
      },
      vehicleInformation: {
        boltPattern: "",
        frontRimSize: "",
        rearRimSize: "",
        frontCenterBore: "",
        rearCenterBore: "",
        maxWheelLoad: "",
        tireSizes: [],
        supportedWheels: []
      }
    }));
    dispatch(submitYmm({ ...item }));
    onClose();
    if (pathname && !pathname.includes('/collections')) {
      const targetPath = pathname.includes('/tire')
        ? '/collections/product-category/tire'
        : '/collections/product-category/wheels';
      router.push(targetPath);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Garage</h2>
        <button onClick={onClearAll} className="text-[#3b5998] hover:text-[#2d4373] text-sm">
          Clear All
        </button>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {garage.map((item: TYmmGarageItem) => (
          <div
            key={item.id}
            onClick={() => handleSelectVehicle(item)}
            className={`p-4 rounded-md border-l-4 cursor-pointer transition-colors ${item.id === activeGarageId ? 'bg-blue-50/50 border-[#3b5998]' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.id === activeGarageId ? 'border-yellow-400' : 'border-gray-300'}`}>
                    {item.id === activeGarageId && <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900">{item.year} {item.make} {item.model && item.model !== '__DEFAULT_MODEL__' ? item.model : ''} {item.subModel?.SubModel && item.subModel.SubModel !== '__DEFAULT_SUBMODEL__' ? item.subModel.SubModel : (item.bodyType && item.bodyType !== '__DEFAULT_BODYTYPE__' ? item.bodyType : '')}</span>
                    {item.id === activeGarageId && (
                      <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Main</span>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSelectVehicle(item); }}
                    className="text-[#3b5998] border border-[#3b5998] px-3 py-1.5 text-xs font-bold rounded-sm hover:bg-blue-50"
                  >
                    BROWSE CATALOG
                  </button>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); onRemove(item.id); }} className="text-gray-400 hover:text-red-500">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <button
          onClick={onAddVehicle}
          className="w-full py-3 border border-gray-900 text-gray-900 font-bold uppercase text-sm hover:bg-gray-50 rounded-sm"
        >
          ADD VEHICLE
        </button>
      </div>
    </div>
  );
};

const AddVehicleView = ({ onClose }: { onClose: () => void }) => {
  const {
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isBodyTypeLoading,
    isSubmodelLoading,
    isYearDisabled,
    isMakeDisabled,
    isModelDisabled,
    list: { years, makes, models, subModels, bodyTypes },
    onYearChange,
    onMakeChange,
    onModelChange,
    onBodyTypeChange,
    onSubModelChange,
    isDisabledSubmit,
    isBodyTypeDisabled,
    isSubmodelDisabled,
    year,
    make,
    model,
    subModel,
    bodyType,
    shouldShowSubmit,
  } = useYmm("vehicle_selector_modal");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const hasUserInteracted = useRef(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>("year");

  const handleOpenChange = (key: string) => (open: boolean) => {
    setActiveDropdown(open ? key : null);
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
  const handleBodyTypeChange = handleInteraction(onBodyTypeChange);
  const handleSubModelChange = handleInteraction(onSubModelChange);

  // Auto-advance dropdowns 
  useEffect(() => {
    if (year && !isMakeLoading && !isMakeDisabled && (makes?.length ?? 0) > 0 && (!make || make === "__DEFAULT_MAKE__")) {
      setTimeout(() => setActiveDropdown("make"), 200);
    }
  }, [year, isMakeLoading, isMakeDisabled, makes?.length, make]);

  useEffect(() => {
    if (make && !isModelLoading && !isModelDisabled && (models?.length ?? 0) > 0 && (!model || model === "__DEFAULT_MODEL__")) {
      setTimeout(() => setActiveDropdown("model"), 200);
    }
  }, [make, isModelLoading, isModelDisabled, models?.length, model]);

  const showBodyType = (bodyTypes?.length ?? 0) > 0;
  const showSubmodel = (subModels?.length ?? 0) > 0;

  useEffect(() => {
    if (showBodyType && model && model !== "__DEFAULT_MODEL__" && !isBodyTypeLoading && !isBodyTypeDisabled && (!bodyType || bodyType === "__DEFAULT_BODYTYPE__")) {
      setTimeout(() => setActiveDropdown("bodyType"), 200);
    }
  }, [showBodyType, model, isBodyTypeLoading, isBodyTypeDisabled, bodyType]);

  useEffect(() => {
    if (showSubmodel && bodyType && bodyType !== "__DEFAULT_BODYTYPE__" && !isSubmodelLoading && !isSubmodelDisabled && (!subModel || subModel?.SubModel === "__DEFAULT_SUBMODEL__")) {
      setTimeout(() => setActiveDropdown("subModel"), 200);
    }
  }, [showSubmodel, bodyType, isSubmodelLoading, isSubmodelDisabled, subModel]);

  const handleSubmit = () => {
    const cleanModel = model && model !== '__DEFAULT_MODEL__' ? model : '';
    const cleanBodyType = bodyType && bodyType !== '__DEFAULT_BODYTYPE__' ? bodyType : '';
    const cleanSubModel = subModel?.SubModel && subModel.SubModel !== '__DEFAULT_SUBMODEL__' ? subModel : { SubModel: '', DRChassisID: '', DRModelID: '' };
    const newItem: TYmmGarageItem = {
      id: `${year}-${make}-${cleanModel}-${cleanBodyType}-${cleanSubModel.SubModel}`,
      year,
      make,
      model: cleanModel,
      bodyType: cleanBodyType,
      subModel: cleanSubModel
    };
    dispatch(addToGarage(newItem));
    dispatch(submitYmm(newItem));
    onClose();
    if (pathname && !pathname.includes('/collections')) {
      const targetPath = pathname.includes('/tire')
        ? '/collections/product-category/tire'
        : '/collections/product-category/wheels';
      router.push(targetPath);
    }
  };

  // Auto-submit when fully populated
  useEffect(() => {
    const isReady = !isDisabledSubmit && shouldShowSubmit;
    if (isReady && hasUserInteracted.current) {
      handleSubmit();
      hasUserInteracted.current = false; // Reset
    }
  }, [isDisabledSubmit, shouldShowSubmit]);

  return (
    <div className="bg-[#E8EDF2] p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Select Your Vehicle</h2>
        <p className="text-sm text-gray-600">Provide vehicle details to confirm fitment</p>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-center">
        {/* Year Dropdown */}
        <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
          <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">1</div>
          <div className="w-px h-5 bg-gray-300"></div>
          <Select open={activeDropdown === "year"} onOpenChange={handleOpenChange("year")} onValueChange={handleYearChange} value={year || undefined} disabled={isYearDisabled}>
            <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 shadow-none border-none ring-0 focus:ring-0 appearance-none h-auto [&>svg]:hidden shrink-0 whitespace-nowrap">
              <SelectValue placeholder={isYearLoading ? "LOADING..." : "YEAR"} />
            </SelectTrigger>
            <SelectContent>
              {years?.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Make Dropdown */}
        <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
          <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">2</div>
          <div className="w-px h-5 bg-gray-300"></div>
          <Select open={activeDropdown === "make"} onOpenChange={handleOpenChange("make")} onValueChange={handleMakeChange} value={make || "__DEFAULT_MAKE__"} disabled={isMakeDisabled}>
            <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 shadow-none border-none ring-0 focus:ring-0 appearance-none h-auto [&>svg]:hidden shrink-0 whitespace-nowrap">
              <SelectValue placeholder={isMakeLoading ? "LOADING..." : "MAKE"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__DEFAULT_MAKE__" className="hidden" disabled>MAKE</SelectItem>
              {makes?.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Model Dropdown */}
        <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
          <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">3</div>
          <div className="w-px h-5 bg-gray-300"></div>
          <Select open={activeDropdown === "model"} onOpenChange={handleOpenChange("model")} onValueChange={handleModelChange} value={model || "__DEFAULT_MODEL__"} disabled={isModelDisabled}>
            <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 shadow-none border-none ring-0 focus:ring-0 appearance-none h-auto [&>svg]:hidden shrink-0 whitespace-nowrap">
              <SelectValue placeholder={isModelLoading ? "LOADING..." : "MODEL"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__DEFAULT_MODEL__" className="hidden" disabled>MODEL</SelectItem>
              {models?.map((mdl) => (
                <SelectItem key={mdl} value={mdl}>{mdl}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {showBodyType && (
          <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
            <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">4</div>
            <div className="w-px h-5 bg-gray-300"></div>
            <Select open={activeDropdown === "bodyType"} onOpenChange={handleOpenChange("bodyType")} onValueChange={handleBodyTypeChange} value={bodyType || "__DEFAULT_BODYTYPE__"} disabled={isBodyTypeDisabled}>
              <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 shadow-none border-none ring-0 focus:ring-0 appearance-none h-auto [&>svg]:hidden shrink-0 whitespace-nowrap">
                <SelectValue placeholder={isBodyTypeLoading ? "LOADING..." : "BODY TYPE"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__DEFAULT_BODYTYPE__" className="hidden" disabled>BODY TYPE</SelectItem>
                {bodyTypes?.map((bt) => (
                  <SelectItem key={bt} value={bt}>{bt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        )}

        {showSubmodel && (
          <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
            <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">5</div>
            <div className="w-px h-5 bg-gray-300"></div>
            <Select open={activeDropdown === "subModel"} onOpenChange={handleOpenChange("subModel")} onValueChange={handleSubModelChange} value={subModel?.SubModel || "__DEFAULT_SUBMODEL__"} disabled={isSubmodelDisabled}>
              <SelectTrigger className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 shadow-none border-none ring-0 focus:ring-0 appearance-none h-auto [&>svg]:hidden shrink-0 whitespace-nowrap">
                <SelectValue placeholder={isSubmodelLoading ? "LOADING..." : "SUBMODEL"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__DEFAULT_SUBMODEL__" className="hidden" disabled>SUBMODEL</SelectItem>
                {subModels?.map((sm) => (
                  <SelectItem key={sm.SubModel} value={sm.SubModel}>{sm.SubModel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isDisabledSubmit}
          className="w-full sm:w-auto px-8 py-3 whitespace-nowrap bg-[#3b5998] hover:bg-[#2d4373] text-white font-bold text-sm rounded-sm transition-colors disabled:opacity-50"
        >
          GO
        </button>
      </div>


    </div>
  );
};

export const VehicleSelectorButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { garage, activeGarageId } = useTypedSelector(
    (state) => state.persisted.yearMakeModel
  );

  const activeItem = garage?.find((item) => item.id === activeGarageId);
  const activeLabel = activeItem
    ? `${activeItem.year} ${activeItem.make} ${activeItem.model && activeItem.model !== '__DEFAULT_MODEL__' ? activeItem.model : ''}`
    : "SHOP BY VEHICLE";

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-[#F0F4F8] hover:bg-[#E2E8F0] rounded-md transition-colors cursor-pointer"
      >
        {/* Car icon */}
        <div className="relative shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-gray-700"
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
          <div className="absolute -top-2 -right-2.5 bg-green-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
            {garage?.length || 0}
          </div>
        </div>

        <span className="text-[#3b5998] font-bold text-xs sm:text-sm whitespace-nowrap tracking-wide">
          {activeLabel}
        </span>
      </button>

      <VehicleSelectorModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        skipToGarage={garage?.length > 0}
      />
    </>
  );
};
