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

    console.log("🔍 [METADATA] slug:", singleProduct);
    console.log("🔍 [METADATA] API:", `${apiBaseUrl}/products/${singleProduct}`);

    const response = await fetch(
      `${apiBaseUrl}/products/${singleProduct}`,
      {
        cache: "no-store",
        next: { revalidate: 300 },
      }
    );

    console.log("🔍 [METADATA] status:", response.status);

    const text = await response.text();
    console.log("🔍 [METADATA] raw response:", text);

    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("❌ [METADATA] JSON parse failed");
      throw new Error("Invalid JSON response from API");
    }

    const product = result?.data?.product as TInventoryItem;

    console.log("🔍 [METADATA] product:", product);

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
  } catch (error) {
    console.error("❌ [METADATA ERROR]:", error);
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

    console.log("🔍 [PAGE] slug:", singleProduct);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${singleProduct}`;

    console.log("🔍 [PAGE] fetch URL:", url);

    const response = await fetch(url);

    console.log("🔍 [PAGE] status:", response.status);

    const text = await response.text();
    console.log("🔍 [PAGE] raw response:", text);

    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("❌ [PAGE] JSON parse failed");
      throw new Error("Invalid JSON response from API");
    }

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
  } catch (error) {
    console.error("❌ [PAGE ERROR]:", error);

    return (
      <div className="max-w-[1350px] p-4 mx-auto">
        Something went wrong loading product
      </div>
    );
  }
}