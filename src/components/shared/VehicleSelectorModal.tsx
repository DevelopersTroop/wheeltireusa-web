"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ChevronDown, Trash2 } from "lucide-react";
import useYmm from "@/hooks/useYmm";
import { useAppDispatch, useTypedSelector } from "@/redux/store";
import { addToGarage, removeFromGarage, clearGarage, setYmm, submitYmm, setActiveGarage } from "@/redux/features/yearMakeModelSlice";
import { TYmmGarageItem } from "@/types/ymm";

export const VehicleSelectorModal = ({ isOpen, onOpenChange, skipToGarage }: { isOpen: boolean, onOpenChange: (open: boolean) => void, skipToGarage?: boolean }) => {
  const { garage, activeGarageId } = useTypedSelector((state) => state.yearMakeModel);
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
                    <span className="font-bold text-gray-900">{item.year} {item.make} {item.model} {item.subModel?.SubModel || item.bodyType}</span>
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
  const hasUserInteracted = useRef(false);

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

  const showBodyType = (bodyTypes?.length ?? 0) > 0;
  const showSubmodel = (subModels?.length ?? 0) > 0;

  const handleSubmit = () => {
    const newItem: TYmmGarageItem = {
      id: `${year}-${make}-${model}-${bodyType}-${subModel.SubModel}`,
      year,
      make,
      model,
      bodyType,
      subModel
    };
    dispatch(addToGarage(newItem));
    dispatch(submitYmm(newItem));
    onClose();
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
          <select
            value={year || ""}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 appearance-none cursor-pointer focus:outline-none"
          >
            <option value="">YEAR</option>
            {years?.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Make Dropdown */}
        <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
          <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">2</div>
          <div className="w-px h-5 bg-gray-300"></div>
          <select
            value={make || ""}
            onChange={(e) => handleMakeChange(e.target.value)}
            disabled={isMakeDisabled}
            className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 appearance-none cursor-pointer focus:outline-none disabled:opacity-50"
          >
            <option value="">MAKE</option>
            {makes?.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Model Dropdown */}
        <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
          <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">3</div>
          <div className="w-px h-5 bg-gray-300"></div>
          <select
            value={model || ""}
            onChange={(e) => handleModelChange(e.target.value)}
            disabled={isModelDisabled}
            className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 appearance-none cursor-pointer focus:outline-none disabled:opacity-50"
          >
            <option value="">MODEL</option>
            {models?.map((mdl) => (
              <option key={mdl} value={mdl}>{mdl}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {showBodyType && (
          <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
            <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">4</div>
            <div className="w-px h-5 bg-gray-300"></div>
            <select
              value={bodyType || ""}
              onChange={(e) => handleBodyTypeChange(e.target.value)}
              disabled={isBodyTypeDisabled}
              className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 appearance-none cursor-pointer focus:outline-none disabled:opacity-50"
            >
              <option value="">BODY TYPE</option>
              {bodyTypes?.map((mdl) => (
                <option key={mdl} value={mdl}>{mdl}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        )}

        {showSubmodel && (
          <div className="flex-1 w-full sm:w-auto min-w-[120px] relative flex items-center bg-white border border-gray-300 rounded-sm">
            <div className="pl-3 pr-2 text-gray-900 font-bold text-sm">5</div>
            <div className="w-px h-5 bg-gray-300"></div>
            <select
              value={subModel.SubModel || ""}
              onChange={(e) => handleSubModelChange(e.target.value)}
              disabled={isSubmodelDisabled}
              className="w-full bg-transparent text-gray-600 uppercase text-xs font-semibold px-2 py-3 appearance-none cursor-pointer focus:outline-none disabled:opacity-50"
            >
              <option value="">SUBMODEL</option>
              {subModels?.map((mdl) => (
                <option key={mdl.SubModel} value={mdl.SubModel}>{mdl.SubModel}</option>
              ))}
            </select>
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
    (state) => state.yearMakeModel
  );

  const activeItem = garage?.find((item) => item.id === activeGarageId);
  const activeLabel = activeItem
    ? `${activeItem.year} ${activeItem.make} ${activeItem.model}`
    : "SELECT YOUR VEHICLE";

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
