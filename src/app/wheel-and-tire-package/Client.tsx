"use client";
import { Button } from "@/components/ui/button";
import { getProductImage } from "@/lib/utils";
import { addToCart } from "@/redux/features/cartSlice";
import { useTypedSelector } from "@/redux/store";
import { getPrice } from "@/utils/price";
import { productsByCategory } from "@/utils/product";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import PackageDetails from "./package-details";
import { Ymm } from "./ymm";
import { useCartHook } from "@/hooks/useCartHook";
import { TWheelProduct, TTireProduct } from "@/types/product";
import { useState } from "react";
import {
  Package,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Format currency
const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

// Spec badge component
function SpecBadge({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex flex-col items-center px-3 py-2 bg-secondary/60 rounded-lg border border-border/50 min-w-[80px]">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </span>
      <span className="text-sm font-bold text-foreground mt-0.5">
        {value}
      </span>
    </div>
  );
}

// Product card component
function ProductCard({
  product,
  type,
  price,
}: {
  product: TWheelProduct | TTireProduct;
  type: "wheel" | "tire";
  price: number;
}) {
  const [showSpecs, setShowSpecs] = useState(false);
  const isWheel = type === "wheel";
  const wheelProduct = isWheel ? (product as TWheelProduct) : null;
  const tireProduct = !isWheel ? (product as TTireProduct) : null;

  return (
    <div className="group relative bg-card rounded-2xl border border-border/60 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full backdrop-blur-sm border border-primary/20">
          {isWheel ? (
            <>
              <Star size={12} /> Wheel
            </>
          ) : (
            <>
              <Shield size={12} /> Tire
            </>
          )}
        </span>
      </div>

      {/* Image */}
      <div className="relative bg-gradient-to-b from-secondary/30 to-secondary/10 p-6 pt-12 flex items-center justify-center overflow-hidden">
        <img
          src={getProductImage(false, product)}
          alt={`${product.brand} ${product.model}`}
          className="w-full max-w-[320px] h-[280px] object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Brand & Model */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {product.brand}
          </p>
          <h3 className="text-xl font-bold text-foreground mt-0.5 leading-tight">
            {product.model}
          </h3>
          {isWheel && wheelProduct?.finish && (
            <p className="text-sm text-muted-foreground mt-1">
              {wheelProduct.finish}
            </p>
          )}
          {!isWheel && tireProduct?.tireSize && (
            <p className="text-sm text-muted-foreground mt-1">
              Size: {tireProduct.tireSize}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(price)}
          </span>
          <span className="text-xs text-muted-foreground">/ each</span>
        </div>

        {/* Quick spec badges */}
        <div className="flex flex-wrap gap-2">
          {isWheel && wheelProduct && (
            <>
              <SpecBadge
                label="Diameter"
                value={
                  wheelProduct.wheelDiameter || wheelProduct.diameter
                }
              />
              <SpecBadge
                label="Width"
                value={wheelProduct.wheelWidth || wheelProduct.width}
              />
              <SpecBadge label="Offset" value={wheelProduct.offset} />
              <SpecBadge
                label="Bolt"
                value={wheelProduct.boltPattern1}
              />
              <SpecBadge
                label="Centerbore"
                value={wheelProduct.centerbore}
              />
            </>
          )}
          {!isWheel && tireProduct && (
            <>
              <SpecBadge label="Width" value={tireProduct.tireWidth} />
              <SpecBadge
                label="Aspect"
                value={tireProduct.tireAspectRatio}
              />
              <SpecBadge
                label="Speed"
                value={tireProduct.speedRating}
              />
              <SpecBadge
                label="Load"
                value={tireProduct.loadIndex}
              />
              <SpecBadge
                label="Ply"
                value={tireProduct.ply}
              />
            </>
          )}
        </div>

        {/* Expandable full specs */}
        <button
          onClick={() => setShowSpecs(!showSpecs)}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors w-full justify-center py-2 rounded-lg hover:bg-primary/5"
        >
          {showSpecs ? "Hide" : "View"} Full Specifications
          {showSpecs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showSpecs && (
          <div className="border-t border-border/50 pt-4 animate-in slide-in-from-top-2 duration-200">
            {isWheel && wheelProduct && (
              <WheelSpecTable product={wheelProduct} />
            )}
            {!isWheel && tireProduct && (
              <TireSpecTable product={tireProduct} />
            )}
          </div>
        )}

        {/* Description */}
        {product.description && (
          <div className="border-t border-border/50 pt-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              About {product.brand} {product.model}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              {product.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline spec tables for the expandable section
function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center py-2 px-3 even:bg-secondary/30 rounded-md">
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <span className="text-xs font-semibold text-foreground">{String(value)}</span>
    </div>
  );
}

function WheelSpecTable({ product }: { product: TWheelProduct }) {
  return (
    <div className="space-y-0.5">
      <SpecRow label="Brand" value={product.brand} />
      <SpecRow label="Model" value={product.model} />
      <SpecRow label="Diameter" value={product.wheelDiameter || product.diameter} />
      <SpecRow label="Width" value={product.wheelWidth || product.width} />
      <SpecRow label="Wheel Size" value={product.wheelSize} />
      <SpecRow label="Bolt Pattern" value={product.boltPattern1} />
      <SpecRow label="Bolt Pattern 2" value={product.boltPattern2} />
      <SpecRow label="Offset" value={product.offset} />
      <SpecRow label="Backspacing" value={product.backspacing} />
      <SpecRow label="Centerbore" value={product.centerbore} />
      <SpecRow label="Finish" value={product.finish} />
      <SpecRow label="Finish Type" value={product.finishType} />
      <SpecRow label="Style" value={product.style} />
      <SpecRow label="Design Type" value={product.designType} />
      <SpecRow label="Load Rating" value={product.loadRating} />
      <SpecRow label="Max Load (lbs)" value={product.maxLoadLbs} />
      <SpecRow label="Max Load (kg)" value={product.maxLoadKg} />
      <SpecRow label="Lip Size" value={product.lipSize} />
      <SpecRow label="Forging Style" value={product.forgingStyle} />
      <SpecRow label="Dually" value={product.dually} />
    </div>
  );
}

function TireSpecTable({ product }: { product: TTireProduct }) {
  return (
    <div className="space-y-0.5">
      <SpecRow label="Brand" value={product.brand} />
      <SpecRow label="Model" value={product.model} />
      <SpecRow label="Tire Size" value={product.tireSize} />
      <SpecRow label="Width" value={product.tireWidth} />
      <SpecRow label="Aspect Ratio" value={product.tireAspectRatio} />
      <SpecRow label="Diameter" value={product.tireDiameter} />
      <SpecRow label="Speed Rating" value={product.speedRating} />
      <SpecRow label="Load Index" value={product.loadIndex} />
      <SpecRow label="Load Range" value={product.loadRange} />
      <SpecRow label="Max Load (lbs)" value={product.tireMaxLoadLbs} />
      <SpecRow label="Ply" value={product.ply} />
      <SpecRow label="Tire Class" value={product.tireClass} />
      <SpecRow label="Tire Type" value={product.tireType} />
      <SpecRow label="Tire Style" value={product.tireStyle} />
      <SpecRow label="Terrain" value={product.terrain} />
      <SpecRow label="Run Flat" value={product.runFlat} />
      <SpecRow label="Tread Depth" value={product.treadDepth} />
      <SpecRow label="UTQG" value={product.utqg} />
      <SpecRow label="Mileage Warranty" value={product.mileageWarranty} />
      <SpecRow label="M+S" value={product.mS} />
      <SpecRow label="Max Inflation (PSI)" value={product.maxAirPressurePsi} />
      <SpecRow label="Sidewall" value={product.sidewall} />
      <SpecRow label="Revs Per Mile" value={product.revsPerMile} />
    </div>
  );
}

export default function WheelTirePackage() {
  const { setOpen } = useCartHook();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const packages = useTypedSelector((state) => state.persisted.package);

  const cartPackage = searchParams.get("cartPackage") as string;

  const packageData = packages[cartPackage];
  if (!packageData?.wheel || !packageData?.tire) return null;

  const wheel = productsByCategory("wheels", packageData.wheel);
  const tire = productsByCategory("tire", packageData.tire);

  const wheelPrice = getPrice(wheel);
  const tirePrice = getPrice(tire);

  const handleAddToCart = () => {
    new Promise<boolean>((resolve, reject) => {
      try {
        if (!packageData.wheel || !packageData.tire) return;
        const wheelData = packageData.wheel;
        const tireData = packageData.tire;
        dispatch(
          addToCart({
            ...wheelData,
            cartSerial: uuidv4(),
            quantity: 4,
            cartPackage,
            metaData: {},
          })
        );
        dispatch(
          addToCart({
            ...tireData,
            cartSerial: uuidv4(),
            quantity: 4,
            cartPackage,
            metaData: {},
          })
        );
        resolve(true);
      } catch (error) {
        reject(error);
      }
    }).then((res) => {
      if (res) {
        setOpen();
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-foreground via-foreground/95 to-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
          <div className="flex items-center gap-2 text-sm text-card/60 mb-3">
            <span>Home</span>
            <span>/</span>
            <span>Packages</span>
            <span>/</span>
            <span className="text-primary">{wheel.brand} + {tire.brand}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/15 rounded-xl backdrop-blur-sm border border-primary/20">
              <Package size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-card">
                Wheel & Tire Package
              </h1>
              <p className="text-card/60 text-sm mt-0.5">
                {wheel.brand} {wheel.model} + {tire.brand} {tire.model}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Showcase */}
          <div className="lg:col-span-8 space-y-6">
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductCard product={wheel} type="wheel" price={wheelPrice} />
              <ProductCard product={tire} type="tire" price={tirePrice} />
            </div>

            {/* Package Summary Banner */}
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl border border-primary/15 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Package size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">
                      Complete Package Deal
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Wheels + Tires combined for maximum savings
                    </p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Package Total
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice((wheelPrice + tirePrice) * 4 - 10)}
                  </p>
                  <p className="text-xs text-green-600 font-semibold">
                    You save $10 on this package!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-4 space-y-4">
              <PackageDetails wheel={packageData.wheel} tire={packageData.tire} />
              <div>
                <Ymm wheel={packageData.wheel} tire={packageData.tire} />
              </div>
              <Button
                className="w-full h-14 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                onClick={handleAddToCart}
              >
                Add Package to Cart
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Includes 4 wheels + 4 tires • Free mount & balance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
