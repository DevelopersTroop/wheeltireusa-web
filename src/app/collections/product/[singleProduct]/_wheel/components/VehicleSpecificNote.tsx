'use client';
import { useMemo } from "react";
import { MdInfo, MdCheckCircle, MdWarning } from "react-icons/md";
import { TWheelProduct } from "@/types/product";
import { useTypedSelector } from "@/redux/store";
import { validateWheelFitment, normalizeWheelFitment, WheelFitmentValidationResult, FitmentCheckType } from "@/lib/fitment";

// Helper function to get user-friendly failure messages
const getFailureMessages = (failedChecks: FitmentCheckType[]): string[] => {
  const messages: Record<FitmentCheckType, string> = {
    boltPattern: "Bolt pattern does not match your vehicle",
    centerBore: "Center bore is too small for your vehicle's hub",
    loadRating: "Load rating is insufficient for your vehicle",
    offset: "Wheel offset is outside the acceptable range",
    wheelSize: "Wheel size (diameter/width) does not match your vehicle's requirements",
    missingData: "Incomplete wheel specification data",
  };

  return failedChecks.map(check => messages[check]);
};

interface VehicleSpecificNoteProps {
  product: TWheelProduct;
}

const VehicleSpecificNote = ({ product }: VehicleSpecificNoteProps) => {
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
    return normalizeWheelFitment(
      vehicleInformation.VehicleDataFromDRD_NA,
      vehicleInformation.afterMarketDRSizes
    );
  }, [vehicleInformation]);

  // Validate fitment
  const fitmentValidation = useMemo(() => {
    return validateWheelFitment(product, normalizedFitment, activeVehicle);
  }, [product, normalizedFitment, activeVehicle]);

  // No active vehicle selected - show generic info
  if (!activeVehicle) {
    return <GenericVehicleNote product={product} />;
  }

  // Wheel doesn't fit
  if (!fitmentValidation.isCompatible) {
    return <IncompatibleNote product={product} activeVehicle={activeVehicle} fitmentValidation={fitmentValidation} />;
  }

  // Wheel fits - show fitment details
  return (
    <CompatibleNote
      product={product}
      fitmentValidation={fitmentValidation}
    />
  );
};

// Sub-component: Generic note when no vehicle selected
const GenericVehicleNote = ({ product }: { product: TWheelProduct }) => (
  <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 sm:px-4 py-2.5 sm:py-3">
    <div className="flex items-start gap-2 sm:gap-3">
      <MdInfo className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-base text-gray-700 font-medium mb-1.5 sm:mb-2">
          Vehicle Specific
        </p>
        <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-gray-600">
          {product?.wheelSize && (
            <li className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
              <span>Size: {product.wheelSize}</span>
            </li>
          )}
          {product?.boltPatterns && product.boltPatterns.length > 0 && (
            <li className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
              <span>Bolt Pattern: {product.boltPatterns.join(", ")}</span>
            </li>
          )}
          <li className="flex items-start gap-1.5 sm:gap-2">
            <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
            <span>Select your vehicle to check fitment</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Sub-component: Wheel doesn't fit
const IncompatibleNote = ({
  product,
  activeVehicle,
  fitmentValidation,
}: {
  product: TWheelProduct;
  activeVehicle: { year: string; make: string; model: string; trim?: string; drive?: string };
  fitmentValidation: WheelFitmentValidationResult;
}) => {
  const failureReasons = getFailureMessages(fitmentValidation.failedChecks);

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
            {activeVehicle.trim && ` ${activeVehicle.trim}`}
            {activeVehicle.drive && ` ${activeVehicle.drive}`}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">
            Reason{failureReasons.length > 1 ? 's' : ''} this wheel won't fit:
          </p>
          <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-gray-600">
            {failureReasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                <span className="text-red-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">✗</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
          {(product?.wheelSize || (product?.boltPatterns && product.boltPatterns.length > 0)) && (
            <div className="mt-3 pt-2 border-t border-red-200">
              <p className="text-xs text-gray-500 mb-1">Wheel specifications:</p>
              <ul className="space-y-0.5 text-xs text-gray-600">
                {product?.wheelSize && (
                  <li>• Size: {product.wheelSize}</li>
                )}
                {product?.boltPatterns && product.boltPatterns.length > 0 && (
                  <li>• Bolt Pattern: {product.boltPatterns.join(", ")}</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sub-component: Wheel fits
const CompatibleNote = ({
  product,
  fitmentValidation,
}: {
  product: TWheelProduct;
  fitmentValidation: WheelFitmentValidationResult;
}) => (
  <div className="rounded-lg bg-green-50 border border-green-100 px-3 sm:px-4 py-2.5 sm:py-3">
    <div className="flex items-start gap-2 sm:gap-3">
      <MdCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-base text-green-700 font-medium mb-1.5 sm:mb-2">
          Fits Your Vehicle - {fitmentValidation.compatibility}
        </p>
        <p className="text-xs sm:text-sm text-gray-700 mb-2">
          {fitmentValidation.activeVehicle?.year} {fitmentValidation.activeVehicle?.make}{" "}
          {fitmentValidation.activeVehicle?.model}
          {fitmentValidation.activeVehicle?.trim && ` ${fitmentValidation.activeVehicle.trim}`}
          {fitmentValidation.activeVehicle?.drive && ` ${fitmentValidation.activeVehicle.drive}`}
        </p>
        <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-gray-600">
          {product?.wheelSize && (
            <li className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-green-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
              <span>Size: {product.wheelSize}</span>
            </li>
          )}
          {product?.boltPatterns && product.boltPatterns.length > 0 && (
            <li className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-green-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
              <span>Bolt Pattern: {product.boltPatterns.join(", ")}</span>
            </li>
          )}
          <li className="flex items-start gap-1.5 sm:gap-2">
            <span className="text-green-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
            <span>
              {/* Load rating is currently disabled in validation logic - to re-enable, uncomment the line below and comment out the active line */}
              {/* Fitment based on matching bolt pattern, center bore, load rating, offset, and size */}
              Fitment based on matching bolt pattern, center bore, offset, and size
            </span>
          </li>
        </ul>
        <p className="mt-2 text-xs text-gray-500 italic">
          * Matching conditions indicate fitment. Professional installation recommended.
        </p>
      </div>
    </div>
  </div>
);

export default VehicleSpecificNote; 
