"use client";

import { Clock, CarFront, CircleDot, X } from "lucide-react";
import useYmmFilterModal from "../../../../context/useYmmFilterModal";
import { useAppDispatch } from "@/redux/store";
import { removeFromGarage } from "@/redux/features/yearMakeModelSlice";

/**
 * SearchHistory Component
 * Displays garage items as search history above vehicle selection
 */
export default function SearchHistory() {
  const { garage, activeGarageId, handleSelectGarageWithRedirect } = useYmmFilterModal();
  const dispatch = useAppDispatch();

  const garageEntries = Object.entries(garage || {});
  const hasGarageItems = garageEntries.length > 0;

  // Don't render anything if no garage items
  if (!hasGarageItems) {
    return null;
  }

  const handleSelectGarage = (id: string) => {
    handleSelectGarageWithRedirect(id);
  };

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(removeFromGarage(id));
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-700">Recent Searches</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {garageEntries.map(([id, item]) => {
          const isActive = id === activeGarageId;
          const vehicleName = [item.year, item.make, item.model]
            .filter(Boolean)
            .join(" ");

          // Build trim/drive details
          const details = [item.trim, item.drive]
            .filter(Boolean)
            .filter(v => v !== '__DEFAULT_TRIM__' && v !== '__DEFAULT_DRIVE__')
            .join(" · ");

          return (
            <button
              key={id}
              onClick={() => handleSelectGarage(id)}
              className={`
                group relative inline-flex items-center gap-2 px-3 py-2 pr-8 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {isActive ? (
                <CircleDot className="h-3.5 w-3.5 fill-current shrink-0" />
              ) : (
                <CarFront className="h-3.5 w-3.5 shrink-0" />
              )}
              <span className="text-left">
                {vehicleName}
                {details && (
                  <span className={`
                    block text-xs
                    ${isActive ? "text-blue-100" : "text-gray-500"}
                  `}>
                    {details}
                  </span>
                )}
              </span>

              {/* Remove button */}
              <button
                onClick={(e) => handleRemove(e, id)}
                className={`
                  absolute right-1 top-1 p-1 rounded
                  ${isActive
                    ? "text-blue-200 hover:text-white hover:bg-blue-700"
                    : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }
                  transition-colors
                `}
                aria-label="Remove from history"
              >
                <X className="h-3 w-3" />
              </button>
            </button>
          );
        })}
      </div>
    </div>
  );
}
