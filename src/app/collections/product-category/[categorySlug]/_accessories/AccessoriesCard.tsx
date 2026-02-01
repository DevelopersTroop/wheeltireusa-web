"use client";
import { TInventoryItem } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProductThumbnail } from "@/utils/product";
import AccessoriesCardDescription from "./AccessoriesCardDescription";

const AccessoriesCard = ({ product }: { product: TInventoryItem }) => {
  const productLink = `/collections/product/${product.slug}`;
  const [imageErr, setImageErr] = useState(false);

  return (
    <div
      className={
        "max-w-[300px] flex flex-col bg-white border shadow relative group"
      }
    >
      <Link className="inline-block" href={productLink}>
        <div className="flex justify-center items-center p-2">
          <Image
            className={"mx-auto d-block  w-full object-cover "}
            height={238}
            width={238}
            alt="accessories image"
            src={getProductThumbnail(product)}
            onError={() => setImageErr(true)}
          ></Image>
        </div>
        <div className="absolute top-0 left-0 bg-gray-600 text-white px-3 py-1 group-hover:bg-primary group-hover:pr-8">
          <p className="text-xl"> ${product?.sellingPrice} </p>
        </div>
        <AccessoriesCardDescription product={product} />
      </Link>
    </div>
  );
};

export default AccessoriesCard;
