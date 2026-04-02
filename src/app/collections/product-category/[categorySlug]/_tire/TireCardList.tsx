"use client";
import { TInventoryItem, TTireProduct } from "@/types/product";
import { getProductThumbnail } from "@/utils/product";
import ProductImage from "@/components/shared/ProductImage/ProductImage";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import TireCardDescription from "./TireCardDescription";
import CompareButton from "@/components/shared/CompareButton/CompareButton";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const TireCardList = ({ product }: { product: TInventoryItem }) => {
    const searchparams = useSearchParams();
    const cartPackage = searchparams.get("cartPackage");
    const productLink = `/collections/product/${product.id}?cartPackage=${cartPackage}`;
    const [imageErr, setImageErr] = useState(false);

    return (
        <div
            className="flex w-full flex-row overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 gap-4 p-3 md:p-4 relative group"
        >
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <CompareButton product={product} variant="icon" />
            </div>

            {/* New Badge */}
            <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    NEW
                </Badge>
            </div>

            <div className="flex w-[120px] md:w-[200px] lg:w-[250px] shrink-0 items-center justify-center p-2 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl">
                <Link href={productLink}>
                    <ProductImage
                        className="d-block mx-auto w-full max-h-[140px] md:max-h-[200px] object-contain mix-blend-multiply"
                        height={238}
                        width={238}
                        alt="product image"
                        src={getProductThumbnail(product)}
                        onError={() => setImageErr(true)}
                    />
                </Link>
            </div>
            <div className="grow flex flex-col justify-center py-2 h-full pl-2">
                <Link href={productLink} className="h-full block">
                    <TireCardDescription product={product as TTireProduct} />
                </Link>
            </div>
        </div>
    );
};

export default TireCardList;
