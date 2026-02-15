"use client";
import { normalizeImageUrl } from "@/lib/utils";
import { IGallery } from "@/types/gallery";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, HardDrive } from "lucide-react";

const ProductCard = ({ product }: { product: IGallery }) => {
  const productLink = `/gallery/${product.slug}`;
  const installedCount = product.installedProducts?.length || 0;

  return (
    <Link href={productLink} className="group block">
      <Card className="overflow-hidden border-2 transition-all duration-300 hover:border-primary hover:shadow-2xl">
        {/* Header: Title and User */}
        <CardHeader className="p-5 space-y-1">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter line-clamp-1 group-hover:text-primary transition-colors">
              {product.title ||
                `${product.year} ${product.make} ${product.model}`}
            </h2>
            <Badge
              variant="outline"
              className="ml-2 font-bold whitespace-nowrap"
            >
              {product.year}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            Build by{" "}
            <span className="text-foreground">
              {product.buildUsername || "Owner"}
            </span>
          </p>
        </CardHeader>

        {/* Large Image Section */}
        <div className="relative aspect-[1/1] w-full overflow-hidden bg-muted">
          <Image
            className="transition-transform duration-700 ease-out group-hover:scale-105 object-cover"
            src={normalizeImageUrl(
              product.mainImage || product.thumbnail || ""
            )}
            alt={product?.title || "Build Image"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Floating Product Count Badge */}
          {installedCount > 0 && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-md border border-border px-3 py-1.5 rounded-full shadow-lg">
              <HardDrive className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-black uppercase tracking-tight">
                {installedCount} Installed{" "}
                {installedCount === 1 ? "Part" : "Parts"}
              </span>
            </div>
          )}
        </div>

        {/* Content: Specs Grid */}
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Wheels
              </p>
              <p className="text-sm font-bold uppercase truncate">
                {product.wheelBrand || "Stock"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {product.wheelModel}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Tires
              </p>
              <p className="text-sm font-bold uppercase truncate">
                {product.tireBrand || "Stock"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {product.tireSize}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="default"
              className="text-[10px] font-bold uppercase"
            >
              {product.make}
            </Badge>
            <Badge
              variant="default"
              className="text-[10px] font-bold uppercase"
            >
              {product.model}
            </Badge>
            {product.suspensionBrand && (
              <Badge
                variant="default"
                className="text-[10px] font-bold uppercase"
              >
                {product.suspensionBrand}
              </Badge>
            )}
          </div>
        </CardContent>

        {/* Footer: Action */}
        <CardFooter className="p-5 bg-muted/30 border-t flex justify-between items-center gap-2">
          <span className="text-[10px] font-black uppercase text-muted-foreground">
            Full Specs & Photos
          </span>
          <Button
            size="sm"
            variant="default"
            className="gap-2 font-bold uppercase text-[11px]"
          >
            <Eye className="w-3.5 h-3.5" />
            View Build
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
