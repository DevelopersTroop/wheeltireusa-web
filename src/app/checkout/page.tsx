import { metaDataHelper } from '@/utils/metadata';
import { CheckoutClientComponent } from './clientComponent';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Checkout - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/return-policy',
  },
});

// Component to render the Checkout page
export default function Page() {
  return (
    // Render the ClientComponent, which contains the checkout logic and UI
    <CheckoutClientComponent />
  );
}
