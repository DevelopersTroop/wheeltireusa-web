// Import the Customer support component
import { metaDataHelper } from '@/utils/metadata';
import CustomerSupport from './CustomerSupport';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Customer Support - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/customer-support',
  },
});

// Component to render the Customer Support page
export default function Page() {
  return (
    // Render the Customer Support component
    <CustomerSupport />
  );
}
