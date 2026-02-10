"use client";
import { TInventoryItem } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CardDescription from "./card-description";
import { useSearchParams } from "next/navigation";
import { getProductThumbnail } from "@/utils/product";

export const ProductCard = ({
  product,
  bestSeller = false,
}: {
  product: TInventoryItem;
  bestSeller?: boolean;
}) => {
  const searchParams = useSearchParams();
  const cartPackage = searchParams.get("cartPackage");
  const productLink = `/collections/product/${product.slug}?cartPackage=${cartPackage}`;
  const [imageErr, setImageErr] = useState(false);

  const sales = true;

  return (
    <div
      className={
        "flex w-full flex-row overflow-hidden md:rounded-xl md:border md:border-[#cfcfcf] md:bg-white min-[600px]:w-[250px] min-[600px]:flex-col md:shadow-xl gap-2 md:px-4"
      }
    >
      <div className="flex w-full items-center justify-center pt-5">
        <Link className="relative" href={productLink}>
          <Image
            className={"d-block mx-auto w-full rounded-xl object-contain"}
            height={240}
            width={240}
            alt="product image"
            src={getProductThumbnail(product)}
            onError={() => setImageErr(true)}
          ></Image>
          {!sales && bestSeller && (
            <div className="bg-primary max-w-fit px-4 py-1 uppercase absolute -bottom-2 md:bottom-0 font-semibold text-white">
              Best Seller!
            </div>
          )}

          {sales && !bestSeller && (
            <div className="bg-primary max-w-fit px-4 py-1 uppercase absolute -bottom-2 md:bottom-0 font-semibold text-white">
              Sale
            </div>
          )}
        </Link>
      </div>

      <Link href={productLink} className="py-6">
        <CardDescription product={product} sales={sales} />
      </Link>
    </div>
  );
};

export default ProductCard;
