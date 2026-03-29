import { MdInfo } from "react-icons/md";
import { TWheelProduct } from "@/types/product";

interface VehicleSpecificNoteProps {
  product: TWheelProduct;
}

const VehicleSpecificNote = ({ product }: VehicleSpecificNoteProps) => {
  return (
    <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 sm:px-4 py-2.5 sm:py-3">
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Blue Info Icon */}
        <MdInfo className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base text-gray-700 font-medium mb-1.5 sm:mb-2">
            Vehicle Specific
          </p>

          {/* Bullet Points */}
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
              <span>Fitment guaranteed when purchased as a set</span>
            </li>
            <li className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-blue-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">•</span>
              <span>Lug nuts and center rings included</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecificNote;
