import { apiBaseUrl } from "@/utils/api";
import { metaDataHelper } from "@/utils/metadata";
import { removeHtmlTags } from "@/lib/utils";
import { TInventoryItem } from "@/types/product";
import { Metadata } from "next";
import SingleProductClient from "./client";
import { getProductThumbnail } from "@/utils/product";

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
            url: getProductThumbnail(product),
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
    return {
      title: "Custom wheel - Wheel Tire USA", // Fallback title in case of an error.
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

  // const result = (await response.json()) as { data: { product: TInventoryItem } };
  const result = {
    data: {
      product: {
        // --- TTireProduct fields (populated with demo data) ---
        tireSize: "275/55R20",
        tireWidth: "275",
        tireRatio: "55",
        tireDiameter: "20",
        rawSize: "275/55R20 111V",
        approvedRimContours: "J",
        sidewall: "BSW", // Black Sidewall
        ply: "SL", // Standard Load
        speedRating: "V",
        loadIndex: "111",
        stdRim: "8.0",
        maxAirPressureKpa: "240",
        staticLoadRadiusIn: "15.4",
        theoreticalRollingRadius: "15.8",
        utqg: "500AB",
        treadDepthIn: "0.4375", // 11/32nds of an inch
        treadDepthMm: "11",
        staticLoadRadiusMm: "391",
        sectionWidthIn: "10.8",
        sectionWidthMm: "275",
        runFlat: null, // This is not a run-flat tire
        maxAirPressurePsi: "35",
        tireClass: "Highway",
        overallDiameterIn: "31.9",
        overallDiameterMm: "810",

        // --- TWheelProduct fields (null for a tire) ---
        loadRating: null,
        maxLoadKg: null,
        maxLoadLbs: null,
        maxLoad2Kg: null,
        maxLoad2Lbs: null,

        // --- TInventoryItem fields ---
        id: 2001,
        brand: "Bridgestone",
        model: "Alenza A/S",
        title: "Bridgestone Alenza A/S 275/55R20 111V",
        category: {
          id: 1,
          title: "tires",
          slug: "tires",
          description: "The Tires category includes a wide range of tires for various vehicles, designed for different weather conditions and performance needs. This includes all-season, summer, winter, and performance tires, providing traction, durability, and safety for cars, trucks, and SUVs."
        },
        itemImage: "/images/tires/bridgestone-alenza-as-275-55r20.jpg",
        slug: "bridgestone-alenza-as-275-55r20-111v",
        vendorName: "tire-distributor-inc",
        partNumber: "15234",
        shipWeight: "35",
        shipWidth: "28",
        shipHeight: "28",
        shipDepth: "11",
        shortDescription: "The Bridgestone Alenza A/S is a premium all-season tire designed for crossovers and SUVs, offering a quiet, comfortable ride with confident wet and dry performance.",
        availableStock: 54,
        sellingPrice: 225.50,
        vehicleCategory: "Crossover/SUV",
        gtin: "88765432109876"
      }
    }
  } as { data: { product: TInventoryItem } };


  return <SingleProductClient product={result.data.product} />;
}
