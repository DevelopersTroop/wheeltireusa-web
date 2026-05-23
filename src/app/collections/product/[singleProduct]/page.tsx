import { removeHtmlTags } from "@/lib/utils";
import { TInventoryItem } from "@/types/product";
import { apiBaseUrl } from "@/utils/api";
import { metaDataHelper } from "@/utils/metadata";
import { Metadata } from "next";
import SingleProductClient from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ singleProduct: string }>;
}): Promise<Metadata> {
  try {
    const { singleProduct } = await params;

    const response = await fetch(
      `${apiBaseUrl}/products/${singleProduct}`,
      {
        cache: "no-store",
        next: { revalidate: 300 },
      }
    );

    const result = await response.json().catch(() => {
      throw new Error("Invalid JSON response from API");
    });

    const product = result?.data?.product as TInventoryItem;

    if (!product) {
      return {
        title: "Product Not Found",
      };
    }

    return metaDataHelper({
      title: product.title,
      description: removeHtmlTags(product.title || ""),
      openGraph: {
        title: product.title,
        description: removeHtmlTags(product.title || ""),
        url: `https://wheeltireusa.com/collections/product/${singleProduct}`,
        images: [
          {
            url: product?.itemImage ?? "/images/not-available.webp",
            width: 1200,
            height: 630,
            alt: product?.title ?? "Wheel Tire USA",
          },
        ],
      },
      alternates: {
        canonical: `https://wheeltireusa.com/collections/product/${singleProduct}`,
      },
    });
  } catch {
    return {
      title: "Wheel Tire USA",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ singleProduct: string }>;
}) {
  try {
    const { singleProduct } = await params;

    const url = `${apiBaseUrl}/products/${singleProduct}`;

    const response = await fetch(url, { cache: "no-store" });

    const result = await response.json()

    const product = result?.data?.product;

    if (!product) {
      return (
        <div className="max-w-[1350px] p-4 mx-auto">
          Product not found
        </div>
      );
    }

    return (
      <div className="max-w-[1350px] p-4 mx-auto">
        <SingleProductClient product={product} />
      </div>
    );
  } catch {
    return (
      <div className="max-w-[1350px] p-4 mx-auto">
        Something went wrong loading product
      </div>
    );
  }
}