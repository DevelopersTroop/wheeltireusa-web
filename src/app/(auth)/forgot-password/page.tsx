import { metaDataHelper } from "@/utils/metadata";
import Page from "./client";

export async function generateMetadata() {
  try {
    return {
      ...metaDataHelper({
        title: `Forgot password - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/forgot-password`,
      },
    };
  } catch (error) {
    // Return default metadata in case of error
    return {
      title: "Error",
    };
  }
}

export default function Register() {
  return <Page />;
}
