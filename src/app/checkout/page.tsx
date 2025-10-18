// Import the ClientComponent, which handles the main functionality of the checkout page

import { metaDataHelper } from "@/utils/metadata";
import ClientComponent from "./ClientComponent";
export const metadata = metaDataHelper({
  title: "Checkout - Amani Forged Wheels",
  keywords: "",
  description: "",
  openGraph: {
    title: "",
    description: "",
  },
  alternates: {
    canonical: "https://amaniforged.com/checkout",
  },
});

// Component to render the Checkout page
export default function Page() {
  return (
    // Render the ClientComponent, which contains the checkout logic and UI
    <ClientComponent />
  );
}
