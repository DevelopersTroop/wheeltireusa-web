'use client';
import { useMemo } from "react";
import { MdInfo, MdCheckCircle, MdWarning } from "react-icons/md";
import { TTireProduct } from "@/types/product";
import { useTypedSelector } from "@/redux/store";
import { validateTireFitment, normalizeTireFitment, TireFitmentValidationResult, TireFitmentCheckType } from "@/lib/fitment";

// Helper function to get user-friendly failure messages
const getTireFailureMessages = (failedChecks: TireFitmentCheckType[]): string[] => {
  const messages: Record<TireFitmentCheckType, string> = {
    tireSize: "Tire size does not match your vehicle's requirements",
    loadIndex: "Load index is below your vehicle's requirement",
    speedRating: "Speed rating is below your vehicle's requirement",
    missingData: "Incomplete tire specification data",
  };

  return failedChecks.map(check => messages[check]);
};

interface TireVehicleSpecificNoteProps {
  product: TTireProduct;
}

const TireVehicleSpecificNote = ({ product }: TireVehicleSpecificNoteProps) => {
  // Access Redux state
  const vehicleInformation = useTypedSelector(
    (state) => state.persisted.yearMakeModel.vehicleInformation
  );
  const activeGarageId = useTypedSelector(
    (state) => state.persisted.yearMakeModel.activeGarageId
  );
  const garage = useTypedSelector(
    (state) => state.persisted.yearMakeModel.garage
  );

  // Get active vehicle from garage
  const activeVehicle = useMemo(() => {
    if (!activeGarageId || !garage[activeGarageId]) {
      return null;
    }
    return garage[activeGarageId];
  }, [activeGarageId, garage]);

  // Normalize fitment data
  const normalizedFitment = useMemo(() => {
    return normalizeTireFitment(vehicleInformation, activeGarageId);
  }, [vehicleInformation, activeGarageId]);

  // Validate fitment
  const fitmentValidation = useMemo(() => {
    return validateTireFitment(product, normalizedFitment, activeVehicle);
  }, [product, normalizedFitment, activeVehicle]);

  // No active vehicle selected - show generic info
  if (!activeVehicle) {
    return <TireGenericNote product={product} />;
  }

  // Tire doesn't fit
  if (!fitmentValidation.isCompatible) {
    return <TireIncompatibleNote product={product} activeVehicle={activeVehicle} fitmentValidation={fitmentValidation} />;
  }

  // Tire fits - show fitment details
  return (
    <TireCompatibleNote
      product={product}
      fitmentValidation={fitmentValidation}
    />
  );
};

// Sub-component: Generic note when no vehicle selected
const TireGenericNote = ({ product }: { product: TTireProduct }) => (
  <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 sm:px-4 py-2.5 sm:py-3">
    <div className="flex items-start gap-2 sm:gap-3">
      <MdInfo className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-base text-gray-700 font-medium mb-1.5 sm:mb-2">
          Vehicle Specific
        </p>
        <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-gray-600">
          {product?.tireSize && (
            <li className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
              <span>Size: {product.tireSize}</span>
            </li>
          )}
          {product?.loadIndex && (
            <li className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
              <span>Load Index: {product.loadIndex}</span>
            </li>
          )}
          {product?.speedRating && (
            <li className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
              <span>Speed Rating: {product.speedRating}</span>
            </li>
          )}
          <li className="flex items-start gap-1.5 sm:gap-2">
            <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
            <span>Select your vehicle to verify fitment</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Sub-component: Tire doesn't fit
const TireIncompatibleNote = ({
  product,
  activeVehicle,
  fitmentValidation,
}: {
  product: TTireProduct;
  activeVehicle: { year: string; make: string; model: string; trim?: string; drive?: string };
  fitmentValidation: TireFitmentValidationResult;
}) => {
  const failureReasons = getTireFailureMessages(fitmentValidation.failedChecks);

  return (
    <div className="rounded-lg bg-red-50 border border-red-100 px-3 sm:px-4 py-2.5 sm:py-3">
      <div className="flex items-start gap-2 sm:gap-3">
        <MdWarning className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base text-red-700 font-medium mb-1.5 sm:mb-2">
            Will Not Fit Your Vehicle
          </p>
          <p className="text-xs sm:text-sm text-gray-700 mb-2">
            {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
            {activeVehicle.trim && activeVehicle.trim !== "__DEFAULT_TRIM__" && ` ${activeVehicle.trim}`}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">
            Reason{failureReasons.length > 1 ? 's' : ''} this tire won't fit:
          </p>
          <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-gray-600">
            {failureReasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                <span className="text-red-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">✗</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
          {(product?.tireSize || product?.loadIndex || product?.speedRating) && (
            <div className="mt-3 pt-2 border-t border-red-200">
              <p className="text-xs text-gray-500 mb-1">Tire specifications:</p>
              <ul className="space-y-0.5 text-xs text-gray-600">
                {product?.tireSize && (
                  <li>• Size: {product.tireSize}</li>
                )}
                {product?.loadIndex && (
                  <li>• Load Index: {product.loadIndex}</li>
                )}
                {product?.speedRating && (
                  <li>• Speed Rating: {product.speedRating}</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sub-component: Tire fits
const TireCompatibleNote = ({
  product,
  fitmentValidation,
}: {
  product: TTireProduct;
  fitmentValidation: TireFitmentValidationResult;
}) => (
  <div className="rounded-lg bg-green-50 border border-green-100 px-3 sm:px-4 py-2.5 sm:py-3">
    <div className="flex items-start gap-2 sm:gap-3">
      <MdCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-base text-green-700 font-medium mb-1.5 sm:mb-2">
          Fits Your Vehicle
        </p>
        <p className="text-xs sm:text-sm text-gray-700 mb-2">
          {fitmentValidation.activeVehicle?.year} {fitmentValidation.activeVehicle?.make}{" "}
          {fitmentValidation.activeVehicle?.model}
          {fitmentValidation.activeVehicle?.trim && fitmentValidation.activeVehicle.trim !== "__DEFAULT_TRIM__" && ` ${fitmentValidation.activeVehicle.trim}`}
        </p>
        <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-gray-600">
          {product?.tireSize && (
            <li className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-green-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
              <span>Size: {product.tireSize}</span>
            </li>
          )}
          {product?.loadIndex && (
            <li className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-green-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
              <span>Load Index: {product.loadIndex}</span>
            </li>
          )}
          {product?.speedRating && (
            <li className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-green-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
              <span>Speed Rating: {product.speedRating}</span>
            </li>
          )}
          <li className="flex items-start gap-1.5 sm:gap-2">
            <span className="text-green-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
            <span>Fitment based on matching size, load index, and speed rating</span>
          </li>
        </ul>
        <p className="mt-2 text-xs text-gray-500 italic">
          * Matching conditions indicate fitment. Professional installation recommended.
        </p>
      </div>
    </div>
  </div>
);

export default TireVehicleSpecificNote;
