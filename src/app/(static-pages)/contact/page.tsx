import { metaDataHelper } from "@/utils/metadata";
import Contact from "./client";

export async function generateMetadata() {
  try {
    return {
      ...metaDataHelper({
        title: `Contact us - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/contact`,
      },
    };
  } catch (error) {
    // Return default metadata in case of error
    return {
      title: "Error",
    };
  }
}

export default function Page() {
  return <Contact />
}