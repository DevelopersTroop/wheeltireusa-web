import { camelCaseToWords } from "@/utils/string";
import { TTireProduct } from "@/types/product";

const tire_specs_key: (keyof TTireProduct)[] = [
  "tireSize",
  "tireWidth",
  "tireAspectRatio",
  "tireDiameter",
  "speedRating",
  "loadIndex",
  "loadRange",
  "ply",
  "tireClass",
  "tireType",
  "tireStyle",
  "terrain",
  "runFlat",
  "mS",
  "treadDepth",
  "treadDepthIn",
  "treadDepthMm",
  "maxAirPressurePsi",
  "utqg",
  "mileageWarranty",
  "tireWeight",
  "sidewall",
  "revsPerMile",
  "tireMaxLoadLbs",
  "tireMaxLoadKg",
];

const TireSpecifications = ({ product }: { product: TTireProduct }) => {
  return (
    <div className="w-full">
      <h2 className="w-full text-sm font-bold uppercase tracking-wider text-card bg-foreground/90 px-4 py-3 rounded-t-lg">
        Tire Specifications
      </h2>
      <div className="border border-t-0 border-border/60 rounded-b-lg overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-border/40">
          {/* Brand & Model header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/40">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Brand
            </span>
            <span className="text-sm font-bold text-foreground">
              {product?.brand}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Model
            </span>
            <span className="text-sm font-bold text-foreground">
              {product.model}
            </span>
          </div>

          {/* Dynamic specs */}
          {tire_specs_key.map((key, i) => {
            const value = product[key];
            if (value != null && value !== "") {
              return (
                <div
                  key={key}
                  className={`flex items-center justify-between px-4 py-2.5 ${i % 2 === 0 ? "bg-secondary/40" : ""
                    }`}
                >
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {camelCaseToWords(key)}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {String(value)}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default TireSpecifications;
