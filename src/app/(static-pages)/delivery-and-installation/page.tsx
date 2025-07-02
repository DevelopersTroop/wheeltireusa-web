// Import the Delivery and Installation component
import { metaDataHelper } from '@/utils/metadata';
import DeliveryAndInstallation from './DeliveryAndInstallation';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Delivery and Installation - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/delivery-and-installation',
  },
});

// Component to render the Delivery and Installation page
export default function Page() {
  return (
    // Render the Delivery and Installation component
    <DeliveryAndInstallation />
  );
}
