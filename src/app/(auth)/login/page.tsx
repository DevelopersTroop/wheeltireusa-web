import { metaDataHelper } from "@/utils/metadata";
import LoginPage from "./client";

export async function generateMetadata() {
  try {
    return {
      ...metaDataHelper({
        title: `Login - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/login`,
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
  return <LoginPage />;
}
