// Import the Return Policy component
import { metaDataHelper } from '@/utils/metadata';
import ShippingPolicy from './ShippingPolicy';


// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Shipping Policy - WheelTireUSA',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://wheeltireusa.com/shipping-policy',
  },
});

// Component to render the Shpping Policy page
export default function Page() {
  return (
    // Render the Shipping Policy component
    <ShippingPolicy />
  );
}
