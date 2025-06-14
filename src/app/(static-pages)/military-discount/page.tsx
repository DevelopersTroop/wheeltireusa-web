// Import the Privacy Policy component
import { metaDataHelper } from '@/utils/metadata';
import MilitaryDiscount from './_components/military-discount';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Military Discount - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/military-discount',
  },
});

// Component to render the Military Discount page
export default function Page() {
  return (
    // Render the Military Discount component
    <MilitaryDiscount />
  );
}
