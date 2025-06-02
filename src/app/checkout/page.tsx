import { metaDataHelper } from '@/utils/metadata';
import { CheckoutClientComponent } from './clientComponent';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Checkout - Amani Forged Wheels',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    // canonical: "https://amaniforged.com/checkout"
  },
});

// Component to render the Checkout page
export default function Page() {
  return (
    // Render the ClientComponent, which contains the checkout logic and UI
    <CheckoutClientComponent />
  );
}
