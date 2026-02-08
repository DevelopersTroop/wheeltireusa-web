import { apiBaseUrl } from "@/utils/api";
import { metaDataHelper } from "@/utils/metadata";
import { normalizeImageUrl, removeHtmlTags } from "@/lib/utils";
import { TInventoryItem } from "@/types/product";
import { Metadata } from "next";
import SingleProductClient from "./client";
import { getProductThumbnail } from "@/utils/product";
import { combineSlices } from "@reduxjs/toolkit";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ singleProduct: string }>;
}): Promise<Metadata> {
  try {
    const { singleProduct } = await params; // Extract product ID from params.
    const response = await fetch(`${apiBaseUrl}/products/${singleProduct}`, {
      cache: "force-cache",
      next: { revalidate: 300 },
    });

    const result = await response.json(); // Parse response.

    console.log(result.data.product);

    const product = result.data?.product as TInventoryItem; // Extract product data.

    return metaDataHelper({
      title: `${product.title}`, // Set page title based on product name.
      description: removeHtmlTags(`${product.title}`), // Set meta description from product data.
      openGraph: {
        title: `${product.title}`,
        description: removeHtmlTags(`${product.title}`),
        url: `https://wheeltireusa.com/collections/product/${singleProduct}`,
        images: [
          {
            url: product?.itemImage ?? '/images/not-available.webp',
            width: 1200,
            height: 630,
            alt: product.title,
          },
        ],
      },
      alternates: {
        canonical: `https://wheeltireusa.com/collections/product/${singleProduct}`,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      title: "Wheel Tire USA", // Fallback title in case of an error.
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ singleProduct: string }>;
}) {
  const { singleProduct } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${singleProduct}`
  );

  const result = await response.json();


  return <SingleProductClient product={result.data.product} />;
}
