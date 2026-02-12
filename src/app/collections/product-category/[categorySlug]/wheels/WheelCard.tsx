"use client";
import { TInventoryItem } from "@/types/product";
import { getProductThumbnail } from "@/utils/product";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import TireCardDescription from "./WheelCardDescription";
import CompareButton from "@/components/shared/CompareButton/CompareButton";

const WheelCard = ({ product }: { product: TInventoryItem }) => {
  const searchparams = useSearchParams();
  const cartPackage = searchparams.get("cartPackage");
  const productLink = `/collections/product/${product.id}?cartPackage=${cartPackage}`;
  const [imageErr, setImageErr] = useState(false);
  return (
    <div
      className={
        "flex w-full flex-row overflow-hidden md:rounded-xl md:border md:border-[#cfcfcf] md:bg-white min-[600px]:w-[250px] min-[600px]:flex-col md:shadow-xl gap-2 md:px-4 relative group"
      }
    >
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <CompareButton product={product} variant="icon" />
      </div>
      <div className="flex w-full items-center justify-center pt-5">
        <Link href={productLink}>
          <Image
            className={"d-block mx-auto w-full rounded-xl object-cover"}
            height={238}
            width={238}
            alt="product image"
            src={getProductThumbnail(product)}
            onError={() => setImageErr(true)}
          ></Image>
        </Link>
      </div>
      <Link href={productLink} className="py-6">
        <TireCardDescription product={product} />
      </Link>
    </div>
  );
};

export default WheelCard;
