import { ProductRating } from "@/components/shared/Reviews/components/ProductRating/ProductRating";
import { TWheelProduct } from "@/types/product";

const WheelTitle = ({ product }: { product: TWheelProduct }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Brand */}
      <p className="text-[#f97316] text-xs font-bold uppercase tracking-[0.2em]">
        {product.brand}
      </p>

      {/* Model */}
      <h1 className="text-xl sm:text-xl font-extrabold text-white uppercase leading-tight tracking-tight">
        {product.title}
      </h1>

      {/* Wheel size + part number row */}
      <div className="flex flex-wrap items-center gap-3 mt-0.5">
        <span className="text-white/60 text-xs font-medium">
          {product.wheelSize || `${product.wheelDiameter}" x ${product.wheelWidth}"`}
        </span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span className="text-white/30 text-xs font-mono">
          {product?.partNumber}
        </span>
      </div>

      {/* Rating row */}
      <div className="mt-1">
        <ProductRating productId={product.id} />
      </div>
    </div>
  );
};

export default WheelTitle;