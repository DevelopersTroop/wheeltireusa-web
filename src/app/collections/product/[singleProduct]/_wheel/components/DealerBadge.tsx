import { MdCheckCircle } from "react-icons/md";
import { TWheelProduct } from "@/types/product";

interface DealerBadgeProps {
  product: TWheelProduct;
}

const DealerBadge = ({ product }: DealerBadgeProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* Green Checkmark */}
      <MdCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />

      {/* Text */}
      <span className="text-sm text-gray-600 font-medium">
        Authorized Dealer
      </span>

      {/* Brand Logo/Name Badge */}
      <div className="ml-1 px-2 py-0.5 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider rounded">
        {product?.brand || "WHEELS"}
      </div>
    </div>
  );
};

export default DealerBadge;
