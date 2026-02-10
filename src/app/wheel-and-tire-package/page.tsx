import { metaDataHelper } from "@/utils/metadata";
import WheelTirePackage from "./Client";

export async function generateMetadata() {
  try {
    return {
      ...metaDataHelper({
        title: `Wheel and Tire Package - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/wheel-and-tire-package`,
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
  return <WheelTirePackage />;
}
