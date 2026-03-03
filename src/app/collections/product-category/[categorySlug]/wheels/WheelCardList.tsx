"use client";
import { TInventoryItem, TWheelProduct } from "@/types/product";
import { getProductThumbnail } from "@/utils/product";
import ProductImage from "@/components/shared/ProductImage/ProductImage";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import WheelCardDescription from "./WheelCardDescription";
import CompareButton from "@/components/shared/CompareButton/CompareButton";

const WheelCardList = ({ product }: { product: TInventoryItem }) => {
    const searchparams = useSearchParams();
    const cartPackage = searchparams.get("cartPackage");
    const productLink = `/collections/product/${product.id}?cartPackage=${cartPackage}`;
    const [imageErr, setImageErr] = useState(false);

    return (
        <div
            className={
                "flex w-full flex-row overflow-hidden rounded-xl border border-[#cfcfcf] bg-white shadow-md gap-4 p-2 md:p-4 relative group"
            }
        >
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <CompareButton product={product} variant="icon" />
            </div>

            <div className="flex w-[120px] md:w-[250px] lg:w-[300px] shrink-0 items-center justify-center p-2">
                <Link href={productLink}>
                    <ProductImage
                        className={"d-block mx-auto w-full rounded-xl object-contain"}
                        height={238}
                        width={238}
                        alt="product image"
                        src={getProductThumbnail(product)}
                        onError={() => setImageErr(true)}
                    />
                </Link>
            </div>
            <div className="grow flex flex-col justify-center py-2 h-full">
                <Link href={productLink} className="h-full block">
                    <WheelCardDescription product={product as TWheelProduct} />
                </Link>
            </div>
        </div>
    );
};

export default WheelCardList;
